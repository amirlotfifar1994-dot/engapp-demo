/* A point locates one detail; a region groups details; a scene cue is contextual.
   Region fallbacks surround authored child coordinates, not inferred silhouettes. */
(function(root){
  'use strict';
  const clamp=(v,a,b)=>Math.max(a,Math.min(v,b));
  function validBounds(value){
    if(!value||!['x','y','width','height'].every(k=>Number.isFinite(value[k])))return null;
    const {x,y,width,height}=value;
    return x>=0&&y>=0&&width>0&&height>0&&x+width<=100&&y+height<=100?{x,y,width,height}:null;
  }
  function resolve(h={},hotspots=[]){
    const authored=h.presentation?.scope;
    if(authored?.kind==='point')return {kind:'point'};
    if(authored?.kind==='scene')return {kind:'scene',label:'Scene'};
    const segments=Array.isArray(authored?.segments)?authored.segments.slice(0,8).map(validBounds).filter(Boolean):[];
    const bounds=segments.length?union(segments):validBounds(authored?.bounds);
    const collective=/\b(group|crowd|audience|diners|visitors)\b/i.test(h.en||'')||/^(people|children|seated guests|two |three |four |five |six |seven )/i.test(h.en||'');
    const group=h.type==='group'||h.level!=='detail'&&(h.type==='person'&&collective||h.type==='object'&&/^people\b/i.test(h.en||'')||h.type==='drink'&&/^two\b/i.test(h.en||''));
    if(authored?.kind==='region'||group){
      const members=hotspots.filter(c=>c.id!==h.id&&Number.isFinite(c.x)&&Number.isFinite(c.y)&&(c.parentId===h.id||root.EngBookHotspots?.pathOf?.(hotspots,c)?.slice(0,-1).some(parent=>parent.id===h.id)));
      let region=bounds;
      if(!region&&members.length>=2){
        const xs=members.map(c=>c.x),ys=members.map(c=>c.y);
        const x=clamp(Math.min(...xs)-5,1,95),y=clamp(Math.min(...ys)-6,1,95);
        const right=clamp(Math.max(...xs)+5,x+1,99),bottom=clamp(Math.max(...ys)+6,y+1,99);
        region={x,y,width:right-x,height:bottom-y};
      }
      return {kind:'region',label:'Group',bounds:region,segments:segments.length?segments:region?[region]:[],members:members.map(c=>c.id)};
    }
    if(h.type==='light'&&/^(soft daylight|warm low-angle light|dappled sunlight|warm filtered sunlight|warm sunlight|warm window light)$/i.test(h.en||''))return {kind:'scene',label:'Scene'};
    if(h.type==='action'&&/shared seated group moment/i.test(h.en||''))return {kind:'scene',label:'Scene'};
    return {kind:'point'};
  }
  function union(regions){
    const x=Math.min(...regions.map(r=>r.x)),y=Math.min(...regions.map(r=>r.y));
    return {x,y,width:Math.max(...regions.map(r=>r.x+r.width))-x,height:Math.max(...regions.map(r=>r.y+r.height))-y};
  }
  function fitRegion(bounds,image,viewport){
    const region=validBounds(bounds);if(!region)return null;
    const scale=clamp(Math.min(viewport.width/(image.width*region.width/100),viewport.height/(image.height*region.height/100)),1,8);
    return {scale,x:(region.x+region.width/2)/100,y:(region.y+region.height/2)/100};
  }
  function marker(h={},hotspots=[]){
    const area=resolve(h,hotspots),authored=h.presentation?.scope?.marker;
    const valid=p=>p&&['x','y'].every(k=>Number.isFinite(p[k])&&p[k]>=0&&p[k]<=100);
    if(area.kind==='point')return {x:h.x,y:h.y};
    if(valid(authored))return {x:authored.x,y:authored.y};
    if(!area.bounds)return {x:h.x,y:h.y};
    // A collective cue sits near an extent edge, away from individual details.
    // Its position is a selection handle; the highlighted regions define its scope.
    const regions=area.segments.length?area.segments:[area.bounds],candidates=[];
    for(const b of regions){
      const dx=Math.min(3,b.width/4),dy=Math.min(3,b.height/4);
      for(const f of [.5,.25,.75]){
        candidates.push({x:b.x+b.width*f,y:b.y+b.height-dy},{x:b.x+b.width*f,y:b.y+dy});
        candidates.push({x:b.x+dx,y:b.y+b.height*f},{x:b.x+b.width-dx,y:b.y+b.height*f});
      }
    }
    const others=hotspots.filter(p=>p.id!==h.id&&valid(p));
    const score=p=>Math.min(12,...others.map(q=>Math.hypot(p.x-q.x,p.y-q.y)))-Math.hypot(p.x-h.x,p.y-h.y)*.05;
    return candidates.sort((a,b)=>score(b)-score(a))[0];
  }
  root.EngBookHotspotScope=Object.freeze({resolve,validBounds,fitRegion,marker});
})(typeof window!=='undefined'?window:globalThis);
