/* Panorama lesson progress is shared by its views and saved independently of picture scores. */
(function(root){
 'use strict';
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function createProgress(lesson,hotspots,saved={}){
  const byId=new Map(hotspots.map(h=>[h.id,h])),route=new Set(lesson.route);
  const visits=new Set((Array.isArray(saved.visits)?saved.visits:[]).filter(id=>route.has(id)));
  const spoken=new Set((Array.isArray(saved.spoken)?saved.spoken:[]).filter(n=>Number.isInteger(n)&&n>=0&&n<lesson.speaking.length));
  let found=Math.max(0,Math.min(10,Number(saved.found)||0));
  function area(id){const seen=new Set();let h=byId.get(id);while(h?.parentId&&!seen.has(h.id)){seen.add(h.id);h=byId.get(h.parentId);}return h?.id;}
  const status=()=>({visits:[...visits],spoken:[...spoken],found,explored:visits.size,total:route.size,complete:visits.size===route.size&&spoken.size===lesson.speaking.length&&found>=lesson.minFound});
  return {status,visit(id){const a=area(id);if(route.has(a))visits.add(a);return status();},speak(index,value){if(Number.isInteger(index)&&index>=0&&index<lesson.speaking.length){if(value)spoken.add(index);else spoken.delete(index);}return status();},round(result){const count=Number(result?.found);if(Number.isFinite(count))found=Math.max(found,Math.min(10,Math.max(0,count)));return status();}};
 }
 function mount(host){
  const {doc,data}=host,lesson=data.lesson;if(!lesson)return null;
  const key='scenespeak:panorama:lesson:'+lesson.id;
  let saved;try{saved=JSON.parse(root.localStorage.getItem(key)||'{}')||{};}catch{saved={};}
  const progress=createProgress(lesson,data.hotspots,saved),byId=new Map(data.hotspots.map(h=>[h.id,h]));
  for(const id of host.seen||[])progress.visit(id);
  const button=doc.createElement('button');button.type='button';button.id='pano-lesson-toggle';button.className='pano-lesson-toggle';button.setAttribute('aria-haspopup','dialog');
  doc.querySelector('.pano-header').insertBefore(button,doc.getElementById('pano-map'));
  const panel=doc.createElement('dialog');panel.id='pano-lesson';panel.setAttribute('aria-labelledby','pano-lesson-title');doc.getElementById('panorama').append(panel);
  let returnFocus=true;
  const message=s=>s.complete?'✓ Lesson complete. You explored the park, found its details and practised speaking.':'Your progress is saved on this device. Continue whenever you like.';
  function persist(repaint=true){const s=progress.status();try{root.localStorage.setItem(key,JSON.stringify(s));}catch{}button.textContent=s.complete?'Lesson complete ✓':`Lesson · ${s.explored}/${s.total}`;if(panel.open&&repaint)paint();else if(panel.open){panel.querySelector('[data-lesson-speaking-count]').textContent=`${s.spoken.length} / ${lesson.speaking.length}`;panel.querySelector('footer').textContent=message(s);}}
  function paint(){
   const s=progress.status(),next=lesson.route.find(id=>!s.visits.includes(id));
   panel.innerHTML=`<header><div><small>CATEGORY 01 · LESSON 03 · 360°</small><h2 id="pano-lesson-title" tabindex="-1">${esc(lesson.title)}</h2></div><button data-lesson="close" aria-label="Close lesson">×</button></header>
    <p class="pano-lesson-goal">${esc(lesson.goal)}</p><label class="pano-lesson-level">English level <select aria-label="Lesson English level" data-lesson-level>${data.levels.map(l=>`<option${l===host.level()?' selected':''}>${l}</option>`).join('')}</select></label>
    <section><h3>1. Explore <span>${s.explored} / ${s.total}</span></h3><p>Follow the route or choose a place. Tap its dots to discover smaller details.</p><progress value="${s.explored}" max="${s.total}" aria-label="Areas explored"></progress><div class="pano-lesson-route">${lesson.route.map((id,i)=>`<button data-lesson="visit" data-id="${id}" class="${s.visits.includes(id)?'is-done':''}"><span>${s.visits.includes(id)?'✓':i+1}</span>${esc(byId.get(id).title)}</button>`).join('')}</div>${next?`<button class="pano-lesson-primary" data-lesson="visit" data-id="${next}">${s.explored?'Continue exploring':'Start exploring'} →</button>`:''}</section>
    <section><h3>2. Find it <span>${s.found} / ${data.missions.length}</span></h3><p>Find at least ${lesson.minFound} of ${data.missions.length} details from clues. Hints and choices are available.</p><button class="pano-lesson-primary" data-lesson="play">${s.found?'Try the clues again':'Start the clues'} →</button></section>
    <section><h3>3. Say it <span data-lesson-speaking-count>${s.spoken.length} / ${lesson.speaking.length}</span></h3><p>Speak in your own words. Tick each task after you practise.</p>${lesson.speaking.map((prompt,i)=>`<label class="pano-lesson-speak"><input type="checkbox" data-lesson-spoken="${i}"${s.spoken.includes(i)?' checked':''}><span>${esc(prompt)}<small>I practised this aloud</small></span></label>`).join('')}</section>
    <footer role="status">${message(s)}</footer>`;
  }
  function close(focus=true){returnFocus=focus;panel.close();}
  button.addEventListener('click',()=>{returnFocus=true;host.pause();paint();panel.showModal();panel.querySelector('h2').focus();});
  panel.addEventListener('close',()=>{host.resume();if(returnFocus)button.focus({preventScroll:true});});
  panel.addEventListener('click',event=>{const b=event.target.closest('[data-lesson]');if(!b)return;const action=b.dataset.lesson;if(action==='close')close();if(action==='visit'){close(false);host.open(b.dataset.id);}if(action==='play'){close(false);host.play();}});
  panel.addEventListener('change',event=>{if(event.target.matches('[data-lesson-level]'))host.setLevel(event.target.value);if(event.target.matches('[data-lesson-spoken]')){progress.speak(Number(event.target.dataset.lessonSpoken),event.target.checked);persist(false);}});
  persist();
  return {visit(id){const before=progress.status().explored;progress.visit(id);persist(progress.status().explored!==before);},round(result){progress.round(result);persist();},status:progress.status};
 }
 const api=Object.freeze({createProgress,mount});root.SceneSpeakPanoramaLesson=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
