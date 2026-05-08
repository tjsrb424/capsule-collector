import type { CardRarity } from "@/lib/collection/types";

const rarityOrder: readonly CardRarity[] = [
  "legendary",
  "signature",
  "rare",
  "uncommon",
  "common",
] as const;

export function rollRarity(
  dropRates: Partial<Record<CardRarity, number>>,
  rng: () => number = Math.random,
): CardRarity {
  const entries = rarityOrder
    .map((rarity) => [rarity, dropRates[rarity] ?? 0] as const)
    .filter(([, weight]) => weight > 0);

  // Fallback: if misconfigured, default to common.
  if (entries.length === 0) return "common";

  const total = entries.reduce((acc, [, w]) => acc + w, 0);
  const r = rng() * total;

  let cursor = 0;
  for (const [rarity, w] of entries) {
    cursor += w;
    if (r <= cursor) return rarity;
  }
  return entries[entries.length - 1]![0];
}

export function getLowerOrEqualRarities(rarity: CardRarity): CardRarity[] {
  const idx = rarityOrder.indexOf(rarity);
  if (idx === -1) return [...rarityOrder];
  return rarityOrder.slice(idx);
}

