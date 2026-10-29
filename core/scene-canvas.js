/* Full-viewport lesson canvas. Reuses the lesson's image coordinates, progress
   store, and pan/pinch transform; floating UI always stays in screen space. */
(function(root){
  'use strict';
  const lessonLabel=id=>root.EngBookCoursePath?.label(id)||String(id).padStart(2,'0');
  const state=()=>root.EngBookEventContext?.getRoot('state');
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const guideWords=value=>root.EngBookGuide?.wordsMarkup(value)??esc(value);
  const icons={back:'<path d="m14 6-6 6 6 6"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',map:'<rect x="4" y="4" width="6" height="6" rx="2"/><rect x="14" y="4" width="6" height="6" rx="2"/><rect x="4" y="14" width="6" height="6" rx="2"/><rect x="14" y="14" width="6" height="6" rx="2"/>',explore:'<circle cx="12" cy="12" r="8"/><path d="m15 9-2 4-4 2 2-4Z"/>',learn:'<path d="M12 6v14M12 6C9 3 5 4 3 5v13c3-1 6-1 9 2 3-3 6-3 9-2V5c-2-1-6-2-9 1Z"/>',practice:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',speak:'<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M6 10v2a6 6 0 0 0 12 0v-2M12 18v3m-3 0h6"/>',talk:'<path d="M21 11a8 8 0 0 1-8 8H8l-5 3V11a9 9 0 0 1 18 0Z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/>',sound:'<path d="m11 5-6 5H2v4h3l6 5Zm4 3a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',save:'<path d="M6 3h12v18l-6-4-6 4Z"/>',fit:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',chevron:'<path d="m9 6 6 6-6 6"/>',check:'<path d="m5 12 4 4L19 6"/>'};
  icons.listening='<path d="M4 14v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="12" width="4" height="8" rx="2"/><rect x="17" y="12" width="4" height="8" rx="2"/>';
  icons.eye='<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>';
  icons.move='<path d="M12 3v18M3 12h18M9 6l3-3 3 3M9 18l3 3 3-3M6 9l-3 3 3 3M18 9l3 3-3 3"/>';
  const icon=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[k]||icons.explore}</svg>`;
  const modes=['explore','learn','practice','speak','talk','listening'];
  const names={explore:'Explore',learn:'Learn',practice:'Practice',speak:'Speak',talk:'Talk',listening:'Listen'};
  let lessonId=null,needsCover=true,cardTab='word',tense=0,phrase=0,details=false,mapOpen=false,focusCard=false,returnAnchor=null;
  let scenarioOpen=false,scenarioIndex=null,scenarioExpanded=false,scenarioLevel=null,learnTab='facts',guideExample=0,cachedContent=null;
  let scenarioFilter='visible',scenarioPeek=false,lastScenarios=false;
  let scenarioReturn=null,scenarioReturnFocus=null;
  function scenarioReturnContext(){
    const back=scenarioReturn,s=state(),row=back&&scenarios()[back.index];
    if(!back)return null;
    if(s?.screen!=='lesson'||s.lesson?.id!==back.lesson||s.mode!==back.mode||!row||row.id!==back.rowId){scenarioReturn=null;return null;}
    return back;
  }
  function returnToScenario(){
    const back=scenarioReturnContext(),s=state();if(!back||!s)return false;
    scenarioReturn=null;stopScenarioAudio();root.EngBookSpeech?.stopSpeaking?.();
    scenarioIndex=back.index;scenarioLevel=back.level;scenarioExpanded=back.expanded;scenarioFilter=back.filter;scenarioPeek=back.peek;
    scenarioOpen=false;mapOpen=false;s.selected=null;s.v60CardOpen=false;s.v60AnchorLabel=null;
    details=false;manualCard=null;pendingAnchor=null;returnAnchor=null;needsCover=true;focusCard=false;
    scenarioReturnFocus=back.anchorId;root.render();return true;
  }
  function focusScenarioReturn(card){
    if(!scenarioReturnFocus||!currentScenario())return false;
    const index=hotspots().findIndex(h=>h.id===scenarioReturnFocus);
    const target=document.querySelector(scenarioPeek?'[data-canvas-action="scenario-peek"]':`.scenario-evidence [data-index="${index}"]`);
    (target||card)?.focus({preventScroll:true});scenarioReturnFocus=null;return true;
  }
  const scenarioReading=new Map();
  let scenarioAudio={key:null,status:'idle'},scenarioAudioGeneration=0;
  const scenarioReadingKey=()=>JSON.stringify([state()?.lesson?.id,scenarioIndex,currentScenario()?.level||null]);
  const scenarioAudioKey=()=>JSON.stringify([scenarioReadingKey(),state()?.mode]);
  function rememberScenarioReading(){
    const card=document.querySelector('.scenario-reading');
    if(!card?.dataset?.scenarioContext||!card.classList.contains('is-expanded'))return;
    scenarioReading.set(card.dataset.scenarioContext,{scroll:card.querySelector('.scenario-reading-body')?.scrollTop||0,taskOpen:Boolean(card.querySelector('.scenario-your-turn')?.open)});
  }
  function restoreScenarioReading(){
    const card=document.querySelector('.scenario-reading'),saved=scenarioReading.get(card?.dataset?.scenarioContext);
    if(!saved||!card.classList.contains('is-expanded'))return;
    const body=card.querySelector('.scenario-reading-body');if(body)body.scrollTop=saved.scroll;
  }
  function paintScenarioAudio(){
    const status=scenarioAudio.status,button=document.querySelector('[data-canvas-action="scenario-hear"]'),notice=document.querySelector('[data-scenario-audio-status]');
    if(button){const busy=['loading','playing'].includes(status),label=root.EngBookScenarios.audioLabel(status);button.innerHTML=busy?'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>':icon('sound');button.setAttribute('aria-label',label);button.setAttribute('title',label);button.setAttribute('aria-pressed',String(busy));}
    if(notice){notice.textContent=root.EngBookScenarios.audioMessage(status);notice.hidden=!notice.textContent;}
  }
  function stopScenarioAudio(status='idle'){
    const busy=['loading','playing'].includes(scenarioAudio.status);
    scenarioAudioGeneration++;scenarioAudio={key:null,status};
    if(busy)root.EngBookSpeech?.stopSpeaking?.();paintScenarioAudio();
  }
  function listenScenario(){
    const row=currentScenario();if(!row)return;
    if(root.EngBookUISounds?.isEnabled?.()===false){stopScenarioAudio('muted');return;}
    if(['loading','playing'].includes(scenarioAudio.status)){stopScenarioAudio('stopped');return;}
    const token=++scenarioAudioGeneration,key=scenarioAudioKey();let settled=false;
    const active=()=>token===scenarioAudioGeneration&&scenarioAudio.key===key&&scenarioAudioKey()===key&&state()?.screen==='lesson';
    const finish=status=>{if(settled||!active())return;settled=true;scenarioAudio.status=status;paintScenarioAudio();};
    scenarioAudio={key,status:'loading'};paintScenarioAudio();
    try{const playback=root.speak(row.text,.82,{...voiceOptions(scenarioIndex),onStart:()=>{if(!settled&&active()){scenarioAudio.status='playing';paintScenarioAudio();}},onEnd:()=>finish('ready'),onError:()=>finish('error'),onMuted:()=>finish('muted')});
      if(playback?.then)playback.then(result=>{if(result===false)finish('error');else if(result===true)finish('ready');},()=>finish('error'));
    }catch{finish('error');}
  }
  let practiceMenu=false,lastRecall=false,lastSpeaking=false,lastLearn=false,detailExpanded=false;
  let resizeObserver=null,cardObserver=null,activityObserver=null,transformObserver=null,pendingAnchor=null,lastViewport=null,lastCover=1,wholePicture=false;
  let manualCard=null;
  let mapState=null;
  let mapReturn=null,mapReturnFocus=null;
  function discardMapReturn(){mapReturn=null;mapReturnFocus=null;}
  function mapReturnContext(){
    const back=mapReturn,s=state();if(!back)return null;
    if(s?.screen!=='lesson'||s.lesson?.id!==back.lesson||s.mode!==back.mode||!hotspots().some(h=>h.id===back.anchorId)){discardMapReturn();return null;}
    return back;
  }
  function returnToMap(){
    const back=mapReturnContext(),s=state();if(!back||!s)return false;
    mapReturn=null;mapReturnFocus=back.anchorId;scenarioReturn=null;scenarioReturnFocus=null;
    stopScenarioAudio();root.EngBookSpeech?.stopSpeaking?.();
    s.selected=null;s.v60CardOpen=false;s.v60AnchorLabel=null;
    mapOpen=true;scenarioOpen=false;scenarioIndex=null;details=false;manualCard=null;pendingAnchor=null;returnAnchor=null;focusCard=false;
    root.render();return true;
  }
  function focusMapReturn(){
    if(!mapReturnFocus||!mapOpen)return false;
    const index=hotspots().findIndex(h=>h.id===mapReturnFocus),panel=document.querySelector('.canvas-map');
    const row=panel?.querySelector(`[data-canvas-action="anchor"][data-index="${index}"]`);
    (row&&!row.hidden?row:panel?.querySelector('.canvas-search'))?.focus({preventScroll:true});
    mapReturnFocus=null;return true;
  }
  function mapSession(){
    const lesson=state()?.lesson?.id;
    if(!mapState||mapState.lesson!==lesson)mapState={lesson,query:'',scroll:0};
    return mapState;
  }
  const mapCount=(count,total)=>`${count} of ${total} ${total===1?'detail':'details'}`;
  function rememberMap(){
    const panel=document.querySelector('.canvas-map');
    if(panel?.dataset?.mapLesson!==String(state()?.lesson?.id))return;
    const a=mapSession();a.query=panel.querySelector('.canvas-search')?.value||'';a.scroll=panel.querySelector('.canvas-map-list')?.scrollTop||0;
  }
  function filterMap(value){
    const a=mapSession(),panel=document.querySelector('.canvas-map');a.query=String(value??'').slice(0,160);a.scroll=0;
    const rows=root.EngBookHotspots.searchEntries(hotspots(),a.query),indices=new Set(rows.map(row=>row.index));
    if(!panel||panel.dataset.mapLesson!==String(a.lesson))return rows.length;
    const input=panel.querySelector('.canvas-search');if(input.value!==a.query)input.value=a.query;
    panel.querySelectorAll('.canvas-map-list [data-canvas-action="anchor"]').forEach(button=>button.hidden=!indices.has(Number(button.dataset.index)));
    panel.querySelector('.canvas-map-count').textContent=mapCount(rows.length,hotspots().length);
    panel.querySelector('.canvas-map-empty').hidden=rows.length>0;
    panel.querySelector('[data-canvas-action="map-clear"]').hidden=!a.query;
    panel.querySelector('.canvas-map-list').scrollTop=0;return rows.length;
  }
  function bindMap(){
    const panel=document.querySelector('.canvas-map');if(panel?.dataset?.mapLesson!==String(state()?.lesson?.id))return;
    const a=mapSession(),input=panel.querySelector('.canvas-search');
    input.addEventListener('input',event=>{if(panel.isConnected&&panel.dataset.mapLesson===String(state()?.lesson?.id))filterMap(event.target.value);});
    panel.querySelector('.canvas-map-list').scrollTop=a.scroll;
  }
  const hotspots=()=>state()?.lesson?.hotspots||[];
  const parentOf=h=>root.EngBookHotspots?.parentOf(hotspots(),h)||hotspots().find(p=>p.id===(h?.presentation?.parentId??h?.parentId));
  const childrenOf=h=>hotspots().filter(c=>(c.presentation?.parentId??c.parentId)===h?.id);
  const branchFocus=h=>h&&(childrenOf(h).length?h:parentOf(h)||h);
  const cardFamily=h=>h?`${state()?.lesson?.id}:${branchFocus(h).id}`:null;
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
  const scope=h=>root.EngBookHotspotScope?.resolve(h,state()?.lesson?.hotspots||[])||{kind:'point'};
  const marker=h=>root.EngBookHotspotScope?.marker(h,state()?.lesson?.hotspots||[])||h;
  const isMember=h=>Boolean(parentOf(h)&&(scope(h).kind==='region'||childrenOf(h).length>0||scope(parentOf(h)).kind==='region'&&h.type==='person'));
  function markerMarkup(spots,{recall=false,busy=false,showCard=false,refs=[],hint=false,targetId=null,done=new Set()}={}){
    const owner=showCard&&parentOf(selected());
    return spots.map(({h,index})=>{
      const area=scope(h),p=marker(h),selected=state()?.selected===index;
      return `<button class="hotspot canvas-dot scope-${area.kind} ${h.level==='detail'?'is-detail':''} ${isMember(h)?'is-member':''} ${owner?.id===h.id?'is-branch-parent':''} ${selected||refs.includes(h.id)?'active':''} ${done.has(h.en)?'discovered':''} ${recall?'memory-dot':''} ${recall&&hint&&h.id===targetId?'recall-hint':''}" style="left:${p.x}%;top:${p.y}%" aria-label="${recall?`Picture detail ${index+1}`:esc((area.kind==='point'?'':area.label+': ')+h.en)}" aria-expanded="${selected&&Boolean(showCard)}" ${busy?'disabled':''} data-hotspot-id="${esc(h.id)}" data-canvas-action="anchor" data-index="${index}"></button>`;
    }).join('');
  }
  function regionMarkup(h){
    if(!h)return '';
    const family=branchFocus(h);
    const area=scope(family);if(area.kind!=='region'||!area.bounds)return '';
    return (area.segments||[area.bounds]).map(b=>`<div class="canvas-group-region" style="left:${b.x}%;top:${b.y}%;width:${b.width}%;height:${b.height}%" aria-hidden="true"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 16V0h12M88 0h12v16M100 84v16H88M12 100H0V84" vector-effect="non-scaling-stroke"/></svg></div>`).join('');
  }
  function focusRegion(stage,region){
    const v=root.v59EnsureViewer(),before=root.v59Bounds(stage);
    const focus=root.EngBookHotspotScope.fitRegion(region,{width:before.fw,height:before.fh},{width:before.vw-48,height:Math.max(120,before.vh-250)});
    if(!focus)return;
    v.scale=focus.scale;
    // Centring offsets must be recalculated after changing zoom.
    const b=root.v59Bounds(stage,v.scale);
    v.tx=b.vw/2-b.fw*v.scale*focus.x-b.cx;
    v.ty=b.vh*.58-b.fh*v.scale*focus.y-b.cy;
    root.v59ApplyViewerTransform(stage);
  }
  function detailFrame(h){
    const children=childrenOf(h);
    if(!parentOf(h)||scope(h).kind!=='point'||!children.length)return null;
    const points=[h,...children].filter(p=>Number.isFinite(p.x)&&Number.isFinite(p.y));
    if(!points.length)return null;
    const xs=points.map(p=>p.x),ys=points.map(p=>p.y),left=Math.min(...xs),right=Math.max(...xs),top=Math.min(...ys),bottom=Math.max(...ys);
    const width=Math.min(100,Math.max(20,right-left+12)),height=Math.min(100,Math.max(24,bottom-top+12));
    // Frame only this branch's authored points, rather than every member of
    // its collective. This changes the camera, not the visual evidence scope.
    return {x:Math.max(0,Math.min(100-width,(left+right-width)/2)),y:Math.max(0,Math.min(100-height,(top+bottom-height)/2)),width,height};
  }
  const content=()=>cachedContent||root.activeGold?.()||{};
  const practice=()=>content().picturePractice||{};
  const language=h=>root.EngBookPictureLanguage.hotspot(h,root.hotspotDetail(h),content(),{lessonId:state()?.lesson?.id,level:lessonLevel(),allForms:state()?.mode==='learn'&&root.EngBookLearn?.session?.()?.allForms===true});
  const scenarios=()=>practice().scenarios||[];
  const lessonLevel=()=>root.EngAppLevelAware?.levelFor(root.EngBookContent?.getPack?.(state()?.lesson?.id)||{lessonId:state()?.lesson?.id,content:content()},'global')||'A2';
  const currentScenario=()=>root.EngBookPictureLanguage?.scenario(scenarios()[scenarioIndex],scenarioLevel||lessonLevel())||null;
  const scenarioAnchor=()=>{const row=currentScenario();return state()?.lesson?.hotspots?.find(h=>row?.evidenceHotspotIds.includes(h.id));};
  const voiceOptions=index=>({voiceRole:Number(index)%2?'female':'male'});
  const hotspotVoice=h=>{
    const hs=state().lesson.hotspots,anchors=hs.filter(row=>row.level!=='detail');
    const anchor=root.EngBookHotspots?.pathOf(hs,h)?.[0]||parentOf(h)||h;
    return voiceOptions(Math.max(0,anchors.indexOf(anchor)));
  };
  function voiceNote(options){
    const info=root.EngBookSpeech?.voiceInfo('',options);if(!info)return '';
    return `<div class="canvas-voice-note" data-voice-role="${esc(info.role||'default')}" data-voice-name="${esc(info.name)}" title="${esc(info.name||info.label)}">${icon('sound')} ${esc(info.label)}<span>Slow pace</span></div>`;
  }
  const discovery=()=>root.discoveredSet?.()||new Set();
  const isFind=()=>state()?.mode==='practice'&&['find','listen','smart'].includes(state()?.practiceType);
  let practiceReview=null;
  function practiceReviewContext(){
    const back=practiceReview,s=state();if(!back)return null;
    if(s?.screen!=='lesson'||s.mode!=='practice'||s.lesson?.id!==back.lesson||s.practiceType!==back.type||s.practiceTarget!==back.target||s.practiceRound!==back.round||s.practiceLocked!==back.locked){practiceReview=null;return null;}
    return back;
  }
  function beginPracticeReview(){
    const s=state();if(!isFind()||practiceReviewContext())return;
    practiceReview={lesson:s.lesson.id,type:s.practiceType,target:s.practiceTarget,round:s.practiceRound,locked:s.practiceLocked,selected:s.selected,feedback:s.tapFeedback};
    if(root.EngBookPractice?.canAnswer(s)&&!s.practiceHintUsed){s.practiceHintUsed=true;s.practiceHintCount=(s.practiceHintCount||0)+1;}
    s.practiceAudio=null;root.EngBookSpeech?.stopSpeaking?.();
  }
  function endPracticeReview(){
    const back=practiceReviewContext();practiceReview=null;if(!back)return;
    const s=state();s.selected=back.selected;s.tapFeedback=back.feedback;s.v60CardOpen=false;s.v60AnchorLabel=null;
    discardMapReturn();root.EngBookSpeech?.stopSpeaking?.();
  }
  const isRecall=()=>isFind()&&!practiceReviewContext();
  function visibleHotspots(){
    const s=state(),hs=s?.lesson?.hotspots||[],h=selected();
    if(isRecall()){
      const target=s.practiceTarget,focus=branchFocus(target),path=root.EngBookHotspots?.pathOf(hs,target)||[parentOf(target),target];
      const ids=new Set(path.filter(Boolean).map(h=>h.id));
      return hs.map((h,index)=>({h,index})).filter(({h})=>!parentOf(h)||ids.has(h.id)||focus&&(h.presentation?.parentId??h.parentId)===focus.id);
    }
    const focus=branchFocus(h),refs=currentScenario()?.evidenceHotspotIds||[];
    // Reveal one level at a time; hidden grandchildren and unrelated branches
    // are absent from the DOM and hit testing, rather than merely transparent.
    if(h&&s.v60CardOpen){
      const owner=parentOf(h);
      return hs.map((h,index)=>({h,index})).filter(({h})=>h.id===focus.id||(h.presentation?.parentId??h.parentId)===focus.id||h.id===owner?.id);
    }
    return hs.map((h,index)=>({h,index})).filter(({h})=>!parentOf(h)||isMember(h)&&!parentOf(parentOf(h))||h===selected()||refs.includes(h.id));
  }
  function clear(){const s=state();if(!s)return;if(selected()&&(returnToMap()||returnToScenario()))return;stopScenarioAudio();returnAnchor=selected()?.id||scenarioAnchor()?.id;s.selected=null;s.v60CardOpen=false;s.v60AnchorLabel=null;details=false;scenarioIndex=null;scenarioExpanded=false;manualCard=null;root.render();}
  function up(){const p=parentOf(selected());if(p)select(hotspots().indexOf(p));else clear();}
  function select(index){
    const s=state(),h=s?.lesson?.hotspots?.[Number(index)];if(!h)return;
    if(root.EngBookScenePreview?.active())root.EngBookScenePreview.stop();
    if(s.mode==='speak'&&root.EngBookSpeaking?.busy()||s.mode==='talk'&&root.EngBookTalk?.busy())return;
    dismissCaption();
    if(isRecall())return root.answerFind(Number(index));
    if(mapOpen){rememberMap();mapReturn={lesson:s.lesson.id,mode:s.mode,anchorId:h.id};}
    else mapReturnContext();
    if(currentScenario()){rememberScenarioReading();scenarioReturn={lesson:s.lesson.id,mode:s.mode,index:scenarioIndex,rowId:scenarios()[scenarioIndex]?.id,level:scenarioLevel,expanded:scenarioExpanded,filter:scenarioFilter,peek:scenarioPeek,anchorId:h.id};}
    else scenarioReturnContext();
    stopScenarioAudio();root.EngBookListening?.clear();
    if(root.speechSynthesis?.speaking||root.speechSynthesis?.pending)root.EngBookSpeech?.stopSpeaking?.();
    root.EngBookUISounds?.play('hotspot');
    if(manualCard?.family!==cardFamily(h))manualCard=null;
    const fresh=root.markDiscovered(h.en);s.selected=Number(index);s.v60CardOpen=true;s.v60AnchorLabel=Number(index);s.v60GrammarOpen=false;
    s.tapFeedback=null;cardTab='word';tense=0;phrase=0;details=false;detailExpanded=false;mapOpen=false;scenarioOpen=false;scenarioIndex=null;pendingAnchor=scope(h).kind==='scene'?null:h;focusCard=true;
    root.haptic?.(fresh?[14,24,14]:10);root.speak?.(h.en,.82,hotspotVoice(h));
    if(discovery().size>=s.lesson.hotspots.length)root.EngBookEventContext.getRoot('progress').completed[`l${s.lesson.id}_explore`]=true;
    root.saveProgress();root.render();
  }
  // Borrow the real cards without recording a learner action or moving focus.
  function previewSelect(index){
    const s=state(),h=s?.lesson?.hotspots?.[index];if(!h||s.mode!=='explore'||s.screen!=='lesson')return false;
    s.selected=index;s.v60CardOpen=true;s.v60AnchorLabel=index;
    cardTab='word';tense=0;phrase=0;details=false;detailExpanded=false;
    manualCard=null;pendingAnchor=null;focusCard=false;returnAnchor=null;
    root.render();return true;
  }
  function previewClear(index){
    const s=state();if(!s||s.selected!==index)return;
    s.selected=null;s.v60CardOpen=false;s.v60AnchorLabel=null;manualCard=null;pendingAnchor=null;focusCard=false;returnAnchor=null;
  }
  function openLearningDetail(index,tab,formIndex=0){
    select(index);if(!selected())return;
    detailExpanded=true;cardTab=tab==='grammar'?'grammar':tab==='word'?'word':'phrase';
    const data=language(selected());
    if(cardTab==='grammar'){
      const all=root.EngBookPictureLanguage.hotspot(selected(),root.hotspotDetail(selected()),content(),{lessonId:state()?.lesson?.id,level:lessonLevel(),allForms:true});
      const target=all.grammar[Math.max(0,Number(formIndex)||0)];
      tense=Math.max(0,data.grammar.findIndex(row=>row.key===target?.key));
    }
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
  function branchConnector(from,to){
    if(!from||!to||![from.x,from.y,to.x,to.y].every(Number.isFinite))return null;
    const dx=to.x-from.x,dy=to.y-from.y,length=Math.hypot(dx,dy),rim=11;
    if(length<=rim*2+2)return null;
    const ux=dx/length,uy=dy/length,bend=Math.min(14,length*.065);
    return {x1:from.x+ux*rim,y1:from.y+uy*rim,x2:to.x-ux*rim,y2:to.y-uy*rim,cx:(from.x+to.x)/2-uy*bend,cy:(from.y+to.y)/2+ux*bend};
  }
  function branchLinkMarkup(h){
    const owner=parentOf(h);if(!owner)return '';
    return `<svg class="canvas-branch-link" data-parent-hotspot="${esc(owner.id)}" data-child-hotspot="${esc(h.id)}" aria-hidden="true" hidden><path/></svg>`;
  }
  function positionBranchLink(shell){
    const link=shell.querySelector('.canvas-branch-link');if(!link)return;
    const dots=[...shell.querySelectorAll('[data-hotspot-id]')];
    const from=dots.find(el=>el.dataset.hotspotId===link.dataset.parentHotspot),to=dots.find(el=>el.dataset.hotspotId===link.dataset.childHotspot);
    const box=shell.getBoundingClientRect();
    const center=el=>{const r=el?.getBoundingClientRect();return r&&r.width>0&&r.height>0?{x:r.left+r.width/2-box.left,y:r.top+r.height/2-box.top}:null;};
    const a=center(from),b=center(to),inside=p=>p&&p.x>=0&&p.x<=box.width&&p.y>=0&&p.y<=box.height;
    const line=inside(a)&&inside(b)?branchConnector(a,b):null;
    link.toggleAttribute('hidden',!line);
    if(line)link.querySelector('path').setAttribute('d',`M${line.x1} ${line.y1} Q${line.cx} ${line.cy} ${line.x2} ${line.y2}`);
  }
  function position(stage){
    const shell=stage?.closest('.scene-canvas');if(!shell)return;
    positionBranchLink(shell);
    if(shell.querySelector('.scenario-studio')){root.EngBookScenarios.position({stage,shell,row:currentScenario(),lesson:state().lesson});return;}
    const h=selected()||scenarioAnchor(),card=shell.querySelector('.scene-glass-card');if(!h||!card)return;
    const photo=stage.querySelector('.v59-scene-content').getBoundingClientRect(),box=shell.getBoundingClientRect();
    const area=scope(h),region=area.bounds;
    const point={x:photo.left-box.left+photo.width*(region?region.x:h.x)/100,y:photo.top-box.top+photo.height*(region?region.y:h.y)/100};
    const top=shell.querySelector('.canvas-header').getBoundingClientRect().bottom-box.top+10;
    const dock=shell.querySelector('.canvas-dock'),dockTop=dock.getBoundingClientRect().top;
    const dockBottom=dock.closest?.('[hidden]')?box.height-20:dockTop-box.top-14;
    const bottom=root.EngBookScenePreview?.active()?Math.min(dockBottom,box.height-110):dockBottom;
    card.style.maxHeight=`${Math.max(100,bottom-top)}px`;
    card.hidden=area.kind==='point'&&(point.x<0||point.x>box.width||point.y<0||point.y>box.height);
    if(area.kind!=='point'){point.x=Math.max(12,Math.min(point.x,box.width-12));point.y=Math.max(top,Math.min(point.y,bottom));}
    shell.style.setProperty('--anchor-x',`${point.x}px`);shell.style.setProperty('--anchor-y',`${point.y}px`);
    const spot=shell.querySelector('.canvas-spotlight');if(spot)spot.hidden=card.hidden||area.kind!=='point';
    const link=shell.querySelector('.canvas-connector');if(link)link.toggleAttribute('hidden',card.hidden);
    if(card.hidden)return;
    const size={width:card.offsetWidth,height:card.offsetHeight},bounds={left:12,top,right:box.width-12,bottom},family=branchFocus(h).id;
    const avoid=visibleHotspots().filter(({h:dot})=>dot.id!==h.id).map(({h:dot})=>{const p=marker(dot);return {x:photo.left-box.left+photo.width*p.x/100,y:photo.top-box.top+photo.height*p.y/100,related:dot.id===family||(dot.presentation?.parentId??dot.parentId)===family};}).filter(dot=>dot.x>=bounds.left&&dot.x<=bounds.right&&dot.y>=top&&dot.y<=bottom);
    const placement=manualCard?.family===cardFamily(h)?clampCard(manualCard,size,bounds):placeCard(point,size,bounds,avoid);
    if(manualCard?.family===cardFamily(h))Object.assign(manualCard,placement);
    card.style.left=`${placement.x}px`;card.style.top=`${placement.y}px`;
    if(link){const line=area.kind==='point'?connector(point,{...placement,width:card.offsetWidth,height:card.offsetHeight}):null;link.toggleAttribute('hidden',!line);if(line)link.querySelector('path').setAttribute('d',root.EngBookScenarios.curve(line));}
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
  function branchNavigation(h,guide=''){
    const parent=parentOf(h),children=childrenOf(h),people=children.filter(c=>c.type==='person').length;
    const discoveryMode=document.body?.classList?.contains?.('panorama-core')||document.body?.classList?.contains?.('lesson1-panorama'),actionLabel=discoveryMode?'Tap picture details':'Choose a dot';
    const label=people?`${people} ${people===1?'person':'people'}${children.length>people?' · Shared details':' · '+actionLabel}`:`${children.length} ${children.length===1?'detail':'details'} · ${actionLabel}`;
    const mapBack=mapReturnContext(),back=scenarioReturnContext(),backAction=mapBack?'return-map':'return-scenario',backLabel=mapBack?'Back to search results':'Back to scenario',backName=mapBack?'Results':'Scenario';
    return `<nav class="canvas-branch-nav" aria-label="Picture detail path"><button data-canvas-action="${!parent&&(mapBack||back)?backAction:'parent'}" aria-label="${parent?'Back to '+esc(parent.en):mapBack||back?backLabel:'Back to scene'}">${icon('back')}<span>${parent?esc(parent.en):mapBack||back?backName:'Scene'}</span></button><div class="canvas-branch-tools">${children.length?`<small>${label}</small>`:''}${parent&&(mapBack||back)?`<button class="canvas-scenario-return" data-canvas-action="${backAction}" aria-label="${backLabel}" title="${backLabel}">${icon(mapBack?'map':'learn')}</button>`:''}<button class="canvas-level-shortcut" data-canvas-action="lesson-level" aria-label="Change lesson level: ${lessonLevel()}" title="Change lesson level">${lessonLevel()}</button>${guide}</div></nav>`;
  }
  function panoramaSheet(h,data,rows,row,chunk,children){
    const pages=['word','phrase','grammar','practice'],labels=['Look','Phrase','Pattern','Your turn'],index=detailExpanded?Math.max(0,pages.indexOf(cardTab)):0;
    let copy=index===0?`<p>${guideWords(data.description||h.example)}</p>`:index===1?`<p class="canvas-phrase">${guideWords(chunk.text)}</p><details><summary>See it in a sentence</summary><p class="canvas-example">${guideWords(chunk.example)}</p></details>`:index===2?`${rows.length>1?`<div class="canvas-tense"><button data-canvas-action="tense-prev" aria-label="Previous grammar form">${icon('back')}</button><small>${tense+1} / ${rows.length}</small><button data-canvas-action="tense-next" aria-label="Next grammar form">${icon('chevron')}</button></div>`:''}<div class="canvas-page-rule">${esc(row.pattern||'Describe a visible detail')}</div><p class="canvas-example">${guideWords(row.sentence)}</p><details><summary>Why this form?</summary><p>${esc(row.note||'Use the image to support your description.')}</p></details>`:`<p>${esc((cardTab==='practice'&&chunk.task)||row.task||'Describe this detail and locate one nearby feature.')}</p><small>Look first. Try your own sentence.</small>`;
    return `<section class="scene-glass-card canvas-detail-card canvas-pano-sheet ${index||root.EngBookListening?.isOpen?.()?'is-expanded':'is-compact'} ${root.EngBookListening?.isOpen?.()?'has-listening':''}" role="region" aria-labelledby="canvas-word-title" tabindex="-1">${branchNavigation(h)}<header><div><span class="canvas-eyebrow">${h.claimClass==='supported-inference'?'Possible interpretation':'Visible detail'}</span><h2 id="canvas-word-title">${guideWords(h.en)}</h2></div><div class="canvas-card-controls"><button class="canvas-icon" data-canvas-action="hear" aria-label="Listen to detail">${icon('sound')}</button><button class="canvas-icon" data-canvas-action="close-card" aria-label="Close detail">${icon('close')}</button></div></header><div class="canvas-card-copy" role="group" aria-label="${labels[index]}"><span class="canvas-sheet-label">${labels[index]}</span>${copy}</div>${root.EngBookListening?.markup()||''}<div class="canvas-learning-pages" role="group" aria-label="Detail learning pages"><button data-canvas-action="page-prev" aria-label="Previous learning page" ${index===0?'disabled':''}>${icon('back')}</button><output aria-live="polite" aria-atomic="true"><b>${labels[index]}</b>${index+1} / 4</output><button data-canvas-action="page-next" aria-label="Next learning page" ${index===3?'disabled':''}>${icon('chevron')}</button></div><footer><button data-canvas-action="save" aria-pressed="${root.isSaved(h.en)}">${icon('save')}${root.isSaved(h.en)?'Saved':'Save'}</button>${children.length?`<button data-canvas-action="details" aria-expanded="${details}">${icon('plus')}Details · ${children.length}</button>`:''}</footer>${details&&children.length?`<div class="canvas-detail-chips">${children.map(({c,index})=>`<button data-canvas-action="anchor" data-index="${index}">${esc(c.en)}</button>`).join('')}</div>`:''}</section>`;
  }
  function cardMarkup(h){
    const data=language(h),rows=data.grammar,row=rows[tense%rows.length],chunk=data.phrases[phrase%data.phrases.length];
    const guideRow=detailExpanded?(cardTab==='grammar'?row:cardTab==='phrase'?chunk:{}):{};
    if(document.body?.classList?.contains?.('panorama-core')||document.body?.classList?.contains?.('lesson1-panorama'))return panoramaSheet(h,data,rows,row,chunk,childrenOf(h).map(c=>({c,index:hotspots().indexOf(c)})));
    const fact=h.claimClass==='visible-fact'||!h.claimClass;
    let copy=cardTab==='word'?`<span class="canvas-eyebrow">${fact?'In the picture':'Possible interpretation'}</span><p>${guideWords(data.description||h.example)}</p>`:cardTab==='phrase'?`<div class="canvas-tense"><button data-canvas-action="phrase-prev" ${data.phrases.length<2?'disabled':''} aria-label="Previous phrase">${icon('back')}</button><span>${esc(chunk.kind)}<small>${phrase+1} / ${data.phrases.length}</small></span><button data-canvas-action="phrase-next" ${data.phrases.length<2?'disabled':''} aria-label="Next phrase">${icon('chevron')}</button></div><p class="canvas-phrase">${guideWords(chunk.text)}</p><small class="canvas-eyebrow">In a sentence</small><p class="canvas-example">${guideWords(chunk.example)}</p><details class="canvas-practice-prompt"><summary>Try it yourself</summary><p>${esc(chunk.task||'Describe this detail in your own words. Keep an imagined action separate from the photo.')}</p></details>`:`<div class="canvas-tense"><button data-canvas-action="tense-prev" ${rows.length<2?'disabled':''} aria-label="Previous grammar form">${icon('back')}</button><span>${esc(row.tense)}<small>${tense+1} / ${rows.length}</small></span><button data-canvas-action="tense-next" ${rows.length<2?'disabled':''} aria-label="Next grammar form">${icon('chevron')}</button></div><span class="canvas-evidence-label ${esc(row.evidence)}">${row.evidence==='visible'?'In this picture':row.evidence==='interpretation'?'Possible interpretation':row.evidence==='hypothetical'?'Imagined time frame':'Question practice'}</span><p>${guideWords(row.sentence)}</p><div class="canvas-rule"><b>${esc(row.pattern||'')}</b><small>${esc(row.note||'')}</small></div><details class="canvas-practice-prompt"><summary>Try it yourself</summary><p>${esc(row.task||'Make your own sentence using this form.')}</p></details>`;
    const children=childrenOf(h).map(c=>({c,index:hotspots().indexOf(c)}));
    return `<section class="scene-glass-card canvas-detail-card ${detailExpanded?'is-expanded':'is-compact'}" role="region" aria-labelledby="canvas-word-title" tabindex="-1">${branchNavigation(h,root.EngBookGuide?.inlineMarkup(h,detailExpanded?cardTab:'word',guideRow)||'')}<header><div><span class="canvas-eyebrow">${scope(h).kind==='region'?'Group · ':scope(h).kind==='scene'?'Scene · ':''}${fact?'Visible fact':'Possible interpretation'}</span><h2 id="canvas-word-title" aria-label="${esc(h.en)}">${guideWords(h.en)}</h2></div><div class="canvas-card-controls"><button class="canvas-icon canvas-card-move" data-card-drag aria-label="Move detail card" title="Drag the title to move · Arrow keys to move · Home to reset">${icon('move')}</button><button class="canvas-icon" data-canvas-action="hear" aria-label="Listen to detail">${icon('sound')}</button><button class="canvas-icon" data-canvas-action="close-card" aria-label="Close detail">${icon('close')}</button></div></header>${detailExpanded?`${h.pronReviewed===false?'':'<span class=\"canvas-ipa\">'+esc(h.pron||'')+'</span>'}<div class="canvas-card-tabs" role="tablist" aria-label="Detail learning"><button role="tab" aria-selected="${cardTab==='word'}" data-canvas-tab="word">Word</button><button role="tab" aria-selected="${cardTab==='phrase'}" data-canvas-tab="phrase">Phrase</button><button role="tab" aria-selected="${cardTab==='grammar'}" data-canvas-tab="grammar">Grammar</button></div><div class="canvas-card-copy" role="tabpanel">${copy}</div>${details&&children.length?`<div class="canvas-detail-chips">${children.map(({c,index})=>`<button data-canvas-action="anchor" data-index="${index}" aria-pressed="${c.id===h.id}">${esc(c.en)}</button>`).join('')}</div>`:''}${voiceNote(hotspotVoice(h))}<footer><button data-canvas-action="save" aria-pressed="${root.isSaved(h.en)}">${icon('save')}${root.isSaved(h.en)?'Saved':'Save'}</button>${children.length?`<button data-canvas-action="details" aria-expanded="${details}">${icon('plus')}${children.length} ${children.length===1?'detail':'details'}</button>`:''}</footer>`:`<p class="canvas-compact-copy">${guideWords(data.description||h.example)}</p>`}${root.EngBookListening?.markup()||''}<button class="canvas-expand-detail" data-canvas-action="expand-detail" aria-expanded="${detailExpanded}">${detailExpanded?'Less':'Phrase, grammar & details'} ${icon(detailExpanded?'minus':'chevron')}</button></section>`;
  }
  function mapMarkup(){
    const hs=hotspots(),done=discovery(),a=mapSession(),matches=root.EngBookHotspots.searchEntries(hs,a.query),indices=new Set(matches.map(row=>row.index));
    const rows=root.EngBookHotspots.searchEntries(hs),review=practiceReviewContext();
    const reviewNote=review?`<p class="canvas-map-review-note">Practice paused · Close this list to resume.${review.target&&!review.locked?' Details count as help.':''}</p>`:'';
    return `<aside class="canvas-map canvas-panel" aria-label="All picture details" data-map-lesson="${esc(a.lesson)}"><header><div><span class="canvas-eyebrow">Scene map</span><h2>Picture details</h2></div><button class="canvas-icon" data-canvas-action="map" aria-label="Close scene map">${icon('close')}</button></header><div class="canvas-map-search"><input class="canvas-search" type="search" aria-label="Find a detail" aria-controls="canvas-map-list" aria-describedby="canvas-map-count" placeholder="Find a detail…" maxlength="160" value="${esc(a.query)}"><button class="canvas-icon" data-canvas-action="map-clear" aria-label="Clear detail search" ${a.query?'':'hidden'}>${icon('close')}</button></div><p class="canvas-map-count" id="canvas-map-count" role="status" aria-live="polite" aria-atomic="true">${mapCount(matches.length,hs.length)}</p>${reviewNote}<div class="canvas-map-empty" ${matches.length?'hidden':''}><p>No matching details.</p><small>Try another word or clear the search.</small></div><div class="canvas-map-list" id="canvas-map-list">${rows.map(({h,index,path})=>`<button data-canvas-action="anchor" data-index="${index}" ${indices.has(index)?'':'hidden'}><span class="canvas-map-dot ${done.has(h.en)?'done':''}">${done.has(h.en)?icon('check'):''}</span><span>${esc(h.en)}<small>${path.length>1?esc(path.slice(0,-1).map(h=>h.en).join(' › ')):scope(h).kind==='region'?'Group area':scope(h).kind==='scene'?'Whole scene':'Scene anchor'}</small></span>${icon('chevron')}</button>`).join('')}</div></aside>`;
  }

  function chooseScenario(index,languageLevel){
    const s=state(),rows=scenarios(),number=Number(index);if(!rows.length||!Number.isInteger(number))return;
    endPracticeReview();discardMapReturn();scenarioReturn=null;scenarioReturnFocus=null;stopScenarioAudio();
    if(['A1','A2','B1','B2','C1'].includes(languageLevel))scenarioLevel=languageLevel;
    scenarioIndex=((number%rows.length)+rows.length)%rows.length;scenarioExpanded=false;scenarioOpen=false;mapOpen=false;scenarioPeek=false;
    scenarioFilter=root.EngBookPictureLanguage.boundary(rows[scenarioIndex]).kind;
    s.selected=null;s.v60CardOpen=false;pendingAnchor=null;needsCover=true;focusCard=true;root.render();
  }
  function scenarioPicker(){
    scenarioFilter=root.EngBookScenarios.filterKey(scenarios(),scenarioFilter);
    return root.EngBookScenarios.picker({lesson:state().lesson,rows:scenarios(),filter:scenarioFilter});
  }
  function scenarioMarkup(){
    return root.EngBookScenarios.card({lesson:state().lesson,rows:scenarios(),index:scenarioIndex,row:currentScenario(),expanded:scenarioExpanded,peek:scenarioPeek,level:scenarioLevel||lessonLevel(),context:scenarioReadingKey(),taskOpen:scenarioReading.get(scenarioReadingKey())?.taskOpen,audio:scenarioAudio.status});
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
    const progress=`<div class="canvas-recall-progress" aria-label="${s.practiceCorrect||0} of ${total} ${total===1?'detail':'details'} reviewed">${Array.from({length:total},(_,i)=>`<i class="${i<(s.practiceCorrect||0)?'done':i===s.practiceRound-1?'current':''}"></i>`).join('')}</div>`;
    const finish=complete?`<h2 tabindex="-1">${total?'Review complete':'No picture details available'}</h2><p>${total?`${s.practiceCorrect} ${s.practiceCorrect===1?'detail':'details'} reviewed · ${s.practiceFirstTry||0} recalled on the first try without help.`:'Choose another activity to continue.'}</p>${total?`<small class="canvas-recall-meta">Help used on ${s.practiceHintCount||0} ${s.practiceHintCount===1?'detail':'details'}.</small>`:''}<footer><button class="canvas-recall-primary" data-canvas-action="practice-restart">Practice again</button><button data-eng-action="mode" data-mode="explore">Explore picture</button></footer>`:'';
    const listening=s.practiceType==='listen'&&!s.practiceLocked,descriptionAudio=s.practiceType==='listen'&&Boolean(root.EngBookContent?.getPack(s.lesson.id)?.presentation?.panorama);
    const audio=listening?`<small class="canvas-recall-meta canvas-recall-audio ${s.practiceAudio?.status==='error'?'is-error':''}" role="status">${esc(root.practiceAudioMessage())}</small>${s.practiceWordShown?'<small class="canvas-recall-meta">Reading help used for this detail.</small>':'<button class="canvas-recall-text-help" data-canvas-action="practice-word">Show word instead</button>'}`:'';
    return `<aside class="canvas-recall" aria-label="${esc(practiceNames[s.practiceType])} challenge"><header>${practiceSwitcher()}<span>${complete?'Session finished':`Detail ${s.practiceRound} / ${total}`}</span></header>${root.EngBookListening?.groupMarkup?.(s)||''}${complete?finish:`<h2 tabindex="-1">${listening&&!s.practiceWordShown?(descriptionAudio?'Listen to the description':'Listen to the word'):esc(target.en)}</h2><p>${s.practiceLocked?'You found the right detail.':s.practiceType==='listen'?(descriptionAudio?'Listen to the description, then find the detail in the picture.':'Play the word, then tap its location in the picture.'):'Tap this detail in the picture.'}</p>${audio}${s.practiceType==='smart'&&!s.practiceLocked?`<small class="canvas-recall-meta">${root.masteryLabel?.(target.en)==='New'?'New detail':'Selected for more practice'} · Based on your recall history</small>`:''}${s.practiceLocationHint&&!s.practiceLocked?`<p class="canvas-recall-hint" tabindex="-1">${icon('explore')}${esc(root.EngBookPractice.locationHint(target))}</p>`:''}${s.practiceMsg?`<p class="canvas-recall-feedback ${s.practiceLocked?'correct':'retry'}" role="status" tabindex="-1">${esc(s.practiceMsg)}</p>`:''}<footer><button data-canvas-action="practice-hear">${icon('sound')}${s.practiceType==='listen'?(descriptionAudio?'Play description':'Play word'):'Listen'}</button>${s.practiceLocked?`<button class="canvas-recall-primary" data-canvas-action="practice-next">${s.practiceCorrect>=total?'See results':'Next detail'}${icon('chevron')}</button>`:`<button data-canvas-action="practice-hint" ${s.practiceLocationHint?'disabled':''}>${icon('explore')}${s.practiceLocationHint?'Hint shown':'Hint'}</button>`}</footer>`}${progress}</aside>`;
  }
  function render(){
    rememberMap();rememberScenarioReading();
    const s=state();root.EngBookListening?.sync(s);if(!s?.lesson||s.screen!=='lesson'){stopScenarioAudio();return false;}
    if(root.EngBookScenePreview?.active()&&(s.mode!=='explore'||lessonId!==s.lesson.id))root.EngBookScenePreview.stop({clear:true});
    practiceReviewContext();mapReturnContext();scenarioReturnContext();
    if(scenarioAudio.key&&scenarioAudio.key!==scenarioAudioKey())stopScenarioAudio();
    root.EngBookDeepLinks?.syncLesson(s.lesson.id,s.mode);
    if(isFind()&&Number(s.practiceLessonId)!==Number(s.lesson.id))root.resetPractice(false);
    cachedContent=root.activeGold?.()||{};
    root.EngBookGuide?.closeWord();
    root.EngBookGuide?.closeDetail?.();
    if(lessonId!==s.lesson.id){discardMapReturn();scenarioReturn=null;scenarioReturnFocus=null;stopScenarioAudio();scenarioReading.clear();root.EngBookGuide?.reset();lessonId=s.lesson.id;needsCover=true;mapOpen=false;cardTab='word';details=false;detailExpanded=false;pendingAnchor=null;lastViewport=null;wholePicture=false;scenarioOpen=false;scenarioIndex=null;scenarioLevel=null;scenarioPeek=false;scenarioFilter='visible';lastScenarios=false;learnTab='facts';guideExample=0;lastLearn=false;}
    s.photoFocus=false;s.sceneIntro=false;s.sceneIntroNeedsCover=false;
    const v=root.v59EnsureViewer();v.maxScale=8;
    document.documentElement.classList.remove('v96-focus-open');document.body.classList.remove('v96-focus-open');
    document.documentElement.classList.add('canvas-open');document.body.classList.add('canvas-open');
    const h=selected(),done=discovery(),mode=s.mode||'explore';
    const showScenario=Boolean(currentScenario())&&!mapOpen&&!scenarioOpen&&!isFind();
    const showCard=h&&s.v60CardOpen&&!isRecall()&&!mapOpen&&!scenarioOpen&&!showScenario;
    const scenarioContext=showScenario||scenarioOpen;
    if(scenarioContext!==lastScenarios){needsCover=true;lastViewport=null;lastScenarios=scenarioContext;}
    const recall=isRecall();
    if(recall&&!lastRecall){needsCover=true;wholePicture=true;practiceMenu=false;}lastRecall=recall;
    const speechMode=mode==='speak'||mode==='talk';
    if(speechMode&&!lastSpeaking){needsCover=true;wholePicture=true;}lastSpeaking=speechMode;
    const activity=mode!=='explore'&&!recall&&!showCard&&!showScenario&&!mapOpen&&!scenarioOpen&&!practiceMenu;
    const listening=mode==='listening'&&activity,learn=mode==='learn'&&activity,reader=learn||listening;
    if(reader&&!lastLearn){needsCover=true;wholePicture=false;}lastLearn=reader;
    const peeking=learn&&root.EngBookLearn.session().peek;
    const speakingBusy=mode==='speak'&&Boolean(root.EngBookSpeaking?.busy())||mode==='talk'&&Boolean(root.EngBookTalk?.busy());
    const spots=visibleHotspots(),refs=currentScenario()?.evidenceHotspotIds||[];
    document.getElementById('app').innerHTML=`
      <main class="app-shell scene-canvas ${showCard||showScenario?'has-selection':''} ${scenarioContext?'scenario-context':''} ${scenarioPeek&&showScenario?'scenario-peeking':''} ${recall?'recall-active':''} ${speechMode&&activity?'speaking-active':''} ${reader?'learn-active':''} ${listening?'listening-active':''} ${peeking?'learn-peeking':''}" aria-label="Interactive lesson picture" data-lesson-mode="${esc(mode)}" data-scenario-layout="${root.EngBookScenarios.design(s.lesson)}">
      <img class="canvas-backdrop" src="${esc(s.lesson.image)}" alt="" aria-hidden="true">
      <div class="canvas-photo v59-scene-viewport"><div class="image-stage v59-viewer-stage modal-stage scene-canvas-stage" data-v59-viewer="focus"><div class="v59-scene-content v59-transform-stage" data-v59-content>
      <img class="scene-image" src="${esc(s.lesson.image)}" alt="${esc(s.lesson.title)}" draggable="false">
      ${markerMarkup(spots,{recall,busy:speakingBusy,showCard,refs:showScenario?refs:[],hint:s.practiceLocationHint||s.practiceLocked,targetId:s.practiceTarget?.id,done})}
      ${showCard?regionMarkup(h):showScenario?refs.map(id=>s.lesson.hotspots.find(h=>h.id===id)).filter(h=>h&&scope(h).kind==='region').map(regionMarkup).join(''):''}</div></div></div><div class="canvas-vignette"></div>${showCard?'<div class="canvas-spotlight"></div><svg class="canvas-connector" aria-hidden="true"><path/></svg>':''}
      <header class="canvas-header"><button class="canvas-icon canvas-dark-glass" data-eng-action="home" aria-label="Back to home">${icon('back')}</button><button class="canvas-lesson canvas-dark-glass" data-eng-action="pick-lesson" aria-label="Choose lesson"><span>${root.EngBookCoursePath?.caption(s.lesson.id)||'LESSON '+lessonLabel(s.lesson.id)}<i>⌄</i></span><b>${learn?'Learn':listening?'Listening':esc(s.lesson.title)}</b></button>${reader?`<button class="canvas-icon canvas-dark-glass learn-eye" ${listening?'data-eng-action="mode" data-mode="explore"':'data-learn-action="peek"'} aria-label="${peeking?'Return to learning':'Show picture without text'}" aria-pressed="${peeking}">${icon('eye')}</button>`:`<button class="canvas-icon canvas-dark-glass" ${speakingBusy?'disabled':''} data-canvas-action="scenarios" aria-label="Picture scenarios" title="Picture scenarios" aria-expanded="${scenarioOpen}">${icon('learn')}</button><button class="canvas-icon canvas-dark-glass" ${speakingBusy?'disabled':''} data-canvas-action="map" aria-label="All picture details" aria-expanded="${mapOpen}">${icon('map')}</button>`}${root.EngBookGuide?.hintButton()||''}${root.EngBookUISounds?.buttonMarkup('canvas-icon canvas-dark-glass')||''}</header>${root.EngBookGuide?.panelMarkup(s.lesson,root.activeGold?.()||{},mode,showCard?h:null)||''}
      ${showCard?cardMarkup(h):showScenario?scenarioMarkup():''}${mapOpen?mapMarkup():scenarioOpen?scenarioPicker():''}
      ${showCard?branchLinkMarkup(h):''}
      ${mode==='explore'&&!showCard&&!showScenario&&!mapOpen&&!scenarioOpen?`<button class="canvas-icon canvas-dark-glass canvas-preview-replay" data-scene-preview-start aria-label="Watch picture preview" title="Watch picture preview"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m9 6 10 6-10 6Z"/></svg></button>`:''}
      ${practiceMenu?practicePicker():recall&&!mapOpen&&!scenarioOpen?recallMarkup():''}
      ${listening?root.EngBookListeningPlayer.markup(root.EngBookContent.getPack(s.lesson.id),root.EngBookLearn.level()):learn?root.EngBookLearn.markup():activity?`<aside class="canvas-activity canvas-panel ${mode==='practice'?'practice-worksheet':''}" aria-label="${esc(names[mode]||'Lesson')} activities"><header><div><span class="canvas-eyebrow">${root.EngBookCoursePath?.qualifiedLabel(s.lesson.id)||'Lesson '+lessonLabel(s.lesson.id)}</span>${mode==='practice'?practiceSwitcher():`<h2>${esc(names[mode]||'Lesson tools')}</h2>`}</div><button class="canvas-icon" data-eng-action="mode" data-mode="explore" aria-label="Back to picture">${icon('close')}</button></header><div class="canvas-activity-body v59-activity-area">${mode==='practice'?root.practiceBody():mode==='speak'?root.EngBookSpeaking.markup():mode==='talk'?root.EngBookTalk.markup():root.modeContent()}</div></aside>`:''}
      <footer class="canvas-bottom" ${showCard?'hidden':''}><div class="canvas-caption" ${interactedLessons.has(Number(s.lesson.id))||showCard||showScenario||scenarioOpen||mapOpen||practiceMenu||activity||recall?'hidden':''}><span>Tap a dot to discover</span><small>Drag to explore · Pinch to zoom</small></div><nav class="canvas-dock" aria-label="Lesson modes">${modes.map(m=>`<button data-eng-action="mode" data-mode="${m}" aria-current="${mode===m?'page':'false'}">${icon(m)}<span>${names[m]}</span></button>`).join('')}<span class="canvas-progress" aria-label="${done.size} of ${s.lesson.hotspots.length} details discovered"><b>${done.size}</b><small>/ ${s.lesson.hotspots.length}</small></span></nav></footer><div class="toast" id="toast"></div></main>`;
    resizeObserver?.disconnect();cardObserver?.disconnect();activityObserver?.disconnect();transformObserver?.disconnect();
    restoreScenarioReading();
    if(root.EngBookLesson1Panorama?.mount(s)||root.EngBookPanoramaCore?.mount(s)){
      bindMap();const pane=document.querySelector('.canvas-recall')||document.querySelector('.canvas-activity');if(pane)document.querySelector('.scene-canvas').style.setProperty(pane.classList.contains('canvas-recall')?'--recall-height':'--speaking-height',(pane.offsetHeight+12)+'px');
      const selectedCard=document.querySelector('.scene-glass-card');root.requestAnimationFrame(()=>{if(focusCard&&selectedCard){selectedCard.focus({preventScroll:true});focusCard=false;}});return true;
    }
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
      if(pendingAnchor){const b=root.v59Bounds(stage),v=root.v59EnsureViewer(),a=pendingAnchor;const region=scope(a).bounds||detailFrame(a);if(region)focusRegion(stage,region);const x=b.cx+v.tx+b.fw*v.scale*a.x/100,y=b.cy+v.ty+b.fh*v.scale*a.y/100;if(!region&&(x<40||x>b.vw-40||y<100||y>b.vh-150)){v.tx=b.vw/2-b.fw*v.scale*a.x/100-b.cx;v.ty=b.vh*.38-b.fh*v.scale*a.y/100-b.cy;root.v59ApplyViewerTransform(stage);}pendingAnchor=null;}
      position(stage);
      root.EngBookScenePreview?.mount(stage);
    };
    root.v59BindViewer(stage);if(img.complete)fit();else img.addEventListener('load',fit,{once:true});
    resizeObserver=new ResizeObserver(fit);resizeObserver.observe(stage);
    const card=document.querySelector('.scenario-studio')||document.querySelector('.scene-glass-card');if(card){position(stage);cardObserver=new ResizeObserver(()=>position(stage));cardObserver.observe(card);if(card.classList.contains('canvas-detail-card'))bindCardDrag(stage,card);}
    if(card){transformObserver=new MutationObserver(()=>position(stage));transformObserver.observe(stage.querySelector('.v59-scene-content'),{attributes:true,attributeFilter:['style']});}
    stage.addEventListener('wheel',e=>{e.preventDefault();dismissCaption();wholePicture=false;root.v59ZoomAt(stage,root.v59EnsureViewer().scale*Math.exp(-e.deltaY*.002),e.clientX,e.clientY);},{passive:false});
    stage.addEventListener('pointerdown',()=>{wholePicture=false;},{passive:true});
    bindMap();
    root.requestAnimationFrame(()=>{if(!stage.isConnected)return;if(focusMapReturn()||focusScenarioReturn(card))return;if(focusCard&&card){card.focus({preventScroll:true});focusCard=false;}else if(mode==='learn'&&!card&&root.EngBookLearn?.restoreDetail?.()){returnAnchor=null;}else if(returnAnchor){[...stage.querySelectorAll('[data-hotspot-id]')].find(el=>el.dataset.hotspotId===returnAnchor)?.focus({preventScroll:true});returnAnchor=null;}});
    return true;
  }
  function cleanup(){root.EngBookLesson1Panorama?.unmount();root.EngBookPanoramaCore?.unmount();root.EngBookScenePreview?.stop({clear:true});endPracticeReview();discardMapReturn();mapState=null;scenarioReturn=null;scenarioReturnFocus=null;stopScenarioAudio();scenarioReading.clear();root.EngBookGuide?.reset();resizeObserver?.disconnect();cardObserver?.disconnect();activityObserver?.disconnect();transformObserver?.disconnect();document.documentElement.classList.remove('canvas-open');document.body.classList.remove('canvas-open');if(state()?.viewer)state().viewer.maxScale=3.5;lessonId=null;manualCard=null;cachedContent=null;practiceMenu=false;lastRecall=false;lastSpeaking=false;lastLearn=false;lastScenarios=false;}
  function prepareListening(){endPracticeReview();discardMapReturn();scenarioReturn=null;scenarioReturnFocus=null;mapOpen=false;scenarioOpen=false;scenarioIndex=null;practiceMenu=false;details=false;stopScenarioAudio();const s=state();if(s){s.selected=null;s.v60CardOpen=false;s.v60AnchorLabel=null;}focusCard=false;pendingAnchor=null;}
  function open(){endPracticeReview();discardMapReturn();needsCover=true;state().selected=null;state().v60CardOpen=false;root.render();}
  document.addEventListener('click',e=>{if(e.target.closest('[data-eng-action="mode"]')){endPracticeReview();discardMapReturn();scenarioReturn=null;scenarioReturnFocus=null;stopScenarioAudio();mapOpen=false;scenarioOpen=false;scenarioIndex=null;scenarioExpanded=false;practiceMenu=false;}},true);
  document.addEventListener('click',e=>{
    const pageButton=e.target.closest('[data-canvas-action="page-next"],[data-canvas-action="page-prev"]');
    if(pageButton){const pages=['word','phrase','grammar','practice'],index=detailExpanded?Math.max(0,pages.indexOf(cardTab)):0,next=Math.max(0,Math.min(3,index+(pageButton.dataset.canvasAction==='page-next'?1:-1)));cardTab=pages[next];detailExpanded=next>0;details=false;root.render();const selector='[data-canvas-action="'+(next===3?'page-prev':'page-next')+'"]';document.querySelector(selector)?.focus({preventScroll:true});return;}
    const tab=e.target.closest('[data-canvas-tab]');if(tab){cardTab=tab.dataset.canvasTab;root.render();document.querySelector(`[data-canvas-tab="${cardTab}"]`)?.focus({preventScroll:true});return;}
    const el=e.target.closest('[data-canvas-action]');if(!el)return;e.preventDefault();e.stopPropagation();
    const action=el.dataset.canvasAction,stage=document.querySelector('.scene-canvas-stage');
    if(action==='anchor'){const hit=e.detail===0||!el.classList.contains('hotspot')?null:root.v60ScreenHit(stage,e.clientX,e.clientY);select(hit?.index??Number(el.dataset.index));}
    else if(action==='practice-menu'){practiceMenu=!practiceMenu;root.render();document.querySelector(practiceMenu?'.canvas-practice-choices [aria-current="true"]':'[data-canvas-action="practice-menu"]')?.focus({preventScroll:true});}
    else if(action==='practice-type'){practiceMenu=false;root.setPractice(el.dataset.type);}
    else if(action==='practice-hear')root.hearPracticeTarget();
    else if(action==='practice-hint')root.showPracticeHint();
    else if(action==='practice-word')root.showPracticeWord();
    else if(action==='practice-next')root.nextPracticeRound();
    else if(action==='practice-restart')root.resetPractice();
    else if(action==='close-card')clear();
    else if(action==='parent')up();
    else if(action==='return-scenario')returnToScenario();
    else if(action==='return-map')returnToMap();
    else if(action==='expand-detail'){detailExpanded=!detailExpanded;root.render();document.querySelector('[data-canvas-action="expand-detail"]')?.focus({preventScroll:true});}
    else if(action==='map'){if(mapOpen)endPracticeReview();else beginPracticeReview();discardMapReturn();scenarioReturn=null;scenarioReturnFocus=null;returnAnchor=null;focusCard=false;stopScenarioAudio();mapOpen=!mapOpen;scenarioOpen=false;scenarioIndex=null;root.render();document.querySelector(mapOpen?'.canvas-search':'[data-canvas-action="map"]')?.focus({preventScroll:true});}
    else if(action==='map-clear'){filterMap('');document.querySelector('.canvas-search')?.focus({preventScroll:true});}
    else if(action==='scenarios'||action==='scenario-list'){endPracticeReview();discardMapReturn();scenarioReturn=null;scenarioReturnFocus=null;stopScenarioAudio();if(isFind())root.setMode('explore');scenarioOpen=action==='scenario-list'||!scenarioOpen;mapOpen=false;scenarioIndex=null;scenarioPeek=false;root.render();document.querySelector(scenarioOpen?'.scenario-choices button':'[data-canvas-action="scenarios"]')?.focus({preventScroll:true});}
    else if(action==='scenario-filter'){endPracticeReview();discardMapReturn();scenarioReturn=null;scenarioReturnFocus=null;stopScenarioAudio();scenarioFilter=root.EngBookScenarios.filterKey(scenarios(),el.dataset.filter);scenarioOpen=true;scenarioIndex=null;scenarioPeek=false;root.render();document.querySelector(`[data-filter="${scenarioFilter}"]`)?.focus({preventScroll:true});}
    else if(action==='scenario-peek'){scenarioPeek=!scenarioPeek;root.render();document.querySelector('[data-canvas-action="scenario-peek"]')?.focus({preventScroll:true});}
    else if(action==='scenario')chooseScenario(el.dataset.index);
    else if(action==='scenario-prev'||action==='scenario-next')chooseScenario(scenarioIndex+(action==='scenario-prev'?-1:1));
    else if(action==='scenario-hear')listenScenario();
    else if(action==='scenario-level'){if(!scenarios()[scenarioIndex]?.levels?.[el.dataset.level])return;stopScenarioAudio();scenarioLevel=el.dataset.level;root.render();document.querySelector(`[data-level="${scenarioLevel}"]`)?.focus({preventScroll:true});}
    else if(action==='scenario-expand'){scenarioExpanded=!scenarioExpanded;root.render();document.querySelector('[data-canvas-action="scenario-expand"]')?.focus({preventScroll:true});}
    else if(action==='learn-tab'){learnTab=el.dataset.tab;root.render();document.querySelector(`[data-tab="${learnTab}"]`)?.focus({preventScroll:true});}
    else if(action==='lesson-phrase'||action==='lesson-grammar'){select(el.dataset.index);detailExpanded=true;cardTab=action==='lesson-phrase'?'phrase':'grammar';root.render();}
    else if(action==='guide-prev'||action==='guide-next'){const count=state().lesson.hotspots.length;guideExample=(guideExample+(action==='guide-prev'?count-1:1))%count;root.render();document.querySelector(`[data-canvas-action="${action}"]`)?.focus({preventScroll:true});}
    else if(action==='save'&&selected())root.toggleSaved(selected().en);
    else if(action==='lesson-level')root.EngBookJourney?.open({lessonId:state().lesson.id,trigger:el});
    else if(action==='hear'&&selected()){if(root.EngBookListening){root.EngBookListening.open();return;}const h=selected(),data=language(h);root.speak(cardTab==='grammar'?data.grammar[tense%data.grammar.length].sentence:cardTab==='phrase'?data.phrases[phrase%data.phrases.length].text:data.description||h.example,.82,hotspotVoice(h));}
    else if(action==='details'){details=!details;root.render();}
    else if(action.startsWith('tense-')){const count=language(selected()).grammar.length;tense=(tense+(action==='tense-next'?1:count-1))%count;root.render();document.querySelector(`[data-canvas-action="${action}"]`)?.focus({preventScroll:true});}
    else if(action.startsWith('phrase-')){const count=language(selected()).phrases.length;phrase=(phrase+(action==='phrase-next'?1:count-1))%count;root.render();document.querySelector(`[data-canvas-action="${action}"]`)?.focus({preventScroll:true});}
  });
  document.addEventListener('keydown',e=>{
    if(e.defaultPrevented||e.isComposing||e.key!=='Escape'||!active()||document.querySelector('dialog[open],[role="dialog"][aria-modal="true"]'))return;
    if(mapOpen||scenarioOpen||practiceMenu){
      e.preventDefault();const returnToPractice=practiceMenu,returnToMap=mapOpen;
      if(returnToMap)endPracticeReview();mapOpen=false;scenarioOpen=false;practiceMenu=false;root.render();
      document.querySelector(returnToPractice?'[data-canvas-action="practice-menu"]':returnToMap?'[data-canvas-action="map"]':'[data-canvas-action="scenarios"]')?.focus({preventScroll:true});
    }else if(scenarioPeek&&currentScenario()){
      e.preventDefault();scenarioPeek=false;root.render();document.querySelector('[data-canvas-action="scenario-peek"]')?.focus({preventScroll:true});
    }else if(selected()||currentScenario()){e.preventDefault();clear();}
    else if(state().mode!=='explore'){e.preventDefault();root.setMode('explore');}
  });
  root.addEventListener?.('pagehide',()=>stopScenarioAudio());
  root.addEventListener?.('scenespeak:sound-change',event=>{
    if(event.detail?.enabled!==false)return;
    if(['loading','playing'].includes(scenarioAudio.status))stopScenarioAudio('muted');
    const s=state();if(s?.practiceAudio)root.updatePracticeAudio?.(s.practiceAudio,'muted');
  });
  root.speechSynthesis?.addEventListener?.('voiceschanged',()=>{if(active()&&(selected()||currentScenario()))root.render();});
  root.EngBookSceneCanvas=Object.freeze({render,cleanup,open,prepareListening,active,select,clear,up,previewSelect,previewClear,branchNavigation,visibleHotspots,position,placeCard,clampCard,connector,branchConnector,branchLinkMarkup,positionBranchLink,scope,markerMarkup,regionMarkup,focusRegion,detailFrame,bindCardDrag,chooseScenario,mapMarkup,filterMap,rememberMap,bindMap,mapReturnContext,returnToMap,focusMapReturn,practiceReviewContext,rememberScenarioReading,restoreScenarioReading,scenarioReturnContext,returnToScenario,focusScenarioReturn,listenScenario,stopScenarioAudio,openLearningDetail,hasCard:()=>Boolean(selected()||currentScenario())});
})(typeof window!=='undefined'?window:globalThis);
