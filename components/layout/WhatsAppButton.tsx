"use client"

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import { WhatsAppLink } from "./WhatsAppLink"

export function WhatsAppButton() {
  return (
    <WhatsAppLink
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:bg-[#1ebd5a]"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </WhatsAppLink>
  )
}
