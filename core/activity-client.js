/* EngApp Activity Client v0.89 — IndexedDB-primary PostgreSQL activity transport.
   Account-bound learning history is separate from anonymous product analytics.
   It queues only allow-listed structural learning signals and never accepts free text. */
(function(root){
  'use strict';
  const LEGACY_KEY='engbook_v61_activity_queue',MAX_QUEUE=200,BATCH=50;
  const ALLOWED=new Set(['lesson_open','mode_open','focus_session_complete','answer_correct','answer_incorrect','speaking_attempt','hotspot_discovered','lesson_completed','review_completed']);
  const PROP_KEYS=new Set(['support','source','feature','online','plan','resultBucket']);
  let timer=null,busy=false,hydrated=false,queue=[];
  function legacyLoad(){try{const q=JSON.parse(root.localStorage?.getItem(LEGACY_KEY)||'[]');return Array.isArray(q)?q.slice(-MAX_QUEUE):[];}catch{return [];}}
  function mergeQueues(...groups){const map=new Map();for(const item of groups.flat()){if(!item||typeof item!=='object')continue;const key=String(item.clientEventId||item.eventId||'');if(!key)continue;if(!map.has(key))map.set(key,item);}return [...map.values()].sort((a,b)=>Number(a.occurredAt||0)-Number(b.occurredAt||0)).slice(-MAX_QUEUE);}
  async function persist(){const items=queue.slice(-MAX_QUEUE);if(root.EngAppLocalData?.putActivityQueue){try{await root.EngAppLocalData.putActivityQueue(items);try{root.localStorage?.removeItem(LEGACY_KEY);}catch{}return true;}catch{}}try{root.localStorage?.setItem(LEGACY_KEY,JSON.stringify(items));return true;}catch{return false;}}
  function save(){persist().catch(()=>{});}
  async function hydrate(){if(hydrated)return queue;let durable=[];try{if(root.EngAppLocalData?.getActivityQueue)durable=await root.EngAppLocalData.getActivityQueue();}catch{}queue=mergeQueues(durable,legacyLoad(),queue);hydrated=true;await persist();return queue;}
  function ready(){const b=root.EngBookBackend?.status?.(),c=root.EngBookCommercial?.status?.();return Boolean(b?.authenticated&&c?.permissions?.cloudSync===true&&root.EngBookBackend?.sendLearningEvents);}
  function id(){try{return `ev-${crypto.randomUUID()}`;}catch{return `ev-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,12)}`;}}
  function props(raw={}){const out={};for(const [k,v] of Object.entries(raw||{})){if(!PROP_KEYS.has(k))continue;if(['string','number','boolean'].includes(typeof v))out[k]=typeof v==='string'?v.slice(0,80):v;}return out;}
  function record(eventType,raw={}){
    if(!ALLOWED.has(eventType)||!ready())return false;
    const lessonId=raw.lessonId??raw.lesson??null,categoryId=raw.categoryId??null;
    const event={clientEventId:id(),eventType,occurredAt:Date.now(),lessonId:Number.isInteger(Number(lessonId))&&Number(lessonId)>0?Number(lessonId):null,categoryId:Number.isInteger(Number(categoryId))&&Number(categoryId)>0?Number(categoryId):null,mode:String(raw.mode||'').slice(0,32).toLowerCase(),durationMs:Math.max(0,Math.min(10800000,Math.round(Number(raw.durationMs||0)))),resultBucket:String(raw.resultBucket||'').slice(0,24).toLowerCase(),properties:props(raw)};
    queue.push(event);if(queue.length>MAX_QUEUE)queue.splice(0,queue.length-MAX_QUEUE);save();schedule();return true;
  }
  function schedule(delay=4000){if(!ready())return;clearTimeout(timer);timer=setTimeout(()=>flush(),Math.max(500,delay));}
  async function flush(){if(!hydrated)await hydrate();if(busy||!ready()||!queue.length||typeof navigator!=='undefined'&&navigator.onLine===false)return {ok:false,queued:queue.length};busy=true;try{let sent=0;while(queue.length&&ready()){const batch=queue.slice(0,BATCH);await root.EngBookBackend.sendLearningEvents(batch);queue.splice(0,batch.length);sent+=batch.length;await persist();if(batch.length<BATCH)break;}return {ok:true,sent,queued:queue.length};}catch(e){return {ok:false,code:e?.code||'SEND_FAILED',queued:queue.length};}finally{busy=false;}}
  function clear(){queue=[];persist().catch(()=>{});try{root.localStorage?.removeItem(LEGACY_KEY);}catch{}return true;}
  root.addEventListener?.('online',()=>schedule(250));
  root.addEventListener?.('load',()=>setTimeout(()=>{hydrate().finally(()=>schedule(1000));},0));
  root.EngBookActivity=Object.freeze({version:'0.89',record,flush,clear,hydrate,status:()=>({queued:queue.length,ready:ready(),hydrated})});
})(typeof window!=='undefined'?window:globalThis);
