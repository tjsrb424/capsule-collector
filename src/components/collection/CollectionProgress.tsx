"use client";

export function CollectionProgress({
  ownedCount,
  totalCount,
  score,
}: {
  ownedCount: number;
  totalCount: number;
  score: number;
}) {
  const pct = totalCount === 0 ? 0 : Math.round((ownedCount / totalCount) * 100);
  return (
    <div className="rounded-2xl bg-white/70 ring-1 ring-[#2A1710]/10 p-4 shadow-sm">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-[#2A1710]">수집률</div>
          <div className="mt-1 text-2xl font-bold tracking-tight text-[#2A1710]">
            {ownedCount} / {totalCount}
            <span className="ml-2 text-sm font-semibold text-[#5A321E]/70">
              ({pct}%)
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-[#2A1710]">컬렉션 점수</div>
          <div className="mt-1 text-2xl font-bold tracking-tight text-[#2A1710]">
            {score.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#2A1710]/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#D8A66A] to-[#B9783F]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

