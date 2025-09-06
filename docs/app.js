<script>
(async function () {
  const grid = document.getElementById('grid');

  // 读取同目录的 cases.json
  let data = [];
  try {
    data = await fetch('./cases.json').then(r => r.json());
  } catch (e) {
    console.error('load cases.json failed', e);
    data = [];
  }

  // 规范图片路径：
  // - 允许 http/https 外链（直接返回）
  // - 去掉 ../ 或 ./ 前缀
  // - 统一成相对 docs/ 的路径：images/xxx
  // - 最后再用 URL 解析成“相对当前页面”的绝对地址，兼容 GitHub Pages 子路径
  const normalizeSrc = (p) => {
    if (!p) return 'images/placeholder.svg';
    if (/^https?:\/\//i.test(p)) return p;
    while (p.startsWith('../')) p = p.slice(3);
    if (p.startsWith('./')) p = p.slice(2);
    if (!p.startsWith('images/')) p = 'images/' + p.replace(/^images\//, '');
    return new URL(p, location.href).href;
  };

  // 卡片渲染
  const makeCard = (item, idx) => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    const first = (item.images && item.images[0] && item.images[0].src) || '';
    img.src = normalizeSrc(first);
    img.alt = item.title || 'preview';
    img.loading = 'lazy';
    // 任意 404 都兜底占位图
    img.onerror = () => {
      img.onerror = null;
      img.src = new URL('images/placeholder.svg', location.href).href;
    };

    const h3 = document.createElement('h3');
    h3.textContent = item.title || `Showcase ${idx + 1}`;

    card.appendChild(img);
    card.appendChild(h3);
    return card;
  };

  grid.innerHTML = '';
  data.forEach((it, i) => grid.appendChild(makeCard(it, i)));
})();

</script>
