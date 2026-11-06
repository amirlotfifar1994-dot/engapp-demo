/* The public native viewer loads only the selected world's dependencies. */
(function(root){'use strict';
 const files=/* DEMO_SCENES */{"park":[{"src":"core/panorama-park-data.js?v=372a91b22e95","global":"SceneSpeakPanoramaPark"}],"home":[{"src":"core/panorama-home-manifest.js?v=2f43d30d7c1d","global":"SceneSpeakHomeManifest"},{"src":"core/panorama-home-granular.js?v=f0c1a6819f12","global":"SceneSpeakHomeGranular"},{"src":"core/panorama-home-data.js?v=10ac07548301","global":"SceneSpeakPanoramaHome"}],"museum":[{"src":"core/panorama-museum-data.js?v=5f7423dd228a","global":"SceneSpeakPanoramaMuseum"}],"park-next":[{"src":"core/panorama-park-data.js?v=372a91b22e95","global":"SceneSpeakPanoramaPark"}]}/* END_DEMO_SCENES */;
 const query=new URLSearchParams(root.location.search),requested=query.get('scene'),scene=Object.hasOwn(files,requested)?requested:'park';
 function script(row){return new Promise((resolve,reject)=>{
  const element=root.document.createElement('script');let settled=false;
  const finish=error=>{if(settled)return;settled=true;root.clearTimeout(timer);element.onload=element.onerror=null;if(error){element.remove();reject(error);}else resolve();};
  const timer=root.setTimeout(()=>finish(new Error('SCENE_DATA_TIMEOUT')),30000);
  element.async=false;element.src=row.src;element.dataset.demoScene=scene;
  element.onload=()=>finish();element.onerror=()=>finish(new Error('SCENE_DATA_UNAVAILABLE'));root.document.head.append(element);
 });}
 function failure(){
  const doc=root.document,label=doc.querySelector('#pano-loading span'),retry=doc.getElementById('pano-retry'),back=doc.getElementById('pano-load-back');
  if(label)label.textContent='The lesson data could not load. Please try again.';
  if(retry){retry.hidden=false;retry.onclick=()=>root.location.reload();}if(back)back.hidden=false;
  const id=Number(query.get('coreLesson'));if(root.parent!==root&&query.get('embedded')==='1'&&Number.isInteger(id)&&id>0)root.parent.postMessage({channel:'scenespeak-panorama-core-v1',type:'error',lessonId:id},root.location.origin);
 }
 const ready=(async()=>{try{
  for(const row of files[scene]){await script(row);if(!root[row.global])throw new Error('SCENE_DATA_INVALID');}
  return Object.freeze({ok:true,scene});
 }catch(error){failure();return Object.freeze({ok:false,scene,error:String(error.message||error)});}})();
 root.SceneSpeakDemoSceneLoader=Object.freeze({scene,ready});
})(window);
