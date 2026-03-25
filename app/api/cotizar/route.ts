import { NextRequest, NextResponse } from "next/server"
import { cotizarSchema } from "@/lib/schemas"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const data = {
      nombre: formData.get("nombre") as string,
      empresa: formData.get("empresa") as string,
      email: formData.get("email") as string,
      telefono: formData.get("telefono") as string,
      tipo_producto: formData.get("tipo_producto") as string,
      cantidad: formData.get("cantidad") as string,
      colores: formData.get("colores") as string,
      mensaje: formData.get("mensaje") as string,
    }

    const parsed = cotizarSchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const file = formData.get("archivo_logo") as File | null
    let attachments: { filename: string; content: Buffer }[] = []

    if (file && file.size > 0) {
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: "El archivo no puede superar 5MB" },
          { status: 400 }
        )
      }
      const buffer = Buffer.from(await file.arrayBuffer())
      attachments = [{ filename: file.name, content: buffer }]
    }

    const contactEmail = process.env.CONTACT_EMAIL
    const resendKey = process.env.RESEND_API_KEY

    if (resendKey && contactEmail) {
      const resend = new Resend(resendKey)

      await resend.emails.send({
        from: "Cotizaciones <onboarding@resend.dev>",
        to: contactEmail,
        subject: `Nueva cotización — ${parsed.data.nombre}${parsed.data.empresa ? ` (${parsed.data.empresa})` : ""}`,
        html: `
          <h2>Nueva solicitud de cotización</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nombre</td><td style="padding:8px;border:1px solid #ddd">${parsed.data.nombre}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Empresa</td><td style="padding:8px;border:1px solid #ddd">${parsed.data.empresa || "-"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${parsed.data.email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Teléfono</td><td style="padding:8px;border:1px solid #ddd">${parsed.data.telefono}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Producto</td><td style="padding:8px;border:1px solid #ddd">${parsed.data.tipo_producto}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Cantidad</td><td style="padding:8px;border:1px solid #ddd">${parsed.data.cantidad}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Colores</td><td style="padding:8px;border:1px solid #ddd">${parsed.data.colores || "-"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Mensaje</td><td style="padding:8px;border:1px solid #ddd">${parsed.data.mensaje || "-"}</td></tr>
          </table>
        `,
        attachments: attachments.map((a) => ({
          filename: a.filename,
          content: a.content,
        })),
      })
    } else {
      console.log("Cotización recibida (sin Resend configurado):", parsed.data)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error en /api/cotizar:", error)
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
