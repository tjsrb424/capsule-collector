"use client";

export function CapsuleOpenButton({
  disabled,
  onClick,
}: {
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={[
        "h-14 w-full rounded-2xl font-extrabold tracking-tight shadow-sm",
        "bg-gradient-to-r from-[#D8A66A] to-[#B9783F] text-white",
        "hover:brightness-105 active:scale-[0.99] transition",
        "disabled:opacity-60 disabled:hover:brightness-100 disabled:cursor-not-allowed",
      ].join(" ")}
    >
      기본 커피 캡슐 열기 (1회)
    </button>
  );
}

