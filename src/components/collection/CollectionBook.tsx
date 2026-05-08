"use client";

import { useMemo, useState } from "react";
import type { CollectionCard, CollectionCategory, ThemeId, UserThemeState } from "@/lib/collection/types";
import { CollectionCategorySection } from "@/components/collection/CollectionCategorySection";
import { CardDetailModal } from "@/components/collection/CardDetailModal";

export function CollectionBook({
  themeId,
  categories,
  cards,
  themeState,
  onSetRepresentative,
}: {
  themeId: ThemeId;
  categories: readonly CollectionCategory[];
  cards: readonly CollectionCard[];
  themeState: UserThemeState;
  onSetRepresentative?: (cardId: string) => void;
}) {
  const [nowMs] = useState(() => Date.now());
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CollectionCard | null>(null);

  const cardsByCategory = useMemo(() => {
    const map = new Map<string, CollectionCard[]>();
    for (const c of cards) {
      if (c.themeId !== themeId) continue;
      const arr = map.get(c.categoryId) ?? [];
      arr.push(c);
      map.set(c.categoryId, arr);
    }
    return map;
  }, [cards, themeId]);

  const sortedCategories = useMemo(() => {
    return [...categories]
      .filter((c) => c.themeId === themeId)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [categories, themeId]);

  function openDetail(card: CollectionCard) {
    setSelectedCard(card);
    setDetailOpen(true);
  }

  return (
    <div>
      {sortedCategories.map((cat) => (
        <CollectionCategorySection
          key={cat.id}
          category={cat}
          cards={cardsByCategory.get(cat.id) ?? []}
          themeState={themeState}
          nowMs={nowMs}
          onCardClick={openDetail}
        />
      ))}

      <CardDetailModal
        open={detailOpen}
        themeId={themeId}
        card={selectedCard}
        cardState={selectedCard ? themeState.cardStates[selectedCard.id] ?? null : null}
        onClose={() => setDetailOpen(false)}
        onSetRepresentative={
          onSetRepresentative
            ? (cardId) => {
                onSetRepresentative(cardId);
                setDetailOpen(false);
              }
            : undefined
        }
      />
    </div>
  );
}

