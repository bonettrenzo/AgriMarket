"""Genera artefactos vectoriales propios, sin dependencias externas."""
from pathlib import Path
from html import escape
import textwrap
OUT=Path(__file__).resolve().parents[1]/'docs'/'figma'; OUT.mkdir(parents=True,exist_ok=True)
G='#263f2c'; M='#667064'; L='#e5edb5'; C='#f7f8f3'; LINE='#e3e7dc'; INK='#28352b'
def rect(x,y,w,h,fill='white',r=12,stroke=LINE):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}"/>'
def text(x,y,s,size=18,color=INK,weight=400):return f'<text x="{x}" y="{y}" fill="{color}" font-family="Arial, sans-serif" font-size="{size}" font-weight="{weight}">{escape(s)}</text>'
def lines(x,y,s,width=35,size=17,color=M,step=26):return ''.join(text(x,y+i*step,t,size,color) for i,t in enumerate(textwrap.wrap(s,width)))
def heading(n,title,sub,w=1440):return rect(0,0,w,140,G,0,G)+text(48,43,'AGRIMARKET / DISEÑO DE EXPERIENCIA / '+n,13,L,700)+text(48,87,title,34,'white',700)+text(48,118,sub,15,'#d1dec7')
def save(name,w,h,body):
 (OUT/name).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><title>AgriMarket · {escape(name)}</title>{rect(0,0,w,h,C,0,C)}{body}</svg>')
def label(x,y,s):return text(x,y,s,13,M,700)
def button(x,y,s,fill=G,color='white',w=190):return rect(x,y,w,48,fill,8,fill)+text(x+18,y+30,s,15,color,600)
b=heading('01','Guía visual / UIKit','Tokens compartidos con css/tokens.css · V1 · 2 de noviembre de 2026')
b+=label(48,190,'01 / COLOR')
for i,(color,name,hexv) in enumerate([(G,'Verde campo',G),(L,'Brote',L),('#bc4c27','Terracota','#bc4c27'),(C,'Lino',C),(INK,'Tinta',INK),(M,'Secundario',M)]):
 x=48+i*224;b+=rect(x,214,204,100,color,12,color)+text(x,344,name,17,INK,700)+text(x,370,hexv,14,M)
b+=label(48,425,'02 / TIPOGRAFÍA')+text(48,480,'Lo mejor del campo, cerca de ti.',36,G,700)+text(48,524,'Una cosecha, muchas conexiones.',24,INK,700)+text(48,560,'Avenir Next → Segoe UI → Arial. Fuente del sistema, sin descarga externa.',17,M)+text(48,594,'Título 32 px / Sección 22 px / Cuerpo 15 px / Etiqueta 12 px. Interlineado de cuerpo 1.55.',15,M)
b+=label(48,654,'03 / ACCIONES Y ESTADOS')+button(48,678,'Solicitar al productor')+button(260,678,'Ver producto','white',G)+button(472,678,'Quiero ser productor',L,G)+button(684,678,'Retirar publicación','white','#ad3434',205)+rect(918,678,240,48,'#edf2e6',8)+text(936,708,'Producto disponible',15,G,600)
b+=label(48,788,'04 / CAMPOS Y COMPONENTES')+text(48,824,'Nombre del producto',15,INK,600)+rect(48,840,350,50,'white',8,'#bdc8b9')+text(63,871,'Mango Tommy',15,M)+text(438,824,'Categorías de selección amplia',15,INK,600)+rect(438,840,160,58,'#edf2e6',9,'#466941')+text(480,875,'Frutas',15,G,600)+rect(614,840,160,58,'white',9)+text(650,875,'Tubérculos',15,G,600)+rect(830,814,530,108,'white',12)+text(850,844,'Mango Tommy',20,INK,700)+text(850,872,'Ciénaga, Magdalena · José Manuel Pérez',14,M)+text(850,902,'$ 2.500 / Kg · 100 Kg disponibles',17,G,700)
b+=label(48,978,'05 / REGLAS DE COMPOSICIÓN Y ACCESIBILIDAD')+lines(48,1014,'Base de espaciado: 4 px. Espacios principales: 8, 12, 16, 20, 24, 32 y 40 px. Bordes: 8 a 16 px. Controles principales: 44 a 48 px de alto. Foco visible, etiquetas persistentes y mensajes sin depender solo del color.',135,17)+lines(48,1110,'Escritorio: barra lateral + tres columnas. Tablet: navegación plegable. Móvil: dos columnas; formularios de una columna. Probar con teclado, zoom de 200 % y dispositivos reales antes de declarar conformidad.',135,17)
save('01-uikit.svg',1440,1210,b)
# Wireframes: 8 estructuras.
b=heading('02','Wireframes / Estructura antes del detalle','Baja fidelidad · Pantallas principales del MVP · No son resultados de pruebas',1600)
frames=[('01 / Acceso','login'),('02 / Registro','registro'),('03 / Catálogo','catalogo'),('04 / Detalle','detalle'),('05 / Solicitud','solicitud'),('06 / Panel productor','panel'),('07 / Publicar cosecha','publicar'),('08 / Gestionar productos','gestionar')]
for i,(name,kind) in enumerate(frames):
 x=40+(i%4)*390;y=185+(i//4)*510
 b+=text(x,y,name,17,INK,700)+rect(x,y+22,360,440,'white',10,'#b6c0b0')+rect(x,y+22,360,42,'#e8eae3',10)+text(x+16,y+49,'AgriMarket / '+kind,12,M)
 if kind in ['login','registro']:
  b+=rect(x+20,y+86,100,330,'#eef0e8',5)+lines(x+30,y+118,'Propuesta de valor e identidad',10,12,M,19)
  b+=text(x+140,y+110,'Bienvenido / Crear cuenta',13,INK,700)
  for j,t in enumerate((['Nombre completo'] if kind=='registro' else [])+['Correo electrónico','Contraseña','Rol de usuario']):b+=text(x+140,y+142+j*53,t,11,M)+rect(x+140,y+151+j*53,195,31,'#f4f4ef',4)
  b+=rect(x+140,y+371,195,36,'#bfc6b4',5)+text(x+165,y+394,'Continuar',12,INK)
 elif kind=='catalogo':
  b+=rect(x+15,y+82,330,100,'#edf0e5',5)+text(x+30,y+115,'Propuesta de valor',16,INK,700)+text(x+30,y+148,'Explorar la cosecha →',12,M)+rect(x+15,y+199,330,33,'#f0f1eb',4)+text(x+28,y+220,'Buscar / Municipio',11,M)
  for j in range(4):b+=rect(x+15+j*84,y+245,78,33,'#e8ebe1',4)
  for j in range(3):
   b+=rect(x+15+j*112,y+294,104,145,'white',5)+rect(x+15+j*112,y+294,104,65,'#e5e8dd',5)+text(x+22+j*112,y+380,'Producto',12,INK,700)+text(x+22+j*112,y+401,'Municipio',10,M)+text(x+22+j*112,y+424,'Precio / unidad',10,M)
 elif kind=='detalle':
  b+=rect(x+16,y+90,155,180,'#e4e8dc',5)+text(x+35,y+180,'Foto del producto',12,M)+text(x+188,y+112,'Nombre de cosecha',14,INK,700)+text(x+188,y+141,'Municipio / vereda',11,M)+text(x+188,y+180,'Precio / unidad',14,INK,700)+text(x+188,y+211,'Productor y origen',11,M)+rect(x+188,y+237,155,43,'#eef0e8',5)+text(x+202,y+264,'Cantidad [ − 1 + ]',11,M)+rect(x+188,y+299,155,39,'#bfc6b4',5)+text(x+204,y+323,'Solicitar al productor',11,INK)+lines(x+20,y+316,'Descripción, disponibilidad y condiciones de la compra directa.',22,12,M,23)
 elif kind=='solicitud':
  b+=text(x+20,y+100,'1. Producto → 2. Revisión → 3. Contacto',11,M)+rect(x+20,y+124,320,77,'#edf0e5',5)+text(x+35,y+155,'Producto / productor / cantidad',12,INK)+text(x+35,y+184,'Subtotal de productos',12,INK)
  for j,t in enumerate(['Nombre del comprador','Mensaje opcional']):b+=text(x+20,y+234+j*67,t,12,M)+rect(x+20,y+245+j*67,320,42,'#f1f2eb',5)
  b+=rect(x+20,y+381,320,43,'#bfc6b4',5)+text(x+87,y+408,'Preparar mensaje',12,INK)
 elif kind=='panel':
  b+=text(x+20,y+100,'Hola, productor',20,INK,700)
  for j,t in enumerate(['Productos','Solicitudes','Valor solicitado']):b+=rect(x+20+j*109,y+125,101,77,'#eef0e8',5)+text(x+28+j*109,y+154,t,10,M)+text(x+28+j*109,y+183,'00',21,INK,700)
  b+=text(x+20,y+236,'Tus cosechas en el mercado',14,INK,700)
  for j in range(2):b+=rect(x+20+j*164,y+257,154,169,'#f0f2e9',5)+text(x+36+j*164,y+353,'Cosecha publicada',12,M)
 elif kind=='publicar':
  for j,t in enumerate(['Nombre del producto','Categorías con iconos grandes','Fotografía de la cosecha','Precio / Unidad / Cantidad','Municipio / Vereda']):b+=text(x+20,y+96+j*57,t,12,M)+rect(x+20,y+107+j*57,320,31,'#f0f2e9',5)
  b+=rect(x+20,y+391,320,42,'#bfc6b4',5)+text(x+117,y+417,'Publicar cosecha',12,INK)
 else:
  b+=text(x+20,y+100,'Mis productos',20,INK,700)+rect(x+20,y+123,320,32,'#e5e8dc',4)+text(x+28,y+144,'Producto / Precio / Cantidad / Acciones',11,M)
  for j in range(4):b+=rect(x+20,y+171+j*58,320,48,'#f5f6f1',4)+text(x+30,y+200+j*58,'Cosecha     $ / Kg     100     Editar / Retirar',10,M)
save('02-wireframes.svg',1600,1230,b)
# Flow
b=heading('03','User Flow / Del descubrimiento al contacto','Dos roles, un objetivo: facilitar el comercio directo · Flujo del prototipo HTML',1500)
def node(x,y,title,desc,w=244):return rect(x,y,w,105,'white',12)+text(x+18,y+33,title,17,G,700)+lines(x+18,y+61,desc,29,13,M,20)
def arrow(x1,y1,x2,y2,label=''):
 s=f'<path d="M{x1} {y1} L{x2} {y2}" stroke="#718665" stroke-width="2" fill="none" marker-end="url(#a)"/>'
 return s+(text((x1+x2)/2-10,(y1+y2)/2-10,label,12,M) if label else '')
b+='<defs><marker id="a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="m0 0 8 4-8 4" fill="#718665"/></marker></defs>'
b+=text(48,195,'COMPRADOR / MARÍA',16,G,700)
for x,title,desc in [(48,'Catálogo público','Buscar por nombre, categoría y municipio.'),(340,'Detalle de cosecha','Ver origen, precio, unidad y disponibilidad.'),(632,'Revisar solicitud','Cantidad válida, nombre y mensaje opcional.'),(924,'Mensaje preparado','Revisar resumen y abrir WhatsApp.')]:b+=node(x,222,title,desc)
for x in [292,584,876]:b+=arrow(x,274,x+48,274)
b+=node(1210,222,'Acuerdo directo','Elegir contacto de prueba; entrega y pago a convenir.',242)+arrow(1168,274,1210,274)
b+=rect(48,368,1404,92,'#edf2e6',12)+text(70,400,'Rutas de recuperación',17,G,700)+text(70,429,'Sin resultados → Limpiar filtros. Cantidad inválida → Corregir. Producto retirado → Volver al catálogo. Solicitud → Cambiar cantidad.',15,M)
b+=text(48,526,'PRODUCTOR / DON JOSÉ',16,G,700)
for x,title,desc in [(48,'Registro / Acceso','Seleccionar perfil de productor y entrar a la demo.'),(340,'Panel principal','Ver cosechas y resumen de solicitudes.'),(632,'Publicar cosecha','Foto, categoría, precio, unidad, stock y ubicación.'),(924,'Mis productos','Publicación visible. Editar precio y disponibilidad.'),(1210,'Retirar cosecha','Confirmar la eliminación y volver al listado.')]:b+=node(x,553,title,desc,242)
for x in [290,582,874,1166]:b+=arrow(x,605,x+50,605)
b+=arrow(1045,658,1045,748)+node(924,750,'Actualizar publicación','Guardar cambios y volver al listado.')
b+=rect(48,745,800,116,'#fbede5',12)+text(70,780,'Límite del prototipo',18,'#98401e',700)+lines(70,810,'Autenticación y operaciones simuladas en el navegador. No hay pagos en línea, logística, envío automático de mensajes ni confirmación de ventas.',90,15,M,24)
b+=text(48,930,'Figma: importar los SVG y conectar frames según este flujo. El archivo nativo y sus conexiones aún deben crearse.',16,M)
save('03-user-flow.svg',1500,980,b)
# Journey
b=heading('04','Customer Journey Map / María Fernanda','Compradora de restaurante · Santa Marta · Adaptación del viaje documentado en la Actividad 1',1640)
phases=[('01 / Necesidad','Busca insumos frescos para su restaurante.','Plaza o supermercado','Frustración','Precios altos y calidad irregular.','Mostrar un mercado local consolidado.'),('02 / Descubrimiento','Entra desde el navegador de su celular.','Catálogo móvil','Curiosidad','Quiere encontrar productos sin aprender otra app.','Buscar por palabra, categoría y municipio.'),('03 / Selección','Compara ofertas y elige una cosecha cercana.','Tarjeta y detalle','Satisfacción','Necesita conocer origen, unidad y disponibilidad.','Municipio visible y precio por unidad explícito.'),('04 / Solicitud','Indica cantidad y revisa el subtotal.','Resumen de solicitud','Confianza','Teme formularios extensos y cobros inesperados.','Tres etapas, nombre y mensaje opcional.'),('05 / Contacto','Revisa el mensaje y acuerda la compra.','WhatsApp / conversación','Entusiasmo','Necesita confirmar disponibilidad y entrega.','Mensaje preparado y condiciones a convenir.')]
rows=[('ACCIÓN',252,1),('PUNTO DE CONTACTO',380,2),('EMOCIÓN ESPERADA',478,3),('FRICCIÓN / NECESIDAD',578,4),('RESPUESTA DEL DISEÑO',726,5)]
for i,p in enumerate(phases):
 x=40+i*320;b+=rect(x,185,300,710,'white',12)+rect(x,185,300,52,L,12,L)+text(x+18,218,p[0],17,G,700)
 for lab,y,j in rows:b+=text(x+18,y+16,lab,10,M,700)+lines(x+18,y+48,p[j],29,15,INK,23)
b+=text(40,947,'Las emociones son hipótesis del diseño basadas en la Actividad 1; deben contrastarse en las nuevas pruebas de usabilidad.',16,M)
save('04-journey.svg',1640,1000,b)
print('Generados UIKit, wireframes, User Flow y Journey Map.')
