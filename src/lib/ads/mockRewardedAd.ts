export type MockRewardType =
  | "coffeeAdBonusCapsule"
  | "duplicateRewardDouble";

export type MockRewardedAdResult = {
  ok: true;
  rewardType: MockRewardType;
  watchedMs: number;
};

export async function watchMockRewardedAd(
  rewardType: MockRewardType,
  opts?: { delayMs?: number },
): Promise<MockRewardedAdResult> {
  const delayMs = opts?.delayMs ?? 1000;
  await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
  return { ok: true, rewardType, watchedMs: delayMs };
}

