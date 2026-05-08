import csv
import json
from pathlib import Path

path = Path(__file__).with_name("coffee2048.tsv")
rows: list[list[str]] = []
with path.open(encoding="utf-8") as f:
    reader = csv.reader(f, delimiter="\t")
    _header = next(reader, None)
    for parts in reader:
        if not parts or all(not p.strip() for p in parts):
            continue
        while len(parts) < 12:
            parts.append("")
        rows.append(parts[:12])

assert len(rows) == 80, len(rows)
assert len({x[3] for x in rows}) == 80, "duplicate beverageId"

TIME = {"morning", "day", "evening", "night"}
CATALOG_HINT = "현재 도감만 존재"


def normalize_row(parts: list[str]) -> list[str]:
    """shopAvailability 칸이 비고 recipeKind에 도감 안내 문구가 들어간 행을 고친다."""
    while len(parts) < 12:
        parts.append("")
    if not parts[11].strip() and parts[10].strip() == CATALOG_HINT:
        parts[11] = parts[10]
        parts[10] = ""
    return parts[:12]


rows = [normalize_row(list(p)) for p in rows]


def j(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def main() -> None:
    lines: list[str] = []
    for p in rows:
        bid = p[3]
        tl = p[8].strip()
        rid = p[9].strip()
        rk = p[10].strip()
        sa = p[11].strip()
        opt: list[str] = []
        if tl in TIME:
            opt.append(f'    timeLimited: {j(tl)} as const,')
        if rid and rid != CATALOG_HINT:
            opt.append(f"    sourceRecipeId: {j(rid)},")
        if rk and rk != CATALOG_HINT:
            opt.append(f"    sourceRecipeKind: {j(rk)},")
        if sa:
            opt.append(f"    sourceShopAvailability: {j(sa)},")
        opt_block = "\n".join(opt)
        head = f"""  {{
    id: {j(bid)},
    themeId: "coffee",
    categoryId: {j(p[1])},
    categoryTitleKo: {j(p[2])},
    nameKo: {j(p[4])},
    description: {j(p[5])},
    rarity: {j(p[6])} as const,
    unlockLevel: {int(p[7])},"""
        tail = f"""
    sourceGame: "coffee2048",
    imagePath: {j(f"/assets/cards/coffee/final/{bid}.png")},
  }},"""
        if opt_block:
            block = head + "\n" + opt_block + "\n" + tail.lstrip("\n")
        else:
            block = head + tail
        lines.append(block)

    out = Path(__file__).with_name("_coffee_cards_snippet.txt")
    out.write_text("\n".join(lines), encoding="utf-8")
    print("ok", len(rows), "bytes", out.stat().st_size)


if __name__ == "__main__":
    main()
