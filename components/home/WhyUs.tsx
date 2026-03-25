import { CheckCircle } from "lucide-react"

const reasons = [
  {
    title: "Mínimos accesibles",
    description: "Pedidos desde pocos rollos — uno de los mínimos más bajos del mercado.",
  },
  {
    title: "Sin costo de matriz",
    description: "No cobramos polímero de impresión en tu primer pedido.",
  },
  {
    title: "Envío a todo el país",
    description: "Despachamos a cualquier punto de Argentina por transporte o correo.",
  },
  {
    title: "Entrega rápida",
    description: "Producción y despacho en días hábiles una vez aprobado el diseño.",
  },
]

export function WhyUs() {
  return (
    <section className="bg-neutral-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-10 text-center text-3xl font-bold text-neutral-900">
          Por qué elegirnos
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="rounded-lg bg-white p-6 shadow-sm">
              <CheckCircle className="mb-3 h-8 w-8 text-green-600" />
              <h3 className="mb-2 text-lg font-semibold text-neutral-900">{reason.title}</h3>
              <p className="text-sm text-neutral-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
