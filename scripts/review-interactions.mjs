import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE?pathToFileURL(path.resolve(process.env.PLAYWRIGHT_MODULE)).href:'playwright');
const base=process.env.DEMO_BASE_URL||'http://127.0.0.1:51603/engapp-demo/';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_EXECUTABLE||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined)});
const results=[],errors=[];const check=(ok,message)=>{if(!ok)throw Error(message);};
let page;
try{
 const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,serviceWorkers:'block',reducedMotion:'reduce'});
 page=await context.newPage();page.setDefaultTimeout(60000);page.on('pageerror',error=>errors.push(error.message));
 for(const [file,globalName] of [['garden360-lesson1.html','SceneSpeakLesson1Garden'],['cafe360-lesson2.html','SceneSpeakLesson2Cafe']]){
  console.log('Checking '+file);await page.goto(base+file,{waitUntil:'domcontentloaded'});
  await page.locator('#garden-canvas[data-ready="true"]').waitFor();
  // Exercise every Garden ancestor path through the actual DOM handlers.
  // This checks navigation reachability, not the editorial accuracy of each anchor.
  if(globalName==='SceneSpeakLesson1Garden'){
   const count=await page.evaluate(async name=>{
    const hs=window[name].hotspots,byId=new Map(hs.map(h=>[h.id,h]));
    for(const h of hs){
     const chain=[h];while(chain[0].parentId)chain.unshift(byId.get(chain[0].parentId));
     document.querySelector('#garden-dots [data-hotspot-id="'+chain[0].id+'"]').click();
     for(const item of chain.slice(1)){
      const button=document.querySelector('#garden-branches [data-branch-id="'+item.id+'"]');
      if(!button)throw Error('Unreachable detail '+item.id);button.click();
     }
     await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
     if(document.querySelector('#garden-dots [aria-pressed="true"]')?.dataset.hotspotId!==h.id)throw Error('Wrong selected detail '+h.id);
    }return hs.length;
   },globalName);
   results.push({check:'Garden ancestor paths through DOM controls',details:count});
  }
  await page.locator('#garden-reset').click();
  const view=page.locator('#garden-view'),box=await view.boundingBox();
  const ratio=()=>page.locator('#garden-canvas').evaluate(c=>c.width/c.clientWidth);
  await page.mouse.move(box.x+box.width*.8,box.y+box.height*.55);await page.mouse.down();
  await page.mouse.move(box.x+box.width*.65,box.y+box.height*.55,{steps:5});
  await page.waitForFunction(()=>Math.abs(document.querySelector('#garden-canvas').width/document.querySelector('#garden-canvas').clientWidth-1.25)<.02);
  const during=await ratio();await page.mouse.up();
  await page.waitForFunction(()=>Math.abs(document.querySelector('#garden-canvas').width/document.querySelector('#garden-canvas').clientWidth-2)<.02);
  const after=await ratio();check(after>during,file+': restored full resolution');
  await page.mouse.down();await page.mouse.move(box.x+box.width*.6,box.y+box.height*.55,{steps:3});
  await page.waitForFunction(()=>Math.abs(document.querySelector('#garden-canvas').width/document.querySelector('#garden-canvas').clientWidth-1.25)<.02);
  await page.evaluate(()=>document.querySelector('#garden-view').dispatchEvent(new PointerEvent('pointercancel',{pointerId:1,bubbles:true})));await page.mouse.up();
  await page.waitForFunction(()=>Math.abs(document.querySelector('#garden-canvas').width/document.querySelector('#garden-canvas').clientWidth-2)<.02);
  results.push({check:file+' mobile render resolution',during,after});
 }
 await context.close();
 console.log('Checking cancellation');const cold=await browser.newContext({serviceWorkers:'block',reducedMotion:'reduce'});page=await cold.newPage();page.setDefaultTimeout(60000);page.on('pageerror',error=>errors.push(error.message));
 let release,started;const delayed=new Promise(r=>release=r),requested=new Promise(r=>started=r);
 await page.route('**/lesson-packs/lesson_05.json*',async route=>{started();await delayed;await route.continue();});
 await page.goto(base,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>EngBookStartup.phase==='ready');
 await page.locator('.demo-scene-card[data-lesson="5"]').click();await requested;
 await page.getByRole('button',{name:'Cancel opening',exact:true}).click();
 await page.locator('.demo-scene-card[data-lesson="2"]').click();
 await page.waitForFunction(()=>EngBookEventContext.getRoot('state').lesson?.id===2);
 release();await page.waitForFunction(()=>EngBookContent.snapshot().loadedLessons.includes(5));
 check(await page.evaluate(()=>EngBookEventContext.getRoot('state').lesson?.id)===2,'Cancelled late request replaced the new lesson');
 check(await page.locator('.lesson-media-loading').count()===0,'Loading dialog left behind');
 results.push({check:'Delayed Garden cancelled; Cafe remains active after Garden finishes'});
 await cold.close();
 console.log('Checking retry');const retry=await browser.newContext({serviceWorkers:'block',reducedMotion:'reduce'});page=await retry.newPage();page.setDefaultTimeout(60000);
 let requests=0;await page.route('**/lesson-packs/lesson_05.json*',route=>++requests===1?route.fulfill({status:503,body:'Temporary test failure'}):route.continue());
 await page.goto(base,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>EngBookStartup.phase==='ready');
 await page.locator('.demo-scene-card[data-lesson="5"]').click();
 await page.waitForFunction(()=>!document.querySelector('.lesson-media-loading'));
 await page.locator('.demo-scene-card[data-lesson="5"]').click();
 await page.waitForFunction(()=>EngBookEventContext.getRoot('state').lesson?.id===5);
 check(requests===2,'A failed pack did not retry exactly once');results.push({check:'Failed pack request can be retried from the home screen',requests});
 await retry.close();check(errors.length===0,errors.join('\n'));
}catch(error){errors.push(String(error));throw error;}finally{
 await fs.mkdir('review-output/interactions',{recursive:true});
 await fs.writeFile('review-output/interactions/results.json',JSON.stringify({results,errors},null,2));await browser.close();
}
console.log(JSON.stringify({results,errors},null,2));
