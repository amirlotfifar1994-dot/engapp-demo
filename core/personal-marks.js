/* EngBook Personal Marks Core v1.0
   Generic per-user marking/highlighting for hotspots, scenarios, sentences and future lesson entities.
   Stores only small metadata in the user's progress object. */
(function(root){
  'use strict';
  const VERSION='personal-marks-v1';
  const TYPES=new Set(['hotspot','scenario','sentence','grammar','lesson-section','phrase']);
  const clean=(v,n=240)=>String(v??'').replace(/[\u0000-\u001F\u007F]/g,'').slice(0,n);
  const num=v=>Math.max(0,Math.min(9999,Number(v)||0));
  function ensure(progress){if(!progress||typeof progress!=='object')return[];if(!Array.isArray(progress.personalMarks))progress.personalMarks=[];return progress.personalMarks;}
  function target(input={}){const type=TYPES.has(input.type)?input.type:'sentence';const lessonId=num(input.lessonId);const id=clean(input.id||input.targetId||input.text||'item',180)||'item';return {lessonId,type,id,key:`${lessonId}:${type}:${id}`};}
  function find(progress,input){const t=target(input);return ensure(progress).find(x=>x&&x.key===t.key)||null;}
  function upsert(progress,input,patch={},meta={}){
    const t=target(input),items=ensure(progress);let item=items.find(x=>x&&x.key===t.key);
    if(!item){item={...t,marked:false,highlighted:false,label:'',text:'',category:'',updatedAt:0,deletedAt:null};items.push(item);}
    item.marked=patch.marked===undefined?!!item.marked:!!patch.marked;
    item.highlighted=patch.highlighted===undefined?!!item.highlighted:!!patch.highlighted;
    item.label=clean(meta.label??item.label,160);item.text=clean(meta.text??item.text,700);item.category=clean(meta.category??item.category,100);item.updatedAt=Date.now();
    if(!item.marked&&!item.highlighted){item.deletedAt=item.updatedAt;return null;}
    item.deletedAt=null;
    if(items.length>1500){items.sort((a,b)=>(Number(b.updatedAt)||0)-(Number(a.updatedAt)||0));items.length=1500;}
    return item;
  }
  function toggleMark(progress,input,meta={}){const cur=find(progress,input);return upsert(progress,input,{marked:!cur?.marked},meta);}
  function toggleHighlight(progress,input,meta={}){const cur=find(progress,input);return upsert(progress,input,{highlighted:!cur?.highlighted},meta);}
  function isMarked(progress,input){return !!find(progress,input)?.marked;}
  function isHighlighted(progress,input){return !!find(progress,input)?.highlighted;}
  function list(progress,filter={}){let out=ensure(progress).filter(x=>x&&!x.deletedAt&&(x.marked||x.highlighted));if(filter.lessonId!==undefined)out=out.filter(x=>Number(x.lessonId)===Number(filter.lessonId));if(filter.type)out=out.filter(x=>x.type===filter.type);if(filter.marked===true)out=out.filter(x=>x.marked);if(filter.highlighted===true)out=out.filter(x=>x.highlighted);return out.slice().sort((a,b)=>(Number(b.updatedAt)||0)-(Number(a.updatedAt)||0));}
  function count(progress,filter={}){return list(progress,filter).length;}
  function clearLesson(progress,lessonId){const arr=ensure(progress),now=Date.now();for(const item of arr)if(Number(item?.lessonId)===Number(lessonId)&&!item.deletedAt){item.marked=false;item.highlighted=false;item.updatedAt=now;item.deletedAt=now;}return arr;}
  root.EngBookPersonalMarks=Object.freeze({version:VERSION,target,ensure,find,toggleMark,toggleHighlight,isMarked,isHighlighted,list,count,clearLesson});
})(typeof window!=='undefined'?window:globalThis);
