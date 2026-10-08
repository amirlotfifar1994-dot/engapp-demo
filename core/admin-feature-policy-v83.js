/* EngBook Admin Feature Policy v0.83
   Backend-first controls for learner features and permanent product sales.
   Sales/display controls never delete backend-verified purchased lesson rights.
*/
(function(root){
  'use strict';
  const VERSION='0.83',BUILD=root.ENGBOOK_BUILD_INFO||{},config=root.ENGBOOK_COMMERCIAL_CONFIG||{};
  const KEY=BUILD.storage?.adminFeatureKey||'engbook_v83_admin_feature_policy',LEGACY_KEYS=['engbook_v64_admin_feature_policy','engbook_v63_admin_feature_policy','engbook_v62_admin_feature_policy'];
  const FLAG_KEYS=Object.freeze([
    'learnerPanel','progressOverview','learningPath','savedLibrary','lessonNotes','lessonBookmarks','subscriptionPanel',
    'guestSamples','accountSamples','paidLessonAccess','lessonPackSales','unlockStore','checkout','refreshPurchases','restorePurchases',
    'productCovers','storePricing','compareAtPricing','discountBadges','categoryBundles','adminUserSupport','adminPurchaseHistory','adminManualAccessGrants'
  ]);
  const DEFAULT_FLAGS=Object.freeze({
    learnerPanel:true,progressOverview:true,learningPath:true,savedLibrary:true,lessonNotes:true,lessonBookmarks:true,subscriptionPanel:true,
    guestSamples:true,accountSamples:true,paidLessonAccess:true,lessonPackSales:true,unlockStore:true,checkout:true,refreshPurchases:true,restorePurchases:true,
    productCovers:true,storePricing:true,compareAtPricing:true,discountBadges:true,categoryBundles:true,adminUserSupport:true,adminPurchaseHistory:true,adminManualAccessGrants:true
  });
  const catalog=()=>root.EngBookStoreCatalog||root.EngBookUnlockCatalog;
  const commercial=()=>{try{return root.EngBookCommercial?.status?.()||{};}catch(_){return {};}};
  const knownCategories=()=>[...new Set((catalog()?.listAllProducts?.()||catalog()?.listPacks?.()||[]).map(p=>String(p.categoryId)))];
  const knownProducts=()=>catalog()?.productIds?.()||[];
  function defaults(){const categorySales={},packSales={};knownCategories().forEach(id=>categorySales[id]=true);knownProducts().forEach(id=>packSales[id]=true);return {schema:2,source:'defaults',revision:null,updatedAt:null,flags:{...DEFAULT_FLAGS},categorySales,packSales};}
  function boolMap(input,keys){const out={};for(const k of keys)out[k]=typeof input?.[k]==='boolean'?input[k]:true;return out;}
  function normalize(raw){const x=raw&&typeof raw==='object'?raw:{};const flags={...DEFAULT_FLAGS};for(const k of FLAG_KEYS)if(typeof x.flags?.[k]==='boolean')flags[k]=x.flags[k];return {schema:2,source:['backend','local-preview','defaults'].includes(x.source)?x.source:'defaults',revision:x.revision==null?null:String(x.revision).slice(0,160),updatedAt:Number(x.updatedAt)||null,flags,categorySales:boolMap(x.categorySales,knownCategories()),packSales:boolMap(x.packSales,knownProducts())};}
  function read(){try{let raw=root.localStorage?.getItem(KEY);if(!raw){for(const k of LEGACY_KEYS){raw=root.localStorage?.getItem(k);if(raw){try{root.localStorage?.setItem(KEY,raw);}catch(_){}break;}}}return normalize(JSON.parse(raw||'null'));}catch(_){return defaults();}}
  let state=read();
  function save(){try{root.localStorage?.setItem(KEY,JSON.stringify(state));return true;}catch(_){return false;}}
  function isAdmin(){const a=commercial().account||{},roles=Array.isArray(a.roles)?a.roles.map(x=>String(x).toLowerCase()):[];return Boolean(a.authenticated&&(a.isAdmin===true||roles.includes('admin')))||config.allowLocalAdminPreview===true;}
  function flag(name){return Object.prototype.hasOwnProperty.call(state.flags,name)?state.flags[name]:false;}
  function categorySaleEnabled(id){return state.categorySales[String(id)]!==false;}
  function packSaleEnabled(id){return state.packSales[String(id)]!==false;}
  function saleState(productId){const p=catalog()?.getProduct?.(productId)||catalog()?.getPack?.(productId);if(!p)return {sellable:false,reason:'unknown-product'};if(p.visible===false)return {sellable:false,reason:'hidden-product'};if(p.enabled===false)return {sellable:false,reason:'product-disabled'};if(p.type==='category-bundle'&&!flag('categoryBundles'))return {sellable:false,reason:'category-bundles-disabled'};if(!flag('lessonPackSales'))return {sellable:false,reason:'sales-disabled'};if(!categorySaleEnabled(p.categoryId))return {sellable:false,reason:'category-sales-disabled'};if(!packSaleEnabled(p.id))return {sellable:false,reason:'product-sales-disabled'};if(!flag('checkout'))return {sellable:false,reason:'checkout-disabled'};return {sellable:true,reason:'available'};}
  function tabEnabled(tab){if(!flag('learnerPanel'))return false;const map={overview:'progressOverview',path:'learningPath',saved:'savedLibrary',notes:'lessonNotes',plan:'subscriptionPanel',access:'unlockStore'};return map[tab]?flag(map[tab]):false;}
  function status(){return {version:VERSION,isAdmin:isAdmin(),source:state.source,revision:state.revision,updatedAt:state.updatedAt,flags:{...state.flags},categorySales:{...state.categorySales},packSales:{...state.packSales},backend:{read:Boolean(String(config.featurePolicyEndpoint||'').trim()),write:Boolean(String(config.adminFeatureEndpoint||'').trim())},localPreview:Boolean(config.allowLocalAdminPreview===true)};}
  function apply(raw,source='backend'){state=normalize({...raw,source,updatedAt:Date.now()});save();root.dispatchEvent?.(new CustomEvent('engbook:feature-policy',{detail:status()}));return status();}
  function validatePatch(patch={}){const out={flags:{},categorySales:{},packSales:{}};for(const [k,v] of Object.entries(patch.flags||{}))if(FLAG_KEYS.includes(k)&&typeof v==='boolean')out.flags[k]=v;for(const [k,v] of Object.entries(patch.categorySales||{}))if(knownCategories().includes(String(k))&&typeof v==='boolean')out.categorySales[String(k)]=v;for(const [k,v] of Object.entries(patch.packSales||{}))if(knownProducts().includes(String(k))&&typeof v==='boolean')out.packSales[String(k)]=v;return out;}
  async function request(url,payload){if(!url)throw new Error('Feature-policy backend is not connected.');if(typeof root.fetch!=='function')throw new Error('Network transport is unavailable.');if(typeof navigator!=='undefined'&&navigator.onLine===false)throw new Error('Device is offline.');const headers={'Content-Type':'application/json','Accept':'application/json','X-EngBook-Client':BUILD.tag||'v0.83',...(config.headers||{})};const res=await root.fetch(url,{method:'POST',headers,body:JSON.stringify(payload||{}),credentials:config.fetchCredentials||'same-origin'});if(!res.ok)throw new Error(`Feature-policy request failed with HTTP ${res.status}.`);const data=await res.json();if(!data||typeof data!=='object')throw new Error('Feature-policy backend returned an invalid response.');return data;}
  async function refresh(){const endpoint=String(config.featurePolicyEndpoint||'').trim();if(!endpoint)return {ok:false,status:'not-configured',policy:status()};const data=await request(endpoint,{action:'read-engbook-feature-policy',build:BUILD.tag||null});const p=data.policy||data.featurePolicy||data.flags;if(!p||typeof p!=='object')throw new Error('Feature-policy response requires policy data.');return {ok:true,status:'verified',policy:apply(p,'backend')};}
  function applyLocalPreview(patch){if(config.allowLocalAdminPreview!==true)throw new Error('Local admin preview is disabled in this build.');if(!isAdmin())throw new Error('Admin access is required.');const clean=validatePatch(patch),merged={...state,flags:{...state.flags,...clean.flags},categorySales:{...state.categorySales,...clean.categorySales},packSales:{...state.packSales,...clean.packSales},revision:`local-${Date.now()}`};return apply(merged,'local-preview');}
  async function update(patch){if(!isAdmin())throw new Error('Admin access is required.');const clean=validatePatch(patch),endpoint=String(config.adminFeatureEndpoint||'').trim();if(!endpoint){if(config.allowLocalAdminPreview===true)return {ok:true,status:'local-preview',policy:applyLocalPreview(clean)};throw new Error('Admin feature-control backend is not connected.');}const data=await request(endpoint,{action:'update-engbook-feature-policy',revision:state.revision,patch:clean});const p=data.policy||data.featurePolicy;if(!p||typeof p!=='object')throw new Error('Admin update response requires the saved policy.');return {ok:true,status:'saved',policy:apply(p,'backend')};}
  function reconcileCatalog(){state=normalize(state);save();return status();}
  root.EngBookAdminFeatures=Object.freeze({version:VERSION,flag,status,isAdmin,tabEnabled,categorySaleEnabled,packSaleEnabled,saleState,refresh,update,applyRemotePolicy:raw=>apply(raw,'backend'),applyLocalPreview,validatePatch,reconcileCatalog,flagKeys:FLAG_KEYS});
  root.addEventListener?.('engbook:store-catalog',()=>reconcileCatalog());
})(typeof window!=='undefined'?window:globalThis);
