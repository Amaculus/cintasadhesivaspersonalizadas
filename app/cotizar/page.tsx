import { Metadata } from "next"
import { Cotizador } from "@/components/cotizador/Cotizador"
import { COMPANY } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Cotizador de Cintas Personalizadas | Precio al Instante",
  description:
    "Cotizá tu pedido de cintas impresas personalizadas al instante. Elegí medidas, tipo y cantidad, y recibí tu precio en segundos. Fabricantes en Argentina.",
  alternates: { canonical: `${COMPANY.url}/cotizar` },
}

export default function CotizarPage() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-2 text-3xl font-bold text-neutral-900 md:text-4xl">
          Cotizá tu pedido ahora
        </h1>
        <p className="mb-8 text-neutral-600">
          Elegí las opciones y obtené tu precio al instante. Sin vueltas: te llevás el presupuesto y
          lo cerramos por WhatsApp.
        </p>
        <Cotizador />
      </div>
    </section>
  )
}
