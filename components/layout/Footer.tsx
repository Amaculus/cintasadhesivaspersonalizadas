import Link from "next/link"
import { COMPANY } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="border-t bg-neutral-900 text-neutral-300">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 text-lg font-bold text-white">{COMPANY.name}</h3>
            <p className="text-sm">{COMPANY.description}</p>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-white">Productos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cinta-adhesiva-personalizada" className="hover:text-white">
                  Cinta Adhesiva con Logo
                </Link>
              </li>
              <li>
                <Link href="/cinta-de-embalaje-personalizada" className="hover:text-white">
                  Cinta de Embalaje Personalizada
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-white">Blog</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog/como-disenar-tu-cinta-adhesiva-con-logo" className="hover:text-white">
                  Cómo diseñar tu cinta con logo
                </Link>
              </li>
              <li>
                <Link href="/blog/cuanto-cuesta-una-cinta-adhesiva-personalizada-en-argentina" className="hover:text-white">
                  Cuánto cuesta una cinta personalizada
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  Ver todos los artículos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-white">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>{COMPANY.email}</li>
              <li>WhatsApp: +{COMPANY.whatsapp}</li>
              <li>{COMPANY.location}</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-neutral-700 pt-6 text-center text-xs text-neutral-500">
          &copy; {new Date().getFullYear()} {COMPANY.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
