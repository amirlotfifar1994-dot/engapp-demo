/* EngApp Local Data Store v1 — IndexedDB primary storage with localStorage fallback. */
(function(root){
  'use strict';
  const DB='engapp-local-v1',STORE='kv',PROGRESS='progress',ACTIVITY='activity-queue',FALLBACK_PREFIX='engapp_fallback_';
  let dbPromise=null,lastError='';
  const clone=v=>v==null?v:JSON.parse(JSON.stringify(v));
  function hasIdb(){return Boolean(root.indexedDB);}
  function open(){
    if(!hasIdb())return Promise.reject(new Error('INDEXEDDB_UNAVAILABLE'));
    if(dbPromise)return dbPromise;
    dbPromise=new Promise((resolve,reject)=>{const req=root.indexedDB.open(DB,1);req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains(STORE))db.createObjectStore(STORE);};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error||new Error('INDEXEDDB_OPEN_FAILED'));req.onblocked=()=>reject(new Error('INDEXEDDB_BLOCKED'));}).catch(e=>{lastError=String(e?.message||e);dbPromise=null;throw e;});
    return dbPromise;
  }
  async function idbGet(key){const db=await open();return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,'readonly'),req=tx.objectStore(STORE).get(key);req.onsuccess=()=>resolve(req.result??null);req.onerror=()=>reject(req.error||new Error('INDEXEDDB_READ_FAILED'));});}
  async function idbSet(key,value){const db=await open();return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).put(clone(value),key);tx.oncomplete=()=>resolve(true);tx.onerror=()=>reject(tx.error||new Error('INDEXEDDB_WRITE_FAILED'));tx.onabort=()=>reject(tx.error||new Error('INDEXEDDB_WRITE_ABORTED'));});}
  function fallbackGet(key){try{return JSON.parse(root.localStorage?.getItem(`${FALLBACK_PREFIX}${key}`)||'null');}catch{return null;}}
  function fallbackSet(key,value){try{root.localStorage?.setItem(`${FALLBACK_PREFIX}${key}`,JSON.stringify(value));return true;}catch{return false;}}
  async function get(key){if(hasIdb())try{return await idbGet(key);}catch(e){lastError=String(e?.message||e);}return fallbackGet(key);}
  async function set(key,value){if(hasIdb())try{await idbSet(key,value);try{root.localStorage?.removeItem(`${FALLBACK_PREFIX}${key}`);}catch{}return {ok:true,backend:'indexeddb'};}catch(e){lastError=String(e?.message||e);}const ok=fallbackSet(key,value);return {ok,backend:'localstorage-fallback'};}
  async function getProgress(){const x=await get(PROGRESS);return x&&typeof x==='object'&&x.progress&&typeof x.progress==='object'?x:null;}
  async function putProgress(progress){return set(PROGRESS,{updatedAt:Number(progress?.localUpdatedAt)||Date.now(),progress:clone(progress)});}
  async function hydrateProgress(fallbackProgress){const saved=await getProgress();if(!saved)return {progress:clone(fallbackProgress),source:'bootstrap'};return {progress:clone(saved.progress),updatedAt:Number(saved.updatedAt)||0,source:hasIdb()?'indexeddb':'localstorage-fallback'};}
  async function getActivityQueue(){const x=await get(ACTIVITY);return Array.isArray(x?.items)?x.items:[];}
  async function putActivityQueue(items){return set(ACTIVITY,{updatedAt:Date.now(),items:Array.isArray(items)?clone(items):[]});}
  async function clearAll(){if(hasIdb())try{const db=await open();await new Promise((resolve,reject)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).clear();tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}catch(e){lastError=String(e?.message||e);}try{for(const key of [PROGRESS,ACTIVITY])root.localStorage?.removeItem(`${FALLBACK_PREFIX}${key}`);}catch{}return true;}
  root.EngAppLocalData=Object.freeze({version:'1.0',hasIndexedDB:hasIdb,get,set,getProgress,putProgress,hydrateProgress,getActivityQueue,putActivityQueue,clearAll,status:()=>({primary:hasIdb()?'indexeddb':'localstorage-fallback',lastError})});
})(typeof window!=='undefined'?window:globalThis);
