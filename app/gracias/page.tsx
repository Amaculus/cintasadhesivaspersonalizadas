import { Metadata } from "next"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "¡Cotización Enviada!",
  robots: { index: false, follow: false },
}

export default function GraciasPage() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-16">
      <div className="mx-auto max-w-lg px-4 text-center">
        <CheckCircle className="mx-auto mb-6 h-16 w-16 text-green-500" />
        <h1 className="mb-4 text-3xl font-bold text-neutral-900">¡Cotización enviada!</h1>
        <p className="mb-8 text-lg text-neutral-600">
          Recibimos tu solicitud. Te respondemos en menos de 24hs hábiles con un presupuesto
          y boceto personalizado.
        </p>
        <Button asChild size="lg">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </section>
  )
}
