import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import crypto from 'node:crypto';import {createRequire} from 'node:module';
const root=path.resolve(import.meta.dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8'),json=f=>JSON.parse(read(f)),ids=[2,5,10003,10004,10010];
function context(){const ctx=vm.createContext({URLSearchParams,console,document:{addEventListener(){}}});ctx.window=ctx;for(const f of ['core/build-info.js','core/course-catalog.js','core/course-path.js','data.js','lesson-pack-index.generated.js','lesson-packs.generated.js','core/lesson-validator.js','core/content-engine.js','core/panorama-course.generated.js','core/lesson1-panorama-data.generated.js'])vm.runInContext(read(f),ctx,{filename:f});return ctx;}
test('the real registry exposes exactly the five selected lessons, with displayed lesson one first',()=>{
 const ctx=context(),api=ctx.EngBookContent;assert.deepEqual(Array.from(api.snapshot().readyLessons),ids);assert.deepEqual(Array.from(api.listLessons(1),l=>l.id),[5,2]);assert.equal(ctx.EngBookCoursePath.localNumber({id:5,categoryId:1}),1);
 assert.deepEqual(Array.from(ctx.SceneSpeakPanoramaCourse.entries,e=>e.scene),['park','home','museum']);for(const id of [1,3,4,6,10001,10002,10005,10013])assert.equal(api.canOpen(id),false);
 for(const id of ids){const p=api.getPack(id);assert.ok(api.validatePack(p).ok,`${id}: ${api.validatePack(p).errors}`);assert.ok(p.hotspots.length>=40);assert.ok(fs.existsSync(path.join(root,p.image)));}
 assert.equal(api.getPack(5).hotspots.length,324);assert.equal(api.categorySnapshot(1).totalLessons,2);
});
test('static pack hashes and complete five-level listening coverage match the release',()=>{
 const ctx=context();vm.runInContext(read('core/lesson-listening.js'),ctx);const index=json('lesson-packs/index.json');assert.equal(index.lessons.length,5);
 for(const entry of index.lessons){const bytes=fs.readFileSync(path.join(root,entry.url));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),entry.packSha256);const p=JSON.parse(bytes);for(const level of ['A1','A2','B1','B2','C1']){const audio=ctx.EngBookLessonListening.build(p,{level});assert.equal(audio.coverage.covered,p.hotspots.length,`${p.lessonId}/${level}`);assert.equal(audio.coverage.missing.length,0);}}
});
test('HTML entry points and service worker shell contain no missing local files',()=>{
 for(const f of ['index.html','panorama.html','garden360-lesson1.html','account.html'])for(const m of read(f).matchAll(/(?:src|href)="([^"?#]+)(?:\?[^"#]*)?"/g)){if(/^(?:https?:|data:|mailto:|#)/.test(m[1]))continue;assert.ok(fs.existsSync(path.join(root,m[1])),`${f}: ${m[1]}`);}
 const shell=JSON.parse(read('sw.js').match(/const APP_SHELL=(\[[\s\S]*?\]);/)[1]);for(const f of shell)assert.ok(fs.existsSync(path.join(root,f)),f);assert.match(read('sw.js'),/demo-five-20261029/);
});
test('all selected panorama detail, tile and cube-face assets are packaged',()=>{
 const ctx=context();for(const f of ['core/panorama-park-data.js','core/panorama-home-manifest.js','core/panorama-home-granular.js','core/panorama-home-data.js','core/panorama-museum-data.js'])vm.runInContext(read(f),ctx,{filename:f});
 const visited=new WeakSet(),assets=new Set();function walk(v){if(typeof v==='string'&&v.startsWith('assets/'))assets.add(v);else if(v&&typeof v==='object'&&!visited.has(v)){visited.add(v);Object.values(v).forEach(walk);}}
 for(const k of ['SceneSpeakLesson1Garden','SceneSpeakPanoramaPark','SceneSpeakPanoramaParkNear','SceneSpeakPanoramaHome','SceneSpeakPanoramaMuseum'])walk(ctx[k]);assert.ok(assets.size>=90);for(const f of assets)assert.ok(fs.existsSync(path.join(root,f)),f);
});
test('only five pack files are shipped, without backend, books or private source metadata',()=>{
 assert.equal(fs.readdirSync(path.join(root,'lesson-packs')).filter(f=>/^lesson_\d+\.json$/.test(f)).length,5);for(const f of ['server','source_materials','admin-studio','.env'])assert.equal(fs.existsSync(path.join(root,f)),false);
 const forbidden=new RegExp(['source'+'Trace','source'+'Document','source'+'Alignment','WORD_'+'SAFE','\\.'+'doc'+'x'].join('|'),'i');
 for(const id of ids){const p=json(`lesson-packs/lesson_${String(id).padStart(2,'0')}.json`);assert.doesNotMatch(JSON.stringify(p),forbidden);}
});
