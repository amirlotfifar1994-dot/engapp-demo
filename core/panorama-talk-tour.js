/* Shared, cancellable camera introduction and still-frame stage for picture conversations. */
(function(root){'use strict';
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),smooth=t=>t*t*(3-2*t);
 function pose(initial,elapsed,reduced=false){const f=clamp(initial.fov||80,65,95),p=clamp(initial.pitch||0,-20,20),y=initial.yaw||0;
  if(reduced||elapsed>=7100)return {yaw:y,pitch:p,fov:clamp(f*.85,52,82),done:true};
  if(elapsed<5600)return {yaw:y-35+70*smooth(clamp(elapsed/5600,0,1)),pitch:p,fov:f,done:false};
  const t=smooth(clamp((elapsed-5600)/1500,0,1));return {yaw:y+35*(1-t),pitch:p,fov:f+(clamp(f*.85,52,82)-f)*t,done:false};
 }
 function camera(adapter){let run=null,parked=null;
  function cancel(){root.document?.body?.classList.remove('talk-camera-active');if(!run){if(parked){adapter.set(parked);adapter.draw();parked=null;}return;}const r=run;run=null;root.cancelAnimationFrame(r.raf);adapter.set(r.before);adapter.draw();r.resolve(null);}
  function start({reduced=false,onPhase}={}){cancel();if(!adapter.ready())return Promise.resolve(null);return new Promise(resolve=>{root.document?.body?.classList.add('talk-camera-active');const r=run={before:adapter.get(),resolve,raf:0,time:null};
   function step(time){if(run!==r)return;if(r.time===null)r.time=time;const p=pose(adapter.initial,time-r.time,reduced);adapter.set(p);adapter.draw();
    if(p.done){if(r.settledAt==null){r.settledAt=time;onPhase?.('preparing');}if(adapter.settled&&!adapter.settled()&&time-r.settledAt<clamp(adapter.settleTimeout??2000,0,4000)){r.raf=root.requestAnimationFrame(step);return;}let image=null;try{image=adapter.capture?adapter.capture():adapter.canvas.toDataURL('image/jpeg',.94);}catch{}parked=r.before;run=null;r.resolve(image);return;}r.raf=root.requestAnimationFrame(step);}
   r.raf=root.requestAnimationFrame(step);
  });}
  return {start,cancel,ready:adapter.ready};
 }
 let active=null,serial=0;
 function clear(){if(!active)return;const a=active;active=null;serial++;root.clearTimeout(a.timer);root.clearTimeout(a.timeout);try{a.frame.contentWindow.SceneSpeakTalkCamera?.cancel();}catch{}a.stage.remove();a.controls.remove();root.document.body.classList.remove('talk-touring','talk-still');root.document.querySelector('.talk-page')?.removeAttribute('inert');}
 function mount(s,frame,host){if(s?.mode!=='talk'||s.screen!=='lesson'){if(active?.frame===frame)clear();return;}
  const key=Number(s.lesson.id);if(active?.frame===frame&&active.key===key)return;clear();
  const d=root.document,stage=d.createElement('div'),image=d.createElement('img'),controls=d.createElement('div'),label=d.createElement('span'),skip=d.createElement('button');
  stage.className='talk-still-stage';stage.hidden=true;image.alt='A still overview of '+(s.lesson.title||'this lesson');stage.append(image);host.append(stage);
  controls.className='talk-tour-controls';controls.setAttribute('role','status');label.textContent='Take in the scene';skip.type='button';skip.textContent='Skip movement';controls.append(label,skip);d.body.append(controls);
  const token=++serial,a=active={key,frame,stage,controls,timer:0,started:false};d.body.classList.add('talk-touring');d.querySelector('.talk-page')?.setAttribute('inert','');
  function finish(src){if(active!==a||token!==serial)return;root.clearTimeout(a.timer);d.body.classList.remove('talk-touring');d.querySelector('.talk-page')?.removeAttribute('inert');controls.remove();if(src){image.src=src;stage.hidden=false;d.body.classList.add('talk-still');stage.dataset.ready='true';}d.querySelector('.talk-question')?.focus({preventScroll:true});}
  function begin(reduced=false){if(active!==a)return;try{const api=frame.contentWindow.SceneSpeakTalkCamera;if(!api?.ready()){a.timer=root.setTimeout(()=>begin(reduced),120);return;}a.started=true;const request=a.request=(a.request||0)+1;api.start({reduced,onPhase:()=>{if(active===a)label.textContent='Preparing a clear picture';}}).then(src=>{if(request===a.request)finish(src);},()=>{if(request===a.request)finish(null);});}catch{finish(null);}}
  skip.onclick=()=>{root.clearTimeout(a.timer);a.request=(a.request||0)+1;try{frame.contentWindow.SceneSpeakTalkCamera?.cancel();}catch{}begin(true);};
  a.timer=root.setTimeout(()=>begin(Boolean(root.matchMedia?.('(prefers-reduced-motion: reduce)').matches)),80);
  // Loading/graphics errors must never hold the conversation behind an introduction.
  a.timeout=root.setTimeout(()=>{if(active===a&&d.body.classList.contains('talk-touring')){try{frame.contentWindow.SceneSpeakTalkCamera?.cancel();}catch{}finish(null);}},16000);
 }
 function unmount(frame){if(frame&&active?.frame===frame){if(active)root.clearTimeout(active.timeout);clear();}}
 const api={pose,camera,mount,unmount};root.SceneSpeakTalkTour=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
