/* EngBook Access Model v0.83
   Free/account samples + backend-snapshot permanent lesson ownership + editable products.
*/
(function(root){
  'use strict';
  const VERSION='0.89';
  const catalog=()=>root.EngBookStoreCatalog||root.EngBookUnlockCatalog,features=()=>root.EngBookAdminFeatures;
  const commercial=()=>{try{return root.EngBookCommercial?.status?.()||{};}catch(_){return {};}};
  const purchases=()=>root.EngBookLessonPurchases;
  const accessConfig=()=>root.ENGBOOK_USER_ACCESS_CONFIG||{};
  const enforcementEnabled=()=>accessConfig().enforceLessonAccess===true;
  const freeMode=()=>accessConfig().freeMode===true;
  function authenticated(){return Boolean(commercial().account?.authenticated);}
  function currentTier(){return authenticated()?'account':'free';}
  function paidProductsForLesson(id){return catalog()?.productsForLesson?.(Number(id))||[];}
  function bestProduct(id){
    const rows=paidProductsForLesson(id).filter(p=>p.visible!==false&&p.enabled!==false).sort((a,b)=>(a.type==='category-bundle')-(b.type==='category-bundle')||a.lessonCount-b.lessonCount||a.sortOrder-b.sortOrder);
    const sellable=rows.find(p=>(features()?.saleState?.(p.id)||{sellable:true}).sellable);return sellable||rows[0]||null;
  }
  function requirement(id){const n=Number(id||0),ready=Boolean(root.EngBookContent?.resolve?.(n)?.ready);if(freeMode()&&ready)return {type:'free',product:null,pack:null,reason:'temporary-free-mode'};const sample=catalog()?.sampleType?.(n);if(sample==='free')return features()?.flag?.('guestSamples')===false?{type:'unavailable',product:null,pack:null,reason:'guest-samples-disabled'}:{type:'free',product:null,pack:null};if(sample==='account')return features()?.flag?.('accountSamples')===false?{type:'unavailable',product:null,pack:null,reason:'account-samples-disabled'}:{type:'account',product:null,pack:null};const product=bestProduct(n);if(purchases()?.ownsLesson?.(n))return {type:'pack',product,pack:product,reason:'owned-snapshot'};return product?{type:'pack',product,pack:product}:{type:'unavailable',product:null,pack:null,reason:'no-product'};}
  function meta(id){return root.EngBookContent?.getMeta?.(Number(id))||null;}
  function check(id){
    const n=Number(id||0),m=meta(n),ready=Boolean(m?.ready||root.EngBookContent?.canOpen?.(n)),req=requirement(n);
    if(!ready)return {lessonId:n,ready:false,allowed:false,required:'unavailable',product:null,pack:null,reason:'editorial'};
    const offlineGrant=typeof navigator!=='undefined'&&navigator.onLine===false&&root.EngAppOfflineDownloads?.hasUsable?.(n)===true;
    if(offlineGrant&&req.type!=='unavailable'&&(req.type!=='pack'||features()?.flag?.('paidLessonAccess')!==false))return {lessonId:n,ready:true,allowed:true,required:req.type,product:req.product,pack:req.product,current:'offline',reason:'verified-offline-download',owned:req.type==='pack',sale:null,offline:true};
    if(!enforcementEnabled())return {lessonId:n,ready:true,allowed:true,required:req.type,product:req.product,pack:req.product,current:currentTier(),reason:'preview-open',owned:Boolean(purchases()?.ownsLesson?.(n)),sale:req.product?(features()?.saleState?.(req.product.id)||{sellable:true,reason:'available'}):null,preview:true};
    let allowed=false,reason=req.reason||req.type,sale=null,owned=false;
    if(req.type==='free')allowed=true;
    else if(req.type==='account')allowed=authenticated();
    else if(req.type==='pack'){
      owned=Boolean(purchases()?.ownsLesson?.(n));allowed=owned&&features()?.flag?.('paidLessonAccess')!==false;
      sale=req.product?(features()?.saleState?.(req.product.id)||{sellable:true,reason:'available'}):{sellable:false,reason:'no-product'};
      if(owned&&!allowed)reason='paid-access-disabled';else if(!owned)reason=sale.sellable?'pack':'pack-not-for-sale';
    }
    return {lessonId:n,ready:true,allowed,required:req.type,product:req.product,pack:req.product,current:currentTier(),reason:allowed?'granted':reason,owned,sale};
  }
  function tierLabel(t){return t==='account'?'Free account':t==='pack'?'Lesson pack':t==='unavailable'?'Unavailable':'Free';}
  function lessonBadge(id){const g=check(id);if(g.preview&&g.required==='pack'&&!g.owned)return {tier:'preview',label:'Open preview',className:'v82-access-preview'};if(g.required==='pack'){if(g.owned&&g.allowed)return {tier:'unlocked',label:'Unlocked',className:'v82-access-unlocked'};if(g.owned&&!g.allowed)return {tier:'paused',label:'Access paused',className:'v82-access-unavailable'};return {tier:'pack',label:g.sale?.sellable===false?'Not for sale':(g.product?.label||'Lesson pack'),className:g.sale?.sellable===false?'v82-access-unavailable':'v82-access-pack'};}const t=g.required;return {tier:t,label:tierLabel(t),className:`v82-access-${t}`};}
  function counts(ids){const out={free:0,account:0,pack:0,unlocked:0,unavailable:0};(ids||[]).forEach(id=>{const g=check(id);if(g.required==='free')out.free++;else if(g.required==='account')out.account++;else if(g.required==='pack'){out.pack++;if(g.owned)out.unlocked++;}else out.unavailable++;});return out;}
  function ownedPackIds(){return purchases()?.status?.().ownedProductIds||[];}
  root.EngBookAccess=Object.freeze({version:VERSION,currentTier,authenticated,enforcementEnabled,freeMode,requirement,requiredTier:id=>requirement(id).type,check,tierLabel,lessonBadge,counts,ownedPackIds,policy:Object.freeze({freeMode:'All ready lessons are temporarily open while the course is reviewed.',freeLessons:Array.from({length:60},(_,index)=>index+1),accountLessons:[],paid:'Permanent lesson rights come from backend entitlement snapshots; store products are admin-editable and can include category bundles.'})});
})(typeof window!=='undefined'?window:globalThis);
