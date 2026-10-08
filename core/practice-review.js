/* Shared picture-recall rules. Smart review uses local recall history;
   its priority is a learning aid, not a measured proficiency score. */
(function(root){
  'use strict';
  const TYPES=Object.freeze(['find','listen','smart']);
  const key=h=>h?.id||h?.en;
  function candidates(hotspots){
    return (hotspots||[]).filter(h=>h&&String(h.en||'').trim()&&
      (!h.claimClass||h.claimClass==='visible-fact')&&
      Number.isFinite(Number(h.x))&&Number(h.x)>=0&&Number(h.x)<=100&&
      Number.isFinite(Number(h.y))&&Number(h.y)>=0&&Number(h.y)<=100);
  }
  function chooseTarget(hotspots,{type='find',reviewed=[],score=()=>0,last=()=>0,random=Math.random}={}){
    const seen=new Set(reviewed);let pool=candidates(hotspots).filter(h=>!seen.has(key(h)));
    if(!pool.length)return null;
    if(type==='smart'){
      pool.sort((a,b)=>(Number(score(a.en))||0)-(Number(score(b.en))||0)||(Number(last(a.en))||0)-(Number(last(b.en))||0));
      const first=pool[0];pool=pool.filter(h=>(Number(score(h.en))||0)===(Number(score(first.en))||0)&&(Number(last(h.en))||0)===(Number(last(first.en))||0));
    }
    return pool[Math.min(pool.length-1,Math.max(0,Math.floor(random()*pool.length)))];
  }
  function matches(hit,target){return Boolean(hit&&target&&(hit.id&&target.id?hit.id===target.id:hit.en===target.en));}
  function locationHint(h){
    const x=Number(h?.x),y=Number(h?.y);
    if(!Number.isFinite(x)||!Number.isFinite(y))return 'Look carefully at the whole picture.';
    const column=x<33?'left':x>67?'right':'center',row=y<33?'upper':y>67?'lower':'middle';
    return column==='center'&&row==='middle'?'Look near the center of the picture.':`Look in the ${row} ${column} of the picture.`;
  }
  function canAnswer(s){return Boolean(s?.mode==='practice'&&TYPES.includes(s.practiceType)&&!s.practiceLocked&&s.practiceTarget&&Number(s.practiceLessonId)===Number(s.lesson?.id));}
  root.EngBookPractice=Object.freeze({TYPES,candidates,chooseTarget,matches,locationHint,canAnswer,key});
})(typeof window!=='undefined'?window:globalThis);
