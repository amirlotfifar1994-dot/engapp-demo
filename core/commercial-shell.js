/* EngBook Commercial Shell v1.3.0
   Account/entitlement/sync/analytics/crash contracts for a future paid product.
   This module is intentionally local-first and backend-honest:
   - no fake account is created
   - no purchase is simulated
   - no analytics/crash data is sent unless the user opted in AND an endpoint exists
   - cloud sync/deletion require a real authenticated account supplied by the host backend
*/
(function(root){
  'use strict';

  const VERSION='1.3.2';
  const BUILD=root.ENGBOOK_BUILD_INFO||{};
  const STORAGE_KEY=BUILD.storage?.commercialKey||'engbook_v54_commercial';
  const LEGACY_STORAGE_KEYS=['engbook_v78_commercial','engbook_v64_commercial','engbook_v63_commercial','engbook_v62_commercial','engbook_v61_commercial','engbook_v60_commercial','engbook_v59_commercial','engbook_v58_commercial','engbook_v57_commercial','engbook_v56_commercial','engbook_v55_commercial','engbook_v54_commercial','engbook_v53_commercial','engbook_v52_commercial','engbook_v51_commercial','engbook_v50_commercial','engbook_v49_commercial','engbook_v48_commercial','engbook_v47_commercial','engbook_v46_commercial','engbook_v45_commercial','engbook_v44_commercial','engbook_v43_commercial','engbook_v42_commercial','engbook_v41_commercial','engbook_v40_commercial','engbook_v39_commercial','engbook_v38_commercial','engbook_v37_commercial','engbook_v36_commercial','engbook_v35_commercial','engbook_v34_commercial','engbook_v33_commercial','engbook_v32_commercial','engbook_v31_commercial'];
  const MAX_ANALYTICS=160;
  const MAX_CRASHES=20;
  const ALLOWED_EVENTS=new Set(['app_open','lesson_open','mode_open','focus_session_complete','feature_used','sync_requested','purchase_viewed','account_viewed']);
  const ALLOWED_PROP_KEYS=new Set(['lesson','mode','feature','durationSec','support','resultBucket','source','online','plan']);

  class EngBookCommercialUnavailableError extends Error{
    constructor(code='COMMERCIAL_BACKEND_UNAVAILABLE',message='Commercial backend is not connected.'){
      super(message);this.name='EngBookCommercialUnavailableError';this.code=code;
    }
  }
  class EngBookCommercialProtocolError extends Error{
    constructor(message='Commercial backend returned an invalid response.'){
      super(message);this.name='EngBookCommercialProtocolError';this.code='COMMERCIAL_PROTOCOL_ERROR';
    }
  }

  const initialConfig={
    authEndpoint:'',syncEndpoint:'',billingEndpoint:'',checkoutEndpoint:'',analyticsEndpoint:'',crashEndpoint:'',dataEndpoint:'',flagsEndpoint:'',
    headers:{},fetchCredentials:'same-origin',allowLocalPlanOverride:false,...(root.ENGBOOK_COMMERCIAL_CONFIG||{})
  };
  let config={...initialConfig,headers:{...(initialConfig.headers||{})}};

  function now(){return Date.now();}
  function readPrivacy(){const p=root.EngBookPrivacy?.snapshot?.()||{};return {allowRemoteAI:p.remoteAI===true};}
  function defaults(){return {
    schema:1,
    account:{mode:'guest',userId:null,emailMasked:null,displayName:null,signedInAt:null,sessionSource:null,roles:[],isAdmin:false},
    plan:{id:'free',label:'Free',source:'local-default',expiresAt:null,billingCycle:null,subscriptionStatus:'none',renewalAt:null,cancelAtPeriodEnd:false,provider:null},
    permissions:{productAnalytics:false,crashReports:false,cloudSync:false},
    featureOverrides:{},
    sync:{status:'local-only',lastAt:null,lastError:null,revision:null},
    analytics:{queue:[],sent:0,dropped:0,lastFlush:null},
    crashes:[],
    deletion:{status:'none',requestedAt:null,completedAt:null,lastError:null}
  };}
  function normalize(raw){
    const b=defaults(),x=raw&&typeof raw==='object'?raw:{};
    const out={...b,...x,
      account:{...b.account,...(x.account||{})},plan:{...b.plan,...(x.plan||{})},permissions:{...b.permissions,...(x.permissions||{})},
      sync:{...b.sync,...(x.sync||{})},analytics:{...b.analytics,...(x.analytics||{})},deletion:{...b.deletion,...(x.deletion||{})},
      featureOverrides:{...(x.featureOverrides||{})}
    };
    out.analytics.queue=Array.isArray(out.analytics.queue)?out.analytics.queue.slice(-MAX_ANALYTICS):[];
    out.crashes=Array.isArray(x.crashes)?x.crashes.slice(-MAX_CRASHES):[];
    if(!['guest','authenticated'].includes(out.account.mode))out.account.mode='guest';
    if(!out.account.userId&&out.account.mode==='authenticated')out.account.mode='guest';
    out.account.roles=Array.isArray(out.account.roles)?[...new Set(out.account.roles.map(x=>String(x).toLowerCase()).filter(Boolean))].slice(0,12):[];
    out.account.isAdmin=Boolean(out.account.isAdmin===true||out.account.roles.includes('admin'));
    return out;
  }

  function safeDate(value){if(!value)return null;const t=Date.parse(String(value));return Number.isFinite(t)?new Date(t).toISOString():null;}
  function normalizePlan(raw={}){
    const id=['free','pro','ai'].includes(String(raw.id||raw.plan||'free').toLowerCase())?String(raw.id||raw.plan||'free').toLowerCase():'free';
    const cycle=['monthly','yearly'].includes(String(raw.billingCycle||raw.cycle||'').toLowerCase())?String(raw.billingCycle||raw.cycle).toLowerCase():null;
    const status=String(raw.subscriptionStatus||raw.status||(id==='free'?'none':'active')).toLowerCase().slice(0,40);
    return {id,label:String(raw.label||(id==='free'?'Free':id.toUpperCase())).slice(0,80),source:String(raw.source||'backend').slice(0,40),expiresAt:safeDate(raw.expiresAt),billingCycle:cycle,subscriptionStatus:status,renewalAt:safeDate(raw.renewalAt||raw.currentPeriodEnd||raw.expiresAt),cancelAtPeriodEnd:Boolean(raw.cancelAtPeriodEnd),provider:raw.provider?String(raw.provider).slice(0,60):null};
  }
  function applyEntitlementResponse(data={}){
    const raw=data.entitlement||data.subscription||data.plan;
    if(!raw)throw new EngBookCommercialProtocolError('Billing response requires entitlement or plan data.');
    const planRaw=typeof raw==='object'?raw:{id:raw};
    const id=String(planRaw.id||planRaw.plan||raw||'free').toLowerCase();
    if(!['free','pro','ai'].includes(id))throw new EngBookCommercialProtocolError('Unknown entitlement plan.');
    state.plan=normalizePlan({...planRaw,id,source:'backend',expiresAt:planRaw.expiresAt||data.expiresAt||null,billingCycle:planRaw.billingCycle||data.billingCycle||null,subscriptionStatus:planRaw.subscriptionStatus||planRaw.status||data.subscriptionStatus||data.status,renewalAt:planRaw.renewalAt||planRaw.currentPeriodEnd||data.renewalAt||data.currentPeriodEnd||null,cancelAtPeriodEnd:planRaw.cancelAtPeriodEnd??data.cancelAtPeriodEnd,provider:planRaw.provider||data.provider||null});
    save();return {...state.plan};
  }
  function validateRedirectUrl(value,label='Redirect'){
    if(!value)throw new EngBookCommercialProtocolError(`${label} response requires a URL.`);
    let url;try{url=new URL(String(value),root.location?.origin||undefined);}catch(_){throw new EngBookCommercialProtocolError(`${label} URL is invalid.`);}
    const sameOrigin=Boolean(root.location?.origin&&url.origin===root.location.origin);
    if(url.protocol!=='https:'&&!sameOrigin)throw new EngBookCommercialProtocolError(`${label} URL must use HTTPS or the app origin.`);
    return url.href;
  }
  function read(){try{let raw=root.localStorage?.getItem(STORAGE_KEY);if(!raw){for(const k of LEGACY_STORAGE_KEYS){raw=root.localStorage?.getItem(k);if(raw){try{root.localStorage?.setItem(STORAGE_KEY,raw);}catch(_){}break;}}}return normalize(JSON.parse(raw||'null'));}catch(_){return defaults();}}
  let state=read();
  // Server-derived account/plan data may be cached for display, but cached state is never
  // accepted as current paid authority after a reload. A live backend session must bind it.
  let verifiedSessionUserId=null,verifiedSessionAt=null;
  function save(){try{root.localStorage?.setItem(STORAGE_KEY,JSON.stringify(state));return true;}catch(_){return false;}}

  const PLAN_FEATURES=Object.freeze({
    free:new Set(['coreLearning','smartReview','basicSpeaking']),
    pro:new Set(['coreLearning','smartReview','basicSpeaking','advancedPractice','sceneForge','longitudinalProfile','cloudSync']),
    ai:new Set(['coreLearning','smartReview','basicSpeaking','advancedPractice','sceneForge','longitudinalProfile','cloudSync','remoteAI','aiConversation']),
    preview:new Set(['coreLearning','smartReview','basicSpeaking','advancedPractice','sceneForge','longitudinalProfile'])
  });
  function planId(){return String(state.plan?.id||'preview').toLowerCase();}
  function isAuthenticated(){return Boolean(verifiedSessionUserId&&state.account?.mode==='authenticated'&&state.account?.userId===verifiedSessionUserId);}
  function paidPlanActive(){
    const id=planId(),p=state.plan||{};if(!['pro','ai'].includes(id)||!isAuthenticated()||String(p.source||'').toLowerCase()!=='backend')return false;
    if(['expired','canceled','cancelled','past_due','unpaid','incomplete','incomplete_expired','revoked'].includes(String(p.subscriptionStatus||'active').toLowerCase()))return false;
    if(p.expiresAt){const t=Date.parse(String(p.expiresAt));if(Number.isFinite(t)&&t<=now())return false;}return true;
  }
  function hasEndpoint(name){return Boolean(String(config?.[name]||'').trim());}
  function isRemoteFeature(feature){return ['cloudSync','remoteAI','aiConversation'].includes(feature);}
  function hasFeature(feature){
    // Release flags may disable a feature, but can never grant a paid entitlement.
    if(state.featureOverrides?.[feature]===false)return false;
    const id=planId(),effective=(id==='pro'||id==='ai')&&!paidPlanActive()?'free':id;const p=PLAN_FEATURES[effective]||PLAN_FEATURES.free;
    if(!p.has(feature))return false;
    if(feature==='cloudSync')return isAuthenticated()&&hasEndpoint('syncEndpoint')&&state.permissions.cloudSync===true;
    if(feature==='remoteAI'||feature==='aiConversation')return readPrivacy().allowRemoteAI===true;
    return true;
  }
  function applyFeatureFlags(flags={}){
    const known=new Set(['coreLearning','smartReview','basicSpeaking','advancedPractice','sceneForge','longitudinalProfile','cloudSync','remoteAI','aiConversation']);
    const next={};for(const [k,v] of Object.entries(flags||{}))if(known.has(k)&&typeof v==='boolean')next[k]=v;
    state.featureOverrides=next;save();return {...state.featureOverrides};
  }

  function status(){return {
    version:VERSION,
    account:{...state.account,authenticated:isAuthenticated()},
    plan:{...state.plan},
    permissions:{...state.permissions},
    backend:{auth:hasEndpoint('authEndpoint'),sync:hasEndpoint('syncEndpoint'),billing:hasEndpoint('billingEndpoint'),billingPortal:hasEndpoint('billingPortalEndpoint'),checkout:hasEndpoint('checkoutEndpoint'),analytics:hasEndpoint('analyticsEndpoint'),crash:hasEndpoint('crashEndpoint'),data:hasEndpoint('dataEndpoint'),flags:hasEndpoint('flagsEndpoint')},
    sync:{...state.sync},
    analytics:{queued:state.analytics.queue.length,sent:state.analytics.sent,dropped:state.analytics.dropped,lastFlush:state.analytics.lastFlush},
    crashes:{local:state.crashes.length},
    deletion:{...state.deletion},
    localPreview:planId()==='preview',entitlementValid:paidPlanActive(),
    sessionAuthority:{verified:isAuthenticated(),userId:isAuthenticated()?verifiedSessionUserId:null,verifiedAt:isAuthenticated()?verifiedSessionAt:null,cachedAccountPresent:Boolean(state.account?.userId)}
  };}
  function configure(next={}){config={...config,...next,headers:{...(config.headers||{}),...(next.headers||{})}};return status();}

  function setPermission(key,value){
    if(!Object.prototype.hasOwnProperty.call(state.permissions,key))return false;
    state.permissions[key]=Boolean(value);save();return true;
  }
  function setPreviewPlan(id='preview'){
    if(config.allowLocalPlanOverride!==true)throw new EngBookCommercialUnavailableError('LOCAL_PLAN_OVERRIDE_DISABLED','Local plan overrides are disabled in this build.');
    if(!['preview','free','pro','ai'].includes(String(id)))throw new Error('Unknown plan id.');
    state.plan={...state.plan,id:String(id),label:id==='preview'?'Product Preview':id.toUpperCase(),source:'local-preview'};save();return status();
  }

  /* A real auth provider should complete its secure handshake outside this static client,
     then pass only the resulting non-secret session descriptor here. */
  function acceptAccountSession(session={}){
    if(!session||typeof session!=='object'||!session.userId)throw new EngBookCommercialProtocolError('Authenticated session requires userId.');
    const nextUserId=String(session.userId).slice(0,160),previousUserId=state.account?.userId?String(state.account.userId):null;
    const roles=[...(Array.isArray(session.roles)?session.roles:[]),...(session.role?[session.role]:[]),...(session.isAdmin===true?['admin']:[])].map(x=>String(x).toLowerCase()).filter(Boolean);
    if(previousUserId&&previousUserId!==nextUserId){state.plan=defaults().plan;state.sync={...defaults().sync};state.permissions.cloudSync=false;}
    state.account={mode:'authenticated',userId:nextUserId,emailMasked:session.emailMasked?String(session.emailMasked).slice(0,180):null,displayName:session.displayName?String(session.displayName).slice(0,100):null,signedInAt:now(),sessionSource:String(session.sessionSource||'backend').slice(0,60),roles:[...new Set(roles)].slice(0,12),isAdmin:roles.includes('admin')};
    const raw=typeof session.plan==='object'?session.plan:{id:session.plan||'free'};
    const id=String(raw.id||raw.plan||'free').toLowerCase();
    state.plan=normalizePlan({...raw,id:['free','pro','ai'].includes(id)?id:'free',expiresAt:raw.expiresAt||session.expiresAt||null,source:'backend'});
    verifiedSessionUserId=nextUserId;verifiedSessionAt=now();
    save();
    try{root.dispatchEvent?.(new CustomEvent('engbook:account-session',{detail:{authenticated:true,userId:nextUserId,changed:Boolean(previousUserId&&previousUserId!==nextUserId)}}));}catch(_){}
    return status();
  }
  function signOut(){verifiedSessionUserId=null;verifiedSessionAt=null;state.account=defaults().account;state.permissions.cloudSync=false;state.sync={...defaults().sync};if(state.plan?.source==='backend')state.plan=defaults().plan;save();try{root.dispatchEvent?.(new CustomEvent('engbook:account-session',{detail:{authenticated:false,userId:null}}));}catch(_){}return status();}

  function sanitizeProps(props={}){
    const out={};for(const [k,v] of Object.entries(props||{})){if(!ALLOWED_PROP_KEYS.has(k))continue;if(['string','number','boolean'].includes(typeof v))out[k]=typeof v==='string'?v.slice(0,80):v;}return out;
  }
  function track(name,props={}){
    if(!ALLOWED_EVENTS.has(name))return false;
    const item={at:now(),name,props:sanitizeProps(props)};
    state.analytics.queue.push(item);if(state.analytics.queue.length>MAX_ANALYTICS){state.analytics.queue.shift();state.analytics.dropped++;}save();
    return true;
  }
  async function request(url,payload,opts={}){
    if(!url)throw new EngBookCommercialUnavailableError();
    if(typeof root.fetch!=='function')throw new EngBookCommercialUnavailableError('FETCH_UNAVAILABLE','Network transport is unavailable.');
    if(typeof navigator!=='undefined'&&navigator.onLine===false)throw new EngBookCommercialUnavailableError('OFFLINE','Device is offline.');
    const headers={'Content-Type':'application/json','Accept':'application/json','X-EngBook-Client':BUILD.tag||'v0.31',...(config.headers||{})};
    const res=await root.fetch(url,{method:opts.method||'POST',headers,body:opts.method==='GET'?undefined:JSON.stringify(payload||{}),credentials:config.fetchCredentials||'omit'});
    if(!res.ok){const e=new EngBookCommercialUnavailableError('REMOTE_REQUEST_FAILED',`Commercial request failed with HTTP ${res.status}.`);e.status=res.status;throw e;}
    const data=await res.json();if(!data||typeof data!=='object')throw new EngBookCommercialProtocolError();return data;
  }
  async function flushAnalytics(){
    if(!state.permissions.productAnalytics||!hasEndpoint('analyticsEndpoint'))return {ok:false,status:'disabled-or-not-configured',queued:state.analytics.queue.length};
    if(!state.analytics.queue.length)return {ok:true,status:'empty',sent:0};
    const batch=state.analytics.queue.slice(0,50);const data=await request(config.analyticsEndpoint,{events:batch,client:{build:BUILD.tag||null,plan:planId()}});
    state.analytics.queue.splice(0,batch.length);state.analytics.sent+=batch.length;state.analytics.lastFlush=now();save();return {ok:true,sent:batch.length,ack:data.ack||null};
  }

  function redactCrashText(value){return String(value||'').replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,'[redacted-email]').replace(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/gi,'[redacted-image]').replace(/([?&](?:token|auth|key|session|code)=)[^&\s]+/gi,'$1[redacted]');}
  function scrubCrash(err,context='runtime'){
    const message=redactCrashText(err?.message||err||'Unknown error').slice(0,600);
    const stack=redactCrashText(err?.stack||'').split('\n').slice(0,8).join('\n').slice(0,1800);
    return {at:now(),context:String(context||'runtime').slice(0,80),message,stack,build:BUILD.tag||null};
  }
  async function captureCrash(err,context='runtime'){
    const item=scrubCrash(err,context);state.crashes.push(item);state.crashes=state.crashes.slice(-MAX_CRASHES);save();
    if(state.permissions.crashReports&&hasEndpoint('crashEndpoint')){try{await request(config.crashEndpoint,{crash:item});}catch(_){/* local copy remains */}}
    return item;
  }
  let crashHooksInstalled=false;
  function installCrashCapture(){
    if(crashHooksInstalled||!root.addEventListener)return;crashHooksInstalled=true;
    root.addEventListener('error',e=>captureCrash(e?.error||e?.message||'window error','window.error'));
    root.addEventListener('unhandledrejection',e=>captureCrash(e?.reason||'unhandled rejection','unhandledrejection'));
  }

  async function syncNow(payload={}){
    track('sync_requested',{source:'manual',plan:planId(),online:typeof navigator==='undefined'?true:navigator.onLine!==false});
    if(!isAuthenticated())throw new EngBookCommercialUnavailableError('ACCOUNT_REQUIRED','Sign in is required for cloud sync.');
    if(!state.permissions.cloudSync)throw new EngBookCommercialUnavailableError('SYNC_PERMISSION_REQUIRED','Cloud sync is disabled in Data & Privacy.');
    if(!hasEndpoint('syncEndpoint'))throw new EngBookCommercialUnavailableError('SYNC_BACKEND_UNAVAILABLE','Cloud sync backend is not connected.');
    state.sync.status='syncing';save();
    try{
      const data=await request(config.syncEndpoint,{revision:state.sync.revision||null,payload});
      state.sync={status:'synced',lastAt:now(),lastError:null,revision:data.revision||state.sync.revision||null};save();return data;
    }catch(err){state.sync.status='error';state.sync.lastError=String(err?.code||err?.message||err).slice(0,200);save();throw err;}
  }

  async function startAuth(mode='signin'){
    const requested=['signin','signup'].includes(String(mode).toLowerCase())?String(mode).toLowerCase():'signin';
    track('account_viewed',{source:'user-panel',plan:planId()});
    if(!hasEndpoint('authEndpoint'))throw new EngBookCommercialUnavailableError('AUTH_BACKEND_UNAVAILABLE','Authentication backend is not connected.');
    const data=await request(config.authEndpoint,{action:'start-auth',mode:requested,returnPath:root.location?.pathname||'/'},{method:'POST'});
    if(data.session?.userId){acceptAccountSession(data.session);return {ok:true,status:'session',sessionAccepted:true};}
    const authUrl=validateRedirectUrl(data.authUrl||data.url,'Authentication');
    return {ok:true,status:'redirect',authUrl};
  }

  async function refreshAccountSession(){
    if(!hasEndpoint('authEndpoint'))return {ok:false,status:'auth-not-configured'};
    const data=await request(config.authEndpoint,{action:'refresh-session'},{method:'POST'});
    if(data.signedOut===true){signOut();return {ok:true,status:'guest'};}
    if(!data.session?.userId)throw new EngBookCommercialProtocolError('Session refresh requires session.userId or signedOut=true.');
    acceptAccountSession(data.session);return {ok:true,status:'authenticated',account:{...state.account},plan:{...state.plan}};
  }

  async function startCheckout(plan='pro',billingCycle='monthly'){
    const requested=String(plan||'pro').toLowerCase(),cycle=String(billingCycle||'monthly').toLowerCase();
    if(!['pro','ai'].includes(requested))throw new EngBookCommercialProtocolError('Checkout requires a paid plan id.');
    if(!['monthly','yearly'].includes(cycle))throw new EngBookCommercialProtocolError('Checkout requires monthly or yearly billingCycle.');
    track('purchase_viewed',{source:'user-panel',plan:requested});
    if(!isAuthenticated())throw new EngBookCommercialUnavailableError('ACCOUNT_REQUIRED','Sign in is required before starting a subscription checkout.');
    if(!hasEndpoint('checkoutEndpoint'))throw new EngBookCommercialUnavailableError('CHECKOUT_BACKEND_UNAVAILABLE','Subscription checkout is not connected.');
    const data=await request(config.checkoutEndpoint,{action:'create-checkout',plan:requested,billingCycle:cycle,returnPath:root.location?.pathname||'/'},{method:'POST'});
    const checkoutUrl=validateRedirectUrl(data.checkoutUrl||data.url,'Checkout');
    return {ok:true,checkoutUrl,plan:requested,billingCycle:cycle,sessionId:data.sessionId?String(data.sessionId).slice(0,180):null};
  }

  async function refreshEntitlements(){
    if(!isAuthenticated())return {ok:false,status:'guest'};
    if(!hasEndpoint('billingEndpoint'))return {ok:false,status:'billing-not-configured'};
    const data=await request(config.billingEndpoint,{action:'refresh-entitlements'},{method:'POST'});
    const plan=applyEntitlementResponse(data);return {ok:true,plan};
  }

  async function restorePurchases(){
    if(!isAuthenticated())throw new EngBookCommercialUnavailableError('ACCOUNT_REQUIRED','Sign in is required before restoring purchases.');
    if(!hasEndpoint('billingEndpoint'))throw new EngBookCommercialUnavailableError('BILLING_BACKEND_UNAVAILABLE','Billing backend is not connected.');
    const data=await request(config.billingEndpoint,{action:'restore-purchases'},{method:'POST'});
    const plan=applyEntitlementResponse(data);return {ok:true,plan,restored:Boolean(data.restored??true)};
  }

  async function openBillingPortal(){
    if(!isAuthenticated())throw new EngBookCommercialUnavailableError('ACCOUNT_REQUIRED','Sign in is required to manage billing.');
    if(!hasEndpoint('billingPortalEndpoint'))throw new EngBookCommercialUnavailableError('BILLING_PORTAL_UNAVAILABLE','Billing portal is not connected.');
    const data=await request(config.billingPortalEndpoint,{action:'create-portal',returnPath:root.location?.pathname||'/'},{method:'POST'});
    const portalUrl=validateRedirectUrl(data.portalUrl||data.url,'Billing portal');
    return {ok:true,portalUrl};
  }

  async function fetchOffers(){
    if(!hasEndpoint('billingEndpoint'))return {ok:false,status:'billing-not-configured',offers:[]};
    const data=await request(config.billingEndpoint,{action:'list-offers'},{method:'POST'});
    const offers=Array.isArray(data.offers)?data.offers.slice(0,12).map(o=>({plan:String(o.plan||'pro').toLowerCase(),billingCycle:String(o.billingCycle||o.cycle||'monthly').toLowerCase(),priceLabel:o.priceLabel?String(o.priceLabel).slice(0,80):null,savingsLabel:o.savingsLabel?String(o.savingsLabel).slice(0,80):null})).filter(o=>['pro','ai'].includes(o.plan)&&['monthly','yearly'].includes(o.billingCycle)):[];
    return {ok:true,offers};
  }

  async function requestCloudDeletion(confirm=false){
    if(confirm!==true)throw new EngBookCommercialUnavailableError('CONFIRMATION_REQUIRED','Explicit confirmation is required for cloud deletion.');
    if(!isAuthenticated())throw new EngBookCommercialUnavailableError('ACCOUNT_REQUIRED','There is no signed-in cloud account to delete.');
    if(!hasEndpoint('dataEndpoint'))throw new EngBookCommercialUnavailableError('DATA_BACKEND_UNAVAILABLE','Cloud data deletion backend is not connected.');
    state.deletion={status:'requesting',requestedAt:now(),completedAt:null,lastError:null};save();
    try{const data=await request(config.dataEndpoint,{action:'delete-account-data'});state.deletion.status=data.completed?'completed':'requested';state.deletion.completedAt=data.completed?now():null;save();return data;}
    catch(err){state.deletion.status='error';state.deletion.lastError=String(err?.code||err?.message||err).slice(0,200);save();throw err;}
  }

  async function refreshFeatureFlags(){
    if(!hasEndpoint('flagsEndpoint'))return {ok:false,status:'flags-not-configured',flags:{...state.featureOverrides}};
    const data=await request(config.flagsEndpoint,{build:BUILD.tag||null},{method:'POST'});
    if(!data.flags||typeof data.flags!=='object')throw new EngBookCommercialProtocolError('Feature-flag response requires flags object.');
    return {ok:true,flags:applyFeatureFlags(data.flags)};
  }

  function exportSafeState(){return {schema:state.schema,account:{mode:state.account.mode,hasUserId:Boolean(state.account.userId)},plan:{...state.plan},permissions:{...state.permissions},sync:{...state.sync},analytics:{queued:state.analytics.queue.length,sent:state.analytics.sent,dropped:state.analytics.dropped},crashes:{local:state.crashes.length},deletion:{...state.deletion}};}

  root.EngBookCommercial={version:VERSION,status,configure,hasFeature,applyFeatureFlags,refreshFeatureFlags,planId,isAuthenticated,paidPlanActive,setPermission,setPreviewPlan,acceptAccountSession,signOut,track,flushAnalytics,captureCrash,installCrashCapture,syncNow,startAuth,refreshAccountSession,startCheckout,refreshEntitlements,restorePurchases,openBillingPortal,fetchOffers,requestCloudDeletion,exportSafeState};
  root.EngBookCommercialUnavailableError=EngBookCommercialUnavailableError;
  root.EngBookCommercialProtocolError=EngBookCommercialProtocolError;
  installCrashCapture();
})(typeof window!=='undefined'?window:globalThis);
