// Notifica a IndexNow (Bing, Yandex, etc.) todas las URLs del sitemap.
// Uso: node scripts/indexnow.mjs
// La key vive en public/<KEY>.txt (debe estar deployada).

const HOST = "cintapersonalizada.com.ar"
const KEY = "98be7b1d471c45e2b77dc6bf50b359f091f7f073"

const res = await fetch(`https://${HOST}/sitemap-0.xml`)
const xml = await res.text()
const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])

if (urlList.length === 0) {
  console.error("No se encontraron URLs en el sitemap.")
  process.exit(1)
}

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList,
}

const r = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
})

console.log(`IndexNow: HTTP ${r.status} — ${urlList.length} URLs enviadas`)
