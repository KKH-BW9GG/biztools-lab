import { getAllArticles, getAllCategories } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'

const STATS = [
  { value: '8+', label: '比較記事' },
  { value: 'AI', label: 'レビュー分析' },
  { value: '無料', label: '完全無料' },
]

export default function HomePage() {
  const articles = getAllArticles()
  const categories = getAllCategories()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-brand overflow-hidden">
        {/* 背景グリッドパターン */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* グラデーションオーバーレイ */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-32 text-center">
          {/* バッジ */}
          <div className="animate-fadeUp inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 rounded-full px-4 py-1.5 text-xs font-medium mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            AIがAmazonレビューを分析して本音の比較をお届け
          </div>

          {/* メインコピー */}
          <h1 className="animate-fadeUp-d1 text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
            本当に使える<br />
            <span className="text-accent">ビジネスアイテム</span>だけ。
          </h1>
          <p className="animate-fadeUp-d2 text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            25〜45歳のビジネスパーソン向けに、AIがレビューを徹底分析。<br className="hidden md:block" />
            忖度なしの比較記事をお届けします。
          </p>

          {/* 統計 */}
          <div className="animate-fadeUp-d2 flex justify-center gap-12 mt-12">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* カテゴリ + 記事一覧 */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        {/* カテゴリフィルター */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <span className="text-xs text-gray-400 self-center mr-2 font-medium tracking-wide uppercase">
              Category
            </span>
            {categories.map(cat => (
              <Link
                key={cat}
                href={`/category/${encodeURIComponent(cat)}/`}
                className="text-sm border border-gray-200 rounded-full px-4 py-1.5 text-gray-600
                           hover:border-accent hover:text-accent hover:bg-accent/5
                           transition-all duration-200"
              >
                {cat}
              </Link>
            ))}
          </div>
        )}

        {/* セクション見出し */}
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-xl font-black text-brand">
            最新の比較レビュー
          </h2>
          <span className="text-sm text-gray-400">{articles.length}件</span>
        </div>

        {/* 記事グリッド */}
        {articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-300">
            <p className="text-5xl mb-4">✦</p>
            <p className="text-gray-400">記事を準備中です</p>
          </div>
        )}
      </section>

      {/* 下部CTA */}
      <section className="bg-surface border-t border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-400 font-medium tracking-widest uppercase mb-3">Our Promise</p>
          <h2 className="text-2xl font-black text-brand mb-3">忖度なし、広告なし。本音のレビューだけ。</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
            AIがAmazonレビューを独自分析し、実際に使える商品だけを厳選。
            アフィリエイトリンクを含みますが、評価への影響はありません。
          </p>
        </div>
      </section>
    </div>
  )
}
