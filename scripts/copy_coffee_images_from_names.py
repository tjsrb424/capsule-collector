"""nameKo.png -> beverageId.png 복사 (대상이 없을 때만). 원본 한글 파일 유지."""
from __future__ import annotations

import csv
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TSV = Path(__file__).with_name("coffee2048.tsv")
FINAL = ROOT / "public" / "assets" / "cards" / "coffee" / "final"


def main() -> None:
    copied: list[tuple[str, str]] = []
    skipped_existing: list[str] = []
    missing_ko: list[str] = []

    with TSV.open(encoding="utf-8") as f:
        reader = csv.reader(f, delimiter="\t")
        next(reader, None)
        for parts in reader:
            if not parts or all(not p.strip() for p in parts):
                continue
            while len(parts) < 12:
                parts.append("")
            bid = parts[3].strip()
            name_ko = parts[4].strip()
            dest = FINAL / f"{bid}.png"
            if dest.is_file():
                skipped_existing.append(bid)
                continue
            src = FINAL / f"{name_ko}.png"
            if src.is_file():
                shutil.copy2(src, dest)
                copied.append((name_ko, bid))
            else:
                missing_ko.append(bid)

    print("copied_count", len(copied))
    print("skipped_existing_dest", len(skipped_existing))
    print("missing_korean_source_for", len(missing_ko))


if __name__ == "__main__":
    main()
