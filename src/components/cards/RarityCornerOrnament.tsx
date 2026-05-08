"use client";

import type { CardRarity } from "@/lib/collection/types";

function RarityCornerSvg({
  flipX,
  flipY,
  opacityClass,
  stroke,
  accent,
}: {
  flipX?: boolean;
  flipY?: boolean;
  opacityClass: string;
  stroke: string;
  accent: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={[
        "pointer-events-none absolute h-[clamp(1.5rem,14vw,3rem)] w-[clamp(1.5rem,14vw,3rem)] max-w-[52px]",
        flipX ? "right-0 scale-x-[-1]" : "left-0",
        flipY ? "bottom-0 scale-y-[-1]" : "top-0",
        opacityClass,
      ].join(" ")}
      aria-hidden
    >
      <path
        d="M4 10 C18 4 34 6 42 18 L42 42 L18 42 C10 34 6 22 4 10 Z"
        fill="none"
        stroke={stroke}
        strokeWidth={1.25}
      />
      <path
        d="M8 14 L22 10 L34 20"
        fill="none"
        stroke={accent}
        strokeWidth={1}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** 등급별 코너 장식(SVG) — signature / legendary에서만 사용 */
export function RarityCornerOrnament({
  rarity,
  locked,
}: {
  rarity: CardRarity;
  locked?: boolean;
}) {
  if (rarity !== "signature" && rarity !== "legendary") return null;

  const opacityClass =
    locked ? (rarity === "legendary" ? "opacity-55" : "opacity-45") : "opacity-90";
  const stroke =
    rarity === "legendary"
      ? "rgba(254, 243, 199, 0.95)"
      : "rgba(233, 213, 255, 0.95)";
  const accent =
    rarity === "legendary"
      ? "rgba(251, 191, 36, 0.85)"
      : "rgba(192, 132, 252, 0.85)";

  return (
    <>
      <RarityCornerSvg
        opacityClass={opacityClass}
        stroke={stroke}
        accent={accent}
      />
      <RarityCornerSvg
        flipX
        opacityClass={opacityClass}
        stroke={stroke}
        accent={accent}
      />
      <RarityCornerSvg
        flipY
        opacityClass={opacityClass}
        stroke={stroke}
        accent={accent}
      />
      <RarityCornerSvg
        flipX
        flipY
        opacityClass={opacityClass}
        stroke={stroke}
        accent={accent}
      />
    </>
  );
}
