import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { JsonLd } from "@/components/seo/JsonLd"

// FAQ de la home: ancladas en las queries "umbrella" (cinta personalizada / cintas
// personalizadas / cinta personalizada logo). Preguntas distintas a las de producto y blog.
const faqs = [
  {
    q: "¿Qué es una cinta personalizada?",
    a: "Es una cinta adhesiva impresa con tu logo, marca o diseño en lugar de una cinta genérica. Se usa para sellar cajas y envíos, convirtiendo cada paquete en branding para tu empresa.",
  },
  {
    q: "¿Cuál es el pedido mínimo para cintas personalizadas?",
    a: "Trabajamos desde cantidades accesibles, sin mínimos altos. Pedí tu cotización indicando el volumen que necesitás y te confirmamos el mínimo exacto según el tipo de cinta.",
  },
  {
    q: "¿Qué necesito enviar para imprimir mi logo?",
    a: "Idealmente tu logo en formato vectorial (PDF, AI, SVG o EPS). También sirve un PNG de alta resolución (mínimo 300 DPI) con fondo transparente.",
  },
  {
    q: "¿Hacen envíos a todo el país?",
    a: "Sí, coordinamos envíos a toda la Argentina por transporte y correo. Consultá por tu zona al pedir la cotización.",
  },
  {
    q: "¿Cuánto tardan la producción y la entrega?",
    a: "Una vez aprobado el boceto, la producción lleva pocos días hábiles; al envío se le suma el tiempo de transporte según la zona.",
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
