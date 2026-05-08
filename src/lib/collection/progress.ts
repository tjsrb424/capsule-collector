import type { CollectionCard, ThemeId, UserThemeState } from "./types";

export type ThemeProgress = {
  themeId: ThemeId;
  ownedCount: number;
  totalCount: number;
  completionRate: number; // 0..1
};

export function getThemeProgress(
  themeState: UserThemeState,
  themeId: ThemeId,
  allCards: readonly CollectionCard[],
): ThemeProgress {
  const themeCards = allCards.filter((c) => c.themeId === themeId);
  const ownedCount = themeCards.reduce((acc, c) => {
    const owned = themeState.cardStates[c.id]?.owned;
    return acc + (owned ? 1 : 0);
  }, 0);
  const totalCount = themeCards.length;
  const completionRate = totalCount === 0 ? 0 : ownedCount / totalCount;
  return { themeId, ownedCount, totalCount, completionRate };
}

