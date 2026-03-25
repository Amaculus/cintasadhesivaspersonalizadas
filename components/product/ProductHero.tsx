import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ProductHeroProps {
  title: string
  description: string
  image: string
  imageAlt: string
}

export function ProductHero({ title, description, image, imageAlt }: ProductHeroProps) {
  return (
    <section className="py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
        <div>
          <h1 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mb-6 text-lg text-neutral-600">{description}</p>
          <Button asChild size="lg">
            <Link href="/cotizar">Pedir cotización</Link>
          </Button>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  )
}
