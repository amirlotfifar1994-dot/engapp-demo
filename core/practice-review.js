/* Shared picture-recall rules. Smart review uses local recall history;
   its priority is a learning aid, not a measured proficiency score. */
(function(root){
  'use strict';
  const TYPES=Object.freeze(['find','listen','smart']);
  // Reviewed display boundaries for legacy single-string builder items.
  // Lookup is exact: wording, punctuation and photo claims stay canonical.
  // Never guess chunks for an unknown sentence or rewrite a lesson pack.
  const builderModels=[
    "A customer|looks down at an open laptop|beside the window.",
    "An open laptop|sits|on the left table.",
    "An older adult|looks down at|an open newspaper.",
    "An apron-wearing adult|stands|behind the counter.",
    "A woman|stands at the service counter|and looks toward a tablet.",
    "A man in blue workwear|holds a tablet|behind the counter.",
    "The tablet|displays|a graph-like interface.",
    "Printed sheets|lie|across the counter.",
    "A customer|reaches across the display|toward a plated pastry.",
    "A worker in a white shirt and dark apron|presents|a plate.",
    "The women|both hold a white plate|with a spiral pastry on it.",
    "A glass case|separates the customer|from the pastries.",
    "The woman|holds a green garment and a pink dress|on hangers.",
    "The woman|holds a green blazer|on a black hanger.",
    "A pink dress|hangs from a hanger|in her right hand.",
    "Several pale garments|hang|along the left side.",
    "A worker in a black cap and shirt|stands|behind the counter.",
    "A customer|faces the worker|across the counter.",
    "A large paper bag|is being handed|across the counter.",
    "Two lidded drinks with straws|sit together|on a tray.",
    "The customer|holds a bank card|toward the cashier.",
    "A cashier in a blue shirt|reaches toward|the card terminal.",
    "The customer|holds a card|close to the card reader.",
    "The cashier|holds|a card payment terminal.",
    "A woman|faces the employee|across the counter.",
    "A man|smiles|while holding a garment package.",
    "A suit-like garment|is enclosed|in clear plastic.",
    "A pink paper tag|hangs|from the covered garment.",
    "A delivery worker|stands outside the doorway|wearing a blue uniform and cap.",
    "A smiling woman|stands inside the doorway|while holding the parcel.",
    "Both people|hold a cardboard parcel|in the doorway.",
    "The open dark doorway|frames|the handoff.",
    "A customer|holds a shoebox-sized package|across the counter.",
    "An employee in a dark top|faces|the customer.",
    "A flat rectangular box|is supported|by both people.",
    "A large brown paper shopping bag|stands|on the counter.",
    "An employee in a pale blue shirt|holds|a smartphone.",
    "A customer in a dark sweater|looks down|toward the phone.",
    "The employee|holds a smartphone|between both hands.",
    "A phone|stands upright on a display base|in the foreground.",
    "A woman in a light blue work shirt and black trousers|holds one side of a taped parcel|across the counter.",
    "A man in an olive overshirt|holds the other side|of the taped parcel.",
    "Both people|hold a taped cardboard parcel|above the counter.",
    "A metal weighing scale|stands|on the left side of the counter.",
    "A visitor with a dark backpack|looks toward|the shelves.",
    "A woman|raises her arm|toward an upper shelf.",
    "The guide|points toward|a book on the upper shelf.",
    "Tall shelves filled with books|line|the right side.",
    "A stylist|stands behind a seated client|and works near the client’s hair.",
    "A client|sits in a chair|wearing a black salon cape.",
    "The hairstylist|holds a section of the client’s hair|away from the head.",
    "A dark comb|is visible|beside the section of hair.",
    "A woman in a dark blazer|sits behind the counter|and gestures with an open palm.",
    "A woman seen mostly from behind|extends a small card|while holding a white-and-blue paper|in her other hand.",
    "The customer|presents a card|toward the employee.",
    "The customer|holds a blue card|between her fingers.",
    "A man in a white shirt and black vest|stretches a measuring tape|across the other man’s jacket.",
    "A man|stands still|while a measuring tape is held|across his dark suit jacket.",
    "A flexible measuring tape|stretches|across the jacket’s upper chest.",
    "A second length of measuring tape|hangs down|the jacket.",
    "A florist in a green apron|holds the bouquet|across the counter.",
    "A customer in a light coat|holds the bouquet|and smiles.",
    "A large bouquet wrapped in brown paper|is held|by both women.",
    "Several pink flowers|are visible|above the bouquet’s paper wrapping.",
    "A fishmonger in a blue apron|gestures toward|the seafood.",
    "A customer|leans toward the ice display|and looks down.",
    "Whole silver fish|are arranged|on the ice.",
    "Orange fillets|are arranged|beside a price card.",
    "An employee in a dark apron|holds|a cordless drill.",
    "A customer in a gray shirt|looks toward|the drill.",
    "The employee|holds a cordless drill|above the display table.",
    "A large teal molded tool case|sits|in the foreground.",
    "A woman|stands beside the machines|and handles laundry.",
    "A white laundry basket|is held|against the woman’s hip.",
    "The woman|holds a pale green garment|at the washer opening.",
    "The round washer door|is open|beside the garment.",
    "A young person|sits upright|on the edge of the bed.",
    "A woman in a white coat|stands|beside the bed.",
    "A man in blue scrubs|stands|beside the trolley.",
    "An examination bed|stands|on the left.",
    "A woman in a white coat|stands|behind the counter.",
    "An older man|stands|on the near side of the counter.",
    "A tablet|stands at an angle|on the counter.",
    "A white paper bag|stands|beside the tablet.",
    "An adult|holds a child|beside the counter.",
    "A child|sits|in the adult’s arms.",
    "A white paper bag|is held|between the two adults.",
    "A man in blue scrubs|leans toward|the reclining woman.",
    "A woman|reclines|in the dental chair.",
    "A blue dental chair|supports|the reclining woman.",
    "An examination light|hangs|above the chair.",
    "A woman in pink scrubs|leans toward|the boy.",
    "A boy|sits|in the blue dental chair.",
    "A blue dental chair|stands|beside the woman.",
    "A pink stool|stands|behind the woman.",
    "A man|lies on a bench|beneath a barbell.",
    "A barbell|is held|above the man’s chest.",
    "A padded bench|supports|the reclining man.",
    "Dark weight plates|are stored|beside the bench.",
    "A woman in black exercise clothes|faces|the group.",
    "A man on the left|holds a small dumbbell|in each hand.",
    "A woman in a pink top|holds her arms|above her head.",
    "A man near the center|raises|both arms.",
    "A woman in blue|balances on one leg|near the center.",
    "A woman in beige|balances|to the left of the center woman.",
    "A woman in pale beige|balances|on the right.",
    "A woman in gray exercise clothes|is partly cropped|at the left edge.",
    "A woman in a turquoise top|balances|near the left windows.",
    "A woman in a pale top|holds a balance pose|near the center.",
    "A turquoise-clad figure|holds a similar balance pose|on the right.",
    "A woman in a dark green top|balances|behind the left foreground woman.",
    "A woman in a white coat|sits|behind the chart.",
    "A woman in a striped shirt|faces|the white-coated woman.",
    "A chart with colored graphics|lies|on a clipboard.",
    "Fruit and vegetables|sit in a wooden bowl|on the table.",
    "A man|lies on a bed|beneath a white sheet.",
    "A woman in blue scrubs|leans toward|the man’s head.",
    "A man in blue scrubs|leans|over the bed.",
    "Another adult in blue|stands|in the background.",
    "A woman in a white coat|sits facing|the visitor.",
    "A woman in a pale blue shirt|sits|with her back toward the viewer.",
    "A stethoscope|hangs|around the white-coated woman’s neck.",
    "An open document|lies on a clipboard|on the desk.",
    "A woman|sits facing|an eye-examination machine.",
    "A man in a white coat|looks into|the machine’s eyepieces.",
    "An eye-examination machine|stands|between the two people.",
    "A black examination chair|stands|behind the seated woman.",
    "A seated man in a dark gray shirt|extends|one arm.",
    "A man in gray scrubs|stands|behind the seated man.",
    "A blue resistance band|stretches|across the foreground.",
    "A padded table|stands|on the left side of the room.",
    "A woman in blue scrubs|faces|the seated girl.",
    "A girl|sits|on the examination table.",
    "A syringe|is held|near the girl’s upper arm.",
    "A padded examination table|supports|the seated girl.",
    "A woman in dark blue clothing|sits|on the left side of the sofa.",
    "An older woman|sits|on the right side of the sofa.",
    "The women|hold hands|above the blanket.",
    "A gray-beige knitted blanket|covers|the older woman’s lap.",
    "A woman in glasses|sits facing|the other participant.",
    "The other woman|is seen|from the back and side.",
    "An open notebook|rests|on the facing woman’s lap.",
    "The facing woman|sits|in a gray armchair.",
    "A woman|reclines|in a blue dental chair.",
    "A masked man in white clothing|leans toward|the chair.",
    "Small metal instruments|extend toward|the woman’s mouth.",
    "An adult in blue scrubs|stands|at the rear counter.",
    "A man|lies back|on a padded table.",
    "A woman|stands|beside the raised leg.",
    "A green resistance band|runs toward|the raised shoe.",
    "A black padded table|supports|the man.",
    "A golden-brown dog|sits|on the examination table.",
    "A woman in a white coat|stands|on the left.",
    "A woman in a light blue shirt|stands|on the right.",
    "A stethoscope|runs from the left woman’s ears|toward the dog.",
    "A visitor in gray|is seen from behind|across the counter.",
    "A small white-and-blue carton|rests|in the facing woman’s hand.",
    "A pale counter|separates|the two women.",
    "A woman in a gray T-shirt|sits|in the padded chair.",
    "A woman in navy scrubs|stands|beside the chair.",
    "A dark blood-pressure cuff|wraps around|the upper arm.",
    "A stethoscope|hangs against|the standing woman’s navy top.",
    "A woman in a green sweater|sits|at the optical device.",
    "A man in a white coat|leans toward|the eyepiece.",
    "An optical examination device|stands|between the two adults.",
    "A white examination table|supports|the device.",
    "An adult’s arm|rests|on a black padded support.",
    "A wide blue band|wraps around|the arm.",
    "A person in blue clothing|stands|beside the supported arm.",
    "Blue-gloved hands|hold equipment|beside the inner elbow.",
    "An adult|lies|on the scanner table.",
    "An adult in olive clothing|stands|beside the scanner.",
    "A large white tunnel-shaped scanner|fills|the rear of the room.",
    "A pale support|surrounds the adult’s head|near the opening.",
    "A woman|faces the camera|on the laptop screen.",
    "A soft-focus participant|faces the laptop|from the right foreground.",
    "An open silver laptop|stands|in front of the foreground participant.",
    "Pink flowers|stand|behind the laptop.",
    "A woman|sits at the console|with both hands near the controls.",
    "A man|is visible|through the booth window.",
    "A sloping test console|rests|on the table.",
    "A dark frame|surrounds|the booth window.",
    "A woman|leans toward|an open book.",
    "An open book|rests|above the red pillow.",
    "A large red pillow|lies|beneath the book.",
    "A dark bed surface|lies|below the reader.",
    "A bare hand|extends one finger|above the device.",
    "A white patterned sleeve|borders|the bare wrist.",
    "A wristwatch|sits|beside the patterned cuff.",
    "Pale-gloved hands|hold|the device.",
    "An upper arm|is visible|below the pale cuff.",
    "A hand|reaches toward|the cuff edge.",
    "A pale cuff|wraps around|the upper arm.",
    "A flexible tube|crosses the tabletop|below the arm.",
    "A short-haired adult|stands|on the left of the stretcher.",
    "A light-haired adult|stands|on the right of the stretcher.",
    "An adult|lies on the stretcher|beneath white material.",
    "A wheeled stretcher|stands|beside the ambulance.",
    "Two adults and two children|stand|beside the counter.",
    "The woman|stands|behind the counter screen.",
    "Gray, green and navy suitcases|stand|in a row.",
    "A stone-textured counter|separates the travelers|from the woman in blue.",
    "Adults|sit|among blue seats and personal luggage.",
    "Two uniformed adults|stand|beside a workstation.",
    "Rows of blue seats|fill|the waiting area.",
    "A red suitcase|rests|on a blue seat.",
    "A man and a girl|stand|beside three colorful suitcases.",
    "The woman|stands|behind the nearest white counter.",
    "Blue, yellow and red suitcases|stand|in a row.",
    "A long white service counter|fills|the left foreground.",
    "A white twin-engine jet|is|above the runway.",
    "A dark runway|stretches|into the distance.",
    "A low glass-fronted terminal|stands|behind the runway.",
    "A control tower|rises|above the terminal.",
    "Travelers|stand or walk|beside the train.",
    "A silver train|stands|beside the platform.",
    "Two large round clocks|hang high|in the hall.",
    "Black-and-yellow information boards|hang|above the travelers."
  ].map(row=>Object.freeze(row.split('|')));
  const reviewedBuilders=new Map(builderModels.map(parts=>[parts.join(' '),parts]));
  function builderRows(rows,{strict=false}={}){
    const invalid=()=>{if(strict)throw new Error('BUILDER_CHUNKS_REVIEW_REQUIRED: supply at least two authored meaning chunks per sentence.');return [];};
    if(!Array.isArray(rows)||!rows.length)return strict?invalid():[];
    return rows.flatMap(row=>{
      if(!Array.isArray(row)||!row.length||!row.every(part=>typeof part==='string'&&part.trim()))return invalid();
      const parts=row.length===1?reviewedBuilders.get(row[0]):row;
      return parts&&parts.length>=2?[parts.slice()]:invalid();
    });
  }
  // Legacy recall prompts retain their original pack shape. These explicit
  // anchor selections expose reviewed exercises without fabricating missing
  // content for other lessons. The final item is a deliberately unsupported
  // practice claim, never an observation about the photograph.
  const legacyReviews=new Map([
    [81,'laptop-user open-laptop newspaper-reader coffee-worker','The laptop user is writing a work report.','A laptop is visible, but its task and the customer’s purpose are not established.'],
    [82,'customer-at-counter service-advisor service-tablet paperwork','The customer has approved an expensive engine repair.','The tablet and workshop are visible; the exact fault, price and customer decision are not shown.'],
    [83,'customer bakery-worker pastry-on-plate glass-display','The customer will eat the pastry inside the shop.','The photograph does not establish whether the pastry is for dine-in or takeaway.'],
    [84,'woman-choosing-clothes green-garment pink-dress left-clothing-rack','The woman has decided to buy the pink dress.','Holding the garments does not establish a final purchase choice.'],
    [85,'takeout-worker customer paper-takeout-bag two-takeaway-drinks','The paper bag contains two hamburgers.','The contents of the closed paper bag are not visible.'],
    [86,'customer-paying cashier payment-card card-terminal','The card payment has already succeeded.','A card and terminal are visible, but a successful transaction is not confirmed.'],
    [87,'customer-at-counter service-employee covered-garment paper-garment-tag','The garment has been dry-cleaned and repaired.','The covered garment does not prove which treatment or service has been completed.'],
    [88,'delivery-worker resident parcel front-doorway','The parcel contains a new laptop.','The closed parcel does not reveal its contents.'],
    [89,'customer retail-employee shoebox-sized-package shopping-bag','The customer is receiving a cash refund.','The exact service and any refund method are not established by the picture.'],
    [90,'sales-employee customer smartphone display-phone-left','The customer has chosen to buy the phone.','Looking at a phone does not confirm a purchase decision.'],
    [91,'postal-employee customer parcel large-scale','The parcel is being sent overseas.','The handover and parcel do not establish its destination or whether it is being sent or collected.'],
    [92,'visitor library-guide pointing-hand bookcase','The visitor is definitely a student.','A backpack and shelves do not establish the visitor’s occupation or student status.'],
    [93,'hairstylist salon-client lifted-hair-section comb','The client is pleased with the finished haircut.','Neither the client’s satisfaction nor a completed haircut is established.'],
    [94,'bank-employee customer card-handoff bank-card','The customer is withdrawing cash.','The small card and paper do not establish the transaction or any money amount.'],
    [95,'tailor client-in-suit tape-across-chest vertical-tape','The suit is being made for a wedding.','A measuring tape and jacket do not reveal the occasion or whether the suit is new.'],
    [96,'florist customer wrapped-bouquet pink-flowers','The bouquet is a birthday gift for the customer’s mother.','The occasion, recipient and relationship are not established.'],
    [97,'fishmonger customer whole-silver-fish salmon-fillets','The customer has decided to buy fish for dinner.','Looking at seafood does not establish a purchase decision or planned meal.'],
    [98,'store-employee customer cordless-drill drill-case','The held drill has an eighteen-volt battery.','A voltage claim cannot be assigned to the held drill without a clear label-to-model link.'],
    [99,'laundry-customer laundry-basket garment-being-loaded open-washer-door','The washing machine is running a hot-water cycle.','An open washer and garment do not establish the selected cycle, water temperature or machine status.']
  ].map(([id,slugs,text,note])=>[id,{ids:slugs.split(' ').map(slug=>`l${id}-${slug}`),text,note}]));
  function recall(content,hotspots,lessonId,{strict=false}={}){
    const original=content?.recall;
    if(original&&typeof original==='object'&&!Array.isArray(original))return original;
    const review=legacyReviews.get(Number(lessonId));
    if(!review||!Array.isArray(original))return null;
    const invalid=()=>{if(strict)throw new Error(`LEGACY_RECALL_REVIEW_REQUIRED: lesson ${Number(lessonId)}`);return null;};
    if(!Array.isArray(hotspots))return invalid();
    const rows=[];
    for(const id of review.ids){
      const hs=hotspots.filter(h=>h?.id===id),prompts=original.filter(row=>row?.hotspotId===id);
      if(hs.length!==1||prompts.length!==1||hs[0].claimClass!=='visible-fact'||typeof hs[0].example!=='string'||!hs[0].example.trim()||prompts[0].answer!==hs[0].example)return invalid();
      rows.push(hs[0]);
    }
    const builders=builderRows(rows.map(h=>[h.example]));
    const possible=content.pictureScenarioModels?.find?.(row=>row?.id==='possible'&&row.claimClass==='supported-inference');
    const refs=possible?.evidenceHotspotIds;
    if(builders.length!==rows.length||typeof possible?.text!=='string'||!possible.text.trim()||!Array.isArray(refs)||!refs.length||!refs.every(id=>hotspots.some(h=>h.id===id)))return invalid();
    const facts=rows.map(h=>({text:h.example,kind:'fact',hotspotId:h.id,note:`Look for ${h.en} in the picture. This repeats the reviewed visible description.`}));
    return {builderSentences:builders,factItems:[...facts,{text:possible.text,kind:'inference',note:'This is a possible reading, not a confirmed fact. '+String(content.guardrail||''),evidenceHotspotIds:refs.slice()},{text:review.text,kind:'unsupported',note:review.note}],principle:String(content.guardrail||'Separate visible facts from possible interpretations.')};
  }
  function shuffleChunks(length,random=Math.random){
    const ids=Array.from({length:Math.max(0,Math.min(100,Number.isInteger(length)?length:0))},(_,i)=>i);
    for(let i=ids.length-1;i>0;i--){const j=Math.max(0,Math.min(i,Math.floor((Number(random())||0)*(i+1))));[ids[i],ids[j]]=[ids[j],ids[i]];}
    // A lucky identity shuffle would show the answer before the learner tries.
    if(ids.length>1&&ids.every((id,i)=>id===i))ids.push(ids.shift());
    return ids;
  }
  function shuffleEvidence(items,random=Math.random){
    if(!Array.isArray(items)||!items.length||items.length>100)return [];
    const order=shuffleChunks(items.length,random),kinds=items.map(row=>row?.kind);
    // Shuffling within the fact group alone would leave the answer pattern exposed.
    if(order.every((index,i)=>kinds[index]===kinds[i])){
      const other=order.findIndex(index=>kinds[index]!==kinds[order[0]]);
      if(other>0)[order[0],order[other]]=[order[other],order[0]];
    }
    return order;
  }
  function recordDrill(round,{type,lessonId,total,index,correct}={}){
    if(!['builder','fact'].includes(type)||!Number.isInteger(lessonId)||lessonId<1||!Number.isInteger(total)||total<1||!Number.isInteger(index)||index<0||index>=total||typeof correct!=='boolean')return round||null;
    const same=round?.type===type&&round.lessonId===lessonId&&round.total===total;
    if(same&&round.finished)return round;
    const answers=same?round.answers.map(row=>row?{...row}:null):Array(total).fill(null);
    if(answers[index]?.correct||type==='fact'&&answers[index])return round;
    answers[index]={correct,attempts:(answers[index]?.attempts||0)+1};
    return {type,lessonId,total,answers,finished:false};
  }
  function finishDrill(round,{type,lessonId,total}={}){
    if(!round||round.finished||round.type!==type||round.lessonId!==lessonId||round.total!==total)return null;
    const answered=round.answers.filter(Boolean).length,correct=round.answers.filter(row=>row?.correct).length;
    if(!answered)return null;
    const firstTry=round.answers.filter(row=>row?.correct&&row.attempts===1).length;
    return {...round,answers:round.answers.map(row=>row?{...row}:null),answered,correct,firstTry,complete:(type==='builder'?correct:answered)===total,finished:true};
  }
  function mistakeAddress(item){
    if(!['visual','builder','evidence'].includes(item?.type))return null;
    if(typeof item.key!=='string'&&!Number.isInteger(item.key))return null;
    const raw=String(item.key),match=raw.match(/^l([1-9]\d*):(visual|builder|evidence):(.+)$/s);
    if(match&&match[2]!==item.type||!match&&/^l\d+:/.test(raw))return null;
    const lessonId=match?Number(match[1]):1,value=match?match[3]:raw;
    if(!value||!Number.isSafeInteger(lessonId)||item.lessonId!=null&&Number(item.lessonId)!==lessonId)return null;
    return {lessonId,type:item.type,value};
  }
  function repairTarget(item,lessonId,{builders=[],facts=[],hotspots=[]}={}){
    const a=mistakeAddress(item);if(!a||a.lessonId!==lessonId)return null;
    if(a.type==='visual'){
      let matches=candidates(hotspots).filter(h=>h.id===a.value);
      if(!matches.length)matches=candidates(hotspots).filter(h=>h.en===a.value);
      if(matches.length!==1||matches[0].en!==item.correct)return null;
      return {type:'visual',hotspotId:matches[0].id||null,word:matches[0].en};
    }
    if(!/^(0|[1-9]\d*)$/.test(a.value))return null;
    const rows=a.type==='builder'?builders:facts,index=Number(a.value);
    const kinds={'Visible fact':'fact','Inference':'inference','Supported inference':'inference'};
    const matches=row=>a.type==='builder'?Array.isArray(row)&&row.join(' ')===item.correct:row?.text===item.prompt&&row.kind===(kinds[item.correct]||item.correct);
    if(!Array.isArray(rows)||!Number.isSafeInteger(index))return null;
    return index<rows.length&&matches(rows[index])?{type:a.type,index}:null;
  }
  function visualMistakeKeys(hotspot,hotspots){
    const keys=hotspot?.id?[hotspot.id]:[];
    if(hotspot?.en&&candidates(hotspots).filter(h=>h.en===hotspot.en).length===1&&!keys.includes(hotspot.en))keys.push(hotspot.en);
    return keys;
  }
  const key=h=>h?.id||h?.en;
  function candidates(hotspots){
    return (hotspots||[]).filter(h=>h&&String(h.en||'').trim()&&
      (!h.claimClass||h.claimClass==='visible-fact')&&
      Number.isFinite(Number(h.x))&&Number(h.x)>=0&&Number(h.x)<=100&&
      Number.isFinite(Number(h.y))&&Number(h.y)>=0&&Number(h.y)<=100);
  }
  function chooseTarget(hotspots,{type='find',reviewed=[],score=()=>0,last=()=>0,random=Math.random}={}){
    const seen=new Set(reviewed);let pool=candidates(hotspots).filter(h=>!seen.has(key(h)));
    if(!pool.length)return null;
    if(type==='smart'){
      pool.sort((a,b)=>(Number(score(a.en))||0)-(Number(score(b.en))||0)||(Number(last(a.en))||0)-(Number(last(b.en))||0));
      const first=pool[0];pool=pool.filter(h=>(Number(score(h.en))||0)===(Number(score(first.en))||0)&&(Number(last(h.en))||0)===(Number(last(first.en))||0));
    }
    return pool[Math.min(pool.length-1,Math.max(0,Math.floor(random()*pool.length)))];
  }
  function matches(hit,target){return Boolean(hit&&target&&(hit.id&&target.id?hit.id===target.id:hit.en===target.en));}
  function locationHint(h){
    const x=Number(h?.x),y=Number(h?.y);
    if(!Number.isFinite(x)||!Number.isFinite(y))return 'Look carefully at the whole picture.';
    const column=x<33?'left':x>67?'right':'center',row=y<33?'upper':y>67?'lower':'middle';
    return column==='center'&&row==='middle'?'Look near the center of the picture.':`Look in the ${row} ${column} of the picture.`;
  }
  function canAnswer(s){return Boolean(s?.mode==='practice'&&TYPES.includes(s.practiceType)&&!s.practiceLocked&&s.practiceTarget&&Number(s.practiceLessonId)===Number(s.lesson?.id));}
  const api=Object.freeze({TYPES,candidates,chooseTarget,matches,locationHint,canAnswer,key,builderRows,shuffleChunks,shuffleEvidence,recall,recordDrill,finishDrill,mistakeAddress,repairTarget,visualMistakeKeys});
  root.EngBookPractice=api;
  if(typeof module==='object'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
