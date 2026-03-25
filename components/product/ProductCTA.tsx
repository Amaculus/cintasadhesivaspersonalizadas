import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WhatsAppLink } from "@/components/layout/WhatsAppLink"

export function ProductCTA() {
  return (
    <section className="bg-primary py-16 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold">¿Listo para personalizar tus cintas?</h2>
        <p className="mb-8 text-lg text-blue-100">
          Pedí tu cotización sin cargo y recibí un boceto con tu logo en menos de 24hs hábiles.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" variant="secondary" className="text-base">
            <Link href="/cotizar">Pedir cotización</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <WhatsAppLink>
              <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
            </WhatsAppLink>
          </Button>
        </div>
      </div>
    </section>
  )
}
