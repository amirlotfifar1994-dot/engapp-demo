/* Free-floating picture worlds. Authored IDs and progress keys never change. */
(function(root){
  'use strict';
  const doc=root.document,esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const course=()=>root.EngBookCoursePath,content=()=>root.EngBookContent;
  const state=()=>root.EngBookEventContext?.getRoot('state')||root.EngBookRuntimeState||{};
  const progress=()=>root.EngBookEventContext?.getRoot('progress')||root.EngBookRuntimeState?.progress||{};
  const num=n=>String(n).padStart(2,'0');
  const completion=id=>Math.max(0,Math.min(100,Number(root.v27LessonCompletion?.(id))||0));
  const glyphs={home:'M3 11 12 3l9 8v10H3ZM9 21v-7h6v7',study:'M12 5v16M12 5C8 2 4 3 2 4v15c4-1 7 0 10 2 3-2 6-3 10-2V4c-2-1-6-2-10 1',shop:'M4 8h16l-1 13H5ZM8 8V6a4 4 0 0 1 8 0v2',health:'M12 21S2 15 2 8a5 5 0 0 1 10-2A5 5 0 0 1 22 8c0 7-10 13-10 13Z',travel:'M3 9h18v12H3ZM8 9V5h8v4M8 13v4m8-4v4',nature:'M20 3C7 2 2 7 5 14s13 3 15-11ZM4 21l10-10',weather:'M7 15a5 5 0 1 1 9-4 4 4 0 1 1 1 8H7M8 3V1M2 6 1 5m19 0 1-1',science:'M9 2h6M10 2v8L4 20h16L14 10V2M7 15h10',work:'M3 7h18v14H3ZM8 7V3h8v4M3 12l9 3 9-3',arts:'M12 3a9 9 0 0 0 0 18c3 0 1-4 4-5h3c5-5-1-13-7-13ZM7 9h.1M11 6h.1M16 8h.1M7 14h.1',safety:'M12 2 3 6v7c0 5 9 9 9 9s9-4 9-9V6ZM8 12l3 3 5-6',peace:'M12 3v18M12 12l-7 6m7-6 7 6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0',media:'M3 5h18v15H3ZM7 9h5v5H7m8-5h3m-3 4h3M7 17h11',business:'M4 21V3m0 18h17M8 17v-5m5 5V8m5 9V5',civic:'M2 8 12 2l10 6ZM5 11v8m7-8v8m7-8v8M2 22h20',urban:'M3 21V8h7v13m0 0V3h11v18M6 11h1m-1 4h1m7-8h3m-3 4h3m-3 4h3',eco:'M12 3v18M4 10c0-7 8-8 8-8s8 1 8 8c0 6-8 6-8 6s-8 0-8-6',heritage:'M2 7 12 2l10 5ZM5 10v9m7-9v9m7-9v9M2 22h20',culture:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM2 12h20M12 2c-5 5-5 15 0 20 5-5 5-15 0-20',agriculture:'M12 22V4M12 14C3 15 2 8 3 5c7-1 9 5 9 9Zm0-4c0-6 4-8 9-7 0 5-3 8-9 7'};
  const icon=key=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${glyphs[key]||glyphs.nature}"/></svg>`;
  const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';
  const palettes=['#26765c|#e7f2ec','#687642|#f0f2e6','#a56d44|#f7eee5','#637cb0|#edf1fa','#836a9f|#f2edf7'];
  const palette=id=>{const [accent,tint]=palettes[(Math.max(1,Number(id)||1)-1)%palettes.length].split('|');return `--world-accent:${accent};--world-tint:${tint}`;};
  const covers={1:{id:5,position:'46% 51%'},2:{id:34,position:'79% 53%'},3:{id:69,position:'46% 48%'},4:{id:105,position:'47% 47%'},5:{id:149,position:'48% 53%'}};
  let mounted=null,dialog=null,session=null,epoch=0,homeScroll=0,introPlayed=false;
  const scrolls=new Map(),views=new Map(),boards=new Set();
  function catalog(){
    return (content()?.listCategories?.()||[]).map(c=>{
      const lessons=(content().listLessons(c.id)||[]).sort(course()?.compare||((a,b)=>a.id-b.id));
      const ready=lessons.filter(l=>l.ready),cover=ready.find(l=>Number(l.id)===covers[c.id]?.id)||ready[0];
      return {...c,lessons,ready,cover,done:ready.filter(l=>completion(l.id)>=100).length};
    });
  }
  function layout(count,{kind='lesson'}={}){
    const axial=[[0,0]],directions=[[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]];
    for(let ring=1;axial.length<count;ring++){let q=-ring,r=ring;for(const [dq,dr] of directions)for(let i=0;i<ring;i++){axial.push([q,r]);q+=dq;r+=dr;}}
    let offsets=axial.slice(0,count).map(([q,r])=>({x:q*184+r*92,y:r*184}));
    if(kind==='category'){
      const rows=Math.ceil(count/5),middle=(rows-1)/2;
      offsets=Array.from({length:count},(_,i)=>({x:(i%5-2)*184+(Math.floor(i/5)%2?46:-46),y:(Math.floor(i/5)-middle)*184}));
      // Open worlds occupy the middle; the remaining worlds sit directly around them.
      offsets.sort((a,b)=>Math.hypot(a.x,a.y)-Math.hypot(b.x,b.y)||a.y-b.y||a.x-b.x);
    }
    const radius=Math.max(kind==='category'?460:610,...offsets.map(p=>Math.max(Math.abs(p.x),Math.abs(p.y))+130)),size=radius*2;
    return {nodes:offsets.map(p=>({x:p.x+radius,y:p.y+radius})),width:size,height:size,center:radius};
  }
  function introFrame(elapsed){
    const ease=t=>t*t*t*(t*(t*6-15)+10);
    if(elapsed<1600)return {phase:'orb',zoom:0};
    if(elapsed<4000)return {phase:'reveal',zoom:0};
    if(elapsed<6100)return {phase:'overview',zoom:0};
    if(elapsed<11200)return {phase:'approach',zoom:ease((elapsed-6100)/5100)};
    return {phase:'ready',zoom:1};
  }
  function overviewScale(width,height,size){return Math.min(1,Math.max(.08,Math.min((width-48)/size,(height-120)/size)));}
  function pathMarkup(items,kind,{grid=false,intro=false,key=kind==='category'?'worlds':`category-${items[0]?.categoryId}`}={}){
    const space=layout(items.length,{kind}),last=Number(progress().lastLesson||course()?.firstLessonId||5);
    const nodes=items.map((item,i)=>{
      const p=space.nodes[i],cat=kind==='category',ready=cat?item.ready.length>0:item.ready,active=cat?item.lessons.some(l=>Number(l.id)===last):Number(item.id)===last;
      const photo=cat?item.cover:item,percent=cat?(item.ready.length?Math.round(item.ready.reduce((sum,l)=>sum+completion(l.id),0)/item.ready.length):0):completion(item.id);
      const image=ready&&photo?.image?`<img src="${esc(photo.image)}" alt="" loading="lazy" decoding="async" style="object-position:${cat?covers[item.id]?.position||'center':'center'}">`:icon(item.iconKey||'study');
      const number=cat?num(item.id):course()?.label(item)||num(item.id),label=cat?`Category ${number}: ${item.shortTitle||item.title}`:`${course()?.qualifiedLabel(item)}: ${item.title}`;
      const caption=cat?(ready?`${item.ready.length} pictures${item.done?` · ${item.done} explored`:''}`:'Coming soon'):percent>=100?'Explored':active?'Continue here':ready?'Explore picture':'Coming soon';
      return `<li class="journey-node ${cat?'journey-category-node':'journey-lesson-node'} ${ready?'':'is-coming'} ${active?'is-current':''} ${percent>=100?'is-done':''}" style="${palette(cat?item.id:item.categoryId)};left:${p.x}px;top:${p.y-54}px;--float-delay:-${i*1.73}s;--float-duration:${20+(i%5)*2}s;--float-x:${i%2?-5:5}px;--float-y:${7+i%4}px;--birth-x:${space.center-p.x}px;--birth-y:${space.center-p.y}px;--birth-delay:${i*30}ms;--entry-delay:${i%7*60}ms"><div class="journey-island"><button type="button" class="journey-avatar" data-journey-${cat?'category':'lesson'}="${item.id}" aria-label="${esc(label)}" ${active?'aria-current="true"':''} style="--journey-progress:${percent*3.6}deg"><span class="journey-photo">${image}</span><span class="journey-number">${number}${percent>=100?'<i aria-hidden="true">✓</i>':''}</span></button><div class="journey-node-copy"><strong title="${esc(cat?item.shortTitle||item.title:item.title)}">${esc(cat?item.shortTitle||item.title:item.title)}</strong><small>${caption}</small></div></div></li>`;
    }).join('');
    if(grid)return `<ul class="journey-island-grid" aria-label="${kind==='category'?'All categories':'All pictures'}">${nodes}</ul>`;
    const world=kind==='category',introCaption=world?'<div class="world-intro-caption" aria-hidden="true"><span data-stage="orb">Every picture opens a world.</span><span data-stage="reveal">Follow your curiosity.</span><span data-stage="overview">Explore your worlds. Your own way.</span><span data-stage="approach">Find a moment. Give it words.</span><i class="world-intro-track"><b></b></i></div>':'',orb=world?`<div class="world-origin" aria-hidden="true"><div class="world-origin-halo"></div><div class="world-origin-sphere"><svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="9" y="10" width="30" height="25" rx="8" stroke="currentColor" stroke-width="1.7"/><path d="m13 29 7-8 6 6 4-4 7 8M29 35l7 5v-7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="30" cy="18" r="2.5" fill="currentColor"/></svg><b>SceneSpeak</b><small>Every picture. A new world.</small></div></div>`:'';
    return `<div class="island-board ${world?'island-world-board':'island-lesson-board'} ${intro?'is-intro-pending':''}" data-island-key="${esc(key)}" data-island-size="${space.width}" data-island-center="${space.center}" tabindex="0" role="region" aria-label="Floating ${world?'categories':'pictures'}. Drag to move, or use arrow keys."><div class="island-wash" aria-hidden="true"></div>${orb}<div class="island-plane" style="width:${space.width}px;height:${space.height}px"><ul aria-label="${world?'Floating categories':'Floating pictures'}">${nodes}</ul></div><div class="island-tools"><button type="button" data-journey-${world?'worlds':'list'}>${world?'All worlds':'All pictures'} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="6" height="6" rx="2"/><rect x="15" y="3" width="6" height="6" rx="2"/><rect x="3" y="15" width="6" height="6" rx="2"/><rect x="15" y="15" width="6" height="6" rx="2"/></svg></button><div class="island-tool-actions">${world?'<button type="button" data-island-replay aria-label="Replay world introduction"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 9a8 8 0 1 1 0 6M4 3v6h6"/></svg><span class="world-skip-label">Skip</span></button>':''}<button type="button" data-island-reset aria-label="Center islands"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/></svg></button></div></div>${introCaption}<span class="island-hint"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m8 4 4-3 4 3M12 1v22m-4-3 4 3 4-3M4 8l-3 4 3 4M1 12h22m-3-4 3 4-3 4"/></svg>Drag to discover · Choose any island</span><span class="sr-only world-intro-status" role="status"></span></div>`;
  }
  function categoriesMarkup(rows,options){return pathMarkup(rows,'category',options);}
  function createPan(board,{initial,onChange=()=>{},observe=true,intro=false,onIntroStart=()=>{}}={}){
    const plane=board.querySelector('.island-plane'),size=Number(board.dataset.islandSize),center=Number(board.dataset.islandCenter);
    let x=0,y=0,w=0,h=0,scale=Number(initial?.scale)||1,point=null,moved=false,suppress=false,initialized=false,disposed=false,frameId=null,introStart=null,introRunning=false,entered=false;
    const reduced=root.matchMedia?.('(prefers-reduced-motion: reduce)'),replay=board.querySelector('[data-island-replay]'),status=board.querySelector('.world-intro-status');
    const listeners=[];
    const listen=(type,fn,options)=>{board.addEventListener(type,fn,options);listeners.push([type,fn,options]);};
    function move(nx,ny){
      if(!w||!h)return false;
      const clamp=(n,frame)=>size*scale<frame?(frame-size*scale)/2:Math.max(frame-size*scale,Math.min(0,n));
      nx=clamp(nx,w);ny=clamp(ny,h);const changed=nx!==x||ny!==y;x=nx;y=ny;
      plane.style.transform=`translate3d(${x}px,${y}px,0) scale(${scale})`;onChange({x:(w/2-x)/scale,y:(h/2-y)/scale,scale});return changed;
    }
    function camera(cx,cy,zoom){scale=zoom;move(w/2-cx*scale,h/2-cy*scale);}
    function stopIntro({finish=false}={}){
      if(frameId!==null)root.cancelAnimationFrame?.(frameId);frameId=null;introRunning=false;
      board.classList.remove('is-intro','is-intro-pending');board.dataset.introPhase='ready';
      replay?.setAttribute('aria-label','Replay world introduction');
      if(status)status.textContent=board.dataset.islandKey==='worlds'?'Choose any world. Drag to discover more.':'Choose any picture. Drag to discover more.';
      if(finish&&w&&h)camera(center,center,1);
    }
    function playIntro(){
      if(disposed||!w||!h)return;
      stopIntro();entered=true;
      onIntroStart();
      if(reduced?.matches||!root.requestAnimationFrame){camera(center,center,1);return;}
      introRunning=true;introStart=null;board.classList.remove('is-discovered');board.classList.add('is-intro');board.dataset.introPhase='orb';
      replay?.setAttribute('aria-label','Skip introduction');if(status)status.textContent='Opening your picture worlds. Skip or touch to explore now.';
      const overview=overviewScale(w,h,size);camera(center,center,overview);
      function tick(time){
        if(disposed||!introRunning)return;if(introStart===null)introStart=time;
        const step=introFrame(time-introStart);board.dataset.introPhase=step.phase;
        camera(center,center,overview+(1-overview)*step.zoom);
        if(step.phase==='ready')stopIntro({finish:true});else frameId=root.requestAnimationFrame(tick);
      }
      frameId=root.requestAnimationFrame(tick);
    }
    function enter(){refresh();if(entered)return;entered=true;if(intro)playIntro();else stopIntro();}
    function refresh(){
      if(disposed)return;const r=board.getBoundingClientRect();if(!r.width||!r.height){if(introRunning)stopIntro({finish:true});return;}
      const anchor=initialized?{x:(w/2-x)/scale,y:(h/2-y)/scale}:initial||{x:center,y:center};
      if(introRunning&&(w!==r.width||h!==r.height))stopIntro({finish:true});w=r.width;h=r.height;initialized=true;
      move(w/2-anchor.x*scale,h/2-anchor.y*scale);
    }
    function reset(){stopIntro({finish:true});}
    listen('pointerdown',e=>{
      if(!e.isPrimary||e.button!==0||e.target.closest('.island-tools'))return;
      if(introRunning)stopIntro({finish:board.dataset.introPhase==='orb'});
      board.classList.add('is-interacting');suppress=false;point={id:e.pointerId,x:e.clientX,y:e.clientY,ox:x,oy:y};moved=false;
    });
    listen('pointermove',e=>{
      if(!point||e.pointerId!==point.id)return;
      if(e.buttons===0){release(e);return;}
      if(!moved&&Math.hypot(e.clientX-point.x,e.clientY-point.y)>8){moved=true;board.setPointerCapture?.(e.pointerId);board.classList.add('is-panning');board.classList.add('is-discovered');}
      if(moved){e.preventDefault();move(point.ox+e.clientX-point.x,point.oy+e.clientY-point.y);}
    });
    function release(e){if(!point||point.id!==e.pointerId)return;suppress=moved;if(board.hasPointerCapture?.(e.pointerId))board.releasePointerCapture(e.pointerId);point=null;board.classList.remove('is-panning','is-interacting');}
    listen('pointerup',release);listen('pointercancel',release);listen('lostpointercapture',release);
    listen('click',e=>{if(suppress&&e.detail!==0){suppress=false;e.preventDefault();e.stopImmediatePropagation();return;}if(e.target.closest('[data-island-replay]')){if(introRunning)stopIntro({finish:true});else playIntro();e.stopPropagation();}else if(e.target.closest('[data-island-reset]')){reset();e.stopPropagation();}},true);
    listen('wheel',e=>{if(e.ctrlKey)return;if(introRunning)stopIntro();if(move(x-e.deltaX,y-e.deltaY)){board.classList.add('is-discovered');e.preventDefault();}},{passive:false});
    listen('keydown',e=>{
      if(e.target!==board)return;const delta={ArrowLeft:[90,0],ArrowRight:[-90,0],ArrowUp:[0,90],ArrowDown:[0,-90]}[e.key];
      if(introRunning&&(delta||e.key==='Home'||e.key==='Escape'))stopIntro({finish:true});
      if(e.key==='Home'){reset();e.preventDefault();}else if(delta){move(x+delta[0],y+delta[1]);board.classList.add('is-discovered');e.preventDefault();}
    });
    listen('focusin',e=>{
      if(point)return;
      const node=e.target.closest('.journey-node');if(!node)return;
      if(introRunning)stopIntro();
      board.scrollLeft=board.scrollTop=0;const px=parseFloat(node.style.left),py=parseFloat(node.style.top)+70;
      if(px*scale+x<60||px*scale+x>w-60||py*scale+y<70||py*scale+y>h-60)move(w/2-px*scale,h/2-py*scale);
    });
    listen('dragstart',e=>e.preventDefault());
    const resize=observe&&root.ResizeObserver?new root.ResizeObserver(refresh):null;resize?.observe(board);refresh();
    const onVisibility=()=>{board.classList.toggle?.('is-motion-paused',doc.hidden);if(doc.hidden&&introRunning)stopIntro({finish:true});},onReduced=()=>{if(reduced.matches&&introRunning)stopIntro({finish:true});};
    doc.addEventListener?.('visibilitychange',onVisibility);reduced?.addEventListener?.('change',onReduced);
    return {refresh,reset,enter,playIntro,stopIntro,position:()=>({x:(w/2-x)/scale,y:(h/2-y)/scale,scale}),destroy(){disposed=true;if(frameId!==null)root.cancelAnimationFrame?.(frameId);resize?.disconnect();doc.removeEventListener?.('visibilitychange',onVisibility);reduced?.removeEventListener?.('change',onReduced);listeners.forEach(args=>board.removeEventListener(...args));}};
  }
  function bindBoards(scope){scope?.querySelectorAll('.island-board').forEach(board=>{
    if(board.islandPan){board.islandPan.refresh();return;}
    board.islandPan=createPan(board,{initial:views.get(board.dataset.islandKey),intro:board.dataset.islandKey==='worlds'&&!introPlayed,onIntroStart:()=>{introPlayed=true;},onChange:p=>views.set(board.dataset.islandKey,p)});boards.add(board);
  });}
  function forget(scope){scope?.querySelectorAll('.island-board').forEach(board=>{board.islandPan?.destroy();delete board.islandPan;boards.delete(board);});}
  function mount(home){
    const host=home?.querySelector('.path-main');if(!host)return false;
    forget(mounted);mounted=host;host.classList.add('journey-home');
    const rows=catalog(),ready=rows.flatMap(c=>c.ready),last=ready.find(l=>Number(l.id)===Number(progress().lastLesson))||ready[0];
    host.innerHTML=`<section class="path-unit journey-intro world-heading"><button type="button" class="world-home-button" data-eng-action="path-top" aria-label="Back to home"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg></button><div class="world-heading-copy"><span>SCENESPEAK</span><h2 tabindex="-1">Choose your world.</h2></div><div class="journey-overview"><span>${rows.length} worlds · ${rows.filter(c=>c.ready.length).length} open</span>${last?`<button type="button" data-journey-resume="${last.id}">Last picture ${arrow}</button>`:''}</div></section><div class="journey-worlds">${categoriesMarkup(rows,{intro:!introPlayed})}</div>`;
    bindBoards(host);return true;
  }
  function category(){return catalog().find(c=>Number(c.id)===session?.categoryId);}
  function lesson(){return category()?.lessons.find(l=>Number(l.id)===session?.lessonId);}
  const levelHints={A1:'Short sentences. One detail at a time.',A2:'Everyday phrases, actions and positions.',B1:'Connect details in your own words.',B2:'Build a clear, connected description.',C1:'Be precise, natural and thoughtful.'};
  const goals=['Describe people and everyday moments.','Describe actions, materials and learning spaces.','Describe an everyday service or shopping scene.','Describe visible actions, equipment and surroundings.','Describe places, journeys and travel situations.','Describe a landscape and locate its details.','Describe the weather and how the scene looks.','Describe people, equipment and visible processes.','Describe what people are doing at work.','Describe movement, activities and their surroundings.','Describe visible actions without guessing identities or guilt.','Describe a gathering and separate facts from interpretations.','Describe communication, equipment and visible actions.','Describe a workplace and the details you can see.','Describe people and positions in a public space.','Describe buildings, shapes and the space around them.'];
  function entryFor(l){
    const pack=content()?.getPack?.(Number(l.id)),meta=content()?.manifestFor?.(Number(l.id));
    return {goal:pack?.content?.lessonEntry?.goal||meta?.lessonEntry?.goal||goals[Number(l.categoryId)-1]||'Notice three details and describe them in your own words.',notice:pack?.content?.lessonEntry?.notice||meta?.lessonEntry?.notice||'Start with one visible detail. Tap its dot, find a phrase, then say it your way.',leveled:Boolean(pack?.content?.hotspotLanguage||meta?.hotspotLevelCoverage)};
  }
  function selectedLevel(l){return session?.level||root.EngAppLevelAware?.levelFor(content()?.getPack?.(Number(l.id))||{lessonId:Number(l.id)},'global')||'A2';}
  function levelMarkup(l){const level=selectedLevel(l),entry=entryFor(l);return `<fieldset class="journey-level-choice"><legend>Your English level <span>Choose, or keep your current level</span></legend><div role="group" aria-label="Lesson English level">${Object.keys(levelHints).map(key=>`<button type="button" data-journey-level="${key}" aria-pressed="${level===key}" aria-label="${key}: ${levelHints[key]}">${key}</button>`).join('')}</div><p class="journey-level-hint" aria-live="polite">${esc(levelHints[level])}</p><small>${entry.leveled?'Hotspot descriptions and phrases follow your level.':'Overview and models follow your level. Some detail wording is shared.'} Change it anytime in Learn.</small></fieldset>`;}
  function chooseLevel(value){
    if(session?.view!=='lesson'||session.opening||!levelHints[value])return false;session.level=value;
    dialog.querySelectorAll('[data-journey-level]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.journeyLevel===value)));
    const hint=dialog.querySelector('.journey-level-hint');if(hint)hint.textContent=levelHints[value];return true;
  }
  function rememberScroll(){if(session&&['category','worlds'].includes(session.view)&&!session.query){const body=dialog?.querySelector('.journey-body');if(body)scrolls.set(session.view==='worlds'?'worlds':session.categoryId,body.scrollTop);}}
  function bodyMarkup(){
    const cat=category();
    if(session.query){
      const rows=(session.view==='worlds'?catalog().flatMap(c=>c.lessons):cat?.lessons||[]).filter(l=>course()?.matches(l,session.query));
      return `<p class="journey-search-count" role="status">${rows.length} ${rows.length===1?'picture':'pictures'}</p><div class="journey-results">${rows.map(l=>`<button type="button" data-journey-result="${l.id}"><span>${l.ready&&l.image?`<img src="${esc(l.image)}" alt="" loading="lazy" decoding="async">`:icon('study')}</span><span><small>${course()?.qualifiedLabel(l)}</small><b>${esc(l.title)}</b></span>${arrow}</button>`).join('')||'<p>No pictures found. Try a title or a number such as 4/3.</p>'}</div>`;
    }
    if(session.view==='worlds')return `<p class="journey-dialog-intro">Every open world is yours to explore.</p>${categoriesMarkup(catalog(),{grid:true})}`;
    if(session.view==='lesson'){
      const l=lesson();if(!l)return '';const entry=entryFor(l);
      return `<article class="journey-picture-card"><div class="journey-picture-art">${l.ready&&l.image?`<img class="journey-picture-cover" src="${esc(l.image)}" alt="${esc(l.title)}" decoding="async">`:''}<span class="journey-picture-tag">PICTURE ${course()?.label(l)||num(l.id)}</span><span class="journey-picture-invitation">Look closer. Say more.</span></div><div class="journey-picture-story"><p class="journey-eyebrow">${course()?.qualifiedLabel(l)}</p><h3 id="journey-picture-title" tabindex="-1">${esc(l.title)}</h3><p class="journey-picture-goal">${esc(entry.goal)}</p><details class="journey-notice"><summary>Where to start</summary><p>${esc(entry.notice)}</p></details>${levelMarkup(l)}${Number(l.id)===3?`<a class="journey-panorama-link" href="?lesson=10003&amp;mode=explore">Explore Park in Panorama Worlds ↗</a>`:''}${completion(l.id)>0?`<div class="journey-picture-progress">${completion(l.id)}% explored</div>`:''}<p class="journey-open-status" role="status" hidden></p><button type="button" class="journey-start" data-journey-start ${l.ready?'':'disabled'}>${l.ready?completion(l.id)>0?'Continue picture':'Explore picture':'Coming soon'} ${arrow}</button></div></article>`;
    }
    if(!cat?.lessons.length)return `<div class="journey-coming"><span>${icon(cat?.iconKey)}</span><p class="journey-eyebrow">A WORLD TO COME</p><h3>${esc(cat?.shortTitle||'New pictures')}</h3><p>${esc(cat?.scope||'More picture lessons are being prepared.')}</p><small>Coming soon</small></div>`;
    const missing=Math.max(0,(cat.totalLessons||cat.lessons.length)-cat.lessons.length);
    return `<p class="journey-dialog-intro">${cat.ready.length} pictures. Your choice, your order.${Number(cat.id)===1?'<a class="journey-panorama-link" href="?lesson=10001&amp;mode=explore">Panorama Worlds · Garden in 360° ↗</a><a class="journey-panorama-link" href="?lesson=10003&amp;mode=explore">Panorama Worlds · Park in 360° ↗</a>':''}${Number(cat.id)===2?'<a class="journey-panorama-link" href="?lesson=10002&amp;mode=explore">Panorama Worlds · Learning Commons in 360° ↗</a>':''}${missing?` ${missing} more coming soon.`:''}</p>${session.listView?'<button type="button" class="journey-view-toggle" data-journey-list>Show floating islands</button>':''}${pathMarkup(cat.lessons,'lesson',{grid:session.listView,key:`category-${cat.id}`})}`;
  }
  function paintBody({restore=false}={}){
    const body=dialog.querySelector('.journey-body');forget(body);body.innerHTML=bodyMarkup();body.classList.toggle('is-floating',session.view==='category'&&!session.query&&!session.listView&&!!category()?.lessons.length);body.scrollTop=restore?scrolls.get(session.view==='worlds'?'worlds':session.categoryId)||0:0;bindBoards(body);
  }
  function paint({restore=false,focus=true}={}){
    const cat=category(),isWorlds=session.view==='worlds';
    dialog.setAttribute('style',palette(cat?.id));dialog.setAttribute('data-view',session.view);
    forget(dialog);dialog.innerHTML=`<header class="journey-dialog-header"><button type="button" class="journey-icon" data-journey-back aria-label="${isWorlds?'Close worlds':session.view==='lesson'?'Back to pictures':'All categories'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg></button><div><small>${isWorlds?'YOUR PICTURE WORLDS':`CATEGORY ${num(cat?.id||1)}`}</small><h2 id="journey-dialog-title" tabindex="-1">${esc(isWorlds?'Choose your world':cat?.shortTitle||cat?.title||'Picture worlds')}</h2></div>${session.view!=='lesson'?'<button type="button" class="journey-icon" data-journey-search aria-label="Search pictures"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></svg></button>':''}<button type="button" class="journey-icon" data-journey-close aria-label="Close worlds"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg></button></header><div class="journey-search" ${session.searchOpen?'':'hidden'}><input type="search" aria-label="Search picture lessons" placeholder="Title, lesson number, or 4/3" autocomplete="off" value="${esc(session.query)}"></div><div class="journey-body"></div>`;
    paintBody({restore});if(focus)(dialog.querySelector(session.view==='lesson'?'#journey-picture-title':'#journey-dialog-title'))?.focus({preventScroll:true});
  }
  function close(){rememberScroll();dialog?.close();}
  function restoreHome(){root.requestAnimationFrame?.(()=>{if(mounted?.isConnected&&!mounted.hidden){root.scrollTo?.({top:homeScroll,behavior:'auto'});bindBoards(mounted);mounted.querySelectorAll('.island-board').forEach(board=>board.islandPan?.enter());}});}
  function selectCategory(id){const c=catalog().find(c=>Number(c.id)===Number(id));if(!c)return false;rememberScroll();Object.assign(session,{categoryId:Number(id),lessonId:null,view:'category',query:'',searchOpen:false,listView:false});paint({restore:true});return true;}
  function selectLesson(id){const c=catalog().find(c=>c.lessons.some(l=>Number(l.id)===Number(id)));if(!c)return false;rememberScroll();Object.assign(session,{categoryId:Number(c.id),lessonId:Number(id),view:'lesson',level:null,query:'',searchOpen:false});paint();return true;}
  async function startLesson(){
    const l=lesson();if(!l?.ready||session.opening)return false;
    if(state().screen==='lesson'&&Number(state().lesson?.id)===Number(l.id)){
      if(session.level){
        if(state().mode==='learn'&&root.EngBookLearn?.setLevel)root.EngBookLearn.setLevel(session.level);
        else{root.EngAppLevelAware?.setLesson(Number(l.id),session.level);root.EngBookSpeech?.stopSpeaking?.();root.render?.();}
      }close();return true;
    }
    session.opening=true;const token=++epoch,host=dialog,valid=()=>epoch===token&&host.isConnected&&host.open;
    const button=host.querySelector('[data-journey-start]'),status=host.querySelector('.journey-open-status');button.disabled=true;button.textContent='Opening picture…';status.hidden=false;status.textContent=`Opening ${course()?.qualifiedLabel(l)}…`;
    host.querySelector('[data-journey-close]').focus({preventScroll:true});
    let opened=false;
    try{opened=typeof root.v28EnsureAndOpenLesson==='function'?await root.v28EnsureAndOpenLesson(Number(l.id),'explore',{shouldOpen:valid,lessonLevel:selectedLevel(l)}):false;}
    catch(error){if(valid())root.v21PushError?.(error,'journey-open');}
    if(!valid())return false;
    session.opening=false;
    if(opened!==false){close();return true;}
    status.textContent='This picture could not open. Check your connection and try again.';status.setAttribute('role','alert');button.disabled=false;button.textContent='Try again';button.focus({preventScroll:true});return false;
  }
  function open({categoryId=null,lessonId=null,trigger=doc.activeElement}={}){
    boards.forEach(board=>{if(board.dataset.islandKey==='worlds')board.islandPan?.stopIntro({finish:true});});
    if(state().screen==='home'&&mounted&&!mounted.hidden)homeScroll=Number(root.scrollY)||0;
    if(dialog?.open){if(categoryId)selectCategory(categoryId);if(lessonId)selectLesson(lessonId);return dialog;}
    session={view:'worlds',categoryId:null,lessonId:null,query:'',searchOpen:false,opening:false,listView:false};
    dialog=doc.createElement('dialog');const host=dialog;host.className='journey-dialog';host.setAttribute('aria-labelledby','journey-dialog-title');
    host.addEventListener('close',()=>{epoch++;forget(host);host.remove();if(dialog===host){dialog=null;session=null;}doc.body.classList.remove('journey-dialog-open');(trigger?.isConnected?trigger:doc.querySelector('.scene-canvas [data-eng-action="pick-lesson"]')||doc.querySelector('.path-nav [data-eng-action="learning-path"]'))?.focus({preventScroll:true});});
    host.addEventListener('cancel',event=>{event.preventDefault();close();});
    host.addEventListener('click',event=>{
      if(event.target===host){const r=host.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();return;}
      const el=event.target.closest('button');if(!el)return;event.stopPropagation();
      if(el.hasAttribute('data-journey-close'))close();
      else if(el.hasAttribute('data-journey-back')){
        if(session.opening)return;
        if(session.view==='worlds')close();else if(session.view==='lesson'){session.view='category';session.lessonId=null;paint({restore:true});}else{rememberScroll();session.view='worlds';session.query='';session.searchOpen=false;paint({restore:true});}
      }else if(session.opening)return;
      else if(el.hasAttribute('data-journey-list')){session.listView=!session.listView;paintBody();host.querySelector(session.listView?'.journey-view-toggle':'.island-board')?.focus({preventScroll:true});}
      else if(el.dataset.journeyCategory)selectCategory(el.dataset.journeyCategory);
      else if(el.dataset.journeyLesson||el.dataset.journeyResult)selectLesson(el.dataset.journeyLesson||el.dataset.journeyResult);
      else if(el.dataset.journeyLevel)chooseLevel(el.dataset.journeyLevel);
      else if(el.hasAttribute('data-journey-start'))startLesson();
      else if(el.hasAttribute('data-journey-search')){rememberScroll();session.searchOpen=!session.searchOpen;session.query='';paintBody({restore:!session.searchOpen});const search=host.querySelector('.journey-search');search.hidden=!session.searchOpen;search.querySelector('input').value='';el.setAttribute('aria-expanded',String(session.searchOpen));if(session.searchOpen)search.querySelector('input').focus({preventScroll:true});}
    });
    host.addEventListener('input',event=>{if(event.target.matches('.journey-search input')&&!session.opening){session.query=event.target.value.trim();paintBody({restore:!session.query});}});
    doc.body.append(host);doc.body.classList.add('journey-dialog-open');
    if(categoryId&&catalog().some(c=>Number(c.id)===Number(categoryId)))session.categoryId=Number(categoryId),session.view='category';
    if(lessonId){const c=catalog().find(c=>c.lessons.some(l=>Number(l.id)===Number(lessonId)));if(c)Object.assign(session,{categoryId:Number(c.id),lessonId:Number(lessonId),view:'lesson'});}
    paint({focus:false,restore:true});host.showModal();bindBoards(host);host.querySelector(session.view==='lesson'?'#journey-picture-title':'#journey-dialog-title')?.focus({preventScroll:true});return host;
  }
  function openPicker(trigger){const id=state().screen==='lesson'?state().lesson?.id:progress().lastLesson;return open({categoryId:course()?.position(id||5).categoryId,trigger});}
  doc.addEventListener('click',event=>{
    if(event.target.closest('.journey-dialog'))return;
    const el=event.target.closest('[data-journey-category],[data-journey-resume],[data-journey-worlds]');if(!el)return;
    if(el.hasAttribute('data-journey-worlds'))open({trigger:el});
    else if(el.dataset.journeyCategory)open({categoryId:Number(el.dataset.journeyCategory),trigger:el});
    else open({lessonId:Number(el.dataset.journeyResume),trigger:el});
  });
  root.EngBookJourney=Object.freeze({catalog,layout,introFrame,overviewScale,createPan,pathMarkup,categoriesMarkup,mount,restoreHome,open,openPicker,close,startLesson,chooseLevel,entryFor,levelMarkup});
})(typeof window!=='undefined'?window:globalThis);
