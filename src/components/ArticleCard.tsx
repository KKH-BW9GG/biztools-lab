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
      <article className="relative h-full pt-6 pb-7 border-t border-ink/20 hover:border-ink transition-colors duration-300">
        <div className="flex items-start justify-between mb-4">
          <span className="label-meta text-ink-soft">{article.category}</span>
          {num && (
            <span className="font-display text-[13px] text-ink-muted tabular-nums tracking-tight">
              No.{num}
            </span>
          )}
        </div>

        <h2 className="font-jp-serif text-[19px] md:text-[20px] font-medium text-ink leading-[1.45] tracking-tight group-hover:text-navy transition-colors duration-200 line-clamp-3 mb-3">
          {article.title}
        </h2>

        <p className="text-[13px] text-ink-soft leading-relaxed line-clamp-2 mb-6">
          {article.meta_description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-display text-[11px] text-ink-muted tabular-nums tracking-wide">
            {article.date}
          </span>
          <span className="font-display italic text-[12px] text-navy opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            続きを読む
            <span className="ml-1.5 inline-block group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          </span>
        </div>
      </article>
    </Link>
  );
}
