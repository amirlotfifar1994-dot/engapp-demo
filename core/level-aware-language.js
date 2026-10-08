/* EngApp v1.02 — Level-Aware Visual Language Engine
   Truth map stays invariant. CEFR-inspired levels affect language realization only.
   Global target level can be locally overridden per skill inside a lesson.
*/
(function(root){
  'use strict';
  const LEVELS=Object.freeze(['A1','A2','B1','B2','C1']);
  const NEXT=Object.freeze({A1:'A2',A2:'B1',B1:'B2',B2:'C1',C1:'C1'});
  const PROFILE_KEY='engapp_v101_learning_profile';
  const lessonKey=id=>`engapp_v101_lesson_profile_${Number(id)||0}`;
  const safeLevel=v=>LEVELS.includes(String(v||''))?String(v):null;
  const safeJson=(raw,fallback)=>{try{const v=JSON.parse(raw);return v&&typeof v==='object'?v:fallback;}catch{return fallback;}};
  function globalProfile(){
    try{const x=safeJson(localStorage.getItem(PROFILE_KEY),{});return {global:safeLevel(x.global)||'A2',recommended:safeLevel(x.recommended)||null,mode:['selected','recommended','adaptive'].includes(x.mode)?x.mode:'selected'};}catch{return {global:'A2',recommended:null,mode:'selected'};}
  }
  function setGlobal(level){const l=safeLevel(level);if(!l)return false;const p=globalProfile();p.global=l;try{localStorage.setItem(PROFILE_KEY,JSON.stringify(p));}catch{}return true;}
  function lessonProfile(id){try{const x=safeJson(sessionStorage.getItem(lessonKey(id)),{});return {lesson:safeLevel(x.lesson)||null,skills:x.skills&&typeof x.skills==='object'?x.skills:{}};}catch{return {lesson:null,skills:{}};}}
  function saveLesson(id,p){try{sessionStorage.setItem(lessonKey(id),JSON.stringify(p));}catch{}}
  function setLesson(id,level){const l=safeLevel(level);if(!l)return false;const p=lessonProfile(id);p.lesson=l;saveLesson(id,p);return true;}
  function clearLesson(id){const p=lessonProfile(id);p.lesson=null;saveLesson(id,p);}
  function setSkill(id,skill,level){const l=safeLevel(level);if(!l)return false;const p=lessonProfile(id);p.skills[String(skill||'')]=l;saveLesson(id,p);return true;}
  function clearSkill(id,skill){const p=lessonProfile(id);delete p.skills[String(skill||'')];saveLesson(id,p);}
  function packLevels(pack){const a=pack?.content?.levelAware;return Array.isArray(a?.levels)&&a.levels.length?a.levels.filter(x=>LEVELS.includes(x)):LEVELS.slice();}
  function levelFor(pack,scope='global'){
    const id=Number(pack?.lessonId||0),lp=lessonProfile(id),gp=globalProfile(),levels=packLevels(pack);
    let v=scope&&scope!=='global'?safeLevel(lp.skills?.[scope]):null;
    if(!v)v=safeLevel(lp.lesson);
    if(!v)v=safeLevel(gp.global);
    if(!levels.includes(v))v=safeLevel(pack?.content?.levelAware?.defaultLevel)||levels[0]||'A2';
    return v;
  }
  function next(level){return NEXT[safeLevel(level)||'A2']||'C1';}
  function variant(obj,level){const l=safeLevel(level)||'A2';const v=obj?.levels?.[l];if(typeof v==='string')return {text:v};if(v&&typeof v==='object')return v;return null;}
  function scenario(model,pack){const l=levelFor(pack,'scenario');return {level:l,...(variant(model,l)||{}),text:variant(model,l)?.text||model?.text||''};}
  function memory(model,pack){const l=levelFor(pack,'memory');return {level:l,...(variant(model,l)||{}),text:variant(model,l)?.text||''};}
  function sentence(ladder,pack){const l=levelFor(pack,'sentence');return {level:l,text:String(ladder?.levels?.[l]||'')};}
  function collocations(pack){const l=levelFor(pack,'vocabulary');const bank=pack?.content?.levelAware?.collocationBank||{};return {level:l,items:Array.isArray(bank[l])?bank[l]:[]};}
  function ideas(pack){const l=levelFor(pack,'vocabulary');const bank=pack?.content?.levelAware?.ideaBank||{};return {level:l,items:Array.isArray(bank[l])?bank[l]:[]};}
  function grammar(pack){const l=levelFor(pack,'grammar');return {level:l,...(pack?.content?.levelAware?.grammarFusion?.[l]||{})};}
  function speaking(pack){const l=levelFor(pack,'speaking');return {level:l,rows:pack?.content?.levelAware?.speakingLadder?.[l]||pack?.content?.speaking||{}};}
  function density(pack){const l=levelFor(pack,'vocabulary'),row=pack?.content?.levelAware?.densityProfiles?.[l]||{};const total=Array.isArray(pack?.hotspots)?pack.hotspots.length:0;const ratio=Math.max(0,Math.min(1,Number(row.focusRatio??1)));return {level:l,total,ratio,focusCount:Math.max(1,Math.round(total*ratio)),purpose:String(row.purpose||'')};}
  function rail(pack,scope='global',label='Learning level'){
    const id=Number(pack?.lessonId||0),cur=levelFor(pack,scope),gp=globalProfile(),lp=lessonProfile(id),override=scope==='global'?lp.lesson:lp.skills?.[scope];
    const rec=safeLevel(pack?.content?.levelAware?.recommendedLevel)||safeLevel(gp.recommended)||null;
    return `<div class="v101-level-rail" data-v101-scope="${scope}"><div class="v101-level-label"><b>${label}</b><span>${scope==='global'?(lp.lesson?'lesson override':`my default ${gp.global}`):(override?'local override':`follows ${levelFor(pack,'global')}`)}</span>${rec?`<em>recommended ${rec}</em>`:''}</div><div class="v101-level-buttons">${packLevels(pack).map(l=>`<button class="${cur===l?'active':''}" data-v101-level="${l}" data-v101-level-scope="${scope}">${l}</button>`).join('')}</div>${scope==='global'&&lp.lesson?`<button class="v101-follow" data-v101-level-reset="global">Use my default ${gp.global}</button>`:''}${scope==='global'&&gp.global!==cur?`<button class="v101-follow" data-v101-set-default="${cur}">Make ${cur} my default</button>`:''}${scope!=='global'&&override?`<button class="v101-follow" data-v101-level-reset="${scope}">Follow lesson level</button>`:''}<button class="v101-level-up" data-v101-level-up="${scope}">↑ Say it at ${next(cur)}</button></div>`;
  }
  function compare(ladder,pack,scope='sentence'){
    const cur=levelFor(pack,scope),up=next(cur),a=String(ladder?.levels?.[cur]||''),b=String(ladder?.levels?.[up]||'');
    if(!a)return '';
    return `<div class="v101-level-compare"><article><span>${cur}</span><p>${a}</p></article>${up!==cur&&b?`<article><span>${up}</span><p>${b}</p></article>`:''}</div>`;
  }
  root.EngAppLevelAware=Object.freeze({version:'1.02',levels:LEVELS.slice(),globalProfile,lessonProfile,setGlobal,setLesson,clearLesson,setSkill,clearSkill,levelFor,next,variant,scenario,memory,sentence,collocations,ideas,grammar,speaking,density,rail,compare});
  root.ENGBOOK_RUNTIME={...(root.ENGBOOK_RUNTIME||{}),levelAwareLanguage:'v1.02',levelAwareContract:'truth-map-invariant-language-realization'};
})(typeof window!=='undefined'?window:globalThis);
