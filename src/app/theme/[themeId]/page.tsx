import Link from "next/link";
import { CoffeeThemeHomeClient } from "@/components/theme/CoffeeThemeHomeClient";
import type { ThemeId } from "@/lib/collection/types";

export default async function ThemeHomePage({
  params,
}: {
  params: Promise<{ themeId: string }>;
}) {
  const { themeId } = await params;
  const themeIdNormalized = themeId.trim().toLowerCase() as ThemeId;

  if (themeIdNormalized !== "coffee") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto w-full max-w-md px-4 pb-10 pt-8">
          <Link className="text-sm font-semibold text-zinc-700" href="/">
            ← 메인으로
          </Link>
          <h1 className="mt-4 text-2xl font-black text-zinc-950">Coming Soon</h1>
          <p className="mt-2 text-sm font-medium text-zinc-600">
            이 테마는 준비 중입니다.
          </p>
        </div>
      </div>
    );
  }

  return <CoffeeThemeHomeClient />;
}

