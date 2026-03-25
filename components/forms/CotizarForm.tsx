"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cotizarSchema, type CotizarFormData } from "@/lib/schemas"
import { PRODUCT_TYPES, CANTIDAD_OPTIONS, COLOR_OPTIONS } from "@/lib/constants"

export function CotizarForm() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CotizarFormData>({
    resolver: zodResolver(cotizarSchema),
    defaultValues: {
      telefono: "+54 ",
    },
  })

  async function onSubmit(data: CotizarFormData) {
    setSubmitting(true)
    setError(null)

    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value)
    })

    const fileInput = document.getElementById("archivo_logo") as HTMLInputElement
    if (fileInput?.files?.[0]) {
      formData.append("archivo_logo", fileInput.files[0])
    }

    try {
      const res = await fetch("/api/cotizar", {
        method: "POST",
        body: formData,
      })
      if (!res.ok) throw new Error("Error al enviar")
      router.push("/gracias")
    } catch {
      setError("Hubo un error al enviar tu cotización. Por favor intentá de nuevo o contactanos por WhatsApp.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="nombre">Nombre *</Label>
          <Input id="nombre" {...register("nombre")} placeholder="Tu nombre" />
          {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>}
        </div>
        <div>
          <Label htmlFor="empresa">Empresa</Label>
          <Input id="empresa" {...register("empresa")} placeholder="Nombre de tu empresa" />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" {...register("email")} placeholder="tu@empresa.com" />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="telefono">Teléfono *</Label>
          <Input id="telefono" type="tel" {...register("telefono")} placeholder="+54 11 1234-5678" />
          {errors.telefono && <p className="mt-1 text-sm text-red-600">{errors.telefono.message}</p>}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <Label>Tipo de producto *</Label>
          <Select onValueChange={(v) => setValue("tipo_producto", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccioná" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_TYPES.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.tipo_producto && <p className="mt-1 text-sm text-red-600">{errors.tipo_producto.message}</p>}
        </div>
        <div>
          <Label>Cantidad *</Label>
          <Select onValueChange={(v) => setValue("cantidad", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccioná" />
            </SelectTrigger>
            <SelectContent>
              {CANTIDAD_OPTIONS.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.cantidad && <p className="mt-1 text-sm text-red-600">{errors.cantidad.message}</p>}
        </div>
        <div>
          <Label>Colores de impresión</Label>
          <Select onValueChange={(v) => setValue("colores", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccioná" />
            </SelectTrigger>
            <SelectContent>
              {COLOR_OPTIONS.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="mensaje">Mensaje (opcional)</Label>
        <Textarea id="mensaje" {...register("mensaje")} placeholder="Contanos más sobre lo que necesitás..." rows={4} />
      </div>

      <div>
        <Label htmlFor="archivo_logo">Logo (opcional — PNG, SVG o PDF, máx 5MB)</Label>
        <Input id="archivo_logo" type="file" accept=".png,.svg,.pdf,.ai,.eps" className="cursor-pointer" />
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}

      <Button type="submit" size="lg" className="w-full text-base" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando...
          </>
        ) : (
          "Enviar cotización"
        )}
      </Button>
    </form>
  )
}
