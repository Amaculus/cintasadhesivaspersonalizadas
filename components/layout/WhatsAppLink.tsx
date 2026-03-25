"use client"

import { usePathname } from "next/navigation"
import { WHATSAPP_URL } from "@/lib/constants"

export function WhatsAppLink({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const pathname = usePathname()

  function handleClick() {
    // fire and forget — don't block navigation
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "whatsapp_click",
        page: pathname,
      }),
    }).catch(() => {})
  }

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
