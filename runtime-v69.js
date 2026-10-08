/* EngBook v0.69 — runtime adaptive taxonomy + two-step word card + Lesson 02 combination stage. */
(function(root){
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const q=s=>String(s??'').replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g,' ');
  const taxonomies=new Map();
  const classifierL02=h=>{
    if(h?.categoryKey)return h.categoryKey;
    const t=String(h?.type||'').toLowerCase(),g=String(h?.detailGroup||'').toLowerCase(),a=String(h?.attributeGroup||'').toLowerCase(),e=String(h?.en||'').toLowerCase();
    if(h?.level!=='detail'){
      if(t==='person')return 'people';
      if(e==='wooden table')return 'table';
      if(e==='large window'||e==='brick wall')return 'background';
      return 'overview';
    }
    if(g==='window'||g==='decor'||g==='plant'||t==='nature'||['structure','structure-detail','surface-detail','shelf','picture','pot','plant','hardware','frame','leaf-detail'].includes(a)||/brick|window|shelf|plant|portrait|picture frame|mortar/.test(e))return 'background';
    if(t==='light'||g==='light'||a==='lighting'||a==='lamp-glow'||/daylight|string lights|amber light|lamp shade glow|warm .* light|hanging lamp/.test(e))return 'light';
    if(t==='food'||/tall milky coffee|light-colored drink|light coffee surface|foamy latte top|croissant-like pastries|pastry flakes|golden pastry crust/.test(e))return 'food';
    if(g==='tableware'||g==='surface'||(t==='object'&&['cup-detail','glass-detail','utensil-detail','saucer','cup','glass','plate','utensil','object-detail'].includes(a))||/coffee cup|coffee glass|pastry plate|mug handle|spoon handle|table plank|wood grain|saucer|teaspoon/.test(e))return 'table';
    if(t==='action'||g==='gesture'||g==='posture'||a==='posture'||['gaze','hand','gesture','arm','arm-position','hand-shape','hand-detail','head-position','upper-body','attention'].includes(a))return 'actions';
    if(t==='clothing'||['sweater','jacket','striped-top','lower-body'].includes(g)||['garment','garment-detail','collar','button','sleeve','neckline','cuff','hem','trousers','pattern','color','texture','construction'].includes(a))return 'clothing';
    return 'people';
  };
  function register(id,config){taxonomies.set(Number(id),config);return config;}
  const l02DataTax=root.EngBookContent?.getPack?.(2)?.presentation?.hotspotTaxonomy;register(2,{profile:l02DataTax?.profile||'social-cafe-scene',defaultCategory:l02DataTax?.defaultCategory||'overview',categories:l02DataTax?.categories||[{key:'overview',label:'Overview'},{key:'people',label:'People & Faces'},{key:'clothing',label:'Clothing'},{key:'actions',label:'Actions & Gestures'},{key:'food',label:'Food & Drinks'},{key:'table',label:'Table & Objects'},{key:'background',label:'Background & Decor'},{key:'light',label:'Light & Atmosphere'}],classifier:classifierL02});
  const classifierFromPack=h=>h?.categoryKey||'overview';
  for(let lessonId=1;lessonId<=60;lessonId++){const pk=root.EngBookContent?.getPack?.(lessonId),tx=pk?.presentation?.hotspotTaxonomy;if(!tx?.categories?.length)continue;if(lessonId===2)continue;register(lessonId,{profile:tx.profile||`lesson-${lessonId}-image-audit`,defaultCategory:tx.defaultCategory||'overview',categories:tx.categories,classifier:classifierFromPack,contract:tx.contract||'',basis:tx.basis||''});}
  root.EngBookHotspotTaxonomy={version:'adaptive-taxonomy-v1',register,get:id=>taxonomies.get(Number(id))||null,list:()=>[...taxonomies.keys()]};

  function cfg(id=activeLessonId()){return taxonomies.get(Number(id))||null;}
  function stateMap(){if(!state.hotspotCategoryByLesson||typeof state.hotspotCategoryByLesson!=='object')state.hotspotCategoryByLesson={};return state.hotspotCategoryByLesson;}
  function activeCategory(id=activeLessonId()){
    const c=cfg(id);if(!c)return 'overview';const m=stateMap(),candidate=m[id]||c.defaultCategory||'overview';return c.categories.some(x=>x.key===candidate)?candidate:(c.defaultCategory||'overview');
  }
  function entries(id=activeLessonId(),key=activeCategory(id)){
    const c=cfg(id),hs=state.lesson?.hotspots||[];if(!c)return hs.map((h,index)=>({h,index}));
    if(key==='overview')return hs.map((h,index)=>({h,index})).filter(({h})=>h.level!=='detail');
    return hs.map((h,index)=>({h,index})).filter(({h})=>c.classifier(h)===key);
  }
  root.setAdaptiveHotspotCategory=function(key){
    const id=activeLessonId(),c=cfg(id);if(!c)return;if(!c.categories.some(x=>x.key===key))key=c.defaultCategory||'overview';
    stateMap()[id]=key;state.selected=null;state.hotspotDetailParent=null;state.hotspotDetailGroup=null;state.v60AnchorLabel=null;state.v60CardOpen=false;state.v60GrammarOpen=false;state.tapFeedback=null;v59EnsureViewer().sheet='collapsed';haptic(8);render();
  };
  function bar(){
    const id=activeLessonId(),c=cfg(id);if(!c||state.mode!=='explore')return '';
    const a=activeCategory(id);return `<nav class="v67-hotspot-categories v69-adaptive-categories" aria-label="Hotspot categories"><div class="v67-hotspot-category-scroll">${c.categories.map(x=>`<button class="${a===x.key?'active':''}" data-eng-v52-click="event.stopPropagation();setAdaptiveHotspotCategory('${x.key}')"><b>${esc(x.label)}</b><span>${entries(id,x.key).length}</span></button>`).join('')}</div><small>${a==='overview'?'Choose a scene-specific layer to reveal related details.':`Showing ${entries(id,a).length} ${c.categories.find(x=>x.key===a)?.label||a} anchors.`}</small></nav>`;
  }
  function categoryLabel(h){const c=cfg();if(!c)return 'DETAIL';const k=c.classifier(h),found=c.categories.find(x=>x.key===k);return String(found?.label||k||'Detail').toUpperCase();}

  const _visible=v35VisibleHotspots;
  v35VisibleHotspots=function(){const id=Number(activeLessonId());if(state.mode==='explore'&&(id===2||(id>=6&&cfg(id))))return entries(id);return _visible();};
  const _parent=v35DetailParent;
  v35DetailParent=function(){const id=Number(activeLessonId());if(state.mode==='explore'&&(id===2||(id>=6&&cfg(id))))return null;return _parent();};

  const baseOpen=v60OpenHotspotCard;
  root.v69OpenWordCard=function(i){return baseOpen(Number(i));};
  v60OpenHotspotCard=function(i){const id=Number(activeLessonId());if(state.mode==='explore'&&(id===2||(id>=6&&cfg(id))))return v60SelectAnchor(Number(i));return baseOpen(Number(i));};

  const _panel=v60MicroPanel;
  function l01Label(h){
    const tx=cfg(1),direct=h?.categoryKey&&tx?.categories?.find(x=>x.key===h.categoryKey);if(direct)return String(direct.label||direct.key).toUpperCase();
    if(typeof v67L01CategoryMatch!=='function')return 'DETAIL';
    const order=(tx?.categories||[]).filter(x=>x.key!=='overview').map(x=>[x.key,String(x.label||x.key).toUpperCase()]);
    for(const [k,label] of order)if(v67L01CategoryMatch(h,k))return label;return 'DETAIL';
  }
  v60MicroPanel=function(h){
    let html=_panel(h);if(!h)return html;
    if(activeLessonId()===2){const label=categoryLabel(h);html=html.replace('SCENE WORD',`${esc(label)} HOTSPOT`);html=html.replace('<section class="v60-scene-example"><span>EXAMPLE FROM THIS PHOTO</span>',`<section class="v60-scene-example"><span>EXAMPLE FROM THIS PHOTO</span><i class="v69-glass-tag">${esc(label)}</i>`);html=html.replace('The example sentence is tied to the selected visual detail.','This sentence is directly tied to the selected part of the café image.');return html;}
    if(Number(activeLessonId())>=6&&cfg(activeLessonId())){const label=categoryLabel(h);html=html.replace('SCENE WORD',`${esc(label)} HOTSPOT`);html=html.replace('<section class="v60-scene-example"><span>EXAMPLE FROM THIS PHOTO</span>',`<section class="v60-scene-example"><span>EXAMPLE FROM THIS PHOTO</span><i class="v69-glass-tag">${esc(label)}</i>`);html=html.replace('The example sentence is tied to the selected visual detail.','This sentence is directly tied to the selected part of this image.');return html;}
    if(activeLessonId()===1){const label=l01Label(h);html=html.replace('SCENE WORD',`${esc(label)} HOTSPOT`);html=html.replace('<section class="v60-scene-example"><span>EXAMPLE FROM THIS PHOTO</span>',`<section class="v60-scene-example"><span>EXAMPLE FROM THIS PHOTO</span><i class="v69-glass-tag">${esc(label)}</i>`);html=html.replace('The example sentence is tied to the selected visual detail.','This sentence is directly tied to the selected part of the beach image.');}
    return html;
  };

  const _scene=sceneStage;
  sceneStage=function(modal=false){
    let html=_scene(modal);const id=Number(activeLessonId());if(state.mode!=='explore'||!(id===2||(id>=6&&cfg(id))))return html;
    html=html.replace('<div class="photo-top-actions">',`${bar()}<div class="photo-top-actions">`);
    const sel=state.lesson?.hotspots?.[Number(state.selected)];
    if(sel){html=html.replaceAll(`data-eng-v52-click="event.stopPropagation();v60OpenHotspotCard(${state.selected})"`,`data-eng-v52-click="event.stopPropagation();v69OpenWordCard(${state.selected})"`);html=html.replace('<small>tap word</small>',`<small>${esc(categoryLabel(sel))} • tap word</small>`);}
    html=html.replace('<span>MICRO HOTSPOT MODE</span>',`<span>${esc(activeCategory(id).toUpperCase())} HOTSPOTS</span>`);
    return html;
  };

  const _openLesson=openLesson;
  openLesson=function(id){const n=Number(id);if(cfg(n)){stateMap()[n]=cfg(n).defaultCategory||'overview';}return _openLesson(id);};

  const l01ScenarioCards=[
    {kind:'fact',title:'People + action',categories:['People','Actions'],sentence:'A young couple are walking hand in hand along the shoreline. The woman is leaning toward the man, and both of them are smiling.'},
    {kind:'inference',title:'Action + feeling',categories:['Actions','People'],sentence:'The pair appear relaxed and affectionate because they are walking close together, holding hands, and smiling.'},
    {kind:'fact',title:'Environment + light',categories:['Environment','Light'],sentence:'Palm trees line the beach on the left, while calm water fills the right side and the low sun casts a bright reflection across the sea.'},
    {kind:'fact',title:'Full scene — facts only',categories:['People','Actions','Environment','Light'],sentence:'A young couple are walking barefoot beside shallow water on a palm-lined beach at sunset. They are holding hands and smiling while warm golden light reflects across the calm sea.'}
  ];
  root.l01ScenarioStepV69=function(){return `<section class="l01-step v69-scenario-step"><div class="l01-step-head"><span>04 • SCENE COMBINATIONS</span><h2>Combine beach hotspots into longer descriptions.</h2><p>Start with visible facts. Add interpretation only when it is clearly marked as cautious.</p></div><div class="v69-scenario-grid">${l01ScenarioCards.map((c,i)=>`<article class="${c.kind==='inference'?'inference':'fact'}"><div class="v69-scenario-head"><i>${String(i+1).padStart(2,'0')}</i><div><b>${esc(c.title)}</b><div>${c.categories.map(x=>`<span>${esc(x)}</span>`).join('')}</div></div><em>${c.kind==='inference'?'CAUTIOUS INFERENCE':'VISIBLE FACTS'}</em></div><p>${esc(c.sentence)}</p><button data-eng-v52-click="speak('${q(c.sentence)}',.84)">${icon('volume')} Listen</button></article>`).join('')}</div>${l01JourneyNext('meaning','Check fact vs inference')}</section>`;};
  if(typeof l01JourneySteps==='function'){
    l01JourneySteps=function(){return [['overview','01','Scene'],['micro','02','Analyze'],['build','03','Build'],['scenario','04','Combine'],['meaning','05','Reason'],['story','06','Story'],['language','07','Language'],['grammar','08','Grammar'],['speak','09','Speak']];};
    const _l01Build=l01BuildStep;l01BuildStep=function(g){let html=_l01Build(g);html=html.replace("state.l01JourneyStep='meaning'","state.l01JourneyStep='scenario'").replace('Check fact vs inference','Combine scene details');return html;};
    l01JourneyBody=function(g){if(state.l01JourneyStep==='overview')return l01OverviewStep(g);if(state.l01JourneyStep==='micro')return l01MicroStep(g);if(state.l01JourneyStep==='build')return l01BuildStep(g);if(state.l01JourneyStep==='scenario')return root.l01ScenarioStepV69(g);if(state.l01JourneyStep==='meaning')return l01MeaningStep(g);if(state.l01JourneyStep==='story')return l01StoryStep(g);if(state.l01JourneyStep==='language')return l01LanguageStep(g);if(state.l01JourneyStep==='grammar')return l01GrammarStep(g);return l01SpeakStep(g);};
  }

  function scenarios(){const c=activeGold()?.sceneCombinations;return Array.isArray(c)?c:[];}
  root.l02ScenarioStep=function(){const cards=scenarios();return `<section class="l01-step v69-scenario-step"><div class="l01-step-head"><span>04 • SCENE COMBINATIONS</span><h2>Combine hotspot categories into natural café descriptions.</h2><p>Build larger sentences from the same details you discovered in the image. Fact-only cards stay fully visible; inference cards use cautious language.</p></div><div class="v69-scenario-grid">${cards.map((c,i)=>`<article class="${c.kind==='inference'?'inference':'fact'}"><div class="v69-scenario-head"><i>${String(i+1).padStart(2,'0')}</i><div><b>${esc(c.title)}</b><div>${(c.categories||[]).map(x=>`<span>${esc((cfg(2)?.categories.find(v=>v.key===x)?.label)||x)}</span>`).join('')}</div></div><em>${c.kind==='inference'?'CAUTIOUS INFERENCE':'VISIBLE FACTS'}</em></div><p>${esc(c.sentence)}</p><button data-eng-v52-click="speak('${q(c.sentence)}',.84)">${icon('volume')} Listen</button></article>`).join('')}</div><div class="v69-combine-rule"><b>Combination rule</b><p>Start with visible people and actions, add objects and place, then add mood only with words such as <em>seem</em>, <em>appear</em>, or <em>suggest</em>.</p></div>${l02JourneyNext('meaning','Check fact vs inference')}</section>`;};

  const _steps=l02JourneySteps;
  l02JourneySteps=function(){return [['overview','01','Scene'],['micro','02','Analyze'],['build','03','Build'],['scenario','04','Combine'],['meaning','05','Reason'],['story','06','Story'],['language','07','Language'],['grammar','08','Grammar'],['speak','09','Speak']];};
  const _build=l02BuildStep;
  l02BuildStep=function(g){let html=_build(g);html=html.replace("state.l02JourneyStep='meaning'","state.l02JourneyStep='scenario'").replace('Check fact vs inference','Combine scene details');return html;};
  l02JourneyBody=function(g){if(state.l02JourneyStep==='overview')return l02OverviewStep(g);if(state.l02JourneyStep==='micro')return l02MicroStep(g);if(state.l02JourneyStep==='build')return l02BuildStep(g);if(state.l02JourneyStep==='scenario')return root.l02ScenarioStep(g);if(state.l02JourneyStep==='meaning')return l02MeaningStep(g);if(state.l02JourneyStep==='story')return l02StoryStep(g);if(state.l02JourneyStep==='language')return l02LanguageStep(g);if(state.l02JourneyStep==='grammar')return l02GrammarStep(g);return l02SpeakStep(g);};

  // Keep Lesson 01's v0.67 taxonomy intact, but repair the v0.68 two-step flow now that runtime patching happens after app.js.
  if(typeof v67L01Category==='function'){
    const _openCurrent=v60OpenHotspotCard;
    const directCard=baseOpen;
    v60OpenHotspotCard=function(i){if((activeLessonId()===1||activeLessonId()===2)&&state.mode==='explore')return v60SelectAnchor(Number(i));return directCard(Number(i));};
    root.v69OpenWordCard=function(i){return directCard(Number(i));};
    const _sceneCurrent=sceneStage;
    sceneStage=function(modal=false){let html=_sceneCurrent(modal);if((activeLessonId()===1||activeLessonId()===2)&&state.mode==='explore'&&state.selected!==null){html=html.replaceAll(`data-eng-v52-click="event.stopPropagation();v60OpenHotspotCard(${state.selected})"`,`data-eng-v52-click="event.stopPropagation();v69OpenWordCard(${state.selected})"`);}return html;};
  }
  if(root.ENGBOOK_RUNTIME){delete root.ENGBOOK_RUNTIME['lesson01Book'+'Source'];delete root.ENGBOOK_RUNTIME['lesson02Book'+'Source'];}
  root.ENGBOOK_RUNTIME={...(root.ENGBOOK_RUNTIME||{}),build:BUILD_INFO.tag,adaptiveHotspotTaxonomy:'v3',lesson02TaxonomyProfile:'social-cafe-scene',lesson02CategoryCount:8,lesson02SentenceCoverage:120,lesson02GrammarLadderCoverage:120,lesson02SceneCombinationCount:6};
})(typeof window!=='undefined'?window:globalThis);
