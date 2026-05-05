import { getAllArticles, getAllCategories } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";

const PRINCIPLES = [
  {
    num: "I",
    title: "全部、自腹で買う。",
    desc: "紹介するアイテムは全て自分で購入し使ったもの。提供品レビューはゼロ。",
  },
  {
    num: "II",
    title: "良し悪し、両方書く。",
    desc: "忖度しない。買って後悔した点も同じ重量で書く。",
  },
  {
    num: "III",
    title: "仕事に効くか、だけ。",
    desc: "「結局、生産性が上がったか」を唯一の評価軸に置く。",
  },
];

export default function HomePage() {
  const articles = getAllArticles();
  const categories = getAllCategories();
  const todayLabel = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-paper">
      {/* Masthead */}
      <section className="max-w-6xl mx-auto px-6 pt-12 md:pt-16 pb-20 md:pb-28">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-ink-muted mb-12">
          <span className="font-display tabular-nums">{todayLabel}</span>
          <span className="font-display italic">Issue · 01</span>
          <span className="font-display tabular-nums">
            {articles.length} reviews
          </span>
        </div>

        <div className="rule-strong mb-10" />

        <div className="grid md:grid-cols-12 gap-6 md:gap-10">
          <div className="md:col-span-2 hidden md:block">
            <p className="font-display italic text-navy text-[15px] leading-snug pt-2">
              元コンサル
              <br />
              のビジネスマン
              <br />
              が書く、
            </p>
          </div>

          <div className="md:col-span-10">
            <h1 className="animate-fadeUp font-display text-[14vw] md:text-[112px] lg:text-[128px] font-medium text-ink leading-[0.92] tracking-[-0.03em] text-balance">
              <span className="block">
                本当に<span className="font-jp-serif font-medium">使えた</span>
              </span>
              <span className="block italic font-medium text-navy">
                道具だけ、
              </span>
              <span className="block">紹介する。</span>
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-6 md:gap-10 mt-12 md:mt-16">
          <div className="md:col-span-7 md:col-start-3">
            <p className="animate-fadeUp-d1 font-jp-serif text-[15px] md:text-[17px] text-ink-soft leading-[1.9]">
              ビジネスSaaS、デスク周りのガジェット、手帳、ビジネス書 ─
              一度は通った道具を、
              <br className="hidden md:block" />
              短い手記の形でレビューします。書くのはひとり、買うのもひとり。
            </p>
          </div>
          <div className="md:col-span-2 md:col-start-10 mt-4 md:mt-0 flex md:justify-end items-end">
            <Link
              href="#articles"
              className="animate-fadeUp-d2 inline-flex items-center gap-2 font-display italic text-[14px] text-ink hover:text-navy border-b border-ink hover:border-navy pb-1 transition-colors"
            >
              一覧へ
              <span>↓</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Principles */}
      <section className="border-t border-ink">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-baseline justify-between mb-10">
            <p className="label-meta">Editorial Principles</p>
            <p className="font-display italic text-ink-muted text-[13px]">
              三つの約束
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border-t border-ink/30">
            {PRINCIPLES.map((p) => (
              <div
                key={p.num}
                className="py-8 md:px-8 md:first:pl-0 md:last:pr-0 md:[&:not(:last-child)]:border-r border-ink/15 border-b md:border-b-0"
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-display italic text-navy text-[34px] leading-none font-medium">
                    {p.num}
                  </span>
                  <span className="label-meta text-ink-muted">No. {p.num}</span>
                </div>
                <h3 className="font-jp-serif text-[18px] font-semibold text-ink leading-snug mb-2">
                  {p.title}
                </h3>
                <p className="text-[13px] text-ink-soft leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="border-t border-ink/30 bg-paper-deep/40">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="flex items-baseline justify-between mb-8">
              <p className="label-meta">Sections</p>
              <p className="font-display italic text-ink-muted text-[13px]">
                領域
              </p>
            </div>

            <ul className="divide-y divide-ink/15 border-t border-b border-ink/15">
              {categories.map((cat, i) => {
                const count = articles.filter((a) => a.category === cat).length;
                return (
                  <li key={cat}>
                    <Link
                      href={`/category/${encodeURIComponent(cat)}/`}
                      className="group flex items-baseline gap-6 py-5 hover:pl-3 transition-all duration-300"
                    >
                      <span className="font-display text-ink-muted text-[13px] tabular-nums w-8 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-jp-serif text-[20px] md:text-[22px] text-ink group-hover:text-navy transition-colors flex-1">
                        {cat}
                      </span>
                      <span className="font-display text-[12px] text-ink-muted tabular-nums tracking-wide hidden sm:inline-block">
                        {count} {count === 1 ? "entry" : "entries"}
                      </span>
                      <span className="font-display italic text-navy opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* Reviews list */}
      <section id="articles" className="border-t border-ink/30">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="label-meta mb-3">All Reviews</p>
              <h2 className="font-display text-[44px] md:text-[64px] font-medium text-ink leading-[0.95] tracking-tight">
                Latest{" "}
                <span className="italic font-normal text-navy">Reviews.</span>
              </h2>
            </div>
            <p className="font-display italic text-ink-muted text-[13px] hidden md:block">
              現在{" "}
              <span className="tabular-nums text-ink not-italic font-medium">
                {articles.length}
              </span>{" "}
              本公開中
            </p>
          </div>

          {articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
              {articles.map((article, i) => (
                <ArticleCard key={article.slug} article={article} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border-y border-paper-rule">
              <p className="font-display italic text-ink-muted">
                記事を準備中です
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Trust */}
      <section className="border-t border-ink bg-paper-deep/30">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <p className="label-meta mb-4">Editorial Statement</p>
          <p className="font-jp-serif text-[19px] md:text-[22px] text-ink leading-[1.7] max-w-2xl mx-auto mb-3">
            紹介するアイテムは全て筆者が自分で購入し、実際に仕事で使ったものです。
            <br />
            記事内にアフィリエイトリンクを含みますが、評価への影響は一切ありません。
          </p>
          <p className="font-display italic text-navy text-sm mt-6">
            ─ 全て自腹。忖度ゼロ。
          </p>
        </div>
      </section>
    </div>
  );
}
