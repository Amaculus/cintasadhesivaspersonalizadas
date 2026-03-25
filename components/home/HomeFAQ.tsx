import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { JsonLd } from "@/components/seo/JsonLd"

const faqs = [
  {
    q: "¿Cuál es el pedido mínimo para cintas adhesivas personalizadas?",
    a: "El pedido mínimo es accesible y competitivo — consultanos por la cantidad exacta según el tipo de cinta que necesites. Es uno de los mínimos más bajos del mercado.",
  },
  {
    q: "¿Cuánto tarda la producción y entrega?",
    a: "Una vez aprobado el boceto, el plazo de producción es de pocos días hábiles. Los envíos al interior se realizan por transporte y llegan en 3 a 7 días según la zona.",
  },
  {
    q: "¿Qué archivo necesito enviar para el logo?",
    a: "Necesitamos el logo en formato vectorial (PDF, AI, SVG o EPS). También aceptamos PNG de alta resolución (mínimo 300 DPI).",
  },
  {
    q: "¿Cuántos colores puedo imprimir?",
    a: "Imprimimos hasta 3 colores. Cada color adicional puede tener un costo de polímero asociado.",
  },
  {
    q: "¿Hacen envíos a todo el país?",
    a: "Sí, enviamos a toda Argentina a través de transporte y correo.",
  },
  {
    q: "¿Qué es el polímero y tiene costo adicional?",
    a: "El polímero es la goma de impresión (similar a una matriz). Consultanos sobre nuestra política actual de costos de polímero — en muchos casos se bonifica.",
  },
]

export function HomeFAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  }

  return (
    <section className="bg-neutral-50 py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-10 text-center text-3xl font-bold text-neutral-900">
          Preguntas Frecuentes
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-600">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <JsonLd data={faqSchema} />
      </div>
    </section>
  )
}
