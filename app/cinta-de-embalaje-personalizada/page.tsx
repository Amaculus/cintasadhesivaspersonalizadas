import { Metadata } from "next"
import { ProductHero } from "@/components/product/ProductHero"
import { SpecsTable } from "@/components/product/SpecsTable"
import { ProductCTA } from "@/components/product/ProductCTA"
import { Process } from "@/components/home/Process"
import { JsonLd } from "@/components/seo/JsonLd"
import { COMPANY } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Cinta de Embalaje Personalizada | Con Tu Marca",
  description:
    "Cintas de embalaje personalizadas para e-commerce y logística. Con logo, leyenda o diseño. Pedido mínimo accesible.",
  alternates: { canonical: `${COMPANY.url}/cinta-de-embalaje-personalizada` },
  openGraph: {
    title: "Cinta de Embalaje Personalizada | Con Tu Marca",
    description: "Cintas de embalaje personalizadas para e-commerce y logística.",
    url: `${COMPANY.url}/cinta-de-embalaje-personalizada`,
  },
}

const specs = [
  { label: "Material", value: "BOPP / Polipropileno de alta resistencia" },
  { label: "Adhesivo", value: "Acrílico de alta retención" },
  { label: "Ancho estándar", value: "48mm (también disponible en 72mm)" },
  { label: "Largo por rollo", value: "50m o 100m" },
  { label: "Resistencia", value: "Apto cadena de frío y humedad" },
  { label: "Impresión", value: "Hasta 3 colores" },
]

const comparisonData = [
  { feature: "Branding", standard: "Sin marca", custom: "Con tu logo y colores" },
  { feature: "Seguridad", standard: "Fácil de reemplazar", custom: "Evidencia de apertura" },
  { feature: "Profesionalismo", standard: "Genérica", custom: "Imagen de marca premium" },
  { feature: "Trazabilidad", standard: "Sin identificar", custom: "Identificación inmediata" },
]

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Cinta de Embalaje Personalizada",
  description: "Cintas de embalaje personalizadas para e-commerce y logística. Con logo, leyenda o diseño.",
  brand: { "@type": "Brand", name: COMPANY.name },
  offers: {
    "@type": "Offer",
    priceCurrency: "ARS",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: COMPANY.name },
  },
}

export default function CintaEmbalajePage() {
  return (
    <>
      <JsonLd data={productSchema} />
      <ProductHero
        title="Cinta de Embalaje Personalizada"
        description="Cintas de embalaje con tu logo para operaciones de alto volumen. Adhesivo de alta retención, resistente a cadena de frío y humedad. Formato industrial de 48mm."
        image="https://placehold.co/800x600/e2e8f0/475569?text=Cinta+Embalaje+Personalizada"
        imageAlt="Cinta de embalaje personalizada con logo para e-commerce"
      />
      <SpecsTable specs={specs} />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-neutral-900">
            Usos Específicos
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Expresos y correos", desc: "Cintas resistentes para cadenas logísticas exigentes." },
              { title: "E-commerce alto volumen", desc: "Sellá miles de envíos al mes con tu marca." },
              { title: "Operaciones logísticas", desc: "Control e identificación de bultos y pallets." },
              { title: "Precintos y seguridad", desc: "Evidencia de violación para envíos sensibles." },
            ].map((use) => (
              <div key={use.title} className="rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">{use.title}</h3>
                <p className="text-sm text-neutral-600">{use.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-neutral-900">
            Cinta Estándar vs Personalizada
          </h2>
          <div className="overflow-hidden rounded-lg border bg-white">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">Característica</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">Cinta estándar</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-primary">Personalizada</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
                    <td className="px-6 py-3 text-sm font-medium text-neutral-900">{row.feature}</td>
                    <td className="px-6 py-3 text-sm text-neutral-500">{row.standard}</td>
                    <td className="px-6 py-3 text-sm font-medium text-neutral-700">{row.custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Process />
      <ProductCTA />
    </>
  )
}
