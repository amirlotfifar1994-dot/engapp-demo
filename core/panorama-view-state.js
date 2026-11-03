/* A usable lesson photograph stays behind the native viewer until its first frame. */
(function(root){'use strict';
 function mount(host,frame,{image='',onReload=()=>{},isLocked=()=>false}={}){
  const doc=root.document;if(!doc||!host||!frame)return null;let disposed=false;
  host.classList.add('pano-view-host');if(image)host.style.backgroundImage='url('+JSON.stringify(String(image))+')';
  const status=doc.createElement('div'),label=doc.createElement('span'),reload=doc.createElement('button');
  status.className='pano-view-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');
  label.textContent='Opening 360° view…';reload.type='button';reload.setAttribute('aria-label','Reload 360 degree view');reload.title='Reload 360° view';
  reload.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10a9 9 0 1 1 1 8M3 4v6h6"/></svg>';
  const update=()=>{if(!disposed)reload.disabled=Boolean(isLocked());};
  const focus=()=>{if(!disposed&&!isLocked())reload.focus({preventScroll:true});};
  const click=()=>{if(!disposed&&!isLocked())onReload();};reload.addEventListener('click',click);status.append(label,reload);host.append(status);
  function set(phase){
   if(disposed||!['loading','ready','error'].includes(phase))return false;
   const active=doc.activeElement,loading=phase==='loading';host.dataset.panoState=phase;status.hidden=!loading;
   if(loading){frame.setAttribute('inert','');frame.setAttribute('aria-hidden','true');if(active===frame)focus();}
   else{frame.removeAttribute('inert');frame.removeAttribute('aria-hidden');if(active===reload)frame.focus({preventScroll:true});}
   update();return true;
  }
  function dispose(){if(disposed)return;disposed=true;reload.removeEventListener('click',click);status.remove();frame.removeAttribute('inert');frame.removeAttribute('aria-hidden');host.classList.remove('pano-view-host');delete host.dataset.panoState;}
  set('loading');return Object.freeze({set,update,focus,dispose});
 }
 root.EngBookPanoramaView=Object.freeze({mount});if(typeof module!=='undefined'&&module.exports)module.exports=root.EngBookPanoramaView;
})(typeof window!=='undefined'?window:globalThis);
