# Nano-banana 🍌 精选案例与指引

[![Stars](https://img.shields.io/github/stars/ruifengzhaomail/Awesome-Nano-Banana-Guides-and-Images?style=flat-square)](../../stargazers)
[![Forks](https://img.shields.io/github/forks/ruifengzhaomail/Awesome-Nano-Banana-Guides-and-Images?style=flat-square)](../../fork)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue?style=flat-square)](LICENSE)
[![Data](https://img.shields.io/badge/data-CC%20BY%204.0-green?style=flat-square)](LICENSE)

> **非官方**社区整理。聚合 *Nano-banana（Gemini 2.5 Flash Image）* 的 **结构化案例 / 提示词 / 对比**，配套 **Prompt 包** 与 **GitHub Pages 图库**（零后端，提交即更新）。

**主站**：https://nanobananaguide.ai  
**图库**：**https://ruifengzhaomail.github.io/Awesome-Nano-Banana-Guides-and-Images/**

---

# Awesome Nano-Banana 🍌 — Guides & Images

精选 **Nano-banana（Gemini 2.5 Flash Image）** 的案例、提示词与对比信息。  
本仓库收录 **结构化案例（JSON）** + **可复用 Prompt 包（中英）** + **GitHub Pages 图库**。

站点指引：**https://nanobananaguide.ai**（非 Google 官方）  
English README → [`README_en.md`](README_en.md)

License：Apache-2.0 · Data：CC BY 4.0

## ✨ 为什么做这个库？
- 搜索者需要**能复制的案例与提示词**；
- 所有条目都进入 `data/cases.json`，便于二次利用；
- 提交即更新（GitHub Pages 零后端）。欢迎 PR（见《CONTRIBUTING.md》）。

## 🚀 快速开始
- **Gallery**：**https://ruifengzhaomail.github.io/Awesome-Nano-Banana-Guides-and-Images/**  
- **Prompt 包**：[`/prompts/NB-100-Prompts.txt`](prompts/NB-100-Prompts.txt)  
- **结构化数据**：[`/data/cases.json`](data/cases.json)

## 📦 仓库结构
```
.
├─ data/
│  └─ cases.json          # 结构化案例（中英 prompt、标签、图片、外链、added_at）
├─ docs/                  # GitHub Pages 图库（读取 docs/cases.json）
│  ├─ index.html
│  ├─ styles.css
│  └─ app.js
├─ images/samples/        # 占位示例（Before/After）
├─ prompts/
│  └─ NB-100-Prompts.txt  # Prompt 包（中/英）
├─ .github/
│  ├─ workflows/pages-sync.yml   # push 后同步 data/cases.json → docs/cases.json
│  └─ workflows/update-recent.yml# 自动更新“最近 7 天新增”区块（可选）
├─ scripts/update_recent.py      # 生成最近 7 天新增区块
├─ README.md               # 中文首页（本文件）
├─ README_en.md            # 英文首页
├─ CONTRIBUTING.md
└─ LICENSE
```

## 🧱 数据 Schema（节选）
每条 `data/cases.json` 项：
```json
{
  "id": "unique-slug",
  "title": "标题",
  "task": "consistency|fusion|editing|ecommerce|space|pet|portrait|other",
  "prompt_zh": "中文 Prompt",
  "prompt_en": "English prompt",
  "author": "作者或来源",
  "license": "CC BY 4.0 / Apache-2.0 / External link",
  "refs": ["https://link.to/original/post"],
  "images": [
    {"src": "images/samples/slug-before.png", "alt": "before", "type": "before"},
    {"src": "images/samples/slug-after.png",  "alt": "after",  "type": "after"}
  ],
  "tags": ["portrait","cafe","warm light"],
  "added_at": "YYYY-MM-DD"
}
```
> 无版权的图片**不要镜像**，只放外链并注明作者出处。

## 🙌 如何贡献
1. Fork → 新建分支；  
2. 按上面 Schema 往 [`data/cases.json`](data/cases.json) 追加条目；  
   - 自有图片：放到 `images/<你的目录>/...`；  
   - 不是你的：**仅放外链**，并在 `refs` 署名；  
3. 提 PR；合并后图集自动更新。

## 🔄 更新与发布
- 定期发 Release（数据集 + Prompt）；
- 变更记录见 **Releases**（如 `v0.1.0: 20 条案例 + 图库 + NB-100 prompts`）。

## 🗺️ Roadmap
- [ ] 扩至 100+ 结构化案例（多领域、双语）；  
- [ ] 图库支持按标签筛选 / 排序；  
- [ ] 每周自动生成“新增摘要”；  
- [ ] 增加 Flux / GPT-Image 等对比页。

## ⚖️ 许可
- **代码/配置**：Apache-2.0  
- **数据（cases.json）/文档**：CC BY 4.0  
- **图片**：按各自声明；第三方内容仅保留外链。

## 🙏 致谢
感谢社区分享案例与提示词。  
问题/建议：开一个 [Issue](../../issues) 或发起 [Discussion](../../discussions)。

## 🆕 最近 7 天新增
<!-- RECENT_START -->
（首次运行自动脚本后，这里会写入最近 7 天的新增清单。）
<!-- RECENT_END -->
