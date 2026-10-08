/* EngBook v0.71 — Global My Marks library and direct return-to-content navigation. */
(function(root){
  'use strict';
  const PM=root.EngBookPersonalMarks;
  if(!PM)return;
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const q=s=>String(s??'').replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g,' ');
  const ensureState=()=>{if(!state.myMarksLibrary||typeof state.myMarksLibrary!=='object')state.myMarksLibrary={open:false,lesson:'all',type:'all',status:'all'};return state.myMarksLibrary;};
  const lessonTitle=id=>{try{return root.EngBookContent?.getMeta?.(Number(id))?.title||root.EngBookContent?.resolve?.(Number(id))?.lesson?.title||`Lesson ${String(id).padStart(2,'0')}`;}catch(e){return `Lesson ${String(id).padStart(2,'0')}`;}};
  const typeLabel=t=>({hotspot:'Hotspot',scenario:'Scenario',sentence:'Sentence',grammar:'Grammar',phrase:'Phrase','lesson-section':'Lesson section'}[t]||String(t||'Item'));
  function items(){return PM.list(progress);}
  function filtered(){const s=ensureState();return items().filter(x=>{
    if(s.lesson!=='all'&&Number(x.lessonId)!==Number(s.lesson))return false;
    if(s.type!=='all'&&x.type!==s.type)return false;
    if(s.status==='marked'&&!x.marked)return false;
    if(s.status==='highlighted'&&!x.highlighted)return false;
    if(s.status==='both'&&!(x.marked&&x.highlighted))return false;
    return true;
  });}
  function stats(){const a=items();return {all:a.length,marked:a.filter(x=>x.marked).length,highlighted:a.filter(x=>x.highlighted).length,both:a.filter(x=>x.marked&&x.highlighted).length,lessons:new Set(a.map(x=>Number(x.lessonId))).size};}
  function lessonOptions(){const ids=[...new Set(items().map(x=>Number(x.lessonId)).filter(Boolean))].sort((a,b)=>a-b);return ids.map(id=>({id,title:lessonTitle(id),count:PM.count(progress,{lessonId:id})}));}
  function typeOptions(){const map=new Map();items().forEach(x=>map.set(x.type,(map.get(x.type)||0)+1));return [...map.entries()].sort((a,b)=>a[0].localeCompare(b[0]));}
  function badge(item){return `${item.marked?'<span class="v71-badge mark">★ Marked</span>':''}${item.highlighted?'<span class="v71-badge highlight">▰ Highlighted</span>':''}`;}
  function card(item){return `<article class="v71-mark-card ${item.marked?'is-marked':''} ${item.highlighted?'is-highlighted':''}">
    <header><div><span>${esc(typeLabel(item.type))} • Lesson ${String(item.lessonId).padStart(2,'0')}</span><h3>${esc(item.label||item.category||typeLabel(item.type))}</h3><small>${esc(lessonTitle(item.lessonId))}${item.category?` • ${esc(item.category)}`:''}</small></div><div class="v71-status-badges">${badge(item)}</div></header>
    ${item.text?`<p class="v71-mark-text">${esc(item.text)}</p>`:''}
    <footer><button class="primary" data-eng-v52-click="openPersonalMark('${q(item.key)}')">Open in lesson ${icon('chevron')}</button><div><button class="${item.marked?'active':''}" data-eng-v52-click="libraryToggleMark('${q(item.key)}')">${item.marked?'★':'☆'} Mark</button><button class="${item.highlighted?'active':''}" data-eng-v52-click="libraryToggleHighlight('${q(item.key)}')">▰ Highlight</button><button class="danger" data-eng-v52-click="libraryRemoveItem('${q(item.key)}')">Remove</button></div></footer>
  </article>`;}
  function empty(){return `<div class="v71-empty"><div>☆</div><h3>No saved learning marks here.</h3><p>Mark or highlight a hotspot, scenario, sentence, phrase, or grammar example and it will appear in this personal review library.</p><button data-eng-v52-click="closeMyMarksLibrary()">Back to learning</button></div>`;}
  function libraryHtml(){const s=ensureState(),st=stats(),rows=filtered(),lessons=lessonOptions(),types=typeOptions();return `<div class="v71-library-backdrop" data-eng-v52-click="if(event.target===this)closeMyMarksLibrary()"><section class="v71-library" role="dialog" aria-modal="true" aria-labelledby="v71-library-title">
    <header class="v71-library-head"><div><span>PERSONAL REVIEW</span><h2 id="v71-library-title">My Marks</h2><p>Your marked hotspots, scene combinations, builder sentences, language-bank phrases, and grammar examples — collected across lessons.</p></div><button class="v71-close" data-eng-v52-click="closeMyMarksLibrary()" aria-label="Close My Marks">${icon('close')}</button></header>
    <div class="v71-stats"><article><b>${st.all}</b><span>saved items</span></article><article><b>${st.marked}</b><span>marked</span></article><article><b>${st.highlighted}</b><span>highlighted</span></article><article><b>${st.lessons}</b><span>lessons</span></article></div>
    <div class="v71-filters"><div><span>LESSON</span><div class="v71-filter-scroll"><button class="${s.lesson==='all'?'active':''}" data-eng-v52-click="setMyMarksFilter('lesson','all')">All <i>${st.all}</i></button>${lessons.map(x=>`<button class="${String(s.lesson)===String(x.id)?'active':''}" data-eng-v52-click="setMyMarksFilter('lesson','${x.id}')">${esc(`L${String(x.id).padStart(2,'0')}`)} <i>${x.count}</i></button>`).join('')}</div></div>
      <div><span>CONTENT</span><div class="v71-filter-scroll"><button class="${s.type==='all'?'active':''}" data-eng-v52-click="setMyMarksFilter('type','all')">All</button>${types.map(([t,n])=>`<button class="${s.type===t?'active':''}" data-eng-v52-click="setMyMarksFilter('type','${q(t)}')">${esc(typeLabel(t))} <i>${n}</i></button>`).join('')}</div></div>
      <div><span>STATUS</span><div class="v71-filter-scroll">${[['all','All'],['marked','Marked'],['highlighted','Highlighted'],['both','Both']].map(([k,l])=>`<button class="${s.status===k?'active':''}" data-eng-v52-click="setMyMarksFilter('status','${k}')">${l}</button>`).join('')}</div></div></div>
    <div class="v71-library-body"><div class="v71-result-head"><b>${rows.length} item${rows.length===1?'':'s'}</b><span>Newest first</span></div>${rows.length?`<div class="v71-mark-grid">${rows.map(card).join('')}</div>`:empty()}</div>
  </section></div>`;}
  function mount(){document.querySelector('.v71-library-backdrop')?.remove();if(!ensureState().open)return;document.body.insertAdjacentHTML('beforeend',libraryHtml());}
  root.openMyMarksLibrary=function(){ensureState().open=true;haptic(8);mount();};
  root.closeMyMarksLibrary=function(){ensureState().open=false;document.querySelector('.v71-library-backdrop')?.remove();};
  root.setMyMarksFilter=function(key,value){const s=ensureState();if(!['lesson','type','status'].includes(key))return;s[key]=value;mount();};
  function byKey(key){return PM.list(progress).find(x=>x.key===key)||null;}
  root.libraryToggleMark=function(key){const item=byKey(key);if(!item)return;PM.toggleMark(progress,item,{label:item.label,text:item.text,category:item.category});saveProgress();mount();};
  root.libraryToggleHighlight=function(key){const item=byKey(key);if(!item)return;PM.toggleHighlight(progress,item,{label:item.label,text:item.text,category:item.category});saveProgress();mount();};
  root.libraryRemoveItem=function(key){const item=byKey(key);if(!item)return;if(item.marked)PM.toggleMark(progress,item,{label:item.label,text:item.text,category:item.category});const cur=PM.find(progress,item);if(cur?.highlighted)PM.toggleHighlight(progress,item,{label:item.label,text:item.text,category:item.category});saveProgress();mount();};
  function categoryKeyForHotspot(lessonId,h){
    if(Number(lessonId)===2){const tax=root.EngBookHotspotTaxonomy?.get?.(2);return tax?.classifier?.(h)||null;}
    if(Number(lessonId)===1&&typeof v67L01CategoryMatch==='function')for(const k of ['actions','clothing','people','environment','light'])if(v67L01CategoryMatch(h,k))return k;
    return null;
  }
  function jumpHotspot(item){
    openLesson(Number(item.lessonId));setMode('explore');state.personalMarkFilter=false;
    const hs=state.lesson?.hotspots||[],index=hs.findIndex(h=>String(h.id||h.en)===String(item.id));if(index<0){render();toast('This hotspot is no longer available in the lesson.');return;}
    const h=hs[index],cat=categoryKeyForHotspot(item.lessonId,h);
    if(Number(item.lessonId)===1&&cat&&typeof l01SetHotspotCategory==='function')l01SetHotspotCategory(cat);
    else if(Number(item.lessonId)===2&&cat&&typeof root.setAdaptiveHotspotCategory==='function')root.setAdaptiveHotspotCategory(cat);
    state.selected=index;state.v60AnchorLabel=index;state.v60CardOpen=true;state.v60GrammarOpen=false;v59EnsureViewer().sheet='peek';render();
  }
  function jumpScenario(item){openLesson(Number(item.lessonId));setMode('learn');if(Number(item.lessonId)===1)state.l01JourneyStep='scenario';if(Number(item.lessonId)===2)state.l02JourneyStep='scenario';render();}
  root.openPersonalMark=function(key){const item=byKey(key);if(!item)return;root.closeMyMarksLibrary();if(item.type==='hotspot')return jumpHotspot(item);if(item.type==='scenario')return jumpScenario(item);openLesson(Number(item.lessonId));setMode('learn');render();toast(`Opened ${typeLabel(item.type)} in Lesson ${String(item.lessonId).padStart(2,'0')}.`);};

  // Home and lesson entry points.
  if(typeof renderHome==='function'){
    const _home=renderHome;renderHome=function(){const out=_home();const n=PM.count(progress);const host=document.querySelector('.v27-home-status,.home-top,.v33-home-header');if(host&&!host.querySelector('.v71-library-entry'))host.insertAdjacentHTML('beforeend',`<button class="v71-library-entry" data-eng-v52-click="openMyMarksLibrary()"><span>★</span><b>My Marks</b><i>${n}</i></button>`);return out;};
  }
  if(typeof topbar==='function'){
    const _top=topbar;topbar=function(){let html=_top();const n=PM.count(progress);const btn=`<button class="v71-top-marks" data-eng-v52-click="openMyMarksLibrary()" aria-label="Open My Marks"><span>★</span><b>${n}</b></button>`;if(!html.includes('v71-top-marks'))html=html.replace(/(<button class="round-btn ghost help-btn")/,`${btn}$1`);return html;};
  }
  // Upgrade lesson-level summary to open the global library as well.
  if(typeof learnContent==='function'){
    const _learn=learnContent;learnContent=function(){let html=_learn();if(PM.count(progress,{lessonId:activeLessonId()})&&html.includes('v70-mark-summary'))html=html.replace('Review hotspot marks','Review lesson marks').replace('data-eng-v52-click="reviewLessonMarks()"','data-eng-v52-click="openMyMarksLibrary()"');return html;};
  }
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&ensureState().open)root.closeMyMarksLibrary();});
  root.ENGBOOK_RUNTIME={...(root.ENGBOOK_RUNTIME||{}),build:BUILD_INFO.tag,myMarksLibrary:true,myMarksFilters:['lesson','content-type','status'],myMarksDeepLink:true};
})(typeof window!=='undefined'?window:globalThis);
