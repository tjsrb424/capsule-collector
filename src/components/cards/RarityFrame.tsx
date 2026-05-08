"use client";

import type { ReactNode } from "react";
import type { CardRarity } from "@/lib/collection/types";
import {
  type RarityFrameLayout,
  type RarityImageVariant,
  getRarityFrameInnerClass,
  getRarityFrameOuterClass,
  legendaryShimmerLayerClass,
} from "@/lib/cards/rarityFrameStyles";
import { RarityCornerOrnament } from "@/components/cards/RarityCornerOrnament";

/**
 * CSS gradient border + 그림자 기반 등급 프레임. 자식은 카드 본문 또는 CardImage 래퍼.
 */
export function RarityFrame({
  rarity,
  locked = false,
  selected = false,
  layout,
  imageVariant,
  className,
  children,
}: {
  rarity: CardRarity;
  locked?: boolean;
  selected?: boolean;
  layout: RarityFrameLayout;
  imageVariant?: RarityImageVariant;
  className?: string;
  children: ReactNode;
}) {
  const outer = getRarityFrameOuterClass(rarity, {
    locked,
    selected,
    layout,
    imageVariant,
  });
  const inner = getRarityFrameInnerClass({ layout, imageVariant });

  const showShimmer = rarity === "legendary" && !locked;

  return (
    <div className={[outer, "relative isolate", className ?? ""].join(" ")}>
      {showShimmer ? <div className={legendaryShimmerLayerClass} aria-hidden /> : null}
      <div className={[inner, "relative z-[1]"].join(" ")}>
        <div className="relative z-[3] min-h-0">{children}</div>
        <div
          className="pointer-events-none absolute inset-0 z-[4] overflow-hidden rounded-[inherit]"
          aria-hidden
        >
          <RarityCornerOrnament rarity={rarity} locked={locked} />
        </div>
      </div>
    </div>
  );
}
