/* Cliente CDP pequeño para QA local; usa Brave ya instalado, sin dependencias. */
import {writeFile} from 'node:fs/promises';
export async function browser(){
 const targets=await fetch('http://127.0.0.1:9223/json').then(r=>r.json());
 const target=targets.find(t=>t.type==='page'); if(!target)throw Error('Inicia Brave con el puerto CDP 9223.');
 const ws=new WebSocket(target.webSocketDebuggerUrl),pending=new Map();let next=0;
 await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
 ws.onmessage=({data})=>{const msg=JSON.parse(data);if(msg.id){const p=pending.get(msg.id);pending.delete(msg.id);msg.error?p.reject(Error(msg.error.message)):p.resolve(msg.result);}};
 const keepAlive=setInterval(()=>{},1000);
 ws.onclose=()=>{for(const p of pending.values())p.reject(Error('Conexión CDP cerrada'));pending.clear();clearInterval(keepAlive);};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++next;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
 const evaluate=async expression=>{const res=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(res.exceptionDetails)throw Error(JSON.stringify(res.exceptionDetails));return res.result.value;};
 const settle=()=>evaluate(`new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.complete?Promise.resolve():new Promise(r=>{i.onload=r;i.onerror=r})));resolve(true)})))`);
 await send('Page.enable');await send('Runtime.enable');
 return {send,evaluate,settle,async navigate(path){await send('Page.navigate',{url:'http://127.0.0.1:5500/'+path});for(let i=0;i<100;i++){await new Promise(r=>setTimeout(r,60));try{if(await evaluate(`document.readyState==='complete' && !!document.querySelector('h1')`))break;}catch{}}await settle();},async route(hash){await evaluate(`location.hash=${JSON.stringify(hash)}`);await new Promise(r=>setTimeout(r,80));await settle();},async viewport(width,height=1000){await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});},async screenshot(file,full=true){const metrics=await send('Page.getLayoutMetrics');const options={format:'png',captureBeyondViewport:full};if(full)options.clip={x:0,y:0,width:metrics.cssContentSize.width,height:metrics.cssContentSize.height,scale:1};const {data}=await send('Page.captureScreenshot',options);await writeFile(file,Buffer.from(data,'base64'));},close(){clearInterval(keepAlive);ws.close();}};
}
