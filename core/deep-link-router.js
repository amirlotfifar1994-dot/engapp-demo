/* EngBook Deep Link Router v0.55
   Pure parsing/normalization so async lesson loading and mode restoration are
   handled by one authoritative path instead of version-specific listeners. */
(function(root){
  'use strict';
  const VERSION='0.54';
  const MODES=Object.freeze(['explore','learn','practice','speak','talk','reconstruct','timeline','grammar','camera','level','fingerprint','ownscene']);
  const CORE_MODES=Object.freeze(['explore','learn','practice','speak','talk']);
  function parse(search='',opts={}){
    const params=new URLSearchParams(String(search||'').replace(/^\?/,''));
    const lesson=Number(params.get('lesson'));
    const rawMode=String(params.get('mode')||'explore').trim().toLowerCase();
    const min=Number(opts.minLesson||1),max=Number(opts.maxLesson||60);
    const validLesson=Number.isInteger(lesson)&&lesson>=min&&lesson<=max;
    return {lesson:validLesson?lesson:null,mode:MODES.includes(rawMode)?rawMode:'explore',requestedMode:rawMode,validLesson};
  }
  function coreMode(mode){return CORE_MODES.includes(mode)?mode:'explore';}
  root.EngBookDeepLinks=Object.freeze({version:VERSION,modes:MODES,coreModes:CORE_MODES,parse,coreMode});
})(typeof window!=='undefined'?window:globalThis);
