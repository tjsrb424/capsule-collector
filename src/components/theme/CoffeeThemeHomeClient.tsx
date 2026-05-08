"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { coffeeCards } from "@/data/themes/coffee/coffeeCards";
import { coffeeAdBonusCapsule, coffeeBasicCapsule } from "@/data/themes/coffee/coffeeCapsules";
import { CapsuleOpenStage } from "@/components/capsule/CapsuleOpenStage";
import { CapsuleResultModal } from "@/components/capsule/CapsuleResultModal";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { CollectionProgress } from "@/components/collection/CollectionProgress";
import { getThemeCollectionScore } from "@/lib/collection/scoring";
import { getThemeProgress } from "@/lib/collection/progress";
import { ensureUserThemeState } from "@/lib/collection/ownership";
import { openCapsuleOncePure } from "@/lib/capsule/openCapsuleEngine";
import { loadCollectionSave, saveCollectionSave } from "@/lib/storage/localCollectionStore";
import { resetDailyAdCountsIfNeeded } from "@/lib/ads/dailyAdState";
import { watchMockRewardedAd } from "@/lib/ads/mockRewardedAd";
import type { CapsuleOpenResult, LocalCollectionSave, ThemeId, UserThemeState } from "@/lib/collection/types";

export function CoffeeThemeHomeClient() {
  const themeId: ThemeId = "coffee";

  const [save, setSave] = useState<LocalCollectionSave>(() => loadCollectionSave());
  const [resultOpen, setResultOpen] = useState(false);
  const [result, setResult] = useState<CapsuleOpenResult | null>(null);
  const [adLoading, setAdLoading] = useState<null | "bonusCapsule">(null);
  const [adToast, setAdToast] = useState<string | null>(null);

  const themeState: UserThemeState = useMemo(() => {
    const raw = save.themes[themeId] ?? ensureUserThemeState(themeId);
    return resetDailyAdCountsIfNeeded(raw);
  }, [save, themeId]);

  const progress = useMemo(() => {
    return getThemeProgress(themeState, themeId, coffeeCards);
  }, [themeState, themeId]);

  const score = useMemo(() => {
    return getThemeCollectionScore(themeState, themeId, coffeeCards);
  }, [themeState, themeId]);

  const coffeePowder = themeState.coffeePowder ?? 0;
  const signatureShard = themeState.signatureShard ?? 0;
  const legendaryBeanShard = themeState.legendaryBeanShard ?? 0;
  const todayAdCount = themeState.dailyAdOpenCount ?? 0;
  const todayAdDoubleCount = themeState.dailyAdRewardDoubleCount ?? 0;
  const adBonusLimit = coffeeAdBonusCapsule.dailyAdLimit ?? 10;
  const adDoubleLimit = 10;

  const ownedCards = useMemo(() => {
    return coffeeCards
      .filter((c) => themeState.cardStates[c.id]?.owned)
      .map((c) => ({
        card: c,
        lastAcquiredAt: themeState.cardStates[c.id]?.lastAcquiredAt ?? 0,
      }))
      .sort((a, b) => b.lastAcquiredAt - a.lastAcquiredAt);
  }, [themeState]);

  const representative =
    (themeState.representativeCardId &&
      coffeeCards.find((c) => c.id === themeState.representativeCardId)) ||
    ownedCards[0]?.card ||
    null;

  function openBasicOnce(): CapsuleOpenResult {
    const { nextSave, result } = openCapsuleOncePure(save, coffeeBasicCapsule, coffeeCards);
    saveCollectionSave(nextSave);
    setSave(nextSave);
    setResult(result);
    return result;
  }

  async function openAdBonusOnce() {
    const currentTheme = resetDailyAdCountsIfNeeded(save.themes[themeId] ?? ensureUserThemeState(themeId));
    const nextCount = (currentTheme.dailyAdOpenCount ?? 0) + 1;
    if (nextCount > adBonusLimit) {
      setAdToast(`오늘 남은 광고 보너스 캡슐이 없습니다. (${adBonusLimit}/${adBonusLimit})`);
      return;
    }

    setAdLoading("bonusCapsule");
    setAdToast("광고 확인 중...");
    try {
      await watchMockRewardedAd("coffeeAdBonusCapsule");
      setAdToast("보상 지급 완료");

      const { nextSave, result } = openCapsuleOncePure(save, coffeeAdBonusCapsule, coffeeCards);
      const updatedThemeState: UserThemeState = {
        ...(nextSave.themes[themeId] ?? currentTheme),
        lastAdDate: currentTheme.lastAdDate,
        dailyAdOpenCount: nextCount,
      };
      const finalSave: LocalCollectionSave = {
        ...nextSave,
        themes: { ...nextSave.themes, [themeId]: updatedThemeState },
      };

      saveCollectionSave(finalSave);
      setSave(finalSave);
      setResult(result);
      setResultOpen(true);
    } finally {
      setAdLoading(null);
      window.setTimeout(() => setAdToast(null), 900);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#FFF2D7] via-[#FFF2D7] to-white">
      <div className="mx-auto w-full max-w-md px-4 pb-10 pt-8">
        <header>
          <Link className="text-sm font-semibold text-[#5A321E]/80" href="/">
            ← 메인
          </Link>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-[#2A1710]">
            커피 컬렉션
          </h1>
          <p className="mt-2 text-sm font-medium text-[#5A321E]/80">
            따뜻한 한 잔씩, 도감을 채워보세요.
          </p>
        </header>

        <section className="mt-6">
          <CollectionProgress
            ownedCount={progress.ownedCount}
            totalCount={progress.totalCount}
            score={score}
          />
        </section>

        <section className="mt-3 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-white/60 ring-1 ring-[#2A1710]/10 p-4 shadow-sm">
            <div className="text-xs font-semibold text-[#5A321E]/70">커피 파우더</div>
            <div className="mt-1 text-lg font-extrabold text-[#2A1710]">
              {coffeePowder.toLocaleString()}
            </div>
          </div>
          <div className="rounded-2xl bg-white/60 ring-1 ring-[#2A1710]/10 p-4 shadow-sm">
            <div className="text-xs font-semibold text-[#5A321E]/70">시그니처 조각</div>
            <div className="mt-1 text-lg font-extrabold text-[#2A1710]">
              {signatureShard.toLocaleString()}
            </div>
          </div>
          <div className="rounded-2xl bg-white/60 ring-1 ring-[#2A1710]/10 p-4 shadow-sm">
            <div className="text-xs font-semibold text-[#5A321E]/70">전설 원두 조각</div>
            <div className="mt-1 text-lg font-extrabold text-[#2A1710]">
              {legendaryBeanShard.toLocaleString()}
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-white/60 ring-1 ring-[#2A1710]/10 p-4 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-extrabold text-[#2A1710]">대표 카드</div>
              <div className="mt-1 text-xs font-semibold text-[#5A321E]/70">
                {representative ? "임시 표시(최근 획득 기준)" : "대표 카드 없음"}
              </div>
            </div>
            <div className="text-xs font-semibold text-[#5A321E]/70">
              오늘 광고 캡슐 {todayAdCount}/10
            </div>
          </div>
          <div className="mt-3">
            {representative ? (
              <CollectionCard card={representative} owned emphasis />
            ) : (
              <div className="rounded-2xl bg-[#FFF2D7]/70 ring-1 ring-[#2A1710]/10 p-4">
                <div className="text-sm font-semibold text-[#2A1710]">대표 카드 없음</div>
                <div className="mt-1 text-xs font-medium text-[#5A321E]/70">
                  첫 카드를 획득하면 여기에 표시됩니다.
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-6 space-y-3">
          <CapsuleOpenStage
            onOpen={openBasicOnce}
            onResultReady={() => setResultOpen(true)}
          />
          <button
            disabled={adLoading === "bonusCapsule" || todayAdCount >= adBonusLimit}
            className={[
              "h-14 w-full rounded-2xl font-extrabold tracking-tight shadow-sm ring-1 ring-[#2A1710]/15",
              "bg-white/80 text-[#2A1710] hover:bg-white",
              "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-white/80",
            ].join(" ")}
            onClick={openAdBonusOnce}
          >
            {adLoading === "bonusCapsule"
              ? "광고 확인 중..."
              : `광고 보고 보너스 캡슐 열기 (${Math.max(0, adBonusLimit - todayAdCount)}/${adBonusLimit})`}
          </button>

          <Link
            href="/collection/coffee"
            className="h-14 w-full rounded-2xl font-extrabold tracking-tight shadow-sm ring-1 ring-[#2A1710]/15 bg-white/80 text-[#2A1710] hover:bg-white grid place-items-center"
          >
            도감 보기
          </Link>
        </section>

        <section className="mt-8">
          <div className="flex items-end justify-between">
            <h2 className="text-lg font-extrabold text-[#2A1710]">최근 획득</h2>
            <div className="text-xs font-semibold text-[#5A321E]/70">
              {ownedCards.length > 0 ? "최대 5장" : "아직 없음"}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {(ownedCards.length
              ? ownedCards.slice(0, 5).map((x) => x.card)
              : coffeeCards.slice(0, 4)
            ).map((c) => (
              <CollectionCard
                key={`recent-${c.id}`}
                card={c}
                owned={!!themeState.cardStates[c.id]?.owned}
                emphasis={
                  !!(
                    themeState.representativeCardId &&
                    themeState.representativeCardId === c.id &&
                    themeState.cardStates[c.id]?.owned
                  )
                }
              />
            ))}
          </div>
        </section>

        <CapsuleResultModal
          open={resultOpen}
          result={result}
          cardState={
            result ? themeState.cardStates[result.card.id] ?? null : null
          }
          canDoubleDuplicateReward={
            !!result?.duplicateReward && todayAdDoubleCount < adDoubleLimit
          }
          remainingDoubleCount={Math.max(0, adDoubleLimit - todayAdDoubleCount)}
          onDoubleDuplicateReward={async () => {
            if (!result?.duplicateReward) return;
            const currentTheme = resetDailyAdCountsIfNeeded(save.themes[themeId] ?? ensureUserThemeState(themeId));
            if ((currentTheme.dailyAdRewardDoubleCount ?? 0) >= adDoubleLimit) return;

            setAdToast("광고 확인 중...");
            await watchMockRewardedAd("duplicateRewardDouble");

            // apply one more time for "double"
            const { applyDuplicateReward } = await import("@/lib/collection/applyRewards");
            const nextTheme: UserThemeState = applyDuplicateReward(currentTheme, result.duplicateReward);
            const finalTheme: UserThemeState = {
              ...nextTheme,
              dailyAdRewardDoubleCount: (currentTheme.dailyAdRewardDoubleCount ?? 0) + 1,
            };
            const finalSave: LocalCollectionSave = {
              ...save,
              themes: { ...save.themes, [themeId]: finalTheme },
              updatedAt: Date.now(),
            };
            saveCollectionSave(finalSave);
            setSave(finalSave);
            setAdToast("보상 지급 완료");
            window.setTimeout(() => setAdToast(null), 900);
          }}
          onClose={() => setResultOpen(false)}
          onOpenAgain={() => {
            setResultOpen(false);
            const r = openBasicOnce();
            setResult(r);
            setResultOpen(true);
          }}
        />

        {adToast ? (
          <div className="fixed left-1/2 top-4 z-60 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-xs font-semibold text-white shadow-sm">
            {adToast}
          </div>
        ) : null}
      </div>
    </div>
  );
}

