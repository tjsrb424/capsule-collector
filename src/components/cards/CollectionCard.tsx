"use client";

import type { CardRarity, CollectionCard as Card } from "@/lib/collection/types";

function rarityLabel(r: CardRarity): string {
  switch (r) {
    case "common":
      return "Common";
    case "uncommon":
      return "Uncommon";
    case "rare":
      return "Rare";
    case "signature":
      return "Signature";
    case "legendary":
      return "Legendary";
  }
}

function rarityClass(r: CardRarity): string {
  switch (r) {
    case "common":
      return "bg-amber-50 text-amber-900 ring-amber-200";
    case "uncommon":
      return "bg-emerald-50 text-emerald-900 ring-emerald-200";
    case "rare":
      return "bg-sky-50 text-sky-900 ring-sky-200";
    case "signature":
      return "bg-purple-50 text-purple-900 ring-purple-200";
    case "legendary":
      return "bg-yellow-50 text-yellow-900 ring-yellow-200";
  }
}

export function CollectionCard({
  card,
  owned,
}: {
  card: Card;
  owned: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#FFF2D7]/70 ring-1 ring-[#2A1710]/10 shadow-sm">
      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <span
            className={[
              "inline-flex items-center rounded-full px-2 py-1 text-[11px] font-semibold ring-1",
              rarityClass(card.rarity),
            ].join(" ")}
          >
            {rarityLabel(card.rarity)}
          </span>
          <span className="text-[11px] font-medium text-[#5A321E]/70">
            {card.categoryTitleKo}
          </span>
        </div>

        <div className="mt-3">
          <div className="text-sm font-semibold text-[#2A1710]">
            {owned ? card.nameKo : "????"}
          </div>
          <div className="mt-2 h-20 rounded-xl bg-gradient-to-br from-white/70 to-white/30 ring-1 ring-[#2A1710]/10" />
          <div className="mt-2 text-xs text-[#5A321E]/70">
            {owned ? "보유" : "미획득"}
          </div>
        </div>
      </div>

      {!owned ? (
        <div className="absolute inset-0 bg-[#2A1710]/35 backdrop-blur-[1px]" />
      ) : null}
    </div>
  );
}

