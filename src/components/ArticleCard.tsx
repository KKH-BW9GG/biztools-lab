import Link from "next/link";
import type { ArticleSummary } from "@/lib/articles";

export default function ArticleCard({
  article,
  index,
}: {
  article: ArticleSummary;
  index?: number;
}) {
  const num = index !== undefined ? String(index + 1).padStart(2, "0") : null;

  return (
    <Link href={`/${article.slug}/`} className="block group h-full">
      <article className="flex h-full flex-col rounded-md border border-paper-rule bg-paper p-5 transition-all duration-200 hover:border-ink/30 hover:shadow-[0_8px_24px_-14px_rgba(20,22,26,0.22)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold tracking-[0.03em] text-accent">
            {article.category}
          </span>
          {num && (
            <span className="font-display italic text-[13px] text-ink-faint tabular-nums">
              {num}
            </span>
          )}
        </div>

        <h2 className="text-[15px] font-bold text-ink leading-[1.65] tracking-tight group-hover:text-accent transition-colors duration-200 line-clamp-3">
          {article.title}
        </h2>

        <p className="mt-2 text-[12.5px] text-ink-muted leading-[1.75] line-clamp-2">
          {article.meta_description}
        </p>

        <div className="mt-4 pt-3.5 flex items-center justify-between border-t border-paper-rule">
          <span className="font-display text-[12px] text-ink-faint tabular-nums">
            {article.date}
          </span>
          <span className="inline-flex items-center gap-1 text-[12px] font-medium text-ink-muted group-hover:text-accent transition-colors">
            続きを読む
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
