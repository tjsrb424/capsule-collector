"use client";

import type { CollectionCard, ThemeId, UserCardState } from "@/lib/collection/types";
import { formatStar, getNextStarProgress } from "@/lib/collection/stars";
import { scoreCard } from "@/lib/collection/scoring";
import { CardImage } from "@/components/cards/CardImage";
import { RarityFrame } from "@/components/cards/RarityFrame";

export function CardDetailModal({
  open,
  themeId,
  card,
  cardState,
  isRepresentative,
  onClose,
  onSetRepresentative,
}: {
  open: boolean;
  themeId: ThemeId;
  card: CollectionCard | null;
  cardState: UserCardState | null;
  /** 도감에서 설정된 대표 카드일 때 프레임 강조 */
  isRepresentative?: boolean;
  onClose: () => void;
  onSetRepresentative?: (cardId: string) => void;
}) {
  if (!open || !card) return null;

  const owned = !!cardState?.owned;
  const count = cardState?.count ?? 0;
  const star = owned ? (cardState?.star ?? 1) : 0;
  const next = getNextStarProgress(count);
  const cardScore = owned ? scoreCard(card, cardState ?? undefined) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="w-full max-w-md rounded-3xl bg-[#FFF2D7] p-5 ring-1 ring-[#2A1710]/15 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-[#5A321E]/70">
              {themeId}
            </div>
            <div className="mt-1 text-xl font-black text-[#2A1710]">
              {owned ? card.nameKo : "????"}
            </div>
            <div className="mt-1 text-sm font-semibold text-[#5A321E]/80">
              {card.categoryTitleKo} · {card.rarity.toUpperCase()}
            </div>
          </div>
          <button
            className="rounded-full px-3 py-1.5 text-sm font-semibold text-[#2A1710] ring-1 ring-[#2A1710]/15 bg-white/60 hover:bg-white/80"
            onClick={onClose}
          >
            닫기
          </button>
        </div>

        <div className="mt-4 rounded-2xl bg-white/60 p-4 ring-1 ring-[#2A1710]/10">
          <RarityFrame
            rarity={card.rarity}
            locked={!owned}
            selected={!!(owned && isRepresentative)}
            layout="image"
            imageVariant="featured"
            className="w-full"
          >
            <CardImage
              key={`${card.id}|${card.imagePath ?? ""}`}
              card={card}
              owned={owned}
              priority={owned}
              variant="featured"
              embeddedInFrame
              className="w-full"
              sizes="(max-width: 768px) 360px, 420px"
            />
          </RarityFrame>
          {owned ? (
            <div className="mt-3 space-y-2">
              {card.description ? (
                <div className="text-sm font-medium text-[#5A321E]/80">{card.description}</div>
              ) : (
                <div className="text-sm font-medium text-[#5A321E]/70">
                  설명이 아직 준비되지 않았습니다.
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white/70 p-3 ring-1 ring-[#2A1710]/10">
                  <div className="text-xs font-semibold text-[#5A321E]/70">보유 수량</div>
                  <div className="mt-1 text-lg font-extrabold text-[#2A1710]">{count}</div>
                </div>
                <div className="rounded-xl bg-white/70 p-3 ring-1 ring-[#2A1710]/10">
                  <div className="text-xs font-semibold text-[#5A321E]/70">별 등급</div>
                  <div className="mt-1 text-lg font-extrabold text-[#2A1710]">{formatStar(star)}</div>
                </div>
                <div className="rounded-xl bg-white/70 p-3 ring-1 ring-[#2A1710]/10">
                  <div className="text-xs font-semibold text-[#5A321E]/70">컬렉션 점수</div>
                  <div className="mt-1 text-lg font-extrabold text-[#2A1710]">{cardScore}</div>
                </div>
                <div className="rounded-xl bg-white/70 p-3 ring-1 ring-[#2A1710]/10">
                  <div className="text-xs font-semibold text-[#5A321E]/70">다음 별까지</div>
                  <div className="mt-1 text-lg font-extrabold text-[#2A1710]">
                    {next.remainingToNext == null ? "MAX" : `${next.remainingToNext}장`}
                  </div>
                </div>
              </div>

              {onSetRepresentative ? (
                <button
                  className="mt-1 h-12 w-full rounded-2xl bg-white/80 ring-1 ring-[#2A1710]/15 font-extrabold text-[#2A1710] hover:bg-white"
                  onClick={() => onSetRepresentative(card.id)}
                >
                  대표 카드로 설정
                </button>
              ) : null}
            </div>
          ) : (
            <div className="mt-3">
              <div className="text-sm font-semibold text-[#2A1710]">
                아직 발견하지 못한 카드입니다.
              </div>
              <div className="mt-1 text-xs font-medium text-[#5A321E]/70">
                이 카테고리의 캡슐을 열어보세요.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

