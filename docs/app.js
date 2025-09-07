// docs/app.js  —— drop-in 替换版
// 功能：从 ./cases.json 渲染卡片；图片先尝试加载本地 docs/images/...，失败则自动回退到上游公共镜像库的 RAW 图片。
// 这样即便你本地没放图，页面也能显示真实图片；以后你把图补进 docs/images/samples/ 就会优先用本地图。

(async () => {
  const GRID_ID = "grid";
  const SEARCH_ID = "search";
  const LOCAL_PREFIX = "./images/samples";
  const REMOTE_PREFIX = "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/samples";

  // 读取数据
  const res = await fetch("./cases.json");
  const all = await res.json();

  // 简单兜底：id/slug 解析
  const getSlug = (item, idx) => {
    if (item.id) return String(item.id);
    // 兼容从 images[].src 中抽 slug
    if (Array.isArray(item.images) && item.images.length) {
      const m = String(item.images[0].src || "").match(/([A-Za-z0-9_-]+)-(before|after)\.png/);
      if (m) return m[1];
    }
    // 最后兜底 caseNN
    const n = String(idx + 1).padStart(2, "0");
    return `case${n}`;
  };

  // 渲染卡片
  const grid = document.getElementById(GRID_ID);
  grid.innerHTML = "";

  all.forEach((item, idx) => {
    const slug = getSlug(item, idx);

    const card = document.createElement("div");
    card.className = "card";
    card.dataset.tags = (item.tags || []).join(" ").toLowerCase();
    card.dataset.title = (item.title || `Showcase ${idx + 1}`).toLowerCase();

    // 预览图：优先 after
    const img = document.createElement("img");
    img.alt = "preview";

    const localAfter = `${LOCAL_PREFIX}/${slug}-after.png`;
    const remoteAfter = `${REMOTE_PREFIX}/${slug}-after.png`;

    // 先尝试本地，失败则回退远程
    img.src = localAfter;
    img.onerror = () => {
      img.onerror = null; // 防止循环
      img.src = remoteAfter;
    };

    const title = document.createElement("h3");
    title.textContent = item.title || `Showcase ${idx + 1}`;

    // 简单标签
    const badges = document.createElement("div");
    badges.className = "badges";
    const tagList = item.tags && item.tags.length ? item.tags : ["demo", "nbg"];
    tagList.forEach(t => {
      const b = document.createElement("span");
      b.className = "badge";
      b.textContent = t;
      badges.appendChild(b);
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(badges);
    grid.appendChild(card);
  });

  // 简单搜索（标题/标签）
  const search = document.getElementById(SEARCH_ID);
  if (search) {
    search.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      Array.from(grid.children).forEach(card => {
        const hay = (card.dataset.title + " " + card.dataset.tags);
        card.style.display = hay.includes(q) ? "" : "none";
      });
    });
  }
})();
