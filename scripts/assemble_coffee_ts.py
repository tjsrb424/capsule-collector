from pathlib import Path

base = Path(r"d:\kim_dev\capsule-collector")
snippet = (base / "scripts" / "_coffee_cards_snippet.txt").read_text(encoding="utf-8")
header = '''import type { CollectionCard } from "@/lib/collection/types";

/** Coffee 2048 레시피 80종 (`scripts/coffee2048.tsv` 기준 생성) */
export const coffeeCards: readonly CollectionCard[] = [
'''
footer = "\n] as const;\n"
out = base / "src" / "data" / "themes" / "coffee" / "coffeeCards.ts"
out.write_text(header + snippet + footer, encoding="utf-8")
print("wrote", out, "chars", out.stat().st_size)
