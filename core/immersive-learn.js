/* One reviewed learning topic over the full lesson photograph. No lesson data
   is rewritten and viewing a topic never claims mastery or completion. */
(function(root){
  'use strict';
  const state=()=>root.EngBookEventContext.getRoot('state');
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const tabs=[['picture','Picture'],['phrases','Phrases'],['grammar','Grammar'],['scenarios','Scenarios']];
  const extras=[['sentences','Sentence models'],['collocations','Collocations'],['ideas','Speaking ideas'],['memory','Your memories'],['imagine','Imagine'],['bank','Language bank'],['connections','Scene connections'],['notes','Close-up notes'],['readings','Human readings']];
  const levels=['A1','A2','B1','B2','C1'];
  const labels=Object.fromEntries([...tabs,...extras]);
  const g=()=>root.activeGold?.()||{};
  const pack=()=>root.EngBookContent?.getPack?.(session().lesson)||{lessonId:session().lesson,content:g(),hotspots:state().lesson?.hotspots||[]};
  const level=()=>root.EngAppLevelAware?.levelFor(pack(),'global')||session().level||'A2';
  const band=()=>({A1:'A1–A2',A2:'A1–A2',B1:'B1–B2',B2:'B1–B2',C1:'C1–C2'}[level()]);
  const glyphs={back:'<path d="m14 6-6 6 6 6"/>',next:'<path d="m10 6 6 6-6 6"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',sound:'<path d="m11 5-6 5H2v4h3l6 5Zm4 3a6 6 0 0 1 0 8"/>',pin:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>'};
  const icon=key=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${glyphs[key]||glyphs.eye}</svg>`;
  let current=null;
  function session(){
    const id=Number(state().lesson?.id??state().lesson?.lessonId);
    if(current?.lesson!==id)current={lesson:id,tab:'picture',indices:Object.fromEntries([...tabs,...extras].map(([key])=>[key,0])),peek:false,level:'A2',allForms:false,phraseChoices:{},grammarChoices:{}};
    return current;
  }
  function allSteps(tab=session().tab){
    const s=state(),g=root.activeGold?.()||{},hs=s.lesson?.hotspots||[],rows=[];
    const add=(kind,title,text,extra={})=>{if(typeof text==='string'&&text.trim())rows.push({kind,title,text,...extra});};
    const lang=h=>root.EngBookPictureLanguage.hotspot(h,root.hotspotDetail?.(h)||{},g);
    if(tab==='picture'){
      add('Scene overview','See the whole scene',g.overview);
      for(const [i,r] of (g.evidence||[]).entries()){
        const row=Array.isArray(r)?{label:r[0],detail:r[1]}:r;
        const classes={
          'visible-fact':['Visible fact','Describe what the picture shows.'],
          'supported-inference':['Possible interpretation','The picture suggests this; it does not confirm it.'],
          boundary:['Accuracy boundary','Keep unknown identities, intentions and events separate from visible details.'],
          unsupported:['Not established','The photograph does not provide evidence for this claim.'],
          story:['Imagined scene','This is a fictional extension, not a fact about the photograph.']
        };
        const [kind,note]=classes[row.claimClass]||classes['visible-fact'];
        add(kind,row.label||row.title||`Detail ${i+1}`,row.detail||row.text||row.description,{note});
      }
      const guesses=typeof g.inference==='string'?[['Possibility',g.inference]]:Object.entries(g.inference||{});
      for(const [key,text] of guesses)add('Possible interpretation',key==='high'?'What the scene may suggest':key==='medium'?'Another possibility':key==='low'?'What remains uncertain':key,text,{note:'The photograph suggests possibilities; it does not establish identities, intentions or history.'});
      for(const [key,text] of Object.entries(g.timeline||{}))add(key==='now'?'Visible present':'Imagined time frame',key==='before'?'Before this moment':key==='next'?'A possible next moment':'What is happening now',text,{note:key==='now'?'Compare this description with visible details.':'The photograph does not show this event. Treat it as a possible extension.'});
      add('Accuracy boundary','What the picture cannot tell us',g.guardrail);
    }else if(tab==='phrases'){
      hs.forEach((h,index)=>{
        const phrases=lang(h).phrases,formIndex=Math.max(0,Math.min(session().phraseChoices[h.id]||0,phrases.length-1)),row=phrases[formIndex];
        if(row)add('Useful phrases',h.en,row.example||h.example,{anchorIndex:index,formIndex,phrases,detail:row.text,note:row.kind||'Use this phrase in your own picture description.',task:row.task});
      });
    }else if(tab==='grammar'){
      const grammar=g.grammar||{},guide=g.picturePractice?.grammarGuide||{};
      const fusion=g.levelAware?.grammarFusion?.[level()];
      if(fusion)add('Level focus',fusion.focus,fusion.example,{note:fusion.why,languageLevel:level()});
      add('Lesson focus',grammar.title||guide.title||'Grammar in this picture',grammar.explainer||guide.note,{pattern:guide.pattern,example:guide.practice,note:'A language example does not establish a new fact about the photograph.'});
      for(const [i,text] of (grammar.examples||[]).entries())add('Lesson example',`Example ${i+1}`,text,{note:'Compare the wording with the scene. Keep interpretations cautious.'});
      for(const [modelBand,text] of Object.entries(grammar.models||{}))add('Model description',modelBand,text,{modelBand,note:'Make your own attempt before using this model for comparison. These are practice models, not a proficiency assessment.'});
      hs.forEach((h,index)=>lang(h).grammar.forEach((row,formIndex)=>add(row.evidence==='visible'?'In this picture':row.evidence==='hypothetical'?'Imagined time frame':row.evidence==='interpretation'?'Possible interpretation':'Question practice',row.tense,row.sentence,{anchorIndex:index,formIndex,formKey:row.key,detail:h.en,pattern:row.pattern,note:row.note,task:row.task})));
    }else if(tab==='scenarios'){
      (g.picturePractice?.scenarios||[]).forEach((source,index)=>{const row=root.EngBookPictureLanguage.scenario(source,level()),boundary=row.boundary;add(boundary.label,row.title,row.text,{note:boundary.copy,scenarioIndex:index,pattern:row.grammarFocus,languageLevel:row.level});});
    }else{
      const refs=ids=>{const i=hs.findIndex(h=>(ids||[]).includes(h.id));return i<0?{}:{anchorIndex:i,referenceOnly:true};};
      const practiceNote='Language practice. Keep visible facts separate from guesses and invented events.';
      if(tab==='sentences')for(const r of g.levelAware?.sentenceLadders||[])add(r.claimClass==='visible-fact'?'Visible fact':r.claimClass==='supported-inference'?'Possible interpretation':'Imagined explanation',r.id.replace(/-/g,' '),r.levels?.[level()],{...refs(r.evidenceHotspotIds),languageLevel:level(),note:practiceNote});
      if(tab==='collocations')for(const r of g.levelAware?.collocationBank?.[level()]||[])add('Word combination',r.text,r.text,{...refs(r.evidenceHotspotIds),note:practiceNote,languageLevel:level()});
      if(tab==='ideas')for(const [i,r] of (g.levelAware?.ideaBank?.[level()]||[]).entries())add('Speaking idea',r.prompt,r.sceneCue||r.prompt,{task:(r.scaffold||[]).join(' '),...refs(r.evidenceHotspotIds),note:practiceNote,languageLevel:level()});
      if(tab==='memory'){
        const m=g.memoryLayer||{},note='Personal language practice. These example memories are invented; they are not facts about the people in the photo.';
        for(const r of m.models||[]){const v=r.levels?.[level()];add('Memory model',r.title,v?.text,{pattern:v?.grammarFocus,task:(v?.collocations||[]).join(' · '),...refs(r.sceneTriggerIds),note,languageLevel:v?level():null});}
        for(const [i,r] of (m.triggers||[]).entries())add('Memory trigger',r.title||r.label||`Trigger ${i+1}`,r.prompt||r.text||r.cue,{note});
        for(const [i,text] of (g.memoryFrames||[]).entries())add('Speaking frame',`Frame ${i+1}`,text,{note});
        for(const [i,text] of (g.personalQuestions||[]).entries())add('Your experience',`Question ${i+1}`,text,{note:'Personal details are optional. You may invent an answer and label it as fictional.'});
        const reflections=Array.isArray(m.reflectionPrompts)?m.reflectionPrompts:[m.reflectionPrompts?.[level()]].filter(Boolean);
        for(const [i,text] of reflections.entries())add('Reflection',`Reflection ${i+1}`,typeof text==='string'?text:text.prompt,{note});
        const comparison=m.compareToScene?.[level()];if(comparison)add('Photo & memory','Compare with the picture',comparison.prompt,{note:comparison.rule||note});
        const fusion=m.grammarFusion?.[level()];if(fusion)add('Memory grammar',fusion.focus,fusion.example,{note:`${fusion.why||''} ${note}`.trim()});
        for(const r of m.collocationBank?.[level()]||[])add('Memory phrase',typeof r==='string'?r:r.text,typeof r==='string'?r:r.text,{note});
        for(const r of m.ideaBank?.[level()]||[])add('Memory idea',r.prompt,r.sceneCue||r.prompt,{task:(r.scaffold||[]).join(' '),note});
      }
      if(tab==='imagine'){
        const il=g.imaginationLayer||root.ENGBOOK_IMAGINATION_DNA?.[session().lesson]||{},v=il.levels?.[level()]||{},note=il.imageTruthBoundary||'Fictional extension. The photograph does not show these events.';
        add('Imagined scene',il.title||'A fictional scene',v.scenario||il.scenario||g.story,{note,pattern:v.languageFocus,task:v.dreamPrompt||il.dreamPrompt,languageLevel:il.levels?.[level()]?level():null});
        add('Your memory','Make it your own',v.memoryPrompt||il.memoryBridgePrompt,{note,task:v.reflection});
        for(const [i,text] of (il.selfQuestions||[]).entries())add('Imagination prompt',`Question ${i+1}`,text,{note});
      }
      if(tab==='bank')for(const [i,text] of (g.languageBank||[]).entries())add('Reusable language',`Phrase ${i+1}`,text,{note:practiceNote});
      if(tab==='connections')for(const [i,r] of (g.sceneCombinations||[]).entries())add(r.claimClass==='visible-fact'?'Visible fact':'Possible interpretation',r.title||r.label||`Connection ${i+1}`,r.sentence,{...refs(r.evidenceHotspotIds),note:practiceNote});
      if(tab==='notes')for(const [i,r] of (g.micro||[]).entries())add('Close-up note',Array.isArray(r)?r[0]:r.label||r.title||`Detail ${i+1}`,typeof r==='string'?r:Array.isArray(r)?r[1]:r.detail||r.text,{note:practiceNote});
      if(tab==='readings')for(const key of ['relationshipPossibilities','emotionalPossibilities','explanationPossibilities'])for(const [i,r] of (g.humanReading?.[key]||[]).entries())add('Possible interpretation',r.title||`${key.replace(/Possibilities/,'')} ${i+1}`,r.text,{...refs(r.evidenceHotspotIds),note:'A supported reading remains uncertain; the picture cannot confirm identity, exact feelings or history.'});
    }
    return rows;
  }
  function steps(tab=session().tab){
    const rows=allSteps(tab);if(tab!=='grammar')return rows;
    const allowed={A1:['now'],A2:['now','question'],B1:['now','question','past','future'],B2:['now','question','past','perfect','future'],C1:['now','question','past','perfect','future']}[level()];
    const selected=session().allForms?rows:rows.filter(r=>(!r.modelBand||r.modelBand===band())&&(!r.formKey||allowed.includes(r.formKey)));
    const grouped=[],anchors=new Map();
    for(const row of selected){
      if(!Number.isInteger(row.anchorIndex)){grouped.push(row);continue;}
      if(!anchors.has(row.anchorIndex)){const entry={...row,forms:[]};anchors.set(row.anchorIndex,entry);grouped.push(entry);}
      anchors.get(row.anchorIndex).forms.push(row);
    }
    for(const [index,entry] of anchors){const h=state().lesson.hotspots[index],choice=session().grammarChoices[h.id],row=entry.forms.find(r=>r.formIndex===choice)||entry.forms[0];Object.assign(entry,row,{title:h.en,detail:row.title});}
    return grouped;
  }
  function availableExtras(){return extras.filter(([key])=>allSteps(key).length);}
  function setLevel(value){if(!levels.includes(value))return;root.EngBookSpeech?.stopSpeaking?.();const a=session();a.level=value;root.EngAppLevelAware?.setLesson(a.lesson,value);a.indices[a.tab]=0;render();}
  function selectPhrase(index){const row=topic();if(!row?.phrases?.[index])return;session().phraseChoices[state().lesson.hotspots[row.anchorIndex].id]=index;root.EngBookSpeech?.stopSpeaking?.();render();}
  function selectForm(index){const row=topic(),form=row?.forms?.find(r=>r.formIndex===Number(index));if(!form)return;session().grammarChoices[state().lesson.hotspots[row.anchorIndex].id]=form.formIndex;root.EngBookSpeech?.stopSpeaking?.();render();}
  function topic(){const a=session(),rows=steps();a.indices[a.tab]=Math.max(0,Math.min(a.indices[a.tab],rows.length-1));return rows[a.indices[a.tab]];}
  function render(focus){root.render();if(focus)document.querySelector(`[data-learn-action="${focus}"]`)?.focus({preventScroll:true});}
  function choose(tab,index=0){const a=session();if(!labels[tab])return;root.EngBookSpeech?.stopSpeaking?.();a.tab=tab;a.indices[tab]=Math.max(0,Math.min(Number(index)||0,steps(tab).length-1));a.peek=false;render();document.querySelector('.learn-topic')?.focus({preventScroll:true});}
  function move(delta){const a=session();choose(a.tab,a.indices[a.tab]+delta);}
  function toggle(){session().peek=!session().peek;render('peek');}
  function listen(){const row=topic();if(row)root.speak(row.text,.82,{voiceRole:session().indices[session().tab]%2?'female':'male'});}
  function openDetail(){const row=topic();if(Number.isInteger(row?.anchorIndex))root.EngBookSceneCanvas.openLearningDetail(row.anchorIndex,row.referenceOnly?'word':session().tab,row.formIndex);else if(Number.isInteger(row?.scenarioIndex))root.EngBookSceneCanvas.chooseScenario(row.scenarioIndex,level());}
  function markup(){
    const a=session(),rows=steps(),row=topic(),index=a.indices[a.tab];
    return `<section class="immersive-learn ${a.peek?'is-peeking':''}" aria-label="Learn from the picture">
      <div class="learn-veil" aria-hidden="true"></div>
      <div class="learn-workspace" ${a.peek?'hidden':''}>
        <div class="learn-section-tabs" role="tablist" aria-label="Lesson learning sections">${tabs.map(([key,label])=>`<button role="tab" aria-selected="${a.tab===key}" data-learn-action="tab" data-learn-tab="${key}">${label}</button>`).join('')}</div>
        <div class="learn-controls"><label>Level<select aria-label="Lesson language level" data-learn-level>${levels.map(l=>`<option ${l===level()?'selected':''}>${l}</option>`).join('')}</select></label><select aria-label="More learning topics" data-learn-section><option value="">More topics…</option>${availableExtras().map(([key,label])=>`<option value="${key}" ${a.tab===key?'selected':''}>${esc(label)}</option>`).join('')}</select></div>
        <div class="learn-topic-body"><article class="learn-topic" role="tabpanel" tabindex="-1" aria-label="${esc(labels[a.tab])}">
          ${a.tab==='grammar'?`<label class="learn-all-forms"><input type="checkbox" data-learn-all-forms ${a.allForms?'checked':''}> All forms & models</label>`:''}
          <label class="learn-topic-picker"><span class="sr-only">Choose a learning topic</span><select aria-label="Choose a learning topic" data-learn-topic>${rows.map((r,i)=>`<option value="${i}" ${i===index?'selected':''}>${String(i+1).padStart(2,'0')} / ${rows.length} · ${esc(r.kind)} · ${esc(r.title)}</option>`).join('')}</select></label>
          ${row?.forms?`<label class="learn-form-picker">Grammar form<select aria-label="Grammar form for this detail" data-learn-form>${row.forms.map(r=>`<option value="${r.formIndex}" ${r.formIndex===row.formIndex?'selected':''}>${esc(r.title)}</option>`).join('')}</select></label>`:''}
          ${row?`<span class="learn-kicker">${esc(row.kind)}${row.languageLevel?` · ${esc(row.languageLevel)}`:''}</span><h1>${esc(row.title)}</h1>${row.phrases?`<div class="learn-phrase-choices" role="group" aria-label="Phrases for this detail">${row.phrases.map((p,i)=>`<button data-learn-action="phrase" data-index="${i}" aria-pressed="${i===row.formIndex}">${esc(p.text)}</button>`).join('')}</div>`:row.detail?`<span class="learn-detail-label">${esc(row.detail)}</span>`:''}<p class="learn-main-copy">${esc(row.text)}</p>${row.pattern?`<div class="learn-rule"><b>${esc(row.pattern)}</b></div>`:''}${row.example?`<p class="learn-example">${esc(row.example)}</p>`:''}${row.note?`<p class="learn-boundary">${esc(row.note)}</p>`:''}${row.task?`<details class="learn-task"><summary>Your turn</summary><p>${esc(row.task)}</p></details>`:''}<div class="learn-topic-actions"><button data-learn-action="listen">${icon('sound')} Listen</button>${Number.isInteger(row.anchorIndex)||Number.isInteger(row.scenarioIndex)?`<button data-learn-action="detail">${icon('pin')} Open on picture</button>`:''}</div>`:'<h1>Look at the picture</h1><p class="learn-main-copy">Choose another section to continue.</p>'}
          ${!g().levelAware?'<p class="learn-level-note">Level selects a description model and grammar practice. Other wording is shared across levels.</p>':''}
        </article></div>
        <footer class="learn-reader-footer"><button data-learn-action="prev" aria-label="Previous learning topic" ${index===0?'disabled':''}>${icon('back')}</button><button data-learn-action="peek">${icon('eye')} Show picture</button><button data-learn-action="next" aria-label="Next learning topic" ${index>=rows.length-1?'disabled':''}>${icon('next')}</button></footer>
        <div class="learn-topic-progress" role="progressbar" aria-label="Learning topic position" aria-valuenow="${rows.length?index+1:0}" aria-valuemin="0" aria-valuemax="${rows.length}"><i style="width:${rows.length?(index+1)/rows.length*100:0}%"></i></div>
      </div>
    </section>`;
  }
  document.addEventListener('click',e=>{
    const el=e.target.closest('[data-learn-action]');if(!el||state().mode!=='learn')return;e.preventDefault();
    const action=el.dataset.learnAction;
    if(action==='tab')choose(el.dataset.learnTab,session().indices[el.dataset.learnTab]);
    else if(action==='prev'||action==='next')move(action==='next'?1:-1);
    else if(action==='peek')toggle();else if(action==='listen')listen();else if(action==='detail')openDetail();else if(action==='phrase')selectPhrase(Number(el.dataset.index));
  });
  document.addEventListener('change',e=>{if(state().mode!=='learn')return;if(e.target.matches('[data-learn-topic]'))choose(session().tab,e.target.value);else if(e.target.matches('[data-learn-form]'))selectForm(e.target.value);else if(e.target.matches('[data-learn-level]'))setLevel(e.target.value);else if(e.target.matches('[data-learn-section]')&&e.target.value)choose(e.target.value,session().indices[e.target.value]);else if(e.target.matches('[data-learn-all-forms]')){session().allForms=e.target.checked;session().indices.grammar=0;root.EngBookSpeech?.stopSpeaking?.();render();}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&state().mode==='learn'&&session().peek){e.preventDefault();e.stopImmediatePropagation();toggle();}});
  root.EngBookLearn=Object.freeze({steps,allSteps,session,topic,markup,choose,move,toggle,listen,openDetail,setLevel,selectPhrase,selectForm,level,availableExtras});
})(typeof window!=='undefined'?window:globalThis);
