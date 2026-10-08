/* EngBook v0.78 progress partitioning — global + per-lesson PostgreSQL sync.
   Browser localStorage remains the complete offline working copy; cloud writes are
   split into a compact global record and independently revisioned lesson records. */
(function(root){
  'use strict';
  const clone=v=>v==null?v:JSON.parse(JSON.stringify(v));
  const obj=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
  const lessonCompleteRe=id=>new RegExp(`^l${Number(id)}_`);
  const lessonMasteryRe=id=>Number(id)===1?/^(?!l\d+:)/:new RegExp(`^l${Number(id)}:`);
  function globalSnapshot(progress){
    const p=clone(obj(progress));
    p.discovered={};p.lessonMetrics={};p.mastery={};p.pronunciation={};
    p.completed=Object.fromEntries(Object.entries(obj(p.completed)).filter(([k])=>!/^l\d+_/.test(k)));
    if(obj(p.speechCore).byLesson)p.speechCore={...p.speechCore,byLesson:{}};
    if(obj(p.tapTalk).anchors)p.tapTalk={...p.tapTalk,anchors:{}};
    delete p.coverage;delete p.evidence;delete p.speakingAttempts;delete p.lastSpeechScore;
    return p;
  }
  function wordKeysForLesson(progress,id,words=[]){
    const n=Number(id),keys=new Set(),known=new Set((Array.isArray(words)?words:[]).map(String));
    for(const k of Object.keys(obj(progress?.mastery))){if(lessonMasteryRe(n).test(k))keys.add(k);}
    if(n===1)for(const w of known)if(progress?.mastery?.[w])keys.add(w);
    return keys;
  }
  function pronunciationForLesson(progress,words=[]){
    const known=new Set((Array.isArray(words)?words:[]).map(String));
    return Object.fromEntries(Object.entries(obj(progress?.pronunciation)).filter(([k])=>known.has(k)));
  }
  function lessonSummary(progress,id){
    const n=Number(id),re=lessonCompleteRe(n);
    return {lessonId:n,discovered:clone(progress?.discovered?.[n]||progress?.discovered?.[String(n)]||[]),completed:Object.fromEntries(Object.entries(obj(progress?.completed)).filter(([k])=>re.test(k))),lessonMetric:clone(progress?.lessonMetrics?.[n]||progress?.lessonMetrics?.[String(n)]||{})};
  }
  function lessonSnapshot(progress,id,words=[]){
    const n=Number(id),summary=lessonSummary(progress,n),masteryKeys=wordKeysForLesson(progress,n,words);
    return {lessonId:n,build:String(progress?.build||''),schemaVersion:Number(progress?.schemaVersion||0),summary,mastery:Object.fromEntries([...masteryKeys].map(k=>[k,clone(progress.mastery[k])])),pronunciation:pronunciationForLesson(progress,words),speechCore:clone(progress?.speechCore?.byLesson?.[n]||progress?.speechCore?.byLesson?.[String(n)]||null),tapTalkAnchors:Object.fromEntries(Object.entries(obj(progress?.tapTalk?.anchors)).filter(([k])=>(Array.isArray(words)?words:[]).includes(k)))};
  }
  function applyLessonSummary(progress,id,summary){
    const p=progress,n=Number(id),s=obj(summary),re=lessonCompleteRe(n);
    p.discovered=obj(p.discovered);p.discovered[n]=clone(Array.isArray(s.discovered)?s.discovered:[]);
    p.completed=obj(p.completed);for(const k of Object.keys(p.completed))if(re.test(k))delete p.completed[k];Object.assign(p.completed,clone(obj(s.completed)));
    p.lessonMetrics=obj(p.lessonMetrics);if(s.lessonMetric&&typeof s.lessonMetric==='object')p.lessonMetrics[n]=clone(s.lessonMetric);
    return p;
  }
  function applyLessonPayload(progress,id,payload){
    const n=Number(id),x=obj(payload);applyLessonSummary(progress,n,x.summary||{});
    progress.mastery={...obj(progress.mastery),...clone(obj(x.mastery))};
    progress.pronunciation={...obj(progress.pronunciation),...clone(obj(x.pronunciation))};
    if(x.speechCore){progress.speechCore={...obj(progress.speechCore),byLesson:{...obj(progress?.speechCore?.byLesson),[n]:clone(x.speechCore)}};}
    if(x.tapTalkAnchors){progress.tapTalk={...obj(progress.tapTalk),anchors:{...obj(progress?.tapTalk?.anchors),...clone(obj(x.tapTalkAnchors))}};}
    return progress;
  }
  function inferLessonIds(progress){
    const ids=new Set();const add=v=>{const n=Number(v);if(Number.isInteger(n)&&n>0)ids.add(n);};
    Object.keys(obj(progress?.discovered)).forEach(add);Object.keys(obj(progress?.lessonMetrics)).forEach(add);Object.keys(obj(progress?.speechCore?.byLesson)).forEach(add);
    Object.keys(obj(progress?.completed)).forEach(k=>{const m=k.match(/^l(\d+)_/);if(m)add(m[1]);});
    Object.keys(obj(progress?.mastery)).forEach(k=>{const m=k.match(/^l(\d+):/);if(m)add(m[1]);});add(progress?.lastLesson);
    return [...ids].sort((a,b)=>a-b);
  }
  root.EngBookProgressSync=Object.freeze({version:'0.78',globalSnapshot,lessonSummary,lessonSnapshot,applyLessonSummary,applyLessonPayload,inferLessonIds});
})(typeof window!=='undefined'?window:globalThis);
