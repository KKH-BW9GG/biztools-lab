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
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="text-[11px] text-parchment-sub mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-parchment transition-colors">
          ホーム
        </Link>
        <span className="text-ink-divider">/</span>
        <span className="text-parchment-sub">{category}</span>
      </nav>

      <div className="mb-8">
        <p className="text-[10px] font-semibold text-lime tracking-widest uppercase mb-2">
          Category
        </p>
        <h1 className="text-2xl font-extrabold text-parchment">
          {category}{" "}
          <span className="text-base font-normal text-parchment-sub">
            ({articles.length}件)
          </span>
        </h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, i) => (
          <ArticleCard key={article.slug} article={article} index={i} />
        ))}
      </div>
    </div>
  );
}
