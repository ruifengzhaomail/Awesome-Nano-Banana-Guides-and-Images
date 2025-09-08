// 简单占位图（图片 404 时使用）
const placeholder = (w=800,h=480,text='image pending') =>
  `data:image/svg+xml;utf8,` + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#141920"/>
        <stop offset="1" stop-color="#0f1318"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="50%" y="50%" fill="#6b7787" font-family="system-ui, -apple-system, Segoe UI, Roboto, PingFang SC" font-size="28" text-anchor="middle" dominant-baseline="middle">${text}</text>
  </svg>`);

// 元素
const $grid   = document.getElementById('grid');
const $search = document.getElementById('search');

// 读取数据（固定从 docs/cases.json 取）
async function loadCases() {
  const res = await fetch('cases.json', { cache: 'no-store' });
  if (!res.ok) throw new Error(`Load cases.json failed: ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('cases.json 必须是数组');
  return data;
}

// 渲染卡片
let CASES = [];
function render(list) {
  $grid.innerHTML = '';
  for (const c of list) {
    const after = (c.images && (c.images.thumb || c.images.after)) || '';
    const $card = document.createElement('article');
    $card.className = 'card';
    $card.innerHTML = `
      <img class="thumb" alt="${c.title || ''}" src="${after || ''}">
      <div class="body">
        <h3>${c.title || c.id || 'Untitled'}</h3>
        <div class="tags">${(c.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      </div>`;
    // 图片失败时用占位
    $card.querySelector('.thumb').onerror = (e)=> e.target.src = placeholder();

    // 点击打开对比
    $card.addEventListener('click', () => {
      openViewer(
        c.images?.before || '',
        c.images?.after  || c.images?.thumb || ''
      );
    });

    $grid.appendChild($card);
  }
}

// 搜索
$search.addEventListener('input', () => {
  const q = $search.value.trim().toLowerCase();
  if (!q) return render(CASES);
  const f = CASES.filter(c => {
    const hay = [
      c.id, c.title,
      ...(c.tags||[]),
      c.prompt_zh, c.prompt_en
    ].join(' ').toLowerCase();
    return hay.includes(q);
  });
  render(f);
});

// Viewer 打开/关闭
(function () {
  const el = document.getElementById('viewer');
  const imgB = el.querySelector('[data-role="before"]');
  const imgA = el.querySelector('[data-role="after"]');

  function close() {
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    imgB.removeAttribute('src');
    imgA.removeAttribute('src');
  }
  function open(before, after) {
    imgB.src = before || placeholder();
    imgA.src = after  || placeholder();
    imgB.onerror = ()=> imgB.src = placeholder();
    imgA.onerror = ()=> imgA.src = placeholder();

    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  el.addEventListener('click', (e) => {
    if (e.target === el || e.target.closest('[data-close]')) close();
  });
  window.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape' && el.classList.contains('is-open')) close();
  });

  // 暴露全局
  window.openViewer = open;
})();

// 启动
loadCases()
  .then(list => { CASES = list; render(CASES); })
  .catch(err => {
    $grid.innerHTML = `<div class="card" style="padding:16px">
      读取数据失败：${err.message}
    </div>`;
    console.error(err);
  });
