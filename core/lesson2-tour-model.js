/* Connected spherical locations. Learning identity remains lesson 2. */
(function(root){'use strict';
 const wrap=n=>((n+180)%360+360)%360-180;
 function nodeForHotspot(h){return h?.locationNode||h?.presentation?.viewpoint||'main';}
 function route(nodes,from,to){
  if(!nodes[from]||!nodes[to])return null;
  const queue=[[from]],seen=new Set([from]);
  while(queue.length){const path=queue.shift(),id=path[path.length-1];if(id===to)return path;
   for(const edge of nodes[id].links||[]){if(nodes[edge.to]&&!seen.has(edge.to)){seen.add(edge.to);queue.push([...path,edge.to]);}}
  }return null;
 }
 function arrivalYaw(yaw,from,to){return wrap(yaw+(from.heading||0)-(to.heading||0));}
 function linkPoint(link){return{yaw:wrap((link.u-.5)*360),pitch:90-link.v*180};}
 function validate(nodes,hotspots=[]){
  const errors=[];if(!nodes.main)errors.push('Missing main location');
  for(const [id,node]of Object.entries(nodes)){
   if(!node.image?.high||!(node.image.width>0)||node.image.width!==node.image.height*2)errors.push('Invalid spherical image: '+id);
   for(const link of node.links||[]){if(!nodes[link.to]||link.to===id||!Number.isFinite(link.u)||!Number.isFinite(link.v)||link.u<0||link.u>1||link.v<0||link.v>1)errors.push('Invalid link: '+id);else if(!nodes[link.to].links?.some(e=>e.to===id))errors.push('One-way connection: '+id+'/'+link.to);}
   if(nodes.main&&!route(nodes,'main',id))errors.push('Unreachable location: '+id);
  }
  for(const h of hotspots){if(!nodes[nodeForHotspot(h)])errors.push('Missing hotspot location: '+h.id);}
  return{ok:errors.length===0,errors};
 }
 const api=Object.freeze({wrap,nodeForHotspot,route,arrivalYaw,linkPoint,validate});root.SceneSpeakCafeTourModel=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
