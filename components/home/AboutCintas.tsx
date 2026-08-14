import Link from "next/link"

export function AboutCintas() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-6 text-2xl font-bold text-neutral-900 md:text-3xl">
          ¿Qué es una cinta personalizada?
        </h2>
        <div className="space-y-4 text-neutral-600">
          <p>
            Una <strong>cinta personalizada</strong> es una cinta adhesiva impresa con tu logo,
            marca o diseño en lugar de una cinta genérica. Se usa para sellar cajas y envíos, y
            convierte cada paquete en una pieza de branding: tu marca viaja con cada despacho.
          </p>
          <p>Fabricamos dos tipos, según lo que necesites:</p>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              <Link href="/cinta-adhesiva-personalizada" className="font-medium text-primary hover:underline">
                Cinta adhesiva con logo
              </Link>{" "}
              — formatos de 24 y 48mm, fondo transparente o blanco. Ideal para e-commerce y como
              cinta scotch personalizada.
            </li>
            <li>
              <Link href="/cinta-de-embalaje-personalizada" className="font-medium text-primary hover:underline">
                Cinta de embalaje personalizada
              </Link>{" "}
              — formato industrial de 48mm para logística y alto volumen, con adhesivo de alta
              retención.
            </li>
          </ul>
          <p>
            Todas se imprimen en <strong>hasta 3 colores</strong>, se fabrican en Argentina y las
            podés cotizar al instante online — desde cantidades accesibles para emprendedores hasta
            volumen mayorista.
          </p>
        </div>
      </div>
    </section>
  )
}
