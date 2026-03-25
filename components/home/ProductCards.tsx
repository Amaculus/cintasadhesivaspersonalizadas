import Link from "next/link"
import { ArrowRight, Package, Truck } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const products = [
  {
    title: "Cinta Adhesiva con Logo",
    description: "Cintas impresas con tu marca en hasta 3 colores. Fondo transparente o blanco. Ideal para branding de envíos.",
    href: "/cinta-adhesiva-personalizada",
    icon: Package,
  },
  {
    title: "Cinta de Embalaje Personalizada",
    description: "Formato industrial 48mm para e-commerce y logística de alto volumen. Adhesivo de alta retención.",
    href: "/cinta-de-embalaje-personalizada",
    icon: Truck,
  },
]

export function ProductCards() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-10 text-center text-3xl font-bold text-neutral-900">
          Nuestros Productos
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <Link key={product.href} href={product.href} className="group">
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <product.icon className="mb-2 h-10 w-10 text-primary" />
                  <CardTitle className="text-xl">{product.title}</CardTitle>
                  <CardDescription className="text-base">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                    Ver más <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
