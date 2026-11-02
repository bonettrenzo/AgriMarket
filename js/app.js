import {catalog,bindCatalog} from './views/catalog.js';
import {auth,bindAuth} from './views/auth.js';
import {product,bindProduct,checkout,bindCheckout,confirmation,bindConfirmation} from './views/product.js';
import {dashboard,products,bindProducts,publication,bindPublication,orders} from './views/producer.js';
import {profile,bindProfile,help,design,bindDesign} from './views/misc.js';
import {shell,empty,bindShell} from './ui.js';
function render(){
  // Los anclajes internos no cambian la pantalla ni reinician los filtros.
  if(location.hash&&!location.hash.startsWith('#/'))return;
  const [route='catalogo',rawId]=location.hash.slice(2).split('/');let id='';try{id=decodeURIComponent(rawId||'');}catch{}
  const routes={catalogo:[catalog,bindCatalog,'Explorar productos'],login:[()=>auth(false),()=>bindAuth(false),'Iniciar sesión'],registro:[()=>auth(true),()=>bindAuth(true),'Crear una cuenta'],producto:[()=>product(id),()=>bindProduct(id),'Detalle del producto'],solicitud:[checkout,bindCheckout,'Revisar solicitud'],confirmacion:[()=>confirmation(id),bindConfirmation,'Contactar al productor'],panel:[dashboard,null,'Mi panel'],productos:[products,bindProducts,'Mis productos'],publicar:[()=>publication(),()=>bindPublication(),'Publicar cosecha'],editar:[()=>publication(id),()=>bindPublication(id),'Editar cosecha'],pedidos:[orders,null,'Mis solicitudes'],perfil:[profile,bindProfile,'Mi perfil'],ayuda:[help,null,'Cómo funciona'],diseno:[design,bindDesign,'Guía del proyecto']};
  const [view,bind,title]=routes[route]||[()=>shell(empty('Esta ruta no existe','Regresa al mercado para continuar.')),null,'Página no encontrada'];
  document.querySelector('#app').innerHTML=view();document.title=`${title} · AgriMarket`;bindShell();bind?.();window.scrollTo(0,0);document.querySelector('#main')?.focus({preventScroll:true});
}
window.addEventListener('hashchange',render);render();
