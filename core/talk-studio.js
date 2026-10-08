/* Lesson-scoped picture conversations. Reviewed prompts and text clues are
   learning support, not open-ended AI conversation or pronunciation grading. */
(function(root){
  'use strict';
  const state=()=>root.EngBookEventContext.getRoot('state');
  const progress=()=>root.EngBookEventContext.getRoot('progress');
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const words=t=>(String(t||'').match(/\b[a-z]+(?:'[a-z]+)?\b/gi)||[]).length;
  const labels={listener:'Describe the picture',detective:'Facts & guesses',story:'Imagine the next moment',anchor:'Talk about this detail'};
  let current=null,voice=null,generation=0;
  const fresh=(lesson,anchor='')=>({lesson,anchor,mission:anchor?'anchor':'listener',support:'guided',phase:'answer',turn:0,draft:'',responses:[],hint:false,open:[],voiceStatus:'idle',error:'',credited:false});
  const pack=()=>root.EngBookContent?.getPack?.(Number(state().lesson?.id));
  function pictureMissions(g,hotspots){
    const facts=(hotspots||[]).filter(h=>h.example&&h.level!=='detail'&&(!h.claimClass||h.claimClass==='visible-fact'));
    if(!facts.length)return {};
    const main=facts[0],other=facts[1]||main;
    const overview=typeof g.overview==='string'?g.overview:main.example;
    const inference=typeof g.inference==='string'?g.inference:Object.values(g.inference||{}).find(x=>typeof x==='string'&&x.trim());
    const guardrail=typeof g.guardrail==='string'?g.guardrail:'The picture cannot establish exact history, identity or intentions.';
    const prompt=(label,focus,text,hint)=>({label,focus,prompt:text,hint});
    return {
      listener:{label:'Picture listener',sub:'Describe visible details and connect them to the setting.',source:'reviewed-picture-content',prompts:[
        prompt('NOTICE','overview','What can you see in this picture?',main.example),
        prompt('PLACE','spatial',`Where can you see ${main.en}?`,'Place this detail relative to another visible detail. Use on the left, in the background, or next to only when the picture supports it.'),
        prompt('DETAIL','detail',`What can you say about ${other.en}?`,other.example),
        prompt('SETTING','detail','Which details help you recognise the setting?',overview)
      ]},
      detective:{label:'Picture evidence detective',sub:'Separate visible facts, supported guesses and unknowns.',source:'reviewed-picture-content',prompts:[
        prompt('FACTS','detail','Name two details you can directly see.',facts.slice(0,2).map(h=>h.example).join(' ')),
        prompt('POSSIBILITY','inference','What might this scene suggest?',inference||'Start with a visible clue, then use may or might to label your interpretation.'),
        prompt('SUPPORT','inference','What visible clue supports that interpretation?','Name a specific visible detail. Uncertainty words alone do not establish evidence.'),
        prompt('UNKNOWN','inference','What can you not establish from this picture?',guardrail)
      ]},
      story:{label:'Picture story relay',sub:'Practise an imagined before and next around the visible present.',source:'reviewed-picture-content',prompts:[
        prompt('NOW','detail','First, describe what is visible now.',main.example),
        prompt('BEFORE','timeline','Imagine what may have happened just before this moment.','This is an imagined extension. Use may have or might have; the photograph does not show what happened before.'),
        prompt('NEXT','timeline','Imagine what could happen next.','Use might or could. Keep this imagined event separate from the visible picture.'),
        prompt('CONNECT','timeline','Connect before, now and next in a short description.','Use your visible description for now. Label before and next as imagined possibilities.')
      ]}
    };
  }
  function missions(){
    const s=state(),g=root.activeGold?.()||pack()?.content||{};
    const rows=Object.fromEntries(Object.entries(g.conversation?.missions||{}).filter(([,m])=>Array.isArray(m?.prompts)&&m.prompts.some(p=>typeof p.prompt==='string'&&p.prompt.trim()))
      .map(([key,m])=>[key,{...m,prompts:m.prompts.filter(p=>typeof p.prompt==='string'&&p.prompt.trim())}]));
    if(!Object.keys(rows).length)Object.assign(rows,pictureMissions(g,s.lesson?.hotspots));
    const anchor=(s.lesson?.hotspots||[]).find(h=>h.en===s.sceneAnchor);
    if(anchor)rows.anchor={label:anchor.en,sub:'Connect one visible detail to the wider picture.',prompts:[
      {label:'NOTICE',focus:'detail',prompt:`What can you see about ${anchor.en}?`,hint:anchor.example||'Describe only what is visible.'},
      {label:'PLACE',focus:'spatial',prompt:`Where is ${anchor.en} in relation to another visible detail?`,hint:'Use a position phrase and name the nearby detail.'},
      {label:'CHECK',focus:'inference',prompt:`What remains uncertain about ${anchor.en}?`,hint:'Separate a visible clue from anything the picture cannot establish.'}
    ]};
    return rows;
  }
  function session(){
    const s=state(),id=Number(s.lesson?.id),anchor=(s.lesson?.hotspots||[]).some(h=>h.en===s.sceneAnchor)?s.sceneAnchor:'';
    if(current?.lesson!==id||current.anchor!==anchor){cancel();current=fresh(id,anchor);}
    const rows=missions();if(!rows[current.mission])current.mission=Object.keys(rows)[0]||'listener';
    return current;
  }
  function question(){const a=session();return missions()[a.mission]?.prompts[a.turn]||null;}
  function cancel(){generation++;const old=voice;voice=null;old?.cancel?.('mode-change');root.EngBookSpeech?.stopSpeaking?.();if(current)current.voiceStatus='idle';state().conversationListening=false;state().conversationRecognition=null;}
  const active=token=>token===generation&&current?.lesson===Number(state().lesson?.id)&&state().mode==='talk'&&state().screen==='lesson';
  function render(){
    const page=document.querySelector?.('.talk-page'),section=document.querySelector?.('.talk-studio');
    const position=section?.dataset.talkPhase===current?.phase&&Number(section?.dataset.talkTurn)===current?.turn;
    const scroll=page?.scrollTop||0,action=document.activeElement?.dataset?.talkAction;
    root.render();
    if(position){const next=document.querySelector?.('.talk-page');if(next)next.scrollTop=scroll;[...(document.querySelectorAll?.('[data-talk-action]')||[])].find(el=>el.dataset.talkAction===action)?.focus?.({preventScroll:true});}
    else document.querySelector?.('.talk-question')?.focus?.({preventScroll:true});
  }
  function reset(mission){cancel();const a=session(),support=a.support;current=fresh(a.lesson,a.anchor);current.support=support;if(missions()[mission])current.mission=mission;render();}
  function feedback(text,q=question()){
    const clues=root.EngBookSpeaking?.feedback?.(text)||{words:words(text),spatial:false,ongoing:false,cautious:false};
    const unknown=/\b(cannot|can't|not clear|uncertain|not visible|do not know|don't know|can't tell|cannot tell)\b/i.test(text);
    const focus=q?.focus||'detail';
    let next=focus==='spatial'?clues.spatial?'You used a position phrase. Check that it places the detail correctly.':'Try placing a detail: “On the left…” or “In the background…”':
      focus==='inference'?clues.cautious||unknown?'You marked uncertainty. Connect it to a visible clue.':'Keep interpretation cautious: “might”, “seems”, or “I cannot tell”.':
      focus==='timeline'?'Keep imagined before/next events separate from what is visible now.':
      focus==='action'?'Check that the action is visible. For an action in progress, try is/are + verb-ing.':'Check your answer against the picture, then add one concrete detail.';
    const p=pack(),claims=String(text).split(/(?<=[.!?])\s+/).filter(Boolean).slice(0,6);
    const evidence=p&&root.EngBookSceneIntelligence?.evaluate?claims.map(claim=>root.EngBookSceneIntelligence.evaluate(p,claim)):[];
    // An unmapped statement is a review request, never proof that a valid paraphrase is wrong.
    const flagged=evidence.find(row=>row?.type==='unsupported'&&row.sceneGraph?.rule);
    const needsCheck=Boolean(flagged),unmapped=evidence.some(row=>['unsupported','review'].includes(row?.type)&&!row.sceneGraph?.rule);
    if(flagged)next=flagged.repair||flagged.reason||'Check this claim against the picture and keep unsupported details uncertain.';
    return {words:words(text),clues,unknown,next,needsCheck,unmapped};
  }
  function submit(){
    const a=session(),q=question();if(a.phase!=='answer'||a.voiceStatus!=='idle'||!q)return;
    const text=a.draft.trim().slice(0,2000);if(words(text)<3){a.error='Add a short English sentence before sending.';render();return;}
    const previous=a.responses[a.turn],row={prompt:q.prompt,focus:q.focus,text,feedback:feedback(text,q),hintUsed:Boolean(a.hintUsed||previous?.hintUsed),voiceUsed:Boolean(a.voiceUsed)};
    a.responses[a.turn]=row;a.phase='feedback';a.error='';
    if(!previous){const p=progress();p.conversation=p.conversation||{};p.activity=p.activity||{};p.conversation.turns=(p.conversation.turns||0)+1;p.activity.conversations=(p.activity.conversations||0)+1;root.saveProgress();}
    render();
  }
  function next(){
    const a=session(),m=missions()[a.mission];if(a.phase!=='feedback'||!a.responses[a.turn]||!m)return;
    cancel();
    if(a.turn===m.prompts.length-1){a.phase='summary';render();return;}
    a.turn++;a.phase='answer';a.draft='';a.hint=false;a.hintUsed=false;a.voiceUsed=false;a.error='';a.open=[];render();
  }
  function finish(){
    const a=session(),m=missions()[a.mission];if(a.phase!=='summary'||a.credited||!m||a.responses.length!==m.prompts.length||a.responses.some(r=>words(r.text)<3))return;
    a.credited=true;const p=progress();p.completed=p.completed||{};p.completed[`l${a.lesson}_talk`]=true;p.conversation=p.conversation||{};
    p.conversation.completed=(p.conversation.completed||0)+1;
    p.talkReview=p.talkReview||{};p.talkReview[a.lesson]={at:Date.now(),mission:a.mission,turns:a.responses.length,hints:a.responses.filter(r=>r.hintUsed).length,voiceTurns:a.responses.filter(r=>r.voiceUsed).length};
    root.awardPoints?.(20,'talk-review');root.saveProgress();render();
  }
  function updateDraft(text){const a=session();if(a.phase!=='answer')return;a.draft=String(text).slice(0,2000);state().conversationInput=a.draft;const btn=document.querySelector?.('[data-talk-action="send"]');if(btn)btn.disabled=words(a.draft)<3||a.voiceStatus!=='idle';const count=document.getElementById?.('talk-word-count');if(count)count.textContent=`${words(a.draft)} words`;}
  function startVoice(){
    const a=session();if(a.phase!=='answer'||a.voiceStatus!=='idle')return;
    if(!root.EngBookSpeech?.capabilities?.().recognition){a.error='Voice transcription is unavailable here. Type your answer instead.';render();return;}
    cancel();const token=generation;a.voiceStatus='requesting';a.error='';state().conversationListening=true;
    const options={mode:'turn',continuous:false,silenceMs:1800,maxDurationMs:45000,baseText:a.draft,
      onState:x=>{if(!active(token))return;a.voiceStatus=['requesting','listening','processing'].includes(x.status)?x.status:'idle';render();},
      onTranscript:x=>{if(!active(token))return;updateDraft(x.text);a.voiceUsed=true;const el=document.getElementById?.('talk-answer');if(el)el.value=a.draft;},
      onError:info=>{if(!active(token))return;voice=null;a.voiceStatus='idle';state().conversationListening=false;state().conversationRecognition=null;a.error=info?.message||'Voice capture stopped. You can edit or type your answer.';render();},
      onComplete:x=>{if(!active(token)||x.cancelled)return;voice=null;a.voiceStatus='idle';state().conversationListening=false;state().conversationRecognition=null;if(x.text)updateDraft(x.text);a.error=words(a.draft)<3?'No complete answer was captured. Try again or type a sentence.':'';render();}
    };
    render();
    try{voice=root.EngBookSpeech.createSession(options);state().conversationRecognition=voice;voice.start();if(voice?.completed){voice=null;state().conversationRecognition=null;}}
    catch{if(!active(token))return;voice=null;a.voiceStatus='idle';state().conversationListening=false;a.error='The microphone could not start. Type your answer instead.';render();}
  }
  function stopVoice(){if(!voice)return;voice.stop('manual');}
  function hear(text=question()?.prompt){const a=session();if(a.voiceStatus!=='idle'||!text)return;const token=generation;root.EngBookSpeech?.speak?.(text,{rate:.82,voiceRole:a.turn%2?'female':'male',onError:()=>{if(active(token)){a.error='Audio playback is unavailable. The question remains on screen.';render();}}});}
  const button=(action,text,extra='')=>`<button type="button" data-talk-action="${action}" ${extra}>${text}</button>`;
  function markup(){
    const a=session(),rows=missions(),m=rows[a.mission],q=question(),busy=a.voiceStatus!=='idle';
    if(!m||!q)return '<section class="speaking-studio talk-studio"><div class="speaking-page"><h3>No conversation is available for this lesson yet.</h3></div></section>';
    const total=m.prompts.length,record=a.responses[a.turn],open=k=>a.open.includes(k)?'open':'';
    const head=`<div class="talk-turn-bar"><span>${a.phase==='summary'?'CONVERSATION REVIEW':`QUESTION ${a.turn+1} OF ${total}`}</span>${button('goals','Change goal',busy?'disabled':'')}</div><div class="talk-progress" role="progressbar" aria-label="Conversation progress" aria-valuenow="${a.phase==='summary'?total:a.turn}" aria-valuemin="0" aria-valuemax="${total}"><i style="width:${(a.phase==='summary'?total:a.turn)/total*100}%"></i></div>`;
    let body='',primary='';
    if(a.phase==='goals'){
      body=`<div class="speaking-intro"><span class="speaking-kicker">SHORT CONVERSATIONS ABOUT THIS PICTURE</span><h3>Choose a conversation</h3><p>Answer one question at a time, then review your wording.</p></div><div class="talk-goals">${Object.entries(rows).map(([key,row])=>button('mission',`<b>${esc(labels[key]||row.label)}</b><span>${esc(row.sub||'Practice a short exchange.')}</span>`,`data-mission="${esc(key)}" aria-pressed="${key===a.mission}"`)).join('')}</div>${a.anchor?button('whole','Use the whole picture'):''}`;
      primary=button('back','Return to conversation','class="speaking-primary"');
    }else if(a.phase==='summary'){
      body=`<div class="speaking-intro"><span class="speaking-kicker">${a.credited?'REVIEW SAVED':'YOU KEPT THE EXCHANGE GOING'}</span><h3>${a.responses.length} answers to review</h3><p>You practised ${esc(labels[a.mission]||m.label).toLowerCase()}.</p></div><div class="talk-summary"><span><b>${a.responses.filter(r=>r.voiceUsed).length}</b> voice turns</span><span><b>${a.responses.filter(r=>r.hintUsed).length}</b> hints used</span></div><p class="speaking-note">Completion records participation and review, not a language level or pronunciation score.</p><details class="speaking-support" data-talk-support="history" ${open('history')}><summary>Review the exchange</summary>${a.responses.map((r,i)=>`<article class="talk-history"><small>QUESTION ${i+1}</small><b>${esc(r.prompt)}</b><p>${esc(r.text)}</p></article>`).join('')}</details><div class="speaking-inline">${button('restart','Try the conversation again')}${button('speak','Describe it in Speak')}</div>`;
      primary=button('finish',a.credited?'Review saved ✓':'Save conversation review',`class="speaking-primary" ${a.credited?'disabled':''}`);
    }else{
      body=`<div class="talk-question" tabindex="-1"><span class="speaking-kicker">${esc(labels[a.mission]||m.label)} · ${esc(q.label||'YOUR TURN')}</span><h3>${esc(q.prompt)}</h3><div class="speaking-inline">${button('hear','Hear question',busy?'disabled':'')}${button('hint',a.hint?'Hide help':'Need help?',busy?'disabled':'')}</div></div>`;
      if(a.hint)body+=`<div class="talk-hint"><b>A starting point</b><p>${esc(q.hint||'Name a visible detail and place it in the picture.')}</p><small>Use your own words; more than one accurate answer is possible.</small></div>`;
      if(a.phase==='answer'){
        const caps=root.EngBookSpeech?.capabilities?.()||{};
        body+=`<div class="talk-answer-field"><label for="talk-answer">Your answer in English</label><textarea id="talk-answer" maxlength="2000" rows="3" placeholder="Say or type a short answer…" ${busy?'readonly':''}>${esc(a.draft)}</textarea><div class="talk-input-row"><small id="talk-word-count">${words(a.draft)} words</small>${button(busy?'stop-voice':'voice',a.voiceStatus==='requesting'?'Cancel voice request':a.voiceStatus==='processing'?'Finishing…':a.voiceStatus==='listening'?'Stop listening':'Answer by voice',`class="talk-voice" ${a.voiceStatus==='processing'?'disabled':''} ${!caps.recognition?'disabled':''}`)}</div><small class="speaking-note">${busy?'Your answer stays editable after capture. Send it when you are ready.':caps.recognition?'Voice uses browser speech transcription. Typing is always available.':'Voice transcription is unavailable in this browser. Type your answer.'}</small></div>`;
        if(a.support==='guided'&&!a.hint)body+='<p class="talk-route">Name a detail → place it → keep guesses cautious.</p>';
        primary=button('send','Send answer',`class="speaking-primary" ${words(a.draft)<3||busy?'disabled':''}`);
      }else{
        body+=`<div class="talk-reply"><span>YOUR ANSWER</span><p>${esc(record?.text||'')}</p></div><div class="talk-feedback" role="status"><b>A next step</b><p>${esc(record?.feedback.next||'Compare your answer with the visible picture.')}</p><small>Feedback checks text patterns and reviewed scene rules; it does not grade pronunciation or prove every claim.</small></div><div class="speaking-inline">${button('revise','Improve this answer')}${button('sample','Lesson reference')}</div>`;
        if(a.open.includes('sample'))body+=`<div class="talk-hint"><b>From this lesson</b><p>${esc(q.hint||'Describe a visible detail in your own words.')}</p>${button('hear-sample','Hear example')}</div>`;
        primary=button('next',a.turn===total-1?'Review the conversation':'Next question','class="speaking-primary"');
      }
      body+=`<details class="speaking-support" data-talk-support="options" ${open('options')}><summary>Practice options</summary><div class="speaking-inline talk-options">${['guided','independent'].map(k=>button('support',k==='guided'?'Guided':'Independent',`data-support="${k}" aria-pressed="${a.support===k}" ${busy?'disabled':''}`)).join('')}</div><p>Guided adds a short description route. Independent leaves the answer to you.</p></details>`;
    }
    if(a.error)body+=`<p class="speaking-notice" role="status">${esc(a.error)}</p>`;
    return `<section class="speaking-studio talk-studio" data-talk-phase="${a.phase}" data-talk-turn="${a.turn}" aria-label="Picture conversation">${head}<div class="speaking-page talk-page">${body}</div><div class="speaking-footer">${primary}</div></section>`;
  }
  function act(action,el={dataset:{}}){
    const a=session();if(a.voiceStatus!=='idle'&&!['stop-voice'].includes(action))return;
    if(action==='send')return submit();if(action==='next')return next();if(action==='finish')return finish();if(action==='voice')return startVoice();
    if(action==='stop-voice'){if(a.voiceStatus==='requesting'){cancel();render();}else stopVoice();return;}
    if(action==='hear')return hear();if(action==='hear-sample')return hear(question()?.hint);
    if(action==='mission')return reset(el.dataset.mission);if(action==='restart')return reset(a.mission);
    if(action==='speak'){root.setMode('speak');root.prepareSpeaking(60);return;}
    if(action==='whole'){state().sceneAnchor=null;cancel();current=null;session();render();return;}
    if(action==='goals'){a.previousPhase=a.phase;a.phase='goals';}
    if(action==='back')a.phase=a.previousPhase||'answer';
    if(action==='support'&&['guided','independent'].includes(el.dataset.support))a.support=el.dataset.support;
    if(action==='hint'){a.hint=!a.hint;if(a.hint)a.hintUsed=true;}
    if(action==='sample'){a.open=a.open.includes('sample')?a.open.filter(x=>x!=='sample'):[...a.open,'sample'];if(a.open.includes('sample'))a.responses[a.turn].hintUsed=true;}
    if(action==='revise'&&a.phase==='feedback'){a.phase='answer';a.draft=a.responses[a.turn].text;a.open=[];}
    render();
  }
  document.addEventListener('click',e=>{const el=e.target.closest?.('[data-talk-action]');if(!el||el.disabled)return;e.preventDefault();act(el.dataset.talkAction,el);});
  document.addEventListener('input',e=>{if(e.target.id==='talk-answer')updateDraft(e.target.value);});
  document.addEventListener('toggle',e=>{const key=e.target.dataset?.talkSupport;if(!['history','options'].includes(key))return;const a=session();a.open=a.open.filter(x=>x!==key);if(e.target.open)a.open.push(key);},true);
  for(const name of ['setMode','openLesson','goHome']){const old=root[name];root[name]=function(...args){if(name!=='setMode'||args[0]!=='talk')cancel();return old.apply(this,args);};}
  root.startConversationRecognition=startVoice;root.stopConversationRecognition=cancel;root.submitConversation=submit;root.nextConversation=next;root.resetConversation=()=>reset(session().mission);root.playCoachPrompt=()=>hear();root.conversationContent=markup;
  root.addEventListener?.('pagehide',cancel);
  root.EngBookTalk=Object.freeze({markup,missions,session,question,feedback,submit,next,finish,reset,updateDraft,startVoice,stopVoice,cancel,act,busy:()=>Boolean(current&&current.voiceStatus!=='idle')});
})(typeof window!=='undefined'?window:globalThis);
