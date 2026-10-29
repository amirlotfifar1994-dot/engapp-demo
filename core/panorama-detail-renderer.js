/* Lossless full panorama; bounded regional fallback on devices with small texture limits. */
(function(root){
 'use strict';
 function create({canvas,manifest,patches=[],math:M,onNeedsFrame,onStatus=()=>{},onPatchStatus=()=>{}}){
  const P=root.SceneSpeakPanoramaDetailMath,gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,stencil:false});
  if(!gl||!P||gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS)<(patches.length?6:5))return null;
  const shader=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){gl.deleteShader(s);throw Error('Detail shader unavailable');}return s;};
  const vertex=shader(gl.VERTEX_SHADER,'attribute vec2 position; varying vec2 screen; void main(){screen=position;gl_Position=vec4(position,0.,1.);}');
  const precision=gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.HIGH_FLOAT)?.precision?'highp':'mediump';
  const fragment=shader(gl.FRAGMENT_SHADER,`precision ${precision} float; varying vec2 screen;
   uniform sampler2D overview;uniform sampler2D tile0;uniform sampler2D tile1;uniform sampler2D tile2;uniform sampler2D tile3;
   uniform vec4 rect0;uniform vec4 rect1;uniform vec4 rect2;uniform vec4 rect3;uniform vec2 gutter0;uniform vec2 gutter1;uniform vec2 gutter2;uniform vec2 gutter3;uniform vec4 blend;
   uniform sampler2D reconstruction;uniform vec4 patchRect;uniform float patchAmount;
   uniform float yaw;uniform float pitch;uniform float tangent;uniform float aspect;
   vec4 overlay(vec4 base,sampler2D picture,vec4 rect,vec2 gutter,float alpha,vec2 uv){
    if(rect.z<=0.||rect.w<=0.||alpha<=0.)return base;
    vec2 q=(uv-rect.xy)/rect.zw;
    if(q.x<0.||q.x>=1.||q.y<0.||q.y>=1.)return base;
    return mix(base,texture2D(picture,gutter+q*(1.-2.*gutter)),alpha);
   }
   void main(){vec3 r=normalize(vec3(screen.x*tangent*aspect,screen.y*tangent,1.));float yy=r.y*cos(pitch)+r.z*sin(pitch);float zz=r.z*cos(pitch)-r.y*sin(pitch);float xx=r.x*cos(yaw)+zz*sin(yaw);float z=zz*cos(yaw)-r.x*sin(yaw);vec2 uv=vec2(fract(atan(xx,z)/6.28318530718+.5),.5-asin(clamp(yy,-1.,1.))/3.14159265359);
    vec4 c=texture2D(overview,uv);c=overlay(c,tile0,rect0,gutter0,blend.x,uv);c=overlay(c,tile1,rect1,gutter1,blend.y,uv);c=overlay(c,tile2,rect2,gutter2,blend.z,uv);c=overlay(c,tile3,rect3,gutter3,blend.w,uv);
    if(patchAmount>0.&&patchRect.z>0.&&patchRect.w>0.){float localX=uv.x-patchRect.x;if(localX<0.)localX+=1.;vec2 q=vec2(localX/patchRect.z,(uv.y-patchRect.y)/patchRect.w);if(q.x>=0.&&q.x<=1.&&q.y>=0.&&q.y<=1.){vec2 edge=min(q,1.-q);float feather=smoothstep(0.,.12,min(edge.x,edge.y));c=mix(c,texture2D(reconstruction,q),patchAmount*feather);}}
    gl_FragColor=c;
   }`);
  const program=gl.createProgram();gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);gl.deleteShader(vertex);gl.deleteShader(fragment);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Detail program unavailable');
  gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const position=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  const names=['overview','tile0','tile1','tile2','tile3','rect0','rect1','rect2','rect3','gutter0','gutter1','gutter2','gutter3','blend','yaw','pitch','tangent','aspect','reconstruction','patchRect','patchAmount'];
  const u=Object.fromEntries(names.map(n=>[n,gl.getUniformLocation(program,n)]));
  function texture(source){const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);try{if(source)gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,source);else gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,1,1,0,gl.RGB,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0]));if(gl.getError()!==gl.NO_ERROR)throw Error('Detail texture exceeds device support');return t;}catch(e){gl.deleteTexture(t);throw e;}}
  const empty=texture(null),slots=Array.from({length:4},()=>({id:null,texture:null,readyAt:0,used:0,meta:null}));
  let base=null,baseSize={width:0,height:0},fullBase=false,enabled=true,disposed=false,desired=[],lastPlan=0,requestFrame=0,statusKey='',jobs=new Map(),failed=new Set(),loaded=new Set(),clock=0;
  const now=()=>root.performance.now();
  // One reconstruction is composited per view; each registered region keeps its own state.
  const patchStates=patches.map(p=>({...p,texture:null,loading:false,failed:false,alpha:0}));let wantedPatch=null;
  function loadPatch(patch){
   if(!patch||patch.texture||patch.loading||patch.failed||disposed||!enabled)return;
   patch.loading=true;onPatchStatus({id:patch.id,state:'loading'});const img=new root.Image();
   img.onload=async()=>{try{if(img.decode)await img.decode();if(disposed||!enabled)return;if(img.naturalWidth>gl.getParameter(gl.MAX_TEXTURE_SIZE)||img.naturalHeight>gl.getParameter(gl.MAX_TEXTURE_SIZE))throw Error('Reconstruction too large');patch.texture=texture(img);onPatchStatus({id:patch.id,state:'ready'});}catch{if(!disposed){patch.failed=true;onPatchStatus({id:patch.id,state:'error'});}}finally{patch.loading=false;if(!disposed)onNeedsFrame();}};
   img.onerror=()=>{patch.loading=false;if(!disposed){patch.failed=true;onPatchStatus({id:patch.id,state:'error'});onNeedsFrame();}};img.src=patch.image;
  }
  function status(){const ready=desired.filter(t=>slots.some(s=>s.id===t.id&&s.texture)).length,s={enabled,fullQuality:enabled&&fullBase,renderWidth:baseSize.width,renderHeight:baseSize.height,loading:jobs.size>0,ready,needed:desired.length,loaded:loaded.size,total:manifest.tiles.length,failed:desired.some(t=>failed.has(t.id)),resident:slots.filter(s=>s.texture).length};const key=JSON.stringify(s);if(key!==statusKey){statusKey=key;onStatus(s);}}
  function clearDetails(){desired=[];for(const controller of jobs.values())controller.abort();for(const slot of slots){if(slot.texture)gl.deleteTexture(slot.texture);Object.assign(slot,{id:null,texture:null,meta:null,readyAt:0,used:0});}}
  function candidates(){return desired.filter(t=>!jobs.has(t.id)&&!failed.has(t.id)&&!slots.some(s=>s.id===t.id));}
  function pump(){
   if(disposed||!enabled||!base||fullBase)return;
   while(jobs.size<2){const tile=candidates()[0];if(!tile)break;const controller=new root.AbortController();jobs.set(tile.id,controller);loadTile(tile,controller);}
   status();
  }
  async function loadTile(tile,controller){
   let objectURL=null;
   try{
    const response=await root.fetch(tile.url,{signal:controller.signal});if(!response.ok)throw Error('Detail unavailable');
    const blob=await response.blob();if(disposed||controller.signal.aborted)return;
    objectURL=root.URL.createObjectURL(blob);const img=new root.Image();
    await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=()=>reject(Error('Detail decode failed'));img.src=objectURL;});if(img.decode)await img.decode();
    if(disposed||controller.signal.aborted||!enabled||!desired.some(t=>t.id===tile.id))return;
    if(img.naturalWidth!==tile.width+2*tile.gutter||img.naturalHeight!==tile.height+2*tile.gutter)throw Error('Unregistered tile dimensions');
    const free=slots.find(s=>!s.texture)||slots.filter(s=>!desired.some(t=>t.id===s.id)).sort((a,b)=>a.used-b.used)[0];
    if(!free)return;const next=texture(img);if(free.texture)gl.deleteTexture(free.texture);Object.assign(free,{id:tile.id,texture:next,meta:tile,readyAt:now(),used:++clock});loaded.add(tile.id);onNeedsFrame();
   }catch(error){if(!disposed&&error?.name!=='AbortError')failed.add(tile.id);}
   finally{if(objectURL)root.URL.revokeObjectURL(objectURL);jobs.delete(tile.id);if(!disposed){status();pump();onNeedsFrame();}}
  }
  function plan(c,w,h){
   if(fullBase)return;
   const time=now();
   if(time-lastPlan<120){if(!requestFrame)requestFrame=root.setTimeout(()=>{requestFrame=0;lastPlan=0;onNeedsFrame();},125);return;}
   lastPlan=time;desired=P.requiredTiles(manifest,c,w,h,enabled);for(const slot of slots)if(desired.some(t=>t.id===slot.id))slot.used=++clock;
   for(const [id,controller] of jobs)if(!desired.some(t=>t.id===id))controller.abort();pump();status();
  }
  return {
   setImage(img){let source=img;const maximum=gl.getParameter(gl.MAX_TEXTURE_SIZE),iw=img.naturalWidth,ih=img.naturalHeight;if(iw>maximum||ih>maximum){source=root.document.createElement('canvas');const scale=Math.min(maximum/iw,maximum/ih);source.width=Math.floor(iw*scale);source.height=Math.floor(ih*scale);source.getContext('2d').drawImage(img,0,0,source.width,source.height);}const next=texture(source);if(base)gl.deleteTexture(base);base=next;baseSize={width:source.naturalWidth||source.width,height:source.naturalHeight||source.height};fullBase=baseSize.width===manifest.width&&baseSize.height===manifest.height;clearDetails();lastPlan=0;return{...baseSize};},
   setQuality(value){enabled=value==='high';if(!enabled)clearDetails();else{failed.clear();lastPlan=0;}status();onNeedsFrame();},
   focus(id){wantedPatch=patchStates.find(p=>p.hotspotIds?.includes(id));if(wantedPatch){wantedPatch.failed=false;loadPatch(wantedPatch);}onNeedsFrame();},
   clearDetail(){wantedPatch=null;onNeedsFrame();},
   retry(){failed.clear();for(const p of patchStates)p.failed=false;lastPlan=0;pump();if(wantedPatch)loadPatch(wantedPatch);onNeedsFrame();},
   draw(c,w,h){
    if(disposed||!base||gl.isContextLost())return;plan(c,w,h);
    const ratio=Math.min(root.devicePixelRatio||1,1.5),pw=Math.round(w*ratio),ph=Math.round(h*ratio);if(canvas.width!==pw||canvas.height!==ph){canvas.width=pw;canvas.height=ph;}
    gl.viewport(0,0,pw,ph);gl.useProgram(program);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,base);gl.uniform1i(u.overview,0);
    const weights=[],time=now();let animating=false;
    for(let i=0;i<4;i++){const s=slots[i],t=s.meta;gl.activeTexture(gl.TEXTURE0+i+1);gl.bindTexture(gl.TEXTURE_2D,s.texture||empty);gl.uniform1i(u['tile'+i],i+1);if(t){gl.uniform4f(u['rect'+i],t.u0,t.v0,t.u1-t.u0,t.v1-t.v0);gl.uniform2f(u['gutter'+i],t.gutter/(t.width+2*t.gutter),t.gutter/(t.height+2*t.gutter));}else{gl.uniform4f(u['rect'+i],0,0,0,0);gl.uniform2f(u['gutter'+i],0,0);}const fade=Math.min(1,(time-s.readyAt)/240),weight=enabled&&!fullBase?fade:0;weights.push(weight);if(s.texture&&weight>0&&fade<1)animating=true;}
    const ranked=patchStates.map(p=>{const [x,y,rw,rh]=p.rect,center=M.fromUV(((x+rw/2)/manifest.width)%1,(y+rh/2)/manifest.height);return{patch:p,distance:M.angularDistance(center,c)};}).sort((a,b)=>a.distance-b.distance);
    const requested=ranked.find(r=>r.patch===wantedPatch),nearest=requested&&requested.distance<c.fov/2+15?requested:ranked[0],patch=nearest&&nearest.distance<c.fov+25?nearest.patch:null;
    for(const p of patchStates)if(p!==patch)p.alpha=0;
    if(patch){const [px,py,pw,ph]=patch.rect;
     if(enabled&&c.fov<65)loadPatch(patch);const goal=enabled&&patch.texture?Math.max(0,Math.min(1,(70-c.fov)/25)):0;patch.alpha+=(goal-patch.alpha)*.22;if(Math.abs(goal-patch.alpha)<.002)patch.alpha=goal;else animating=true;
     gl.activeTexture(gl.TEXTURE0+5);gl.bindTexture(gl.TEXTURE_2D,patch.texture||empty);gl.uniform1i(u.reconstruction,5);gl.uniform4f(u.patchRect,px/manifest.width,py/manifest.height,pw/manifest.width,ph/manifest.height);gl.uniform1f(u.patchAmount,patch.alpha);
    }else{gl.uniform1f(u.patchAmount,0);}
    gl.uniform4fv(u.blend,weights);gl.uniform1f(u.yaw,M.rad(c.yaw));gl.uniform1f(u.pitch,M.rad(c.pitch));gl.uniform1f(u.tangent,Math.tan(M.rad(c.fov)/2));gl.uniform1f(u.aspect,w/h);gl.drawArrays(gl.TRIANGLES,0,6);gl.activeTexture(gl.TEXTURE0);if(animating)onNeedsFrame();
   },
   dispose(){disposed=true;for(const controller of jobs.values())controller.abort();jobs.clear();if(requestFrame)root.clearTimeout(requestFrame);for(const s of slots)if(s.texture)gl.deleteTexture(s.texture);for(const p of patchStates)if(p.texture)gl.deleteTexture(p.texture);if(base)gl.deleteTexture(base);gl.deleteTexture(empty);gl.deleteBuffer(buffer);gl.deleteProgram(program);}
  };
 }
 root.SceneSpeakPanoramaDetailRenderer=Object.freeze({create});
})(typeof window!=='undefined'?window:globalThis);
