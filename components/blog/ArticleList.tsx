import { ArticleCard } from "./ArticleCard"
import type { BlogPost } from "@/lib/blog"

export function ArticleList({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return <p className="text-center text-neutral-500">No hay artículos todavía.</p>
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <ArticleCard
          key={post.slug}
          slug={post.slug}
          title={post.title}
          description={post.description}
          date={post.date}
        />
      ))}
    </div>
  )
}
