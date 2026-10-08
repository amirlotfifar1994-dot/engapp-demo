/* EngBook v0.78 — SQL/API integration bridge.
   LocalStorage stays the offline working copy. PostgreSQL receives client-reported
   global/per-lesson progress only when an authenticated user explicitly enables cloud sync.
   Entitlements and verified assessment state remain server-authoritative. */
(function(root){
  'use strict';
  if(!root.EngBookBackend||!root.EngBookProgressSync)return;
  let globalRevision=null,syncTimer=null,globalTimer=null,busy=false,queued=false,suspended=false,lastGlobalAt=0,lastSyncStatus='idle',lastSyncError=null;
  const lessonRevisions=new Map(),hydrated=new Set(),dirtyLessons=new Set(),lastSent=new Map();
  const rawSave=saveProgress;
  function cloudReady(){const c=root.EngBookCommercial?.status?.();return !suspended&&Boolean(root.EngBookBackend?.status?.().authenticated)&&c?.permissions?.cloudSync===true;}
  function activeLesson(){try{return state?.lesson?Number(activeLessonId()):Number(progress?.lastLesson||0);}catch{return 0;}}
  function lessonWords(id){const p=root.EngBookContent?.getPack?.(Number(id));return Array.isArray(p?.hotspots)?p.hotspots.map(h=>String(h?.en||'')).filter(Boolean):[];}
  function meaningful(){try{const ids=root.EngBookProgressSync.inferLessonIds(progress),activity=Object.values(progress.activity||{}).reduce((a,b)=>a+Number(b||0),0);return activity>0||ids.some(id=>(progress.discovered?.[id]||[]).length)||Object.values(progress.completed||{}).some(Boolean)||(progress.personalMarks||[]).length>0;}catch{return false;}}
  function permanent(e,key,serialized){if(e?.code==='AUTH_REQUIRED'){suspended=true;root.EngBookCommercial?.signOut?.();return true;}if(String(e?.code||'').endsWith('_TOO_LARGE')||e?.code==='PROGRESS_TOO_LARGE'){lastSent.set(key,serialized);return true;}return false;}
  async function syncGlobal(force=false){
    const payload=root.EngBookProgressSync.globalSnapshot(progress),serialized=JSON.stringify(payload),key='global';if(!force&&lastSent.get(key)===serialized)return true;
    try{const out=await root.EngBookBackend.syncGlobalProgress(payload,globalRevision);globalRevision=Number(out.revision);lastSent.set(key,serialized);return true;}
    catch(e){if(e?.code==='REVISION_CONFLICT'){progress=migrateProgressV21(root.EngBookBackend.mergeProgress(e?.details?.payload||{},progress));globalRevision=Number(e?.details?.revision);rawSave();lastSent.delete(key);return syncGlobal(true);}permanent(e,key,serialized);return false;}
  }
  async function syncLesson(id,force=false){
    const n=Number(id);if(!Number.isInteger(n)||n<1)return true;
    const payload=root.EngBookProgressSync.lessonSnapshot(progress,n,lessonWords(n)),summary=root.EngBookProgressSync.lessonSummary(progress,n),serialized=JSON.stringify({payload,summary}),key=`lesson:${n}`;
    if(!force&&lastSent.get(key)===serialized)return true;
    try{const out=await root.EngBookBackend.syncLessonProgress(n,payload,summary,lessonRevisions.get(n)??null);lessonRevisions.set(n,Number(out.revision));hydrated.add(n);lastSent.set(key,serialized);return true;}
    catch(e){if(e?.code==='REVISION_CONFLICT'&&Number(e?.details?.lessonId)===n){const merged=root.EngBookBackend.mergeProgress(e.details.payload||{},payload);root.EngBookProgressSync.applyLessonPayload(progress,n,merged);lessonRevisions.set(n,Number(e.details.revision));rawSave();lastSent.delete(key);return syncLesson(n,true);}permanent(e,key,serialized);return false;}
  }
  async function push({force=false,announce=false,scope='both'}={}){
    if(!cloudReady()||busy)return false;busy=true;lastSyncStatus='syncing';lastSyncError=null;
    try{const jobs=[];if(scope!=='lesson')jobs.push(syncGlobal(force).then(ok=>{if(ok)lastGlobalAt=Date.now();return ok;}));if(scope!=='global'){const ids=[...dirtyLessons];if(!ids.length&&force){const n=activeLesson();if(n)ids.push(n);}for(const id of ids)jobs.push(syncLesson(id,force).then(ok=>{if(ok)dirtyLessons.delete(id);return ok;}));}const ok=(await Promise.all(jobs)).every(Boolean);lastSyncStatus=ok?'synced':'error';lastSyncError=ok?null:'One or more progress updates could not be synced.';if(ok&&!lastGlobalAt)lastGlobalAt=Date.now();if(announce)toast?.(ok?'Progress synced to your account.':'Could not sync progress right now.');return ok;}
    catch(e){lastSyncStatus='error';lastSyncError=String(e?.message||e||'Cloud sync failed.').slice(0,200);if(announce)toast?.('Could not sync progress right now.');return false;}
    finally{busy=false;if(queued){queued=false;queueSync(500);}}
  }
  function queueSync(delay=1500){if(!cloudReady())return;if(busy)queued=true;clearTimeout(syncTimer);syncTimer=setTimeout(()=>push({scope:'lesson'}),Math.max(350,delay));clearTimeout(globalTimer);globalTimer=setTimeout(()=>push({scope:'global'}),Date.now()-lastGlobalAt>30000?250:5000);}
  saveProgress=function(){const ok=rawSave();const id=activeLesson();if(id)dirtyLessons.add(id);queueSync();return ok;};
  async function hydrateLesson(id){const n=Number(id);if(!cloudReady()||hydrated.has(n))return true;try{const cloud=await root.EngBookBackend.getLessonProgress(n);if(cloud?.exists&&cloud.payload){root.EngBookProgressSync.applyLessonPayload(progress,n,cloud.payload);lessonRevisions.set(n,Number(cloud.revision));rawSave();}else lessonRevisions.set(n,0);hydrated.add(n);return true;}catch(e){if(e?.code==='AUTH_REQUIRED')suspended=true;return false;}}
  async function bootstrap(){
    try{const remoteCatalog=await root.EngBookBackend.catalog();const rows=Array.isArray(remoteCatalog?.lessons)?remoteCatalog.lessons:[];if(rows.length){root.EngBookContent?.registerManifest?.(rows);rows.forEach(m=>root.EngBookContent?.registerLessonMeta?.({id:Number(m.lessonId),categoryId:Number(m.categoryId||1),title:m.title,image:m.image,status:m.status||'catalog',source:'server-catalog'}));}}catch{}
    const session=await root.EngBookBackend.bootstrapSession();if(!session?.authenticated){if(state?.screen==='home')renderHome?.();return false;}suspended=false;if(!cloudReady()){if(state?.screen==='home')renderHome?.();return true;}
    try{const cloud=await root.EngBookBackend.progressBootstrap(),hadLocal=meaningful();if(cloud?.legacy?.exists&&cloud.legacy.payload){const remote=cloud.legacy.payload?.progress||cloud.legacy.payload||{};progress=migrateProgressV21(hadLocal?root.EngBookBackend.mergeProgress(remote,progress):remote);}if(cloud?.global?.exists&&cloud.global.payload){progress=migrateProgressV21(hadLocal?root.EngBookBackend.mergeProgress(cloud.global.payload,progress):{...progress,...cloud.global.payload});globalRevision=Number(cloud.global.revision);}else globalRevision=0;for(const row of Array.isArray(cloud?.lessons)?cloud.lessons:[]){const n=Number(row.lessonId);root.EngBookProgressSync.applyLessonSummary(progress,n,row.summary||{});lessonRevisions.set(n,Number(row.revision));}rawSave();await hydrateLesson(Number(progress.lastLesson||1));await push();if(state?.screen==='home')renderHome?.();else render?.();return true;}catch{return false;}
  }
  // Hydrate only the lesson being opened; local content remains the offline fallback.
  if(typeof v28EnsureAndOpenLesson==='function'){const prev=v28EnsureAndOpenLesson;v28EnsureAndOpenLesson=async function(id,mode='explore',opts={}){await hydrateLesson(Number(id||1));const out=await prev(id,mode,opts);if(out)root.EngBookActivity?.record?.('lesson_open',{lesson:Number(id),mode:String(mode||'explore'),source:'learning-path'});return out;};}
  if(typeof setMode==='function'){const prev=setMode;setMode=function(mode){const out=prev(mode);root.EngBookActivity?.record?.('mode_open',{lesson:activeLessonId(),mode:String(mode||'').slice(0,32)});return out;};}
  if(typeof productFinishSession==='function'){const prev=productFinishSession;productFinishSession=function(){root.EngBookActivity?.record?.('focus_session_complete',{lesson:Number(progress.lastLesson||1),resultBucket:'complete'});return prev();};}
  v31ExplainSignIn=function(){location.href=`./account.html?return=${encodeURIComponent(location.pathname+location.search+location.hash)}`;};
  v31SignOut=async function(){try{await root.EngBookBackend.logout();root.EngBookCommercial?.signOut?.();root.EngBookLessonPurchases?.clearForSignOut?.();suspended=true;toast?.('Signed out. Local progress was kept on this device.');v31CloseAccount?.();renderHome?.();}catch{toast?.('Could not sign out.');}};
  v31SetPermission=async function(key,value){try{root.EngBookCommercial?.setPermission?.(key,Boolean(value));if(root.EngBookBackend.status().authenticated&&['productAnalytics','crashReports','cloudSync'].includes(key))await root.EngBookBackend.updatePrivacy({[key]:Boolean(value)});if(key==='cloudSync'&&value){suspended=false;await bootstrap();}v22RenderPrivacyDialog?.();v21Announce?.(`${key} ${value?'enabled':'disabled'}.`);}catch(e){toast?.(e?.message||'Could not update this permission.');}};
  v31SyncNow=async function(){try{const ok=await push({announce:true,force:true});if(ok){v31CloseAccount?.();state?.screen==='home'?renderHome?.():render?.();}}catch{toast?.('Cloud sync is unavailable.');}};
  root.addEventListener?.('online',()=>{suspended=false;queueSync(250);root.EngBookActivity?.flush?.();});
  root.addEventListener?.('engbook:auth-expired',()=>{suspended=true;root.EngBookCommercial?.signOut?.();root.EngBookLessonPurchases?.invalidateSession?.();try{state?.screen==='home'?renderHome?.():render?.();}catch(_){}});
  root.addEventListener?.('load',()=>setTimeout(bootstrap,0));
  root.EngBookSqlBridge=Object.freeze({version:'0.84',bootstrap,push,hydrateLesson,status:()=>({authenticated:root.EngBookBackend.status().authenticated,cloudReady:cloudReady(),globalRevision,lessonRevisions:Object.fromEntries(lessonRevisions),dirtyLessons:[...dirtyLessons],busy,lastSyncStatus,lastSyncAt:lastGlobalAt||null,lastSyncError,suspended})});
  root.ENGBOOK_RUNTIME={...(root.ENGBOOK_RUNTIME||{}),build:'v0.84-user-panel-ux-stabilized',sqlApiIntegrated:true,progressAuthority:'client-reported',verifiedAssessmentAuthority:'server-verified',postgresProgressModel:'global+per-lesson',authoritySecurityBase:'v0.62'};
})(typeof window!=='undefined'?window:globalThis);
