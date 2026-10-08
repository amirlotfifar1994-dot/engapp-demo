/* EngBook UI Shell v0.51
   Strangler-style architecture layer: the 60 quality-locked lessons remain
   untouched while navigation, home hierarchy, lesson chrome, and production
   UI behavior move behind one authoritative shell API.
*/
(function(root){
  'use strict';
  const VERSION='0.51';
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
  const lessonId=()=>Number(typeof root.activeLessonId==='function'?root.activeLessonId():runtime().lesson?.id||1);
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
    return `<header class="topbar v51-topbar" data-v51-shell="topbar"><div class="topbar-inner">
      <button class="v51-icon-btn" data-eng-action="home" aria-label="Back to home">${icon('back')}</button>
      <div class="v51-brand"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual Conversation</small></div></div>
      <button class="v51-category-chip" data-eng-action="course" data-category="${cat}" aria-label="Open course map"><small>CAT</small><b>${String(cat).padStart(2,'0')}</b></button>
      <div class="v51-scene-title"><span>LESSON ${String(id).padStart(2,'0')}</span><b>${esc(lesson?.title||'Lesson')}</b></div>
      <div class="v51-progress" aria-label="Lesson progress ${pct}%"><b>${pct}%</b><i><em style="width:${pct}%"></em></i></div>
      <button class="v51-icon-btn" data-eng-action="studio" aria-label="Open Studio tools">${icon('layers')}</button>
      ${typeof root.v31OpenAccount==='function'?`<button class="v51-account-btn" data-eng-action="account" aria-label="Account and access">${icon('user')}</button>`:''}
    </div></header>`;
  }

  function modeTabs(){
    const id=lessonId();
    return `<nav class="v51-mode-tabs" aria-label="Lesson modes">${PRIMARY_MODES.map(mode=>{const [ic,label]=modeMeta[mode],off=capOff(id,mode);return `<button data-eng-action="mode" data-mode="${mode}" class="${runtime().mode===mode?'active':''} ${off?'disabled':''}" ${off?'disabled aria-disabled="true"':''}>${icon(ic)}<span>${label}</span></button>`;}).join('')}</nav>`;
  }

  function bottomNav(){
    const id=lessonId();
    return `<nav class="v51-bottom-nav" aria-label="Mobile lesson modes">${PRIMARY_MODES.map(mode=>{const [ic,label]=modeMeta[mode],off=capOff(id,mode);return `<button data-eng-action="mode" data-mode="${mode}" class="${runtime().mode===mode?'active':''} ${off?'disabled':''}" ${off?'disabled aria-disabled="true"':''}>${icon(ic)}<span>${label}</span></button>`;}).join('')}</nav>`;
  }

  function makeDetails(nodes,title,sub){
    const live=nodes.filter(Boolean);if(!live.length)return null;
    const details=document.createElement('details');details.className='v51-home-more';
    details.innerHTML=`<summary><span><small>OPTIONAL DEPTH</small><b>${esc(title)}</b><em>${esc(sub)}</em></span>${icon('chevron')}</summary><div class="v51-home-more-body"></div>`;
    const body=details.querySelector('.v51-home-more-body');live.forEach(n=>body.appendChild(n));return details;
  }

  function decorateHome(){
    document.documentElement.classList.add('v51-ui');
    const shell=document.querySelector('.v27-shell');if(!shell)return;
    shell.classList.add('v51-home-shell');shell.dataset.uiVersion='0.50';
    const header=shell.querySelector('.v27-home-header');header?.classList.add('v51-home-header');
    const status=header?.querySelector('.v27-home-status span');if(status)status.innerHTML=`<i></i>${BUILD.readyLessons?.length||60} lessons ready`;
    const last=Number(runtime().progress?.lastLesson||1),cat=categoryFor(last),catData=root.EngBookContent?.getCategory?.(cat);
    const heroCat=shell.querySelector('.v27-hero-copy>span');if(heroCat&&catData)heroCat.textContent=`CATEGORY ${String(cat).padStart(2,'0')} • ${catData.title}`;
    const home=shell.querySelector('.v27-home');
    if(home&&!home.querySelector('.v51-home-more')){
      /* The production home had accumulated several generations of secondary
         feature cards. Keep the first decision surfaces visible and move every
         optional dashboard/studio block behind one deliberate disclosure. */
      const direct=[...home.children],footer=direct.find(n=>n.classList.contains('v27-footer'))||null;
      const keep=node=>node.classList.contains('v27-home-header')||node.classList.contains('v27-hero')||/TODAY'S MICRO-MISSIONS/i.test(node.textContent||'')||/YOUR COURSE/i.test(node.textContent||'')||node===footer;
      const optional=direct.filter(n=>!keep(n)&&!n.classList.contains('v51-home-more'));
      const more=makeDetails(optional,'Progress insights & specialist tools','Learning path, communication analytics, review, and advanced Studio tools — available when you want them.');
      if(more)home.insertBefore(more,footer);
    }
    const coach=shell.querySelector('.v27-coach-card');
    if(coach&&!coach.closest('.v51-coach-settings'))wrapNode(coach,'v51-coach-settings','Coaching support','Choose Guided, Balanced, or Independent support.',false);
    shell.querySelectorAll('.v27-section-head>div>span').forEach(x=>x.classList.add('v51-eyebrow'));
    // Fresh profiles have no historical mission score yet. Legacy mission cards
    // used clamp(undefined), which surfaced as `NaN current signal`. Keep the
    // absence of evidence explicit instead of displaying a broken number.
    shell.querySelectorAll('.v27-mission-grid > button').forEach(card=>{
      const small=card.querySelector('small');
      if(small&&/NaN/i.test(small.textContent||'')){small.textContent='Not measured yet';const bar=card.querySelector('div > i');if(bar)bar.style.width='0%';}
    });
    root.EngBookLegacyEvents?.quarantine?.(shell);
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
    wrapNode(outline,'v51-plan-drawer','Plan your route','Optional prompts before you speak.',!mobile);
    const right=document.querySelector('.speaking-layout > .coach-right');
    const hasResult=Boolean(String(runtime().transcript||'').trim())||Boolean(runtime().recordedUrl);
    wrapNode(right,'v51-feedback-drawer','Feedback & transcript','Coverage, evidence, transcript, and self-check after your attempt.',!mobile||hasResult);
  }

  function decorateLesson(){
    document.documentElement.classList.add('v51-ui');
    const shell=document.querySelector('.app-shell');if(!shell)return;
    shell.classList.add('v51-lesson-shell');shell.dataset.uiVersion='0.50';
    const main=shell.querySelector('.lesson-main');if(main){main.setAttribute('role','main');main.setAttribute('aria-label','Lesson workspace');}
    const ribbon=shell.querySelector('.v27-coach-ribbon');if(ribbon){ribbon.classList.add('v51-next-cue');const sm=ribbon.querySelector('small');if(sm)sm.textContent='NEXT';}
    if(runtime().mode==='speak')decorateSpeak();
    if(runtime().mode==='explore'){const map=shell.querySelector('.mastery-map');if(map)map.setAttribute('aria-label','Scene anchors and mastery');}
    root.EngBookLegacyEvents?.quarantine?.(shell);
  }

  function renderHome(){legacy.renderHome?.();decorateHome();}
  function renderLesson(){legacy.renderLesson?.();decorateLesson();}

  async function doAction(el){
    const action=el.dataset.engAction;
    if(action==='home')return call('goHome');
    if(action==='mode'){const mode=el.dataset.mode;if(PRIMARY_MODES.includes(mode)&&!el.disabled)return call('setMode',mode);}
    if(action==='studio')return call('productOpenMore');
    if(action==='course')return call('v33OpenCourseMap',Number(el.dataset.category||categoryFor(lessonId())));
    if(action==='account')return call('v31OpenAccount');
    if(action==='lesson'){const id=Number(el.dataset.lesson||0),mode=el.dataset.mode||'explore';if(id>0)return typeof root.v28EnsureAndOpenLesson==='function'?root.v28EnsureAndOpenLesson(id,mode):call('openLesson',id);}
  }
  document.addEventListener('click',e=>{const el=e.target.closest?.('[data-eng-action]');if(!el)return;e.preventDefault();Promise.resolve(doAction(el)).catch(err=>root.v21PushError?.(err,'v51-ui-action'));});
  document.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const el=e.target.closest?.('[data-eng-action]');if(!el||el.tagName==='BUTTON')return;e.preventDefault();Promise.resolve(doAction(el));});

  root.topbar=topbar;root.modeTabs=modeTabs;root.bottomNav=bottomNav;root.renderHome=renderHome;root.renderLesson=renderLesson;
  /* Some legacy mode controllers retain earlier render references. Observe only
     direct #app replacements, then re-apply the authoritative v0.51 decoration.
     subtree=false avoids loops when the decorator wraps internal panels. */
  const appRoot=document.getElementById('app');
  const syncRenderedShell=()=>{try{if(document.querySelector('.v27-shell'))decorateHome();else if(document.querySelector('.app-shell'))decorateLesson();}catch(e){root.v21PushError?.(e,'v51-shell-sync');}};
  if(appRoot)new MutationObserver(()=>queueMicrotask(syncRenderedShell)).observe(appRoot,{childList:true});
  // Re-render once so the authoritative shell replaces legacy chrome immediately.
  queueMicrotask(()=>{try{if(runtime().screen==='home'||!runtime().lesson)renderHome();else renderLesson();queueMicrotask(syncRenderedShell);}catch(e){root.v21PushError?.(e,'v51-shell-boot');}});
  root.EngBookUI=Object.freeze({version:VERSION,architecture:'authoritative-shell',primaryModes:[...PRIMARY_MODES],decorateHome,decorateLesson,syncRenderedShell,legacyInlineHandlersRemain:true,legacyInlineHandlersActive:()=>root.EngBookLegacyEvents?.audit?.().activeInlineHandlers??null});
})(typeof window!=='undefined'?window:globalThis);
