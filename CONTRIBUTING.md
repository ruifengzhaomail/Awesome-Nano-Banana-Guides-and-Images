
# Contributing Guide

## Add a case
Append an object into `data/cases.json`:

```json
{
  "id": "unique-slug",
  "title": "Short title",
  "task": "consistency|fusion|editing|ecommerce|space|pet|portrait|other",
  "prompt_zh": "中文 Prompt",
  "prompt_en": "English prompt",
  "author": "name or source handle",
  "license": "CC BY 4.0 / Apache-2.0 / External link",
  "refs": ["https://link.to/original/post"],
  "images": [
    {"src": "images/samples/slug-before.png", "alt": "before", "type": "before"},
    {"src": "images/samples/slug-after.png", "alt": "after", "type": "after"}
  ],
  "tags": ["portrait","cafe","warm light"]
}
```

- If you **own** the images, you may add them to `images/...`.
- For third‑party images, **do not upload**; use external links only.
