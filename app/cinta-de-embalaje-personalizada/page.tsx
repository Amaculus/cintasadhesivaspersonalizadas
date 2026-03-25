import { Metadata } from "next"
import { ProductHero } from "@/components/product/ProductHero"
import { SpecsTable } from "@/components/product/SpecsTable"
import { ProductCTA } from "@/components/product/ProductCTA"
import { Process } from "@/components/home/Process"
import { JsonLd } from "@/components/seo/JsonLd"
import { COMPANY } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Cinta de Embalaje Personalizada con Logo | Venta Mayorista",
  description:
    "Cintas de embalaje personalizadas para empaque con tu logo. Cintas impresas personalizadas para e-commerce y logística. Cinta adhesiva impresa mayorista — cinta para cajas personalizada. Cotizá sin cargo.",
  alternates: { canonical: `${COMPANY.url}/cinta-de-embalaje-personalizada` },
  openGraph: {
    title: "Cinta de Embalaje Personalizada con Logo | Venta Mayorista",
    description: "Cintas personalizadas para empaque. Cintas de embalaje con logo para e-commerce y logística. Fabricantes en Argentina.",
    url: `${COMPANY.url}/cinta-de-embalaje-personalizada`,
  },
}

const specs = [
  { label: "Material", value: "BOPP / Polipropileno de alta resistencia" },
  { label: "Adhesivo", value: "Acrílico de alta retención" },
  { label: "Ancho estándar", value: "48mm (también disponible en 72mm)" },
  { label: "Largo por rollo", value: "50m o 100m" },
  { label: "Resistencia", value: "Apto cadena de frío y humedad" },
  { label: "Impresión", value: "Hasta 3 colores — cinta adhesiva impresa con tu diseño" },
  { label: "Venta", value: "Mayorista y minorista — consultá precios por volumen" },
]

const comparisonData = [
  { feature: "Branding", standard: "Sin marca", custom: "Con tu logo y colores" },
  { feature: "Seguridad", standard: "Fácil de reemplazar", custom: "Evidencia de apertura" },
  { feature: "Profesionalismo", standard: "Genérica", custom: "Imagen de marca premium" },
  { feature: "Trazabilidad", standard: "Sin identificar", custom: "Identificación inmediata" },
  { feature: "Costo por impacto", standard: "Cero retorno", custom: "Marketing en cada envío" },
]

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Cinta de Embalaje Personalizada",
  description: "Cintas de embalaje personalizadas para empaque con logo. Cintas impresas personalizadas para e-commerce y logística mayorista. Fabricantes en Argentina.",
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
        description="Cintas personalizadas para empaque con tu logo, marca o leyenda. Cintas de embalaje con logo en formato industrial de 48mm — adhesivo de alta retención, resistente a cadena de frío y humedad."
        image="https://placehold.co/800x600/e2e8f0/475569?text=Cinta+Embalaje+Personalizada"
        imageAlt="Cinta de embalaje personalizada con logo — cintas personalizadas para empaque y cajas"
      />
      <SpecsTable specs={specs} />

      {/* Texto SEO con keywords secundarias */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-2xl font-bold text-neutral-900">
            Cintas impresas personalizadas para embalaje profesional
          </h2>
          <div className="space-y-4 text-neutral-600">
            <p>
              Nuestra <strong>cinta de embalaje personalizada</strong> está diseñada para operaciones que necesitan volumen, resistencia y presencia de marca. Cada rollo de <strong>cintas personalizadas para empaque</strong> lleva tu logo impreso en alta definición.
            </p>
            <p>
              Fabricamos <strong>cintas impresas personalizadas</strong> en formato estándar de 48mm — el más utilizado en logística y e-commerce. Es la <strong>cinta para cajas personalizada</strong> que necesitás: resistente al manipuleo, apta para cadena de frío y con adhesivo que no se despega.
            </p>
            <p>
              Ofrecemos <strong>cinta adhesiva personalizada mayorista</strong> con precios escalonados por volumen. A mayor cantidad de rollos, menor costo unitario. Ideal para empresas con despachos regulares que buscan <strong>cintas de embalaje con logo</strong> a un precio competitivo.
            </p>
            <p>
              Cada rollo es una <strong>cinta adhesiva impresa</strong> con tu diseño, fabricada en polipropileno de alta resistencia con adhesivo acrílico. El resultado: un packaging profesional que protege tu mercadería y comunica tu marca en cada envío.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-neutral-900">
            Para quién es la cinta de embalaje con logo
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Expresos y correos",
                desc: "Cintas de embalaje personalizadas resistentes para cadenas logísticas exigentes. Identificación inmediata del remitente.",
              },
              {
                title: "E-commerce alto volumen",
                desc: "Sellá miles de envíos al mes con cintas personalizadas para empaque. Tu marca en cada caja que llega al cliente.",
              },
              {
                title: "Operaciones logísticas",
                desc: "Cinta para cajas personalizada que facilita el control, la trazabilidad y la identificación de bultos y pallets.",
              },
              {
                title: "Precintos y seguridad",
                desc: "Cintas impresas personalizadas que funcionan como evidencia de violación para envíos sensibles o de alto valor.",
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

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-neutral-900">
            Cinta de embalaje estándar vs personalizada
          </h2>
          <div className="overflow-hidden rounded-lg border bg-white">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">Característica</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">Cinta estándar</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-primary">Personalizada con logo</th>
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

      {/* FAQ específica */}
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-neutral-900">
            Preguntas sobre cintas de embalaje personalizadas
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "¿Venden cinta adhesiva personalizada mayorista?",
                a: "Sí. Ofrecemos precios escalonados por volumen — a mayor cantidad, menor costo unitario. Pedí cotización indicando tu volumen estimado y te pasamos precio mayorista.",
              },
              {
                q: "¿Cuál es la diferencia entre cinta de embalaje personalizada y cinta adhesiva con logo?",
                a: "Son productos similares. La cinta de embalaje personalizada se refiere al formato industrial de 48mm o 72mm pensado para cajas y logística. La cinta adhesiva con logo incluye también formatos más chicos (24mm) para usos diversos.",
              },
              {
                q: "¿Tienen cinta para cajas personalizada resistente al frío?",
                a: "Sí. Nuestra cinta de embalaje personalizada usa adhesivo acrílico de alta retención, apto para cadena de frío y ambientes húmedos. No se despega ni pierde adherencia.",
              },
              {
                q: "¿Puedo usar la misma cinta adhesiva impresa para distintos productos?",
                a: "Sí. La cinta de embalaje con logo se puede usar en cualquier tipo de caja o embalaje. Un solo diseño para todos tus envíos, simplificando la operación.",
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
