/* EngBook Source Event Router v0.52
   Executes inert data-event contracts emitted by the legacy renderer.
   No dynamic code generation is used. Only an explicit allow-list of EngBook actions,
   narrow state/progress assignments, and browser-safe event primitives are
   supported. This allows `script-src 'self'` CSP without DOM0 handlers.
*/
(function(root){
  'use strict';
  const VERSION='0.52';
  const EVENTS=['click','input','change','dragover','drop'];
  const ATTR=e=>`data-eng-v52-${e}`;
  const ALLOWED=new Set(`answerFact askReconstructionClarification buildTimelineRelay builderPick builderReset builderUndo cameraFinish cameraGoStage cameraResetRun cameraSetAnswer cameraSetTrack cameraStartVoice cameraSubmitStage cameraToggleMemory cameraToggleReview cameraZoomOut cantSpeakNow checkBuilder chooseTimelineBranch clearTapTalkContext closeOnboarding commercialFinishOnboarding commercialPingAI cycleScanMode finishGrammarLab finishReconstruction finishTimeline fpOpenMission fpSelect fpSnapshot goHome grammarMarkDone grammarPulse handleStageTap highlightEvidenceSupport hotspotClick initBuilder insertLevelPhrase levelClear levelPromote levelSetAnswer levelSetBand levelStartVoice levelSubmit levelToggleModel l01SetHotspotCategory setAdaptiveHotspotCategory setL03JourneyStep l03AnswerFact l03NextFact v73OpenWordCard setL04JourneyStep l04AnswerFact l04NextFact v75OpenWordCard setL05JourneyStep l05AnswerFact l05NextFact v77OpenWordCard levelToggleSupport levelToggleTimer markComplete markPronUse nextBuilder nextConversation nextFact nextOnboarding openLesson openRecommended ownCaptureDescription ownCheckEvidence ownDrop ownEditAnchor ownEditCurrent ownExportPack ownHandleFileInput ownImportClick ownImportPack ownNewScene ownOpenScene ownResetTalk ownSaveScene ownSelectAnchor ownSetGrammarAnchor ownSetGrammarPrep ownSetGuardrailText ownSetInferenceText ownSetMeta ownSetSubmode ownSetTranscript ownStageClick ownStartSpeech ownStopSpeech ownSubmitTalk ownUseDemo playCoachPrompt playTimelineGrammar playTimelineSequence prepareSpeaking prevOnboarding productCloseMore productGo productNextStage productOpenCoach productOpenLearn productOpenMore productOpenProfile productOpenSpeak productStartSession productStopSession pronounceHear repairGrammarRelationship repairTimeline repairVisual resetConversation resetPhotoZoom resetPractice resetReconstruction resetTimeline resetTimer retryCurrentTurn saveEvidenceRepair saveLine saveProgress saveTimelineRelay selectEvidenceClaim sendReconstructionText setConversationMission setConversationMode setGrammarAction setGrammarLens setGrammarRelation setGrammarSecond setGrammarSpatial setLearnSection setMode setPhotoZoom setPractice setPronMode setRoleShift setTimelinePhase setWordDepth showOnboarding speak startBlindDescribe startConversationRecognition startPronRecognition startReconstruction stopBlindDescribe submitConversation tapTalkStart toggleCoverageOverlay toggleCoverageReview toggleEvidenceLive toggleEvidenceShowAll toggleGrammarSpeech toggleHandsFree toggleHints toggleOutline togglePhotoFocus toggleRecognition toggleReconstructionPhoto toggleReconstructionRecognition launchTimedVoiceChallenge startTimedVoiceChallenge stopTimedVoiceChallenge replaySpeakingRecording deleteSpeakingRecording toggleRecording toggleSaved toggleHotspotMark toggleHotspotHighlight togglePersonalContentMark togglePersonalContentHighlight toggleScenarioMark toggleScenarioHighlight showMarkedHotspots reviewLessonMarks openMyMarksLibrary closeMyMarksLibrary setMyMarksFilter libraryToggleMark libraryToggleHighlight libraryRemoveItem openPersonalMark toggleTimelineVoice toggleTimer updateTimelineText v21ApplyUpdate v21ExportDiagnostics v21RecoverUI v21ResetUIOnly v22CloseDataPrivacy v22DeleteAllLocalData v22DeleteScenes v22ExportUserData v22ImportUserData v22OpenDataPrivacy v22ResetProgress v22RestoreImportBackup v22SetPrivacy v27LaunchAction v27LaunchMission v27OpenLesson v27SetSupport v31CloseAccount v31ExplainSignIn v31OpenAccount v31RequestCloudDeletion v31SetPermission v31SignOut v31SyncNow v32CloseDeviceCheck v32OpenDeviceCheck v32RefreshDeviceCheck v32RunMicrophoneTest v33ActivateCategory v33CloseCourseMap v33OpenCourseMap v33ShowCategory v34CloseLessonBrowser v34OpenFromBrowser v34OpenLessonBrowser v35CloseDetailLayer v55SetDetailGroup v60CloseGrammarBox v60OpenGrammarBox v60OpenHotspotCard v60SelectAnchor v60TapAnchor v96ScrollToActivity v96ScrollToScene v97AdvanceExperience v97CloseCard v97GuideNextAnchor v97NextSceneCategory v97TogglePronunciation v69OpenWordCard v82OpenUserPanel v82CloseUserPanel v82SetPanelTab v82ToggleLessonBookmark v82SetDraftNote v82SetNoteLesson v82SaveNote v82DeleteNote v82OpenLesson v82OpenPaywall v82ClosePaywall v82OpenAccount v82OpenAccountPage v82StartAuth v82RefreshPlan v82StartSubscription v82OpenBilling v82ShowUnlocks v82UnlockPack v82RefreshUnlocks v82RestorePurchases v84OpenUserPanel v84CloseUserPanel v84SetPanelTab v84SetPathQuery v84SetPathCategory v84SetPathStatus v84ResetPathFilters v84SetStoreCategory v84SetStoreFilter v84ToggleLessonBookmark v84SetDraftNote v84SetNoteLesson v84SaveNote v84EditNote v84CancelNoteEdit v84DeleteNote v84OpenMarksLibrary v84SignOut v84SyncNow v84OpenLesson v84OpenPaywall v84ClosePaywall v84OpenAccount v84OpenAccountPage v84StartAuth v84RefreshPlan v84StartSubscription v84OpenBilling v84ShowUnlocks v84UnlockPack v84RefreshUnlocks v84RestorePurchases render`.split(/\s+/));
  const FILE_INPUT_IDS=new Set(['ownReplaceFile','ownSceneFile']);
  const stats={events:0,executed:0,failed:0,blocked:0,byEvent:Object.fromEntries(EVENTS.map(e=>[e,0])),lastError:null};

  function splitTop(s,sep){
    const out=[];let start=0,quote='',esc=false,p=0,b=0,c=0;
    for(let i=0;i<s.length;i++){
      const ch=s[i];
      if(quote){if(esc){esc=false;continue;}if(ch==='\\'){esc=true;continue;}if(ch===quote)quote='';continue;}
      if(ch==='"'||ch==="'"){quote=ch;continue;}
      if(ch==='(')p++;else if(ch===')')p--;else if(ch==='[')b++;else if(ch===']')b--;else if(ch==='{')c++;else if(ch==='}')c--;
      if(ch===sep&&p===0&&b===0&&c===0){out.push(s.slice(start,i).trim());start=i+1;}
    }
    out.push(s.slice(start).trim());return out.filter(Boolean);
  }
  function findTop(s,op){
    let quote='',esc=false,p=0,b=0,c=0;
    for(let i=0;i<=s.length-op.length;i++){
      const ch=s[i];
      if(quote){if(esc){esc=false;continue;}if(ch==='\\'){esc=true;continue;}if(ch===quote)quote='';continue;}
      if(ch==='"'||ch==="'"){quote=ch;continue;}
      if(ch==='(')p++;else if(ch===')')p--;else if(ch==='[')b++;else if(ch===']')b--;else if(ch==='{')c++;else if(ch==='}')c--;
      if(p===0&&b===0&&c===0&&s.startsWith(op,i))return i;
    }
    return -1;
  }
  function unquote(s){
    const q=s[0];let out='';
    for(let i=1;i<s.length-1;i++){
      let ch=s[i];if(ch!=='\\'){out+=ch;continue;}
      const n=s[++i];const map={n:'\n',r:'\r',t:'\t',b:'\b',f:'\f',v:'\v','0':'\0'};out+=Object.prototype.hasOwnProperty.call(map,n)?map[n]:n;
    }return out;
  }
  function ctxRoot(name){
    const bridge=root.EngBookEventContext;
    if(name==='state'||name==='progress'||name==='TIME_MACHINE_NOW')return bridge?.getRoot?.(name);
    if(name==='event'||name==='this')return undefined;
    return root[name];
  }
  function parsePath(s,ctx){
    s=s.trim();
    if(s==='this')return {ok:true,value:ctx.el,parent:null,key:null};if(s==='event')return {ok:true,value:ctx.event,parent:null,key:null};
    let m=s.match(/^([A-Za-z_$][\w$]*)/);if(!m)return {ok:false};
    let value=ctxRoot(m[1]),i=m[0].length,parent=null,key=null;
    if(value===undefined)return {ok:false};
    while(i<s.length){
      if(s[i]==='.'){
        const mm=s.slice(i+1).match(/^([A-Za-z_$][\w$]*)/);if(!mm)return {ok:false};parent=value;key=mm[1];value=value?.[key];i+=1+mm[1].length;
      }else if(s[i]==='['){
        let j=i+1,depth=1,quote='',esc=false;
        for(;j<s.length;j++){const ch=s[j];if(quote){if(esc){esc=false;continue;}if(ch==='\\'){esc=true;continue;}if(ch===quote)quote='';continue;}if(ch==='"'||ch==="'"){quote=ch;continue;}if(ch==='[')depth++;else if(ch===']'&&!--depth)break;}
        if(depth)return {ok:false};const k=evalExpr(s.slice(i+1,j),ctx);parent=value;key=k;value=value?.[k];i=j+1;
      }else return {ok:false};
    }
    return {ok:true,value,parent,key};
  }
  function evalExpr(raw,ctx){
    let s=raw.trim();if(!s)return undefined;
    if(s[0]==='('&&s[s.length-1]===')')return evalExpr(s.slice(1,-1),ctx);
    const qi=findTop(s,'?');if(qi>=0){
      // Locate the matching top-level colon after the question mark.
      let tail=s.slice(qi+1),depth=0,quote='',esc=false,ci=-1;
      for(let i=0;i<tail.length;i++){const ch=tail[i];if(quote){if(esc){esc=false;continue;}if(ch==='\\'){esc=true;continue;}if(ch===quote)quote='';continue;}if(ch==='"'||ch==="'"){quote=ch;continue;}if(ch==='?' )depth++;else if(ch===':'&&depth===0){ci=i;break;}else if(ch===':'&&depth>0)depth--;}
      if(ci>=0)return evalExpr(s.slice(0,qi),ctx)?evalExpr(tail.slice(0,ci),ctx):evalExpr(tail.slice(ci+1),ctx);
    }
    for(const op of ['||','&&','===','!==']){const i=findTop(s,op);if(i>=0){const a=evalExpr(s.slice(0,i),ctx);if(op==='||')return a||evalExpr(s.slice(i+2),ctx);if(op==='&&')return a&&evalExpr(s.slice(i+2),ctx);const b=evalExpr(s.slice(i+op.length),ctx);return op==='==='?a===b:a!==b;}}
    if(s.startsWith('!'))return !evalExpr(s.slice(1),ctx);
    if((s[0]==="'"&&s.at(-1)==="'")||(s[0]==='"'&&s.at(-1)==='"'))return unquote(s);
    if(/^[-+]?(?:\d+\.?\d*|\.\d+)$/.test(s))return Number(s);
    if(s==='true')return true;if(s==='false')return false;if(s==='null')return null;if(s==='undefined')return undefined;
    if(s==='[]')return [];
    if(s[0]==='['&&s.at(-1)===']')return splitTop(s.slice(1,-1),',').map(x=>evalExpr(x,ctx));
    if(s==='this.value')return ctx.el?.value;if(s==='this.checked')return Boolean(ctx.el?.checked);
    const p=parsePath(s,ctx);if(p.ok)return p.value;
    throw new Error(`unsupported expression: ${s}`);
  }
  function setRef(lhs,value,ctx){
    const p=parsePath(lhs,ctx);if(!p.ok||!p.parent||p.key===null)throw new Error(`unsupported assignment target: ${lhs}`);p.parent[p.key]=value;return value;
  }
  function parseArgs(s,ctx){return s.trim()?splitTop(s,',').map(x=>evalExpr(x,ctx)):[];}
  function callAllowed(name,args,ctx){
    if(!ALLOWED.has(name)){stats.blocked++;throw new Error(`blocked action: ${name}`);}
    const fn=root[name];if(typeof fn!=='function')throw new Error(`missing action: ${name}`);
    return fn.apply(ctx.el,args);
  }
  function runStatement(stmt,ctx){
    stmt=stmt.trim();if(!stmt)return;
    if(stmt==='event.stopPropagation()'){ctx.event.stopPropagation();return;}
    if(stmt==='event.preventDefault()'){ctx.event.preventDefault();return;}
    let m=stmt.match(/^if\(event\.target===this\)([A-Za-z_$][\w$]*)\((.*)\)$/s);
    if(m){if(ctx.event.target===ctx.el)return callAllowed(m[1],parseArgs(m[2],ctx),ctx);return;}
    m=stmt.match(/^document\.getElementById\((['"])([^'"]+)\1\)\.click\(\)$/);
    if(m){if(!FILE_INPUT_IDS.has(m[2]))throw new Error(`blocked element click: ${m[2]}`);document.getElementById(m[2])?.click();return;}
    m=stmt.match(/^this\.parentElement\.remove\(\)$/);if(m){ctx.el.parentElement?.remove();return;}
    m=stmt.match(/^setTimeout\(\(\)=>\{([\s\S]*)\},\s*(\d+)\)$/);
    if(m){const body=m[1],ms=Number(m[2]);root.setTimeout(()=>execute(body,ctx.event,ctx.el),ms);return;}
    m=stmt.match(/^setTimeout\(\(\)=>([\s\S]+),\s*(\d+)\)$/);
    if(m){const body=m[1],ms=Number(m[2]);root.setTimeout(()=>execute(body,ctx.event,ctx.el),ms);return;}
    // Single assignment. `=` inside call args/strings is ignored by the top-level scan.
    const eq=findTop(stmt,'=');
    if(eq>=0&&!stmt.startsWith('if(')){
      const before=stmt.slice(Math.max(0,eq-1),eq+3);
      if(!before.includes('===')&&!before.includes('!=='))return setRef(stmt.slice(0,eq),evalExpr(stmt.slice(eq+1),ctx),ctx);
    }
    m=stmt.match(/^([A-Za-z_$][\w$]*)\((.*)\)$/s);
    if(m)return callAllowed(m[1],parseArgs(m[2],ctx),ctx);
    throw new Error(`unsupported statement: ${stmt}`);
  }

  function validateStatement(stmt,ctx){
    stmt=stmt.trim();if(!stmt)return;
    if(stmt==='event.stopPropagation()'||stmt==='event.preventDefault()'||stmt==='this.parentElement.remove()')return;
    let m=stmt.match(/^if\(event\.target===this\)([A-Za-z_$][\w$]*)\((.*)\)$/s);
    if(m){if(!ALLOWED.has(m[1]))throw new Error(`blocked action: ${m[1]}`);parseArgs(m[2],ctx);return;}
    m=stmt.match(/^document\.getElementById\((['"])([^'"]+)\1\)\.click\(\)$/);
    if(m){if(!FILE_INPUT_IDS.has(m[2]))throw new Error(`blocked element click: ${m[2]}`);return;}
    m=stmt.match(/^setTimeout\(\(\)=>\{([\s\S]*)\},\s*(\d+)\)$/);
    if(m){for(const part of splitTop(m[1],';'))validateStatement(part,ctx);return;}
    m=stmt.match(/^setTimeout\(\(\)=>([\s\S]+),\s*(\d+)\)$/);
    if(m){for(const part of splitTop(m[1],';'))validateStatement(part,ctx);return;}
    const eq=findTop(stmt,'=');
    if(eq>=0&&!stmt.startsWith('if(')){
      const before=stmt.slice(Math.max(0,eq-1),eq+3);
      if(!before.includes('===')&&!before.includes('!==')){const ref=parsePath(stmt.slice(0,eq),ctx);if(!ref.ok||!ref.parent||ref.key===null)throw new Error(`unsupported assignment target: ${stmt.slice(0,eq)}`);evalExpr(stmt.slice(eq+1),ctx);return;}
    }
    m=stmt.match(/^([A-Za-z_$][\w$]*)\((.*)\)$/s);
    if(m){if(!ALLOWED.has(m[1]))throw new Error(`blocked action: ${m[1]}`);parseArgs(m[2],ctx);return;}
    throw new Error(`unsupported statement: ${stmt}`);
  }
  function validate(contract,el){
    const mock=el||{value:'',checked:false,parentElement:null};const ctx={event:{target:mock},el:mock};
    try{for(const stmt of splitTop(String(contract||''),';'))validateStatement(stmt,ctx);return {ok:true,error:null};}
    catch(err){return {ok:false,error:String(err?.message||err)};}
  }
  function execute(contract,event,el){
    const ctx={event,el};
    try{for(const stmt of splitTop(String(contract||''),';'))runStatement(stmt,ctx);stats.executed++;return true;}
    catch(err){stats.failed++;stats.lastError=String(err?.message||err);root.v21PushError?.(err,'v52-event-contract');console.error?.('[EngBook v0.52 event contract]',contract,err);return false;}
  }
  function targetFor(eventName,event){
    const sel=`[${ATTR(eventName)}]`;
    return event.target?.closest?.(sel)||null;
  }
  function onEvent(eventName,event){
    const el=targetFor(eventName,event);if(!el)return;
    stats.events++;stats.byEvent[eventName]++;
    const contract=el.getAttribute(ATTR(eventName));execute(contract,event,el);
  }
  for(const e of EVENTS)document.addEventListener(e,ev=>onEvent(e,ev),e==='dragover'||e==='drop'?false:false);
  function audit(scope=document){
    const sourceContracts=EVENTS.reduce((n,e)=>n+(scope.querySelectorAll?.(`[${ATTR(e)}]`).length||0),0);
    const activeInline=scope.querySelectorAll?.('[onclick],[oninput],[onchange],[ondragover],[ondrop]')?.length||0;
    return {version:VERSION,sourceContracts,activeInlineHandlers:activeInline,failed:stats.failed,blocked:stats.blocked,lastError:stats.lastError,byEvent:{...stats.byEvent}};
  }
  root.EngBookEventRouter=Object.freeze({version:VERSION,execute,validate,audit,stats:()=>({...stats,byEvent:{...stats.byEvent}}),allowedActions:Object.freeze([...ALLOWED])});
})(typeof window!=='undefined'?window:globalThis);
