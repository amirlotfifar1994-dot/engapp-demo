/* EngBook v0.72 — mark/highlight Sentence Builder, Language Bank and Grammar. */
(function(root){
  'use strict';
  const PM=root.EngBookPersonalMarks;if(!PM)return;
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const q=s=>String(s??'').replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g,' ');
  const slug=s=>String(s??'item').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80)||'item';
  const lessonId=()=>Number(activeLessonId?.()||state?.lesson?.id||progress?.lastLesson||1);
  function target(type,id,lid=lessonId()){return PM.target({lessonId:Number(lid),type,id});}
  function meta(label,text,category){return {label:String(label||''),text:String(text||''),category:String(category||'')};}
  function status(type,id,lid=lessonId()){const t=target(type,id,lid);return {t,marked:PM.isMarked(progress,t),highlighted:PM.isHighlighted(progress,t)};}
  root.togglePersonalContentMark=function(type,id,label,text,category){const s=status(type,id),before=s.marked;PM.toggleMark(progress,s.t,meta(label,text,category));saveProgress();haptic(8);toast(before?'Mark removed':'Added to My Marks');render();};
  root.togglePersonalContentHighlight=function(type,id,label,text,category){const s=status(type,id),before=s.highlighted;PM.toggleHighlight(progress,s.t,meta(label,text,category));saveProgress();haptic(8);toast(before?'Highlight removed':'Highlighted for review');render();};
  function tools(type,id,label,text,category){const s=status(type,id);return `<div class="v72-inline-tools"><button class="${s.marked?'active mark':''}" data-eng-v52-click="togglePersonalContentMark('${q(type)}','${q(id)}','${q(label)}','${q(text)}','${q(category)}')">${s.marked?'★':'☆'} <span>${s.marked?'Marked':'Mark'}</span></button><button class="${s.highlighted?'active highlight':''}" data-eng-v52-click="togglePersonalContentHighlight('${q(type)}','${q(id)}','${q(label)}','${q(text)}','${q(category)}')">▰ <span>${s.highlighted?'Highlighted':'Highlight'}</span></button></div>`;}
  function classes(type,id){const s=status(type,id);return `${s.marked?' v72-is-marked':''}${s.highlighted?' v72-is-highlighted':''}`;}
  function personalKey(type,id,lid=lessonId()){return target(type,id,lid).key;}
  function builderSets(){const x=activeGold?.()?.recall?.builderSentences;if(Array.isArray(x)&&x.length)return x;try{if(typeof l01BuilderSets==='function'&&lessonId()===1)return l01BuilderSets();}catch(e){}return Array.isArray(root.BUILDER_SENTENCES)?root.BUILDER_SENTENCES:[];}
  function builderText(i){const sets=builderSets(),parts=sets.length?sets[Number(i)%sets.length]:[];return Array.isArray(parts)?parts.join(' '):String(parts||'');}

  // Interactive Sentence Builder card: the active sentence itself can be marked/highlighted.
  if(typeof builderContent==='function'){
    const _builderContent=builderContent;
    builderContent=function(){let html=_builderContent();if(![1,2].includes(lessonId()))return html;const i=Number(state.builderIndex||0),text=builderText(i);if(!text)return html;const id=`builder-${i}`,label=`Sentence Builder ${i+1}`,key=personalKey('sentence',id);const bar=`<div class="v72-builder-save${classes('sentence',id)}" data-personal-key="${esc(key)}"><div><span>PERSONAL NOTEBOOK</span><b>${esc(text)}</b></div>${tools('sentence',id,label,text,'Sentence Builder')}</div>`;return html.replace('<div class="answer-zone',`${bar}<div class="answer-zone`);};
  }

  function markableSentenceLadder(g){const rows=(g?.recall?.builderSentences||[]).map((parts,i)=>({i,text:Array.isArray(parts)?parts.join(' '):String(parts||'')}));return `<div class="l01-sentence-ladder v72-sentence-ladder">${rows.map(({i,text})=>{const id=`builder-${i}`,key=personalKey('sentence',id);return `<article class="${classes('sentence',id)}" data-personal-key="${esc(key)}"><i>S${i+1}</i><p>${esc(text)}</p><div class="v72-row-actions"><button data-eng-v52-click="speak('${q(text)}',.84)">${icon('volume')} Listen</button>${tools('sentence',id,`Sentence Builder ${i+1}`,text,'Sentence Builder')}</div></article>`;}).join('')}</div>`;}
  function replaceSentenceLadder(html,g){const fresh=markableSentenceLadder(g);return html.replace(/<div class="l01-sentence-ladder">[\s\S]*?<\/div>(?=<div class="builder-card)/,fresh);}
  if(typeof l01BuildStep==='function'){const _l1Build=l01BuildStep;l01BuildStep=function(g){return replaceSentenceLadder(_l1Build(g),g);};}
  if(typeof l02BuildStep==='function'){const _l2Build=l02BuildStep;l02BuildStep=function(g){return replaceSentenceLadder(_l2Build(g),g);};}

  function languageBank(g){return Array.isArray(g?.languageBank)?g.languageBank:[];}
  function markableLanguageBank(g){return `<div class="l01-language-bank v72-language-bank">${languageBank(g).map((p,i)=>{const id=`language-${i}`,key=personalKey('phrase',id);return `<article class="v72-language-item${classes('phrase',id)}" data-personal-key="${esc(key)}"><div><i>${String(i+1).padStart(2,'0')}</i><b>${esc(p)}</b></div><div class="v72-row-actions"><button data-eng-v52-click="speak('${q(p)}',.82)">${icon('volume')} Listen</button>${tools('phrase',id,p,p,'Language Bank')}</div></article>`;}).join('')}</div>`;}
  function replaceLanguageBank(html,g){return html.replace(/<div class="l01-language-bank">[\s\S]*?<\/div>(?=<div class="l01-memory-grid">)/,markableLanguageBank(g));}
  if(typeof l01LanguageStep==='function'){const _l1Language=l01LanguageStep;l01LanguageStep=function(g){return replaceLanguageBank(_l1Language(g),g);};}
  if(typeof l02LanguageStep==='function'){const _l2Language=l02LanguageStep;l02LanguageStep=function(g){return replaceLanguageBank(_l2Language(g),g);};}

  function grammarExamples(g){return Array.isArray(g?.grammar?.examples)?g.grammar.examples:[];}
  function markableGrammarExamples(g){return `<div class="l01-grammar-examples v72-grammar-examples">${grammarExamples(g).map((e,i)=>{const id=`example-${i}`,key=personalKey('grammar',id);return `<article class="${classes('grammar',id)}" data-personal-key="${esc(key)}"><i>${i+1}</i><p>${highlightGrammar(e)}</p><div class="v72-row-actions"><button data-eng-v52-click="speak('${q(e)}',.82)">${icon('volume')} Listen</button>${tools('grammar',id,`Grammar example ${i+1}`,e,'Grammar Example')}</div></article>`;}).join('')}</div>`;}
  function markableProgression(g){const models=g?.grammar?.models||{};return `<div class="l01-model-progression v72-model-progression">${Object.entries(models).map(([level,text])=>{const id=`model-${slug(level)}`,key=personalKey('grammar',id);return `<article class="${classes('grammar',id)}" data-personal-key="${esc(key)}"><span>${esc(level)}</span><p>${esc(text)}</p><div class="v72-row-actions"><button data-eng-v52-click="speak('${q(text)}',.86)">${icon('volume')} Listen</button>${tools('grammar',id,`${level} model`,text,'Grammar Model')}</div></article>`;}).join('')}</div>`;}
  function replaceGrammar(html,g){html=html.replace(/<div class="l01-grammar-examples">[\s\S]*?<\/div>/,markableGrammarExamples(g));html=html.replace(/<div class="l01-model-progression">[\s\S]*?<\/div>/,markableProgression(g));const models=g?.grammar?.models||{},level=state.level&&models[state.level]?state.level:(models['B1–B2']?'B1–B2':Object.keys(models)[0]),text=models[level];if(text){const id=`model-${slug(level)}`,key=personalKey('grammar',id),insert=`<div class="v72-current-model${classes('grammar',id)}" data-personal-key="${esc(key)}">${tools('grammar',id,`${level} model`,text,'Grammar Model')}</div>`;const needle=`<p>${esc(text)}</p>`;html=html.replace(needle,needle+insert);}return html;}
  if(typeof l01GrammarStep==='function'){const _l1Grammar=l01GrammarStep;l01GrammarStep=function(g){return replaceGrammar(_l1Grammar(g),g);};}
  if(typeof l02GrammarStep==='function'){const _l2Grammar=l02GrammarStep;l02GrammarStep=function(g){return replaceGrammar(_l2Grammar(g),g);};}

  // Deep-link library items to the exact learning stage, then focus the saved row.
  function focusPersonalItem(key){state.personalFocusKey=key;setTimeout(()=>{const el=[...document.querySelectorAll('[data-personal-key]')].find(x=>x.dataset.personalKey===key);if(!el)return;el.scrollIntoView({behavior:'smooth',block:'center'});el.classList.add('v72-focus-pulse');setTimeout(()=>el.classList.remove('v72-focus-pulse'),1800);},100);}
  const _openPersonalMark=root.openPersonalMark;
  root.openPersonalMark=function(key){const item=PM.list(progress).find(x=>x.key===key);if(!item)return _openPersonalMark?.(key);if(!['sentence','phrase','grammar'].includes(item.type))return _openPersonalMark?.(key);root.closeMyMarksLibrary?.();openLesson(Number(item.lessonId));setMode('learn');if(Number(item.lessonId)===1){if(item.type==='sentence')state.l01JourneyStep='build';if(item.type==='phrase')state.l01JourneyStep='language';if(item.type==='grammar')state.l01JourneyStep='grammar';}if(Number(item.lessonId)===2){if(item.type==='sentence')state.l02JourneyStep='build';if(item.type==='phrase')state.l02JourneyStep='language';if(item.type==='grammar')state.l02JourneyStep='grammar';}render();focusPersonalItem(key);};

  root.ENGBOOK_RUNTIME={...(root.ENGBOOK_RUNTIME||{}),build:BUILD_INFO.tag,personalMarksEverywhere:true,markableLearningTypes:['hotspot','scenario','sentence','phrase','grammar'],personalMarkDeepLinks:['explore','scenario','build','language','grammar']};
})(typeof window!=='undefined'?window:globalThis);
