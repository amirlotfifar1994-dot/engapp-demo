/* Fixed-viewpoint spherical coordinates, shared by rendering and DOM hotspots. */
(function(root){
 'use strict';
 const rad=n=>n*Math.PI/180,deg=n=>n*180/Math.PI,clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 const wrap=n=>((n+180)%360+360)%360-180;
 function fromUV(u,v){return {yaw:wrap((u-.5)*360),pitch:(.5-v)*180};}
 function angularDistance(a,b){const ap=rad(a.pitch),bp=rad(b.pitch);return deg(Math.acos(clamp(Math.sin(ap)*Math.sin(bp)+Math.cos(ap)*Math.cos(bp)*Math.cos(rad(a.yaw-b.yaw)),-1,1)));}
 function project(point,view,width,height){
  const y=rad(point.yaw),p=rad(point.pitch),cy=rad(view.yaw),cp=rad(view.pitch);
  const wx=Math.sin(y)*Math.cos(p),wy=Math.sin(p),wz=Math.cos(y)*Math.cos(p);
  const x=wx*Math.cos(cy)-wz*Math.sin(cy),z0=wx*Math.sin(cy)+wz*Math.cos(cy);
  const yy=wy*Math.cos(cp)-z0*Math.sin(cp),z=wy*Math.sin(cp)+z0*Math.cos(cp),t=Math.tan(rad(view.fov)/2);
  if(z<=.001)return null;
  return {x:width/2+x/(z*t*(width/height))*width/2,y:height/2-yy/(z*t)*height/2};
 }
 function rayUV(x,y,view,width,height){
  const t=Math.tan(rad(view.fov)/2),lx=(x/width*2-1)*t*(width/height),ly=(1-y/height*2)*t;
  const cy=rad(view.yaw),cp=rad(view.pitch),yy=ly*Math.cos(cp)+Math.sin(cp),zz=Math.cos(cp)-ly*Math.sin(cp);
  const wx=lx*Math.cos(cy)+zz*Math.sin(cy),wz=zz*Math.cos(cy)-lx*Math.sin(cy),length=Math.hypot(wx,yy,wz);
  return {u:((Math.atan2(wx,wz)/(2*Math.PI)+.5)%1+1)%1,v:.5-Math.asin(clamp(yy/length,-1,1))/Math.PI};
 }
 function frameAtHeight(point,view,fraction=.22,fov=view.fov){
  const focusedFov=clamp(fov,24,105),offset=deg(Math.atan((1-2*fraction)*Math.tan(rad(focusedFov)/2)));
  return {...view,yaw:wrap(point.yaw),pitch:clamp(point.pitch-offset,-82,82),fov:focusedFov};
 }
 function createView(initial={}){
  let view={yaw:wrap(initial.yaw||0),pitch:clamp(initial.pitch||0,-82,82),fov:clamp(initial.fov||76,24,105)},locked=false;
  return {
   get:()=>({...view}),locked:()=>locked,lock:value=>{locked=Boolean(value);},
   aim(yaw,pitch){view.yaw=wrap(yaw);view.pitch=clamp(pitch,-82,82);return this.get();},
   turn(dx,dy=0){if(locked)return false;view.yaw=wrap(view.yaw+dx);view.pitch=clamp(view.pitch+dy,-82,82);return true;},
   wheel(delta,mode=0,height=800){if(locked)return false;const pixels=delta*(mode===1?16:mode===2?height:1);return this.turn(clamp(pixels,-100,100)*.09);},
   zoom(fov){if(locked)return false;view.fov=clamp(fov,24,105);return true;}
  };
 }
 const api=Object.freeze({rad,deg,clamp,wrap,fromUV,angularDistance,project,rayUV,frameAtHeight,createView});
 if(typeof module!=='undefined'&&module.exports)module.exports=api;root.SceneSpeakPanoramaMath=api;
})(typeof window!=='undefined'?window:globalThis);
