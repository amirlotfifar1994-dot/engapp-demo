import fs from 'node:fs/promises';import path from 'node:path';import {execFileSync} from 'node:child_process';import {pathToFileURL} from 'node:url';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE?pathToFileURL(path.resolve(process.env.PLAYWRIGHT_MODULE)).href:'playwright');
const base=process.env.DEMO_BASE_URL||'http://127.0.0.1:51603/engapp-demo/',baseline=process.env.MARKER_BASELINE||'e0795f01eb68f8675e73a7258a92720db849ed66';
const root=path.resolve(import.meta.dirname,'..'),before=execFileSync('git',['show',baseline+':core/panorama-lab.js'],{cwd:root,encoding:'utf8'}),after=await fs.readFile(path.join(root,'core/panorama-lab.js'),'utf8');
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_EXECUTABLE||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined)}),records=[],errors=[];
const flat=process.env.MARKER_FLAT==='1';
const matrix=[['park',null,10003],['home',null,10004],...['entrance','painting','history','science'].map(node=>['museum',node,10010])];
function instrument(source){let s=source;if(!s.includes('await root.SceneSpeakDemoSceneLoader.ready'))s=s.replace("(function(root){\n 'use strict';","(async function(root){\n 'use strict';\n if(root.SceneSpeakDemoSceneLoader&&!(await root.SceneSpeakDemoSceneLoader.ready).ok)return;");s=s.replace(' function dotXY(h){',' function dotXY(h){window.__markerProjects++;');const start=s.indexOf(' function paintDots(){'),end=s.indexOf(' function schedule()',start),body=s.slice(start,end),close=body.lastIndexOf(' }');if(start<0||end<0||close<0)throw Error('Marker review instrumentation boundary changed');s=s.slice(0,start)+body.slice(0,close)+"  window.__markerTimes.push(performance.now()-__markerStart);\n"+body.slice(close)+s.slice(end);return s.replace(' function paintDots(){',' function paintDots(){const __markerStart=performance.now();');}
try{
 for(const [scene,node,id]of matrix.filter(([scene,node])=>!flat||scene!=='museum'||node==='entrance')){
  const pair=[];
  for(const [name,source]of [['before',before],['after',after]]){
   console.log(name+' '+scene+(node?'/'+node:''));
   const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block',reducedMotion:'reduce'}),page=await context.newPage();page.setDefaultTimeout(90000);page.on('pageerror',e=>errors.push(name+' '+scene+': '+e.message));
   if(flat)await context.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(kind,...args){return /webgl/i.test(kind)?null:get.call(this,kind,...args);};});
   await context.addInitScript(()=>{window.__markerTimes=[];window.__markerProjects=0;window.__markerSelectors=0;const query=Element.prototype.querySelector;Element.prototype.querySelector=function(...args){if(this.id==='pano-dots')window.__markerSelectors++;return query.apply(this,args);};});
   await page.route('**/core/panorama-lab.js*',route=>route.fulfill({contentType:'application/javascript',body:instrument(source)}));
   const native='panorama.html?scene='+scene+(node?'&node='+node:'')+'&embedded=1&coreLesson='+id;
   await page.route('**/marker-review-host.html',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><style>html,body{margin:0;height:100%;overflow:hidden}iframe{border:0;width:100%;height:100%}</style><iframe title="Native marker review" src="'+native+'"></iframe>'}));
   await page.goto(base+'marker-review-host.html',{waitUntil:'domcontentloaded'});await page.frameLocator('iframe').locator('#pano-view').waitFor();await page.frameLocator('iframe').locator('#pano-loading').waitFor({state:'hidden'});const frame=page.frames().find(f=>f.url().includes('panorama.html'));
   const samples=await frame.evaluate(({scene,node})=>{const d=scene==='park'?SceneSpeakPanoramaPark:scene==='home'?SceneSpeakPanoramaHome:SceneSpeakPanoramaMuseum.nodes[node],hs=d.hotspots,ids=[];for(const h of hs.filter(h=>!h.parentId)){ids.push(h.id);let leaf=h;while(hs.some(x=>x.parentId===leaf.id))leaf=hs.find(x=>x.parentId===leaf.id);ids.push(leaf.id);}const dense=hs.slice().sort((a,b)=>hs.filter(h=>h.parentId===b.id).length-hs.filter(h=>h.parentId===a.id).length)[0];ids.push(dense.id,...hs.filter(h=>h.parentId===dense.id).slice(-2).map(h=>h.id));return [...new Set(ids)];},{scene,node});
   const snapshots=[];
   const state=async(selectedId,extra={})=>{await page.evaluate(({id,selectedId,extra})=>document.querySelector('iframe').contentWindow.postMessage({channel:'scenespeak-panorama-core-v1',type:'state',lessonId:id,mode:'explore',level:'A2',selectedId,...extra},location.origin),{id,selectedId,extra});await frame.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));snapshots.push(await frame.evaluate(()=>[...document.querySelectorAll('#pano-dots > button:not([hidden])')].map(b=>({id:b.dataset.panoHotspot,x:Math.round(parseFloat(b.style.left)*1000)/1000,y:Math.round(parseFloat(b.style.top)*1000)/1000,label:b.getAttribute('aria-label'),expanded:b.getAttribute('aria-expanded'),cluster:b.classList.contains('is-cluster'),active:b.classList.contains('is-active'),count:b.querySelector('.pano-dot-count')?.textContent||''}))));};
   await state(null);for(const sample of samples)await state(sample);await state(null,{mode:'practice',practice:true});await state(null,{mode:'practice',practice:true,hintId:samples.at(-1)});await state(null);
   const cdp=await context.newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await frame.evaluate(()=>{window.__markerTimes=[];window.__markerProjects=0;window.__markerSelectors=0;});
   await frame.locator('#pano-view').focus();for(let i=0;i<12;i++){await frame.locator('#pano-view').press(i<6?'ArrowRight':'ArrowLeft');await frame.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));}
   const metrics=await frame.evaluate(()=>{const t=window.__markerTimes.slice().sort((a,b)=>a-b);return {frames:t.length,paintP95Ms:t[Math.floor(t.length*.95)]||0,paintMeanMs:t.reduce((s,v)=>s+v,0)/Math.max(1,t.length),projections:window.__markerProjects,markerQueries:window.__markerSelectors};});
   pair.push({name,samples:samples.length,snapshots,metrics});await context.close();
  }
  if(JSON.stringify(pair[0].snapshots)!==JSON.stringify(pair[1].snapshots))throw Error('Visible marker parity failed: '+scene+'/'+node);
  if(pair[1].metrics.markerQueries!==0)throw Error('Marker selector loop remains');
  records.push({scene,node,paritySnapshots:pair[0].snapshots.length,samples:pair[0].samples,before:pair[0].metrics,after:pair[1].metrics});
 }
 if(errors.length)throw Error(errors.join('\n'));
}catch(e){errors.push(String(e));throw e;}finally{await fs.mkdir('review-output/panorama-markers',{recursive:true});await fs.writeFile('review-output/panorama-markers/'+(flat?'flat-results.json':'results.json'),JSON.stringify({baseline,flat,viewport:{width:390,height:844},records,errors},null,2));await browser.close();}
console.log(JSON.stringify({records,errors}));
