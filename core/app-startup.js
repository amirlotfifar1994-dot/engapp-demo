/* Reveal only the final shell after the requested lesson, mode and photograph
   are ready. Older renderers may run during initialization, but stay hidden. */
(function(root){
  'use strict';
  const lessonLabel=id=>root.EngBookCoursePath?.label(id)||String(id).padStart(2,'0');
  let phase='loading',job=null;
  const doc=root.document,app=()=>doc.getElementById('app'),panel=()=>doc.getElementById('app-startup');
  function message(text){const el=doc.querySelector('[data-startup-message]');if(el)el.textContent=text;}
  function requested(){const ready=root.EngBookContent?.snapshot?.().readyLessons||[];return root.EngBookDeepLinks?.parse(root.location.search,{maxLesson:Math.max(60,...ready)})||{validLesson:false};}
  async function preparePicture(){
    const img=doc.querySelector('#app .scene-image');
    if(!img)return;
    if(img.decode)await img.decode();
    else if(!img.complete)await new Promise((resolve,reject)=>{img.addEventListener('load',resolve,{once:true});img.addEventListener('error',()=>reject(new Error('SCENE_IMAGE_UNAVAILABLE')),{once:true});});
    if(!img.naturalWidth)throw new Error('SCENE_IMAGE_UNAVAILABLE');
    // Let the existing cover/subject-focus calculation finish before revealing it.
    await new Promise(resolve=>root.requestAnimationFrame(resolve));
  }
  async function boot(){
    const started=Date.now();
    phase='loading';doc.documentElement.classList.add('app-starting');
    app()?.setAttribute('inert','');app()?.setAttribute('aria-busy','true');
    if(panel()){panel().hidden=false;panel().setAttribute?.('data-state','loading');}
    const retry=doc.querySelector('[data-startup-retry]');if(retry)retry.hidden=true;
    try{
      const route=requested(),available=route.validLesson&&root.EngBookContent.canOpen(route.lesson);
      message(available?`Opening lesson ${lessonLabel(route.lesson)}…`:'Loading SceneSpeak…');
      if(available){if(!await root.v49ApplyDeepLink())throw new Error('LESSON_STARTUP_FAILED');}
      else root.renderHome();
      root.render();
      await preparePicture();
      // A brief, bounded splash prevents an unreadable flash on cached reloads.
      // Actual lesson/image loading counts toward this time; slow loads add no delay.
      const remaining=900-(Date.now()-started);
      if(remaining>0)await new Promise(resolve=>root.setTimeout(resolve,remaining));
      phase='ready';app()?.removeAttribute('inert');app()?.removeAttribute('aria-busy');
      doc.documentElement.classList.remove('app-starting');if(panel())panel().hidden=true;
      return true;
    }catch(error){
      phase='error';message('Your scene could not load. Check your connection and try again.');
      panel()?.setAttribute?.('data-state','error');
      if(retry)retry.hidden=false;
      root.v21PushError?.(error,'app-startup');return false;
    }
  }
  function start(){if(job)return job;if(phase==='ready')return Promise.resolve(true);job=boot().finally(()=>{job=null;});return job;}
  doc.querySelector('[data-startup-retry]')?.addEventListener('click',start);
  root.EngBookStartup=Object.freeze({start,get pending(){return phase!=='ready';},get phase(){return phase;}});
  // DOMContentLoaded waits for all ordered scripts, not unrelated image downloads.
  if(doc.readyState==='loading')doc.addEventListener('DOMContentLoaded',start,{once:true});else root.queueMicrotask(start);
})(typeof window!=='undefined'?window:globalThis);
