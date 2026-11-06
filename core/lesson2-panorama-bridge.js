/* Additive CAT01/display-L02 (stable ID 2) bridge. Other panorama scenes keep their own bridge. */
(function(root){'use strict';const channel='scenespeak-lesson2-cafe-v1';let host=null,frame=null,latest=null;
 function enabled(s){return Number(s?.lesson?.id)===2&&s?.screen==='lesson'&&(root.EngBookContent?.getPresentation?.(2)??root.EngBookContent?.getPack(2)?.presentation)?.panorama?.scene==='cafe-lesson2';}
 function unmount(){root.SceneSpeakTalkTour?.unmount(frame);host?.remove();host=frame=latest=null;root.document?.body?.classList.remove('lesson1-panorama','lesson1-photo-open');}
 function detailFromSearch(search,hotspots){const q=new URLSearchParams(search);if(q.get('lesson')!=='2'||(q.get('mode')||'explore')!=='explore')return null;const id=q.get('cafeDetail');return hotspots.find(h=>h.id===id)?.id||null;}
 function restoreDetail(targetFrame){
  if(frame!==targetFrame||!frame?.isConnected||frame.dataset.detailRestored)return;
  if(root.EngBookStartup?.pending){root.setTimeout(()=>restoreDetail(targetFrame),100);return;}
  frame.dataset.detailRestored='true';const current=root.EngBookEventContext?.getRoot('state');
  if(!enabled(current)||current.mode!=='explore')return;
  const id=detailFromSearch(root.location.search,current.lesson.hotspots);if(id)root.EngBookSceneCanvas.previewSelect(current.lesson.hotspots.findIndex(h=>h.id===id));
 }
 function detailUrl(href,id){const url=new URL(href);url.searchParams.set('lesson','2');url.searchParams.set('mode','explore');url.searchParams.set('cafeDetail',id);url.searchParams.delete('variant');url.hash='';return url.href;}
 function showDetailLink(s){
  if(s.mode!=='explore'||!Number.isInteger(s.selected))return;
  const h=s.lesson.hotspots[s.selected],footer=root.document.querySelector('.canvas-detail-card footer');if(!h||!footer||footer.querySelector('.cafe-detail-link'))return;
  const button=root.document.createElement('button');button.type='button';button.className='cafe-detail-link';button.textContent='Copy detail link';
  button.onclick=async()=>{
   const url=detailUrl(root.location.href,h.id);
   try{await root.navigator.clipboard.writeText(url);if(!button.isConnected)return;button.textContent='Link copied';footer.parentElement.querySelector('.cafe-detail-link-fallback')?.remove();}
   catch{
    if(!button.isConnected)return;button.textContent='Copy detail link';
    let label=footer.parentElement.querySelector('.cafe-detail-link-fallback');
    if(!label){label=root.document.createElement('label');label.className='cafe-detail-link-fallback';const text=root.document.createElement('span');text.textContent='Select and copy this link';const input=root.document.createElement('input');input.type='text';input.readOnly=true;input.setAttribute('aria-label','Detail link');input.addEventListener('click',()=>input.select());label.append(text,input);footer.after(label);}
    const input=label.querySelector('input');input.value=url;input.focus({preventScroll:true});input.select();
   }
  };footer.append(button);
 }
 function showDetailActivities(s){
  const doc=root.document,learn=s.mode==='learn',index=learn?root.EngBookLearn?.topic?.()?.anchorIndex:s.mode==='explore'?s.selected:null;
  const h=Number.isInteger(index)?s.lesson.hotspots[index]:null,anchor=learn?doc.querySelector('.learn-topic-actions'):doc.querySelector('.canvas-detail-card footer');
  if(!h||!anchor||anchor.parentElement.querySelector('.cafe-detail-activities'))return;
  const actions=doc.createElement('div');actions.className='cafe-detail-activities';actions.setAttribute('role','group');actions.setAttribute('aria-label','Continue with this detail');
  if(!learn){const button=doc.createElement('button');button.type='button';button.textContent='Learn this detail';button.onclick=()=>{
   let tab='picture',position=root.EngBookLearn.steps(tab).findIndex(row=>row.anchorIndex===index);if(position<0){tab='phrases';position=root.EngBookLearn.steps(tab).findIndex(row=>row.anchorIndex===index);}if(position<0)return;
   const session=root.EngBookLearn.session();session.tab=tab;session.indices[tab]=position;session.peek=false;if('panel' in session)session.panel='reader';session.detailReturn=null;
   root.setMode('learn');doc.querySelector('.learn-topic')?.focus({preventScroll:true});
  };actions.append(button);}
  if(learn){const builderIndex=root.EngBookContent.getPack(2)?.content?.recall?.builderHotspotIds?.indexOf(h.id)??-1;if(builderIndex>=0){const practice=doc.createElement('button');practice.type='button';practice.textContent='Practice this sentence';practice.onclick=()=>{root.setPractice('builder');s.builderIndex=builderIndex;root.initBuilder();s.practiceRepair={type:'builder',lessonId:2,index:builderIndex,returnToLearn:true};root.setMode('practice');doc.querySelector('.builder-card button:not([disabled])')?.focus({preventScroll:true});};actions.append(practice);}}
  const talk=doc.createElement('button');talk.type='button';talk.textContent='Talk about this detail';talk.onclick=()=>{s.sceneAnchor=h.en;root.setMode('talk');doc.querySelector('#talk-answer')?.focus({preventScroll:true});};actions.append(talk);anchor.after(actions);
 }
 function showLocation(s,id){
  const doc=root.document,scene=root.SceneSpeakLesson2Cafe||root.SceneSpeakDemo?.cafeLocations,h=scene?.hotspots.find(h=>h.id===id),node=scene?.tour?.nodes?.[h?.locationNode||'main'];
  const anchor=s.mode==='practice'&&s.practiceType==='builder'?doc.querySelector('.canvas-activity > header > div'):s.mode==='learn'?doc.querySelector('.learn-topic h1'):null;
  if(!anchor||!h||!node){doc.querySelectorAll('.cafe-learning-location').forEach(el=>el.remove());return;}
  let label=doc.querySelector('.cafe-learning-location');
  if(!label){label=doc.createElement('p');label.className='cafe-learning-location';if(s.mode==='learn')anchor.after(label);else anchor.append(label);}
  else if(s.mode==='learn'&&label.previousElementSibling!==anchor)anchor.after(label);
  else if(s.mode!=='learn'&&label.parentElement!==anchor)anchor.append(label);
  label.dataset.cafeLocation=h.locationNode||'main';label.dataset.cafeTarget=h.id;
  label.replaceChildren();const en=doc.createElement('span');en.textContent='Location · '+node.label;en.lang='en';label.append(en);
  if(node.fa){const fa=doc.createElement('span');fa.className='cafe-location-fa';fa.lang='fa';fa.dir='rtl';fa.textContent=node.fa;label.append(fa);}
 }
 function showRepairLocations(s){
  if(s.mode!=='practice'||s.practiceType!=='mistakes')return;
  const doc=root.document,progress=root.EngBookEventContext?.getRoot('progress'),scene=root.SceneSpeakLesson2Cafe||root.SceneSpeakDemo?.cafeLocations;
  doc.querySelectorAll('.repair-card').forEach(card=>{
   card.querySelector('.cafe-repair-location')?.remove();
   const action=card.querySelector('[data-eng-v52-click^="repairMistake("]'),match=action?.getAttribute('data-eng-v52-click')?.match(/^repairMistake\((\d+)\)$/);
   if(!match)return;const item=progress?.mistakes?.[Number(match[1])],target=root.practiceRepairTarget?.(item);
   const id=target?.type==='visual'?target.hotspotId:target?.type==='builder'?root.EngBookContent.getPack(2)?.content?.recall?.builderHotspotIds?.[target.index]:null;
   const h=scene?.hotspots.find(h=>h.id===id),node=scene?.tour?.nodes?.[h?.locationNode||'main'];if(!h||!node)return;
   const label=doc.createElement('p');label.className='cafe-repair-location';label.dataset.cafeTarget=h.id;label.dataset.cafeLocation=h.locationNode||'main';
   const en=doc.createElement('span');en.lang='en';en.textContent='Location · '+node.label;label.append(en);
   if(node.fa){const fa=doc.createElement('span');fa.lang='fa';fa.dir='rtl';fa.textContent=node.fa;label.append(fa);}
   card.querySelector('h4')?.after(label);
  });
 }
 function practicePaused(){return Boolean(root.EngBookSceneCanvas?.practiceReviewContext?.());}
 function send(){if(!frame||!latest)return;const s=latest,practice=s.mode==='practice'&&['find','listen','smart'].includes(s.practiceType)&&Boolean(s.practiceTarget)&&!practicePaused();let referenceId=null;if(s.mode==='learn'){const i=root.EngBookLearn?.topic?.()?.anchorIndex;if(Number.isInteger(i))referenceId=s.lesson.hotspots[i]?.id||null;}if(s.mode==='talk')referenceId=root.EngBookTalk?.question?.()?.hintHotspotIds?.[0]||null;if(s.mode==='practice'&&s.practiceType==='builder')referenceId=root.EngBookContent.getPack(2)?.content?.recall?.builderHotspotIds?.[s.builderIndex]||null;showLocation(s,referenceId);showRepairLocations(s);showDetailLink(s);showDetailActivities(s);const reading=s.mode==="learn"&&Boolean(root.document.querySelector(".learn-workspace:not([hidden])"));frame.tabIndex=reading?-1:0;frame.contentWindow?.postMessage({channel,type:'state',lessonId:2,mode:s.mode,selectedId:!practice&&s.v60CardOpen&&Number.isInteger(s.selected)?s.lesson.hotspots[s.selected]?.id:null,referenceId,reading,targetNode:practice?(s.practiceTarget?.presentation?.viewpoint||"main"):null,practice,practiceLocked:Boolean(s.practiceLocked),hintId:practice&&s.practiceLocationHint?s.practiceTarget?.id:null,locked:Boolean(s.mode==='speak'&&root.EngBookSpeaking?.busy()||s.mode==='talk'&&root.EngBookTalk?.busy())},root.location.origin);}
 function mount(s){if(!enabled(s)){unmount();return false;}root.EngBookLesson1Panorama?.unmount();root.EngBookPanoramaCore?.unmount();latest=s;root.document.body.classList.add('lesson1-panorama');if(!frame?.isConnected){host?.remove();host=root.document.createElement('div');host.id='lesson2-panorama-viewport';frame=root.document.createElement('iframe');frame.title='Café Conversation · interactive 360 degree lesson';frame.src='cafe360-lesson2.html?embedded=1&v=af5d2353129a';frame.setAttribute('sandbox','allow-scripts allow-same-origin');frame.setAttribute('allowfullscreen','');frame.addEventListener('load',send);host.append(frame);root.document.body.prepend(host);}send();root.SceneSpeakTalkTour?.mount(s,frame,host);return true;}
 function distance(u,v,h){const r=Math.PI/180,a=(90-v*180)*r,b=(90-h.y*1.8)*r,d=(u*360-h.x*3.6)*r;return Math.acos(Math.max(-1,Math.min(1,Math.sin(a)*Math.sin(b)+Math.cos(a)*Math.cos(b)*Math.cos(d))))/r;}
 function answerIndex(hotspots,target,u,v,nodeId="main"){if((target?.presentation?.viewpoint||"main")!==nodeId)return-1;if(!target||!Number.isFinite(u)||!Number.isFinite(v)||u<0||u>1||v<0||v>1)return-1;const candidates=hotspots.map((h,i)=>({i,h,d:distance(u,v,h)})).filter(row=>(row.h.presentation?.viewpoint||"main")===nodeId);const correct=candidates.find(x=>x.h.id===target.id);if(!correct)return-1;if(correct.d<=(target.presentation?.panoramaRadius||3))return correct.i;return candidates.filter(x=>x.i!==correct.i).sort((a,b)=>a.d-b.d)[0]?.i??-1;}
 function receive(event){if(!frame||event.origin!==root.location.origin||event.source!==frame.contentWindow)return;const m=event.data;if(!m||m.channel!==channel||m.lessonId!==2)return;const s=root.EngBookEventContext?.getRoot('state');if(!enabled(s))return;if(m.type==='ready'){send();restoreDetail(frame);return;}if(m.type==='travel'&&typeof m.moving==='boolean'){root.SceneSpeakTalkTour?.setMoving?.(frame,m.moving);return;}if(m.type==='view'){root.SceneSpeakTalkTour?.refresh?.(frame);return;}if(m.type==='photo'&&typeof m.open==='boolean'){root.document.body.classList.toggle('lesson1-photo-open',m.open);return;}if(s.mode==='speak'&&root.EngBookSpeaking?.busy()||s.mode==='talk'&&root.EngBookTalk?.busy())return;if(m.type==='clear'&&(['explore','learn','speak','talk'].includes(s.mode)||s.mode==='practice'&&practicePaused()))root.EngBookSceneCanvas.clear();if(m.type==='select'&&(['explore','learn','speak','talk'].includes(s.mode)||s.mode==='practice'&&practicePaused())){const i=s.lesson.hotspots.findIndex(h=>h.id===m.id);if(i>=0)root.EngBookSceneCanvas.select(i);}if(m.type==='tap'&&s.mode==='practice'&&['find','listen','smart'].includes(s.practiceType)&&s.practiceTarget&&!s.practiceLocked&&!practicePaused()){const i=answerIndex(s.lesson.hotspots,s.practiceTarget,m.u,m.v,m.nodeId||"main");if(i>=0)root.answerFind(i);}}
 const api=Object.freeze({mount,unmount,send,distance,answerIndex,enabled,detailFromSearch,detailUrl});root.EngBookLesson2Panorama=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;if(root.document)root.addEventListener('message',receive);
})(typeof window!=='undefined'?window:globalThis);
