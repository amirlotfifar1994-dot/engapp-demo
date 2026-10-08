/* EngBook Learner Model v0.29
   Local longitudinal model. It summarizes scene-specific progress and exposes
   next-gap evidence without claiming CEFR placement or overall proficiency. */
(function(root){
  'use strict';
  const clamp=n=>Math.max(0,Math.min(100,Math.round(Number(n)||0)));
  const avg=a=>a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length):0;
  function lesson(progress,id,ctx={}){
    const m=progress?.lessonMetrics?.[id]||{},disc=progress?.discovered?.[id]||[],pack=ctx.pack||root.EngBookContent?.getPack?.(id)||{},hotspots=ctx.hotspots||pack.hotspots||[];
    const coverage=clamp(m.coverage?.best||0),evidence=clamp(m.evidence?.best||0),recallAttempts=Number(m.practice?.attempts||0),recall=recallAttempts?clamp((Number(m.practice?.correct||0)/recallAttempts)*100):0,conversation=pack.capabilities?.includes('conversation')?clamp(m.conversation?.best||0):null,observation=clamp((disc.length/Math.max(1,hotspots.length))*100),description=clamp(Math.max(coverage,m.lastSpeechScore||0));
    const values=[observation,description,evidence,recall].concat(conversation===null?[]:[conversation]);
    const attempts=(m.speakingAttempts||0)+(m.practice?.attempts||0)+(m.conversation?.runs||m.conversation?.attempts||0)+(m.evidence?.runs||0);
    const confidence=clamp(Math.min(100,18+attempts*7+disc.length*2));
    return {lessonId:Number(id),observation,description,evidence,recall,conversation,meaningTransfer:conversation===null?null:clamp(avg([description,conversation,evidence])),balance:clamp(avg(values)),confidence,attempts};
  }
  function profile(progress,lessonIds){
    const rows=(lessonIds||root.ENGBOOK_BUILD_INFO?.readyLessons||[]).map(id=>lesson(progress,Number(id))).filter(Boolean);
    const withVal=(k)=>rows.map(r=>r[k]).filter(v=>v!==null&&Number.isFinite(v));
    const dimensions={observation:avg(withVal('observation')),description:avg(withVal('description')),evidence:avg(withVal('evidence')),recall:avg(withVal('recall')),conversation:avg(withVal('conversation')),meaningTransfer:avg(withVal('meaningTransfer'))};
    const confidence=avg(rows.map(r=>r.confidence)),rank=Object.entries(dimensions).sort((a,b)=>a[1]-b[1]);
    return {version:'0.29',dimensions,confidence,weakest:{key:rank[0]?.[0]||'observation',score:rank[0]?.[1]||0},strongest:{key:rank.at(-1)?.[0]||'evidence',score:rank.at(-1)?.[1]||0},lessons:rows,sceneCount:rows.length};
  }
  function nextGap(model){
    const map={observation:{mode:'explore',label:'Notice more of the scene'},description:{mode:'speak',label:'Build a clearer full description'},evidence:{mode:'learn',label:'Separate fact from inference'},recall:{mode:'practice',label:'Retrieve scene language'},conversation:{mode:'talk',label:'Make the listener understand'},meaningTransfer:{mode:'talk',label:'Improve meaning transfer'}};
    return {...(map[model?.weakest?.key]||map.observation),skill:model?.weakest?.key||'observation',score:model?.weakest?.score||0,confidence:model?.confidence||0};
  }
  function shouldSnapshot(progress,now=Date.now()){const xs=progress?.learnerModel?.snapshots||[],last=xs.at(-1)?.at||0;return !last||now-last>21600000;}
  function capture(progress,lessonIds,now=Date.now()){
    const model=profile(progress,lessonIds);progress.learnerModel=progress.learnerModel||{snapshots:[]};
    if(shouldSnapshot(progress,now)){progress.learnerModel.snapshots=[...(progress.learnerModel.snapshots||[]),{at:now,dimensions:model.dimensions,confidence:model.confidence,sceneCount:model.sceneCount}].slice(-40);return {model,changed:true};}
    return {model,changed:false};
  }
  root.EngBookLearnerModel=Object.freeze({version:'0.29',lesson,profile,nextGap,capture,shouldSnapshot});
})(typeof window!=='undefined'?window:globalThis);
