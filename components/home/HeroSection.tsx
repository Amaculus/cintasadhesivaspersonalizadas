import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import { WhatsAppLink } from "@/components/layout/WhatsAppLink"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
            Cintas Adhesivas Personalizadas
            <span className="block text-primary">Fabricantes en Argentina</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-neutral-600 lg:mx-0">
            Imprimimos tu logo o marca en cintas adhesivas de embalaje. Calidad industrial,
            mínimos accesibles y envío a todo el país.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <Button asChild size="lg" className="text-base">
              <Link href="/cotizar">Cotizar al instante</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <WhatsAppLink>
                <WhatsAppIcon className="mr-2 h-5 w-5" /> WhatsApp
              </WhatsAppLink>
            </Button>
          </div>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-white shadow-sm">
          <Image
            src="/images/hero-home.webp"
            alt="Rollo de cinta adhesiva personalizada con logo impreso junto a una caja sellada"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  )
}
