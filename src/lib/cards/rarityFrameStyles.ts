import type { CardRarity } from "@/lib/collection/types";

export type RarityFrameLayout = "card" | "image";
export type RarityImageVariant = "compact" | "featured";

const shell: Record<CardRarity, { grad: string; shadow: string }> = {
  common: {
    grad: "bg-linear-to-br from-[#F3E8D8] to-[#C4A07A]",
    shadow:
      "shadow-[0_2px_10px_rgba(42,23,16,0.1),inset_0_1px_0_rgba(255,255,255,0.45)]",
  },
  uncommon: {
    grad: "bg-linear-to-br from-[#B5C4A0] to-[#4A5A38]",
    shadow:
      "shadow-[0_2px_12px_rgba(60,80,45,0.18),0_0_18px_rgba(100,120,70,0.12),inset_0_1px_0_rgba(255,255,255,0.25)]",
  },
  rare: {
    grad: "bg-linear-to-br from-[#7DD3FC] via-[#FDE047] to-[#2563EB]",
    shadow: "shadow-[0_4px_20px_rgba(37,99,235,0.22),0_0_24px_rgba(59,130,246,0.12)]",
  },
  signature: {
    grad: "bg-linear-to-br from-[#E9D5FF] via-[#FCD34D] to-[#7C3AED]",
    shadow:
      "shadow-[0_6px_26px_rgba(124,58,237,0.28),0_0_32px_rgba(192,132,252,0.15)]",
  },
  legendary: {
    grad: "bg-linear-to-br from-[#FFFBF0] via-[#FCD34D] to-[#B45309]",
    shadow:
      "shadow-[0_8px_32px_rgba(180,83,9,0.32),0_0_40px_rgba(251,191,36,0.22),inset_0_0_0_1px_rgba(255,255,255,0.35)]",
  },
};

const shapeByLayout: Record<RarityFrameLayout, Record<RarityImageVariant, string>> = {
  card: {
    compact: "p-[2px] rounded-2xl",
    featured: "p-[2px] rounded-2xl",
  },
  image: {
    compact: "p-[2px] rounded-xl",
    featured: "p-[2.5px] rounded-2xl",
  },
};

const innerRadius: Record<RarityFrameLayout, Record<RarityImageVariant, string>> = {
  card: {
    compact: "rounded-[13px]",
    featured: "rounded-[13px]",
  },
  image: {
    compact: "rounded-[10px]",
    featured: "rounded-[13px]",
  },
};

const lockedModifier = "saturate-[0.68] opacity-[0.9]";
const selectedModifier =
  "ring-2 ring-amber-300/90 ring-offset-2 ring-offset-[#FFF2D7]";
const legendaryLockedExtra = "shadow-[0_0_28px_rgba(99,102,241,0.2)]";

export function getRarityFrameOuterClass(
  rarity: CardRarity,
  options: {
    locked?: boolean;
    selected?: boolean;
    layout: RarityFrameLayout;
    imageVariant?: RarityImageVariant;
  },
): string {
  const { locked, selected, layout, imageVariant = "featured" } = options;
  const s = shell[rarity];
  const shape = shapeByLayout[layout][imageVariant];
  const parts = [shape, s.grad, s.shadow];
  if (locked) {
    parts.push(lockedModifier);
    if (rarity === "legendary") parts.push(legendaryLockedExtra);
  }
  if (selected) parts.push(selectedModifier);
  return parts.join(" ");
}

export function getRarityFrameInnerClass(options: {
  layout: RarityFrameLayout;
  imageVariant?: RarityImageVariant;
}): string {
  const { layout, imageVariant = "featured" } = options;
  return [
    "relative overflow-hidden min-h-0 bg-[#FFF2D7]/70",
    innerRadius[layout][imageVariant],
  ].join(" ");
}

export const legendaryShimmerLayerClass =
  "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] rarity-legendary-shimmer";
