"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { coffeeCards } from "@/data/themes/coffee/coffeeCards";
import { CollectionCard as CardView } from "@/components/cards/CollectionCard";
import { CollectionProgress } from "@/components/collection/CollectionProgress";
import { getThemeCollectionScore } from "@/lib/collection/scoring";
import { getThemeProgress } from "@/lib/collection/progress";
import {
  loadCollectionSave,
} from "@/lib/storage/localCollectionStore";
import { ensureUserThemeState } from "@/lib/collection/ownership";
import type { LocalCollectionSave, UserThemeState } from "@/lib/collection/types";

export default function Home() {
  const [save] = useState<LocalCollectionSave>(() => loadCollectionSave());

  const themeState: UserThemeState | null = useMemo(() => {
    if (!save) return null;
    return save.themes.coffee ?? ensureUserThemeState("coffee");
  }, [save]);

  const progress = useMemo(() => {
    if (!themeState) return { ownedCount: 0, totalCount: coffeeCards.length, completionRate: 0, themeId: "coffee" as const };
    return getThemeProgress(themeState, "coffee", coffeeCards);
  }, [themeState]);

  const score = useMemo(() => {
    if (!themeState) return 0;
    return getThemeCollectionScore(themeState, "coffee", coffeeCards);
  }, [themeState]);

  const coffeePowder = themeState?.coffeePowder ?? 0;
  const representative =
    (themeState?.representativeCardId &&
      coffeeCards.find((c) => c.id === themeState.representativeCardId)) ||
    (themeState
      ? coffeeCards.find((c) => themeState.cardStates[c.id]?.owned) ?? null
      : null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF2D7] via-[#FFF2D7] to-white">
      <div className="mx-auto w-full max-w-md px-4 pb-10 pt-8">
        <header>
          <div className="text-xs font-semibold tracking-wide text-[#5A321E]/70">
            Capsule Collector v0.1
          </div>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-[#2A1710]">
            캡슐 컬렉터
          </h1>
          <p className="mt-2 text-sm font-medium text-[#5A321E]/80">
            여러 게임 테마의 카드를 모아보세요. (v0.1: 커피 테마)
          </p>
        </header>

        <section className="mt-6 space-y-4">
          <div className="rounded-3xl bg-white/60 ring-1 ring-[#2A1710]/10 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-[#5A321E]/70">테마</div>
                <div className="mt-1 text-xl font-extrabold text-[#2A1710]">
                  커피 컬렉션
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-[#5A321E]/70">커피 파우더</div>
                <div className="mt-1 text-lg font-extrabold text-[#2A1710]">
                  {coffeePowder.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <CollectionProgress
                ownedCount={progress.ownedCount}
                totalCount={progress.totalCount}
                score={score}
              />
            </div>

            <div className="mt-4 rounded-2xl bg-[#FFF2D7]/60 ring-1 ring-[#2A1710]/10 p-4">
              <div className="text-sm font-extrabold text-[#2A1710]">대표 카드</div>
              <div className="mt-1 text-xs font-medium text-[#5A321E]/70">
                {representative ? "설정된 대표 카드가 표시됩니다." : "대표 카드 없음 · 카드 상세에서 설정할 수 있어요."}
              </div>
              {representative ? (
                <div className="mt-3">
                  <CardView card={representative} owned emphasis />
                </div>
              ) : null}
            </div>

            <div className="mt-4 flex gap-3">
              <Link
                href="/theme/coffee"
                className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-[#D8A66A] to-[#B9783F] text-white font-extrabold grid place-items-center shadow-sm hover:brightness-105"
              >
                입장하기
              </Link>
              <div className="w-16 rounded-2xl bg-white/60 ring-1 ring-[#2A1710]/10 grid place-items-center text-xs font-semibold text-[#5A321E]/70">
                v0.1
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white/40 ring-1 ring-[#2A1710]/10 p-5">
            <div className="flex items-center justify-between">
              <div className="text-lg font-extrabold text-[#2A1710]">델타노바</div>
              <div className="text-xs font-semibold text-[#5A321E]/70">Coming Soon</div>
            </div>
            <div className="mt-3">
              <CardView
                card={{
                  id: "deltaNova_placeholder",
                  themeId: "deltaNova",
                  categoryId: "comingSoon",
                  categoryTitleKo: "준비 중",
                  nameKo: "Coming Soon",
                  rarity: "rare",
                }}
                owned={false}
              />
            </div>
          </div>

          <div className="rounded-3xl bg-white/40 ring-1 ring-[#2A1710]/10 p-5">
            <div className="flex items-center justify-between">
              <div className="text-lg font-extrabold text-[#2A1710]">다크 RPG</div>
              <div className="text-xs font-semibold text-[#5A321E]/70">Coming Soon</div>
            </div>
            <div className="mt-3">
              <CardView
                card={{
                  id: "darkRpg_placeholder",
                  themeId: "darkRpg",
                  categoryId: "comingSoon",
                  categoryTitleKo: "준비 중",
                  nameKo: "Coming Soon",
                  rarity: "rare",
                }}
                owned={false}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
