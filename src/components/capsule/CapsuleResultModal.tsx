"use client";

import type { CardRarity, CapsuleOpenResult, DuplicateReward, UserCardState } from "@/lib/collection/types";
import { formatStar, getNextStarProgress } from "@/lib/collection/stars";

function rewardText(r: DuplicateReward): string {
  switch (r.type) {
    case "coffeePowder":
      return `커피 파우더 +${r.amount}`;
    case "signatureShard":
      return `시그니처 조각 +${r.amount}`;
    case "legendaryBeanShard":
      return `전설 원두 조각 +${r.amount}`;
  }
}

function rarityTone(r: CardRarity): { badge: string; glow: string } {
  switch (r) {
    case "common":
      return { badge: "bg-amber-50 text-amber-900 ring-amber-200", glow: "shadow-[0_0_0_1px_rgba(120,53,15,0.15),0_18px_60px_rgba(120,53,15,0.18)]" };
    case "uncommon":
      return { badge: "bg-emerald-50 text-emerald-900 ring-emerald-200", glow: "shadow-[0_0_0_1px_rgba(6,95,70,0.14),0_18px_60px_rgba(6,95,70,0.16)]" };
    case "rare":
      return { badge: "bg-sky-50 text-sky-900 ring-sky-200", glow: "shadow-[0_0_0_1px_rgba(3,105,161,0.14),0_20px_70px_rgba(3,105,161,0.18)]" };
    case "signature":
      return { badge: "bg-purple-50 text-purple-900 ring-purple-200", glow: "shadow-[0_0_0_1px_rgba(107,33,168,0.14),0_22px_80px_rgba(107,33,168,0.18)]" };
    case "legendary":
      return { badge: "bg-yellow-50 text-yellow-900 ring-yellow-200", glow: "shadow-[0_0_0_1px_rgba(161,98,7,0.16),0_26px_90px_rgba(161,98,7,0.22)]" };
  }
}

export function CapsuleResultModal({
  open,
  result,
  cardState,
  canDoubleDuplicateReward,
  remainingDoubleCount,
  onDoubleDuplicateReward,
  onClose,
  onOpenAgain,
}: {
  open: boolean;
  result: CapsuleOpenResult | null;
  cardState: UserCardState | null;
  canDoubleDuplicateReward?: boolean;
  remainingDoubleCount?: number;
  onDoubleDuplicateReward?: () => void | Promise<void>;
  onClose: () => void;
  onOpenAgain: () => void;
}) {
  if (!open || !result) return null;

  const rarity = result.card.rarity;
  const tone = rarityTone(rarity);
  const count = cardState?.count ?? 1;
  const { star, remainingToNext } = getNextStarProgress(count);

  const subtitle = result.isNew ? "새 카드 발견 · 도감에 등록되었습니다." : "중복 카드 · 성장 재화로 전환";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className={`w-full max-w-md rounded-3xl bg-[#FFF2D7] p-5 ring-1 ring-[#2A1710]/15 ${tone.glow}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-[#5A321E]/70">
              {result.isNew ? "NEW!" : "중복 획득"}
            </div>
            <div className="mt-1 text-xl font-bold text-[#2A1710]">{result.card.nameKo}</div>
            <div className="mt-1 text-xs font-semibold text-[#5A321E]/70">{subtitle}</div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span
                className={[
                  "inline-flex items-center rounded-full px-2 py-1 text-[11px] font-semibold ring-1",
                  tone.badge,
                ].join(" ")}
              >
                {rarity.toUpperCase()}
              </span>
              <span className="text-[11px] font-semibold text-[#5A321E]/80">
                {result.card.categoryTitleKo}
              </span>
              <span className="text-[11px] font-semibold text-[#5A321E]/70">
                보유 {count} · {formatStar(star)}
              </span>
            </div>
            {result.card.description ? (
              <div className="mt-2 text-sm font-medium text-[#5A321E]/80">
                {result.card.description}
              </div>
            ) : null}
          </div>
          <button
            className="rounded-full px-3 py-1.5 text-sm font-semibold text-[#2A1710] ring-1 ring-[#2A1710]/15 bg-white/60 hover:bg-white/80"
            onClick={onClose}
          >
            닫기
          </button>
        </div>

        <div className="mt-4 rounded-2xl bg-white/60 p-4 ring-1 ring-[#2A1710]/10">
          <div className="h-40 rounded-2xl bg-gradient-to-br from-white/80 to-white/30 ring-1 ring-[#2A1710]/10" />
          {result.duplicateReward ? (
            <div className="mt-3">
              <div className="text-sm font-extrabold text-[#2A1710]">
                {rewardText(result.duplicateReward)}
              </div>
              <div className="mt-1 text-xs font-semibold text-[#5A321E]/70">
                {remainingToNext != null ? `다음 별까지 ${remainingToNext}장` : "최대 별 등급"}
              </div>
            </div>
          ) : (
            <div className="mt-3 text-sm font-semibold text-[#2A1710]">
              도감에 등록되었습니다.
            </div>
          )}
        </div>

        {result.duplicateReward ? (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              disabled={!canDoubleDuplicateReward}
              className={[
                "h-12 rounded-2xl ring-1 ring-[#2A1710]/15 font-extrabold",
                canDoubleDuplicateReward
                  ? "bg-white/80 text-[#2A1710] hover:bg-white"
                  : "bg-white/40 text-[#2A1710]/60 cursor-not-allowed",
              ].join(" ")}
              title={
                canDoubleDuplicateReward
                  ? "광고를 보고 이번 중복 보상을 1회 추가 지급합니다."
                  : "오늘 남은 광고 보상 2배가 없습니다."
              }
              onClick={async () => {
                if (!canDoubleDuplicateReward) return;
                await onDoubleDuplicateReward?.();
              }}
            >
              {canDoubleDuplicateReward
                ? `광고 보고 보상 2배 (${remainingDoubleCount ?? 0}/10)`
                : `광고 보상 2배 소진`}
            </button>
            <button
              className="h-12 rounded-2xl bg-gradient-to-r from-[#D8A66A] to-[#B9783F] text-white font-extrabold shadow-sm hover:brightness-105"
              onClick={onOpenAgain}
            >
              한 번 더 열기
            </button>
            <button
              className="col-span-2 h-12 rounded-2xl bg-white/70 ring-1 ring-[#2A1710]/15 font-semibold text-[#2A1710] hover:bg-white/90"
              onClick={onClose}
            >
              닫기
            </button>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              className="h-12 rounded-2xl bg-white/70 ring-1 ring-[#2A1710]/15 font-semibold text-[#2A1710] hover:bg-white/90"
              onClick={onClose}
            >
              닫기
            </button>
            <button
              className="h-12 rounded-2xl bg-gradient-to-r from-[#D8A66A] to-[#B9783F] text-white font-extrabold shadow-sm hover:brightness-105"
              onClick={onOpenAgain}
            >
              한 번 더 열기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

