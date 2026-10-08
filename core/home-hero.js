/* The landing page introduces the same picture-to-language journey as lessons.
   The welcome and learning path are separate views. Previewing a picture never
   changes learner progress. */
(function(root){
  'use strict';
  const scenes=Object.freeze([
    {id:5,label:'Garden',words:[['swing',27,43],['flowers',12,76],['garden',86,78]]},
    {id:3,label:'Park',words:[['running',31,73],['park',85,78]]},
    {id:34,label:'Art studio',words:[['painting',78,77],['easel',47,57]]}
  ]);
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const icon=name=>typeof root.icon==='function'?root.icon(name):'';
  let selectedId=5;
  let view=root.location?.hash==='#lessons'?'lessons':'welcome';
  function show(next,{navigate=true,focus=true}={}){
    view=next==='lessons'?'lessons':'welcome';
    const home=document.querySelector('.moments-home');if(!home)return;
    document.querySelector('.studio-library')?.close();
    home.dataset.homeView=view;
    home.querySelector('.moments-hero').hidden=view!=='welcome';
    home.querySelector('.path-main').hidden=view!=='lessons';
    home.querySelectorAll('.path-nav [data-eng-action]').forEach(button=>{
      const action=button.dataset.engAction,active=view==='welcome'?action==='path-top':action==='learning-path';
      if(active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
    });
    home.querySelector('.path-brand').setAttribute('data-eng-action','path-top');
    if(navigate){
      const url=new URL(root.location.href);url.searchParams.delete('lesson');url.searchParams.delete('mode');url.hash=view==='lessons'?'lessons':'app';
      if(url.href!==root.location.href)root.history.pushState({sceneSpeakHome:view},'',url);
    }
    root.scrollTo({top:0,behavior:'auto'});
    if(focus){const heading=home.querySelector(view==='welcome'?'#moments-title':'.path-unit h2');if(heading){heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});}}
  }
  function mount(home,{content}={}){
    if(home.querySelector('.moments-hero'))return;
    const available=scenes.map(scene=>({...scene,meta:content?.getMeta?.(scene.id)})).filter(scene=>scene.meta?.image&&scene.meta.ready!==false);
    if(!available.length)return;
    if(!available.some(scene=>scene.id===selectedId))selectedId=available[0].id;
    const hero=document.createElement('section');hero.className='moments-hero';hero.setAttribute('aria-labelledby','moments-title');
    hero.innerHTML=`<div class="moments-layout"><div class="moments-copy"><div class="moments-intro"><p class="moments-eyebrow">ENGLISH, THROUGH YOUR EYES</p><h1 id="moments-title">Turn moments<br>into <span>English.</span></h1><p class="moments-description">Look. Wonder. Find the words.<br>Describe what you see.</p></div><div class="moments-actions"><button type="button" class="moments-start" data-eng-action="learning-path">Start learning ${icon('chevron')}</button></div></div><div class="moments-visual"><figure class="moments-picture"><img class="moments-photo" width="1344" height="768" decoding="async" fetchpriority="high" alt=""><figcaption class="moments-question">How would you describe<br>this moment?</figcaption><div class="moments-words" aria-label="Words in this picture"></div></figure><div class="moments-scenes" role="group" aria-label="Preview learning scenes">${available.map(scene=>`<button type="button" class="moments-scene" data-hero-scene="${scene.id}" aria-label="Preview ${esc(scene.label.toLowerCase())} scene" aria-pressed="false"><img src="${esc(scene.meta.image)}" alt="" width="1344" height="768" decoding="async"><span>${esc(scene.label)}</span></button>`).join('')}</div><p class="moments-scene-status sr-only" role="status" aria-live="polite"></p></div></div><ol class="moments-steps" id="how-it-works" aria-label="How SceneSpeak works"><li><span class="moments-step-icon" aria-hidden="true">${icon('eye')}</span><div><h2><small>01</small> See a detail</h2><p>Notice people, objects and actions.</p></div></li><li><span class="moments-step-icon" aria-hidden="true">${icon('book')}</span><div><h2><small>02</small> Learn a phrase</h2><p>Find useful words for what you see.</p></div></li><li><span class="moments-step-icon" aria-hidden="true">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11.5a8.2 8.2 0 0 1-8.5 8L4 21l1.5-5A8.2 8.2 0 0 1 3 10a8.2 8.2 0 0 1 8.5-7A8.2 8.2 0 0 1 20 11.5Z"/></svg>'}</span><div><h2><small>03</small> Say it your way</h2><p>Describe what you see and what might be happening.</p></div></li></ol>`;
    const update=(announce=false)=>{
      const scene=available.find(item=>item.id===selectedId),photo=hero.querySelector('.moments-photo');
      photo.src=scene.meta.image;photo.alt=scene.meta.title;
      hero.querySelectorAll('[data-hero-scene]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.heroScene)===scene.id)));
      hero.querySelector('.moments-words').innerHTML=scene.words.map(([word,x,y])=>`<span style="--word-x:${x}%;--word-y:${y}%">${esc(word)}</span>`).join('');
      if(announce)hero.querySelector('.moments-scene-status').textContent=`${scene.label} picture selected.`;
    };
    hero.addEventListener('click',event=>{
      const button=event.target.closest('[data-hero-scene]');if(!button)return;
      selectedId=Number(button.dataset.heroScene);update(true);
    });
    update();home.querySelector('.path-main').before(hero);home.classList.add('moments-home');
    const learningPath=home.querySelector('.path-main');learningPath.id='learning-path';learningPath.setAttribute('aria-label','Your learning path');
    show(view,{navigate:false,focus:false});
  }
  root.addEventListener('popstate',()=>{
    if(root.location.search.includes('lesson='))return;
    const next=root.location.hash==='#lessons'?'lessons':'welcome';
    if(!document.querySelector('.moments-home'))root.goHome?.();
    show(next,{navigate:false});
  });
  root.EngBookHomeHero=Object.freeze({mount,show});
})(typeof window!=='undefined'?window:globalThis);
