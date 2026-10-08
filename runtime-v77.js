/* EngBook v0.77 — Lesson 05 complete truth-first garden journey. */
(function(root){
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const q=s=>String(s??'').replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g,' ');
  const PM=root.EngBookPersonalMarks,TAX=root.EngBookHotspotTaxonomy;
  const peopleParents=new Set(['l05-older-man','l05-child-on-swing','l05-standing-woman','l05-girl-pink-dress','l05-kneeling-woman','l05-boy-table']);
  const playObjectParents=new Set(['l05-rope-swing','l05-bubbles']);
  const picnicParents=new Set(['l05-picnic-blanket','l05-picnic-basket','l05-picnic-table']);
  const gardenParents=new Set(['l05-rose-arch','l05-hydrangeas','l05-sunflowers','l05-garden-setting']);
  const classifier=h=>{
    if(h?.categoryKey)return h.categoryKey;
    const id=String(h?.id||''),p=String(h?.parentId||''),g=String(h?.detailGroup||'').toLowerCase(),a=String(h?.attributeGroup||'').toLowerCase(),t=String(h?.type||'').toLowerCase();
    if(h?.level!=='detail'){
      if(t==='person')return 'people';
      if(id==='l05-rope-swing'||id==='l05-bubbles')return 'play_objects';
      if(picnicParents.has(id))return 'picnic';
      if(gardenParents.has(id))return 'garden';
      return 'overview';
    }
    if(peopleParents.has(p)){
      if(g==='appearance')return 'people';
      if(['shirt','dress','lower-body'].includes(g))return 'clothing';
      if(['gesture','posture','interaction'].includes(g)||t==='action')return 'interaction';
      return 'people';
    }
    if(playObjectParents.has(p)){
      if(t==='light'||g==='light'||a==='reflection')return 'light';
      return 'play_objects';
    }
    if(picnicParents.has(p))return 'picnic';
    if(gardenParents.has(p)){
      if(t==='light'||g==='light'||a==='lighting')return 'light';
      return 'garden';
    }
    return 'overview';
  };
  const config={profile:'garden-intergenerational-play',defaultCategory:'overview',categories:[
    {key:'overview',label:'Overview'},
    {key:'people',label:'People & Faces'},
    {key:'clothing',label:'Clothing & Details'},
    {key:'interaction',label:'Play & Interaction'},
    {key:'play_objects',label:'Swing & Bubbles'},
    {key:'picnic',label:'Picnic & Food'},
    {key:'garden',label:'Flowers & Garden'},
    {key:'light',label:'Light & Atmosphere'}
  ],classifier};
  const dataTax=root.EngBookContent?.getPack?.(5)?.presentation?.hotspotTaxonomy;if(dataTax?.categories?.length){config.profile=dataTax.profile||config.profile;config.defaultCategory=dataTax.defaultCategory||config.defaultCategory;config.categories=dataTax.categories;}
  TAX?.register?.(5,config);
  function cat(){const k=state.hotspotCategoryByLesson?.[5]||'overview';return config.categories.some(x=>x.key===k)?k:'overview';}
  function catLabel(h){const k=classifier(h);return config.categories.find(x=>x.key===k)?.label||'Detail';}
  function entries(key=cat()){
    const hs=state.lesson?.hotspots||[];
    if(key==='overview')return hs.map((h,index)=>({h,index})).filter(({h})=>h.level!=='detail');
    return hs.map((h,index)=>({h,index})).filter(({h})=>classifier(h)===key);
  }
  function savedHotspot(h){if(!PM)return false;const target=PM.target({lessonId:5,type:'hotspot',id:h?.id||h?.en||'hotspot'}),x=PM.find(progress,target);return !!(x&&(x.marked||x.highlighted));}
  function bar(){
    const active=cat(),marked=(state.lesson?.hotspots||[]).filter(savedHotspot).length;
    return `<nav class="v67-hotspot-categories v69-adaptive-categories v77-garden-taxonomy" aria-label="Hotspot categories"><div class="v67-hotspot-category-scroll">${config.categories.map(c=>`<button class="${!state.personalMarkFilter&&active===c.key?'active':''}" data-eng-v52-click="event.stopPropagation();setAdaptiveHotspotCategory('${c.key}')"><b>${esc(c.label)}</b><span>${entries(c.key).length}</span></button>`).join('')}<button class="v70-my-marks ${state.personalMarkFilter?'active':''}" data-eng-v52-click="event.stopPropagation();showMarkedHotspots()"><b>My Marks</b><span>${marked}</span></button></div><small>${state.personalMarkFilter?`Showing ${marked} personal marked/highlighted hotspot${marked===1?'':'s'}.`:active==='overview'?'Choose a layer to reveal only related garden details.':`Showing ${entries(active).length} ${esc(config.categories.find(x=>x.key===active)?.label||active)} anchors.`}</small></nav>`;
  }

  const _visible=v35VisibleHotspots;
  v35VisibleHotspots=function(){if(activeLessonId()===5&&state.mode==='explore'&&!state.personalMarkFilter)return entries();return _visible();};
  const _parent=v35DetailParent;
  v35DetailParent=function(){if(activeLessonId()===5&&state.mode==='explore')return null;return _parent();};
  const directCard=v60OpenHotspotCard;
  root.v77OpenWordCard=i=>directCard(Number(i));
  v60OpenHotspotCard=function(i){if(activeLessonId()===5&&state.mode==='explore')return v60SelectAnchor(Number(i));return directCard(Number(i));};

  const _panel=v60MicroPanel;
  v60MicroPanel=function(h){
    let html=_panel(h);if(activeLessonId()!==5||!h)return html;
    const label=catLabel(h).toUpperCase();
    html=html.replace('SCENE WORD',`${esc(label)} HOTSPOT`);
    if(!html.includes('v69-glass-tag'))html=html.replace('<span>EXAMPLE FROM THIS PHOTO</span>',`<span>EXAMPLE FROM THIS PHOTO</span><i class="v69-glass-tag">${esc(label)}</i>`);
    html=html.replace('The example sentence is tied to the selected visual detail.','This sentence is directly tied to the selected part of the garden image.');
    return html;
  };
  const _stage=sceneStage;
  sceneStage=function(modal=false){
    let html=_stage(modal);if(activeLessonId()!==5||state.mode!=='explore')return html;
    html=html.replace('<div class="photo-top-actions">',`${bar()}<div class="photo-top-actions">`);
    const sel=state.lesson?.hotspots?.[Number(state.selected)];
    if(sel){html=html.replaceAll(`data-eng-v52-click="event.stopPropagation();v60OpenHotspotCard(${state.selected})"`,`data-eng-v52-click="event.stopPropagation();v77OpenWordCard(${state.selected})"`);html=html.replace('<small>tap word</small>',`<small>${esc(catLabel(sel).toUpperCase())} • tap word</small>`);}
    html=html.replace('<span>MICRO HOTSPOT MODE</span>',`<span>${esc((state.personalMarkFilter?'MY MARKS':cat()).toUpperCase())} HOTSPOTS</span>`);
    return html;
  };

  // Lesson 05 builder uses only its own image-grounded sentence set.
  function sets(){const a=activeGold()?.recall?.builderSentences;return Array.isArray(a)&&a.length?a:[];}
  const _init=initBuilder,_check=checkBuilder,_next=nextBuilder,_content=builderContent;
  initBuilder=function(){if(activeLessonId()!==5)return _init();const a=sets(),parts=a[Number(state.builderIndex||0)%a.length]||[];state.builderAvailable=shuffle(parts.map((_,i)=>i));state.builderChosen=[];state.builderResult='';};
  checkBuilder=function(){if(activeLessonId()!==5)return _check();const a=sets(),parts=a[Number(state.builderIndex||0)%a.length]||[],ok=state.builderChosen.length===parts.length&&state.builderChosen.every((id,i)=>id===i);state.builderResult=ok?'correct':'wrong';haptic(ok?[15,25,40]:25);if(ok){awardPoints(10,'builder');speak(parts.join(' '));}render();};
  nextBuilder=function(){if(activeLessonId()!==5)return _next();const a=sets();state.builderIndex=(Number(state.builderIndex||0)+1)%a.length;initBuilder();render();};
  builderContent=function(){
    if(activeLessonId()!==5)return _content();const a=sets(),parts=a[Number(state.builderIndex||0)%a.length]||[];
    return `<div class="builder-card l01-inline-builder"><div class="builder-head"><div><span>MODEL SENTENCE ${Number(state.builderIndex||0)+1}/${a.length}</span><h3>Build the sentence from scene chunks</h3><p>Every chunk comes from visible garden evidence.</p></div><button data-eng-v52-click="builderReset()">${icon('reset')} Reset</button></div><div class="answer-zone ${state.builderResult}">${state.builderChosen.length?state.builderChosen.map(id=>`<button data-eng-v52-click="builderUndo()">${esc(parts[id])}</button>`).join(''):'<span>Tap the chunks below in the right order…</span>'}</div><div class="token-bank">${state.builderAvailable.map(id=>`<button data-eng-v52-click="builderPick(${id})">${esc(parts[id])}</button>`).join('')}</div><div class="builder-actions"><button class="secondary" data-eng-v52-click="builderUndo()" ${!state.builderChosen.length?'disabled':''}>Undo</button><button class="primary" data-eng-v52-click="checkBuilder()">Check sentence</button></div>${state.builderResult==='correct'?`<div class="builder-feedback good">${icon('check')} Correct. The sentence stays grounded in the photo. <button data-eng-v52-click="nextBuilder()">Next sentence →</button></div>`:state.builderResult==='wrong'?'<div class="builder-feedback try">Not quite. Rebuild the chunks in natural English order.</div>':''}</div>`;
  };

  root.setL05JourneyStep=function(step){const valid=['overview','micro','build','scenario','meaning','story','language','grammar','speak'];state.l05JourneyStep=valid.includes(step)?step:'overview';render();};
  const get=()=>activeGold();
  const next=(step,label='Continue')=>`<button class="l01-next" data-eng-v52-click="setL05JourneyStep('${step}')">${esc(label)} ${icon('chevron')}</button>`;
  const nav=()=>`<div class="l01-journey-nav">${[['overview','01','Scene'],['micro','02','Analyze'],['build','03','Build'],['scenario','04','Combine'],['meaning','05','Reason'],['story','06','Story'],['language','07','Language'],['grammar','08','Grammar'],['speak','09','Speak']].map(([k,n,t])=>`<button class="${state.l05JourneyStep===k?'active':''}" data-eng-v52-click="setL05JourneyStep('${k}')"><i>${n}</i><span>${t}</span></button>`).join('')}</div>`;
  function status(type,id){if(!PM)return {marked:false,highlighted:false,key:''};const t=PM.target({lessonId:5,type,id}),x=PM.find(progress,t)||{};return {marked:!!x.marked,highlighted:!!x.highlighted,key:t.key};}
  function tools(type,id,label,text,category){const s=status(type,id);return `<div class="v72-inline-tools"><button class="${s.marked?'active mark':''}" data-eng-v52-click="togglePersonalContentMark('${q(type)}','${q(id)}','${q(label)}','${q(text)}','${q(category)}')">${s.marked?'★':'☆'} <span>${s.marked?'Marked':'Mark'}</span></button><button class="${s.highlighted?'active highlight':''}" data-eng-v52-click="togglePersonalContentHighlight('${q(type)}','${q(id)}','${q(label)}','${q(text)}','${q(category)}')">▰ <span>${s.highlighted?'Highlighted':'Highlight'}</span></button></div>`;}
  const cls=(type,id)=>{const s=status(type,id);return `${s.marked?' v72-is-marked':''}${s.highlighted?' v72-is-highlighted':''}`;};

  function overview(c){return `<section class="l01-step l01-overview-step"><div class="l01-source-badge"><i>${icon('compass')}</i><div><b>VISUAL LEARNING PATH</b><span>Lesson 05 • Garden Play & Picnic</span></div></div><div class="l01-overview-grid"><article class="l01-overview-photo"><img src="${state.lesson.image}" alt="${esc(state.lesson.title)}"><div><span>OBSERVE FIRST</span><b>people • play • picnic • garden • light</b></div></article><article class="l01-overview-copy"><span>01 • SCENE OVERVIEW</span><h2>Read the whole garden before naming the small details.</h2><p>${esc(c.overview)}</p><div class="l01-overview-actions"><button data-eng-v52-click="speak('${q(c.overview)}',.88)">${icon('volume')} Listen</button><button data-eng-v52-click="setMode('explore')">Open full-screen scene ${icon('expand')}</button></div><div class="l01-scene-formula"><span><b>WHO</b>3 older adults + 3 children</span><i>→</i><span><b>ACTION</b>swing + bubble play</span><i>→</i><span><b>WHERE</b>flower-filled garden</span><i>→</i><span><b>CLUES</b>picnic + warm light</span></div></article></div>${next('micro','Analyze the picture')}</section>`;}
  function micro(c){const n=state.lesson?.hotspots?.length||0;return `<section class="l01-step"><div class="l01-step-head"><span>02 • VISUAL EVIDENCE & MICRO-ANALYSIS</span><h2>Move from the full garden to details you can point to.</h2><p>Only visible, distinct, useful anchors remain after the truth-first audit.</p></div><div class="l01-analysis-grid"><div class="l01-evidence-stack">${(c.evidence||[]).map((row,i)=>`<details ${i<3?'open':''}><summary><i>${String(i+1).padStart(2,'0')}</i><b>${esc(row.label)}</b>${icon('chevron')}</summary><p>${esc(row.detail)}</p></details>`).join('')}</div><aside class="l01-micro-aside"><span>MICRO-ANALYSIS</span>${(c.micro||[]).map((m,i)=>`<article><i>${i+1}</i><p>${esc(m)}</p></article>`).join('')}<button data-eng-v52-click="setMode('explore')">Inspect ${n} truth-first hotspots ${icon('target')}</button><small>Hotspot count follows the image, not a preset target.</small></aside></div>${next('build','Build sentences')}</section>`;}
  function build(c){if(!state.builderAvailable.length&&!state.builderChosen.length)initBuilder();const rows=c.recall?.builderSentences||[];return `<section class="l01-step"><div class="l01-step-head"><span>03 • SENTENCE BUILDING</span><h2>Connect people, play, picnic objects, flowers, and light.</h2><p>Start with visible facts and keep exact relationships outside the factual layer.</p></div><div class="l01-sentence-ladder v72-sentence-ladder">${rows.map((parts,i)=>{const text=parts.join(' '),id=`builder-${i}`,s=status('sentence',id);return `<article class="${cls('sentence',id)}" data-personal-key="${esc(s.key)}"><i>S${i+1}</i><p>${esc(text)}</p><div class="v72-row-actions"><button data-eng-v52-click="speak('${q(text)}',.84)">${icon('volume')} Listen</button>${tools('sentence',id,`Sentence Builder ${i+1}`,text,'Sentence Builder')}</div></article>`;}).join('')}</div>${builderContent()}${next('scenario','Combine scene details')}</section>`;}
  function scenario(c){return `<section class="l01-step v69-scenario-step"><div class="l01-step-head"><span>04 • SCENE COMBINATIONS</span><h2>Combine garden hotspot layers into natural descriptions.</h2><p>Fact cards use only visible anchors. The inference card is clearly labeled.</p></div><div class="v69-scenario-grid">${(c.sceneCombinations||[]).map((x,i)=>{const id=`scenario-${i}`,s=status('scenario',id);return `<article class="${x.kind==='inference'?'inference':'fact'} ${cls('scenario',id)}" data-personal-key="${esc(s.key)}"><div class="v69-scenario-head"><i>${String(i+1).padStart(2,'0')}</i><div><b>${esc(x.title)}</b><div>${(x.categories||[]).map(k=>`<span>${esc(config.categories.find(v=>v.key===k)?.label||k)}</span>`).join('')}</div></div><em>${x.kind==='inference'?'CAUTIOUS INFERENCE':'VISIBLE FACTS'}</em></div><p>${esc(x.sentence)}</p><div class="v70-scenario-actions"><button data-eng-v52-click="speak('${q(x.sentence)}',.84)">${icon('volume')} Listen</button>${tools('scenario',id,x.title,x.sentence,'Scene Combination')}</div></article>`;}).join('')}</div><div class="v69-combine-rule"><b>Combination rule</b><p>Join visible people + action + object + place first. Add social meaning only with cautious language.</p></div>${next('meaning','Check fact vs inference')}</section>`;}
  root.l05AnswerFact=function(kind){const items=get()?.recall?.factItems||[];if(!items.length)return;state.factIndex=state.factIndex%items.length;const item=items[state.factIndex],ok=kind===item.kind;state.factAnswered={ok,kind};if(ok)state.factScore++;haptic(ok?[15,25,30]:22);render();};
  root.l05NextFact=function(){const items=get()?.recall?.factItems||[];if(state.factIndex<items.length-1){state.factIndex++;state.factAnswered=null;}else{toast(`Evidence check complete: ${state.factScore}/${items.length}`);state.factIndex=0;state.factAnswered=null;state.factScore=0;}render();};
  function fact(c){const items=c.recall?.factItems||[];state.factIndex=state.factIndex%Math.max(1,items.length);const item=items[state.factIndex];if(!item)return '';return `<div class="fact-game l01-three-way-fact"><div class="fact-counter"><span>EVIDENCE CHECK ${state.factIndex+1}/${items.length}</span><b>${state.factScore} correct</b></div><article><div class="quote-mark">“</div><h3>${esc(item.text)}</h3><p>Classify the sentence by what this single garden photograph can actually support.</p></article><div class="fact-actions three"><button data-eng-v52-click="l05AnswerFact('fact')" ${state.factAnswered?'disabled':''}>${icon('eye')} Visible fact</button><button data-eng-v52-click="l05AnswerFact('inference')" ${state.factAnswered?'disabled':''}>${icon('layers')} Supported inference</button><button data-eng-v52-click="l05AnswerFact('unsupported')" ${state.factAnswered?'disabled':''}>${icon('close')} Unsupported</button></div>${state.factAnswered?`<div class="fact-feedback ${state.factAnswered.ok?'good':'try'}"><b>${state.factAnswered.ok?'Correct':'Check the evidence again'}</b><p>${esc(item.note)}</p><button data-eng-v52-click="l05NextFact()">${state.factIndex===items.length-1?'Finish':'Next'} →</button></div>`:''}</div>`;}
  function meaning(c){return `<section class="l01-step"><div class="l01-step-head"><span>05 • INTERPRETATION & EVIDENCE</span><h2>Separate visible age groups from exact relationship claims.</h2></div><div class="confidence-ladder l01-confidence"><article class="confidence-card high"><div><b>HIGH</b><span>Strongly supported</span></div><p>${esc(c.inference.high)}</p></article><article class="confidence-card medium"><div><b>MEDIUM</b><span>Plausible</span></div><p>${esc(c.inference.medium)}</p></article><article class="confidence-card low"><div><b>LOW</b><span>Possible story</span></div><p>${esc(c.inference.low)}</p></article></div><div class="timeline-pro l01-timeline"><article><span>BEFORE · HYPOTHESIS</span><p>${esc(c.timeline.before)}</p></article><i>${icon('chevron')}</i><article><span>NOW · VISIBLE</span><p>${esc(c.timeline.now)}</p></article><i>${icon('chevron')}</i><article><span>NEXT · POSSIBILITY</span><p>${esc(c.timeline.next)}</p></article></div><div class="accuracy-card l01-guardrail"><div>${icon('target')}<b>Accuracy guardrail</b></div><p>${esc(c.guardrail)}</p></div>${fact(c)}${next('story','Build a possible story')}</section>`;}
  function story(c){const text=String(c.story||'').replace(/^CREATIVE EXTENSION — NOT A VISUAL FACT\.\s*/,'');return `<section class="l01-step"><div class="l01-step-head"><span>06 • STORY BUILDER</span><h2>Extend the garden moment while keeping imagination labeled.</h2></div><div class="l01-story-card"><div class="l01-story-warning">${icon('spark')}<span><b>CREATIVE EXTENSION — NOT A VISUAL FACT</b><small>Use may / might / could for events outside the frame.</small></span></div><p>${esc(text)}</p><button data-eng-v52-click="speak('${q(text)}',.86)">${icon('volume')} Listen</button></div><div class="l01-story-contrast"><article><span>PHOTO CAN SUPPORT</span><p>${esc(c.timeline.now)}</p></article><article><span>STORY CAN IMAGINE</span><p>${esc(c.timeline.before)} ${esc(c.timeline.next)}</p></article></div>${next('language','Collect useful language')}</section>`;}
  function language(c){return `<section class="l01-step"><div class="l01-step-head"><span>07 • LANGUAGE BANK</span><h2>Collect phrases that rebuild the garden quickly.</h2></div><div class="l01-language-bank v72-language-bank">${(c.languageBank||[]).map((p,i)=>{const id=`language-${i}`,s=status('phrase',id);return `<article class="v72-language-item${cls('phrase',id)}" data-personal-key="${esc(s.key)}"><div><i>${String(i+1).padStart(2,'0')}</i><b>${esc(p)}</b></div><div class="v72-row-actions"><button data-eng-v52-click="speak('${q(p)}',.82)">${icon('volume')} Listen</button>${tools('phrase',id,p,p,'Language Bank')}</div></article>`;}).join('')}</div><div class="l01-memory-grid"><article><span>DESCRIPTION FRAMES</span>${(c.memoryFrames||[]).map(x=>`<p>${esc(x)}</p>`).join('')}</article><article><span>PERSONAL TRANSFER</span>${(c.personalQuestions||[]).map((x,i)=>`<p><i>${i+1}</i>${esc(x)}</p>`).join('')}</article></div>${next('grammar','Open grammar + model ladder')}</section>`;}
  function grammar(c){const models=c.grammar?.models||{},level=state.level&&models[state.level]?state.level:(models['B1–B2']?'B1–B2':Object.keys(models)[0]);return `<section class="l01-step"><div class="l01-step-head"><span>08 • GRAMMAR & MODEL LADDER</span><h2>${esc(c.grammar.title)}</h2><p>${esc(c.grammar.explainer)}</p></div><div class="v73-memory-contrast"><article><span>PHOTO-SAFE</span><p>The children are younger than the older adults.</p></article><article><span>MOMENT-BOUND</span><p>In this moment, some children are more physically active.</p></article><article><span>DO NOT GENERALIZE</span><p>Do not turn one garden scene into a stereotype about all older adults or children.</p></article></div><div class="l01-grammar-examples v72-grammar-examples">${(c.grammar.examples||[]).map((e,i)=>{const id=`example-${i}`,s=status('grammar',id);return `<article class="${cls('grammar',id)}" data-personal-key="${esc(s.key)}"><i>${i+1}</i><p>${highlightGrammar(e)}</p><div class="v72-row-actions"><button data-eng-v52-click="speak('${q(e)}',.82)">${icon('volume')} Listen</button>${tools('grammar',id,`Grammar example ${i+1}`,e,'Grammar Example')}</div></article>`;}).join('')}</div><div class="model-ladder l01-model-ladder"><div class="level-switch">${Object.keys(models).map(l=>`<button class="${level===l?'active':''}" data-eng-v52-click="state.level='${q(l)}';render()">${esc(l)}</button>`).join('')}</div><article><div><span>SCENE MODEL</span><button data-eng-v52-click="speak('${q(models[level])}',.88)">${icon('volume')} Listen</button></div><p>${esc(models[level])}</p></article></div><div class="l01-model-progression v72-model-progression">${Object.entries(models).map(([l,t])=>{const id=`model-${String(l).toLowerCase().replace(/[^a-z0-9]+/g,'-')}`,s=status('grammar',id);return `<article class="${cls('grammar',id)}" data-personal-key="${esc(s.key)}"><span>${esc(l)}</span><p>${esc(t)}</p><div class="v72-row-actions"><button data-eng-v52-click="speak('${q(t)}',.86)">${icon('volume')} Listen</button>${tools('grammar',id,`${l} model`,t,'Grammar Model')}</div></article>`;}).join('')}</div>${next('speak','Describe it yourself')}</section>`;}
  function speakStep(c){return `<section class="l01-step"><div class="l01-step-head"><span>09 • INDEPENDENT SPEAKING</span><h2>Rebuild the garden scene in your own English.</h2><p>Use the timed recorder to speak, stop automatically, and listen back to your own voice.</p></div><div class="l01-speaking-stages">${[['30','30 SEC','Simple scene'],['60','60 SEC','Connected description'],['90','90 SEC','Full reconstruction']].map(([sec,label,title])=>`<article><i>${label}</i><h3>${title}</h3><p>${esc(c.speaking[sec])}</p><button data-eng-v52-click="launchTimedVoiceChallenge(${sec})">Record ${sec}s ${icon('mic')}</button></article>`).join('')}</div><div class="l01-selfcheck"><span>SELF-CHECK</span><div><i>${icon('check')} six people counted correctly</i><i>${icon('check')} swing action described</i><i>${icon('check')} picnic + flowers included</i><i>${icon('check')} warm light included</i><i>${icon('check')} exact kinship not invented</i><i>${icon('check')} one inference clearly labeled</i></div></div><div class="l01-finish-row"><button data-eng-v52-click="setMode('talk')">Continue to scene conversation ${icon('spark')}</button><button class="secondary" data-eng-v52-click="setL05JourneyStep('overview')">Review lesson path</button></div></section>`;}
  function body(c){if(state.l05JourneyStep==='overview')return overview(c);if(state.l05JourneyStep==='micro')return micro(c);if(state.l05JourneyStep==='build')return build(c);if(state.l05JourneyStep==='scenario')return scenario(c);if(state.l05JourneyStep==='meaning')return meaning(c);if(state.l05JourneyStep==='story')return story(c);if(state.l05JourneyStep==='language')return language(c);if(state.l05JourneyStep==='grammar')return grammar(c);return speakStep(c);}
  function complete(){const c=get();if(!['overview','micro','build','scenario','meaning','story','language','grammar','speak'].includes(state.l05JourneyStep))state.l05JourneyStep='overview';const n=state.lesson?.hotspots?.length||0;return `<section class="l01-complete-path"><div class="panel-heading l01-path-heading"><div><span class="section-kicker">LESSON 05 • COMPLETE LEARNING JOURNEY</span><h2>See → verify → combine → reason → speak</h2><p>${n} truth-first image anchors connect garden details, play, picnic vocabulary, grammar, and recorded speaking practice.</p></div><div class="l01-path-count"><b>${n}</b><span>image anchors</span></div></div>${nav()}${body(c)}</section>`;}
  const _learn=learnContent;
  learnContent=function(){if(activeLessonId()===5)return complete();return _learn();};

  const _personal=root.openPersonalMark;
  root.openPersonalMark=async function(key){
    const item=PM?.list(progress).find(x=>x.key===key);if(!item||Number(item.lessonId)!==5)return _personal?.(key);
    root.closeMyMarksLibrary?.();
    if(item.type==='hotspot'){
      const ok=await root.v27OpenLesson?.(5,'explore');if(ok===false)return;const hs=state.lesson?.hotspots||[],index=hs.findIndex(h=>String(h.id||h.en)===String(item.id));if(index<0){toast('This hotspot is no longer available in the lesson.');return;}
      const h=hs[index];state.personalMarkFilter=false;state.hotspotCategoryByLesson=state.hotspotCategoryByLesson||{};state.hotspotCategoryByLesson[5]=classifier(h);state.selected=index;state.v60AnchorLabel=index;state.v60CardOpen=true;state.v60GrammarOpen=false;v59EnsureViewer().sheet='peek';render();return;
    }
    const ok=await root.v27OpenLesson?.(5,'learn');if(ok===false)return;
    if(item.type==='scenario')state.l05JourneyStep='scenario';if(item.type==='sentence')state.l05JourneyStep='build';if(item.type==='phrase')state.l05JourneyStep='language';if(item.type==='grammar')state.l05JourneyStep='grammar';render();
    setTimeout(()=>{const el=[...document.querySelectorAll('[data-personal-key]')].find(x=>x.dataset.personalKey===key);if(el){el.scrollIntoView({behavior:'smooth',block:'center'});el.classList.add('v72-focus-pulse');setTimeout(()=>el.classList.remove('v72-focus-pulse'),1800);}},120);
  };
  const _open=openLesson;
  openLesson=function(id){if(Number(id)===5){state.l05JourneyStep='overview';state.hotspotCategoryByLesson=state.hotspotCategoryByLesson||{};state.hotspotCategoryByLesson[5]='overview';state.personalMarkFilter=false;}return _open(id);};
  root.ENGBOOK_RUNTIME={...(root.ENGBOOK_RUNTIME||{}),build:'v0.77-lesson05-truth-first-complete',lesson05CompleteLearningJourney:true,lesson05TruthFirstHotspots:true,lesson05HotspotCount:105,lesson05AdaptiveTaxonomy:config.categories.map(x=>x.key),lesson05ForcedTargetCount:false};
})(window);
