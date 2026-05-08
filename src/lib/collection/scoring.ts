import type { CardRarity, CollectionCard, ThemeId, UserCardState, UserThemeState } from "./types";

const rarityScore: Record<CardRarity, number> = {
  common: 10,
  uncommon: 25,
  rare: 60,
  signature: 150,
  legendary: 400,
};

const starMultiplier: Record<number, number> = {
  1: 1.0,
  2: 1.2,
  3: 1.5,
  4: 2.0,
  5: 3.0,
};

export function scoreCardRarity(rarity: CardRarity): number {
  return rarityScore[rarity] ?? 0;
}

export function scoreCard(card: CollectionCard, cardState?: UserCardState): number {
  const base = scoreCardRarity(card.rarity);
  const star = cardState?.star ?? 1;
  const mult = starMultiplier[star] ?? 1.0;
  return Math.round(base * mult);
}

export function getThemeCollectionScore(
  themeState: UserThemeState,
  themeId: ThemeId,
  allCards: readonly CollectionCard[],
): number {
  return allCards.reduce((acc, c) => {
    if (c.themeId !== themeId) return acc;
    const cs = themeState.cardStates[c.id];
    if (!cs?.owned) return acc;
    return acc + scoreCard(c, cs);
  }, 0);
}

