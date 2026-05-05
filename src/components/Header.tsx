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
    <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md border-b border-ink/15">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="flex items-baseline gap-1.5 group"
            onClick={() => setOpen(false)}
          >
            <span className="font-display text-[20px] font-semibold text-ink tracking-tight leading-none">
              BizTools
            </span>
            <span className="font-display italic text-[20px] font-medium text-navy tracking-tight leading-none">
              Lab
            </span>
            <span className="hidden sm:inline-block ml-2 label-meta text-ink-muted text-[9px] pl-2 border-l border-ink/20 leading-none self-center">
              Vol. 01
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${encodeURIComponent(cat.slug)}/`}
                className="font-jp-serif text-[13px] text-ink-soft hover:text-navy transition-colors duration-150"
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
              className={`block w-[18px] h-[1px] bg-ink transition-all duration-200 ${open ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block w-[18px] h-[1px] bg-ink transition-all duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-[18px] h-[1px] bg-ink transition-all duration-200 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-paper border-t border-ink/10">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${encodeURIComponent(cat.slug)}/`}
              className="block px-6 py-3.5 font-jp-serif text-sm text-ink-soft hover:text-navy hover:bg-paper-deep transition-colors border-b border-paper-rule last:border-0"
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
