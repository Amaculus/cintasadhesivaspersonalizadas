"use client"

import { useEffect, useMemo, useState } from "react"
import { MessageCircle } from "lucide-react"
import { COMPANY } from "@/lib/constants"

// ============================================================
// CONFIG — números reales del negocio (no modificar sin el dueño)
// ============================================================
const MARGEN = 0.6
const DOLAR_FALLBACK = 1480
const COSTO_POLIMERO_USD = 18
const COSTO_DISENO_USD = 0
const RECARGO_2COLORES_PCT = 0.1
const MIN_CAJAS_2COLORES = 5

type Color = "TRANSPA" | "BLANCO"

// Tabla de precios de fábrica (del cotizador original)
const PRECIOS_FABRICA: {
  ancho: number
  largo: number
  TRANSPA: Record<number, number>
  BLANCO: Record<number, number>
}[] = [
  {
    ancho: 24, largo: 50,
    TRANSPA: { 36: 27, 72: 49, 108: Math.round(0.49 * 108) },
    BLANCO: { 36: 39, 72: 28, 108: Math.round(0.87 * 72) },
  },
  {
    ancho: 24, largo: 100,
    TRANSPA: { 36: 43, 72: 78, 108: Math.round(0.78 * 108) },
    BLANCO: { 36: 62, 72: 45, 108: Math.round(1.39 * 72) },
  },
  {
    ancho: 48, largo: 50,
    TRANSPA: { 36: 44, 72: 77, 108: Math.round(0.79 * 108) },
    BLANCO: { 36: 68, 72: 44, 108: Math.round(1.26 * 72) },
  },
  {
    ancho: 48, largo: 100,
    TRANSPA: { 36: 70, 72: 123, 108: Math.round(1.26 * 108) },
    BLANCO: { 36: 109, 72: 70, 108: Math.round(2.01 * 72) },
  },
]

const COLOR_LABELS: Record<Color, string> = {
  TRANSPA: "Cinta Transparente",
  BLANCO: "Cinta Blanca",
}

const CANTIDADES = [
  { rollos: 36, label: "36 rollos", sub: "1 caja" },
  { rollos: 72, label: "72 rollos", sub: "2 cajas" },
  { rollos: 108, label: "108 rollos", sub: "3 cajas" },
]

function formatARS(n: number) {
  return Math.round(n).toLocaleString("es-AR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

export function Cotizador() {
  const [ancho, setAncho] = useState(24)
  const [largo, setLargo] = useState(50)
  const [color, setColor] = useState<Color | null>(null)
  const [rollos, setRollos] = useState<number | null>(null)
  const [nombre, setNombre] = useState("")
  const [dolar, setDolar] = useState(DOLAR_FALLBACK)

  // Dólar blue en vivo (fallback silencioso)
  useEffect(() => {
    let active = true
    fetch("https://dolarapi.com/v1/dolares/blue")
      .then((r) => r.json())
      .then((d) => {
        if (active && d && d.venta) setDolar(d.venta)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  const fila = useMemo(
    () => PRECIOS_FABRICA.find((r) => r.ancho === ancho && r.largo === largo) ?? null,
    [ancho, largo]
  )

  function getPrecioFabrica(c: Color | null, r: number | null): number | null {
    if (!fila || !c || r === null) return null
    const p = fila[c][r]
    return p ?? null
  }

  // Cálculo (idéntico al cotizador original)
  const cotizacion = useMemo(() => {
    const precioFab = getPrecioFabrica(color, rollos)
    if (precioFab === null || rollos === null || color === null) return null

    const cajas = rollos / 36
    const recargo2C =
      cajas >= MIN_CAJAS_2COLORES ? Math.round(precioFab * RECARGO_2COLORES_PCT) : 0
    const costoFabrica = precioFab + recargo2C
    const precioFabConMargen = costoFabrica / (1 - MARGEN)
    const precioClienteUSD = precioFabConMargen + COSTO_POLIMERO_USD + COSTO_DISENO_USD
    const precioClienteARS = precioClienteUSD * dolar
    const xRolloARS = precioClienteARS / rollos

    return {
      precioClienteARS: Math.round(precioClienteARS),
      xRolloARS: Math.round(xRolloARS),
      cajas,
      colorLabel: COLOR_LABELS[color],
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, rollos, dolar, fila])

  // Cambio de ancho: 24mm sólo permite 50m
  function onAncho(value: number) {
    setAncho(value)
    if (value === 24) setLargo(50)
    setColor(null)
    setRollos(null)
  }
  function onLargo(value: number) {
    setLargo(value)
    setColor(null)
    setRollos(null)
  }
  function onColor(c: Color) {
    setColor(c)
    setRollos(null)
  }

  function enviarWA() {
    if (!cotizacion || rollos === null) return
    const cliente = nombre.trim() || "Cliente"
    const msg = `Hola, les escribo para solicitar una cotización.

*Datos del pedido:*
- Nombre/Empresa: ${cliente}
- Cinta: ${ancho}mm x ${largo}m ${cotizacion.colorLabel}
- Cantidad: ${rollos} rollos (${cotizacion.cajas} caja${cotizacion.cajas > 1 ? "s" : ""})

*Precio estimado según cotizador:*
- Total: $${formatARS(cotizacion.precioClienteARS)}
- Precio por rollo: $${formatARS(cotizacion.xRolloARS)}
- El precio incluye el polímero de la primera impresión

Si les sirve, les puedo enviar mi diseño por acá para que lo revisen y vectoricen antes de producir. Gracias.`
    window.open(
      `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank"
    )
  }

  const tapeText = "CINTA PERSONALIZADA · ".repeat(6)

  return (
    <div className="space-y-6">
      {/* PASO 1 — MEDIDAS */}
      <Card step={1} title="Medidas">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ancho">
            <select
              value={ancho}
              onChange={(e) => onAncho(parseInt(e.target.value))}
              className="w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value={24}>24 mm</option>
              <option value={48}>48 mm</option>
            </select>
          </Field>
          <Field label="Largo">
            <select
              value={largo}
              disabled={ancho === 24}
              onChange={(e) => onLargo(parseInt(e.target.value))}
              className="w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value={50}>50 m</option>
              <option value={100}>100 m</option>
            </select>
          </Field>
        </div>
      </Card>

      {/* PREVIEW */}
      <Card step={null} title="Preview">
        <div className="rounded-lg bg-neutral-50 p-6">
          <div className="flex items-center justify-center overflow-hidden">
            <div
              className={`relative flex items-center justify-center overflow-hidden rounded-sm border shadow-sm transition-all duration-300 ${
                color === "BLANCO"
                  ? "border-neutral-300 bg-neutral-100"
                  : "border-sky-200 bg-gradient-to-b from-sky-50 to-sky-100"
              }`}
              style={{ width: 340, height: ancho === 48 ? 84 : 46 }}
            >
              <span
                className="truncate px-3 font-semibold uppercase tracking-widest text-primary/80"
                style={{ fontSize: ancho === 48 ? 15 : 11 }}
              >
                {tapeText}
              </span>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            {ancho} mm de ancho · {largo} m de largo
            {color ? ` · ${COLOR_LABELS[color]}` : ""}
          </p>
          {/* Comparación de anchos */}
          <div className="mx-auto mt-6 max-w-sm space-y-3">
            {[24, 48].map((w) => (
              <div key={w} className="flex items-center gap-3">
                <span className="w-12 shrink-0 text-right text-xs font-semibold text-muted-foreground">
                  {w} mm
                </span>
                <div
                  className={`rounded transition-all ${
                    ancho === w ? "bg-primary" : "bg-neutral-300"
                  }`}
                  style={{ height: w === 48 ? 24 : 12, width: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* PASO 2 — TIPO */}
      <Card step={2} title="Tipo de cinta">
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(COLOR_LABELS) as Color[]).map((c) => (
            <OptionButton key={c} selected={color === c} onClick={() => onColor(c)}>
              {COLOR_LABELS[c]}
            </OptionButton>
          ))}
        </div>
      </Card>

      {/* PASO 3 — CANTIDAD */}
      <Card step={3} title="Cantidad de rollos">
        <div className="grid grid-cols-3 gap-3">
          {CANTIDADES.map((q) => {
            const ok = color !== null && getPrecioFabrica(color, q.rollos) !== null
            return (
              <OptionButton
                key={q.rollos}
                selected={rollos === q.rollos}
                disabled={!ok}
                onClick={() => setRollos(q.rollos)}
              >
                {q.label}
                <span className="mt-0.5 block text-[11px] font-normal opacity-70">
                  {q.sub}
                </span>
              </OptionButton>
            )
          })}
        </div>
      </Card>

      {/* PASO 4 — DATOS */}
      <Card step={4} title="Tus datos">
        <Field label="Nombre o empresa">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Confecciones García"
            className="w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </Field>
      </Card>

      {/* RESULTADO */}
      <div className="rounded-xl bg-primary p-8 text-white">
        {!cotizacion ? (
          <p className="py-6 text-center text-sm text-blue-100">
            Completá los campos para ver el precio de tu pedido
          </p>
        ) : (
          <>
            <div className="text-xs font-medium uppercase tracking-widest text-blue-200">
              Precio total del pedido
            </div>
            <div className="mt-1 text-5xl font-bold">
              <span className="align-super text-2xl">$</span>
              {formatARS(cotizacion.precioClienteARS)}
            </div>
            <div className="mt-1 text-sm text-blue-100">
              ${formatARS(cotizacion.xRolloARS)} por rollo · incluye el polímero de la primera
              impresión
            </div>
            <hr className="my-5 border-white/15" />
            <div className="grid gap-1.5 sm:grid-cols-2">
              <Breakdown label="Cinta" value={`${ancho}mm x ${largo}m ${cotizacion.colorLabel}`} />
              <Breakdown
                label="Cantidad"
                value={`${rollos} rollos · ${cotizacion.cajas} caja${cotizacion.cajas > 1 ? "s" : ""}`}
              />
              <Breakdown label="Polímero" value="Incluido en esta primera impresión" />
            </div>
          </>
        )}
      </div>

      <button
        onClick={enviarWA}
        disabled={!cotizacion}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 font-semibold text-white transition hover:bg-[#1ebd5a] disabled:cursor-not-allowed disabled:bg-neutral-300"
      >
        <MessageCircle className="h-5 w-5" />
        Solicitar cotización por WhatsApp
      </button>
      <p className="text-center text-xs text-muted-foreground">
        El precio incluye el costo del polímero en esta primera impresión. En reimpresiones del
        mismo diseño no vuelve a cobrarse. Podés enviarnos tu diseño por WhatsApp para revisarlo y
        vectorizarlo antes de producir.
      </p>
    </div>
  )
}

// ============================================================
// Subcomponentes
// ============================================================
function Card({
  step,
  title,
  children,
}: {
  step: number | null
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5 text-lg font-semibold text-neutral-900">
        {step !== null && (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            {step}
          </span>
        )}
        {title}
      </div>
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}

function OptionButton({
  selected,
  disabled,
  onClick,
  children,
}: {
  selected: boolean
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg border px-3 py-3 text-center text-sm font-medium transition ${
        selected
          ? "border-primary bg-primary text-white"
          : "border-input bg-neutral-50 text-neutral-800 hover:border-primary hover:bg-blue-50"
      } disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-input disabled:hover:bg-neutral-50`}
    >
      {children}
    </button>
  )
}

function Breakdown({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2 py-0.5 text-sm">
      <span className="text-blue-200">{label}</span>
      <span className="text-right font-medium text-white/90">{value}</span>
    </div>
  )
}
