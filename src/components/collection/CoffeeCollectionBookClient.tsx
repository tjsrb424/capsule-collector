"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { coffeeCards } from "@/data/themes/coffee/coffeeCards";
import { coffeeCategories } from "@/data/themes/coffee/coffeeCategories";
import { CollectionBook } from "@/components/collection/CollectionBook";
import { CollectionProgress } from "@/components/collection/CollectionProgress";
import { getThemeCollectionScore } from "@/lib/collection/scoring";
import { getThemeProgress } from "@/lib/collection/progress";
import { ensureUserThemeState } from "@/lib/collection/ownership";
import { loadCollectionSave, saveCollectionSave, updateThemeStateInSave } from "@/lib/storage/localCollectionStore";
import type { LocalCollectionSave, ThemeId, UserThemeState } from "@/lib/collection/types";

export function CoffeeCollectionBookClient() {
  const themeId: ThemeId = "coffee";
  const [save, setSave] = useState<LocalCollectionSave>(() => loadCollectionSave());

  const themeState: UserThemeState = useMemo(() => {
    return save.themes[themeId] ?? ensureUserThemeState(themeId);
  }, [save, themeId]);

  const progress = useMemo(() => {
    return getThemeProgress(themeState, themeId, coffeeCards);
  }, [themeState, themeId]);

  const score = useMemo(() => {
    return getThemeCollectionScore(themeState, themeId, coffeeCards);
  }, [themeState, themeId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF2D7] via-[#FFF2D7] to-white">
      <div className="mx-auto w-full max-w-md px-4 pb-10 pt-8">
        <header>
          <Link className="text-sm font-semibold text-[#5A321E]/80" href="/theme/coffee">
            ← 커피 홈
          </Link>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-[#2A1710]">
            커피 컬렉션
          </h1>
          <p className="mt-2 text-sm font-medium text-[#5A321E]/80">
            빈칸을 채우고 싶게 만드는 도감
          </p>
        </header>

        <section className="mt-6">
          <CollectionProgress
            ownedCount={progress.ownedCount}
            totalCount={progress.totalCount}
            score={score}
          />
          <div className="mt-3 text-xs font-semibold text-[#5A321E]/70">
            보유 카드 {progress.ownedCount} · 전체 카드 {progress.totalCount}
          </div>
        </section>

        <section className="mt-6">
          <CollectionBook
            themeId={themeId}
            categories={coffeeCategories}
            cards={coffeeCards}
            themeState={themeState}
            onSetRepresentative={(cardId) => {
              const nextThemeState: UserThemeState = {
                ...themeState,
                representativeCardId: cardId,
              };
              const nextSave = updateThemeStateInSave(save, themeId, nextThemeState);
              saveCollectionSave(nextSave);
              setSave(nextSave);
            }}
          />
        </section>
      </div>
    </div>
  );
}

