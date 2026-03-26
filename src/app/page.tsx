import { getAllArticles, getAllCategories } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'

export default function HomePage() {
  const articles = getAllArticles()
  const categories = getAllCategories()

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-black text-brand mb-3">
          AIが厳選する、<span className="text-accent">本当に使える</span>ビジネスアイテム
        </h1>
        <p className="text-gray-500 text-sm">
          25〜45歳のビジネスパーソン向けに、AIがAmazonレビューを分析して本音の比較をお届けします
        </p>
      </div>

      {/* カテゴリフィルター */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-sm text-gray-500 self-center mr-1">カテゴリ:</span>
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/category/${encodeURIComponent(cat)}/`}
              className="text-sm bg-white border border-gray-200 rounded-full px-4 py-1
                         hover:border-accent hover:text-accent transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      )}

      {/* 記事一覧 */}
      {articles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map(article => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-gray-400">
          <p className="text-4xl mb-4">📝</p>
          <p>記事を準備中です。しばらくお待ちください。</p>
        </div>
      )}
    </div>
  )
}
