import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppButton } from "@/components/layout/WhatsAppButton"
import { COMPANY } from "@/lib/constants"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: {
    default: "Cintas Adhesivas Personalizadas | Fabricantes en Argentina",
    template: "%s | Cintas Adhesivas Personalizadas",
  },
  description: COMPANY.description,
  metadataBase: new URL(COMPANY.url),
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: COMPANY.url,
    siteName: COMPANY.name,
    title: "Cintas Adhesivas Personalizadas | Fabricantes en Argentina",
    description: COMPANY.description,
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Cajas selladas con cinta adhesiva personalizada con logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-cover.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
      {/* Se activa solo si NEXT_PUBLIC_GA_ID está seteada (G-XXXXXXX) */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  )
}
