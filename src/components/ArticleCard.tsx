import Link from "next/link";
import type { ArticleSummary } from "@/lib/articles";
import { getCategoryStyle } from "./CategoryIcon";

export default function ArticleCard({
  article,
  index,
}: {
  article: ArticleSummary;
  index?: number;
}) {
  const style = getCategoryStyle(article.category);
  const num = index !== undefined ? String(index + 1).padStart(2, "0") : null;

  return (
    <Link href={`/${article.slug}/`} className="block group">
      <div
        className="relative bg-ink-raised border border-ink-border rounded-2xl overflow-hidden h-full
                    hover:border-ink-divider hover:-translate-y-0.5 transition-all duration-300
                    hover:shadow-2xl hover:shadow-black/40"
      >
        {/* Top accent line */}
        <div
          className={`h-[2px] w-full transition-all duration-300 ${style.color} opacity-40 group-hover:opacity-100`}
          style={{ background: "currentColor" }}
        />

        <div className="px-6 pt-5 pb-6">
          {/* Meta row */}
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-[10px] font-semibold tracking-widest uppercase ${style.color}`}
            >
              {article.category}
            </span>
            {num && (
              <span className="text-[11px] font-bold text-ink-divider tabular-nums font-sans">
                {num}
              </span>
            )}
          </div>

          <h2
            className="font-bold text-parchment leading-snug text-[15px]
                         group-hover:text-white transition-colors duration-200 line-clamp-2"
          >
            {article.title}
          </h2>

          <p className="mt-2.5 text-[13px] text-parchment-sub leading-relaxed line-clamp-2">
            {article.meta_description}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-[11px] text-ink-divider">{article.date}</span>
            <span
              className="text-[11px] font-semibold text-lime opacity-0 group-hover:opacity-100
                             transition-opacity duration-200 flex items-center gap-1"
            >
              Read
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="mt-px"
              >
                <path
                  d="M4.5 2.5L8 6L4.5 9.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
