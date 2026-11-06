/* Resources belong to one native-view load, including failed or superseded loads. */
(function(root){'use strict';
 function gpu(gl){
  const owned=new Map(['Texture','Buffer','Shader','Program'].map(kind=>[kind,new Set()]));let disposed=false;
  function create(kind,...args){if(disposed)throw Error('PANORAMA_RESOURCES_DISPOSED');const set=owned.get(kind);if(!set)throw Error('UNKNOWN_GPU_RESOURCE');const value=gl['create'+kind](...args);if(value)set.add(value);return value;}
  function release(kind,value){if(value&&owned.get(kind)?.delete(value))gl['delete'+kind](value);}
  function dispose(){if(disposed)return;disposed=true;for(const [kind,values]of owned)for(const value of [...values])release(kind,value);}
  return Object.freeze({create,release,dispose});
 }
 function images(){
  const pending=new Set();let disposed=false;
  const aborted=()=>Object.assign(new Error('Panorama image load cancelled'),{name:'AbortError'});
  function load(url,width,height){
   if(disposed)return Promise.reject(aborted());
   return new Promise((resolve,reject)=>{
    const image=new root.Image();image.decoding='async';let settled=false;
    const finish=(error)=>{if(settled)return;settled=true;pending.delete(cancel);image.onload=image.onerror=null;if(error)reject(error);else resolve(image);};
    const cancel=()=>{if(settled)return;finish(aborted());image.removeAttribute('src');};pending.add(cancel);
    image.onerror=()=>finish(new Error('Panorama image unavailable: '+url));
    image.onload=async()=>{try{if(typeof image.decode==='function')await image.decode();if(settled)return;if(disposed)return cancel();if(!image.naturalWidth||(width&&image.naturalWidth!==width)||(height&&image.naturalHeight!==height))throw Error('Unexpected panorama image dimensions: '+url);finish();}catch(error){finish(error);}};
    image.src=url;
   });
  }
  function dispose(){if(disposed)return;disposed=true;for(const cancel of [...pending])cancel();}
  return Object.freeze({load,dispose});
 }
 const api=Object.freeze({gpu,images});root.SceneSpeakNativeResources=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
