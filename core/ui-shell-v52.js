/* EngBook UI Shell v0.52
   Strangler-style architecture layer: the 60 quality-locked lessons remain
   untouched while navigation, home hierarchy, lesson chrome, and production
   UI behavior move behind one authoritative shell API.
*/
(function(root){
  'use strict';
  const lessonLabel=id=>root.EngBookCoursePath?.label(id)||String(id).padStart(2,'0');
  const VERSION='0.52';
  const BUILD=root.ENGBOOK_BUILD_INFO||{};
  const legacy={
    renderHome:root.renderHome,
    renderLesson:root.renderLesson,
    topbar:root.topbar,
    modeTabs:root.modeTabs,
    bottomNav:root.bottomNav
  };
  const PRIMARY_MODES=['explore','learn','practice','speak','talk'];
  const runtime=()=>root.EngBookRuntimeState||root.state||{};
  const modeMeta={
    explore:['compass','Explore'],learn:['eye','Learn'],practice:['target','Practice'],speak:['mic','Speak'],talk:['spark','Talk']
  };
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const call=(name,...args)=>typeof root[name]==='function'?root[name](...args):undefined;
  const icon=name=>typeof root.icon==='function'?root.icon(name):'';
  const lessonId=()=>Number(runtime().screen==='home'?(runtime().progress?.lastLesson||root.EngBookCoursePath?.firstLessonId||1):typeof root.activeLessonId==='function'?root.activeLessonId():runtime().lesson?.id||1);
  const categoryFor=id=>root.EngBookContent?.getMeta?.(Number(id))?.categoryId||1;
  const lessonFor=id=>runtime().lesson||root.EngBookContent?.resolve?.(Number(id))?.lesson||root.EngBookContent?.getPack?.(Number(id))?.lesson||{title:'Lesson'};
  const completionFor=id=>typeof root.v27LessonCompletion==='function'?root.v27LessonCompletion(Number(id)):0;
  const capOff=(id,mode)=>{
    if(Number(id)===1)return false;
    const map={explore:'explore',learn:'learn',practice:'practice',speak:'describe',talk:'conversation'};
    try{return typeof root.v23Has==='function'?!root.v23Has(map[mode]):false;}catch(_){return false;}
  };

  function topbar(){
    const id=lessonId(),lesson=lessonFor(id),cat=categoryFor(id),pct=completionFor(id);
    return `<header class="topbar v52-topbar" data-v52-shell="topbar"><div class="topbar-inner">
      <button class="v52-icon-btn" data-eng-action="home" aria-label="Back to home">${icon('back')}</button>
      <div class="v52-brand"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual Conversation</small></div></div>
      <button class="v52-category-chip" data-eng-action="course" data-category="${cat}" aria-label="Open course map"><small>CAT</small><b>${String(cat).padStart(2,'0')}</b></button>
      <button type="button" class="v52-scene-title studio-lesson-picker" data-eng-action="pick-lesson" aria-label="Choose lesson"><span>LESSON ${lessonLabel(id)} <i aria-hidden="true">⌄</i></span><b>${esc(lesson?.title||'Lesson')}</b></button>
      <div class="v52-progress" aria-label="Lesson progress ${pct}%"><b>${pct}%</b><i><em style="width:${pct}%"></em></i></div>
      <button class="v52-icon-btn" data-eng-action="studio" aria-label="Open Studio tools">${icon('layers')}</button>
      ${!root.EngBookAccess?.freeMode?.()&&typeof root.v31OpenAccount==='function'?`<button class="v52-account-btn" data-eng-action="account" aria-label="Account and access">${icon('user')}</button>`:''}
    </div></header>`;
  }

  function openLessonPicker(){
    if(document.querySelector('.studio-library'))return;
    const content=root.EngBookContent,categories=content?.listCategories?.()||[];
    const lessons=categories.flatMap(c=>content.listLessons(c.id)).sort(root.EngBookCoursePath?.compare||((a,b)=>a.id-b.id)),current=lessonId(),index=lessons.findIndex(l=>Number(l.id)===current);
    const dialog=document.createElement('dialog');dialog.className='studio-library';dialog.setAttribute('aria-labelledby','studio-library-title');
    const neighbor=(l,label)=>`<button type="button" data-eng-action="switch-lesson" data-lesson="${l?.id||''}" ${!l?.ready?'disabled':''}>${label}${l?` · ${lessonLabel(l.id)}`:''}</button>`;
    dialog.innerHTML=`<header><div><h2 id="studio-library-title">Lessons</h2><p>Choose your next scene.</p></div><button type="button" class="studio-library-close" aria-label="Close lessons">${icon('close')}</button></header><div class="studio-library-search"><input type="search" aria-label="Search lessons" placeholder="Search by title or number" autocomplete="off"><select aria-label="Lesson category"><option value="all">All categories</option>${categories.filter(c=>lessons.some(l=>Number(l.categoryId)===Number(c.id))).map(c=>`<option value="${c.id}">${esc(c.shortTitle||c.title)}</option>`).join('')}</select></div><div class="studio-library-neighbors">${neighbor(lessons[index-1],'Previous')}${neighbor(lessons[index+1],'Next')}</div><p class="studio-library-count" role="status"></p><div class="studio-library-list"></div>`;
    const renderList=()=>{
      const query=dialog.querySelector('input').value.trim().toLowerCase(),category=dialog.querySelector('select').value;
      const shown=lessons.filter(l=>(category==='all'||String(l.categoryId)===category)&&(root.EngBookCoursePath?.matches(l,query)??(!query||`${l.title} ${lessonLabel(l.id)}`.toLowerCase().includes(query))));
      dialog.querySelector('.studio-library-count').textContent=`${shown.length} lesson${shown.length===1?'':'s'}`;
      dialog.querySelector('.studio-library-list').innerHTML=shown.length?shown.map(l=>{
        const active=Number(l.id)===current,badge=root.EngBookAccess?.lessonBadge?.(l.id)?.label||(l.ready?'Available':'Coming soon');
        return `<button type="button" data-eng-action="switch-lesson" data-lesson="${l.id}" ${!l.ready?'disabled':''} ${active?'aria-current="page"':''}><span class="studio-lesson-number">${lessonLabel(l.id)}</span><span><b>${esc(l.title)}</b><small>${active?'Current lesson':esc(badge)}</small></span><i aria-hidden="true">${active?'✓':'›'}</i></button>`;
      }).join(''):'<p class="studio-library-empty">No lessons found. Try another title or number.</p>';
    };
    dialog.querySelector('input').addEventListener('input',renderList);dialog.querySelector('select').addEventListener('change',renderList);
    dialog.querySelector('.studio-library-close').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();dialog.close();}});
    dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
    dialog.addEventListener('close',()=>{dialog.remove();document.body.classList.remove('studio-library-open');document.querySelector('.studio-lesson-picker, .studio-browse-lessons')?.focus({preventScroll:true});});
    document.body.append(dialog);renderList();document.body.classList.add('studio-library-open');dialog.showModal();dialog.querySelector('input').focus();
  }

  function modeTabs(){
    const id=lessonId();
    return `<nav class="v52-mode-tabs" aria-label="Lesson modes">${PRIMARY_MODES.map(mode=>{const [ic,label]=modeMeta[mode],off=capOff(id,mode);return `<button data-eng-action="mode" data-mode="${mode}" class="${runtime().mode===mode?'active':''} ${off?'disabled':''}" ${runtime().mode===mode?'aria-current="step"':''} ${off?'disabled aria-disabled="true"':''}>${icon(ic)}<span>${label}</span></button>`;}).join('')}</nav>`;
  }

  function bottomNav(){
    const id=lessonId();
    return `<nav class="v52-bottom-nav" aria-label="Mobile lesson modes">${PRIMARY_MODES.map(mode=>{const [ic,label]=modeMeta[mode],off=capOff(id,mode);return `<button data-eng-action="mode" data-mode="${mode}" class="${runtime().mode===mode?'active':''} ${off?'disabled':''}" ${runtime().mode===mode?'aria-current="step"':''} ${off?'disabled aria-disabled="true"':''}>${icon(ic)}<span>${label}</span></button>`;}).join('')}</nav>`;
  }

  function makeDetails(nodes,title,sub){
    const live=nodes.filter(Boolean);if(!live.length)return null;
    const details=document.createElement('details');details.className='v52-home-more';
    details.innerHTML=`<summary><span><small>OPTIONAL DEPTH</small><b>${esc(title)}</b><em>${esc(sub)}</em></span>${icon('chevron')}</summary><div class="v52-home-more-body"></div>`;
    const body=details.querySelector('.v52-home-more-body');live.forEach(n=>body.appendChild(n));return details;
  }

  function renderPathHome(shell){
    if(shell.querySelector('.path-home'))return;
    const content=root.EngBookContent,categories=content?.listCategories?.()||[];
    const lessons=categories.flatMap(c=>content.listLessons(c.id)).sort(root.EngBookCoursePath?.compare||((a,b)=>Number(a.id)-Number(b.id)));
    if(!lessons.length)return;
    const last=Number(runtime().progress?.lastLesson||1),index=Math.max(0,lessons.findIndex(l=>Number(l.id)===last)),current=lessons[index];
    const category=content.getCategory?.(current.categoryId),categoryLessons=lessons.filter(l=>Number(l.categoryId)===Number(current.categoryId));
    const categoryIndex=categoryLessons.findIndex(l=>Number(l.id)===Number(current.id)),start=Math.max(0,Math.min(categoryIndex-1,categoryLessons.length-5)),nearby=categoryLessons.slice(start,start+5);
    const oldHome=shell.querySelector('.v27-home');if(!oldHome)return;
    const preview=oldHome.querySelector('.v27-hero-scene img');
    const previewImage=current.image||preview?.getAttribute('src');
    const previewMarkup=previewImage?'<img class="path-preview" src="'+esc(previewImage)+'" alt="'+esc(current.title)+'" decoding="async" fetchpriority="high">':'';
    const layout=document.createElement('div');layout.className='path-home';
    const pct=Math.max(0,Math.min(100,Number(completionFor(current.id))||0));
    layout.innerHTML='<header class="path-header"><a href="#app" class="path-brand" aria-label="SceneSpeak home"><img src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><span class="scenespeak-wordmark">SceneSpeak<small>See it. Say it.</small></span></a>'+(root.EngBookAccess?.freeMode?.()?'':'<button type="button" data-eng-action="account" class="path-profile" aria-label="Account and access">'+icon('user')+'</button>')+'</header>'+ 
      '<nav class="path-nav" aria-label="Main navigation"><button type="button" aria-current="page" data-eng-action="path-top">'+icon('compass')+'<span>Home</span></button><button type="button" data-eng-action="how-it-works"><span>How it works</span></button><button type="button" class="studio-browse-lessons" data-eng-action="learning-path" title="Your learning path">'+icon('layers')+'<span>Lessons</span></button></nav>'+ 
      '<section class="path-main" aria-label="Learning path"><section class="path-unit"><span>YOUR LEARNING PATH</span><h2><button type="button" class="gallery-category studio-browse-lessons" data-eng-action="pick-lesson" aria-label="Choose category and lesson">'+icon('layers')+'<span>'+esc(category?.shortTitle||category?.title||'Everyday English')+'</span>'+icon('chevron')+'</button></h2><p>One picture. A little more English.</p></section>'+ 
      '<section class="path-current" aria-labelledby="path-current-title">'+previewMarkup+'<div class="gallery-current-copy"><div class="path-current-top"><span>LESSON '+lessonLabel(current.id)+'</span><span>'+pct+'% explored</span></div><h2 id="path-current-title">'+esc(current.title)+'</h2><div class="path-meter" role="progressbar" aria-label="Current lesson progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+pct+'"><i style="width:'+pct+'%"></i></div><button type="button" class="path-start" data-eng-action="lesson" data-lesson="'+current.id+'" data-mode="explore">'+(pct>0?'Continue lesson':'Start lesson')+' '+icon('chevron')+'</button></div></section>'+ 
      '<aside class="gallery-lessons" aria-labelledby="gallery-lessons-title"><div class="path-section-title"><h2 id="gallery-lessons-title">Your lessons</h2><button type="button" class="studio-browse-lessons" data-eng-action="pick-lesson">View all '+icon('chevron')+'</button></div><ol class="path-trail" aria-label="Nearby lessons">'+nearby.map(l=>{const selected=Number(l.id)===Number(current.id),done=completionFor(l.id)>=100,badge=root.EngBookAccess?.lessonBadge?.(l.id)?.label||(l.ready?'Available':'Coming soon');return '<li class="'+(selected?'is-current':done?'is-done':'')+'"><button type="button" data-eng-action="lesson" data-lesson="'+l.id+'" data-mode="explore" '+(!l.ready?'disabled':'')+' '+(selected?'aria-current="step"':'')+' aria-label="Lesson '+lessonLabel(l.id)+': '+esc(l.title)+'"><span class="gallery-thumbnail">'+(l.image?'<img src="'+esc(l.image)+'" alt="" loading="lazy" decoding="async">':'')+'<span class="gallery-lesson-number">'+lessonLabel(l.id)+'</span></span><span class="path-row-copy"><span class="path-node-caption">'+esc(l.title)+'</span><span class="path-access">'+(selected?'Current lesson':done?'Explored':esc(badge))+'</span></span><span class="path-row-arrow" aria-hidden="true">'+icon('chevron')+'</span></button></li>';}).join('')+'</ol></aside></section>';
    layout.querySelector('.path-unit h2').setAttribute('aria-label',category?.shortTitle||category?.title||'Everyday English');
    // Replace the former dashboard instead of retaining it in a hidden drawer.
    // Lesson progress is read above; removing these DOM nodes never clears it.
    oldHome.replaceChildren(layout);shell.classList.add('path-shell','gallery-shell');
    root.EngBookHomeHero?.mount(layout,{content});
  }

  function decorateHome(){
    document.documentElement.classList.add('v52-ui');
    const shell=document.querySelector('.v27-shell');if(!shell)return;
    shell.classList.add('v52-home-shell');shell.dataset.uiVersion='0.52';
    renderPathHome(shell);if(shell.querySelector('.path-home'))return;
    const header=shell.querySelector('.v27-home-header');header?.classList.add('v52-home-header');
    const status=header?.querySelector('.v27-home-status span');if(status)status.innerHTML=`<i></i>${BUILD.readyLessons?.length||60} lessons ready`;
    const last=Number(runtime().progress?.lastLesson||1),cat=categoryFor(last),catData=root.EngBookContent?.getCategory?.(cat);
    const heroCat=shell.querySelector('.v27-hero-copy>span');if(heroCat&&catData)heroCat.textContent=`CATEGORY ${String(cat).padStart(2,'0')} • ${catData.title}`;
    const home=shell.querySelector('.v27-home');
    if(home&&!home.querySelector('.v52-home-more')){
      /* The production home had accumulated several generations of secondary
         feature cards. Keep the first decision surfaces visible and move every
         optional dashboard/studio block behind one deliberate disclosure. */
      const direct=[...home.children],footer=direct.find(n=>n.classList.contains('v27-footer'))||null;
      const keep=node=>node.classList.contains('v27-home-header')||node.classList.contains('v27-hero')||/TODAY'S MICRO-MISSIONS/i.test(node.textContent||'')||/YOUR COURSE/i.test(node.textContent||'')||node===footer;
      const optional=direct.filter(n=>!keep(n)&&!n.classList.contains('v52-home-more'));
      const more=makeDetails(optional,'Progress insights & specialist tools','Learning path, communication analytics, review, and advanced Studio tools — available when you want them.');
      if(more)home.insertBefore(more,footer);
    }
    const browse=header?.querySelector('button');
    if(browse){browse.removeAttribute('data-eng-v52-click');browse.classList.add('studio-browse-lessons');browse.dataset.engAction='pick-lesson';browse.textContent='All lessons';}
    const hero=shell.querySelector('.v27-hero-copy');
    if(hero){
      const intro=hero.querySelector('p');if(intro)intro.textContent='Start with the picture. Learn useful phrases, then try describing it.';
      const actions=hero.querySelector('.v27-hero-actions');
      if(actions&&!actions.dataset.wayfinding){actions.dataset.wayfinding='true';actions.innerHTML='<button type="button" class="primary" data-eng-action="lesson" data-lesson="'+last+'" data-mode="explore">Open lesson '+lessonLabel(last)+' '+icon('chevron')+'</button><button type="button" class="studio-browse-lessons" data-eng-action="pick-lesson">Choose another lesson</button>';}
    }
    const mission=shell.querySelector('.v27-mission-grid')?.closest('.v27-section');
    if(mission&&!mission.closest('.studio-home-practice'))wrapNode(mission,'studio-home-practice','Quick practice','Optional exercises for your current lesson.',false);
    const course=shell.querySelector('.v33-course-strip');
    if(course){const title=course.querySelector('h2');if(title)title.textContent='Explore your course';const copy=course.querySelector('p');if(copy)copy.textContent='Browse scenes by topic, or choose a lesson directly.';}
    const coach=shell.querySelector('.v27-coach-card');
    if(coach&&!coach.closest('.v52-coach-settings'))wrapNode(coach,'v52-coach-settings','Coaching support','Choose Guided, Balanced, or Independent support.',false);
    shell.querySelectorAll('.v27-section-head>div>span').forEach(x=>x.classList.add('v52-eyebrow'));
    // Fresh profiles have no historical mission score yet. Legacy mission cards
    // used clamp(undefined), which surfaced as `NaN current signal`. Keep the
    // absence of evidence explicit instead of displaying a broken number.
    shell.querySelectorAll('.v27-mission-grid > button').forEach(card=>{
      const small=card.querySelector('small');
      if(small&&/NaN/i.test(small.textContent||'')){small.textContent='Not measured yet';const bar=card.querySelector('div > i');if(bar)bar.style.width='0%';}
    });
    
  }

  function wrapNode(node,cls,title,sub,open){
    if(!node||node.parentElement?.classList.contains(cls))return;
    const d=document.createElement('details');d.className=cls;if(open)d.open=true;
    const sm=document.createElement('summary');sm.innerHTML=`<span><b>${esc(title)}</b><small>${esc(sub)}</small></span>${icon('chevron')}`;
    node.parentNode.insertBefore(d,node);d.appendChild(sm);d.appendChild(node);
  }

  function decorateSpeak(){
    const mobile=matchMedia('(max-width: 760px)').matches;
    const outline=document.querySelector('.scene-outline');
    wrapNode(outline,'v52-plan-drawer','Plan your route','Optional prompts before you speak.',!mobile);
    const right=document.querySelector('.speaking-layout > .coach-right');
    const hasResult=Boolean(String(runtime().transcript||'').trim())||Boolean(runtime().recordedUrl);
    wrapNode(right,'v52-feedback-drawer','Feedback & transcript','Coverage, evidence, transcript, and self-check after your attempt.',!mobile||hasResult);
  }

  const drawerState=new Map();
  const railPositions=new Map();
  let headerLastY=0,headerTravel=0,headerDirection=0,headerFrame=false;
  function updateScrollHeader(){
    headerFrame=false;
    const y=Math.max(0,root.scrollY||0),delta=y-headerLastY;headerLastY=y;
    const header=document.querySelector('.v52-lesson-shell .v52-topbar');if(!header)return;
    if(y<80||header.contains(document.activeElement)||header.querySelector('details[open]')||document.querySelector('.v59-photo-modal')){header.classList.remove('studio-header-hidden');headerTravel=0;return;}
    const direction=Math.sign(delta);if(direction&&direction!==headerDirection){headerDirection=direction;headerTravel=0;}
    headerTravel+=Math.abs(delta);
    if(headerTravel>=12){header.classList.toggle('studio-header-hidden',direction>0);headerTravel=0;}
  }
  root.addEventListener?.('scroll',()=>{if(!headerFrame){headerFrame=true;root.requestAnimationFrame(updateScrollHeader);}},{passive:true});
  document.addEventListener('focusin',e=>e.target.closest?.('.v52-topbar')?.classList.remove('studio-header-hidden'));
  document.addEventListener('click',e=>document.querySelectorAll('.studio-lesson-menu[open]').forEach(menu=>{if(!menu.contains(e.target))menu.open=false;}));
  root.addEventListener?.('resize',()=>document.querySelectorAll('.studio-category-slider').forEach(slider=>{
    const rail=slider.querySelector('.v67-hotspot-category-scroll');
    slider.firstElementChild.disabled=rail.scrollLeft<2;
    slider.lastElementChild.disabled=rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-2;
  }),{passive:true});
  function rememberDrawer(drawer,key){
    drawer.open=drawerState.get(key)||false;
    drawer.addEventListener('toggle',()=>drawerState.set(key,drawer.open));
  }
  function compactLessonHeader(shell){
    const inner=shell.querySelector('.v52-topbar .topbar-inner');
    const menu=inner?.querySelector('.studio-lesson-menu .studio-menu-body');
    if(!inner||!menu)return;
    const course=inner.querySelector(':scope > .v52-category-chip');
    if(course){
      course.classList.add('studio-menu-course');
      if(!course.querySelector('.studio-menu-label')){
        const label=document.createElement('span');label.className='studio-menu-label';label.textContent='Course map';course.append(label);
      }
      menu.append(course);
    }
    const tools=inner.querySelector(':scope > .v82-lesson-tools');
    if(tools)menu.append(tools);
    if(inner.dataset.studioHeaderObserved!=='1'){
      inner.dataset.studioHeaderObserved='1';
      new MutationObserver(()=>compactLessonHeader(shell)).observe(inner,{childList:true});
    }
  }
  function simplifyLesson(shell){
    const pathHeading=shell.querySelector('.v98-gold-heading h2');if(pathHeading)pathHeading.textContent='Your learning path';
    const pathCopy=shell.querySelector('.v98-gold-heading p');if(pathCopy)pathCopy.textContent='One step at a time: observe, practice, then describe the scene.';
    const layers=shell.querySelector('.v98-taxonomy-list');if(layers&&!layers.closest('.studio-layer-reference'))wrapNode(layers,'studio-layer-reference','Scene layers','Review the categories in this image.',false);
    const header=shell.querySelector('.v52-topbar'),inner=header?.querySelector('.topbar-inner');
    if(inner&&!inner.querySelector('.studio-lesson-menu')){
      const tools=[...inner.querySelectorAll(':scope > [data-eng-action="studio"], :scope > .v82-lesson-tools, :scope > .v52-account-btn')];
      if(tools.length){
        const menu=document.createElement('details');menu.className='studio-lesson-menu';
        menu.innerHTML='<summary aria-label="Lesson tools">•••</summary><div class="studio-menu-body"></div>';
        inner.append(menu);tools.forEach(el=>{
          const label=el.dataset.engAction==='studio'?'Studio':el.dataset.engAction==='account'?'Account':null;
          if(label){const text=document.createElement('span');text.textContent=label;el.append(text);}
          menu.lastElementChild.append(el);
        });
        menu.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.open=false;menu.querySelector('summary').focus();}});
      }
    }
    shell.querySelectorAll('.scene-controls .photo-top-actions').forEach(actions=>{
      if(actions.querySelector('.studio-scene-tools'))return;
      const optional=[...actions.children].filter(el=>el.tagName==='BUTTON'&&!/togglePhotoFocus/.test(el.getAttribute('data-eng-v52-click')||''));
      if(!optional.length)return;
      const drawer=document.createElement('details');drawer.className='studio-scene-tools';
      drawer.innerHTML='<summary>Scene tools</summary><div></div>';actions.prepend(drawer);
      optional.forEach(el=>drawer.lastElementChild.append(el));
      rememberDrawer(drawer,`scene:${lessonId()}`);
      drawer.addEventListener('keydown',event=>{if(event.key==='Escape'){event.stopPropagation();drawer.open=false;drawerState.set(`scene:${lessonId()}`,false);drawer.querySelector('summary').focus();}});
    });
    shell.querySelectorAll('.v67-hotspot-category-scroll').forEach(rail=>{
      if(rail.parentElement.classList.contains('studio-category-slider'))return;
      const slider=document.createElement('div');slider.className='studio-category-slider';
      rail.before(slider);slider.innerHTML='<button type="button" data-eng-action="slide-categories" data-direction="-1" aria-label="Previous categories">‹</button><button type="button" data-eng-action="slide-categories" data-direction="1" aria-label="More categories">›</button>';
      slider.insertBefore(rail,slider.lastElementChild);
      rail.setAttribute('tabindex','0');rail.setAttribute('aria-label','Swipe or scroll through scene categories');
      const update=()=>{slider.firstElementChild.disabled=rail.scrollLeft<2;slider.lastElementChild.disabled=rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-2;railPositions.set(lessonId(),rail.scrollLeft);};
      rail.addEventListener('scroll',update,{passive:true});
      rail.addEventListener('keydown',e=>{if(e.target!==rail||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();rail.scrollTo({left:e.key==='Home'?0:e.key==='End'?rail.scrollWidth:rail.scrollLeft+(e.key==='ArrowRight'?1:-1)*rail.clientWidth*.75,behavior:'auto'});});
      root.requestAnimationFrame(()=>{
        rail.scrollLeft=railPositions.get(lessonId())||0;
        const active=rail.querySelector('.active');if(active){const r=rail.getBoundingClientRect(),a=active.getBoundingClientRect();if(a.left<r.left)rail.scrollLeft-=r.left-a.left;else if(a.right>r.right)rail.scrollLeft+=a.right-r.right;}
        update();
      });
    });
    shell.querySelectorAll('.scene-controls').forEach(controls=>{
      const actions=controls.querySelector('.photo-top-actions');if(!actions)return;
      controls.classList.add('studio-compact-controls');
      const categories=controls.querySelector('.v67-hotspot-categories');
      if(categories&&!actions.querySelector('.studio-category-select')){
        const select=document.createElement('select');select.className='studio-category-select';select.setAttribute('aria-label','Scene category');
        const buttons=[...categories.querySelectorAll('.v67-hotspot-category-scroll button')];
        buttons.forEach((button,index)=>{const option=document.createElement('option');option.value=String(index);option.textContent=[...button.children].map(el=>el.textContent.trim()).join(' · ');option.selected=button.classList.contains('active');option.dataset.contract=button.getAttribute('data-eng-v52-click');select.append(option);});
        select.addEventListener('change',event=>{
          const option=select.selectedOptions[0],hadFocus=document.activeElement===select;
          if(option?.dataset.contract)root.EngBookEventRouter.execute(option.dataset.contract,event,select);
          if(hadFocus&&!/showMarkedHotspots/.test(option?.dataset.contract||''))root.requestAnimationFrame(()=>document.querySelector('.studio-category-select')?.focus({preventScroll:true}));
        });
        actions.prepend(select);categories.hidden=true;
      }
      const drawer=actions.querySelector('.studio-scene-tools');
      if(drawer){const summary=drawer.querySelector('summary');summary.setAttribute('aria-label','Scene tools');summary.title='Scene tools';summary.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 7h9m4 0h3M4 17h3m4 0h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/></svg>';}
      const focus=actions.querySelector('[data-eng-v52-click*="togglePhotoFocus"]');if(focus){
        if(controls.closest('.photo-modal')){focus.remove();actions.classList.add('studio-focus-actions');}
        else{focus.setAttribute('aria-label','Focus');focus.title='Focus';focus.classList.add('studio-focus-icon');}
      }
      const caption=controls.querySelector('.scene-caption');
      if(caption&&runtime().mode==='explore'&&drawer)drawer.lastElementChild.append(caption);
      if(!categories&&!actions.querySelector('.studio-scene-label')){
        const label=document.createElement('span');label.className='studio-scene-label';label.textContent=modeMeta[runtime().mode]?.[1]||'Scene';actions.prepend(label);
      }
    });
    const sceneTitle=header?.querySelector('.v52-scene-title b');if(sceneTitle)sceneTitle.title=sceneTitle.textContent;
    const activity=shell.querySelector('.v59-activity-area');
    if(activity){
      activity.classList.add('studio-minimal-activity');
      const heading=activity.querySelector('.panel-heading');
      if(heading&&['explore','practice'].includes(runtime().mode)){
        heading.classList.add('studio-compact-heading');
        const title=heading.querySelector('h2'),copy=heading.querySelector('p');
        if(title)title.textContent=runtime().mode==='practice'?'Practice':'Your progress';
        if(copy)copy.textContent=runtime().mode==='practice'?'Find the detail in the picture.':'Review the details you have discovered.';
      }
      const back=activity.querySelector('.v96-back-to-scene');
      if(back&&heading&&!heading.contains(back)){back.title='Back to picture';back.setAttribute('aria-label','Back to picture');heading.append(back);}
      const tabs=activity.querySelector('.practice-tabs');
      if(tabs&&!activity.querySelector('.studio-practice-select')){
        const select=document.createElement('select');select.className='studio-practice-select';select.setAttribute('aria-label','Practice type');
        tabs.querySelectorAll('button').forEach((button,index)=>{const option=document.createElement('option');option.value=String(index);option.textContent=button.textContent.trim();option.selected=button.classList.contains('active');option.disabled=button.disabled;option.dataset.contract=button.getAttribute('data-eng-v52-click');select.append(option);});
        select.addEventListener('change',event=>{const option=select.selectedOptions[0];if(option?.dataset.contract)root.EngBookEventRouter.execute(option.dataset.contract,event,select);root.requestAnimationFrame(()=>document.querySelector('.studio-practice-select')?.focus({preventScroll:true}));});
        tabs.before(select);
      }
    }
    const map=shell.querySelector('.mastery-map');
    const welcome=shell.querySelector('.studio-welcome');
    if(welcome&&!welcome.querySelector('.studio-explore-guide')){
      const title=welcome.querySelector('h2'),copy=welcome.querySelector(':scope > p');
      if(title)title.textContent='Choose a detail';
      if(copy)copy.textContent='Select a dot to open its word, useful phrase and example.';
      const extras=[...welcome.querySelectorAll(':scope > .interaction-flow, :scope > .studio-tip')];
      if(extras.length){const d=document.createElement('details');d.className='studio-explore-guide';d.innerHTML='<summary>How to explore</summary>';welcome.append(d);extras.forEach(el=>d.append(el));}
    }
    if(map&&!map.closest('.studio-progress-drawer')){
      wrapNode(map,'studio-progress-drawer','Your scene progress','Open the full list of discovered and remaining details.',false);
      rememberDrawer(map.parentElement,`progress:${lessonId()}`);
    }
    compactLessonHeader(shell);
    headerLastY=Math.max(0,root.scrollY||0);
  }
  let sceneResizeObserver;
  function decorateLesson(){
    document.documentElement.classList.add('v52-ui');
    if(root.EngBookSceneCanvas){
      if(!root.EngBookSceneCanvas.active())root.EngBookSceneCanvas.render();
      return;
    }
    const shell=document.querySelector('.app-shell');if(!shell)return;
    if(typeof root.ResizeObserver==='function'){
      sceneResizeObserver??=new root.ResizeObserver(entries=>entries.forEach(({target})=>root.v59FitStage?.(target)));
      sceneResizeObserver.disconnect();
    }
    shell.querySelectorAll('.image-stage').forEach(stage=>{
      if(stage.parentElement?.classList.contains('scene-layout')){sceneResizeObserver?.observe(stage);return;}
      const layout=document.createElement('div');layout.className='scene-layout';
      const controls=document.createElement('div');controls.className='scene-controls';controls.setAttribute('aria-label','Picture controls');
      stage.before(layout);layout.append(controls,stage);
      stage.querySelectorAll(':scope > .photo-top-actions, :scope > .v67-hotspot-categories, :scope > .v97-scene-status, :scope > .scene-caption').forEach(el=>controls.append(el));
      stage.querySelectorAll('.v35-detail-chip, .v55-detail-groups').forEach(el=>controls.append(el));
      root.v59FitStage?.(stage);
      sceneResizeObserver?.observe(stage);
    });
    shell.classList.add('v52-lesson-shell');shell.dataset.uiVersion='0.52';shell.dataset.lessonMode=runtime().mode||'explore';
    simplifyLesson(shell);
    const main=shell.querySelector('.lesson-main');if(main){main.setAttribute('role','main');main.setAttribute('aria-label','Lesson workspace');}
    if(main){
      const mode=runtime().mode||'explore',step=PRIMARY_MODES.indexOf(mode),next=PRIMARY_MODES[step+1];
      const hints={explore:'Tap a dot in the picture.',learn:'Learn a phrase and its example.',practice:'Try a short exercise.',speak:'Describe the picture in your own words.',talk:'Use the scene in a conversation.'};
      let cue=main.querySelector('.studio-wayfinding');if(!cue){cue=document.createElement('div');cue.className='studio-wayfinding';main.prepend(cue);}
      cue.innerHTML='<div><b>'+String(step+1)+' / 5 · '+esc(modeMeta[mode]?.[1]||'Explore')+'</b><span>'+esc(hints[mode]||hints.explore)+'</span></div>'+(next?'<button type="button" data-eng-action="mode" data-mode="'+next+'" '+(capOff(lessonId(),next)?'disabled':'')+'>Next: '+modeMeta[next][1]+' '+icon('chevron')+'</button>':'<button type="button" data-eng-action="pick-lesson">Choose lesson '+icon('chevron')+'</button>');
    }
    const ribbon=shell.querySelector('.v27-coach-ribbon');if(ribbon){ribbon.classList.add('v52-next-cue');const sm=ribbon.querySelector('small');if(sm)sm.textContent='NEXT';}
    if(runtime().mode==='speak')decorateSpeak();
    if(runtime().mode==='explore'){const map=shell.querySelector('.mastery-map');if(map)map.setAttribute('aria-label','Scene anchors and mastery');}
    
  }

  function renderHome(){root.EngBookSceneCanvas?.cleanup();if(root.EngBookCoursePath?.prepareHome(runtime().progress))call('saveProgress');legacy.renderHome?.();decorateHome();}
  function renderLesson(){if(root.EngBookSceneCanvas?.render())return;legacy.renderLesson?.();decorateLesson();}

  async function doAction(el){
    const action=el.dataset.engAction;
    if(action==='path-top'){if(root.EngBookHomeHero)root.EngBookHomeHero.show('welcome');else root.scrollTo({top:0,behavior:'auto'});return;}
    if(action==='learning-path')return root.EngBookHomeHero?.show('lessons');
    if(action==='how-it-works'){root.EngBookHomeHero?.show('welcome',{focus:false});document.getElementById('how-it-works')?.scrollIntoView({block:'center',behavior:root.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});return;}
    if(action==='pick-lesson')return openLessonPicker();
    if(action==='switch-lesson'){
      const id=Number(el.dataset.lesson);if(!id||el.disabled)return;
      document.querySelector('.studio-library')?.close();if(id===lessonId()&&runtime().screen!=='home')return;
      return typeof root.v28EnsureAndOpenLesson==='function'?root.v28EnsureAndOpenLesson(id,'explore'):call('openLesson',id);
    }
    if(action==='slide-categories'){
      const rail=el.closest('.studio-category-slider')?.querySelector('.v67-hotspot-category-scroll');
      rail?.scrollBy({left:Number(el.dataset.direction)*rail.clientWidth*.8,behavior:root.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});return;
    }
    if(action==='home')return call('goHome');
    if(action==='mode'){const mode=el.dataset.mode;if(PRIMARY_MODES.includes(mode)&&!el.disabled)return call('setMode',mode);}
    if(action==='studio')return call('productOpenMore');
    if(action==='course')return call('v33OpenCourseMap',Number(el.dataset.category||categoryFor(lessonId())));
    if(action==='account')return call('v31OpenAccount');
    if(action==='lesson'){const id=Number(el.dataset.lesson||0),mode=el.dataset.mode||'explore';if(id>0)return typeof root.v28EnsureAndOpenLesson==='function'?root.v28EnsureAndOpenLesson(id,mode):call('openLesson',id);}
  }
  document.addEventListener('click',e=>{const el=e.target.closest?.('[data-eng-action]');if(!el)return;e.preventDefault();Promise.resolve(doAction(el)).catch(err=>root.v21PushError?.(err,'v52-ui-action'));});
  document.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const el=e.target.closest?.('[data-eng-action]');if(!el||el.tagName==='BUTTON')return;e.preventDefault();Promise.resolve(doAction(el));});

  root.topbar=topbar;root.modeTabs=modeTabs;root.bottomNav=bottomNav;root.renderHome=renderHome;root.renderLesson=renderLesson;
  /* Some legacy mode controllers retain earlier render references. Observe only
     direct #app replacements, then re-apply the authoritative v0.52 decoration.
     subtree=false avoids loops when the decorator wraps internal panels. */
  const appRoot=document.getElementById('app');
  const syncRenderedShell=()=>{try{if(document.querySelector('.v27-shell'))decorateHome();else if(document.querySelector('.app-shell'))decorateLesson();}catch(e){root.v21PushError?.(e,'v52-shell-sync');}};
  if(appRoot)new MutationObserver(()=>queueMicrotask(syncRenderedShell)).observe(appRoot,{childList:true});
  // Re-render once so the authoritative shell replaces legacy chrome immediately.
  queueMicrotask(()=>{if(root.EngBookStartup?.pending)return;try{if(runtime().screen==='home'||!runtime().lesson)renderHome();else renderLesson();queueMicrotask(syncRenderedShell);}catch(e){root.v21PushError?.(e,'v52-shell-boot');}});
  root.EngBookUI=Object.freeze({version:VERSION,architecture:'authoritative-shell',primaryModes:[...PRIMARY_MODES],decorateHome,decorateLesson,syncRenderedShell,legacyInlineHandlersRemain:false,sourceEventContracts:true,activeInlineHandlers:()=>root.EngBookEventRouter?.audit?.().activeInlineHandlers??null});
})(typeof window!=='undefined'?window:globalThis);
