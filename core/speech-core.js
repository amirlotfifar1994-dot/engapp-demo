/* EngBook Speech Core v1.0
   A browser-adapter layer for speaking turns. It separates transcription
   confidence from pronunciation/fluency scoring and keeps typed fallback
   available whenever speech capture is unavailable. */
(function(root){
  'use strict';
  const VERSION='1.0.0';
  const DEFAULTS=Object.freeze({
    lang:'en-US', mode:'turn', continuous:false, interim:true,
    silenceMs:2200, pauseThresholdMs:900, restartOnEnd:false, maxRestarts:2,
    maxDurationMs:120000
  });
  let activeSession=null,sessionSeq=0,ttsToken=0;
  const providers=new Map();

  const now=()=>Date.now();
  const wc=t=>(String(t||'').trim().match(/[A-Za-z]+(?:'[A-Za-z]+)?/g)||[]).length;
  const clean=t=>String(t||'').replace(/\s+/g,' ').trim();
  const ctor=()=>root.SpeechRecognition||root.webkitSpeechRecognition||null;
  providers.set('browser',{name:'browser',isAvailable:()=>!!ctor(),create:()=>{const C=ctor();return C?new C():null;}});
  function registerProvider(name,provider){if(!name||!provider||typeof provider.create!=='function')throw new Error('Speech provider must expose create().');providers.set(String(name),provider);return true;}
  function providerInfo(){return [...providers.entries()].map(([name,p])=>({name,available:typeof p.isAvailable==='function'?!!p.isAvailable():true}));}
  const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:null;
  const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
  // One learning pace for words, picture cards, scenarios and coach playback.
  // Preserve the slower pronunciation modes relative to ordinary playback.
  function playbackRate(requested=.86){
    const n=Number(requested),base=Number.isFinite(n)&&n>0?n:.86;
    return Math.max(.3,Math.min(.65,base*.65));
  }

  // The browser supplies names, not gender metadata. Only classify known
  // English voices; an unfamiliar voice remains unlabeled.
  function voiceRole(voice){
    const name=String(voice?.name||'');
    if(/\b(female|zira|hazel|samantha|victoria|karen|moira|tessa|susan|jenny|aria|sonia|natasha|ava|allison|salli|joanna)\b/i.test(name))return 'female';
    if(/\b(male|david|mark|daniel|alex|fred|guy|ryan|james|george|christopher|eric|brian|tom|matthew|joey)\b/i.test(name))return 'male';
    return null;
  }
  function englishVoices(){
    try{return Array.from(root.speechSynthesis?.getVoices?.()||[]).filter(v=>/^en(?:[-_]|$)/i.test(v.lang)).sort((a,b)=>{
      const score=v=>(/^en-US$/i.test(v.lang)?4:/^en-GB$/i.test(v.lang)?2:0)+(v.localService?1:0);
      return score(b)-score(a)||String(a.name).localeCompare(String(b.name));
    });}catch{return [];}
  }
  function resolveVoice(text,options={}){
    const voices=englishVoices(),key=clean(options.voiceKey||text).toLowerCase();
    let hash=0;for(const c of key)hash=(Math.imul(hash,31)+c.charCodeAt(0))>>>0;
    const role=['male','female'].includes(options.voiceRole)?options.voiceRole:hash%2?'female':'male';
    return voices.find(v=>voiceRole(v)===role)||voices.find(v=>voiceRole(v))||voices[0]||null;
  }
  function voiceInfo(text,options={}){
    const voice=resolveVoice(text,options),role=voiceRole(voice);
    return {name:voice?.name||'',lang:voice?.lang||'en-US',role,
      label:role==='female'?'Female voice':role==='male'?'Male voice':'English voice'};
  }
  function waitForVoices(){
    if(englishVoices().length||!root.speechSynthesis?.addEventListener)return Promise.resolve();
    return new Promise(resolve=>{
      const synth=root.speechSynthesis;
      const done=()=>{root.clearTimeout(timer);synth.removeEventListener('voiceschanged',changed);resolve();};
      const changed=()=>{if(englishVoices().length)done();};
      const timer=root.setTimeout(done,1000);
      synth.addEventListener('voiceschanged',changed);changed();
    });
  }

  function capabilities(){
    return Object.freeze({
      recognition:!!ctor(), synthesis:!!root.speechSynthesis&&!!root.SpeechSynthesisUtterance,
      recording:!!root.MediaRecorder&&!!root.navigator?.mediaDevices?.getUserMedia,
      secureContext:root.isSecureContext!==false,
      online:root.navigator?.onLine!==false
    });
  }
  function errorInfo(code){
    const map={
      'not-allowed':['MIC_PERMISSION','Microphone permission is blocked. You can type instead.'],
      'service-not-allowed':['MIC_PERMISSION','Speech recognition is blocked by this browser or device.'],
      'audio-capture':['NO_MIC','No working microphone was detected.'],
      'no-speech':['NO_SPEECH','No speech was detected. Try again or type your answer.'],
      'network':['SPEECH_NETWORK','The browser speech service could not be reached. Typing still works.'],
      'aborted':['ABORTED','Speech capture stopped.'],
      'language-not-supported':['LANGUAGE','English speech recognition is not available in this environment.']
    };
    const [id,message]=map[code]||['SPEECH_ERROR','Speech capture could not continue. You can type instead.'];
    return {id,code:code||'unknown',message,recoverable:id!=='MIC_PERMISSION'};
  }
  function confidenceLabel(v){
    if(v===null||v===undefined||!Number.isFinite(v))return 'Unavailable';
    return v>=.82?'High':v>=.65?'Moderate':'Low';
  }
  function transcriptMetrics(sessionLike){
    const s=sessionLike||{},start=Number(s.startedAt||0),end=Number(s.endedAt||now()),durationMs=Math.max(0,end-start);
    const text=clean(s.finalText||s.transcript||'');
    const words=wc(text),events=Array.isArray(s.resultEvents)?s.resultEvents:[];
    const confidences=(Array.isArray(s.segments)?s.segments:[]).map(x=>Number(x.confidence)).filter(x=>Number.isFinite(x)&&x>0);
    const conf=avg(confidences),gaps=[];
    for(let i=1;i<events.length;i++){const gap=events[i].at-events[i-1].at;if(gap>=Number(s.options?.pauseThresholdMs||900))gaps.push(gap);}
    const speechRate=durationMs>=4000&&words?Math.round(words/(durationMs/60000)):null;
    return Object.freeze({
      words,durationMs,durationSec:Math.round(durationMs/100)/10,
      speechRateWpm:speechRate,pauseCount:gaps.length,longestPauseMs:gaps.length?Math.max(...gaps):0,
      recognitionConfidence:conf===null?null:Math.round(clamp(conf)*100),
      recognitionConfidenceLabel:confidenceLabel(conf),
      finalCharacters:text.length,hasTranscript:words>0,
      scope:'Transcript timing and browser-recognition metadata only. Not pronunciation, accent, fluency, or CEFR scoring.'
    });
  }

  class SpeechSession{
    constructor(options={}){
      this.id=`speech-${++sessionSeq}`;
      this.options={...DEFAULTS,provider:'browser',...options};
      if(this.options.mode==='dictation'&&options.silenceMs===undefined)this.options.silenceMs=0;
      if(this.options.mode==='phrase'&&options.silenceMs===undefined)this.options.silenceMs=1500;
      this.status='idle';this.recognition=null;this.startedAt=0;this.endedAt=0;
      this.finalText='';this.interimText='';this.transcript='';this.segments=[];this.resultEvents=[];
      this.intentionalStop=false;this.restarts=0;this.silenceTimer=null;this.maxTimer=null;this.completed=false;
      this.baseText=clean(this.options.baseText||'');
    }
    emit(name,payload){try{this.options[name]?.(payload,this);}catch(e){setTimeout(()=>{throw e;},0);}}
    setStatus(status,extra){this.status=status;this.emit('onState',{status,...(extra||{})});}
    clearTimers(){clearTimeout(this.silenceTimer);clearTimeout(this.maxTimer);this.silenceTimer=null;this.maxTimer=null;}
    armSilence(){
      clearTimeout(this.silenceTimer);const ms=Number(this.options.silenceMs||0);if(!ms)return;
      this.silenceTimer=setTimeout(()=>{if(this.status==='listening')this.stop('silence');},ms);
    }
    rebuild(event){
      const entries=[];for(let i=0;i<event.results.length;i++){
        const res=event.results[i],alt=res?.[0],text=clean(alt?.transcript||'');if(!text)continue;
        entries.push({index:i,text,final:!!res.isFinal,confidence:Number.isFinite(Number(alt?.confidence))?Number(alt.confidence):null,at:now()});
      }
      const finals=entries.filter(x=>x.final),interim=entries.filter(x=>!x.final);
      this.segments=finals;this.finalText=clean(finals.map(x=>x.text).join(' '));this.interimText=clean(interim.map(x=>x.text).join(' '));
      const current=clean([this.finalText,this.interimText].filter(Boolean).join(' '));this.transcript=clean([this.baseText,current].filter(Boolean).join(' '));
      this.resultEvents.push({at:now(),words:wc(this.transcript),finalWords:wc(this.finalText)});if(this.resultEvents.length>120)this.resultEvents.shift();
      this.emit('onTranscript',{text:this.transcript,sessionText:current,finalText:this.finalText,interimText:this.interimText,metrics:transcriptMetrics(this)});
      if(finals.length)this.emit('onFinal',{text:this.transcript,finalText:this.finalText,metrics:transcriptMetrics(this)});
      this.armSilence();
    }
    _startNative(){
      const provider=providers.get(this.options.provider||'browser');if(!provider||(typeof provider.isAvailable==='function'&&!provider.isAvailable())){this.fail(errorInfo('language-not-supported'));return false;}
      try{
        const r=provider.create(this.options);if(!r){this.fail(errorInfo('language-not-supported'));return false;}this.recognition=r;r.lang=this.options.lang;r.continuous=!!this.options.continuous;r.interimResults=this.options.interim!==false;
        if('maxAlternatives' in r)r.maxAlternatives=1;
        r.onstart=()=>{this.setStatus('listening');this.emit('onStart',{id:this.id});};
        r.onaudiostart=()=>this.emit('onAudio',{state:'audio-start'});
        r.onspeechstart=()=>{this.emit('onAudio',{state:'speech-start'});this.armSilence();};
        r.onspeechend=()=>this.emit('onAudio',{state:'speech-end'});
        r.onresult=e=>this.rebuild(e);
        r.onerror=e=>{const info=errorInfo(e?.error);if(info.id==='ABORTED'&&this.intentionalStop)return;this.fail(info);};
        r.onend=()=>{
          this.recognition=null;
          if(this.completed)return;
          if(!this.intentionalStop&&this.options.restartOnEnd&&this.restarts<this.options.maxRestarts){this.restarts++;setTimeout(()=>{if(!this.completed)this._startNative();},160);return;}
          this.complete(this.intentionalStop?'stopped':'ended');
        };
        r.start();return true;
      }catch(e){this.fail({id:'START_FAILED',code:'start-failed',message:'Microphone could not start. You can type instead.',recoverable:true,detail:String(e?.message||e)});return false;}
    }
    start(){
      if(this.status!=='idle')return this;
      if(activeSession&&activeSession!==this)activeSession.cancel('superseded');activeSession=this;
      this.startedAt=now();this.endedAt=0;this.intentionalStop=false;this.completed=false;this.setStatus('requesting');
      this.maxTimer=setTimeout(()=>this.stop('max-duration'),Math.max(5000,Number(this.options.maxDurationMs||120000)));
      this._startNative();return this;
    }
    stop(reason='manual'){if(this.completed)return;this.intentionalStop=true;this.stopReason=reason;this.setStatus('processing',{reason});this.clearTimers();try{this.recognition?.stop();}catch(e){this.complete(reason);}if(!this.recognition)this.complete(reason);}
    cancel(reason='cancelled'){if(this.completed)return;this.intentionalStop=true;this.stopReason=reason;this.clearTimers();try{this.recognition?.abort?.();}catch(e){}this.recognition=null;this.complete(reason,true);}
    fail(info){if(this.completed)return;this.clearTimers();this.status='error';this.endedAt=now();this.completed=true;try{this.recognition?.abort?.();}catch(e){}this.recognition=null;if(activeSession===this)activeSession=null;this.emit('onError',info);this.emit('onState',{status:'error',error:info});}
    complete(reason='ended',cancelled=false){if(this.completed)return;this.clearTimers();this.endedAt=now();this.completed=true;this.status=cancelled?'cancelled':'complete';if(activeSession===this)activeSession=null;const metrics=transcriptMetrics(this);this.emit('onComplete',{reason,cancelled,text:this.transcript,finalText:this.finalText||this.transcript,metrics});this.emit('onState',{status:this.status,reason,metrics});}
    metrics(){return transcriptMetrics(this);}
  }

  function createSession(options){return new SpeechSession(options);}
  function start(options){return createSession(options).start();}
  function stopActive(reason='manual'){if(activeSession)activeSession.stop(reason);}
  function cancelActive(reason='cancelled'){if(activeSession)activeSession.cancel(reason);}
  function active(){return activeSession;}
  function speak(text,options={}){
    return new Promise(resolve=>{
      const content=clean(text);if(!content||!capabilities().synthesis){options.onError?.({id:'TTS_UNAVAILABLE'});resolve(false);return;}
      const token=++ttsToken;
      const play=()=>{try{
        if(token!==ttsToken){resolve(false);return;}
        const u=new root.SpeechSynthesisUtterance(content),voice=resolveVoice(content,options);
        if(voice)u.voice=voice;
        u.lang=options.lang||voice?.lang||'en-US';u.rate=playbackRate(options.rate);u.pitch=Number(options.pitch||1);u.volume=Number(options.volume||1);
        u.onstart=()=>options.onStart?.();u.onend=()=>{if(token===ttsToken)options.onEnd?.();resolve(true);};u.onerror=()=>{if(token===ttsToken)options.onError?.({id:'TTS_ERROR'});resolve(false);};root.speechSynthesis.speak(u);
      }catch(e){options.onError?.({id:'TTS_ERROR',detail:String(e?.message||e)});resolve(false);}};
      try{root.speechSynthesis.cancel();
        if(!englishVoices().length&&root.speechSynthesis.addEventListener)waitForVoices().then(play);
        else play();
      }catch(e){options.onError?.({id:'TTS_ERROR',detail:String(e?.message||e)});resolve(false);}
    });
  }
  function stopSpeaking(){ttsToken++;try{root.speechSynthesis?.cancel?.();}catch(e){}}

  root.EngBookSpeech=Object.freeze({VERSION,version:VERSION,capabilities,errorInfo,confidenceLabel,transcriptMetrics,registerProvider,providerInfo,createSession,start,stopActive,cancelActive,active,speak,playbackRate,voiceInfo,stopSpeaking,SpeechSession});
  englishVoices(); // Start asynchronous browser voice discovery before the first tap.
})(typeof window!=='undefined'?window:globalThis);
