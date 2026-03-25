# Conversion Tracking Setup

El sitio manda un POST a un Google Apps Script cada vez que hay una conversión.
La data se guarda en una Google Sheet tuya. El cliente no tiene acceso.

## Eventos trackeados

| Evento | Cuándo se dispara | Datos |
|---|---|---|
| `form_submit` | Envío exitoso del formulario de cotización | nombre, empresa, tipo_producto, cantidad |
| `whatsapp_click` | Click en cualquier botón/link de WhatsApp | página donde hizo click |

## Setup paso a paso

### 1. Crear la Google Sheet

1. Ir a [sheets.google.com](https://sheets.google.com) y crear una nueva hoja
2. Renombrar la hoja a `Conversiones`
3. En la fila 1, poner estos headers:

```
A1: timestamp
B1: event
C1: page
D1: nombre
E1: empresa
F1: tipo_producto
G1: cantidad
```

### 2. Crear el Apps Script

1. En la Sheet, ir a **Extensiones → Apps Script**
2. Borrar todo el contenido y pegar esto:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Conversiones");
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.event || "",
    data.page || "",
    (data.data && data.data.nombre) || "",
    (data.data && data.data.empresa) || "",
    (data.data && data.data.tipo_producto) || "",
    (data.data && data.data.cantidad) || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Guardar (Ctrl+S)

### 3. Deployar como Web App

1. Click en **Implementar → Nueva implementación**
2. Tipo: **Aplicación web**
3. Ejecutar como: **Yo** (tu cuenta)
4. Quién tiene acceso: **Cualquiera**
5. Click en **Implementar**
6. Copiar la URL que te da (algo como `https://script.google.com/macros/s/AKfyc.../exec`)

### 4. Configurar la variable de entorno

Pegar la URL en la variable `TRACKING_WEBHOOK_URL` en Vercel:

```
TRACKING_WEBHOOK_URL=https://script.google.com/macros/s/AKfyc.../exec
```

### 5. Testear

Desde la terminal:

```bash
curl -X POST "TU_URL_DEL_SCRIPT" \
  -H "Content-Type: application/json" \
  -d '{"event":"test","page":"/test","timestamp":"2025-01-01T00:00:00Z","data":{"nombre":"Test"}}'
```

Si aparece una fila nueva en la Sheet, está funcionando.

## Notas

- El tracking es fire-and-forget — si el webhook falla, no bloquea la experiencia del usuario
- Sin `TRACKING_WEBHOOK_URL` configurada, los eventos se loguean en la consola del server (no se pierde data, se puede ver en los logs de Vercel)
- La Sheet es privada en tu Drive — el cliente no la ve
- Para ver conversiones del mes: filtrá por la columna A (timestamp)
