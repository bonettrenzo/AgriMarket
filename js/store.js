import {initialProducts} from './data.js';
const KEY='agrimarket-prototype-v1';
const defaults=()=>({products:structuredClone(initialProducts),orders:[],user:null});
let state=defaults();
try{const saved=JSON.parse(localStorage.getItem(KEY));if(saved && Array.isArray(saved.products) && Array.isArray(saved.orders))state={...state,...saved};}catch{/* La navegación también funciona sin almacenamiento. */}
export const store={get:()=>state,save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{ /* No se almacenan contraseñas ni fotos privadas. */ }},reset(){state=defaults();this.save();}};
export const money=value=>new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(value);
export const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function demoUser(role='buyer'){return role==='producer'?{name:'José Manuel Pérez',initials:'JP',role:'producer',email:'jose@ejemplo.com',municipality:'Ciénaga'}:{name:'María Fernanda',initials:'MF',role:'buyer',email:'maria@ejemplo.com',municipality:'Santa Marta'};}
