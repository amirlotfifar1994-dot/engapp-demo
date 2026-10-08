/* EngBook Security Utilities v0.36
   Strict local-import canonicalization + safe text/id handling.
   User data is never treated as executable markup. */
(function(root){
  'use strict';
  const POISON=new Set(['__proto__','prototype','constructor']);
  const GROUPS=new Set(['People','Action','Object','Setting','Light','Detail','Appearance']);
  const MAX_IMAGE_CHARS=12*1024*1024;
  const isObj=v=>v&&typeof v==='object'&&!Array.isArray(v);
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,Number.isFinite(Number(n))?Number(n):a));
  function text(v,max=2000){return String(v??'').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,'').slice(0,max);}
  function id(v,prefix='id'){
    let s=text(v,180).replace(/[^A-Za-z0-9_.:-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,140);
    if(!s)s=`${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
    return s;
  }
  function safeJson(value,depth=0){
    if(depth>10)return null;
    if(value===null||typeof value==='boolean')return value;
    if(typeof value==='number')return Number.isFinite(value)?value:0;
    if(typeof value==='string')return text(value,5000);
    if(Array.isArray(value))return value.slice(0,500).map(x=>safeJson(x,depth+1));
    if(!isObj(value))return null;
    const out={};let count=0;
    for(const [k,v] of Object.entries(value)){
      if(count++>=300)break;
      if(POISON.has(k))continue;
      out[text(k,100)]=safeJson(v,depth+1);
    }
    return out;
  }
  function sanitizeProgress(value){
    const p=safeJson(value)||{};
    const strings=(v,maxItems,maxLen)=>Array.isArray(v)?v.slice(0,maxItems).map(x=>text(x,maxLen)).filter(Boolean):[];
    p.savedWords=strings(p.savedWords,500,120);
    p.savedLines=strings(p.savedLines,500,700);
    if(Array.isArray(p.personalMarks))p.personalMarks=p.personalMarks.slice(0,1500).map(x=>safeJson(x)||{}).filter(x=>x&&typeof x==='object'&&typeof x.key==='string');
    else p.personalMarks=[];
    if(Array.isArray(p.mistakes))p.mistakes=p.mistakes.slice(0,500).map(x=>safeJson(x)||{});
    if(isObj(p.conversation)&&Array.isArray(p.conversation.history))p.conversation.history=p.conversation.history.slice(0,300).map(x=>safeJson(x)||{});
    if(isObj(p.timeline)&&Array.isArray(p.timeline.history))p.timeline.history=p.timeline.history.slice(0,200).map(x=>safeJson(x)||{});
    if(isObj(p.grammar)&&Array.isArray(p.grammar.history))p.grammar.history=p.grammar.history.slice(0,200).map(x=>safeJson(x)||{});
    if(isObj(p.camera)&&Array.isArray(p.camera.history))p.camera.history=p.camera.history.slice(0,200).map(x=>safeJson(x)||{});
    if(isObj(p.levelLadder)&&Array.isArray(p.levelLadder.history))p.levelLadder.history=p.levelLadder.history.slice(0,200).map(x=>safeJson(x)||{});
    return p;
  }
  function validImageData(v){return typeof v==='string'&&v.length<=MAX_IMAGE_CHARS&&/^data:image\/(?:jpeg|jpg|png|webp);base64,[A-Za-z0-9+/=\r\n]+$/i.test(v);}
  function sanitizeAnchor(a,index=0){
    if(!isObj(a))return null;
    const label=text(a.label,80).trim();if(!label)return null;
    const group=GROUPS.has(a.group)?a.group:'Detail';
    return {
      id:id(a.id,`anchor-${index+1}`),
      label,
      group,
      x:clamp(a.x,0,100),y:clamp(a.y,0,100),
      aliases:(Array.isArray(a.aliases)?a.aliases:Array.isArray(a.terms)?a.terms:[]).slice(0,20).map(x=>text(x,80).trim()).filter(Boolean),
      terms:(Array.isArray(a.terms)?a.terms:[]).slice(0,20).map(x=>text(x,80).trim()).filter(Boolean),
      fact:text(a.fact||a.evidence,500).trim(),
      evidence:text(a.evidence||a.fact,500).trim(),
      phrase:text(a.phrase,300).trim(),
      grammar:text(a.grammar,300).trim()
    };
  }
  function sanitizeScene(scene,{requireImage=true}={}){
    if(!isObj(scene))return null;
    if(requireImage&&!validImageData(scene.imageData))return null;
    const anchors=(Array.isArray(scene.anchors)?scene.anchors:[]).slice(0,80).map(sanitizeAnchor).filter(Boolean);
    if(!anchors.length)return null;
    const uniqueIds=new Set();anchors.forEach((a,i)=>{if(uniqueIds.has(a.id))a.id=id(`${a.id}-${i+1}`,`anchor-${i+1}`);uniqueIds.add(a.id);});
    return {
      schemaVersion:text(scene.schemaVersion||'1.0',20),
      id:id(scene.id,'scene'),
      title:text(scene.title||'Imported Scene',120).trim()||'Imported Scene',
      createdAt:Number.isFinite(Number(scene.createdAt))?Number(scene.createdAt):Date.now(),
      updatedAt:Date.now(),
      imageData:validImageData(scene.imageData)?scene.imageData:'',
      imageWidth:clamp(scene.imageWidth||1,1,10000),imageHeight:clamp(scene.imageHeight||1,1,10000),
      overview:text(scene.overview,1500),
      grammarFocus:text(scene.grammarFocus||'Present continuous + spatial language + cautious inference',300),
      anchors,
      inferences:(Array.isArray(scene.inferences)?scene.inferences:[]).slice(0,80).map(x=>text(x,500).trim()).filter(Boolean),
      guardrails:(Array.isArray(scene.guardrails)?scene.guardrails:[]).slice(0,80).map(x=>text(x,300).trim()).filter(Boolean)
    };
  }
  root.EngBookSecurity=Object.freeze({version:'1.0',text,id,safeJson,sanitizeProgress,validImageData,sanitizeScene});
})(typeof window!=='undefined'?window:globalThis);
