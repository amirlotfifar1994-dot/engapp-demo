import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
const root=path.resolve(import.meta.dirname,'..'),source=path.resolve(process.argv[2]||process.env.ENGAPP_SOURCE||'../engapp');
if(root===source)throw Error('Source and demo must be separate repositories');
const {sanitizeLessonPack,versionPublicStartup}=await import(pathToFileURL(path.join(source,'server/scripts/public-sanitize.mjs')));
const ids=[5,2,10003,10004,10010],wanted=new Set(ids),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),read=f=>fs.readFile(path.join(source,f),'utf8');
const evaluate=s=>{const root={};vm.runInNewContext(s,{window:root,URLSearchParams},{timeout:10000});return root;};
const write=async(f,s)=>{await fs.mkdir(path.dirname(path.join(root,f)),{recursive:true});await fs.writeFile(path.join(root,f),s);};
const oldFiles=execFileSync('git',['-c','safe.directory='+root,'ls-files'],{cwd:root,encoding:'utf8'}).trim().split('\n');
const copied=new Set(),assetPaths=new Set(),queue=[];
const excluded=/^core\/panorama-(?:(?:hotel|airport|hospital|garden|school|market|station|study)-data|(?:market|station|study)-manifest|study-(?:details|granular))\.js$/;
const special=new Set(['data.js','lesson-pack-index.generated.js','lesson-packs.generated.js','core/course-catalog.js','core/build-info.js','core/panorama-course.generated.js','core/lesson1-panorama-data.generated.js','core/lesson2-panorama-data.generated.js','core/imagination-memory-dna.generated.js','core/home-hero.js','sw.js']);
function enqueue(f){if(!excluded.test(f)&&!copied.has(f)&&!queue.includes(f)&&!special.has(f)&&!/^(?:https?:|data:|#|\/)/.test(f))queue.push(f);}
for(const f of oldFiles)if(/^(?:core\/[^/]+\.js|[^/]+\.(?:js|css|html|svg|png|webmanifest))$/.test(f))enqueue(f);
for(const f of ['index.html','garden360-lesson1.html','cafe360-lesson2.html','panorama.html'])enqueue(f);
const nativeGarden=evaluate(await read('core/lesson1-panorama-data.generated.js')),nativeCafe=evaluate(await read('core/lesson2-panorama-data.generated.js')),panoramas=evaluate(await read('core/panorama-course.generated.js')).SceneSpeakPanoramaCourse;
const packs=[nativeGarden.SceneSpeakLesson1GardenPack,nativeCafe.SceneSpeakLesson2CafePack,...panoramas.packs.filter(p=>wanted.has(p.lessonId))].map(sanitizeLessonPack);
const selected=new Map(packs.map(p=>[p.lessonId,p]));
const stubFiles=new Set(['current-content-overrides.js','content-v69.js','content-v74-audit.js']);
while(queue.length){const f=queue.shift();if(copied.has(f))continue;copied.add(f);let s;try{s=await read(f);}catch(e){if(e.code==='ENOENT')continue;throw e;}
 if(stubFiles.has(f))s='/* Demo content is supplied only by the selected lesson packs. */\n';
 if(f.endsWith('.html')&&!s.includes('demo-glass.css'))s=s.replace('</head>','<link rel="stylesheet" href="demo-glass.css">\n</head>');
 if(f==='panorama.html')s=s.replace(/<script\b[^>]*src="([^"]+)"[^>]*>\s*<\/script>/g,(tag,url)=>excluded.test(url.split('?')[0])?'':tag);
 if(f==='core/content-engine.js')s=s.replace("appStatus:'active',totalLessons:28,lessonStart:1","appStatus:'active',totalLessons:CAT01.lessons.length,lessonStart:1");
 if(f==='core/user-access-config.js')s=s.replace(/(productCatalogEndpoint|permanentBillingEndpoint):'[^']*'/g,"$1:''");
 if(f==='core/panorama-lab.js')s=s.replace('data=scenes[sceneName]||scenes.garden','data=scenes[sceneName]||scenes.park');
 if(f==='core/backend-client.js')s=s.replace("const res=await fetch(`","if(root.SceneSpeakDemo)throw new BackendError('DEMO_STATIC','Online accounts are outside this static demo.');\n    const res=await fetch(`");
 if(f==='app.js'){s=s.replaceAll('assets/images/lesson_01.jpg',selected.get(5).image).replace('state.onboardingOpen=!localStorage.getItem(ONBOARD_KEY);','state.onboardingOpen=!window.SceneSpeakDemo&&!localStorage.getItem(ONBOARD_KEY);');s+="\n/* The public entrance provides its own optional introduction. */\n{const demoOnboarding=showOnboarding;showOnboarding=function(...args){if(window.SceneSpeakDemo)return;return demoOnboarding.apply(this,args);};}\n";}
 await write(f,s);
 if(f.endsWith('.html'))for(const m of s.matchAll(/(?:src|href)="([^"?#]+)(?:\?[^"#]*)?"/g)){const p=m[1].replace(/^\.\//,'');if(p.startsWith('assets/'))assetPaths.add(p);else if(/\.(?:js|css|html|svg|webmanifest)$/.test(p))enqueue(path.posix.join(path.posix.dirname(f),p));}
}
for(const f of ['core/lesson2-tour-controller.js','core/lesson2-tour-model.js','core/lesson2-camera-memory.js','core/lesson2-detail-gallery.js','lesson2-panorama.css','lesson2-tour.css']){await write(f,await read(f));copied.add(f);}
const categories=evaluate(await read('core/course-catalog.js')).ENGBOOK_COURSE_CATALOG.listCategories().filter(c=>[1,21].includes(c.id)).map(c=>({...c,totalLessons:c.id===1?2:3,availableLessons:c.id===1?2:3,lessonIds:ids.filter(id=>selected.get(id).categoryId===c.id)}));
await write('core/course-catalog.js',`(function(r){const categories=${JSON.stringify(categories)};r.ENGBOOK_COURSE_CATALOG={schemaVersion:1,courseId:'scenespeak-five-worlds',title:'SceneSpeak',activeCategoryId:1,mappedCategoryCount:2,categories,getCategory:id=>categories.find(c=>c.id===Number(id))||null,listCategories:()=>categories.map(c=>({...c}))};})(window);\n`);
const info=JSON.parse(JSON.stringify(evaluate(await read('core/build-info.js')).ENGBOOK_BUILD_INFO));for(const[k,v]of Object.entries(info))if(Array.isArray(v)&&/Lessons$/.test(k))info[k]=v.filter(id=>wanted.has(id));Object.assign(info,{mappedCategories:[1,21],readyCategories:[1,21],readyLessons:ids,runtimeReadyLessons:ids});await write('core/build-info.js',`window.ENGBOOK_BUILD_INFO=Object.freeze(${JSON.stringify(info)});\n`);
const legacy={id:1,title:'Five picture worlds',subtitle:'A small collection. A complete learning journey.',lessons:ids.filter(id=>id<10000).map(id=>{const p=selected.get(id);return {id,title:p.title,image:p.image,hotspots:[]};})};await write('data.js',`const CAT01=${JSON.stringify(legacy)};\n`);
const clean=v=>{if(typeof v==='string')return v.replace(/CAT\d{2}(?:[-_][A-Za-z0-9.]+)*/g,'public-editorial').replace(/\.docx\b/gi,'-document').replace(/WORD_SAFE/gi,'public-editorial');if(Array.isArray(v))return v.map(clean);if(!v||typeof v!=='object')return v;return Object.fromEntries(Object.entries(v).filter(([k])=>!/^(?:source(?!Revision$)|bookSource|provenance|reviewer|editorialTrace|qaTrace|qa$)/i.test(k)).map(([k,x])=>[k,clean(x)]));};
for(const [file,scene,pack,sceneKey,packKey]of [['core/lesson1-panorama-data.generated.js',nativeGarden.SceneSpeakLesson1Garden,selected.get(5),'SceneSpeakLesson1Garden','SceneSpeakLesson1GardenPack'],['core/lesson2-panorama-data.generated.js',nativeCafe.SceneSpeakLesson2Cafe,selected.get(2),'SceneSpeakLesson2Cafe','SceneSpeakLesson2CafePack']])await write(file,`(function(r){const scene=${JSON.stringify(clean(scene))},pack=${JSON.stringify(pack)};r.${sceneKey}=scene;r.${packKey}=pack;if(r.EngBookContent&&new URLSearchParams(r.location?.search||'').get('variant')!=='photo')r.EngBookContent.registerPack(pack);})(typeof window!=='undefined'?window:globalThis);\n`);
const pano={category:categories.find(c=>c.id===21),entries:panoramas.entries.filter(e=>wanted.has(e.id)),packs:[]};await write('core/panorama-course.generated.js',`window.SceneSpeakPanoramaCourse=${JSON.stringify(pano)};\n`);
const dna=evaluate(await read('core/imagination-memory-dna.generated.js')).ENGBOOK_IMAGINATION_DNA||{};await write('core/imagination-memory-dna.generated.js',`window.ENGBOOK_IMAGINATION_DNA=${JSON.stringify(clean(Object.fromEntries(Object.entries(dna).filter(([id])=>wanted.has(Number(id))))))};\n`);
await write('core/published-overrides.generated.js','window.ENGBOOK_ADMIN_PUBLISHED_OVERRIDES={};\n');
const manifest=[];
for(const id of ids){const p=selected.get(id),name=`lesson-packs/lesson_${String(id).padStart(2,'0')}.json`,body=JSON.stringify(p,null,2)+'\n';await write(name,body);const image=await fs.readFile(path.join(source,p.image));manifest.push({lessonId:id,categoryId:p.categoryId,title:p.title,image:p.image,status:'ready',schemaVersion:p.schemaVersion,sourceRevision:p.sourceRevision,url:name,apiUrl:'',imageApiUrl:'',packSha256:sha(body),imageSha256:sha(image),embedded:id===5,staticAvailable:true,accessClass:'free',capabilities:p.capabilities,...(p.content?.lessonEntry?{lessonEntry:p.content.lessonEntry}:{}),hotspotLevelCoverage:p.hotspots.length});}
await write('lesson-pack-index.generated.js',`window.ENGBOOK_LESSON_MANIFEST=${JSON.stringify(manifest,null,2)};\n`);await write('lesson-packs.generated.js',`window.ENGBOOK_LESSON_PACKS=${JSON.stringify([selected.get(5)])};\n`);await write('lesson-packs/index.json',JSON.stringify({totalLessons:5,readyLessons:ids,staticReadyLessons:ids,lessons:manifest},null,2)+'\n');
function assets(v){if(typeof v==='string'){for(const m of v.matchAll(/assets\/[a-zA-Z0-9_./%-]+\.(?:webp|png|jpe?g|avif|svg|woff2?)/g))assetPaths.add(m[0]);}else if(v&&typeof v==='object')Object.values(v).forEach(assets);}
assets(packs);assets(nativeGarden.SceneSpeakLesson1Garden);assets(nativeCafe.SceneSpeakLesson2Cafe);
for(const f of oldFiles.filter(f=>f.startsWith('assets/')))assetPaths.add(f);
for(const f of ['core/panorama-park-data.js','core/panorama-reconstruction.js','core/panorama-home-manifest.js','core/panorama-home-granular.js','core/panorama-home-data.js','core/panorama-museum-data.js','core/lesson2-detail-gallery.js']){try{assets(await read(f));}catch{}}
for(const f of copied)if(/\.(?:js|css|html)$/.test(f))assets(await fs.readFile(path.join(root,f),'utf8'));
for(const f of ['assets/brand/scenespeak-32.png','assets/brand/scenespeak-192.png','assets/brand/scenespeak-512.png','assets/brand/scenespeak-loading-v2.webp'])assetPaths.add(f);
for(const f of assetPaths){if(!/^assets\/(?:brand\/|fonts\/|images\/(?:panorama-(?:garden-lesson1|cafe-lesson2|park|home|museum)|lesson_0[25]\.)|panoramas\/(?:garden-lesson1|cafe-lesson2|park-|home-|museum-))/.test(f))continue;try{await write(f,await fs.readFile(path.join(source,f)));}catch(e){if(e.code!=='ENOENT')throw e;/* Optional previews for unselected scenes are not shipped. */}}
const sourceCommit=execFileSync('git',['-c','safe.directory='+source,'rev-parse','HEAD'],{cwd:source,encoding:'utf8'}).trim();
const lessons=ids.map((id,index)=>{const p=selected.get(id);return {id,number:index+1,title:p.title,anchors:p.hotspots.length,image:p.image,levels:['A1','A2','B1','B2','C1']};});
const release='demo-five-20261103-'+sha(sourceCommit+JSON.stringify(lessons)).slice(0,10);await write('demo-release.json',JSON.stringify({release,updated:'2026-11-03',sourceCommit,lessonIds:ids,displayOrder:ids,lessons},null,2)+'\n');await write('core/demo-catalog.js',`window.SceneSpeakDemo=Object.freeze(${JSON.stringify({release,lessons})});\n`);
let index=(await fs.readFile(path.join(root,'index.html'),'utf8')).replace(/<link\b[^>]*href="demo-glass\.css(?:\?[^"]*)?"[^>]*>\s*/g,'');index=index.replace('<title>','<title>');index=index.replace(/<title>[^<]*<\/title>/,'<title>SceneSpeak — Five worlds. Your words.</title>');index=index.replace('<head>','<head>\n<script src="core/demo-catalog.js"></script>');index=index.replace('</head>','<link rel="stylesheet" href="demo-showcase.css">\n<link rel="stylesheet" href="demo-glass.css">\n</head>');await write('index.html',index);
const web=JSON.parse(await fs.readFile(path.join(root,'manifest.webmanifest'),'utf8'));Object.assign(web,{name:'SceneSpeak — Five picture worlds',description:'Explore five immersive English lessons. See details, learn phrases and find your voice.'});web.shortcuts=[{name:'Explore the garden',url:'./?lesson=5&mode=explore'},{name:'Listen in the garden',url:'./?lesson=5&mode=listening'},{name:'Five picture worlds',url:'./#lessons'}];await write('manifest.webmanifest',JSON.stringify(web,null,2)+'\n');
await write('.nojekyll','');
for(const f of await fs.readdir(path.join(root,'core')))if(excluded.test('core/'+f))await fs.unlink(path.join(root,'core',f));
await import('./optimize-runtime.mjs');
console.log(JSON.stringify({release,sourceCommit,lessons,assetPaths:assetPaths.size}));
