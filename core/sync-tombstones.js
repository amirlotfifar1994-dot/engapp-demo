/* EngApp sync tombstones v1 — deletion-safe merge helpers for multi-device progress. */
(function(root){
  'use strict';
  const obj=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
  const arr=v=>Array.isArray(v)?v:[];
  const clock=x=>Math.max(Number(x?.updatedAt)||0,Number(x?.deletedAt)||0,Number(x?.createdAt)||0);
  const key=x=>x&&typeof x==='object'?String(x.id??x.key??''):'';
  function mergeRecordArrays(a,b){
    const aa=arr(a),bb=arr(b),all=[...aa,...bb];if(!all.length)return [];
    if(!all.every(x=>x&&typeof x==='object'&&key(x)))return null;
    const map=new Map();
    for(const item of all){const k=key(item),prev=map.get(k);if(!prev||clock(item)>=clock(prev))map.set(k,item);}
    return [...map.values()];
  }
  function ensureSavedWords(progress){
    const p=obj(progress);p.savedWordRecords=arr(p.savedWordRecords).filter(x=>x&&typeof x==='object'&&String(x.id||''));
    const by=new Map(p.savedWordRecords.map(x=>[String(x.id),x]));
    for(const word of arr(p.savedWords).filter(x=>typeof x==='string'&&x)){const id=`word:${word}`;if(!by.has(id)){const r={id,word,updatedAt:0,deletedAt:null};p.savedWordRecords.push(r);by.set(id,r);}}
    p.savedWords=p.savedWordRecords.filter(x=>!x.deletedAt&&typeof x.word==='string'&&x.word).map(x=>x.word).slice(-500);return p.savedWords;
  }
  function setSavedWord(progress,word,active,now=Date.now()){
    const p=obj(progress);ensureSavedWords(p);const w=String(word||'').slice(0,120);if(!w)return false;const id=`word:${w}`;let r=p.savedWordRecords.find(x=>x.id===id);if(!r){r={id,word:w,updatedAt:0,deletedAt:null};p.savedWordRecords.push(r);}r.word=w;r.updatedAt=now;r.deletedAt=active?null:now;ensureSavedWords(p);return active;
  }
  function ensureLibrary(progress){
    const p=obj(progress);p.userLibrary=obj(p.userLibrary);const lib=p.userLibrary;
    lib.bookmarkRecords=arr(lib.bookmarkRecords).filter(x=>x&&typeof x==='object'&&String(x.id||''));const by=new Map(lib.bookmarkRecords.map(x=>[String(x.id),x]));
    for(const raw of arr(lib.bookmarkedLessons)){const n=Number(raw);if(!Number.isInteger(n)||n<1)continue;const id=`lesson:${n}`;if(!by.has(id)){const r={id,lessonId:n,updatedAt:0,deletedAt:null};lib.bookmarkRecords.push(r);by.set(id,r);}}
    lib.bookmarkedLessons=lib.bookmarkRecords.filter(x=>!x.deletedAt&&Number.isInteger(Number(x.lessonId))&&Number(x.lessonId)>0).map(x=>Number(x.lessonId)).sort((a,b)=>a-b);
    lib.notes=arr(lib.notes).filter(x=>x&&typeof x==='object'&&String(x.id||''));return lib;
  }
  function setBookmark(progress,lessonId,active,now=Date.now()){
    const lib=ensureLibrary(progress),n=Number(lessonId);if(!Number.isInteger(n)||n<1)return false;const id=`lesson:${n}`;let r=lib.bookmarkRecords.find(x=>x.id===id);if(!r){r={id,lessonId:n,updatedAt:0,deletedAt:null};lib.bookmarkRecords.push(r);}r.lessonId=n;r.updatedAt=now;r.deletedAt=active?null:now;ensureLibrary(progress);return active;
  }
  function activeNotes(progressOrLibrary){const lib=progressOrLibrary?.userLibrary?ensureLibrary(progressOrLibrary):obj(progressOrLibrary);return arr(lib.notes).filter(x=>x&&!x.deletedAt);}
  function deleteNote(progress,id,now=Date.now()){
    const lib=ensureLibrary(progress),row=lib.notes.find(x=>x.id===id);if(!row)return false;row.updatedAt=now;row.deletedAt=now;return true;
  }
  function reviveNote(row,now=Date.now()){if(!row||typeof row!=='object')return row;row.updatedAt=now;row.deletedAt=null;return row;}
  function reconcileProgress(progress){const p=obj(progress);ensureSavedWords(p);ensureLibrary(p);return p;}
  root.EngBookSyncRecords=Object.freeze({version:'1.0',clock,mergeRecordArrays,ensureSavedWords,setSavedWord,ensureLibrary,setBookmark,activeNotes,deleteNote,reviveNote,reconcileProgress});
})(typeof window!=='undefined'?window:globalThis);
