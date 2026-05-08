export type ThemeId = "coffee" | "deltaNova" | "darkRpg" | (string & {});

export type CardRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "signature"
  | "legendary";

export type CollectionTheme = {
  id: ThemeId;
  nameKo: string;
  descriptionKo: string;
  coverImagePath?: string;
  totalCards: number;
  isComingSoon?: boolean;
};

export type CollectionCategory = {
  id: string;
  themeId: ThemeId;
  titleKo: string;
  descriptionKo?: string;
  sortOrder: number;
};

export type CollectionCard = {
  id: string;
  themeId: ThemeId;
  categoryId: string;
  categoryTitleKo: string;
  nameKo: string;
  description?: string;
  rarity: CardRarity;
  unlockLevel?: number;
  timeLimited?: "morning" | "day" | "evening" | "night";
  sourceGame?: string;
  imagePath?: string;
  silhouetteImagePath?: string;
  /** Coffee 2048 레시피 식별자 */
  sourceRecipeId?: string;
  /** Coffee 2048 레시피 종류 (예: standard, time_limited) */
  sourceRecipeKind?: string;
  /** 상점/출처 가용성 표기 */
  sourceShopAvailability?: string;
};

export type DuplicateReward =
  | { type: "coffeePowder"; amount: number }
  | { type: "signatureShard"; amount: number }
  | { type: "legendaryBeanShard"; amount: number };

export type UserCardState = {
  cardId: string;
  owned: boolean;
  count: number;
  star: number;
  firstAcquiredAt?: number;
  lastAcquiredAt?: number;
};

export type UserThemeState = {
  themeId: ThemeId;
  cardStates: Record<string, UserCardState>;
  coffeePowder?: number;
  signatureShard?: number;
  legendaryBeanShard?: number;
  totalOpened: number;
  lastOpenedAt?: number;
  dailyAdOpenCount: number;
  dailyAdRewardDoubleCount: number;
  lastAdDate?: string; // YYYY-MM-DD
  representativeCardId?: string;
};

export type CapsuleConfig = {
  id: string;
  themeId: ThemeId;
  nameKo: string;
  descriptionKo?: string;
  targetCategoryId?: string;
  dropRates: Partial<Record<CardRarity, number>>;
  dailyAdLimit?: number;
  isPremium?: boolean;
};

export type CapsuleOpenResult = {
  card: CollectionCard;
  isNew: boolean;
  duplicateReward?: DuplicateReward;
  openedAt: number;
  rolledRarity: CardRarity;
  capsuleId: string;
  themeId: ThemeId;
};

export type LocalCollectionSave = {
  version: 1;
  themes: Record<string, UserThemeState>;
  selectedThemeId: ThemeId;
  createdAt: number;
  updatedAt: number;
};

