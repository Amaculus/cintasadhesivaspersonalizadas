import { z } from "zod"

export const cotizarSchema = z.object({
  nombre: z.string().min(2, "El nombre es requerido"),
  empresa: z.string().optional(),
  email: z.string().email("Ingresá un email válido"),
  telefono: z.string().min(8, "Ingresá un teléfono válido"),
  tipo_producto: z.string().min(1, "Seleccioná un tipo de producto"),
  cantidad: z.string().min(1, "Seleccioná una cantidad"),
  colores: z.string().optional(),
  mensaje: z.string().optional(),
})

export type CotizarFormData = z.infer<typeof cotizarSchema>
