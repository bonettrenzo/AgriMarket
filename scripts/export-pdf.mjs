import {browser} from './browser.mjs';
import {writeFile} from 'node:fs/promises';
const b=await browser();await b.viewport(1100,1000);await b.navigate('docs/informe.html');
const missing=await b.evaluate(`[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)`);if(missing.length)throw Error('Recursos faltantes en el informe: '+missing.join(', '));
const {stream}=await b.send('Page.printToPDF',{printBackground:true,preferCSSPageSize:true,displayHeaderFooter:false,transferMode:'ReturnAsStream'});
const chunks=[];while(true){const part=await b.send('IO.read',{handle:stream,size:524288});chunks.push(Buffer.from(part.data,part.base64Encoded?'base64':'utf8'));if(part.eof)break;}await b.send('IO.close',{handle:stream});
await writeFile(new URL('../docs/AgriMarket-diseno.pdf',import.meta.url),Buffer.concat(chunks));console.log('PDF exportado con las capturas y recursos locales.');b.close();
