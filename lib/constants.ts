export const COMPANY = {
  name: "Cintas Adhesivas Personalizadas",
  shortName: "CAP",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://cintasadhesivaspersonalizadas.com.ar",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5491112345678",
  email: "info@cintasadhesivaspersonalizadas.com.ar",
  location: "Buenos Aires, Argentina",
  description: "Fabricantes de cintas adhesivas personalizadas en Argentina.",
}

export const WHATSAPP_URL = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent("Hola, quiero cotizar cintas adhesivas personalizadas")}`

export const NAV_LINKS = [
  {
    label: "Productos",
    children: [
      { label: "Cinta Adhesiva con Logo", href: "/cinta-adhesiva-personalizada" },
      { label: "Cinta de Embalaje", href: "/cinta-de-embalaje-personalizada" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Cotizar", href: "/cotizar" },
]

export const PRODUCT_TYPES = [
  "Cinta adhesiva impresa",
  "Cinta de embalaje",
  "Cinta kraft",
  "Cinta de seguridad",
  "No sé, necesito asesoramiento",
] as const

export const CANTIDAD_OPTIONS = [
  "Menos de 50 rollos",
  "50–200 rollos",
  "200–500 rollos",
  "Más de 500 rollos",
] as const

export const COLOR_OPTIONS = [
  "1 color",
  "2 colores",
  "3 colores",
  "No definido",
] as const
