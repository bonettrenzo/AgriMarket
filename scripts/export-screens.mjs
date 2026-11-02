/* Exporta las pantallas reales a SVG con texto, figuras e imágenes locales.
   Es un intercambio vectorial, no un archivo nativo de Figma ni Auto Layout. */
import {browser} from './browser.mjs';
import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
const b=await browser(),root=new URL('../',import.meta.url).pathname;
await mkdir(root+'docs/evidencias',{recursive:true});await mkdir(root+'docs/figma/pantallas',{recursive:true});
const images={};for(const f of await readdir(root+'assets/images'))images['assets/images/'+f]='data:image/jpeg;base64,'+(await readFile(root+'assets/images/'+f)).toString('base64');
function vectorize(images){
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
 let uid=0;const defs=[];
 const rect=(r,fill,rx=0,stroke='none',sw=0)=>`<rect x="${r.x}" y="${r.y}" width="${r.width}" height="${r.height}" rx="${rx}" fill="${esc(fill)}" stroke="${esc(stroke)}" stroke-width="${sw}"/>`;
 const bounds=el=>{const r=el.getBoundingClientRect();return{x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height};};
 const transparent=c=>c==='rgba(0, 0, 0, 0)'||c==='transparent';
 function walk(el){
  const c=getComputedStyle(el),r=bounds(el);if(c.display==='none'||c.visibility==='hidden'||+c.opacity===0||r.width===0||r.height===0||r.x+r.width<=0||r.x>=innerWidth||['SCRIPT','STYLE','NOSCRIPT'].includes(el.tagName))return '';
  if(el.classList.contains('sr-only')||el.classList.contains('skip-link')||el.id==='toast')return '';
  const radius=parseFloat(c.borderTopLeftRadius)||0;let out='';
  if(!transparent(c.backgroundColor))out+=rect(r,c.backgroundColor,radius);
  if(parseFloat(c.borderTopWidth)&&c.borderTopStyle!=='none')out+=rect(r,'none',radius,c.borderTopColor,parseFloat(c.borderTopWidth));
  if(el.tagName==='svg'){let str=el.outerHTML.replace(/currentColor/g,c.color);str=str.replace('<svg ',`<svg x="${r.x}" y="${r.y}" width="${r.width}" height="${r.height}" `);return `<g>${out}${str}</g>`;}
  if(el.tagName==='IMG'){
   const src=images[el.getAttribute('src')];if(src){let href=src;const clip='img-'+(++uid);defs.push(`<clipPath id="${clip}">${rect(r,'white',radius)}</clipPath>`);out+=`<image x="${r.x}" y="${r.y}" width="${r.width}" height="${r.height}" href="${href}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${clip})"/>`;
   if(el.parentElement?.classList.contains('hero-visual')){const id='fade-'+(++uid);defs.push(`<linearGradient id="${id}"><stop stop-color="#eaf0dc"/><stop offset=".35" stop-color="#eaf0dc" stop-opacity="0"/></linearGradient>`);out+=rect(r,`url(#${id})`);}}
  }else if(el.matches('input,select,textarea')){
   const fs=parseFloat(c.fontSize);if(el.matches('[type=radio],[type=checkbox]')){out+=`<circle cx="${r.x+r.width/2}" cy="${r.y+r.height/2}" r="8" fill="white" stroke="#466941"/>`;if(el.checked)out+=`<circle cx="${r.x+r.width/2}" cy="${r.y+r.height/2}" r="4" fill="#466941"/>`;}
   else{const val=el.tagName==='SELECT'?el.selectedOptions[0]?.textContent:el.type==='password'?'':el.value||el.placeholder||'';out+=`<text x="${r.x+parseFloat(c.paddingLeft)}" y="${r.y+Math.min(r.height/2+fs*.35,32)}" font-family="${esc(c.fontFamily)}" font-size="${fs}" fill="${esc(c.color)}">${esc(val)}</text>`;}
  }else for(const child of el.childNodes){
   if(child.nodeType===1)out+=walk(child);
   else if(child.nodeType===3&&child.textContent.trim()){
    const groups=[];for(let i=0;i<child.textContent.length;i++){const range=document.createRange();range.setStart(child,i);range.setEnd(child,i+1);const t=range.getBoundingClientRect();if(!t.width||!t.height)continue;const y=t.y+scrollY,last=groups.at(-1);if(last&&Math.abs(last.top-y)<2)last.content+=child.textContent[i];else groups.push({x:t.x+scrollX,top:y,height:t.height,content:child.textContent[i]});}
    for(const g of groups)out+=`<text xml:space="preserve" x="${g.x}" y="${g.top+g.height*.79}" font-family="${esc(c.fontFamily)}" font-size="${c.fontSize}" font-weight="${c.fontWeight}" font-style="${c.fontStyle}" letter-spacing="${c.letterSpacing==='normal'?0:c.letterSpacing}" fill="${esc(c.color)}">${esc(g.content)}</text>`;
   }
  }
  const opacity=c.opacity!=='1'?` opacity="${c.opacity}"`:'';
  if(['hidden','auto','scroll'].includes(c.overflowX)&&el.tagName!=='BODY'){const id='clip-'+(++uid);defs.push(`<clipPath id="${id}">${rect(r,'white',radius)}</clipPath>`);out=`<g clip-path="url(#${id})">${out}</g>`;}
  return `<g${opacity}>${out}</g>`;
 }
 const content=walk(document.body),height=Math.max(document.documentElement.scrollHeight,innerHeight);
 return {width:innerWidth,height,content:`<defs>${defs.join('')}</defs>${content}`};
}
await b.viewport(1440,1000);await b.navigate('#/catalogo');await b.evaluate(`localStorage.clear();sessionStorage.clear();location.reload()`);await new Promise(r=>setTimeout(r,180));await b.settle();
const shots=[];const hotspots={};
async function capture(slug,route,width=1440){await b.viewport(width,width===390?844:1000);await b.route('#/'+route);await b.evaluate(`document.activeElement?.blur();document.querySelector('#toast').hidden=true`);await b.settle();await b.screenshot(root+`docs/evidencias/${slug}.png`);const v=await b.evaluate(`(${vectorize.toString()})(${JSON.stringify(images)})`);await writeFile(root+`docs/figma/pantallas/${slug}.svg`,`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${v.width}" height="${v.height}" viewBox="0 0 ${v.width} ${v.height}"><title>AgriMarket / ${slug}</title>${v.content}</svg>`);hotspots[slug]=await b.evaluate(`(()=>{const nodes=[...document.querySelectorAll('a[href^="#/"],button.btn')];return nodes.map(el=>{const r=el.getBoundingClientRect();return {text:el.textContent.trim(),href:el.getAttribute('href')||'',id:el.id,form:el.closest('form')?.id||'',demo:el.dataset.demo||'',x:r.x,y:r.y+scrollY,width:r.width,height:r.height};}).filter(r=>r.width>0&&r.x>=0&&r.x<innerWidth)})()`);shots.push({slug,...v});console.log('Exportado',slug,v.width,v.height);}
await capture('01-catalogo','catalogo');await capture('02-detalle','producto/mango');
await b.evaluate(`document.querySelector('#quantity').value=3;document.querySelector('#quantity-form').requestSubmit()`);await new Promise(r=>setTimeout(r,100));await capture('03-solicitud','solicitud');
await b.evaluate(`document.querySelector('#buyer-name').value='María Fernanda';document.querySelector('#note').value='Me gustaría recoger la cosecha el viernes.';document.querySelector('#request-form').requestSubmit()`);await new Promise(r=>setTimeout(r,100));const confirmation=await b.evaluate(`location.hash.slice(2)`);await capture('04-contacto',confirmation);
await capture('05-login','login');await capture('06-registro','registro');await b.route('#/login');await b.evaluate(`document.querySelector('[data-demo=producer]').click()`);await new Promise(r=>setTimeout(r,100));await capture('07-panel','panel');await capture('08-productos','productos');await capture('09-publicar','publicar');await capture('10-solicitudes','pedidos');await capture('11-perfil','perfil');await b.route('#/perfil');await b.evaluate(`document.querySelector('#logout').click()`);await new Promise(r=>setTimeout(r,100));await capture('12-catalogo-movil','catalogo',390);await capture('13-detalle-movil','producto/mango',390);await capture('14-registro-movil','registro',390);
await writeFile(root+'docs/figma/pantallas/hotspots.json',JSON.stringify(hotspots,null,2));
// Índice vectorial. Los archivos individuales son más cómodos al importar a Figma.
let totalH=120,out='<rect width="3300" height="20000" fill="#e9ecdf"/><text x="45" y="65" font-family="Arial" font-size="32" font-weight="700" fill="#263f2c">AgriMarket / Pantallas del prototipo / V1</text>';
for(let i=0;i<shots.length;i+=3){let rowH=0;for(let j=i;j<Math.min(i+3,shots.length);j++){const s=shots[j],x=40+(j-i)*1090,scale=s.width===390?1.25:.7;rowH=Math.max(rowH,s.height*scale+85);out+=`<text x="${x}" y="${totalH+20}" font-family="Arial" font-size="20" fill="#263f2c">${s.slug}</text><svg x="${x}" y="${totalH+42}" width="${s.width*scale}" height="${s.height*scale}" viewBox="0 0 ${s.width} ${s.height}">${s.content.replace(/id="([^"]+)"/g,`id="${j}-$1"`).replace(/url\(#([^\)]+)\)/g,`url(#${j}-$1)`)}</svg>`;}totalH+=rowH;}
await writeFile(root+'docs/figma/05-pantallas.svg',`<svg xmlns="http://www.w3.org/2000/svg" width="3300" height="${totalH}" viewBox="0 0 3300 ${totalH}">${out}</svg>`);
await b.viewport(1440,1000);await b.navigate('#/catalogo');await b.evaluate(`localStorage.clear();sessionStorage.clear();location.reload()`);b.close();
