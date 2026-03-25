import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { COMPANY } from "@/lib/constants"

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Blog`,
    description: post.description,
    alternates: { canonical: `${COMPANY.url}/blog/${post.slug}` },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <article className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <Link href="/blog" className="mb-6 inline-flex items-center text-sm text-primary hover:underline">
          <ArrowLeft className="mr-1 h-4 w-4" /> Volver al blog
        </Link>
        <h1 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">{post.title}</h1>
        {post.date && (
          <time className="mb-8 block text-sm text-neutral-500">{post.date}</time>
        )}
        <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
  )
}
