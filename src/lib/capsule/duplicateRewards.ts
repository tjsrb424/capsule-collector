import type { CardRarity, DuplicateReward } from "@/lib/collection/types";

export function getDuplicateReward(rarity: CardRarity): DuplicateReward {
  switch (rarity) {
    case "common":
      return { type: "coffeePowder", amount: 5 };
    case "uncommon":
      return { type: "coffeePowder", amount: 12 };
    case "rare":
      return { type: "coffeePowder", amount: 35 };
    case "signature":
      return { type: "signatureShard", amount: 1 };
    case "legendary":
      return { type: "legendaryBeanShard", amount: 1 };
  }
}

