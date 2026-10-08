/* Full-viewport lesson canvas. Reuses the lesson's image coordinates, progress
   store, and pan/pinch transform; floating UI always stays in screen space. */
(function(root){
  'use strict';
  const lessonLabel=id=>root.EngBookCoursePath?.label(id)||String(id).padStart(2,'0');
  const state=()=>root.EngBookEventContext?.getRoot('state');
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icons={back:'<path d="m14 6-6 6 6 6"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',map:'<rect x="4" y="4" width="6" height="6" rx="2"/><rect x="14" y="4" width="6" height="6" rx="2"/><rect x="4" y="14" width="6" height="6" rx="2"/><rect x="14" y="14" width="6" height="6" rx="2"/>',explore:'<circle cx="12" cy="12" r="8"/><path d="m15 9-2 4-4 2 2-4Z"/>',learn:'<path d="M12 6v14M12 6C9 3 5 4 3 5v13c3-1 6-1 9 2 3-3 6-3 9-2V5c-2-1-6-2-9 1Z"/>',practice:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',speak:'<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M6 10v2a6 6 0 0 0 12 0v-2M12 18v3m-3 0h6"/>',talk:'<path d="M21 11a8 8 0 0 1-8 8H8l-5 3V11a9 9 0 0 1 18 0Z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/>',sound:'<path d="m11 5-6 5H2v4h3l6 5Zm4 3a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',save:'<path d="M6 3h12v18l-6-4-6 4Z"/>',fit:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',chevron:'<path d="m9 6 6 6-6 6"/>',check:'<path d="m5 12 4 4L19 6"/>'};
  icons.eye='<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>';
  icons.move='<path d="M12 3v18M3 12h18M9 6l3-3 3 3M9 18l3 3 3-3M6 9l-3 3 3 3M18 9l3 3-3 3"/>';
  const icon=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[k]||icons.explore}</svg>`;
  const modes=['explore','learn','practice','speak','talk'];
  const names={explore:'Explore',learn:'Learn',practice:'Practice',speak:'Speak',talk:'Talk'};
  let lessonId=null,needsCover=true,cardTab='word',tense=0,phrase=0,details=false,mapOpen=false,focusCard=false,returnAnchor=null;
  let scenarioOpen=false,scenarioIndex=null,scenarioExpanded=false,scenarioLevel=null,learnTab='facts',guideExample=0,cachedContent=null;
  let scenarioFilter='visible',scenarioPeek=false,lastScenarios=false;
  let practiceMenu=false,lastRecall=false,lastSpeaking=false,lastLearn=false,detailExpanded=false;
  let resizeObserver=null,cardObserver=null,activityObserver=null,transformObserver=null,pendingAnchor=null,lastViewport=null,lastCover=1,wholePicture=false;
  let manualCard=null;
  const cardFamily=h=>h?`${state()?.lesson?.id}:${h.level==='detail'?h.parentId:h.id}`:null;
  // Remember interaction per lesson during this visit, across card/mode renders.
  const interactedLessons=new Set();
  function dismissCaption(){
    const id=Number(state()?.lesson?.id);if(!id)return;
    interactedLessons.add(id);
    const caption=document.querySelector('.scene-canvas .canvas-caption');if(caption)caption.hidden=true;
  }
  document.addEventListener('pointerdown',e=>{if(e.target.closest?.('.scene-canvas'))dismissCaption();},{capture:true,passive:true});
  const active=()=>Boolean(document.querySelector('.scene-canvas'));
  const selected=()=>state()?.lesson?.hotspots?.[state()?.selected];
  const content=()=>cachedContent||root.activeGold?.()||{};
  const practice=()=>content().picturePractice||{};
  const language=h=>root.EngBookPictureLanguage.hotspot(h,root.hotspotDetail(h),content());
  const scenarios=()=>practice().scenarios||[];
  const lessonLevel=()=>root.EngAppLevelAware?.levelFor(root.EngBookContent?.getPack?.(state()?.lesson?.id)||{lessonId:state()?.lesson?.id,content:content()},'global')||'A2';
  const currentScenario=()=>root.EngBookPictureLanguage?.scenario(scenarios()[scenarioIndex],scenarioLevel||lessonLevel())||null;
  const scenarioAnchor=()=>{const row=currentScenario();return state()?.lesson?.hotspots?.find(h=>row?.evidenceHotspotIds.includes(h.id));};
  const voiceOptions=index=>({voiceRole:Number(index)%2?'female':'male'});
  const hotspotVoice=h=>{
    const hs=state().lesson.hotspots,anchors=hs.filter(row=>row.level!=='detail');
    const anchor=h.level==='detail'?hs.find(row=>row.id===h.parentId)||h:h;
    return voiceOptions(Math.max(0,anchors.indexOf(anchor)));
  };
  function voiceNote(options){
    const info=root.EngBookSpeech?.voiceInfo('',options);if(!info)return '';
    return `<div class="canvas-voice-note" data-voice-role="${esc(info.role||'default')}" data-voice-name="${esc(info.name)}" title="${esc(info.name||info.label)}">${icon('sound')} ${esc(info.label)}<span>Slow pace</span></div>`;
  }
  const discovery=()=>root.discoveredSet?.()||new Set();
  const isFind=()=>state()?.mode==='practice'&&['find','listen','smart'].includes(state()?.practiceType);
  function visibleHotspots(){
    const s=state(),hs=s?.lesson?.hotspots||[],h=selected();
    if(isFind()){
      const target=s.practiceTarget,parent=target?.level==='detail'?target.parentId:null;
      return hs.map((h,index)=>({h,index})).filter(({h})=>h.level!=='detail'||h.parentId===parent);
    }
    const parent=h?.level==='detail'?h.parentId:h?.id,refs=currentScenario()?.evidenceHotspotIds||[];
    // Focus the open detail family; omitted dots cannot intercept taps or keyboard focus.
    if(h&&s.v60CardOpen)return hs.map((h,index)=>({h,index})).filter(({h})=>h.id===parent||h.parentId===parent);
    return hs.map((h,index)=>({h,index})).filter(({h})=>h.level!=='detail'||h.parentId===parent||h===selected()||refs.includes(h.id));
  }
  function clear(){const s=state();if(!s)return;returnAnchor=selected()?.id||scenarioAnchor()?.id;s.selected=null;s.v60CardOpen=false;s.v60AnchorLabel=null;details=false;scenarioIndex=null;scenarioExpanded=false;manualCard=null;root.render();}
  function select(index){
    const s=state(),h=s?.lesson?.hotspots?.[Number(index)];if(!h)return;
    if(s.mode==='speak'&&root.EngBookSpeaking?.busy()||s.mode==='talk'&&root.EngBookTalk?.busy())return;
    dismissCaption();
    if(isFind())return root.answerFind(Number(index));
    if(manualCard?.family!==cardFamily(h))manualCard=null;
    const fresh=root.markDiscovered(h.en);s.selected=Number(index);s.v60CardOpen=true;s.v60AnchorLabel=Number(index);s.v60GrammarOpen=false;
    s.tapFeedback=null;cardTab='word';tense=0;phrase=0;details=false;detailExpanded=false;mapOpen=false;scenarioOpen=false;scenarioIndex=null;pendingAnchor=h;focusCard=true;
    root.haptic?.(fresh?[14,24,14]:10);root.speak?.(h.en,.82,hotspotVoice(h));
    if(discovery().size>=s.lesson.hotspots.length)root.EngBookEventContext.getRoot('progress').completed[`l${s.lesson.id}_explore`]=true;
    root.saveProgress();root.render();
  }
  function openLearningDetail(index,tab,formIndex=0){
    select(index);if(!selected())return;
    detailExpanded=true;cardTab=tab==='grammar'?'grammar':tab==='word'?'word':'phrase';
    const data=language(selected());
    if(cardTab==='grammar')tense=Math.max(0,Math.min(Number(formIndex)||0,data.grammar.length-1));
    else phrase=Math.max(0,Math.min(Number(formIndex)||0,data.phrases.length-1));
    root.render();
  }
  function clampCard(point,size,bounds){
    return {x:Math.max(bounds.left,Math.min(point.x,Math.max(bounds.left,bounds.right-size.width))),y:Math.max(bounds.top,Math.min(point.y,Math.max(bounds.top,bounds.bottom-size.height)))};
  }
  // Keep the selected dot and related detail hit areas reachable where space allows.
  function placeCard(point,size,bounds,avoid=[]){
    const {width:w,height:h}=size,{left:l,top:t,right:r,bottom:b}=bounds,gap=52;
    const candidates=[{x:point.x-w/2,y:point.y-h-gap},{x:point.x+gap,y:point.y-h*.35},{x:point.x-w-gap,y:point.y-h*.35},{x:point.x-w/2,y:point.y+gap}];
    if(avoid.length){
      for(const x of [l,(l+r-w)/2,r-w])for(const y of [t,(t+b-h)/2,b-h])candidates.push({x,y});
      for(const p of avoid)candidates.push({x:point.x-w/2,y:p.y-h-24},{x:point.x-w/2,y:p.y+24},{x:p.x-w-24,y:point.y-h/2},{x:p.x+24,y:point.y-h/2});
    }
    const covers=(p,x,y,pad)=>p.x>x-pad&&p.x<x+w+pad&&p.y>y-pad&&p.y<y+h+pad;
    return candidates.map(p=>{
      const {x,y}=clampCard(p,size,bounds);
      const blocked=avoid.reduce((sum,dot)=>sum+(covers(dot,x,y,22)?dot.related?30000:3000:0),0);
      return {x,y,score:Math.abs(x-p.x)+Math.abs(y-p.y)+(covers(point,x,y,22)?100000:0)+blocked+Math.hypot(x+w/2-point.x,y+h/2-point.y)*.1};
    }).sort((a,b)=>a.score-b.score)[0];
  }
  function connector(point,rect){
    const clamp=(v,a,b)=>Math.max(a,Math.min(v,b));
    if(point.x>=rect.x&&point.x<=rect.x+rect.width&&point.y>=rect.y&&point.y<=rect.y+rect.height)return null;
    const end={x:clamp(point.x,rect.x+12,rect.x+rect.width-12),y:clamp(point.y,rect.y+12,rect.y+rect.height-12)};
    if(point.x<rect.x)end.x=rect.x;else if(point.x>rect.x+rect.width)end.x=rect.x+rect.width;
    if(point.y<rect.y)end.y=rect.y;else if(point.y>rect.y+rect.height)end.y=rect.y+rect.height;
    const dx=end.x-point.x,dy=end.y-point.y,length=Math.hypot(dx,dy);
    if(length<=12)return null;
    return {x1:point.x+dx/length*11,y1:point.y+dy/length*11,x2:end.x,y2:end.y};
  }
  function position(stage){
    const shell=stage?.closest('.scene-canvas');if(!shell)return;
    if(shell.querySelector('.scenario-studio')){root.EngBookScenarios.position({stage,shell,row:currentScenario(),lesson:state().lesson});return;}
    const h=selected()||scenarioAnchor(),card=shell.querySelector('.scene-glass-card');if(!h||!card)return;
    const photo=stage.querySelector('.v59-scene-content').getBoundingClientRect(),box=shell.getBoundingClientRect();
    const point={x:photo.left-box.left+photo.width*h.x/100,y:photo.top-box.top+photo.height*h.y/100};
    const top=shell.querySelector('.canvas-header').getBoundingClientRect().bottom-box.top+10;
    const dock=shell.querySelector('.canvas-dock'),dockTop=dock.getBoundingClientRect().top;
    const bottom=dock.closest?.('[hidden]')?box.height-20:dockTop-box.top-14;
    card.style.maxHeight=`${Math.max(100,bottom-top)}px`;
    card.hidden=point.x<0||point.x>box.width||point.y<0||point.y>box.height;
    shell.style.setProperty('--anchor-x',`${point.x}px`);shell.style.setProperty('--anchor-y',`${point.y}px`);
    const spot=shell.querySelector('.canvas-spotlight');if(spot)spot.hidden=card.hidden;
    const link=shell.querySelector('.canvas-connector');if(link)link.toggleAttribute('hidden',card.hidden);
    if(card.hidden)return;
    const size={width:card.offsetWidth,height:card.offsetHeight},bounds={left:12,top,right:box.width-12,bottom},family=h.level==='detail'?h.parentId:h.id;
    const avoid=visibleHotspots().filter(({h:dot})=>dot.id!==h.id).map(({h:dot})=>({x:photo.left-box.left+photo.width*dot.x/100,y:photo.top-box.top+photo.height*dot.y/100,related:dot.id===family||dot.parentId===family})).filter(dot=>dot.x>=bounds.left&&dot.x<=bounds.right&&dot.y>=top&&dot.y<=bottom);
    const placement=manualCard?.family===cardFamily(h)?clampCard(manualCard,size,bounds):placeCard(point,size,bounds,avoid);
    if(manualCard?.family===cardFamily(h))Object.assign(manualCard,placement);
    card.style.left=`${placement.x}px`;card.style.top=`${placement.y}px`;
    if(link){const line=connector(point,{...placement,width:card.offsetWidth,height:card.offsetHeight});link.toggleAttribute('hidden',!line);if(line)link.querySelector('path').setAttribute('d',root.EngBookScenarios.curve(line));}
  }
  function bindCardDrag(stage,card){
    const header=card.querySelector('header'),handle=card.querySelector('[data-card-drag]');if(!header||!handle)return;
    let drag=null;
    header.addEventListener('pointerdown',e=>{
      if(e.button!==0||e.isPrimary===false||e.target.closest('button')&&!e.target.closest('[data-card-drag]'))return;
      e.preventDefault();e.stopPropagation();dismissCaption();
      drag={id:e.pointerId,x:e.clientX,y:e.clientY,left:card.offsetLeft,top:card.offsetTop};
      card.classList.add('is-dragging');header.setPointerCapture(e.pointerId);
    });
    header.addEventListener('pointermove',e=>{
      if(!drag||e.pointerId!==drag.id)return;e.preventDefault();e.stopPropagation();
      if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<4)return;
      manualCard={family:cardFamily(selected()),x:drag.left+e.clientX-drag.x,y:drag.top+e.clientY-drag.y};position(stage);
    });
    const end=e=>{if(!drag||e.pointerId!==drag.id)return;drag=null;card.classList.remove('is-dragging');e.stopPropagation();};
    header.addEventListener('pointerup',end);header.addEventListener('pointercancel',end);header.addEventListener('lostpointercapture',end);
    handle.addEventListener('keydown',e=>{
      const moves={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]},move=moves[e.key];
      if(!move&&e.key!=='Home')return;e.preventDefault();e.stopPropagation();
      if(e.key==='Home')manualCard=null;
      else{const step=e.shiftKey?30:10;manualCard={family:cardFamily(selected()),x:card.offsetLeft+move[0]*step,y:card.offsetTop+move[1]*step};}
      position(stage);
    });
  }
  function cardMarkup(h){
    const data=language(h),rows=data.grammar,row=rows[tense%rows.length],chunk=data.phrases[phrase%data.phrases.length];
    const fact=h.claimClass==='visible-fact'||!h.claimClass;
    let copy=cardTab==='word'?`<span class="canvas-eyebrow">${fact?'In the picture':'Possible interpretation'}</span><p>${esc(h.example)}</p>`:cardTab==='phrase'?`<div class="canvas-tense"><button data-canvas-action="phrase-prev" aria-label="Previous phrase">${icon('back')}</button><span>${esc(chunk.kind)}<small>${phrase+1} / ${data.phrases.length}</small></span><button data-canvas-action="phrase-next" aria-label="Next phrase">${icon('chevron')}</button></div><p class="canvas-phrase">${esc(chunk.text)}</p><small class="canvas-eyebrow">In a sentence</small><p class="canvas-example">${esc(chunk.example)}</p><details class="canvas-practice-prompt"><summary>Try it yourself</summary><p>${esc(chunk.task||'Describe this detail in your own words. Keep an imagined action separate from the photo.')}</p></details>`:`<div class="canvas-tense"><button data-canvas-action="tense-prev" aria-label="Previous grammar form">${icon('back')}</button><span>${esc(row.tense)}<small>${tense+1} / ${rows.length}</small></span><button data-canvas-action="tense-next" aria-label="Next grammar form">${icon('chevron')}</button></div><span class="canvas-evidence-label ${esc(row.evidence)}">${row.evidence==='visible'?'In this picture':row.evidence==='interpretation'?'Possible interpretation':row.evidence==='hypothetical'?'Imagined time frame':'Question practice'}</span><p>${esc(row.sentence)}</p><div class="canvas-rule"><b>${esc(row.pattern||'')}</b><small>${esc(row.note||'')}</small></div><details class="canvas-practice-prompt"><summary>Try it yourself</summary><p>${esc(row.task||'Make your own sentence using this form.')}</p></details>`;
    const children=state().lesson.hotspots.map((c,index)=>({c,index})).filter(({c})=>c.parentId===(h.level==='detail'?h.parentId:h.id));
    return `<section class="scene-glass-card canvas-detail-card ${detailExpanded?'is-expanded':'is-compact'}" role="region" aria-labelledby="canvas-word-title" tabindex="-1"><header><div><span class="canvas-eyebrow">${fact?'Visible fact':'Possible interpretation'}</span><h2 id="canvas-word-title">${esc(h.en)}</h2></div><div class="canvas-card-controls"><button class="canvas-icon canvas-card-move" data-card-drag aria-label="Move detail card" title="Drag the title to move · Arrow keys to move · Home to reset">${icon('move')}</button><button class="canvas-icon" data-canvas-action="hear" aria-label="Listen to detail">${icon('sound')}</button><button class="canvas-icon" data-canvas-action="close-card" aria-label="Close detail">${icon('close')}</button></div></header>${detailExpanded?`${h.pronReviewed===false?'':'<span class=\"canvas-ipa\">'+esc(h.pron||'')+'</span>'}<div class="canvas-card-tabs" role="tablist" aria-label="Detail learning"><button role="tab" aria-selected="${cardTab==='word'}" data-canvas-tab="word">Word</button><button role="tab" aria-selected="${cardTab==='phrase'}" data-canvas-tab="phrase">Phrase</button><button role="tab" aria-selected="${cardTab==='grammar'}" data-canvas-tab="grammar">Grammar</button></div><div class="canvas-card-copy" role="tabpanel">${copy}</div>${details&&children.length?`<div class="canvas-detail-chips">${children.map(({c,index})=>`<button data-canvas-action="anchor" data-index="${index}" aria-pressed="${c.id===h.id}">${esc(c.en)}</button>`).join('')}</div>`:''}${voiceNote(hotspotVoice(h))}<footer><button data-canvas-action="save" aria-pressed="${root.isSaved(h.en)}">${icon('save')}${root.isSaved(h.en)?'Saved':'Save'}</button>${children.length?`<button data-canvas-action="details" aria-expanded="${details}">${icon('plus')}${children.length} ${children.length===1?'detail':'details'}</button>`:''}</footer>`:`<p class="canvas-compact-copy">${esc(h.example)}</p>`}<button class="canvas-expand-detail" data-canvas-action="expand-detail" aria-expanded="${detailExpanded}">${detailExpanded?'Less':'Phrase, grammar & details'} ${icon(detailExpanded?'minus':'chevron')}</button></section>`;
  }
  function mapMarkup(){
    const hs=state().lesson.hotspots,done=discovery();
    return `<aside class="canvas-map canvas-panel" aria-label="All picture details"><header><div><span class="canvas-eyebrow">Scene map</span><h2>All ${hs.length} details</h2></div><button class="canvas-icon" data-canvas-action="map" aria-label="Close scene map">${icon('close')}</button></header><input class="canvas-search" type="search" aria-label="Find a detail" placeholder="Find a detail…"><div class="canvas-map-list">${hs.map((h,i)=>`<button data-canvas-action="anchor" data-index="${i}" data-search="${esc(h.en.toLowerCase())}"><span class="canvas-map-dot ${done.has(h.en)?'done':''}">${done.has(h.en)?icon('check'):''}</span><span>${esc(h.en)}<small>${h.level==='detail'?'Close-up detail':'Scene anchor'}</small></span>${icon('chevron')}</button>`).join('')}</div></aside>`;
  }
  function chooseScenario(index,languageLevel){
    const s=state(),rows=scenarios();if(!rows.length)return;
    if(['A1','A2','B1','B2','C1'].includes(languageLevel))scenarioLevel=languageLevel;
    scenarioIndex=(Number(index)+rows.length)%rows.length;scenarioExpanded=false;scenarioOpen=false;mapOpen=false;scenarioPeek=false;
    scenarioFilter=root.EngBookPictureLanguage.boundary(rows[scenarioIndex]).kind;
    s.selected=null;s.v60CardOpen=false;pendingAnchor=null;needsCover=true;focusCard=true;root.render();
  }
  function scenarioPicker(){
    scenarioFilter=root.EngBookScenarios.filterKey(scenarios(),scenarioFilter);
    return root.EngBookScenarios.picker({lesson:state().lesson,rows:scenarios(),filter:scenarioFilter});
  }
  function scenarioMarkup(){
    return root.EngBookScenarios.card({lesson:state().lesson,rows:scenarios(),index:scenarioIndex,row:currentScenario(),expanded:scenarioExpanded,peek:scenarioPeek,level:scenarioLevel||lessonLevel()});
  }
  function lessonLanguage(){
    const tabs=[['facts','Picture'],['phrases','Phrases'],['grammar','Grammar'],['scenarios','Scenarios']];
    let body='';
    if(learnTab==='facts')body=root.modeContent();
    else if(learnTab==='phrases')body=`<p class="canvas-learning-intro">Choose a detail to learn a phrase on the picture.</p><div class="canvas-phrase-list">${state().lesson.hotspots.map((h,index)=>{const chunk=language(h).phrases[0];return `<button data-canvas-action="lesson-phrase" data-index="${index}"><b>${esc(chunk.text)}</b><small>${esc(h.en)}</small>${icon('chevron')}</button>`;}).join('')}</div>`;
    else if(learnTab==='scenarios')body=`<p class="canvas-learning-intro">Choose a lens. Its card opens beside the related picture detail.</p><div class="canvas-scenario-list">${scenarios().map((row,i)=>`<button data-canvas-action="scenario" data-index="${i}" class="scenario-choice"><span class="canvas-scenario-number">${String(i+1).padStart(2,'0')}</span><span><small>${esc(root.EngBookPictureLanguage.boundary(row).label)}</small><b>${esc(row.title)}</b></span>${icon('chevron')}</button>`).join('')}</div>`;
    else {const g=practice().grammarGuide||{},hs=state().lesson.hotspots,index=guideExample%hs.length,h=hs[index],data=language(h),row=data.grammar[0];body=`<article class="canvas-grammar-guide"><span class="canvas-eyebrow">Lesson focus</span><h3>${esc(g.title||'Grammar in the picture')}</h3><div class="canvas-rule"><b>${esc(g.pattern||'')}</b><small>${esc(g.note||'')}</small></div><span class="canvas-eyebrow">Practice example</span><p>${esc(g.practice||'')}</p><small>Language practice · an example does not establish a photo fact.</small><div class="canvas-guide-example"><div class="canvas-tense"><button data-canvas-action="guide-prev" aria-label="Previous picture example">${icon('back')}</button><span>From this picture<small>${index+1} / ${hs.length}</small></span><button data-canvas-action="guide-next" aria-label="Next picture example">${icon('chevron')}</button></div><p>${esc(row.sentence)}</p><button class="canvas-primary-button" data-canvas-action="lesson-grammar" data-index="${index}">Open on picture ${icon('chevron')}</button></div></article>`;}
    return `<div class="canvas-learn-tabs" role="tablist" aria-label="Lesson learning sections">${tabs.map(([key,label])=>`<button role="tab" aria-selected="${learnTab===key}" data-canvas-action="learn-tab" data-tab="${key}">${label}</button>`).join('')}</div><div class="canvas-learn-content" role="tabpanel">${body}</div>`;
  }
  const practiceNames={smart:'Smart review',find:'Find it',listen:'Listen & find',builder:'Sentence builder',fact:'Evidence recall',mistakes:'Mistake repair',saved:'Saved lines'};
  function practiceSwitcher(){return `<button class="canvas-practice-switch" data-canvas-action="practice-menu" aria-expanded="${practiceMenu}" aria-label="Choose practice activity">${esc(practiceNames[state().practiceType]||'Practice')}${icon('chevron')}</button>`;}
  function practicePicker(){
    const rows=[['smart','Review details that need more practice.'],['find','Read a word and find its location.'],['listen','Hear a word and find it in the photo.']];
    if(root.v24ActiveBuilderSentences?.().length)rows.push(['builder','Arrange meaningful chunks into a sentence.']);
    if(root.v24ActiveFactItems?.().length)rows.push(['fact','Separate visible facts from interpretations.']);
    rows.push(['mistakes','Return to details you missed.'],['saved','Practice lines you have saved.']);
    return `<aside class="canvas-panel canvas-practice-picker" aria-label="Choose practice activity"><header><div><span class="canvas-eyebrow">Practice</span><h2>Choose an activity</h2></div><button class="canvas-icon" data-canvas-action="practice-menu" aria-label="Close activity chooser">${icon('close')}</button></header><div class="canvas-practice-choices">${rows.map(([type,note])=>`<button data-canvas-action="practice-type" data-type="${type}" aria-current="${state().practiceType===type?'true':'false'}"><b>${esc(practiceNames[type])}</b><small>${esc(note)}</small>${icon('chevron')}</button>`).join('')}</div></aside>`;
  }
  function recallMarkup(){
    const s=state(),target=s.practiceTarget,total=s.practiceTotal||0,complete=!target;
    const progress=`<div class="canvas-recall-progress" aria-label="${s.practiceCorrect||0} of ${total} details reviewed">${Array.from({length:total},(_,i)=>`<i class="${i<(s.practiceCorrect||0)?'done':i===s.practiceRound-1?'current':''}"></i>`).join('')}</div>`;
    const finish=complete?`<h2>${total?'Review complete':'No picture details available'}</h2><p>${total?`${s.practiceCorrect} details reviewed · ${s.practiceFirstTry||0} recalled on the first try without a hint.`:'Choose another activity to continue.'}</p>${total?`<small class="canvas-recall-meta">Hints used on ${s.practiceHintCount||0} ${s.practiceHintCount===1?'detail':'details'}.</small>`:''}<footer><button class="canvas-recall-primary" data-canvas-action="practice-restart">Practice again</button><button data-eng-action="mode" data-mode="explore">Explore picture</button></footer>`:'';
    return `<aside class="canvas-recall" aria-label="${esc(practiceNames[s.practiceType])} challenge"><header>${practiceSwitcher()}<span>${complete?'Session finished':`Detail ${s.practiceRound} / ${total}`}</span></header>${complete?finish:`<h2>${s.practiceType==='listen'&&!s.practiceLocked?'Listen to the word':esc(target.en)}</h2><p>${s.practiceLocked?'You found the right detail.':s.practiceType==='listen'?'Play the word, then tap its location in the picture.':'Tap this detail in the picture.'}</p>${s.practiceType==='smart'&&!s.practiceLocked?`<small class="canvas-recall-meta">${root.masteryLabel?.(target.en)==='New'?'New detail':'Selected for more practice'} · Based on your recall history</small>`:''}${s.practiceHintUsed&&!s.practiceLocked?`<p class="canvas-recall-hint">${icon('explore')}${esc(root.EngBookPractice.locationHint(target))}</p>`:''}${s.practiceMsg?`<p class="canvas-recall-feedback ${s.practiceLocked?'correct':'retry'}" role="status">${esc(s.practiceMsg)}</p>`:''}<footer><button data-canvas-action="practice-hear">${icon('sound')}${s.practiceType==='listen'?'Play word':'Listen'}</button>${s.practiceLocked?`<button class="canvas-recall-primary" data-canvas-action="practice-next">${s.practiceCorrect>=total?'See results':'Next detail'}${icon('chevron')}</button>`:`<button data-canvas-action="practice-hint" ${s.practiceHintUsed?'disabled':''}>${icon('explore')}${s.practiceHintUsed?'Hint shown':'Hint'}</button>`}</footer>`}${progress}</aside>`;
  }
  function render(){
    const s=state();if(!s?.lesson||s.screen!=='lesson')return false;
    if(isFind()&&Number(s.practiceLessonId)!==Number(s.lesson.id))root.resetPractice(false);
    cachedContent=root.activeGold?.()||{};
    if(lessonId!==s.lesson.id){lessonId=s.lesson.id;needsCover=true;mapOpen=false;cardTab='word';details=false;detailExpanded=false;pendingAnchor=null;lastViewport=null;wholePicture=false;scenarioOpen=false;scenarioIndex=null;scenarioLevel=null;scenarioPeek=false;scenarioFilter='visible';lastScenarios=false;learnTab='facts';guideExample=0;lastLearn=false;}
    s.photoFocus=false;s.sceneIntro=false;s.sceneIntroNeedsCover=false;
    const v=root.v59EnsureViewer();v.maxScale=8;
    document.documentElement.classList.remove('v96-focus-open');document.body.classList.remove('v96-focus-open');
    document.documentElement.classList.add('canvas-open');document.body.classList.add('canvas-open');
    const h=selected(),done=discovery(),mode=s.mode||'explore';
    const showScenario=Boolean(currentScenario())&&!mapOpen&&!scenarioOpen&&!isFind();
    const showCard=h&&s.v60CardOpen&&!isFind()&&!mapOpen&&!scenarioOpen&&!showScenario;
    const scenarioContext=showScenario||scenarioOpen;
    if(scenarioContext!==lastScenarios){needsCover=true;lastViewport=null;lastScenarios=scenarioContext;}
    const recall=isFind();
    if(recall&&!lastRecall){needsCover=true;wholePicture=true;practiceMenu=false;}lastRecall=recall;
    const speechMode=mode==='speak'||mode==='talk';
    if(speechMode&&!lastSpeaking){needsCover=true;wholePicture=true;}lastSpeaking=speechMode;
    const activity=mode!=='explore'&&!recall&&!showCard&&!showScenario&&!mapOpen&&!scenarioOpen&&!practiceMenu;
    const learn=mode==='learn'&&activity;
    if(learn&&!lastLearn){needsCover=true;wholePicture=false;}lastLearn=learn;
    const peeking=learn&&root.EngBookLearn.session().peek;
    const speakingBusy=mode==='speak'&&Boolean(root.EngBookSpeaking?.busy())||mode==='talk'&&Boolean(root.EngBookTalk?.busy());
    const spots=visibleHotspots(),refs=currentScenario()?.evidenceHotspotIds||[];
    document.getElementById('app').innerHTML=`
      <main class="app-shell scene-canvas ${showCard||showScenario?'has-selection':''} ${scenarioContext?'scenario-context':''} ${scenarioPeek&&showScenario?'scenario-peeking':''} ${recall?'recall-active':''} ${speechMode&&activity?'speaking-active':''} ${learn?'learn-active':''} ${peeking?'learn-peeking':''}" aria-label="Interactive lesson picture" data-lesson-mode="${esc(mode)}" data-scenario-layout="${root.EngBookScenarios.design(s.lesson)}">
      <img class="canvas-backdrop" src="${esc(s.lesson.image)}" alt="" aria-hidden="true">
      <div class="canvas-photo v59-scene-viewport"><div class="image-stage v59-viewer-stage modal-stage scene-canvas-stage" data-v59-viewer="focus"><div class="v59-scene-content v59-transform-stage" data-v59-content>
      <img class="scene-image" src="${esc(s.lesson.image)}" alt="${esc(s.lesson.title)}" draggable="false">
      ${spots.map(({h,index})=>`<button class="hotspot canvas-dot ${h.level==='detail'?'is-detail':''} ${s.selected===index||showScenario&&refs.includes(h.id)?'active':''} ${done.has(h.en)?'discovered':''} ${recall?'memory-dot':''} ${recall&&(s.practiceHintUsed||s.practiceLocked)&&h.id===s.practiceTarget?.id?'recall-hint':''}" style="left:${h.x}%;top:${h.y}%" aria-label="${recall?`Picture detail ${index+1}`:esc(h.en)}" aria-expanded="${s.selected===index&&Boolean(showCard)}" ${speakingBusy?'disabled':''} data-hotspot-id="${esc(h.id)}" data-canvas-action="anchor" data-index="${index}"></button>`).join('')}
      </div></div></div><div class="canvas-vignette"></div>${showCard?'<div class="canvas-spotlight"></div><svg class="canvas-connector" aria-hidden="true"><path/></svg>':''}
      <header class="canvas-header"><button class="canvas-icon canvas-dark-glass" data-eng-action="home" aria-label="Back to home">${icon('back')}</button><button class="canvas-lesson canvas-dark-glass" data-eng-action="pick-lesson" aria-label="Choose lesson"><span>LESSON ${lessonLabel(s.lesson.id)}<i>⌄</i></span><b>${learn?'Learn':esc(s.lesson.title)}</b></button>${learn?`<button class="canvas-icon canvas-dark-glass learn-eye" data-learn-action="peek" aria-label="${peeking?'Return to learning':'Show picture without text'}" aria-pressed="${peeking}">${icon('eye')}</button>`:`<button class="canvas-icon canvas-dark-glass" ${speakingBusy?'disabled':''} data-canvas-action="scenarios" aria-label="Picture scenarios" title="Picture scenarios" aria-expanded="${scenarioOpen}">${icon('learn')}</button><button class="canvas-icon canvas-dark-glass" ${speakingBusy?'disabled':''} data-canvas-action="map" aria-label="All picture details" aria-expanded="${mapOpen}">${icon('map')}</button>`}</header>
      ${showCard?cardMarkup(h):showScenario?scenarioMarkup():''}${mapOpen?mapMarkup():scenarioOpen?scenarioPicker():''}
      ${practiceMenu?practicePicker():recall&&!mapOpen&&!scenarioOpen?recallMarkup():''}
      ${learn?root.EngBookLearn.markup():activity?`<aside class="canvas-activity canvas-panel ${mode==='practice'?'practice-worksheet':''}" aria-label="${esc(names[mode]||'Lesson')} activities"><header><div><span class="canvas-eyebrow">Lesson ${lessonLabel(s.lesson.id)}</span>${mode==='practice'?practiceSwitcher():`<h2>${esc(names[mode]||'Lesson tools')}</h2>`}</div><button class="canvas-icon" data-eng-action="mode" data-mode="explore" aria-label="Back to picture">${icon('close')}</button></header><div class="canvas-activity-body v59-activity-area">${mode==='practice'?root.practiceBody():mode==='speak'?root.EngBookSpeaking.markup():mode==='talk'?root.EngBookTalk.markup():root.modeContent()}</div></aside>`:''}
      <footer class="canvas-bottom" ${showCard?'hidden':''}><div class="canvas-caption" ${interactedLessons.has(Number(s.lesson.id))||showCard||showScenario||scenarioOpen||mapOpen||practiceMenu||activity||recall?'hidden':''}><span>Tap a dot to discover</span><small>Drag to explore · Pinch to zoom</small></div><nav class="canvas-dock" aria-label="Lesson modes">${modes.map(m=>`<button data-eng-action="mode" data-mode="${m}" aria-current="${mode===m?'page':'false'}">${icon(m)}<span>${names[m]}</span></button>`).join('')}<span class="canvas-progress" aria-label="${done.size} of ${s.lesson.hotspots.length} details discovered"><b>${done.size}</b><small>/ ${s.lesson.hotspots.length}</small></span></nav></footer><div class="toast" id="toast"></div></main>`;
    resizeObserver?.disconnect();cardObserver?.disconnect();activityObserver?.disconnect();transformObserver?.disconnect();
    const stage=document.querySelector('.scene-canvas-stage'),img=stage.querySelector('img');
    const challenge=document.querySelector('.canvas-recall');
    if(challenge)stage.closest('.scene-canvas').style.setProperty('--recall-height',`${challenge.offsetHeight+12}px`);
    const speaking=document.querySelector('.speaking-active .canvas-activity');
    if(speaking)stage.closest('.scene-canvas').style.setProperty('--speaking-height',`${speaking.offsetHeight+12}px`);
    if(speaking||challenge){
      const panel=speaking||challenge,variable=speaking?'--speaking-height':'--recall-height';
      activityObserver=new ResizeObserver(()=>{
        if(panel.isConnected)stage.closest('.scene-canvas').style.setProperty(variable,`${panel.offsetHeight+12}px`);
      });
      activityObserver.observe(panel);
    }
    const fit=()=>{
      if(!stage.isConnected||!img.naturalWidth)return;
      const zoomRatio=root.v59EnsureViewer().scale/lastCover;
      root.v59FitStage(stage);
      const bounds=root.v59Bounds(stage),resized=lastViewport&&(lastViewport.w!==bounds.vw||lastViewport.h!==bounds.vh);
      lastViewport={w:bounds.vw,h:bounds.vh};lastCover=Math.max(bounds.vw/bounds.fw,bounds.vh/bounds.fh);
      if(needsCover||resized){const v=root.v59EnsureViewer();v.scale=scenarioContext?Math.min(root.innerWidth>=900?1.25:1.6,lastCover):wholePicture?1:Math.min(8,Math.max(1,lastCover*(needsCover?1:zoomRatio)));s.sceneIntroFocus=scenarioContext?root.EngBookScenarios.focus(currentScenario(),s.lesson):root.v99ResolveSceneFocus(root.EngBookContent?.getPack?.(s.lesson.id)||s.lesson);root.v99FocusStageOnSubject(stage);needsCover=false;if(resized&&!scenarioContext)pendingAnchor=selected()||pendingAnchor;}
      if(pendingAnchor){const b=root.v59Bounds(stage),v=root.v59EnsureViewer(),a=pendingAnchor;const x=b.cx+v.tx+b.fw*v.scale*a.x/100,y=b.cy+v.ty+b.fh*v.scale*a.y/100;if(x<40||x>b.vw-40||y<100||y>b.vh-150){v.tx=b.vw/2-b.fw*v.scale*a.x/100-b.cx;v.ty=b.vh*.38-b.fh*v.scale*a.y/100-b.cy;root.v59ApplyViewerTransform(stage);}pendingAnchor=null;}
      position(stage);
    };
    root.v59BindViewer(stage);if(img.complete)fit();else img.addEventListener('load',fit,{once:true});
    resizeObserver=new ResizeObserver(fit);resizeObserver.observe(stage);
    const card=document.querySelector('.scenario-studio')||document.querySelector('.scene-glass-card');if(card){position(stage);cardObserver=new ResizeObserver(()=>position(stage));cardObserver.observe(card);if(card.classList.contains('canvas-detail-card'))bindCardDrag(stage,card);}
    if(card){transformObserver=new MutationObserver(()=>position(stage));transformObserver.observe(stage.querySelector('.v59-scene-content'),{attributes:true,attributeFilter:['style']});}
    stage.addEventListener('wheel',e=>{e.preventDefault();dismissCaption();wholePicture=false;root.v59ZoomAt(stage,root.v59EnsureViewer().scale*Math.exp(-e.deltaY*.002),e.clientX,e.clientY);},{passive:false});
    stage.addEventListener('pointerdown',()=>{wholePicture=false;},{passive:true});
    document.querySelector('.canvas-search')?.addEventListener('input',e=>{const query=e.target.value.trim().toLowerCase();document.querySelectorAll('.canvas-map-list button').forEach(el=>el.hidden=!el.dataset.search.includes(query));});
    root.requestAnimationFrame(()=>{if(!stage.isConnected)return;if(focusCard&&card){card.focus({preventScroll:true});focusCard=false;}else if(returnAnchor){[...stage.querySelectorAll('[data-hotspot-id]')].find(el=>el.dataset.hotspotId===returnAnchor)?.focus({preventScroll:true});returnAnchor=null;}});
    return true;
  }
  function cleanup(){resizeObserver?.disconnect();cardObserver?.disconnect();activityObserver?.disconnect();transformObserver?.disconnect();document.documentElement.classList.remove('canvas-open');document.body.classList.remove('canvas-open');if(state()?.viewer)state().viewer.maxScale=3.5;lessonId=null;manualCard=null;cachedContent=null;practiceMenu=false;lastRecall=false;lastSpeaking=false;lastLearn=false;lastScenarios=false;}
  function open(){needsCover=true;state().selected=null;state().v60CardOpen=false;root.render();}
  document.addEventListener('click',e=>{if(e.target.closest('[data-eng-action="mode"]')){mapOpen=false;scenarioOpen=false;scenarioIndex=null;scenarioExpanded=false;practiceMenu=false;}},true);
  document.addEventListener('click',e=>{
    const tab=e.target.closest('[data-canvas-tab]');if(tab){cardTab=tab.dataset.canvasTab;root.render();document.querySelector(`[data-canvas-tab="${cardTab}"]`)?.focus({preventScroll:true});return;}
    const el=e.target.closest('[data-canvas-action]');if(!el)return;e.preventDefault();e.stopPropagation();
    const action=el.dataset.canvasAction,stage=document.querySelector('.scene-canvas-stage');
    if(action==='anchor'){const hit=e.detail===0||!el.classList.contains('hotspot')?null:root.v60ScreenHit(stage,e.clientX,e.clientY);select(hit?.index??Number(el.dataset.index));}
    else if(action==='practice-menu'){practiceMenu=!practiceMenu;root.render();}
    else if(action==='practice-type'){practiceMenu=false;root.setPractice(el.dataset.type);}
    else if(action==='practice-hear')root.hearPracticeTarget();
    else if(action==='practice-hint')root.showPracticeHint();
    else if(action==='practice-next')root.nextPracticeRound();
    else if(action==='practice-restart')root.resetPractice();
    else if(action==='close-card')clear();
    else if(action==='expand-detail'){detailExpanded=!detailExpanded;root.render();document.querySelector('[data-canvas-action="expand-detail"]')?.focus({preventScroll:true});}
    else if(action==='map'){mapOpen=!mapOpen;scenarioOpen=false;scenarioIndex=null;root.render();document.querySelector('.canvas-search')?.focus();}
    else if(action==='scenarios'||action==='scenario-list'){if(isFind())root.setMode('explore');scenarioOpen=action==='scenario-list'||!scenarioOpen;mapOpen=false;scenarioIndex=null;scenarioPeek=false;root.render();document.querySelector('.scenario-choices button')?.focus({preventScroll:true});}
    else if(action==='scenario-filter'){scenarioFilter=root.EngBookScenarios.filterKey(scenarios(),el.dataset.filter);scenarioOpen=true;scenarioIndex=null;scenarioPeek=false;root.render();document.querySelector(`[data-filter="${scenarioFilter}"]`)?.focus({preventScroll:true});}
    else if(action==='scenario-peek'){scenarioPeek=!scenarioPeek;root.render();document.querySelector('[data-canvas-action="scenario-peek"]')?.focus({preventScroll:true});}
    else if(action==='scenario')chooseScenario(el.dataset.index);
    else if(action==='scenario-prev'||action==='scenario-next')chooseScenario(scenarioIndex+(action==='scenario-prev'?-1:1));
    else if(action==='scenario-hear')root.speak(currentScenario()?.text,.82,voiceOptions(scenarioIndex));
    else if(action==='scenario-level'){scenarioLevel=el.dataset.level;root.render();document.querySelector(`[data-level="${scenarioLevel}"]`)?.focus({preventScroll:true});}
    else if(action==='scenario-expand'){scenarioExpanded=!scenarioExpanded;root.render();document.querySelector('[data-canvas-action="scenario-expand"]')?.focus({preventScroll:true});}
    else if(action==='learn-tab'){learnTab=el.dataset.tab;root.render();document.querySelector(`[data-tab="${learnTab}"]`)?.focus({preventScroll:true});}
    else if(action==='lesson-phrase'||action==='lesson-grammar'){select(el.dataset.index);detailExpanded=true;cardTab=action==='lesson-phrase'?'phrase':'grammar';root.render();}
    else if(action==='guide-prev'||action==='guide-next'){const count=state().lesson.hotspots.length;guideExample=(guideExample+(action==='guide-prev'?count-1:1))%count;root.render();document.querySelector(`[data-canvas-action="${action}"]`)?.focus({preventScroll:true});}
    else if(action==='save'&&selected())root.toggleSaved(selected().en);
    else if(action==='hear'&&selected()){const h=selected(),data=language(h);root.speak(cardTab==='grammar'?data.grammar[tense%data.grammar.length].sentence:cardTab==='phrase'?data.phrases[phrase%data.phrases.length].text:h.example,.82,hotspotVoice(h));}
    else if(action==='details'){details=!details;root.render();}
    else if(action.startsWith('tense-')){const count=language(selected()).grammar.length;tense=(tense+(action==='tense-next'?1:count-1))%count;root.render();document.querySelector(`[data-canvas-action="${action}"]`)?.focus({preventScroll:true});}
    else if(action.startsWith('phrase-')){const count=language(selected()).phrases.length;phrase=(phrase+(action==='phrase-next'?1:count-1))%count;root.render();document.querySelector(`[data-canvas-action="${action}"]`)?.focus({preventScroll:true});}
  });
  document.addEventListener('keydown',e=>{if(e.key!=='Escape'||!active()||document.querySelector('dialog[open]'))return;if(mapOpen||scenarioOpen||practiceMenu){mapOpen=false;scenarioOpen=false;practiceMenu=false;root.render();}else if(selected()||currentScenario())clear();else if(state().mode!=='explore')root.setMode('explore');});
  root.speechSynthesis?.addEventListener?.('voiceschanged',()=>{if(active()&&(selected()||currentScenario()))root.render();});
  root.EngBookSceneCanvas=Object.freeze({render,cleanup,open,active,select,clear,visibleHotspots,position,placeCard,clampCard,connector,bindCardDrag,chooseScenario,openLearningDetail,hasCard:()=>Boolean(selected()||currentScenario())});
})(typeof window!=='undefined'?window:globalThis);
