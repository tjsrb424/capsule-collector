import type { CollectionCard } from "@/lib/collection/types";

export const coffeeCards: readonly CollectionCard[] = [
  {
    id: "americano",
    themeId: "coffee",
    categoryId: "espressoBasic",
    categoryTitleKo: "에스프레소/기본 커피",
    nameKo: "아메리카노",
    rarity: "common",
    unlockLevel: 1,
    sourceGame: "coffee2048",
    imagePath: "/assets/cards/coffee/final/americano.png",
  },
  {
    id: "espresso",
    themeId: "coffee",
    categoryId: "espressoBasic",
    categoryTitleKo: "에스프레소/기본 커피",
    nameKo: "에스프레소",
    rarity: "common",
    unlockLevel: 2,
    sourceGame: "coffee2048",
    imagePath: "/assets/cards/coffee/final/espresso.png",
  },
  {
    id: "doppio",
    themeId: "coffee",
    categoryId: "espressoBasic",
    categoryTitleKo: "에스프레소/기본 커피",
    nameKo: "도피오",
    rarity: "common",
    unlockLevel: 3,
    sourceGame: "coffee2048",
    imagePath: "/assets/cards/coffee/final/doppio.png",
  },
  {
    id: "lungo",
    themeId: "coffee",
    categoryId: "espressoBasic",
    categoryTitleKo: "에스프레소/기본 커피",
    nameKo: "룽고",
    rarity: "common",
    unlockLevel: 4,
    sourceGame: "coffee2048",
    imagePath: "/assets/cards/coffee/final/lungo.png",
  },
  {
    id: "ristretto",
    themeId: "coffee",
    categoryId: "espressoBasic",
    categoryTitleKo: "에스프레소/기본 커피",
    nameKo: "리스트레토",
    rarity: "uncommon",
    unlockLevel: 6,
    sourceGame: "coffee2048",
    imagePath: "/assets/cards/coffee/final/ristretto.png",
  },
  {
    id: "cafe_crema",
    themeId: "coffee",
    categoryId: "espressoBasic",
    categoryTitleKo: "에스프레소/기본 커피",
    nameKo: "카페 크레마",
    rarity: "uncommon",
    unlockLevel: 7,
    sourceGame: "coffee2048",
    imagePath: "/assets/cards/coffee/final/cafe_crema.png",
  },
  {
    id: "cold_brew",
    themeId: "coffee",
    categoryId: "espressoBasic",
    categoryTitleKo: "에스프레소/기본 커피",
    nameKo: "콜드브루",
    rarity: "uncommon",
    unlockLevel: 9,
    sourceGame: "coffee2048",
    imagePath: "/assets/cards/coffee/final/cold_brew.png",
  },
  {
    id: "long_black",
    themeId: "coffee",
    categoryId: "espressoBasic",
    categoryTitleKo: "에스프레소/기본 커피",
    nameKo: "롱 블랙",
    rarity: "uncommon",
    unlockLevel: 10,
    sourceGame: "coffee2048",
    imagePath: "/assets/cards/coffee/final/long_black.png",
  },

  // NOTE(Sprint 3):
  // Coffee 2048의 80종 레시피 전체 입력이 목표지만, 현재 워크스페이스에 원본 80종 목록이 포함되어 있지 않아
  // 우선 도감/캡슐 시스템이 80장/10카테고리 구조로 동작하는지 검증할 수 있도록 placeholder 72장을 채워둔다.
  // 실제 음료명/설명/해금레벨/시간대 등은 원본 레시피 수급 후 교체한다.
  ...Array.from({ length: 72 }).map((_, i) => {
    const idx = i + 9; // 1~8은 샘플 카드
    const padded = String(idx).padStart(3, "0");

    const categoryOrder = [
      { id: "milkCoffee", titleKo: "기본 우유 커피", rarity: "uncommon" as const },
      { id: "sweetLatte", titleKo: "시럽/달달 라떼", rarity: "rare" as const },
      { id: "mochaDessert", titleKo: "모카/디저트 커피", rarity: "rare" as const },
      { id: "teaLatte", titleKo: "말차/티 라떼", rarity: "uncommon" as const },
      { id: "refreshing", titleKo: "청량/아이스/논커피", rarity: "uncommon" as const },
      { id: "rareIngredient", titleKo: "희귀 재료 음료", rarity: "signature" as const },
      { id: "timeLimited", titleKo: "시간대 한정 음료", rarity: "rare" as const },
      { id: "signature", titleKo: "시그니처 음료", rarity: "signature" as const },
      { id: "legendaryCollection", titleKo: "전설/고급 컬렉션 음료", rarity: "legendary" as const },
    ] as const;

    const group = categoryOrder[i % categoryOrder.length]!;
    return {
      id: `coffee_${padded}`,
      themeId: "coffee",
      categoryId: group.id,
      categoryTitleKo: group.titleKo,
      nameKo: `커피 레시피 ${padded}`,
      description: "TODO: Coffee 2048 원본 레시피로 교체 필요",
      rarity: group.rarity,
      unlockLevel: idx,
      sourceGame: "coffee2048",
      imagePath: `/assets/cards/coffee/final/coffee_${padded}.png`,
    } satisfies CollectionCard;
  }),
] as const;

