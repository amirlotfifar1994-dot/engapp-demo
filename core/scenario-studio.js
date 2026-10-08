/* Picture-first scenarios use a glass card connected to real evidence points
   in every category. Full educational content remains behind More. */
(function(root){
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const glyphs={back:'<path d="m14 6-6 6 6 6"/>',next:'<path d="m10 6 6 6-6 6"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',sound:'<path d="m11 5-6 5H2v4h3l6 5Zm4 3a6 6 0 0 1 0 8"/>',check:'<path d="m5 12 4 4L19 6"/>',question:'<path d="M9 8a3 3 0 0 1 6 0c0 2-3 2-3 5M12 17h.01"/>',spark:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"/>',memory:'<path d="M3 11a9 9 0 1 1 2 7M3 5v6h6M12 7v5l3 2"/>',list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>'};
  const icon=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${glyphs[k]||glyphs.next}</svg>`;
  const definitions=[{key:'visible',label:'Facts',icon:'check'},{key:'possible',label:'Possibilities',icon:'question'},{key:'imagine',label:'Imagine',icon:'spark'},{key:'personal',label:'Your memory',icon:'memory'}];
  function design(){return 'linked';}
  const kind=row=>root.EngBookPictureLanguage.boundary(row).kind;
  function focus(row,lesson){
    const points=(row?.evidenceHotspotIds||[]).map(id=>lesson.hotspots.find(h=>h.id===id)).filter(h=>h&&Number.isFinite(Number(h.x))&&Number.isFinite(Number(h.y)));
    if(!points.length)return {x:50,y:50};
    return {x:(Math.min(...points.map(h=>Number(h.x)))+Math.max(...points.map(h=>Number(h.x))))/2,y:(Math.min(...points.map(h=>Number(h.y)))+Math.max(...points.map(h=>Number(h.y))))/2};
  }
  function groups(rows){return definitions.map(group=>({...group,indices:rows.flatMap((row,index)=>kind(row)===group.key?[index]:[])})).filter(group=>group.indices.length);}
  function filterKey(rows,key){const available=groups(rows);return available.find(group=>group.key===key)?.key||available[0]?.key||'visible';}
  function lenses(rows,key){
    return `<nav class="scenario-lenses" aria-label="Scenario lenses">${groups(rows).map(group=>`<button type="button" data-canvas-action="scenario-filter" data-filter="${group.key}" aria-pressed="${key===group.key}">${icon(group.icon)}<span>${group.label}</span><small>${group.indices.length}</small></button>`).join('')}</nav>`;
  }
  function picker({lesson,rows,filter}){
    const layout=design(lesson),key=filterKey(rows,filter),items=groups(rows).find(group=>group.key===key)?.indices||[];
    const menu=lenses(rows,key);
    return `${layout==='linked'?`<div class="scenario-lens-rail">${menu}</div>`:''}<aside class="scenario-studio scenario-picker scenario-${layout}" aria-label="Picture scenarios" tabindex="-1"><div class="scenario-handle" aria-hidden="true"></div><header><div><span class="scenario-eyebrow">${rows.length} ways to describe</span><h2>Picture scenarios</h2></div><button class="scenario-icon" data-canvas-action="scenarios" aria-label="Close scenarios">${icon('close')}</button></header>${layout==='glass'?menu:''}<div class="scenario-choices">${items.map(index=>`<button data-canvas-action="scenario" data-index="${index}"><span class="scenario-number">${String(index+1).padStart(2,'0')}</span><span>${esc(rows[index].title)}</span>${icon('next')}</button>`).join('')||'<p>No scenarios are available yet.</p>'}</div><p class="scenario-menu-note">Choose a perspective. Keep the picture in view.</p></aside>`;
  }
  function excerpt(text){
    const full=String(text||'').replace(/^(?:CREATIVE EXTENSION|POSSIBLE SCENARIO)\s*[—–-]\s*NOT A VISUAL FACT\.?\s*/i,'').trim();
    if(full.length<=220)return {full,preview:full,long:false};
    const sentences=full.match(/[^.!?]+[.!?]+(?:[”’"])?|[^.!?]+$/g)||[full];
    let preview='';for(const sentence of sentences.slice(0,2)){const next=(preview+' '+sentence).trim();if(next.length>220)break;preview=next;}
    if(!preview)preview=full.slice(0,210).replace(/\s+\S*$/,'')+'…';
    return {full,preview,long:preview!==full};
  }
  function card({lesson,rows,index,row,expanded,peek,level}){
    if(!row)return '';
    const layout=design(lesson),key=kind(row),copy=excerpt(row.text),refs=row.evidenceHotspotIds.map(id=>({h:lesson.hotspots.find(h=>h.id===id)})).filter(ref=>ref.h);
    if(peek)return `<aside class="scenario-studio scenario-peek" aria-label="Picture view"><button data-canvas-action="scenario-peek">${icon('eye')} Return to scenario</button></aside>`;
    const group=definitions.find(group=>group.key===key),note=row.boundary.copy;
    const exercise=key==='visible'?'Describe the same details in two sentences.':key==='possible'?'Use may, might, or seems to and name a visual clue.':key==='personal'?'Use your own experience, or keep your memory fictional.':'Begin with “In an imagined scene…” and continue the story.';
    return `${layout==='linked'?`<div class="scenario-lens-rail">${lenses(rows,key)}</div><svg class="scenario-links" aria-hidden="true"></svg>`:''}<section class="scenario-studio scenario-reading scenario-${layout} ${expanded?'is-expanded':''}" role="region" aria-labelledby="scenario-reading-title" tabindex="-1"><div class="scenario-handle" aria-hidden="true"></div><header><div><span class="scenario-badge ${key}">${icon(group.icon)}${esc(row.boundary.label)}</span><h2 id="scenario-reading-title">${esc(row.title)}</h2></div><div class="scenario-controls"><button class="scenario-icon" data-canvas-action="scenario-hear" aria-label="Listen to scenario">${icon('sound')}</button><button class="scenario-icon" data-canvas-action="close-card" aria-label="Close scenario">${icon('close')}</button></div></header><div class="scenario-reading-body"><p class="scenario-copy">${esc(expanded?copy.full:copy.preview)}</p><p class="scenario-boundary ${key}">${esc(note)}</p>${expanded?`${row.level?`<div class="scenario-levels" aria-label="Scenario language level">${Object.keys(row.levels).map(value=>`<button data-canvas-action="scenario-level" data-level="${esc(value)}" aria-pressed="${level===value}">${esc(value)}</button>`).join('')}</div>`:''}${row.grammarFocus?`<div class="scenario-language"><b>${esc(row.grammarFocus)}</b>${row.collocations?.length?`<small>${row.collocations.map(esc).join(' · ')}</small>`:''}</div>`:''}${refs.length?`<div class="scenario-evidence" aria-label="Related picture details">${refs.map(({h})=>`<button data-canvas-action="anchor" data-index="${lesson.hotspots.indexOf(h)}">${esc(h.en)}</button>`).join('')}</div>`:''}<details class="scenario-your-turn"><summary>Your turn</summary><p>${esc(exercise)}</p></details>`:''}</div><footer><button class="scenario-icon" data-canvas-action="scenario-prev" aria-label="Previous scenario">${icon('back')}</button><span class="scenario-count">${index+1} / ${rows.length}${row.level?`<small>${esc(row.level)}</small>`:''}</span><button class="scenario-icon" data-canvas-action="scenario-next" aria-label="Next scenario">${icon('next')}</button><button class="scenario-icon" data-canvas-action="scenario-peek" aria-label="Show picture without scenario" title="Show picture">${icon('eye')}</button><button class="scenario-more" data-canvas-action="scenario-expand" aria-expanded="${expanded}">${expanded?'Less':'More'}</button><button class="scenario-icon" data-canvas-action="scenario-list" aria-label="All scenarios" title="All scenarios">${icon('list')}</button></footer></section>`;
  }
  // Only visible, separated evidence anchors receive lines. The reader itself
  // stays available even when panning moves every anchor off the screen.
  function links(points,rect,bounds){
    const chosen=[];
    for(const point of points){
      if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||point.x<bounds.left+14||point.x>bounds.right-14||point.y<bounds.top+14||point.y>bounds.bottom-14)continue;
      if(point.x>=rect.x-14&&point.x<=rect.x+rect.width+14&&point.y>=rect.y-14&&point.y<=rect.y+rect.height+14)continue;
      if(chosen.some(line=>Math.hypot(line.x1-point.x,line.y1-point.y)<32))continue;
      const drift=point.x<rect.x+rect.width/2?24:-24;
      const x2=Math.max(rect.x+18,Math.min(point.x+drift,rect.x+rect.width-18)),y2=point.y<rect.y?rect.y:rect.y+rect.height;
      chosen.push({x1:point.x,y1:point.y,x2,y2});if(chosen.length===3)break;
    }
    return chosen;
  }
  function curve(line){
    if(!line)return '';
    const {x1,y1,x2,y2}=line,dx=x2-x1,dy=y2-y1,length=Math.hypot(dx,dy);
    if(!length||![x1,y1,x2,y2].every(Number.isFinite))return '';
    const bend=Math.min(16,Math.max(5,length*.045)),px=-dy/length*bend,py=dx/length*bend;
    const round=value=>Number(value.toFixed(2));
    return `M ${round(x1)} ${round(y1)} C ${round(x1+dx/3+px)} ${round(y1+dy/3+py)}, ${round(x1+dx*2/3+px)} ${round(y1+dy*2/3+py)}, ${round(x2)} ${round(y2)}`;
  }
  function position({stage,shell,row,lesson}){
    const panel=shell.querySelector('.scenario-studio');if(!panel)return;
    const box=shell.getBoundingClientRect(),dock=shell.querySelector('.canvas-dock').getBoundingClientRect(),header=shell.querySelector('.canvas-header').getBoundingClientRect();
    const bottom=box.bottom-dock.top+12,rail=shell.querySelector('.scenario-lens-rail');
    shell.style.setProperty('--scenario-bottom',`${bottom}px`);
    shell.style.setProperty('--scenario-top',`${header.bottom-box.top+10}px`);
    shell.style.setProperty('--scenario-height',`${panel.offsetHeight+12}px`);
    shell.style.setProperty('--scenario-rail-height',`${rail?rail.offsetHeight+10:0}px`);
    const svg=shell.querySelector('.scenario-links');if(!svg||!row)return;
    const photo=stage.querySelector('.v59-scene-content').getBoundingClientRect(),viewport=stage.getBoundingClientRect(),card=panel.getBoundingClientRect();
    const points=row.evidenceHotspotIds.map(id=>lesson.hotspots.find(h=>h.id===id)).filter(Boolean).map(h=>({x:photo.left-box.left+photo.width*h.x/100,y:photo.top-box.top+photo.height*h.y/100}));
    const lines=links(points,{x:card.left-box.left,y:card.top-box.top,width:card.width,height:card.height},{left:viewport.left-box.left,top:viewport.top-box.top,right:viewport.right-box.left,bottom:viewport.bottom-box.top});
    svg.innerHTML=lines.map(line=>`<path d="${curve(line)}"/><circle cx="${line.x1}" cy="${line.y1}" r="9"/>`).join('');
  }
  root.EngBookScenarios=Object.freeze({design,focus,groups,filterKey,picker,card,excerpt,links,curve,position});
})(typeof window!=='undefined'?window:globalThis);
