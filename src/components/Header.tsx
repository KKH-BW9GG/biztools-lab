"use client";

import Link from "next/link";
import { useState } from "react";

const CATEGORIES = [
  { name: "ビジネスSaaS", slug: "ビジネスSaaS・ツール" },
  { name: "デスク・PC", slug: "デスク・PCアクセサリ" },
  { name: "手帳・ノート", slug: "手帳・ノート" },
  { name: "ビジネス書", slug: "ビジネス書" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink/90 backdrop-blur-xl border-b border-ink-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-13 py-3">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <span className="w-2 h-2 rounded-full bg-lime flex-shrink-0" />
            <span className="text-[15px] font-bold text-parchment tracking-tight font-sans">
              BizTools Lab
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${encodeURIComponent(cat.slug)}/`}
                className="text-xs font-medium text-parchment-sub hover:text-parchment transition-colors duration-150"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="メニュー"
          >
            <span
              className={`block w-[18px] h-[1.5px] bg-parchment transition-all duration-200 ${open ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block w-[18px] h-[1.5px] bg-parchment transition-all duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-[18px] h-[1.5px] bg-parchment transition-all duration-200 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-ink border-t border-ink-border">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${encodeURIComponent(cat.slug)}/`}
              className="block px-6 py-3.5 text-sm text-parchment-sub hover:text-parchment hover:bg-ink-raised transition-colors border-b border-ink-border/50 last:border-0"
              onClick={() => setOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
