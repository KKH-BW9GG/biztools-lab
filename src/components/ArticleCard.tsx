import Link from 'next/link'
import type { ArticleSummary } from '@/lib/articles'

const CATEGORY_STYLE: Record<string, { bar: string; badge: string }> = {
  'ビジネスSaaS・ツール': { bar: 'bg-blue-500',   badge: 'bg-blue-50 text-blue-600' },
  'デスク・PCアクセサリ':  { bar: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700' },
  '手帳・ノート':           { bar: 'bg-amber-400',  badge: 'bg-amber-50 text-amber-700' },
  '戦略・マネジメント本':   { bar: 'bg-violet-500', badge: 'bg-violet-50 text-violet-700' },
  'ビジネス書':             { bar: 'bg-violet-500', badge: 'bg-violet-50 text-violet-700' },
}

const DEFAULT_STYLE = { bar: 'bg-gray-400', badge: 'bg-gray-50 text-gray-600' }

export default function ArticleCard({ article }: { article: ArticleSummary }) {
  const style = CATEGORY_STYLE[article.category] ?? DEFAULT_STYLE

  return (
    <Link href={`/${article.slug}/`} className="block group">
      <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden h-full
                      shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        {/* カテゴリカラーバー */}
        <div className={`h-1 w-full ${style.bar}`} />

        <div className="p-6">
          {/* カテゴリバッジ */}
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${style.badge}`}>
            {article.category}
          </span>

          {/* タイトル */}
          <h2 className="mt-4 font-black text-gray-900 leading-snug text-base
                         group-hover:text-accent transition-colors duration-200 line-clamp-2">
            {article.title}
          </h2>

          {/* 説明文 */}
          <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">
            {article.meta_description}
          </p>

          {/* フッター */}
          <div className="mt-5 flex items-center justify-between">
            <span className="text-xs text-gray-300">{article.date}</span>
            <span className="text-xs font-bold text-accent opacity-0 group-hover:opacity-100
                             transition-opacity duration-200">
              読む →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
