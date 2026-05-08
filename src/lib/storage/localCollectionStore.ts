import type { LocalCollectionSave, ThemeId, UserThemeState } from "@/lib/collection/types";
import { ensureUserThemeState } from "@/lib/collection/ownership";
import { resetDailyAdCountsIfNeeded } from "@/lib/ads/dailyAdState";
import { migrateLegacyCoffeePlaceholderIds } from "@/lib/storage/migrateCoffeeCardIds";

const STORAGE_KEY = "capsuleCollector:userState:v1" as const;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function createInitialSave(selectedThemeId: ThemeId = "coffee"): LocalCollectionSave {
  const now = Date.now();
  return {
    version: 1,
    themes: {
      [selectedThemeId]: ensureUserThemeState(selectedThemeId),
    },
    selectedThemeId,
    createdAt: now,
    updatedAt: now,
  };
}

export function loadCollectionSave(): LocalCollectionSave {
  if (!isBrowser()) return createInitialSave();

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return createInitialSave();

  try {
    const parsed = JSON.parse(raw) as Partial<LocalCollectionSave> | null;
    if (!parsed || parsed.version !== 1) return createInitialSave();

    const selectedThemeId = (parsed.selectedThemeId ?? "coffee") as ThemeId;
    const themes = (parsed.themes ?? {}) as Record<string, UserThemeState>;
    if (!themes[selectedThemeId]) themes[selectedThemeId] = ensureUserThemeState(selectedThemeId);

    let migrationHappened = false;

    // daily ad counters reset (simple local date key) + legacy coffee placeholder id 제거
    for (const key of Object.keys(themes)) {
      let t = themes[key]!;
      t = resetDailyAdCountsIfNeeded(t);
      const before = JSON.stringify({
        cardStates: t.cardStates,
        representativeCardId: t.representativeCardId,
      });
      t = migrateLegacyCoffeePlaceholderIds(t);
      if (
        JSON.stringify({
          cardStates: t.cardStates,
          representativeCardId: t.representativeCardId,
        }) !== before
      ) {
        migrationHappened = true;
      }
      themes[key] = t;
    }

    const restored: LocalCollectionSave = {
      version: 1,
      themes,
      selectedThemeId,
      createdAt: typeof parsed.createdAt === "number" ? parsed.createdAt : Date.now(),
      updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : Date.now(),
    };

    if (migrationHappened) {
      saveCollectionSave({ ...restored, updatedAt: Date.now() });
    }

    return restored;
  } catch {
    return createInitialSave();
  }
}

export function saveCollectionSave(next: LocalCollectionSave): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function updateThemeStateInSave(
  save: LocalCollectionSave,
  themeId: ThemeId,
  nextThemeState: UserThemeState,
): LocalCollectionSave {
  const now = Date.now();
  return {
    ...save,
    themes: { ...save.themes, [themeId]: nextThemeState },
    selectedThemeId: save.selectedThemeId ?? themeId,
    updatedAt: now,
  };
}

export function clearCollectionSave(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}

