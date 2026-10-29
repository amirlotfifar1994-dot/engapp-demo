/* View-dependent tile planning. The preview and every tile share one source UV. */
(function(root){
 'use strict';
 const M=root.SceneSpeakPanoramaMath||(typeof require==='function'?require('./panorama-math.js'):null);
 function tileAt(tiles,u,v){u=((u%1)+1)%1;v=Math.max(0,Math.min(1-1e-10,v));return tiles.find(t=>u>=t.u0&&u<t.u1&&v>=t.v0&&v<t.v1)||null;}
 function requiredTiles(manifest,camera,width,height,enabled=true){
  if(!enabled)return [];
  const scores=new Map();
  for(let y=0;y<7;y++)for(let x=0;x<9;x++){
   const nx=(x+.5)/9,ny=(y+.5)/7,uv=M.rayUV(nx*width,ny*height,camera,width,height),tile=tileAt(manifest.tiles,uv.u,uv.v);
   if(tile)scores.set(tile.id,(scores.get(tile.id)||0)+1/(.15+(nx-.5)**2+(ny-.5)**2));
  }
  return [...scores].sort((a,b)=>b[1]-a[1]).slice(0,manifest.maxTextures||4).map(([id])=>manifest.tiles.find(t=>t.id===id));
 }
 function textureUV(tile,u,v){return{x:((u-tile.u0)/(tile.u1-tile.u0)*tile.width+tile.gutter)/(tile.width+2*tile.gutter),y:((v-tile.v0)/(tile.v1-tile.v0)*tile.height+tile.gutter)/(tile.height+2*tile.gutter)};}
 const api=Object.freeze({tileAt,requiredTiles,textureUV});
 if(typeof module!=='undefined'&&module.exports)module.exports=api;root.SceneSpeakPanoramaDetailMath=api;
})(typeof window!=='undefined'?window:globalThis);
