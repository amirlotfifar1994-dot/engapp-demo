/* EngBook Device Readiness v1.0.0
   Runtime capability audit for real browsers/devices. This module never
   requests microphone permission automatically and never invents support. */
(function(root){
  'use strict';
  const VERSION='1.0.0';
  const nav=()=>root.navigator||{};
  function safe(fn,fallback=false){try{return fn();}catch(_){return fallback;}}
  function localStorageOK(){return safe(()=>{const k='__engbook_device_probe__';root.localStorage.setItem(k,'1');root.localStorage.removeItem(k);return true;});}
  function standalone(){return safe(()=>root.matchMedia?.('(display-mode: standalone)')?.matches,false)||Boolean(nav().standalone);}
  function capabilities(){
    const n=nav(),w=root.innerWidth||0,h=root.innerHeight||0;
    const speech=Boolean(root.SpeechRecognition||root.webkitSpeechRecognition);
    const mediaDevices=Boolean(n.mediaDevices?.getUserMedia);
    return {
      secureContext: root.isSecureContext!==false,
      online: n.onLine!==false,
      localStorage: localStorageOK(),
      indexedDB: Boolean(root.indexedDB),
      serviceWorker: Boolean(n.serviceWorker),
      speechRecognition:speech,
      mediaDevices,
      mediaRecorder:Boolean(root.MediaRecorder),
      speechSynthesis:Boolean(root.speechSynthesis),
      touch:Number(n.maxTouchPoints||0)>0,
      coarsePointer:safe(()=>root.matchMedia?.('(pointer: coarse)')?.matches,false),
      reducedMotion:safe(()=>root.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches,false),
      standalone:standalone(),
      viewport:{width:w,height:h},
      language:String(n.language||'unknown'),
      platform:String(n.userAgentData?.platform||n.platform||'unknown').slice(0,80)
    };
  }
  function item(key,label,status,detail,blocking=false){return {key,label,status,detail,blocking};}
  function assess(){
    const c=capabilities();
    const checks=[
      item('storage','Learning progress',c.localStorage?'ready':'blocked',c.localStorage?'Local progress can be saved.':'Browser storage is unavailable.',!c.localStorage),
      item('secure','Secure context',c.secureContext?'ready':'degraded',c.secureContext?'Secure browser context detected.':'Microphone access may be limited unless EngBook is served over HTTPS.'),
      item('speech','Live transcript',c.speechRecognition?'ready':'fallback',c.speechRecognition?'Browser speech recognition is available.':'Live transcript is unavailable; typed answers remain supported.'),
      item('microphone','Microphone API',c.mediaDevices?'ready':'fallback',c.mediaDevices?'Microphone permission can be tested on demand.':'Browser microphone API is unavailable; typing remains available.'),
      item('recording','Local recording',c.mediaRecorder?'ready':'fallback',c.mediaRecorder?'MediaRecorder is available.':'Local audio recording is unavailable in this browser.'),
      item('coachVoice','Coach voice',c.speechSynthesis?'ready':'fallback',c.speechSynthesis?'Speech synthesis is available.':'Coach voice may be unavailable; text prompts remain available.'),
      item('offline','Offline shell',c.serviceWorker?'ready':'degraded',c.serviceWorker?'Service Worker support is available.':'Offline installation/cache is not available in this context.'),
      item('network','Network',c.online?'ready':'offline',c.online?'Device currently reports an online connection.':'Device is offline; already cached/local lessons can still work.')
    ];
    const blocking=checks.filter(x=>x.blocking).length;
    const degraded=checks.filter(x=>!['ready'].includes(x.status)).length;
    return {version:VERSION,overall:blocking?'blocked':degraded?'compatible-with-fallbacks':'ready',blocking,degraded,checks,capabilities:c};
  }
  async function testMicrophone(timeoutMs=7000){
    const n=nav();if(!n.mediaDevices?.getUserMedia){const e=new Error('Microphone API is unavailable.');e.code='NO_MIC_API';throw e;}
    let stream;let timer;
    try{
      const timeout=new Promise((_,reject)=>{timer=setTimeout(()=>{const e=new Error('Microphone permission test timed out.');e.code='MIC_TIMEOUT';reject(e);},Math.max(1500,Number(timeoutMs)||7000));});
      stream=await Promise.race([n.mediaDevices.getUserMedia({audio:true}),timeout]);
      const track=stream?.getAudioTracks?.()[0];
      return {ok:true,label:track?.label?String(track.label).slice(0,80):'Microphone available'};
    }catch(err){const e=new Error(err?.name==='NotAllowedError'?'Microphone permission was not granted.':String(err?.message||'Microphone test failed.'));e.code=err?.name==='NotAllowedError'?'MIC_PERMISSION':err?.code||'MIC_TEST_FAILED';throw e;}
    finally{clearTimeout(timer);try{stream?.getTracks?.().forEach(t=>t.stop());}catch(_){}}
  }
  function safeSnapshot(){const a=assess();return {version:a.version,overall:a.overall,blocking:a.blocking,degraded:a.degraded,checks:a.checks.map(({key,status})=>({key,status})),capabilities:{secureContext:a.capabilities.secureContext,online:a.capabilities.online,serviceWorker:a.capabilities.serviceWorker,speechRecognition:a.capabilities.speechRecognition,mediaDevices:a.capabilities.mediaDevices,mediaRecorder:a.capabilities.mediaRecorder,speechSynthesis:a.capabilities.speechSynthesis,touch:a.capabilities.touch,coarsePointer:a.capabilities.coarsePointer,reducedMotion:a.capabilities.reducedMotion,standalone:a.capabilities.standalone,viewport:a.capabilities.viewport}};}
  root.EngBookDevice=Object.freeze({version:VERSION,capabilities,assess,testMicrophone,safeSnapshot});
})(typeof window!=='undefined'?window:globalThis);
