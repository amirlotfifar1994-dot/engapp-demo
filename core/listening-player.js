(function(root){
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const state=()=>root.EngBookEventContext?.getRoot('state');
  let current=null,generation=0,timer=null,startTimer=null;
  function session(pack,level){
    const key=`${pack.lessonId||pack.id}/${level}`;
    if(current?.key!==key){const prior=current?.lessonId===Number(pack.lessonId||pack.id)?current:null,priorRow=prior?.data.sections.flatMap(s=>s.segments)[prior.index]?.id;stop();current={key,lessonId:Number(pack.lessonId||pack.id),level,data:root.EngBookLessonListening.build(pack,level),index:0,status:'idle',transcript:false,questions:false,answers:false,rate:.85,responses:{},continuous:false,playback:'section',settings:false,questionIndex:0,pictureReturn:null};if(prior){current.rate=prior.rate;current.playback=prior.playback;current.settings=prior.settings;const index=current.data.sections.flatMap(s=>s.segments).findIndex(r=>r.id===priorRow);current.index=Math.max(0,index);}}
    return current;
  }
  const flat=()=>current?.data.sections.flatMap(section=>section.segments.map(segment=>({...segment,sectionId:section.id,sectionTitle:section.title,speaker:section.speaker,perspective:section.perspective,voiceRole:section.voiceRole,voiceKey:section.voiceKey,pitch:section.pitch})))||[];
  function stop(status='stopped'){
    generation++;clearTimeout(timer);clearTimeout(startTimer);timer=null;startTimer=null;
    if(current){current.status=status;current.continuous=false;current.pausedScope=null;}
    root.EngBookSpeech?.stopSpeaking?.();
  }
  function visible(a=current){const s=state();return current===a&&s?.screen==='lesson'&&Number(s.lesson?.id??s.lesson?.lessonId)===a?.lessonId&&(s.mode==='listening'||s.mode==='learn'&&root.EngBookLearn?.session?.().tab==='listening');}
  function paint(){
    if(!visible())return;
    const body=root.document?.querySelector?.('.listening-lesson .learn-topic-body'),scroll=body?.scrollTop||0;
    const focus=root.document?.activeElement,inside=focus?.closest?.('.listening-lesson');
    const id=inside?focus.id:null,action=inside?focus.dataset?.lessonListeningAction:null,field=inside?['data-listening-section','data-listening-rate','data-listening-playback','data-listening-level'].find(key=>focus.hasAttribute?.(key)):null;
    const actions=Array.from(root.document?.querySelectorAll?.('[data-lesson-listening-action]')||[]),actionIndex=actions.indexOf(focus);
    const selection=inside&&typeof focus.selectionStart==='number'?[focus.selectionStart,focus.selectionEnd]:null;
    root.render();
    const nextBody=root.document?.querySelector?.('.listening-lesson .learn-topic-body');if(nextBody)nextBody.scrollTop=scroll;
    const next=id?root.document?.getElementById?.(id):action?Array.from(root.document?.querySelectorAll?.('[data-lesson-listening-action]')||[])[actionIndex]:field?root.document?.querySelector?.('['+field+']'):null;
    const target=next?.disabled?root.document?.querySelector?.('[data-lesson-listening-action="toggle"]')||next:next;target?.focus?.({preventScroll:true});if(selection)next?.setSelectionRange?.(...selection);
  }
  function play(all=false){
    if(!current)return;
    stop();const a=current,token=++generation;
    const scope=all==='section'?'section':all?'all':'one',sectionId=flat()[a.index]?.sectionId;
    a.scope=scope;a.playback=scope;a.continuous=scope!=='one';a.status='loading';paint();
    function next(){
      if(token!==generation||!visible(a))return;
      if(root.EngBookUISounds?.isEnabled?.()===false){stop('muted');paint();return;}
      const row=flat()[a.index];if(!row){stop('complete');paint();return;}
      let settled=false;
      const failed=status=>{if(settled||token!==generation)return;settled=true;stop(status);paint();};
      const ended=()=>{
        if(settled||token!==generation)return;if(!visible(a)){stop();return;}settled=true;clearTimeout(startTimer);startTimer=null;
        const following=flat()[a.index+1],continuePlaying=scope==='all'||scope==='section'&&following?.sectionId===sectionId;
        if(continuePlaying&&following){a.index++;a.status='loading';paint();timer=setTimeout(next,650);}
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
  function move(index){if(!current)return;stop();current.index=Math.max(0,Math.min(Number(index)||0,flat().length-1));paint();}
  function playSection(id=flat()[current?.index]?.sectionId){const index=flat().findIndex(r=>r.sectionId===id);if(index<0)return;move(index);play('section');}
  function startOver(){if(!current||!visible())return;move(0);play(true);}
  function pause(){
    if(!current||!visible()||!['loading','playing'].includes(current.status))return;
    const scope=current.scope||'one';stop('paused');current.pausedScope=scope;paint();
  }
  function resume(){
    if(!current||!visible()||current.status!=='paused'||!current.pausedScope)return;
    const scope=current.pausedScope;play(scope==='all'?true:scope==='section'?'section':false);
  }
  function playbackControls(active){return `<div class="listening-actions"><button data-lesson-listening-action="restart">Listen from the beginning</button><button data-lesson-listening-action="pause" aria-pressed="${current.status==='paused'}" ${active||current.status==='paused'?'':'disabled'}>${current.status==='paused'?'Resume':'Pause'}</button></div>`;}
  function onModeChange(){stop();if(current)current.pictureReturn=null;}
  function showPicture(){if(!visible())return false;const row=flat()[current.index],s=state();if(!Number.isInteger(row?.anchorIndex)||s.lesson?.hotspots?.[row.anchorIndex]?.id!==row.hotspotIds?.[0])return false;if(s.mode==='listening'){if(!root.EngBookSceneCanvas?.openLearningDetail)return false;stop();current.pictureReturn={index:current.index,scroll:root.document?.querySelector?.('.listening-lesson .learn-topic-body')?.scrollTop||0};root.EngBookSceneCanvas.openLearningDetail(row.anchorIndex,'word');return true;}if(!root.EngBookLearn?.choose||!root.EngBookLearn?.openDetail)return false;const index=current.index;stop();root.EngBookLearn.choose('listening',index);root.EngBookLearn.openDetail();return true;}
  const uiIcon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${({play:'<path d="m9 5 11 7-11 7Z"/>',stop:'<rect x="6" y="6" width="12" height="12" rx="2"/>',previous:'<path d="m15 6-6 6 6 6"/>',next:'<path d="m9 6 6 6-6 6"/>',text:'<path d="M4 5h16M12 5v15M8 20h8"/>',pin:'<circle cx="12" cy="10" r="4"/><path d="M19 10c0 6-7 11-7 11S5 16 5 10a7 7 0 0 1 14 0Z"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="currentColor"/><circle cx="15" cy="17" r="3" fill="currentColor"/>',question:'<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 5M12 17h.01"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>'})[name]||''}</svg>`;
  function standaloneMarkup(a,rows,row,active,message){
    const members=rows.filter(r=>r.sectionId===row?.sectionId),part=Math.max(0,members.findIndex(r=>r.id===row?.id)),q=a.data.questions[a.questionIndex];
    if(a.pictureReturn)root.requestAnimationFrame?.(()=>root.requestAnimationFrame?.(()=>{if(!visible(a)||state()?.v60CardOpen)return;const back=a.pictureReturn;a.pictureReturn=null;if(back?.index!==a.index)return;const body=root.document?.querySelector('.listening-lesson .learn-topic-body');if(body)body.scrollTop=back.scroll;root.document?.querySelector('[data-lesson-listening-action="picture"]')?.focus({preventScroll:true});}));
    return `<section class="immersive-learn listening-lesson listening-standalone" aria-label="Listening practice"><div class="learn-veil" aria-hidden="true"></div><div class="learn-workspace"><header class="listening-toolbar"><span>LISTEN & NOTICE</span><button data-lesson-listening-action="settings" aria-label="Listening settings" aria-expanded="${a.settings}">${uiIcon('settings')}</button></header><div class="learn-topic-body"><article class="learn-topic" tabindex="-1">
    ${a.settings?`<div class="listening-preferences"><div class="listening-settings"><label>Level<select data-listening-level>${['A1','A2','B1','B2','C1'].map(l=>`<option ${l===a.level?'selected':''}>${l}</option>`).join('')}</select></label><label>Speed<select data-listening-rate>${[.65,.85,1,1.15].map(r=>`<option value="${r}" ${r===a.rate?'selected':''}>${r}×</option>`).join('')}</select></label></div><p>${esc(a.data.voiceNotice)}</p>${a.data.levelCoverage.shared?'<small>Some detail descriptions use shared wording across levels.</small>':''}</div>`:''}
    <label class="listening-voice-picker"><span>Choose a voice or place</span><select aria-label="Listening section" data-listening-section>${a.data.sections.map(s=>`<option value="${esc(s.id)}" ${s.id===row?.sectionId?'selected':''}>${esc(s.title)}</option>`).join('')}</select></label>
    <div class="listening-now"><small>${row?.perspective==='character'?'CHARACTER · FIRST PERSON':'SCENE GUIDE'}</small><h1>${esc(row?.sectionTitle||'The whole scene')}</h1><span>Detail ${part+1} of ${members.length}</span></div>
    <label class="listening-playback-picker">Play<select aria-label="Listening playback range" data-listening-playback>${[['section','This section'],['all','Through the lesson'],['one','One detail']].map(([v,t])=>`<option value="${v}" ${a.playback===v?'selected':''}>${t}</option>`).join('')}</select></label>
    <div class="listening-transport" role="group" aria-label="Listening controls"><button data-lesson-listening-action="previous" aria-label="Previous detail" ${a.index?'':'disabled'}>${uiIcon('previous')}</button><button class="listening-main-play" data-lesson-listening-action="toggle" aria-label="${active?'Stop listening':'Play listening'}">${uiIcon(active?'stop':'play')}</button><button data-lesson-listening-action="next" aria-label="Next detail" ${a.index>=rows.length-1?'disabled':''}>${uiIcon('next')}</button></div>
    ${playbackControls(active)}<p class="listening-status" role="status" aria-live="polite">${esc(message)}</p>
    <div class="listening-tools" role="group" aria-label="Listening study tools"><button data-lesson-listening-action="transcript" aria-pressed="${a.transcript}">${uiIcon('text')}<span>Text</span></button>${Number.isInteger(row?.anchorIndex)?`<button data-lesson-listening-action="picture" aria-label="Find this detail in the picture">${uiIcon('pin')}<span>Picture</span></button>`:''}<button data-lesson-listening-action="questions" aria-expanded="${a.questions}">${uiIcon('question')}<span>Questions</span></button></div>
    ${a.transcript?`<div class="listening-transcript"><span class="learn-kicker">${esc(row?.claimClass)}</span><p class="learn-main-copy">${esc(row?.text)}</p></div>`:''}
    ${a.questions&&q?`<div class="listening-question-card"><div class="listening-question-nav"><button data-lesson-listening-action="question-prev" aria-label="Previous question" ${a.questionIndex?'':'disabled'}>${uiIcon('previous')}</button><span>Question ${a.questionIndex+1} of ${a.data.questions.length}</span><button data-lesson-listening-action="question-next" aria-label="Next question" ${a.questionIndex>=a.data.questions.length-1?'disabled':''}>${uiIcon('next')}</button></div><div class="listening-question"><label for="listening-answer-${a.questionIndex}">${esc(q.prompt)}</label>${q.type==='classification'?`<select id="listening-answer-${a.questionIndex}" data-listening-answer="${esc(q.id)}"><option value="">Choose…</option>${q.options.map(v=>`<option ${a.responses[q.id]===v?'selected':''}>${v}</option>`).join('')}</select>`:`<textarea id="listening-answer-${a.questionIndex}" data-listening-answer="${esc(q.id)}" rows="2">${esc(a.responses[q.id]||'')}</textarea>`}${a.answers?`<p>One model answer: ${esc(q.answer)}</p>`:''}<div class="listening-actions"><button data-lesson-listening-action="answers">${a.answers?'Hide answer':'Check answer'}</button><button data-lesson-listening-action="replay-section" data-section="${esc(q.sectionId)}">Replay section</button></div></div></div>`:''}
    </article></div></div></section>`;
  }

  function markup(pack,level){
    const a=session(pack,level),rows=flat(),row=rows[a.index],active=['loading','playing','paused'].includes(a.status);
    if(root.EngBookLearn?.session?.().detailReturn?.tab==='listening')root.requestAnimationFrame?.(()=>{if(visible(a)&&!state()?.v60CardOpen)root.EngBookLearn?.restoreDetail?.();});
    const message={idle:'Listen first. Show the transcript when you are ready.',loading:'Preparing the next sentence…',playing:'Playing…',paused:'Paused. Resume repeats the current detail, then continues in the same listening mode.',ready:'Ready to replay.',stopped:'Stopped. Continue from this sentence.',complete:'You have reached the end. Try the listening questions.',muted:'Sound is off. Turn sound on to listen.',error:'Audio could not play. Check that an English voice is available, then try again.'}[a.status]||'';
    if(state()?.mode==='listening')return standaloneMarkup(a,rows,row,['loading','playing'].includes(a.status),message);
    return `<section class="immersive-learn listening-lesson" aria-label="Listening practice"><div class="learn-veil" aria-hidden="true"></div><div class="learn-workspace"><div class="learn-section-tabs"><button data-learn-action="tab" data-learn-tab="picture">Back to Picture</button><b>Listening</b></div><div class="learn-topic-body"><article class="learn-topic" tabindex="-1">
      <span class="learn-kicker">LISTEN TO THE WHOLE PICTURE</span><h1>Look, listen, notice</h1><p>Hear the scene, then explore each detail.</p>
      <div class="listening-settings"><label>Language level<select data-listening-level>${['A1','A2','B1','B2','C1'].map(l=>`<option ${l===level?'selected':''}>${l}</option>`).join('')}</select></label><label>Speed<select data-listening-rate>${[.65,.85,1,1.15].map(r=>`<option value="${r}" ${r===a.rate?'selected':''}>${r}×</option>`).join('')}</select></label></div>
      <details class="listening-about"><summary>About this listening</summary><p class="learn-boundary">${esc(a.data.voiceNotice)}</p>${a.data.levelCoverage.shared?'<p class="learn-level-note">This lesson includes shared detailed descriptions. The level changes reviewed wording where available; some full-detail sentences may be harder.</p>':''}</details>
      <label class="learn-topic-picker">Choose a section<select data-listening-section>${a.data.sections.map(s=>`<option value="${esc(s.id)}" ${s.id===row?.sectionId?'selected':''}>${esc(s.title)}</option>`).join('')}</select></label>
      <div class="listening-actions"><button data-lesson-listening-action="section">Listen to this section</button></div>
      ${playbackControls(active)}
      <p><small>${row?.perspective==='character'?'CHARACTER · FIRST PERSON':'SCENE GUIDE'}</small><br><b>${esc(row?.sectionTitle||'Scene')}</b> · ${a.index+1} / ${rows.length}</p><div class="listening-actions"><button data-lesson-listening-action="all">${active&&a.continuous?'Restart full listening':'Listen from here to the end'}</button><button data-lesson-listening-action="one">Listen to this detail</button><button data-lesson-listening-action="stop" ${active?'':'disabled'}>Stop</button><button data-lesson-listening-action="previous" ${a.index?'':'disabled'}>Previous detail</button><button data-lesson-listening-action="next" ${a.index>=rows.length-1?'disabled':''}>Next detail</button></div>
      ${Number.isInteger(row?.anchorIndex)?'<div class="listening-actions"><button data-lesson-listening-action="picture">Find this detail in the picture</button></div>':''}<p role="status" aria-live="polite">${esc(message)}</p><label><input type="checkbox" data-listening-transcript ${a.transcript?'checked':''}> Show transcript</label>
      ${a.transcript?`<div class="listening-transcript"><span class="learn-kicker">${esc(row?.claimClass)}${row?.practiceOnly?' · practice example':''}</span><p class="learn-main-copy">${esc(row?.text)}</p></div>`:''}
      <p>${a.data.coverage.covered} lesson details covered${a.data.coverage.missing.length?`; ${a.data.coverage.missing.length} details need a description`:''}.</p>
      <button data-lesson-listening-action="questions" aria-expanded="${a.questions}">Listening questions</button>${a.questions?`<div class="listening-questions"><p>Answer from memory, then check the model answers.</p>${a.data.questions.map((q,i)=>`<div class="listening-question"><label for="listening-answer-${i}">${i+1}. ${esc(q.prompt)}</label>${q.type==='classification'?`<select id="listening-answer-${i}" data-listening-answer="${esc(q.id)}"><option value="">Choose…</option>${q.options.map(v=>`<option value="${v}" ${a.responses[q.id]===v?'selected':''}>${v}</option>`).join('')}</select>`:`<textarea id="listening-answer-${i}" data-listening-answer="${esc(q.id)}" rows="2">${esc(a.responses[q.id]||'')}</textarea>`}${a.answers?`<p>${q.type==='classification'?(a.responses[q.id]===q.answer?'Correct. ':'Answer: '):'One model answer: '}${esc(q.answer)}</p>`:''}<button data-lesson-listening-action="replay-section" data-section="${esc(q.sectionId)}">Replay this section</button></div>`).join('')}<button data-lesson-listening-action="answers" aria-expanded="${a.answers}">${a.answers?'Hide':'Check'} answers</button></div>`:''}
      </article></div></div></section>`;
  }
  root.document?.addEventListener('click',e=>{
    const el=e.target.closest?.('[data-lesson-listening-action]');if(!el||!visible())return;e.preventDefault();
    const action=el.dataset.lessonListeningAction;
    if(action==='toggle'){if(current.status==='paused'){resume();}else if(['loading','playing'].includes(current.status)){stop('stopped');paint();}else play(current.playback==='one'?false:current.playback==='all'?true:'section');}else if(action==='settings'){current.settings=!current.settings;paint();}else if(action==='transcript'){current.transcript=!current.transcript;paint();}else if(action==='question-prev'||action==='question-next'){current.questionIndex=Math.max(0,Math.min(current.questionIndex+(action==='question-next'?1:-1),current.data.questions.length-1));current.answers=false;paint();}else if(action==='restart')startOver();else if(action==='pause'){if(current.status==='paused')resume();else pause();}else if(action==='picture')showPicture();else if(action==='all')play(true);else if(action==='one')play(false);else if(action==='section')playSection();else if(action==='stop'){stop();paint();}
    else if(action==='previous'||action==='next')move(current.index+(action==='next'?1:-1));
    else if(action==='questions'){if(!current.questions&&state()?.mode==='listening'){current.questionIndex=Math.max(0,current.data.questions.findIndex(q=>q.sectionId===flat()[current.index]?.sectionId));current.answers=false;}current.questions=!current.questions;paint();}
    else if(action==='answers'){current.answers=!current.answers;paint();}
    else if(action==='replay-section')playSection(el.dataset.section);
  });
  root.document?.addEventListener('change',e=>{
    if(!visible())return;const el=e.target;
    if(el.matches('[data-listening-playback]')){stop('stopped');if(['section','all','one'].includes(el.value))current.playback=el.value;paint();}
    else if(el.matches('[data-listening-level]')){stop();root.EngBookLearn.setLevel(el.value);root.document?.querySelector?.('[data-listening-level]')?.focus?.({preventScroll:true});}
    else if(el.matches('[data-listening-rate]')){stop();current.rate=Number(el.value);paint();}
    else if(el.matches('[data-listening-transcript]')){current.transcript=el.checked;paint();}
    else if(el.matches('[data-listening-section]'))move(flat().findIndex(r=>r.sectionId===el.value));
    else if(el.matches('[data-listening-answer]'))current.responses[el.dataset.listeningAnswer]=el.value;
  });
  root.document?.addEventListener('input',e=>{if(visible()&&e.target.matches?.('[data-listening-answer]'))current.responses[e.target.dataset.listeningAnswer]=e.target.value;});
  root.addEventListener?.('pagehide',()=>stop());
  root.addEventListener?.('scenespeak:sound-change',e=>{if(e.detail?.enabled===false){stop('muted');paint();}});
  root.EngBookListeningPlayer=Object.freeze({markup,stop,play,playSection,showPicture,onModeChange,startOver,pause,resume,move,session,flat});
})(typeof window!=='undefined'?window:globalThis);
