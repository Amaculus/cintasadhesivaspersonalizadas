import { Metadata } from "next"
import Link from "next/link"
import { ProductHero } from "@/components/product/ProductHero"
import { ProductCTA } from "@/components/product/ProductCTA"
import { Process } from "@/components/home/Process"
import { JsonLd } from "@/components/seo/JsonLd"
import { COMPANY } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Packaging Personalizado con tu Marca | Cinta Impresa en Argentina",
  description:
    "Packaging personalizado para e-commerce y logística: cinta impresa con tu logo que convierte cada envío en branding. Packaging personalizado en Argentina, fabricación propia y venta mayorista. Cotizá sin cargo.",
  alternates: { canonical: `${COMPANY.url}/packaging-personalizado` },
  openGraph: {
    title: "Packaging Personalizado con tu Marca | Cinta Impresa en Argentina",
    description:
      "El packaging personalizado de mayor impacto por menos costo: cinta adhesiva impresa con tu logo. Fabricantes en Argentina.",
    url: `${COMPANY.url}/packaging-personalizado`,
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué es el packaging personalizado?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El packaging personalizado es el empaque que lleva la identidad de tu marca —logo, colores y mensaje— en lugar de un embalaje genérico. La forma más rápida y económica de lograrlo es con cinta adhesiva impresa: transformás cualquier caja estándar en packaging de marca sellándola con tu cinta personalizada.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta el packaging personalizado en Argentina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depende del volumen. La cinta impresa personalizada es la opción de menor costo de entrada para tener packaging con tu marca: partís de tiradas accesibles y el costo por rollo baja a mayor cantidad. Pedí una cotización con tu volumen estimado.",
      },
    },
    {
      "@type": "Question",
      name: "¿Sirve para packaging de e-commerce?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Es ideal para e-commerce y logística: sellás miles de envíos con tu marca visible en cada caja, reforzás la experiencia de unboxing y agregás una capa de seguridad ante aperturas no autorizadas.",
      },
    },
  ],
}

export default function PackagingPersonalizadoPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <ProductHero
        title="Packaging Personalizado con tu Marca"
        description="Convertí cada envío en branding. Fabricamos cinta adhesiva impresa con tu logo: el packaging personalizado de mayor impacto por el menor costo. Sellá cualquier caja y tu marca viaja en cada paquete."
        image="https://placehold.co/800x600/e2e8f0/475569?text=Packaging+Personalizado"
        imageAlt="Packaging personalizado con logo — cajas selladas con cinta adhesiva impresa de marca"
      />

      {/* Intro SEO */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-2xl font-bold text-neutral-900">
            La forma más económica de tener packaging personalizado
          </h2>
          <div className="space-y-4 text-neutral-600">
            <p>
              El <strong>packaging personalizado</strong> no requiere rediseñar toda tu caja ni invertir en tiradas enormes de cartón impreso. La vía más directa y rentable es la <strong>cinta adhesiva impresa con tu logo</strong>: tomás cualquier caja estándar y, al sellarla con tu cinta personalizada, la convertís en un empaque de marca.
            </p>
            <p>
              Somos <strong>fabricantes de packaging personalizado en Argentina</strong> especializados en cinta impresa. Cada rollo lleva tu logo, colores o leyenda en alta definición, con adhesivo de alta retención apto para logística y cadena de frío.
            </p>
            <p>
              Es la solución que eligen las empresas que quieren <strong>packaging con logo</strong> sin disparar el costo por unidad: a diferencia de las cajas impresas a medida, la cinta personalizada te da presencia de marca desde tiradas accesibles y con precios mayoristas escalonados por volumen.
            </p>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-neutral-900">
            Por qué la cinta impresa es el mejor packaging personalizado
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Menor costo de entrada",
                desc: "Packaging con tu marca desde tiradas accesibles, sin el mínimo alto de las cajas impresas a medida.",
              },
              {
                title: "Marca en cada envío",
                desc: "Tu logo viaja en cada caja. Marketing en tránsito que refuerza la experiencia de unboxing en e-commerce.",
              },
              {
                title: "Seguridad y trazabilidad",
                desc: "La cinta impresa funciona como evidencia de apertura e identifica al remitente de un vistazo.",
              },
              {
                title: "Fabricación propia",
                desc: "Producimos en Argentina con impresión de hasta 3 colores y adhesivo de alta retención. Sin intermediarios.",
              },
            ].map((b) => (
              <div key={b.title} className="rounded-lg border bg-white p-6">
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">{b.title}</h3>
                <p className="text-sm text-neutral-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enlaces a productos */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-2xl font-bold text-neutral-900">
            Elegí tu formato de packaging personalizado
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Link
              href="/cinta-adhesiva-personalizada"
              className="rounded-lg border bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <h3 className="mb-2 text-lg font-semibold text-primary">Cinta adhesiva con logo</h3>
              <p className="text-sm text-neutral-600">
                Cinta impresa con tu marca en hasta 3 colores, fondo transparente o blanco. Ideal para branding de envíos.
              </p>
            </Link>
            <Link
              href="/cinta-de-embalaje-personalizada"
              className="rounded-lg border bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <h3 className="mb-2 text-lg font-semibold text-primary">Cinta de embalaje personalizada</h3>
              <p className="text-sm text-neutral-600">
                Formato industrial de 48mm para e-commerce y logística de alto volumen. Adhesivo de alta retención.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-neutral-900">
            Preguntas sobre packaging personalizado
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "¿Qué es el packaging personalizado?",
                a: "Es el empaque que lleva la identidad de tu marca —logo, colores y mensaje— en lugar de un embalaje genérico. La forma más rápida y económica de lograrlo es con cinta adhesiva impresa: transformás cualquier caja estándar en packaging de marca sellándola con tu cinta personalizada.",
              },
              {
                q: "¿Cuánto cuesta el packaging personalizado en Argentina?",
                a: "Depende del volumen. La cinta impresa personalizada es la opción de menor costo de entrada para tener packaging con tu marca: partís de tiradas accesibles y el costo por rollo baja a mayor cantidad. Pedí una cotización con tu volumen estimado.",
              },
              {
                q: "¿Sirve para packaging de e-commerce?",
                a: "Sí. Es ideal para e-commerce y logística: sellás miles de envíos con tu marca visible en cada caja, reforzás la experiencia de unboxing y agregás una capa de seguridad ante aperturas no autorizadas.",
              },
              {
                q: "¿Hacen packaging personalizado mayorista?",
                a: "Sí. Trabajamos con precios mayoristas escalonados: a mayor cantidad de rollos, menor costo unitario. Ideal para empresas con despachos regulares.",
              },
            ].map((faq, i) => (
              <div key={i} className="rounded-lg border bg-white p-6">
                <h3 className="mb-2 font-semibold text-neutral-900">{faq.q}</h3>
                <p className="text-sm text-neutral-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <ProductCTA />
    </>
  )
}
