import { getAllArticles, getAllCategories } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";

const PRINCIPLES = [
  {
    num: "01",
    title: "全部、自腹で買う",
    desc: "紹介するアイテムは全て自分で購入し使ったもの。提供品レビューはゼロ。",
  },
  {
    num: "02",
    title: "良し悪し、両方書く",
    desc: "忖度しない。買って後悔した点も、良かった点と同じ重さで書く。",
  },
  {
    num: "03",
    title: "仕事に効くか、だけ",
    desc: "「結局、生産性が上がったか」を唯一の評価軸に置く。",
  },
];

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
  const categories = getAllCategories();

  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 md:pt-28 pb-16 md:pb-24">
        <p className="animate-fadeUp flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-muted mb-7">
          <span className="h-px w-8 bg-accent" />
          BizTools Lab — Reviews
        </p>

        <h1 className="animate-fadeUp-d1 text-[31px] md:text-[52px] font-bold text-ink leading-[1.32] md:leading-[1.28] tracking-tight text-balance">
          本当に使えた道具だけを、
          <br className="hidden sm:block" />
          <span className="text-accent">正直に</span>レビューする。
        </h1>

        <p className="animate-fadeUp-d2 mt-7 text-[15px] md:text-[16px] text-ink-soft leading-[1.95] max-w-xl">
          ビジネスSaaS、デスク周りのガジェット、手帳、ビジネス書。元コンサルのビジネスマンが自腹で買って実際に仕事で使ったものだけを、忖度なくレビューします。
        </p>

        <div className="animate-fadeUp-d3 mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link
            href="#articles"
            className="inline-flex items-center gap-2 bg-ink text-paper text-[14px] font-semibold px-6 py-3 rounded-md hover:bg-accent transition-colors duration-200"
          >
            レビューを読む
            <ArrowRight />
          </Link>
          <span className="text-[13px] text-ink-muted">
            現在{" "}
            <span className="font-display text-[15px] text-ink tabular-nums">
              {articles.length}
            </span>{" "}
            本のレビューを公開中
          </span>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-paper-rule bg-paper-deep">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <p className="label-meta mb-10">3つの約束</p>
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-10">
            {PRINCIPLES.map((p) => (
              <div key={p.num}>
                <span className="font-display text-[15px] font-medium text-accent tabular-nums">
                  {p.num}
                </span>
                <div className="mt-3 h-px w-full bg-paper-rule" />
                <h3 className="mt-4 text-[16px] font-bold text-ink leading-snug">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13px] text-ink-muted leading-[1.85]">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="border-t border-paper-rule">
          <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-[20px] md:text-[24px] font-bold text-ink tracking-tight">
                カテゴリから探す
              </h2>
              <p className="label-meta">Sections</p>
            </div>

            <ul className="border-t border-paper-rule">
              {categories.map((cat, i) => {
                const count = articles.filter((a) => a.category === cat).length;
                return (
                  <li key={cat} className="border-b border-paper-rule">
                    <Link
                      href={`/category/${encodeURIComponent(cat)}/`}
                      className="group flex items-center gap-5 py-5 transition-colors"
                    >
                      <span className="font-display text-[13px] text-ink-faint tabular-nums w-7 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[16px] md:text-[18px] font-bold text-ink group-hover:text-accent transition-colors flex-1">
                        {cat}
                      </span>
                      <span className="text-[12px] text-ink-muted tabular-nums">
                        {count} 本
                      </span>
                      <ArrowRight className="text-ink-faint group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* Reviews */}
      <section
        id="articles"
        className="border-t border-paper-rule bg-paper-deep"
      >
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="text-[22px] md:text-[28px] font-bold text-ink tracking-tight">
              最新のレビュー
            </h2>
            <p className="label-meta">All Reviews</p>
          </div>

          {articles.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((article, i) => (
                <ArticleCard key={article.slug} article={article} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 rounded-lg border border-paper-rule bg-paper">
              <p className="text-ink-muted text-sm">記事を準備中です</p>
            </div>
          )}
        </div>
      </section>

      {/* Statement */}
      <section className="border-t border-paper-rule">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
          <p className="label-meta mb-5">Editorial Statement</p>
          <p className="text-[17px] md:text-[19px] font-medium text-ink leading-[1.9]">
            紹介するアイテムは全て筆者が自分で購入し、実際に仕事で使ったものです。記事内にアフィリエイトリンクを含みますが、評価への影響は一切ありません。
          </p>
          <p className="mt-6 text-[13px] font-semibold text-accent">
            全て自腹。忖度ゼロ。
          </p>
        </div>
      </section>
    </div>
  );
}
