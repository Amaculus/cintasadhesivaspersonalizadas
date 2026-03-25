import { Metadata } from "next"
import { getAllPosts } from "@/lib/blog"
import { ArticleList } from "@/components/blog/ArticleList"
import { COMPANY } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Blog | Cintas Adhesivas Personalizadas",
  description: "Guías, comparativas y todo lo que necesitás saber sobre cintas adhesivas personalizadas para tu empresa.",
  alternates: { canonical: `${COMPANY.url}/blog` },
}

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="mb-2 text-3xl font-bold text-neutral-900">Blog</h1>
        <p className="mb-10 text-neutral-600">
          Guías, comparativas y todo lo que necesitás saber sobre cintas adhesivas personalizadas.
        </p>
        <ArticleList posts={posts} />
      </div>
    </section>
  )
}
