"use client";

import type { CollectionCard, CollectionCategory, UserThemeState } from "@/lib/collection/types";
import { CollectionCardGridItem } from "@/components/cards/CollectionCardGridItem";

export function CollectionCategorySection({
  category,
  cards,
  themeState,
  nowMs,
  onCardClick,
}: {
  category: CollectionCategory;
  cards: readonly CollectionCard[];
  themeState: UserThemeState;
  nowMs: number;
  onCardClick: (card: CollectionCard) => void;
}) {
  const ownedCount = cards.reduce((acc, c) => acc + (themeState.cardStates[c.id]?.owned ? 1 : 0), 0);
  const isComplete = cards.length > 0 && ownedCount === cards.length;

  return (
    <div className="mt-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-base font-extrabold text-[#2A1710]">{category.titleKo}</div>
          {category.descriptionKo ? (
            <div className="mt-1 text-xs font-medium text-[#5A321E]/70">
              {category.descriptionKo}
            </div>
          ) : null}
          {isComplete ? (
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[11px] font-extrabold text-[#2A1710] ring-1 ring-[#2A1710]/15">
              완성! <span className="font-semibold text-[#5A321E]/70">보상 준비 중</span>
            </div>
          ) : null}
        </div>
        <div className="text-xs font-extrabold text-[#5A321E]/70">
          {ownedCount} / {cards.length}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {cards.map((card) => (
          <CollectionCardGridItem
            key={card.id}
            card={card}
            cardState={themeState.cardStates[card.id]}
            nowMs={nowMs}
            onClick={() => onCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
}

