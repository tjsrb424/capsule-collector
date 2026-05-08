import type { CapsuleConfig, CapsuleOpenResult, CollectionCard, LocalCollectionSave, ThemeId } from "@/lib/collection/types";
import { getDuplicateReward } from "@/lib/capsule/duplicateRewards";
import { rollCapsule } from "@/lib/capsule/rollCapsule";
import { applyDuplicateReward } from "@/lib/collection/applyRewards";
import { ensureUserThemeState, grantCardToTheme } from "@/lib/collection/ownership";

export function openCapsuleOncePure(
  save: LocalCollectionSave,
  capsule: CapsuleConfig,
  cards: readonly CollectionCard[],
  rng: () => number = Math.random,
): { nextSave: LocalCollectionSave; result: CapsuleOpenResult } {
  const openedAt = Date.now();
  const rolled = rollCapsule({ capsule, cards, rng });

  const themeId: ThemeId = capsule.themeId;
  const prevThemeState = save.themes[themeId] ?? ensureUserThemeState(themeId);

  const { nextThemeState: afterGrant, isNew } = grantCardToTheme(
    prevThemeState,
    rolled.card,
    openedAt,
  );

  const dupReward = getDuplicateReward(rolled.card.rarity);
  const afterRewards = isNew ? afterGrant : applyDuplicateReward(afterGrant, dupReward);
  const duplicateReward = isNew ? undefined : dupReward;

  const nextSave: LocalCollectionSave = {
    ...save,
    version: 1,
    themes: { ...save.themes, [themeId]: afterRewards },
    selectedThemeId: save.selectedThemeId ?? themeId,
    createdAt: save.createdAt ?? openedAt,
    updatedAt: openedAt,
  };

  const result: CapsuleOpenResult = {
    themeId,
    capsuleId: capsule.id,
    rolledRarity: rolled.rolledRarity,
    card: rolled.card,
    isNew,
    duplicateReward,
    openedAt,
  };

  return { nextSave, result };
}

