import { Metadata } from "next"
import Link from "next/link"
import { JsonLd } from "@/components/seo/JsonLd"
import { COMPANY } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Sobre Nosotros | Fabricantes de Cintas Personalizadas en Argentina",
  description:
    "Somos fabricantes de cintas adhesivas personalizadas en Argentina. Impresión propia por flexografía, atención directa y cotización al instante. Conocé cómo trabajamos.",
  alternates: { canonical: `${COMPANY.url}/nosotros` },
  openGraph: {
    title: "Sobre Nosotros | Cintas Personalizadas en Argentina",
    description:
      "Fabricantes de cintas adhesivas personalizadas en Argentina. Impresión propia, atención directa, cotización al instante.",
    url: `${COMPANY.url}/nosotros`,
    images: ["/images/og-cover.jpg"],
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.name,
  url: COMPANY.url,
  email: COMPANY.email,
  telephone: `+${COMPANY.whatsapp}`,
  description:
    "Fabricante de cintas adhesivas personalizadas en Argentina. Cinta adhesiva con logo y cinta de embalaje personalizada, con impresión propia por flexografía.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressCountry: "AR",
  },
  areaServed: "AR",
  knowsAbout: [
    "cintas adhesivas personalizadas",
    "cinta de embalaje personalizada",
    "cinta scotch personalizada",
    "impresión flexográfica",
  ],
  // sameAs: pendiente — se agregan Instagram / Facebook / MercadoLibre cuando estén.
}

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Sobre Nosotros",
  url: `${COMPANY.url}/nosotros`,
  about: { "@type": "Organization", name: COMPANY.name },
}

export default function NosotrosPage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={aboutSchema} />

      <section className="bg-gradient-to-br from-blue-50 to-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
            Sobre nosotros
          </h1>
          <p className="text-lg text-neutral-600">
            En <strong>{COMPANY.name}</strong> fabricamos cintas adhesivas impresas con la marca de
            cada cliente. Somos fabricantes argentinos: producimos con impresión propia y atención
            directa, sin intermediarios.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl space-y-12 px-4">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-neutral-900">Qué hacemos</h2>
            <div className="space-y-4 text-neutral-600">
              <p>
                Nos especializamos en <strong>cintas personalizadas</strong>: cinta adhesiva y cinta
                de embalaje impresas con tu logo, marca o diseño. Fabricamos en formatos de 24mm y
                48mm, con impresión de hasta 3 colores sobre fondo transparente o blanco.
              </p>
              <p>
                Trabajamos desde cantidades accesibles —pensadas para emprendedores y PyMEs— hasta
                volumen mayorista para operaciones de e-commerce y logística. Conocé la{" "}
                <Link href="/cinta-adhesiva-personalizada" className="text-primary hover:underline">
                  cinta adhesiva con logo
                </Link>{" "}
                y la{" "}
                <Link href="/cinta-de-embalaje-personalizada" className="text-primary hover:underline">
                  cinta de embalaje personalizada
                </Link>
                .
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-neutral-900">Cómo trabajamos</h2>
            <ol className="ml-5 list-decimal space-y-3 text-neutral-600">
              <li>
                <strong>Cotización al instante.</strong> Elegís medidas, tipo y cantidad en el
                cotizador y obtenés el precio en segundos.
              </li>
              <li>
                <strong>Boceto para aprobar.</strong> Recibimos tu logo, lo revisamos y te enviamos
                un boceto digital antes de producir.
              </li>
              <li>
                <strong>Impresión por flexografía.</strong> Grabamos tu diseño en una plancha de
                polímero e imprimimos la cinta. El polímero de la primera impresión va incluido.
              </li>
              <li>
                <strong>Despacho.</strong> Coordinamos el envío a todo el país por transporte y
                correo.
              </li>
            </ol>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-neutral-900">Por qué elegirnos</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                ["Mínimos accesibles", "Pedidos desde pocos rollos, sin exigir grandes volúmenes."],
                ["Sin costo de matriz", "No cobramos el polímero de impresión en el primer pedido."],
                ["Fabricación propia", "Producimos en Argentina, con atención directa y sin intermediarios."],
                ["Precio al instante", "Cotizás online y cerrás el pedido por WhatsApp."],
              ].map(([t, d]) => (
                <li key={t} className="rounded-lg border bg-white p-5">
                  <h3 className="mb-1 font-semibold text-neutral-900">{t}</h3>
                  <p className="text-sm text-neutral-600">{d}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border bg-neutral-50 p-6">
            <h2 className="mb-3 text-xl font-bold text-neutral-900">Contacto</h2>
            <ul className="space-y-1 text-sm text-neutral-600">
              <li>WhatsApp: +{COMPANY.whatsapp}</li>
              <li>Email: {COMPANY.email}</li>
              <li>Zona: {COMPANY.location}</li>
              <li>Horario: lunes a sábado, de 9 a 21 h</li>
            </ul>
            <Link
              href="/cotizar"
              className="mt-5 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Cotizar mi cinta personalizada
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
