# AgriMarket para Figma

Se entregan recursos SVG y un importador local opcional. **No existe todavía un archivo nativo guardado en una cuenta de Figma ni un enlace de presentación.** La integración Figma no estaba conectada durante este trabajo. No se ha ejecutado ni validado el importador dentro de Figma.

## Opción directa: SVG

1. Crea un archivo de Figma Design.
2. Arrastra `01-uikit.svg`, `02-wireframes.svg`, `03-user-flow.svg` y `04-journey.svg`.
3. Importa los SVG individuales de `pantallas/`. `05-pantallas.svg` es una vista general grande, no hace falta importar ambos.
4. Convierte cada pantalla en un frame de 1440 × 1000 o 390 × 844. Conserva el contenido más alto y configura desplazamiento vertical.
5. Revisa las fuentes. El HTML usa Avenir Next, Segoe UI o Arial según el dispositivo. Sustituye por Inter si la fuente falta, y aplica la misma sustitución en `css/tokens.css` para conservar coherencia.
6. Conecta los botones desde Prototype según `03-user-flow.svg`.

Los SVG tienen formas, texto y fotografías integradas; no son capturas planas. Su importación no equivale a Auto Layout ni garantiza que Figma conserve cada texto como texto editable: comprueba el resultado. Las capturas PNG en `../evidencias/` permiten comparar el resultado con el HTML.

## Opción asistida: importador de desarrollo

El importador crea 14 frames, láminas de diseño, estilos de color y texto, tres componentes nativos de botón y hotspots de navegación. No reemplaza ni elimina nodos existentes. Usa una página de Figma y no requiere acceso a la red. Su ejecución en Figma está pendiente de verificar.

1. Usa Figma Desktop y crea un **archivo vacío de Design**.
2. En **Plugins → Development → New plugin**, crea un plugin de tipo **Run once**. Figma generará un `manifest.json` con un ID propio.
3. Conserva ese ID. Copia `importador/code.js` a la carpeta del plugin, sustituyendo su archivo de ejemplo.
4. En el manifest generado, conserva su `id` y usa los otros campos de `importador/manifest.template.json`. El archivo `.template.json` no incluye un ID inventado y no debe importarse directamente como plugin terminado.
5. Ejecuta el plugin desde Development. Puede tardar unos segundos por las imágenes integradas.
6. Revisa los frames, las fuentes y la apariencia. Selecciona `AgriMarket / 01-catalogo` y usa Present. Para productor empieza en `05-login` y pulsa el acceso de demostración de productor.
7. Comprueba las conexiones, organiza componentes y comparte el enlace del archivo y de la presentación. Añade esos enlaces al informe y vuelve a exportar el PDF.

No ejecutes dos veces en el mismo archivo sin revisar: se agregaría otra copia. Los hotspots simulan navegación entre pantallas fijas; no escriben en inputs ni aplican filtros. Para probar formularios y datos usa el prototipo HTML. Solo la versión de escritorio incluye el recorrido completo; los tres frames móviles representan catálogo, detalle y registro.

## Correspondencia con el HTML

Las pantallas son exportaciones del DOM y los estilos reales mediante `scripts/export-screens.mjs`; `hotspots.json` contiene las posiciones de navegación. No se redibujó una interfaz distinta para Figma. `scripts/build-figma-plugin.mjs` empaqueta los recursos, y `scripts/design-assets.py` genera los cuatro diagramas y láminas.

## Fuentes técnicas del importador

- [Figma · Plugin Manifest](https://developers.figma.com/docs/plugins/manifest/)
- [Figma · Reactions / setReactionsAsync](https://developers.figma.com/docs/plugins/api/properties/nodes-reactions/)
- [Figma · Action](https://developers.figma.com/docs/plugins/api/Action/)

Las fotografías conservan los créditos y licencias indicados en `../../assets/CREDITOS.md`. El ZIP también incluye una copia `CREDITOS.md` en su carpeta principal.
