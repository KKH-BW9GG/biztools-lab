import { getAllCategories, getArticlesByCategory } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ cat: string }> }

export async function generateStaticParams() {
  return getAllCategories().map(cat => ({ cat: encodeURIComponent(cat) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cat } = await params
  const category = decodeURIComponent(cat)
  return {
    title: `${category}のおすすめ記事`,
    description: `${category}カテゴリの比較・レビュー記事一覧`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { cat } = await params
  const category = decodeURIComponent(cat)
  const articles = getArticlesByCategory(category)
  if (articles.length === 0) notFound()

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="text-xs text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-accent">ホーム</Link>
        <span>/</span>
        <span className="text-gray-600">{category}</span>
      </nav>

      <h1 className="text-2xl font-black text-brand mb-8">
        {category} <span className="text-base font-normal text-gray-400">({articles.length}件)</span>
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map(article => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  )
}
