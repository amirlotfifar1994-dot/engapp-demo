(function(){
  'use strict';
  const $=s=>document.querySelector(s),msg=$('#authMessage'),tabs=$('#authTabs'),login=$('#loginForm'),register=$('#registerForm'),sessionBox=$('#sessionBox');
  const safeReturn=()=>{const raw=new URLSearchParams(location.search).get('return')||'./';try{const u=new URL(raw,location.origin);return u.origin===location.origin?u.pathname+u.search+u.hash:'./';}catch(_){return './';}};
  function setMessage(text,type=''){msg.textContent=text||'';msg.className=`message ${type}`;}
  function show(tab){const isLogin=tab==='login';login.hidden=!isLogin;register.hidden=isLogin;tabs.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));setMessage('');}
  tabs.addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(b)show(b.dataset.tab);});
  async function current(){
    try{const s=await EngBookBackend.request('/auth/session');if(s.authenticated){let plan=s.user.plan||'free';try{const ent=await EngBookBackend.entitlements();plan=ent?.plan||plan;}catch(_){}tabs.hidden=true;login.hidden=true;register.hidden=true;sessionBox.hidden=false;sessionBox.innerHTML=`<b>${escapeHtml(s.user.displayName||s.user.email)}</b><span>${escapeHtml(s.user.email)} · ${escapeHtml(String(plan||'free').toUpperCase())}</span><div><a class="primary-link" href="${encodeURI(safeReturn())}">Back to EngBook</a><button id="logoutBtn" type="button">Sign out</button></div>`;$('#logoutBtn').onclick=async()=>{await EngBookBackend.logout();location.reload();};}}
    catch(_){setMessage('Server is unavailable. Guest mode is still available.','error');}
  }
  function escapeHtml(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  async function submit(form,mode){
    const button=form.querySelector('button[type=submit]');button.disabled=true;setMessage(mode==='login'?'Signing in…':'Creating account…');
    try{const fd=new FormData(form),payload=Object.fromEntries(fd.entries());if(mode==='login')await EngBookBackend.login(payload);else await EngBookBackend.register(payload);location.href=safeReturn();}
    catch(e){setMessage(e?.message||'Could not complete this request.','error');button.disabled=false;}
  }
  login.addEventListener('submit',e=>{e.preventDefault();submit(login,'login');});
  register.addEventListener('submit',e=>{e.preventDefault();submit(register,'register');});
  current();
})();
