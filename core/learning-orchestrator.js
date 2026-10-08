/* EngBook v0.27 — local learning orchestrator.
   Decides what to practice next from scene-specific progress. No remote AI. */
(function(root){
  'use strict';
  const lessonLabel=id=>root.EngBookCoursePath?.label(id)||String(id).padStart(2,'0');
  const clamp=(n,a=0,b=100)=>Math.max(a,Math.min(b,Number(n)||0));
  const avg=arr=>arr.length?Math.round(arr.reduce((a,b)=>a+b,0)/arr.length):0;
  const clone=v=>JSON.parse(JSON.stringify(v??null));

  function lessonSignals(ctx={}){
    const pack=ctx.pack||{};
    const lesson=ctx.lesson||{};
    const metrics=ctx.metrics||{};
    const discovered=Array.isArray(ctx.discovered)?ctx.discovered:[];
    const hotspotCount=Math.max(1,(lesson.hotspots||pack.hotspots||[]).length||1);
    const practice=metrics.practice||{};
    const conversation=metrics.conversation||{};
    const coverage=metrics.coverage||{};
    const evidence=metrics.evidence||{};
    const capabilities=Array.isArray(pack.capabilities)?pack.capabilities:[];
    const recallAttempts=Number(practice.attempts||0);
    const recallCorrect=Number(practice.correct||0);
    const recall=recallAttempts?clamp(Math.round(recallCorrect/recallAttempts*100)):0;
    const discovery=clamp(Math.round(discovered.length/hotspotCount*100));
    const describe=clamp(Math.max(Number(coverage.best||0),Number(metrics.lastSpeechScore||0)));
    const evidenceScore=clamp(Number(evidence.best||0));
    const converse=capabilities.includes('conversation')?clamp(Number(conversation.best||0)):null;
    const precision=clamp(avg([describe,evidenceScore,recall||Math.min(60,discovery)]));
    const available=[discovery,recall,describe,evidenceScore].concat(converse===null?[]:[converse]);
    const balance=clamp(avg(available));
    return {discovery,recall,describe,evidence:evidenceScore,conversation:converse,precision,balance,hotspotCount,capabilities};
  }

  function nextAction(ctx={}){
    const s=lessonSignals(ctx);
    const due=Number(ctx.dueCount||0);
    const mistakes=Number(ctx.mistakeCount||0);
    const id=Number(ctx.lessonId||ctx.lesson?.id||1);
    if(s.discovery<42) return {key:'explore',mode:'explore',label:'Map the scene',short:'Explore',reason:`You have mapped ${s.discovery}% of the visual anchors. Build a stronger scene map before speaking freely.`,priority:96,icon:'compass'};
    if((due>=2||mistakes>=2)&&s.recall<78) return {key:'recall',mode:'practice',label:'Repair weak anchors',short:'Recall',reason:`${Math.max(due,mistakes)} items need retrieval practice. Strengthen them before another long description.`,priority:92,icon:'target'};
    if(s.describe<68) return {key:'describe',mode:'speak',label:'Describe the whole scene',short:'Describe',reason:`Your strongest scene-description signal is ${s.describe}%. A 60-second attempt will improve coverage and organization.`,priority:88,icon:'mic'};
    if(s.evidence<78) return {key:'evidence',mode:'learn',label:'Tighten evidence control',short:'Evidence',reason:`Evidence control is ${s.evidence}%. Practice separating visible fact from supported inference.`,priority:84,icon:'eye'};
    if(s.conversation!==null&&s.conversation<72) return {key:'conversation',mode:'talk',label:'Turn description into dialogue',short:'Converse',reason:`Conversation is the weakest released communication signal (${s.conversation}%). Keep the same scene and add follow-up turns.`,priority:80,icon:'spark'};
    return {key:'review',mode:'practice',label:'Run a smart review',short:'Review',reason:`Lesson ${lessonLabel(id)} is balanced. Use spaced retrieval to keep the scene language available.`,priority:70,icon:'refresh'};
  }

  function missionDeck(ctx={}){
    const s=lessonSignals(ctx),next=nextAction(ctx);
    const caps=s.capabilities;
    const items=[
      {key:'precision',mode:s.discovery<70?'explore':'speak',label:s.discovery<70?'Find 3 missed details':'Precision pass',time:'2 min',target:s.discovery<70?'Map unseen visual anchors.':'Describe with specific visual nouns and actions.',score:s.discovery<70?s.discovery:s.precision,icon:s.discovery<70?'compass':'mic'},
      {key:'evidence',mode:'learn',label:'Fact → inference',time:'2 min',target:'Say one fact, then one cautious inference with a visible clue.',score:s.evidence,icon:'eye'},
      caps.includes('conversation')
        ?{key:'transfer',mode:'talk',label:'Meaning transfer',time:'3 min',target:'Make a listener reconstruct the scene through connected turns.',score:s.conversation||0,icon:'spark'}
        :{key:'retrieval',mode:'practice',label:'Fast retrieval',time:'2 min',target:'Recall labels and one source-grounded sentence.',score:s.recall,icon:'target'}
    ];
    items.sort((a,b)=>a.score-b.score);
    return {next,items};
  }

  function categoryReviewQueue(ctx={}){
    const lessons=Array.isArray(ctx.lessons)?ctx.lessons:[];
    const metrics=ctx.metrics||{};
    const discovered=ctx.discovered||{};
    const completed=ctx.completed||{};
    const mistakes=Array.isArray(ctx.mistakes)?ctx.mistakes:[];
    const queue=[];
    for(const l of lessons.filter(x=>x.ready)){
      const id=Number(l.id),m=metrics[id]||{};
      const sig=lessonSignals({lessonId:id,lesson:l.lesson||{},pack:l.pack||{capabilities:l.capabilities||[]},metrics:m,discovered:discovered[id]||[]});
      const scopedMistakes=mistakes.filter(x=>String(x?.key||x?.id||'').startsWith(`l${id}:`)).length;
      const completionKeys=['explore','evidence','practice','speaking','talk'];
      const completedCount=completionKeys.filter(k=>completed[`l${id}_${k}`]).length;
      let urgency=(100-sig.balance)*.55+scopedMistakes*8+(5-completedCount)*5;
      if(id===1&&mistakes.length&&!scopedMistakes)urgency+=Math.min(18,mistakes.length*2);
      const action=nextAction({lessonId:id,lesson:l.lesson||{},pack:l.pack||{capabilities:l.capabilities||[]},metrics:m,discovered:discovered[id]||[],mistakeCount:scopedMistakes});
      queue.push({lessonId:id,title:l.title||`Lesson ${id}`,image:l.image||'',urgency:Math.round(urgency),balance:sig.balance,action});
    }
    return queue.sort((a,b)=>b.urgency-a.urgency||a.lessonId-b.lessonId).slice(0,5);
  }

  function supportProfile(value){
    const key=['guided','balanced','independent'].includes(value)?value:'balanced';
    return {
      key,
      label:key==='guided'?'Guided':key==='independent'?'Independent':'Balanced',
      description:key==='guided'?'More prompts and visible support.':key==='independent'?'Minimal scaffolding; speak first.':'Help appears only when it improves the next move.'
    };
  }

  function launchMode(action,support='balanced'){
    const profile=supportProfile(support);
    if(profile.key==='independent'&&['explore','recall','evidence'].includes(action.key))return 'speak';
    if(profile.key==='guided'&&action.key==='describe')return 'learn';
    return action.mode||'explore';
  }

  root.EngBookLearning=Object.freeze({version:'2.7.0',lessonSignals,nextAction,missionDeck,categoryReviewQueue,supportProfile,launchMode,clone});
})(typeof window!=='undefined'?window:globalThis);
