/* EngBook Content Engine v0.88
   Course-aware lesson registry/runtime with schema-v2 traceability, lazy packs,
   and a 20-category information architecture. Category mapping and app
   availability are deliberately separate concepts. */
(function(root){
  'use strict';
  const BUILD=root.ENGBOOK_BUILD_INFO||{version:'0.53',contentPackSchemaVersion:2};
  const PACK_SCHEMA_VERSION=Number(BUILD.contentPackSchemaVersion||2);
  const categories=new Map(),lessonMeta=new Map(),lessonPacks=new Map(),packManifest=new Map();
  const deepClone=v=>v==null?v:JSON.parse(JSON.stringify(v));
  const arr=v=>Array.isArray(v)?v:[];
  const obj=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
  const str=(v,max=4000)=>String(v??'').slice(0,max);
  const numOrNull=v=>(v!==null&&v!==undefined&&v!==''&&Number.isFinite(Number(v)))?Number(v):null;

  function registerCategory(category){
    if(!category||!Number.isFinite(Number(category.id)))throw new Error('CATEGORY_ID_REQUIRED');
    const id=Number(category.id),existing=categories.get(id)||{};
    const incomingLessonIds=arr(category.lessonIds).map(Number).filter(Number.isFinite);
    const c={...existing,...deepClone(category),id,
      title:str(category.title||existing.title,180),
      shortTitle:str(category.shortTitle||existing.shortTitle||category.title||existing.title,120),
      subtitle:str(category.subtitle||existing.subtitle,260),
      scope:str(category.scope||existing.scope,700),
      phase:category.phase||existing.phase||'core',
      appStatus:category.appStatus||existing.appStatus||'catalog',
      
      totalLessons:numOrNull(category.totalLessons)??existing.totalLessons??null,
      lessonStart:numOrNull(category.lessonStart)??existing.lessonStart??null,
      lessonEnd:numOrNull(category.lessonEnd)??existing.lessonEnd??null,
      
      iconKey:str(category.iconKey||existing.iconKey||'layers',60),
      lessonIds:incomingLessonIds.length?incomingLessonIds:arr(existing.lessonIds).map(Number)
    };
    categories.set(id,c);return deepClone(c);
  }
  function registerCourseCatalog(catalog){arr(catalog?.categories).forEach(registerCategory);return listCategories();}
  function registerLessonMeta(meta){
    if(!meta||!Number.isFinite(Number(meta.id)))throw new Error('LESSON_ID_REQUIRED');
    const existing=lessonMeta.get(Number(meta.id))||{};
    const m={...existing,id:Number(meta.id),categoryId:Number(meta.categoryId||existing.categoryId||1),title:str(meta.title||existing.title,180),image:str(meta.image||existing.image,500),hotspots:arr(meta.hotspots).length?arr(meta.hotspots):arr(existing.hotspots),status:meta.status||existing.status||'catalog',source:meta.source||existing.source||'catalog'};
    lessonMeta.set(m.id,m);
    const c=categories.get(m.categoryId);if(c&&!c.lessonIds.includes(m.id)){c.lessonIds=[...c.lessonIds,m.id].sort((a,b)=>a-b);categories.set(c.id,c);}
    return deepClone(m);
  }
  function registerManifest(entries){
    arr(entries).forEach(entry=>{
      const id=Number(entry?.lessonId);if(!Number.isFinite(id))return;
      packManifest.set(id,{lessonId:id,title:str(entry.title,180),status:entry.status||'draft',sourceRevision:str(entry.sourceRevision,120),contentRevision:str(entry.contentRevision||'',160),capabilities:arr(entry.capabilities),image:str(entry.image,500),url:str(entry.url||`lesson-packs/lesson_${String(id).padStart(2,'0')}.json`,500),apiUrl:str(entry.apiUrl||'',500),imageApiUrl:str(entry.imageApiUrl||'',500),packSha256:str(entry.packSha256||entry.contentRevision||'',128),imageSha256:str(entry.imageSha256||'',128),accessClass:str(entry.accessClass||'',40),truthFirstReady:Boolean(entry.truthFirstReady),adaptiveTaxonomyReady:Boolean(entry.adaptiveTaxonomyReady),humanReadingReady:Boolean(entry.humanReadingReady),levelAwareReady:Boolean(entry.levelAwareReady),memoryLayerReady:Boolean(entry.memoryLayerReady),imaginationMemoryReady:Boolean(entry.imaginationMemoryReady),fullDnaReady:Boolean(entry.fullDnaReady),imageAuditReady:Boolean(entry.imageAuditReady),goldReferenceReady:Boolean(entry.goldReferenceReady),cardLevelGoldReady:Boolean(entry.cardLevelGoldReady),schemaVersion:Number(entry.schemaVersion||PACK_SCHEMA_VERSION),embedded:Boolean(entry.embedded)});
    });
  }
    const normalizeEvidenceRow=(row,i=0)=>{
    if(Array.isArray(row)){const label=str(row[0],180),detail=str(row[1],1600);return label&&detail?{label,detail}:null;}
    if(row&&typeof row==='object'){const label=str(row.label||row.title||row.name,180),detail=str(row.detail||row.text||row.description,1600),claimClass=['visible-fact','supported-inference','unsupported','story','boundary'].includes(row.claimClass)?row.claimClass:'';return label&&detail?{label,detail,...(claimClass?{claimClass}:{})}:null;}
    return null;
  };
  const normalizeEvidenceRows=rows=>{
    const normalized=arr(rows).map(normalizeEvidenceRow);
    if(normalized.some(row=>!row))throw Object.assign(new Error('content.evidence rows must contain both label and detail.'),{code:'INVALID_LESSON_PACK'});
    return normalized.slice(0,80);
  };
function validatePack(pack){
    if(root.EngBookLessonValidator){
      const check=root.EngBookLessonValidator.validatePack(pack,{schemaVersion:PACK_SCHEMA_VERSION});
      if(root.EngBookHotspots&&Array.isArray(pack?.hotspots)&&pack.hotspots.length){const hsCheck=root.EngBookHotspots.audit(pack.hotspots);if(!hsCheck.ok)check.errors.push(...hsCheck.errors.map(x=>'hotspot: '+x));check.warnings.push(...hsCheck.warnings.map(x=>'hotspot: '+x));check.ok=check.errors.length===0;}
      return check;
    }
    return {ok:false,errors:['Shared lesson validator is unavailable.'],warnings:[]};
  }
  function deriveCapabilities(pack){
    const declared=arr(pack.capabilities);if(pack.capabilityPolicy==='explicit'||declared.length)return [...new Set(declared)];
    const c=obj(pack.content),caps=new Set();
    if(arr(pack.hotspots).length)caps.add('explore');if(str(c.overview))caps.add('learn');if(arr(pack.coverageAnchors).length||arr(pack.hotspots).length)caps.add('describe');if(obj(pack.evidenceProfile)&&str(c.guardrail))caps.add('evidence');if(obj(c.grammar).models)caps.add('grammar');if(obj(c.timeline).now)caps.add('timeline');if(arr(c.personalQuestions).length)caps.add('conversation');return [...caps];
  }
  function sanitizePack(pack){
    const p=deepClone(pack||{}),id=Number(p.lessonId),meta=lessonMeta.get(id)||{};
    const content=obj(p.content);content.evidence=normalizeEvidenceRows(content.evidence);return {schemaVersion:PACK_SCHEMA_VERSION,lessonId:id,categoryId:Number(p.categoryId||meta.categoryId||1),title:str(p.title||meta.title,180),image:str(p.image||meta.image,500),status:p.status||'ready',source:p.source||'editorial',sourceRevision:str(p.sourceRevision||'',120),quality:obj(p.quality),presentation:obj(p.presentation),hotspots:arr(p.hotspots?.length?p.hotspots:meta.hotspots).slice(0,500),coverageAnchors:arr(p.coverageAnchors).slice(0,160),evidenceProfile:obj(p.evidenceProfile),content,capabilityPolicy:p.capabilityPolicy==='explicit'?'explicit':'inferred',capabilities:arr(p.capabilities)};
  }
  function registerPack(pack,{replace=true}={}){
    const clean=sanitizePack(pack),check=validatePack(clean);if(!check.ok){const e=new Error(check.errors.join(' '));e.code='INVALID_LESSON_PACK';e.validation=check;throw e;}if(!replace&&lessonPacks.has(clean.lessonId))throw new Error('LESSON_PACK_EXISTS');clean.capabilities=deriveCapabilities(clean);clean.validation=check;lessonPacks.set(clean.lessonId,clean);registerLessonMeta({id:clean.lessonId,categoryId:clean.categoryId,title:clean.title,image:clean.image,status:'ready',source:clean.source});return deepClone(clean);
  }
  function patchPack(id,patch={}){const current=lessonPacks.get(Number(id));if(!current)throw new Error('LESSON_PACK_NOT_FOUND');return registerPack({...current,...deepClone(patch),content:{...current.content,...obj(patch.content)}});}
  async function loadPack(url,{replace=true}={}){if(typeof root.fetch!=='function')throw new Error('FETCH_UNAVAILABLE');const res=await root.fetch(String(url),{credentials:'same-origin'});if(!res.ok)throw new Error(`LESSON_PACK_HTTP_${res.status}`);return registerPack(await res.json(),{replace});}
  async function ensurePack(id){const n=Number(id);if(lessonPacks.has(n))return getPack(n);const manifest=packManifest.get(n);if(!manifest||manifest.status!=='ready')throw new Error('LESSON_PACK_NOT_READY');if(root.EngBookLessonRepository){root.EngBookLessonRepository.register([manifest]);const loaded=await root.EngBookLessonRepository.load(n);return registerPack(loaded.pack);}return loadPack(manifest.url);}
  function getPack(id){const p=lessonPacks.get(Number(id));return p?deepClone(p):null;}
  function getMeta(id){const n=Number(id),m=lessonMeta.get(n);if(!m)return null;const p=lessonPacks.get(n),mf=packManifest.get(n);return {...deepClone(m),title:p?.title||mf?.title||m.title,image:p?.image||mf?.image||m.image};}
  function getCategory(id){const c=categories.get(Number(id));return c?deepClone(c):null;}
  function manifestFor(id){const m=packManifest.get(Number(id));return m?deepClone(m):null;}
  function listCategories(){return [...categories.values()].sort((a,b)=>a.id-b.id).map(deepClone);}
  function listLessons(categoryId=1){return [...lessonMeta.values()].filter(x=>Number(x.categoryId)===Number(categoryId)).sort(root.EngBookCoursePath?.compare||((a,b)=>a.id-b.id)).map(m=>{const p=lessonPacks.get(m.id),mf=packManifest.get(m.id);return {...getMeta(m.id),ready:Boolean((p&&p.status==='ready')||mf?.status==='ready'),loaded:Boolean(p),capabilities:p?.capabilities||mf?.capabilities||[],sourceRevision:p?.sourceRevision||mf?.sourceRevision||''};});}
  function readyLessonIds(categoryId){return listLessons(categoryId).filter(x=>x.ready).map(x=>x.id);}
  function readyLessonCountForCategory(categoryId){return readyLessonIds(categoryId).length;}
  function lessonCountForCategory(categoryId){const c=categories.get(Number(categoryId));const known=listLessons(categoryId).length;return numOrNull(c?.totalLessons)??(known||null);}
  function categorySnapshot(categoryId){const c=getCategory(categoryId);if(!c)return null;const lessons=listLessons(categoryId),ready=lessons.filter(x=>x.ready);return {...c,knownLessons:lessons.length,readyLessons:ready.length,loadedLessons:ready.filter(x=>x.loaded).length,lessonCount:lessonCountForCategory(categoryId),appAvailable:ready.length>0};}
  function resolve(id){const m=getMeta(id),p=lessonPacks.get(Number(id)),mf=packManifest.get(Number(id));if(!m)return null;return {lesson:{...m,hotspots:deepClone(p?.hotspots?.length?p.hotspots:m.hotspots||[])},category:getCategory(m.categoryId),pack:p?deepClone(p):null,ready:Boolean((p&&p.status==='ready')||mf?.status==='ready'),loaded:Boolean(p),capabilities:p?.capabilities||mf?.capabilities||[]};}
  function canOpen(id){return Boolean(resolve(id)?.ready);}
  function canOpenCategory(id){return readyLessonCountForCategory(id)>0;}
  function snapshot(){const ready=new Set([...packManifest.values()].filter(x=>x.status==='ready').map(x=>x.lessonId));[...lessonPacks.values()].filter(x=>x.status==='ready').forEach(x=>ready.add(x.lessonId));return {schemaVersion:PACK_SCHEMA_VERSION,courseCatalogSchemaVersion:Number(BUILD.courseCatalogSchemaVersion||1),build:BUILD.tag||BUILD.version,categories:listCategories().map(c=>categorySnapshot(c.id)),lessons:[...lessonMeta.values()].sort((a,b)=>a.id-b.id).map(deepClone),readyLessons:[...ready].sort((a,b)=>a-b),loadedLessons:[...lessonPacks.keys()].sort((a,b)=>a-b)};}
  function createTemplate(meta={}){
    const category=getCategory(meta.categoryId||1)||{};
    return {schemaVersion:PACK_SCHEMA_VERSION,lessonId:Number(meta.id||0),categoryId:Number(meta.categoryId||1),title:str(meta.title||'New lesson',180),image:str(meta.image||'',500),status:'draft',source:'editorial',sourceRevision:str(meta.sourceRevision||category.sourceRevision||'',120),hotspots:[],coverageAnchors:[],evidenceProfile:{cautionTerms:[],directRules:[],inferenceRules:[],unsupportedRules:[]},content:{overview:'',evidence:[],micro:[],inference:{high:'',medium:'',low:''},timeline:{before:'',now:'',next:''},guardrail:'',story:'',languageBank:[],personalQuestions:[],memoryFrames:[],memoryLayer:{},grammar:{title:'',explainer:'',examples:[],models:{'A1–A2':'','B1–B2':'','C1–C2':''}},speaking:{30:'',60:'',90:''},hotspotDetails:{},hotspotDetailsById:{}},presentation:{hotspotTaxonomy:{defaultCategory:'overview',categories:[{key:'overview',label:'Overview'}]},journey:['scene','analyze','build','combine','reason','story','memory','language','grammar','speak','conversation']},capabilityPolicy:'explicit',capabilities:[]};
  }

  if(root.ENGBOOK_COURSE_CATALOG)registerCourseCatalog(root.ENGBOOK_COURSE_CATALOG);
  if(typeof CAT01!=='undefined'){
    registerCategory({...(getCategory(CAT01.id)||{}),id:CAT01.id,title:CAT01.title,subtitle:CAT01.subtitle,lessonIds:CAT01.lessons.map(x=>x.id),appStatus:'active',totalLessons:28,lessonStart:1,lessonEnd:28,});
    CAT01.lessons.forEach(l=>registerLessonMeta({...l,categoryId:CAT01.id,status:l.id===1?'reference-ready':'catalog',source:'catalog'}));
    registerManifest(root.ENGBOOK_LESSON_MANIFEST||[]);
    if(typeof GOLD_LESSON_01!=='undefined')registerPack({schemaVersion:PACK_SCHEMA_VERSION,lessonId:1,categoryId:1,title:CAT01.lessons[0].title,image:CAT01.lessons[0].image,status:'ready',source:'embedded-reference',sourceRevision:'legacy-l01',hotspots:CAT01.lessons[0].hotspots,coverageAnchors:(root.ENGBOOK_LESSON_01_ANCHORS||[]),evidenceProfile:(root.ENGBOOK_LESSON_01_EVIDENCE_PROFILE||{}),content:GOLD_LESSON_01,capabilityPolicy:'explicit',capabilities:['explore','learn','practice','describe','conversation','evidence','timeline','grammar','reconstruct','camera','level','fingerprint']});
    if(Array.isArray(root.ENGBOOK_LESSON_PACKS))root.ENGBOOK_LESSON_PACKS.forEach(pack=>{try{registerPack(pack);}catch(e){console.error('Generated lesson pack rejected',pack?.lessonId,e);}});
  }
  if(typeof CAT02!=='undefined'){
    registerCategory({...(getCategory(CAT02.id)||{}),id:CAT02.id,title:CAT02.title,subtitle:CAT02.subtitle,lessonIds:CAT02.lessons.map(x=>x.id),appStatus:'active',totalLessons:32,lessonStart:29,lessonEnd:60,});
    CAT02.lessons.forEach(l=>registerLessonMeta({...l,categoryId:CAT02.id,status:'catalog',source:'catalog'}));
  }

  root.EngBookContent={version:BUILD.version||'0.54',packSchemaVersion:PACK_SCHEMA_VERSION,registerCategory,registerCourseCatalog,registerLessonMeta,registerManifest,registerPack,loadPack,ensurePack,patchPack,getPack,getMeta,getCategory,manifestFor,listCategories,listLessons,readyLessonIds,readyLessonCountForCategory,lessonCountForCategory,categorySnapshot,resolve,canOpen,canOpenCategory,validatePack,createTemplate,snapshot};
})(typeof window!=='undefined'?window:globalThis);
