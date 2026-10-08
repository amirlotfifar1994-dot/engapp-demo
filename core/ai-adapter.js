/* EngBook AI Adapter v0.88 Foundation Freeze
   A real transport contract for future backend services.
   IMPORTANT: when no backend is configured this adapter reports unavailable;
   it never fabricates AI output. Local deterministic lesson engines stay in app.js. */
(function(root){
  'use strict';

  class EngBookAIUnavailableError extends Error {
    constructor(message='EngBook AI backend is not connected.'){
      super(message); this.name='EngBookAIUnavailableError'; this.code='AI_BACKEND_UNAVAILABLE';
    }
  }
  class EngBookAIProtocolError extends Error {
    constructor(message='EngBook AI backend returned an invalid response.'){
      super(message); this.name='EngBookAIProtocolError'; this.code='AI_PROTOCOL_ERROR';
    }
  }

  const DEFAULT_TIMEOUT = 20000;
  const SAFE_RETRY_STATUS = new Set([502,503,504]);
  function remoteAllowed(){return root.EngBookPrivacy?.get?.('remoteAI')===true;}
  const trimSlash=s=>String(s||'').replace(/\/+$/,'');
  const hasFetch=()=>typeof root.fetch==='function';
  const now=()=>Date.now();

  function assertObject(v,label){
    if(!v || typeof v!=='object' || Array.isArray(v)) throw new EngBookAIProtocolError(`${label} must be an object.`);
    return v;
  }
  function assertArray(v,label){
    if(!Array.isArray(v)) throw new EngBookAIProtocolError(`${label} must be an array.`);
    return v;
  }

  class EngBookAIAdapter {
    constructor(config={}){
      this.config={baseUrl:'',timeoutMs:DEFAULT_TIMEOUT,headers:{},retries:1,credentials:'same-origin',...config};delete this.config.apiKey;
      this.lastHealth=null;
      this.lastError=null;
    }
    configure(config={}){
      this.config={...this.config,...config,headers:{...(this.config.headers||{}),...(config.headers||{})}};delete this.config.apiKey;
      return this.status();
    }
    isConfigured(){return Boolean(trimSlash(this.config.baseUrl));}
    status(){
      return {
        adapter:'ready',
        backend:this.isConfigured()?'configured':'not-connected',
        transport:hasFetch()?'fetch-ready':'fetch-unavailable',
        mode:this.isConfigured()?(remoteAllowed()?'remote-enabled':'remote-blocked-by-privacy'):'local-only',
        remoteAllowed:remoteAllowed(),
        lastHealth:this.lastHealth,
        lastError:this.lastError
      };
    }
    endpoint(path){
      if(!this.isConfigured()) throw new EngBookAIUnavailableError();
      return `${trimSlash(this.config.baseUrl)}/${String(path||'').replace(/^\//,'')}`;
    }
    async request(path,payload={},opts={}){
      if(!hasFetch()) throw new EngBookAIUnavailableError('Fetch transport is not available in this environment.');
      if(typeof navigator!=='undefined' && navigator.onLine===false) throw new EngBookAIUnavailableError('Device is offline; local EngBook engines remain available.');
      if(!remoteAllowed()) throw new EngBookAIUnavailableError('Remote AI is disabled in Data & Privacy controls. Local EngBook engines remain available.');
      if(root.EngBookCommercial?.hasFeature && !root.EngBookCommercial.hasFeature('remoteAI')) throw new EngBookAIUnavailableError('Remote AI is not included in the current entitlement. Local EngBook engines remain available.');
      const attempts=Math.max(1,Math.min(2,1+Number(opts.retries??this.config.retries??1)));
      let lastErr=null;
      for(let attempt=0;attempt<attempts;attempt++){
        const controller=typeof AbortController!=='undefined'?new AbortController():null;
        const timeoutMs=Number(opts.timeoutMs||this.config.timeoutMs||DEFAULT_TIMEOUT);
        const timer=controller?setTimeout(()=>controller.abort(),timeoutMs):null;
        const headers={'Content-Type':'application/json','Accept':'application/json','X-EngBook-Client':'engapp-v0.90-deployment-certified',...(this.config.headers||{})};
        try{
          const res=await root.fetch(this.endpoint(path),{method:opts.method||'POST',headers,body:opts.method==='GET'?undefined:JSON.stringify(payload),signal:controller?.signal,credentials:this.config.credentials||'omit'});
          if(!res.ok){const e=new Error(`HTTP ${res.status}`);e.status=res.status;throw e;}
          const data=await res.json();this.lastError=null;return data;
        }catch(err){
          lastErr=err;this.lastError={at:now(),message:String(err?.message||err)};
          if(err instanceof EngBookAIUnavailableError)throw err;
          if(err?.name==='AbortError')throw new EngBookAIUnavailableError('EngBook AI request timed out.');
          const retryable=SAFE_RETRY_STATUS.has(Number(err?.status));
          if(!retryable||attempt===attempts-1)break;
          await new Promise(r=>setTimeout(r,250*(attempt+1)));
        }finally{if(timer)clearTimeout(timer);}
      }
      throw new EngBookAIUnavailableError(`EngBook AI request failed: ${lastErr?.message||lastErr||'unknown error'}`);
    }
    async ping(){
      if(!this.isConfigured())return {ok:false,status:'not-connected'};
      try{
        const data=await this.request('/health',{}, {method:'GET',timeoutMs:5000});
        this.lastHealth={at:now(),ok:true,version:data?.version||null};
        return {ok:true,...data};
      }catch(err){this.lastHealth={at:now(),ok:false};return {ok:false,error:err.message};}
    }
    async analyzeScene(payload){
      assertObject(payload,'analyzeScene payload');
      const data=assertObject(await this.request('/v1/scene/analyze',payload),'analyzeScene response');
      assertArray(data.anchors,'anchors');
      if(data.inferences!==undefined)assertArray(data.inferences,'inferences');
      if(data.guardrails!==undefined)assertArray(data.guardrails,'guardrails');
      return data;
    }
    async evaluateTranscript(payload){
      assertObject(payload,'evaluateTranscript payload');
      const data=assertObject(await this.request('/v1/language/evaluate',payload),'evaluateTranscript response');
      if(typeof data.coverage!=='number')throw new EngBookAIProtocolError('coverage must be numeric.');
      if(data.claims!==undefined)assertArray(data.claims,'claims');
      return data;
    }
    async conversationTurn(payload){
      assertObject(payload,'conversationTurn payload');
      const data=assertObject(await this.request('/v1/conversation/turn',payload),'conversationTurn response');
      if(typeof data.reply!=='string')throw new EngBookAIProtocolError('reply must be a string.');
      return data;
    }
    async transcribe(payload){
      assertObject(payload,'transcribe payload');
      const data=assertObject(await this.request('/v1/speech/transcribe',payload),'transcribe response');
      if(typeof data.text!=='string')throw new EngBookAIProtocolError('text must be a string.');
      return data;
    }
  }

  const initial=root.ENGBOOK_AI_CONFIG&&typeof root.ENGBOOK_AI_CONFIG==='object'?root.ENGBOOK_AI_CONFIG:{};
  root.EngBookAIAdapter=EngBookAIAdapter;
  root.EngBookAIUnavailableError=EngBookAIUnavailableError;
  root.EngBookAIProtocolError=EngBookAIProtocolError;
  root.EngBookAI=new EngBookAIAdapter(initial);
})(typeof window!=='undefined'?window:globalThis);
