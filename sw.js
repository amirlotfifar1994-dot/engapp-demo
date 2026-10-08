const PUBLISH_STAMP='scenespeak-demo-6-lessons-20261008';
const VERSION=PUBLISH_STAMP;
const STATIC_CACHE=`engapp-static-${VERSION}`;
const RUNTIME_CACHE=`engapp-runtime-${VERSION}`;
const LESSON_CACHE=`engapp-lessons-${VERSION}`;
const OWNED_CACHE_PREFIXES=['engapp-static-','engapp-runtime-','engapp-lessons-','engbook-static-','engbook-runtime-','engbook-lessons-'];
const APP_SHELL=['./','./index.html','./core/app-startup.js','./assets/brand/scenespeak-loading-v2.webp','./styles.css','./ui-current.css','./ui-v76.css','./ui-v82.css','./ui-v84.css','./theme-sky.css','./theme-path.css','./theme-light-gallery.css','./home-hero.css','./scene-canvas.css','./ui-studio.css','./ui-v69.css','./ui-v70.css','./ui-v71.css','./ui-v72.css','./ui-v73.css','./core/content-revision.js','./core/build-info.js','./core/course-catalog.js','./core/course-path.js','./data.js','./lesson-pack-index.generated.js','./lesson-packs.generated.js','./current-content-overrides.js','./content-v69.js','./content-v74-audit.js','./core/adaptive-taxonomy-contract.js','./core/lesson-validator.js','./core/lesson-repository.js','./core/content-engine.js','./core/hotspot-engine.js','./core/scene-evidence.js','./core/scene-intelligence.js','./core/privacy-store.js','./core/learner-model.js','./core/action-router.js','./core/speech-core.js','./core/practice-review.js','./core/speaking-studio.js','./core/talk-studio.js','./core/immersive-learn.js','./core/scenario-studio.js','./core/ai-adapter.js','./core/learning-orchestrator.js','./core/user-access-config.js','./core/commercial-shell.js','./core/sync-tombstones.js','./core/local-data-store.js','./core/offline-downloads.js','./core/backend-client.js','./core/store-catalog-v82.js','./core/admin-feature-policy-v83.js','./core/purchase-entitlements-v82.js','./core/access-model-v82.js','./core/activity-client.js','./core/progress-sync.js','./core/device-readiness.js','./core/security.js','./core/personal-marks.js','./core/published-overrides.generated.js','./core/published-overrides.js','./core/user-panel-v84.js','./core/deep-link-router.js','./app.js','./patch-v76.js','./runtime-v69.js','./runtime-v70.js','./runtime-v71.js','./runtime-v72.js','./runtime-v73.js','./runtime-v75.js','./runtime-v77.js','./runtime-v78.js','./core/level-aware-language.js','./core/imagination-memory-dna.generated.js','./core/gold-journey.js','./core/event-router-v52.js','./core/ui-shell-v52.js','./core/home-hero.js','./core/picture-language.js','./core/scene-canvas.js','./account.html','./account.css','./account.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./lesson-packs/lesson_05.json','./lesson-packs/lesson_03.json','./assets/images/lesson_05.jpg','./assets/images/lesson_03.jpg','./assets/images/lesson_01.jpg','./lesson-packs/lesson_01.json','./assets/images/lesson_02.jpg','./lesson-packs/lesson_02.json'];

const OFFLINE_FALLBACK='./index.html';
const MAX_RUNTIME_ENTRIES=180;async function trimCache(cache,max=MAX_RUNTIME_ENTRIES){const keys=await cache.keys();for(const k of keys.slice(0,Math.max(0,keys.length-max)))await cache.delete(k);}
self.addEventListener('install',event=>event.waitUntil(caches.open(STATIC_CACHE).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>OWNED_CACHE_PREFIXES.some(prefix=>k.startsWith(prefix))&&![STATIC_CACHE,RUNTIME_CACHE,LESSON_CACHE].includes(k)).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',event=>{
  const req=event.request;if(req.method!=='GET')return;
  const url=new URL(req.url);if(url.origin!==self.location.origin)return;
  const isLessonApi=/^\/api\/v1\/lessons\/\d+\/(pack|image)$/.test(url.pathname);
  if(isLessonApi){
    event.respondWith(caches.open(LESSON_CACHE).then(async cache=>{
      try{const resp=await fetch(req),cc=String(resp.headers.get('Cache-Control')||'').toLowerCase();const publicCacheable=resp.ok&&cc.includes('public')&&!cc.includes('private')&&!cc.includes('no-store');if(publicCacheable){for(const oldReq of await cache.keys()){const oldUrl=new URL(oldReq.url);if(oldUrl.pathname===url.pathname&&oldUrl.href!==url.href)await cache.delete(oldReq);}await cache.put(req,resp.clone());}else if(resp.status===401||resp.status===403)await cache.delete(req);return resp;}
      catch(err){const hit=await cache.match(req);if(hit){const cc=String(hit.headers.get('Cache-Control')||'').toLowerCase();if(cc.includes('public')&&!cc.includes('private')&&!cc.includes('no-store'))return hit;await cache.delete(req);}throw err;}
    }));return;
  }
  if(url.pathname.startsWith('/api/')){event.respondWith(fetch(req));return;}
  if(req.mode==='navigate'){
    event.respondWith(fetch(req).then(resp=>{const copy=resp.clone();caches.open(RUNTIME_CACHE).then(async c=>{await c.put(req,copy);await trimCache(c);});return resp;}).catch(async()=>await caches.match(req)||await caches.match(OFFLINE_FALLBACK)));return;
  }
  if(url.pathname.includes('/assets/images/')||url.pathname.includes('/lesson-packs/')){
    event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(resp=>{if(resp.ok){const copy=resp.clone();caches.open(RUNTIME_CACHE).then(async c=>{await c.put(req,copy);await trimCache(c);});}return resp;})));return;
  }
  event.respondWith(caches.match(req).then(hit=>{const network=fetch(req).then(resp=>{if(resp.ok){const copy=resp.clone();caches.open(RUNTIME_CACHE).then(async c=>{await c.put(req,copy);await trimCache(c);});}return resp;}).catch(()=>hit);return hit||network;}));
});







