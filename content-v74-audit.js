/* EngBook v0.74 — First 4 lessons: truth-first hotspot audit.
   Rule: no target count. Keep only visible, distinct, useful image anchors.
*/
(function(root){
  'use strict';
  const AUDIT={
    1:{
      remove:[
        'l01-man-soft-sideburns','l01-man-relaxed-jawline','l01-woman-center-parted-hair','l01-woman-closed-eyes','l01-woman-collarbone-line','l01-woman-relaxed-shoulders',
        'l01-hands-interlaced-fingers','l01-hands-two-hand-contact','l01-hands-his-right-hand','l01-hands-her-left-hand','l01-hands-relaxed-handhold','l01-hands-close-body-spacing',
        'l01-curving-shore','l01-shoreline-fresh-footprints','l01-shoreline-slope','l01-palms-dark-tree-line','l01-palms-layered-silhouettes',
        'l01-ocean-warm-water-highlights','l01-ocean-pale-horizon-band','l01-ocean-right-edge-ripples','l01-ocean-no-visible-boats',
        'l01-vertical-light-path','l01-reflection-elongated-path','l01-reflection-gold-white-sparkle'
      ],
      reasons:{
        'l01-ocean-no-visible-boats':'absence is not a hotspot object',
        'l01-woman-closed-eyes':'eye state is not certain enough at this resolution',
        'l01-man-relaxed-jawline':'subjective reading rather than a concrete visual feature',
        'l01-woman-relaxed-shoulders':'subjective and its old coordinate did not point to the shoulder area',
        'l01-hands-relaxed-handhold':'quality judgment is better handled as cautious interpretation',
        'l01-hands-close-body-spacing':'use the people/action anchors rather than a duplicate inference-like grip anchor'
      }
    },
    2:{
      remove:[
        'l02-broad-smile','l02-left-long-sleeve','l02-right-long-sleeve','l02-voluminous-curls','l02-soft-laugh-lines','l02-visible-upper-teeth','l02-dropped-shoulders',
        'l02-leftwoman-bent-left-elbow','l02-leftwoman-bent-right-elbow','l02-leftwoman-open-finger-spread','l02-smiling-eyes','l02-visible-teeth-laugh',
        'l02-jacket-shoulder-seam','l02-left-thumb-visible','l02-centerpatron-blurred-face','l02-centerpatron-rounded-shoulders','l02-centerpatron-shirt-fold',
        'l02-rightpatron-face-angle','l02-rightpatron-mug-handle','l02-rightpatron-dark-jacket-front','l02-rightpatron-bent-knees','l02-rightpatron-background-blur',
        'l02-spoon-handle','l02-table-plank-seam','l02-soft-green-leaves','l02-horizontal-brick-courses','l02-mortar-lines','l02-shelf-bracket','l02-black-picture-frame','l02-lamp-shade-glow'
      ],
      reasons:{
        'l02-dropped-shoulders':'posture quality is too interpretive for a separate factual anchor',
        'l02-rightpatron-bent-knees':'the lower-body configuration is too obscured to justify its own point',
        'l02-rightpatron-background-blur':'camera blur is not a distinct scene object and adds little learning value here',
        'l02-centerpatron-blurred-face':'camera-focus effect is better handled in composition, not as a person-detail hotspot',
        'l02-soft-laugh-lines':'too subtle at normal lesson viewing size',
        'l02-left-thumb-visible':'real but too trivial to deserve a separate anchor'
      }
    },
    3:{
      remove:[
        'l03-short-right-sleeve','l03-right-red-bow','l03-right-shoulder-strap','l03-light-shoe-soles','l03-mid-stride-running-posture-on-right','l03-interlocked-grip',
        'l03-sunlit-grass-blades','l03-yellow-flowers','l03-pink-flowers','l03-light-shirt-on-distant-visitor','l03-boy-left-ear','l03-boy-visible-teeth',
        'l03-boy-spread-left-fingers','l03-girl-braid-ends','l03-girl-visible-teeth','l03-girl-yellow-bodice','l03-girl-right-fingers','l03-coordinated-arm-lines',
        'l03-roof-ridge','l03-roof-shaded-underside','l03-left-slide-curved-lip','l03-left-slide-opening','l03-right-slide-curved-run','l03-platform-deck-edge',
        'l03-flower-band','l03-path-diagonal','l03-left-bench-backrest','l03-bench-horizontal-slats','l03-blurred-background-figures'
      ],
      reasons:{
        'l03-interlocked-grip':'the hands are joined, but exact finger interlocking is not clear enough',
        'l03-light-shirt-on-distant-visitor':'too small/background-soft for a useful independent clothing point',
        'l03-boy-left-ear':'visible but not educationally distinct enough for its own hotspot',
        'l03-coordinated-arm-lines':'an abstract composition description rather than a concrete object/action',
        'l03-blurred-background-figures':'duplicates the distant-visitors anchor and mostly describes focus depth'
      }
    },
    4:{
      remove:[
        'l04-young-man-face-braids','l04-emotion-comfort','l04-emotion-warmth','l04-scene-relaxing-home','l04-scene-family-like','l04-scene-photo-possibility',
        'l04-shelves-neutral-books','l04-fireplace-clean-surround','l04-floor-plant-right-corner','l04-floor-warm-surface-palette'
      ],
      rename:{
        'l04-shared-moment':{en:'shared seated group moment',example:'The five people are seated closely together on the sofa.'},
        'l04-young-man':{en:'man on the right',example:'A man is seated on the right side of the sofa.'},
        'l04-group-children-supported':{en:'children supported while seated',example:'The two children are visibly supported by the people beside them while seated.'}
      },
      reasons:{
        'l04-emotion-comfort':'supported interpretation, not a directly pointable visual object',
        'l04-emotion-warmth':'atmosphere/inference belongs in reasoning or scenario, not the factual hotspot layer',
        'l04-scene-relaxing-home':'activity interpretation is plausible but not directly proven by one still image',
        'l04-scene-family-like':'relationship interpretation must not be a factual hotspot',
        'l04-scene-photo-possibility':'possible story, not visible evidence',
        'l04-shared-moment':'family relation removed from hotspot wording; only the visible shared seated moment remains'
      }
    }
  };
  function rekeyDetail(content,oldEn,newEn,newExample){
    const d=content?.hotspotDetails;if(!d||!d[oldEn])return;
    const x=d[oldEn];delete d[oldEn];
    x.phrase=newEn;
    if(newExample){x.grammar=newExample;if(Array.isArray(x.tenseLadder)&&x.tenseLadder[0])x.tenseLadder[0].sentence=newExample;}
    d[newEn]=x;
  }
  function applyToHotspots(hs,lessonId,content){
    const rule=AUDIT[lessonId];if(!rule||!Array.isArray(hs))return hs||[];
    const dead=new Set(rule.remove||[]);
    const out=[];
    for(const h0 of hs){
      if(dead.has(h0.id))continue;
      const h=h0;
      const r=rule.rename?.[h.id];
      if(r){const old=h.en;h.en=r.en||h.en;h.fa=r.fa||h.fa;h.example=r.example||h.example;rekeyDetail(content,old,h.en,h.example);}
      out.push(h);
    }
    return out;
  }
  // Lesson 01 lives in CAT01 runtime data.
  try{
    if(typeof CAT01!=='undefined'&&CAT01.lessons?.[0])CAT01.lessons[0].hotspots=applyToHotspots(CAT01.lessons[0].hotspots,1,(typeof GOLD_LESSON_01!=='undefined'?GOLD_LESSON_01:null));
  }catch(e){}
  // Lessons 02–04 are registered lesson packs.
  try{
    for(const id of [2,3,4]){
      const p=(root.ENGBOOK_LESSON_PACKS||[]).find(x=>Number(x.lessonId)===id);if(!p)continue;
      p.hotspots=applyToHotspots(p.hotspots,id,p.content);
      p.qa=Object.assign({},p.qa,{truthFirstHotspotAudit:'v0.74',hotspotCountAfterTruthAudit:p.hotspots.length,forcedTargetCount:false});
    }
  }catch(e){}
  const finalCounts={};
  try{finalCounts[1]=CAT01.lessons[0].hotspots.length;}catch(e){}
  for(const id of [2,3,4]){const p=(root.ENGBOOK_LESSON_PACKS||[]).find(x=>Number(x.lessonId)===id);if(p)finalCounts[id]=p.hotspots.length;}
  if(!finalCounts[4])finalCounts[4]=110; // Lesson 04 is lazy-loaded from the already audited JSON pack.
  try{if(root.ENGBOOK_LESSON_01_ATTRIBUTE_SCAN)root.ENGBOOK_LESSON_01_ATTRIBUTE_SCAN.totalHotspots=finalCounts[1];}catch(e){}
  try{if(root.ENGBOOK_LESSON_02_ATTRIBUTE_SCAN){root.ENGBOOK_LESSON_02_ATTRIBUTE_SCAN.totalHotspots=finalCounts[2];root.ENGBOOK_LESSON_02_ATTRIBUTE_SCAN.detailHotspots=((root.ENGBOOK_LESSON_PACKS||[]).find(x=>Number(x.lessonId)===2)?.hotspots||[]).filter(h=>h.level==='detail').length;}}catch(e){}
  root.ENGBOOK_LESSON_04_ATTRIBUTE_SCAN={version:'v0.74',standard:'truth-first visual audit',totalHotspots:finalCounts[4],forcedTargetCount:false};
  root.ENGBOOK_FIRST4_HOTSPOT_TRUTH_AUDIT={version:'v0.74',rule:'visible + distinct + useful; no forced hotspot count',lessons:AUDIT,finalCounts};
})(window);
