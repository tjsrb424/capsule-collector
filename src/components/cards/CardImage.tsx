"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CardRarity, CollectionCard } from "@/lib/collection/types";
import {
  ENABLE_CARD_FRAME_OVERLAY,
  hasCardFrameFailed,
  registerCardFrameFailure,
} from "@/lib/cards/cardFrameConfig";
import { getCardFrameImagePath } from "@/lib/cards/cardFramePaths";

export type CardImageVariant = "compact" | "featured";

function rarityLabelKo(r: CardRarity): string {
  switch (r) {
    case "common":
      return "커먼";
    case "uncommon":
      return "언커먼";
    case "rare":
      return "레어";
    case "signature":
      return "시그니처";
    case "legendary":
      return "레전더리";
  }
}

function rarityColors(r: CardRarity): { from: string; to: string; text: string } {
  switch (r) {
    case "common":
      return { from: "#FDE68A", to: "#FED7AA", text: "#2A1710" };
    case "uncommon":
      return { from: "#A7F3D0", to: "#BFDBFE", text: "#0F172A" };
    case "rare":
      return { from: "#BAE6FD", to: "#C7D2FE", text: "#0F172A" };
    case "signature":
      return { from: "#E9D5FF", to: "#FBCFE8", text: "#2A1710" };
    case "legendary":
      return { from: "#FDE68A", to: "#F59E0B", text: "#2A1710" };
  }
}

/** 등급별 아트 영역 배경(체커보드 없음, 투명 PNG 가장자리용) */
function artBackdropClass(r: CardRarity): string {
  switch (r) {
    case "common":
      return "bg-linear-to-br from-[#FFF9F0] via-[#FFF2D7] to-[#FFE8CC]";
    case "uncommon":
      return "bg-linear-to-br from-[#ECFDF5] via-[#E0F7FA] to-[#DCFCE7]";
    case "rare":
      return "bg-linear-to-br from-[#EFF6FF] via-[#E0F2FE] to-[#EEF2FF]";
    case "signature":
      return "bg-linear-to-br from-[#FAF5FF] via-[#FCE7F3] to-[#FFE4E6]";
    case "legendary":
      return "bg-linear-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A]";
  }
}

function svgDataUri(svg: string): string {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}

function buildPlaceholderSvg({
  rarity,
  title,
  subtitle,
}: {
  rarity: CardRarity;
  title: string;
  subtitle?: string;
}): string {
  const { from, to, text } = rarityColors(rarity);
  const safeTitle = title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const safeSubtitle = (subtitle ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">`,
    `<defs>`,
    `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">`,
    `<stop offset="0" stop-color="${from}"/>`,
    `<stop offset="1" stop-color="${to}"/>`,
    `</linearGradient>`,
    `</defs>`,
    `<rect x="0" y="0" width="600" height="600" rx="48" fill="url(#g)"/>`,
    `<rect x="48" y="48" width="504" height="504" rx="36" fill="rgba(255,255,255,0.28)"/>`,
    `<text x="300" y="290" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" font-size="44" font-weight="900" fill="${text}">${safeTitle}</text>`,
    safeSubtitle
      ? `<text x="300" y="345" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" font-size="22" font-weight="700" fill="${text}" opacity="0.8">${safeSubtitle}</text>`
      : "",
    `</svg>`,
  ].join("");
}

function variantRootClass(variant: CardImageVariant, embeddedInFrame?: boolean): string {
  const ring =
    embeddedInFrame ? "" : "ring-1 ring-[#2A1710]/10";
  if (variant === "featured") {
    return [
      "relative w-full overflow-hidden rounded-2xl",
      "aspect-[4/5] min-h-[260px]",
      ring,
    ]
      .filter(Boolean)
      .join(" ");
  }
  return [
    "relative w-full overflow-hidden rounded-xl",
    "aspect-[4/5] min-h-[180px]",
    ring,
  ]
    .filter(Boolean)
    .join(" ");
}

function artAreaPaddingClass(): string {
  return "p-[9%] sm:p-[10%]";
}

export function CardImage({
  card,
  owned,
  priority,
  variant = "compact",
  embeddedInFrame,
  className,
  sizes,
}: {
  card: CollectionCard;
  owned?: boolean;
  priority?: boolean;
  variant?: CardImageVariant;
  /** RarityFrame 안에 넣을 때 바깥 프레임과 ring 이중 방지 */
  embeddedInFrame?: boolean;
  className?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [frameFailed, setFrameFailed] = useState(false);
  const isOwned = owned ?? true;

  const fallbackSrc = useMemo(() => {
    if (!isOwned) {
      return svgDataUri(
        buildPlaceholderSvg({
          rarity: card.rarity,
          title: "????",
          subtitle: "미획득",
        }),
      );
    }
    return svgDataUri(
      buildPlaceholderSvg({
        rarity: card.rarity,
        title: card.nameKo,
        subtitle: rarityLabelKo(card.rarity),
      }),
    );
  }, [card.nameKo, card.rarity, isOwned]);

  const src = !failed && isOwned && card.imagePath ? card.imagePath : fallbackSrc;
  const alt = isOwned ? `${card.nameKo} 카드 이미지` : "미획득 카드";
  const isData = src.startsWith("data:");
  const defaultSizes =
    variant === "featured"
      ? "(max-width: 768px) min(100vw, 360px), 420px"
      : "(max-width: 768px) 45vw, 220px";

  const framePath = getCardFrameImagePath(card.rarity);
  const shouldRenderFrameLayer =
    ENABLE_CARD_FRAME_OVERLAY && !hasCardFrameFailed(framePath) && !frameFailed;

  return (
    <div
      data-slot="card-image-root"
      className={[variantRootClass(variant, embeddedInFrame), className ?? ""].join(" ")}
    >
      {/* 카드 배경(아트 영역 전체) */}
      <div
        data-slot="card-art-backdrop"
        className={["absolute inset-0 rounded-[inherit]", artBackdropClass(card.rarity)].join(
          " ",
        )}
        aria-hidden
      />

      {/* 음료 PNG / placeholder — contain + 중앙 + 패딩 */}
      <div
        data-slot="card-art-area"
        className={["absolute inset-0 z-1 box-border", artAreaPaddingClass()].join(" ")}
      >
        <div data-slot="card-beverage" className="relative h-full min-h-0 w-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes ?? defaultSizes}
            className="object-contain object-center"
            onError={() => setFailed(true)}
            priority={priority}
            unoptimized={isData}
          />
        </div>
      </div>

      {/* 프레임 overlay — ENABLE 시에만 시도, 실패 시 전역 캐시로 동일 경로 재요청 방지 */}
      {shouldRenderFrameLayer ? (
        <div
          data-slot="card-frame-overlay"
          className="pointer-events-none absolute inset-0 z-2"
          aria-hidden
        >
          <Image
            src={framePath}
            alt=""
            fill
            sizes={sizes ?? defaultSizes}
            className="object-contain object-center"
            onError={() => {
              registerCardFrameFailure(framePath);
              setFrameFailed(true);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
