# Awesome Nano-Banana 🍌 — Guides & Images

[![Stars](https://img.shields.io/github/stars/ruifengzhaomail/Awesome-Nano-Banana-Guides-and-Images?style=flat-square)](https://github.com/ruifengzhaomail/Awesome-Nano-Banana-Guides-and-Images/stargazers)
[![Forks](https://img.shields.io/github/forks/ruifengzhaomail/Awesome-Nano-Banana-Guides-and-Images?style=flat-square)](https://github.com/ruifengzhaomail/Awesome-Nano-Banana-Guides-and-Images/fork)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue?style=flat-square)](LICENSE)
[![Data License](https://img.shields.io/badge/data-CC%20BY%204.0-green?style=flat-square)](LICENSE)

Curated **cases / prompts / comparisons** around *Nano-banana (Gemini 2.5 Flash Image)*.  
This repo ships **structured data (JSON)**, a **prompt pack**, and a **GitHub Pages gallery**.

> Non-official project. “Nano-banana” is a community nickname of *Gemini 2.5 Flash Image*.  
> Official entry points are Gemini app/web and AI Studio.

## 🚀 Quick Links
- **Gallery:** **https://ruifengzhaomail.github.io/Awesome-Nano-Banana-Guides-and-Images/**
- **Prompt pack:** [`/prompts/NB-100-Prompts.txt`](prompts/NB-100-Prompts.txt)
- **Structured data:** [`/data/cases.json`](data/cases.json)
- **Homepage (CN):** https://nanobananaguide.ai

## 💡 Why this repo?
- People searching “nano banana” want **copy-ready examples and prompts**, not ads.  
- All entries live in `data/cases.json` so developers/media can **reuse** them easily.  
- The gallery (GitHub Pages) is **zero-backend** and updates automatically on push.

## 📦 What’s inside
```
.
├─ data/
│  └─ cases.json          # Structured cases (ZH/EN prompts, tags, images, links)
├─ docs/                  # GitHub Pages gallery (reads docs/cases.json)
│  ├─ index.html
│  ├─ styles.css
│  └─ app.js
├─ images/samples/        # Placeholder images (Before/After)
├─ prompts/
│  └─ NB-100-Prompts.txt  # Prompt pack (ZH/EN)
├─ .github/
│  ├─ workflows/pages-sync.yml   # Sync data/cases.json → docs/cases.json on push
│  └─ ISSUE/PR templates
├─ README.md              # Chinese README
├─ README_en.md           # This file
├─ CONTRIBUTING.md
└─ LICENSE
```

## 🧱 Data schema (excerpt)
Each item in `data/cases.json`:
```json
{
  "id": "unique-slug",
  "title": "Short title",
  "task": "consistency|fusion|editing|ecommerce|space|pet|portrait|other",
  "prompt_zh": "中文 Prompt",
  "prompt_en": "English prompt",
  "author": "your-name or source handle",
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
> If you don’t own the image rights, **do not mirror** files. Use external links with author credit.

## 🙌 Contributing
We welcome PRs!
1. Fork → create a branch.  
2. Append your entry to [`data/cases.json`](data/cases.json) following the schema above.  
   - If you own the images, put them under `images/<your-folder>/...`.  
   - Otherwise **link externally** and credit the author in `refs`.  
3. Open a Pull Request. The gallery updates automatically after merge.

## 🔄 Updates & Releases
- We periodically publish releases with updated datasets and prompts.  
- Changelog lives in the **Releases** tab (e.g. `v0.1.0: 20 initial cases + gallery + NB-100 prompts`).

## 🗺️ Roadmap
- [ ] Grow to 100+ structured cases (multi-domain, bilingual).  
- [ ] Tag-based filters and sorting in the gallery.  
- [ ] Weekly digest that highlights new/updated entries.  
- [ ] More comparison sheets (Flux/GPT-Image/etc).

## ⚖️ License
- **Code & config:** [Apache-2.0](LICENSE)  
- **Data (cases.json) & docs:** **CC BY 4.0**  
- **Images:** Follow per-file notices; for third-party content, keep external links only.

## 🙏 Credits
Thanks to the community for sharing prompts and cases.  
Questions or suggestions? Open an [Issue](../../issues) or start a [Discussion](../../discussions).
