import { Metadata } from "next"
import { ProductHero } from "@/components/product/ProductHero"
import { SpecsTable } from "@/components/product/SpecsTable"
import { ProductCTA } from "@/components/product/ProductCTA"
import { Process } from "@/components/home/Process"
import { JsonLd } from "@/components/seo/JsonLd"
import { COMPANY } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Cinta Adhesiva Personalizada con Logo | Desde Pocas Unidades",
  description:
    "Cintas adhesivas personalizadas con tu logo o marca. Cinta adhesiva impresa en hasta 3 colores, fondo transparente o blanco. Cinta scotch personalizada desde pocas unidades. Fabricantes en Argentina — cotizá sin cargo.",
  alternates: { canonical: `${COMPANY.url}/cinta-adhesiva-personalizada` },
  openGraph: {
    title: "Cinta Adhesiva Personalizada con Logo | Desde Pocas Unidades",
    description: "Cintas adhesivas personalizadas con tu logo. Cinta impresa personalizada en hasta 3 colores. Fabricantes en Argentina.",
    url: `${COMPANY.url}/cinta-adhesiva-personalizada`,
    images: ["/images/og-cover.jpg"],
  },
}

const specs = [
  { label: "Material", value: "BOPP / Polipropileno" },
  { label: "Adhesivo", value: "Acrílico base agua" },
  { label: "Anchos disponibles", value: "24mm, 48mm, 72mm" },
  { label: "Largo por rollo", value: "50m o 100m" },
  { label: "Colores de impresión", value: "Hasta 3 colores" },
  { label: "Fondo", value: "Transparente o blanco" },
  { label: "Pedido mínimo", value: "Desde pocas unidades — consultá" },
]

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Cinta Adhesiva Personalizada con Logo",
  description: "Cintas adhesivas personalizadas impresas con tu logo o marca. Tape personalizado en hasta 3 colores sobre fondo transparente o blanco. Fabricantes en Argentina.",
  brand: { "@type": "Brand", name: COMPANY.name },
  offers: {
    "@type": "Offer",
    priceCurrency: "ARS",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: COMPANY.name },
  },
}

// FAQ anclada en queries reales de esta página: "cinta scotch personalizada" (110),
// "cinta transparente con logo", "cinta adhesiva con logo". Sin repetir con home/embalaje/blog.
const faqs = [
  {
    q: "¿Hacen cinta scotch personalizada?",
    a: "Sí. Fabricamos cinta tipo scotch personalizada en formato chico de 24mm y también en 48mm, todas impresas con tu logo en hasta 3 colores.",
  },
  {
    q: "¿Se puede imprimir el logo sobre cinta transparente?",
    a: "Sí. Podés elegir fondo transparente —tu logo flota sobre el cartón de la caja— o fondo blanco para mayor contraste. Ambas versiones se imprimen en hasta 3 colores.",
  },
  {
    q: "¿En qué anchos viene la cinta adhesiva personalizada?",
    a: "En 24mm (tipo scotch), 48mm (el ancho estándar) y 72mm para usos especiales. El largo por rollo es de 50m o 100m.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}

export default function CintaAdhesivaPage() {
  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={faqSchema} />
      <ProductHero
        title="Cinta Adhesiva Personalizada con Logo"
        description="Fabricamos cintas adhesivas personalizadas con tu logo, marca o diseño. Cinta adhesiva impresa en hasta 3 colores sobre fondo transparente o blanco — ideal como tape personalizado para tus envíos."
        image="/images/cinta-adhesiva.webp"
        imageAlt="Cinta adhesiva personalizada con logo impreso — cinta scotch personalizada para envíos"
      />
      <SpecsTable specs={specs} />

      {/* Sección de texto SEO con keywords secundarias */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-2xl font-bold text-neutral-900">
            Cinta impresa personalizada para tu negocio
          </h2>
          <div className="space-y-4 text-neutral-600">
            <p>
              Nuestra <strong>cinta adhesiva con logo</strong> es la solución más efectiva para darle identidad a cada envío. Funcioná como una <strong>cinta scotch personalizada</strong> con tu marca: cada paquete que sale de tu depósito lleva tu branding impreso.
            </p>
            <p>
              A diferencia de otros proveedores, ofrecemos <strong>cinta adhesiva personalizada desde pocas unidades</strong>. No necesitás comprar miles de rollos para arrancar — es la opción ideal para emprendedores y PyMEs que buscan profesionalizar sus envíos sin una inversión inicial alta.
            </p>
            <p>
              Nuestro <strong>tape personalizado</strong> se fabrica en polipropileno (BOPP) con adhesivo acrílico de alta calidad. Disponible en <strong>cinta transparente personalizada</strong> o con fondo blanco, según lo que mejor funcione con tu diseño y tipo de caja.
            </p>
            <p>
              Somos fabricantes de <strong>cinta adhesiva personalizada en Argentina</strong>. Producimos localmente, lo que nos permite ofrecer tiempos de entrega cortos y atención directa sin intermediarios.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-neutral-900">
            Usos y aplicaciones de la cinta adhesiva impresa
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "E-commerce y envíos",
                desc: "Sellá tus paquetes con cinta impresa personalizada y generá reconocimiento de marca en cada entrega. Tu logo viaja con cada despacho.",
              },
              {
                title: "Logística y distribución",
                desc: "Identificá tus pallets y bultos con cintas adhesivas personalizadas para trazabilidad, control y prevención de pérdidas.",
              },
              {
                title: "Emprendedores y PyMEs",
                desc: "Cinta adhesiva personalizada desde pocas unidades — no necesitás grandes volúmenes para tener un packaging profesional con tu marca.",
              },
            ].map((use) => (
              <div key={use.title} className="rounded-lg border bg-white p-6">
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">{use.title}</h3>
                <p className="text-sm text-neutral-600">{use.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ específica de esta landing */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-neutral-900">
            Preguntas sobre cintas adhesivas personalizadas
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-lg border p-6">
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
