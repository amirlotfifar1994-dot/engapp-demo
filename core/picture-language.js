/* Read the reviewed educational layer without changing visual claims. */
(function(root){
  'use strict';
  function hotspot(h,detail={},content={}){
    const data=content.picturePractice?.hotspotsById?.[h?.id];
    return data||{phrases:[{text:detail.phrase||h.en,kind:'Useful phrase',example:h.example}],grammar:detail.tenseLadder||[{key:'now',tense:'Present description',sentence:h.example,evidence:h.claimClass==='supported-inference'?'interpretation':'visible',pattern:detail.grammarFocus||'Describe the scene',note:'Use the pictured details to support your sentence.'}]};
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
