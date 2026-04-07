import { getAllArticles, getAllCategories } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import CategoryIcon from "@/components/CategoryIcon";
import Link from "next/link";

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const TargetIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const FEATURES = [
  {
    icon: <CheckIcon />,
    title: "全部自腹",
    desc: "紹介するアイテムは全て自分で買って使ったもの。提供品レビューはゼロ",
  },
  {
    icon: <SearchIcon />,
    title: "良い点も悪い点も",
    desc: "忖度なし。買って後悔したポイントも正直に書く",
  },
  {
    icon: <TargetIcon />,
    title: "仕事で使えるか",
    desc: "「結局仕事の生産性が上がったか？」だけを基準に評価",
  },
];

export default function HomePage() {
  const articles = getAllArticles();
  const categories = getAllCategories();

  const featured = categories
    .slice(0, 4)
    .map((cat) => {
      const catArticles = articles.filter((a) => a.category === cat);
      return { category: cat, article: catArticles[0] };
    })
    .filter((f) => f.article);

  return (
    <div className="min-h-screen bg-ink">
      {/* Hero */}
      <section className="relative overflow-hidden hero-dot-grid">
        {/* Fade vignette over dot grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-32">
          {/* Label */}
          <div className="animate-fadeUp inline-flex items-center gap-2.5 border border-ink-border rounded-full px-4 py-1.5 text-[11px] font-semibold text-parchment-sub mb-10 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-lime rounded-full" />
            実体験レビュー &mdash; 全て自腹購入
          </div>

          {/* Headline */}
          <h1 className="animate-fadeUp-d1 text-5xl md:text-[72px] font-extrabold text-parchment leading-[1.04] tracking-tight mb-4 max-w-3xl">
            使って良かった
            <br />
            ものだけ。
          </h1>
          <p className="animate-fadeUp-d1 text-4xl md:text-[56px] font-extrabold text-lime leading-[1.04] tracking-tight mb-8">
            正直レビュー。
          </p>

          <p className="animate-fadeUp-d2 text-parchment-sub text-base md:text-lg max-w-md leading-relaxed mb-10">
            元コンサルのビジネスマンが、自腹で買って本当に仕事に役立ったアイテムだけを紹介します。
          </p>

          <div className="animate-fadeUp-d3 flex items-center gap-4 flex-wrap">
            <Link
              href="#articles"
              className="inline-flex items-center gap-2 bg-lime text-ink font-bold text-sm px-6 py-3 rounded-full
                         hover:bg-lime-hover transition-all duration-200 hover:shadow-lg hover:shadow-lime/20"
            >
              レビューを読む
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 2.5V11.5M7 11.5L11 7.5M7 11.5L3 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <span className="text-[12px] text-parchment-sub">
              {articles.length}本のレビュー &middot; {categories.length}カテゴリ
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-ink-raised border border-ink-border rounded-2xl p-5 flex gap-4"
            >
              <span className="text-lime flex-shrink-0 mt-0.5">{f.icon}</span>
              <div>
                <h3 className="text-sm font-bold text-parchment">{f.title}</h3>
                <p className="text-[13px] text-parchment-sub mt-1 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* カテゴリ別 */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <p className="text-[10px] font-semibold text-lime tracking-widest uppercase mb-2">
                Categories
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-parchment">
                カテゴリから探す
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {featured.map(({ category, article }) => (
              <Link
                key={category}
                href={`/category/${encodeURIComponent(category)}/`}
                className="group flex items-start gap-5 bg-ink-raised border border-ink-border rounded-2xl p-5
                           hover:border-ink-divider transition-all duration-300 hover:-translate-y-0.5"
              >
                <CategoryIcon category={category} size="lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-parchment text-sm group-hover:text-white transition-colors">
                    {category}
                  </h3>
                  <p className="text-[13px] text-parchment-sub mt-1 line-clamp-2">
                    {article.title}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-2.5 text-[11px] font-semibold text-lime opacity-0 group-hover:opacity-100 transition-opacity">
                    記事を見る
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
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
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 記事一覧 */}
      <section id="articles" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="text-[10px] font-semibold text-lime tracking-widest uppercase mb-2">
              Reviews
            </p>
            <h2 className="text-2xl font-extrabold text-parchment">
              最新レビュー
            </h2>
          </div>
          <span className="text-sm text-parchment-sub">
            {articles.length}記事
          </span>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${encodeURIComponent(cat)}/`}
                className="text-[12px] font-medium border border-ink-border rounded-full px-4 py-1.5 text-parchment-sub
                           hover:border-lime/40 hover:text-parchment hover:bg-lime/5
                           transition-all duration-200"
              >
                {cat}
              </Link>
            ))}
          </div>
        )}

        {articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-parchment-sub">記事を準備中です</p>
          </div>
        )}
      </section>

      {/* Trust */}
      <section className="border-t border-ink-border py-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-[10px] font-semibold text-lime tracking-widest uppercase mb-3">
            Editorial Policy
          </p>
          <h2 className="text-lg font-bold text-parchment mb-3">
            全て自腹。忖度ゼロ。
          </h2>
          <p className="text-[13px] text-parchment-sub max-w-lg mx-auto leading-relaxed">
            紹介するアイテムは全て筆者が自分で購入し、実際に仕事で使ったものです。
            <br />
            記事内にアフィリエイトリンクを含みますが、評価への影響は一切ありません。
          </p>
        </div>
      </section>
    </div>
  );
}
