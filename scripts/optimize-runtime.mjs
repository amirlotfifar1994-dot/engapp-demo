/* Narrow demo adapters applied after a source export; never replace an older whole engine. */
import fs from 'node:fs/promises';import path from 'node:path';import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..'),read=f=>fs.readFile(path.join(root,f),'utf8'),write=(f,s)=>fs.writeFile(path.join(root,f),s);
const evaluate=s=>{const r={};vm.runInNewContext(s,{window:r,URLSearchParams},{timeout:10000});return r;};
const config={...evaluate(await read('core/demo-catalog.js')).SceneSpeakDemo};
for(const n of [1,2]){const key=n===1?'SceneSpeakLesson1Garden':'SceneSpeakLesson2Cafe',scene=evaluate(await read(`core/lesson${n}-panorama-data.generated.js`))[key];await write(`core/lesson${n}-panorama-scene.generated.js`,`(function(r){r.${key}=${JSON.stringify(scene)};})(window);\n`);const html=n===1?'garden360-lesson1.html':'cafe360-lesson2.html';await write(html,(await read(html)).replace(`core/lesson${n}-panorama-data.generated.js`,`core/lesson${n}-panorama-scene.generated.js`));if(n===2)config.cafeLocations={hotspots:scene.hotspots.map(h=>({id:h.id,locationNode:h.locationNode||'main'})),tour:{nodes:Object.fromEntries(Object.entries(scene.tour.nodes).map(([id,v])=>[id,{label:v.label,fa:v.fa||''}]))}};}
await write('core/demo-catalog.js',`window.SceneSpeakDemo=Object.freeze(${JSON.stringify(config)});\n`);
await write('index.html',(await read('index.html')).replace(/<script\b[^>]*src="core\/lesson[12]-panorama-data\.generated\.js[^"]*"[^>]*>\s*<\/script>/g,''));
await write('lesson-packs.generated.js','/* Selected packs load only when their lesson is opened. */\nwindow.ENGBOOK_LESSON_PACKS=[];\n');
for(const f of ['lesson-pack-index.generated.js','lesson-packs/index.json'])await write(f,(await read(f)).replaceAll('"embedded": true','"embedded": false'));
let s=await read('core/content-engine.js');
if(!s.includes('const pendingPacks=new Map()')){const a=s.indexOf('  async function ensurePack(id)'),b=s.indexOf('\n  ',a+3);if(a<0||b<0)throw Error('Review changed ensurePack source');s=s.slice(0,a)+`  const pendingPacks=new Map();
  async function ensurePack(id){
    const n=Number(id);if(lessonPacks.has(n))return getPack(n);
    const manifest=packManifest.get(n);if(!manifest||manifest.status!=='ready')throw new Error('LESSON_PACK_NOT_READY');
    if(!pendingPacks.has(n)){
      const job=(async()=>{if(root.EngBookLessonRepository){root.EngBookLessonRepository.register([manifest]);const loaded=await root.EngBookLessonRepository.load(n);registerPack(loaded.pack);}else await loadPack(manifest.url);})().finally(()=>pendingPacks.delete(n));
      pendingPacks.set(n,job);
    }
    await pendingPacks.get(n);return getPack(n);
  }
`+s.slice(b);}
s=s.replace('function canOpen(id){return Boolean(resolve(id)?.ready);}',"function canOpen(id){const n=Number(id);return lessonMeta.has(n)&&Boolean(lessonPacks.get(n)?.status==='ready'||packManifest.get(n)?.status==='ready');}");
if(!s.includes('function getPresentation(id)')){s=s.replace('  function getMeta(id)',"  function getPresentation(id){const p=lessonPacks.get(Number(id));return p?deepClone(p.presentation||{}):null;}\n  function getMeta(id)");s=s.replace('patchPack,getPack,getMeta,','patchPack,getPack,getPresentation,getMeta,');}await write('core/content-engine.js',s);
for(const n of [1,2]){const f=`core/lesson${n}-panorama-bridge.js`,id=n===1?5:2;let s=await read(f);s=s.replace(`root.EngBookContent?.getPack(${id})?.presentation?.panorama?.scene`,`(root.EngBookContent?.getPresentation?.(${id})??root.EngBookContent?.getPack(${id})?.presentation)?.panorama?.scene`);if(n===2)s=s.replaceAll('scene=root.SceneSpeakLesson2Cafe,','scene=root.SceneSpeakLesson2Cafe||root.SceneSpeakDemo?.cafeLocations,').replaceAll('scene=root.SceneSpeakLesson2Cafe;','scene=root.SceneSpeakLesson2Cafe||root.SceneSpeakDemo?.cafeLocations;');await write(f,s);}
const journey='core/learning-journey.js';s=await read(journey);if(!s.includes('if(root.SceneSpeakDemo?.lessons?.some'))s=s.replace('    const available=[root.SceneSpeakLesson1GardenPack,root.SceneSpeakLesson2CafePack];',"    if(root.SceneSpeakDemo?.lessons?.some(l=>Number(l.id)===id))return true;\n    const available=[root.SceneSpeakLesson1GardenPack,root.SceneSpeakLesson2CafePack];");await write(journey,s);
for(const n of [1,2]){const f=`core/lesson${n}-panorama-viewer.js`;let s=await read(f);if(s.includes('projectedDots=new Set()')){await write(f,s.replaceAll('if(!points.size){drag=null;pinched=false;}','if(!points.size){drag=null;pinched=false;draw();}'));continue;}
s=s.replace('const dotButtons=new Map();','const dotButtons=new Map(),projectedDots=new Set(),rays=new Map(D.hotspots.map(h=>[h.id,M.fromUV(h.u,h.v)]));');s=s.replace("b.className='garden-dot';","b.className='garden-dot';b.classList.toggle('is-parent',childMap.has(h.id));b.setAttribute('aria-pressed','false');");s=s.replace('Math.min(2,root.devicePixelRatio||1)','Math.min(2,root.devicePixelRatio||1,w<=820&&points.size>0?1.25:2)');
const a=s.indexOf('  const shown=new Set('),b=s.indexOf("  $('garden-heading')",a);if(a<0||b<0)throw Error('Review changed native marker renderer');
const hidden=n===2?"Boolean(tour?.moving)||T.nodeForHotspot(h)!==(tour?.current||'main')||":'',extra=n===2?"b.disabled=Boolean(state.locked||tour?.moving||state.practice&&state.practiceLocked);const label=state.practice?'Choose the highlighted detail':h.title;if(b.getAttribute('aria-label')!==label)b.setAttribute('aria-label',label);const text=state.practice?'Tap to choose':h.title;if(b.querySelector('span').textContent!==text)b.querySelector('span').textContent=text;":'';
s=s.slice(0,a)+`  const shown=new Set((state.practice?state.hintId?[byId.get(state.hintId)].filter(Boolean):[]:visible()).map(h=>h.id));
  for(const id of projectedDots)if(!shown.has(id)){const b=dotButtons.get(id);b.hidden=true;b.classList.remove('is-selected');b.setAttribute('aria-pressed','false');projectedDots.delete(id);}
  for(const id of shown){const h=byId.get(id),b=dotButtons.get(id);if(!h||!b)continue;projectedDots.add(id);const p=M.project(rays.get(id),cam,w,height);b.hidden=${hidden}!p||p.x<12||p.x>w-12||p.y<80||p.y>height-160;if(p){const left=p.x+'px',top=p.y+'px';if(b.style.left!==left)b.style.left=left;if(b.style.top!==top)b.style.top=top;}b.classList.toggle('is-selected',id===selected);const pressed=String(id===selected);if(b.getAttribute('aria-pressed')!==pressed)b.setAttribute('aria-pressed',pressed);${extra}}
`+s.slice(b);s=s.replaceAll('if(!points.size){drag=null;pinched=false;}','if(!points.size){drag=null;pinched=false;draw();}');await write(f,s);}
console.log('Demo runtime performance adapters applied');
await import('./optimize-native-lifecycle.mjs');
