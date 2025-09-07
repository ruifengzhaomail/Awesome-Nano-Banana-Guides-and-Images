// docs/app.js
const PLACEHOLDER = "https://placehold.co/960x600?text=image+pending";
const FALLBACKS = [
  // 来自 PicoTrex/Awesome-Nano-Banana-images（稳定 raw 图）
  "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case1/output0.jpg",
  "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case2/output0.jpg",
  "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case3/output0.jpg",
  "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case4/output0.jpg",
  "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case5/output0.jpg",
  "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case6/output0.jpg",
  "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case7/output0.jpg",
  "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case8/output0.jpg",
  "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case9/output0.jpg",
  "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case10/output0.jpg",
  "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case11/output0.jpg",
  "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case12/output0.jpg"
];

async function loadCases() {
  const tryUrls = ["./cases.json", "../data/cases.json"]; // 先读 docs，同步失败时读 data
  for (const u of tryUrls) {
    try {
      const r = await fetch(u, { cache: "no-store" });
      if (r.ok) return await r.json();
    } catch {}
  }
  return { cases: [] };
}

function cardTemplate(item, i) {
  const imgSrc =
    (item.images && item.images[0] && item.images[0].src) ||
    FALLBACKS[i % FALLBACKS.length] ||
    PLACEHOLDER;

  const tags = (item.tags || []).map(t => `<span class="tag">${t}</span>`).join("");

  return `
    <article class="card">
      <div class="thumb">
        <img src="${imgSrc}" alt="preview"
             onerror="this.onerror=null;this.src='${PLACEHOLDER}'" />
      </div>
      <div class="body">
        <h3 class="title">${item.title || item.id || "Showcase"}</h3>
        <div class="tags">${tags}</div>
      </div>
    </article>
  `;
}

function render(list) {
  const grid = document.getElementById("grid");
  grid.innerHTML = list.map(cardTemplate).join("");
}

function wireSearch(all) {
  const $s = document.getElementById("search");
  $s.addEventListener("input", () => {
    const q = $s.value.trim().toLowerCase();
    if (!q) return render(all);
    const filtered = all.filter(x => {
      const hay = `${x.title||""} ${x.prompt_en||""} ${x.prompt_zh||""} ${(x.tags||[]).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
    render(filtered);
  });
}

(async function () {
  const data = await loadCases();
  const items = Array.isArray(data) ? data : (data.cases || []);
  const normalized = items.map((x, i) => ({
    id: x.id || `case-${i+1}`,
    title: x.title || `Showcase ${i+1}`,
    tags: x.tags || ["demo","nbg"],
    images: x.images || []
  }));
  render(normalized);
  wireSearch(normalized);
})();
