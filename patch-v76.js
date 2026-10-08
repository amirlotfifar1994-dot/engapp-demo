/* EngBook v0.76 — timed voice recording for 30/60/90 speaking challenges */
(function(){
  const R={stream:null,startedAt:0,stopping:false,challengeSeconds:0,generation:0};
  function safeRevoke(){try{if(state.recordedUrl)URL.revokeObjectURL(state.recordedUrl);}catch(e){} state.recordedUrl=null;}
  function stopTracks(){try{R.stream?.getTracks?.().forEach(t=>t.stop());}catch(e){}R.stream=null;}
  function mediaMime(){
    const tries=['audio/webm;codecs=opus','audio/webm','audio/mp4'];
    for(const t of tries){try{if(window.MediaRecorder?.isTypeSupported?.(t))return t;}catch(e){}}
    return '';
  }
  function resetRecordingState({keepAudio=true}={}){
    R.generation++;
    try{if(state.recorder&&state.recorder.state!=='inactive')state.recorder.stop();}catch(e){}
    stopTracks();R.stopping=false;state.recording=false;state.recorder=null;state.chunks=[];R.startedAt=0;R.challengeSeconds=0;
    if(!keepAudio)safeRevoke();
  }
  window.deleteSpeakingRecording=function(){
    if(state.recording){try{state.recorder?.stop?.();}catch(e){}}
    resetRecordingState({keepAudio:false});state.speakingSeconds=state.speakingDuration;clearTimer();haptic?.(8);render();
  };
  window.replaySpeakingRecording=function(){const a=document.querySelector('.v76-audio-review audio');if(!a)return;try{a.currentTime=0;a.play();}catch(e){}};
  window.stopTimedVoiceChallenge=function(){
    clearTimer();
    if(state.recording&&state.recorder&&state.recorder.state!=='inactive'){R.stopping=true;try{state.recorder.stop();}catch(e){resetRecordingState({keepAudio:true});render();}}
    else render();
  };
  window.startTimedVoiceChallenge=async function(sec){
    sec=Math.max(5,Math.min(180,Number(sec)||30));
    if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){toast('Voice recording is unavailable in this browser. You can still use the speaking timer.');prepareSpeaking(sec);return;}
    // stop prior recording safely
    if(state.recording){try{state.recorder?.stop?.();}catch(e){}stopTracks();}
    clearTimer();stopRecognition?.();safeRevoke();
    state.speakingDuration=sec;state.speakingSeconds=sec;state.transcript='';state.chunks=[];R.challengeSeconds=sec;R.stopping=false;
    try{
      const gen=++R.generation;
      const stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}});
      R.stream=stream;
      const mime=mediaMime();
      const rec=mime?new MediaRecorder(stream,{mimeType:mime}):new MediaRecorder(stream);
      state.recorder=rec;state.recording=true;R.startedAt=Date.now();
      rec.ondataavailable=e=>{if(e.data&&e.data.size)state.chunks.push(e.data);};
      rec.onerror=()=>{toast('Recording stopped because the browser reported an audio error.');try{stream.getTracks().forEach(t=>t.stop());}catch(e){}if(gen===R.generation){R.stream=null;state.recording=false;clearTimer();render();}};
      rec.onstop=()=>{
        try{stream.getTracks().forEach(t=>t.stop());}catch(e){}
        if(gen!==R.generation)return;
        const usedType=rec.mimeType||mime||'audio/webm';
        const blob=new Blob(state.chunks,{type:usedType});
        safeRevoke();
        if(blob.size>0)state.recordedUrl=URL.createObjectURL(blob);
        state.recording=false;state.recorder=null;R.stream=null;
        const elapsed=Math.max(0,Math.round((Date.now()-R.startedAt)/1000));
        state.recordedSeconds=Math.min(sec,elapsed||sec);R.startedAt=0;R.stopping=false;
        progress.speakingAttempts=(progress.speakingAttempts||0)+1;progress.activity.speaks=(progress.activity.speaks||0)+1;progress.completed[`l${activeLessonId()}_speaking`]=true;
        if(state.transcript){progress.lastSpeechScore=speechAnalysis().overall;saveCoverageResult();saveEvidenceResult();}
        awardPoints(12,'timed-record');saveProgress();haptic?.([18,26,18]);render();
      };
      rec.start(250);
      state.speakingRunning=true;render();
      timerId=setInterval(()=>{
        state.speakingSeconds=Math.max(0,state.speakingSeconds-1);updateTimerDom();
        if(state.speakingSeconds<=0){
          clearTimer();
          if(state.recording&&state.recorder?.state!=='inactive'){R.stopping=true;try{state.recorder.stop();}catch(e){}}
          toast('Time is up — your recording is ready to review.');haptic?.([30,45,30]);
        }
      },1000);
    }catch(e){
      stopTracks();state.recording=false;state.recorder=null;clearTimer();
      const denied=e?.name==='NotAllowedError'||e?.name==='SecurityError';
      toast(denied?'Microphone permission was not granted. You can still practice without recording.':'The microphone could not start. You can still use the speaking timer.');
      render();
    }
  };


  window.launchTimedVoiceChallenge=function(sec){
    setMode('speak');
    return window.startTimedVoiceChallenge(sec);
  };

  // Keep manual record button, but make it obey the selected 30/60/90 limit.
  window.__v76OldToggleRecording=typeof toggleRecording==='function'?toggleRecording:null;
  toggleRecording=async function(){
    if(state.recording)return window.stopTimedVoiceChallenge();
    return window.startTimedVoiceChallenge(state.speakingDuration||30);
  };

  // Switching challenge duration stops live capture and removes the previous audio to avoid confusing attempts.
  window.__v76OldPrepareSpeaking=prepareSpeaking;
  prepareSpeaking=function(sec){
    if(state.recording){R.generation++;try{state.recorder?.stop?.();}catch(e){}stopTracks();}
    clearTimer();safeRevoke();state.recording=false;state.recorder=null;state.chunks=[];state.recordedSeconds=0;
    state.speakingDuration=Number(sec)||30;state.speakingSeconds=state.speakingDuration;state.transcript='';render();
  };

  // Enhance speaking UI without replacing the existing coach/evidence engine.
  window.__v76OldSpeakContent=typeof speakContent==='function'?speakContent:null;
  if(window.__v76OldSpeakContent){
    speakContent=function(){
      let html=window.__v76OldSpeakContent();
      const sec=Number(state.speakingDuration||30);
      html=html.replace(/<button class="primary" data-eng-v52-click="toggleTimer\(\)">[\s\S]*?<\/button>/,
        `<button class="primary v76-main-record ${state.recording?'live':''}" data-eng-v52-click="${state.recording?'stopTimedVoiceChallenge()':`startTimedVoiceChallenge(${sec})`}">${icon(state.recording?'close':'mic')} ${state.recording?'Stop & save recording':`Record ${sec}s`}</button>`);
      html=html.replace(/<button class="record-btn[\s\S]*?<\/button><button class="transcript-btn/,
        `<button class="record-btn ${state.recording?'live':''}" data-eng-v52-click="${state.recording?'stopTimedVoiceChallenge()':`startTimedVoiceChallenge(${sec})`}">${icon('mic')}<span><b>${state.recording?'Recording… tap to stop':`Record ${sec}s challenge`}</b><small>${state.recording?'Timer and microphone are running together':'Microphone + timer start together'}</small></span></button><button class="transcript-btn`);
      if(state.recordedUrl){
        html=html.replace(/<div class="audio-review"><span>YOUR RECORDING<\/span><audio controls src="[^"]+"><\/audio><\/div>/,
          `<div class="audio-review v76-audio-review"><div class="v76-review-head"><span>YOUR ${sec}s RECORDING</span><b>${state.recordedSeconds||sec}s attempt</b></div><audio controls preload="metadata" src="${state.recordedUrl}"></audio><div class="v76-review-actions"><button data-eng-v52-click="replaySpeakingRecording()">${icon('refresh')} Replay</button><button data-eng-v52-click="startTimedVoiceChallenge(${sec})">${icon('mic')} Re-record</button><button class="danger" data-eng-v52-click="deleteSpeakingRecording()">${icon('close')} Delete</button></div><small>Your recording stays local to this browser session and is not uploaded by this feature.</small></div>`);
      }
      return html;
    };
  }

  // Main lesson 30/60/90 challenge buttons now open Speak and immediately start recording.
  function patchSpeakStage(fnName){
    const old=window[fnName]||globalThis[fnName];if(typeof old!=='function')return;
    const wrapped=function(g){let html=old(g);return html.replace(/data-eng-v52-click="setMode\('speak'\);prepareSpeaking\((30|60|90)\)"/g,'data-eng-v52-click="setMode(\'speak\');setTimeout(()=>startTimedVoiceChallenge($1),80)"').replace(/>Start (30|60|90)s /g,'>Record $1s ');};
    try{globalThis[fnName]=wrapped;}catch(e){}try{window[fnName]=wrapped;}catch(e){}
  }
  ['l01SpeakStep','l02SpeakStep','l03SpeakStep','l04SpeakStep','l05SpeakStep'].forEach(patchSpeakStage);

  // Stop mic tracks when leaving the lesson/home.
  if(typeof setMode==='function'){const old=setMode;setMode=function(mode){if(state.recording&&mode!=='speak')window.stopTimedVoiceChallenge();return old(mode);};}
  if(typeof goHome==='function'){const old=goHome;goHome=function(){R.generation++;if(state.recording){try{state.recorder?.stop?.();}catch(e){}}stopTracks();safeRevoke();state.recording=false;return old();};}
  if(typeof openLesson==='function'){const old=openLesson;openLesson=function(id){R.generation++;if(state.recording){try{state.recorder?.stop?.();}catch(e){}}stopTracks();safeRevoke();state.recording=false;return old(id);};}
  formatTime=function(s){s=Math.max(0,Number(s)||0);return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;};

  window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:'v0.81-timed-voice-recording-stabilized',timedVoiceRecording:true,recordingDurations:[30,60,90],recordingPlayback:true,recordingAutoStop:true};
})();
