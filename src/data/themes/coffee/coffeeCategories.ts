import type { CollectionCategory } from "@/lib/collection/types";

export const coffeeCategories: readonly CollectionCategory[] = [
  {
    id: "espressoBasic",
    themeId: "coffee",
    titleKo: "에스프레소/기본 커피",
    descriptionKo: "초반 기본 수집군",
    sortOrder: 1,
  },
  {
    id: "milkCoffee",
    themeId: "coffee",
    titleKo: "기본 우유 커피",
    descriptionKo: "부드러운 이미지의 초반~중반 수집군",
    sortOrder: 2,
  },
  {
    id: "sweetLatte",
    themeId: "coffee",
    titleKo: "시럽/달달 라떼",
    descriptionKo: "색감과 토핑 차이가 명확한 중반 수집군",
    sortOrder: 3,
  },
  {
    id: "mochaDessert",
    themeId: "coffee",
    titleKo: "모카/디저트 커피",
    descriptionKo: "디저트성 비주얼이 강한 중반~상위 수집군",
    sortOrder: 4,
  },
  {
    id: "teaLatte",
    themeId: "coffee",
    titleKo: "말차/티 라떼",
    descriptionKo: "커피와 다른 색상 톤의 변주 구간",
    sortOrder: 5,
  },
  {
    id: "refreshing",
    themeId: "coffee",
    titleKo: "청량/아이스/논커피",
    descriptionKo: "얼음/탄산/과일로 신선함을 주는 구간",
    sortOrder: 6,
  },
  {
    id: "rareIngredient",
    themeId: "coffee",
    titleKo: "희귀 재료 음료",
    descriptionKo: "고급 재료감과 풍부한 비주얼이 필요한 상위 수집군",
    sortOrder: 7,
  },
  {
    id: "timeLimited",
    themeId: "coffee",
    titleKo: "시간대 한정 음료",
    descriptionKo: "시간 조건으로 열리는 이벤트성 수집군",
    sortOrder: 8,
  },
  {
    id: "signature",
    themeId: "coffee",
    titleKo: "시그니처 음료",
    descriptionKo: "커피 테마의 대표 고급 카드군",
    sortOrder: 9,
  },
  {
    id: "legendaryCollection",
    themeId: "coffee",
    titleKo: "전설/고급 컬렉션 음료",
    descriptionKo: "커피 테마의 최종 목표 카드군",
    sortOrder: 10,
  },
] as const;

