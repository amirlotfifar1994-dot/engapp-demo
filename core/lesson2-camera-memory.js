/* Remember deliberate exploration without saving automatic lesson camera moves. */
(function(root){'use strict';
 const key='scenespeak:cafe-tour:camera:v1';
 function valid(value,nodes){return Boolean(value&&Object.hasOwn(nodes,value.node)&&['yaw','pitch','fov'].every(k=>Number.isFinite(value[k]))&&value.yaw>=-180&&value.yaw<=180&&Math.abs(value.pitch)<=80&&value.fov>=24&&value.fov<=110);}
 function create({nodes,view,controls,get,canSave,storage}){
  let saved={};try{storage??=root.localStorage;const data=JSON.parse(storage.getItem(key));if(data&&typeof data==='object')for(const row of Object.values(data))if(valid(row,nodes))saved[row.node]=row;}catch{}
  let pending=null,timer=0;
  function flush(){root.clearTimeout(timer);if(!pending)return;saved[pending.node]=pending;pending=null;try{storage.setItem(key,JSON.stringify(saved));}catch{}}
  function capture(event){
   if(event?.type==='keydown'&&!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','+','-','='].includes(event.key))return;
   if(!canSave())return;const row=get();if(!valid(row,nodes))return;
   pending={node:row.node,yaw:row.yaw,pitch:row.pitch,fov:row.fov};root.clearTimeout(timer);timer=root.setTimeout(flush,350);
  }
  for(const type of ['pointerup','wheel','keydown'])view.addEventListener(type,capture);
  controls?.addEventListener('click',capture);root.addEventListener?.('pagehide',flush);
  return{restore(node){const row=saved[node];return row?{yaw:row.yaw,pitch:row.pitch,fov:row.fov}:null;},flush,dispose(){flush();for(const type of ['pointerup','wheel','keydown'])view.removeEventListener(type,capture);controls?.removeEventListener('click',capture);root.removeEventListener?.('pagehide',flush);}};
 }
 const api=Object.freeze({create,valid,key});root.SceneSpeakCafeCameraMemory=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
