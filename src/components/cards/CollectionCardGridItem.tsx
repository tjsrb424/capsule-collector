"use client";

import type { CollectionCard, UserCardState } from "@/lib/collection/types";
import { formatStar } from "@/lib/collection/stars";

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

  const lockedTone =
    card.rarity === "legendary"
      ? "ring-1 ring-yellow-500/25 shadow-[0_0_0_1px_rgba(234,179,8,0.18),0_16px_60px_rgba(161,98,7,0.14)]"
      : "ring-1 ring-[#2A1710]/10 shadow-sm";

  return (
    <button
      onClick={onClick}
      className={[
        "relative text-left overflow-hidden rounded-2xl bg-[#FFF2D7]/70 active:scale-[0.99] transition",
        owned ? "ring-1 ring-[#2A1710]/10 shadow-sm" : lockedTone,
      ].join(" ")}
    >
      <div className="p-3">
        <div className="text-[11px] font-semibold text-[#5A321E]/70">
          {owned ? card.rarity.toUpperCase() : `${card.rarity.toUpperCase()} · LOCKED`}
        </div>
        <div className="mt-1 text-sm font-extrabold text-[#2A1710]">
          {owned ? card.nameKo : "????"}
        </div>
        <div className="mt-2 h-20 rounded-xl bg-gradient-to-br from-white/70 to-white/30 ring-1 ring-[#2A1710]/10" />

        {owned ? (
          <div className="mt-2 flex items-center justify-between">
            <div className="text-xs font-semibold text-[#2A1710]">{formatStar(star)}</div>
            <div className="text-xs font-semibold text-[#5A321E]/70">x{count}</div>
          </div>
        ) : (
          <div className="mt-2 text-xs font-semibold text-[#5A321E]/70">
            🔒 잠금
          </div>
        )}
      </div>

      {isNew ? (
        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[11px] font-extrabold text-[#2A1710] ring-1 ring-[#2A1710]/15">
          NEW
        </div>
      ) : null}

      {!owned ? (
        <div className="absolute inset-0 bg-[#2A1710]/40 backdrop-blur-[1px]" />
      ) : null}
    </button>
  );
}

