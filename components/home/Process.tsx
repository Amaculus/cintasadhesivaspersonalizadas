import { Upload, PenTool, ThumbsUp, Truck } from "lucide-react"

const steps = [
  { icon: Upload, title: "Enviás tu logo", description: "Mandanos tu logo en formato vectorial o PNG de alta resolución." },
  { icon: PenTool, title: "Te mandamos boceto", description: "Diseñamos el boceto de tu cinta y te lo enviamos para revisión." },
  { icon: ThumbsUp, title: "Aprobás el diseño", description: "Confirmás el diseño final y arrancamos la producción." },
  { icon: Truck, title: "Producimos y despachamos", description: "Fabricamos tus cintas y las enviamos a donde necesites." },
]

export function Process() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-10 text-center text-3xl font-bold text-neutral-900">
          Cómo funciona
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="mb-2 text-sm font-bold text-primary">Paso {i + 1}</div>
              <h3 className="mb-2 text-lg font-semibold text-neutral-900">{step.title}</h3>
              <p className="text-sm text-neutral-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
