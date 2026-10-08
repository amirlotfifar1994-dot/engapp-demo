/* Course presentation order is separate from authored lesson IDs and progress. */
(function(root){
  'use strict';
  const firstLessonId=5,revision='garden-first-v1';
  function displayNumber(lesson){const id=Number(lesson?.id??lesson?.lessonId??lesson);return id===5?1:id===1?5:id;}
  const rank=displayNumber;
  const label=lesson=>String(displayNumber(lesson)).padStart(2,'0');
  function matches(lesson,query){
    const q=String(query||'').trim().toLowerCase();
    if(!q)return true;
    if(/^\d+$/.test(q))return displayNumber(lesson)===Number(q);
    return `${lesson?.title||''} ${label(lesson)}`.toLowerCase().includes(q);
  }
  function compare(a,b){return rank(a)-rank(b);}
  function prepareHome(progress){
    if(!progress||progress.coursePathRevision===revision)return false;
    progress.coursePathRevision=revision;
    if(!Number(progress.lastLesson)||Number(progress.lastLesson)===1){
      progress.lastLesson=firstLessonId;progress.activeCategory=1;
      progress.lastLessonByCategory={...(progress.lastLessonByCategory||{}),1:firstLessonId};
    }
    return true;
  }
  const api=Object.freeze({firstLessonId,revision,compare,displayNumber,label,matches,prepareHome});
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.EngBookCoursePath=api;
})(typeof window!=='undefined'?window:globalThis);
