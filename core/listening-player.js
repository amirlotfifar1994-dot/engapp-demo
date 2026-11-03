(function(root){
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const state=()=>root.EngBookEventContext?.getRoot('state');
  const gapOptions=[[650,'Short · 0.65 seconds'],[1500,'Medium · 1.5 seconds'],[3000,'Long · 3 seconds']];
  const validGap=value=>gapOptions.some(([ms])=>ms===value);
  const validRepeat=value=>value===1||value===2;
  const repeatControl=a=>`<label class="listening-range-setting">Repeat each detail<select data-listening-repeat><option value="1" ${a.repeatEach===1?'selected':''}>Once</option><option value="2" ${a.repeatEach===2?'selected':''}>Twice</option></select><small>Applies to continuous section or lesson playback.</small></label>`;
  function repeatProgress(a){
    if(a.repeatEach!==2||a.previewKind||a.scope==='one'||!['loading','playing','waiting','paused'].includes(a.status))return '';
    const pass=(a.status==='paused'?a.pausedRepeatPass:a.repeatPass)===1?2:1;
    return `${a.status==='waiting'?'Next: ':a.status==='paused'?'Resume: ':''}listen ${pass} of 2`;
  }
  const gapControl=a=>`<label class="listening-range-setting">Pause between details<select data-listening-gap>${gapOptions.map(([ms,title])=>`<option value="${ms}" ${a.gapMs===ms?'selected':''}>${title}</option>`).join('')}</select><small>Time to think or repeat before the next detail in continuous playback.</small></label>`;
  const evidence={observation:['Visible detail','You can check this detail in the picture.'],appearance:['Appearance','This is how someone or something looks. It does not confirm age or feelings.'],possibility:['Possibility','This is a guess, not something the picture confirms.'],boundary:['What we cannot know','The picture cannot confirm this information.']};
  function evidenceNote(row){
    const item=evidence[row?.claimClass];
    return `${row?.practiceOnly?'<p class="learn-boundary listening-practice-note">Practice example — not a fact about this picture.</p>':''}${item?`<p class="learn-boundary listening-evidence"><strong>${item[0]}</strong><br>${item[1]}</p>`:''}`;
  }
  const reconstructionNotice=a=>a.data.imageNotice?`<p class="learn-boundary listening-image-notice">${esc(a.data.imageNotice)}</p>`:'';
  function answerFeedback(a,q){
    if(!a.answers||!q)return '';
    const playing=a.previewKind==='answer'&&['loading','playing'].includes(a.status),paused=a.previewKind==='answer'&&a.status==='paused',control=`<button class="listening-stage-replay" data-lesson-listening-action="hear-answer" aria-pressed="${playing}">${playing?'Stop model answer':paused?'Resume model answer':'Hear model answer'}</button>${playing?'<button class="listening-stage-replay" data-lesson-listening-action="pause">Pause model answer</button>':''}${paused?'<p class="listening-model-pause-note">Resume replays this model answer from the beginning.</p>':''}`;
    if(q.type!=='classification')return `<p class="listening-model-answer" id="listening-feedback-${esc(q.id)}" tabindex="-1" role="status">One model answer: ${esc(q.answer)}</p>${control}`;
    const item=evidence[q.answer],response=a.responses[q.id],valid=q.options?.includes(response);
    return `<p class="listening-model-answer" id="listening-feedback-${esc(q.id)}" tabindex="-1" role="status">${valid?(response===q.answer?'Correct. ':'Try again. '):'Choose an answer, then compare. '}Answer: ${esc(item?.[0]||q.answer)}.${item?` ${item[1]}`:''}</p>${control}`;
  }
  let current=null,generation=0,timer=null,startTimer=null;
  let saveEpoch=0;const pendingSaves=new Map();
  const positionKey=a=>Number.isInteger(a?.lessonId)&&a.lessonId>0&&['A1','A2','B1','B2','C1'].includes(a.level)?`listening-position-${a.lessonId}-${a.level}`:null;
  function savePosition(){
    const a=current;if(!a)return;a.positionEpoch=(a.positionEpoch||0)+1;
    const store=root.EngAppLocalData,key=positionKey(a),row=flat()[a.index];if(!store?.set||!key||!row)return;
    const value={schemaVersion:1,lessonId:a.lessonId,level:a.level,segmentId:row.id,rate:a.rate,playback:a.playback,gapMs:a.gapMs,repeatEach:a.repeatEach},epoch=saveEpoch;
    const task=(pendingSaves.get(key)||Promise.resolve()).catch(()=>{}).then(()=>epoch===saveEpoch?store.set(key,value):null).catch(()=>{});
    pendingSaves.set(key,task);task.finally(()=>{if(pendingSaves.get(key)===task)pendingSaves.delete(key);});
  }
  async function restorePosition(a,allowed){
    const store=root.EngAppLocalData,key=positionKey(a),epoch=a.positionEpoch||0,clearEpoch=saveEpoch;if(!allowed||!store?.get||!key)return false;
    try{const saved=await store.get(key);
      if(current!==a||a.positionEpoch!==epoch||clearEpoch!==saveEpoch||saved?.schemaVersion!==1||saved.lessonId!==a.lessonId||saved.level!==a.level)return false;
      const index=flat().findIndex(row=>row.id===saved.segmentId);if(index<0)return false;
      a.index=index;if([.65,.85,1,1.15].includes(saved.rate))a.rate=saved.rate;if(['one','section','all'].includes(saved.playback))a.playback=saved.playback;
      if(validGap(saved.gapMs))a.gapMs=saved.gapMs;
      if(validRepeat(saved.repeatEach))a.repeatEach=saved.repeatEach;
      a.status='restored';paint();return true;
    }catch{return false;}
  }
  function session(pack,level){
    const key=`${pack.lessonId||pack.id}/${level}`;
    if(current?.key!==key){const prior=current?.lessonId===Number(pack.lessonId||pack.id)?current:null,priorRow=prior?.data.sections.flatMap(s=>s.segments)[prior.index]?.id;stop();current={key,lessonId:Number(pack.lessonId||pack.id),level,data:root.EngBookLessonListening.build(pack,level),index:0,status:'idle',transcript:false,questions:false,answers:false,rate:.85,gapMs:650,repeatEach:1,responses:{},continuous:false,playback:'section',settings:false,questionIndex:0,pictureReturn:null,stage:'listen',positionEpoch:0};if(prior){current.rate=prior.rate;current.gapMs=prior.gapMs;current.repeatEach=prior.repeatEach;current.playback=prior.playback;current.settings=prior.settings;current.stage=prior.stage||'listen';const index=current.data.sections.flatMap(s=>s.segments).findIndex(r=>r.id===priorRow);current.index=Math.max(0,index);if(current.stage==='try'){const questionId=prior.data.questions[prior.questionIndex]?.id,found=current.data.questions.findIndex(q=>q.id===questionId),row=current.data.sections.flatMap(s=>s.segments)[current.index];current.questionIndex=Math.max(0,found>=0?found:current.data.questions.findIndex(q=>q.sourceSegmentId===row?.id));current.questionSection=current.data.sections.find(s=>s.segments.some(r=>r.id===row?.id))?.id;current.questionDetail=row?.id;}}current.positionReady=restorePosition(current,!prior);}
    return current;
  }
  const flat=()=>current?.data.sections.flatMap(section=>section.segments.map(segment=>({...segment,sectionId:section.id,sectionTitle:section.title,speaker:section.speaker,perspective:section.perspective,voiceRole:section.voiceRole,voiceKey:section.voiceKey,pitch:section.pitch})))||[];
  function stop(status='stopped'){
    generation++;clearTimeout(timer);clearTimeout(startTimer);timer=null;startTimer=null;
    if(current){current.positionEpoch=(current.positionEpoch||0)+1;current.status=status;current.continuous=false;current.pausedScope=null;current.repeatPass=0;current.pausedRepeatPass=null;current.previewKind=null;current.activePreview=null;current.pausedPreview=null;}
    root.EngBookSpeech?.stopSpeaking?.();
  }
  function visible(a=current){const s=state();return current===a&&s?.screen==='lesson'&&Number(s.lesson?.id??s.lesson?.lessonId)===a?.lessonId&&(s.mode==='listening'||s.mode==='learn'&&root.EngBookLearn?.session?.().tab==='listening');}
  function paint(){
    if(!visible())return;
    const body=root.document?.querySelector?.('.listening-lesson .learn-topic-body'),scroll=body?.scrollTop||0;
    const focus=root.document?.activeElement,inside=focus?.closest?.('.listening-lesson');
    const id=inside?focus.id:null,action=inside?focus.dataset?.lessonListeningAction:null,field=inside?['data-listening-section','data-listening-gap','data-listening-repeat','data-listening-rate','data-listening-playback','data-listening-level'].find(key=>focus.hasAttribute?.(key)):null;
    const actions=Array.from(root.document?.querySelectorAll?.('[data-lesson-listening-action]')||[]),actionIndex=actions.indexOf(focus);
    const selection=inside&&typeof focus.selectionStart==='number'?[focus.selectionStart,focus.selectionEnd]:null;
    root.render();
    const nextBody=root.document?.querySelector?.('.listening-lesson .learn-topic-body');if(nextBody)nextBody.scrollTop=scroll;
    const next=id?root.document?.getElementById?.(id):action?Array.from(root.document?.querySelectorAll?.('[data-lesson-listening-action]')||[])[actionIndex]:field?root.document?.querySelector?.('['+field+']'):null;
    const target=next?.disabled?root.document?.querySelector?.('[data-lesson-listening-action="toggle"]')||next:next;target?.focus?.({preventScroll:true});if(selection)next?.setSelectionRange?.(...selection);
  }
  function play(all=false,preview=null,repeatPass=0){
    if(!current)return;
    stop();const a=current,token=++generation;
    const scope=all==='section'?'section':all?'all':'one',sectionId=flat()[a.index]?.sectionId;
    a.scope=scope;a.repeatPass=repeatPass===1&&a.repeatEach===2?1:0;a.previewKind=preview?.previewKind||null;a.activePreview=preview?{...preview}:null;if(!preview)a.playback=scope;a.continuous=scope!=='one';a.status='loading';if(!preview)savePosition();paint();
    function next(){
      if(token!==generation||!visible(a))return;
      if(root.EngBookUISounds?.isEnabled?.()===false){stop('muted');paint();return;}
      const row=preview||flat()[a.index];if(!row){stop('complete');paint();return;}
      if(a.status==='waiting'){a.status='loading';paint();}
      let settled=false;
      const failed=status=>{if(settled||token!==generation)return;settled=true;stop(status);paint();};
      const ended=()=>{
        if(settled||token!==generation)return;if(!visible(a)){stop();return;}settled=true;clearTimeout(startTimer);startTimer=null;
        if(!preview&&scope!=='one'&&a.repeatEach===2&&a.repeatPass===0){a.repeatPass=1;a.status='waiting';paint();timer=setTimeout(next,validGap(a.gapMs)?a.gapMs:650);return;}
        a.repeatPass=0;
        const following=flat()[a.index+1],continuePlaying=scope==='all'||scope==='section'&&following?.sectionId===sectionId;
        if(continuePlaying&&following){a.index++;a.status='waiting';savePosition();paint();timer=setTimeout(next,validGap(a.gapMs)?a.gapMs:650);}
        else{a.status=scope==='all'?'complete':'ready';a.continuous=false;paint();}
      };
      startTimer=setTimeout(()=>failed('error'),8000);
      try{
        const p=root.EngBookSpeech?.speak(row.text,{rate:a.rate,voiceRole:row.voiceRole,voiceKey:row.voiceKey,pitch:row.pitch,lang:'en-US',onStart:()=>{if(!settled&&token===generation&&visible(a)){clearTimeout(startTimer);startTimer=null;a.status='playing';paint();}},onEnd:ended,onError:()=>failed('error'),onMuted:()=>failed('muted')});
        if(!p){failed('error');return;}
        p.then(ok=>{if(ok===true)ended();else failed('error');},()=>failed('error'));
      }catch{failed('error');}
    }
    next();
  }
  function move(index){if(!current)return;current.settingsReturn=null;stop();const prior=current.index;current.index=Math.max(0,Math.min(Number(index)||0,flat().length-1));current.viewReturn=null;current.pictureReturn=null;if(current.questionReview?.segmentId!==flat()[current.index]?.id)current.questionReview=null;savePosition();paint();if(current.index!==prior){const body=root.document?.querySelector?.('.listening-lesson .learn-topic-body');if(body)body.scrollTop=0;}}
  function playSection(id=flat()[current?.index]?.sectionId){const index=flat().findIndex(r=>r.sectionId===id);if(index<0)return;move(index);play('section');}
  function questionSource(q){
    if(!q)return null;
    const section=flat().filter(r=>r.sectionId===q.sectionId);
    return section.find(r=>r.id===q.sourceSegmentId)||section.find(r=>q.hotspotIds?.some(id=>r.hotspotIds?.includes(id)))||section.find(r=>q.id===`class-${r.id}`)||section.find(r=>q.id==='unknown'&&r.id==='check-boundary')||null;
  }
  function reviewQuestion(){
    if(!visible()||current.stage!=='try')return false;
    const q=current.data.questions[current.questionIndex],source=questionSource(q);if(!source)return false;
    const scroll=root.document?.querySelector?.('.listening-lesson .learn-topic-body')?.scrollTop||0;
    move(flat().findIndex(row=>row.id===source.id));current.questionReview={questionId:q.id,segmentId:source.id,scroll};current.answers=false;setStage('notice');return true;
  }
  function returnToQuestion(){
    const back=current?.questionReview;
    if(!visible()||back?.segmentId!==flat()[current.index]?.id||!current.data.questions.some(q=>q.id===back.questionId))return false;
    setStage('try');const body=root.document?.querySelector?.('.listening-lesson .learn-topic-body');if(body)body.scrollTop=back.scroll||0;
    root.document?.getElementById?.('listening-answer-'+current.questionIndex)?.focus?.({preventScroll:true});return true;
  }
  function settingsKey(){return JSON.stringify([current.key,current.index,current.stage,current.stage==='try'?current.data.questions[current.questionIndex]?.id:null]);}
  function settingsBack(){const back=current?.settingsReturn;return back&&back.lesson===state()?.lesson&&back.key===settingsKey()?back:null;}
  function toggleSettings(){
    if(!visible())return;
    const body=root.document?.querySelector?.('.listening-lesson .learn-topic-body');
    if(!current.settings){stop('stopped');current.settingsReturn={key:settingsKey(),lesson:state().lesson,scroll:Math.max(0,Number(body?.scrollTop)||0)};current.settings=true;}
    else current.settings=false;
    const back=settingsBack();paint();const next=root.document?.querySelector?.('.listening-lesson .learn-topic-body');
    if(next)next.scrollTop=!current.settings&&back&&settingsBack()===back?back.scroll:0;
    if(!current.settings)current.settingsReturn=null;
    root.document?.querySelector?.(current.settings?'[data-listening-level]':'[data-lesson-listening-action="settings"]')?.focus?.({preventScroll:true});
  }
  function replayQuestion(){
    if(!visible()||current.stage!=='try')return false;
    if(['loading','waiting','playing'].includes(current.status)&&current.previewKind==='detail'){stop();paint();return true;}
    const q=current.data.questions[current.questionIndex];if(!q)return false;
    const source=questionSource(q);
    if(!source)return false;
    current.answers=false;
    play(false,{...source,text:q.type==='classification'?q.prompt:source.text,previewKind:'detail'});return true;
  }
  function hearQuestion(){
    if(!visible()||current.stage!=='try')return false;
    if(['loading','waiting','playing'].includes(current.status)&&current.previewKind==='question'){stop();paint();return true;}
    const q=current.data.questions[current.questionIndex];if(!q?.prompt)return false;
    play(false,{text:q.prompt,voiceRole:'female',voiceKey:`${current.lessonId}/guide`,pitch:1,previewKind:'question'});return true;
  }
  function hearAnswer(){
    if(!visible()||state()?.mode!=='listening'||current.stage!=='try'||current.settings||!current.answers)return false;
    if(current.status==='paused'&&current.previewKind==='answer'){resume();return true;}
    if(['loading','playing'].includes(current.status)&&current.previewKind==='answer'){stop();paint();return true;}
    const q=current.data.questions[current.questionIndex];if(!q?.answer)return false;
    const item=q.type==='classification'?evidence[q.answer]:null;
    const source=q.type==='classification'?null:questionSource(q);
    play(false,{...(source||{voiceRole:'female',voiceKey:`${current.lessonId}/guide`,pitch:1}),text:item?`${item[0]}. ${item[1]}`:q.answer,previewKind:'answer'});return true;
  }
  function concealAnswers(){if(current.previewKind==='answer')stop();current.answers=false;}
  function currentAnchor(){if(!visible())return null;const row=state()?.mode==='listening'&&current.stage==='try'?questionSource(current.data.questions[current.questionIndex]):flat()[current.index];return row?.hotspotIds?.[0]||null;}
  function openAnchor(id){if(!visible())return false;const index=flat().findIndex(r=>r.hotspotIds?.includes(id));if(index<0)return false;if(index!==current.index){current.stage='listen';current.settings=false;current.questions=false;current.transcript=false;}move(index);return true;}
  function startOver(){if(!current||!visible())return;if(state()?.mode==='listening'){current.stage='listen';current.settings=false;}move(0);play(true);}
  function pause(){
    if(!current||!visible()||!['loading','waiting','playing'].includes(current.status))return;
    const scope=current.scope||'one',pass=current.repeatPass,preview=current.activePreview?{data:current.activePreview,key:viewKey()}:null;stop('paused');current.pausedScope=scope;current.pausedRepeatPass=pass;current.pausedPreview=preview;current.previewKind=preview?.data.previewKind||null;paint();
  }
  function resume(){
    if(!current||!visible()||current.status!=='paused'||!current.pausedScope)return;
    const scope=current.pausedScope,pass=current.pausedRepeatPass,preview=current.pausedPreview;
    if(preview&&(preview.key!==viewKey()||preview.data.previewKind==='answer'&&!current.answers)){stop();paint();return;}
    play(scope==='all'?true:scope==='section'?'section':false,preview?.data||null,pass);
  }
  function playbackControls(active){return `<div class="listening-actions listening-playback-secondary"><button data-lesson-listening-action="restart">Listen from the beginning</button><button data-lesson-listening-action="pause" aria-pressed="${current.status==='paused'}" ${active||current.status==='paused'?'':'disabled'}>${current.status==='paused'?'Resume':'Pause'}</button></div>`;}
  function viewKey(){return JSON.stringify([current.lessonId,current.level,flat()[current.index]?.id,current.stage,current.settings,current.stage==='try'?current.data.questions[current.questionIndex]?.id:null]);}
  function pictureReturnContext(a=current){
    const back=a?.pictureReturn;if(!back||current!==a)return null;
    if(back.key!==viewKey()||back.index!==a.index||back.anchorId!==flat()[a.index]?.hotspotIds?.[0]){a.pictureReturn=null;return null;}return back;
  }
  function restorePicture(back,a){
    if(!visible(a)||state()?.v60CardOpen||a.pictureReturn!==back||pictureReturnContext(a)!==back)return false;
    a.pictureReturn=null;const body=root.document?.querySelector?.('.listening-lesson .learn-topic-body');if(body)body.scrollTop=back.scroll;
    root.document?.querySelector?.('[data-lesson-listening-action="picture"]')?.focus({preventScroll:true});return true;
  }
  function onModeChange(){
    if(visible()){const back=pictureReturnContext();if(back)current.viewReturn={key:back.key,scroll:back.scroll};else if(!state()?.v60CardOpen){const body=root.document?.querySelector?.('.listening-lesson .learn-topic-body');if(body)current.viewReturn={key:viewKey(),scroll:Math.max(0,Number(body.scrollTop)||0)};}}
    stop();if(current){current.pictureReturn=null;current.questionPicker=false;current.questionChoice=null;if(!current.settings||!settingsBack())current.settingsReturn=null;}
  }
  function onModeRendered(){
    if(!visible()||state()?.v60CardOpen||pictureReturnContext())return false;
    const back=current.viewReturn;if(!back)return false;current.viewReturn=null;if(back.key!==viewKey())return false;
    const body=root.document?.querySelector?.('.listening-lesson .learn-topic-body');if(!body)return false;body.scrollTop=back.scroll;return true;
  }
  function showPicture(){if(!visible())return false;const row=flat()[current.index],s=state();if(!Number.isInteger(row?.anchorIndex)||s.lesson?.hotspots?.[row.anchorIndex]?.id!==row.hotspotIds?.[0])return false;if(s.mode==='listening'){if(!root.EngBookSceneCanvas?.openLearningDetail)return false;const prior=pictureReturnContext();stop();current.pictureReturn={key:viewKey(),anchorId:row.hotspotIds[0],index:current.index,scroll:prior?.scroll??Math.max(0,Number(root.document?.querySelector?.('.listening-lesson .learn-topic-body')?.scrollTop)||0)};root.EngBookSceneCanvas.openLearningDetail(row.anchorIndex,'word');return true;}if(!root.EngBookLearn?.choose||!root.EngBookLearn?.openDetail)return false;const index=current.index;stop();root.EngBookLearn.choose('listening',index);root.EngBookLearn.openDetail();return true;}
  const uiIcon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${({play:'<path d="m9 5 11 7-11 7Z"/>',stop:'<rect x="6" y="6" width="12" height="12" rx="2"/>',previous:'<path d="m15 6-6 6 6 6"/>',next:'<path d="m9 6 6 6-6 6"/>',text:'<path d="M4 5h16M12 5v15M8 20h8"/>',pin:'<circle cx="12" cy="10" r="4"/><path d="M19 10c0 6-7 11-7 11S5 16 5 10a7 7 0 0 1 14 0Z"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="currentColor"/><circle cx="15" cy="17" r="3" fill="currentColor"/>',question:'<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 5M12 17h.01"/>',check:'<path d="m5 12 4 4L19 6"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>'})[name]||''}</svg>`;
  function focusAnswerFeedback(){if(state()?.mode!=='listening'||current?.stage!=='try'||current.settings||!current.answers)return;const feedback=root.document?.querySelector?.('.listening-model-answer');feedback?.focus?.({preventScroll:true});feedback?.scrollIntoView?.({block:'start',inline:'nearest',behavior:'instant'});}
  function focusReadingStage(stage){if(state()?.mode!=='listening')return;const target=root.document?.querySelector?.(stage==='notice'?'.listening-transcript .learn-main-copy':'[data-listening-section]');target?.focus?.({preventScroll:true});target?.scrollIntoView?.({block:stage==='notice'?'start':'nearest',inline:'nearest',behavior:'instant'});}
  function focusQuestion(){if(state()?.mode!=='listening')return;const body=root.document?.querySelector?.('.listening-lesson .learn-topic-body'),label=root.document?.querySelector?.('.listening-question>label');if(body)body.scrollTop=0;label?.focus?.({preventScroll:true});label?.scrollIntoView?.({block:'nearest',inline:'nearest',behavior:'instant'});}
  function toggleQuestionPicker(){
    if(!visible()||state()?.mode!=='listening'||current.stage!=='try'||current.settings)return;
    const body=root.document?.querySelector?.('.listening-lesson .learn-topic-body');
    if(!current.questionPicker){stop();current.questionPickerScroll=body?.scrollTop||0;current.questionChoice=current.data.questions[current.questionIndex]?.id;current.questionPicker=true;}
    else current.questionPicker=false;
    paint();const nextBody=root.document?.querySelector?.('.listening-lesson .learn-topic-body');if(!current.questionPicker&&nextBody)nextBody.scrollTop=current.questionPickerScroll||0;
    const target=root.document?.querySelector?.(current.questionPicker?'[data-listening-question-choice]':'[data-lesson-listening-action="question-picker"]');target?.focus?.({preventScroll:true});if(current.questionPicker)target?.scrollIntoView?.({block:'nearest',inline:'nearest',behavior:'instant'});
  }
  function openChosenQuestion(){
    if(!visible()||state()?.mode!=='listening'||current.stage!=='try'||current.settings||!current.questionPicker)return false;
    const index=current.data.questions.findIndex(q=>q.id===current.questionChoice);if(index<0)return false;
    stop();current.questionIndex=index;current.questionPicker=false;current.questionChoice=null;current.settingsReturn=null;current.answers=false;paint();focusQuestion();return true;
  }
  function questionPickerMarkup(a){
    if(!a.questionPicker)return '<div id="listening-question-picker" hidden></div>';
    const sections=new Map(a.data.sections.map(s=>[s.id,s.title])),positions=new Map(a.data.sections.flatMap(s=>s.segments.map((r,i)=>[r.id,`Detail ${i+1} of ${s.segments.length}`])));
    return `<div id="listening-question-picker" class="listening-question-picker"><label class="listening-range-setting">Choose a listening question<select data-listening-question-choice data-listening-key="${esc(a.key)}">${a.data.questions.map((item,i)=>`<option value="${esc(item.id)}" ${item.id===a.questionChoice?'selected':''}>${esc(`${i+1}. ${sections.get(item.sectionId)||'Listening'} · ${positions.get(item.sourceSegmentId)||(item.practiceOnly?'Practice example':item.id==='unknown'?'Picture limits':'Evidence check')}`)}</option>`).join('')}</select></label><button class="listening-stage-primary" data-lesson-listening-action="question-open">Open question</button></div>`;
  }
  function setStage(stage){if(!current||!visible()||!['listen','notice','try'].includes(stage))return false;stop('stopped');current.settingsReturn=null;current.pictureReturn=null;current.settings=false;current.stage=stage;current.questionPicker=false;current.questionChoice=null;current.transcript=stage==='notice';current.questions=stage==='try';if(stage==='try'){const back=current.questionReview,questionIndex=back?.segmentId===flat()[current.index]?.id?current.data.questions.findIndex(q=>q.id===back.questionId):-1;if(questionIndex>=0){current.questionIndex=questionIndex;current.questionSection=flat()[current.index]?.sectionId;current.questionDetail=flat()[current.index]?.id;}current.questionReview=null;const row=flat()[current.index],section=row?.sectionId;if(current.questionSection!==section||current.questionDetail!==row?.id){const exact=current.data.questions.findIndex(q=>q.sectionId===section&&(q.sourceSegmentId===row?.id||q.id===`class-${row?.id}`||row?.id==='check-boundary'&&q.id==='unknown'));current.questionIndex=Math.max(0,exact>=0?exact:current.data.questions.findIndex(q=>q.sectionId===section));current.questionSection=section;current.questionDetail=row?.id;current.answers=false;}}paint();const body=root.document?.querySelector?.('.listening-lesson .learn-topic-body');if(body)body.scrollTop=0;if(stage==='try')focusQuestion();else focusReadingStage(stage);return true;}
  function standaloneMarkup(a,rows,row,active,message){
    const stages=[['listen','Listen'],['notice','Notice'],['try','Try']],stage=stages.some(([id])=>id===a.stage)?a.stage:'listen',index=stages.findIndex(([id])=>id===stage),members=rows.filter(r=>r.sectionId===row?.sectionId),part=Math.max(0,members.findIndex(r=>r.id===row?.id)),q=a.data.questions[a.questionIndex],contextRow=stage==='try'?questionSource(q):row,contextAnchor=contextRow?.hotspotIds?.[0];
    const questionMembers=rows.filter(r=>r.sectionId===contextRow?.sectionId),questionPart=questionMembers.findIndex(r=>r.id===contextRow?.id),questionPosition=contextAnchor&&questionPart>=0?`Detail ${questionPart+1} of ${questionMembers.length}`:q?.practiceOnly?'Practice example':q?.id==='unknown'?'Picture limits':'Evidence check';
    const pictureBack=pictureReturnContext(a);if(pictureBack)root.requestAnimationFrame?.(()=>root.requestAnimationFrame?.(()=>restorePicture(pictureBack,a)));
    const voice=stage==='try'?`<div class="listening-question-context"><span class="learn-kicker">QUESTION ABOUT</span><h1>${esc(contextRow?.sectionTitle||a.data.sections.find(s=>s.id===q?.sectionId)?.title||'Listening detail')}</h1><p class="listening-position" data-listening-question-position>${questionPosition}</p><button class="listening-stage-replay" data-lesson-listening-action="question-picker" aria-expanded="${Boolean(a.questionPicker)}" aria-controls="listening-question-picker">${a.questionPicker?'Close question list':'Choose a question'}</button>${questionPickerMarkup(a)}</div>`:`<label class="listening-voice-picker"><span class="sr-only">Choose a voice or place</span><select aria-label="Listening section" data-listening-section>${a.data.sections.map(s=>`<option value="${esc(s.id)}" ${s.id===row?.sectionId?'selected':''}>${esc(s.title)}</option>`).join('')}</select></label><h1 class="sr-only">${esc(row?.sectionTitle||'The whole scene')}</h1>`;
    const position=`<div class="listening-position"><span>Detail ${part+1} of ${members.length}</span>${repeatProgress(a)?`<span class="listening-pass">${repeatProgress(a)}</span>`:''}</div>`;
    const preferences=`<div class="listening-preferences"><h2>Listening settings</h2><div class="listening-settings"><label>Level<select data-listening-level>${['A1','A2','B1','B2','C1'].map(l=>`<option ${l===a.level?'selected':''}>${l}</option>`).join('')}</select></label><label>Speed<select data-listening-rate>${[.65,.85,1,1.15].map(r=>`<option value="${r}" ${r===a.rate?'selected':''}>${r}×</option>`).join('')}</select></label></div><label class="listening-range-setting">Playback<select aria-label="Listening playback range" data-listening-playback>${[['section','This section'],['all','Through the lesson'],['one','One detail']].map(([v,t])=>`<option value="${v}" ${a.playback===v?'selected':''}>${t}</option>`).join('')}</select></label>${gapControl(a)}${repeatControl(a)}${playbackControls(active)}<details class="listening-about"><summary>About this listening</summary><p>${esc(a.data.voiceNotice)}</p>${reconstructionNotice(a)}${a.data.levelCoverage.shared?'<small>Some descriptions use shared wording across levels.</small>':''}</details></div>`;
    const status=({idle:'Press play when you are ready.',stopped:'Ready when you are.',paused:'Paused.',playing:'Listening…',waiting:a.repeatPass===1?'Listen once more after this pause…':'Pause to think or repeat…',loading:'Preparing audio…',ready:'Listen again, or continue.',complete:'Ready for a quick check.'})[a.status]||message;
    const listening=`${reconstructionNotice(a)}${position}<p class="listening-status" role="status" aria-live="polite">${esc(status)}</p>${['ready','complete'].includes(a.status)?'<button class="listening-stage-next" data-lesson-listening-action="stage" data-stage="notice">Next: notice the details →</button>':''}`;
    const notice=`${position}${evidenceNote(row)}<div class="listening-transcript"><p class="learn-main-copy" id="listening-notice-text" tabindex="-1">${esc(row?.text)}</p></div>`;

    const question=q?`<div class="listening-question-card"><div class="listening-question"><label for="listening-answer-${a.questionIndex}" tabindex="-1">${esc(q.prompt)}</label><button class="listening-stage-replay" data-lesson-listening-action="hear-question" aria-pressed="${active&&a.previewKind==='question'}">${active&&a.previewKind==='question'?'Stop question audio':'Hear the question'}</button>${q.type==='classification'?`<select id="listening-answer-${a.questionIndex}" data-listening-answer="${esc(q.id)}"><option value="">Choose…</option>${q.options.map(v=>`<option ${a.responses[q.id]===v?'selected':''}>${v}</option>`).join('')}</select>`:`<textarea id="listening-answer-${a.questionIndex}" data-listening-answer="${esc(q.id)}" rows="2">${esc(a.responses[q.id]||'')}</textarea>`}${answerFeedback(a,q)}<button class="listening-stage-replay" data-lesson-listening-action="replay-question" aria-pressed="${active&&a.previewKind==='detail'}">${active&&a.previewKind==='detail'?'Stop replay':'Hear this question’s detail'}</button><button class="listening-stage-replay" data-lesson-listening-action="review-question" ${questionSource(q)?'':'disabled'}>Review this detail</button><p class="listening-status" role="status">${esc(message)}</p></div></div>`:'<p>No question is available for this section.</p>';
    const readingActions=a.settings?'':stage==='listen'?`<footer class="listening-stage-footer listening-listen-footer" aria-label="Listening playback"><div class="listening-transport" role="group" aria-label="Listening controls"><button data-lesson-listening-action="previous" aria-label="Previous detail" ${a.index?'':'disabled'}>${uiIcon('previous')}</button><button class="listening-main-play" data-lesson-listening-action="toggle" aria-label="${a.status==='paused'?'Resume listening':active?'Pause listening':'Play listening'}">${a.status==='paused'||!active?uiIcon('play'):'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>'}</button><button data-lesson-listening-action="next" aria-label="Next detail" ${a.index>=rows.length-1?'disabled':''}>${uiIcon('next')}</button></div></footer>`:stage==='notice'?`<footer class="listening-stage-footer listening-notice-footer" aria-label="Detail reading actions">${Number.isInteger(row?.anchorIndex)?`<button data-lesson-listening-action="picture" aria-label="Find this detail in the picture" title="See in picture">${uiIcon('pin')}</button>`:''}<button class="listening-stage-primary" data-lesson-listening-action="stage" data-stage="try" title="${a.questionReview?.segmentId===row?.id?'Back to your question':'Try a question'}"><span>${a.questionReview?.segmentId===row?.id?'Back to your question':'Try a question'}</span>${uiIcon('next')}</button><button data-lesson-listening-action="${active?'stop':'one'}" aria-label="${active?'Stop detail audio':'Hear this detail again'}" title="${active?'Stop detail audio':'Hear this detail again'}" aria-pressed="${active}">${uiIcon(active?'stop':'play')}</button></footer>`:'';
    const questionActions=stage==='try'&&q&&!a.settings?`<footer class="listening-question-footer" aria-label="Listening question actions"><button data-lesson-listening-action="question-prev" aria-label="Previous question" title="Previous question" ${a.questionIndex?'':'disabled'}>${uiIcon('previous')}</button><button class="listening-stage-primary" data-lesson-listening-action="answers" aria-expanded="${a.answers}" title="${a.answers?'Hide answer':'Check answer'}">${uiIcon(a.answers?'close':'check')}<span>${a.answers?'Hide answer':'Check answer'}</span></button><button data-lesson-listening-action="question-next" aria-label="Next question" title="Next question" ${a.questionIndex>=a.data.questions.length-1?'disabled':''}>${uiIcon('next')}</button></footer>`:'';
    return `<section class="immersive-learn listening-lesson listening-standalone listening-staged" data-listening-stage="${stage}" data-listening-settings="${a.settings}" aria-label="Listening practice"><div class="learn-veil" aria-hidden="true"></div><div class="learn-workspace"><header class="listening-toolbar"><span>${a.settings?'SETTINGS':stage==='try'&&q?`QUESTION ${a.questionIndex+1} OF ${a.data.questions.length}`:`STEP ${index+1} OF 3`}</span>${contextAnchor?root.EngBookLessonLinks?.markup(contextAnchor)||'':''}<button data-lesson-listening-action="settings" aria-label="${a.settings?'Close listening settings':'Listening settings'}" aria-expanded="${a.settings}">${uiIcon(a.settings?'close':'settings')}</button></header><div class="learn-topic-body" ${a.settings?'role="region" tabindex="0" aria-label="Listening settings"':''}><article class="learn-topic" tabindex="-1">${a.settings?preferences:`<div class="listening-phase-tabs" role="tablist" aria-label="Listening steps">${stages.map(([id,title],i)=>`<button role="tab" id="listening-tab-${id}" aria-selected="${stage===id}" aria-controls="listening-stage-body" tabindex="${stage===id?'0':'-1'}" data-lesson-listening-action="stage" data-stage="${id}"><span>${i+1}</span>${title}</button>`).join('')}</div>${voice}<div id="listening-stage-body" class="listening-stage-body" role="tabpanel" aria-labelledby="listening-tab-${stage}">${stage==='listen'?listening:stage==='notice'?notice:question}</div>`}</article></div>${readingActions}${questionActions}${a.settings?`<footer class="listening-settings-footer"><button class="listening-stage-primary" data-lesson-listening-action="settings" title="Done">${uiIcon('check')}<span>Done</span></button></footer>`:''}</div></section>`;
  }

  function markup(pack,level){
    const a=session(pack,level),rows=flat(),row=rows[a.index],active=['loading','waiting','playing','paused'].includes(a.status);
    if(state()?.mode==='learn'&&root.EngBookLearn?.session?.().detailReturn?.tab==='listening')root.requestAnimationFrame?.(()=>{if(visible(a)&&!state()?.v60CardOpen)root.EngBookLearn?.restoreDetail?.();});
    const message={restored:'Saved position restored. Press play to continue.',idle:'Listen first. Show the transcript when you are ready.',waiting:a.repeatPass===1?'Listen once more after this pause.':'Pause to think or repeat before the next detail.',loading:'Preparing the next sentence…',playing:'Playing…',paused:'Paused. Resume repeats the current detail, then continues in the same listening mode.',ready:'Ready to replay.',stopped:'Stopped. Continue from this sentence.',complete:'You have reached the end. Try the listening questions.',muted:'Sound is off. Turn sound on to listen.',error:'Audio could not play. Check that an English voice is available, then try again.'}[a.status]||'';
    if(state()?.mode==='listening')return standaloneMarkup(a,rows,row,['loading','waiting','playing'].includes(a.status),message);
    return `<section class="immersive-learn listening-lesson" aria-label="Listening practice"><div class="learn-veil" aria-hidden="true"></div><div class="learn-workspace"><div class="learn-section-tabs"><button data-learn-action="tab" data-learn-tab="picture">Back to Picture</button><b>Listening</b></div><div class="learn-topic-body"><article class="learn-topic" tabindex="-1">
      <span class="learn-kicker">LISTEN TO THE WHOLE PICTURE</span><h1>Look, listen, notice</h1><p>Hear the scene, then explore each detail.</p>
      <div class="listening-settings"><label>Language level<select data-listening-level>${['A1','A2','B1','B2','C1'].map(l=>`<option ${l===level?'selected':''}>${l}</option>`).join('')}</select></label><label>Speed<select data-listening-rate>${[.65,.85,1,1.15].map(r=>`<option value="${r}" ${r===a.rate?'selected':''}>${r}×</option>`).join('')}</select></label></div>
      ${reconstructionNotice(a)}<details class="listening-about"><summary>About this listening</summary><p class="learn-boundary">${esc(a.data.voiceNotice)}</p>${a.data.levelCoverage.shared?'<p class="learn-level-note">This lesson includes shared detailed descriptions. The level changes reviewed wording where available; some full-detail sentences may be harder.</p>':''}</details>
      <label class="learn-topic-picker">Choose a section<select data-listening-section>${a.data.sections.map(s=>`<option value="${esc(s.id)}" ${s.id===row?.sectionId?'selected':''}>${esc(s.title)}</option>`).join('')}</select></label>
      <div class="listening-actions"><button data-lesson-listening-action="section">Listen to this section</button></div>
      ${gapControl(a)}${repeatControl(a)}${playbackControls(active)}
      <p><small>${row?.perspective==='character'?'CHARACTER · FIRST PERSON':'SCENE GUIDE'}</small><br><b>${esc(row?.sectionTitle||'Scene')}</b> · ${a.index+1} / ${rows.length}</p><div class="listening-actions"><button data-lesson-listening-action="all">${active&&a.continuous?'Restart full listening':'Listen from here to the end'}</button><button data-lesson-listening-action="one">Listen to this detail</button><button data-lesson-listening-action="stop" ${active?'':'disabled'}>Stop</button><button data-lesson-listening-action="previous" ${a.index?'':'disabled'}>Previous detail</button><button data-lesson-listening-action="next" ${a.index>=rows.length-1?'disabled':''}>Next detail</button></div>
      ${Number.isInteger(row?.anchorIndex)?'<div class="listening-actions"><button data-lesson-listening-action="picture">Find this detail in the picture</button></div>':''}<p role="status" aria-live="polite">${esc(message)}</p><label><input type="checkbox" data-listening-transcript ${a.transcript?'checked':''}> Show transcript</label>
      ${a.transcript?`<div class="listening-transcript"><span class="learn-kicker">${esc(row?.claimClass)}${row?.practiceOnly?' · practice example':''}</span><p class="learn-main-copy">${esc(row?.text)}</p></div>`:''}
      <p>${a.data.coverage.covered} lesson details covered${a.data.coverage.missing.length?`; ${a.data.coverage.missing.length} details need a description`:''}.</p>
      <button data-lesson-listening-action="questions" aria-expanded="${a.questions}">Listening questions</button>${a.questions?`<div class="listening-questions"><p>Answer from memory, then check the model answers.</p>${a.data.questions.map((q,i)=>`<div class="listening-question"><label for="listening-answer-${i}">${i+1}. ${esc(q.prompt)}</label>${q.type==='classification'?`<select id="listening-answer-${i}" data-listening-answer="${esc(q.id)}"><option value="">Choose…</option>${q.options.map(v=>`<option value="${v}" ${a.responses[q.id]===v?'selected':''}>${v}</option>`).join('')}</select>`:`<textarea id="listening-answer-${i}" data-listening-answer="${esc(q.id)}" rows="2">${esc(a.responses[q.id]||'')}</textarea>`}${a.answers?`<p>${q.type==='classification'?(a.responses[q.id]===q.answer?'Correct. ':'Answer: '):'One model answer: '}${esc(q.answer)}</p>`:''}<button data-lesson-listening-action="replay-section" data-section="${esc(q.sectionId)}">Replay this section</button></div>`).join('')}<button data-lesson-listening-action="answers" aria-expanded="${a.answers}">${a.answers?'Hide':'Check'} answers</button></div>`:''}
      </article></div></div></section>`;
  }
  root.document?.addEventListener('click',e=>{
    const el=e.target.closest?.('[data-lesson-listening-action]');if(!el||!visible())return;current.positionEpoch++;e.preventDefault();
    const action=el.dataset.lessonListeningAction;
    if(action==='toggle'){if(current.status==='paused'){resume();}else if(['loading','waiting','playing'].includes(current.status)){if(state()?.mode==='listening')pause();else{stop('stopped');paint();}}else play(current.playback==='one'?false:current.playback==='all'?true:'section');}else if(action==='stage'){if(el.dataset.stage!=='try'||!returnToQuestion())setStage(el.dataset.stage);}else if(action==='settings'){toggleSettings();}else if(action==='transcript'){if(state()?.mode==='listening')setStage('notice');else{current.transcript=!current.transcript;paint();}}else if(action==='question-prev'||action==='question-next'){stop();current.questionPicker=false;current.questionChoice=null;current.settingsReturn=null;const prior=current.questionIndex;current.questionIndex=Math.max(0,Math.min(prior+(action==='question-next'?1:-1),current.data.questions.length-1));current.answers=false;paint();if(current.questionIndex!==prior)focusQuestion();}else if(action==='restart')startOver();else if(action==='pause'){if(current.status==='paused')resume();else pause();}else if(action==='picture')showPicture();else if(action==='all')play(true);else if(action==='one')play(false);else if(action==='section')playSection();else if(action==='stop'){stop();paint();}
    else if(action==='previous'||action==='next')move(current.index+(action==='next'?1:-1));
    else if(action==='questions'){if(state()?.mode==='listening'){setStage('try');return;}current.questions=!current.questions;paint();}
    else if(action==='answers'){current.answers=!current.answers;if(!current.answers&&current.previewKind==='answer')stop();paint();if(current.answers)focusAnswerFeedback();}
    else if(action==='replay-question')replayQuestion();
    else if(action==='hear-question')hearQuestion();
    else if(action==='hear-answer')hearAnswer();
    else if(action==='question-picker')toggleQuestionPicker();
    else if(action==='question-open')openChosenQuestion();
    else if(action==='review-question')reviewQuestion();
    else if(action==='replay-section'){if(state()?.mode==='listening'){current.stage='listen';current.questions=false;}playSection(el.dataset.section);}
  });
  root.document?.addEventListener('change',e=>{
    if(!visible())return;current.positionEpoch++;const el=e.target;
    if(el.matches('[data-listening-question-choice]')){if(state()?.mode==='listening'&&current.stage==='try'&&current.questionPicker&&el.isConnected!==false&&el.dataset?.listeningKey===current.key&&current.data.questions.some(q=>q.id===el.value))current.questionChoice=el.value;return;}
    if(el.matches('[data-listening-playback]')){stop('stopped');if(['section','all','one'].includes(el.value))current.playback=el.value;savePosition();paint();}
    else if(el.matches('[data-listening-level]')){stop();root.EngBookLearn.setLevel(el.value);root.document?.querySelector?.('[data-listening-level]')?.focus?.({preventScroll:true});}
    else if(el.matches('[data-listening-gap]')){const ms=Number(el.value);if(validGap(ms)){stop();current.gapMs=ms;savePosition();paint();}}
    else if(el.matches('[data-listening-repeat]')){const count=Number(el.value);if(validRepeat(count)){stop();current.repeatEach=count;savePosition();paint();}}
    else if(el.matches('[data-listening-rate]')){stop();current.rate=Number(el.value);savePosition();paint();}
    else if(el.matches('[data-listening-transcript]')){current.transcript=el.checked;paint();}
    else if(el.matches('[data-listening-section]')){current.stage='listen';current.questions=false;current.transcript=false;move(flat().findIndex(r=>r.sectionId===el.value));}
    else if(el.matches('[data-listening-answer]')){current.responses[el.dataset.listeningAnswer]=el.value;if(current.answers){concealAnswers();paint();}}
  });
  root.document?.addEventListener('keydown',e=>{if(!visible()||e.defaultPrevented||e.isComposing||e.altKey||e.ctrlKey||e.metaKey)return;if(e.key==='Escape'&&state()?.mode==='listening'&&!state()?.v60CardOpen&&e.target.closest?.('.listening-lesson')){if(current.settings){e.preventDefault();e.stopPropagation?.();toggleSettings();return;}if(current.stage==='try'&&current.questionPicker){e.preventDefault();e.stopPropagation?.();toggleQuestionPicker();return;}if(current.stage==='notice'&&returnToQuestion()){e.preventDefault();e.stopPropagation?.();return;}}const tab=e.target.closest?.('.listening-phase-tabs [role="tab"]');if(!tab||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;const steps=['listen','notice','try'],i=steps.indexOf(tab.dataset.stage),next=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:-1)+3)%3;e.preventDefault();setStage(steps[next]);const selected=root.document?.querySelector('[data-stage="'+steps[next]+'"][role="tab"]');selected?.focus({preventScroll:true});selected?.scrollIntoView?.({block:'nearest',inline:'nearest',behavior:'instant'});});
  root.document?.addEventListener('input',e=>{if(visible()&&e.target.matches?.('[data-listening-answer]')){current.positionEpoch++;current.responses[e.target.dataset.listeningAnswer]=e.target.value;if(current.answers){concealAnswers();paint();}}});
  root.addEventListener?.('engapp:local-data-cleared',()=>{
    saveEpoch++;pendingSaves.clear();stop('idle');if(current){current.index=0;current.viewReturn=null;current.questionReview=null;current.settingsReturn=null;current.stage='listen';current.rate=.85;current.gapMs=650;current.repeatEach=1;current.playback='section';current.responses={};current.questions=false;current.answers=false;current.transcript=false;current.questionIndex=0;current.questionPicker=false;current.questionChoice=null;current.pictureReturn=null;}paint();
  });
  root.addEventListener?.('pagehide',()=>{if(current)current.settingsReturn=null;stop();});
  root.addEventListener?.('scenespeak:sound-change',e=>{if(e.detail?.enabled===false){stop('muted');paint();}});
  for(const name of ['openLesson','goHome']){const old=root[name];if(typeof old==='function')root[name]=function(...args){if(current)current.settingsReturn=null;return old.apply(this,args);};}
  root.EngBookListeningPlayer=Object.freeze({markup,stop,play,playSection,showPicture,onModeChange,onModeRendered,currentAnchor,openAnchor,startOver,pause,resume,setStage,move,session,flat});
})(typeof window!=='undefined'?window:globalThis);
