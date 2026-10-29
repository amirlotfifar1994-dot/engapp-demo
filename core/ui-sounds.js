/* App-wide sound preference and small local interaction cues. */
(function(root){
  'use strict';
  const doc=root.document,KEY='scenespeak:ui-sounds';
  let enabled=true,context=null,last=-Infinity,generation=0;
  const voices=new Set();
  const mutedMedia=new WeakMap();
  try{enabled=root.localStorage.getItem(KEY)!=='off';}catch{}
  // frequency, end frequency, start offset, duration, level
  const cues={
    tap:[[470,330,0,.045,.055]],
    hotspot:[[680,460,0,.055,.075],[960,780,.018,.04,.025]],
    navigate:[[440,580,0,.075,.05]],
    close:[[420,290,0,.065,.045]],
    save:[[640,640,0,.07,.05],[850,850,.065,.09,.04]],
    success:[[660,660,0,.085,.055],[880,880,.075,.11,.045]],
    complete:[[523,523,0,.09,.05],[659,659,.075,.1,.045],[784,784,.15,.15,.04]],
    retry:[[330,290,0,.095,.045]]
  };
  function stop(){
    generation++;
    for(const voice of voices){try{voice.gain.gain.cancelScheduledValues(context.currentTime);voice.gain.gain.setTargetAtTime(0,context.currentTime,.003);voice.osc.stop(context.currentTime+.015);}catch{}}
  }
  function silenceMedia(el){
    if(!el||!['AUDIO','VIDEO'].includes(el.tagName))return;
    if(!mutedMedia.has(el))mutedMedia.set(el,el.muted);
    el.muted=true;
    if(el.tagName==='AUDIO')el.pause?.();
  }
  function silence(){
    stop();root.EngBookSpeech?.stopSpeaking?.();
    try{root.speechSynthesis?.cancel();}catch{}
    doc.querySelectorAll('audio,video').forEach(silenceMedia);
  }
  function applyPreference(){
    if(!enabled)silence();
    else doc.querySelectorAll('audio,video').forEach(el=>{if(mutedMedia.has(el)){el.muted=mutedMedia.get(el);mutedMedia.delete(el);}});
    sync();
    if(root.CustomEvent)root.dispatchEvent?.(new root.CustomEvent('scenespeak:sound-change',{detail:{enabled}}));
  }
  function busy(){
    const state=root.EngBookEventContext?.getRoot?.('state')||{};
    return Boolean(doc?.hidden||root.speechSynthesis?.speaking||root.speechSynthesis?.pending||root.EngBookSpeech?.active?.()||state.recording||state.listening||root.EngBookSpeaking?.busy?.()||root.EngBookTalk?.busy?.()||[...doc.querySelectorAll('audio,video')].some(el=>!el.paused&&!el.ended));
  }
  function synth(notes,onEnd){
    const start=context.currentTime+.004,token=generation;let pending=notes.length;
    for(const [hz,end,offset,duration,level] of notes){
      const osc=context.createOscillator(),gain=context.createGain(),at=start+offset;
      const voice={osc,gain};voices.add(voice);
      osc.type='sine';osc.frequency.setValueAtTime(hz,at);osc.frequency.exponentialRampToValueAtTime(end,at+duration);
      gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(level,at+.004);gain.gain.exponentialRampToValueAtTime(.0001,at+duration);
      osc.connect(gain);gain.connect(context.destination);
      osc.onended=()=>{voices.delete(voice);osc.disconnect();gain.disconnect();if(--pending===0)onEnd?.(token===generation);};
      osc.start(at);osc.stop(at+duration+.01);
    }
  }
  function play(name='tap',onEnd){
    if(!enabled||!cues[name]||busy()||root.navigator?.userActivation?.isActive===false)return false;
    const now=Date.now(),priority=['success','complete','retry'].includes(name);
    if(!priority&&now-last<65)return false;
    try{
      const Ctor=root.AudioContext||root.webkitAudioContext;if(!Ctor)return false;
      if(!context||context.state==='closed')context=new Ctor();
      stop();last=now;const token=generation;
      if(context.state!=='running'){
        Promise.resolve(context.resume()).then(()=>{if(token===generation&&enabled&&!busy()&&Date.now()-now<200)synth(cues[name],onEnd);else onEnd?.(false);}).catch(()=>onEnd?.(false));
      }else synth(cues[name],onEnd);
      return true;
    }catch{stop();return false;}
  }
  const speaker='<path d="m11 5-6 5H2v4h3l6 5Z"/>';
  function buttonMarkup(extraClass=''){
    return `<button type="button" class="ui-sound-toggle ${extraClass}" data-ui-sound-toggle aria-label="App sound" aria-pressed="${enabled}" title="${enabled?'Mute all sounds':'Unmute sounds'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${speaker}<g data-sound-on ${enabled?'':'hidden'}><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></g><g data-sound-off ${enabled?'hidden':''}><path d="m16 9 6 6m0-6-6 6"/></g></svg></button>`;
  }
  function sync(){
    doc.querySelectorAll('[data-ui-sound-toggle]').forEach(button=>{
      button.setAttribute('aria-pressed',String(enabled));button.title=enabled?'Mute all sounds':'Unmute sounds';
      button.querySelector('[data-sound-on]')?.toggleAttribute('hidden',!enabled);
      button.querySelector('[data-sound-off]')?.toggleAttribute('hidden',enabled);
    });
  }
  function setEnabled(value){enabled=Boolean(value);try{root.localStorage.setItem(KEY,enabled?'on':'off');}catch{}applyPreference();return enabled;}
  function click(event){
    if(event.isTrusted===false)return;
    const el=event.target?.closest?.('button,a[href],summary,[role="tab"]');
    if(!el||el.disabled||el.getAttribute('aria-disabled')==='true')return;
    if(el.hasAttribute('data-ui-sound-toggle')){event.preventDefault();event.stopImmediatePropagation();setEnabled(!enabled);if(enabled)play('tap');return;}
    // Hotspots and recall results emit only after the real action is accepted.
    if(el.matches('.hotspot,[data-pano-hotspot],[data-card-drag],[data-canvas-action="anchor"],[data-canvas-action="parent"]'))return;
    const actions=Object.entries(el.dataset).filter(([key])=>/action|click/i.test(key)).map(([,value])=>value).join(' ');
    // These controls emit a semantic cue only after a result is accepted.
    if(/\b(?:checkBuilder|(?:l0[345])?answerFact)\s*\(/i.test(actions)||el.dataset.speakingAction==='finish'||el.dataset.talkAction==='finish')return;
    if(/hear|speak|voice|record|audio|listen|prompt|pronounce|recognition|microphone|replay/i.test(actions+' '+(el.getAttribute('aria-label')||'')))return;
    if(el.getAttribute('aria-selected')==='true'||['page','step','true'].includes(el.getAttribute('aria-current')))return;
    const kind=/close|back|cancel|return/i.test(actions)?'close':/save|bookmark/i.test(actions)?'save':/mode|lesson|course|next|prev|tab|map|scenario/i.test(actions)||el.matches('a,summary,[role="tab"]')?'navigate':'tap';
    play(kind);
  }
  doc.addEventListener('click',click,true);
  doc.addEventListener('play',event=>{stop();if(!enabled)silenceMedia(event.target);},true);
  doc.addEventListener('volumechange',event=>{if(!enabled&&!event.target?.muted)silenceMedia(event.target);},true);
  doc.addEventListener('visibilitychange',()=>{if(doc.hidden){stop();try{context?.suspend()?.catch(()=>{});}catch{}}});
  root.addEventListener?.('pagehide',stop);
  root.addEventListener?.('storage',event=>{if(event.key===KEY||event.key===null){try{enabled=root.localStorage.getItem(KEY)!=='off';}catch{}applyPreference();}});
  root.EngBookUISounds=Object.freeze({play,stop,setEnabled,isEnabled:()=>enabled,buttonMarkup});
})(typeof window!=='undefined'?window:globalThis);
