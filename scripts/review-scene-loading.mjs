import fs from 'node:fs/promises';import path from 'node:path';import crypto from 'node:crypto';import {pathToFileURL} from 'node:url';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE?pathToFileURL(path.resolve(process.env.PLAYWRIGHT_MODULE)).href:'playwright');
const base=process.env.DEMO_BASE_URL||'http://127.0.0.1:51603/engapp-demo/',phase=process.env.SCENE_LOADING_PHASE||'after',rows=[],errors=[];
const names=['panorama-museum-data.js','panorama-home-manifest.js','panorama-home-granular.js','panorama-home-data.js','panorama-park-data.js'];
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_EXECUTABLE||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined)});
try{for(const scene of ['park','home','museum']){
 const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block',reducedMotion:'reduce'}),page=await context.newPage(),cdp=await context.newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});page.on('pageerror',e=>errors.push(scene+': '+e.message));
 // Isolate native data startup from image decoding; UI setup and shader compilation remain included. Image acceptance is separate.
 await page.route('**/*',route=>route.request().resourceType()==='image'?route.abort():route.continue());
 const start=Date.now();await page.goto(base+'panorama.html?scene='+scene,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.SceneSpeakTalkCamera&&document.querySelector('#pano-dots')?.children.length,null,{timeout:90000});const dataReadyMs=Date.now()-start;
 const data=await page.evaluate(scene=>{const d=scene==='park'?window.SceneSpeakPanoramaPark:scene==='home'?window.SceneSpeakPanoramaHome:window.SceneSpeakPanoramaMuseum;return {json:JSON.stringify(d),globals:{park:Boolean(window.SceneSpeakPanoramaPark),home:Boolean(window.SceneSpeakPanoramaHome),museum:Boolean(window.SceneSpeakPanoramaMuseum)},resources:performance.getEntriesByType('resource').filter(r=>r.name.includes('.js')).map(r=>({name:new URL(r.name).pathname.split('/').at(-1),bytes:r.decodedBodySize}))};},scene);
 const files=data.resources.filter(r=>names.includes(r.name)),fingerprint=crypto.createHash('sha256').update(data.json).digest('hex');rows.push({scene,dataReadyMs,decodedJsBytes:data.resources.reduce((n,r)=>n+r.bytes,0),sceneDataBytes:files.reduce((n,r)=>n+r.bytes,0),files,globals:data.globals,fingerprint});await context.close();
 }
 if(errors.length)throw Error(errors.join('\n'));
 await fs.mkdir('review-output/scene-loading',{recursive:true});
 if(phase==='after'){
  const before=JSON.parse(await fs.readFile('review-output/scene-loading/before.json','utf8'));
  for(const row of rows){if(row.fingerprint!==before.rows.find(r=>r.scene===row.scene).fingerprint)throw Error('Scene content changed: '+row.scene);for(const [key,present]of Object.entries(row.globals))if(present!==(key===row.scene))throw Error('Unselected scene loaded: '+row.scene+'/'+key);}
 }
 await fs.writeFile('review-output/scene-loading/'+phase+'.json',JSON.stringify({phase,conditions:{viewport:{width:390,height:844},cpuThrottle:4,images:'blocked to isolate data startup',serviceWorkers:'blocked',contexts:'fresh'},rows,errors},null,2));
}finally{await browser.close();}
console.log(JSON.stringify({phase,rows,errors}));
