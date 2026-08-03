import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"

marked.setOptions({ gfm: true, breaks: false })

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

function toHtml(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string
}

export interface FaqItem {
  q: string
  a: string
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  content: string
  faqs: FaqItem[]
}

function parseFaqs(data: { faqs?: unknown }): FaqItem[] {
  if (!Array.isArray(data.faqs)) return []
  return data.faqs
    .filter((f): f is FaqItem => !!f && typeof f.q === "string" && typeof f.a === "string")
    .map((f) => ({ q: f.q, a: f.a }))
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))
  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "")
      const filePath = path.join(BLOG_DIR, filename)
      const fileContent = fs.readFileSync(filePath, "utf-8")
      const { data, content } = matter(fileContent)
      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || "",
        content: toHtml(content),
        faqs: parseFaqs(data),
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)
  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "",
    content: toHtml(content),
    faqs: parseFaqs(data),
  }
}
