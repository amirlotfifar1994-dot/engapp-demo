/* EngApp Lesson Repository v0.89
   One loader for standalone/static and API-backed deployments.
   Manifest entries may expose both static `url` and authenticated `apiUrl`.
   The repository never treats a successful static fetch as entitlement proof;
   production paid builds must omit paid static bytes and/or force API mode. */
(function(root){
  'use strict';
  const manifest=new Map();
  const clone=v=>v==null?v:JSON.parse(JSON.stringify(v));
  const mode=()=>String(root.ENGBOOK_CONTENT_MODE||'auto').toLowerCase();
  function register(entries=[]){for(const e of Array.isArray(entries)?entries:[]){const id=Number(e?.lessonId);if(Number.isInteger(id)&&id>0)manifest.set(id,{...clone(e),lessonId:id});}}
  function get(id){const x=manifest.get(Number(id));return x?clone(x):null;}
  function list(){return [...manifest.values()].sort((a,b)=>a.lessonId-b.lessonId).map(clone);}
  function candidates(entry){
    const m=mode(),staticUrl=String(entry?.url||''),apiUrl=String(entry?.apiUrl||'');
    if(m==='api')return [apiUrl].filter(Boolean);
    if(m==='static')return [staticUrl].filter(Boolean);
    return [staticUrl,apiUrl].filter((v,i,a)=>v&&a.indexOf(v)===i);
  }
  async function fetchJson(url){const res=await root.fetch(url,{credentials:'same-origin',headers:{'Accept':'application/json'}});if(!res.ok){const e=new Error(`LESSON_PACK_HTTP_${res.status}`);e.code=`LESSON_PACK_HTTP_${res.status}`;e.status=res.status;throw e;}return res.json();}
  async function load(id){
    if(typeof root.fetch!=='function')throw Object.assign(new Error('FETCH_UNAVAILABLE'),{code:'FETCH_UNAVAILABLE'});
    const entry=manifest.get(Number(id));if(!entry||entry.status!=='ready')throw Object.assign(new Error('LESSON_PACK_NOT_READY'),{code:'LESSON_PACK_NOT_READY'});
    if(typeof navigator!=='undefined'&&navigator.onLine===false&&root.EngAppOfflineDownloads?.loadLesson){const hit=await root.EngAppOfflineDownloads.loadLesson(id);if(hit)return hit;}
    let last=null;
    for(const url of candidates(entry)){
      try{return {pack:await fetchJson(url),source:url===entry.apiUrl?'api':'static',url,manifest:clone(entry)};}
      catch(e){last=e;if(e?.status===401||e?.status===403)throw e;}
    }
    if(root.EngAppOfflineDownloads?.loadLesson){const hit=await root.EngAppOfflineDownloads.loadLesson(id,{allowOnline:true});if(hit)return hit;}
    throw last||Object.assign(new Error('LESSON_PACK_UNAVAILABLE'),{code:'LESSON_PACK_UNAVAILABLE'});
  }
  register(root.ENGBOOK_LESSON_MANIFEST||[]);
  root.EngBookLessonRepository=Object.freeze({version:'0.89',register,get,list,load,mode});
})(typeof window!=='undefined'?window:globalThis);
