import {catalog,bindCatalog} from './views/catalog.js';
import {shell,empty,bindShell} from './ui.js';
function render(){
  // Los anclajes internos no cambian la pantalla ni reinician los filtros.
  if(location.hash&&!location.hash.startsWith('#/'))return;
  const [route='catalogo',rawId]=location.hash.slice(2).split('/');let id='';try{id=decodeURIComponent(rawId||'');}catch{}
  const routes={catalogo:[catalog,bindCatalog,'Explorar productos']};
  const [view,bind,title]=routes[route]||[()=>shell(empty('Esta ruta no existe','Regresa al mercado para continuar.')),null,'Página no encontrada'];
  document.querySelector('#app').innerHTML=view();document.title=`${title} · AgriMarket`;bindShell();bind?.();window.scrollTo(0,0);document.querySelector('#main')?.focus({preventScroll:true});
}
window.addEventListener('hashchange',render);render();
