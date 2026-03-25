"use client"

import { MessageCircle } from "lucide-react"
import { WhatsAppLink } from "./WhatsAppLink"

export function WhatsAppButton() {
  return (
    <WhatsAppLink className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600">
      <MessageCircle className="h-7 w-7" />
    </WhatsAppLink>
  )
}
