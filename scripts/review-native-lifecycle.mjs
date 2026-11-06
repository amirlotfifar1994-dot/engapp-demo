import fs from 'node:fs/promises';import path from 'node:path';import {pathToFileURL} from 'node:url';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE?pathToFileURL(path.resolve(process.env.PLAYWRIGHT_MODULE)).href:'playwright');
const base=process.env.DEMO_BASE_URL||'http://127.0.0.1:51603/engapp-demo/',results=[],errors=[];
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_EXECUTABLE||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined)});
let page;
try{
 for(const [file,key,textures]of [['garden360-lesson1.html','SceneSpeakLesson1Garden',7],['cafe360-lesson2.html','SceneSpeakLesson2Cafe',3]]){
  console.log('Native lifecycle: '+file);
  const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,serviceWorkers:'block',reducedMotion:'reduce'});page=await context.newPage();page.setDefaultTimeout(90000);page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(()=>{
   window.__gpuLive=Object.fromEntries(['Texture','Buffer','Shader','Program'].map(kind=>[kind,new Set()]));
   for(const [kind,set]of Object.entries(window.__gpuLive)){
    const proto=WebGLRenderingContext.prototype,create=proto['create'+kind],remove=proto['delete'+kind];
    proto['create'+kind]=function(...args){const resource=create.apply(this,args);if(resource)set.add(resource);return resource;};
    proto['delete'+kind]=function(resource){set.delete(resource);return remove.call(this,resource);};
   }
  });
  const counts=()=>page.evaluate(()=>Object.fromEntries(Object.entries(__gpuLive).map(([kind,set])=>[kind,set.size])));
  const settled=()=>page.waitForFunction(key=>{const c=document.querySelector('#garden-canvas');return c.dataset.ready==='true'&&(key==='SceneSpeakLesson1Garden'?c.dataset.detailLoaded==='6'&&c.dataset.quality==='detail':c.dataset.forwardReady==='true'&&c.dataset.reverseReady==='true');},key);
  const expectCounts=async(total)=>{const actual=await counts(),expected={Texture:total,Buffer:total?1:0,Shader:total?2:0,Program:total?1:0};if(JSON.stringify(actual)!==JSON.stringify(expected))throw Error(file+': '+JSON.stringify({actual,expected}));return actual;};
  await page.goto(base+file,{waitUntil:'domcontentloaded'});await settled();console.log('  initial renderer ready');const initial=await expectCounts(textures),walk=[];
  if(key==='SceneSpeakLesson2Cafe'){
   for(const node of ['window','rear-center','rear-right','counter','main']){
    await page.locator('.cafe-tour-nav summary').click();await page.locator('[data-tour-node="'+node+'"]').click();
    await page.waitForFunction(id=>{const c=document.querySelector('#garden-canvas');return c.dataset.node===id&&c.dataset.moving==='false';},node);
    walk.push({node,resources:await expectCounts(textures)});
   }console.log('  five Cafe locations keep constant resources');
  }
  // Replay the real retry handler twice, including a superseded in-flight image.
  const image=await page.evaluate(key=>window[key].image.high,key);let release,started;
  const delayed=new Promise(resolve=>release=resolve),requested=new Promise(resolve=>started=resolve);let requests=0;
  await page.route('**/'+image,async route=>{if(++requests===1){started();await delayed;await route.continue().catch(()=>{});}else await route.continue();});
  await page.locator('#garden-retry').evaluate(button=>button.click());await requested;
  await page.locator('#garden-retry').evaluate(button=>button.click());release();await settled();console.log('  superseded load settled');
  const afterRetries=await expectCounts(textures);await page.unroute('**/'+image);
  // Use the real WebGL context-loss extension, then recreate the renderer.
  await page.evaluate(()=>{const gl=document.querySelector('canvas').getContext('webgl');window.__restoreGL=gl.getExtension('WEBGL_lose_context');if(!__restoreGL)throw Error('Context-loss extension unavailable');__restoreGL.loseContext();});
  await page.waitForFunction(()=>document.querySelector('#garden-canvas').dataset.ready==='false');await expectCounts(0);
  await page.evaluate(()=>__restoreGL.restoreContext());await settled();console.log('  context restored');const afterRestore=await expectCounts(textures);
  // This explicitly exercises unload disposal; it is not a heap-size measurement.
  await page.evaluate(()=>dispatchEvent(new PageTransitionEvent('pagehide')));const afterDispose=await expectCounts(0);
  results.push({file,initial,walk,afterRetries,afterRestore,afterDispose,checks:['superseded image load','constant live GPU resources after retries','real WebGL context loss/restoration','pagehide cleanup']});await context.close();
 }
 if(errors.length)throw Error(errors.join('\n'));
}catch(error){errors.push(String(error));await page?.screenshot({path:'review-output/native-lifecycle-failure.png'}).catch(()=>{});throw error;}finally{
 await fs.mkdir('review-output/native-lifecycle',{recursive:true});await fs.writeFile('review-output/native-lifecycle/results.json',JSON.stringify({results,errors},null,2));await browser.close();
}
console.log(JSON.stringify({results,errors}));
