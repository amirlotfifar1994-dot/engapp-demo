/* Course presentation order is separate from authored lesson IDs and progress. */
(function(root){
  'use strict';
  const firstLessonId=5,revision='garden-first-v1';
  function displayNumber(lesson){const id=Number(lesson?.id??lesson?.lessonId??lesson);return id===5?1:id===1?5:id;}
  const rank=displayNumber;
  const ranges=[[1,1,28],[2,29,60],[3,61,99],[4,100,130],[5,131,171]];
  function position(lesson){
    const id=Number(lesson?.id??lesson?.lessonId??lesson),metadata=root.ENGBOOK_COURSE_CATALOG?.listCategories?.();
    const catalog=metadata||ranges.map(([id,lessonStart,lessonEnd])=>({id,lessonStart,lessonEnd}));
    const declared=Number(lesson?.categoryId),category=catalog.find(c=>Number(c.id)===declared&&Number.isFinite(c.lessonStart))||catalog.find(c=>Number.isFinite(c.lessonStart)&&id>=c.lessonStart&&id<=c.lessonEnd);
    return {id,categoryId:category?.id||declared||null,number:category?id-(category.lessonStart||1)+1:displayNumber(id)};
  }
  function localNumber(lesson){const p=position(lesson);return p.categoryId===1?displayNumber(p.id):p.number;}
  const label=lesson=>String(localNumber(lesson)).padStart(2,'0');
  const qualifiedLabel=lesson=>{const p=position(lesson);return p.categoryId?`Category ${String(p.categoryId).padStart(2,'0')} · Lesson ${label(lesson)}`:`Lesson ${label(lesson)}`;};
  const caption=lesson=>qualifiedLabel(lesson).replace('Category','CAT').toUpperCase();
  function matches(lesson,query){
    const q=String(query||'').trim().toLowerCase().replace(/[۰-۹٠-٩]/g,c=>String(c.charCodeAt(0)-(c>='۰'?0x6f0:0x660)));
    if(!q)return true;
    const pair=q.match(/^(?:(?:c|cat|category)\s*)?(\d+)\s*(?:[./:-]|\s+(?:l|lesson)\s*)\s*(\d+)$/);
    if(pair)return Number(position(lesson).categoryId)===Number(pair[1])&&localNumber(lesson)===Number(pair[2]);
    if(/^\d+$/.test(q))return localNumber(lesson)===Number(q);
    return `${lesson?.title||''} ${qualifiedLabel(lesson)}`.toLowerCase().includes(q);
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
  const api=Object.freeze({firstLessonId,revision,compare,displayNumber,position,localNumber,label,qualifiedLabel,caption,matches,prepareHome});
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.EngBookCoursePath=api;
})(typeof window!=='undefined'?window:globalThis);
