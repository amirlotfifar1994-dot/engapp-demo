/* EngBook Deep Link Router v0.55
   Pure parsing/normalization so async lesson loading and mode restoration are
   handled by one authoritative path instead of version-specific listeners. */
(function(root){
  'use strict';
  const VERSION='0.56';
  let restoring=false;
  const MODES=Object.freeze(['explore','learn','practice','speak','talk','listening','reconstruct','timeline','grammar','camera','level','fingerprint','ownscene']);
  const CORE_MODES=Object.freeze(['explore','learn','practice','speak','talk','listening']);
  function parse(search='',opts={}){
    const params=new URLSearchParams(String(search||'').replace(/^\?/,''));
    const lesson=Number(params.get('lesson'));
    const rawMode=String(params.get('mode')||'explore').trim().toLowerCase();
    const min=Number(opts.minLesson||1),max=Number(opts.maxLesson||60);
    const validLesson=Number.isInteger(lesson)&&lesson>=min&&lesson<=max;
    return {lesson:validLesson?lesson:null,mode:MODES.includes(rawMode)?rawMode:'explore',requestedMode:rawMode,validLesson};
  }
  function coreMode(mode){return CORE_MODES.includes(mode)?mode:'explore';}
  // Rendered state is authoritative after startup. Replace rather than adding
  // a history entry for each mode or hotspot interaction. Keep other URL data.
  function replaceRoute(update,{push=false}={}){
    if(restoring||root.EngBookStartup?.pending||!root.location?.href||!root.history?.replaceState)return false;
    try{
      const url=new URL(root.location.href);update(url);
      if(url.href===root.location.href)return false;
      // Opening a real lesson from the tutorial needs its own entry so Back
      // returns to the guide. Ordinary lesson/mode changes still replace.
      const method=push&&root.history.pushState?'pushState':'replaceState';
      root.history[method](root.history.state,'',url.href);return true;
    }catch{return false;}
  }
  function syncLesson(id,mode='explore'){
    const lesson=Number(id);if(!Number.isInteger(lesson)||lesson<1)return false;
    const fromPath=['#how-it-works','#lessons'].includes(root.location?.hash)&&!new URLSearchParams(root.location?.search||'').has('lesson');
    return replaceRoute(url=>{url.searchParams.set('lesson',String(lesson));url.searchParams.set('mode',MODES.includes(mode)?mode:'explore');},{push:fromPath});
  }
  function syncHome(view='welcome'){
    return replaceRoute(url=>{url.searchParams.delete('lesson');url.searchParams.delete('mode');url.hash=view==='lessons'?'lessons':view==='guide'?'how-it-works':'app';});
  }
  // Home owns home history restoration; lesson URLs use the same async loader
  // as startup. Do not overwrite the requested URL during intermediate renders.
  root.addEventListener?.('popstate',async()=>{
    if(restoring||root.EngBookStartup?.pending||!new URLSearchParams(root.location?.search||'').has('lesson')||!root.v49ApplyDeepLink)return;
    restoring=true;
    try{await root.v49ApplyDeepLink(root.location.search);}
    catch(error){root.v21PushError?.(error,'lesson-history');}
    finally{restoring=false;}
  });
  root.EngBookDeepLinks=Object.freeze({version:VERSION,modes:MODES,coreModes:CORE_MODES,parse,coreMode,syncLesson,syncHome});
})(typeof window!=='undefined'?window:globalThis);
