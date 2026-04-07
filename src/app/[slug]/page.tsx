import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import type { Metadata } from "next";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryIcon from "@/components/CategoryIcon";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(decodeURIComponent(slug));
  if (!article) return {};
  return {
    title: article.title,
    description: article.meta_description,
    openGraph: {
      title: article.title,
      description: article.meta_description,
      type: "article",
    },
  };
}

const BASE = "https://biztools-lab.vercel.app";

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(decodeURIComponent(slug));
  if (!article) notFound();

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.meta_description,
    datePublished: article.date,
    dateModified: article.date,
    url: `${BASE}/${article.slug}/`,
    inLanguage: "ja",
    publisher: {
      "@type": "Organization",
      name: "BizTools Lab",
      url: BASE,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}/${article.slug}/`,
    },
  };

  // 関連記事（同カテゴリ、自分以外、最大3件）
  const related = getAllArticles()
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />

      {/* パンくず */}
      <nav className="text-[11px] text-parchment-sub mb-8 flex items-center gap-1.5">
        <Link href="/" className="hover:text-parchment transition-colors">
          ホーム
        </Link>
        <span className="text-ink-divider">/</span>
        <Link
          href={`/category/${encodeURIComponent(article.category)}/`}
          className="hover:text-parchment transition-colors"
        >
          {article.category}
        </Link>
      </nav>

      {/* ヘッダー */}
      <div className="flex items-start gap-4 mb-8">
        <CategoryIcon category={article.category} size="lg" />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Link
              href={`/category/${encodeURIComponent(article.category)}/`}
              className="text-[11px] font-semibold text-lime hover:underline tracking-widest uppercase"
            >
              {article.category}
            </Link>
            <span className="text-[11px] text-parchment-sub">
              {article.date}
            </span>
          </div>
          <h1 className="text-2xl md:text-[28px] font-bold text-parchment leading-tight">
            {article.title}
          </h1>
        </div>
      </div>

      {/* 記事本文 */}
      <article
        className="prose prose-sm md:prose-base max-w-none prose-invert
                   prose-headings:text-parchment prose-headings:font-bold prose-headings:tracking-tight
                   prose-h2:text-lg prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-ink-border
                   prose-h3:text-[15px] prose-h3:mt-8 prose-h3:mb-3
                   prose-a:text-lime prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                   prose-strong:text-parchment prose-strong:font-semibold
                   prose-li:text-parchment-sub
                   prose-p:leading-[1.8] prose-p:text-parchment-sub
                   prose-table:text-sm prose-th:bg-ink-raised prose-th:font-semibold prose-th:text-parchment
                   prose-td:border-ink-border
                   prose-img:rounded-xl"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(article.content),
        }}
      />

      {/* 関連記事 */}
      {related.length > 0 && (
        <div className="mt-16 pt-8 border-t border-ink-border">
          <h3 className="text-sm font-bold text-parchment mb-4">関連記事</h3>
          <div className="grid gap-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/${r.slug}/`}
                className="group flex items-center gap-3 p-3 rounded-xl hover:bg-ink-raised border border-transparent hover:border-ink-border transition-colors"
              >
                <CategoryIcon category={r.category} size="sm" />
                <span className="text-sm text-parchment-sub group-hover:text-parchment transition-colors line-clamp-1">
                  {r.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ナビゲーション */}
      <div className="mt-10 pt-6 border-t border-ink-border flex items-center justify-between">
        <Link
          href="/"
          className="text-[13px] text-lime hover:underline font-medium"
        >
          ← 記事一覧
        </Link>
        <Link
          href={`/category/${encodeURIComponent(article.category)}/`}
          className="text-[13px] text-parchment-sub hover:text-parchment transition-colors"
        >
          {article.category} →
        </Link>
      </div>
    </div>
  );
}
