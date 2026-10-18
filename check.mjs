import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const data=JSON.parse(await readFile(path.join(root,'portfolio.json'),'utf8'));
let count=0;
for(const file of ['index.html',...data.sections.map(s=>s.id+'/index.html')]){
 const html=await readFile(path.join(root,file),'utf8');
 for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(https?:|mailto:|#)/.test(url))continue;
  const clean=url.split('#')[0].split('?')[0];
  const target=path.resolve(root,path.dirname(file),clean);
  if(!target.startsWith(root))throw new Error(`Unexpected path outside site: ${url}`);
  const info=await stat(target).catch(()=>null);
  if(!info)throw new Error(`Missing link in ${file}: ${url}`);
  if(info.isDirectory())await stat(path.join(target,'index.html'));
  count++;
 }
 if(!html.includes('<main id="main"'))throw new Error(`Missing skip-link target: ${file}`);
 if(/HEY, I|CURRENT ORBIT|Bruhhhhh/.test(html))throw new Error(`Old copy in ${file}`);
}
for(const section of data.sections){
 for(const item of section.cases){
  for(const field of ['title','problem','contribution','result'])if(!item[field])throw new Error(`Missing ${field}`);
  for(const [,url] of item.links)if(!url.startsWith('https://'))throw new Error(`Unexpected external URL: ${url}`);
 }
 if(section.image)await stat(path.join(root,'assets',section.image));
}
console.log(`Verified ${data.sections.length+1} static pages, ${count} local links, and all case-study fields.`);
