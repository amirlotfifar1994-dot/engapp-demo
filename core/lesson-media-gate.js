/* Every canonical lesson waits for its own decoded photograph before opening. */
(function(root){
 'use strict';
 const doc=root.document;let active=null,sequence=0;
 const abortError=()=>Object.assign(new Error('LESSON_OPEN_CANCELLED'),{code:'LESSON_OPEN_CANCELLED'});
 function begin(id,{shouldOpen=()=>true}={}){
  active?.cancel();const token=++sequence,state=root.EngBookEventContext?.getRoot('state');
  const silent=Boolean(root.EngBookStartup?.pending)||(state?.screen==='lesson'&&Number(state.lesson?.id)===Number(id));
  let cancelled=false,ended=false,committed=false,panel=null,rejectImage=null,cleanupImage=()=>{};
  const valid=()=>!cancelled&&!ended&&token===sequence&&shouldOpen();
  const stage=text=>{const message=panel?.querySelector('[data-media-message]');if(message)message.textContent=text;};
  function finish(){if(ended)return;ended=true;cleanupImage();if(panel){if(panel.open)panel.close();panel.remove();}if(active===ticket)active=null;}
  function cancel(){if(cancelled||ended||committed)return;cancelled=true;rejectImage?.(abortError());finish();}
  async function prepare(src){
   if(!valid())throw abortError();if(!src)throw new Error('SCENE_IMAGE_UNAVAILABLE');stage('Loading your picture…');
   const img=new root.Image();img.decoding='async';img.fetchPriority='high';
   await new Promise((resolve,reject)=>{
    let settled=false;const fail=error=>{if(settled)return;settled=true;cleanupImage();reject(error);},done=()=>{if(settled)return;if(!img.naturalWidth)return fail(new Error('SCENE_IMAGE_UNAVAILABLE'));settled=true;cleanupImage();resolve();};
    rejectImage=fail;const timeout=root.setTimeout(()=>fail(new Error('SCENE_IMAGE_TIMEOUT')),90000);
    cleanupImage=()=>{root.clearTimeout(timeout);img.onload=null;img.onerror=null;rejectImage=null;};
    img.onerror=()=>fail(new Error('SCENE_IMAGE_UNAVAILABLE'));
    if(typeof img.decode!=='function')img.onload=done;
    img.src=src;if(typeof img.decode==='function')img.decode().then(done,()=>fail(new Error('SCENE_IMAGE_UNAVAILABLE')));
    else if(img.complete)done();
   });
   if(!valid())throw abortError();stage('Getting your scene ready…');return img;
  }
  async function painted(){
   const img=doc.querySelector('#app .scene-image');if(img){if(typeof img.decode==='function')await img.decode();if(!img.naturalWidth)throw new Error('SCENE_IMAGE_UNAVAILABLE');}
   await new Promise(resolve=>root.requestAnimationFrame(()=>root.requestAnimationFrame(resolve)));
  }
  function commit(){committed=true;const button=panel?.querySelector('[data-media-cancel]');if(button)button.disabled=true;}
  const ticket={id:Number(id),valid,cancel,prepare,painted,commit,finish};active=ticket;
  if(!silent){
   panel=doc.createElement('dialog');panel.className='lesson-media-loading';panel.setAttribute('aria-labelledby','lesson-media-title');
   panel.innerHTML='<img src="assets/brand/scenespeak-loading-v2.webp" alt="" width="240" height="240"><p class="lesson-media-kicker">SCENESPEAK</p><h2 id="lesson-media-title">A picture worth exploring.</h2><p data-media-message role="status" aria-live="polite">Loading your lesson…</p><div class="lesson-media-pulse" aria-hidden="true"><i></i><i></i><i></i></div><button type="button" data-media-cancel>Cancel opening</button>';
   doc.body.append(panel);panel.querySelector('[data-media-cancel]').addEventListener('click',cancel);panel.addEventListener('cancel',event=>{event.preventDefault();cancel();});panel.showModal();
  }
  return ticket;
 }
 root.addEventListener?.('popstate',()=>active?.cancel());root.addEventListener?.('pagehide',()=>active?.cancel());
 root.EngBookLessonMedia=Object.freeze({begin,cancel:()=>active?.cancel()});
})(typeof window!=='undefined'?window:globalThis);
