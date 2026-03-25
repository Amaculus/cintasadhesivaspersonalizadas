import { NextRequest, NextResponse } from "next/server"
import { trackEvent } from "@/lib/tracking"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, page } = body

    if (!event || !page) {
      return NextResponse.json({ error: "missing fields" }, { status: 400 })
    }

    await trackEvent({
      event,
      page,
      data: body.data || {},
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "invalid request" }, { status: 400 })
  }
}
