/* A short, interruptible demonstration using the real picture and detail cards.
   Preview selections never call discovery, speech, haptics or progress storage. */
(function(root){
  'use strict';
  const state=()=>root.EngBookEventContext?.getRoot('state');
  const canvas=()=>root.EngBookSceneCanvas;
  const offered=new Set();
  let run=null,pending=null,generation=0;
  const timers=new Set();
  const motion=root.matchMedia?.('(prefers-reduced-motion: reduce)');
  const reduced=()=>Boolean(motion?.matches);
  const validPoint=h=>Number.isFinite(h?.x)&&Number.isFinite(h?.y);
  const parent=h=>h?.presentation?.parentId??h?.parentId;
  function plan(lesson){
    const hs=lesson?.hotspots||[],focus=root.v99ResolveSceneFocus?.(lesson)||{x:50,y:50};
    const children=h=>hs.filter(c=>parent(c)===h.id&&validPoint(c));
    const authored=lesson?.presentation?.previewHotspotIds;
    if(Array.isArray(authored)){
      const first=hs.find(h=>h.id===authored[0]&&!parent(h)&&validPoint(h));
      const next=first&&children(first).find(h=>h.id===authored[1]);
      if(first)return [first,next].filter(Boolean).map(h=>hs.indexOf(h));
    }
    const candidates=hs.filter(h=>!parent(h)&&validPoint(h)&&children(h).length);
    const score=h=>(h.type==='person'?0:h.type==='group'?60:120)+Math.hypot(h.x-focus.x,h.y-focus.y)*.4-Math.min(8,children(h).length)*1.5+(/\b(background|distant|rear|back|far-right|window-side)\b/i.test(h.en||'')?24:0);
    const first=candidates.sort((a,b)=>score(a)-score(b))[0]||hs.find(h=>!parent(h)&&validPoint(h));
    if(!first)return [];
    const next=children(first).sort((a,b)=>(a.type==='person'?0:1)-(b.type==='person'?0:1)||Math.hypot(a.x-first.x,a.y-first.y)-Math.hypot(b.x-first.x,b.y-first.y))[0];
    return [first,next].filter(Boolean).map(h=>hs.indexOf(h));
  }
  function eligible(){
    const s=state();return Boolean(s?.screen==='lesson'&&s.mode==='explore'&&s.lesson&&s.selected==null&&!root.document.hidden);
  }
  const current=()=>Boolean(run&&state()?.screen==='lesson'&&state()?.mode==='explore'&&state()?.lesson?.id===run.lesson&&stage()?.isConnected);
  function remember(id){offered.add(id);try{root.sessionStorage?.setItem(`scenespeak.picture-preview.v1.${id}`,'1');}catch{}}
  function seen(id){if(offered.has(id))return true;try{return root.sessionStorage?.getItem(`scenespeak.picture-preview.v1.${id}`)==='1';}catch{return false;}}
  function later(fn,ms){const token=generation,id=root.setTimeout(()=>{timers.delete(id);if(token!==generation)return;if(run&&!current()){stop({clear:true});return;}fn();},ms);timers.add(id);return id;}
  function stage(){return root.document.querySelector('.scene-canvas-stage');}
  function cleanUI(){
    root.document.querySelector('.scene-preview-hud')?.remove();
    root.document.querySelector('.scene-preview-touch')?.remove();
    root.document.querySelector('.scene-canvas')?.classList.remove('is-scene-preview');
  }
  function stop({clear=false,render=false}={}){
    const previous=run;generation++;for(const id of timers)root.clearTimeout(id);timers.clear();
    if(previous?.raf!=null)root.cancelAnimationFrame(previous.raf);
    run=null;pending=null;cleanUI();
    if(clear&&previous&&state()?.lesson?.id===previous.lesson)canvas()?.previewClear(previous.selected);
    if(render&&previous)root.render();
    return Boolean(previous);
  }
  function hud(){
    if(!current())return;
    const host=root.document.querySelector('.scene-canvas');if(!host)return;
    host.classList.add('is-scene-preview');
    let el=host.querySelector('.scene-preview-hud');
    if(!el){el=root.document.createElement('aside');el.className='scene-preview-hud';el.setAttribute('aria-label','Picture preview');
      el.innerHTML='<div><small>QUICK PREVIEW</small><span data-preview-caption></span></div><button type="button" data-scene-preview-stop aria-label="Stop preview and explore" title="Stop preview and explore"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg></button>';
      host.append(el);
    }
    el.querySelector('[data-preview-caption]').textContent=run.caption;
  }
  function caption(value){if(run){run.caption=value;hud();}}
  function snapshot(){const v=root.v59EnsureViewer();return {scale:v.scale,tx:v.tx,ty:v.ty};}
  function animate(target,duration,done){
    if(reduced()){done();return;}
    const token=generation,from=snapshot(),start=root.performance.now();
    const frame=now=>{
      if(token!==generation)return;
      if(!current()){stop({clear:true});return;}
      const el=stage();if(!el?.isConnected){stop({clear:true});return;}
      const t=duration?Math.min(1,Math.max(0,(now-start)/duration)):1,ease=t*t*(3-2*t),v=root.v59EnsureViewer();
      for(const key of ['scale','tx','ty'])v[key]=from[key]+(target[key]-from[key])*ease;
      root.v59ApplyViewerTransform(el);
      if(t<1)run.raf=root.requestAnimationFrame(frame);else{run.raf=null;done();}
    };
    run.raf=root.requestAnimationFrame(frame);
  }
  function overview(){return {scale:1,tx:0,ty:0};}
  function camera(index){
    const hs=state().lesson.hotspots,h=hs[index],b=root.v59Bounds(stage()),scope=root.EngBookHotspotScope?.resolve(h,hs);
    const points=[h,...hs.filter(c=>parent(c)===h.id)].filter(validPoint);
    const xs=points.map(p=>p.x),ys=points.map(p=>p.y);
    const area=scope?.bounds||{x:Math.min(...xs)-8,y:Math.min(...ys)-8,width:Math.max(26,Math.max(...xs)-Math.min(...xs)+16),height:Math.max(34,Math.max(...ys)-Math.min(...ys)+16)};
    const scale=Math.min(8,Math.max(1,Math.min(Math.max(140,b.vw-56)/(b.fw*area.width/100),Math.max(180,b.vh-260)/(b.fh*area.height/100))));
    const center=scope?.bounds?{x:area.x+area.width/2,y:area.y+area.height/2}:{x:(Math.min(...xs)+Math.max(...xs))/2,y:(Math.min(...ys)+Math.max(...ys))/2};
    const bounds=root.v59Bounds(stage(),scale);
    return {scale,tx:Math.max(-bounds.ex,Math.min(bounds.ex,bounds.vw/2-bounds.fw*scale*center.x/100-bounds.cx)),ty:Math.max(-bounds.ey,Math.min(bounds.ey,bounds.vh*.58-bounds.fh*scale*center.y/100-bounds.cy))};
  }
  function touch(selector,done){
    if(!current())return;
    const host=root.document.querySelector('.scene-canvas'),target=host?.querySelector(selector);
    if(target&&!reduced()){
      const r=target.getBoundingClientRect(),b=host.getBoundingClientRect(),ring=root.document.createElement('i');
      ring.className='scene-preview-touch';ring.setAttribute('aria-hidden','true');ring.style.left=`${r.left+r.width/2-b.left}px`;ring.style.top=`${r.top+r.height/2-b.top}px`;
      host.querySelector('.scene-preview-touch')?.remove();host.append(ring);later(()=>ring.remove(),520);
    }
    later(done,reduced()?0:380);
  }
  function select(index){if(!current())return;run.selected=index;canvas().previewSelect(index);hud();}
  function finish(){
    if(!current())return;
    caption('Now explore it your way');
    touch('[data-canvas-action="close-card"]',()=>{
      canvas().previewClear(run.selected);run.selected=null;root.render();hud();
      animate(run.home,700,()=>stop({clear:true,render:true}));
    });
  }
  function demonstrate(indices){
    const [first,child]=indices;
    caption('Look at the whole picture');
    animate(overview(),650,()=>{
      caption('Find one detail');
      animate(camera(first),900,()=>touch(`[data-canvas-action="anchor"][data-index="${first}"]`,()=>{
        select(first);caption('Tap a dot to open its card');
        later(()=>{
          if(child==null){finish();return;}
          caption('Explore the smaller details');
          touch(`[data-canvas-action="anchor"][data-index="${child}"]`,()=>{
            select(child);later(finish,1800);
          });
        },1700);
      }));
    });
  }
  function start({manual=false}={}){
    if(!eligible()||!manual&&reduced())return false;
    const indices=plan(state().lesson);if(!indices.length)return false;
    stop();remember(state().lesson.id);root.EngBookSpeech?.stopSpeaking?.();
    run={lesson:state().lesson.id,home:snapshot(),selected:null,caption:'Look at the whole picture',raf:null};
    hud();demonstrate(indices);return true;
  }
  function mount(el){
    if(run){if(!current())stop({clear:true});else hud();return;}
    const id=state()?.lesson?.id;
    if(!eligible()||pending!=null||seen(id)||reduced()||!el?.isConnected)return;
    remember(id);pending=later(()=>{pending=null;if(eligible()&&state().lesson.id===id)start();},450);
  }
  function interrupt(event){
    if(!event.target?.closest?.('.scene-canvas'))return;
    const id=state()?.lesson?.id;if(id)remember(id);
    if(!run&&pending==null)return;
    const explicit=Boolean(event.target.closest('[data-scene-preview-stop]'));
    // Keep the current stage mounted for the real pointer's drag/pinch/click.
    stop({clear:explicit,render:explicit});
  }
  root.document.addEventListener('pointerdown',interrupt,{capture:true,passive:true});
  root.document.addEventListener('wheel',interrupt,{capture:true,passive:true});
  root.document.addEventListener('keydown',e=>{if(e.key==='Escape'&&(run||pending!=null)){e.preventDefault();stop({clear:true,render:true});}else if(run||pending!=null){remember(state()?.lesson?.id);stop();}},true);
  root.document.addEventListener('click',e=>{
    if(e.target.closest?.('[data-scene-preview-start]')){e.preventDefault();start({manual:true});}
    else if(e.target.closest?.('[data-scene-preview-stop]')){e.preventDefault();stop({clear:true,render:true});}
  });
  root.document.addEventListener('visibilitychange',()=>{if(root.document.hidden)stop({clear:true,render:true});});
  root.addEventListener?.('resize',()=>{if(run)stop({clear:true,render:true});});
  root.addEventListener?.('pagehide',()=>stop({clear:true}));
  motion?.addEventListener?.('change',()=>{if(reduced())stop({clear:true,render:true});});
  root.EngBookScenePreview=Object.freeze({plan,start,stop,mount,active:()=>Boolean(run)});
})(typeof window!=='undefined'?window:globalThis);
