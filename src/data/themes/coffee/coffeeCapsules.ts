import type { CapsuleConfig } from "@/lib/collection/types";

export const coffeeCapsules: readonly CapsuleConfig[] = [
  {
    id: "coffee_basic_capsule",
    themeId: "coffee",
    nameKo: "기본 커피 캡슐",
    dropRates: {
      common: 58,
      uncommon: 28,
      rare: 12,
      signature: 1.8,
      legendary: 0.2,
    },
  },
  {
    id: "coffee_ad_bonus_capsule",
    themeId: "coffee",
    nameKo: "광고 보너스 커피 캡슐",
    dropRates: {
      common: 45,
      uncommon: 32,
      rare: 18,
      signature: 4.5,
      legendary: 0.5,
    },
    dailyAdLimit: 10,
  },
] as const;

export const coffeeBasicCapsule = coffeeCapsules[0];
export const coffeeAdBonusCapsule = coffeeCapsules[1];

