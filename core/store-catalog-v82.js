/* EngBook Store Catalog v0.82
   Backend-first editable permanent lesson-product catalog.
   Product definitions describe NEW sales. Purchased lesson rights are stored as
   backend-verified lesson snapshots, so later catalog edits do not rewrite old purchases.
*/
(function(root){
  'use strict';
  const VERSION='0.82';
  const BUILD=root.ENGBOOK_BUILD_INFO||{};
  const config={...(root.ENGBOOK_COMMERCIAL_CONFIG||{}),...(root.ENGBOOK_USER_ACCESS_CONFIG||{})};
  const KEY=BUILD.storage?.storeCatalogKey||'engbook_v82_store_catalog';
  const FREE_IDS=Object.freeze([1,2,29,30]);
  const ACCOUNT_IDS=Object.freeze([3,4,31,32]);
  const DEFAULT_PRODUCTS=Object.freeze([
    {id:'cat01-lessons-05-14',type:'lesson-pack',categoryId:1,lessonIds:[5,6,7,8,9,10,11,12,13,14],title:'Home & Relationships • Lessons 05–14',label:'Lessons 05–14',description:'A focused 10-lesson permanent unlock.',sortOrder:10,enabled:true,visible:true,coverImage:'assets/images/lesson_05.jpg',priceLabel:'',compareAtPriceLabel:'',discountLabel:''},
    {id:'cat01-lessons-15-24',type:'lesson-pack',categoryId:1,lessonIds:[15,16,17,18,19,20,21,22,23,24],title:'Home & Relationships • Lessons 15–24',label:'Lessons 15–24',description:'A focused 10-lesson permanent unlock.',sortOrder:20,enabled:true,visible:true,coverImage:'assets/images/lesson_15.jpg',priceLabel:'',compareAtPriceLabel:'',discountLabel:''},
    {id:'cat01-lessons-25-28',type:'lesson-pack',categoryId:1,lessonIds:[25,26,27,28],title:'Home & Relationships • Lessons 25–28',label:'Lessons 25–28',description:'The final 4 paid lessons in this category.',sortOrder:30,enabled:true,visible:true,coverImage:'assets/images/lesson_25.jpg',priceLabel:'',compareAtPriceLabel:'',discountLabel:''},
    {id:'cat01-complete',type:'category-bundle',categoryId:1,lessonIds:Array.from({length:24},(_,i)=>i+5),title:'Complete Home & Relationships',label:'Complete category',description:'Unlock every paid lesson in Category 01 with one permanent purchase.',sortOrder:90,enabled:true,visible:true,coverImage:'assets/images/lesson_01.jpg',priceLabel:'',compareAtPriceLabel:'',discountLabel:'Category bundle'},
    {id:'cat02-lessons-33-42',type:'lesson-pack',categoryId:2,lessonIds:[33,34,35,36,37,38,39,40,41,42],title:'Education & Study • Lessons 33–42',label:'Lessons 33–42',description:'A focused 10-lesson permanent unlock.',sortOrder:10,enabled:true,visible:true,coverImage:'assets/images/lesson_33.jpg',priceLabel:'',compareAtPriceLabel:'',discountLabel:''},
    {id:'cat02-lessons-43-52',type:'lesson-pack',categoryId:2,lessonIds:[43,44,45,46,47,48,49,50,51,52],title:'Education & Study • Lessons 43–52',label:'Lessons 43–52',description:'A focused 10-lesson permanent unlock.',sortOrder:20,enabled:true,visible:true,coverImage:'assets/images/lesson_43.jpg',priceLabel:'',compareAtPriceLabel:'',discountLabel:''},
    {id:'cat02-lessons-53-60',type:'lesson-pack',categoryId:2,lessonIds:[53,54,55,56,57,58,59,60],title:'Education & Study • Lessons 53–60',label:'Lessons 53–60',description:'The final 8 paid lessons in this category.',sortOrder:30,enabled:true,visible:true,coverImage:'assets/images/lesson_53.jpg',priceLabel:'',compareAtPriceLabel:'',discountLabel:''},
    {id:'cat02-complete',type:'category-bundle',categoryId:2,lessonIds:Array.from({length:28},(_,i)=>i+33),title:'Complete Education & Study',label:'Complete category',description:'Unlock every paid lesson in Category 02 with one permanent purchase.',sortOrder:90,enabled:true,visible:true,coverImage:'assets/images/lesson_29.jpg',priceLabel:'',compareAtPriceLabel:'',discountLabel:'Category bundle'}
  ]);
  const course=()=>root.ENGBOOK_COURSE_CATALOG;
  const content=()=>root.EngBookContent;
  function category(id){return course()?.getCategory?.(Number(id))||null;}
  function readyLessonIds(categoryId){
    const rows=content()?.listLessons?.(Number(categoryId))||[];
    return rows.filter(x=>x.ready).map(x=>Number(x.id)).filter(Number.isFinite);
  }
  function validLessonIds(categoryId,ids){
    const ready=new Set(readyLessonIds(categoryId));
    return [...new Set((Array.isArray(ids)?ids:[]).map(Number).filter(n=>Number.isInteger(n)&&ready.has(n)))].sort((a,b)=>a-b);
  }
  function text(v,max=120){return String(v??'').trim().slice(0,max);}
  function safeAsset(v){const s=text(v,240);if(!s)return '';if(/^assets\/[A-Za-z0-9_./-]+\.(?:png|jpe?g|webp|svg)$/i.test(s))return s;return '';}
  function validId(v){const s=text(v,80).toLowerCase();return /^[a-z0-9][a-z0-9-]{2,79}$/.test(s)?s:'';}
  function normalizeProduct(raw,fallback={}){
    const x={...fallback,...(raw&&typeof raw==='object'?raw:{})},categoryId=Number(x.categoryId),c=category(categoryId);
    if(!c)return null;const id=validId(x.id);if(!id)return null;
    const lessonIds=validLessonIds(categoryId,x.lessonIds);if(!lessonIds.length)return null;
    const type=x.type==='category-bundle'?'category-bundle':'lesson-pack';
    const categoryTitle=c.title||`Category ${categoryId}`,categoryShortTitle=c.shortTitle||categoryTitle;
    return {
      id,type,categoryId,lessonIds,lessonCount:lessonIds.length,
      title:text(x.title,120)||`${categoryShortTitle} • ${lessonIds.length} lessons`,
      label:text(x.label,80)||`${lessonIds.length} lessons`,description:text(x.description,260),
      sortOrder:Number.isFinite(Number(x.sortOrder))?Math.max(-9999,Math.min(9999,Number(x.sortOrder))):0,
      enabled:x.enabled!==false,visible:x.visible!==false,coverImage:safeAsset(x.coverImage),
      priceLabel:text(x.priceLabel,80),compareAtPriceLabel:text(x.compareAtPriceLabel,80),discountLabel:text(x.discountLabel,80),
      categoryTitle,categoryShortTitle,access:'permanent'
    };
  }
  function defaults(){return {schema:2,source:'defaults',revision:null,updatedAt:null,products:DEFAULT_PRODUCTS.map(p=>normalizeProduct(p)).filter(Boolean)};}
  function normalize(raw){
    const b=defaults(),x=raw&&typeof raw==='object'?raw:{};const src=Array.isArray(x.products)?x.products:b.products;
    const products=[],seen=new Set();for(const row of src){const p=normalizeProduct(row);if(p&&!seen.has(p.id)){seen.add(p.id);products.push(p);}}
    return {schema:2,source:['backend','local-preview','defaults'].includes(x.source)?x.source:'defaults',revision:x.revision==null?null:text(x.revision,160),updatedAt:Number(x.updatedAt)||null,products};
  }
  function read(){try{return normalize(JSON.parse(root.localStorage?.getItem(KEY)||'null'));}catch(_){return defaults();}}
  let state=read();
  function save(){try{root.localStorage?.setItem(KEY,JSON.stringify(state));return true;}catch(_){return false;}}
  function clone(p){return p?{...p,lessonIds:[...p.lessonIds]}:null;}
  function sorted(rows){return [...rows].sort((a,b)=>a.categoryId-b.categoryId||a.sortOrder-b.sortOrder||a.id.localeCompare(b.id));}
  function listProducts(categoryId=null,opts={}){const includeHidden=Boolean(opts.includeHidden),includeDisabled=Boolean(opts.includeDisabled);return sorted(state.products.filter(p=>(categoryId==null||p.categoryId===Number(categoryId))&&(includeHidden||p.visible)&&(includeDisabled||p.enabled))).map(clone);}
  function listAllProducts(){return sorted(state.products).map(clone);}
  function listPacks(categoryId=null){return listProducts(categoryId);}
  function getProduct(id){return clone(state.products.find(p=>p.id===String(id||''))||null);}
  function getPack(id){return getProduct(id);}
  function isKnownProduct(id){return Boolean(state.products.some(p=>p.id===String(id||'')));}
  function productIds(){return state.products.map(p=>p.id);}
  function productsForLesson(id,opts={}){const n=Number(id);return listProducts(null,opts).filter(p=>p.lessonIds.includes(n));}
  function packForLesson(id){const rows=productsForLesson(id).sort((a,b)=>(a.type==='category-bundle')-(b.type==='category-bundle')||a.lessonCount-b.lessonCount||a.sortOrder-b.sortOrder);return rows[0]||null;}
  function sampleType(id){const n=Number(id);if(FREE_IDS.includes(n))return 'free';if(ACCOUNT_IDS.includes(n))return 'account';return null;}
  function productCover(p){const x=typeof p==='string'?getProduct(p):p;if(!x)return '';return x.coverImage||`assets/images/lesson_${String(x.lessonIds[0]||1).padStart(2,'0')}.jpg`;}
  function status(){return {version:VERSION,source:state.source,revision:state.revision,updatedAt:state.updatedAt,productCount:state.products.length,products:listAllProducts(),backend:{read:Boolean(String(config.productCatalogEndpoint||'').trim()),write:Boolean(String(config.adminProductCatalogEndpoint||'').trim())},localPreview:Boolean(config.allowLocalAdminPreview===true)};}
  function validateProducts(products){const out=[],errors=[],seen=new Set();for(const row of Array.isArray(products)?products:[]){const id=validId(row?.id);if(!id){errors.push('A product has an invalid ID.');continue;}if(seen.has(id)){errors.push(`Duplicate product ID: ${id}`);continue;}seen.add(id);const p=normalizeProduct({...row,id});if(!p){errors.push(`Product ${id} has no valid ready lessons in its category.`);continue;}out.push(p);}return {ok:errors.length===0,products:out,errors};}
  async function request(url,payload){if(!url)throw new Error('Store catalog backend is not connected.');if(typeof root.fetch!=='function')throw new Error('Network transport is unavailable.');if(typeof navigator!=='undefined'&&navigator.onLine===false)throw new Error('Device is offline.');const headers={'Content-Type':'application/json','Accept':'application/json','X-EngBook-Client':BUILD.tag||'v0.82',...(config.headers||{})};const res=await root.fetch(url,{method:'POST',headers,body:JSON.stringify(payload||{}),credentials:config.fetchCredentials||'same-origin'});if(!res.ok)throw new Error(`Store catalog request failed with HTTP ${res.status}.`);const data=await res.json();if(!data||typeof data!=='object')throw new Error('Store catalog backend returned an invalid response.');return data;}
  function apply(raw,source='backend'){state=normalize({...raw,source,updatedAt:Date.now()});save();root.dispatchEvent?.(new CustomEvent('engbook:store-catalog',{detail:status()}));return status();}
  async function refresh(){const endpoint=String(config.productCatalogEndpoint||'').trim();if(!endpoint)return {ok:false,status:'not-configured',catalog:status()};const data=await request(endpoint,{action:'read-engbook-product-catalog',build:BUILD.tag||null});const raw=data.catalog||data.productCatalog;if(!raw||typeof raw!=='object')throw new Error('Product catalog response requires catalog data.');return {ok:true,status:'verified',catalog:apply(raw,'backend')};}
  function isAdmin(){try{const a=root.EngBookCommercial?.status?.().account||{},roles=Array.isArray(a.roles)?a.roles.map(x=>String(x).toLowerCase()):[];return Boolean(a.authenticated&&(a.isAdmin===true||roles.includes('admin')))||config.allowLocalAdminPreview===true;}catch(_){return config.allowLocalAdminPreview===true;}}
  function applyLocalPreview(products){if(config.allowLocalAdminPreview!==true)throw new Error('Local admin preview is disabled.');if(!isAdmin())throw new Error('Admin access is required.');const v=validateProducts(products);if(!v.ok)throw new Error(v.errors.join(' '));return apply({products:v.products,revision:`local-${Date.now()}`},'local-preview');}
  async function update(products){if(!isAdmin())throw new Error('Admin access is required.');const v=validateProducts(products);if(!v.ok)throw new Error(v.errors.join(' '));const endpoint=String(config.adminProductCatalogEndpoint||'').trim();if(!endpoint){if(config.allowLocalAdminPreview===true)return {ok:true,status:'local-preview',catalog:applyLocalPreview(v.products)};throw new Error('Admin product-catalog backend is not connected.');}const data=await request(endpoint,{action:'update-engbook-product-catalog',revision:state.revision,catalog:{schema:2,products:v.products.map(p=>({id:p.id,type:p.type,categoryId:p.categoryId,lessonIds:p.lessonIds,title:p.title,label:p.label,description:p.description,sortOrder:p.sortOrder,enabled:p.enabled,visible:p.visible,coverImage:p.coverImage,priceLabel:p.priceLabel,compareAtPriceLabel:p.compareAtPriceLabel,discountLabel:p.discountLabel}))}});const raw=data.catalog||data.productCatalog;if(!raw||typeof raw!=='object')throw new Error('Admin catalog update response requires the saved catalog.');return {ok:true,status:'saved',catalog:apply(raw,'backend')};}
  const api=Object.freeze({version:VERSION,freeLessonIds:FREE_IDS,accountLessonIds:ACCOUNT_IDS,status,listProducts,listAllProducts,listPacks,getProduct,getPack,productsForLesson,packForLesson,sampleType,isKnownProduct,productIds,productCover,readyLessonIds,validateProducts,refresh,update,applyRemoteCatalog:raw=>apply(raw,'backend'),applyLocalPreview,policy:'Permanent one-time lesson products with admin-editable packs and full-category bundles. Purchase rights are snapshot-based.'});
  root.EngBookStoreCatalog=api;root.EngBookUnlockCatalog=api;
})(typeof window!=='undefined'?window:globalThis);
