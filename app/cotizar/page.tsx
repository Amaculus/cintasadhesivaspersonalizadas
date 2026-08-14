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

        <div className="mt-16 space-y-10">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-neutral-900">¿Cómo funciona el cotizador?</h2>
            <ol className="ml-5 list-decimal space-y-2 text-neutral-600">
              <li>Elegí el <strong>ancho, el tipo de cinta y la cantidad de rollos</strong>.</li>
              <li>
                Obtenés el <strong>precio al instante</strong>, calculado con la cotización del día.
                A mayor cantidad, menor precio por rollo.
              </li>
              <li>
                Cerrás el pedido por <strong>WhatsApp</strong> con un clic; podés adjuntar tu diseño
                para que lo revisemos y vectoricemos antes de producir.
              </li>
            </ol>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold text-neutral-900">¿Qué incluye el precio?</h2>
            <p className="text-neutral-600">
              El precio incluye la <strong>impresión de tu logo</strong> en hasta 3 colores y el{" "}
              <strong>polímero de la primera impresión</strong> — en reimpresiones del mismo diseño
              no se vuelve a cobrar. Es un valor orientativo que se confirma al cerrar el pedido.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
