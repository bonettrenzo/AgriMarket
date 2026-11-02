import {catalog,bindCatalog} from './views/catalog.js';
import {auth,bindAuth} from './views/auth.js';
import {profile,bindProfile,help,design,bindDesign} from './views/misc.js';
import {shell,empty,bindShell} from './ui.js';
function render(){
  // Los anclajes internos no cambian la pantalla ni reinician los filtros.
  if(location.hash&&!location.hash.startsWith('#/'))return;
  const [route='catalogo',rawId]=location.hash.slice(2).split('/');let id='';try{id=decodeURIComponent(rawId||'');}catch{}
  const routes={catalogo:[catalog,bindCatalog,'Explorar productos'],login:[()=>auth(false),()=>bindAuth(false),'Iniciar sesión'],registro:[()=>auth(true),()=>bindAuth(true),'Crear una cuenta'],perfil:[profile,bindProfile,'Mi perfil'],ayuda:[help,null,'Cómo funciona'],diseno:[design,bindDesign,'Guía del proyecto']};
  const [view,bind,title]=routes[route]||[()=>shell(empty('Esta ruta no existe','Regresa al mercado para continuar.')),null,'Página no encontrada'];
  document.querySelector('#app').innerHTML=view();document.title=`${title} · AgriMarket`;bindShell();bind?.();window.scrollTo(0,0);document.querySelector('#main')?.focus({preventScroll:true});
}
window.addEventListener('hashchange',render);render();
