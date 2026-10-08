/* EngBook Scene Evidence Core v3.0
   Pack-driven claim classification for reviewed image scenes.
   Design rule: a visible noun/anchor does NOT prove the relation asserted around it.
   Unmapped anchor mentions therefore become REVIEW, never automatic VISIBLE FACT. */
(function(root){
  'use strict';
  const arr=v=>Array.isArray(v)?v:[];
  const obj=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
  const norm=v=>String(v??'').toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();
  const escapeRe=s=>String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');

  function phraseHit(text,term){
    const t=norm(text),q=norm(term);if(!q)return false;
    if(q.includes(' '))return t.includes(q);
    return new RegExp(`(^|[^a-z0-9])${escapeRe(q)}([^a-z0-9]|$)`,'i').test(t);
  }
  function regexHit(text,regex){if(!regex)return false;try{return new RegExp(regex,'i').test(String(text||''));}catch(e){return false;}}
  function hasCaution(text,profile){return arr(profile?.cautionTerms).some(x=>phraseHit(text,x));}
  function ruleHit(text,rule){
    if(regexHit(text,rule?.regex))return true;
    const terms=arr(rule?.terms);if(!terms.length)return false;
    if(rule?.match==='all')return terms.every(t=>phraseHit(text,t));
    return terms.some(t=>phraseHit(text,t));
  }
  function supportAnchors(rule,anchors){
    const keys=new Set(arr(rule?.supportKeys));return arr(anchors).filter(a=>keys.has(a.key)).map(a=>({key:a.key,label:a.label||a.key}));
  }
  function fallbackAnchorHits(text,anchors){return arr(anchors).filter(a=>arr(a.terms).some(t=>phraseHit(text,t))).map(a=>({key:a.key,label:a.label||a.key}));}
  function firstMatchedTerm(text,rule){return arr(rule?.terms).find(t=>phraseHit(text,t))||'';}
  function negatesMatchedTerm(text,rule){
    const t=norm(text),term=norm(firstMatchedTerm(text,rule));if(!term)return false;
    const pos=t.indexOf(term);if(pos<0)return false;
    const before=t.slice(Math.max(0,pos-42),pos);
    return /(?:\bnot\b|\bnever\b|\bno\b|\bisn't\b|\baren't\b|\bwasn't\b|\bweren't\b|\bdoesn't\b|\bdon't\b|\bdidn't\b)\s+(?:\w+\s+){0,3}$/i.test(before);
  }

  const ACTION_RELATION_TERMS=['flying','fly','drinking','drink','eating','eat','carrying','carry','throwing','throw','running','run','walking','walk','swimming','swim','driving','drive','dancing','dance','kissing','kiss','hugging','hug','sleeping','sleep','sitting','sit','standing','stand','holding','hold','wearing','wear','leaning','lean','looking','look','laughing','laugh','gesturing','gesture','playing','play','racing','race'];
  const SPATIAL_RELATIONS=['above','below','under','over','behind','beside','between','inside','outside','near','next to','in front of','on the left','on the right','on the table','at the table','by the window','along the path','along the beach'];
  function directRelationSafe(text,rules){
    const rs=arr(rules);
    const t=norm(text),support=norm(rs.flatMap(rule=>[...(arr(rule?.terms)),rule?.repair||'',rule?.reason||'']).join(' '));
    const riskyActions=ACTION_RELATION_TERMS.filter(x=>phraseHit(t,x)&&!phraseHit(support,x));
    const riskySpatial=SPATIAL_RELATIONS.filter(x=>phraseHit(t,x)&&!phraseHit(support,x));
    return {ok:riskyActions.length===0&&riskySpatial.length===0,riskyActions,riskySpatial};
  }

  function reviewResult(text,anchors,cautious,reason='Visible scene terms were detected, but the full action/relation is not mapped as a reviewed fact.'){
    return {type:'review',label:'VISUAL TERMS DETECTED — CLAIM NEEDS CHECK',confidence:'RELATION UNVERIFIED',text,anchors,reason,repair:'Keep the visible terms, but restate only a relation or action that the lesson evidence map explicitly supports.',score:58,cautious,ruleId:'anchor-relation-review'};
  }
  function classify(profile,anchors,claim,graph=null){
    const text=String(claim||'').trim();
    if(!text)return {type:'empty',label:'NO CLAIM',confidence:'—',text,anchors:[],reason:'No claim supplied.',repair:'',score:0,cautious:false,ruleId:null};
    const p=obj(profile),cautious=hasCaution(text,p);

    // 1) Explicit guardrails/contradictions always win.
    const unsupported=arr(p.unsupportedRules).find(r=>ruleHit(text,r));
    if(unsupported)return {type:'unsupported',label:'UNSUPPORTED CLAIM',confidence:'—',text,anchors:supportAnchors(unsupported,anchors),reason:unsupported.reason||'This statement is outside the reviewed lesson evidence map.',repair:unsupported.repair||'Return to a directly visible detail.',score:Number.isFinite(unsupported.score)?unsupported.score:4,cautious,ruleId:unsupported.id||null};

    // 2) Inference rules are allowed only at their declared confidence.
    const inference=arr(p.inferenceRules).find(r=>ruleHit(text,r));
    if(inference){
      let score=Number.isFinite(inference.score)?inference.score:72;
      if(inference.requiresCaution&&!cautious)score=Math.max(35,score-22);
      const reason=(inference.reason||'This interpretation is plausible from mapped visual clues.')+(inference.requiresCaution&&!cautious?' Use uncertainty language because the claim goes beyond direct visual fact.':'');
      return {type:'inference',label:'SUPPORTED INFERENCE',confidence:inference.confidence||'MEDIUM',text,anchors:supportAnchors(inference,anchors),reason,repair:inference.repair||text,score,cautious,ruleId:inference.id||null};
    }

    // 3) A reviewed direct rule can establish a fact, unless the learner negates it.
    const directs=arr(p.directRules).filter(r=>ruleHit(text,r));
    if(directs.length){
      const supportMap=new Map();directs.flatMap(r=>supportAnchors(r,anchors)).forEach(a=>supportMap.set(a.key,a));const support=[...supportMap.values()];
      const negated=directs.find(r=>negatesMatchedTerm(text,r));
      if(negated){
        return {type:'unsupported',label:'CONTRADICTS REVIEWED EVIDENCE',confidence:'—',text,anchors:support,reason:`The sentence negates a directly reviewed scene detail: ${negated.reason||negated.label||negated.id}.`,repair:negated.repair||'State the visible detail without negating it.',score:8,cautious,ruleId:`negated:${negated.id||'direct'}`};
      }
      const relation=directRelationSafe(text,directs);
      if(!relation.ok){
        const extra=[...relation.riskyActions,...relation.riskySpatial].slice(0,3).join(', ');
        return reviewResult(text,support,cautious,`Reviewed visual terms are present, but the added action/spatial relation (${extra}) is not established by the matched direct-evidence rules.`);
      }
      // v3 graph guard: when a learner joins several visible entities in one
      // proposition, every mentioned anchor must be part of the reviewed rule
      // support before an explicit action/spatial relation can be accepted.
      const allMentioned=fallbackAnchorHits(text,anchors),supportKeys=new Set(support.map(x=>x.key));
      if(graph){
        const ruleIds=new Set(directs.map(r=>String(r.id||'')));
        graph.edges?.filter(e=>e.reviewed&&e.type==='supports').forEach(e=>{const claim=graph.nodes?.find(n=>n.id===e.to);if(claim&&ruleIds.has(String(claim.ruleId||'')))supportKeys.add(String(e.from||'').replace(/^anchor:/,''));});
      }
      const extraAnchors=allMentioned.filter(a=>!supportKeys.has(a.key));
      const relationLanguage=ACTION_RELATION_TERMS.some(x=>phraseHit(text,x))||SPATIAL_RELATIONS.some(x=>phraseHit(text,x));
      if(graph&&relationLanguage&&extraAnchors.length){
        return reviewResult(text,[...support,...extraAnchors],cautious,`The sentence combines reviewed visual entities (${extraAnchors.map(x=>x.label).join(', ')}) with a relation that is not traced to the matched evidence rule.`);
      }
      const score=Math.round(directs.reduce((n,r)=>n+(Number.isFinite(r.score)?r.score:94),0)/directs.length);
      return {type:'fact',label:'VISIBLE FACT',confidence:'DIRECT',text,anchors:support,reason:directs.map(r=>r.reason).filter(Boolean).join(' '),repair:directs.length===1?(directs[0].repair||text):text,score,cautious,ruleId:directs.map(r=>r.id).filter(Boolean).join('+')};
    }

    // 4) Critical v2 change: nouns/anchors alone cannot validate the sentence relation.
    const fallback=fallbackAnchorHits(text,anchors);
    if(fallback.length)return reviewResult(text,fallback,cautious);

    // 5) Cautious but unmapped statements remain hypotheses requiring review.
    if(cautious)return {type:'review',label:'CAUTIOUS HYPOTHESIS — NEEDS CHECK',confidence:'LOW / UNMAPPED',text,anchors:[],reason:'You marked this as uncertain, but the reviewed lesson pack has no matching inference rule.',repair:'Connect the hypothesis to a visible clue, or choose one of the lesson’s reviewed inference routes.',score:50,cautious,ruleId:'cautious-unmapped'};

    return {type:'unsupported',label:'UNSUPPORTED BY SCENE PACK',confidence:'—',text,anchors:[],reason:'The reviewed local lesson pack does not contain enough mapped evidence to support this claim.',repair:'Start with a visible subject, action, object, setting, or light detail from the current scene.',score:10,cautious,ruleId:'unmapped'};
  }

  root.EngBookSceneEvidence={version:'3.0',normalize:norm,phraseHit,ruleHit,classify};
})(typeof window!=='undefined'?window:globalThis);
