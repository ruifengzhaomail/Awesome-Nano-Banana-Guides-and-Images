<script>
(async function () {
  const grid = document.getElementById('grid');

  // 1) 取数据
  const data = await fetch('./cases.json').then(r => r.json()).catch(() => []);

  // 2) 规范化图片相对路径：去掉 ../ 或 ./，确保以 images/ 开头
  const normalizeSrc = (p) => {
    if (!p) return 'images/placeholder.svg';
    // 去掉所有前导 ./ 或 ../
    while (p.startsWith('../')) p = p.slice(3);
    if (p.startsWith('./')) p = p.slice(2);
    // 统一前缀
    if (!p.startsWith('images/')) p = 'images/' + p.replace(/^images\//, '');
    return p;
  };

  // 3) 渲染卡片
  const makeCard = (item, idx) => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    const first = (item.images && item.images[0] && item.images[0].src) || '';
    img.src = normalizeSrc(first);
    img.alt = item.title || 'preview';
    img.loading = 'lazy';
    img.onerror = () => { img.onerror = null; img.src = 'images/placeholder.svg'; };

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
