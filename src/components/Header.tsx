import Link from 'next/link'
import { getAllCategories } from '@/lib/articles'

export default function Header() {
  const categories = getAllCategories()

  return (
    <header className="bg-brand text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="font-black text-lg tracking-tight">
            <span className="text-accent">ビジネスツール</span>研究所
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {categories.map(cat => (
              <Link
                key={cat}
                href={`/category/${encodeURIComponent(cat)}/`}
                className="hover:text-accent transition-colors"
              >
                {cat}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
