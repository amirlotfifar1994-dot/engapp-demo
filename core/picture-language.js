/* Read the reviewed educational layer without changing visual claims. */
(function(root){
  'use strict';
  function hotspot(h,detail={},content={},context={}){
    const data=content.picturePractice?.hotspotsById?.[h?.id];
    const source=data||{phrases:[{text:detail.phrase||h.en,kind:'Useful phrase',example:h.example}],grammar:detail.tenseLadder||[{key:'now',tense:'Present description',sentence:h.example,evidence:h.claimClass==='supported-inference'?'interpretation':'visible',pattern:detail.grammarFocus||'Describe the scene',note:'Use the pictured details to support your sentence.'}]};
    const base={...source,phrases:source.phrases.map(row=>{
      if(row.task!=='Use this phrase to describe the visible detail, then locate it in the picture.')return row;
      let text=row.text,kind=row.kind;
      if(text.toLowerCase()===h.en.toLowerCase()){
        const tail=row.example.toLowerCase().startsWith(text.toLowerCase()+' ')?row.example.slice(text.length+1).replace(/[.!?]$/,''):'';
        if(tail.split(/\s+/).length>=2)text=tail;
        else{text=row.example;kind='Scene sentence';}
      }
      if(text.trim().split(/\s+/).length<2){text=row.example;kind='Scene sentence';}
      return {...row,text,kind,task:`Use “${text}” to describe the visible detail, then locate it in the picture.`};
    })};
    const level=context.level||(context.lessonId?root.EngAppLevelAware?.levelFor({lessonId:context.lessonId,content},'global')||'A2':null);
    const authored=content.hotspotLanguage?.hotspotsById?.[h?.id],variant=authored?.reviewed===true?authored.levels?.[level]:null;
    if(!variant?.description||!variant.phrases?.length||!variant.grammar?.length)return {...base,description:h.example,languageLevel:null};
    // Shared evidence and coordinates stay canonical; only reviewed language changes.
    const ownKeys=new Set(variant.grammar.map(row=>row.key));
    const grammar=[...variant.grammar,...(base.grammar||[]).filter(row=>!ownKeys.has(row.key))];
    const allowed={A1:['now'],A2:['now','question'],B1:['now','question','past','future'],B2:['now','question','past','perfect','future'],C1:['now','question','past','perfect','future']}[level]||['now'];
    return {...base,...variant,languageLevel:level,grammar:context.allForms?grammar:grammar.filter(row=>allowed.includes(row.key))};
  }
  function boundary(row){
    if(row?.claimClass==='visible-fact')return {label:'Visible facts',copy:'Describe only what the picture shows.',kind:'visible'};
    if(row?.claimClass==='personal')return {label:'Your memory',copy:'Your own experience is separate from the people in the photo.',kind:'personal'};
    if(row?.claimClass==='supported-inference')return {label:'Possible interpretation',copy:'The picture suggests this; it does not confirm it.',kind:'possible'};
    return {label:'Imagined scenario',copy:'Fictional language practice, not a fact about the photo.',kind:'imagine'};
  }
  function scenario(row,level='A2'){
    if(!row)return null;
    const variant=row.levels?.[level];
    return {...row,...(variant||{}),text:variant?.text||row.text,boundary:boundary(row),level:variant?level:null};
  }
  root.EngBookPictureLanguage=Object.freeze({hotspot,boundary,scenario});
})(typeof window!=='undefined'?window:globalThis);
