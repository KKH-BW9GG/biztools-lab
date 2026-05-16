import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import type { Metadata } from "next";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />

      {/* Article masthead */}
      <header className="max-w-3xl mx-auto px-6 pt-9 md:pt-12 pb-8">
        <nav className="flex items-center gap-2 text-[12px] text-ink-muted mb-7">
          <Link href="/" className="hover:text-accent transition-colors">
            ホーム
          </Link>
          <span className="text-ink-faint">/</span>
          <Link
            href={`/category/${encodeURIComponent(article.category)}/`}
            className="hover:text-accent transition-colors"
          >
            {article.category}
          </Link>
        </nav>

        <div className="flex items-baseline gap-4 mb-5">
          <Link
            href={`/category/${encodeURIComponent(article.category)}/`}
            className="text-[12px] font-semibold text-accent hover:underline underline-offset-4"
          >
            {article.category}
          </Link>
          <span className="font-display text-[12px] text-ink-faint tabular-nums">
            {article.date}
          </span>
        </div>

        <h1 className="text-[25px] md:text-[36px] font-bold text-ink leading-[1.55] tracking-tight text-balance">
          {article.title}
        </h1>

        {article.meta_description && (
          <p className="mt-5 text-[14px] md:text-[15px] text-ink-soft leading-[1.85] max-w-2xl border-l-2 border-accent pl-4">
            {article.meta_description}
          </p>
        )}
      </header>

      <div className="max-w-3xl mx-auto px-6">
        {/* 記事本文 */}
        <article
          className="prose prose-sm md:prose-base max-w-none
                     prose-headings:text-ink prose-headings:font-bold prose-headings:tracking-tight
                     prose-h2:text-[20px] prose-h2:mt-11 prose-h2:mb-4 prose-h2:pb-2.5 prose-h2:border-b prose-h2:border-paper-rule
                     prose-h3:text-[16px] prose-h3:mt-8 prose-h3:mb-2.5
                     prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4 prose-a:decoration-1 prose-a:font-medium
                     prose-strong:text-ink prose-strong:font-semibold
                     prose-li:text-ink-soft prose-li:leading-[1.8] prose-li:my-1
                     prose-p:leading-[1.85] prose-p:text-ink-soft prose-p:my-3.5
                     prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:not-italic prose-blockquote:text-ink prose-blockquote:bg-paper-deep prose-blockquote:py-1
                     prose-img:rounded-lg"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(article.content),
          }}
        />

        {/* 関連記事 */}
        {related.length > 0 && (
          <section className="mt-14 pt-9">
            <div className="rule-strong mb-3" />
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-[17px] font-bold text-ink tracking-tight">
                同じカテゴリの記事
              </h2>
              <span className="font-display italic text-[14px] text-accent">
                Related
              </span>
            </div>
            <ul className="border-t border-paper-rule">
              {related.map((r) => (
                <li key={r.slug} className="border-b border-paper-rule">
                  <Link
                    href={`/${r.slug}/`}
                    className="group flex items-center gap-4 py-4"
                  >
                    <span className="text-[15px] font-medium text-ink group-hover:text-accent transition-colors flex-1 line-clamp-2 leading-[1.7]">
                      {r.title}
                    </span>
                    <span className="font-display text-[11px] text-ink-faint tabular-nums hidden sm:block flex-shrink-0">
                      {r.date}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ナビゲーション */}
        <div className="mt-14 mb-20 pt-8 border-t border-paper-rule">
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
