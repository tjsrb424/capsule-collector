import type { UserCardState } from "./types";

// Master design 기준:
// 1성: 최초 획득 (총 1장)
// 2성: 중복 1장 (총 2장)
// 3성: 중복 3장 (총 4장)
// 4성: 중복 6장 (총 7장)
// 5성: 중복 10장 (총 11장)
const starThresholds = [
  { star: 1, minTotal: 1 },
  { star: 2, minTotal: 2 },
  { star: 3, minTotal: 4 },
  { star: 4, minTotal: 7 },
  { star: 5, minTotal: 11 },
] as const;

export function computeStarFromCount(totalCount: number): number {
  let star = 1;
  for (const t of starThresholds) {
    if (totalCount >= t.minTotal) star = t.star;
  }
  return star;
}

export function getNextStarProgress(totalCount: number): {
  star: number;
  nextStar: number | null;
  remainingToNext: number | null;
} {
  const star = computeStarFromCount(totalCount);
  const next = starThresholds.find((t) => t.star === star + 1);
  if (!next) return { star, nextStar: null, remainingToNext: null };
  return {
    star,
    nextStar: next.star,
    remainingToNext: Math.max(0, next.minTotal - totalCount),
  };
}

export function formatStar(star: number): string {
  const clamped = Math.min(5, Math.max(1, Math.floor(star)));
  return "★".repeat(clamped);
}

export function getCardStarInfo(cardState: UserCardState | undefined): {
  count: number;
  star: number;
  remainingToNext: number | null;
} {
  const count = cardState?.count ?? 0;
  const { star, remainingToNext } = getNextStarProgress(count);
  return { count, star, remainingToNext };
}

