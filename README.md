# AgriMarket · Prototipo del MVP

Maquetación académica en HTML, CSS responsivo y JavaScript modular, basada en la Actividad 1 aportada. Sin framework, backend ni dependencias de ejecución. Proyecto local; no se ha publicado en hosting.

## Abrir

Desde esta carpeta:

```sh
npm start
```

También puedes usar `python3 -m http.server 5500 --bind 127.0.0.1`. Abre **http://localhost:5500**. Se necesita un servidor HTTP porque la aplicación usa módulos ES; no abrir el HTML con doble clic (`file://`).

En **Iniciar sesión** puedes activar un perfil ficticio de comprador o productor sin completar un formulario. Usa datos ficticios en el registro. Las contraseñas no se almacenan ni verifican. El estado de la demo se guarda en el navegador; **Guía del proyecto → Restablecer demo** lo elimina.

## Pantallas y recorridos

- Catálogo: búsqueda por nombre, categoría, municipio y ordenamiento.
- Detalle: origen, productor, unidad, stock y cantidad solicitada.
- Solicitud: revisión del subtotal y preparación de mensaje de WhatsApp.
- Login y registro separados por rol.
- Productor: panel, gestión de cosechas, publicación, edición y retiro con confirmación.
- Solicitudes, perfil, ayuda y guía de recursos del proyecto.

El enlace WhatsApp no contiene teléfonos reales: permite seleccionar un contacto de prueba. Los borradores no equivalen a pedidos enviados ni ventas. La fotografía seleccionada en publicación solo se previsualiza durante el formulario; las tarjetas usan imágenes ilustrativas locales.

## Estructura

```text
index.html             Documento base
css/
  tokens.css           Variables del UIKit
  base.css             Reglas generales y accesibilidad
  layout.css           Navegación y distribución responsiva
  components.css       Botones, tarjetas, filtros y formularios
  pages.css            Vistas específicas
js/
  app.js               Rutas de la demostración
  data.js, store.js    Datos y estado local
  ui.js, icons.js      Componentes y SVG propios
  views/               Catálogo, acceso, producto, productor y auxiliares
assets/                Fotografías locales, favicon y créditos
docs/
  informe.html         Informe imprimible y editable
  AgriMarket-diseno.pdf Documento de avance exportado
  figma/               UIKit, wireframes, flujos, pantallas e importador
  evidencias/          Capturas y registro de revisión técnica
scripts/               Verificación y generación de artefactos
```

## Entregables y estado

El informe incluye alcance, trazabilidad RF/HU, decisiones de Design Thinking, UIKit, wireframes, pantallas, User Flow, Journey Map, evidencias técnicas y protocolo de usabilidad.

**Figma:** hay SVG exportados del mismo HTML y un importador de desarrollo. El archivo nativo, ejecución del importador, revisión de las conexiones y enlace de presentación están pendientes. Consulta [las instrucciones](docs/figma/LEEME.md).

**Validación con usuarios:** los hallazgos anteriores se atribuyen a la página 16 de la Actividad 1. No se inventaron resultados de sesiones nuevas. Completa las pruebas con perfiles objetivo y actualiza el informe antes de la entrega final.

No se implementan pagos, GPS, subastas ni reseñas avanzadas. Seguridad del backend, persistencia de fotografías y medición real en 3G quedan para desarrollo posterior.

## Comprobar y regenerar

```sh
npm run check
python3 scripts/design-assets.py
```

La revisión visual usa un navegador Chromium local con CDP en el puerto 9223 y el servidor en 5500. `scripts/browser.mjs` es un cliente CDP sin dependencias. Con ambos abiertos:

```sh
node scripts/qa-browser.mjs
node scripts/export-screens.mjs
node scripts/build-figma-plugin.mjs
node scripts/export-pdf.mjs
```

`qa-browser.mjs` restablece los datos de demostración. El navegador de revisión usado fue Brave, con un perfil aislado en `/tmp/agrimarket-browser`, `--headless=new --remote-debugging-port=9223 --user-data-dir=/tmp/agrimarket-browser`. Ajusta la ruta de su ejecutable a tu equipo. Las pruebas técnicas no sustituyen las pruebas con usuarios.

Créditos y licencias de fotografías: [assets/CREDITOS.md](assets/CREDITOS.md).
