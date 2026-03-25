"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NAV_LINKS } from "@/lib/constants"
import { WhatsAppLink } from "./WhatsAppLink"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold text-primary">
          Cintas Adhesivas Personalizadas
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label} className="relative">
                <button
                  onClick={() => setProductsOpen(!productsOpen)}
                  onBlur={() => setTimeout(() => setProductsOpen(false), 150)}
                  className="flex items-center gap-1 text-sm font-medium text-neutral-700 hover:text-primary"
                >
                  {link.label} <ChevronDown className="h-4 w-4" />
                </button>
                {productsOpen && (
                  <div className="absolute left-0 top-full mt-2 w-56 rounded-md border bg-white py-2 shadow-lg">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                className="text-sm font-medium text-neutral-700 hover:text-primary"
              >
                {link.label}
              </Link>
            )
          )}
          <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
            <WhatsAppLink>
              <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
            </WhatsAppLink>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t bg-white px-4 py-4 md:hidden">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label} className="mb-2">
                <p className="mb-1 text-xs font-semibold uppercase text-neutral-500">
                  {link.label}
                </p>
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block py-2 text-sm text-neutral-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                className="block py-2 text-sm text-neutral-700"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          <Button asChild className="mt-3 w-full bg-green-600 hover:bg-green-700">
            <WhatsAppLink>
              <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
            </WhatsAppLink>
          </Button>
        </div>
      )}
    </header>
  )
}
