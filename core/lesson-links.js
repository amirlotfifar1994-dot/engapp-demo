/* Lesson-local navigation adapters. Canonical anchors stay in the active lesson pack. */
(function(root){'use strict';
 const state=()=>root.EngBookEventContext?.getRoot('state'),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const modes=['explore','learn','listening','practice','speak','talk'];let menu=null;
 let observer=null;
 const icons={explore:'<circle cx="12" cy="12" r="9"/><path d="m16 8-3 5-5 3 3-5Z"/>',learn:'<path d="M12 5v15M12 5C8 2 4 3 3 4v15c3-2 6-1 9 1 3-2 6-3 9-1V4c-3-2-6-1-9 1Z"/>',listening:'<path d="M4 14v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="12" width="4" height="8" rx="2"/><rect x="17" y="12" width="4" height="8" rx="2"/>',practice:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',speak:'<rect x="8" y="2" width="8" height="13" rx="4"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3"/>',talk:'<path d="M4 4h16v12H9l-5 4Z"/>'};
 const icon=mode=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[mode]}</svg>`;
 function valid(record=menu){const s=state();return Boolean(record&&s?.screen==='lesson'&&Number(s.lesson?.id)===record.lessonId&&s.mode===record.mode&&resolve(record.id,record.lessonId));}
 function triggerFor(record){if(record?.trigger?.isConnected)return record.trigger;return [...(root.document?.querySelectorAll?.('[data-lesson-link-open]')||[])].find(el=>el.dataset.lessonLinkOpen===record?.id&&Number(el.dataset.lessonId)===record?.lessonId);}
 function place(){
  if(!valid()||!menu.panel?.isConnected||!menu.trigger?.isConnected){close(false);return;}
  const v=root.visualViewport,w=v?.width||root.innerWidth,h=v?.height||root.innerHeight,left=v?.offsetLeft||0,top=v?.offsetTop||0,panel=menu.panel;
  panel.style.width=Math.max(1,Math.min(320,w-24))+'px';panel.style.maxHeight=Math.max(1,h-24)+'px';
  const r=menu.trigger.getBoundingClientRect(),box=panel.getBoundingClientRect();let x=Math.max(left+12,Math.min(r.right-box.width,left+w-box.width-12)),y=r.bottom+8;if(y+box.height>top+h-12){y=r.top-box.height-8;if(y<top+12){if(r.right+8+box.width<=left+w-12)x=r.right+8;else if(r.left-8-box.width>=left+12)x=r.left-8-box.width;}}
  panel.style.left=x+'px';panel.style.top=Math.max(top+12,Math.min(y,top+h-box.height-12))+'px';
 }
 function panelMarkup(record){const h=resolve(record.id,record.lessonId),s=state(),parent=h.presentation?.parentId??h.parentId,group=Boolean(s.lesson.hotspots.some(x=>(x.presentation?.parentId??x.parentId)===h.id)||parent&&s.lesson.hotspots.some(x=>x.id===parent)),names={explore:'Find in picture',learn:'Learn this detail',listening:'Listen to this detail',practice:group?'Practise this family':'Practise the lesson',speak:'Describe this detail',talk:'Talk about this detail'},labels={explore:'Explore',learn:'Learn',listening:'Listen',practice:group?'Practise family':'Practise lesson',speak:'Speak',talk:'Talk'};
  return `<section class="lesson-connections-panel" popover="manual" role="group" aria-label="Continue with this detail"><header><div><span>CONTINUE WITH</span><b title="${esc(h.en)}">${esc(h.en)}</b></div><button data-lesson-link-close aria-label="Close activity links">×</button></header><div class="lesson-connections-body" role="region" tabindex="0" aria-label="Activity choices"><div class="lesson-connections-choices">${modes.filter(m=>m!==record.mode).map(m=>`<button data-lesson-destination="${m}" data-lesson-anchor="${esc(h.id)}" data-lesson-id="${record.lessonId}" aria-label="${names[m]}">${icon(m)}<span>${labels[m]}</span></button>`).join('')}</div></div><p class="lesson-connections-message" role="status" hidden></p></section>`;
 }
 function paint(){
  if(!valid()){close(false);return false;}const record=menu,trigger=record.trigger;
  if(!record.panel){const host=trigger?.closest?.('.lesson-connections');if(!host){close(false);return false;}host.insertAdjacentHTML('beforeend',panelMarkup(record));record.panel=host.querySelector('.lesson-connections-panel');if(!record.panel){close(false);return false;}
   if(record.panel.showPopover)record.panel.showPopover();else{record.panel.removeAttribute('popover');record.panel.classList.add('is-open');}
   if(root.MutationObserver){observer=new root.MutationObserver(()=>{if(menu===record&&(!record.panel.isConnected||!trigger.isConnected||!valid(record)))close(false);});observer.observe(root.document.getElementById?.('app')||root.document.body,{childList:true,subtree:true});}
  }
  const message=record.panel.querySelector('.lesson-connections-message');message.textContent=record.message;message.hidden=!record.message;trigger.setAttribute('aria-expanded','true');place();
  const active=root.document.activeElement;if(record.message&&active?.dataset?.lessonDestination&&record.panel.contains(active))active.scrollIntoView?.({block:'nearest',inline:'nearest',behavior:'instant'});return true;
 }

 function resolve(id,lessonId=state()?.lesson?.id){const s=state();if(s?.screen!=='lesson'||Number(s.lesson?.id)!==Number(lessonId))return null;return s.lesson.hotspots?.find(h=>h.id===id)||null;}
 function remember(id){const s=state(),h=resolve(id);if(!s)return null;s.lessonFocus=h?{lessonId:Number(s.lesson.id),id:h.id}:null;return h;}
 function focused(){const s=state();if(s?.screen!=='lesson')return null;if(s.mode==='listening'&&!s.v60CardOpen)return resolve(root.EngBookListeningPlayer?.currentAnchor?.());if(Number.isInteger(s.selected))return resolve(s.lesson.hotspots[s.selected]?.id);if(s.mode==='listening')return resolve(root.EngBookListeningPlayer?.currentAnchor?.());return resolve(s.lessonFocus?.id,s.lessonFocus?.lessonId);}
 function capture(){const h=focused();if(h){remember(h.id);return {id:h.id,lessonId:Number(state().lesson.id)};}if(state()?.mode==='listening')remember(null);return null;}
 function restore(mode,h){if(mode==='listening'&&resolve(h?.id,h?.lessonId)&&root.EngBookListeningPlayer?.currentAnchor?.()!==h.id)root.EngBookListeningPlayer?.openAnchor?.(h.id);}
 function close(focus=true){const record=menu;menu=null;observer?.disconnect();observer=null;if(record?.panel?.isConnected)record.panel.hidePopover?.();record?.panel?.remove?.();const trigger=triggerFor(record);trigger?.setAttribute('aria-expanded','false');if(focus&&valid(record))trigger?.focus({preventScroll:true});}

 function go(mode,id,lessonId=state()?.lesson?.id){const s=state(),h=resolve(id,lessonId);if(!h||!modes.includes(mode)||typeof root.setMode!=='function')return false;
  if(root.EngBookSpeaking?.busy?.()||root.EngBookTalk?.busy?.()){if(menu){menu.message='Stop the current recording before changing activities.';paint();}return false;}
  if(mode==='speak'&&root.EngBookSpeaking?.setFocus?.(h.id)===false){if(menu){menu.message='Your speaking attempt is saved here. Finish or reset it before choosing another focus.';paint();}return false;}
  if(mode==='talk'){const a=root.EngBookTalk?.session?.();if(a&&a.anchor!==h.en&&(a.draft?.trim()||a.responses?.length)){if(menu){menu.message='Finish or reset your current conversation before changing its focus.';paint();}return false;}s.sceneAnchor=h.en;}
  remember(h.id);close(false);(root.EngBookSceneCanvas?.prepareMode||root.EngBookSceneCanvas?.prepareListening)?.();
  if(mode==='practice'&&root.EngBookListening?.startGroupPracticeAt?.(h.id))return true;
  root.setMode(mode);const next=state();if(next?.screen!=='lesson'||Number(next.lesson?.id)!==Number(lessonId)||next.mode!==mode)return false;
  const index=next.lesson.hotspots.findIndex(x=>x.id===h.id);
  if(mode==='listening'&&root.EngBookListeningPlayer?.currentAnchor?.()!==h.id)root.EngBookListeningPlayer?.openAnchor?.(h.id);
  else if(mode==='explore'||mode==='learn')root.EngBookSceneCanvas?.openLearningDetail?.(index,'word');
  else if(mode==='practice')root.setPractice?.('listen');
  return true;
 }
 function markup(id=focused()?.id){const s=state(),h=resolve(id);if(!h)return '';return `<div class="lesson-connections"><button class="lesson-connections-trigger" data-lesson-link-open="${esc(h.id)}" data-lesson-id="${s.lesson.id}" aria-label="Continue with this detail" aria-expanded="false"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg></button></div>`;}
 root.document?.addEventListener('click',e=>{const opener=e.target.closest?.('[data-lesson-link-open]'),destination=e.target.closest?.('[data-lesson-destination]'),closer=e.target.closest?.('[data-lesson-link-close]');if(opener){e.preventDefault();if(!resolve(opener.dataset.lessonLinkOpen,opener.dataset.lessonId))return;const same=menu?.trigger===opener;close(false);if(same){opener.focus({preventScroll:true});return;}root.EngBookListeningPlayer?.stop?.('stopped');root.EngBookListening?.stop?.();menu={id:opener.dataset.lessonLinkOpen,lessonId:Number(opener.dataset.lessonId),mode:state().mode,trigger:opener,panel:null,message:''};if(paint())menu.panel.querySelector('[data-lesson-destination]')?.focus({preventScroll:true});}else if(destination){e.preventDefault();go(destination.dataset.lessonDestination,destination.dataset.lessonAnchor,destination.dataset.lessonId);}else if(closer){e.preventDefault();close();}else if(menu&&!e.target.closest?.('.lesson-connections,.lesson-connections-panel'))close(false);});
 root.document?.addEventListener('keydown',e=>{if(menu&&e.key==='Escape'&&!e.isComposing){e.preventDefault();e.stopImmediatePropagation();close();}},true);
 root.document?.addEventListener('focusin',e=>{if(menu&&!menu.panel?.contains(e.target)&&e.target!==menu.trigger)close(false);});
 root.document?.addEventListener('scroll',e=>{if(menu&&!menu.panel?.contains(e.target))place();},true);
 root.addEventListener?.('resize',()=>{if(menu)place();});root.visualViewport?.addEventListener?.('resize',()=>{if(menu)place();});root.visualViewport?.addEventListener?.('scroll',()=>{if(menu)place();});
 root.addEventListener?.('pagehide',()=>close(false));root.addEventListener?.('engapp:local-data-cleared',()=>close(false));
 root.EngBookLessonLinks=Object.freeze({resolve,remember,focused,capture,restore,go,markup,close});
})(typeof window!=='undefined'?window:globalThis);
