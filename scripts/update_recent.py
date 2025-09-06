#!/usr/bin/env python3
import json, datetime, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parents[1]
data_path = ROOT / "data" / "cases.json"
readme_path = ROOT / "README.md"

RECENT_START = "<!-- RECENT_START -->"
RECENT_END   = "<!-- RECENT_END -->"

def load_items():
    with open(data_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data.get("items", [])

def render_recent(items):
    today = datetime.date.today()
    week_ago = today - datetime.timedelta(days=7)
    recent = [x for x in items if "added_at" in x]
    def parse(d):
        try:
            return datetime.date.fromisoformat(d)
        except:
            return datetime.date(1970,1,1)
    recent = [x for x in recent if parse(x["added_at"]) >= week_ago]
    recent.sort(key=lambda x: x.get("added_at",""), reverse=True)
    if not recent:
        return "最近 7 天暂无新增条目。欢迎 PR ～"
    lines = []
    for x in recent[:20]:
        title = x.get("title","")
        slug = x.get("id","")
        date = x.get("added_at","")
        lines.append(f"- {date} · **{title}** (`{slug}`)")
    return "\n".join(lines)

def inject_block(md, block):
    start = md.find(RECENT_START)
    end = md.find(RECENT_END)
    template = f"{RECENT_START}\n{block}\n{RECENT_END}"
    if start == -1 or end == -1 or end < start:
        # append to bottom
        return md.rstrip() + "\n\n## 🆕 最近 7 天新增\n\n" + template + "\n"
    return md[:start] + template + md[end+len(RECENT_END):]

def main():
    items = load_items()
    block = render_recent(items)
    if not readme_path.exists():
        raise SystemExit("README.md not found")
    md = readme_path.read_text(encoding="utf-8")
    md2 = inject_block(md, block)
    if md2 != md:
        readme_path.write_text(md2, encoding="utf-8")
        print("README.md updated with recent block.")
    else:
        print("No change.")

if __name__ == "__main__":
    main()
