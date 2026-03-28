import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import type { Metadata } from 'next'
import DOMPurify from 'isomorphic-dompurify'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(decodeURIComponent(slug))
  if (!article) return {}
  return {
    title: article.title,
    description: article.meta_description,
    openGraph: {
      title: article.title,
      description: article.meta_description,
      type: 'article',
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(decodeURIComponent(slug))
  if (!article) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* パンくず */}
      <nav className="text-xs text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-accent">ホーム</Link>
        <span>/</span>
        <Link
          href={`/category/${encodeURIComponent(article.category)}/`}
          className="hover:text-accent"
        >
          {article.category}
        </Link>
        <span>/</span>
        <span className="text-gray-600 line-clamp-1">{article.title}</span>
      </nav>

      {/* カテゴリバッジ・日付 */}
      <div className="flex items-center gap-3 mb-4">
        <Link
          href={`/category/${encodeURIComponent(article.category)}/`}
          className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
        >
          {article.category}
        </Link>
        <span className="text-xs text-gray-400">{article.date}</span>
      </div>

      <h1 className="text-2xl font-black text-brand leading-tight mb-6">
        {article.title}
      </h1>

      {/* 記事本文（生成されたHTML） */}
      <article
        className="prose prose-sm max-w-none
                   prose-headings:text-brand prose-headings:font-bold
                   prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                   prose-strong:text-gray-900"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
      />

      {/* 記事末尾のナビゲーション */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <Link href="/" className="text-sm text-accent hover:underline">
          ← 記事一覧に戻る
        </Link>
      </div>
    </div>
  )
}
