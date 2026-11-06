import fs from 'node:fs/promises';import path from 'node:path';import {pathToFileURL} from 'node:url';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE?pathToFileURL(path.resolve(process.env.PLAYWRIGHT_MODULE)).href:'playwright');
const base=process.env.DEMO_BASE_URL||'http://127.0.0.1:51603/engapp-demo/',results=[],errors=[],browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_EXECUTABLE||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined)});
let page;
const check=(ok,message)=>{if(!ok)throw Error(message);};
async function native(scene){const fl=page.frameLocator('iframe[src*="panorama.html"]');await fl.locator('#pano-view').waitFor();await fl.locator('#pano-loading').waitFor({state:'hidden'});const f=page.frames().find(f=>f.url().includes('panorama.html')),data=await f.evaluate(async()=>({result:await SceneSpeakDemoSceneLoader.ready,park:Boolean(window.SceneSpeakPanoramaPark),home:Boolean(window.SceneSpeakPanoramaHome),museum:Boolean(window.SceneSpeakPanoramaMuseum)}));check(data.result.ok,'Native scene did not load');for(const key of ['park','home','museum'])check(data[key]===(key===scene),'Unexpected scene globals: '+scene);return f;}
async function ready(){await page.waitForFunction(()=>EngBookStartup.phase==='ready',null,{timeout:90000});await page.locator('.lesson-media-loading').waitFor({state:'hidden'});}
async function context(options={}){const c=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce',...options});page=await c.newPage();page.setDefaultTimeout(90000);page.on('pageerror',e=>errors.push(e.message));return c;}
try{
 console.log('Home data failure and retry');
 const retry=await context({serviceWorkers:'block'});let attempts=0;await page.route('**/core/panorama-home-granular.js*',route=>++attempts===1?route.fulfill({status:503,body:'Intentional data failure'}):route.continue());
 await page.goto(base+'?lesson=10004&mode=explore',{waitUntil:'domcontentloaded'});await ready();const fl=page.frameLocator('iframe[src*="panorama.html"]');await fl.locator('#pano-retry').waitFor();
 const failed=page.frames().find(f=>f.url().includes('panorama.html'));check(!(await failed.evaluate(()=>SceneSpeakDemoSceneLoader.ready)).ok,'Failure must not boot the viewer');
 await Promise.all([page.waitForEvent('framenavigated',{predicate:f=>f===failed}),fl.locator('#pano-retry').click()]);await native('home');check(attempts===2,'Retry did not make one fresh data request');results.push({check:'Home data 503 shows Retry; native frame reload recovers',attempts});await retry.close();
 console.log('All Museum locations');
 const tour=await context({serviceWorkers:'block'});await page.goto(base+'?lesson=10010&mode=explore',{waitUntil:'domcontentloaded'});await ready();let f=await native('museum');
 for(const node of ['painting','history','science','entrance']){await Promise.all([page.waitForEvent('framenavigated',{predicate:frame=>frame===f}),f.locator('[data-hospital-node="'+node+'"]').click()]);f=await native('museum');check(new URL(f.url()).searchParams.get('node')===node,'Wrong Museum destination');results.push({check:'Museum native navigation loads only Museum data',node});}await tour.close();
 for(const [id,scene]of [[10003,'park'],[10004,'home'],[10010,'museum']]){
  console.log('Offline '+scene);const c=await context();await page.goto(base,{waitUntil:'domcontentloaded'});await ready();await page.evaluate(async()=>{await navigator.serviceWorker.register('sw.js');await navigator.serviceWorker.ready;});await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
  await page.goto(base+'?lesson='+id+'&mode=explore',{waitUntil:'domcontentloaded'});await ready();await native(scene);
  await c.setOffline(true);await page.reload({waitUntil:'domcontentloaded'});await ready();await native(scene);await page.evaluate(()=>EngBookSceneCanvas.select(0));await page.locator('.canvas-progressive-sheet').waitFor();await page.getByRole('button',{name:'Close detail',exact:true}).click();await page.locator('.canvas-progressive-sheet').waitFor({state:'hidden'});await page.locator('.canvas-dock [data-mode="listening"]').click();await page.locator('.listening-lesson').waitFor();results.push({id,scene,check:'Visited native scene, shared detail card and Listening restore offline with selected data only'});await c.close();
 }
 check(errors.length===0,errors.join('\n'));
}catch(e){errors.push(String(e));await page?.screenshot({path:'review-output/selected-scenes-failure.png'}).catch(()=>{});throw e;}finally{await fs.mkdir('review-output/selected-scenes',{recursive:true});await fs.writeFile('review-output/selected-scenes/results.json',JSON.stringify({results,errors},null,2));await browser.close();}
console.log(JSON.stringify({results,errors}));
