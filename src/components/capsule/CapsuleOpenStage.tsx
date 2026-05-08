"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CardRarity, CapsuleOpenResult } from "@/lib/collection/types";

export type OpenAnimationState =
  | "idle"
  | "shaking"
  | "glowing"
  | "revealing"
  | "cardFlip"
  | "result";

function rarityGlow(r: CardRarity): string {
  switch (r) {
    case "common":
      return "shadow-[0_0_0_1px_rgba(120,53,15,0.12),0_18px_60px_rgba(120,53,15,0.14)]";
    case "uncommon":
      return "shadow-[0_0_0_1px_rgba(6,95,70,0.12),0_18px_60px_rgba(6,95,70,0.14)]";
    case "rare":
      return "shadow-[0_0_0_1px_rgba(3,105,161,0.12),0_20px_70px_rgba(3,105,161,0.16)]";
    case "signature":
      return "shadow-[0_0_0_1px_rgba(107,33,168,0.12),0_22px_80px_rgba(107,33,168,0.18)]";
    case "legendary":
      return "shadow-[0_0_0_1px_rgba(161,98,7,0.16),0_26px_90px_rgba(161,98,7,0.26)]";
  }
}

export function CapsuleOpenStage({
  disabled,
  onOpen,
  onResultReady,
}: {
  disabled?: boolean;
  onOpen: () => CapsuleOpenResult;
  onResultReady: (result: CapsuleOpenResult) => void;
}) {
  const [state, setState] = useState<OpenAnimationState>("idle");
  const [result, setResult] = useState<CapsuleOpenResult | null>(null);
  const timers = useRef<number[]>([]);

  const canClick = !disabled && state === "idle";

  const rarity: CardRarity = result?.card.rarity ?? "common";
  const stageGlow = useMemo(() => {
    if (!result) return "";
    if (state === "result") return rarityGlow(rarity);
    if (state === "cardFlip") return rarityGlow(rarity);
    return "";
  }, [result, state, rarity]);

  function clearTimers() {
    for (const t of timers.current) window.clearTimeout(t);
    timers.current = [];
  }

  useEffect(() => () => clearTimers(), []);

  function startOpen() {
    if (!canClick) return;
    clearTimers();

    setResult(null);
    setState("shaking");

    // 1) Shaking
    timers.current.push(
      window.setTimeout(() => {
        setState("glowing");
      }, 700),
    );

    // 2) Glowing
    timers.current.push(
      window.setTimeout(() => {
        // 3) Revealing: roll result right before card appears
        const r = onOpen();
        setResult(r);
        setState("revealing");
      }, 1200),
    );

    // 4) Card flip
    timers.current.push(
      window.setTimeout(() => {
        setState("cardFlip");
      }, 1600),
    );

    // 5) Result ready
    timers.current.push(
      window.setTimeout(() => {
        setState("result");
      }, 2350),
    );
  }

  // Ensure onResultReady uses latest result after state reaches "result"
  useEffect(() => {
    if (state === "result" && result) onResultReady(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, result]);

  const isShaking = state === "shaking";
  const isGlowing = state === "glowing";
  const showCardBack = state === "revealing" || state === "cardFlip" || state === "result";
  const faceUp = state === "result";

  return (
    <div className="rounded-3xl bg-white/60 ring-1 ring-[#2A1710]/10 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-extrabold text-[#2A1710]">기본 커피 캡슐</div>
          <div className="mt-1 text-xs font-semibold text-[#5A321E]/70">
            {state === "idle"
              ? "탭해서 열기"
              : state === "shaking"
                ? "흔들리는 중..."
                : state === "glowing"
                  ? "빛이 새어 나옵니다..."
                  : state === "revealing"
                    ? "카드 등장!"
                    : state === "cardFlip"
                      ? "뒤집는 중..."
                      : "획득!"}
          </div>
        </div>
        <div className="text-[11px] font-semibold text-[#5A321E]/70">1회</div>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <div
          className={[
            "relative h-32 w-32 rounded-full bg-gradient-to-br from-[#D8A66A]/70 to-[#B9783F]/70 ring-1 ring-[#2A1710]/15",
            isShaking ? "animate-[capsule-shake_0.75s_ease-in-out_infinite]" : "",
            isGlowing ? "animate-[capsule-glow_0.9s_ease-in-out_infinite]" : "",
            stageGlow,
          ].join(" ")}
        >
          <div className="absolute inset-3 rounded-full bg-white/20" />

          {showCardBack ? (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className="h-24 w-16 [perspective:900px]"
                aria-label="card"
              >
                <div
                  className={[
                    "relative h-full w-full transition-transform duration-[650ms] [transform-style:preserve-3d]",
                    faceUp ? "[transform:rotateY(180deg)]" : "",
                  ].join(" ")}
                >
                  {/* back */}
                  <div className="absolute inset-0 rounded-2xl bg-[#2A1710] text-white/90 ring-1 ring-white/10 shadow-sm [backface-visibility:hidden] grid place-items-center">
                    <div className="text-[10px] font-extrabold tracking-widest">CAPSULE</div>
                  </div>

                  {/* front */}
                  <div className="absolute inset-0 rounded-2xl bg-white/80 ring-1 ring-[#2A1710]/15 shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)] grid place-items-center">
                    <div className="px-2 text-center">
                      <div className="text-[10px] font-extrabold text-[#5A321E]/70">
                        {result?.card.rarity.toUpperCase()}
                      </div>
                      <div className="mt-1 text-xs font-black text-[#2A1710]">
                        {result?.card.nameKo ?? "?"}
                      </div>
                      <div className="mt-1 text-[10px] font-semibold text-[#5A321E]/70">
                        {result?.isNew ? "NEW!" : "DUPLICATE"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <button
        disabled={!canClick}
        onClick={startOpen}
        className={[
          "mt-4 h-14 w-full rounded-2xl font-extrabold tracking-tight shadow-sm transition",
          "bg-gradient-to-r from-[#D8A66A] to-[#B9783F] text-white hover:brightness-105 active:scale-[0.99]",
          !canClick ? "opacity-60 cursor-not-allowed hover:brightness-100" : "",
        ].join(" ")}
      >
        기본 커피 캡슐 열기
      </button>
    </div>
  );
}

