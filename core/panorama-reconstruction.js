/* Registered AI detail regions use the same spherical rays as the overview. */
(function(root){
 'use strict';
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 function regionUV(rect,width,height){return [rect[0]/width,rect[1]/height,rect[2]/width,rect[3]/height];}
 function localUV(u,v,region){return [(u-region[0])/region[2],(v-region[1])/region[3]];}
 const detailAmount=fov=>clamp((100-fov)/20,0,1);
 const paintOrder=photos=>[...photos].sort((a,b)=>b.rect[2]*b.rect[3]-a.rect[2]*a.rect[3]||a.id.localeCompare(b.id));
 /* A spherical bound also works when the view straddles the panorama seam. */
 function visibleRegions(photos,camera,width,height,source,M){
  if(detailAmount(camera.fov)===0||width<=0||height<=0)return [];
  const half=M.deg(Math.atan(Math.tan(M.rad(camera.fov)/2)*Math.hypot(width/height,1)));
  return photos.filter(p=>{const [x,y,w,h]=p.rect,center=M.fromUV((x+w/2)/source.width,(y+h/2)/source.height);
   const radius=Math.hypot(w/source.width*180,h/source.height*90);
   return M.angularDistance(center,camera)<half+radius+4;
  });
 }
 function createSelection(){
  let wanted=null,active=null,pending=null,alpha=0;
  return {
   select(id){wanted=id||null;pending=null;},
   arrive(id,payload){if(id!==wanted)return false;if(active?.id!==id)pending={...payload,id};return true;},
   frame(ms,fov){
    if(pending&&alpha<.01){active=pending;pending=null;alpha=0;}
    const goal=active&&active.id===wanted?clamp((72-fov)/22,0,1):0;
    alpha+=(goal-alpha)*(1-Math.exp(-clamp(ms,1,70)/130));
    if(Math.abs(goal-alpha)<.002)alpha=goal;
    if(!wanted&&alpha===0)active=null;
    return {active,alpha,needsFrame:Math.abs(goal-alpha)>.002||Boolean(pending)};
   }
  };
 }
 function create({canvas,data,math:M,onNeedsFrame=()=>{},onStatus=()=>{}}){
  const gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,stencil:false,preserveDrawingBuffer:false});if(!gl)return null;
  const compile=(type,code)=>{const shader=gl.createShader(type);gl.shaderSource(shader,code);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){gl.deleteShader(shader);throw Error('Reconstruction shader unavailable');}return shader;};
  const vertex=compile(gl.VERTEX_SHADER,'attribute vec2 position;varying vec2 screen;void main(){screen=position;gl_Position=vec4(position,0.,1.);}');
  const precision=gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.HIGH_FLOAT)?.precision?'highp':'mediump';
  const fragment=compile(gl.FRAGMENT_SHADER,`precision ${precision} float;varying vec2 screen;
   uniform sampler2D picture;uniform sampler2D detail;uniform float yaw;uniform float pitch;uniform float tangent;uniform float aspect;
   uniform vec4 detailRect;uniform vec4 paintBounds;uniform float detailAmount;uniform vec3 detailGain;uniform vec3 detailBias;
   void main(){
    vec3 r=normalize(vec3(screen.x*tangent*aspect,screen.y*tangent,1.));
    float yy=r.y*cos(pitch)+r.z*sin(pitch);float zz=r.z*cos(pitch)-r.y*sin(pitch);
    float xx=r.x*cos(yaw)+zz*sin(yaw);float z=zz*cos(yaw)-r.x*sin(yaw);
    vec2 uv=vec2(fract(atan(xx,z)/6.28318530718+.5),.5-asin(clamp(yy,-1.,1.))/3.14159265359);
    if(detailAmount<0.){gl_FragColor=texture2D(picture,uv);return;}
    vec2 p=(uv-detailRect.xy)/detailRect.zw;
    if(p.x>=paintBounds.x&&p.x<=paintBounds.z&&p.y>=paintBounds.y&&p.y<=paintBounds.w){
     vec2 edge=min(p-paintBounds.xy,paintBounds.zw-p);float feather=smoothstep(0.,.10,min(edge.x,edge.y));
     vec3 restored=clamp(texture2D(detail,p).rgb*detailGain+detailBias,0.,1.);
     gl_FragColor=vec4(restored,detailAmount*feather);
    }else{discard;}
   }`);
  const program=gl.createProgram();gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);gl.deleteShader(vertex);gl.deleteShader(fragment);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Reconstruction program unavailable');
  gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const attribute=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(attribute);gl.vertexAttribPointer(attribute,2,gl.FLOAT,false,0,0);
  const uniforms=Object.fromEntries(['picture','detail','yaw','pitch','tangent','aspect','detailRect','paintBounds','detailAmount','detailGain','detailBias'].map(k=>[k,gl.getUniformLocation(program,k)]));
  const photos=new Map(data.reconstructions.map(p=>[p.id,p])),hotspots=new Map(data.hotspots.map(h=>[h.id,h]));
  const cache=new Map(),loads=new Map(),failed=new Set(),amounts=new Map(),limit=10;let base=null,disposed=false,lastTime=0,wanted=null;
  function room(visible){
   if(cache.size+loads.size<limit)return true;
   const oldest=[...cache.values()].filter(p=>!visible.has(p.id)&&p.id!==wanted).sort((a,b)=>(a.lastUsed||0)-(b.lastUsed||0))[0];
   if(!oldest)return false;gl.deleteTexture(oldest.texture);cache.delete(oldest.id);amounts.delete(oldest.id);return true;
  }
  function upload(img){
   const texture=gl.createTexture();gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texture);
   gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
   try{let source=img;const max=gl.getParameter(gl.MAX_TEXTURE_SIZE);if(img.width>max||img.height>max){const c=root.document.createElement('canvas'),scale=Math.min(max/img.width,max/img.height);c.width=Math.floor(img.width*scale);c.height=Math.floor(img.height*scale);c.getContext('2d').drawImage(img,0,0,c.width,c.height);source=c;}
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,source);if(gl.getError()!==gl.NO_ERROR)throw Error('Reconstruction texture upload failed');return {texture,width:source.width,height:source.height};
   }catch(error){gl.deleteTexture(texture);throw error;}
  }
  function load(id){
   const photo=photos.get(id);if(!photo||disposed||loads.has(id)||failed.has(id))return;
   if(cache.has(id)){onStatus({id,state:'ready'});return;}
   if(loads.size>=2||cache.size+loads.size>=limit)return;
   onStatus({id,state:'loading'});
   const img=new root.Image();loads.set(id,img);img.onload=async()=>{
    try{if(img.decode)await img.decode();if(disposed)return;const uploaded=upload(img),item={...photo,...uploaded,region:regionUV(photo.rect,data.image.width,data.image.height)};cache.set(id,item);onStatus({id,state:'ready'});
    }catch{if(!disposed){failed.add(id);onStatus({id,state:'error'});}}finally{loads.delete(id);if(!disposed)onNeedsFrame();}
   };
   img.onerror=()=>{loads.delete(id);if(!disposed){failed.add(id);onStatus({id,state:'error'});onNeedsFrame();}};img.src=photo.image;
  }
  function focus(hotspotId){
   wanted=hotspots.get(hotspotId)?.reconstructionId||null;
   if(wanted){failed.delete(wanted);load(wanted);}onNeedsFrame();
  }
  return {
   setImage(img){const next=upload(img);if(base)gl.deleteTexture(base.texture);base=next;return {width:next.width,height:next.height};},
   focus,
   clearDetail(){wanted=null;onNeedsFrame();},
   retry(){failed.clear();if(wanted)load(wanted);onNeedsFrame();},
   captureReady(camera,width,height){const distance=p=>M.angularDistance(M.fromUV((p.rect[0]+p.rect[2]/2)/data.image.width,(p.rect[1]+p.rect[3]/2)/data.image.height),camera);const priority=visibleRegions([...photos.values()],camera,width,height,data.image,M).sort((a,b)=>distance(a)-distance(b)).slice(0,2);return priority.every(p=>failed.has(p.id)||cache.has(p.id)&&(amounts.get(p.id)||0)>=detailAmount(camera.fov)*.95);},
   status:()=>({loaded:cache.size,total:photos.size,loading:loads.size,failed:failed.size,limit}),
   draw(camera,width,height){
    if(disposed||!base||gl.isContextLost())return;
    const now=root.performance.now(),ms=lastTime?now-lastTime:16;lastTime=now;
    const distance=p=>M.angularDistance(M.fromUV((p.rect[0]+p.rect[2]/2)/data.image.width,(p.rect[1]+p.rect[3]/2)/data.image.height),camera);
    const nearby=visibleRegions([...photos.values()],camera,width,height,data.image,M).sort((a,b)=>Number(b.id===wanted)-Number(a.id===wanted)||distance(a)-distance(b));
    const visible=new Set(nearby.map(p=>p.id));
    if(wanted)visible.add(wanted);
    /* Two concurrent decodes keep a mobile device responsive while turning. */
    for(const id of [wanted,...visible])if(id&&loads.size<2&&!cache.has(id)&&!loads.has(id)&&!failed.has(id)&&room(visible))load(id);
    let animating=false;
    const ratio=Math.min(root.devicePixelRatio||1,1.5),pw=Math.round(width*ratio),ph=Math.round(height*ratio);if(canvas.width!==pw||canvas.height!==ph){canvas.width=pw;canvas.height=ph;}
    gl.viewport(0,0,pw,ph);gl.useProgram(program);
    gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,base.texture);gl.uniform1i(uniforms.picture,0);
    gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,base.texture);gl.uniform1i(uniforms.detail,1);
    gl.uniform4fv(uniforms.detailRect,[0,0,1,1]);gl.uniform4fv(uniforms.paintBounds,[0,0,1,1]);gl.uniform1f(uniforms.detailAmount,-1);
    gl.uniform3fv(uniforms.detailGain,[1,1,1]);gl.uniform3fv(uniforms.detailBias,[0,0,0]);
    gl.uniform1f(uniforms.yaw,M.rad(camera.yaw));gl.uniform1f(uniforms.pitch,M.rad(camera.pitch));gl.uniform1f(uniforms.tangent,Math.tan(M.rad(camera.fov)/2));gl.uniform1f(uniforms.aspect,width/height);
    gl.disable(gl.BLEND);gl.drawArrays(gl.TRIANGLES,0,6);
    /* Each crop is a separate transparent pass: one ready region cannot erase another. */
    gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
    for(const current of paintOrder(cache.values())){
     const id=current.id,goal=visible.has(id)?detailAmount(camera.fov):0,old=amounts.get(id)||0;if(visible.has(id))current.lastUsed=now;
     let alpha=old+(goal-old)*(1-Math.exp(-clamp(ms,1,70)/130));if(Math.abs(goal-alpha)<.002)alpha=goal;
     amounts.set(id,alpha);animating=animating||alpha!==goal;if(alpha<=0)continue;
     gl.bindTexture(gl.TEXTURE_2D,current.texture);gl.uniform4fv(uniforms.detailRect,current.region);gl.uniform1f(uniforms.detailAmount,alpha);
     gl.uniform4fv(uniforms.paintBounds,current.paintBounds||[0,0,1,1]);
     gl.uniform3fv(uniforms.detailGain,current.gain||[1,1,1]);gl.uniform3fv(uniforms.detailBias,current.bias||[0,0,0]);gl.drawArrays(gl.TRIANGLES,0,6);
    }
    gl.disable(gl.BLEND);if(animating)onNeedsFrame();
   },
   dispose(){disposed=true;for(const img of loads.values()){img.onload=null;img.onerror=null;}loads.clear();for(const item of cache.values())gl.deleteTexture(item.texture);cache.clear();if(base)gl.deleteTexture(base.texture);gl.deleteBuffer(buffer);gl.deleteProgram(program);}
  };
 }
 const api=Object.freeze({create,regionUV,localUV,createSelection,visibleRegions,detailAmount,paintOrder});root.SceneSpeakPanoramaReconstruction=api;
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
