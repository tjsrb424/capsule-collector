import type { CollectionCard } from "@/lib/collection/types";

export type CoffeeImageAuditReport = {
  totalCards: number;
  cardsWithImagePathField: number;
  /** imagePath basename이 `{id}.png` 와 불일치하는 카드 id */
  imagePathMismatchIds: string[];
  /** `{id}.png` 가 final 폴더에 존재하는 카드 수 */
  idPngExistsCount: number;
  /** 존재하지 않는 `{id}.png` — placeholder fallback 대상 */
  missingIdPngCardIds: string[];
  /** 폴더에 있는 PNG 파일명 전체 */
  finalBasenames: string[];
  /** 어떤 카드의 id.png 도 아닌 파일 (한글 원본·중복본 포함) */
  filesNotMatchingAnyCardIdPng: string[];
};

function basenameFromImagePath(imagePath: string): string | null {
  const m = imagePath.match(/\/([^/]+\.png)$/i);
  return m?.[1] ?? null;
}

/**
 * 커피 카드와 `public/assets/cards/coffee/final/` 에 들어 있는 PNG 목록을 비교한다.
 * (파일 시스템 접근 없음 — basename 목록을 호출 측에서 넘긴다.)
 */
export function auditCoffeeCardImages(
  cards: readonly Pick<CollectionCard, "id" | "imagePath">[],
  finalPngBasenames: readonly string[],
): CoffeeImageAuditReport {
  const lowerSet = new Set(finalPngBasenames.map((n) => n.toLowerCase()));
  const expectedBasenames = new Set<string>();
  const imagePathMismatchIds: string[] = [];

  let cardsWithImagePathField = 0;
  const missingIdPngCardIds: string[] = [];

  for (const c of cards) {
    if (c.imagePath?.trim()) cardsWithImagePathField += 1;
    const expected = `${c.id}.png`;
    const pathBase = c.imagePath ? basenameFromImagePath(c.imagePath) : null;
    if (pathBase && pathBase.toLowerCase() !== expected.toLowerCase()) {
      imagePathMismatchIds.push(c.id);
    }
    expectedBasenames.add(expected);
    if (!lowerSet.has(expected.toLowerCase())) {
      missingIdPngCardIds.push(c.id);
    }
  }

  const idPngExistsCount = cards.length - missingIdPngCardIds.length;

  const filesNotMatchingAnyCardIdPng = finalPngBasenames.filter((name) => {
    const base = name.toLowerCase();
    return !Array.from(expectedBasenames).some((exp) => exp.toLowerCase() === base);
  });

  return {
    totalCards: cards.length,
    cardsWithImagePathField,
    imagePathMismatchIds,
    idPngExistsCount,
    missingIdPngCardIds,
    finalBasenames: [...finalPngBasenames].sort((a, b) =>
      a.localeCompare(b, "ko"),
    ),
    filesNotMatchingAnyCardIdPng: [...filesNotMatchingAnyCardIdPng].sort((a, b) =>
      a.localeCompare(b, "ko"),
    ),
  };
}
