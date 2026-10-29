(()=>{'use strict';
const $=id=>document.getElementById(id),status=$('status'),step=$('step');
const api=async(path,opt={})=>{const r=await fetch(path,{credentials:'same-origin',...opt,headers:{'content-type':'application/json',...(opt.headers||{})}}),x=await r.json().catch(()=>({}));if(!r.ok)throw Object.assign(new Error(x.message||x.code||`HTTP ${r.status}`),{status:r.status,data:x});return x};
const code=()=>String($('code').value||'').toUpperCase().replace(/[^A-Z2-9]/g,'');
const message=(v,bad=false)=>{status.textContent=v;status.classList.toggle('danger',bad)};
async function check(){try{const x=await api('/api/v1/admin/session',{method:'GET'});if(!x.authorized)throw Object.assign(new Error('This account has no admin role.'),{status:403});step.classList.toggle('hidden',Boolean(x.stepUp));message(x.stepUp?'Admin session verified. You can approve the code.':'Admin role verified. Complete password + MFA step-up first.');return x}catch(e){step.classList.remove('hidden');message(e.status===401?'Sign in to EngApp in this browser first, then return to this page.':e.message,true);return null}}
$('check').onclick=check;
$('stepup').onclick=async()=>{try{await api('/api/v1/admin/step-up',{method:'POST',body:JSON.stringify({password:$('password').value,mfaCode:$('mfa').value,recoveryCode:$('recovery').value})});$('password').value='';$('mfa').value='';$('recovery').value='';await check()}catch(e){message(e.message,true)}};
$('approve').onclick=async()=>{const c=code();if(c.length!==8)return message('Enter the full 8-character code.',true);try{const x=await api('/api/v1/admin/device/approve',{method:'POST',body:JSON.stringify({userCode:c})});message(`Approved ${x.deviceLabel||'Admin Studio'}. You may return to Admin Studio.`);$('approve').disabled=true;$('deny').disabled=true}catch(e){message(e.message,true)}};
$('deny').onclick=async()=>{const c=code();if(c.length!==8)return message('Enter the full 8-character code.',true);try{await api('/api/v1/admin/device/deny',{method:'POST',body:JSON.stringify({userCode:c})});message('Request denied.');$('approve').disabled=true;$('deny').disabled=true}catch(e){message(e.message,true)}};
const q=new URLSearchParams(location.search).get('code');if(q)$('code').value=q.toUpperCase();check();
})();
