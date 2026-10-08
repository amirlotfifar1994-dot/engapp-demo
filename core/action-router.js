/* EngBook delegated action router v0.29.
   New commercial-shell controls use data-action instead of inline JS. */
(function(root){
  'use strict';
  const handlers=new Map();
  function register(name,fn){if(typeof fn==='function')handlers.set(String(name),fn);return api;}
  function dispatch(name,el,event){const fn=handlers.get(String(name));if(!fn)return false;fn(el?.dataset||{},event,el);return true;}
  function click(event){const el=event.target?.closest?.('[data-action]');if(!el||el.disabled||el.getAttribute('aria-disabled')==='true')return;dispatch(el.dataset.action,el,event);}
  function change(event){const el=event.target?.closest?.('[data-change-action]');if(!el)return;dispatch(el.dataset.changeAction,el,event);}
  document.addEventListener('click',click);document.addEventListener('change',change);
  const api={version:'0.29',register,dispatch,count:()=>handlers.size};
  root.EngBookActions=api;
})(typeof window!=='undefined'?window:globalThis);
