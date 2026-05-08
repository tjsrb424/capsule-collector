import type { CardRarity } from "@/lib/collection/types";

/**
 * 등급별 프레임 PNG. `public` 기준 URL.
 * 오버레이 표시 여부는 `cardFrameConfig.ts`의 `ENABLE_CARD_FRAME_OVERLAY`로 제어한다.
 */
export const CARD_FRAME_PATH_BY_RARITY: Record<CardRarity, string> = {
  common: "/assets/cards/shared/frames/card_frame_common.png",
  uncommon: "/assets/cards/shared/frames/card_frame_uncommon.png",
  rare: "/assets/cards/shared/frames/card_frame_rare.png",
  signature: "/assets/cards/shared/frames/card_frame_signature.png",
  legendary: "/assets/cards/shared/frames/card_frame_legendary.png",
};

export function getCardFrameImagePath(rarity: CardRarity): string {
  return CARD_FRAME_PATH_BY_RARITY[rarity];
}
