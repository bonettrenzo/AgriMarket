import {readdir,readFile,stat} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
const walk=async dir=>(await Promise.all((await readdir(dir,{withFileTypes:true})).map(async x=>x.isDirectory()?walk(path.join(dir,x.name)):path.join(dir,x.name)))).flat();
const js=(await walk('js')).filter(f=>f.endsWith('.js'));
for(const file of js){execFileSync(process.execPath,['--check',file]);const source=await readFile(file,'utf8');for(const m of source.matchAll(/from\s+['"](\.[^'"]+)['"]/g))await stat(path.resolve(path.dirname(file),m[1]));}
const html=await readFile('index.html','utf8');for(const m of html.matchAll(/(?:src|href)="((?:assets|css|js)\/[^"#]+)"/g))await stat(m[1]);
for(const p of ['mango','platano','yuca','tomate','aguacate','maiz','mercado'])if((await stat(`assets/images/${p}.jpg`)).size<1000)throw Error(`Imagen inválida: ${p}`);
console.log(`OK: ${js.length} módulos JavaScript, imports, recursos HTML y 7 fotografías locales.`);
