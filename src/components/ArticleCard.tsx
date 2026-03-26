import Link from 'next/link'
import type { ArticleSummary } from '@/lib/articles'

const CATEGORY_COLORS: Record<string, string> = {
  'ビジネスSaaS・ツール': 'bg-blue-100 text-blue-700',
  'デスク・PCアクセサリ':  'bg-green-100 text-green-700',
  '手帳・ノート':           'bg-yellow-100 text-yellow-700',
  '戦略・マネジメント本':   'bg-purple-100 text-purple-700',
}

export default function ArticleCard({ article }: { article: ArticleSummary }) {
  const catColor = CATEGORY_COLORS[article.category] ?? 'bg-gray-100 text-gray-600'

  return (
    <Link href={`/${article.slug}/`} className="block group">
      <div className="bg-white rounded-xl border border-gray-200 p-5 h-full
                      hover:shadow-md hover:border-accent/40 transition-all">
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${catColor}`}>
          {article.category}
        </span>
        <h2 className="mt-3 font-bold text-gray-900 leading-snug group-hover:text-accent
                       transition-colors line-clamp-2">
          {article.title}
        </h2>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-3">
          {article.meta_description}
        </p>
        <p className="mt-3 text-xs text-gray-400">{article.date}</p>
      </div>
    </Link>
  )
}
