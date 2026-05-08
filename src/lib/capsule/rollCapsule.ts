import type { CapsuleConfig, CollectionCard, ThemeId } from "@/lib/collection/types";
import { getLowerOrEqualRarities, rollRarity } from "./dropRates";

export type RollCapsuleInput = {
  capsule: CapsuleConfig;
  cards: readonly CollectionCard[];
  rng?: () => number;
};

export type RollCapsuleOutput = {
  themeId: ThemeId;
  capsuleId: string;
  rolledRarity: CollectionCard["rarity"];
  card: CollectionCard;
};

function pickOne<T>(arr: readonly T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)]!;
}

export function rollCapsule({
  capsule,
  cards,
  rng = Math.random,
}: RollCapsuleInput): RollCapsuleOutput {
  const themeCards = cards.filter((c) => c.themeId === capsule.themeId);
  if (themeCards.length === 0) {
    throw new Error(`No cards for themeId=${capsule.themeId}`);
  }

  const rolled = rollRarity(capsule.dropRates, rng);
  const fallbackRarities = getLowerOrEqualRarities(rolled);

  for (const rarity of fallbackRarities) {
    const pool = themeCards.filter((c) => c.rarity === rarity);
    if (pool.length > 0) {
      return {
        themeId: capsule.themeId,
        capsuleId: capsule.id,
        rolledRarity: rarity,
        card: pickOne(pool, rng),
      };
    }
  }

  // Safety fallback
  return {
    themeId: capsule.themeId,
    capsuleId: capsule.id,
    rolledRarity: "common",
    card: pickOne(themeCards, rng),
  };
}

