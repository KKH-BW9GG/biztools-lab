"use client";

import Link from "next/link";
import { useState } from "react";

const CATEGORIES = [
  { name: "ビジネスSaaS", slug: "ビジネスSaaS・ツール" },
  { name: "デスク・PC", slug: "デスク・PCアクセサリ" },
  { name: "手帳・ノート", slug: "手帳・ノート" },
  { name: "ビジネス書", slug: "ビジネス書" },
];

function Logo() {
  return (
    <span className="flex items-baseline gap-[3px] leading-none">
      <span className="text-[19px] font-bold tracking-tight text-ink">
        BizTools
      </span>
      <span className="text-[19px] font-bold tracking-tight text-accent">
        Lab
      </span>
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-paper-rule">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${encodeURIComponent(cat.slug)}/`}
                className="text-[13px] font-medium text-ink-soft hover:text-accent transition-colors duration-150"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="メニュー"
          >
            <span
              className={`block w-[18px] h-[1.5px] bg-ink transition-all duration-200 ${open ? "rotate-45 translate-y-[6.5px]" : ""}`}
            />
            <span
              className={`block w-[18px] h-[1.5px] bg-ink transition-all duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-[18px] h-[1.5px] bg-ink transition-all duration-200 ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-paper border-t border-paper-rule">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${encodeURIComponent(cat.slug)}/`}
              className="block px-6 py-3.5 text-sm font-medium text-ink-soft hover:text-accent hover:bg-paper-deep transition-colors border-b border-paper-rule last:border-0"
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
