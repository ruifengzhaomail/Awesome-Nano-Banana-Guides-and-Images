(async function () {
  const grid = document.getElementById('grid');
  const q = document.getElementById('q');
  const msg = document.getElementById('msg');

  const HERE = window.location.pathname.replace(/\/[^/]*$/, '/'); // /docs/
  const DATA_URL = HERE + 'cases.json';                            // /docs/cases.json

  // 解析不同结构为数组
  function normalizeDataset(raw) {
    try {
      if (typeof raw === 'string') raw = JSON.parse(raw);
    } catch (e) {
      return [];
    }
    if (Array.isArray(raw)) return raw;
    if (raw && Array.isArray(raw.cases)) return raw.cases;
    if (raw && Array.isArray(raw.items)) return raw.items;
    if (raw && typeof raw === 'object') return Object.values(raw);
    return [];
  }

  const resolveSrc = (src) => {
    if (!src) return '';
    if (/^https?:\/\//i.test(src)) return src;            // 绝对地址
    return HERE + src.replace(/^\.?\/*/, '');             // 相对 /docs/
  };

  const render = (items) => {
    grid.innerHTML = '';
    if (!items.length) {
      const empty = document.createElement('p');
      empty.className = 'muted';
      empty.textContent = '没有数据（cases.json 为空或筛选无结果）。';
      grid.appendChild(empty);
      return;
    }

    for (const it of items) {
      const card = document.createElement('article');
      card.className = 'card';

      const img = document.createElement('img');
      img.className = 'thumb';
      img.loading = 'lazy';
      img.alt = it.title || it.id || 'preview';

      const imgField = (it.images && it.images[0] && it.images[0].src) || it.image || it.cover || '';
      img.src = resolveSrc(imgField);

      img.onerror = () => {
        img.style.background =
          '#f3f3f3 url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22100%22><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2212%22 fill=%23999%22>image pending</text></svg>") no-repeat center/contain';
        img.src = '';
      };

      const body = document.createElement('div');
      body.className = 'body';

      const h3 = document.createElement('h3');
      h3.textContent = it.title || (it.id ? `Showcase ${it.id}` : 'Showcase');
      body.appendChild(h3);

      const tags = document.createElement('div');
      tags.className = 'tags';
      (it.tags || []).slice(0, 6).forEach(t => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = t;
        tags.appendChild(span);
      });
      body.appendChild(tags);

      card.appendChild(img);
      card.appendChild(body);
      grid.appendChild(card);
    }
  };

  let items = [];
  try {
    const res = await fetch(DATA_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    items = normalizeDataset(text);
    if (!items.length) throw new Error('cases.json 不是数组 / 无有效条目');
  } catch (e) {
    msg.classList.remove('hide');
    msg.textContent = `读取数据失败： ${e.message}。请检查 docs/cases.json 是否存在且为有效 JSON。`;
    console.error(e);
    items = [];
  }

  const normalize = s => (s || '').toString().toLowerCase();
  render(items);

  q.addEventListener('input', () => {
    const kw = normalize(q.value);
    if (!kw) return render(items);
    const view = items.filter(it => {
      const bag = [
        it.id, it.title, it.prompt_zh, it.prompt_en,
        ...(it.tags || [])
      ].map(normalize).join(' ');
      return bag.includes(kw);
    });
    render(view);
  });
})();
