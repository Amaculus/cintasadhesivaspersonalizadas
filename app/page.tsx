import { Metadata } from "next"
import { HeroSection } from "@/components/home/HeroSection"
import { ProductCards } from "@/components/home/ProductCards"
import { WhyUs } from "@/components/home/WhyUs"
import { Process } from "@/components/home/Process"
import { HomeFAQ } from "@/components/home/HomeFAQ"
import { ProductCTA } from "@/components/product/ProductCTA"
import { JsonLd } from "@/components/seo/JsonLd"
import { COMPANY } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Cintas Adhesivas Personalizadas | Fabricantes en Argentina",
  description:
    "Fabricamos cintas adhesivas con tu logo para embalaje. BOPP y kraft. Desde pocos rollos, sin costo de matriz. Envío a todo el país. Pedí tu cotización.",
  alternates: { canonical: COMPANY.url },
  openGraph: {
    title: "Cintas Adhesivas Personalizadas | Fabricantes en Argentina",
    description:
      "Fabricamos cintas adhesivas con tu logo para embalaje. BOPP y kraft. Envío a todo el país.",
    url: COMPANY.url,
    siteName: COMPANY.name,
    locale: "es_AR",
    type: "website",
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: COMPANY.name,
  url: COMPANY.url,
  telephone: `+${COMPANY.whatsapp}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressCountry: "AR",
  },
  description: COMPANY.description,
  areaServed: "AR",
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: COMPANY.name,
  url: COMPANY.url,
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={websiteSchema} />
      <HeroSection />
      <ProductCards />
      <WhyUs />
      <Process />
      <HomeFAQ />
      <ProductCTA />
    </>
  )
}
