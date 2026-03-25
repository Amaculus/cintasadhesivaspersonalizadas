import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface ArticleCardProps {
  slug: string
  title: string
  description: string
  date: string
}

export function ArticleCard({ slug, title, description, date }: ArticleCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group">
      <Card className="h-full transition-shadow hover:shadow-lg">
        <CardHeader>
          <time className="text-xs text-neutral-500">{date}</time>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <span className="mt-2 inline-flex items-center text-sm font-medium text-primary group-hover:underline">
            Leer más <ArrowRight className="ml-1 h-4 w-4" />
          </span>
        </CardHeader>
      </Card>
    </Link>
  )
}
