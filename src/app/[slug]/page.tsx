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
      <header className="max-w-3xl mx-auto px-4 pt-10 md:pt-16 pb-10">
        <nav className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-ink-muted mb-10">
          <Link href="/" className="hover:text-navy transition-colors">
            Home
          </Link>
          <span className="text-ink-faint">/</span>
          <Link
            href={`/category/${encodeURIComponent(article.category)}/`}
            className="hover:text-navy transition-colors"
          >
            {article.category}
          </Link>
        </nav>

        <div className="flex items-baseline gap-4 mb-6 pb-4 border-b border-ink/15">
          <Link
            href={`/category/${encodeURIComponent(article.category)}/`}
            className="label-meta hover:text-navy transition-colors"
          >
            {article.category}
          </Link>
          <span className="font-display text-[12px] text-ink-muted tabular-nums tracking-wide">
            {article.date}
          </span>
        </div>

        <h1 className="font-jp-serif text-[28px] md:text-[40px] font-medium text-ink leading-[1.3] tracking-tight text-balance">
          {article.title}
        </h1>

        {article.meta_description && (
          <p className="mt-6 font-jp-serif text-[16px] md:text-[18px] text-ink-soft leading-[1.85] italic max-w-2xl border-l-2 border-navy pl-5">
            {article.meta_description}
          </p>
        )}
      </header>

      <div className="max-w-3xl mx-auto px-4">
        {/* 記事本文 */}
        <article
          className="prose prose-sm md:prose-base max-w-none
                     prose-headings:font-jp-serif prose-headings:text-ink prose-headings:font-semibold prose-headings:tracking-tight
                     prose-h2:text-[22px] prose-h2:mt-14 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-ink/30
                     prose-h3:text-[17px] prose-h3:mt-10 prose-h3:mb-3
                     prose-a:text-navy prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4 prose-a:decoration-1 prose-a:font-medium
                     prose-strong:text-ink prose-strong:font-semibold
                     prose-li:text-ink-soft
                     prose-p:leading-[1.95] prose-p:text-ink-soft
                     prose-blockquote:border-l-2 prose-blockquote:border-navy prose-blockquote:not-italic prose-blockquote:font-jp-serif prose-blockquote:text-ink
                     prose-img:rounded-none"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(article.content),
          }}
        />

        {/* 関連記事 */}
        {related.length > 0 && (
          <section className="mt-20 pt-10 border-t border-ink/30">
            <div className="flex items-baseline justify-between mb-6">
              <p className="label-meta">Related</p>
              <p className="font-display italic text-[13px] text-ink-muted">
                同じ領域から
              </p>
            </div>
            <ul className="divide-y divide-ink/15 border-t border-b border-ink/15">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${r.slug}/`}
                    className="group flex items-baseline gap-5 py-4 hover:pl-2 transition-all duration-300"
                  >
                    <span className="font-display italic text-navy text-[14px]">
                      —
                    </span>
                    <span className="font-jp-serif text-[16px] text-ink group-hover:text-navy transition-colors flex-1 line-clamp-2">
                      {r.title}
                    </span>
                    <span className="font-display text-[11px] text-ink-muted hidden sm:block">
                      {r.date}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ナビゲーション */}
        <div className="mt-16 mb-20 pt-8 border-t border-ink flex items-center justify-between">
          <Link
            href="/"
            className="font-display italic text-[14px] text-ink hover:text-navy border-b border-ink hover:border-navy pb-1 transition-colors"
          >
            ← All Reviews
          </Link>
          <Link
            href={`/category/${encodeURIComponent(article.category)}/`}
            className="font-jp-serif text-[14px] text-ink-soft hover:text-navy transition-colors"
          >
            {article.category} →
          </Link>
        </div>
      </div>
    </div>
  );
}
