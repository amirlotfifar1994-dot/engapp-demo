/* The central lesson owns learning, exercises and progress; the child owns spherical viewing. */
(function(root){'use strict';
 const channel='scenespeak-panorama-core-v1';
 function distance(u,v,h){const r=Math.PI/180,a=(90-v*180)*r,b=(90-h.y*1.8)*r,d=(u*360-h.x*3.6)*r;return Math.acos(Math.max(-1,Math.min(1,Math.sin(a)*Math.sin(b)+Math.cos(a)*Math.cos(b)*Math.cos(d))))/r;}
 function answerIndex(hotspots,target,u,v){if(!target||!Number.isFinite(u)||!Number.isFinite(v)||u<0||u>1||v<0||v>1)return -1;const index=hotspots.findIndex(h=>h.id===target.id);if(index<0)return -1;const tolerance=target.presentation?.panoramaRadius||3;if(distance(u,v,target)<=tolerance)return index;return hotspots.map((h,i)=>({i,d:distance(u,v,h)})).filter(x=>x.i!==index).sort((a,b)=>a.d-b.d)[0]?.i??-1;}
 let host=null,frame=null,activeId=null,latest=null;
 function entry(id){return root.SceneSpeakPanoramaCourse?.entries?.find(e=>e.id===Number(id));}
 function referenceId(s){
  const hs=s.lesson?.hotspots||[];
  if(s.mode==='practice'&&s.practiceType==='builder'){
   const id=root.EngBookContent.getPack(s.lesson.id)?.content?.recall?.builderHotspotIds?.[s.builderIndex];
   return hs.some(h=>h.id===id)?id:null;
  }
  if(s.mode==='learn'){
   const topic=root.EngBookLearn?.topic?.();
   if(Number.isInteger(topic?.anchorIndex))return hs[topic.anchorIndex]?.id||null;
  }
  if(s.mode==='talk'){
   const talk=root.EngBookTalk?.session?.();
   if(talk?.hint||talk?.open?.includes('sample'))return root.EngBookTalk.question?.()?.hintHotspotIds?.find(id=>hs.some(h=>h.id===id))||null;
  }
  return null;
 }
 function send(){if(!frame||!latest)return;const s=latest,pack=root.EngBookContent.getPack(s.lesson.id),practice=s.mode==='practice'&&['find','listen','smart'].includes(s.practiceType)&&Boolean(s.practiceTarget);const level=root.EngAppLevelAware?.levelFor(pack,'global')||'A2';frame.contentWindow?.postMessage({channel,type:'state',lessonId:activeId,mode:s.mode,level,selectedId:!practice&&Number.isInteger(s.selected)?s.lesson.hotspots[s.selected]?.id:null,referenceId:!practice&&!Number.isInteger(s.selected)?referenceId(s):null,practice,practiceLocked:Boolean(s.practiceLocked),hintId:practice&&s.practiceLocationHint?s.practiceTarget.id:null,locked:Boolean(s.mode==='speak'&&root.EngBookSpeaking?.busy()||s.mode==='talk'&&root.EngBookTalk?.busy())},root.location.origin);}
 function unmount(){root.SceneSpeakTalkTour?.unmount(frame);host?.remove();host=frame=null;activeId=null;latest=null;root.document?.body?.classList.remove('panorama-core');root.document?.body?.classList.remove('panorama-camera-open');}
 function mount(s){const e=entry(s?.lesson?.id);if(!e||s.screen!=='lesson'){unmount();return false;}latest=s;root.document.body.classList.add('panorama-core');
  if(activeId!==e.id||!frame?.isConnected){root.document.body.classList.remove('panorama-camera-open');host?.remove();host=root.document.createElement('div');host.id='panorama-core-viewport';host.style.backgroundImage=`url("${s.lesson.image}")`;frame=root.document.createElement('iframe');frame.title=e.title+' · interactive 360° picture';frame.src=`panorama.html?scene=${encodeURIComponent(e.scene)}&embedded=1&coreLesson=${e.id}`;frame.setAttribute('sandbox','allow-scripts allow-same-origin');frame.addEventListener('load',send);host.append(frame);root.document.body.prepend(host);activeId=e.id;}
  send();root.SceneSpeakTalkTour?.mount(s,frame,host);return true;
 }
 function receive(event){if(!frame||event.origin!==root.location.origin||event.source!==frame.contentWindow)return;const m=event.data;if(!m||m.channel!==channel||m.lessonId!==activeId)return;const s=root.EngBookEventContext?.getRoot('state');if(!s||s.screen!=='lesson'||Number(s.lesson?.id)!==activeId)return;
  if(m.type==='ready'){send();return;}
  if(s.mode==='speak'&&root.EngBookSpeaking?.busy()||s.mode==='talk'&&root.EngBookTalk?.busy())return;
  if(m.type==='camera'&&typeof m.open==='boolean'){root.document.body.classList.toggle('panorama-camera-open',m.open);return;}
  if(m.type==='clear'&&['explore','learn','speak','talk','listening'].includes(s.mode)){root.EngBookSceneCanvas.clear();return;}
  if(m.type==='select'&&['explore','learn','speak','talk','listening'].includes(s.mode)){const i=s.lesson.hotspots.findIndex(h=>h.id===m.id);if(i>=0)root.EngBookSceneCanvas.select(i);}
  if(m.type==='tap'&&s.practiceTarget?.presentation?.viewpoint&&m.viewpoint!==s.practiceTarget.presentation.viewpoint)return;
  if(m.type==='tap'&&s.mode==='practice'&&['find','listen','smart'].includes(s.practiceType)&&s.practiceTarget&&!s.practiceLocked){const i=answerIndex(s.lesson.hotspots,s.practiceTarget,m.u,m.v);if(i>=0)root.answerFind(i);}
 }
 const api=Object.freeze({mount,unmount,send,distance,answerIndex,referenceId});if(typeof module!=='undefined'&&module.exports)module.exports=api;root.EngBookPanoramaCore=api;if(root.document)root.addEventListener('message',receive);
})(typeof window!=='undefined'?window:globalThis);
