// 只在 /docs 作用域内取资源
const BASE = '.';
const CASES_URL = `${BASE}/cases.json`;

// 规范生成图片地址（统一放在 docs/images/samples/）
const imgSrc = (id, which = 'after') => `${BASE}/images/samples/${id}-${which}.png`;

// SVG 占位，避免断图时空白
const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
  <rect width="100%" height="100%" fill="#f3f3f3"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#aaa" font-size="20">image pending</text></svg>`);

const tpl = document.getElementById('card-tpl');
const grid = document.getElementById('grid');
const search = document.getElementById('search');

let all = [];

function render(list) {
  grid.innerHTML = '';
  const frag = document.createDocumentFragment();
  for (const item of list) {
    const node = tpl.content.cloneNode(true);
    const card = node.querySelector('.card');
    const img = node.querySelector('img');
    const title = node.querySelector('.title');
    const tags = node.querySelector('.tags');

    // 标题：优先用数据里的 title，其次 id 兜底
    title.textContent = item.title || item.id || 'Showcase';

    // 标签：可选
    (item.tags || []).slice(0, 6).forEach(t => {
      const b = document.createElement('span');
      b.className = 'tag';
      b.textContent = t;
      tags.appendChild(b);
    });

    // 图片：先 after -> 再 before -> 最后占位
    const id = item.id || `case${Math.random().toString(36).slice(2, 7)}`;
    img.src = imgSrc(id, 'after');
    img.onerror = () => {
      img.onerror = () => { img.src = PLACEHOLDER; };
      img.src = imgSrc(id, 'before');
    };

    frag.appendChild(node);
  }
  grid.appendChild(frag);
}

async function boot() {
  try {
    const res = await fetch(CASES_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
    all = await res.json();

    // 兜底：不规范数据也容错成最小结构
    all = Array.isArray(all) ? all.map((x, i) => ({
      id: x.id || x.slug || x.title || `case${String(i + 1).padStart(2, '0')}`,
      title: x.title || x.name || `Showcase ${i + 1}`,
      tags: x.tags || x.tag || [],
    })) : [];

    render(all);
  } catch (err) {
    console.error('Load cases.json failed:', err);
    // 数据都没有也不要空白，给一点占位卡片
    const fake = Array.from({ length: 12 }, (_, i) => ({
      id: `case${String(i + 1).padStart(2,'0')}`,
      title: `Showcase ${i + 1}`,
      tags: ['pending'],
    }));
    render(fake);
  }
}

search.addEventListener('input', e => {
  const kw = e.target.value.trim().toLowerCase();
  if (!kw) return render(all);
  const hit = all.filter(x =>
    (x.title || '').toLowerCase().includes(kw) ||
    (x.id || '').toLowerCase().includes(kw) ||
    (x.tags || []).some(t => (t + '').toLowerCase().includes(kw))
  );
  render(hit);
});

boot();
