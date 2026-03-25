import { Metadata } from "next"
import { CotizarForm } from "@/components/forms/CotizarForm"
import { COMPANY } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Cotizar Cintas Adhesivas Personalizadas | Presupuesto Sin Cargo",
  description: "Pedí tu cotización de cintas adhesivas personalizadas sin cargo. Respondemos en menos de 24hs hábiles.",
  alternates: { canonical: `${COMPANY.url}/cotizar` },
}

export default function CotizarPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-2 text-3xl font-bold text-neutral-900">Pedí tu cotización</h1>
        <p className="mb-8 text-neutral-600">
          Completá el formulario y te respondemos en menos de 24hs hábiles con un presupuesto
          y boceto de tu cinta personalizada.
        </p>
        <CotizarForm />
      </div>
    </section>
  )
}
