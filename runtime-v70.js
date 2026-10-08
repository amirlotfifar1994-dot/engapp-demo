/* EngBook v0.70 — Personal Marks/Highlights runtime integration. */
(function(root){
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const q=s=>String(s??'').replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g,' ');
  const PM=root.EngBookPersonalMarks;
  if(!PM)return;
  const l1Scenarios=[
    {kind:'fact',title:'People + action',categories:['People','Actions'],sentence:'A young couple are walking hand in hand along the shoreline. The woman is leaning toward the man, and both of them are smiling.'},
    {kind:'inference',title:'Action + feeling',categories:['Actions','People'],sentence:'The pair appear relaxed and affectionate because they are walking close together, holding hands, and smiling.'},
    {kind:'fact',title:'Environment + light',categories:['Environment','Light'],sentence:'Palm trees line the beach on the left, while calm water fills the right side and the low sun casts a bright reflection across the sea.'},
    {kind:'fact',title:'Full scene — facts only',categories:['People','Actions','Environment','Light'],sentence:'A young couple are walking barefoot beside shallow water on a palm-lined beach at sunset. They are holding hands and smiling while warm golden light reflects across the calm sea.'}
  ];
  function categoryFor(h){
    if(activeLessonId()===2){const c=root.EngBookHotspotTaxonomy?.get?.(2);if(c){const k=c.classifier(h),x=c.categories.find(v=>v.key===k);return x?.label||k||'Detail';}}
    if(activeLessonId()===1&&typeof v67L01CategoryMatch==='function'){
      for(const [k,l] of [['actions','Actions'],['clothing','Clothing'],['people','People'],['environment','Environment'],['light','Light']])if(v67L01CategoryMatch(h,k))return l;
    }
    return 'Detail';
  }
  function hotspotTarget(h){return PM.target({lessonId:activeLessonId(),type:'hotspot',id:h?.id||h?.en||'hotspot'});}
  function hotspotMeta(h){const ex=(activeGold()?.hotspotDetailsById?.[h?.id]||activeGold()?.hotspotDetails?.[h?.en]||{});return {label:h?.en||'',text:h?.example||ex.grammar||'',category:categoryFor(h)};}
  function currentHotspot(){return state.lesson?.hotspots?.[Number(state.selected)]||null;}
  root.toggleHotspotMark=function(){const h=currentHotspot();if(!h)return;const before=PM.isMarked(progress,hotspotTarget(h));PM.toggleMark(progress,hotspotTarget(h),hotspotMeta(h));saveProgress();haptic(9);toast(before?'Removed from My Marks':'Added to My Marks');render();};
  root.toggleHotspotHighlight=function(){const h=currentHotspot();if(!h)return;const before=PM.isHighlighted(progress,hotspotTarget(h));PM.toggleHighlight(progress,hotspotTarget(h),hotspotMeta(h));saveProgress();haptic(8);toast(before?'Highlight removed':'Sentence highlighted');render();};
  function savedHotspot(h,id=activeLessonId()){const t=PM.target({lessonId:id,type:'hotspot',id:h?.id||h?.en||'hotspot'}),x=PM.find(progress,t);return !!(x&&(x.marked||x.highlighted));}
  function markedHotspotCount(id=activeLessonId()){return (state.lesson?.hotspots||[]).filter(h=>savedHotspot(h,id)).length;}
  root.showMarkedHotspots=function(){state.personalMarkFilter=!state.personalMarkFilter;state.selected=null;state.hotspotDetailParent=null;state.hotspotDetailGroup=null;state.v60AnchorLabel=null;state.v60CardOpen=false;state.v60GrammarOpen=false;state.tapFeedback=null;v59EnsureViewer().sheet='collapsed';haptic(8);render();};
  if(typeof l01SetHotspotCategory==='function'){
    const _l01Cat=l01SetHotspotCategory;l01SetHotspotCategory=function(key){state.personalMarkFilter=false;return _l01Cat(key);};
  }
  if(typeof root.setAdaptiveHotspotCategory==='function'){
    const _adaptive=root.setAdaptiveHotspotCategory;root.setAdaptiveHotspotCategory=function(key){state.personalMarkFilter=false;return _adaptive(key);};
  }
  if(typeof openLesson==='function'){
    const _openLessonV70=openLesson;openLesson=function(id){state.personalMarkFilter=false;return _openLessonV70(id);};
  }
  const _visible=v35VisibleHotspots;
  v35VisibleHotspots=function(){if(state.mode==='explore'&&state.personalMarkFilter){return (state.lesson?.hotspots||[]).map((h,index)=>({h,index})).filter(({h})=>savedHotspot(h));}return _visible();};

  const _panel=v60MicroPanel;
  v60MicroPanel=function(h){let html=_panel(h);if(!h)return html;const t=hotspotTarget(h),marked=PM.isMarked(progress,t),highlighted=PM.isHighlighted(progress,t),cat=categoryFor(h);
    html=html.replace('class="interaction-card word-card active-card detail-sheet v60-word-card"',`class="interaction-card word-card active-card detail-sheet v60-word-card ${marked?'v70-card-marked':''} ${highlighted?'v70-card-highlighted':''}"`);
    const tools=`<div class="v70-personal-tools"><button class="${marked?'active mark':''}" data-eng-v52-click="toggleHotspotMark()"><i>${marked?'★':'☆'}</i><span><b>${marked?'Marked':'Mark'}</b><small>${marked?'Saved for your review':'Save this hotspot'}</small></span></button><button class="${highlighted?'active highlight':''}" data-eng-v52-click="toggleHotspotHighlight()"><i>▰</i><span><b>${highlighted?'Highlighted':'Highlight'}</b><small>${highlighted?'Sentence emphasized':'Emphasize this sentence'}</small></span></button></div>`;
    html=html.replace('<section class="v60-scene-example">',`${tools}<section class="v60-scene-example ${highlighted?'v70-highlighted-sentence':''}">`);
    html=html.replace('<span>EXAMPLE FROM THIS PHOTO</span>',`<span>EXAMPLE FROM THIS PHOTO</span><em class="v70-category-chip">${esc(cat)}</em>`);
    return html;
  };

  const _stage=sceneStage;
  sceneStage=function(modal=false){let html=_stage(modal);if(state.mode!=='explore')return html;const count=markedHotspotCount();
    if(html.includes('v67-hotspot-category-scroll')){
      const btn=`<button class="v70-my-marks ${state.personalMarkFilter?'active':''}" data-eng-v52-click="event.stopPropagation();showMarkedHotspots()"><b>My Marks</b><span>${count}</span></button>`;
      html=html.replace(/(<div class="v67-hotspot-category-scroll">[\s\S]*?)(<\/div><small>)/,`$1${btn}$2`);
      if(state.personalMarkFilter)html=html.replace(/<small>[^<]*<\/small>/,`<small>Showing ${count} personal marked/highlighted hotspot${count===1?'':'s'}.</small>`);
    }
    (state.lesson?.hotspots||[]).forEach((h,i)=>{const t=hotspotTarget(h),m=PM.isMarked(progress,t),hi=PM.isHighlighted(progress,t);if(!m&&!hi)return;const rx=new RegExp(`<button tabindex="0" class="([^"]*)"([^>]*?v60TapAnchor\\(event,${i}\\)[^>]*?)>`);html=html.replace(rx,(all,cls,rest)=>`<button tabindex="0" class="${cls}${m?' v70-marked-dot':''}${hi?' v70-highlighted-dot':''}"${rest}>`);});
    return html;
  };

  function scenarioCards(id){if(Number(id)===1)return l1Scenarios;const x=activeGold()?.sceneCombinations;return Array.isArray(x)?x:[];}
  function scenarioCatLabel(id,x){if(Number(id)===2){const c=root.EngBookHotspotTaxonomy?.get?.(2),f=c?.categories?.find(v=>v.key===x);return f?.label||x;}return x;}
  function scenarioTarget(id,index){return PM.target({lessonId:Number(id),type:'scenario',id:`scenario-${Number(index)}`});}
  function scenarioMeta(id,index){const c=scenarioCards(id)[Number(index)]||{};return {label:c.title||`Scenario ${Number(index)+1}`,text:c.sentence||'',category:(c.categories||[]).join(' + ')};}
  root.toggleScenarioMark=function(id,index){const t=scenarioTarget(id,index),before=PM.isMarked(progress,t);PM.toggleMark(progress,t,scenarioMeta(id,index));saveProgress();haptic(8);toast(before?'Scenario mark removed':'Scenario marked');render();};
  root.toggleScenarioHighlight=function(id,index){const t=scenarioTarget(id,index),before=PM.isHighlighted(progress,t);PM.toggleHighlight(progress,t,scenarioMeta(id,index));saveProgress();haptic(8);toast(before?'Scenario highlight removed':'Scenario highlighted');render();};
  function scenarioHtml(id,nextFn,nextLabel,heading,sub){const cards=scenarioCards(id);return `<section class="l01-step v69-scenario-step v70-markable-scenarios"><div class="l01-step-head"><span>04 • SCENE COMBINATIONS</span><h2>${esc(heading)}</h2><p>${esc(sub)}</p></div><div class="v69-scenario-grid">${cards.map((c,i)=>{const t=scenarioTarget(id,i),m=PM.isMarked(progress,t),hi=PM.isHighlighted(progress,t);return `<article class="${c.kind==='inference'?'inference':'fact'} ${m?'v70-scenario-marked':''} ${hi?'v70-scenario-highlighted':''}"><div class="v69-scenario-head"><i>${String(i+1).padStart(2,'0')}</i><div><b>${esc(c.title)}</b><div>${(c.categories||[]).map(x=>`<span>${esc(scenarioCatLabel(id,x))}</span>`).join('')}</div></div><em>${c.kind==='inference'?'CAUTIOUS INFERENCE':'VISIBLE FACTS'}</em></div><p>${esc(c.sentence)}</p><div class="v70-scenario-actions"><button data-eng-v52-click="speak('${q(c.sentence)}',.84)">${icon('volume')} Listen</button><button class="${m?'active':''}" data-eng-v52-click="toggleScenarioMark(${id},${i})">${m?'★ Marked':'☆ Mark'}</button><button class="${hi?'active':''}" data-eng-v52-click="toggleScenarioHighlight(${id},${i})">▰ ${hi?'Highlighted':'Highlight'}</button></div></article>`;}).join('')}</div>${nextFn(nextLabel)}</section>`;}
  root.l01ScenarioStepV69=function(){return scenarioHtml(1,label=>l01JourneyNext('meaning',label),'Check fact vs inference','Combine beach hotspots into longer descriptions.','Start with visible facts. Add interpretation only when it is clearly marked as cautious.');};
  root.l02ScenarioStep=function(){return scenarioHtml(2,label=>l02JourneyNext('meaning',label),'Check fact vs inference','Combine hotspot categories into natural café descriptions.','Build larger sentences from the same details you discovered in the image. Fact-only cards stay visible; inference cards use cautious language.');};

  root.reviewLessonMarks=function(){setMode('explore');state.personalMarkFilter=true;state.selected=null;v59EnsureViewer().sheet='collapsed';render();};
  function markStats(id=activeLessonId()){const items=PM.list(progress,{lessonId:id});return {all:items.length,marked:items.filter(x=>x.marked).length,highlighted:items.filter(x=>x.highlighted).length};}
  const _learn=learnContent;
  learnContent=function(){let html=_learn();const s=markStats();if(!s.all)return html;const strip=`<div class="v70-mark-summary"><div><span>MY LEARNING MARKS</span><b>${s.marked} marked • ${s.highlighted} highlighted</b></div><button data-eng-v52-click="reviewLessonMarks()">Review hotspot marks ${icon('chevron')}</button></div>`;return html.replace(/(<section[^>]*>)/,`$1${strip}`);};

  root.ENGBOOK_RUNTIME={...(root.ENGBOOK_RUNTIME||{}),build:BUILD_INFO.tag,personalMarksCore:PM.version,markTargets:['hotspot','scenario','sentence','grammar','lesson-section','phrase'],hotspotMarking:true,hotspotHighlighting:true,markedHotspotFilter:true,scenarioMarking:true};
})(typeof window!=='undefined'?window:globalThis);
