import type { CardRarity, CollectionCard, CollectionCategory } from "@/lib/collection/types";

export type CoffeeDataValidationReport = {
  totalCards: number;
  totalCategories: number;
  perCategoryCounts: Record<string, number>;
  duplicateIds: string[];
  invalidRarities: Array<{ id: string; rarity: string }>;
  nonCoffeeThemeIds: Array<{ id: string; themeId: string }>;
  ok: boolean;
};

const validRarities: readonly CardRarity[] = [
  "common",
  "uncommon",
  "rare",
  "signature",
  "legendary",
] as const;

export function validateCoffeeData({
  cards,
  categories,
}: {
  cards: readonly CollectionCard[];
  categories: readonly CollectionCategory[];
}): CoffeeDataValidationReport {
  const ids = new Set<string>();
  const duplicateIds: string[] = [];
  for (const c of cards) {
    if (ids.has(c.id)) duplicateIds.push(c.id);
    ids.add(c.id);
  }

  const perCategoryCounts: Record<string, number> = {};
  for (const c of cards) {
    perCategoryCounts[c.categoryId] = (perCategoryCounts[c.categoryId] ?? 0) + 1;
  }

  const invalidRarities = cards
    .filter((c) => !validRarities.includes(c.rarity))
    .map((c) => ({ id: c.id, rarity: String(c.rarity) }));

  const nonCoffeeThemeIds = cards
    .filter((c) => c.themeId !== "coffee")
    .map((c) => ({ id: c.id, themeId: String(c.themeId) }));

  const ok =
    cards.length === 80 &&
    categories.length === 10 &&
    Object.values(perCategoryCounts).every((n) => n === 8) &&
    duplicateIds.length === 0 &&
    invalidRarities.length === 0 &&
    nonCoffeeThemeIds.length === 0;

  return {
    totalCards: cards.length,
    totalCategories: categories.length,
    perCategoryCounts,
    duplicateIds,
    invalidRarities,
    nonCoffeeThemeIds,
    ok,
  };
}

