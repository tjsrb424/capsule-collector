import type { CollectionCard, ThemeId, UserCardState, UserThemeState } from "./types";
import { computeStarFromCount } from "./stars";

export function ensureUserThemeState(themeId: ThemeId): UserThemeState {
  return {
    themeId,
    cardStates: {},
    totalOpened: 0,
    dailyAdOpenCount: 0,
    dailyAdRewardDoubleCount: 0,
    lastAdDate: undefined,
  };
}

export function getCardState(
  themeState: UserThemeState,
  cardId: string,
): UserCardState | undefined {
  return themeState.cardStates[cardId];
}

export function grantCardToTheme(
  themeState: UserThemeState,
  card: CollectionCard,
  acquiredAt: number,
): { nextThemeState: UserThemeState; isNew: boolean } {
  const prev = themeState.cardStates[card.id];
  const isNew = !prev?.owned;

  const nextCount = (prev?.count ?? 0) + 1;
  const nextStar = computeStarFromCount(nextCount);

  const nextCardState: UserCardState = {
    cardId: card.id,
    owned: true,
    count: nextCount,
    star: nextStar,
    firstAcquiredAt: prev?.firstAcquiredAt ?? acquiredAt,
    lastAcquiredAt: acquiredAt,
  };

  return {
    nextThemeState: {
      ...themeState,
      cardStates: { ...themeState.cardStates, [card.id]: nextCardState },
      totalOpened: themeState.totalOpened + 1,
      lastOpenedAt: acquiredAt,
    },
    isNew,
  };
}

