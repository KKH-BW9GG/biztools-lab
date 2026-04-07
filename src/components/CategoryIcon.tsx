import type { ReactNode } from "react";

const ZapIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const MonitorIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const BookOpenIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const LibraryIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    <line x1="12" y1="7" x2="12" y2="21" />
  </svg>
);

const ICONS: Record<string, { icon: ReactNode; color: string; ring: string }> =
  {
    "ビジネスSaaS・ツール": {
      icon: <ZapIcon />,
      color: "text-lime",
      ring: "border-lime/20 bg-lime/10",
    },
    "デスク・PCアクセサリ": {
      icon: <MonitorIcon />,
      color: "text-blue-400",
      ring: "border-blue-400/20 bg-blue-400/10",
    },
    "手帳・ノート": {
      icon: <BookOpenIcon />,
      color: "text-amber-400",
      ring: "border-amber-400/20 bg-amber-400/10",
    },
    ビジネス書: {
      icon: <LibraryIcon />,
      color: "text-violet-400",
      ring: "border-violet-400/20 bg-violet-400/10",
    },
    "戦略・マネジメント本": {
      icon: <LibraryIcon />,
      color: "text-violet-400",
      ring: "border-violet-400/20 bg-violet-400/10",
    },
  };

const DEFAULT = {
  icon: <ZapIcon />,
  color: "text-parchment-sub",
  ring: "border-ink-border bg-ink-raised",
};

export function getCategoryStyle(category: string) {
  return ICONS[category] ?? DEFAULT;
}

export default function CategoryIcon({
  category,
  size = "md",
}: {
  category: string;
  size?: "sm" | "md" | "lg";
}) {
  const style = ICONS[category] ?? DEFAULT;
  const sizeClass =
    size === "lg" ? "w-14 h-14" : size === "md" ? "w-10 h-10" : "w-8 h-8";
  const iconScale =
    size === "lg" ? "scale-125" : size === "sm" ? "scale-75" : "";

  return (
    <div
      className={`${sizeClass} ${style.ring} border rounded-xl flex items-center justify-center flex-shrink-0 ${style.color} ${iconScale}`}
    >
      {style.icon}
    </div>
  );
}
