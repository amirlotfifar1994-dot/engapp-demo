/* Spatial portals and a connected route, with one central lesson/progress owner. */
(function(root){'use strict';
 function create({scene,view,canvas,transition,clear,arrive,isLocked,isPractice}){
  const model=root.SceneSpeakCafeTourModel,nodes=scene.tour.nodes;
  let saved=null;try{saved=root.localStorage.getItem('scenespeak:cafe-tour:node:v2');}catch{}
  const query=new URLSearchParams(root.location.search).get('node');
  let current=nodes[query]?query:nodes[saved]?saved:'main',moving=false,disposed=false,lastFailure=null,statusTimer=0;
  let job=Promise.resolve(true);
  const nav=document.createElement('details');nav.className='cafe-tour-nav';
  const summary=document.createElement('summary'),list=document.createElement('nav');list.setAttribute('aria-label','Move between café locations');nav.append(summary,list);
  const status=document.createElement('div');status.className='cafe-tour-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');
  const statusText=document.createElement('span'),retry=document.createElement('button');retry.type='button';retry.textContent='Retry move';retry.hidden=true;status.append(statusText,retry);
  document.body.append(nav,status);
  const portals=document.createElement('div');portals.className='cafe-tour-portals';portals.setAttribute('aria-label','Walk to a nearby location');view.append(portals);
  const buttons=new Map(),portalButtons=new Map();
  for(const id of scene.tour.lessonRoute||Object.keys(nodes)){const node=nodes[id];
   const b=document.createElement('button');b.type='button';b.dataset.tourNode=id;
   const en=document.createElement('span'),fa=document.createElement('small');en.textContent=node.label;fa.textContent=node.fa;fa.lang='fa';fa.dir='rtl';b.append(en,fa);
   b.onclick=()=>{nav.open=false;go(id);};buttons.set(id,b);list.append(b);
  }
  function paintNav(){
   summary.textContent='Walk · '+nodes[current].label;
   for(const [id,b]of buttons){b.disabled=moving||Boolean(isLocked())||Boolean(isPractice())||id===current;b.setAttribute('aria-current',id===current?'location':'false');}
   canvas.dataset.node=current;canvas.dataset.moving=String(moving);
   nav.classList.toggle('is-moving',moving);
  }
  function rebuildPortals(){
   portals.replaceChildren();portalButtons.clear();
   for(const link of nodes[current].links){const b=document.createElement('button');b.type='button';b.className='cafe-tour-portal';b.dataset.walkTo=link.to;b.setAttribute('aria-label','Walk to '+nodes[link.to].label);
    const arrow=document.createElement('span'),label=document.createElement('small');arrow.textContent='➜';arrow.setAttribute('aria-hidden','true');label.textContent=nodes[link.to].label;b.append(arrow,label);b.onclick=e=>{e.stopPropagation();go(link.to);};portals.append(b);portalButtons.set(link.to,{b,link});
   }
  }
  function announce(text,error=false,transient=false){root.clearTimeout(statusTimer);statusText.textContent=text;status.classList.toggle('is-error',error);status.hidden=!text;retry.hidden=!error;if(transient)statusTimer=root.setTimeout(()=>{status.hidden=true;},2600);}
  async function travel(to,options){
   if(disposed||!nodes[to]||(!options.automatic&&(isLocked()||isPractice())))return false;
   const path=model.route(nodes,current,to);if(!path)return false;
   if(path.length===1){arrive?.(current,options);return true;}
   moving=true;paintNav();root.dispatchEvent(new CustomEvent('cafe-tour-moving',{detail:{moving:true}}));
   if(!options.automatic)clear?.();
   try{
    for(const next of path.slice(1)){
     if(disposed||isLocked()||(!options.automatic&&isPractice()))return false;
     const from=nodes[current],destination=nodes[next],link=from.links.find(l=>l.to===next);
     announce('Moving to '+destination.label+'…');
     const ok=await transition(from,destination,link,options);
     if(!ok||disposed)return false;
     current=next;lastFailure=null;paintNav();rebuildPortals();
     const url=new URL(root.location.href);url.searchParams.set('node',current);root.history.replaceState(null,'',url);
     if(!options.automatic)try{root.localStorage.setItem('scenespeak:cafe-tour:node:v2',current);}catch{}
     root.dispatchEvent(new CustomEvent('cafe-node-change',{detail:{id:current,label:nodes[current].label}}));
    }
    announce(options.focusId?'':nodes[current].label+' · Look all around, or follow another arrow.',false,true);
    arrive?.(current,options);if(!options.automatic)view.focus({preventScroll:true});return true;
   }catch(error){lastFailure={to,options};announce('This location could not load. Your current view is still available.',true);canvas.dataset.travelError=String(error);return false;
   }finally{moving=false;paintNav();root.dispatchEvent(new CustomEvent('cafe-tour-moving',{detail:{moving:false}}));}
  }
  function go(to,options={}){
   if(!nodes[to]||disposed)return Promise.resolve(false);
   // Manual double taps are ignored. New lesson targets wait for the current move.
   if(moving&&!options.automatic)return Promise.resolve(false);
   const next=()=>travel(to,options);job=job.then(next,next);return job;
  }
  retry.onclick=()=>{if(lastFailure&&!moving)go(lastFailure.to,lastFailure.options);};
  function paint(width,height,cam){paintNav();for(const {b,link}of portalButtons.values()){
   const point=root.SceneSpeakPanoramaMath.project(model.linkPoint(link),cam,width,height);
   b.hidden=moving||Boolean(isLocked())||Boolean(isPractice())||!point||point.x<34||point.x>width-34||point.y<100||point.y>height-160;
   if(point){b.style.left=point.x+'px';b.style.top=point.y+'px';}
  }}
  function pop(){const id=new URLSearchParams(root.location.search).get('node');if(nodes[id]&&id!==current)go(id,{automatic:true});}
  root.addEventListener('popstate',pop);rebuildPortals();paintNav();announce('');
  return{get current(){return current;},get node(){return nodes[current];},get moving(){return moving;},go,paint,refresh:paintNav,dispose(){disposed=true;root.clearTimeout(statusTimer);root.removeEventListener('popstate',pop);nav.remove();portals.remove();status.remove();}};
 }
 root.SceneSpeakCafeTour=Object.freeze({create});
})(window);
