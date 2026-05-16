import { getAllCategories, getArticlesByCategory } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ cat: string }> };

export async function generateStaticParams() {
  return getAllCategories().map((cat) => ({ cat }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cat } = await params;
  const category = decodeURIComponent(cat);
  return {
    title: `${category}のおすすめ記事`,
    description: `${category}カテゴリの比較・レビュー記事一覧`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { cat } = await params;
  const category = decodeURIComponent(cat);
  const articles = getArticlesByCategory(category);
  if (articles.length === 0) notFound();

  return (
    <div className="bg-paper min-h-screen">
      <div className="max-w-5xl mx-auto px-6 pt-9 md:pt-12 pb-16">
        <nav className="flex items-center gap-2 text-[12px] text-ink-muted mb-7">
          <Link href="/" className="hover:text-accent transition-colors">
            ホーム
          </Link>
          <span className="text-ink-faint">/</span>
          <span className="text-ink">{category}</span>
        </nav>

        <div className="pb-6 mb-8">
          <div className="rule-strong mb-3" />
          <div className="flex items-baseline justify-between">
            <span className="font-display italic text-[15px] text-accent">
              Section
            </span>
            <span className="text-[12px] text-ink-muted">
              全{" "}
              <span className="font-display text-[14px] text-ink tabular-nums">
                {articles.length}
              </span>{" "}
              本
            </span>
          </div>
          <h1 className="mt-3 text-[26px] md:text-[36px] font-bold text-ink leading-[1.5] tracking-tight">
            {category}
          </h1>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>

        <div className="mt-12 pt-7 border-t border-paper-rule">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-ink hover:text-accent transition-colors"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M11 19l-7-7 7-7" />
            </svg>
            レビュー一覧へ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
