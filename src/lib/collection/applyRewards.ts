import type { DuplicateReward, UserThemeState } from "@/lib/collection/types";

export function applyDuplicateReward(
  themeState: UserThemeState,
  reward: DuplicateReward,
): UserThemeState {
  switch (reward.type) {
    case "coffeePowder":
      return { ...themeState, coffeePowder: (themeState.coffeePowder ?? 0) + reward.amount };
    case "signatureShard":
      return {
        ...themeState,
        signatureShard: (themeState.signatureShard ?? 0) + reward.amount,
      };
    case "legendaryBeanShard":
      return {
        ...themeState,
        legendaryBeanShard: (themeState.legendaryBeanShard ?? 0) + reward.amount,
      };
  }
}

