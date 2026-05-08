"use client";

import type { CollectionCard, UserCardState } from "@/lib/collection/types";
import { formatStar } from "@/lib/collection/stars";
import { CardImage } from "@/components/cards/CardImage";
import { RarityFrame } from "@/components/cards/RarityFrame";

export function CollectionCardGridItem({
  card,
  cardState,
  nowMs,
  onClick,
}: {
  card: CollectionCard;
  cardState: UserCardState | undefined;
  nowMs: number;
  onClick: () => void;
}) {
  const owned = !!cardState?.owned;
  const count = cardState?.count ?? 0;
  const star = cardState?.star ?? 1;
  const lastAcquiredAt = cardState?.lastAcquiredAt ?? 0;
  const isNew = owned && nowMs - lastAcquiredAt < 1000 * 60 * 10; // 10분

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative block w-full text-left active:scale-[0.99] transition"
    >
      <RarityFrame
        rarity={card.rarity}
        locked={!owned}
        layout="card"
        imageVariant="compact"
        className="w-full shadow-sm"
      >
        <div className="relative">
          <div className="p-3">
            <div className="text-[11px] font-semibold text-[#5A321E]/70">
              {owned ? card.rarity.toUpperCase() : `${card.rarity.toUpperCase()} · LOCKED`}
            </div>
            <div className="mt-1 text-sm font-extrabold text-[#2A1710]">
              {owned ? card.nameKo : "????"}
            </div>
            <div className="mt-2">
              <CardImage
                key={`${card.id}|${card.imagePath ?? ""}`}
                card={card}
                owned={owned}
                variant="compact"
                embeddedInFrame
                className="w-full"
                sizes="(max-width: 768px) 180px, 220px"
              />
            </div>

            {owned ? (
              <div className="mt-2 flex items-center justify-between">
                <div className="text-xs font-semibold text-[#2A1710]">{formatStar(star)}</div>
                <div className="text-xs font-semibold text-[#5A321E]/70">x{count}</div>
              </div>
            ) : (
              <div className="mt-2 text-xs font-semibold text-[#5A321E]/70">🔒 잠금</div>
            )}
          </div>

          {isNew ? (
            <div className="pointer-events-none absolute right-2 top-2 z-[6] rounded-full bg-white/92 px-2 py-1 text-[11px] font-extrabold text-[#2A1710] shadow-sm ring-1 ring-[#2A1710]/12">
              NEW
            </div>
          ) : null}

          {!owned ? (
            <div className="absolute inset-0 z-[5] bg-[#2A1710]/40 backdrop-blur-[1px]" />
          ) : null}
        </div>
      </RarityFrame>
    </button>
  );
}
