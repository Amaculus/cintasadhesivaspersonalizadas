const WEBHOOK_URL = process.env.TRACKING_WEBHOOK_URL

export interface TrackingEvent {
  event: "form_submit" | "whatsapp_click"
  page: string
  timestamp?: string
  data?: Record<string, string>
}

export async function trackEvent(event: TrackingEvent) {
  if (!WEBHOOK_URL) {
    console.log("[tracking] no webhook configured:", event)
    return
  }

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...event,
        timestamp: event.timestamp || new Date().toISOString(),
      }),
    })
  } catch (err) {
    // fire and forget — never block the user flow
    console.error("[tracking] webhook failed:", err)
  }
}
