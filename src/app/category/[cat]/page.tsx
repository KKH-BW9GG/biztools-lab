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
      <div className="max-w-6xl mx-auto px-6 pt-10 md:pt-14 pb-20">
        <nav className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-ink-muted mb-12">
          <Link href="/" className="hover:text-navy transition-colors">
            Home
          </Link>
          <span className="text-ink-faint">/</span>
          <span className="text-ink">{category}</span>
        </nav>

        <div className="rule-strong mb-8" />

        <div className="grid md:grid-cols-12 gap-6 md:gap-10 mb-16">
          <div className="md:col-span-3">
            <p className="label-meta">Section</p>
          </div>
          <div className="md:col-span-9">
            <h1 className="font-jp-serif text-[36px] md:text-[56px] font-medium text-ink leading-[1.05] tracking-tight text-balance">
              {category}
            </h1>
            <p className="mt-6 font-display italic text-ink-muted text-[15px]">
              現在{" "}
              <span className="text-ink not-italic font-medium tabular-nums">
                {articles.length}
              </span>{" "}
              本のレビューを公開中
            </p>
          </div>
        </div>

        <div className="border-t border-ink/30 pt-2">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
            {articles.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-ink">
          <Link
            href="/"
            className="font-display italic text-[14px] text-ink hover:text-navy border-b border-ink hover:border-navy pb-1 transition-colors"
          >
            ← All Reviews
          </Link>
        </div>
      </div>
    </div>
  );
}
