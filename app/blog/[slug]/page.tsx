import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { JsonLd } from "@/components/seo/JsonLd"
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
  const url = `${COMPANY.url}/blog/${post.slug}`
  return {
    title: `${post.title} | Blog`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date || undefined,
      images: ["/images/og-cover.jpg"],
    },
    twitter: { card: "summary_large_image", images: ["/images/og-cover.jpg"] },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const url = `${COMPANY.url}/blog/${post.slug}`
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    image: `${COMPANY.url}/images/og-cover.jpg`,
    author: { "@type": "Organization", name: COMPANY.name },
    publisher: { "@type": "Organization", name: COMPANY.name },
    mainEntityOfPage: url,
  }
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: COMPANY.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${COMPANY.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  }

  return (
    <article className="py-16">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="mx-auto max-w-3xl px-4">
        <Link href="/blog" className="mb-6 inline-flex items-center text-sm text-primary hover:underline">
          <ArrowLeft className="mr-1 h-4 w-4" /> Volver al blog
        </Link>
        <h1 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">{post.title}</h1>
        {post.date && (
          <time className="mb-8 block text-sm text-neutral-500">{post.date}</time>
        )}
        <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

        {post.faqs.length > 0 && (
          <section className="mt-12 border-t pt-8">
            <h2 className="mb-6 text-2xl font-bold text-neutral-900">Preguntas frecuentes</h2>
            <div className="space-y-6">
              {post.faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="mb-1 font-semibold text-neutral-900">{faq.q}</h3>
                  <p className="text-neutral-600">{faq.a}</p>
                </div>
              ))}
            </div>
            <JsonLd
              data={{
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: post.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }}
            />
          </section>
        )}
      </div>
    </article>
  )
}
