"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { UploadCloud } from "lucide-react"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
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
type Tab = "visual" | "compare" | "upload"

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

// Precio final al cliente para un color+cantidad (misma fórmula que el original)
function precioCliente(
  fila: (typeof PRECIOS_FABRICA)[number] | null,
  color: Color | null,
  rollos: number | null,
  dolar: number
): number | null {
  if (!fila || !color || rollos === null) return null
  const precioFab = fila[color][rollos]
  if (precioFab == null) return null
  const cajas = rollos / 36
  const recargo2C =
    cajas >= MIN_CAJAS_2COLORES ? Math.round(precioFab * RECARGO_2COLORES_PCT) : 0
  const costoFabrica = precioFab + recargo2C
  const precioFabConMargen = costoFabrica / (1 - MARGEN)
  const usd = precioFabConMargen + COSTO_POLIMERO_USD + COSTO_DISENO_USD
  return usd * dolar
}

export function Cotizador() {
  const [ancho, setAncho] = useState(24)
  const [largo, setLargo] = useState(50)
  const [color, setColor] = useState<Color | null>(null)
  const [rollos, setRollos] = useState<number | null>(null)
  const [nombre, setNombre] = useState("")
  const [dolar, setDolar] = useState(DOLAR_FALLBACK)
  const [tab, setTab] = useState<Tab>("visual")

  // ---- Upload state ----
  const [fileName, setFileName] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [removeBg, setRemoveBg] = useState(true)
  const [designReady, setDesignReady] = useState(false)
  const [repeats, setRepeats] = useState(0)
  const rawCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const sourceCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

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

  const cotizacion = useMemo(() => {
    const total = precioCliente(fila, color, rollos, dolar)
    if (total === null || rollos === null || color === null) return null
    const cajas = rollos / 36
    return {
      total: Math.round(total),
      xRollo: Math.round(total / rollos),
      cajas,
      colorLabel: COLOR_LABELS[color],
    }
  }, [fila, color, rollos, dolar])

  // Precio por rollo de cada cantidad (para el hint de ahorro por volumen)
  const perRoll = useMemo(() => {
    const out: Record<number, number | null> = {}
    for (const q of CANTIDADES) {
      const t = precioCliente(fila, color, q.rollos, dolar)
      out[q.rollos] = t === null ? null : Math.round(t / q.rollos)
    }
    return out
  }, [fila, color, dolar])

  const ahorroVsMin = useMemo(() => {
    if (!color || rollos === null) return null
    const base = perRoll[36]
    const cur = perRoll[rollos]
    if (!base || !cur || cur >= base) return null
    return Math.round(((base - cur) / base) * 100)
  }, [perRoll, color, rollos])

  // -------- Handlers de inputs --------
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

  // ============================================================
  // PREVIEW — tiling del diseño sobre la cinta
  // ============================================================
  const tapeHeightPx = ancho === 48 ? 96 : 52
  const STRIP_W = 320

  const drawTiled = useCallback(() => {
    const src = sourceCanvasRef.current
    const cv = previewCanvasRef.current
    if (!src || !cv) return
    const H = ancho === 48 ? 96 : 52
    cv.width = STRIP_W
    cv.height = H
    const ctx = cv.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, STRIP_W, H)
    const ratio = src.width / src.height || 1
    const designW = Math.max(Math.round(H * ratio), 20)
    const n = Math.max(1, Math.ceil(STRIP_W / designW))
    for (let i = 0; i < n; i++) ctx.drawImage(src, i * designW, 0, designW, H)
    setRepeats(n)
  }, [ancho])

  // Redibujar al cambiar el ancho (o cuando hay diseño nuevo)
  useEffect(() => {
    if (designReady) drawTiled()
  }, [ancho, designReady, drawTiled])

  // Construye sourceCanvas desde el raw, aplicando (o no) remoción de fondo
  const buildSource = useCallback(() => {
    const raw = rawCanvasRef.current
    if (!raw) return
    const copy = document.createElement("canvas")
    copy.width = raw.width
    copy.height = raw.height
    const ctx = copy.getContext("2d")
    if (!ctx) return
    ctx.drawImage(raw, 0, 0)
    if (removeBg) removeBackground(copy)
    sourceCanvasRef.current = copy
    setDesignReady(true)
    drawTiled()
  }, [removeBg, drawTiled])

  useEffect(() => {
    // re-procesa sólo cuando cambia el toggle de fondo (no en cada cambio de ancho)
    if (rawCanvasRef.current) buildSource()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeBg])

  async function processFile(file: File) {
    setUploadError(null)
    setProcessing(true)
    try {
      let raw: HTMLCanvasElement
      if (file.type === "application/pdf") {
        raw = await renderPdf(file)
      } else if (file.type.startsWith("image/")) {
        raw = await renderImage(file)
      } else {
        throw new Error("unsupported")
      }
      rawCanvasRef.current = raw
      setFileName(file.name)
      buildSource()
    } catch (err) {
      console.error("[cotizador upload]", err)
      rawCanvasRef.current = null
      sourceCanvasRef.current = null
      setDesignReady(false)
      setFileName(null)
      setUploadError(
        "No se pudo procesar el archivo. Probá con un PNG o JPG bien recortado, o mandanos el diseño por WhatsApp."
      )
    } finally {
      setProcessing(false)
    }
  }

  function onFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) processFile(f)
  }

  function resetUpload() {
    rawCanvasRef.current = null
    sourceCanvasRef.current = null
    setDesignReady(false)
    setFileName(null)
    setUploadError(null)
    setRepeats(0)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // ============================================================
  // WHATSAPP + tracking
  // ============================================================
  function track() {
    const data = {
      ancho,
      largo,
      color,
      rollos,
      total: cotizacion?.total,
      xRollo: cotizacion?.xRollo,
      diseno: fileName || null,
    }
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "cotizador_lead", page: "/cotizar", data }),
    }).catch(() => {})
    const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag
    if (typeof g === "function") {
      g("event", "generate_lead", { currency: "ARS", value: cotizacion?.total })
    }
  }

  const nombreOk = nombre.trim().length > 0
  const canSend = !!cotizacion && nombreOk

  function enviarWA() {
    if (!cotizacion || rollos === null || !nombreOk) return
    track()
    const cliente = nombre.trim()
    const diseno = fileName
      ? `\n- Diseño: ${fileName} (lo adjunto en este chat)`
      : ""
    const msg = `Hola, les escribo para solicitar una cotización.

*Datos del pedido:*
- Nombre/Empresa: ${cliente}
- Cinta: ${ancho}mm x ${largo}m ${cotizacion.colorLabel}
- Cantidad: ${rollos} rollos (${cotizacion.cajas} caja${cotizacion.cajas > 1 ? "s" : ""})${diseno}

*Precio estimado según cotizador:*
- Total: $${formatARS(cotizacion.total)}
- Precio por rollo: $${formatARS(cotizacion.xRollo)}
- El precio incluye el polímero de la primera impresión

Quedo a la espera para confirmar. ¡Gracias!`
    window.open(
      `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank"
    )
  }

  const tapeText = "CINTA PERSONALIZADA · ".repeat(6)
  const colorBgClass =
    color === "BLANCO"
      ? "border-neutral-300 bg-neutral-100"
      : "border-sky-200 bg-gradient-to-b from-sky-50 to-sky-100"

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

      {/* PREVIEW con tabs */}
      <Card step={null} title="Preview">
        <div className="mb-4 flex gap-2">
          {(
            [
              ["visual", "Ver cinta"],
              ["compare", "Comparar anchos"],
              ["upload", "Subir diseño"],
            ] as [Tab, string][]
          ).map(([id, lbl]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 rounded-md border px-3 py-2 text-xs font-medium transition ${
                tab === id
                  ? "border-primary bg-primary text-white"
                  : "border-input bg-neutral-50 text-muted-foreground hover:border-primary hover:text-neutral-800"
              }`}
            >
              {lbl}
            </button>
          ))}
        </div>

        {/* TAB visual */}
        {tab === "visual" && (
          <div className="rounded-lg bg-neutral-50 p-6">
            <div className="flex items-center justify-center overflow-hidden">
              <div
                className={`flex items-center justify-center overflow-hidden rounded-sm border shadow-sm transition-all duration-300 ${colorBgClass}`}
                style={{ width: 320, height: ancho === 48 ? 84 : 46 }}
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
          </div>
        )}

        {/* TAB compare */}
        {tab === "compare" && (
          <div className="rounded-lg bg-neutral-50 p-6">
            <div className="mx-auto max-w-sm space-y-4">
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
              <p className="text-center text-xs text-muted-foreground">
                Las barras están en proporción real entre sí.
              </p>
            </div>
          </div>
        )}

        {/* TAB upload */}
        {tab === "upload" && (
          <div className="rounded-lg bg-neutral-50 p-6">
            {!designReady && (
              <label className="relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-white px-6 py-8 text-center transition hover:border-primary hover:bg-blue-50">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,image/*"
                  onChange={onFileInput}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                <UploadCloud className="mb-2 h-8 w-8 text-primary" />
                <span className="text-sm font-semibold text-neutral-900">
                  {processing ? "Procesando…" : "Subí tu diseño"}
                </span>
                <span className="mt-1 text-xs text-muted-foreground">
                  PNG, JPG o PDF · simulamos cómo se vería repetido en la cinta
                </span>
              </label>
            )}

            {uploadError && (
              <p className="mt-3 text-center text-xs text-destructive">{uploadError}</p>
            )}

            {designReady && (
              <div className="flex flex-col items-center gap-4">
                <div
                  className={`flex items-center justify-center overflow-hidden rounded-sm border shadow-sm ${colorBgClass}`}
                  style={{ width: STRIP_W, height: tapeHeightPx }}
                >
                  <canvas
                    ref={previewCanvasRef}
                    className="block"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  Simulación orientativa · ~{repeats} repetición{repeats === 1 ? "" : "es"} en el
                  ancho útil. Antes de producir revisamos y vectorizamos tu archivo.
                </p>
                <label className="flex items-center gap-2 text-xs text-neutral-700">
                  <input
                    type="checkbox"
                    checked={removeBg}
                    onChange={(e) => setRemoveBg(e.target.checked)}
                    className="h-4 w-4 accent-primary"
                  />
                  Quitar el fondo del diseño
                </label>
                <button
                  onClick={resetUpload}
                  className="rounded-md border border-input px-4 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-neutral-800 hover:text-neutral-800"
                >
                  Cambiar archivo
                </button>
              </div>
            )}
          </div>
        )}
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
            const pr = perRoll[q.rollos]
            const ok = color !== null && pr !== null
            return (
              <OptionButton
                key={q.rollos}
                selected={rollos === q.rollos}
                disabled={!ok}
                onClick={() => setRollos(q.rollos)}
              >
                {q.label}
                <span className="mt-0.5 block text-[11px] font-normal opacity-70">
                  {ok ? `${q.sub} · $${formatARS(pr!)}/rollo` : q.sub}
                </span>
              </OptionButton>
            )
          })}
        </div>
        {color && (
          <p className="mt-3 text-xs text-muted-foreground">
            A mayor cantidad, menor precio por rollo.
          </p>
        )}
      </Card>

      {/* PASO 4 — DATOS */}
      <Card step={4} title="Tus datos">
        <Field label="Nombre o empresa *">
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
              {formatARS(cotizacion.total)}
            </div>
            <div className="mt-1 text-sm text-blue-100">
              ${formatARS(cotizacion.xRollo)} por rollo
              {ahorroVsMin ? ` · ahorrás ${ahorroVsMin}% vs 36 rollos` : ""}
            </div>
            <hr className="my-5 border-white/15" />
            <div className="grid gap-1.5 sm:grid-cols-2">
              <Breakdown label="Cinta" value={`${ancho}mm x ${largo}m ${cotizacion.colorLabel}`} />
              <Breakdown
                label="Cantidad"
                value={`${rollos} rollos · ${cotizacion.cajas} caja${cotizacion.cajas > 1 ? "s" : ""}`}
              />
              <Breakdown label="Polímero" value="Incluido en esta primera impresión" />
              {fileName && <Breakdown label="Diseño" value={fileName} />}
            </div>
          </>
        )}
      </div>

      <button
        onClick={enviarWA}
        disabled={!canSend}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 font-semibold text-white transition hover:bg-[#1ebd5a] disabled:cursor-not-allowed disabled:bg-neutral-300"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Solicitar cotización por WhatsApp
      </button>
      {cotizacion && !nombreOk && (
        <p className="text-center text-xs text-destructive">
          Completá tu nombre o empresa para enviar la cotización.
        </p>
      )}
      <p className="text-center text-xs text-muted-foreground">
        Precio orientativo, sujeto a confirmación · calculado con dólar blue ${formatARS(dolar)}. El
        polímero se cobra sólo en la primera impresión; en reimpresiones del mismo diseño no vuelve a
        cobrarse.
      </p>
    </div>
  )
}

// ============================================================
// PDF / imagen → canvas
// ============================================================
async function renderImage(file: File): Promise<HTMLCanvasElement> {
  const url = URL.createObjectURL(file)
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const im = new Image()
      im.onload = () => resolve(im)
      im.onerror = reject
      im.src = url
    })
    const w = img.naturalWidth || 600
    const h = img.naturalHeight || 300
    const canvas = document.createElement("canvas")
    canvas.width = w
    canvas.height = h
    canvas.getContext("2d")!.drawImage(img, 0, 0, w, h)
    return canvas
  } finally {
    URL.revokeObjectURL(url)
  }
}

async function renderPdf(file: File): Promise<HTMLCanvasElement> {
  const pdfjs = await import("pdfjs-dist")
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"
  const buf = await file.arrayBuffer()
  const doc = await pdfjs.getDocument({ data: buf }).promise
  const page = await doc.getPage(1)
  const base = page.getViewport({ scale: 1 })
  const target = 300 // px de alto para buena resolución
  const scale = target / base.height
  const vp = page.getViewport({ scale })
  const canvas = document.createElement("canvas")
  canvas.width = Math.round(vp.width)
  canvas.height = Math.round(vp.height)
  const ctx = canvas.getContext("2d")!
  await page.render(
    { canvas, canvasContext: ctx, viewport: vp } as Parameters<typeof page.render>[0]
  ).promise
  return canvas
}

// ============================================================
// Remoción de fondo — flood-fill BFS desde los bordes
// (portado del cotizador original)
// ============================================================
function removeBackground(canvas: HTMLCanvasElement) {
  const w = canvas.width
  const h = canvas.height
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  const imageData = ctx.getImageData(0, 0, w, h)
  const d = imageData.data

  let sumR = 0, sumG = 0, sumB = 0, count = 0
  const sampleEdge = (x: number, y: number) => {
    const i = (y * w + x) * 4
    if (d[i + 3] < 10) return
    sumR += d[i]; sumG += d[i + 1]; sumB += d[i + 2]; count++
  }
  for (let x = 0; x < w; x++) { sampleEdge(x, 0); sampleEdge(x, h - 1) }
  for (let y = 1; y < h - 1; y++) { sampleEdge(0, y); sampleEdge(w - 1, y) }
  if (count === 0) return

  const bgR = sumR / count, bgG = sumG / count, bgB = sumB / count
  const bgLum = 0.299 * bgR + 0.587 * bgG + 0.114 * bgB
  const TOLERANCE = bgLum > 200 ? 35 : 20
  const dist = (i: number) => {
    const dr = d[i] - bgR, dg = d[i + 1] - bgG, db = d[i + 2] - bgB
    return Math.sqrt(dr * dr + dg * dg + db * db)
  }

  const visited = new Uint8Array(w * h)
  const queue = new Int32Array(w * h * 2)
  let qHead = 0, qTail = 0
  const enqueue = (x: number, y: number) => {
    if (x < 0 || x >= w || y < 0 || y >= h) return
    const flat = y * w + x
    if (visited[flat]) return
    const i = flat * 4
    if (d[i + 3] < 10) { visited[flat] = 1; return }
    if (dist(i) <= TOLERANCE) {
      visited[flat] = 1
      queue[qTail++] = x
      queue[qTail++] = y
    }
  }
  for (let x = 0; x < w; x++) { enqueue(x, 0); enqueue(x, h - 1) }
  for (let y = 1; y < h - 1; y++) { enqueue(0, y); enqueue(w - 1, y) }

  while (qHead < qTail) {
    const x = queue[qHead++]
    const y = queue[qHead++]
    const i = (y * w + x) * 4
    const t = dist(i) / TOLERANCE
    d[i + 3] = Math.round(Math.max(0, (t - 0.4) / 0.6) * 255)
    enqueue(x + 1, y); enqueue(x - 1, y); enqueue(x, y + 1); enqueue(x, y - 1)
  }
  ctx.putImageData(imageData, 0, 0)
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
