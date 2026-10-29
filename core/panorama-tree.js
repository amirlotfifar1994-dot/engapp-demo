/* Visible branches of a hotspot tree, independent of camera and popup state. */
(function(root){
 'use strict';
 function create(hotspots){
  const byId=new Map(hotspots.map(h=>[h.id,h])),children=new Map();
  for(const h of hotspots){if(!children.has(h.parentId||null))children.set(h.parentId||null,[]);children.get(h.parentId||null).push(h.id);}
  function ancestors(id){const path=[],visited=new Set();let h=byId.get(id);while(h&&!visited.has(h.id)){visited.add(h.id);path.push(h.id);h=byId.get(h.parentId);}return path;}
  function visible(id){const h=byId.get(id);if(!h)return new Set(children.get(null)||[]);return new Set([...ancestors(id),...(children.get(id)||[]),...(h.parentId?children.get(h.parentId)||[]:[])]);}
  const api={ancestors,visible,children:id=>(children.get(id)||[]).slice(),parent:id=>byId.get(id)?.parentId||null};return Object.freeze(api);
 }
 const api=Object.freeze({create});if(typeof module!=='undefined'&&module.exports)module.exports=api;root.SceneSpeakPanoramaTree=api;
})(typeof window!=='undefined'?window:globalThis);
