/* Hospital tour navigation preserves the central lesson's embedded context. */
(function(root){
 'use strict';
 function destination(href,node,nodes,scene='hospital'){
  if(!Object.hasOwn(nodes,node))return null;
  const url=new URL(href);url.searchParams.set('scene',scene);url.searchParams.set('node',node);
  return url.href;
 }
 function mount({hospital,current,embedded=false,send=()=>{},scene='hospital',worldName=scene}){
  const nav=root.document.createElement('nav');nav.className='hospital-tour';nav.setAttribute('aria-label',worldName[0].toUpperCase()+worldName.slice(1)+' locations');
  const label=root.document.createElement('span');label.textContent='Explore the '+worldName;nav.append(label);
  let locked=false,leaving=false;
  for(const [id,node] of Object.entries(hospital.nodes)){
   const button=root.document.createElement('button');button.type='button';button.textContent=node.locationLabel;
   button.setAttribute('aria-current',id===current?'location':'false');button.disabled=id===current;
   button.dataset.hospitalNode=id;
   button.addEventListener('click',()=>{if(locked||leaving||id===current)return;leaving=true;if(embedded)send('clear');root.location.assign(destination(root.location.href,id,hospital.nodes,scene));});nav.append(button);
  }
  root.document.getElementById('panorama').append(nav);
  const description=root.document.querySelector('#pano-camera > p');if(description)description.textContent='Drag to look around. Pinch or use + / − to zoom. Choose a location to move through the '+worldName+'.';
  return {setReading(value){nav.hidden=Boolean(value);},setLocked(value){locked=Boolean(value);for(const button of nav.querySelectorAll('button'))button.disabled=locked||button.dataset.hospitalNode===current;},focus(id){if(locked||leaving)return false;const node=Object.entries(hospital.nodes).find(([,n])=>n.hotspots.some(h=>h.id===id))?.[0];if(!node||node===current)return false;leaving=true;root.location.replace(destination(root.location.href,node,hospital.nodes,scene));return true;}};
 }
 const api={destination,mount};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.SceneSpeakHospitalNavigation=api;
})(typeof window!=='undefined'?window:globalThis);
