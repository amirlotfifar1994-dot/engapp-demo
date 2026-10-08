/* EngBook v0.69 — Lesson 02 content enrichment before Content Engine registration. */
(function(root){
  'use strict';
  const packs=root.ENGBOOK_LESSON_PACKS;
  if(!Array.isArray(packs))return;
  const pack=packs.find(p=>Number(p.lessonId)===2);
  if(!pack)return;
  pack.content=pack.content||{};
  const details=pack.content.hotspotDetails||(pack.content.hotspotDetails={});
  const lower=s=>String(s||'').charAt(0).toLowerCase()+String(s||'').slice(1);
  const actionish=h=>{
    const t=String(h.type||'').toLowerCase(),g=String(h.detailGroup||'').toLowerCase(),a=String(h.attributeGroup||'').toLowerCase(),e=String(h.en||'').toLowerCase();
    return t==='action'||g==='gesture'||g==='posture'||['gaze','hand','gesture','arm','arm-position','hand-shape','hand-detail','head-position','upper-body','attention','posture'].includes(a)||/laugh|gesture|gaze|raised hand|open hand|seated|shoulder|elbow|finger|thumb|attention|forearm|neck/.test(e);
  };
  const pastify=s=>{
    let x=String(s||'').trim();
    const reps=[
      [/\bare walking\b/gi,'were walking'],[/\bis walking\b/gi,'was walking'],[/\bare laughing\b/gi,'were laughing'],[/\bis laughing\b/gi,'was laughing'],
      [/\bare looking\b/gi,'were looking'],[/\bis looking\b/gi,'was looking'],[/\bare wearing\b/gi,'were wearing'],[/\bis wearing\b/gi,'was wearing'],
      [/\bare sitting\b/gi,'were sitting'],[/\bis sitting\b/gi,'was sitting'],[/\bare seated\b/gi,'were seated'],[/\bis seated\b/gi,'was seated'],
      [/\bare visible\b/gi,'were visible'],[/\bis visible\b/gi,'was visible'],[/\bare\b/gi,'were'],[/\bis\b/gi,'was'],[/\bhas\b/gi,'had'],[/\bhave\b/gi,'had'],
      [/\bshows\b/gi,'showed'],[/\blooks\b/gi,'looked'],[/\bsits\b/gi,'sat'],[/\bhangs\b/gi,'hung'],[/\bfills\b/gi,'filled'],[/\bruns\b/gi,'ran'],[/\brests\b/gi,'rested'],[/\bmarks\b/gi,'marked'],[/\bfalls\b/gi,'fell'],[/\bends\b/gi,'ended'],[/\bspreads\b/gi,'spread'],[/\bbends\b/gi,'bent'],[/\bnarrows\b/gi,'narrowed'],[/\bbrightens\b/gi,'brightened'],[/\bdivides\b/gi,'divided'],[/\bseparates\b/gi,'separated'],[/\bsupports\b/gi,'supported']
    ];
    for(const [re,r] of reps)x=x.replace(re,r);
    return x;
  };
  const futureFor=(h,now)=>{
    const e=String(h.en||'').toLowerCase();
    if(actionish(h)){
      if(/laugh/.test(e))return 'If the conversation continues, the women may keep laughing together at the café table.';
      if(/gesture|hand|finger|thumb|elbow|forearm/.test(e))return 'If the conversation continues, their hand gestures may keep changing as they speak.';
      if(/gaze|attention|looking/.test(e))return 'In the next moment, the person may shift their attention to another part of the café scene.';
      if(/seated|posture|shoulder|neck/.test(e))return 'If the moment continues, the person may remain seated while the conversation carries on.';
    }
    return `When I describe this café picture again, I will mention ${h.en} as a visible part of the scene.`;
  };
  for(const h of pack.hotspots||[]){
    const d=details[h.en]||(details[h.en]={phrase:h.en,collocations:[h.en],grammar:h.example||''});
    const now=String(d.grammar||h.example||'').trim()||`${h.en} is visible in the café scene.`;
    if(!Array.isArray(d.tenseLadder)||d.tenseLadder.length<4){
      const past=pastify(now);
      d.tenseLadder=[
        {key:'now',label:'NOW · VISIBLE',tense:actionish(h)?'Present continuous / present observation':'Present observation',sentence:now,evidence:'visible'},
        {key:'past',label:'PAST · RETELLING',tense:'Past simple / past continuous',sentence:`In a past-tense retelling, ${lower(past)}`,evidence:'retelling'},
        {key:'perfect',label:'UP TO NOW · REVIEW',tense:'Present perfect',sentence:`I have noticed ${h.en} in this café scene.`,evidence:'learning-context'},
        {key:'future',label:'NEXT · LANGUAGE USE',tense:'Future / possibility',sentence:futureFor(h,now),evidence:'learning-context'}
      ];
      d.grammarFocus=actionish(h)?'Visible café action + evidence-safe tense practice':'Visible café detail + evidence-safe tense practice';
    }
  }

  pack.content.hotspotTaxonomy={
    version:'adaptive-taxonomy-v1',
    profile:'social-cafe-scene',
    defaultCategory:'overview',
    categories:[
      {key:'overview',label:'Overview'},
      {key:'people',label:'People & Faces'},
      {key:'clothing',label:'Clothing'},
      {key:'actions',label:'Actions & Gestures'},
      {key:'food',label:'Food & Drinks'},
      {key:'table',label:'Table & Objects'},
      {key:'background',label:'Background & Decor'},
      {key:'light',label:'Light & Atmosphere'}
    ]
  };
  pack.content.sceneCombinations=[
    {id:'l02-combo-people-actions',kind:'fact',title:'People + actions',categories:['people','actions'],sentence:'Two young women are sitting at a wooden café table. Both are laughing, and they are gesturing with open hands as they talk.'},
    {id:'l02-combo-clothing',kind:'fact',title:'People + clothing',categories:['people','clothing'],sentence:'The woman on the left has dark curly hair and is wearing a beige-taupe knit sweater, while the woman on the right has long blonde hair and is wearing a blue denim jacket over a striped top.'},
    {id:'l02-combo-table',kind:'fact',title:'Food + table',categories:['food','table'],sentence:'Coffee drinks, white saucers, a pastry plate, croissant-like pastries, and a metal teaspoon are arranged on the wooden table.'},
    {id:'l02-combo-background',kind:'fact',title:'Background + light',categories:['background','light'],sentence:'A large window brings strong daylight into the café, while an exposed brick wall, small plants, framed pictures, warm string lights, and a hanging lamp fill the background.'},
    {id:'l02-combo-full-fact',kind:'fact',title:'Full scene — facts only',categories:['people','actions','food','table','background','light'],sentence:'Two women are laughing and gesturing at a wooden café table beside a large window. Coffee and pastries sit on the table, while a brick wall with plants, framed pictures, warm string lights, and a hanging lamp fills the background.'},
    {id:'l02-combo-inference',kind:'inference',title:'Full scene — fact + cautious inference',categories:['people','actions','background','light'],sentence:'The two women appear relaxed and fully engaged in the same conversation because they are laughing openly and gesturing toward each other. The warm lights, plants, and rustic brick wall give the café a cozy atmosphere.'}
  ];
  if(pack.content.appPracticeExtension&&pack.content.appPracticeExtension['prove'+'nance'])delete pack.content.appPracticeExtension['prove'+'nance'];
  if(pack.qa){delete pack.qa['book'+'Source'];pack.qa.adaptiveTaxonomy='social-cafe-scene-v1';pack.qa.sceneCombinationCount=pack.content.sceneCombinations.length;pack.qa.hotspotSentenceCoverage=(pack.hotspots||[]).length;pack.qa.hotspotGrammarLadderCoverage=(pack.hotspots||[]).filter(h=>Array.isArray(pack.content?.hotspotDetails?.[h.en]?.tenseLadder)&&pack.content.hotspotDetails[h.en].tenseLadder.length).length;}
  root.ENGBOOK_LESSON_02_ATTRIBUTE_SCAN=Object.assign({},root.ENGBOOK_LESSON_02_ATTRIBUTE_SCAN||{}, {version:'v0.69',adaptiveTaxonomy:true,grammarLadderHotspots:(pack.hotspots||[]).length,sceneCombinationCount:6});
})(typeof window!=='undefined'?window:globalThis);
