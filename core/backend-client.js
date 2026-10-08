/* EngApp Backend Client v0.89 — integrated SQL/API authority transport
   Same-origin account/session transport plus global + per-lesson revision sync. */
(function(root){
  'use strict';
  const API='/api/v1',API2='/api/v2';
  let session=null,privacyRevision=0;
  const jsonHeaders={'Accept':'application/json','Content-Type':'application/json'};
  class BackendError extends Error{constructor(code,message,status=0,details=null){super(message||code);this.name='EngBookBackendError';this.code=code;this.status=status;this.details=details;}}
  async function request(path,{method='GET',body,base=API}={}){
    const res=await fetch(`${base}${path}`,{method,headers:body===undefined?{'Accept':'application/json'}:jsonHeaders,credentials:'same-origin',body:body===undefined?undefined:JSON.stringify(body)});
    let data=null;try{data=await res.json();}catch(_){data=null;}
    if(!res.ok){const err=new BackendError(data?.code||`HTTP_${res.status}`,data?.message||`Request failed with HTTP ${res.status}.`,res.status,data);if(err.code==='AUTH_REQUIRED'){session=null;try{root.dispatchEvent?.(new CustomEvent('engbook:auth-expired'));}catch(_){}}throw err;}
    return data||{};
  }
  function emailMask(email=''){const [u,d]=String(email).split('@');if(!d)return '';return `${u.slice(0,2)}${u.length>2?'***':''}@${d}`;}
  function commercialConfigure(){const access=root.ENGBOOK_USER_ACCESS_CONFIG||{};root.EngBookCommercial?.configure?.({authEndpoint:'',syncEndpoint:`${API2}/progress/global/sync`,billingEndpoint:`${API}/entitlements`,billingPortalEndpoint:String(access.billingPortalEndpoint||''),checkoutEndpoint:String(access.subscriptionCheckoutEndpoint||''),analyticsEndpoint:`${API2}/analytics/events`,dataEndpoint:`${API}/account/data`,fetchCredentials:'same-origin'});}
  async function adoptSession(out){
    session=out?.authenticated?out:null;
    if(!session?.user){privacyRevision=0;root.EngBookPrivacy?.clearSession?.();root.EngBookCommercial?.signOut?.();root.EngBookLessonPurchases?.clearForSignOut?.();return null;}
    try{await root.EngAppOfflineDownloads?.setOwner?.(session.user.id);}catch(_){}
    root.EngBookCommercial?.acceptAccountSession?.({userId:session.user.id,emailMasked:emailMask(session.user.email),displayName:session.user.displayName||'',plan:session.user.plan||'free',sessionSource:'engbook-api'});
    const p=session.privacy||{};privacyRevision=Number(p.revision||0);root.EngBookPrivacy?.adoptServer?.(p);for(const [remote,local] of [['productAnalytics','productAnalytics'],['crashReports','crashReports'],['cloudSync','cloudSync']])if(typeof p[remote]==='boolean')root.EngBookCommercial?.setPermission?.(local,p[remote]);
    try{await root.EngBookCommercial?.refreshEntitlements?.();}catch(_){/* account session remains valid; paid plan is inactive until refreshed */}
    try{await root.EngBookLessonPurchases?.refresh?.();}catch(_){/* permanent access remains inactive until a verified snapshot arrives */}
    return session;
  }
  async function bootstrapSession(){commercialConfigure();try{await root.EngBookStoreCatalog?.refresh?.();}catch(_){/* defaults remain available if API/catalog is offline */}try{return await adoptSession(await request('/auth/session'));}catch(_){return null;}}
  async function register({email,password,displayName=''}){await request('/auth/register',{method:'POST',body:{email,password,displayName}});return (await bootstrapSession())||{};}
  async function login({email,password}){await request('/auth/login',{method:'POST',body:{email,password}});return (await bootstrapSession())||{};}
  async function logout(){try{await request('/auth/logout',{method:'POST',body:{}});}finally{try{await root.EngAppOfflineDownloads?.clearProtected?.();}catch(_){}session=null;privacyRevision=0;root.EngBookCommercial?.signOut?.();root.EngBookLessonPurchases?.clearForSignOut?.();}}
  async function getProgress(){return request('/progress');}
  async function syncProgress(payload,revision=null){return request('/progress/sync',{method:'POST',body:{revision,payload}});}
  async function progressBootstrap(){return request('/progress/bootstrap',{base:API2});}
  async function getLessonProgress(lessonId){return request(`/progress/lessons/${Number(lessonId)}`,{base:API2});}
  async function syncGlobalProgress(payload,revision=null){return request('/progress/global/sync',{method:'POST',body:{revision,payload},base:API2});}
  async function syncLessonProgress(lessonId,payload,summary,revision=null){return request(`/progress/lessons/${Number(lessonId)}/sync`,{method:'POST',body:{revision,payload,summary},base:API2});}
  async function deleteCloudData(){return request('/account/data',{method:'POST',body:{action:'delete-learning-data'}});}
  async function getProfile(){return request('/account/profile',{base:API2});}
  async function updateProfile(patch){return request('/account/profile',{method:'PATCH',body:patch,base:API2});}
  async function getSettings(){return request('/account/settings',{base:API2});}
  async function syncSettings(payload,revision=0){return request('/account/settings/sync',{method:'POST',body:{payload,revision},base:API2});}
  async function getPrivacy(){const out=await request('/account/privacy',{base:API2});privacyRevision=Number(out.revision||0);return out;}
  async function updatePrivacy(patch){try{const out=await request('/account/privacy',{method:'PATCH',body:{...patch,revision:privacyRevision},base:API2});privacyRevision=Number(out.revision||privacyRevision);return out;}catch(e){if(e?.code==='REVISION_CONFLICT'&&e?.details){privacyRevision=Number(e.details.revision||0);const out=await request('/account/privacy',{method:'PATCH',body:{...patch,revision:privacyRevision},base:API2});privacyRevision=Number(out.revision||privacyRevision);return out;}throw e;}}
  async function getStats(){return request('/stats/summary',{base:API2});}
  async function getAchievements(){return request('/achievements',{base:API2});}

  async function createRecallChallenge(lessonId){return request('/verification/recall/challenge',{method:'POST',body:{lessonId:Number(lessonId)},base:API2});}
  async function submitRecallChallenge(challengeId,answers){return request('/verification/recall/submit',{method:'POST',body:{challengeId,answers},base:API2});}
  async function getVerifiedLessonState(lessonId){return request(`/verification/lessons/${Number(lessonId)}`,{base:API2});}
  async function sendLearningEvents(events){return request('/activity/events',{method:'POST',body:{events},base:API2});}
  async function getLearningEvents({cursor='',limit=50}={}){const q=new URLSearchParams();if(cursor)q.set('cursor',cursor);q.set('limit',String(limit));return request(`/activity/events?${q}`,{base:API2});}
  async function accountExport(){return request('/account/export',{base:API2});}
  async function deleteAccount({password,confirmation='DELETE MY ACCOUNT'}){return request('/account/delete',{method:'POST',body:{password,confirmation},base:API2});}
  async function entitlements(){return request('/account/entitlements',{base:API2});}
  async function catalog(){return request('/catalog');}
  function status(){return {apiBase:API,progressApiBase:API2,authenticated:Boolean(session?.authenticated),user:session?.user||null,privacy:session?.privacy||null,privacyRevision};}

  function uniqStrings(a,b){return [...new Set([...(Array.isArray(a)?a:[]),...(Array.isArray(b)?b:[])].filter(x=>typeof x==='string'))];}
  function mergeScalar(a,b,path=''){if(typeof a==='number'&&typeof b==='number'){if(/(?:^|\.)(?:streak|lastLesson|activeCategory|sessionStage)$/.test(path))return b;return Math.max(a,b);}if(typeof a==='boolean'&&typeof b==='boolean'){if(/(?:^|\.)completed(?:\.|$)/.test(path))return a||b;return b;}if(typeof b==='string'&&b)return b;return b??a;}
  function mergeObject(a,b,path=''){
    if(Array.isArray(a)||Array.isArray(b)){const aa=Array.isArray(a)?a:[],bb=Array.isArray(b)?b:[];if([...aa,...bb].every(x=>typeof x==='string'))return uniqStrings(aa,bb);const tombstoneMerged=root.EngBookSyncRecords?.mergeRecordArrays?.(aa,bb);if(tombstoneMerged)return tombstoneMerged.slice(-2000);const keyed=new Map();for(const item of [...aa,...bb])if(item&&typeof item==='object'){const k=String(item.id??item.key??item.ts??item.at??JSON.stringify(item));const prev=keyed.get(k);keyed.set(k,prev?mergeObject(prev,item,`${path}[]`):item);}return keyed.size?[...keyed.values()].slice(-200):bb.length?bb:aa;}
    if(a&&typeof a==='object'&&b&&typeof b==='object'){const out={...a};for(const k of Object.keys(b))out[k]=k in out?mergeObject(out[k],b[k],path?`${path}.${k}`:k):b[k];return out;}
    return mergeScalar(a,b,path);
  }
  function mergeProgress(remote,local){const merged=mergeObject(remote&&typeof remote==='object'?remote:{},local&&typeof local==='object'?local:{});merged.lastLesson=Number(local?.lastLesson||remote?.lastLesson||1);merged.schemaVersion=Math.max(Number(remote?.schemaVersion||0),Number(local?.schemaVersion||0));merged.build=local?.build||remote?.build||'';return root.EngBookSyncRecords?.reconcileProgress?.(merged)||merged;}

  root.EngBookBackend=Object.freeze({version:'0.89',request,bootstrapSession,register,login,logout,getProgress,syncProgress,progressBootstrap,getLessonProgress,syncGlobalProgress,syncLessonProgress,deleteCloudData,getProfile,updateProfile,getSettings,syncSettings,getPrivacy,updatePrivacy,getStats,getAchievements,createRecallChallenge,submitRecallChallenge,getVerifiedLessonState,sendLearningEvents,getLearningEvents,accountExport,deleteAccount,entitlements,catalog,status,mergeProgress,BackendError});
})(typeof window!=='undefined'?window:globalThis);
