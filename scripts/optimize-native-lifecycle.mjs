import fs from 'node:fs/promises';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),read=f=>fs.readFile(path.join(root,f),'utf8'),write=(f,s)=>fs.writeFile(path.join(root,f),s);
function replace(s,from,to){if(!s.includes(from))throw Error('Review changed native lifecycle source: '+from.slice(0,85));return s.replace(from,to);}
for(const n of [1,2]){
 const file=`core/lesson${n}-panorama-viewer.js`;let s=await read(file);
 if(!s.includes('let gpuPool=null,imageLoads=null;')){
  s=replace(s,' root.SceneSpeakTalkCamera=', ' let gpuPool=null,imageLoads=null;\n root.SceneSpeakTalkCamera=');
  s=replace(s,' function shader(type,source)',` function clearResources(){root.cancelAnimationFrame(frame);frame=0;detail?.dispose();detail=null;imageLoads?.dispose();imageLoads=null;gpuPool?.dispose();gpuPool=null;texture=null;program=null;${n===2?'backTexture=frontTexture=null;imageCache.clear();':'highQuality=false;'}}\n function shader(type,source)`);
  for(const kind of ['Texture','Buffer','Program'])s=s.replaceAll(`gl.create${kind}()`,`gpuPool.create('${kind}')`);
  s=s.replaceAll('gl.createShader(',"gpuPool.create('Shader',");
  s=s.replaceAll('gl.deleteTexture(',"gpuPool.release('Texture',");
  if(n===1){
   s=replace(s,'const version=++loadVersion;ready=false;',"const version=++loadVersion;clearResources();imageLoads=root.SceneSpeakNativeResources.images();ready=false;");
   s=replace(s,"if(!gl)throw Error('WebGL unavailable');program=", "if(!gl)throw Error('WebGL unavailable');gpuPool=root.SceneSpeakNativeResources.gpu(gl);program=");
   const a=s.indexOf('const img=new Image();'),b=s.indexOf("texture=gpuPool.create('Texture')",a);if(a<0||b<0)throw Error('Review Garden image loader');
   s=s.slice(0,a)+"const img=await imageLoads.load(D.image.high,D.image.width,D.image.height);if(dead||version!==loadVersion)return;"+s.slice(b);
   s=replace(s,"if(dead||version!==loadVersion)return;ready=false;$('garden-loading').hidden=true;", "if(dead||version!==loadVersion)return;clearResources();ready=false;$('garden-loading').hidden=true;");
   s=replace(s,'loadVersion++;ready=false;', 'loadVersion++;clearResources();ready=false;');
   s=replace(s,"dead=true;detail?.dispose();cancelAnimationFrame(frame);if(gl){gpuPool.release('Texture',texture);gl.deleteProgram(program);}", 'dead=true;loadVersion++;ready=false;clearResources();');
  }else{
   const a=s.indexOf(' function readImage('),b=s.indexOf('\n function upload(',a);if(a<0||b<0)throw Error('Review Cafe image cache');
   s=s.slice(0,a)+" function readImage(url,width,height){if(imageCache.has(url))return imageCache.get(url);const job=imageLoads.load(url,width,height);imageCache.set(url,job);job.catch(()=>{if(imageCache.get(url)===job)imageCache.delete(url);});while(imageCache.size>4)imageCache.delete(imageCache.keys().next().value);return job;}"+s.slice(b);
   s=replace(s,"async function load(){try{", "async function load(){const epoch=++resourceEpoch;ready=false;canvas.dataset.ready='false';clearResources();imageLoads=root.SceneSpeakNativeResources.images();$('garden-loading').hidden=false;$('garden-error').hidden=true;try{");
   s=replace(s,"if(!gl)throw Error('WebGL unavailable');program=", "if(!gl)throw Error('WebGL unavailable');gpuPool=root.SceneSpeakNativeResources.gpu(gl);program=");
   s=replace(s,'const node=tour.node,epoch=++resourceEpoch,img=','const node=tour.node,img=');
   s=replace(s,'height);texture=upload(img,0);','height);if(dead||epoch!==resourceEpoch)return;texture=upload(img,0);');
   s=replace(s,"}catch(e){ready=false;$('garden-loading').hidden=true;", "}catch(e){if(dead||epoch!==resourceEpoch)return;clearResources();ready=false;$('garden-loading').hidden=true;");
   s=replace(s,"function animate(duration,step){return new Promise", "function animate(duration,step){const epoch=resourceEpoch;return new Promise");
   s=replace(s,'if(dead||state.locked||!ready){','if(dead||epoch!==resourceEpoch||state.locked||!ready){');
   s=replace(s,'resourceEpoch++;const next=upload', 'const transitionEpoch=++resourceEpoch;const next=upload');
   s=replace(s,'if(!ok||resourceEpoch!==epoch+1){', 'if(dead||transitionEpoch!==resourceEpoch)return false;if(!ok){');
   s=replace(s,'ready=false;resourceEpoch++;canvas.dataset.ready=', 'ready=false;resourceEpoch++;clearResources();canvas.dataset.ready=');
   s=replace(s,"resourceEpoch++;detail?.dispose();cancelAnimationFrame(frame);if(gl){gpuPool.release('Texture',texture);gpuPool.release('Texture',backTexture);gpuPool.release('Texture',frontTexture);gl.deleteProgram(program);}", 'resourceEpoch++;ready=false;clearResources();');
  }
  await write(file,s);
 }
 const html=n===1?'garden360-lesson1.html':'cafe360-lesson2.html';s=await read(html);if(!s.includes('core/native-panorama-resources.js'))s=replace(s,`<script src="core/lesson${n}-panorama-viewer.js`,`<script src="core/native-panorama-resources.js" defer></script><script src="core/lesson${n}-panorama-viewer.js`);await write(html,s);
}
let detail=await read('core/lesson1-panorama-detail.js');
if(!detail.includes('const imageLoads=root.SceneSpeakNativeResources.images();')){
 detail=replace(detail,'let disposed=false,loaded=0;', 'const imageLoads=root.SceneSpeakNativeResources.images();let disposed=false,loaded=0;');
 const a=detail.indexOf('const img=new Image();'),b=detail.indexOf('gl.useProgram(program);',a);if(a<0||b<0)throw Error('Review Garden detail image loader');
 detail=detail.slice(0,a)+'const img=await imageLoads.load(row.image,row.width,row.height);if(disposed)return;'+detail.slice(b);
 detail=replace(detail,'dispose(){disposed=true;for(', 'dispose(){if(disposed)return;disposed=true;imageLoads.dispose();for(');await write('core/lesson1-panorama-detail.js',detail);
}
console.log('Native panorama load resources are scoped and cancellable');
