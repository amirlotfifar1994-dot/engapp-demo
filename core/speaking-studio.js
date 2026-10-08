/* Picture speaking: one lesson-scoped attempt, explicit practice and review.
   Recording proves an audio file was captured, never pronunciation quality. */
(function(root){
  'use strict';
  const state=()=>root.EngBookEventContext.getRoot('state');
  const progress=()=>root.EngBookEventContext.getRoot('progress');
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const durations=[30,60,90],checks=['I described visible details.','I placed details in the picture.','I kept guesses separate from facts.'];
  let current=null,generation=0,interval=null,stream=null,recorder=null,recognition=null;
  const fresh=id=>({lesson:id,step:'plan',duration:30,seconds:30,status:'idle',elapsed:0,transcript:'',audio:null,checks:[],supportOpen:[],credited:false,attemptCounted:false,live:false,example:0,model:0,error:''});
  function session(){const id=Number(state().lesson?.id);if(current?.lesson!==id){cancel(true);current=fresh(id);}return current;}
  const active=token=>token===generation&&current?.lesson===Number(state().lesson?.id)&&state().screen==='lesson'&&state().mode==='speak';
  function render(){
    const page=document.querySelector?.('.speaking-page'),section=document.querySelector?.('.speaking-studio');
    const keepPosition=section?.dataset.speakingStep===current?.step,scroll=page?.scrollTop||0;
    const focused=document.activeElement,action=focused?.dataset?.speakingAction,check=focused?.dataset?.speakingCheck;
    root.render();
    if(!keepPosition)return;
    const next=document.querySelector?.('.speaking-page');if(next)next.scrollTop=scroll;
    const controls=document.querySelectorAll?.('[data-speaking-action],[data-speaking-check]')||[];
    [...controls].find(el=>action?el.dataset.speakingAction===action:check!==undefined&&el.dataset.speakingCheck===check)?.focus?.({preventScroll:true});
  }
  function stopClock(){if(interval!==null)root.clearInterval(interval);interval=null;state().speakingRunning=false;}
  function tracks(){stream?.getTracks().forEach(t=>t.stop());stream=null;}
  function revoke(){if(current?.audio)root.URL.revokeObjectURL(current.audio);if(current)current.audio=null;state().recordedUrl=null;}
  function cancel(remove=false){generation++;stopClock();const rec=recorder;recorder=null;try{if(rec?.state!=='inactive')rec?.stop();}catch{}tracks();const speech=recognition;recognition=null;speech?.stop?.('mode-change');state().recording=false;state().listening=false;state().recorder=null;if(current&&['requesting','recording','timing','saving'].includes(current.status))current.status='idle';if(remove)revoke();}
  function reset(duration){const a=session();cancel(true);Object.assign(a,fresh(a.lesson),{duration:durations.includes(Number(duration))?Number(duration):30});a.seconds=a.duration;state().transcript='';state().speakingDuration=a.duration;state().speakingSeconds=a.seconds;render();}
  function feedback(text){
    const words=String(text||'').trim().match(/\b[a-z]+(?:'[a-z]+)?\b/gi)||[];
    const spatial=/\b(on the (left|right)|in the (foreground|background|center|centre)|behind|beside|between|next to|near|in front of)\b/i.test(text);
    const ongoing=/\b(am|is|are)\s+(?:\w+\s+)?\w+ing\b/i.test(text);
    const cautious=/\b(may|might|could|seems?|appears?|perhaps|possibly)\b/i.test(text);
    return {words:words.length,spatial,ongoing,cautious};
  }
  function data(){
    const s=state(),g=root.activeGold?.()||{};
    const facts=(s.lesson.hotspots||[]).filter(h=>h.example&&(!h.claimClass||h.claimClass==='visible-fact')&&h.level!=='detail');
    const p={lessonId:s.lesson.id,content:g},level=root.EngAppLevelAware?.levelFor(p,'global')||'A2',band={A1:'A1–A2',A2:'A1–A2',B1:'B1–B2',B2:'B1–B2',C1:'C1–C2'}[level];
    const models=Object.entries(g.grammar?.models||{}).filter(([,v])=>typeof v==='string'&&v.trim());models.sort((a,b)=>Number(b[0]===band)-Number(a[0]===band));
    return {facts,level,grammar:g.grammar||{},mission:g.levelAware?.speakingLadder?.[level]?.[session().duration]||g.speaking?.[session().duration]||'Describe the main subject, then place two visible details in the picture.',models};
  }
  function clock(token,started){
    const a=current;a.elapsed=Math.min(a.duration,Math.max(0,(Date.now()-started)/1000));a.seconds=Math.max(0,Math.ceil(a.duration-a.elapsed));state().speakingSeconds=a.seconds;
    const el=document.getElementById('speaking-clock');if(el)el.textContent=root.formatTime(a.seconds);
    if(!active(token)){cancel();return;}
    if(a.seconds<=0)stop();
  }
  function beginClock(token){state().speakingRunning=true;const started=Date.now();interval=root.setInterval(()=>clock(token,started),200);}
  function startTranscript(token){
    if(!current.live)return;
    recognition=root.EngBookSpeech?.start?.({mode:'dictation',continuous:true,restartOnEnd:true,maxRestarts:2,silenceMs:0,maxDurationMs:current.duration*1000+2000,
      onTranscript:x=>{if(!active(token))return;current.transcript=x.text;state().transcript=x.text;const el=document.getElementById('speaking-transcript-live');if(el)el.textContent=x.text||'Listening…';},
      onError:()=>{if(!active(token))return;current.error='Live transcript could not continue. Your recording can still be reviewed; you can also type the words you said.';state().listening=false;render();},
      onComplete:x=>{if(!active(token))return;current.transcript=x.finalText||x.text||current.transcript;state().transcript=current.transcript;state().listening=false;render();}
    });state().listening=Boolean(recognition);
  }
  async function start(record=true){
    const a=session();if(['requesting','recording','timing'].includes(a.status))return;
    root.EngBookSpeech?.stopSpeaking?.();
    const previous=a.audio?{elapsed:a.elapsed,seconds:a.seconds,transcript:a.transcript,checks:[...a.checks],credited:a.credited,attemptCounted:a.attemptCounted}:null;
    cancel();const token=generation;a.step='practice';a.status=record?'requesting':'timing';a.error='';a.seconds=a.duration;a.elapsed=0;a.checks=[];a.credited=false;a.attemptCounted=false;
    // Keep the last take if permission fails; replace it only after capture starts.
    render();
    if(!record){revoke();a.transcript='';state().transcript='';beginClock(token);render();return;}
    try{
      if(!root.navigator.mediaDevices?.getUserMedia||!root.MediaRecorder)throw Object.assign(new Error(),{name:'NotSupportedError'});
      const captured=await root.navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}});
      if(!active(token)){captured.getTracks().forEach(t=>t.stop());return;}
      stream=captured;const chunks=[];const mime=['audio/webm;codecs=opus','audio/webm','audio/mp4'].find(t=>root.MediaRecorder.isTypeSupported?.(t));
      const rec=mime?new root.MediaRecorder(captured,{mimeType:mime}):new root.MediaRecorder(captured);recorder=rec;state().recorder=rec;
      rec.ondataavailable=e=>{if(token===generation&&e.data?.size)chunks.push(e.data);};
      rec.onerror=()=>{if(token!==generation)return;cancel();a.status='idle';a.error='Audio capture failed. Try again or practice with the timer.';render();};
      rec.onstop=()=>{
        captured.getTracks().forEach(t=>t.stop());if(token!==generation)return;recorder=null;stream=null;state().recording=false;state().recorder=null;stopClock();
        const blob=new root.Blob(chunks,{type:rec.mimeType||mime||'audio/webm'});
        if(blob.size){a.audio=root.URL.createObjectURL(blob);state().recordedUrl=a.audio;}
        a.status='done';a.step='review';state().recordedSeconds=Math.round(a.elapsed);
        if(!blob.size)a.error='No audio was captured. Try recording again.';
        else if(a.elapsed<3)a.error='That take was very short. Try speaking for at least a few seconds.';
        if(blob.size&&a.elapsed>=3&&!a.attemptCounted){a.attemptCounted=true;const p=progress();p.speakingAttempts=(p.speakingAttempts||0)+1;p.activity=p.activity||{};p.activity.speaks=(p.activity.speaks||0)+1;root.saveProgress();}
        render();
      };
      rec.start(250);revoke();a.transcript='';state().transcript='';a.status='recording';state().recording=true;beginClock(token);startTranscript(token);render();
    }catch(e){if(token!==generation)return;tracks();recorder=null;state().recording=false;state().recorder=null;a.status='idle';if(previous)Object.assign(a,previous,{status:'done',step:'review'});a.error=e?.name==='NotAllowedError'||e?.name==='SecurityError'?'Microphone access was not granted. You can practice with the timer instead.':e?.name==='NotSupportedError'?'Recording is unavailable here. Use the timer and type your description.':'The microphone could not start. Check the device or use the timer.';render();}
  }
  function stop(){
    const a=session();if(a.status==='requesting'){cancel();render();return;}
    if(!['recording','timing'].includes(a.status))return;
    stopClock();const speech=recognition;recognition=null;speech?.stop?.('manual');state().listening=false;
    if(recorder&&recorder.state!=='inactive'){a.status='saving';render();try{recorder.stop();}catch{cancel();a.error='The take could not be saved. Please try again.';render();}}
    else{a.status='done';a.step='review';render();}
  }
  function finish(){
    const a=session();if(a.status!=='done'||a.credited||a.checks.length!==checks.length||a.elapsed<3)return;
    a.credited=true;const p=progress();p.completed=p.completed||{};p.completed[`l${a.lesson}_speaking`]=true;
    p.speakingReview=p.speakingReview||{};p.speakingReview[a.lesson]={at:Date.now(),seconds:Math.round(a.elapsed),recorded:Boolean(a.audio),transcriptWords:feedback(a.transcript).words,selfReviewed:true};
    root.saveProgress();root.awardPoints?.(12,'speaking-review');render();
  }
  function markup(){
    const a=session(),d=data(),busy=['requesting','recording','timing','saving'].includes(a.status),hasAttempt=a.status==='done'&&a.elapsed>=3,f=feedback(a.transcript);
    const button=(action,text,extra='')=>`<button type="button" data-speaking-action="${action}" ${extra}>${text}</button>`;
    const error=a.error?`<p class="speaking-notice" role="status">${esc(a.error)}</p>`:'';
    const steps=`<nav class="speaking-steps" aria-label="Speaking steps">${['plan','practice','review'].map((k,i)=>button(k,`<span>${i+1}</span>${['Prepare','Speak','Review'][i]}`,`aria-current="${a.step===k?'step':'false'}" ${busy||k==='review'&&a.status!=='done'?'disabled':''}`)).join('')}</nav>`;
    let body='';
    if(a.step==='plan')body=`<div class="speaking-intro"><span class="speaking-kicker">YOUR PICTURE, YOUR WORDS</span><h3>Build a clear description</h3><p>Look at the picture. Start with what you can see.</p></div><div class="speaking-durations" role="group" aria-label="Speaking duration">${durations.map(n=>button('duration',`${n}s`,`data-duration="${n}" aria-pressed="${a.duration===n}"`)).join('')}</div><p class="speaking-mission">${esc(d.mission)}</p><ol class="speaking-route"><li><b>Set the scene</b><span>“This picture shows…”</span></li><li><b>Place visible details</b><span>“On the left… In the background…”</span></li>${a.duration>=60?'<li><b>Add a careful interpretation</b><span>“They might… because…” Only if a visible clue supports it.</span></li>':''}</ol><details class="speaking-support" data-speaking-support="starters" ${a.supportOpen.includes('starters')?'open':''}><summary>Picture starters</summary>${d.facts.length?`<p class="speaking-example">${esc(d.facts[a.example%d.facts.length].example)}</p><div class="speaking-inline">${button('example-hear','Hear example')}${button('example-next','Another detail')}</div>`:'<p>Choose a visible subject and describe where it is.</p>'}</details>`;
    else if(a.step==='practice')body=`<div class="speaking-intro"><span class="speaking-kicker">${a.status==='recording'?'RECORDING':a.status==='timing'?'TIMER PRACTICE':'SPEAK IN YOUR OWN WORDS'}</span><h3>${busy?'Describe the picture':'Your '+a.duration+'-second practice'}</h3></div><div class="speaking-clock" id="speaking-clock" role="timer" aria-label="Time remaining">${esc(root.formatTime(a.seconds))}</div><p class="speaking-mission">${esc(d.mission)}</p>${busy?'':`<label class="speaking-option"><input type="checkbox" data-speaking-live ${a.live?'checked':''} ${root.EngBookSpeech?.capabilities?.().recognition?'':'disabled'}> Add live transcript <small>${root.EngBookSpeech?.capabilities?.().recognition?'Optional · browser speech service':'Unavailable in this browser'}</small></label>${button('timer','Practice without recording','class="speaking-secondary"')}<small class="speaking-note">Audio stays in this browser session. Microphone access is requested when you record.</small>`}${a.live&&busy?`<p id="speaking-transcript-live" class="speaking-live" aria-live="off">${esc(a.transcript||'Speak when you are ready…')}</p>`:''}`;
    else body=`<div class="speaking-intro"><span class="speaking-kicker">LISTEN, NOTICE, TRY AGAIN</span><h3>${a.credited?'Practice reviewed':'Review your description'}</h3><p>${Math.round(a.elapsed)} seconds ${a.audio?'captured':'of timer practice'} · ${a.audio?'Listen to your take before checking below.':'Review what you said; timer practice is self-reported.'}</p></div>${a.audio?`<audio class="speaking-audio" controls preload="metadata" src="${esc(a.audio)}" aria-label="Your speaking recording"></audio>`:''}<details class="speaking-support" data-speaking-support="transcript" ${a.supportOpen.includes('transcript')?'open':''}><summary>Your words & language clues</summary><label for="speaking-transcript">Edit the transcript, or type what you said</label><textarea id="speaking-transcript" rows="3" maxlength="5000" placeholder="Write your description here…">${esc(a.transcript)}</textarea>${button('feedback','Check language clues')}<div class="speaking-feedback" aria-live="polite"><b>${f.words} words in the text</b>${[['Spatial language',f.spatial],['An ongoing-action pattern',f.ongoing],['Cautious wording',f.cautious]].map(([label,found])=>`<span>${found?'✓':'○'} ${label}: ${found?'detected':'not detected'}</span>`).join('')}<small>Text clues only. Check them against the picture; they do not establish accuracy or pronunciation.</small></div></details><div class="speaking-checks" role="group" aria-label="Speaking self-review">${checks.map((text,i)=>`<label><input type="checkbox" data-speaking-check="${i}" ${a.checks.includes(i)?'checked':''} ${a.credited?'disabled':''}>${text}</label>`).join('')}</div><div class="speaking-inline">${button('retry','Try again')}${button('plan','Change goal')}</div>${hasAttempt&&d.models.length?`<details class="speaking-support" data-speaking-support="model" ${a.supportOpen.includes('model')?'open':''}><summary>Compare with a model</summary><p>Compare the order and wording. Other accurate descriptions are possible.</p><p class="speaking-example">${esc(d.models[a.model%d.models.length][1])}</p><div class="speaking-inline">${button('model-hear','Hear model')}${button('model-next',esc(d.models[a.model%d.models.length][0])+' · Another model')}</div></details>`:''}`;
    const grammarHelp=a.step==='plan'&&d.grammar.explainer?`<details class="speaking-support" data-speaking-support="grammar" ${a.supportOpen.includes('grammar')?'open':''}><summary>${esc(d.grammar.title||'Lesson language')}</summary><p>${esc(d.grammar.explainer)}</p>${d.grammar.examples?.length?`<p class="speaking-example">${esc(d.grammar.examples[0])}</p>`:''}</details>`:'';
    const primary=a.step==='plan'?button('practice','Ready to speak','class="speaking-primary"'):
      a.step==='practice'?(busy?button(a.status==='requesting'?'cancel':'stop',a.status==='requesting'?'Cancel microphone request':a.status==='saving'?'Saving…':'Finish this take',`class="speaking-primary" ${a.status==='saving'?'disabled':''}`):button('record','Record & start timer','class="speaking-primary"')):
      button('finish',a.credited?'Reviewed ✓':'Finish review',`class="speaking-primary" ${!hasAttempt||a.checks.length!==checks.length||a.credited?'disabled':''}`);
    const footer=`<div class="speaking-footer">${primary}</div>`;
    return `<section class="speaking-studio" data-speaking-step="${a.step}" aria-label="Picture speaking practice">${steps}<div class="speaking-page">${a.step==='plan'?`<p class="speaking-level-note">${esc(d.level)} practice · Change your level in Learn.</p>`:''}${body}${grammarHelp}${error}</div>${footer}</section>`;
  }
  function act(action,el){const a=session(),busy=['requesting','recording','timing','saving'].includes(a.status);if(busy&&!['stop','cancel'].includes(action))return;
    if(action==='record')return start(true);if(action==='timer')return start(false);if(action==='stop')return stop();if(action==='cancel'){cancel();render();return;}
    if(action==='duration')return reset(Number(el.dataset.duration));if(action==='finish')return finish();
    if(action==='retry'){reset(a.duration);session().step='practice';render();return;}
    if(['plan','practice','review'].includes(action)){if(action==='review'&&a.status!=='done')return;a.step=action;}
    if(action==='example-next')a.example++;if(action==='model-next')a.model++;
    if(action==='example-hear'){const d=data();return root.speak(d.facts[a.example%d.facts.length]?.example||'',.82);}
    if(action==='model-hear'){const d=data();return root.speak(d.models[a.model%d.models.length]?.[1]||'',.82);}
    render();
  }
  document.addEventListener('click',e=>{const el=e.target.closest?.('[data-speaking-action]');if(!el||el.disabled)return;e.preventDefault();act(el.dataset.speakingAction,el);});
  document.addEventListener('input',e=>{if(e.target.id==='speaking-transcript'){session().transcript=e.target.value.slice(0,5000);state().transcript=session().transcript;}});
  document.addEventListener('toggle',e=>{const key=e.target.dataset?.speakingSupport;if(!key||!['starters','grammar','transcript','model'].includes(key))return;const a=session();a.supportOpen=a.supportOpen.filter(x=>x!==key);if(e.target.open)a.supportOpen.push(key);},true);
  document.addEventListener('change',e=>{const el=e.target,a=session();if(el.matches?.('[data-speaking-live]'))a.live=el.checked;if(el.matches?.('[data-speaking-check]')){const n=Number(el.dataset.speakingCheck);a.checks=a.checks.filter(x=>x!==n);if(el.checked)a.checks.push(n);render();}});
  root.prepareSpeaking=reset;root.startTimedVoiceChallenge=sec=>{reset(sec);return start(true);};root.stopTimedVoiceChallenge=stop;root.toggleRecording=()=>current?.status==='recording'?stop():start(true);
  root.toggleTimer=()=>current?.status==='timing'?stop():start(false);root.resetTimer=()=>reset(session().duration);
  root.launchTimedVoiceChallenge=sec=>{root.setMode('speak');return root.startTimedVoiceChallenge(sec);};
  root.deleteSpeakingRecording=()=>{cancel(true);reset(session().duration);};
  root.speakContent=markup;
  for(const name of ['setMode','openLesson','goHome']){const old=root[name];root[name]=function(...args){if(name!=='setMode'||args[0]!=='speak')cancel(name!=='setMode');return old.apply(this,args);};}
  root.addEventListener?.('pagehide',()=>cancel(true));
  root.EngBookSpeaking=Object.freeze({markup,feedback,data,session,start,stop,reset,cancel,finish,act,busy:()=>Boolean(current&&['requesting','recording','timing','saving'].includes(current.status))});
})(typeof window!=='undefined'?window:globalThis);
