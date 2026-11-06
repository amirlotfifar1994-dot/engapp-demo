/* Keep renderer math, source ordering and discovery rules; cache marker references. */
import fs from 'node:fs/promises';import path from 'node:path';
const file=path.resolve(import.meta.dirname,'../core/panorama-lab.js');let s=await fs.readFile(file,'utf8');
if(!s.includes('const markerButtons=new Map()')){
 const replace=(from,to)=>{if(!s.includes(from))throw Error('Review changed panorama marker source: '+from.slice(0,80));s=s.replace(from,to);};
 replace(' let dotClusters=new Map(),clusterDialog=null;'," const markerButtons=new Map(),markerRays=new Map(data.hotspots.map(h=>[h.id,M.fromUV(h.u,h.v)])),paintedMarkers=new Set();let markerKey=null,markerCandidates=[];\n let dotClusters=new Map(),clusterDialog=null;");
 replace('dots.append(button);}',"const count=doc.createElement('span');count.className='pano-dot-count';count.setAttribute('aria-hidden','true');button.append(count);markerButtons.set(h.id,{button,count});dots.append(button);}");
 replace('M.project(M.fromUV(h.u,h.v),camera,width,height)','M.project(markerRays.get(h.id),camera,width,height)');
 const start=s.indexOf('  if(tree)branchDots=tree.visible(selected||branch);',s.indexOf(' function paintDots(){')),end=s.indexOf("  $('pano-heading').textContent=",start);
 if(start<0||end<0)throw Error('Review changed panorama marker paint boundaries');
 s=s.slice(0,start)+`  const key=[selected,branch,dotsOff,ready].join('|');if(key!==markerKey){markerKey=key;if(tree)branchDots=tree.visible(selected||branch);markerCandidates=ready&&!dotsOff?data.hotspots.filter(visible):[];}
  const focusId=embedded?(coreState?.hintId||coreState?.referenceId||coreState?.selectedId):selected;
  const projected=[];dotClusters.clear();
  for(const h of markerCandidates){const p=dotXY(h);if(p&&p.x>18&&p.x<width-18&&p.y>(renderer?88:18)&&p.y<height-84)projected.push({id:h.id,x:p.x,y:p.y});}
  const groups=data.detailDiscovery&&root.SceneSpeakPanoramaDensity?root.SceneSpeakPanoramaDensity.cluster(projected,38,focusId):projected.map(p=>({...p,ids:[p.id]})),next=new Set(groups.map(g=>g.id));
  for(const id of paintedMarkers)if(!next.has(id)){const {button:b,count}=markerButtons.get(id);b.hidden=true;b.classList.remove('is-cluster','is-active');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label',byId.get(id).title);count.textContent='';paintedMarkers.delete(id);}
  for(const group of groups){const h=byId.get(group.id),{button:b,count}=markerButtons.get(group.id),cluster=group.ids.length>1,expanded=String(h.id===selected),label=cluster?group.ids.length+' details near '+h.title:h.title,text=cluster?String(group.ids.length):'',left=group.x+'px',top=group.y+'px',z=cluster?'4':group.id===focusId?'3':'1';paintedMarkers.add(group.id);b.hidden=false;if(b.style.left!==left)b.style.left=left;if(b.style.top!==top)b.style.top=top;if(b.style.zIndex!==z)b.style.zIndex=z;b.classList.toggle('is-cluster',cluster);b.classList.toggle('is-seen',seen.has(h.id));b.classList.toggle('is-active',h.id===focusId);if(b.getAttribute('aria-expanded')!==expanded)b.setAttribute('aria-expanded',expanded);if(b.getAttribute('aria-label')!==label)b.setAttribute('aria-label',label);if(count.textContent!==text)count.textContent=text;dotClusters.set(group.id,group.ids);}
`+s.slice(end);
 await fs.writeFile(file,s);
}
console.log('Panorama marker references and active candidate sets cached');
