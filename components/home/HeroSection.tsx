import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WhatsAppLink } from "@/components/layout/WhatsAppLink"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
          Cintas Adhesivas Personalizadas
          <span className="block text-primary">Fabricantes en Argentina</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-neutral-600">
          Imprimimos tu logo o marca en cintas adhesivas de embalaje. Calidad industrial,
          mínimos accesibles y envío a todo el país.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="text-base">
            <Link href="/cotizar">Pedir cotización</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
            <WhatsAppLink>
              <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
            </WhatsAppLink>
          </Button>
        </div>
      </div>
    </section>
  )
}
