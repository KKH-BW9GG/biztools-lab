import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export default function HomePage() {
  const articles = getAllArticles();
  const picks = articles.slice(0, 3);
  const rest = articles.slice(3);

  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 md:pt-28 pb-16 md:pb-20">
        <p className="animate-fadeUp flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-muted mb-7">
          <span className="h-px w-8 bg-accent" />
          BizTools Lab — Reviews
        </p>

        <h1 className="animate-fadeUp-d1 text-[31px] md:text-[52px] font-bold text-ink leading-[1.32] md:leading-[1.28] tracking-tight text-balance">
          仕事がはかどる道具を、
          <br className="hidden sm:block" />
          <span className="text-accent">えらび抜いて</span>紹介する。
        </h1>

        <p className="animate-fadeUp-d2 mt-7 text-[15px] md:text-[16px] text-ink-soft leading-[1.95] max-w-xl">
          実際に使って良かったビジネスツール・ガジェットを中心に、気になる定番アイテムも機能や価格を調べてレビュー。仕事道具えらびの参考にどうぞ。
        </p>

        <div className="animate-fadeUp-d3 mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link
            href="#picks"
            className="inline-flex items-center gap-2 bg-ink text-paper text-[14px] font-semibold px-6 py-3 rounded-md hover:bg-accent transition-colors duration-200"
          >
            おすすめ記事を見る
            <ArrowRight />
          </Link>
          <span className="text-[13px] text-ink-muted">
            現在{" "}
            <span className="font-display text-[15px] text-ink tabular-nums">
              {articles.length}
            </span>{" "}
            本の記事を公開中
          </span>
        </div>
      </section>

      {/* Pick Up */}
      {picks.length > 0 && (
        <section id="picks" className="border-t border-paper-rule">
          <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-[22px] md:text-[28px] font-bold text-ink tracking-tight">
                おすすめ記事
              </h2>
              <p className="label-meta">Pick Up</p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {picks.map((article, i) => (
                <Link
                  key={article.slug}
                  href={`/${article.slug}/`}
                  className="group flex h-full flex-col rounded-lg border border-paper-rule bg-paper p-6 transition-all duration-200 hover:border-accent/40 hover:shadow-[0_10px_32px_-14px_rgba(29,78,216,0.3)]"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-paper">
                      Pick
                    </span>
                    <span className="font-display text-[13px] text-ink-faint tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-accent mb-2">
                    {article.category}
                  </span>

                  <h3 className="text-[17px] font-bold text-ink leading-[1.55] tracking-tight group-hover:text-accent transition-colors line-clamp-3">
                    {article.title}
                  </h3>

                  <p className="mt-2.5 text-[13px] text-ink-muted leading-[1.8] line-clamp-3">
                    {article.meta_description}
                  </p>

                  <div className="mt-auto pt-5 flex items-center justify-between">
                    <span className="font-display text-[12px] text-ink-faint tabular-nums">
                      {article.date}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[12px] font-medium text-ink-muted group-hover:text-accent transition-colors">
                      続きを読む
                      <ArrowRight className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All articles */}
      <section className="border-t border-paper-rule bg-paper-deep">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="text-[22px] md:text-[28px] font-bold text-ink tracking-tight">
              記事一覧
            </h2>
            <p className="label-meta">All Articles</p>
          </div>

          {rest.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((article, i) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  index={i + picks.length}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-lg border border-paper-rule bg-paper">
              <p className="text-ink-muted text-sm">
                記事は順次追加していきます
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
