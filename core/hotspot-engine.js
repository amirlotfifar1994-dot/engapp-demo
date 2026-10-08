/* EngBook Hotspot Engine v0.35 — atomic labels, detail layers, geometry QA. */
(function(root){
  'use strict';
  const VERSION='0.35';
  const LEVELS=new Set(['primary','detail']);
  const text=v=>typeof v==='string'&&v.trim().length>0;
  const arr=v=>Array.isArray(v)?v:[];
  const norm=s=>String(s||'').toLowerCase().trim().replace(/\s+/g,' ');
  const ambiguousLabel=s=>{const t=norm(s);return /\bor\b/.test(t)||/\s\/\s/.test(t)||/\b(?:books?|workbooks?|worksheets?|pictures?|photographs?)\s+and\s+(?:books?|workbooks?|worksheets?|pictures?|photographs?)\b/.test(t);};
  function childrenOf(hotspots,parentId){return arr(hotspots).filter(h=>h?.level==='detail'&&h?.parentId===parentId);}
  function primary(hotspots){return arr(hotspots).filter(h=>(h?.level||'primary')==='primary');}
  function visibleEntries(hotspots,activeParent){
    const hs=arr(hotspots);return hs.map((h,index)=>({h,index})).filter(({h})=>(h?.level||'primary')==='primary'||(activeParent&&h?.level==='detail'&&h?.parentId===activeParent));
  }
  function geometry(hotspots,{minPrimaryDistance=6.5}={}){
    const p=primary(hotspots),collisions=[];
    for(let i=0;i<p.length;i++)for(let j=i+1;j<p.length;j++){
      const a=p[i],b=p[j],dx=Number(a.x)-Number(b.x),dy=Number(a.y)-Number(b.y),distance=Math.hypot(dx,dy);
      if(Number.isFinite(distance)&&distance<minPrimaryDistance)collisions.push({a:a.id||a.en,b:b.id||b.en,distance:Number(distance.toFixed(2))});
    }
    return {primaryCount:p.length,collisions,minPrimaryDistance};
  }
  function audit(hotspots,opts={}){
    const hs=arr(hotspots),errors=[],warnings=[],ids=new Set(),labels=new Set();
    hs.forEach((h,i)=>{
      const id=String(h?.id||'').trim(),label=String(h?.en||'').trim(),level=h?.level||'primary';
      if(!id)errors.push(`hotspot ${i}: id is required`);else if(ids.has(id))errors.push(`hotspot ${i}: duplicate id ${id}`);else ids.add(id);
      if(!LEVELS.has(level))errors.push(`hotspot ${id||i}: level must be primary or detail`);
      if(level==='detail'&&!String(h?.parentId||'').trim())errors.push(`hotspot ${id||i}: detail hotspot needs parentId`);
      if(!text(label))errors.push(`hotspot ${id||i}: English label is required`);else if(labels.has(norm(label)))errors.push(`hotspot ${id||i}: duplicate English label ${label}`);else labels.add(norm(label));
      // The English-only course does not require translated hotspot labels.
      if(h?.pronReviewed!==false&&!text(h?.pron))errors.push(`hotspot ${id||i}: IPA/pronunciation is required`);
      if(!text(h?.example))errors.push(`hotspot ${id||i}: example sentence is required`);
      if(!Number.isFinite(Number(h?.x))||Number(h.x)<0||Number(h.x)>100)errors.push(`hotspot ${id||i}: x must be 0–100`);
      if(!Number.isFinite(Number(h?.y))||Number(h.y)<0||Number(h.y)>100)errors.push(`hotspot ${id||i}: y must be 0–100`);
      if(ambiguousLabel(label))errors.push(`hotspot ${id||i}: label is ambiguous/composite (${label})`);
    });
    hs.filter(h=>h?.level==='detail').forEach(h=>{const parent=hs.find(x=>x?.id===h.parentId);if(!parent)errors.push(`hotspot ${h.id}: parent ${h.parentId} does not exist`);else if((parent.level||'primary')!=='primary')errors.push(`hotspot ${h.id}: parent ${h.parentId} must be primary`);});
    const geo=geometry(hs,opts);geo.collisions.forEach(c=>errors.push(`primary hotspot collision: ${c.a} ↔ ${c.b} (${c.distance}%)`));
    if(primary(hs).length<4)warnings.push('fewer than four primary hotspots');
    return {ok:errors.length===0,errors,warnings,geometry:geo,total:hs.length,primary:primary(hs).length,detail:hs.filter(h=>h?.level==='detail').length};
  }
  root.EngBookHotspots=Object.freeze({version:VERSION,audit,geometry,childrenOf,visibleEntries,primary,ambiguousLabel});
})(typeof window!=='undefined'?window:globalThis);
