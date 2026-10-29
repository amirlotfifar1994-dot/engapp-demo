/* "Find it!" missions for a fixed-viewpoint panorama. Reads a clue, the learner taps the picture.
   Stars reward finding; nothing is lost. No lesson IDs or core progress are written. */
(function(root){
 'use strict';
 const M=root.SceneSpeakPanoramaMath||(typeof require!=='undefined'?require('./panorama-math.js'):null);
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const vec=(u,v)=>{const p=M.fromUV(u,v),y=M.rad(p.yaw),q=M.rad(p.pitch);return[Math.sin(y)*Math.cos(q),Math.sin(q),Math.cos(y)*Math.cos(q)];};
 /* Great-circle distance in degrees between two points given as {u,v}. */
 function angle(a,b){const A=vec(a.u,a.v),B=vec(b.u,b.v);return M.deg(Math.acos(M.clamp(A[0]*B[0]+A[1]*B[1]+A[2]*B[2],-1,1)));}
 /* Generous for small things, bounded for big ones so the whole wall is never one target. */
 function tolerance(h){return M.clamp((Number(h.r)||0)*.9,4.5,14);}
 function judge(tap,h){const distance=angle(tap,h);return {hit:distance<=tolerance(h),distance};}
 function stars({misses=0,hints=0,choice=false}={}){if(choice)return 1;return Math.max(1,3-(misses>0?1:0)-(hints>0?1:0));}
 /* Plain words telling the learner where to turn. */
 function direction(camera,h){
  const p=M.fromUV(h.u,h.v),dy=M.wrap(p.yaw-camera.yaw),dp=p.pitch-camera.pitch;
  if(Math.abs(dy)<26&&Math.abs(dp)<18)return {key:'here',text:'It is somewhere in this view. Look closer.'};
  if(Math.abs(dy)>=Math.abs(dp)*1.4||Math.abs(dp)<10)return dy>0?{key:'right',text:'Turn to the right.'}:{key:'left',text:'Turn to the left.'};
  return dp>0?{key:'up',text:'Look higher.'}:{key:'down',text:'Look lower.'};
 }
 function rngFrom(seed){let s=(seed>>>0)||1;return()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296;};}
 function shuffle(list,rng){const a=list.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 /* Round order is shuffled but never puts two missions from the same area side by side when avoidable. */
 function buildRound(missions,areaOf,rng){
  const pool=shuffle(missions,rng),out=[];
  while(pool.length){const last=out.length?areaOf(out[out.length-1].id):null;let i=pool.findIndex(m=>areaOf(m.id)!==last);if(i<0)i=0;out.push(pool.splice(i,1)[0]);}
  return out;
 }
 /* Four titles: the answer plus three from other areas where possible. */
 function choices(answerId,hotspots,areaOf,rng){
  const answer=hotspots.find(h=>h.id===answerId),others=shuffle(hotspots.filter(h=>h.id!==answerId&&h.parentId&&areaOf(h.id)!==areaOf(answerId)),rng).slice(0,3);
  return shuffle([answer,...others],rng).map(h=>({id:h.id,title:h.title}));
 }
 function summary(results){
  const total=results.reduce((n,r)=>n+(r.stars||0),0),max=results.length*3,found=results.filter(r=>r.stars>0).length;
  return {total,max,found,count:results.length,note:total>=max*.8?'You looked carefully.':total>=max*.5?'Good looking. Try a harder level next.':'Every find counts. Play again to see more.'};
 }
 const logic=Object.freeze({angle,tolerance,judge,stars,direction,rngFrom,shuffle,buildRound,choices,summary});

 function mount(host){
  const doc=host.doc,data=host.data,missions=data.missions||[],byId=new Map(data.hotspots.map(h=>[h.id,h])),levels=data.levels;
  const areaOf=id=>{let h=byId.get(id);while(h&&h.parentId)h=byId.get(h.parentId);return h?h.id:id;};
  const panel=doc.getElementById('pano-game'),play=doc.getElementById('pano-play'),view=host.view;
  const storeKey='scenespeak:panorama:game:'+data.id;
  const saved=(()=>{try{return JSON.parse(root.localStorage.getItem(storeKey)||'{}')||{};}catch{return {};}})();
  const best={stars:Number(saved.best)||0,plays:Number(saved.plays)||0};
  let active=false,round=[],index=0,state='idle',misses=0,hints=0,results=[],found=new Set(),markers=new Map(),seed=(Date.now()&0xffff)||7;
  const save=()=>{try{root.localStorage.setItem(storeKey,JSON.stringify(best));}catch{}};
  const clue=m=>m.clues[levels.indexOf(host.level())]||m.clues[0];
  const current=()=>round[index];
  const mark=n=>'★'.repeat(n)+'☆'.repeat(3-n);

  function paint(){
   const m=current(),hs=m&&byId.get(m.id);
   if(state==='summary'){
    const s=summary(results);
    panel.innerHTML=`<div class="game-top"><b>Round complete</b><button type="button" data-game="exit" aria-label="Back to exploring">Explore</button></div><p class="game-big" id="game-title" tabindex="-1">${mark(Math.round(s.total/s.max*3))}</p><p class="game-line">${s.found} of ${s.count} found · ${s.total} of ${s.max} stars</p><p class="game-line">${esc(s.note)}</p><p class="game-line small">Best round: ${best.stars} stars · Rounds played: ${best.plays}</p><div class="game-actions"><button type="button" data-game="again" class="game-primary">Play again</button><button type="button" data-game="exit">Back to exploring</button></div><p class="game-task"><b>YOUR TURN</b>Choose three things you found. Say where each one is, using the sentences you learned.</p>`;
    return;
   }
   if(state==='intro'){
    panel.innerHTML=`<div class="game-top"><b>Find it!</b><button type="button" data-game="exit" aria-label="Back to exploring">Explore</button></div><p class="game-big" id="game-title" tabindex="-1">${round.length} missions</p><p class="game-line">Read or listen to a clue. Look around, then tap the picture where you think it is.</p><p class="game-line small">Stars are only rewards. You can always ask for a hint or choose from a list.</p><div class="game-actions"><label class="game-level">Level <select data-game="level" aria-label="English level">${levels.map(l=>`<option ${l===host.level()?'selected':''}>${l}</option>`).join('')}</select></label><button type="button" data-game="start" class="game-primary">Start</button></div>`;
    return;
   }
   const earned=results[index]?.stars||0;
   panel.innerHTML=`<div class="game-top"><span>Mission ${index+1} of ${round.length}</span><span class="game-stars" aria-label="${earned} stars">${state==='found'?mark(earned):'☆☆☆'}</span><button type="button" data-game="exit" aria-label="Leave the mission game">Exit</button></div>
   <p class="game-clue" id="game-title" tabindex="-1">${esc(clue(m))}</p>
   ${state==='found'?`<div class="game-found"><b>${esc(hs.title)}</b><p>${esc(hs.forms[host.level()].text)}</p><details><summary>Phrase & grammar</summary><p><b>${esc(hs.forms[host.level()].phrase)}</b> · ${esc(hs.forms[host.level()].pattern)}</p></details></div>`:'<p class="game-feedback" id="game-feedback" role="status" aria-live="polite"></p>'}
   <div class="game-actions">${state==='found'?`<button type="button" data-game="hear">Listen</button><button type="button" data-game="next" class="game-primary">${index+1<round.length?'Next mission':'See result'}</button>`:`<button type="button" data-game="hear">Listen</button><button type="button" data-game="hint">Hint</button><button type="button" data-game="choose">Choose</button><button type="button" data-game="skip">Skip</button>`}<label class="game-level"><span class="sr-only">Level</span><select data-game="level" aria-label="English level">${levels.map(l=>`<option ${l===host.level()?'selected':''}>${l}</option>`).join('')}</select></label></div>
   <div class="game-choices" id="game-choices" hidden></div>`;
  }
  function focusTitle(){const t=doc.getElementById('game-title');if(t)t.focus({preventScroll:true});}
  function say(text){const f=doc.getElementById('game-feedback');if(f)f.textContent=text;host.announce(text);}
  function begin(){round=buildRound(missions,areaOf,rngFrom(seed=(seed*1664525+1013904223)>>>0));index=0;misses=0;hints=0;results=[];clearMarkers();state='intro';paint();focusTitle();host.setDots(false);}
  function startMission(){state='play';misses=0;hints=0;paint();focusTitle();}
  function reveal(id,earned){
   results[index]={id,stars:earned};state='found';found.add(id);addMarker(id);paint();focusTitle();host.announce(`Found. ${byId.get(id).title}. ${earned} stars.`);
  }
  function next(){
   if(index+1>=round.length){best.plays+=1;const s=summary(results);if(s.total>best.stars)best.stars=s.total;save();host.onRoundComplete?.(s);state='summary';paint();focusTitle();return;}
   index+=1;startMission();
  }
  function ripple(x,y,good){const r=doc.createElement('i');r.className='game-ripple '+(good?'is-good':'is-miss');r.style.left=x+'px';r.style.top=y+'px';host.layer.append(r);root.setTimeout(()=>r.remove(),700);}
  view.addEventListener('click',event=>{
   if(!active||state!=='play'||host.wasDrag()||event.target.closest('button'))return;
   const rect=view.getBoundingClientRect(),x=event.clientX-rect.left,y=event.clientY-rect.top,size=host.size(),uv=M.rayUV(x,y,host.camera(),size.width,size.height),m=current(),hs=byId.get(m.id),j=judge(uv,hs);
   if(j.hit){ripple(x,y,true);reveal(m.id,stars({misses,hints}));return;}
   misses+=1;ripple(x,y,false);
   say(misses===1?'Not there. Look again.':misses===2?direction(host.camera(),hs).text:'Close the clue and try the hint, or choose from a list.');
  });
  panel.addEventListener('change',event=>{if(event.target.dataset.game!=='level')return;host.setLevel(event.target.value);paint();focusTitle();});
  panel.addEventListener('click',event=>{
   const b=event.target.closest('[data-game]');if(!b||b.tagName==='SELECT')return;const a=b.dataset.game,m=current();
   if(a==='exit'){stop();return;}
   if(a==='start'){startMission();return;}
   if(a==='again'){begin();return;}
   if(a==='next'){next();return;}
   if(a==='hear'){host.speak(state==='found'?byId.get(m.id).forms[host.level()].text:clue(m),true);return;}
   if(a==='hint'){hints+=1;const hs=byId.get(m.id),area=byId.get(areaOf(m.id));say(hints===1?`Look near: ${area.title}.`:direction(host.camera(),hs).text);const p=M.fromUV(area.u,area.v);host.aim(p.yaw,p.pitch);return;}
   if(a==='skip'){results[index]={id:m.id,stars:0};host.announce('Skipped.');state='found';const p=M.fromUV(byId.get(m.id).u,byId.get(m.id).v);host.aim(p.yaw,p.pitch);addMarker(m.id);paint();focusTitle();return;}
   if(a==='choose'){const box=doc.getElementById('game-choices');if(!box.hidden){box.hidden=true;return;}const list=choices(m.id,data.hotspots,areaOf,rngFrom(seed+index*97+misses));box.innerHTML=list.map(c=>`<button type="button" data-game="pick" data-id="${esc(c.id)}">${esc(c.title)}</button>`).join('');box.hidden=false;box.querySelector('button').focus();return;}
   if(a==='pick'){const id=b.dataset.id;if(id===m.id){const p=M.fromUV(byId.get(id).u,byId.get(id).v);host.aim(p.yaw,p.pitch);reveal(id,stars({choice:true}));}else{misses+=1;b.disabled=true;b.classList.add('is-wrong');say('Not that one. Try another.');}}
  });
  function addMarker(id){if(markers.has(id))return;const el=doc.createElement('span');el.className='game-found-dot';el.setAttribute('aria-hidden','true');el.textContent='✓';host.layer.append(el);markers.set(id,el);}
  function clearMarkers(){for(const el of markers.values())el.remove();markers.clear();}
  function frame(){
   if(!active)return;const size=host.size();
   for(const [id,el] of markers){const p=host.project(byId.get(id));const show=p&&p.x>18&&p.x<size.width-18&&p.y>88&&p.y<size.height-84;el.hidden=!show;if(show){el.style.left=p.x+'px';el.style.top=p.y+'px';}}
  }
  function start(){if(active)return;active=true;host.closeCard();panel.hidden=false;play.setAttribute('aria-pressed','true');play.textContent='Exploring';view.classList.add('is-playing');const hint=doc.getElementById('pano-hint');if(hint)hint.hidden=true;begin();}
  function stop(){if(!active)return;active=false;state='idle';panel.hidden=true;panel.innerHTML='';clearMarkers();play.setAttribute('aria-pressed','false');play.textContent='Play';view.classList.remove('is-playing');host.setDots(true);host.stopAudio();host.announce('Exploring again.');play.focus({preventScroll:true});}
  play.hidden=false;play.addEventListener('click',()=>active?stop():start());
  doc.addEventListener('keydown',event=>{if(event.key==='Escape'&&active&&!host.dialogOpen()){event.preventDefault();stop();}});
  return {frame,stop,get active(){return active;}};
 }
 const api=Object.freeze({mount,logic});
 if(typeof module!=='undefined'&&module.exports)module.exports=api;root.SceneSpeakPanoramaGame=api;
})(typeof window!=='undefined'?window:globalThis);
