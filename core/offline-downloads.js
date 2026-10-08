/* EngApp Offline Downloads v1 — explicit, account-scoped IndexedDB lesson downloads.
   Protected lesson bytes are never placed in the public app shell. A protected download
   is usable offline only for the same last-verified account and for a bounded license window. */
(function(root){
  'use strict';
  const DB='engapp-offline-v1',STORE='lessons',INDEX_KEY='engapp_offline_index_v1',OWNER_KEY='engapp_offline_owner_v1';
  const DEFAULT_LICENSE_DAYS=7;
  let dbPromise=null,hydrated=false,records=new Map(),objectUrls=new Map(),estimateState={usage:0,quota:0,updatedAt:0},lastError='';
  const clone=v=>v==null?v:JSON.parse(JSON.stringify(v));
  const now=()=>Date.now();
  const licenseDays=()=>Math.min(30,Math.max(1,Number(root.ENGBOOK_USER_ACCESS_CONFIG?.offlineLicenseDays||DEFAULT_LICENSE_DAYS)));
  const currentSessionUser=()=>{try{const s=root.EngBookBackend?.status?.();return s?.authenticated&&s?.user?.id?String(s.user.id):'';}catch{return '';}};
  const storedOwner=()=>{try{return String(root.localStorage?.getItem(OWNER_KEY)||'');}catch{return '';}};
  const currentOwner=()=>currentSessionUser()||storedOwner();
  function indexRead(){try{const x=JSON.parse(root.localStorage?.getItem(INDEX_KEY)||'[]');return Array.isArray(x)?x:[];}catch{return [];}}
  function indexWrite(rows){try{root.localStorage?.setItem(INDEX_KEY,JSON.stringify((rows||[]).map(x=>({key:x.key,lessonId:Number(x.lessonId),ownerId:String(x.ownerId||''),accessClass:String(x.accessClass||''),title:String(x.title||'').slice(0,180),categoryId:Number(x.categoryId||0),bytes:Number(x.bytes||0),downloadedAt:Number(x.downloadedAt||0),verifiedAt:Number(x.verifiedAt||0),packSha256:String(x.packSha256||''),imageSha256:String(x.imageSha256||'')}))));}catch{}}
  function indexedMeta(){return indexRead();}
  function isProtected(meta){return String(meta?.accessClass||'')!=='free';}
  function metaUsable(meta,{allowOnline=false}={}){
    if(!meta)return false;if(!isProtected(meta))return true;
    const owner=currentOwner();if(!owner||String(meta.ownerId)!==owner)return false;
    const age=now()-Number(meta.verifiedAt||0),ttl=licenseDays()*86400_000;if(!(age>=0&&age<=ttl))return false;
    if(!allowOnline&&typeof navigator!=='undefined'&&navigator.onLine!==false)return false;
    return true;
  }
  function hasUsable(lessonId){const id=Number(lessonId),rows=indexedMeta().filter(x=>Number(x.lessonId)===id);return rows.some(x=>metaUsable(x,{allowOnline:false}));}
  function openDb(){if(!root.indexedDB)return Promise.reject(new Error('INDEXEDDB_UNAVAILABLE'));if(dbPromise)return dbPromise;dbPromise=new Promise((resolve,reject)=>{const req=root.indexedDB.open(DB,1);req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains(STORE))db.createObjectStore(STORE,{keyPath:'key'});};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error||new Error('OFFLINE_DB_OPEN_FAILED'));req.onblocked=()=>reject(new Error('OFFLINE_DB_BLOCKED'));}).catch(e=>{lastError=String(e?.message||e);dbPromise=null;throw e;});return dbPromise;}
  async function allRecords(){const db=await openDb();return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,'readonly'),req=tx.objectStore(STORE).getAll();req.onsuccess=()=>resolve(Array.isArray(req.result)?req.result:[]);req.onerror=()=>reject(req.error||new Error('OFFLINE_DB_READ_FAILED'));});}
  async function putRecord(row){const db=await openDb();await new Promise((resolve,reject)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).put(row);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error||new Error('OFFLINE_DB_WRITE_FAILED'));tx.onabort=()=>reject(tx.error||new Error('OFFLINE_DB_WRITE_ABORTED'));});}
  async function deleteKey(key){const db=await openDb();await new Promise((resolve,reject)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).delete(key);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error||new Error('OFFLINE_DB_DELETE_FAILED'));});}
  function recordKey(ownerId,id){return `${ownerId||'public'}:${Number(id)}`;}
  function manifestEntry(id){const n=Number(id);return root.EngBookLessonRepository?.get?.(n)||(Array.isArray(root.ENGBOOK_LESSON_MANIFEST)?root.ENGBOOK_LESSON_MANIFEST.find(x=>Number(x?.lessonId)===n):null)||null;}
  function releaseObjectUrl(key){const u=objectUrls.get(key);if(u){try{root.URL?.revokeObjectURL?.(u);}catch{}objectUrls.delete(key);}}
  function imageUrlForRecord(row){if(!row?.imageBlob||!root.URL?.createObjectURL)return '';if(objectUrls.has(row.key))return objectUrls.get(row.key);const u=root.URL.createObjectURL(row.imageBlob);objectUrls.set(row.key,u);return u;}
  function syncIndex(){const rows=[...records.values()].map(r=>({key:r.key,lessonId:r.lessonId,ownerId:r.ownerId,accessClass:r.accessClass,title:r.title,categoryId:r.categoryId,bytes:r.bytes,downloadedAt:r.downloadedAt,verifiedAt:r.verifiedAt,packSha256:r.packSha256,imageSha256:r.imageSha256}));indexWrite(rows);}
  async function hydrate(){if(hydrated)return list();try{const rows=await allRecords();records=new Map(rows.map(r=>[r.key,r]));syncIndex();for(const r of rows)if(metaUsable(r,{allowOnline:true}))imageUrlForRecord(r);hydrated=true;root.dispatchEvent?.(new CustomEvent('engapp:offline-downloads-ready',{detail:status()}));return list();}catch(e){lastError=String(e?.message||e);hydrated=true;return [];}}
  async function setOwner(userId){const id=String(userId||'').trim();if(!id)return false;try{root.localStorage?.setItem(OWNER_KEY,id);}catch{}await hydrate();return true;}
  function entryAccess(entry){return String(entry?.accessClass||'pack').toLowerCase();}
  function assertDownloadAllowed(id,entry){const accessClass=entryAccess(entry);if(accessClass==='free')return {ownerId:'public',accessClass};const st=root.EngBookBackend?.status?.();if(!st?.authenticated||!st?.user?.id)throw Object.assign(new Error('Sign in before downloading protected lessons.'),{code:'OFFLINE_AUTH_REQUIRED'});const gate=root.EngBookAccess?.check?.(id);if(gate&&gate.allowed!==true)throw Object.assign(new Error('This account does not currently have access to the lesson.'),{code:'OFFLINE_ENTITLEMENT_REQUIRED'});return {ownerId:String(st.user.id),accessClass};}
  async function fetchRequired(url,kind){if(!url)throw Object.assign(new Error(`${kind} URL is unavailable.`),{code:'OFFLINE_URL_MISSING'});const r=await root.fetch(url,{credentials:'same-origin',headers:{Accept:kind==='pack'?'application/json':'image/*'}});if(!r.ok)throw Object.assign(new Error(`Could not download lesson ${kind} (HTTP ${r.status}).`),{code:`OFFLINE_${kind.toUpperCase()}_HTTP_${r.status}`,status:r.status});return r;}
  async function downloadLesson(lessonId){
    if(!root.indexedDB)throw Object.assign(new Error('IndexedDB is required for explicit offline downloads.'),{code:'OFFLINE_STORAGE_UNAVAILABLE'});
    if(typeof navigator!=='undefined'&&navigator.onLine===false)throw Object.assign(new Error('Reconnect before downloading a lesson.'),{code:'OFFLINE_NETWORK_REQUIRED'});
    const id=Number(lessonId),entry=manifestEntry(id);if(!entry||entry.status!=='ready')throw Object.assign(new Error('Lesson is not ready for download.'),{code:'LESSON_PACK_NOT_READY'});
    const {ownerId,accessClass}=assertDownloadAllowed(id,entry),protectedLesson=accessClass!=='free';if(ownerId!=='public')try{root.localStorage?.setItem(OWNER_KEY,ownerId);}catch{}
    const packUrl=protectedLesson?String(entry.apiUrl||''):String(entry.url||entry.apiUrl||''),imageUrl=protectedLesson?String(entry.imageApiUrl||''):String(entry.image||entry.imageApiUrl||'');
    const [packResp,imageResp]=await Promise.all([fetchRequired(packUrl,'pack'),fetchRequired(imageUrl,'image')]);const pack=await packResp.json(),imageBlob=await imageResp.blob();
    if(Number(pack?.lessonId)!==id)throw Object.assign(new Error('Downloaded pack lesson id does not match the manifest.'),{code:'OFFLINE_PACK_ID_MISMATCH'});
    const packText=JSON.stringify(pack),key=recordKey(ownerId,id),row={key,lessonId:id,ownerId,accessClass,title:String(entry.title||pack.title||`Lesson ${id}`).slice(0,180),categoryId:Number(entry.categoryId||pack.categoryId||0),pack,imageBlob,bytes:new Blob([packText]).size+Number(imageBlob.size||0),downloadedAt:now(),verifiedAt:now(),packSha256:String(entry.packSha256||''),imageSha256:String(entry.imageSha256||'')};
    await putRecord(row);releaseObjectUrl(key);records.set(key,row);imageUrlForRecord(row);syncIndex();await estimate();root.dispatchEvent?.(new CustomEvent('engapp:offline-downloads',{detail:{action:'download',lessonId:id,status:status()}}));return publicMeta(row);
  }
  function publicMeta(r){return {lessonId:Number(r.lessonId),ownerId:String(r.ownerId||''),accessClass:String(r.accessClass||''),title:String(r.title||''),categoryId:Number(r.categoryId||0),bytes:Number(r.bytes||0),downloadedAt:Number(r.downloadedAt||0),verifiedAt:Number(r.verifiedAt||0),usable:metaUsable(r,{allowOnline:true})};}
  function visibleRecords(){const owner=currentOwner();return [...records.values()].filter(r=>r.ownerId==='public'||owner&&String(r.ownerId)===owner);}
  function list(){if(records.size)return visibleRecords().map(publicMeta).sort((a,b)=>a.lessonId-b.lessonId);const owner=currentOwner();return indexedMeta().filter(r=>r.ownerId==='public'||owner&&String(r.ownerId)===owner).map(r=>({...r,usable:metaUsable(r,{allowOnline:true})})).sort((a,b)=>a.lessonId-b.lessonId);}
  function imageUrl(lessonId){const id=Number(lessonId),owner=currentOwner();for(const r of records.values())if(Number(r.lessonId)===id&&(r.ownerId==='public'||r.ownerId===owner)&&metaUsable(r,{allowOnline:true}))return imageUrlForRecord(r);return '';}
  async function loadLesson(lessonId,{allowOnline=false}={}){await hydrate();const id=Number(lessonId),owner=currentOwner(),rows=[...records.values()].filter(r=>Number(r.lessonId)===id&&(r.ownerId==='public'||r.ownerId===owner)).sort((a,b)=>(a.ownerId==='public'?1:0)-(b.ownerId==='public'?1:0));const row=rows.find(r=>metaUsable(r,{allowOnline}));if(!row)return null;const pack=clone(row.pack),img=imageUrlForRecord(row);if(img)pack.image=img;return {pack,source:'offline',url:`offline:${row.key}`,manifest:manifestEntry(id),metadata:publicMeta(row)};}
  async function removeLesson(lessonId){await hydrate();const id=Number(lessonId),owner=currentOwner(),targets=[...records.values()].filter(r=>Number(r.lessonId)===id&&r.ownerId!== 'public'&&String(r.ownerId)===owner);for(const r of targets){await deleteKey(r.key);releaseObjectUrl(r.key);records.delete(r.key);}syncIndex();await estimate();root.dispatchEvent?.(new CustomEvent('engapp:offline-downloads',{detail:{action:'remove',lessonId:id,status:status()}}));return {removed:targets.length};}
  async function clearProtected(){await hydrate();const targets=[...records.values()].filter(r=>r.ownerId!=='public');for(const r of targets){await deleteKey(r.key);releaseObjectUrl(r.key);records.delete(r.key);}try{root.localStorage?.removeItem(OWNER_KEY);}catch{}syncIndex();await estimate();root.dispatchEvent?.(new CustomEvent('engapp:offline-downloads',{detail:{action:'clear-protected',status:status()}}));return {removed:targets.length};}
  async function downloadCategory(categoryId){const cid=Number(categoryId),entries=(root.EngBookLessonRepository?.list?.()||[]).filter(e=>Number(e.categoryId)===cid&&e.status==='ready'),results=[];for(const e of entries){try{const gate=root.EngBookAccess?.check?.(e.lessonId);if(entryAccess(e)!=='free'&&gate?.allowed!==true){results.push({lessonId:e.lessonId,ok:false,code:'NOT_ENTITLED'});continue;}results.push({lessonId:e.lessonId,ok:true,meta:await downloadLesson(e.lessonId)});}catch(err){results.push({lessonId:e.lessonId,ok:false,code:err?.code||'DOWNLOAD_FAILED'});}}return {categoryId:cid,downloaded:results.filter(x=>x.ok).length,failed:results.filter(x=>!x.ok).length,results};}
  async function estimate(){try{const x=await root.navigator?.storage?.estimate?.();estimateState={usage:Number(x?.usage||0),quota:Number(x?.quota||0),updatedAt:now()};}catch{}return {...estimateState};}
  function status(){const rows=list(),bytes=rows.reduce((n,x)=>n+Number(x.bytes||0),0),expired=rows.filter(x=>isProtected(x)&&!metaUsable(x,{allowOnline:true})).length;return {version:'1.0',available:Boolean(root.indexedDB),hydrated,ownerId:currentOwner()||null,downloads:rows.length,bytes,expired,licenseDays:licenseDays(),storage:{...estimateState},lastError};}
  root.EngAppOfflineDownloads=Object.freeze({version:'1.0',hydrate,setOwner,currentOwner,hasUsable,downloadLesson,downloadCategory,loadLesson,removeLesson,clearProtected,list,imageUrl,estimate,status});
  setTimeout(()=>{hydrate().then(()=>estimate()).catch(()=>{});},0);
})(typeof window!=='undefined'?window:globalThis);
