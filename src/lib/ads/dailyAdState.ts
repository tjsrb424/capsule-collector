import type { UserThemeState } from "@/lib/collection/types";

export function getLocalDayKey(nowMs: number = Date.now()): string {
  const d = new Date(nowMs);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function resetDailyAdCountsIfNeeded(
  themeState: UserThemeState,
  nowMs: number = Date.now(),
): UserThemeState {
  const today = getLocalDayKey(nowMs);
  if (themeState.lastAdDate === today) return themeState;
  return {
    ...themeState,
    lastAdDate: today,
    dailyAdOpenCount: 0,
    dailyAdRewardDoubleCount: 0,
  };
}

