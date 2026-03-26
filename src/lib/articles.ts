import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles')

export type Article = {
  slug: string
  title: string
  keyword: string
  category: string
  meta_description: string
  date: string
  content: string   // HTML文字列
}

export type ArticleSummary = Omit<Article, 'content'>

function getArticleFiles(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return []
  return fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'))
}

export function getAllArticles(): ArticleSummary[] {
  return getArticleFiles()
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? slug,
        keyword: data.keyword ?? '',
        category: data.category ?? '',
        meta_description: data.meta_description ?? '',
        date: data.date ?? '',
      } satisfies ArticleSummary
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getArticleBySlug(slug: string): Article | null {
  const filepath = path.join(ARTICLES_DIR, `${slug}.md`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title ?? slug,
    keyword: data.keyword ?? '',
    category: data.category ?? '',
    meta_description: data.meta_description ?? '',
    date: data.date ?? '',
    content,
  }
}

export function getAllCategories(): string[] {
  const cats = getAllArticles().map(a => a.category).filter(Boolean)
  return [...new Set(cats)]
}

export function getArticlesByCategory(category: string): ArticleSummary[] {
  return getAllArticles().filter(a => a.category === category)
}
