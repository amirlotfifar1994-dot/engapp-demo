/* Progressive image discovery. Pure geometry: callers decide mode, drag and lock policy. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.SceneSpeakPanoramaDiscovery=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 function pick(hotspots,{x,y,width,height,visibleIds,project,touch=false}={}){
  if(!Number.isFinite(x)||!Number.isFinite(y)||!Number.isFinite(width)||!Number.isFinite(height)||x<12||x>width-12||y<84||y>height-112||typeof project!=='function')return null;
  const byId=new Map(hotspots.map(h=>[h.id,h])),shown=new Set(visibleIds||[]),candidates=[];
  for(const h of hotspots){if(!h.parentId||shown.has(h.id))continue;const p=project(h);if(!p||!Number.isFinite(p.x)||!Number.isFinite(p.y)||p.x<0||p.x>width||p.y<84||p.y>height-112)continue;
   // Small anchors stay precise; a finger gets a little more room, not a whole-person hit box.
   const radius=Math.min(touch?25:21,Math.max(touch?12:9,(h.r||1.8)*7)),distance=Math.hypot(p.x-x,p.y-y);if(distance>radius)continue;
   let reveal=h,visited=new Set([h.id]);while(reveal.parentId&&!shown.has(reveal.parentId)){const parent=byId.get(reveal.parentId);if(!parent||visited.has(parent.id)){reveal=null;break;}visited.add(parent.id);reveal=parent;}
   if(reveal?.parentId&&!shown.has(reveal.id))candidates.push({id:reveal.id,sourceId:h.id,distance,score:distance/radius});
  }
  candidates.sort((a,b)=>a.score-b.score||a.distance-b.distance||a.id.localeCompare(b.id));return candidates[0]||null;
 }
 function canDiscover({mode=null,practice=false,locked=false,dragging=false,dialogOpen=false,playing=false}={}){return mode==='explore'&&!practice&&!locked&&!dragging&&!dialogOpen&&!playing;}
 return Object.freeze({pick,canDiscover});
});
