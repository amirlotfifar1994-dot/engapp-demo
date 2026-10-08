/* EngApp v0.99 — Adaptive Taxonomy Contract
   Browser + Node/CommonJS compatible. Taxonomy is image-driven data, never a fixed course-wide template.
*/
(function(root,factory){
  const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.EngAppAdaptiveTaxonomyContract=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const arr=v=>Array.isArray(v)?v:[];
  const obj=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
  const str=v=>String(v??'').trim();
  const genericTemplate=['overview','people','clothing','actions','environment','light'];
  const normalize=s=>str(s).toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'');
  function counts(pack){const out={};for(const h of arr(pack?.hotspots)){const k=str(h?.categoryKey);if(k)out[k]=(out[k]||0)+1;}return out;}
  function inspect(pack,{strict=false}={}){
    const errors=[],warnings=[],p=obj(pack),tax=obj(p?.presentation?.hotspotTaxonomy),cats=arr(tax.categories),hs=arr(p.hotspots),ready=p?.quality?.adaptiveTaxonomyReady===true;
    const keys=cats.map(c=>str(c?.key)).filter(Boolean),labels=cats.map(c=>str(c?.label)).filter(Boolean),keySet=new Set(keys),labelSet=new Set(labels.map(x=>x.toLowerCase())),byCat=counts(p);
    if(!cats.length){(ready||strict?errors:warnings).push('presentation.hotspotTaxonomy.categories is required for adaptive-taxonomy readiness.');return {ok:errors.length===0,ready,errors,warnings,counts:byCat};}
    if(keys.length!==cats.length)errors.push('every taxonomy category requires a key.');
    if(labels.length!==cats.length)errors.push('every taxonomy category requires a label.');
    if(keySet.size!==keys.length)errors.push('taxonomy category keys must be unique.');
    if(labelSet.size!==labels.length)errors.push('taxonomy category labels must be unique.');
    const def=str(tax.defaultCategory||'overview');if(!keySet.has(def))errors.push('defaultCategory must be declared.');
    for(const h of hs){const k=str(h?.categoryKey);if(!k)(ready||strict?errors:warnings).push(`hotspot ${h?.id||h?.en||'?'} has no categoryKey.`);else if(!keySet.has(k))errors.push(`hotspot ${h?.id||h?.en||'?'} references unknown category ${k}.`);}
    for(const k of keys){if(k===def)continue;if(!(byCat[k]>0))errors.push(`taxonomy category ${k} is empty.`);}
    if(byCat[def]>0&&tax?.audit?.overviewAssignmentJustified!==true)warnings.push('Overview is intended as a sparse view mode; assigning hotspots directly to overview should be justified explicitly.');
    const normalized=keys.map(normalize);if(normalized.length===genericTemplate.length&&genericTemplate.every((x,i)=>normalized[i]===x))warnings.push('taxonomy exactly matches the generic fallback template; image-specific justification is required before readiness.');
    if(ready||strict){
      if(str(tax.version)!=='adaptive-taxonomy-v3')errors.push('adaptive-taxonomy-ready packs must use adaptive-taxonomy-v3.');
      if(str(tax.contract)!=='engapp-adaptive-taxonomy-v0.99')errors.push('adaptive-taxonomy-ready packs must declare the v0.99 taxonomy contract.');
      if(str(tax.basis)!=='image-audit')errors.push('adaptive-taxonomy-ready packs must declare basis=image-audit.');
      if(!str(tax.profile)||/^generic|default|standard$/i.test(str(tax.profile)))errors.push('taxonomy.profile must name the scene-specific profile.');
      const audit=obj(tax.audit);if(audit.sceneSpecific!==true)errors.push('taxonomy audit must confirm sceneSpecific=true.');if(audit.noForcedCategoryCount!==true)errors.push('taxonomy audit must confirm noForcedCategoryCount=true.');if(audit.reviewed!==true)errors.push('taxonomy audit must be reviewed.');if(!str(audit.rationale))errors.push('taxonomy audit rationale is required.');
      const decisions=arr(audit.categoryDecisions),decisionKeys=new Set(decisions.map(x=>str(x?.key)).filter(Boolean));for(const k of keys)if(!decisionKeys.has(k))errors.push(`taxonomy audit decision missing for ${k}.`);for(const d of decisions)if(!str(d?.rationale))errors.push(`taxonomy audit rationale missing for decision ${d?.key||'?'}.`);
    }
    return {ok:errors.length===0,ready,errors,warnings,counts:byCat,profile:str(tax.profile),categoryCount:cats.length};
  }
  return Object.freeze({version:'0.99',contract:'engapp-adaptive-taxonomy-v0.99',inspect,counts});
});
