/* Audio descriptions reuse lesson evidence; no new image facts are generated. */
(function(root){
  'use strict';
  const levels=['A1','A2','B1','B2','C1'];
  const clean=s=>typeof s==='string'?s.replace(/\s+/g,' ').trim():'';
  const escapeRE=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const conversational=s=>clean(s).replace(/\b[Ii] am\b/g,"I'm").replace(/\b[Ii] cannot\b/g,"I can't").replace(/\b[Tt]here is\b/g,"There's").replace(/\b[Dd]o not\b/g,"Don't").replace(/\b[Cc]annot\b/g,"can't");
  const parent=h=>h?.presentation?.parentId??h?.parentId;
  const kind=text=>/\b(maybe|perhaps|might|may|could|possibly|probably)\b/i.test(text)?'possibility':/\b(seems?|appears?)\b|\blooks? (like|about|relaxed|tired|happy|sad|calm|worried|young|old)\b|\byoung\b|\belderly\b|\bmiddle-aged\b|\b\d{1,3} years old\b/i.test(text)?'appearance':'observation';
  const roles=/\b(the|a|an) (doctor|nurse|teacher|student|traveler|traveller|tourist|customer|worker|chef|pilot|waiter|waitress|patient|parent|mother|father|daughter|son)([’']s)?\b/gi;
  function safeText(text,h){
    // A pictured uniform, bag or relationship does not verify an identity.
    if(h?.identityVerified!==true)text=text.replace(roles,(_,article,role,possessive)=>`${article.replace(/n$/i,'')} person${possessive?"'s":''}`);
    if(h?.ageVerified!==true)text=text.replace(/\byoung (man|woman|person|adult|boy|girl|child)\b/gi,'young-looking $1').replace(/\belderly (man|woman|person|adult)\b/gi,'older-looking $1').replace(/\b(am|is|are) (?:about )?(\d{1,3}) years old\b/gi,(_,verb,age)=>`${verb.toLowerCase()==='is'?'looks':'look'} about ${age} years old`);
    return clean(text);
  }
  function aliases(person,people){
    const title=clean(person.en).replace(/^(?:the|a|an) /i,'');
    const names=people.filter(p=>clean(p.en).replace(/^(?:the|a|an) /i,'').toLowerCase()===title.toLowerCase()).length===1?[title]:[];
    const subject=p=>clean(p.example).match(/^(?:The|A|An|One) (.+?) (?:is|has|wears|holds|stands|sits|carries|looks|walks|faces|extends|leans|uses|keeps)\b/i)?.[1];
    const exact=subject(person);
    if(exact&&(exact.toLowerCase()!==title.toLowerCase()||names.includes(title))&&people.filter(p=>subject(p)?.toLowerCase()===exact.toLowerCase()).length===1)names.push(exact);
    for(const noun of ['man','woman','boy','girl','person']){
      if(new RegExp(`\\b${noun}\\b`,'i').test(title)&&people.filter(p=>new RegExp(`\\b${noun}\\b`,'i').test(p.en)).length===1)names.push(noun);
    }
    return [...new Set(names)].sort((a,b)=>b.length-a.length);
  }
  function firstPerson(text,person,people,profile){
    if(!person)return text;
    // Rewrite only a complete, unambiguous subject. Other people's descriptions stay intact.
    for(const name of [...new Set([...aliases(person,people),...(profile?.selfReferences||[])])].sort((a,b)=>b.length-a.length)){
      if(/\b(doctor|nurse|teacher|student|parent|mother|father|patient)\b/i.test(name))continue;
      const subject=`(?:The|A|An|One) ${escapeRE(name)}`;
      text=text.replace(new RegExp(`\\b(?:the|a|an) ${escapeRE(name)}[’']s\\b`,'gi'),'my');
      text=text.replace(new RegExp(`^${subject}[’']s\\s+`,'i'),'My ');
      const verbs={is:'am',has:'have',wears:'wear',holds:'hold',stands:'stand',sits:'sit',carries:'carry',looks:'look',walks:'walk',faces:'face',extends:'extend',leans:'lean',uses:'use',keeps:'keep'};
      let changed=false;
      for(const [from,to] of Object.entries(verbs))text=text.replace(new RegExp(`^${subject} ${from}\\b`,'i'),()=>{changed=true;return `I ${to}`;});
      if(changed){
        // Coordinated verbs share this subject only before a new subordinate clause.
        const boundary=text.search(/[.!?;]|\b(?:while|when|where|because|although|who|which|that|as)\b/i),end=boundary<0?text.length:boundary;
        let clause=text.slice(0,end);
        for(const [from,to] of Object.entries(verbs))clause=clause.replace(new RegExp(`\\b(and|but|or) ${from}\\b`,'gi'),`$1 ${to}`);
        text=clause+text.slice(end);
      }
    }
    if(profile){
      for(const noun of [...(profile.selfPossessions||[])].sort((a,b)=>b.length-a.length))text=text.replace(new RegExp('\\b(?:the|a|an) '+escapeRE(noun)+'\\b','gi'),'my '+noun);
      text=text.replace(/^(He|She)\b/i,'I').replace(/^(His|Her)\b/i,'My');
      const verbs={is:'am',has:'have',wears:'wear',holds:'hold',stands:'stand',sits:'sit',looks:'look',smiles:'smile',kneels:'kneel',turns:'turn'};
      for(const [from,to]of Object.entries(verbs))text=text.replace(new RegExp('^I '+from+'\\b','i'),'I '+to);
      // Reviewed character aliases may follow a position phrase; other people stay named.
      for(const name of profile.selfReferences||[])for(const [from,to]of Object.entries(verbs))text=text.replace(new RegExp('(^|[,;] )(?:(?:the|a|an) )'+escapeRE(name)+' '+from+'\\b','gi'),(_,lead)=>lead+'I '+to);
      text=text.replace(/^my\b/,'My');
    }
    return text.replace(/^my\b/,'My');
  }
  function descriptions(primary,extra){
    const plain=s=>clean(s).replace(/[.!?]+$/,'').toLowerCase();
    const a=plain(primary),b=plain(extra);
    if(!extra||a===b||a.startsWith(b+' '))return [primary];
    if(b.startsWith(a+' '))return [extra];
    return [primary,extra];
  }
  function build(pack,requested='A2'){
    const level=levels.includes(requested)?requested:'A2',g=pack?.content||{},hotspots=pack?.hotspots||[],byId=new Map(hotspots.map(h=>[h.id,h]));
    const people=hotspots.filter(h=>h.type==='person'),owners=new Map();
    function owner(h){
      const visited=new Set();
      while(h&&!visited.has(h.id)){visited.add(h.id);if(h.type==='person')return h.id;h=byId.get(parent(h));}
      return null;
    }
    for(const h of hotspots)owners.set(h.id,owner(h));
    const sections=[],missing=[];
    const add=(id,title,speaker,rows,profile)=>{if(rows.length)sections.push({id,title,speaker,perspective:speaker==='guide'?'guide':'character',voiceRole:profile?.voiceRole||(speaker==='guide'?'female':'male'),voiceKey:`${pack.lessonId||pack.id}/${speaker}`,pitch:profile?.pitch||1,segments:rows});};
    const overview=g.hotspotLanguage?.overviewByLevel?.[level]||g.pictureOverviewLevels?.[level]||g.overview;
    if(clean(overview))add('overview','The whole scene','guide',[{id:'overview',text:conversational(safeText(overview)),sourceText:clean(overview),claimClass:kind(overview),hotspotIds:[],levelReviewed:Boolean(g.hotspotLanguage?.overviewByLevel?.[level]||g.pictureOverviewLevels?.[level])}]);
    function segment(h,person){
      const authored=g.hotspotLanguage?.hotspotsById?.[h.id],variant=authored?.reviewed===true?authored.levels?.[level]:null;
      const primary=clean(variant?.description||h.example),extra=g.listening?.levelPolicy==='reviewed-only'&&variant?'':clean(h.example);
      const source=primary+(extra&&extra!==primary?' '+extra:'');
      if(!source){missing.push(h.id);return null;}
      let text=descriptions(primary,extra).map(s=>conversational(safeText(firstPerson(s,person,people,person&&g.listening?.characters?.[person.id]),h))).join(' ');
      const claim= h.claimClass==='supported-inference'?'possibility':h.claimClass&&h.claimClass!=='visible-fact'?'boundary':kind(text);
      if(claim==='appearance'&&!/\b(look|seem|appear)/i.test(text))text=`From the picture, ${/^I(?:\b|')/.test(text)?text:text[0].toLowerCase()+text.slice(1)}`;
      return {id:h.id,title:h.en,text,sourceText:source,claimClass:claim,hotspotIds:[h.id],levelReviewed:Boolean(variant)&&(!extra||extra===primary),anchorIndex:hotspots.indexOf(h)};
    }
    for(const person of people){
      const rows=hotspots.filter(h=>owners.get(h.id)===person.id).map(h=>segment(h,person)).filter(Boolean);
      const profile=g.listening?.characters?.[person.id],intro=profile?.introductionsByLevel?.[level];
      if(rows.length){
        const refs=intro?.evidenceHotspotIds||[],valid=intro?.text&&refs.length&&refs.every(id=>owners.get(id)===person.id);
        rows[0]={...rows[0],text:valid?conversational(intro.text):`Let me show you where I am in the picture. ${rows[0].text}`,...(valid?{evidenceHotspotIds:refs,sourceText:refs.map(id=>g.hotspotLanguage?.hotspotsById?.[id]?.levels?.[level]?.description||byId.get(id).example).join(' ')}:{})};
      }
      add(person.id,person.en,person.id,rows,profile);
    }
    // Keep the authored order within each environment branch; cover each anchor exactly once.
    const parentOf=parent;
    const environment=hotspots.filter(h=>!owners.get(h.id)),groups=new Map();
    for(const h of environment){
      let parent=h;const visited=new Set();
      while(byId.has(parentOf(parent))&&!visited.has(parent.id)){visited.add(parent.id);parent=byId.get(parentOf(parent));}
      const key=parent.id;if(!groups.has(key))groups.set(key,{title:parent.en,rows:[]});
      const row=segment(h);if(row)groups.get(key).rows.push(row);
    }
    for(const [id,group] of groups)add(`environment-${id}`,group.title,'guide',group.rows);
    const boundary=level==='A1'||level==='A2'?"We can see clothes, things and places. We can't know someone's exact age, job or feelings just from a picture.":"Visible details can support a guess, but they don't confirm someone's exact age, identity, job, relationships or private feelings.";
    add('check','Facts and guesses','guide',[
      {id:'check-observation',text:"Here's a detail we can check in the picture. "+(conversational(safeText(sections.flatMap(s=>s.segments).find(s=>s.claimClass==='observation'&&s.hotspotIds.length)?.sourceText||''))||'Look at the visible objects.'),claimClass:'observation',hotspotIds:[]},
      {id:'check-appearance',text:"Here's a practice example: This person looks relaxed. That's an impression, not a fact about how someone feels inside.",claimClass:'appearance',hotspotIds:[],practiceOnly:true},
      {id:'check-possibility',text:"Maybe this place reminds you of somewhere you know. That's a possibility, not something we know about you.",claimClass:'possibility',hotspotIds:[],practiceOnly:true},
      {id:'check-boundary',text:boundary,claimClass:'boundary',hotspotIds:[]}
    ]);
    const all=sections.flatMap(s=>s.segments),questions=[];
    for(const section of sections.filter(s=>!['overview','check'].includes(s.id))){
      const row=section.segments.find(s=>s.claimClass==='observation')||section.segments[0];
      questions.push({id:`detail-${section.id}`,type:'recall',prompt:`What did you hear about ${section.title}? Say one detail before checking.`,answer:row.text,sectionId:section.id,hotspotIds:row.hotspotIds});
    }
    const prompts={'check-observation':all.find(s=>s.claimClass==='observation'&&s.hotspotIds.length)?.text||'Visible objects are shown in the picture.','check-appearance':'Practice sentence: This person looks relaxed.','check-possibility':'Practice sentence: Maybe this place reminds you of somewhere you know.'};
    for(const [id,answer] of [['check-observation','observation'],['check-appearance','appearance'],['check-possibility','possibility']])questions.push({id:`class-${id}`,type:'classification',prompt:prompts[id],practiceOnly:id!=='check-observation',answer,options:['observation','appearance','possibility'],sectionId:'check'});
    questions.push({id:'unknown',type:'recall',prompt:"Can the picture confirm someone's exact age, job or private feelings?",answer:boundary,sectionId:'check'});
    return {schemaVersion:1,lessonId:pack?.lessonId||pack?.id,level,mode:'audio-only',voiceNotice:'Scripted practice voices based on lesson descriptions. These are not recordings of the pictured people.',coverage:{total:hotspots.length,covered:all.filter(s=>s.hotspotIds.length).length,missing},levelCoverage:{reviewed:all.filter(s=>s.hotspotIds.length&&s.levelReviewed).length,shared:all.filter(s=>s.hotspotIds.length&&!s.levelReviewed).length},sections,questions};
  }
  const api=Object.freeze({build,conversational,firstPerson,kind});
  root.EngBookLessonListening=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
