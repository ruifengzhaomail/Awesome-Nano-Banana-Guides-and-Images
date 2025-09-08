// ============= 固定常量（无需改） =============
const CASES_URL = 'cases.json';     // 本地静态 JSON
const IMG_ROOT  = 'images';         // Pages 目录下的图片根：docs/images

// 按 caseId 生成候选图片名（兼容 input.jpg/input0.jpg、output.jpg/output0.jpg）
function imageCandidates(caseId) {
  const base = `${IMG_ROOT}/${caseId}`;
  return {
    before: [`${base}/input.jpg`, `${base}/input0.jpg`, `${base}/before.jpg`, `${base}/before0.jpg`],
    after:  [`${base}/output.jpg`, `${base}/output0.jpg`, `${base}/after.jpg`, `${base}/after0.jpg`],
    thumb:  [`${base}/output.jpg`, `${base}/output0.jpg`, `${base}/input.jpg`, `${base}/input0.jpg`], // 优先 after 作为缩略图
  };
}

// 带兜底的 <img> 加载：失败时换下一个候选
function loadWithFallback(imgEl, srcList) {
  let idx = 0;
  const tryLoad = () => {
    if (idx >= srcList.length) {
      imgEl.replaceWith(pendingNode());
      return;
    }
    imgEl.src = srcList[idx++];
  };
  imgEl.onerror = tryLoad;
  tryLoad();
}

// “image pending” 占位
function pendingNode() {
  const div = document.createElement('div');
  div.className = 'thumb pending';
  div.textContent = 'image pending';
  return div;
}

// 渲染卡片
function renderCard(item) {
  const card = document.createElement('article');
  card.className = 'card';

  const img = document.createElement('img');
  img.className = 'thumb';
  const cand = imageCandidates(item.id);
  loadWithFallback(img, cand.thumb);
  card.appendChild(img);

  const body = document.createElement('div');
  body.className = 'card__body';
  body.innerHTML = `<div class="card__title">${item.title}</div>`;
  const tagWrap = document.createElement('div');
  tagWrap.className = 'tags';
  (item.tags || []).forEach(t => {
    const s = document.createElement('span');
    s.className = 'tag'; s.textContent = t;
    tagWrap.appendChild(s);
  });
  body.appendChild(tagWrap);
  card.appendChild(body);

  // 点击打开 Lightbox
  card.addEventListener('click', () => openLightbox(item));
  return card;
}

// 轻盒：展示 before/after
function openLightbox(item) {
  const lb = document.getElementById('lightbox');
  const imgBf = document.getElementById('imgBefore');
  const imgAf = document.getElementById('imgAfter');
  const meta  = document.getElementById('lbMeta');

  imgBf.removeAttribute('src'); imgAf.removeAttribute('src');
  imgBf.replaceWith(imgBf.cloneNode()); // 清掉 onerror
  imgAf.replaceWith(imgAf.cloneNode());

  const bf = document.getElementById('imgBefore');
  const af = document.getElementById('imgAfter');
  const cand = imageCandidates(item.id);
  loadWithFallback(bf, cand.before);
  loadWithFallback(af, cand.after);

  meta.textContent = `${item.title} (${item.id})`;
  lb.hidden = false;
}

document.getElementById('closeBtn').addEventListener('click', ()=> {
  document.getElementById('lightbox').hidden = true;
});
document.getElementById('lightbox').addEventListener('click', (e)=> {
  if (e.target.id === 'lightbox') e.currentTarget.hidden = true;
});

// 主流程：读 cases.json 渲染网格 + 搜索
(async function main(){
  const grid = document.getElementById('grid');
  let data = [];
  try {
    const res = await fetch(CASES_URL, {cache:'no-store'});
    data = await res.json();
  } catch(e) {
    grid.textContent = '读取数据失败：请检查 docs/cases.json 是否为有效 JSON。';
    return;
  }

  const render = (list)=> {
    grid.innerHTML = '';
    list.forEach(item => grid.appendChild(renderCard(item)));
  };
  render(data);

  const search = document.getElementById('search');
  search.addEventListener('input', ()=>{
    const q = search.value.trim().toLowerCase();
    if (!q) return render(data);
    const filtered = data.filter(x =>
      (x.title||'').toLowerCase().includes(q) ||
      (x.id||'').toLowerCase().includes(q) ||
      (x.tags||[]).some(t => (t||'').toLowerCase().includes(q))
    );
    render(filtered);
  });
})();
