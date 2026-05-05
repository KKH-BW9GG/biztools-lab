const NUMERALS: Record<string, string> = {
  "ビジネスSaaS・ツール": "I",
  "デスク・PCアクセサリ": "II",
  "手帳・ノート": "III",
  ビジネス書: "IV",
  "戦略・マネジメント本": "IV",
};

export function getCategoryStyle(category: string) {
  return { numeral: NUMERALS[category] ?? "·" };
}

export default function CategoryIcon({
  category,
  size = "md",
}: {
  category: string;
  size?: "sm" | "md" | "lg";
}) {
  const numeral = NUMERALS[category] ?? "·";
  const sizeClass =
    size === "lg"
      ? "w-12 h-12 text-base"
      : size === "md"
        ? "w-9 h-9 text-sm"
        : "w-7 h-7 text-xs";

  return (
    <div
      className={`${sizeClass} font-display font-medium text-ink border border-ink/30 flex items-center justify-center flex-shrink-0 tracking-tight`}
      aria-hidden
    >
      {numeral}
    </div>
  );
}
