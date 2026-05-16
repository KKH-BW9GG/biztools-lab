import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
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

function SectionHead({ jp, en }: { jp: string; en: string }) {
  return (
    <div className="mb-6">
      <div className="rule-strong mb-3" />
      <div className="flex items-baseline justify-between">
        <h2 className="text-[20px] md:text-[25px] font-bold text-ink tracking-tight">
          {jp}
        </h2>
        <span className="font-display italic text-[16px] text-accent">
          {en}
        </span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const articles = getAllArticles();
  const picks = articles.slice(0, 3);
  const rest = articles.slice(3);

  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-14 md:pt-20 pb-12 md:pb-14">
        <p className="animate-fadeUp flex items-center gap-3 mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
          <span className="font-display italic normal-case tracking-normal text-[15px] text-accent">
            Reviews
          </span>
          <span className="h-px w-7 bg-accent/40" />
          ビジネスツール・ガジェット
        </p>

        <h1 className="animate-fadeUp-d1 text-[24px] md:text-[40px] font-bold text-ink leading-[1.6] md:leading-[1.45] tracking-tight text-balance">
          仕事、プライベートの生産性を最大化する
          <br className="hidden sm:block" />
          <span className="font-display text-accent">Professional</span>
          のための道具をご紹介。
        </h1>

        <p className="animate-fadeUp-d2 mt-5 text-[14px] md:text-[15px] text-ink-soft leading-[1.8] max-w-xl">
          実際に使って良かったビジネスツール・ガジェットを中心に、気になる定番アイテムも機能や価格を調べてレビュー。仕事道具えらびの参考にどうぞ。
        </p>

        <div className="animate-fadeUp-d3 mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="#picks"
            className="inline-flex items-center gap-2 bg-ink text-paper text-[13px] font-semibold px-5 py-2.5 rounded-md hover:bg-accent transition-colors duration-200"
          >
            おすすめ記事を見る
            <ArrowRight />
          </Link>
          <span className="text-[12px] text-ink-muted">
            現在{" "}
            <span className="font-display text-[14px] text-ink tabular-nums">
              {articles.length}
            </span>{" "}
            本公開中
          </span>
        </div>
      </section>

      {/* Pick Up */}
      {picks.length > 0 && (
        <section id="picks" className="border-t border-paper-rule">
          <div className="max-w-5xl mx-auto px-6 py-12 md:py-14">
            <SectionHead jp="おすすめ記事" en="Pick Up" />

            <div className="grid gap-5 md:grid-cols-3">
              {picks.map((article, i) => (
                <Link
                  key={article.slug}
                  href={`/${article.slug}/`}
                  className="group flex h-full flex-col rounded-md border border-paper-rule bg-paper p-5 transition-all duration-200 hover:border-accent/45 hover:shadow-[0_10px_30px_-16px_rgba(29,78,216,0.35)]"
                >
                  <div className="flex items-center gap-2 mb-3.5">
                    <span className="inline-flex items-center rounded-sm bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-paper">
                      Pick
                    </span>
                    <span className="font-display italic text-[14px] text-ink-faint tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-accent mb-1.5">
                    {article.category}
                  </span>

                  <h3 className="text-[16px] font-bold text-ink leading-[1.6] tracking-tight group-hover:text-accent transition-colors line-clamp-3">
                    {article.title}
                  </h3>

                  <p className="mt-2 text-[12.5px] text-ink-muted leading-[1.75] line-clamp-3">
                    {article.meta_description}
                  </p>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-paper-rule mt-4">
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
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-14">
          <SectionHead jp="記事一覧" en="All Articles" />

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
            <div className="text-center py-16 rounded-md border border-paper-rule bg-paper">
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
