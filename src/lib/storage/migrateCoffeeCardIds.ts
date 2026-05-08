import type { UserThemeState } from "@/lib/collection/types";

/** 예전 placeholder 카드 id (`coffee_009` …) — 실제 beverageId로 교체되며 저장된 상태와 호환 */
const LEGACY_COFFEE_PLACEHOLDER_ID = /^coffee_\d{3}$/;

/**
 * 로컬 저장에 남아 있는 placeholder 카드 보유 기록을 제거한다.
 * (새 카드 id와 매핑 불가 — 중복·유령 카드 방지)
 */
export function migrateLegacyCoffeePlaceholderIds(theme: UserThemeState): UserThemeState {
  if (theme.themeId !== "coffee") return theme;

  let changed = false;
  const cardStates = { ...theme.cardStates };
  for (const cardId of Object.keys(cardStates)) {
    if (LEGACY_COFFEE_PLACEHOLDER_ID.test(cardId)) {
      delete cardStates[cardId];
      changed = true;
    }
  }

  let representativeCardId = theme.representativeCardId;
  if (representativeCardId && LEGACY_COFFEE_PLACEHOLDER_ID.test(representativeCardId)) {
    representativeCardId = undefined;
    changed = true;
  }

  if (!changed) return theme;
  return { ...theme, cardStates, representativeCardId };
}
