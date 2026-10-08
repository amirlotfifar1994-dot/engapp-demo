/* EngBook Legacy Event Bridge v0.51
   Quarantines DOM0/inline event attributes emitted by the legacy renderer.
   The browser-created handler function is captured, re-bound with
   addEventListener, and the inline attribute is removed before interaction.
   This is a strangler bridge: new UI uses data-eng-action directly, while
   legacy content keeps its behavior without leaving active inline handlers.
*/
(function(root){
  'use strict';
  const VERSION='0.51';
  const EVENT_NAMES=['click','input','change','dragover','drop'];
  const ATTRS=EVENT_NAMES.map(x=>'on'+x);
  const bound=new WeakMap();
  const stats={scanned:0,converted:0,failed:0,byEvent:Object.fromEntries(EVENT_NAMES.map(x=>[x,0]))};

  function candidateNodes(scope){
    if(!scope)return [];
    const selector=ATTRS.map(x=>`[${x}]`).join(',');
    const out=[];
    if(scope.nodeType===1&&scope.matches?.(selector))out.push(scope);
    if(scope.querySelectorAll)out.push(...scope.querySelectorAll(selector));
    return out;
  }

  function bindOne(el,eventName){
    const attr='on'+eventName;
    if(!el.hasAttribute?.(attr))return false;
    stats.scanned++;
    let map=bound.get(el);
    if(!map){map=new Map();bound.set(el,map);}
    if(map.has(eventName)){
      el.removeAttribute(attr);
      return true;
    }
    try{
      const fn=el[attr];
      if(typeof fn!=='function')throw new Error(`browser did not compile ${attr}`);
      const wrapper=function(event){
        try{
          const result=fn.call(this,event);
          if(result===false)event.preventDefault();
          return result;
        }catch(err){
          root.v21PushError?.(err,`v51-legacy-${eventName}`);
          throw err;
        }
      };
      el.addEventListener(eventName,wrapper);
      map.set(eventName,{fn,wrapper});
      /* Setting DOM0 property to null also removes executable handler state;
         removeAttribute is repeated defensively for browser consistency. */
      try{el[attr]=null;}catch(_e){}
      el.removeAttribute(attr);
      el.dataset.engLegacyBound='1';
      stats.converted++;stats.byEvent[eventName]++;
      return true;
    }catch(err){
      stats.failed++;
      root.v21PushError?.(err,`v51-inline-quarantine-${eventName}`);
      return false;
    }
  }

  function quarantine(scope=document){
    const nodes=candidateNodes(scope);
    for(const el of nodes){
      for(const eventName of EVENT_NAMES)bindOne(el,eventName);
    }
    return audit(scope);
  }

  function audit(scope=document){
    const selector=ATTRS.map(x=>`[${x}]`).join(',');
    const active=scope.querySelectorAll?scope.querySelectorAll(selector).length:0;
    return {version:VERSION,activeInlineHandlers:active,converted:stats.converted,failed:stats.failed,byEvent:{...stats.byEvent}};
  }

  function boot(){
    quarantine(document);
    const observer=new MutationObserver(records=>{
      for(const rec of records){
        if(rec.type==='childList')for(const node of rec.addedNodes)if(node.nodeType===1)quarantine(node);
        else if(rec.type==='attributes'&&/^on(?:click|input|change|dragover|drop)$/.test(rec.attributeName||''))quarantine(rec.target);
      }
    });
    observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true});
    root.addEventListener?.('pagehide',()=>observer.disconnect(),{once:true});
  }

  root.EngBookLegacyEvents=Object.freeze({version:VERSION,quarantine,audit,stats:()=>({scanned:stats.scanned,converted:stats.converted,failed:stats.failed,byEvent:{...stats.byEvent}})});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})(typeof window!=='undefined'?window:globalThis);
