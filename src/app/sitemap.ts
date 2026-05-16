import { getAllArticles, getAllCategories } from '@/lib/articles'
import type { MetadataRoute } from 'next'

const BASE = 'https://biztools-lab.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()
  const categories = getAllCategories()

  const articleEntries = articles.map(a => ({
    url: `${BASE}/${a.slug}/`,
    lastModified: new Date(a.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const categoryEntries = categories.map(cat => ({
    url: `${BASE}/category/${encodeURIComponent(cat)}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    ...articleEntries,
    ...categoryEntries,
  ]
}
