import { Metadata } from "next"
import { ProductHero } from "@/components/product/ProductHero"
import { SpecsTable } from "@/components/product/SpecsTable"
import { ProductCTA } from "@/components/product/ProductCTA"
import { Process } from "@/components/home/Process"
import { JsonLd } from "@/components/seo/JsonLd"
import { COMPANY } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Cinta Adhesiva Personalizada con Logo | Hasta 3 Colores",
  description:
    "Cintas adhesivas impresas con tu logo o marca. Adhesivo acrílico de alta calidad. Fondo transparente o blanco. Cotizá sin cargo.",
  alternates: { canonical: `${COMPANY.url}/cinta-adhesiva-personalizada` },
  openGraph: {
    title: "Cinta Adhesiva Personalizada con Logo | Hasta 3 Colores",
    description: "Cintas adhesivas impresas con tu logo o marca. Cotizá sin cargo.",
    url: `${COMPANY.url}/cinta-adhesiva-personalizada`,
  },
}

const specs = [
  { label: "Material", value: "BOPP / Polipropileno" },
  { label: "Adhesivo", value: "Acrílico base agua" },
  { label: "Anchos disponibles", value: "24mm, 48mm, 72mm" },
  { label: "Largo por rollo", value: "50m o 100m" },
  { label: "Colores de impresión", value: "Hasta 3 colores" },
  { label: "Fondo", value: "Transparente o blanco" },
]

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Cinta Adhesiva Personalizada con Logo",
  description: "Cintas adhesivas impresas con tu logo o marca. Adhesivo acrílico de alta calidad. Fondo transparente o blanco.",
  brand: { "@type": "Brand", name: COMPANY.name },
  offers: {
    "@type": "Offer",
    priceCurrency: "ARS",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: COMPANY.name },
  },
}

export default function CintaAdhesivaPage() {
  return (
    <>
      <JsonLd data={productSchema} />
      <ProductHero
        title="Cinta Adhesiva Personalizada con Logo"
        description="Imprimimos tu logo, marca o diseño en cintas adhesivas de alta calidad. Hasta 3 colores sobre fondo transparente o blanco. Ideal para branding de envíos, e-commerce y logística."
        image="https://placehold.co/800x600/e2e8f0/475569?text=Cinta+Adhesiva+Impresa"
        imageAlt="Cinta adhesiva personalizada con logo impreso"
      />
      <SpecsTable specs={specs} />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-neutral-900">
            Usos y Aplicaciones
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "E-commerce", desc: "Sellá tus envíos con tu marca y generá reconocimiento en cada paquete que llega a tu cliente." },
              { title: "Logística", desc: "Identificá tus pallets y bultos con cintas impresas para trazabilidad y control." },
              { title: "Branding de envíos", desc: "Cada paquete es una oportunidad de marketing. Tu logo viaja con cada despacho." },
            ].map((use) => (
              <div key={use.title} className="rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">{use.title}</h3>
                <p className="text-sm text-neutral-600">{use.desc}</p>
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
