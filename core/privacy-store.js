/* EngBook Privacy Store v0.88 — one privacy source for guest + authenticated sessions. */
(function(root){
  'use strict';
  const BUILD=root.ENGBOOK_BUILD_INFO||{},KEY=BUILD.storage?.privacyKey||'engbook_v87_privacy',LEGACY='engbook_v22_privacy';
  const defaults=()=>({productAnalytics:false,crashReports:false,cloudSync:false,remoteAI:false,includeCustomSceneImagesInExport:true,localDiagnostics:true,source:'local',revision:0});
  let sessionBound=false,serverRevision=0;
  function legacy(){try{const x=JSON.parse(root.localStorage?.getItem(LEGACY)||'{}')||{};return {remoteAI:x.allowRemoteAI===true,includeCustomSceneImagesInExport:x.includeCustomSceneImagesInExport!==false,localDiagnostics:x.localDiagnostics!==false};}catch(_){return {};}}
  function readLocal(){try{return {...defaults(),...legacy(),...(JSON.parse(root.localStorage?.getItem(KEY)||'{}')||{})};}catch(_){return {...defaults(),...legacy()};}}
  let state=readLocal();
  function persist(){try{root.localStorage?.setItem(KEY,JSON.stringify({...state,source:sessionBound?'server-cache':'local'}));root.localStorage?.setItem(LEGACY,JSON.stringify({allowRemoteAI:state.remoteAI===true,includeCustomSceneImagesInExport:state.includeCustomSceneImagesInExport!==false,localDiagnostics:state.localDiagnostics!==false}));}catch(_){}}
  function snapshot(){return Object.freeze({...state,authenticatedAuthority:sessionBound,revision:serverRevision});}
  function get(key){return snapshot()[key];}
  function setLocal(key,value){if(!Object.prototype.hasOwnProperty.call(defaults(),key))return snapshot();if(sessionBound&&['productAnalytics','crashReports','cloudSync','remoteAI'].includes(key))return snapshot();state={...state,[key]:Boolean(value),source:'local'};persist();return snapshot();}
  function adoptServer(p={}){sessionBound=true;serverRevision=Number(p.revision||0);state={...state,productAnalytics:p.productAnalytics===true,crashReports:p.crashReports===true,cloudSync:p.cloudSync===true,remoteAI:p.remoteAI===true,source:'server',revision:serverRevision};persist();try{root.dispatchEvent?.(new CustomEvent('engbook:privacy-changed',{detail:snapshot()}));}catch(_){}return snapshot();}
  function clearSession(){sessionBound=false;serverRevision=0;state={...readLocal(),source:'local',revision:0};return snapshot();}
  async function update(key,value){
    if(!['productAnalytics','crashReports','cloudSync','remoteAI'].includes(key))return setLocal(key,value);
    const api=root.EngBookBackend;if(sessionBound&&api?.updatePrivacy){const out=await api.updatePrivacy({[key]:Boolean(value)});return adoptServer(out);}
    return setLocal(key,value);
  }
  root.EngBookPrivacy=Object.freeze({version:'0.87',snapshot,get,setLocal,update,adoptServer,clearSession,isServerAuthoritative:()=>sessionBound});
})(typeof window!=='undefined'?window:globalThis);
