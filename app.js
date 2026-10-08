function courseLessonLabel(id){return window.EngBookCoursePath?.label(id)||String(id).padStart(2,'0');}
const app = document.getElementById('app');
const BUILD_INFO = window.ENGBOOK_BUILD_INFO || {version:'0.90',tag:'engapp-v0.90-deployment-certified',progressSchemaVersion:79,storage:{progressKey:'engapp_v79_progress',progressBackupKey:'engapp_v79_migration_backup',onboardKey:'engapp_v79_onboarded',commercialKey:'engbook_v82_commercial'}};
const PROGRESS_KEY = BUILD_INFO.storage.progressKey;
const PROGRESS_SCHEMA_VERSION = BUILD_INFO.progressSchemaVersion;
const LEGACY_PROGRESS_KEYS = ['engbook_v78_progress','engbook_v77_progress','engbook_v76_progress','engbook_v75_progress','engbook_v74_progress','engbook_v73_progress','engbook_v72_progress','engbook_v71_progress','engbook_v70_progress','engbook_v69_progress','engbook_v68_progress','engbook_v67_progress','engbook_v66_progress','engbook_v65_progress','engbook_v64_progress','engbook_v63_progress','engbook_v62_progress','engbook_v61_progress','engbook_v60_progress','engbook_v59_progress','engbook_v58_progress','engbook_v57_progress','engbook_v56_progress','engbook_v55_progress','engbook_v54_progress','engbook_v53_progress','engbook_v52_progress','engbook_v51_progress','engbook_v50_progress','engbook_v49_progress','engbook_v48_progress','engbook_v47_progress','engbook_v46_progress','engbook_v45_progress','engbook_v44_progress','engbook_v43_progress','engbook_v42_progress','engbook_v41_progress','engbook_v40_progress','engbook_v39_progress','engbook_v38_progress','engbook_v37_progress','engbook_v36_progress','engbook_v35_progress','engbook_v34_progress','engbook_v33_progress','engbook_cat01_v32_progress','engbook_cat01_v31_progress','engbook_cat01_v30_progress','engbook_cat01_v29_progress','engbook_cat01_v28_progress','engbook_cat01_v27_progress','engbook_cat01_v26_progress','engbook_cat01_v25_progress','engbook_cat01_v24_progress','engbook_cat01_v23_progress','engbook_cat01_v22_progress','engbook_cat01_v21_progress','engbook_cat01_v20_progress','engbook_cat01_v19_progress','engbook_cat01_v18_progress','engbook_cat01_v17_progress','engbook_cat01_v16_progress','engbook_cat01_v15_progress','engbook_cat01_v14_progress'];
const PROGRESS_BACKUP_KEY = BUILD_INFO.storage.progressBackupKey;
const ONBOARD_KEY = BUILD_INFO.storage.onboardKey;
try{if(!localStorage.getItem(ONBOARD_KEY)){const oldOnboard=localStorage.getItem('engbook_v78_onboarded')??localStorage.getItem('engbook_v77_onboarded')??localStorage.getItem('engbook_v76_onboarded')??localStorage.getItem('engbook_v75_onboarded')??localStorage.getItem('engbook_v74_onboarded')??localStorage.getItem('engbook_v73_onboarded')??localStorage.getItem('engbook_v72_onboarded')??localStorage.getItem('engbook_v71_onboarded')??localStorage.getItem('engbook_v70_onboarded')??localStorage.getItem('engbook_v69_onboarded')??localStorage.getItem('engbook_v68_onboarded')??localStorage.getItem('engbook_v67_onboarded')??localStorage.getItem('engbook_v66_onboarded')??localStorage.getItem('engbook_v65_onboarded')??localStorage.getItem('engbook_v64_onboarded')??localStorage.getItem('engbook_v63_onboarded')??localStorage.getItem('engbook_v62_onboarded')??localStorage.getItem('engbook_v61_onboarded')??localStorage.getItem('engbook_v60_onboarded')??localStorage.getItem('engbook_v59_onboarded')??localStorage.getItem('engbook_v58_onboarded')??localStorage.getItem('engbook_v57_onboarded')??localStorage.getItem('engbook_v56_onboarded')??localStorage.getItem('engbook_v55_onboarded')??localStorage.getItem('engbook_v54_onboarded')??localStorage.getItem('engbook_v53_onboarded')??localStorage.getItem('engbook_v52_onboarded')??localStorage.getItem('engbook_v51_onboarded')??localStorage.getItem('engbook_v50_onboarded')??localStorage.getItem('engbook_v49_onboarded')??localStorage.getItem('engbook_v48_onboarded')??localStorage.getItem('engbook_v47_onboarded')??localStorage.getItem('engbook_v46_onboarded')??localStorage.getItem('engbook_v45_onboarded')??localStorage.getItem('engbook_v44_onboarded')??localStorage.getItem('engbook_v43_onboarded')??localStorage.getItem('engbook_v42_onboarded')??localStorage.getItem('engbook_v41_onboarded')??localStorage.getItem('engbook_v40_onboarded')??localStorage.getItem('engbook_v39_onboarded')??localStorage.getItem('engbook_v38_onboarded')??localStorage.getItem('engbook_v37_onboarded')??localStorage.getItem('engbook_v36_onboarded')??localStorage.getItem('engbook_v35_onboarded')??localStorage.getItem('engbook_v34_onboarded')??localStorage.getItem('engbook_v33_onboarded')??localStorage.getItem('engbook_cat01_v32_onboarded');if(oldOnboard!==null)localStorage.setItem(ONBOARD_KEY,oldOnboard);}}catch(e){}
const ACTIVE_LESSON = 1;

const PRACTICE_ITEMS = [
  {text:'They are holding hands.',kind:'fact',note:'Their joined hands are directly visible.'},
  {text:'The sun is low over the water.',kind:'fact',note:'The low sun and its reflection are visible.'},
  {text:'They are celebrating an anniversary.',kind:'inference',note:'No anniversary evidence is visible.'},
  {text:'They are on vacation.',kind:'inference',note:'Vacation is possible, but the image does not prove it.'},
  {text:'Both people are barefoot.',kind:'fact',note:'Their bare feet are directly visible.'},
  {text:'The woman may be tired from the day.',kind:'inference',note:'That is a possible story extension, not a visible fact.'}
];

const BUILDER_SENTENCES = [
  ['They seem to get along well','because','their body language is relaxed.'],
  ['They are walking together','on a quiet beach','in warm low-angle light.'],
  ['The image does not show','when they grew close','or how long they have known each other.']
];

const COACH_KEYWORDS = [
  ['beach','beach'],['sunset','sunset'],['holding hands','holding hand'],['white dress','white dress'],
  ['shallow water','shallow water'],['ocean','ocean'],['palm trees','palm'],['walking','walk']
];
const DEFAULT_SCENE_COVERAGE_ANCHORS = [
  {key:'pair',label:'two people',group:'People',x:30,y:30,weight:5,terms:['two people','two adults','two young adults','young adults','a couple','couple','a pair','pair of people']},
  {key:'man',label:'man',group:'People',x:24,y:27,weight:5,terms:['man','young man','male adult']},
  {key:'woman',label:'woman',group:'People',x:35,y:34,weight:5,terms:['woman','young woman','lady','female adult']},
  {key:'white-dress',label:'white dress',group:'Appearance',x:38,y:43,weight:4,terms:['white dress','flowing white dress','long white dress','dress']},
  {key:'light-shirt',label:'light shirt',group:'Appearance',x:22,y:38,weight:3,terms:['light shirt','white shirt','pale shirt','button up shirt','button-up shirt']},
  {key:'rolled-trousers',label:'rolled trousers',group:'Appearance',x:25,y:61,weight:3,terms:['rolled trousers','rolled pants','rolled up pants','rolled-up pants','rolled up trousers','rolled-up trousers','pants rolled','trousers rolled']},
  {key:'barefoot',label:'barefoot',group:'Appearance',x:31,y:79,weight:5,terms:['barefoot','bare feet','without shoes','no shoes']},
  {key:'holding-hands',label:'holding hands',group:'Action',x:31,y:55,weight:7,terms:['holding hands','hold hands','hand in hand','joined hands','hands are joined']},
  {key:'walking',label:'walking',group:'Action',x:31,y:68,weight:7,terms:['walking','walk along','walk on','walk through','strolling','stroll along','taking a walk']},
  {key:'leaning',label:'leaning together',group:'Action',x:36,y:29,weight:6,terms:['leaning','leans against','lean against','head on his shoulder','head against his shoulder','resting her head','rests her head','close together']},
  {key:'beach',label:'beach / shoreline',group:'Setting',x:12,y:66,weight:6,terms:['beach','shoreline','shore','coastline']},
  {key:'shallow-water',label:'shallow water',group:'Setting',x:35,y:78,weight:5,terms:['shallow water','waterline','edge of the sea','edge of the ocean','ankle deep water','ankle-deep water']},
  {key:'wet-sand',label:'wet sand',group:'Setting',x:18,y:84,weight:4,terms:['wet sand','reflective sand','sand']},
  {key:'ocean',label:'ocean / sea',group:'Setting',x:78,y:59,weight:6,terms:['ocean','sea','open water']},
  {key:'palm-trees',label:'palm trees',group:'Setting',x:7,y:22,weight:5,terms:['palm tree','palm trees','palms','palm lined','palm-lined']},
  {key:'sunset',label:'low sun',group:'Light',x:66,y:41,weight:6,terms:['sunset','sun is setting','setting sun','low sun','sun sits low','sun is low']},
  {key:'reflection',label:'sun reflection',group:'Light',x:67,y:61,weight:4,terms:['reflection','reflects on the water','reflecting on the water','reflects across the water','reflects across the sea','reflection on the sea','reflection on the water','light on the water','sunlight on the water','vertical reflection']},
  {key:'horizon',label:'horizon',group:'Setting',x:78,y:42,weight:3,terms:['horizon','flat horizon']},
  {key:'waves-foam',label:'gentle waves / foam',group:'Setting',x:51,y:79,weight:3,terms:['gentle waves','small waves','waves','white foam','foam','shore break']},
  {key:'footprints',label:'footprints',group:'Detail',x:19,y:76,weight:3,terms:['footprints','footprint','foot impressions','foot impression']},
  {key:'warm-light',label:'warm golden light',group:'Light',x:60,y:21,weight:5,terms:['warm light','golden light','golden hour','golden-hour','orange pink','orange and pink','pink and orange','coral light','peach light','warm colors','warm colours']}
];
const COVERAGE_GROUPS = ['People','Appearance','Action','Setting','Light','Detail'];
function activeLessonId(){return Number(state?.lesson?.id||ACTIVE_LESSON||1);}
function activeGold(){try{return window.EngBookContent?.getPack?.(activeLessonId())?.content||GOLD_LESSON_01;}catch(e){return GOLD_LESSON_01;}}
function hotspotDetail(h,content=activeGold()){
  const byId=content?.hotspotDetailsById||{},legacy=content?.hotspotDetails||{},detail=byId[h?.id]||legacy[h?.en]||{};
  const reviewed=content?.picturePractice?.hotspotsById?.[h?.id];
  if(!reviewed)return detail;
  return {...detail,phrase:reviewed.phrases[0].text,collocations:reviewed.phrases.map(row=>row.text),grammar:reviewed.grammar[0].sentence,grammarFocus:reviewed.grammar[0].pattern,tenseLadder:reviewed.grammar};
}
function displayCollocations(detail){return (Array.isArray(detail?.collocations)?detail.collocations:[]).filter(value=>typeof value==='string'&&value.trim()&&!/[\u0600-\u06ff]/.test(value));}
function activeCoverageAnchors(){try{const a=window.EngBookContent?.getPack?.(activeLessonId())?.coverageAnchors;if(Array.isArray(a)&&a.length)return a;}catch(e){}return DEFAULT_SCENE_COVERAGE_ANCHORS;}

/* ===== v0.10 EVIDENCE ENGINE — Lesson 01 scene-specific rules =====
   This is deliberately an evidence-control layer, not a general-purpose truth detector.
   It is grounded in the image-verified facts, confidence-coded inference, and guardrails of Lesson 01. */
const EVIDENCE_CAUTION_TERMS = ['may','might','could','seems','seem','appears','appear','probably','likely','perhaps','possibly','suggests','suggest','looks like','look like'];
const EVIDENCE_CERTAINTY_TERMS = ['definitely','certainly','obviously','for sure','without doubt','must be','clearly proves'];
const EVIDENCE_SUBJECTIVE_TERMS = ['beautiful','romantic','peaceful','lovely','amazing','intimate','happy','sad','tired','worried','enjoying','in love'];
const EVIDENCE_CONTRADICTIONS = [
  {key:'wrong-action',re:/\b(sitting|running|swimming|dancing|driving|cycling|sleeping|kissing|hugging|arguing|fighting|crying|shouting|eating|drinking|reading|taking photos|photographing)\b/i,label:'action not visible',reason:'The image shows the pair walking slowly, not this action.'},
  {key:'wrong-weather',re:/\b(raining|rainy|storm|stormy|snow|snowing|foggy|nighttime|at night)\b/i,label:'weather/time not visible',reason:'The frame shows dry, calm conditions with low warm light; rain, snow, storm, or night is not visible.'},
  {key:'wrong-clothing',re:/\b(black dress|red dress|blue dress|black shirt|red shirt|wearing shoes|wears shoes|sneakers|boots)\b/i,label:'appearance conflict',reason:'The woman wears a white dress; the man wears a light shirt; both are barefoot.'},
  {key:'wrong-setting',re:/\b(city|street|mountain|forest|restaurant|airport|classroom|car|vehicle)\b/i,label:'setting conflict',reason:'The visible setting is a palm-lined beach beside calm open water.'},
  {key:'wrong-people',re:/\b(three people|four people|children|child|baby|crowd)\b/i,label:'people-count conflict',reason:'Two young adults are clearly visible in the immediate scene.'},
  {key:'invented-object',re:/\b(camera|phone|smartphone|laptop|umbrella|surfboard|boat)\b/i,label:'object not established',reason:'That object is not established by the Lesson 01 image evidence.'}
];
const EVIDENCE_HARD_UNSUPPORTED = [
  {key:'legal-status',re:/\b(married|marriage|husband|wife|engaged|engagement|fianc[eé]e?|honeymoon|anniversary)\b/i,label:'relationship / occasion status',reason:'The frame supports affection and closeness, but not marriage, engagement, honeymoon, anniversary, or legal status.',repair:'The pair appear close and affectionate, but their exact relationship status or occasion is not visible.'},
  {key:'exact-place',re:/\b(hawaii|maldives|bali|thailand|greece|italy|spain|miami|caribbean|dubai|turkey|iran|america|usa|united states)\b/i,label:'exact location',reason:'The image supports a beach setting, but not a country, city, resort, or destination.',repair:'They are walking along a palm-lined beach; the exact location is unknown.'},
  {key:'identity-origin',re:/\b(american|british|iranian|turkish|french|italian|asian|european|arab|christian|muslim|jewish)\b/i,label:'identity / origin',reason:'Ethnicity, nationality, religion, and identity cannot be established from this image.',repair:'Describe visible appearance and clothing instead of assigning identity or origin.'},
  {key:'occupation',re:/\b(doctor|teacher|engineer|lawyer|student|model|photographer|tourist)\b/i,label:'occupation / role',reason:'The image does not establish either person’s occupation or formal role.',repair:'Refer to them as a man and a woman / two young adults unless a role is directly supported.'},
  {key:'exact-age',re:/\b\d{1,2}\s*(?:years? old|year-old)\b/i,label:'exact age',reason:'Only an approximate age group is visually supportable.',repair:'They appear to be young adults; exact ages are not visible.'},
  {key:'exact-weather-data',re:/\b\d{1,3}\s*(?:degrees?|°|celsius|fahrenheit)\b/i,label:'exact weather data',reason:'Exact temperature is not available from a still image.',repair:'The warm low-angle light and dry scene suggest mild, calm conditions; exact temperature is unknown.'},
  {key:'exact-clock',re:/\b(?:at\s*)?\d{1,2}:\d{2}\b/i,label:'exact clock time',reason:'The frame supports a very low sun and warm low-angle light, not an exact clock time.',repair:'The sun is visibly low, but the still image does not prove whether it is sunrise or sunset; the exact time is unknown.'}
];
const EVIDENCE_INFERENCE_RULES = [
  {key:'affection',re:/\b(affectionate|affection|close relationship|close to each other|closeness|romantic|intimate|in love)\b/i,confidence:'HIGH',reason:'Joined hands, leaning contact, smiles, and close body position strongly support affection/closeness.',support:['holding-hands','leaning','pair']},
  {key:'sunset-time',re:/\b(sunset|late afternoon|evening|golden hour|dusk)\b/i,confidence:'MEDIUM',reason:'A very low sun and warm orange-pink light are compatible with sunset, but the still image could also fit sunrise; exact time of day is not established.',support:['sunset','reflection','warm-light']},
  {key:'relaxed',re:/\b(relaxed|calm mood|quiet mood|peaceful|tranquil|unhurried)\b/i,confidence:'MEDIUM',reason:'Gentle waves, relaxed facial expressions, and slow-looking body language support a calm reading.',support:['waves-foam','leaning','walking']},
  {key:'enjoyment',re:/\b(enjoying|having a good time|happy|content)\b/i,confidence:'MEDIUM',reason:'Smiles and physical closeness can support a positive reading, but exact emotion is not directly measurable.',support:['pair','holding-hands','leaning']},
  {key:'vacation',re:/\b(vacation|holiday|trip|traveling|travelling|special occasion|celebrating)\b/i,confidence:'LOW',reason:'A leisure or special-occasion story is possible, but no specific trip or occasion is visible.',support:['beach','pair']},
  {key:'tired',re:/\b(tired|exhausted)\b/i,confidence:'LOW',reason:'The woman leans toward the man, but tiredness is only one possible explanation.',support:['leaning']},
  {key:'timeline',re:/\b(before|earlier|next|later|afterward|afterwards|continue|stop to watch|might leave|may leave|could leave)\b/i,confidence:'LOW',reason:'Before/next events extend beyond the frozen frame and must remain explicitly hypothetical.',support:['walking','sunset']},
  {key:'subjective',re:/\b(beautiful|lovely|amazing)\b/i,confidence:'LOW',reason:'Aesthetic judgments are personal interpretations rather than directly verifiable visual facts.',support:['beach','sunset','warm-light']}
];

const EVIDENCE_DIRECT_RULES = [
  {key:'smiles',re:/\b(smile|smiles|smiling)\b/i,reason:'Soft smiles are visible on the two subjects.',support:['pair']},
  {key:'rolled-sleeves',re:/\b(rolled sleeves|sleeves rolled|rolled to the forearms)\b/i,reason:'The man’s long shirt sleeves are visibly rolled to the forearms.',support:['man','light-shirt']},
  {key:'necklace',re:/\b(necklace\b|wearing a necklace)\b/i,reason:'A delicate necklace is visible on the woman.',support:['woman','white-dress']},
  {key:'hair',re:/\b(dark wavy hair|brown hair|hair pulled back|pulled back hair)\b/i,reason:'The subjects’ visible hair color/style supports this description.',support:['man','woman']},
  {key:'gaze',re:/\b(looks? down|looking down|looks? toward the woman|looking toward the woman|woman looks? downward)\b/i,reason:'The man’s gaze angles toward the woman, while the woman looks downward.',support:['man','woman','leaning']},
  {key:'no-others',re:/\b(no other people|only two people|only two adults)\b/i,reason:'No other people are visible in the immediate beach scene.',support:['pair']},
  {key:'composition',re:/\b(left third|right side of the frame|open water fills the right|couple occupies the left)\b/i,reason:'The two adults are positioned toward the left third while the low sun and open water fill much of the right side.',support:['pair','ocean','sunset']},
  {key:'dry-calm',re:/\b(dry weather|calm weather|excellent visibility|clear visibility)\b/i,reason:'The frame visibly shows dry conditions, excellent visibility, and no strong wind/storm evidence.',support:['warm-light','waves-foam']}
];

const CONVERSATION_MISSIONS = [
  {label:'OPEN THE SCENE', prompt:'What do you notice first when you look at this picture?', hint:'Start with the setting, then mention one or two clear visual details.', focus:'overview'},
  {label:'DESCRIBE THE ACTION', prompt:'What exactly are the two people doing?', hint:'Describe the visible movement first, then add one relationship phrasal verb only if it stays evidence-safe.', focus:'action'},
  {label:'READ THE BODY LANGUAGE', prompt:'What does their body language suggest? Separate what you can see from what you infer.', hint:'Use a cautious phrase such as “It seems…”, “They may…”, or “This suggests…”.', focus:'inference'},
  {label:'EXTEND THE MOMENT', prompt:'What might have happened before this moment, and what could happen next?', hint:'Use before / now / next, and keep imagined details clearly uncertain.', focus:'timeline'}
];
const CONVERSATION_MODE_CONFIG = {
  guided:{label:'Guided',turns:4,sub:'Scaffolded feedback after every turn',hint:true},
  natural:{label:'Natural',turns:5,sub:'Less prompting, more spontaneous follow-up',hint:false},
  challenge:{label:'Challenge',turns:6,sub:'Minimal support and faster follow-ups',hint:false}
};
const NATURAL_PROMPTS = [
  {label:'OPEN NATURALLY',prompt:'Describe the scene as if I cannot see the picture. What should I picture first?',hint:'Give the setting, people, and one action.',focus:'overview'},
  {label:'MAKE IT VISUAL',prompt:'Where are the important details located in the frame?',hint:'Use left, right, foreground, background, beside, or along.',focus:'spatial'},
  {label:'CONNECT ACTIONS',prompt:'What is happening at the same time in this moment?',hint:'Link the visible actions naturally; the lesson target is relationship phrasal verbs, not invented history.',focus:'action'},
  {label:'INTERPRET CAREFULLY',prompt:'What can you reasonably infer from their body language, and what can you not know for sure?',hint:'Use seems, may, might, or suggests.',focus:'inference'},
  {label:'KEEP TALKING',prompt:'Continue the scene for another two or three sentences without repeating yourself.',hint:'Move to light, atmosphere, or a cautious next step.',focus:'extension'}
];
const CHALLENGE_PROMPTS = [
  {label:'NO PREP',prompt:'Give me your strongest opening sentence for this image.',hint:'',focus:'overview'},
  {label:'ZOOM IN',prompt:'Add two details you did not mention in your opening.',hint:'',focus:'detail'},
  {label:'ACTION LINK',prompt:'Connect two visible actions in one natural sentence.',hint:'',focus:'action'},
  {label:'EVIDENCE CHECK',prompt:'Tell me one fact and one inference without mixing them together.',hint:'',focus:'inference'},
  {label:'SCENE FLOW',prompt:'Move from foreground to background in two or three sentences.',hint:'',focus:'spatial'},
  {label:'FINAL TURN',prompt:'End with a cautious before-or-next idea, then summarize the atmosphere.',hint:'',focus:'timeline'}
];
const OUTLINE_SLOTS = [
  ['setting','SETTING','Where are they?'],['people','PEOPLE','Who is visible?'],['action','ACTION','What is happening?'],['environment','ENVIRONMENT','Light, weather, space'],['inference','INFERENCE','One cautious interpretation']
];
const DAILY_GOAL = 100;


const ACTION_LENS = [
  {x:31,y:63,label:'walking',sub:'visible action'},
  {x:31,y:55,label:'holding hands',sub:'visible action'},
  {x:39,y:34,label:'leaning',sub:'body language'},
  {x:24,y:30,label:'looking toward',sub:'gaze clue'}
];
const COMPOSITION_LENS = [
  {x:18,y:82,label:'FOREGROUND',sub:'wet sand • foam • bare feet'},
  {x:25,y:45,label:'MIDDLE GROUND',sub:'couple • shoreline • palms'},
  {x:75,y:30,label:'BACKGROUND',sub:'sun • horizon • open water'}
];
const MOTION_LENS = [
  {x:31,y:72,type:'walk',label:'walking path',sub:'step-by-step movement'},
  {x:31,y:55,type:'contact',label:'joined hands',sub:'visible contact'},
  {x:72,y:45,type:'light',label:'sun reflection',sub:'vertical light path'}
];
const PRONUNCIATION_GUIDE = {
  'man':{chunks:['man'],stress:0,tip:'Keep the vowel open and short: /mæ n/ without adding another syllable.'},
  'woman':{chunks:['wom','an'],stress:0,tip:'Stress the first syllable: WOM-an. The second syllable is weak.'},
  'sun':{chunks:['sun'],stress:0,tip:'Use a short central vowel /ʌ/ and finish with a clear /n/.'},
  'ocean':{chunks:['o','cean'],stress:0,tip:'Stress the first syllable: O-cean. The middle sound is /ʃ/.'},
  'palm tree':{chunks:['palm','tree'],stress:1,tip:'Keep both words connected; make tree clear with a long /iː/.'},
  'beach':{chunks:['beach'],stress:0,tip:'Hold the long /iː/ slightly: beach, not “bitch”.'},
  'hand':{chunks:['hand'],stress:0,tip:'Keep the /h/ audible and use the open /æ/ vowel.'}
};
const SPATIAL_TERMS = ['left','right','foreground','background','middle ground','beside','behind','in front','along','near','across','on the left','on the right','shoreline'];
const CAUTION_TERMS = ['may','might','could','seems','appears','probably','likely'];
const SEQUENCE_TERMS = ['while','before','now','next','then','after','finally','first'];

let state = {
  screen:'home', lesson:null, mode:'explore', selected:null, hints:false, photoFocus:false, sceneIntro:false,
  wordDepth:'phrase', tapFeedback:null, discoverCelebration:false, scanMode:'off', photoZoom:1,
  viewer:{scale:1,tx:0,ty:0,sheet:'collapsed',interacting:false,lastTap:0},
  v60AnchorLabel:null,v60CardOpen:false,v60GrammarOpen:false,
  learnSection:'evidence', l01JourneyStep:'overview',
  practiceType:'find', practiceTarget:null, practiceRound:0, practiceCorrect:0, practiceLocked:false, practiceMsg:'', practiceMistakes:0,
  practiceLessonId:null,practiceTotal:5,practiceReviewedIds:[],practiceFirstTry:0,practiceHintUsed:false,practiceHintCount:0,
  factIndex:0, factAnswered:null, factScore:0,
  builderIndex:0, builderAvailable:[], builderChosen:[], builderResult:'',
  speakingDuration:30, speakingSeconds:30, speakingRunning:false, recording:false, recorder:null, chunks:[], recordedUrl:null,
  listening:false, recognition:null, transcript:'', level:'B1–B2',
  onboardingOpen:false,onboardingStep:0,peek:false,
  pronMode:'word',pronListening:false,pronRecognition:null,pronResult:null,
  conversationTurn:0,conversationResponses:[],conversationInput:'',conversationListening:false,conversationRecognition:null,conversationFeedback:null,conversationHint:false,conversationComplete:false,conversationMode:'guided',conversationMission:'listener',handsFree:false,voiceStage:'idle',coachHelp:false,explainRepair:false,retryOriginal:null,sessionReplayOpen:false,
  outlineSelected:['setting','people','action'],compareOpen:false,repairSprintOpen:false,
  blindDescribe:false, coverageOverlay:true, coverageReview:false, coverageLiveHits:[],
  evidenceLive:true,evidenceSelected:null,evidenceShowAll:false
};
let timerId = null;
let toastTimer = null;
let suppressStageClickUntil = 0;

function esc(s){return String(s ?? '').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function q(s){const v=String(s ?? '').replaceAll('\\','\\\\').replaceAll("'","\\'");return v.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function clamp(n,a,b){return Math.max(a,Math.min(b,n));}
function icon(name, cls=''){
  const p={
    home:'<path d="M3 11.5 12 4l9 7.5v8a1.5 1.5 0 0 1-1.5 1.5h-5v-6h-5v6h-5A1.5 1.5 0 0 1 3 19.5z"/>',
    back:'<path d="m15 18-6-6 6-6"/>', compass:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8z"/>',
    book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22zM20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22z"/>',
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
    mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/>',
    volume:'<path d="M5 10v4h4l5 4V6l-5 4zM17 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>',
    hint:'<path d="M9 18h6M10 22h4M8.2 14.5A6 6 0 1 1 15.8 14.5c-.9.7-1.3 1.4-1.4 2.5h-4.8c-.1-1.1-.5-1.8-1.4-2.5z"/>',
    expand:'<path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/>',
    close:'<path d="m6 6 12 12M18 6 6 18"/>', star:'<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.9-5.4 2.9 1-6-4.4-4.3 6.1-.9z"/>',
    check:'<path d="m5 12 4 4L19 6"/>', play:'<path d="m8 5 11 7-11 7z"/>', refresh:'<path d="M20 7v5h-5M4 17v-5h5"/><path d="M18.2 9A7 7 0 0 0 6 6.2L4 9M5.8 15A7 7 0 0 0 18 17.8L20 15"/>',
    eye:'<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"/><circle cx="12" cy="12" r="2.5"/>',
    spark:'<path d="m12 2 1.2 4.2L17 8l-3.8 1.8L12 14l-1.2-4.2L7 8l3.8-1.8zM19 14l.7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7z"/>',
    layers:'<path d="m12 3 9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/>',
    chevron:'<path d="m9 6 6 6-6 6"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
    lock:'<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    reset:'<path d="M4 4v6h6M20 20v-6h-6"/><path d="M5.5 15A7 7 0 0 0 18 17.5M18.5 9A7 7 0 0 0 6 6.5"/>'
  };
  return `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p[name]||p.spark}</svg>`;
}

function defaultProgress(){return {discovered:{},savedWords:[],savedWordRecords:[],savedLines:[],personalMarks:[],userLibrary:{bookmarkedLessons:[],bookmarkRecords:[],notes:[]},completed:{},practice:{correct:0,attempts:0,bestStreak:0,streak:0},speakingAttempts:0,lastLesson:1,mastery:{},pronunciation:{},mistakes:[],momentum:{date:'',points:0,days:0,lastDate:''},conversation:{turns:0,completed:0,best:0,history:[],modeRuns:{guided:0,natural:0,challenge:0},missionRuns:{listener:0,detective:0,story:0}},coverage:{best:0,last:0,runs:0,groups:{}},evidence:{best:0,last:0,runs:0,safeClaims:0,unsupported:0,repairs:0},timeline:{best:0,last:0,runs:0,repairs:0,branchRuns:0,history:[]},activity:{discoveries:0,recalls:0,pron:0,speaks:0,conversations:0},lastSpeechScore:0};}
function safeParseProgress(raw){if(!raw)return null;try{const v=JSON.parse(raw);return v&&typeof v==='object'&&!Array.isArray(v)?v:null;}catch(e){return null;}}
function progressDefaultsV21(){
  const base=defaultProgress();
  return {...base,schemaVersion:PROGRESS_SCHEMA_VERSION,build:BUILD_INFO.tag,
    lessonMetrics:{},
    reconstruction:{best:0,last:0,runs:0,clarifications:0,bestCoverage:0},
    grammar:{best:0,last:0,runs:0,actions:0,connections:0,spatial:0,guardrail:0,history:[]},
    camera:{best:0,last:0,runs:0,trackBest:{human:0,shore:0,light:0},history:[]},
    levelLadder:{attempts:{a1:0,b1:0,c1:0},best:{a1:0,b1:0,c1:0},last:{a1:0,b1:0,c1:0},answers:{a1:'',b1:'',c1:''},history:[]},
    fingerprint:{snapshots:[],views:0,lastViewed:0},
    customScene:{created:0,practiceRuns:0,bestCoverage:0,evidenceRuns:0,talkTurns:0,exports:0},
    product:{sessions:0,lastSession:0,sessionStage:0,sessionActive:false,minutes:0}
  };
}
function migrateProgressV21(src){
  const b=progressDefaultsV21(),raw=src&&typeof src==='object'?src:{},x=window.EngBookSecurity?.sanitizeProgress?.(raw)||raw;
  const arr=v=>Array.isArray(v)?v:[];
  const obj=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
  const migrated={...b,...x,schemaVersion:PROGRESS_SCHEMA_VERSION,build:BUILD_INFO.tag,
    discovered:obj(x.discovered),completed:obj(x.completed),mastery:obj(x.mastery),pronunciation:obj(x.pronunciation),
    savedWords:arr(x.savedWords),savedLines:arr(x.savedLines),personalMarks:arr(x.personalMarks),mistakes:arr(x.mistakes),
    practice:{...b.practice,...obj(x.practice)},momentum:{...b.momentum,...obj(x.momentum)},activity:{...b.activity,...obj(x.activity)},
    conversation:{...b.conversation,...obj(x.conversation),modeRuns:{...b.conversation.modeRuns,...obj(x.conversation?.modeRuns)},missionRuns:{...b.conversation.missionRuns,...obj(x.conversation?.missionRuns)},history:arr(x.conversation?.history)},
    coverage:{...b.coverage,...obj(x.coverage),groups:{...b.coverage.groups,...obj(x.coverage?.groups)}},
    evidence:{...b.evidence,...obj(x.evidence)},timeline:{...b.timeline,...obj(x.timeline),history:arr(x.timeline?.history)},
    reconstruction:{...b.reconstruction,...obj(x.reconstruction)},grammar:{...b.grammar,...obj(x.grammar),history:arr(x.grammar?.history)},
    camera:{...b.camera,...obj(x.camera),trackBest:{...b.camera.trackBest,...obj(x.camera?.trackBest)},history:arr(x.camera?.history)},
    levelLadder:{...b.levelLadder,...obj(x.levelLadder),attempts:{...b.levelLadder.attempts,...obj(x.levelLadder?.attempts)},best:{...b.levelLadder.best,...obj(x.levelLadder?.best)},last:{...b.levelLadder.last,...obj(x.levelLadder?.last)},answers:{...b.levelLadder.answers,...obj(x.levelLadder?.answers)},history:arr(x.levelLadder?.history)},
    fingerprint:{...b.fingerprint,...obj(x.fingerprint),snapshots:arr(x.fingerprint?.snapshots)},
    customScene:{...b.customScene,...obj(x.customScene)},product:{...b.product,...obj(x.product)},lessonMetrics:obj(x.lessonMetrics),savedWordRecords:arr(x.savedWordRecords),userLibrary:obj(x.userLibrary)
  };
  return window.EngBookSyncRecords?.reconcileProgress?.(migrated)||migrated;
}
function loadProgress(){
  try{
    const current=safeParseProgress(localStorage.getItem(PROGRESS_KEY));
    if(current)return migrateProgressV21(current);
    let legacy=null,legacyKey='';
    for(const key of LEGACY_PROGRESS_KEYS){const candidate=safeParseProgress(localStorage.getItem(key));if(candidate){legacy=candidate;legacyKey=key;break;}}
    if(!legacy)return progressDefaultsV21();
    try{if(!localStorage.getItem(PROGRESS_BACKUP_KEY))localStorage.setItem(PROGRESS_BACKUP_KEY,JSON.stringify({sourceKey:legacyKey,at:Date.now(),progress:legacy}));}catch(e){}
    const migrated=migrateProgressV21(legacy);
    try{localStorage.setItem(PROGRESS_KEY,JSON.stringify(migrated));}catch(e){}
    return migrated;
  }catch(e){return progressDefaultsV21();}
}
let progress=loadProgress();
function saveProgress(){
  try{progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=BUILD_INFO.tag;progress.localUpdatedAt=Date.now();window.EngBookSyncRecords?.reconcileProgress?.(progress);if(window.EngAppLocalData?.hasIndexedDB?.()){window.EngAppLocalData.putProgress(progress).catch(e=>window.dispatchEvent?.(new CustomEvent('engbook:storage-error',{detail:{message:String(e?.message||e)}})));try{localStorage.setItem('engapp_progress_bootstrap',JSON.stringify({schemaVersion:progress.schemaVersion,build:progress.build,lastLesson:progress.lastLesson,updatedAt:progress.localUpdatedAt}));}catch(_){}}else localStorage.setItem(PROGRESS_KEY,JSON.stringify(progress));return true;}
  catch(e){try{window.dispatchEvent(new CustomEvent('engbook:storage-error',{detail:{message:String(e?.message||e)}}));}catch(_){}return false;}
}
async function hydrateIndexedProgress(){
  if(!window.EngAppLocalData?.hydrateProgress)return false;try{const durable=await window.EngAppLocalData.hydrateProgress(progress);if(durable?.progress){const merged=window.EngBookBackend?.mergeProgress?window.EngBookBackend.mergeProgress(durable.progress,progress):durable.progress;progress=migrateProgressV21(merged);progress.localUpdatedAt=Math.max(Number(progress.localUpdatedAt)||0,Number(durable.updatedAt)||0);await window.EngAppLocalData.putProgress(progress);for(const k of [PROGRESS_KEY,...LEGACY_PROGRESS_KEYS])try{localStorage.removeItem(k);}catch(_){}try{state?.screen==='home'?renderHome?.():render?.();}catch(_){}return true;}}catch(e){try{window.dispatchEvent(new CustomEvent('engbook:storage-error',{detail:{message:String(e?.message||e)}}));}catch(_){}}return false;
}
window.addEventListener?.('load',()=>setTimeout(hydrateIndexedProgress,0));
function discoveredSet(){return new Set(progress.discovered[activeLessonId()]||[]);}
function masteryRecord(word){return progress.mastery[word]||{seen:0,correct:0,wrong:0,last:0};}
function touchMastery(word){const r=masteryRecord(word);r.seen=Math.min(8,(r.seen||0)+1);r.last=Date.now();progress.mastery[word]=r;}
function recallMastery(word,ok){const r=masteryRecord(word);ok?r.correct++:r.wrong++;r.last=Date.now();progress.mastery[word]=r;}
function masteryScore(word){const r=masteryRecord(word);const seen=Math.min(24,(r.seen||0)*8),recall=Math.min(64,(r.correct||0)*22),penalty=Math.min(30,(r.wrong||0)*9),saved=isSaved(word)?8:0;return clamp(Math.round(seen+recall+saved-penalty),0,100);}
function masteryLabel(word){const m=masteryScore(word);return m>=75?'Strong':m>=45?'Building':m>=15?'Seen':'New';}
function overallMastery(){const hs=(state.lesson||CAT01.lessons[0]).hotspots||[];return hs.length?Math.round(hs.reduce((a,h)=>a+masteryScore(h.en),0)/hs.length):0;}
function markDiscovered(word){const s=discoveredSet();const isNew=!s.has(word);s.add(word);progress.discovered[activeLessonId()]=[...s];touchMastery(word);if(isNew){progress.activity.discoveries=(progress.activity.discoveries||0)+1;awardPoints(5,'discover');}saveProgress();return isNew;}
function isSaved(word){return (progress.savedWords||[]).includes(word);}
function toggleSaved(word){const active=!(progress.savedWords||[]).includes(word);if(window.EngBookSyncRecords?.setSavedWord)window.EngBookSyncRecords.setSavedWord(progress,word,active);else{const s=new Set(progress.savedWords||[]);s.has(word)?s.delete(word):s.add(word);progress.savedWords=[...s];}saveProgress();render();}
function markComplete(key){progress.completed[key]=true;saveProgress();haptic([20,20,35]);toast('Saved to your learning path');render();}
function completion(){
  const d=discoveredSet().size/activeHotspotCount();
  const steps=['explore','evidence','practice','speaking','talk'].filter(k=>progress.completed[`l1_${k}`]).length/5;
  return clamp(Math.round((d*.5+steps*.5)*100),0,100);
}
function haptic(pattern=18){try{navigator.vibrate?.(pattern);}catch(e){}}
function speak(text, rate=.86,options={}){return window.EngBookSpeech.speak(text,{...options,rate,onError:()=>toast('Speech is not available on this device.')});}

function localDateKey(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function dayDiff(a,b){if(!a||!b)return 99;const A=new Date(a+'T12:00:00'),B=new Date(b+'T12:00:00');return Math.round((B-A)/86400000);}
function ensureMomentum(){const today=localDateKey(),m=progress.momentum||{};if(m.date!==today){const gap=dayDiff(m.date,today);m.days=gap===1?Math.max(1,(m.days||0)+1):1;m.lastDate=m.date||'';m.date=today;m.points=0;progress.momentum=m;saveProgress();}return m;}
function awardPoints(points,action='practice'){const m=ensureMomentum();m.points=Math.min(DAILY_GOAL*2,(m.points||0)+points);progress.momentum=m;saveProgress();}
function momentumPct(){const m=ensureMomentum();return clamp(Math.round((m.points||0)/DAILY_GOAL*100),0,100);}
function reviewIntervalMs(word){const r=masteryRecord(word),m=masteryScore(word);if(!r.last)return 0;return m<25?15*60000:m<50?6*3600000:m<75?24*3600000:72*3600000;}
function isDue(word){const r=masteryRecord(word);return !r.last || Date.now()-r.last>=reviewIntervalMs(word);}
function dueAnchors(){return (state.lesson||CAT01.lessons[0]).hotspots.filter(h=>isDue(h.en));}
function reviewDueLabel(word){const r=masteryRecord(word),ms=reviewIntervalMs(word);if(!r.last||Date.now()-r.last>=ms)return 'Due now';const left=Math.max(0,ms-(Date.now()-r.last));if(left<3600000)return `in ${Math.max(1,Math.ceil(left/60000))}m`;if(left<86400000)return `in ${Math.ceil(left/3600000)}h`;return `in ${Math.ceil(left/86400000)}d`;}
function recordMistake(type,key,prompt,correct,note=''){const arr=progress.mistakes||[];const existing=arr.findIndex(m=>m.type===type&&m.key===key);const item={type,key,prompt,correct,note,count:existing>=0?(arr[existing].count||1)+1:1,ts:Date.now()};if(existing>=0)arr.splice(existing,1);arr.unshift(item);progress.mistakes=arr.slice(0,16);saveProgress();}
function resolveMistakes(type,key){progress.mistakes=(progress.mistakes||[]).filter(m=>!(m.type===type&&m.key===key));saveProgress();}
function skillProfile(){const d=Math.round(discoveredSet().size/activeHotspotCount()*100);const recall=progress.practice.attempts?Math.round(progress.practice.correct/progress.practice.attempts*100):0;const evidence=Math.max(progress.evidence?.best||0,progress.completed.l1_evidence?72:(progress.completed.l1_practice?50:20));const description=Math.min(100,Math.max(progress.lastSpeechScore||0,progress.coverage?.best||0,(progress.speakingAttempts||0)*18));const conv=Math.min(100,Math.max(progress.conversation?.best||0,(progress.conversation?.turns||0)*12));return [['Observation',d],['Vocabulary',overallMastery()],['Recall',recall],['Description',description],['Conversation',conv],['Evidence',evidence]];}
function recommendedAction(){const mistakes=(progress.mistakes||[]).length,due=dueAnchors().length;if(mistakes)return {title:'Repair recent mistakes',body:`${mistakes} item${mistakes===1?'':'s'} waiting in Mistake Repair.`,mode:'practice',practice:'mistakes'};if(due)return {title:'Run a 2-minute smart review',body:`${due} visual anchor${due===1?' is':'s are'} due for retrieval.`,mode:'practice',practice:'smart'};if(!(progress.speakingAttempts||0))return {title:'Make your first 60-second description',body:'Describe the image before comparing with a model.',mode:'speak'};if(!(progress.conversation?.completed||0))return {title:'Turn description into conversation',body:'Answer four image-based follow-up questions out loud.',mode:'talk'};return {title:'Cold Describe challenge',body:'Try the image for 60 seconds with no prompts or word bank.',mode:'speak',blind:true};}
function openRecommended(){const r=recommendedAction();openLesson(1);state.mode=r.mode;if(r.practice)setPractice(r.practice);if(r.blind)startBlindDescribe();render();}

function pronRecord(word){return progress.pronunciation[word]||{hear:false,say:false,use:false,best:0,lastText:''};}
function savePronRecord(word,patch){progress.pronunciation[word]={...pronRecord(word),...patch};saveProgress();}
function pronMissionScore(word){const r=pronRecord(word);return [r.hear,r.say,r.use].filter(Boolean).length;}
function pronounceHear(word,text,rate=.76){savePronRecord(word,{hear:true});speak(text,rate);render();}
function normalizeSpeech(s){return String(s||'').toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();}
function editDistance(a,b){a=normalizeSpeech(a);b=normalizeSpeech(b);const m=a.length,n=b.length,dp=Array(n+1).fill(0).map((_,j)=>j);for(let i=1;i<=m;i++){let prev=dp[0];dp[0]=i;for(let j=1;j<=n;j++){const old=dp[j];dp[j]=Math.min(dp[j]+1,dp[j-1]+1,prev+(a[i-1]===b[j-1]?0:1));prev=old;}}return dp[n];}
function recognitionSimilarity(target,heard){const a=normalizeSpeech(target),b=normalizeSpeech(heard);if(!a||!b)return 0;const char=Math.max(0,1-editDistance(a,b)/Math.max(a.length,b.length));const at=new Set(a.split(' ')),bt=new Set(b.split(' '));const overlap=[...at].filter(x=>bt.has(x)).length/Math.max(1,at.size);return Math.round((char*.7+overlap*.3)*100);}
function currentPronTarget(h){const ex=hotspotDetail(h);return state.pronMode==='phrase'?(ex.phrase||h.en):h.en;}
function stopPronRecognition(){if(state.pronRecognition){try{state.pronRecognition.stop();}catch(e){}state.pronRecognition=null;}state.pronListening=false;}
function startPronRecognition(word){
  const h=state.lesson.hotspots.find(x=>x.en===word);if(!h)return;
  const target=currentPronTarget(h),C=speechRecognitionCtor();
  if(!C){toast('Phrase matching needs browser speech recognition. You can still use Hear & Shadow.');return;}
  stopRecognition();stopPronRecognition();
  try{const r=new C();r.lang='en-US';r.continuous=false;r.interimResults=false;state.pronRecognition=r;state.pronListening=true;state.pronResult=null;render();
    r.onresult=e=>{const heard=Array.from(e.results).map(x=>x[0].transcript).join(' ').trim();const score=recognitionSimilarity(target,heard);state.pronResult={word,target,heard,score};savePronRecord(word,{say:true,best:Math.max(pronRecord(word).best||0,score),lastText:heard});state.pronListening=false;state.pronRecognition=null;haptic(score>=80?[16,22,30]:14);render();};
    r.onerror=()=>{state.pronListening=false;state.pronRecognition=null;toast('I could not capture that phrase. Try again a little closer to the microphone.');render();};
    r.onend=()=>{if(state.pronListening){state.pronListening=false;state.pronRecognition=null;render();}};
    r.start();
  }catch(e){state.pronListening=false;toast('Phrase matching could not start.');render();}
}
function setPronMode(mode){state.pronMode=mode;state.pronResult=null;render();}
function markPronUse(word,phrase){const was=pronRecord(word).use;savePronRecord(word,{use:true});if(!was){progress.activity.pron=(progress.activity.pron||0)+1;awardPoints(4,'pron-use');saveProgress();}microSpeak(word,phrase);}
function showOnboarding(step=0){state.onboardingStep=step;state.onboardingOpen=true;render();}
function closeOnboarding(){state.onboardingOpen=false;localStorage.setItem(ONBOARD_KEY,'1');render();}
function nextOnboarding(){if(state.onboardingStep>=3){closeOnboarding();return;}state.onboardingStep++;render();}
function prevOnboarding(){state.onboardingStep=Math.max(0,state.onboardingStep-1);render();}
function triggerPeek(){if(state.mode==='practice')return;suppressStageClickUntil=Date.now()+750;state.peek=true;haptic(12);render();setTimeout(()=>{if(state.peek){state.peek=false;render();}},1450);}

function topbar(){
  const steps=[['explore','Explore'],['learn','Evidence'],['practice','Recall'],['speak','Describe'],['talk','Converse']];
  return `<header class="topbar"><div class="topbar-inner"><button class="round-btn ghost" data-eng-v52-click="goHome()" aria-label="Back">${icon('back')}</button><div class="brand-lockup"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual English Studio</small></div></div><div class="journey-rail">${steps.map(([k,t],i)=>`<button data-eng-v52-click="setMode('${k}')" class="${state.mode===k?'active':''} ${progress.completed[`l1_${k==='learn'?'evidence':k==='speak'?'speaking':k}`]?'done':''}"><i>${progress.completed[`l1_${k==='learn'?'evidence':k==='speak'?'speaking':k}`]?icon('check'):i+1}</i><span>${t}</span></button>`).join('')}</div><button class="round-btn ghost help-btn" data-eng-v52-click="showOnboarding(0)" aria-label="Interaction guide">?</button><div class="top-progress"><div><span>Lesson</span><b>${completion()}%</b></div><div class="progress-line"><i style="width:${completion()}%"></i></div></div></div></header>`;
}

function bottomNav(){
  const items=[['explore','compass','Explore'],['learn','book','Learn'],['practice','target','Recall'],['speak','mic','Describe'],['talk','spark','Talk']];
  return `<nav class="bottom-nav">${items.map(([m,ic,t])=>`<button class="nav-item ${state.mode===m?'active':''}" data-eng-v52-click="setMode('${m}')">${icon(ic)}<span>${t}</span></button>`).join('')}</nav>`;
}

function renderHome(){
  clearTimer(); stopRecognition(); stopConversationRecognition(); state.screen='home'; state.lesson=null;
  const pct=completion();
  app.innerHTML=`<div class="app-shell home-shell">
    <header class="home-top"><div class="brand-lockup dark"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual English Studio</small></div></div><span class="prototype-pill">LESSON 01 • TAP → TALK • BLIND RECONSTRUCTION v0.12</span></header>
    <main class="home-main">
      <section class="home-hero"><div class="hero-photo"><img src="assets/images/lesson_01.jpg" alt="Two Adults Walking on a Beach in Warm Low Sunlight"><div class="hero-shade"></div><div class="hero-label"><span>Category 01</span><h1>Home, Family<br>& Relationships</h1><p>See it. Say it. Watch the scene light up as your description becomes more complete.</p></div><div class="hero-ring" style="--p:${pct*3.6}deg"><div><b>${pct}%</b><small>complete</small></div></div></div></section>
      <section class="resume-card" data-eng-v52-click="openLesson(1)"><div class="resume-icon">${icon('play')}</div><div><span>CONTINUE THE GOLD STANDARD</span><h2>Two Adults Walking on a Beach in Warm Low Sunlight</h2><p>${discoveredSet().size}/${activeHotspotCount()} visual details • ${progress.speakingAttempts||0} descriptions • ${progress.conversation?.turns||0} conversation turns</p></div><div class="resume-arrow">${icon('chevron')}</div></section>
      <section class="journey-card"><div class="section-kicker">LEARNING JOURNEY</div><h3>One image. A complete active-learning loop.</h3><div class="journey-grid">
        ${journeyHomeItem('01','Touch & discover','Tap real objects, hear the word, and learn it in context.',progress.completed.l1_explore)}
        ${journeyHomeItem('02','Evidence lens','Separate what the image proves from what you infer.',progress.completed.l1_evidence)}
        ${journeyHomeItem('03','Recall & build','Find details from memory and rebuild useful sentences.',progress.completed.l1_practice)}
        ${journeyHomeItem('04','Plan & describe','Speak 30–90 seconds while Live Scene Coverage shows what your listener could reconstruct.',progress.completed.l1_speaking)}
        ${journeyHomeItem('05','Voice-first conversation','Choose a scene mission, then use Guided, Natural, Challenge, or hands-free voice practice.',progress.completed.l1_talk)}
      </div></section>
      ${homePracticeHub()}
      <section class="focus-session-card"><div class="focus-session-copy"><span class="section-kicker">8-MINUTE FOCUS SESSION</span><h3>One scene, one complete speaking cycle</h3><p>2 min visual retrieval → 2 min guided description → 3 min voice-first conversation → 1 min repair.</p><div><span>${icon('target')} visual retrieval</span><span>${icon('mic')} independent speech</span><span>${icon('spark')} voice follow-up</span></div></div><button data-eng-v52-click="openLesson(1);setMode('practice');setPractice('smart')">Start Focus Session ${icon('chevron')}</button></section>
      ${homeSkillMap()}
      <section class="roadmap"><div><span class="section-kicker">CATEGORY ROADMAP</span><h3>28 lessons prepared</h3><p>Lessons 02–28 stay locked while Lesson 01 is being perfected as the interaction standard.</p></div><div class="roadmap-strip">${CAT01.lessons.slice(1,8).map(l=>`<div class="locked-thumb"><img src="${l.image}" alt=""><span>${courseLessonLabel(l.id)}</span></div>`).join('')}<div class="locked-more">+20</div></div></section>
    </main><div class="toast" id="toast"></div></div>`;
}
function journeyHomeItem(n,title,desc,done){return `<article class="journey-item ${done?'done':''}"><div class="journey-num">${done?icon('check'):n}</div><div><b>${title}</b><p>${desc}</p></div></article>`;}
function goHome(){state.photoFocus=false;state.sceneIntro=false;state.peek=false;state.viewer={scale:1,tx:0,ty:0,sheet:'collapsed',interacting:false,lastTap:0};stopPronRecognition();stopConversationRecognition();renderHome();window.scrollTo({top:0,behavior:'instant'});}
function openLesson(id){
  if(id!==1){toast('Lesson 01 is intentionally the only active prototype right now.');return;}
  clearTimer(); stopRecognition(); state.screen='lesson'; state.lesson=window.EngBookContent?.resolve?.(1)?.lesson||CAT01.lessons[0]; state.mode='explore'; state.selected=null; state.hints=false; state.photoFocus=false; state.tapFeedback=null; state.viewer={scale:1,tx:0,ty:0,sheet:'collapsed',interacting:false,lastTap:0}; state.transcript='';state.conversationTurn=0;state.conversationResponses=[];state.conversationInput='';state.conversationFeedback=null;state.conversationComplete=false;state.conversationHint=false;state.conversationMode='guided';state.conversationMission='listener';state.handsFree=false;state.voiceStage='idle';state.coachHelp=false;state.explainRepair=false;state.retryOriginal=null;state.sessionReplayOpen=false;state.outlineSelected=['setting','people','action'];state.compareOpen=false;state.repairSprintOpen=false;state.coverageOverlay=true;state.coverageReview=false;state.coverageLiveHits=[];state.evidenceLive=true;state.evidenceSelected=null;state.evidenceShowAll=false;
  resetPractice(false); initBuilder(); state.onboardingOpen=!localStorage.getItem(ONBOARD_KEY);state.onboardingStep=0;render(); window.scrollTo({top:0,behavior:'instant'});
}
function render(){if(state.screen==='home'||!state.lesson)return renderHome();renderLesson();}
function setMode(mode){
  clearTimer(); stopRecognition(); stopPronRecognition(); stopConversationRecognition(); state.mode=mode; state.tapFeedback=null;state.peek=false;
  if(mode==='practice'&&window.EngBookPractice.TYPES.includes(state.practiceType)&&(!state.practiceTarget||Number(state.practiceLessonId)!==Number(state.lesson?.id)))resetPractice(false);
  if(mode==='talk' && !state.conversationResponses.length && !state.conversationComplete){state.conversationTurn=0;state.conversationInput='';state.conversationFeedback=null;}
  render(); window.scrollTo({top:0,behavior:'smooth'});
}
function setLearnSection(s){state.learnSection=s;render();}
function setWordDepth(d){state.wordDepth=d;render();}
function toggleHints(){state.hints=!state.hints;haptic(12);render();}
function cycleScanMode(){const modes=['off','actions','composition','motion'];state.scanMode=modes[(modes.indexOf(state.scanMode)+1)%modes.length];haptic(10);render();}
function scanModeLabel(){return state.scanMode==='actions'?'Action lens':state.scanMode==='composition'?'Scene layers':state.scanMode==='motion'?'Motion cues':'Lens';}
function v59EnsureViewer(){
  if(!state.viewer||typeof state.viewer!=='object')state.viewer={scale:1,tx:0,ty:0,sheet:'collapsed',interacting:false,lastTap:0};
  state.viewer.scale=clamp(Number(state.viewer.scale)||1,1,state.viewer.maxScale||3.5);
  state.viewer.tx=Number(state.viewer.tx)||0;state.viewer.ty=Number(state.viewer.ty)||0;
  state.viewer.sheet=['collapsed','peek','expanded'].includes(state.viewer.sheet)?state.viewer.sheet:'collapsed';state.viewer.lastTap=Number(state.viewer.lastTap)||0;
  return state.viewer;
}
function togglePhotoFocus(){const v=v59EnsureViewer();state.photoFocus=!state.photoFocus;if(!state.photoFocus){state.sceneIntro=false;v.scale=1;v.tx=0;v.ty=0;state.photoZoom=1;}render();}
function setPhotoZoom(delta){const v=v59EnsureViewer();v.scale=delta===0?v.scale:clamp(Math.round((v.scale+delta)*10)/10,1,3.5);if(state.sceneIntro){state.sceneIntroFocusPending=true;}else if(v.scale<=1.01){v.tx=0;v.ty=0;}if(v.scale<=1.01)v.scale=1;state.photoZoom=v.scale;render();}
function resetPhotoZoom(){const v=v59EnsureViewer();v.scale=1;v.tx=0;v.ty=0;state.photoZoom=1;render();}
function v59SetViewerSheet(next,doRender=true){const v=v59EnsureViewer();v.sheet=['collapsed','peek','expanded'].includes(next)?next:'peek';if(doRender)render();}
function v59ToggleViewerSheet(){const v=v59EnsureViewer();v.sheet=v.sheet==='expanded'?'peek':'expanded';render();}

function handleStageTap(e){
  if(Date.now()<suppressStageClickUntil)return;
  if(e.target.closest('.hotspot'))return;
  const rect=e.currentTarget.getBoundingClientRect();
  const mapped=e.currentTarget.classList?.contains('v59-viewer-stage')&&v59IsInteractiveViewer(e.currentTarget)?v59ClientToImagePercent(e.currentTarget,e.clientX,e.clientY):null;
  const x=mapped?.x??((e.clientX-rect.left)/rect.width)*100, y=mapped?.y??((e.clientY-rect.top)/rect.height)*100;
  if(mapped&&mapped.inside===false){state.tapFeedback=null;return;}
  const hs=state.lesson.hotspots;
  let best={i:-1,d:999};
  hs.forEach((h,i)=>{const dx=(h.x-x)*1.15,dy=h.y-y;const d=Math.hypot(dx,dy);if(d<best.d)best={i,d};});
  if(best.d<11.5){hotspotClick(best.i);return;}
  state.tapFeedback={x,y,ok:false};haptic(10);toast(state.mode==='practice'?'Not there — scan the scene again.':'Try a clear person, object, or landscape detail.');render();
}
function hotspotClick(i){
  const h=state.lesson.hotspots[i];
  if(state.mode==='practice' && ['find','listen'].includes(state.practiceType)) return answerFind(i);
  const isNew=markDiscovered(h.en); state.selected=i;state.wordDepth=isNew?'word':state.wordDepth;state.tapFeedback={x:h.x,y:h.y,ok:true};v59EnsureViewer().sheet='peek';
  haptic(isNew?[18,35,18]:14);speak(h.en,.82);
  if(isNew){state.discoverCelebration=true;setTimeout(()=>{state.discoverCelebration=false},800);}
  if(discoveredSet().size>=activeHotspotCount()) progress.completed[`l${activeLessonId()}_explore`]=true;
  saveProgress();render();
}

function sceneStage(modal=false){
  const l=state.lesson, sel=state.selected!==null?l.hotspots[state.selected]:null, discovered=discoveredSet();
  const practiceFind=state.mode==='practice'&&['find','listen','smart'].includes(state.practiceType);
  const spotX=sel?sel.x:50,spotY=sel?sel.y:50;
  const adaptiveTarget=practiceFind&&state.practiceMistakes>=2?state.practiceTarget:null;
  const lens=practiceFind?[]:state.scanMode==='actions'?ACTION_LENS:state.scanMode==='composition'?COMPOSITION_LENS:[];
  const motion=practiceFind||state.scanMode!=='motion'?[]:MOTION_LENS;
  return `<div class="image-stage v59-viewer-stage ${modal?'modal-stage':''} ${sel&&!practiceFind?'has-focus':''} lens-${state.scanMode}" style="--spot-x:${spotX}%;--spot-y:${spotY}%;" data-v59-viewer="${modal?'focus':'lesson'}" data-eng-v52-click="handleStageTap(event)">
    <div class="v59-scene-content v59-transform-stage" data-v59-content><img class="scene-image" src="${l.image}" alt="${esc(l.title)}" draggable="false">
    ${sel&&!practiceFind?'<div class="focus-veil"></div>':''}
    ${l.hotspots.map((h,i)=>`<button class="hotspot ${state.hints&&!practiceFind?'hint':''} ${state.selected===i?'active':''} ${discovered.has(h.en)?'discovered':''} ${adaptiveTarget?.en===h.en?'adaptive-hint':''}" style="left:${h.x}%;top:${h.y}%;width:${Math.max(44,Number(h.hitW||Math.max(58,h.r*9)))}px;height:${Math.max(44,Number(h.hitH||Math.max(58,h.r*9)))}px" data-eng-v52-click="event.stopPropagation();hotspotClick(${i})" aria-label="${esc(h.en)}"></button>`).join('')}
    ${lens.map((a,i)=>`<div class="lens-chip ${state.scanMode}" style="left:${a.x}%;top:${a.y}%"><i>${i+1}</i><span><b>${esc(a.label)}</b><small>${esc(a.sub)}</small></span></div>`).join('')}
    ${motion.map((a,i)=>`<div class="motion-cue ${a.type}" style="left:${a.x}%;top:${a.y}%"><i></i><span><b>${esc(a.label)}</b><small>${esc(a.sub)}</small></span></div>`).join('')}
    ${coverageOverlayMarkup()}
    ${state.peek&&!practiceFind?l.hotspots.filter(h=>discovered.has(h.en)).map(h=>`<div class="peek-anchor" style="left:${h.x}%;top:${h.y}%"><i></i><b>${esc(h.en)}</b></div>`).join(''):''}
    ${sel&&!practiceFind?`<div class="spot-label" style="left:${clamp(sel.x,12,88)}%;top:${clamp(sel.y-8,13,85)}%"><b>${esc(sel.en)}</b><span>${sel.pronReviewed===false?masteryLabel(sel.en):`${esc(sel.pron)} · ${masteryLabel(sel.en)}`}</span></div>`:''}
    ${sel&&!practiceFind?tapTalkWheel(sel):''}
    ${state.mode==='talk'?roleSceneBadge():''}
    ${state.tapFeedback?`<div class="tap-feedback ${state.tapFeedback.ok?'ok':'miss'}" style="left:${state.tapFeedback.x}%;top:${state.tapFeedback.y}%"></div>`:''}
    ${state.discoverCelebration&&sel?`<div class="micro-burst" style="left:${sel.x}%;top:${sel.y}%"><i></i><i></i><i></i><i></i><i></i><i></i></div>`:''}
    </div><div class="photo-top-actions">${state.mode==='speak'?`<button data-eng-v52-click="event.stopPropagation();toggleCoverageOverlay()" class="glass-btn coverage-toggle ${state.coverageOverlay?'active':''}">${icon('spark')}<span>${state.coverageOverlay?'Coverage live':'Coverage off'}</span></button><button data-eng-v52-click="event.stopPropagation();toggleEvidenceLive()" class="glass-btn evidence-toggle ${state.evidenceLive?'active':''}">${icon('eye')}<span>${state.evidenceLive?'Evidence live':'Evidence off'}</span></button>`:''}<button data-eng-v52-click="event.stopPropagation();toggleHints()" class="glass-btn ${state.hints?'active':''}" ${practiceFind?'disabled':''}>${icon('hint')}<span>${state.hints?'Hints on':'Hints'}</span></button><button data-eng-v52-click="event.stopPropagation();cycleScanMode()" class="glass-btn ${state.scanMode!=='off'?'active':''}" ${practiceFind?'disabled':''}>${icon('layers')}<span>${scanModeLabel()}</span></button><button data-eng-v52-click="event.stopPropagation();togglePhotoFocus()" class="glass-btn">${icon(modal?'close':'expand')}<span>${modal?'Close':'Focus'}</span></button></div>
    <div class="scene-caption"><span>${practiceFind?'MEMORY MODE':state.mode==='speak'&&state.coverageOverlay?'LIVE SCENE COVERAGE':state.scanMode==='actions'?'ACTION LENS':state.scanMode==='composition'?'SCENE LAYERS':state.scanMode==='motion'?'MOTION CUES':'TOUCH TO DISCOVER'}</span><b>${practiceFind?practicePromptShort():state.mode==='speak'&&state.coverageOverlay?`${sceneCoverageAnalysis().hits.length}/${activeCoverageAnchors().length} communicated • ${sceneCoverageAnalysis().pct}% coverage`:state.scanMode!=='off'?'Tap Lens again to switch view':`${activeLessonId()===1?(window.ENGBOOK_LESSON_01_ATTRIBUTE_SCAN?.primaryHotspots||8)+' areas • '+(window.ENGBOOK_LESSON_01_ATTRIBUTE_SCAN?.totalHotspots||52)+' precise details':discovered.size+' of '+activeHotspotCount()+' details found'}`}</b></div>
  </div>`;
}
function v96ReducedMotion(){return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);}
function v96ScrollToActivity(){const el=document.querySelector('.v59-activity-area');if(!el)return;el.scrollIntoView({behavior:v96ReducedMotion()?'auto':'smooth',block:'start'});}
function v96ScrollToScene(){const el=document.querySelector('.v59-viewer-column');if(!el)return;el.scrollIntoView({behavior:v96ReducedMotion()?'auto':'smooth',block:'start'});}
function v96BindCategoryRails(){document.querySelectorAll('.v67-hotspot-category-scroll').forEach(rail=>{const active=rail.querySelector('button.active');if(!active)return;const left=active.offsetLeft-(rail.clientWidth-active.offsetWidth)/2;rail.scrollTo({left:Math.max(0,left),behavior:'auto'});});}
function v96SyncFocusLock(){const on=Boolean(state.photoFocus);document.documentElement.classList.toggle('v96-focus-open',on);document.body?.classList.toggle('v96-focus-open',on);}

function renderLesson(){
  const selected=state.selected!==null?state.lesson.hotspots[state.selected]:null, panelSelected=state.v60CardOpen?selected:null;
  const viewer=v59EnsureViewer();
  const grammarOverlay=(state.v60GrammarOpen&&panelSelected)?v60GrammarBox(panelSelected,hotspotDetail(panelSelected)):'';
  app.innerHTML=`<div class="app-shell lesson-shell v59-lesson-shell v59-sheet-${viewer.sheet}">${topbar()}<main class="lesson-main v59-lesson-main">
    <section class="lesson-heading compact-heading"><div><span class="lesson-id">LESSON ${courseLessonLabel(activeLessonId())} • VISUAL CONVERSATION ENGINE</span><h1>${esc(state.lesson.title||'Visual Scene')}</h1><p>Observe → name → connect → recall → speak.</p></div><div class="lesson-metrics"><div><b>${overallMastery()}%</b><span>mastery</span></div><div><b>${discoveredSet().size}/${activeHotspotCount()}</b><span>anchors</span></div></div></section>
    <div class="workspace studio-workspace v59-workspace"><section class="viewer-column v59-viewer-column"><div class="viewer-frame studio-viewer v59-scene-viewport">${sceneStage(false)}</div><button class="v96-scroll-cue" data-eng-v52-click="v96ScrollToActivity()" aria-label="Scroll to lesson activities"><span>Continue</span>${icon('chevron')}</button>${gestureLegend()}${contextStrip()}</section><aside class="interaction-column v59-bottom-sheet ${panelSelected?'is-open':'is-empty'} v59-sheet-${viewer.sheet}">${interactionPanel(panelSelected)}</aside></div>
    <section class="activity-area v59-activity-area"><button class="v96-back-to-scene" data-eng-v52-click="v96ScrollToScene()">${icon('chevron')}<span>Back to scene</span></button>${modeContent()}</section>
  </main>${bottomNav()}${grammarOverlay}${state.photoFocus?`<div class="photo-modal v59-photo-modal ${state.sceneIntro?'scene-intro':''}" role="dialog" aria-modal="true" aria-label="${state.sceneIntro?'Explore the lesson picture':'Scene Focus'}"><div class="focus-toolbar"><div><b>${state.sceneIntro?`Lesson ${courseLessonLabel(activeLessonId())}`:'Scene Focus'}</b><span id="focusZoomPct">${Math.round(viewer.scale*100)}%</span></div><div><button aria-label="Zoom out" data-eng-v52-click="setPhotoZoom(-.2)">−</button><button aria-label="${state.sceneIntro?'Focus on subjects':'Reset zoom'}" data-eng-v52-click="${state.sceneIntro?'setPhotoZoom(0)':'resetPhotoZoom()'}">${state.sceneIntro?icon('target'):'100%'}</button><button aria-label="Zoom in" data-eng-v52-click="setPhotoZoom(.2)">+</button>${state.sceneIntro?'':`<button class="focus-close" aria-label="Close scene focus" data-eng-v52-click="togglePhotoFocus()">${icon('close')}</button>`}</div></div><div class="photo-modal-inner zoom-scroll v59-scene-viewport v59-focus-viewport">${sceneStage(true)}</div>${state.sceneIntro?`<div class="scene-intro-footer"><span>Drag to explore · Pinch to zoom</span><button data-eng-v52-click="togglePhotoFocus()">Continue lesson ${icon('chevron')}</button></div>`:''}</div>`:''}${state.onboardingOpen&&!state.sceneIntro?onboardingOverlay():''}<div class="toast" id="toast"></div></div>`;
  v96SyncFocusLock();setTimeout(()=>{bindGestures();v96BindCategoryRails();},0);
}


function gestureLegend(){return `<div class="gesture-legend v59-gesture-legend"><span><i>1×</i> Tap to discover</span><span><i>↔</i> Drag: move scene</span><span><i>⌁</i> Pinch: zoom</span><span><i>2×</i> Double tap: quick zoom</span></div>`;}
function onboardingOverlay(){
  const steps=[
    {k:'TOUCH',title:'Learn from the picture itself',body:'Tap a real person, object, or part of the setting. The app attaches the word, meaning, pronunciation, and an image-specific sentence to that exact visual anchor.',visual:`<div class="ob-demo photo"><img src="assets/images/lesson_01.jpg"><i class="ob-pulse"></i><span>beach</span></div>`},
    {k:'GESTURE',title:'Move through language with one swipe',body:'After you select a detail, swipe the learning card left or right to move naturally through Word → Phrase → Sentence. You can still use the buttons when you prefer.',visual:`<div class="ob-demo cards"><article>WORD<b>beach</b></article><i>→</i><article>PHRASE<b>stroll along the shoreline</b></article><i>→</i><article>SENTENCE<b>They are strolling…</b></article></div>`},
    {k:'PEEK + FOCUS',title:'Use the photo like an interactive canvas',body:'Hold the photo to briefly reveal anchors you have already discovered. At 1×, swipe vertically to continue down the lesson. Pinch or double-tap to zoom; once zoomed, drag to inspect the scene. Focus mode keeps the image locked full-screen.',visual:`<div class="ob-demo gestures"><div><b>HOLD</b><span>memory peek</span></div><div><b>SWIPE ↓</b><span>continue lesson</span></div><div><b>PINCH</b><span>zoom + pan</span></div></div>`},
    {k:'SAY IT',title:'Do more than recognize the word',body:'Use Pronunciation Lab to hear and shadow a word or phrase, then try phrase matching. It reports recognition similarity only — not an accent or pronunciation grade. Finish by using the language in your own description.',visual:`<div class="ob-demo voice"><i>${icon('mic')}</i><div><b>Hear → Say → Use</b><span>active production loop</span></div><em><i></i><i></i><i></i><i></i><i></i></em></div>`}
  ];
  const st=steps[state.onboardingStep];
  return `<div class="onboarding-backdrop"><div class="onboarding-card"><button class="ob-close" data-eng-v52-click="closeOnboarding()">${icon('close')}</button><div class="ob-progress">${steps.map((_,i)=>`<i class="${i<=state.onboardingStep?'active':''}"></i>`).join('')}</div><span class="section-kicker">${st.k} • ${state.onboardingStep+1}/4</span><h2 id="engbook-onboarding-title">${st.title}</h2><p>${st.body}</p>${st.visual}<div class="ob-actions"><button class="secondary" data-eng-v52-click="prevOnboarding()" ${state.onboardingStep===0?'disabled':''}>Back</button><button class="primary" data-eng-v52-click="nextOnboarding()">${state.onboardingStep===3?'Start exploring':'Next'}</button></div><button class="ob-skip" data-eng-v52-click="closeOnboarding()">Skip guide</button></div></div>`;
}
function v59ViewportFor(stage){return stage?.parentElement?.classList.contains('scene-layout')?stage:stage?.closest?.('.v59-scene-viewport')||stage?.parentElement||null;}
function v59ContentFor(stage){return stage?.querySelector?.('.v59-scene-content')||stage;}
function v59IsInteractiveViewer(stage){return Boolean(stage&&(stage.classList.contains('modal-stage')||window.matchMedia?.('(max-width:700px)')?.matches));}
function v99ResolveSceneFocus(pack){
  const declared=pack?.presentation?.sceneFocus;
  if(Number.isFinite(Number(declared?.x))&&Number.isFinite(Number(declared?.y)))return {x:clamp(Number(declared.x),0,100),y:clamp(Number(declared.y),0,100)};
  const primary=(pack?.hotspots||[]).filter(h=>h.level==='primary'&&Number.isFinite(Number(h.x))&&Number.isFinite(Number(h.y)));
  const people=primary.filter(h=>h.type==='person'&&!/background|distant|audience/i.test(h.en||''));
  const mainGroup=primary.find(h=>h.type==='group'&&/adult|people|person|pair|couple|family|bride|groom|diner|viewer|ceremony|party|children|child|student|friends/i.test(h.en||'')&&!/background|distant|audience/i.test(h.en||''));
  const anchors=people.length?people:mainGroup?[mainGroup]:primary.length?[primary[0]]:[];
  if(!anchors.length)return {x:50,y:50};
  return {x:anchors.reduce((sum,h)=>sum+Number(h.x),0)/anchors.length,y:anchors.reduce((sum,h)=>sum+Number(h.y),0)/anchors.length};
}
function v99FocusStageOnSubject(stage){
  const v=v59EnsureViewer(),b=v59Bounds(stage,v.scale),focus=state.sceneIntroFocus||{x:50,y:50};
  v.tx=b.vw/2-b.fw*v.scale*focus.x/100-b.cx;
  v.ty=b.vh/2-b.fh*v.scale*focus.y/100-b.cy;
  v59ApplyViewerTransform(stage);
}
function v59FitStage(stage){
  const viewport=v59ViewportFor(stage),content=v59ContentFor(stage),img=content?.querySelector?.('.scene-image');if(!viewport||!content||!img)return;
  const apply=()=>{if(img.naturalWidth&&img.naturalHeight)stage.style?.setProperty('--scene-aspect',`${img.naturalWidth} / ${img.naturalHeight}`);const vw=viewport.clientWidth||innerWidth,vh=viewport.clientHeight||innerHeight,nw=img.naturalWidth||vw,nh=img.naturalHeight||vh;if(!vw||!vh||!nw||!nh)return;const fit=Math.min(vw/nw,vh/nh),w=Math.max(1,nw*fit),h=Math.max(1,nh*fit);content.style.width=`${w}px`;content.style.height=`${h}px`;content.dataset.v59FitW=String(w);content.dataset.v59FitH=String(h);img.style.width='100%';img.style.height='100%';img.style.objectFit='fill';v59ApplyViewerTransform(stage);if(stage.classList?.contains('modal-stage')&&state.sceneIntroNeedsCover){requestAnimationFrame(()=>requestAnimationFrame(()=>{if(!stage.isConnected||!state.sceneIntro||!state.sceneIntroNeedsCover)return;const width=viewport.clientWidth||vw,height=viewport.clientHeight||vh,viewer=v59EnsureViewer();viewer.scale=clamp(Math.max(1.7,Math.max(width/w,height/h)*1.08),1,3.5);state.sceneIntroNeedsCover=false;state.sceneIntroFocusPending=false;v99FocusStageOnSubject(stage);}));}else if(stage.classList?.contains('modal-stage')&&state.sceneIntro&&state.sceneIntroFocusPending){state.sceneIntroFocusPending=false;v99FocusStageOnSubject(stage);}};
  if(img.complete&&img.naturalWidth)apply();else img.addEventListener('load',apply,{once:true});
}
function v59Bounds(stage,scale=v59EnsureViewer().scale){const viewport=v59ViewportFor(stage),content=v59ContentFor(stage);const vw=viewport?.clientWidth||innerWidth,vh=viewport?.clientHeight||innerHeight,fw=Number(content?.dataset?.v59FitW)||content?.offsetWidth||vw,fh=Number(content?.dataset?.v59FitH)||content?.offsetHeight||vh;return {vw,vh,fw,fh,ex:Math.max(0,(fw*scale-vw)/2),ey:Math.max(0,(fh*scale-vh)/2),cx:(vw-fw*scale)/2,cy:(vh-fh*scale)/2};}
function v59ClampPan(stage){const v=v59EnsureViewer(),b=v59Bounds(stage,v.scale);v.tx=clamp(v.tx,-b.ex,b.ex);v.ty=clamp(v.ty,-b.ey,b.ey);if(v.scale<1){v.scale=1;}state.photoZoom=v.scale;return b;}
function v59ApplyViewerTransform(stage){const content=v59ContentFor(stage),v=v59EnsureViewer(),b=v59ClampPan(stage);content.style.transformOrigin='0 0';content.style.transform=`matrix(${v.scale},0,0,${v.scale},${b.cx+v.tx},${b.cy+v.ty})`;content.style.setProperty('--v59-inverse-scale',String(1/v.scale));content.style.willChange='transform';const pct=document.getElementById('focusZoomPct');if(pct)pct.textContent=`${Math.round(v.scale*100)}%`;globalThis.EngBookSceneCanvas?.position(stage);}
function v59LocalPoint(stage,clientX,clientY,scale,tx,ty){const viewport=v59ViewportFor(stage),r=viewport.getBoundingClientRect(),b=v59Bounds(stage,scale),x=clientX-r.left,y=clientY-r.top;return {x:(x-(b.cx+tx))/scale,y:(y-(b.cy+ty))/scale,vx:x,vy:y,b};}
function v59ClientToImagePercent(stage,clientX,clientY){const v=v59EnsureViewer(),p=v59LocalPoint(stage,clientX,clientY,v.scale,v.tx,v.ty),b=v59Bounds(stage,v.scale),x=p.x/b.fw*100,y=p.y/b.fh*100;return {x,y,inside:x>=0&&x<=100&&y>=0&&y<=100};}
function v59ZoomAt(stage,targetScale,clientX,clientY,start=null){const v=v59EnsureViewer(),s0=start?.scale??v.scale,tx0=start?.tx??v.tx,ty0=start?.ty??v.ty,p=v59LocalPoint(stage,clientX,clientY,s0,tx0,ty0),next=clamp(targetScale,1,state.viewer.maxScale||3.5),b=v59Bounds(stage,next);v.scale=next;v.tx=p.vx-p.x*next-b.cx;v.ty=p.vy-p.y*next-b.cy;v59ApplyViewerTransform(stage);}
function v59BindViewer(stage){
  if(!stage||stage.dataset.v59Bound==='1')return;stage.dataset.v59Bound='1';
  if(!v59IsInteractiveViewer(stage)){let hold=null,down=null,lastTap=0;stage.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;down={x:e.clientX,y:e.clientY,t:Date.now()};hold=setTimeout(()=>{hold=null;triggerPeek();},560);});stage.addEventListener('pointermove',e=>{if(down&&Math.hypot(e.clientX-down.x,e.clientY-down.y)>14&&hold){clearTimeout(hold);hold=null;}});stage.addEventListener('pointerup',e=>{if(hold){clearTimeout(hold);hold=null;}if(!down)return;const moved=Math.hypot(e.clientX-down.x,e.clientY-down.y),now=Date.now();if(moved<14&&now-lastTap<330&&state.mode!=='practice'){lastTap=0;togglePhotoFocus();}else if(moved<14)lastTap=now;down=null;});stage.addEventListener('pointercancel',()=>{if(hold)clearTimeout(hold);hold=null;down=null;});return;}
  const viewport=v59ViewportFor(stage);if(!viewport)return;const modal=stage.classList.contains('modal-stage');v59FitStage(stage);viewport.style.touchAction='none';const pts=new Map();let dragStart=null,pinchStart=null,moved=false;
  const center=()=>{const a=[...pts.values()];return a.length<2?null:{x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2,d:Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y)};};
  stage.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;try{stage.setPointerCapture(e.pointerId);}catch(_){}pts.set(e.pointerId,{x:e.clientX,y:e.clientY});moved=false;if(pts.size===1){dragStart={x:e.clientX,y:e.clientY,lastX:e.clientX,lastY:e.clientY,tx:v59EnsureViewer().tx,ty:v59EnsureViewer().ty,t:Date.now()};pinchStart=null;}else if(pts.size===2){const c=center(),v=v59EnsureViewer();pinchStart={...c,scale:v.scale,tx:v.tx,ty:v.ty};dragStart=null;}state.viewer.interacting=true;});
  stage.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;pts.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pts.size>=2&&pinchStart){const c=center();if(!c||!pinchStart.d)return;const next=pinchStart.scale*(c.d/pinchStart.d);v59ZoomAt(stage,next,c.x,c.y,pinchStart);moved=true;suppressStageClickUntil=Date.now()+220;return;}if(pts.size===1&&dragStart){const v=v59EnsureViewer(),dx=e.clientX-dragStart.x,dy=e.clientY-dragStart.y;if(Math.hypot(dx,dy)>10)moved=true;
      // v0.96 mobile rule: at 1× the scene behaves like the top of a normal
      // scrollable lesson page. A vertically dominant one-finger gesture scrolls
      // the document. Once zoomed (or inside Focus mode), the same gesture pans
      // the image. This preserves fullscreen immersion without trapping the page.
      if(!modal&&v.scale<=1.01&&Math.abs(dy)>Math.abs(dx)*1.05&&Math.abs(dy)>6){const step=e.clientY-(dragStart.lastY??dragStart.y);if(step){window.scrollBy(0,-step);dragStart.lastY=e.clientY;dragStart.lastX=e.clientX;moved=true;suppressStageClickUntil=Date.now()+220;}return;}
      const b=v59Bounds(stage,v.scale);if(v.scale>1.01||modal||b.ex>0||b.ey>0){v.tx=dragStart.tx+dx;v.ty=dragStart.ty+dy;v59ApplyViewerTransform(stage);if(moved)suppressStageClickUntil=Date.now()+220;}}});
  const endPointer=e=>{if(pts.has(e.pointerId))pts.delete(e.pointerId);try{stage.releasePointerCapture(e.pointerId);}catch(_){}if(pts.size<2)pinchStart=null;if(pts.size===1){const p=[...pts.values()][0],v=v59EnsureViewer();dragStart={x:p.x,y:p.y,lastX:p.x,lastY:p.y,tx:v.tx,ty:v.ty,t:Date.now()};}else if(!pts.size){const now=Date.now(),wasMoved=moved;state.viewer.interacting=false;v59ApplyViewerTransform(stage);if(!wasMoved&&dragStart&&now-dragStart.t<330){const v=v59EnsureViewer(),prev=v.lastTap||0;if(now-prev<330&&state.mode!=='practice'){v.lastTap=0;suppressStageClickUntil=now+360;if(typeof v60CancelPointerTap==='function')v60CancelPointerTap();const target=v.scale>1.05?1:2.2;v59ZoomAt(stage,target,e.clientX,e.clientY);haptic(12);}else{v.lastTap=now;if(typeof v60QueuePointerTap==='function'){suppressStageClickUntil=now+340;v60QueuePointerTap(stage,e.clientX,e.clientY);}}}dragStart=null;moved=false;}};
  stage.addEventListener('pointerup',endPointer);stage.addEventListener('pointercancel',endPointer);
  window.addEventListener('resize',()=>v59FitStage(stage),{passive:true,once:true});
}
function v59BindBottomSheet(){const el=document.querySelector('.v59-bottom-sheet.is-open');if(!el||!window.matchMedia?.('(max-width:700px)')?.matches||el.dataset.v59SheetBound==='1')return;el.dataset.v59SheetBound='1';let sy=0;el.addEventListener('pointerdown',e=>{if(e.target.closest('button,textarea,input'))return;sy=e.clientY;},{passive:true});el.addEventListener('pointerup',e=>{if(!sy)return;const dy=e.clientY-sy;sy=0;if(dy<-55&&v59EnsureViewer().sheet!=='expanded'){v59SetViewerSheet('expanded');}else if(dy>55){v59SetViewerSheet(v59EnsureViewer().sheet==='expanded'?'peek':'collapsed');}},{passive:true});}

function bindGestures(){
  document.querySelectorAll('.detail-sheet').forEach(el=>{if(el.dataset.v59DetailBound==='1')return;el.dataset.v59DetailBound='1';let sx=0,sy=0;el.addEventListener('touchstart',e=>{if(e.touches.length===1){sx=e.touches[0].clientX;sy=e.touches[0].clientY;}},{passive:true});el.addEventListener('touchend',e=>{if(!sx)return;const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;sx=0;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.35){const order=['word','phrase','sentence'],i=order.indexOf(state.wordDepth),next=dx<0?Math.min(2,i+1):Math.max(0,i-1);if(next!==i){haptic(10);setWordDepth(order[next]);}}},{passive:true});});
  document.querySelectorAll('.v59-viewer-stage').forEach(v59BindViewer);v59BindBottomSheet();v96BindCategoryRails?.();
}

function contextStrip(){
  const d=discoveredSet(), weak=[...state.lesson.hotspots].sort((a,b)=>masteryScore(a.en)-masteryScore(b.en)).slice(0,3);
  return `<div class="context-strip studio-context"><div class="discover-progress"><div class="discover-progress-head"><span>Visual anchors</span><b>${d.size}/${activeHotspotCount()}</b></div><div class="dot-track">${state.lesson.hotspots.map(h=>`<i class="${d.has(h.en)?'done':''}" title="${esc(h.en)}"></i>`).join('')}</div></div><div class="mastery-mini"><span>Mastery</span><div><i style="width:${overallMastery()}%"></i></div><b>${overallMastery()}%</b></div><div class="weak-focus"><span>Review next • ${dueAnchors().length} due</span><b>${weak.map(h=>`${h.en} (${reviewDueLabel(h.en)})`).join(' · ')}</b></div><div class="context-actions"><button data-eng-v52-click="setMode('practice');setPractice('smart')">${icon('spark')} Smart review</button><button data-eng-v52-click="setMode('speak')">${icon('mic')} Describe</button><button class="primary-action" data-eng-v52-click="setMode('talk')">${icon('spark')} Converse</button></div></div>`;
}

function interactionPanel(h){
  if(!h){
    return `<div class="interaction-card welcome-card studio-welcome"><div class="orb-icon">${icon('compass')}</div><span class="section-kicker">VISUAL-FIRST STUDIO</span><h2>Touch the scene, not a vocabulary list.</h2><p>Every useful word stays attached to a real location in the image. Tap a person, object, or part of the setting to open a compact micro-lesson.</p><div class="interaction-flow"><div><i>1</i><b>Notice</b><span>Find a real visual anchor.</span></div><div><i>2</i><b>Connect</b><span>Word → phrase → sentence.</span></div><div><i>3</i><b>Retrieve</b><span>Recall it without hints.</span></div></div><div class="studio-tip">${icon('layers')} <span><b>Try the Lens button</b>Switch between visible actions and foreground / middle ground / background.</span></div></div>`;
  }
  const ex=hotspotDetail(h), m=masteryScore(h.en);
  return `<div class="interaction-card word-card active-card detail-sheet"><div class="sheet-handle"></div><div class="word-card-top"><div><span class="section-kicker">VISUAL DETAIL</span><h2>${esc(h.en)}</h2><div class="pron-line">${esc(h.pron)}</div></div><div class="word-card-actions"><button class="round-btn soft" data-eng-v52-click="speak('${q(h.en)}')">${icon('volume')}</button><button class="round-btn soft ${isSaved(h.en)?'saved':''}" data-eng-v52-click="toggleSaved('${q(h.en)}')">${icon('star')}</button></div></div>
    <div class="mastery-card"><div><span>MASTERY</span><b>${m}% · ${masteryLabel(h.en)}</b></div><div class="mastery-bar"><i style="width:${m}%"></i></div><small>${masteryRecord(h.en).correct||0} successful recalls · ${masteryRecord(h.en).wrong||0} misses</small></div>
    <div class="depth-switch"><button class="${state.wordDepth==='word'?'active':''}" data-eng-v52-click="setWordDepth('word')">Word</button><button class="${state.wordDepth==='phrase'?'active':''}" data-eng-v52-click="setWordDepth('phrase')">Phrase</button><button class="${state.wordDepth==='sentence'?'active':''}" data-eng-v52-click="setWordDepth('sentence')">Sentence</button></div>
    ${wordDepthContent(h,ex)}
    <div class="evidence-lens"><div class="lens-head">${icon('eye')} <b>Evidence lens</b></div><div class="lens-row fact"><span>VISIBLE</span><p>${esc(h.example)}</p></div><div class="lens-row infer"><span>INTERPRET</span><p>${esc(safeInferenceFor(h.en))}</p></div></div>
    ${tapTalkPanel(h)}
    ${pronunciationLab(h,ex)}
    <div class="micro-actions"><button data-eng-v52-click="speak('${q(ex.grammar||h.example)}',.82)">${icon('volume')} Shadow sentence</button><button class="use-now" data-eng-v52-click="markPronUse('${q(h.en)}','${q(ex.phrase||h.en)}')">${icon('mic')} <span><b>Use it now</b><small>Make one sentence with “${esc(ex.phrase||h.en)}”.</small></span>${icon('chevron')}</button></div>
  </div>`;
}

function pronunciationLab(h,ex){
  const guide=PRONUNCIATION_GUIDE[h.en]||{chunks:[h.en],stress:0,tip:'Listen first, then repeat the target naturally.'},rec=pronRecord(h.en),steps=pronMissionScore(h.en),target=currentPronTarget(h),res=state.pronResult&&state.pronResult.word===h.en?state.pronResult:null;
  return `<section class="pron-lab"><div class="pron-head"><div><span>PRONUNCIATION LAB</span><b>Hear → Say → Use</b></div><div class="mission-pips">${['hear','say','use'].map(k=>`<i class="${rec[k]?'done':''}">${rec[k]?icon('check'):''}</i>`).join('')}<em>${steps}/3</em></div></div><div class="pron-mode"><button class="${state.pronMode==='word'?'active':''}" data-eng-v52-click="setPronMode('word')">Word</button><button class="${state.pronMode==='phrase'?'active':''}" data-eng-v52-click="setPronMode('phrase')">Phrase</button></div><button class="pron-target" data-eng-v52-click="pronounceHear('${q(h.en)}','${q(target)}',.72)"><span>${state.pronMode==='word'?guide.chunks.map((c,i)=>`<b class="${i===guide.stress?'stress':''}">${esc(c)}</b>`).join('<i>·</i>'):`<b>${esc(target)}</b>`}</span>${icon('volume')}</button><div class="pron-meta"><span>${esc(state.pronMode==='word'?h.pron:'Shadow the complete phrase')}</span><p>${esc(state.pronMode==='word'?guide.tip:'Listen once, then repeat the whole phrase as one smooth chunk.')}</p></div><div class="pron-actions"><button data-eng-v52-click="pronounceHear('${q(h.en)}','${q(target)}',.62)">${icon('volume')} Hear slow</button><button class="${state.pronListening?'listening':''}" data-eng-v52-click="startPronRecognition('${q(h.en)}')">${icon('mic')} ${state.pronListening?'Listening…':'Say & match'}</button></div>${state.pronListening?`<div class="listen-pulse"><i></i><i></i><i></i><i></i><i></i><span>Say: “${esc(target)}”</span></div>`:''}${res?`<div class="pron-result ${res.score>=80?'good':res.score>=55?'mid':'try'}"><div><span>RECOGNITION MATCH</span><b>${res.score}%</b></div><p>Heard: “${esc(res.heard||'—')}”</p><small>This checks how closely browser speech recognition matched the target text. It is <b>not</b> an accent or pronunciation grade.</small></div>`:`<p class="pron-disclaimer">Phrase matching is a recognition check, not a pronunciation score.</p>`}</section>`;
}

function wordDepthContent(h,ex){
  if(state.wordDepth==='word')return `<div class="depth-content word-depth"><div class="big-meaning"><span>IN THE PICTURE</span><b>${esc(h.example||h.en)}</b></div><button class="listen-line" data-eng-v52-click="speak('${q(h.en)}')">${icon('volume')} Hear it again <small>${esc(h.pron)}</small></button></div>`;
  if(state.wordDepth==='phrase')return `<div class="depth-content"><span class="content-label">USEFUL PHRASE</span><button class="hero-phrase" data-eng-v52-click="speak('${q(ex.phrase||h.en)}')"><b>${esc(ex.phrase||h.en)}</b>${icon('volume')}</button><div class="collocation-row">${displayCollocations(ex).map(c=>`<button data-eng-v52-click="speak('${q(c)}')">${esc(c)}</button>`).join('')}</div></div>`;
  return `<div class="depth-content"><span class="content-label">IN THIS IMAGE</span><button class="sentence-listen" data-eng-v52-click="speak('${q(ex.grammar||h.example)}')"><p>${esc(ex.grammar||h.example)}</p>${icon('volume')}</button><div class="grammar-cue"><span>Grammar cue</span>${highlightGrammar(ex.grammar||h.example)}</div></div>`;
}
function highlightGrammar(s){return esc(s).replace(/\b(is|are|am)\b/g,'<mark>$1</mark>').replace(/\b(\w+ing)\b/g,'<mark>$1</mark>');}
function safeInferenceFor(word){
  const m={man:'His downward glance suggests that his attention is on the woman.',woman:'Her leaning posture strongly supports closeness and comfort.',sun:'The low warm light may suggest sunrise or sunset, but the still image does not prove which.',ocean:'The smooth water and gentle shore break support calm conditions.','palm tree':'The palms support a tropical-looking coastal setting, but not an exact location.',beach:'They may simply be taking an evening walk; the occasion is unknown.',hand:'Joined hands support an affectionate relationship, but not a specific legal status.'};
  return m[word]||'The image supports a cautious interpretation, but not an exact story.';
}
function microSpeak(word,phrase){if(word)savePronRecord(word,{use:true});state.mode='speak';state.speakingDuration=30;state.speakingSeconds=30;toast(`Try to use: ${phrase}`);render();}

function modeTabs(){
  const modes=[['explore','compass','Explore'],['learn','book','Learn'],['practice','target','Recall'],['speak','mic','Describe'],['talk','spark','Converse']];
  return `<div class="mode-tabs">${modes.map(([m,ic,t])=>`<button class="${state.mode===m?'active':''}" data-eng-v52-click="setMode('${m}')">${icon(ic)}<span>${t}</span></button>`).join('')}</div>`;
}
function modeContent(){
  const inner=state.mode==='explore'?exploreContent():state.mode==='learn'?learnContent():state.mode==='practice'?practiceContent():state.mode==='speak'?speakContent():conversationContent();
  return `${modeTabs()}<div class="mode-surface">${inner}</div>`;
}

function exploreContent(){
  const d=discoveredSet(); const next=state.lesson.hotspots.find(h=>!d.has(h.en));
  const sorted=[...state.lesson.hotspots].sort((a,b)=>masteryScore(a.en)-masteryScore(b.en));
  return `<section class="explore-dashboard"><div class="panel-heading"><div><span class="section-kicker">DISCOVERY LOOP</span><h2>Build a scene you can retrieve later</h2><p>First discover the image naturally. Then use mastery signals to decide what actually needs another repetition.</p></div><button class="complete-btn ${progress.completed.l1_explore?'done':''}" data-eng-v52-click="markComplete('l1_explore')">${progress.completed.l1_explore?icon('check')+' Complete':'Mark complete'}</button></div>
  <div class="mission-card studio-mission"><div class="mission-icon">${icon(d.size===activeHotspotCount()?'check':'spark')}</div><div><span>${d.size===activeHotspotCount()?'SCENE MAPPED':'NEXT BEST ACTION'}</span><h3>${d.size===activeHotspotCount()?'All visual anchors are mapped.':d.size<3?'Explore freely — find any 3 anchors.':d.size<activeHotspotCount()?'Finish the map, then switch to recall.':'Move to recall.'}</h3><p>${d.size===activeHotspotCount()?`Your weakest anchors right now are ${sorted.slice(0,3).map(h=>`“${h.en}”`).join(', ')}. Smart Review will prioritize them.`:next?`Scan the image before using hints. One unseen anchor is “${esc(next.en)}”.`:''}</p></div><b>${d.size}/${activeHotspotCount()}</b></div>
  <div class="mastery-map">${state.lesson.hotspots.map((h,i)=>{const m=masteryScore(h.en),known=d.has(h.en);return `<div class="mastery-node ${known?'known':''} ${state.selected===i?'selected':''}"><span class="node-ring" style="--m:${m*3.6}deg"><i>${known?icon('check'):'·'}</i></span><div><b>${esc(h.en)}</b><small>${known?`${masteryLabel(h.en)} · ${m}%`:'Not explored yet'}</small></div></div>`}).join('')}</div>
  <div class="learning-tip studio-tip-wide">${icon('layers')}<div><b>Visual grammar, not decoration</b><p>Use <b>Action lens</b> for verbs and body language, <b>Scene layers</b> for spatial order, and <b>Motion cues</b> to connect action with visual direction and light.</p></div><button data-eng-v52-click="cycleScanMode()">Open lens</button></div></section>`;
}
function learnContent(){
  const g=activeGold();
  const sections=[['evidence','eye','Facts'],['inference','layers','Possibilities'],['grammar','book','Grammar']];
  return `<section><div class="panel-heading"><div><span class="section-kicker">EVIDENCE-BASED LEARNING</span><h2>Look deeper without losing accuracy</h2><p>The lesson keeps visible facts separate from interpretation so observation and interpretation stay clearly separated.</p></div><button class="complete-btn ${progress.completed.l1_evidence?'done':''}" data-eng-v52-click="markComplete('l1_evidence')">${progress.completed.l1_evidence?icon('check')+' Complete':'Mark complete'}</button></div>
  <div class="subtabs">${sections.map(([s,ic,t])=>`<button class="${state.learnSection===s?'active':''}" data-eng-v52-click="setLearnSection('${s}')">${icon(ic)} ${t}</button>`).join('')}</div>${learnSectionContent(g)}</section>`;
}
function learnSectionContent(g){
  if(state.learnSection==='evidence'){
    const rows=(Array.isArray(g.evidence)?g.evidence:[]).map((row,i)=>Array.isArray(row)?{label:row[0],detail:row[1]}:{label:row?.label||row?.title||`Evidence ${i+1}`,detail:row?.detail||row?.text||row?.description||''}).filter(row=>row.label&&row.detail);
    return `<div class="learn-grid"><article class="overview-card"><span>01 • SCENE OVERVIEW</span><h3>Start wide, then zoom in.</h3><p>${esc(g.overview)}</p><button data-eng-v52-click="speak('${q(g.overview)}',.9)">${icon('volume')} Listen to overview</button></article><div class="evidence-accordion">${rows.map((row,i)=>`<details ${i<2?'open':''}><summary><span>${String(i+1).padStart(2,'0')}</span><b>${esc(row.label)}</b>${icon('chevron')}</summary><p>${esc(row.detail)}</p></details>`).join('')}</div></div>`;
  }
  if(state.learnSection==='inference'){
    return `<div class="inference-zone"><section class="review-facts"><h3>Facts</h3>${(g.evidence||[]).filter(row=>!row.claimClass||row.claimClass==='visible-fact').map(row=>`<p>${esc(row.detail||row.text||'')}</p>`).join('')}</section><h3>Possibilities</h3><div class="confidence-ladder"><article class="confidence-card high"><div><b>HIGH</b><span>Strongly supported</span></div><p>${esc(g.inference.high)}</p></article><article class="confidence-card medium"><div><b>MEDIUM</b><span>Plausible, not certain</span></div><p>${esc(g.inference.medium)}</p></article><article class="confidence-card low"><div><b>LOW</b><span>Story hypothesis</span></div><p>${esc(g.inference.low)}</p></article></div><div class="timeline-pro"><article><span>BEFORE</span><p>${esc(g.timeline.before)}</p></article><i>${icon('chevron')}</i><article><span>NOW</span><p>${esc(g.timeline.now)}</p></article><i>${icon('chevron')}</i><article><span>NEXT</span><p>${esc(g.timeline.next)}</p></article></div><div class="accuracy-card"><div>${icon('target')}<b>Accuracy guardrail</b></div><p>${esc(g.guardrail)}</p></div></div>`;
  }
  return `<div class="grammar-lab"><div class="grammar-hero"><span>06 • GRAMMAR FOCUS</span><h3>${esc(g.grammar.title)}</h3><p>${esc(g.grammar.explainer)}</p><div class="grammar-examples">${g.grammar.examples.map(e=>`<button data-eng-v52-click="speak('${q(e)}')">${icon('volume')} ${highlightGrammar(e)}</button>`).join('')}</div></div><div class="model-ladder"><div class="level-switch">${Object.keys(g.grammar.models).map(l=>`<button class="${state.level===l?'active':''}" data-eng-v52-click="state.level='${q(l)}';render()">${esc(l)}</button>`).join('')}</div><article><div><span>MODEL FOR COMPARISON</span><button data-eng-v52-click="speak('${q(g.grammar.models[state.level])}',.9)">${icon('volume')} Listen</button></div><p>${esc(g.grammar.models[state.level])}</p><small>Make your own attempt before using the model as a comparison.</small></article><button class="lab-cta" data-eng-v52-click="setMode('practice');setPractice('builder')">Open Sentence Builder ${icon('chevron')}</button></div></div>`;
}

function setPractice(type){
  if(!['find','listen','smart','builder','mistakes','saved','fact'].includes(type))return;
  window.EngBookSpeech.stopSpeaking();state.practiceType=type;state.practiceMsg='';state.tapFeedback=null;state.selected=null;state.v60CardOpen=false;state.practiceLocked=false;
  if(window.EngBookPractice.TYPES.includes(type))resetPractice(false);
  else state.practiceTarget=null;
  if(type==='builder')initBuilder();
  if(type==='fact'){state.factIndex=0;state.factAnswered=null;state.factScore=0;}
  render();if(type==='listen')hearPracticeTarget();
}
function resetPractice(doRender=true){
  state.practiceLessonId=state.lesson?.id;state.practiceTotal=Math.min(5,window.EngBookPractice.candidates(state.lesson?.hotspots).length);
  state.practiceRound=1;state.practiceCorrect=0;state.practiceFirstTry=0;state.practiceHintCount=0;state.practiceReviewedIds=[];
  state.practiceLocked=false;state.practiceMsg='';state.tapFeedback=null;state.selected=null;choosePracticeTarget();
  if(doRender){render();if(state.practiceType==='listen')hearPracticeTarget();}
}
function choosePracticeTarget(){
  state.practiceTarget=window.EngBookPractice.chooseTarget(state.lesson?.hotspots,{type:state.practiceType,reviewed:state.practiceReviewedIds,
    score:masteryScore,last:word=>masteryRecord(word).last});
  state.practiceMistakes=0;state.practiceHintUsed=false;
}
function hearPracticeTarget(){if(state.mode==='practice'&&state.practiceTarget)speak(state.practiceTarget.en,.82);}
function showPracticeHint(){
  if(!window.EngBookPractice.canAnswer(state))return;
  if(!state.practiceHintUsed){state.practiceHintUsed=true;state.practiceHintCount++;}render();
}
function nextPracticeRound(){
  if(state.mode!=='practice'||!state.practiceLocked||Number(state.practiceLessonId)!==Number(state.lesson?.id))return;
  state.selected=null;state.tapFeedback=null;state.practiceMsg='';state.practiceLocked=false;
  if(state.practiceCorrect>=state.practiceTotal){state.practiceTarget=null;progress.completed[v24CompletionKey('practice')]=true;saveProgress();}
  else{state.practiceRound++;choosePracticeTarget();}
  render();if(state.practiceType==='listen')hearPracticeTarget();
}
function practicePromptShort(){if(state.practiceType==='listen')return 'Listen, then find it';if(state.practiceType==='smart')return state.practiceMistakes>=2?'Adaptive hint active':state.practiceTarget?`Review: ${state.practiceTarget.en}`:'Smart review';return state.practiceTarget?`Find: ${state.practiceTarget.en}`:'Find the detail';}
function answerFind(i){
  if(!window.EngBookPractice.canAnswer(state)||!Number.isInteger(i))return;
  const h=state.lesson.hotspots[i],target=state.practiceTarget;if(!h)return;progress.practice.attempts++;
  if(window.EngBookPractice.matches(h,target)){
    const independent=state.practiceMistakes===0&&!state.practiceHintUsed;
    progress.practice.correct++;progress.practice.streak++;progress.practice.bestStreak=Math.max(progress.practice.bestStreak,progress.practice.streak);
    state.practiceCorrect++;if(independent)state.practiceFirstTry++;state.practiceReviewedIds.push(window.EngBookPractice.key(target));
    state.practiceLocked=true;state.selected=i;state.tapFeedback={x:h.x,y:h.y,ok:true};state.practiceMsg=`Correct — ${h.en}.`;
    recallMastery(h.en,true);resolveMistakes('visual',v24MistakeKey('visual',h.en));progress.activity.recalls=(progress.activity.recalls||0)+1;
    awardPoints(8,'recall');haptic([18,25,35]);speak(h.en,.82);saveProgress();render();
  }else{
    progress.practice.streak=0;state.practiceMistakes++;recallMastery(target.en,false);
    recordMistake('visual',v24MistakeKey('visual',target.en),`Find “${target.en}” in the picture.`,target.en,'Reconnect the English label to its exact visual location.');
    state.tapFeedback={x:h.x,y:h.y,ok:false};state.practiceMsg=`That is ${h.en}. Try another location.`;
    if(state.practiceMistakes>=2&&!state.practiceHintUsed){state.practiceHintUsed=true;state.practiceHintCount++;}
    haptic(20);saveProgress();render();
  }
}
function initBuilder(){const ids=BUILDER_SENTENCES[state.builderIndex].map((_,i)=>i);state.builderAvailable=shuffle([...ids]);state.builderChosen=[];state.builderResult='';}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function builderPick(id){if(!Number.isInteger(id)||!state.builderAvailable.includes(id)||state.builderResult==='correct')return;state.builderAvailable=state.builderAvailable.filter(x=>x!==id);state.builderChosen.push(id);state.builderResult='';haptic(10);render();}
function builderUndo(id){if(!state.builderChosen.length)return;const index=Number.isInteger(id)?state.builderChosen.indexOf(id):state.builderChosen.length-1;if(index<0)return;const removed=state.builderChosen.splice(index,1)[0];state.builderAvailable.push(removed);state.builderResult='';render();}
function builderReset(){initBuilder();render();}
function checkBuilder(){const ok=state.builderChosen.length===BUILDER_SENTENCES[state.builderIndex].length&&state.builderChosen.every((id,i)=>id===i);state.builderResult=ok?'correct':'wrong';haptic(ok?[15,25,40]:25);if(ok){resolveMistakes('builder',String(state.builderIndex));awardPoints(10,'builder');speak(BUILDER_SENTENCES[state.builderIndex].join(' '));}else recordMistake('builder',String(state.builderIndex),'Rebuild the sentence in natural English order.',BUILDER_SENTENCES[state.builderIndex].join(' '),'Keep the relationship phrase inside the evidence boundary; do not turn unshown history into fact.');render();}
function nextBuilder(){state.builderIndex=(state.builderIndex+1)%BUILDER_SENTENCES.length;initBuilder();render();}
function answerFact(kind){if(state.factAnswered||!['fact','inference','unsupported'].includes(kind))return;const item=PRACTICE_ITEMS[state.factIndex];if(!item)return;const ok=kind===item.kind;state.factAnswered={ok,kind};if(ok){state.factScore++;resolveMistakes('evidence',String(state.factIndex));awardPoints(6,'evidence');}else recordMistake('evidence',String(state.factIndex),item.text,item.kind==='fact'?'Visible fact':'Inference',item.note);haptic(ok?[15,25,30]:22);render();}
function nextFact(){if(state.factIndex<PRACTICE_ITEMS.length-1){state.factIndex++;state.factAnswered=null;render();}else{progress.completed.l1_practice=true;saveProgress();toast(`Evidence check complete: ${state.factScore}/${PRACTICE_ITEMS.length}`);state.factIndex=0;state.factAnswered=null;state.factScore=0;render();}}

function practiceContent(){
  const tabs=[['smart','Smart review'],['mistakes',`Mistake repair${(progress.mistakes||[]).length?` (${progress.mistakes.length})`:''}`],['saved',`Saved lines${(progress.savedLines||[]).length?` (${progress.savedLines.length})`:''}`],['find','Find it'],['listen','Listen & find'],['builder','Sentence builder'],['fact','Fact or inference']];
  return `<section><div class="panel-heading"><div><span class="section-kicker">ACTIVE RECALL</span><h2>Make the image pull English from memory</h2><p>Recognition is easy. Recall is what makes the vocabulary usable later.</p></div></div><div class="practice-tabs">${tabs.map(([k,t])=>`<button class="${state.practiceType===k?'active':''}" data-eng-v52-click="setPractice('${k}')">${t}</button>`).join('')}</div>${practiceBody()}</section>`;
}
function practiceBody(){
  if(state.practiceType==='find'||state.practiceType==='listen'||state.practiceType==='smart'){
    if(!state.practiceTarget && state.practiceRound>=5)return `<div class="practice-complete"><div class="success-orb">${icon('check')}</div><span>5-ROUND MEMORY CHECK</span><h3>${state.practiceCorrect}/5 correct</h3><p>Best streak: ${progress.practice.bestStreak}. Run the round again later to strengthen retrieval.</p><button data-eng-v52-click="resetPractice()">${icon('refresh')} Play again</button></div>`;
    const t=state.practiceTarget;
    return `<div class="find-layout"><article class="find-prompt ${state.practiceType==='listen'?'audio-prompt':''} ${state.practiceType==='smart'?'smart-prompt':''}"><span>${state.practiceType==='smart'?'ADAPTIVE REVIEW':`ROUND ${state.practiceRound}/5`}</span>${state.practiceType==='listen'?`<div class="audio-target">${icon('volume')}<b>Listen. Find it in the photo.</b></div><button data-eng-v52-click="speak('${q(t?.en||'')}')">Replay word</button>`:state.practiceType==='smart'?`<div class="smart-target"><div><small>WEAKEST ACTIVE ANCHOR</small><h3>${esc(t?.en||'')}</h3></div><div class="smart-score"><b>${masteryScore(t?.en||'')}%</b><span>${masteryLabel(t?.en||'')}</span></div></div><button data-eng-v52-click="speak('${q(t?.en||'')}')">${icon('volume')} Hear only if needed</button>`:`<h3>${esc(t?.en||'')}</h3><button data-eng-v52-click="speak('${q(t?.en||'')}')">${icon('volume')} Hear pronunciation</button>`}<div class="round-dots">${[1,2,3,4,5].map(n=>`<i class="${n<state.practiceRound?'done':n===state.practiceRound?'current':''}"></i>`).join('')}</div>${state.practiceMsg?`<div class="practice-message ${state.practiceMsg.startsWith('Correct')?'good':'try'}">${esc(state.practiceMsg)}</div>`:''}</article><div class="find-photo-note">${icon('target')}<p>${state.practiceType==='smart'?'The app prioritizes the least-secure visual anchors. After two misses, a minimal location hint appears.':'Use the large image above. Hotspot hints are hidden in memory mode.'}</p></div></div>`;
  }
  if(state.practiceType==='builder')return builderContent();
  if(state.practiceType==='mistakes')return mistakeRepairContent();
  if(state.practiceType==='saved')return savedLinesPracticeContent();
  return factContent();
}
function savedLinesPracticeContent(){const lines=progress.savedLines||[];if(!lines.length)return `<div class="practice-complete repair-empty"><div class="success-orb">${icon('star')}</div><span>SAVED LANGUAGE</span><h3>No repaired lines saved yet.</h3><p>Complete Scene Conversation, then save stronger versions that you want to reuse in later descriptions.</p><button data-eng-v52-click="setMode('talk')">Open conversation</button></div>`;return `<div class="saved-lines practice-library"><div><span>REUSABLE LANGUAGE</span><h3>Hear → shadow → use again</h3><p>These lines came from your conversation repairs. Revisit them until they become easy to produce from the image.</p></div>${lines.slice().reverse().map((l,i)=>{const ix=lines.length-1-i;return `<article><p>${esc(l)}</p><div><button data-engbook-action="saved-natural" data-line-index="${ix}">${icon('volume')} Natural</button><button data-engbook-action="saved-slow" data-line-index="${ix}">${icon('volume')} Slow</button><button data-engbook-action="saved-shadow" data-line-index="${ix}">${icon('mic')} Shadow & describe</button></div></article>`}).join('')}</div>`;}
function v36InstallSafeDelegation(){
  if(document.documentElement?.dataset?.engbookSafeDelegation==='1')return;
  if(document.documentElement?.dataset)document.documentElement.dataset.engbookSafeDelegation='1';
  document.addEventListener('click',e=>{
    const btn=e.target?.closest?.('[data-engbook-action]');if(!btn)return;
    const action=btn.dataset.engbookAction;
    if(action&&action.startsWith('saved-')){
      e.preventDefault();const ix=Number(btn.dataset.lineIndex),line=(progress.savedLines||[])[ix];if(typeof line!=='string')return;
      if(action==='saved-panel')speak(line,.8);
      else if(action==='saved-natural')speak(line,.86);
      else if(action==='saved-slow')speak(line,.62);
      else if(action==='saved-shadow'){state.mode='speak';state.blindDescribe=false;render();setTimeout(()=>speak(line,.72),180);}
    }
  });
}
v36InstallSafeDelegation();

function builderContent(){
  const parts=BUILDER_SENTENCES[state.builderIndex];
  return `<div class="builder-card"><div class="builder-head"><div><span>SENTENCE ${state.builderIndex+1}/${BUILDER_SENTENCES.length}</span><h3>Build the sentence from meaning chunks</h3></div><button data-eng-v52-click="builderReset()">${icon('reset')} Reset</button></div><div class="answer-zone ${state.builderResult}">${state.builderChosen.length?state.builderChosen.map(id=>`<button data-eng-v52-click="builderUndo(${id})">${esc(parts[id])}</button>`).join(''):'<span>Tap the chunks below in the right order…</span>'}</div><div class="token-bank">${state.builderAvailable.map(id=>`<button data-eng-v52-click="builderPick(${id})">${esc(parts[id])}</button>`).join('')}</div><div class="builder-actions"><button class="secondary" data-eng-v52-click="builderUndo()" ${!state.builderChosen.length?'disabled':''}>Undo</button><button class="primary" data-eng-v52-click="checkBuilder()" ${state.builderChosen.length!==parts.length||state.builderResult==='correct'?'disabled':''}>Check sentence</button></div>${state.builderResult==='correct'?`<div class="builder-feedback good">${icon('check')} Correct. Notice how the relationship language stays inside the evidence boundary. <button data-eng-v52-click="nextBuilder()">Next sentence →</button></div>`:state.builderResult==='wrong'?`<div class="builder-feedback try">Not quite. Keep the action chunks in natural English order.</div>`:''}</div>`;
}
function factContent(){
  const item=PRACTICE_ITEMS[state.factIndex];
  return `<div class="fact-game"><div class="fact-counter"><span>EVIDENCE CHECK ${state.factIndex+1}/${PRACTICE_ITEMS.length}</span><b>${state.factScore} correct</b></div><article><div class="quote-mark">“</div><h3>${esc(item.text)}</h3><p>Is this directly supported by the image, or is it an interpretation/story claim?</p></article><div class="fact-actions"><button data-eng-v52-click="answerFact('fact')" ${state.factAnswered?'disabled':''}>${icon('eye')} Visible fact</button><button data-eng-v52-click="answerFact('inference')" ${state.factAnswered?'disabled':''}>${icon('layers')} Inference</button></div>${state.factAnswered?`<div class="fact-feedback ${state.factAnswered.ok?'good':'try'}"><b>${state.factAnswered.ok?'Correct':'Check the evidence again'}</b><p>${esc(item.note)}</p><button data-eng-v52-click="nextFact()">${state.factIndex===PRACTICE_ITEMS.length-1?'Finish':'Next'} →</button></div>`:''}</div>`;
}

function prepareSpeaking(sec){clearTimer();state.speakingDuration=sec;state.speakingSeconds=sec;state.transcript='';render();}
function toggleTimer(){if(state.speakingRunning){clearTimer();render();return;}if(state.speakingSeconds<=0)state.speakingSeconds=state.speakingDuration;state.speakingRunning=true;render();timerId=setInterval(()=>{state.speakingSeconds--;updateTimerDom();if(state.speakingSeconds<=0){clearTimer();progress.speakingAttempts++;progress.activity.speaks=(progress.activity.speaks||0)+1;progress.completed.l1_speaking=true;if(state.transcript){progress.lastSpeechScore=speechAnalysis().overall;saveCoverageResult();saveEvidenceResult();}awardPoints(state.blindDescribe?25:15,'speak');saveProgress();haptic([30,50,30]);toast('Time is up — nice work.');render();}},1000);}
function clearTimer(){if(timerId){clearInterval(timerId);timerId=null;}state.speakingRunning=false;}
function resetTimer(){clearTimer();state.speakingSeconds=state.speakingDuration;render();}
function formatTime(s){return `0:${String(Math.max(0,s)).padStart(2,'0')}`;}
function updateTimerDom(){const t=document.getElementById('timerText'),r=document.getElementById('timerRing');if(t)t.textContent=formatTime(state.speakingSeconds);if(r)r.style.setProperty('--timer-p',`${(state.speakingSeconds/state.speakingDuration)*360}deg`);}

async function toggleRecording(){
  if(state.recording){try{state.recorder.stop();}catch(e){}return;}
  if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){toast('Voice recording needs a modern browser on localhost or HTTPS.');return;}
  try{const stream=await navigator.mediaDevices.getUserMedia({audio:true});state.chunks=[];state.recorder=new MediaRecorder(stream);state.recorder.ondataavailable=e=>{if(e.data.size)state.chunks.push(e.data)};state.recorder.onstop=()=>{const blob=new Blob(state.chunks,{type:state.recorder.mimeType||'audio/webm'});if(state.recordedUrl)URL.revokeObjectURL(state.recordedUrl);state.recordedUrl=URL.createObjectURL(blob);stream.getTracks().forEach(t=>t.stop());state.recording=false;progress.speakingAttempts++;progress.activity.speaks=(progress.activity.speaks||0)+1;if(state.transcript){progress.lastSpeechScore=speechAnalysis().overall;saveCoverageResult();saveEvidenceResult();}awardPoints(12,'record');saveProgress();render();};state.recorder.start();state.recording=true;haptic(20);render();}catch(e){toast('Microphone permission was not granted.');}
}
function speechRecognitionCtor(){return window.SpeechRecognition||window.webkitSpeechRecognition;}
function toggleRecognition(){if(state.listening){stopRecognition();render();return;}const C=speechRecognitionCtor();if(!C){toast('Live transcript is not supported by this browser. Voice recording still works.');return;}try{const r=new C();r.lang='en-US';r.continuous=true;r.interimResults=true;state.recognition=r;state.listening=true;r.onresult=e=>{let text='';for(let i=0;i<e.results.length;i++)text+=e.results[i][0].transcript+' ';state.transcript=text.trim();updateTranscriptDom();};r.onerror=()=>{state.listening=false;render();};r.onend=()=>{state.listening=false;render();};r.start();render();}catch(e){toast('Live transcript could not start.');}}
function stopRecognition(){if(state.recognition){try{state.recognition.stop();}catch(e){}state.recognition=null;}state.listening=false;}
function normalizeCoverageText(text){return ` ${String(text||'').toLowerCase().replace(/[’']/g,"'").replace(/[^a-z0-9\-\s']/g,' ').replace(/\s+/g,' ').trim()} `;}
function coverageTermHit(text,term){
  const t=normalizeCoverageText(text), needle=normalizeCoverageText(term).trim();
  if(!needle)return false;
  if(needle.includes(' ' )||needle.includes('-'))return t.includes(` ${needle} `)||t.includes(needle);
  return new RegExp(`\\b${needle.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&')}s?\\b`,'i').test(t);
}
function sceneCoverageAnalysis(text=state.transcript){
  const hits=activeCoverageAnchors().filter(a=>a.terms.some(term=>coverageTermHit(text,term)));
  const hitKeys=new Set(hits.map(a=>a.key));
  const total=activeCoverageAnchors().reduce((n,a)=>n+a.weight,0),earned=hits.reduce((n,a)=>n+a.weight,0);
  const pct=total?Math.round(earned/total*100):0;
  const groups=COVERAGE_GROUPS.map(group=>{const all=activeCoverageAnchors().filter(a=>a.group===group),got=all.filter(a=>hitKeys.has(a.key));const tw=all.reduce((n,a)=>n+a.weight,0),ew=got.reduce((n,a)=>n+a.weight,0);return {group,pct:tw?Math.round(ew/tw*100):0,hit:got.length,total:all.length};});
  const missing=activeCoverageAnchors().filter(a=>!hitKeys.has(a.key)).sort((a,b)=>b.weight-a.weight);
  return {hits,hitKeys,pct,earned,total,groups,missing};
}
function saveCoverageResult(){
  if(wordCount(state.transcript)<3)return;
  const c=sceneCoverageAnalysis();
  progress.coverage=progress.coverage||{best:0,last:0,runs:0,groups:{}};
  progress.coverage.last=c.pct;progress.coverage.best=Math.max(progress.coverage.best||0,c.pct);progress.coverage.runs=(progress.coverage.runs||0)+1;
  c.groups.forEach(g=>progress.coverage.groups[g.group]=Math.max(progress.coverage.groups[g.group]||0,g.pct));
  saveProgress();
}
function toggleCoverageOverlay(){state.coverageOverlay=!state.coverageOverlay;haptic(10);render();}
function toggleCoverageReview(){state.coverageReview=!state.coverageReview;render();}
function coverageOverlayMarkup(){
  if(state.mode!=='speak'||!state.coverageOverlay)return '';
  const c=sceneCoverageAnalysis();
  return `<div class="coverage-canvas" aria-hidden="true">${activeCoverageAnchors().map((a,i)=>`<div class="coverage-anchor ${c.hitKeys.has(a.key)?'hit':''} ${state.coverageReview&&!c.hitKeys.has(a.key)?'missing':''} ${selectedEvidenceKeys().has(a.key)?'evidence-link':''}" data-coverage-key="${a.key}" style="left:${a.x}%;top:${a.y}%;--delay:${(i%5)*.06}s"><i></i><span>${esc(a.label)}</span></div>`).join('')}</div>`;
}
function liveSceneCoverageCard(){
  const c=sceneCoverageAnalysis(),best=progress.coverage?.best||0;
  return `<div class="scene-coverage-card"><div class="scene-coverage-head"><div><span>LIVE SCENE COVERAGE</span><h3><b id="coveragePct">${c.pct}%</b> of the scene described</h3><p>Coverage is based on image-supported scene anchors — not on using one memorized model answer.</p></div><div class="coverage-best"><span>BEST</span><b>${best}%</b></div></div><div class="coverage-master"><i><em id="coverageMeter" style="width:${c.pct}%"></em></i><div><span id="coverageCount">${c.hits.length}/${activeCoverageAnchors().length} anchors</span><button data-eng-v52-click="toggleCoverageReview()">${state.coverageReview?'Hide gaps':'Show gaps'}</button></div></div><div class="coverage-groups" id="coverageGroups">${c.groups.map(g=>`<div data-coverage-group="${g.group}"><span>${g.group}</span><i><em style="width:${g.pct}%"></em></i><b>${g.pct}%</b></div>`).join('')}</div><div class="coverage-next"><span>NEXT HIGH-VALUE DETAILS</span><div id="coverageMissing">${c.missing.slice(0,5).map(a=>`<i>${esc(a.label)}</i>`).join('')||'<b>Excellent — the major scene anchors are covered.</b>'}</div></div><div class="coverage-note">Live highlights show <b>what you have already communicated</b>. “Show gaps” reveals target areas for review; it does not mean every detail must appear in every answer.</div></div>`;
}
function updateCoverageDom(){
  const c=sceneCoverageAnalysis(),newKeys=[];
  document.querySelectorAll('[data-coverage-key]').forEach(node=>{const key=node.dataset.coverageKey,hit=c.hitKeys.has(key),was=node.classList.contains('hit');node.classList.toggle('hit',hit);node.classList.toggle('missing',state.coverageReview&&!hit);if(hit&&!was){node.classList.add('just-hit');newKeys.push(key);setTimeout(()=>node.classList.remove('just-hit'),900);}});
  const p=document.getElementById('coveragePct');if(p)p.textContent=`${c.pct}%`;
  const m=document.getElementById('coverageMeter');if(m)m.style.width=`${c.pct}%`;
  const n=document.getElementById('coverageCount');if(n)n.textContent=`${c.hits.length}/${activeCoverageAnchors().length} anchors`;
  document.querySelectorAll('[data-coverage-group]').forEach(row=>{const g=c.groups.find(x=>x.group===row.dataset.coverageGroup);if(!g)return;const em=row.querySelector('em'),b=row.querySelector('b');if(em)em.style.width=`${g.pct}%`;if(b)b.textContent=`${g.pct}%`;});
  const miss=document.getElementById('coverageMissing');if(miss)miss.innerHTML=c.missing.slice(0,5).map(a=>`<i>${esc(a.label)}</i>`).join('')||'<b>Excellent — the major scene anchors are covered.</b>';
  if(newKeys.length){const first=activeCoverageAnchors().find(a=>a.key===newKeys[0]);if(first)haptic(8);}updateEvidenceAnchorLinks();
}
function detectedKeywords(){const t=state.transcript.toLowerCase();return COACH_KEYWORDS.filter(([_,needle])=>t.includes(needle)).map(x=>x[0]);}
function hasAnyPhrase(text,items){const t=normalizeCoverageText(text);return items.some(x=>t.includes(` ${x} `)||t.includes(x));}
function evidenceHasCaution(text){return hasAnyPhrase(text,EVIDENCE_CAUTION_TERMS);}
function evidenceHasCertainty(text){return hasAnyPhrase(text,EVIDENCE_CERTAINTY_TERMS);}
function evidenceSupportAnchors(text){return activeCoverageAnchors().filter(a=>a.terms.some(term=>coverageTermHit(text,term)));}
function splitEvidenceClaims(text){
  let raw=String(text||'').replace(/\s+/g,' ').trim();if(!raw)return [];
  let parts=raw.split(/(?<=[.!?])\s+/).map(x=>x.trim()).filter(Boolean);
  if(parts.length===1&&wordCount(raw)>28){parts=raw.split(/\s+(?=(?:and|but|while|because|although|then|however)\s+)/i).map(x=>x.trim()).filter(x=>wordCount(x)>2);}
  return parts.slice(0,10);
}
function firstRule(list,text){return list.find(r=>r.re.test(text));}
function directRuleFor(text){return EVIDENCE_DIRECT_RULES.find(r=>r.re.test(text));}
function inferenceRuleFor(text){return EVIDENCE_INFERENCE_RULES.find(r=>r.re.test(text));}
function supportForInference(rule,anchors){if(!rule)return anchors;const byKey=new Map(activeCoverageAnchors().map(a=>[a.key,a]));const explicit=(rule.support||[]).map(k=>byKey.get(k)).filter(Boolean);const merged=[...explicit,...anchors];return [...new Map(merged.map(a=>[a.key,a])).values()].slice(0,5);}
function defaultEvidenceRepair(claim,anchors){
  const names=anchors.slice(0,3).map(a=>a.label);
  if(names.length)return `Start from the visible evidence (${names.join(', ')}), then use may / might / seems if you add an interpretation.`;
  return 'Return to a visible person, object, action, position, or light clue before adding interpretation.';
}
function classifyEvidenceClaim(claim){
  const text=String(claim||'').trim(),low=text.toLowerCase(),anchors=evidenceSupportAnchors(text),cautious=evidenceHasCaution(low),certain=evidenceHasCertainty(low);
  const contradiction=firstRule(EVIDENCE_CONTRADICTIONS,text);if(contradiction)return {type:'unsupported',label:'UNSUPPORTED CLAIM',confidence:'—',text,anchors:[],reason:contradiction.reason,repair:defaultEvidenceRepair(text,[]),score:0,cautious};
  const hard=firstRule(EVIDENCE_HARD_UNSUPPORTED,text);if(hard)return {type:'unsupported',label:'UNSUPPORTED CLAIM',confidence:'—',text,anchors,reason:hard.reason,repair:hard.repair,score:0,cautious};
  const inf=inferenceRuleFor(text);
  if(inf){
    const support=supportForInference(inf,anchors),needsCaution=inf.confidence!=='HIGH',unsafeLow=inf.confidence==='LOW'&&!cautious;
    if(unsafeLow)return {type:'unsupported',label:'UNSUPPORTED CLAIM',confidence:'LOW idea stated as fact',text,anchors:support,reason:`${inf.reason} This low-confidence idea needs explicit uncertainty language.`,repair:`Try: “They may / might / could …” rather than presenting this as a fact.`,score:18,cautious};
    const base={HIGH:94,MEDIUM:82,LOW:68}[inf.confidence]||70,score=Math.max(45,base-(needsCaution&&!cautious?18:0));
    return {type:'inference',label:'SUPPORTED INFERENCE',confidence:inf.confidence,text,anchors:support,reason:inf.reason,repair:needsCaution&&!cautious?'Add may / might / seems / appears to label the uncertainty more clearly.':'Good separation: the interpretation is connected to visible clues.',score,cautious};
  }
  const direct=directRuleFor(text);if(direct){const support=supportForInference(direct,anchors);return {type:'fact',label:'VISIBLE FACT',confidence:'DIRECT',text,anchors:support,reason:direct.reason,repair:'No repair needed. This sentence stays close to visible evidence.',score:100,cautious:false};}
  if(certain&&anchors.length<2)return {type:'unsupported',label:'UNSUPPORTED CLAIM',confidence:'—',text,anchors,reason:'Strong certainty language goes beyond what this still image can prove.',repair:defaultEvidenceRepair(text,anchors),score:10,cautious};
  if(cautious){return {type:'inference',label:'SUPPORTED INFERENCE',confidence:'LOW',text,anchors,reason:anchors.length?'The uncertainty is clearly labeled and linked to visible scene evidence.':'The uncertainty is labeled, but the idea would be stronger if you connected it to a visible clue.',repair:anchors.length?'Good. Keep the possibility clearly separate from visible fact.':'Add a visible clue after the inference: “... because I can see ...”',score:anchors.length?68:52,cautious:true};}
  if(anchors.length){return {type:'fact',label:'VISIBLE FACT',confidence:'DIRECT',text,anchors,reason:`Direct scene support: ${anchors.slice(0,4).map(a=>a.label).join(', ')}.`,repair:'No repair needed. This sentence stays close to visible evidence.',score:100,cautious:false};}
  if(EVIDENCE_SUBJECTIVE_TERMS.some(x=>low.includes(x)))return {type:'inference',label:'SUPPORTED INFERENCE',confidence:'LOW',text,anchors,reason:'This is a subjective interpretation rather than a directly verifiable visual fact.',repair:'Label it as a personal impression: “The scene seems / looks … to me.”',score:52,cautious};
  return {type:'unsupported',label:'UNSUPPORTED CLAIM',confidence:'—',text,anchors:[],reason:'The Lesson 01 scene map does not contain enough visual support for this claim.',repair:defaultEvidenceRepair(text,[]),score:8,cautious};
}
function evidenceAnalysis(text=state.transcript){
  const claims=splitEvidenceClaims(text).map(classifyEvidenceClaim),visible=claims.filter(c=>c.type==='fact').length,inference=claims.filter(c=>c.type==='inference').length,review=claims.filter(c=>c.type==='review').length,unsupported=claims.filter(c=>c.type==='unsupported').length;
  const safe=visible+inference,factFirst=claims[0]?.type==='fact',inferNeedingCaution=claims.filter(c=>c.type==='inference'&&c.confidence!=='HIGH'),cautiousCount=inferNeedingCaution.filter(c=>c.cautious).length;
  let control=claims.length?Math.round(claims.reduce((n,c)=>n+c.score,0)/claims.length):0;if(claims.length&&factFirst)control=Math.min(100,control+5);if(claims.length&&unsupported===0)control=Math.min(100,control+3);
  return {claims,visible,inference,review,unsupported,safe,factFirst,cautiousCount,inferNeedingCaution:inferNeedingCaution.length,control};
}
function evidenceStatusMeta(type){return type==='fact'?{icon:'eye',short:'FACT'}:type==='inference'?{icon:'layers',short:'INFERENCE'}:type==='review'?{icon:'target',short:'CHECK'}:{icon:'close',short:'UNSUPPORTED'};}
function selectedEvidenceClaim(){const a=evidenceAnalysis();if(!a.claims.length)return null;const i=clamp(state.evidenceSelected??0,0,a.claims.length-1);return {claim:a.claims[i],index:i};}
function selectedEvidenceKeys(){const sel=selectedEvidenceClaim();return new Set((sel?.claim?.anchors||[]).map(a=>a.key));}
function toggleEvidenceLive(){state.evidenceLive=!state.evidenceLive;state.evidenceSelected=null;haptic(10);updateEvidenceDom();updateCoverageDom();}
function selectEvidenceClaim(index){state.evidenceSelected=index;haptic(8);updateEvidenceDom();updateCoverageDom();}
function toggleEvidenceShowAll(){state.evidenceShowAll=!state.evidenceShowAll;updateEvidenceDom();}
function saveEvidenceRepair(index){const a=evidenceAnalysis(),c=a.claims[index];if(!c||!c.repair)return;progress.savedLines=progress.savedLines||[];if(!progress.savedLines.includes(c.repair))progress.savedLines.push(c.repair);progress.evidence=progress.evidence||{};progress.evidence.repairs=(progress.evidence.repairs||0)+1;saveProgress();toast('Repair cue saved for later retrieval');updateEvidenceDom();}
function evidenceClaimRows(a){const list=state.evidenceShowAll?a.claims:a.claims.slice(0,4);return list.map((c,i)=>{const m=evidenceStatusMeta(c.type),realIndex=i;return `<button class="evidence-claim-row ${c.type} ${(state.evidenceSelected??0)===realIndex?'selected':''}" data-eng-v52-click="selectEvidenceClaim(${realIndex})"><i>${icon(m.icon)}</i><div><span>${m.short}${c.type==='inference'?` · ${c.confidence}`:''}</span><p>${esc(c.text)}</p></div><b>${c.score}</b></button>`;}).join('');}
function evidenceInspector(a){if(!a.claims.length)return '';const i=clamp(state.evidenceSelected??0,0,a.claims.length-1),c=a.claims[i],m=evidenceStatusMeta(c.type);return `<div class="claim-inspector ${c.type}"><div class="claim-inspector-head"><span>${icon(m.icon)} CLAIM INSPECTOR</span><b>${esc(c.label)}${c.type==='inference'?` · ${esc(c.confidence)}`:''}</b></div><p class="claim-quote">“${esc(c.text)}”</p><div class="claim-proof"><span>WHY</span><p>${esc(c.reason)}</p></div><div class="claim-support"><span>VISUAL SUPPORT</span><div>${c.anchors.length?c.anchors.map(x=>`<i>${esc(x.label)}</i>`).join(''):'<em>No reliable scene anchor linked.</em>'}</div></div><div class="claim-repair"><div><span>${c.type==='fact'?'KEEP IT':'SAFER LANGUAGE'}</span><p>${esc(c.repair)}</p></div><div><button data-eng-v52-click="speak('${q(c.repair)}',.78)">${icon('volume')} Hear</button>${c.type!=='fact'?`<button data-eng-v52-click="saveEvidenceRepair(${i})">${icon('star')} Save cue</button>`:''}</div></div></div>`;}
function evidenceEngineInner(){
  const a=evidenceAnalysis(),best=progress.evidence?.best||0;if(!state.evidenceLive)return `<div class="evidence-off"><div>${icon('eye')}</div><span>EVIDENCE ENGINE PAUSED</span><p>Turn Evidence live back on to inspect claims while you speak.</p><button data-eng-v52-click="toggleEvidenceLive()">Resume evidence engine</button></div>`;
  if(wordCount(state.transcript)<3)return `<div class="evidence-empty"><div>${icon('eye')}</div><div><span>EVIDENCE ENGINE</span><h3>Say a fact. Then add an inference.</h3><p>Your transcript will be separated into Visible Fact, Supported Inference, and Unsupported Claim. This is scene-specific feedback, not a general truth detector.</p></div></div>`;
  return `<div class="evidence-engine-card"><div class="evidence-engine-head"><div><span>LIVE EVIDENCE ENGINE</span><h3><b>${a.control}%</b> evidence control</h3><p>Fact first → inference labeled → unsupported certainty repaired.</p></div><div class="evidence-best"><span>BEST</span><b>${best}%</b></div></div><div class="evidence-triad"><div class="fact"><b>${a.visible}</b><span>Visible fact</span></div><div class="inference"><b>${a.inference}</b><span>Supported inference</span></div><div class="review"><b>${a.review||0}</b><span>Needs relation check</span></div><div class="unsupported"><b>${a.unsupported}</b><span>Unsupported</span></div></div><div class="evidence-discipline"><span class="${a.factFirst?'ok':'warn'}">${a.factFirst?icon('check'):icon('eye')} ${a.factFirst?'Fact-first opening detected':'Try opening with a visible fact'}</span><span class="${a.inferNeedingCaution===0||a.cautiousCount===a.inferNeedingCaution?'ok':'warn'}">${a.inferNeedingCaution===0||a.cautiousCount===a.inferNeedingCaution?icon('check'):icon('layers')} ${a.inferNeedingCaution?`${a.cautiousCount}/${a.inferNeedingCaution} uncertain ideas clearly labeled`:'No low/medium inference yet'}</span></div><div class="evidence-stream"><div class="evidence-stream-head"><span>CLAIM STREAM</span>${a.claims.length>4?`<button data-eng-v52-click="toggleEvidenceShowAll()">${state.evidenceShowAll?'Show less':`Show all ${a.claims.length}`}</button>`:''}</div>${evidenceClaimRows(a)}</div>${evidenceInspector(a)}<div class="evidence-legend"><span><i class="fact"></i> Directly visible</span><span><i class="inference"></i> Plausible + clue</span><span><i class="review"></i> Visible terms, relation unverified</span><span><i class="unsupported"></i> Needs repair</span></div><p class="evidence-scope">Grounded only in the active lesson’s reviewed scene map and accuracy guardrails. It does not judge real-world truth outside this scene.</p></div>`;
}
function evidenceEngineCard(){return `<div id="evidenceEngineMount" class="evidence-engine-mount">${evidenceEngineInner()}</div>`;}
function updateEvidenceDom(){const m=document.getElementById('evidenceEngineMount');if(m)m.innerHTML=evidenceEngineInner();}
function saveEvidenceResult(){if(wordCount(state.transcript)<3)return;const a=evidenceAnalysis();progress.evidence=progress.evidence||{best:0,last:0,runs:0,safeClaims:0,unsupported:0,repairs:0};progress.evidence.last=a.control;progress.evidence.best=Math.max(progress.evidence.best||0,a.control);progress.evidence.runs=(progress.evidence.runs||0)+1;progress.evidence.safeClaims=(progress.evidence.safeClaims||0)+a.safe;progress.evidence.unsupported=(progress.evidence.unsupported||0)+a.unsupported;saveProgress();}
function updateEvidenceAnchorLinks(){const keys=state.evidenceLive?selectedEvidenceKeys():new Set();document.querySelectorAll('[data-coverage-key]').forEach(n=>n.classList.toggle('evidence-link',keys.has(n.dataset.coverageKey)));}
function updateTranscriptDom(){const el=document.getElementById('liveTranscript');if(el)el.textContent=state.transcript||'Listening…';const found=detectedKeywords();document.querySelectorAll('[data-keyword]').forEach(x=>x.classList.toggle('hit',found.includes(x.dataset.keyword)));updateCoverageDom();updateEvidenceDom();updateEvidenceAnchorLinks();}

function wordCount(text){return (String(text).trim().match(/[A-Za-z]+(?:'[A-Za-z]+)?/g)||[]).length;}
function containsAny(t,arr){return arr.filter(x=>t.includes(x));}
function speechAnalysis(){
  const t=state.transcript.toLowerCase(), wc=wordCount(state.transcript), found=detectedKeywords();
  const spatial=containsAny(t,SPATIAL_TERMS), caution=containsAny(t,CAUTION_TERMS), seq=containsAny(t,SEQUENCE_TERMS);
  const grammar=/(\bis\b|\bare\b|\bam\b)\s+(?:\w+\s+){0,2}\w+ing\b/.test(t)||t.includes('while');
  const targets={30:[30,65],60:[60,120],90:[90,175]}, [lo,hi]=targets[state.speakingDuration];
  const lengthScore=wc===0?0:wc<lo?Math.round(wc/lo*100):wc>hi?Math.max(55,100-Math.round((wc-hi)/hi*80)):100;
  const sceneCov=sceneCoverageAnalysis(), evidence=evidenceAnalysis(), detailScore=sceneCov.pct;
  const spatialScore=Math.min(100,spatial.length*45);
  const grammarScore=grammar?100:(t.includes('walking')||t.includes('holding'))?45:0;
  const cautionRequired=state.speakingDuration>=60, cautionScore=cautionRequired?Math.min(100,caution.length*70):(caution.length?100:70);
  const structureScore=Math.min(100,seq.length*38 + (t.includes('sunset')?20:0));
  const dims=[['Visual detail',detailScore,`${sceneCov.hits.length}/${activeCoverageAnchors().length} image-supported anchors detected`],['Evidence control',evidence.control,evidence.claims.length?`${evidence.visible} fact · ${evidence.inference} inference · ${evidence.review||0} check · ${evidence.unsupported} unsupported`:'Start with one visible fact'],['Spatial language',spatialScore,spatial.length?spatial.slice(0,3).join(' · '):'Try along / beside / background'],['Target grammar',grammarScore,grammar?'present continuous / while detected':'Use is/are + verb-ing'],['Cautious inference',cautionScore,caution.length?caution.join(' · '):cautionRequired?'Try may / might / seems':'Optional at 30 seconds'],['Length target',lengthScore,`${wc} words in transcript`],['Organization',structureScore,seq.length?seq.slice(0,3).join(' · '):'Try first / while / then or foreground → background']];
  return {wc,found,dims,overall:Math.round(dims.reduce((a,d)=>a+d[1],0)/dims.length)};
}
function speechCoachCard(){
  const a=speechAnalysis();if(a.wc<3)return `<div class="coach-empty">${icon('spark')}<div><b>Transcript-based structure check</b><p>Turn on Live language coach and speak for a few seconds. You’ll get feedback on scene coverage, spatial language, grammar, cautious inference, organization, and length. This is not a pronunciation or CEFR score.</p></div></div>`;
  return `<div class="coach-score-card"><div class="coach-score-head"><div><span>STRUCTURE CHECK</span><h3>${a.overall}%</h3></div><p>Transcript-based estimate<br><b>not</b> a pronunciation score</p></div><div class="coach-dimensions">${a.dims.map(([name,score,note])=>`<div><div><span>${esc(name)}</span><b>${score}%</b></div><i><em style="width:${score}%"></em></i><small>${esc(note)}</small></div>`).join('')}</div></div>`;
}
function transcriptComparisonCard(){const c=transcriptCompare();return `<div class="transcript-compare"><div class="compare-mini-head"><div><span>REPLAY & COMPARE</span><b>What is still missing?</b></div><button data-eng-v52-click="state.compareOpen=!state.compareOpen;render()">${state.compareOpen?'Hide':'Open'}</button></div>${state.compareOpen?`<div class="compare-mini-grid"><div><span>SCENE ANCHORS TO ADD</span>${c.missing.length?c.missing.map(x=>`<i>${esc(x)}</i>`).join(''):'<b>Good visual coverage.</b>'}</div><div><span>LANGUAGE FUNCTIONS TO ADD</span>${c.funcs.length?c.funcs.map(x=>`<i>${esc(x)}</i>`).join(''):'<b>Core functions detected.</b>'}</div></div><p>This compares your transcript with the lesson’s target ingredients, not with one “perfect” sentence.</p>`:''}</div>`;}
function speakContent(){
  const g=activeGold(),found=detectedKeywords();
  const coverage=state.blindDescribe?'':liveSceneCoverageCard();
  const mission=state.blindDescribe?`<div class="coach-prompt blind-prompt"><span>COLD MISSION</span><p>Describe the scene for 60 seconds from the image alone. No word bank, no model, and no detailed prompt.</p></div>`:`<div class="coach-prompt"><span>YOUR MISSION</span><p>${esc(g.speaking[state.speakingDuration])}</p></div>`;
  return `<section>${blindDescribeBanner()}<div class="panel-heading"><div><span class="section-kicker">SPEAKING COACH</span><h2>Describe, support, then infer</h2><p>Build a clear visual description first. Live Scene Coverage tracks what you communicated; Evidence Engine checks how safely you separate fact from inference.</p></div><button class="complete-btn ${progress.completed.l1_speaking?'done':''}" data-eng-v52-click="markComplete('l1_speaking')">${progress.completed.l1_speaking?icon('check')+' Complete':'Mark complete'}</button></div>${state.blindDescribe?'':`<div class="scene-outline"><div class="outline-head"><div><span>DESCRIPTION OUTLINE</span><b>Build a route, not a script</b></div><small>${state.outlineSelected.length}/5 active</small></div><div class="outline-slots">${OUTLINE_SLOTS.map(([k,label,sub])=>`<button class="${state.outlineSelected.includes(k)?'active':''}" data-eng-v52-click="toggleOutline('${k}')"><i>${state.outlineSelected.includes(k)?icon('check'):''}</i><span><b>${label}</b><small>${sub}</small></span></button>`).join('')}</div><div class="outline-preview">${state.outlineSelected.map(k=>`<span><b>${k.toUpperCase()}</b>${esc(outlinePrompt(k))}</span>`).join('')||'<em>Select 2–4 anchors for your speaking route.</em>'}</div></div>`}<div class="speaking-layout"><div class="coach-left"><div class="duration-switch">${[30,60,90].map(n=>`<button class="${state.speakingDuration===n?'active':''}" data-eng-v52-click="prepareSpeaking(${n})"><b>${n}</b><span>sec</span></button>`).join('')}</div>${mission}<div class="speaking-console"><div class="timer-ring" id="timerRing" style="--timer-p:${(state.speakingSeconds/state.speakingDuration)*360}deg"><div><b id="timerText">${formatTime(state.speakingSeconds)}</b><span>${state.speakingRunning?'SPEAKING':'READY'}</span></div></div><div class="console-actions"><button class="primary" data-eng-v52-click="toggleTimer()">${icon(state.speakingRunning?'close':'play')} ${state.speakingRunning?'Pause':'Start timer'}</button><button data-eng-v52-click="resetTimer()">${icon('refresh')} Reset</button></div></div><div class="recording-row"><button class="record-btn ${state.recording?'live':''}" data-eng-v52-click="toggleRecording()">${icon('mic')}<span><b>${state.recording?'Stop recording':'Record my voice'}</b><small>Stays on this device</small></span></button><button class="transcript-btn ${state.listening?'live':''}" data-eng-v52-click="toggleRecognition()">${icon('spark')}<span><b>${state.listening?'Stop live coach':'Live language coach'}</b><small>${speechRecognitionCtor()?'Optional speech-to-text':'Browser support required'}</small></span></button></div>${state.recordedUrl?`<div class="audio-review"><span>YOUR RECORDING</span><audio controls src="${state.recordedUrl}"></audio></div>`:''}</div><div class="coach-right">${speechCoachCard()}${state.transcript&&wordCount(state.transcript)>3?transcriptComparisonCard():''}${coverage}${state.blindDescribe?'':evidenceEngineCard()}<div class="transcript-card"><div><span>LIVE TRANSCRIPT</span><small>English (US)</small></div><p id="liveTranscript">${esc(state.transcript||'Turn on Live language coach to see your speech here.')}</p></div><div class="self-review"><span>FAST SELF-CHECK</span>${['I named visible facts first.','I used spatial language.','I used the target grammar naturally.','I labeled uncertain ideas with may / might / seems.'].map(x=>`<label><input type="checkbox"><i></i>${x}</label>`).join('')}</div></div></div>${modelCompare(g)}</section>`;
}
function modelCompare(g){if(state.blindDescribe)return `<div class="compare-card locked"><div><span>COLD DESCRIBE</span><h3>Model comparison is hidden during the challenge.</h3></div><div class="lock-visual">${icon('target')}<p>Finish your attempt, then leave Cold Describe to compare.</p></div></div>`;const unlocked=(progress.speakingAttempts||0)>0;return `<div class="compare-card ${unlocked?'unlocked':'locked'}"><div><span>COMPARE AFTER YOUR ATTEMPT</span><h3>${unlocked?'Now compare — do not memorize.':'Model answer stays locked until you make one voice attempt.'}</h3></div>${unlocked?`<div class="level-switch">${Object.keys(g.grammar.models).map(l=>`<button class="${state.level===l?'active':''}" data-eng-v52-click="state.level='${q(l)}';render()">${l}</button>`).join('')}</div><p>${esc(g.grammar.models[state.level])}</p><button data-eng-v52-click="speak('${q(g.grammar.models[state.level])}',.9)">${icon('volume')} Listen to model</button>`:`<div class="lock-visual">${icon('mic')}<p>Record or finish a timed speaking attempt to unlock comparison.</p></div>`}</div>`;}


function homePracticeHub(){const r=recommendedAction(),m=ensureMomentum(),pct=momentumPct();return `<section class="daily-hub"><div class="daily-hub-main"><div class="daily-title"><span class="section-kicker">TODAY'S SCENE PRACTICE</span><h3>${esc(r.title)}</h3><p>${esc(r.body)}</p></div><button data-eng-v52-click="openRecommended()">Continue ${icon('chevron')}</button></div><div class="momentum-card"><div class="momentum-ring" style="--m:${pct*3.6}deg"><div><b>${m.points||0}</b><span>/${DAILY_GOAL}</span></div></div><div><span>DAILY MOMENTUM</span><b>${m.days||1} day${(m.days||1)===1?'':'s'} active</b><small>Useful actions only — no hearts or penalties.</small></div></div><div class="hub-shortcuts"><button data-eng-v52-click="openLesson(1);setMode('practice');setPractice('mistakes')"><i>${icon('refresh')}</i><span><b>Mistake Repair</b><small>${(progress.mistakes||[]).length} waiting</small></span></button><button data-eng-v52-click="openLesson(1);setMode('practice');setPractice('smart')"><i>${icon('target')}</i><span><b>Due Review</b><small>${dueAnchors().length} anchors due</small></span></button><button data-eng-v52-click="openLesson(1);setMode('talk')"><i>${icon('mic')}</i><span><b>Voice Scene Lab</b><small>${progress.conversation?.completed||0} sessions completed</small></span></button></div></section>`;}
function homeSkillMap(){const skills=skillProfile();return `<section class="skill-map-home"><div><span class="section-kicker">SKILL MAP</span><h3>Progress that matches the real goal</h3><p>Observation and vocabulary matter, but description and conversation are the end point.</p></div><div class="skill-bars">${skills.map(([n,v])=>`<div><span>${esc(n)}</span><i><em style="width:${v}%"></em></i><b>${v}%</b></div>`).join('')}</div></section>`;}

function mistakeRepairContent(){const list=progress.mistakes||[];if(!list.length)return `<div class="practice-complete repair-empty"><div class="success-orb">${icon('check')}</div><span>MISTAKE REPAIR</span><h3>Nothing waiting.</h3><p>When you miss a visual anchor, sentence order, or evidence judgment, it will appear here for targeted repair.</p><button data-eng-v52-click="setPractice('smart')">Run Smart Review</button></div>`;return `<div class="mistake-repair"><div class="repair-head"><div><span>MISTAKE NOTEBOOK</span><h3>Repair the pattern, not just the answer.</h3><p>${list.length} recent learning gap${list.length===1?'':'s'} are queued.</p></div><button data-eng-v52-click="progress.mistakes=[];saveProgress();render()">Clear notebook</button></div><div class="repair-list">${list.map((m,i)=>`<article><div class="repair-type">${m.type==='visual'?icon('target'):m.type==='builder'?icon('book'):icon('eye')}<span>${esc(m.type.toUpperCase())}</span><b>×${m.count||1}</b></div><h4>${esc(m.prompt)}</h4><div class="repair-answer"><span>REPAIR TARGET</span><p>${esc(m.correct)}</p></div><div class="repair-why"><b>Why</b><p>${esc(m.note||'Review the distinction, then try again without looking at the answer.')}</p></div><div class="repair-actions">${repairActionButton(m,i)}<button data-eng-v52-click="speak('${q(m.correct)}',.76)">${icon('volume')} Hear target</button></div></article>`).join('')}</div></div>`;}
function repairActionButton(m,i){if(m.type==='visual')return `<button class="primary" data-eng-v52-click="repairVisual('${q(m.key)}')">Find it again</button>`;if(m.type==='builder')return `<button class="primary" data-eng-v52-click="state.builderIndex=${Number.isFinite(+m.key)?+m.key:0};setPractice('builder');initBuilder();render()">Rebuild sentence</button>`;return `<button class="primary" data-eng-v52-click="state.factIndex=${Number.isFinite(+m.key)?+m.key:0};state.factAnswered=null;setPractice('fact');state.factIndex=${Number.isFinite(+m.key)?+m.key:0};render()">Judge again</button>`;}
function repairVisual(word){state.mode='practice';state.practiceType='smart';resetPractice(false);state.practiceTarget=window.EngBookPractice.candidates(state.lesson.hotspots).find(h=>h.en===word)||state.practiceTarget;state.practiceMsg='Find this detail again. Use a hint if you need one.';render();}
function blindDescribeBanner(){return `<div class="blind-challenge ${state.blindDescribe?'active':''}"><div>${icon('target')}<span><b>${state.blindDescribe?'Cold Describe active':'Cold Describe'}</b><small>${state.blindDescribe?'No word bank • no model • 60 seconds':'A no-hints final check inspired by challenge modes in serious language apps.'}</small></span></div><button data-eng-v52-click="${state.blindDescribe?'stopBlindDescribe()':'startBlindDescribe()'}">${state.blindDescribe?'Exit challenge':'Start 60 sec'}</button></div>`;}
function startBlindDescribe(){state.blindDescribe=true;state.hints=false;state.scanMode='off';state.selected=null;state.transcript='';prepareSpeaking(60);state.mode='speak';render();}
function stopBlindDescribe(){state.blindDescribe=false;clearTimer();render();}
function conversationConfig(){return CONVERSATION_MODE_CONFIG[state.conversationMode]||CONVERSATION_MODE_CONFIG.guided;}
function conversationPromptBank(){return state.conversationMode==='natural'?NATURAL_PROMPTS:state.conversationMode==='challenge'?CHALLENGE_PROMPTS:CONVERSATION_MISSIONS;}
function setConversationMode(mode){if(!CONVERSATION_MODE_CONFIG[mode])return;stopConversationRecognition();state.conversationMode=mode;state.conversationTurn=0;state.conversationResponses=[];state.conversationInput='';state.conversationFeedback=null;state.conversationHint=false;state.conversationComplete=false;state.repairSprintOpen=false;render();}
function adaptivePromptFromPrevious(turn,base){const prev=state.conversationResponses[state.conversationResponses.length-1];if(!prev||turn===0)return base;const t=prev.text.toLowerCase(),fb=prev.feedback||{};
  if((fb.tool||0)<55 && !/(may|might|seems|appears|suggest)/.test(t) && (base.focus==='inference'||turn>=3)) return {...base,prompt:'Before we continue, make your interpretation safer: what visible clue supports it, and what remains uncertain?'};
  if((fb.relevance||0)<60 && !t.includes('sun') && !t.includes('ocean') && !t.includes('beach')) return {...base,prompt:'Add one concrete scene anchor you have not used yet. What can you see, and where is it?'};
  if(!SPATIAL_TERMS.some(x=>t.includes(x)) && (base.focus==='spatial'||turn>=1)) return {...base,prompt:'Place the listener inside the image: where are the people, shoreline, palms, and open water relative to each other?'};
  if(t.includes('sun')||t.includes('sunset')) return {...base,prompt:base.focus==='action'?'You mentioned the sunset. While that is happening, what exactly are the two people doing?':base.prompt};
  if(t.includes('beach')||t.includes('ocean')) return {...base,prompt:base.focus==='action'?'You mentioned the beach. What exactly are the two people doing there?':base.prompt};
  return base;
}
function conversationTurnCount(){return conversationConfig().turns;}
function toggleOutline(key){const s=new Set(state.outlineSelected||[]);s.has(key)?s.delete(key):s.add(key);state.outlineSelected=[...s];render();}
function outlinePrompt(key){return {setting:'a palm-lined beach in warm low-angle light',people:'two young adults',action:'walking barefoot and holding hands',environment:'calm sea, warm low-angle light, wet sand',inference:'their body language suggests closeness'}[key]||'';}
function repairPlan(){const arr=state.conversationResponses;if(!arr.length)return[];const avg=k=>Math.round(arr.reduce((a,r)=>a+(r.feedback?.[k]||0),0)/arr.length);const plans=[];if(avg('relevance')<70)plans.push({title:'Add visual anchors',body:'Name two concrete details before you interpret the scene.',cta:'Open Smart Review',action:"setMode('practice');setPractice('smart')"});if(avg('tool')<70)plans.push({title:'Repair target language',body:'Practice present continuous, spatial language, or cautious inference depending on the turn.',cta:'Open Sentence Builder',action:"setMode('practice');setPractice('builder')"});if(conversationSummary().avg<75)plans.push({title:'Re-answer once',body:'Run the same conversation again and aim for one stronger sentence per turn.',cta:'Retry Conversation',action:'resetConversation()'});if(!plans.length)plans.push({title:'Raise independence',body:'Move to Cold Describe with no prompts, then return for Challenge mode.',cta:'Start Cold Describe',action:"setMode('speak');startBlindDescribe()"});return plans.slice(0,3);}
function saveConversationHistory(){const sum=conversationSummary();const item={ts:Date.now(),mode:state.conversationMode,avg:sum.avg,best:sum.best,turns:state.conversationResponses.length,focus:sum.focus};const h=progress.conversation.history||[];h.unshift(item);progress.conversation.history=h.slice(0,12);progress.conversation.modeRuns[state.conversationMode]=(progress.conversation.modeRuns[state.conversationMode]||0)+1;saveProgress();}
function lastConversationTrend(){const h=progress.conversation?.history||[];if(h.length<2)return null;return h[0].avg-h[1].avg;}
function transcriptCompare(){const a=speechAnalysis(),missing=sceneCoverageAnalysis().missing.map(x=>x.label);const funcs=[];if(a.dims[1][1]<50)funcs.push('spatial language');if(a.dims[2][1]<70)funcs.push('present continuous / while');if(state.speakingDuration>=60&&a.dims[3][1]<70)funcs.push('cautious inference');if(a.dims[5][1]<55)funcs.push('clear sequence');return {missing:missing.slice(0,4),funcs};}
function conversationPrompt(turn){const bank=conversationPromptBank();const base=bank[turn]||bank[bank.length-1]||CONVERSATION_MISSIONS[0];return adaptivePromptFromPrevious(turn,base);}
function analyzeConversationResponse(turn,text){
  const t=text.toLowerCase(),wc=wordCount(text),anchors=COACH_KEYWORDS.filter(([_,n])=>t.includes(n)).map(x=>x[0]);
  const pc=/(\bis\b|\bare\b|\bam\b)\s+(?:\w+\s+){0,2}\w+ing\b/.test(t)||t.includes('while');
  const cautious=CAUTION_TERMS.some(x=>t.includes(x));
  const timeline=SEQUENCE_TERMS.filter(x=>t.includes(x));
  const spatial=SPATIAL_TERMS.filter(x=>t.includes(x));
  const focus=(conversationPrompt(turn).focus||'overview');
  let relevance=0,tool=0,repair='',strength='';
  if(['overview','detail'].includes(focus)){
    relevance=Math.min(100,anchors.length*22+Math.min(34,wc*2));
    tool=Math.min(100,(spatial.length?45:10)+(wc>=10?40:20)+(anchors.length>=2?20:0));
    repair=anchors.length<2?'Add two concrete visual anchors before expanding the story.':spatial.length?'Keep the opening compact and move to one visible action.':'Add one location phrase such as “on the left” or “in the background”.';
    strength=anchors.length>=2?'You grounded the answer in concrete scene details.':'You started from the scene rather than inventing a story.';
  } else if(focus==='spatial'){
    relevance=Math.min(100,anchors.length*17+spatial.length*24+20);
    tool=Math.min(100,spatial.length*38+(t.includes('foreground')||t.includes('background')?28:0));
    repair=spatial.length<2?'Use at least two spatial links: on the left, along the shore, in the background, beside.':'Connect the locations into one flowing foreground-to-background route.';
    strength=spatial.length?'You positioned details instead of listing isolated nouns.':'You kept the response tied to visible parts of the frame.';
  } else if(focus==='action'){
    relevance=Math.min(100,(t.includes('walk')?30:0)+(t.includes('hold')?30:0)+(t.includes('lean')?20:0)+anchors.length*8+15);
    tool=pc?100:(t.includes('walk')||t.includes('hold')?48:20);
    repair=pc?'Make the two actions flow with “while” if it sounds natural.':'Use is/are + verb-ing: “They are walking…”';
    strength=pc?'You used action language that fits a still image.':'You stayed focused on what the people are visibly doing.';
  } else if(focus==='inference'){
    const clue=(t.includes('hand')?20:0)+(t.includes('lean')?20:0)+(t.includes('close')||t.includes('affection')?25:0);
    relevance=Math.min(100,clue+anchors.length*10+30);
    tool=cautious?100:35;
    repair=cautious?'Tie the interpretation to one visible clue and keep the exact relationship uncertain.':'Add may / might / seems / suggests so interpretation is not stated as fact.';
    strength=cautious?'You marked interpretation as uncertain instead of turning it into fact.':'You attempted to move from visible body language to interpretation.';
  } else {
    relevance=Math.min(100,timeline.length*22+anchors.length*10+(t.includes('before')?16:0)+(t.includes('next')?16:0)+18);
    tool=Math.min(100,(cautious?45:12)+(timeline.length?42:0)+(wc>=12?20:8));
    repair='Use a simple discourse frame such as “Before…, now…, next they might…”, then avoid repeating earlier details.';
    strength=timeline.length?'You extended the scene with sequence language.':'You kept the conversation moving beyond isolated vocabulary.';
  }
  const length=Math.min(100,Math.round(wc/18*100));
  const score=Math.round(relevance*.45+tool*.4+length*.15);
  const improved=conversationImprovedLine(focus,text);
  return {score,relevance,tool,wc,repair,strength,improved,focus,anchors,spatial};
}
function conversationImprovedLine(focus,text){
  if(['overview','detail'].includes(focus))return 'I first notice two young adults walking along a calm beach in warm low-angle light, with palm trees on the left and open water in the background.';
  if(focus==='spatial')return 'The two adults are in the middle ground near the left side, while the shoreline and palm trees run behind them and the open sea fills the right side of the frame.';
  if(focus==='action')return 'They are walking barefoot through shallow water while they are holding hands, and the woman is leaning against the man.';
  if(focus==='inference')return 'Their joined hands and close posture suggest an affectionate relationship, although the exact status of the relationship is not visible.';
  return 'Before this moment, they may have been walking farther along the beach; next, they might stop to watch the sunset as the light fades.';
}
function startConversationRecognition(){if(state.conversationListening){stopConversationRecognition();render();return;}const C=speechRecognitionCtor();if(!C){toast('Speech-to-text is not supported here. Type your answer instead.');return;}try{const r=new C();r.lang='en-US';r.continuous=false;r.interimResults=true;state.conversationRecognition=r;state.conversationListening=true;r.onresult=e=>{let txt='';for(let i=0;i<e.results.length;i++)txt+=e.results[i][0].transcript+' ';state.conversationInput=txt.trim();const el=document.getElementById('conversationInput');if(el)el.value=state.conversationInput;};r.onerror=()=>{state.conversationListening=false;state.conversationRecognition=null;render();};r.onend=()=>{state.conversationListening=false;state.conversationRecognition=null;render();};r.start();render();}catch(e){toast('Conversation microphone could not start.');}}
function stopConversationRecognition(){if(state.conversationRecognition){try{state.conversationRecognition.stop();}catch(e){}state.conversationRecognition=null;}state.conversationListening=false;}
function submitConversation(){const text=String(state.conversationInput||'').trim();if(wordCount(text)<3){toast('Say or type a little more so the coach has something useful to evaluate.');return;}const fb=analyzeConversationResponse(state.conversationTurn,text);state.conversationResponses.push({turn:state.conversationTurn,prompt:conversationPrompt(state.conversationTurn),text,feedback:fb});state.conversationFeedback=fb;state.conversationInput='';progress.conversation.turns=(progress.conversation.turns||0)+1;progress.activity.conversations=(progress.activity.conversations||0)+1;progress.conversation.best=Math.max(progress.conversation.best||0,fb.score);awardPoints(12,'conversation');saveProgress();haptic(fb.score>=75?[15,20,28]:14);render();}
function nextConversation(){if(!state.conversationFeedback)return;if(state.conversationTurn>=conversationTurnCount()-1){state.conversationComplete=true;progress.conversation.completed=(progress.conversation.completed||0)+1;progress.completed.l1_talk=true;awardPoints(20,'conversation-complete');saveConversationHistory();saveProgress();render();return;}state.conversationTurn++;state.conversationFeedback=null;state.conversationHint=false;state.conversationInput='';render();setTimeout(()=>speak(conversationPrompt(state.conversationTurn).prompt,.83),180);}
function resetConversation(){stopConversationRecognition();state.conversationTurn=0;state.conversationResponses=[];state.conversationInput='';state.conversationFeedback=null;state.conversationComplete=false;state.conversationHint=false;state.conversationMode='guided';state.conversationMission='listener';state.handsFree=false;state.voiceStage='idle';state.coachHelp=false;state.explainRepair=false;state.retryOriginal=null;state.sessionReplayOpen=false;state.outlineSelected=['setting','people','action'];state.compareOpen=false;state.repairSprintOpen=false;render();}
function saveLine(line){const s=new Set(progress.savedLines||[]);s.add(line);progress.savedLines=[...s].slice(-20);saveProgress();toast('Line saved for review');render();}
function conversationSummary(){const arr=state.conversationResponses;if(!arr.length)return {avg:0,best:0,focus:'Start by answering the first question.'};const avg=Math.round(arr.reduce((a,r)=>a+r.feedback.score,0)/arr.length),best=Math.max(...arr.map(r=>r.feedback.score));const weakest=[...arr].sort((a,b)=>a.feedback.score-b.feedback.score)[0];return {avg,best,focus:weakest.feedback.repair};}

function conversationHistory(){return state.conversationResponses.map(r=>`<div class="conversation-exchange"><article class="coach-bubble history"><div class="coach-avatar">${icon('spark')}</div><div><span>${esc((r.prompt&&r.prompt.label)||`Turn ${r.turn+1}`)}</span><p>${esc((r.prompt&&r.prompt.prompt)||conversationPromptBank()[r.turn]?.prompt||'')}</p></div></article><article class="user-bubble"><span>YOU</span><p>${esc(r.text)}</p></article></div>`).join('');}
function conversationContent(){
  const turn=conversationPrompt(state.conversationTurn),fb=state.conversationFeedback,summary=conversationSummary(),cfg=conversationConfig(),trend=lastConversationTrend();
  const modeSwitch=`<div class="conversation-mode-switch">${Object.entries(CONVERSATION_MODE_CONFIG).map(([k,v])=>`<button class="${state.conversationMode===k?'active':''}" data-eng-v52-click="setConversationMode('${k}')"><b>${v.label}</b><span>${v.sub}</span></button>`).join('')}</div>`;
  if(state.conversationComplete){const plans=repairPlan();return `<section class="conversation-zone">${modeSwitch}<div class="conversation-complete premium-complete"><div class="conversation-finish-orb">${icon('check')}</div><span>SCENE CONVERSATION COMPLETE • ${esc(cfg.label.toUpperCase())}</span><h2>${summary.avg}% communication check</h2><p>You completed ${state.conversationResponses.length} image-grounded turns. This is a local language-use heuristic, not a CEFR, fluency, accent, or pronunciation grade.</p><div class="conversation-summary-grid"><div><b>${summary.best}%</b><span>best turn</span></div><div><b>${state.conversationResponses.length}</b><span>turns</span></div><div><b>${trend===null?'—':(trend>=0?'+':'')+trend}</b><span>vs previous run</span></div></div><div class="next-repair"><span>NEXT REPAIR</span><p>${esc(summary.focus)}</p></div><button class="repair-sprint-toggle" data-eng-v52-click="state.repairSprintOpen=!state.repairSprintOpen;render()">${icon('target')} ${state.repairSprintOpen?'Hide':'Open'} 2-minute Repair Sprint</button>${state.repairSprintOpen?`<div class="repair-sprint">${plans.map((p,i)=>`<article><i>${i+1}</i><div><b>${esc(p.title)}</b><p>${esc(p.body)}</p></div><button data-eng-v52-click="${p.action}">${esc(p.cta)} ${icon('chevron')}</button></article>`).join('')}</div>`:''}<div class="finish-actions"><button data-eng-v52-click="resetConversation()">${icon('refresh')} Run ${esc(cfg.label)} again</button><button data-eng-v52-click="setConversationMode(state.conversationMode==='guided'?'natural':'challenge')">Move up a mode ${icon('chevron')}</button><button class="primary" data-eng-v52-click="setMode('speak');startBlindDescribe()">Cold Describe ${icon('chevron')}</button></div></div>${savedLinesPanel()}</section>`;}
  const currentCoach=!fb?`<article class="coach-bubble current premium-coach"><div class="coach-avatar">${icon('spark')}</div><div><span>${esc(turn.label)}</span><p>${esc(turn.prompt)}</p><div class="coach-controls"><button data-eng-v52-click="speak('${q(turn.prompt)}',.88)">${icon('volume')} Natural</button><button data-eng-v52-click="speak('${q(turn.prompt)}',.65)">${icon('volume')} Slow</button>${cfg.hint?`<button data-eng-v52-click="state.conversationHint=!state.conversationHint;render()">${icon('hint')} Hint</button>`:''}</div>${state.conversationHint&&cfg.hint?`<div class="conversation-hint">${esc(turn.hint)}</div>`:''}</div></article>`:'';
  return `<section class="conversation-zone">${modeSwitch}<div class="panel-heading conversation-heading"><div><span class="section-kicker">ADAPTIVE SCENE COACH</span><h2>Keep the listener inside the picture</h2><p>Follow-up questions react to what you actually said. Guided gives more scaffolding; Natural and Challenge progressively remove it.</p></div><div class="turn-progress"><b>${state.conversationTurn+1}</b><span>/${conversationTurnCount()} turns</span></div></div><div class="conversation-focus-strip"><img src="assets/images/lesson_01.jpg" alt=""><div><span>CURRENT MODE</span><b>${esc(cfg.label)}</b><p>${esc(cfg.sub)}</p></div><div class="focus-rule"><i></i><span>see → say → respond</span></div></div><div class="conversation-layout"><div class="conversation-thread">${conversationHistory()}${currentCoach}${fb?conversationFeedbackCard(fb):''}</div><aside class="conversation-console"><label for="conversationInput">YOUR RESPONSE</label><textarea id="conversationInput" data-eng-v52-input="state.conversationInput=this.value" placeholder="Speak or type naturally…" ${fb?'disabled':''}>${esc(state.conversationInput)}</textarea><div class="conversation-actions"><button class="mic-action ${state.conversationListening?'live':''}" data-eng-v52-click="startConversationRecognition()" ${fb?'disabled':''}>${icon('mic')} ${state.conversationListening?'Listening…':'Answer by voice'}</button><button class="primary" data-eng-v52-click="submitConversation()" ${fb?'disabled':''}>Send answer ${icon('chevron')}</button></div><small>${speechRecognitionCtor()?'Voice uses browser speech-to-text; typing is always available.':'Speech-to-text is unavailable in this browser; type your response.'}</small>${fb?`<button class="continue-turn" data-eng-v52-click="nextConversation()">${state.conversationTurn===conversationTurnCount()-1?'Finish conversation':'Continue conversation'} ${icon('chevron')}</button>`:''}<div class="conversation-goal"><span>${cfg.label.toUpperCase()} PRINCIPLE</span><p>${state.conversationMode==='guided'?'One repair after every turn.':'Keep momentum first; feedback stays compact so the exchange feels less like a quiz.'}</p></div></aside></div></section>`;
}
function conversationFeedbackCard(fb){const last=state.conversationResponses[state.conversationResponses.length-1];return `<article class="conversation-feedback recast-feedback"><div class="feedback-score"><b>${fb.score}%</b><span>communication check</span></div><div class="feedback-copy"><div class="feedback-two"><div><span>WHAT WORKED</span><p>${esc(fb.strength)}</p></div><div><span>ONE REPAIR</span><p>${esc(fb.repair)}</p></div></div><div class="recast-stack"><div class="your-line"><span>YOUR LINE</span><p>${esc(last?.text||'')}</p></div><div class="recast-arrow">${icon('chevron')}</div><div class="better-line"><div><span>NATURAL RECAST</span><p>${esc(fb.improved)}</p></div><button data-eng-v52-click="speak('${q(fb.improved)}',.8)">${icon('volume')}</button></div></div><button class="save-line" data-eng-v52-click="saveLine('${q(fb.improved)}')">${icon('star')} Save recast for later retrieval</button></div></article>`;}
function savedLinesPanel(){const lines=progress.savedLines||[];if(!lines.length)return '';return `<div class="saved-lines"><div><span>SAVED LINES</span><h3>Your reusable conversation language</h3></div>${lines.slice(-5).reverse().map((l,i)=>{const ix=lines.length-1-i;return `<button data-engbook-action="saved-panel" data-line-index="${ix}"><span>${esc(l)}</span>${icon('volume')}</button>`}).join('')}</div>`;}

function toast(msg){const el=document.getElementById('toast');if(!el)return;clearTimeout(toastTimer);el.textContent=msg;el.classList.add('show');toastTimer=setTimeout(()=>el.classList.remove('show'),2200);}
// Initial navigation is owned by EngBookStartup after the final UI modules load.


/* ===== v0.8 VOICE SCENE LAB ===== */
const SCENE_MISSIONS = {
  listener:{
    label:'Blind Listener', icon:'mic', tag:'DESCRIPTION',
    sub:'Describe so clearly that a listener who cannot see the photo can reconstruct it.',
    prompts:[
      {label:'PUT ME IN THE SCENE',prompt:'I cannot see the photo. Put me in the scene in one clear opening sentence.',hint:'Name the setting, the two people, and one strong visual clue.',focus:'overview'},
      {label:'PLACE THE DETAILS',prompt:'Where are the important details in the frame? Help me picture the left, middle, and background.',hint:'Use spatial language such as on the left, in the middle ground, along the shore, or in the background.',focus:'spatial'},
      {label:'SHOW THE ACTION',prompt:'Now make the still image feel active. What are the two people doing at the same time?',hint:'Describe the visible movement, then use one relationship phrasal verb carefully if it is supported.',focus:'action'},
      {label:'ADD THE ATMOSPHERE',prompt:'What do the light, water, and body language add to the scene?',hint:'Keep visible evidence separate from interpretation.',focus:'inference'},
      {label:'KEEP ME THERE',prompt:'Add two details you have not used yet, without turning the image into an invented story.',hint:'Return to visible anchors before you infer.',focus:'detail'},
      {label:'CLOSE NATURALLY',prompt:'Finish with one cautious next-step idea and a short summary of the atmosphere.',hint:'Use might, may, or could for the imagined next step.',focus:'timeline'}
    ]
  },
  detective:{
    label:'Photo Detective', icon:'eye', tag:'ACCURACY',
    sub:'Train the key EngBook skill: visible fact first, interpretation second.',
    prompts:[
      {label:'TWO FACTS ONLY',prompt:'Give me two facts that the photo directly proves. No interpretation yet.',hint:'Choose visible people, clothing, objects, action, light, or position.',focus:'detail'},
      {label:'SHOW YOUR EVIDENCE',prompt:'Choose one body-language detail. What exactly can you see?',hint:'Describe hand-holding, leaning, gaze, or posture before saying what it means.',focus:'action'},
      {label:'ONE SAFE INFERENCE',prompt:'Now make one interpretation and support it with a visible clue.',hint:'Use seems, may, might, appears, or suggests.',focus:'inference'},
      {label:'DRAW THE LINE',prompt:'What important thing can we not know for sure from this image?',hint:'Relationship status, occasion, destination, and exact story are not directly visible.',focus:'inference'},
      {label:'REPAIR A CLAIM',prompt:'Someone says, “They are definitely on their honeymoon.” How would you make that statement evidence-safe?',hint:'Reject certainty and replace it with cautious possibility.',focus:'inference'},
      {label:'ACCURACY WRAP',prompt:'Summarize the scene with one fact, one visible action, and one clearly labeled inference.',hint:'Keep the three layers separate.',focus:'overview'}
    ]
  },
  story:{
    label:'Story Relay', icon:'spark', tag:'FLUENCY',
    sub:'Extend the frozen moment with Before → Now → Next while keeping imagined details cautious.',
    prompts:[
      {label:'START WITH NOW',prompt:'Begin with what is happening right now in the photo.',hint:'Use only visible action first.',focus:'action'},
      {label:'STEP BACK',prompt:'What may have happened shortly before this moment?',hint:'Make it a possibility, not a fact.',focus:'timeline'},
      {label:'MOVE FORWARD',prompt:'What might happen next if the scene continues naturally?',hint:'Use might, may, or could.',focus:'timeline'},
      {label:'ADD A REASONABLE CLUE',prompt:'Which visible detail makes your story extension feel plausible?',hint:'Link the imagined story back to the image.',focus:'inference'},
      {label:'ONE POSSIBLE LINE',prompt:'Imagine one short line of dialogue they might say, and make it clear that it is only a possible story.',hint:'Keep the invented dialogue brief and plausible.',focus:'extension'},
      {label:'RELAY THE WHOLE MOMENT',prompt:'Retell the scene as Before → Now → Next in three connected sentences.',hint:'Use before, now, next and cautious language.',focus:'timeline'}
    ]
  }
};
const FOCUS_HELP_FA = {
  overview:'اول محیط کلی، دو نفر و یک جزئیات واضح را بگو. هدف این است که شنونده بتواند تصویر را در ذهنش بسازد.',
  detail:'فقط به چیزی تکیه کن که واقعاً در عکس دیده می‌شود؛ مثل لباس، نور، دریا، نخل‌ها یا حالت بدن.',
  spatial:'جای اجزا را با عباراتی مثل on the left، in the background، along the shore و beside مشخص کن.',
  action:'برای کاری که در همان لحظه دیده می‌شود از Present Continuous استفاده کن: They are walking… / She is leaning…',
  inference:'برداشت را قطعی نگو. از may / might / seems / suggests استفاده کن و یک شاهد تصویری بیاور.',
  timeline:'قبل و بعد تصویر را فقط به‌صورت احتمال بساز: Before… / Now… / Next they might…',
  extension:'داستان را کوتاه و محتاط نگه دار و دوباره به شواهد داخل تصویر وصلش کن.'
};

function sceneMission(){return SCENE_MISSIONS[state.conversationMission]||SCENE_MISSIONS.listener;}
function setConversationMission(mission){if(!SCENE_MISSIONS[mission])return;stopConversationRecognition();window.EngBookSpeech.stopSpeaking();state.conversationMission=mission;state.conversationTurn=0;state.conversationResponses=[];state.conversationInput='';state.conversationFeedback=null;state.conversationHint=false;state.conversationComplete=false;state.handsFree=false;state.voiceStage='idle';state.coachHelp=false;state.explainRepair=false;state.retryOriginal=null;state.sessionReplayOpen=false;state.repairSprintOpen=false;render();}
function conversationPromptBank(){return sceneMission().prompts;}
function conversationPrompt(turn){const bank=conversationPromptBank();const base=bank[turn]||bank[bank.length-1]||SCENE_MISSIONS.listener.prompts[0];return adaptivePromptFromPrevious(turn,base);}
function conversationTurnCount(){return Math.min(conversationConfig().turns,conversationPromptBank().length);}
function setConversationMode(mode){if(!CONVERSATION_MODE_CONFIG[mode])return;stopConversationRecognition();window.EngBookSpeech.stopSpeaking();state.conversationMode=mode;state.conversationTurn=0;state.conversationResponses=[];state.conversationInput='';state.conversationFeedback=null;state.conversationHint=false;state.conversationComplete=false;state.handsFree=false;state.voiceStage='idle';state.coachHelp=false;state.explainRepair=false;state.retryOriginal=null;state.sessionReplayOpen=false;state.repairSprintOpen=false;render();}

function speakAsync(text,rate=.86,onend=null){
  const finish=()=>{state.voiceStage='idle';if(typeof onend==='function')onend();};
  return window.EngBookSpeech.speak(text,{rate,
    onStart:()=>{state.voiceStage='speaking';const el=document.querySelector('.voice-status-text');if(el)el.textContent='Coach is speaking…';},
    onEnd:finish,onError:finish});
}
function currentCoachHelp(){const p=conversationPrompt(state.conversationTurn);return FOCUS_HELP_FA[p.focus]||FOCUS_HELP_FA.overview;}
function playCoachPrompt(rate=.88,autoListen=false){const p=conversationPrompt(state.conversationTurn);speakAsync(p.prompt,rate,()=>{if(autoListen&&state.handsFree&&!state.conversationFeedback&&!state.conversationComplete)setTimeout(()=>startConversationRecognition(true),260);});}
function toggleHandsFree(){
  if(state.handsFree){state.handsFree=false;state.voiceStage='idle';stopConversationRecognition();window.EngBookSpeech.stopSpeaking();render();return;}
  if(!speechRecognitionCtor()){toast('Hands-free needs browser speech recognition. You can still use voice or typing manually.');return;}
  state.handsFree=true;state.voiceStage='speaking';state.coachHelp=false;render();setTimeout(()=>playCoachPrompt(.86,true),180);
}
function cantSpeakNow(){state.handsFree=false;state.voiceStage='idle';stopConversationRecognition();window.EngBookSpeech.stopSpeaking();render();setTimeout(()=>document.getElementById('conversationInput')?.focus(),80);toast('Typing mode ready. Voice practice is optional.');}
function stopConversationRecognition(){if(state.conversationRecognition){try{state.conversationRecognition.stop();}catch(e){}state.conversationRecognition=null;}state.conversationListening=false;if(state.voiceStage==='listening')state.voiceStage='idle';}
function startConversationRecognition(fromHandsFree=false){
  if(state.conversationListening){stopConversationRecognition();render();return;}
  const C=speechRecognitionCtor();if(!C){toast('Speech-to-text is not supported here. Type your answer instead.');return;}
  try{
    const r=new C();r.lang='en-US';r.continuous=false;r.interimResults=true;state.conversationRecognition=r;state.conversationListening=true;state.voiceStage='listening';
    let finalSeen=false;
    r.onresult=e=>{let txt='';for(let i=0;i<e.results.length;i++){txt+=e.results[i][0].transcript+' ';if(e.results[i].isFinal)finalSeen=true;}state.conversationInput=txt.trim();const el=document.getElementById('conversationInput');if(el)el.value=state.conversationInput;const vst=document.querySelector('.voice-live-transcript');if(vst)vst.textContent=state.conversationInput||'Listening…';};
    r.onerror=()=>{state.conversationListening=false;state.conversationRecognition=null;state.voiceStage='idle';if(state.handsFree)toast('I could not hear that clearly. Tap the mic or switch to typing.');render();};
    r.onend=()=>{const shouldAuto=state.handsFree&&fromHandsFree&&wordCount(state.conversationInput)>=3;state.conversationListening=false;state.conversationRecognition=null;state.voiceStage='idle';if(shouldAuto)setTimeout(()=>submitConversation(true),180);else render();};
    r.start();render();
  }catch(e){state.conversationListening=false;state.voiceStage='idle';toast('Conversation microphone could not start.');}
}
function explainRepairText(fb){
  const focus=fb?.focus||'overview';
  const map={
    overview:'A strong image description starts with concrete anchors. Specific visible details give the listener a mental frame before you add interpretation.',
    detail:'EngBook uses visible evidence first. Naming what is directly visible prevents the description from drifting into an unsupported story.',
    spatial:'Spatial links turn a list of nouns into a picture the listener can reconstruct. They also make longer descriptions easier to follow.',
    action:'A still photo captures actions in progress, so present continuous is the natural default: “They are walking…” “She is leaning…”.',
    inference:'Interpretation is useful, but it must be marked as uncertain. Words like may, might, seems, and suggests protect the difference between fact and inference.',
    timeline:'Before and next are creative extensions. They should use cautious language because the still image does not prove what happened outside the captured moment.',
    extension:'Fluency grows when you extend an idea without losing the visual anchor. Add imagination only after returning to visible evidence.'
  };
  return map[focus]||map.overview;
}
function retryCurrentTurn(){
  const last=state.conversationResponses[state.conversationResponses.length-1];if(!last||!state.conversationFeedback)return;
  state.retryOriginal={text:last.text,feedback:last.feedback};state.conversationResponses.pop();state.conversationFeedback=null;state.conversationInput='';state.explainRepair=false;state.conversationHint=false;render();setTimeout(()=>document.getElementById('conversationInput')?.focus(),80);
}
function submitConversation(autoHandsFree=false){
  const text=String(state.conversationInput||'').trim();if(wordCount(text)<3){toast('Say or type a little more so the coach has something useful to evaluate.');return;}
  const fb=analyzeConversationResponse(state.conversationTurn,text);const retryFrom=state.retryOriginal;
  state.conversationResponses.push({turn:state.conversationTurn,prompt:conversationPrompt(state.conversationTurn),text,feedback:fb,retryFrom});
  state.conversationFeedback=fb;state.conversationInput='';state.retryOriginal=null;progress.conversation.turns=(progress.conversation.turns||0)+1;progress.activity.conversations=(progress.activity.conversations||0)+1;progress.conversation.best=Math.max(progress.conversation.best||0,fb.score);awardPoints(12,'conversation');saveProgress();haptic(fb.score>=75?[15,20,28]:14);render();
  if(state.handsFree&&autoHandsFree){const msg=`${fb.strength} One repair: ${fb.repair} A stronger version is: ${fb.improved}`;setTimeout(()=>speakAsync(msg,.86,()=>setTimeout(()=>nextConversation(true),700)),220);}
}
function nextConversation(autoHandsFree=false){
  if(!state.conversationFeedback)return;
  if(state.conversationTurn>=conversationTurnCount()-1){state.conversationComplete=true;state.handsFree=false;state.voiceStage='idle';progress.conversation.completed=(progress.conversation.completed||0)+1;progress.completed.l1_talk=true;awardPoints(20,'conversation-complete');saveConversationHistory();saveProgress();render();return;}
  state.conversationTurn++;state.conversationFeedback=null;state.conversationHint=false;state.conversationInput='';state.explainRepair=false;state.retryOriginal=null;render();
  if(autoHandsFree)setTimeout(()=>playCoachPrompt(.86,true),250);else setTimeout(()=>playCoachPrompt(.83,false),180);
}
function resetConversation(){stopConversationRecognition();window.EngBookSpeech.stopSpeaking();state.conversationTurn=0;state.conversationResponses=[];state.conversationInput='';state.conversationFeedback=null;state.conversationComplete=false;state.conversationHint=false;state.conversationMode='guided';state.conversationMission='listener';state.handsFree=false;state.voiceStage='idle';state.coachHelp=false;state.explainRepair=false;state.retryOriginal=null;state.sessionReplayOpen=false;state.outlineSelected=['setting','people','action'];state.compareOpen=false;state.repairSprintOpen=false;render();}
function saveConversationHistory(){const sum=conversationSummary();const item={ts:Date.now(),mode:state.conversationMode,mission:state.conversationMission,avg:sum.avg,best:sum.best,turns:state.conversationResponses.length,focus:sum.focus,responses:state.conversationResponses.map(r=>({prompt:r.prompt?.prompt||'',text:r.text,improved:r.feedback?.improved||'',score:r.feedback?.score||0}))};const h=progress.conversation.history||[];h.unshift(item);progress.conversation.history=h.slice(0,12);progress.conversation.modeRuns[state.conversationMode]=(progress.conversation.modeRuns[state.conversationMode]||0)+1;progress.conversation.missionRuns[state.conversationMission]=(progress.conversation.missionRuns[state.conversationMission]||0)+1;saveProgress();}

function missionSelector(){return `<div class="scene-mission-grid">${Object.entries(SCENE_MISSIONS).map(([k,m])=>`<button class="scene-mission ${state.conversationMission===k?'active':''}" data-eng-v52-click="setConversationMission('${k}')"><i>${icon(m.icon)}</i><span><em>${m.tag}</em><b>${m.label}</b><small>${m.sub}</small></span></button>`).join('')}</div>`;}
function voiceRoom(turn,fb){
  const status=state.voiceStage==='speaking'?'Coach is speaking…':state.voiceStage==='listening'?'Listening to you…':fb?'Turn feedback ready':'Ready for your answer';
  return `<div class="voice-room ${state.handsFree?'active':''} ${state.voiceStage}"><div class="voice-scene"><img src="assets/images/lesson_01.jpg" alt=""><div></div></div><div class="voice-room-body"><div class="voice-orb-wrap"><div class="voice-orb">${icon(state.voiceStage==='listening'?'mic':'spark')}<i></i><i></i><i></i></div></div><div class="voice-room-copy"><span>VOICE-FIRST SCENE TALK</span><b class="voice-status-text">${esc(status)}</b><p class="voice-live-transcript">${state.conversationListening?(esc(state.conversationInput)||'Listening…'):'Coach can speak the prompt, listen to your answer, give one repair, and move to the next turn.'}</p></div><div class="voice-room-actions"><button class="${state.handsFree?'active':''}" data-eng-v52-click="toggleHandsFree()">${icon('mic')} ${state.handsFree?'Stop hands-free':'Start hands-free'}</button><button data-eng-v52-click="playCoachPrompt(.88,false)">${icon('volume')} Repeat</button><button data-eng-v52-click="playCoachPrompt(.64,false)">${icon('volume')} Slow</button></div></div></div>`;
}
function conversationHistory(){return state.conversationResponses.map(r=>`<div class="conversation-exchange"><article class="coach-bubble history"><div class="coach-avatar">${icon('spark')}</div><div><span>${esc((r.prompt&&r.prompt.label)||`Turn ${r.turn+1}`)}</span><p>${esc((r.prompt&&r.prompt.prompt)||'')}</p></div></article><article class="user-bubble"><span>YOU</span><p>${esc(r.text)}</p>${r.retryFrom?`<small class="retry-badge">RETRY • ${Math.max(-99,Math.min(99,(r.feedback?.score||0)-(r.retryFrom.feedback?.score||0)))>=0?'+':''}${(r.feedback?.score||0)-(r.retryFrom.feedback?.score||0)}</small>`:''}</article></div>`).join('');}
function sessionReplay(){const arr=state.conversationResponses;if(!arr.length)return'';return `<div class="session-replay"><div class="session-replay-head"><div><span>SESSION REPLAY</span><h3>Question → your line → stronger line</h3></div><button data-eng-v52-click="state.sessionReplayOpen=!state.sessionReplayOpen;render()">${state.sessionReplayOpen?'Hide':'Open replay'}</button></div>${state.sessionReplayOpen?`<div class="replay-list">${arr.map((r,i)=>`<article><i>${i+1}</i><div><span>COACH</span><p>${esc(r.prompt?.prompt||'')}</p><span>YOU</span><p>${esc(r.text)}</p><span>RECAST</span><p class="recast">${esc(r.feedback?.improved||'')}</p></div><div class="replay-audio"><button data-eng-v52-click="speak('${q(r.prompt?.prompt||'')}',.85)">${icon('volume')}</button><button data-eng-v52-click="speak('${q(r.feedback?.improved||'')}',.76)">${icon('play')}</button></div></article>`).join('')}</div>`:''}</div>`;}
function conversationFeedbackCard(fb){const last=state.conversationResponses[state.conversationResponses.length-1],delta=last?.retryFrom?(fb.score-(last.retryFrom.feedback?.score||0)):null;return `<article class="conversation-feedback recast-feedback"><div class="feedback-score"><b>${fb.score}%</b><span>communication check</span>${delta!==null?`<em class="retry-delta ${delta>=0?'up':'down'}">${delta>=0?'+':''}${delta} retry</em>`:''}</div><div class="feedback-copy"><div class="feedback-two"><div><span>WHAT WORKED</span><p>${esc(fb.strength)}</p></div><div><span>ONE REPAIR</span><p>${esc(fb.repair)}</p></div></div><div class="recast-stack"><div class="your-line"><span>YOUR LINE</span><p>${esc(last?.text||'')}</p></div><div class="recast-arrow">${icon('chevron')}</div><div class="better-line"><div><span>NATURAL RECAST</span><p>${esc(fb.improved)}</p></div><button data-eng-v52-click="speak('${q(fb.improved)}',.8)">${icon('volume')}</button></div></div><div class="feedback-actions-pro"><button data-eng-v52-click="state.explainRepair=!state.explainRepair;render()">${icon('book')} Why this repair?</button><button data-eng-v52-click="retryCurrentTurn()">${icon('refresh')} Retry this turn</button><button data-eng-v52-click="saveLine('${q(fb.improved)}')">${icon('star')} Save line</button></div>${state.explainRepair?`<div class="repair-explanation"><span>WHY IT HELPS</span><p>${esc(explainRepairText(fb))}</p><div dir="rtl">${esc(FOCUS_HELP_FA[fb.focus]||'')}</div></div>`:''}</div></article>`;}

function conversationContent(){
  const turn=conversationPrompt(state.conversationTurn),fb=state.conversationFeedback,summary=conversationSummary(),cfg=conversationConfig(),trend=lastConversationTrend(),mission=sceneMission();
  const modeSwitch=`<div class="conversation-mode-switch">${Object.entries(CONVERSATION_MODE_CONFIG).map(([k,v])=>`<button class="${state.conversationMode===k?'active':''}" data-eng-v52-click="setConversationMode('${k}')"><b>${v.label}</b><span>${v.sub}</span></button>`).join('')}</div>`;
  if(state.conversationComplete){const plans=repairPlan();return `<section class="conversation-zone">${missionSelector()}${modeSwitch}<div class="conversation-complete premium-complete"><div class="conversation-finish-orb">${icon('check')}</div><span>${esc(mission.label.toUpperCase())} COMPLETE • ${esc(cfg.label.toUpperCase())}</span><h2>${summary.avg}% communication check</h2><p>You completed ${state.conversationResponses.length} image-grounded turns. This local check measures use of scene anchors and target language — not CEFR, accent, pronunciation, or certified fluency.</p><div class="conversation-summary-grid"><div><b>${summary.best}%</b><span>best turn</span></div><div><b>${state.conversationResponses.length}</b><span>turns</span></div><div><b>${trend===null?'—':(trend>=0?'+':'')+trend}</b><span>vs previous run</span></div></div><div class="next-repair"><span>NEXT REPAIR</span><p>${esc(summary.focus)}</p></div><button class="repair-sprint-toggle" data-eng-v52-click="state.repairSprintOpen=!state.repairSprintOpen;render()">${icon('target')} ${state.repairSprintOpen?'Hide':'Open'} 2-minute Repair Sprint</button>${state.repairSprintOpen?`<div class="repair-sprint">${plans.map((p,i)=>`<article><i>${i+1}</i><div><b>${esc(p.title)}</b><p>${esc(p.body)}</p></div><button data-eng-v52-click="${p.action}">${esc(p.cta)} ${icon('chevron')}</button></article>`).join('')}</div>`:''}<div class="finish-actions"><button data-eng-v52-click="resetConversation()">${icon('refresh')} New Scene Mission</button><button data-eng-v52-click="setConversationMode(state.conversationMode==='guided'?'natural':'challenge')">Raise support level ${icon('chevron')}</button><button class="primary" data-eng-v52-click="setMode('speak');startBlindDescribe()">Cold Describe ${icon('chevron')}</button></div></div>${sessionReplay()}${savedLinesPanel()}</section>`;}
  const currentCoach=!fb?`<article class="coach-bubble current premium-coach"><div class="coach-avatar">${icon('spark')}</div><div><span>${esc(turn.label)}</span><p>${esc(turn.prompt)}</p><div class="coach-controls"><button data-eng-v52-click="playCoachPrompt(.88,false)">${icon('volume')} Natural</button><button data-eng-v52-click="playCoachPrompt(.65,false)">${icon('volume')} Slow</button>${cfg.hint?`<button data-eng-v52-click="state.conversationHint=!state.conversationHint;render()">${icon('hint')} Hint</button>`:''}<button data-eng-v52-click="state.coachHelp=!state.coachHelp;render()">FA help</button></div>${state.conversationHint&&cfg.hint?`<div class="conversation-hint">${esc(turn.hint)}</div>`:''}</div></article>`:'';
  return `<section class="conversation-zone">${missionSelector()}${modeSwitch}<div class="panel-heading conversation-heading"><div><span class="section-kicker">VOICE SCENE LAB</span><h2>${esc(mission.label)} — speak from the image, not from a script</h2><p>${esc(mission.sub)} Support level and voice controls can change without changing the learning target.</p></div><div class="turn-progress"><b>${state.conversationTurn+1}</b><span>/${conversationTurnCount()} turns</span></div></div>${voiceRoom(turn,fb)}<div class="conversation-focus-strip"><img src="assets/images/lesson_01.jpg" alt=""><div><span>CURRENT MISSION</span><b>${esc(mission.label)} • ${esc(cfg.label)}</b><p>${esc(turn.label)}</p></div><div class="focus-rule"><i></i><span>see → say → respond</span></div></div><div class="conversation-layout"><div class="conversation-thread">${conversationHistory()}${currentCoach}${fb?conversationFeedbackCard(fb):''}</div><aside class="conversation-console"><div class="console-mode-row"><span>${state.handsFree?'HANDS-FREE ACTIVE':'MANUAL RESPONSE'}</span><button data-eng-v52-click="cantSpeakNow()">I can’t speak now</button></div><label for="conversationInput">YOUR RESPONSE</label><textarea id="conversationInput" data-eng-v52-input="state.conversationInput=this.value" placeholder="Speak or type naturally…" ${fb?'disabled':''}>${esc(state.conversationInput)}</textarea><div class="conversation-actions"><button class="mic-action ${state.conversationListening?'live':''}" data-eng-v52-click="startConversationRecognition(false)" ${fb||state.handsFree?'disabled':''}>${icon('mic')} ${state.conversationListening?'Listening…':'Answer by voice'}</button><button class="primary" data-eng-v52-click="submitConversation(false)" ${fb||state.handsFree?'disabled':''}>Send answer ${icon('chevron')}</button></div><small>${state.handsFree?'Hands-free will listen and submit after you finish speaking. You can stop it at any time.':speechRecognitionCtor()?'Voice uses browser speech-to-text; typing is always available.':'Speech-to-text is unavailable in this browser; type your response.'}</small>${fb?`<button class="continue-turn" data-eng-v52-click="nextConversation(false)">${state.conversationTurn===conversationTurnCount()-1?'Finish conversation':'Continue conversation'} ${icon('chevron')}</button>`:''}<div class="conversation-goal"><span>${esc(mission.tag)} PRINCIPLE</span><p>${state.conversationMission==='listener'?'Make the listener see the frame through your language.':state.conversationMission==='detective'?'Fact first. Inference second. Certainty only when the image supports it.':'Extend the moment, but keep invented events visibly cautious.'}</p></div></aside></div></section>`;
}

function renderHome(){
  clearTimer(); stopRecognition(); stopConversationRecognition(); state.screen='home'; state.lesson=null;
  const pct=completion();
  app.innerHTML=`<div class="app-shell home-shell"><header class="home-top"><div class="brand-lockup dark"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual English Studio</small></div></div><span class="prototype-pill">LESSON 01 • TAP → TALK • BLIND RECONSTRUCTION v0.12</span></header><main class="home-main"><section class="home-hero"><div class="hero-photo"><img src="assets/images/lesson_01.jpg" alt="Two Adults Walking on a Beach in Warm Low Sunlight"><div class="hero-shade"></div><div class="hero-label"><span>Category 01</span><h1>See the scene.<br>Speak the scene.</h1><p>Your words illuminate the scene as you describe it. Evidence Engine keeps visible fact, inference, and unsupported certainty separate.</p></div><div class="hero-ring" style="--p:${pct*3.6}deg"><div><b>${pct}%</b><small>complete</small></div></div></div></section><section class="resume-card" data-eng-v52-click="openLesson(1)"><div class="resume-icon">${icon('play')}</div><div><span>CONTINUE THE GOLD STANDARD</span><h2>Two Adults Walking on a Beach in Warm Low Sunlight</h2><p>${discoveredSet().size}/${activeHotspotCount()} visual details • ${progress.speakingAttempts||0} descriptions • ${progress.conversation?.turns||0} conversation turns</p></div><div class="resume-arrow">${icon('chevron')}</div></section><section class="voice-home-card"><div><span class="section-kicker">NEW • VOICE-FIRST PRACTICE</span><h3>Talk about the same image in three different ways.</h3><p>Blind Listener builds description clarity. Photo Detective trains fact vs inference. Story Relay develops cautious fluency.</p></div><div class="voice-home-missions">${Object.entries(SCENE_MISSIONS).map(([k,m])=>`<button data-eng-v52-click="openLesson(1);setMode('talk');setConversationMission('${k}')"><i>${icon(m.icon)}</i><span><em>${m.tag}</em><b>${m.label}</b></span>${icon('chevron')}</button>`).join('')}</div></section><section class="journey-card"><div class="section-kicker">LEARNING JOURNEY</div><h3>One image. A complete active-speaking loop.</h3><div class="journey-grid">${journeyHomeItem('01','Touch & discover','Tap real objects, hear the word, and learn it in context.',progress.completed.l1_explore)}${journeyHomeItem('02','Evidence lens','Separate what the image proves from what you infer.',progress.completed.l1_evidence)}${journeyHomeItem('03','Recall & build','Find details from memory and rebuild useful sentences.',progress.completed.l1_practice)}${journeyHomeItem('04','Plan & describe','Speak 30–90 seconds while Live Scene Coverage shows what your listener could reconstruct.',progress.completed.l1_speaking)}${journeyHomeItem('05','Voice Scene Lab','Describe, investigate evidence, or extend the scene in adaptive conversation.',progress.completed.l1_talk)}</div></section>${homePracticeHub()}<section class="focus-session-card"><div class="focus-session-copy"><span class="section-kicker">8-MINUTE FOCUS SESSION</span><h3>One scene, one complete speaking cycle</h3><p>2 min visual retrieval → 2 min description → 3 min voice-first conversation → 1 min repair.</p><div><span>${icon('target')} visual retrieval</span><span>${icon('mic')} independent speech</span><span>${icon('spark')} conversation repair</span></div></div><button data-eng-v52-click="openLesson(1);setMode('practice');setPractice('smart')">Start Focus Session ${icon('chevron')}</button></section>${homeSkillMap()}<section class="roadmap"><div><span class="section-kicker">CATEGORY ROADMAP</span><h3>28 lessons prepared</h3><p>Lessons 02–28 stay locked while Lesson 01 is being perfected as the interaction standard.</p></div><div class="roadmap-strip">${CAT01.lessons.slice(1,8).map(l=>`<div class="locked-thumb"><img src="${l.image}" alt=""><span>${courseLessonLabel(l.id)}</span></div>`).join('')}<div class="locked-more">+20</div></div></section></main><div class="toast" id="toast"></div></div>`;
}

/* ===== v0.11 TAP → TALK + ROLESHIFT =====
   One visible anchor becomes a speaking doorway. RoleShift changes linguistic perspective
   while keeping the lesson's fact/inference guardrails explicit. Creative roles are labeled as roleplay. */
state.tapTalkOpen = false;
state.sceneAnchor = null;
state.tapTalkAction = null;
state.roleShift = 'observer';
state.roleplayCharacter = null;
state.roleShiftNoteOpen = false;
progress.tapTalk = progress.tapTalk || {launches:0,anchors:{},roles:{observer:0,woman:0,man:0,photographer:0,storyteller:0},actions:{}};
saveProgress();

const ROLE_SHIFT_PROFILES = {
  observer:{label:'Observer',short:'OBS',icon:'eye',tag:'FACT-FIRST',creative:false,sub:'Describe the frame from outside it.',principle:'Stay outside the scene: visible fact first, cautious inference second.'},
  woman:{label:'Her perspective',short:'HER',icon:'spark',tag:'ROLEPLAY',creative:true,sub:'Speak in first person as a fictionalized version of the woman.',principle:'Use I / we naturally, but remember that thoughts and backstory are creative roleplay.'},
  man:{label:'His perspective',short:'HIS',icon:'spark',tag:'ROLEPLAY',creative:true,sub:'Speak in first person as a fictionalized version of the man.',principle:'Use I / we naturally, but do not turn invented identity or history into visual fact.'},
  photographer:{label:'Photographer',short:'CAM',icon:'eye',tag:'COMPOSITION',creative:true,sub:'Describe framing, light, balance, and visual choices.',principle:'Composition is visible; exact artistic intention is roleplay unless directly established.'},
  storyteller:{label:'Storyteller',short:'STORY',icon:'spark',tag:'TIMELINE',creative:true,sub:'Build Before → Now → Next with cautious language.',principle:'Story extension must remain clearly hypothetical: may, might, could, perhaps.'}
};

const ROLE_SHIFT_PROMPTS = {
  woman:[
    {label:'STEP INTO THE FRAME',prompt:'Roleplay as the woman. Begin with one first-person sentence about what is visibly happening right now.',hint:'Try: I am walking… / We are walking… Keep the first line tied to the visible action.',focus:'action'},
    {label:'WHAT AM I WEARING?',prompt:'Still in role, describe two visible details of your clothing or appearance without inventing identity.',hint:'Use I am wearing… and one precise visible detail.',focus:'detail'},
    {label:'WHERE AM I?',prompt:'From this first-person perspective, place yourself in the scene using the beach, shallow water, ocean, or palms.',hint:'Use beside, along, near, in the background, or on the left.',focus:'spatial'},
    {label:'ONE PLAUSIBLE THOUGHT',prompt:'Add one short thought or feeling as creative roleplay, then clearly signal that it is imagined rather than visually proven.',hint:'Use something like: I might be enjoying… / Perhaps I am thinking…',focus:'inference'},
    {label:'CLOSE THE MOMENT',prompt:'Finish with one possible next step from her perspective using may, might, or could.',hint:'Keep the next action plausible and brief.',focus:'timeline'}
  ],
  man:[
    {label:'STEP INTO THE FRAME',prompt:'Roleplay as the man. Begin with one first-person sentence about the visible action.',hint:'Try: I am walking beside… / We are walking…',focus:'action'},
    {label:'VISIBLE APPEARANCE',prompt:'Describe two visible details of your clothing or posture in first person.',hint:'Mention the light shirt, rolled trousers, bare feet, or downward gaze.',focus:'detail'},
    {label:'PLACE THE SCENE',prompt:'From your perspective, describe where you are in relation to the shoreline, water, and low sun.',hint:'Use along, beside, behind, on the right, or in the background.',focus:'spatial'},
    {label:'CAUTIOUS INNER VOICE',prompt:'Invent one plausible inner thought as roleplay, but mark it clearly as imagined.',hint:'Use perhaps, might, or could rather than certainty.',focus:'inference'},
    {label:'WHAT NEXT?',prompt:'Give one possible next action in first person without claiming that the image proves it.',hint:'We might stop… / I may continue…',focus:'timeline'}
  ],
  photographer:[
    {label:'FRAME FIRST',prompt:'Roleplay as the photographer. Describe how the people and open water are positioned in the frame.',hint:'Notice the two adults on the left and the open water / low sun on the right.',focus:'spatial'},
    {label:'LIGHT AS A TOOL',prompt:'Describe the visible low-angle light, colors, and reflection as if you were explaining the shot.',hint:'Name only what the frame actually shows before suggesting a creative choice.',focus:'detail'},
    {label:'VISUAL BALANCE',prompt:'Explain what creates balance or contrast in the composition.',hint:'Compare human closeness on the left with the wide, quiet landscape on the right.',focus:'overview'},
    {label:'INTENTION — CAREFULLY',prompt:'Now suggest one possible photographic intention, but label it as your roleplay interpretation.',hint:'Use I may have wanted… / I might have chosen…',focus:'inference'},
    {label:'DIRECT THE NEXT FRAME',prompt:'Imagine one small adjustment for a second photo and explain why it could change the composition.',hint:'This is creative roleplay, so keep it separate from the visible original.',focus:'extension'}
  ],
  storyteller:[
    {label:'NOW',prompt:'Start with one sentence that reports only the visible present moment.',hint:'People + action + setting. No backstory yet.',focus:'action'},
    {label:'BEFORE',prompt:'Add one possible event from shortly before the photo using cautious language.',hint:'Use may have / might have / perhaps.',focus:'timeline'},
    {label:'NEXT',prompt:'Add one possible next event that follows naturally from the visible scene.',hint:'Use may, might, or could.',focus:'timeline'},
    {label:'TIE IT TO EVIDENCE',prompt:'Name one visible clue that makes your imagined story plausible.',hint:'Use hand-holding, leaning, low light, shallow water, or relaxed pace.',focus:'inference'},
    {label:'THREE-SENTENCE RELAY',prompt:'Retell Before → Now → Next in three connected sentences, keeping the invented parts clearly hypothetical.',hint:'Before they may have… Now they are… Next they might…',focus:'timeline'}
  ]
};

const TAP_TALK_ANCHORS = {
  man:{visible:'A young man in a light long-sleeved shirt and rolled trousers is walking barefoot beside the woman.',describe:['What can you say about the man’s visible clothing and posture?','What is he doing right now, and where is he looking?'],evidence:['Which details about the man are directly visible?','What can his downward gaze suggest without proving an emotion or relationship status?'],question:'Ask and answer one useful question about the man using only evidence from the image.'},
  woman:{visible:'A young woman in a sleeveless white maxi dress is walking barefoot while leaning close to the man.',describe:['Describe the woman’s clothing, posture, and visible action.','Place her in relation to the man and the shoreline.'],evidence:['What is directly visible about her posture and body language?','What cautious interpretation can you make from her leaning posture?'],question:'Ask and answer one useful question about the woman without inventing identity or exact feelings.'},
  sun:{visible:'The sun is very low above the water and creates a bright vertical reflection.',describe:['Describe the sun’s position, color, and relation to the water.','How does the low sun affect the visible light in the scene?'],evidence:['What does the frame directly prove about the sun?','Why can a very low sun suggest sunrise or sunset without proving either one?'],question:'Ask and answer a question about the sun that separates visible fact from time-of-day inference.'},
  ocean:{visible:'A calm ocean extends to a flat horizon with very gentle waves.',describe:['Describe the ocean surface, horizon, and visible wave conditions.','Where is the ocean positioned relative to the couple?'],evidence:['Which details support calm conditions?','What can you not know about water depth, temperature, or location?'],question:'Ask and answer one evidence-safe question about the ocean.'},
  'palm tree':{visible:'A line of palm trees and darker coastal vegetation runs along the beach.',describe:['Describe the palms and where they appear in the frame.','How do they help establish the visible coastal setting?'],evidence:['What do the palms directly prove?','Why do they not prove a specific country or resort?'],question:'Ask and answer one question about the palms without naming an exact destination.'},
  beach:{visible:'Wet reflective sand, shallow water, white foam, and a curving shoreline form the beach setting.',describe:['Describe the beach from foreground to middle ground.','Add two surface or spatial details that a listener would need to reconstruct it.'],evidence:['What details make “beach / shoreline” a direct visual fact?','What activities or occasion are still unknown?'],question:'Ask and answer one question about the beach setting using spatial language.'},
  hand:{visible:'The pair’s hands are joined while they walk side by side.',describe:['Describe the visible hand position and action precisely.','Connect the joined hands with one other visible body-language detail.'],evidence:['What is directly visible about their hands?','What relationship inference is reasonable, and what exact status is not proven?'],question:'Ask and answer one question about the hand-holding using cautious relationship language.'}
};

function tapTalkMeta(word){return TAP_TALK_ANCHORS[word]||{visible:`${word} is a visible anchor in the scene.`,describe:[`Describe ${word} using only what you can see.`,`Place ${word} in relation to another detail in the image.`],evidence:[`What about ${word} is directly visible?`,`What can you infer cautiously from this detail?`],question:`Ask and answer one useful question about ${word}.`};}
function isHumanAnchor(word){return word==='man'||word==='woman';}
function oppositeRoleFor(word){return word==='woman'?'woman':word==='man'?'man':'observer';}

function tapTalkWheel(h){
  const person=isHumanAnchor(h.en),open=state.tapTalkOpen;
  return `<div class="tap-talk-wheel-wrap ${open?'open':''}" style="left:${clamp(h.x,18,82)}%;top:${clamp(h.y,23,77)}%" data-eng-v52-click="event.stopPropagation()">
    <button class="tap-talk-core" data-eng-v52-click="state.tapTalkOpen=!state.tapTalkOpen;render()"><i>${icon('spark')}</i><span>Talk</span></button>
    ${open?`<div class="tap-talk-orbit">
      <button class="orbit-a" data-eng-v52-click="tapTalkStart('name','${q(h.en)}')"><i>${icon('volume')}</i><span>Name</span></button>
      <button class="orbit-b" data-eng-v52-click="tapTalkStart('describe','${q(h.en)}')"><i>${icon('mic')}</i><span>Describe</span></button>
      <button class="orbit-c" data-eng-v52-click="tapTalkStart('evidence','${q(h.en)}')"><i>${icon('eye')}</i><span>Evidence</span></button>
      <button class="orbit-d" data-eng-v52-click="tapTalkStart('ask','${q(h.en)}')"><i>?</i><span>Question</span></button>
      <button class="orbit-e" data-eng-v52-click="tapTalkStart('${person?'talk-to':'converse'}','${q(h.en)}')"><i>${icon('spark')}</i><span>${person?'Talk to':'Converse'}</span></button>
      <button class="orbit-f" data-eng-v52-click="tapTalkStart('${person?'speak-as':'role'}','${q(h.en)}')"><i>${person?'◉':'↻'}</i><span>${person?'Speak as':'Role'}</span></button>
    </div>`:''}
  </div>`;
}

function tapTalkPanel(h){
  const person=isHumanAnchor(h.en),meta=tapTalkMeta(h.en);
  return `<section class="tap-talk-panel"><div class="tap-talk-panel-head"><div><span>TAP → TALK</span><b>Turn “${esc(h.en)}” into language</b></div><button data-eng-v52-click="tapTalkStart('describe','${q(h.en)}')">Start ${icon('chevron')}</button></div><p>${esc(meta.visible)}</p><div class="tap-talk-actions-grid">
    <button data-eng-v52-click="tapTalkStart('describe','${q(h.en)}')">${icon('mic')}<span><b>Describe</b><small>one focused mini-turn</small></span></button>
    <button data-eng-v52-click="tapTalkStart('evidence','${q(h.en)}')">${icon('eye')}<span><b>Evidence</b><small>fact → inference</small></span></button>
    <button data-eng-v52-click="tapTalkStart('ask','${q(h.en)}')"><i>?</i><span><b>Ask & answer</b><small>build a useful question</small></span></button>
    <button data-eng-v52-click="tapTalkStart('${person?'speak-as':'role'}','${q(h.en)}')">${icon('spark')}<span><b>${person?'Speak as '+(h.en==='woman'?'her':'him'):'Shift role'}</b><small>${person?'first-person roleplay':'change perspective'}</small></span></button>
  </div></section>`;
}

function clearConversationRunKeepContext(){
  stopConversationRecognition();window.EngBookSpeech.stopSpeaking();
  state.conversationTurn=0;state.conversationResponses=[];state.conversationInput='';state.conversationFeedback=null;state.conversationHint=false;state.conversationComplete=false;state.handsFree=false;state.voiceStage='idle';state.coachHelp=false;state.explainRepair=false;state.retryOriginal=null;state.sessionReplayOpen=false;state.repairSprintOpen=false;
}
function tapTalkStart(action,word){
  const h=state.lesson?.hotspots?.find(x=>x.en===word)||CAT01.lessons[0].hotspots.find(x=>x.en===word);
  state.sceneAnchor=word;state.tapTalkAction=action;state.tapTalkOpen=false;state.roleplayCharacter=null;
  progress.tapTalk.launches=(progress.tapTalk.launches||0)+1;progress.tapTalk.anchors[word]=(progress.tapTalk.anchors[word]||0)+1;progress.tapTalk.actions[action]=(progress.tapTalk.actions[action]||0)+1;
  if(action==='name'){if(h){state.selected=state.lesson.hotspots.findIndex(x=>x.en===word);state.wordDepth='word';speak(word,.78);}saveProgress();render();return;}
  if(action==='evidence'){state.conversationMission='detective';state.roleShift='observer';}
  else if(action==='speak-as'&&isHumanAnchor(word)){state.roleShift=oppositeRoleFor(word);state.conversationMission='story';}
  else if(action==='talk-to'&&isHumanAnchor(word)){state.roleShift='observer';state.roleplayCharacter=word;state.conversationMission='listener';}
  else if(action==='role'){state.roleShift='photographer';state.conversationMission='listener';}
  else {state.roleShift='observer';state.conversationMission=action==='ask'?'listener':'listener';}
  clearConversationRunKeepContext();state.mode='talk';progress.tapTalk.roles[state.roleShift]=(progress.tapTalk.roles[state.roleShift]||0)+1;saveProgress();haptic([12,20,28]);render();setTimeout(()=>playCoachPrompt(.86,false),160);
}
function clearTapTalkContext(){state.sceneAnchor=null;state.tapTalkAction=null;state.roleplayCharacter=null;state.roleShift='observer';clearConversationRunKeepContext();render();}

function setRoleShift(role){
  if(!ROLE_SHIFT_PROFILES[role])return;
  state.roleShift=role;state.sceneAnchor=null;state.tapTalkAction='role';state.roleplayCharacter=null;state.conversationMission=role==='storyteller'?'story':role==='observer'?'listener':'listener';clearConversationRunKeepContext();progress.tapTalk.roles[role]=(progress.tapTalk.roles[role]||0)+1;saveProgress();haptic(14);render();
}
function roleSceneBadge(){
  const r=ROLE_SHIFT_PROFILES[state.roleShift]||ROLE_SHIFT_PROFILES.observer;
  const anchor=state.sceneAnchor?` • ${state.sceneAnchor}`:'';
  return `<div class="role-scene-badge ${r.creative?'creative':''}"><span>${esc(r.short)}</span><b>${esc(r.label)}${esc(anchor)}</b></div>`;
}
function roleShiftBar(){
  return `<section class="role-shift-shell"><div class="role-shift-head"><div><span>ROLESHIFT</span><h3>Same image. Different speaking skill.</h3></div><button data-eng-v52-click="state.roleShiftNoteOpen=!state.roleShiftNoteOpen;render()">${icon('eye')} Rules</button></div><div class="role-shift-tabs">${Object.entries(ROLE_SHIFT_PROFILES).map(([k,r])=>`<button class="${state.roleShift===k?'active':''} ${r.creative?'creative':''}" data-eng-v52-click="setRoleShift('${k}')"><i>${k==='photographer'?'📷':k==='woman'?'HER':k==='man'?'HIS':k==='storyteller'?'✦':icon('eye')}</i><span><b>${esc(r.label)}</b><small>${esc(r.tag)}</small></span></button>`).join('')}</div>${state.roleShiftNoteOpen?`<div class="role-shift-note"><b>${esc((ROLE_SHIFT_PROFILES[state.roleShift]||ROLE_SHIFT_PROFILES.observer).principle)}</b><p>${(ROLE_SHIFT_PROFILES[state.roleShift]||ROLE_SHIFT_PROFILES.observer).creative?'This is explicitly creative perspective practice. The app still keeps visual facts separate from imagined thoughts, intention, dialogue, or backstory.':'Observer mode is the evidence baseline. Use it when you want maximum visual accuracy.'}</p></div>`:''}</section>`;
}
function anchorContextCard(){
  if(!state.sceneAnchor)return '';
  const meta=tapTalkMeta(state.sceneAnchor),action=state.tapTalkAction||'describe',person=isHumanAnchor(state.sceneAnchor);
  const labels={describe:'Focused description',evidence:'Evidence drill',ask:'Ask & answer','talk-to':'Character roleplay','speak-as':'First-person roleplay',converse:'Anchor conversation',role:'Perspective shift'};
  return `<section class="anchor-context-card"><div class="anchor-thumb"><img src="assets/images/lesson_01.jpg" alt=""><i></i></div><div><span>TAP → TALK • ${esc(labels[action]||'Anchor conversation')}</span><h3>${esc(state.sceneAnchor)}</h3><p>${esc(meta.visible)}</p><div class="anchor-context-pills"><b>${person?'human anchor':'scene anchor'}</b><b>${state.roleplayCharacter?'creative character roleplay':esc((ROLE_SHIFT_PROFILES[state.roleShift]||ROLE_SHIFT_PROFILES.observer).label)}</b></div></div><button data-eng-v52-click="clearTapTalkContext()">Clear</button></section>`;
}

function tapActionPromptBank(){
  const word=state.sceneAnchor,meta=tapTalkMeta(word),action=state.tapTalkAction;
  if(!word)return null;
  if(action==='describe')return [
    {label:`ZOOM IN • ${word.toUpperCase()}`,prompt:meta.describe[0],hint:'Stay concrete: appearance, position, action, light, or surface detail.',focus:'detail'},
    {label:'CONNECT IT',prompt:meta.describe[1],hint:'Connect the anchor to another visible part of the scene.',focus:'spatial'},
    {label:'USE IT NATURALLY',prompt:`Give one connected sentence that includes “${word}” and one visible action.`,hint:'Use present continuous if the action is happening in the photo.',focus:'action'},
    {label:'ONE SAFE INFERENCE',prompt:`Add one cautious interpretation related to ${word}, and name the visible clue that supports it.`,hint:'Use may, might, appears, seems, or suggests.',focus:'inference'}
  ];
  if(action==='evidence')return [
    {label:'VISIBLE FIRST',prompt:meta.evidence[0],hint:'Say only what the frame directly supports.',focus:'detail'},
    {label:'INTERPRET SECOND',prompt:meta.evidence[1],hint:'Use cautious language and one visible clue.',focus:'inference'},
    {label:'DRAW THE LIMIT',prompt:`Name one thing about ${word} that the image does not let us know for sure.`,hint:'Accuracy includes knowing what not to claim.',focus:'inference'},
    {label:'REPAIR IT',prompt:`Create one overconfident claim about ${word}, then immediately repair it into evidence-safe English.`,hint:'Use may / might / appears / suggests for the repaired version.',focus:'inference'}
  ];
  if(action==='ask')return [
    {label:'BUILD THE QUESTION',prompt:meta.question,hint:'Use What / Where / How, then answer from the image.',focus:'overview'},
    {label:'ASK DEEPER',prompt:`Ask a second question about ${word} that requires spatial or action language, then answer it.`,hint:'Make the answer image-grounded.',focus:'spatial'},
    {label:'ASK ABOUT MEANING',prompt:`Ask one inference question about ${word}. Answer cautiously and give a visible reason.`,hint:'Use may / might / seems / suggests.',focus:'inference'},
    {label:'CLOSE WITH A FOLLOW-UP',prompt:'Ask one natural follow-up question that could continue a real conversation about this photo, then answer it briefly.',hint:'Keep it connected to the scene.',focus:'extension'}
  ];
  if(action==='talk-to'&&state.roleplayCharacter){
    const who=state.roleplayCharacter==='woman'?'woman':'man';
    return [
      {label:`CREATIVE ROLEPLAY • TALK TO THE ${who.toUpperCase()}`,prompt:`Creative roleplay: imagine I am the ${who} in the photo. I ask you, “What do you notice first about this place?” Answer me naturally.`,hint:'The character voice is fictional; your description of the visible setting can still be factual.',focus:'overview'},
      {label:'I ASK ABOUT THE MOMENT',prompt:'I ask, “How would you describe what we are doing right now?”',hint:'Use the visible action before interpreting the relationship.',focus:'action'},
      {label:'I ASK ABOUT THE LIGHT',prompt:'I ask, “What does the light and water look like from your point of view?”',hint:'Mention the low sun, warm colors, ocean, or reflection.',focus:'detail'},
      {label:'YOU ASK ME',prompt:`Now ask the fictional ${who} one short question. Then imagine one plausible answer, clearly as roleplay.`,hint:'Do not turn the imagined answer into a fact about the real image.',focus:'extension'},
      {label:'LEAVE THE SCENE',prompt:'Finish the roleplay with one possible next action using might, may, or could.',hint:'Keep the ending hypothetical.',focus:'timeline'}
    ];
  }
  if(action==='speak-as'||action==='role')return null;
  if(action==='converse')return [
    {label:`START FROM • ${word.toUpperCase()}`,prompt:`Start with ${word}. Tell me what it is, where it is, and one visible detail.`,hint:'Use the anchor as your starting point, then connect it to the wider scene.',focus:'overview'},
    {label:'CONNECT OUTWARD',prompt:`Connect ${word} to one person, action, or background detail in the image.`,hint:'Build a sentence that links two visible anchors.',focus:'spatial'},
    {label:'MAKE IT USEFUL',prompt:`Imagine a real conversation about this photo. What would you naturally say next about ${word}?`,hint:'Keep the answer scene-grounded rather than turning it into a vocabulary definition.',focus:'extension'},
    {label:'FACT + INFERENCE',prompt:`Finish with one direct fact about ${word} and one cautious inference related to it.`,hint:'Use may, might, appears, seems, or suggests for the inference.',focus:'inference'}
  ];
  return [
    {label:`FOCUS • ${word.toUpperCase()}`,prompt:`Describe ${word} and connect it to one other visible detail.`,hint:'Stay close to the image.',focus:'detail'},
    {label:'EXPAND',prompt:`Use ${word} in one connected sentence about the wider scene.`,hint:'Add position, action, or light.',focus:'overview'},
    {label:'INTERPRET SAFELY',prompt:`Add one cautious inference related to ${word} and support it with a visible clue.`,hint:'Use may, might, seems, appears, or suggests.',focus:'inference'}
  ];
}

const _v10AnalyzeConversationResponse = analyzeConversationResponse;
analyzeConversationResponse = function(turn,text){
  const fb=_v10AnalyzeConversationResponse(turn,text),t=normalizeSpeech(text),role=state.roleShift;
  if(role==='woman'||role==='man'){
    const first=/\b(i|i am|i'm|my|we|we are|we're|our)\b/.test(t);
    if(first){fb.score=clamp(fb.score+6,0,100);fb.strength=`${fb.strength} You maintained the first-person perspective.`;}
    else {fb.score=clamp(fb.score-8,0,100);fb.repair='Stay inside the role with I / we / my / our, while keeping invented thoughts clearly fictional.';fb.focus='extension';}
  } else if(role==='photographer'){
    const comp=/\b(frame|left|right|foreground|background|composition|light|reflection|balance|position|third)\b/.test(t);
    if(comp){fb.score=clamp(fb.score+6,0,100);fb.strength=`${fb.strength} You used composition language.`;}
    else {fb.score=clamp(fb.score-7,0,100);fb.repair='Use one composition anchor such as left, right, frame, background, reflection, or visual balance.';fb.focus='spatial';}
  } else if(role==='storyteller'){
    const cautious=CAUTION_TERMS.some(x=>t.includes(x))||/\b(perhaps|may have|might have)\b/.test(t);
    if(cautious){fb.score=clamp(fb.score+6,0,100);fb.strength=`${fb.strength} Your story extension stayed cautious.`;}
    else {fb.score=clamp(fb.score-8,0,100);fb.repair='Keep imagined Before / Next events hypothetical with may, might, could, or perhaps.';fb.focus='timeline';}
  }
  if(state.sceneAnchor&&t.includes(normalizeSpeech(state.sceneAnchor))){fb.score=clamp(fb.score+4,0,100);}
  return fb;
};

function conversationPromptBank(){
  const tap=tapActionPromptBank();if(tap)return tap;
  if(state.roleShift!=='observer'&&ROLE_SHIFT_PROMPTS[state.roleShift])return ROLE_SHIFT_PROMPTS[state.roleShift];
  return sceneMission().prompts;
}
function conversationTurnCount(){return Math.min(conversationConfig().turns,conversationPromptBank().length);}
function missionSelector(){
  const missionGrid=`<div class="scene-mission-grid">${Object.entries(SCENE_MISSIONS).map(([k,m])=>`<button class="scene-mission ${state.conversationMission===k&&!state.sceneAnchor&&state.roleShift==='observer'?'active':''}" data-eng-v52-click="state.sceneAnchor=null;state.tapTalkAction=null;state.roleplayCharacter=null;state.roleShift='observer';setConversationMission('${k}')"><i>${icon(m.icon)}</i><span><em>${m.tag}</em><b>${m.label}</b><small>${m.sub}</small></span></button>`).join('')}</div>`;
  return `${roleShiftBar()}${anchorContextCard()}${missionGrid}`;
}

// Keep role and anchor context when changing support level.
const _v10SetConversationMode = setConversationMode;
setConversationMode = function(mode){
  if(!CONVERSATION_MODE_CONFIG[mode])return;
  const role=state.roleShift,anchor=state.sceneAnchor,action=state.tapTalkAction,character=state.roleplayCharacter;
  _v10SetConversationMode(mode);
  state.roleShift=role;state.sceneAnchor=anchor;state.tapTalkAction=action;state.roleplayCharacter=character;
};

// Home identity for the new product step.
const _v10RenderHomeTapTalk = renderHome;
renderHome = function(){
  _v10RenderHomeTapTalk();
  const hero=document.querySelector('.hero-label p');if(hero)hero.textContent='Touch any meaningful part of the image, then turn that exact detail into description, evidence, questions, or role-based conversation.';
  const voice=document.querySelector('.voice-home-card');if(voice){voice.insertAdjacentHTML('beforebegin',`<section class="tap-talk-home"><div><span class="section-kicker">NEW • SIGNATURE INTERACTION</span><h3>Touch one detail. Enter the conversation from there.</h3><p>Tap → Talk turns each visual anchor into six speaking paths. RoleShift then lets the learner re-express the same scene as Observer, Her, Him, Photographer, or Storyteller.</p></div><div class="tap-talk-home-demo"><button data-eng-v52-click="openLesson(1);setTimeout(()=>{state.selected=1;state.tapTalkOpen=true;render()},40)"><b>woman</b><span>Describe • Evidence • Ask • Talk to • Speak as</span>${icon('chevron')}</button><button data-eng-v52-click="openLesson(1);setMode('talk');setRoleShift('photographer')"><b>📷 Photographer</b><span>composition • light • visual balance</span>${icon('chevron')}</button></div></section>`);}
};

const _v10SceneMissionTapTalk = sceneMission;
sceneMission = function(){
  if(state.sceneAnchor){
    const labels={describe:'Focused Description',evidence:'Anchor Evidence',ask:'Ask & Answer','talk-to':'Character Roleplay','speak-as':'First-Person Roleplay',converse:'Anchor Conversation',role:'Perspective Shift'};
    return {label:labels[state.tapTalkAction]||'Tap → Talk',icon:'spark',tag:state.roleplayCharacter?'CREATIVE ROLEPLAY':'ANCHOR TALK',sub:`Start from “${state.sceneAnchor}” and expand outward into connected English.`,prompts:conversationPromptBank()};
  }
  if(state.roleShift!=='observer'){
    const r=ROLE_SHIFT_PROFILES[state.roleShift];return {label:r.label,icon:r.icon,tag:r.tag,sub:r.sub,prompts:ROLE_SHIFT_PROMPTS[state.roleShift]||[]};
  }
  return SCENE_MISSIONS[state.conversationMission]||SCENE_MISSIONS.listener;
};

/* ========================================================================
   v0.12 — STEP 4: BLIND RECONSTRUCTION LAB
   Goal: test meaning transfer. The learner sees the photo; the listener does not.
   The listener builds a scene map only from the learner's words.
   ======================================================================== */

Object.assign(state,{
  reconstructionStage:'idle',
  reconstructionTranscript:'',
  reconstructionDraft:'',
  reconstructionListening:false,
  reconstructionRecognition:null,
  reconstructionRecognitionBase:'',
  reconstructionQuestion:'',
  reconstructionClarifications:0,
  reconstructionHidePhoto:false,
  reconstructionRepair:false,
  reconstructionStartedAt:0
});
progress.reconstruction = progress.reconstruction || {best:0,last:0,runs:0,clarifications:0,bestCoverage:0};

const RECON_MAP_NODES = [
  {key:'pair',kind:'people',glyph:'2 PEOPLE'},
  {key:'palm-trees',kind:'setting',glyph:'PALMS'},
  {key:'man',kind:'people',glyph:'MAN'},
  {key:'woman',kind:'people',glyph:'WOMAN'},
  {key:'holding-hands',kind:'action',glyph:'HANDS'},
  {key:'leaning',kind:'action',glyph:'LEAN'},
  {key:'walking',kind:'action',glyph:'WALK'},
  {key:'white-dress',kind:'appearance',glyph:'DRESS'},
  {key:'light-shirt',kind:'appearance',glyph:'SHIRT'},
  {key:'barefoot',kind:'appearance',glyph:'FEET'},
  {key:'beach',kind:'setting',glyph:'BEACH'},
  {key:'shallow-water',kind:'setting',glyph:'SHALLOW'},
  {key:'wet-sand',kind:'setting',glyph:'SAND'},
  {key:'waves-foam',kind:'setting',glyph:'FOAM'},
  {key:'footprints',kind:'detail',glyph:'PRINTS'},
  {key:'ocean',kind:'setting',glyph:'OCEAN'},
  {key:'horizon',kind:'setting',glyph:'HORIZON'},
  {key:'sunset',kind:'light',glyph:'SUN'},
  {key:'reflection',kind:'light',glyph:'REFLECT'},
  {key:'warm-light',kind:'light',glyph:'LIGHT'}
];
const RECON_RELATIONS = [
  {key:'together',label:'people together',test:(t,c)=>c.hitKeys.has('man')&&c.hitKeys.has('woman')&&(/\b(together|beside|next to|side by side|with)\b/.test(t)||c.hitKeys.has('holding-hands'))},
  {key:'hands',label:'joined hands',test:(t,c)=>c.hitKeys.has('holding-hands')},
  {key:'walk-water',label:'walking by water',test:(t,c)=>c.hitKeys.has('walking')&&(c.hitKeys.has('beach')||c.hitKeys.has('shallow-water')||c.hitKeys.has('ocean'))},
  {key:'left-right',label:'scene direction',test:(t)=>/\b(left|right|foreground|background|middle ground)\b/.test(t)},
  {key:'sun-water',label:'sun over water',test:(t,c)=>c.hitKeys.has('sunset')&&c.hitKeys.has('ocean')&&(c.hitKeys.has('reflection')||/\b(over|above|across|reflection)\b/.test(t))},
  {key:'shoreline',label:'along shoreline',test:(t,c)=>(c.hitKeys.has('beach')||c.hitKeys.has('shallow-water'))&&/\b(along|edge|shoreline|waterline|through)\b/.test(t)}
];
const RECON_SPATIAL_TARGETS = ['left','right','foreground','background','middle ground','beside','side by side','along','near','across','over','above','edge','shoreline','waterline','behind','in front'];

function reconstructionText(){return String(state.reconstructionTranscript||'').trim();}
function reconstructionAnalysis(text=reconstructionText()){
  const normalized=normalizeCoverageText(text),coverage=sceneCoverageAnalysis(text),evidence=evidenceAnalysis(text);
  const spatial=[...new Set(RECON_SPATIAL_TARGETS.filter(term=>normalized.includes(term)))];
  const spatialScore=Math.min(100,Math.round(spatial.length/6*100));
  const relations=RECON_RELATIONS.filter(r=>r.test(normalized,coverage));
  const relationScore=Math.round(relations.length/RECON_RELATIONS.length*100);
  const peopleKeys=['man','woman','pair'],actionKeys=['holding-hands','walking','leaning'],environmentKeys=['beach','ocean','palm-trees','shallow-water','wet-sand','waves-foam','horizon'],lightKeys=['sunset','reflection','warm-light'];
  const groupScore=(keys)=>Math.round(keys.filter(k=>coverage.hitKeys.has(k)).length/keys.length*100);
  const evidenceScore=wordCount(text)>=3?evidence.control:0;
  const score=wordCount(text)<3?0:Math.round(coverage.pct*.55+spatialScore*.15+relationScore*.15+evidenceScore*.15);
  const confidence=score>=85?'Strong mental picture':score>=68?'Main scene is clear':score>=48?'Partial scene map':score>=25?'Fragmented picture':'Not enough information yet';
  return {coverage,evidence,spatial,spatialScore,relations,relationScore,evidenceScore,score,confidence,
    domains:[
      {key:'people',label:'People',score:groupScore(peopleKeys)},
      {key:'action',label:'Action',score:groupScore(actionKeys)},
      {key:'setting',label:'Setting',score:groupScore(environmentKeys)},
      {key:'light',label:'Light',score:groupScore(lightKeys)},
      {key:'structure',label:'Spatial structure',score:spatialScore},
      {key:'accuracy',label:'Evidence control',score:evidenceScore}
    ]
  };
}
function reconAnchor(key){return activeCoverageAnchors().find(a=>a.key===key);}
function reconstructionListenerQuestion(a=reconstructionAnalysis()){
  const c=a.coverage.hitKeys;
  if(!c.has('man')&&!c.has('woman')&&!c.has('pair'))return 'Who is in the scene? Tell me how many people you can see and where they are.';
  if(!(c.has('beach')||c.has('ocean')))return 'Where are these people? Describe the setting so I can place them in the scene.';
  if(!(c.has('walking')||c.has('holding-hands')||c.has('leaning')))return 'What are the people doing right now? Give me the clearest visible action.';
  if(a.spatialScore<35)return 'Where are the people relative to the ocean, shoreline, and background? Use left/right, foreground/background, beside, or along.';
  if(!(c.has('sunset')||c.has('warm-light')))return 'What is the light like? Where is the sun, and what does it do to the water?';
  if(!c.has('white-dress')&&!c.has('light-shirt')&&!c.has('barefoot'))return 'What visible appearance detail would help me picture the two people more accurately?';
  if(a.evidence.unsupported>0)return 'Which part of your description is directly visible, and which part is only a possible interpretation?';
  const miss=a.coverage.missing[0];
  return miss?`I can picture the main scene. What can you add about ${miss.label} so my reconstruction becomes more complete?`:'I have a strong picture now. Can you summarize the whole scene in one connected sentence?';
}
function reconstructionSummary(a=reconstructionAnalysis()){
  const h=a.coverage.hitKeys,parts=[];
  if(h.has('man')&&h.has('woman'))parts.push('two adults'); else if(h.has('pair'))parts.push('two people'); else if(h.has('man'))parts.push('a man'); else if(h.has('woman'))parts.push('a woman');
  if(h.has('walking'))parts.push('walking');
  if(h.has('holding-hands'))parts.push('holding hands');
  if(h.has('leaning'))parts.push('leaning close together');
  if(h.has('beach'))parts.push('on a beach');
  else if(h.has('ocean'))parts.push('beside the ocean');
  if(h.has('shallow-water'))parts.push('in shallow water');
  if(h.has('palm-trees'))parts.push('with palm trees nearby');
  if(h.has('sunset'))parts.push('under a very low sun');
  if(h.has('reflection'))parts.push('with light reflecting on the water');
  if(!parts.length)return 'I only have isolated fragments so far. Keep describing the people, action, setting, and spatial relationships.';
  return `From your words, I can currently reconstruct: ${parts.join(', ')}.`;
}
function reconstructionMapMarkup(reference=false){
  const a=reconstructionAnalysis(),hits=a.coverage.hitKeys,compare=state.reconstructionStage==='compare';
  const nodes=RECON_MAP_NODES.map((n,i)=>{
    const anchor=reconAnchor(n.key);if(!anchor)return '';
    const hit=hits.has(n.key);if(n.key==='pair'&&(hits.has('man')||hits.has('woman')))return '';const show=reference||hit;
    if(!show)return '';
    const cls=reference?'reference':hit?'heard':'missed';
    return `<div class="recon-node ${cls} ${n.kind}" style="left:${anchor.x}%;top:${anchor.y}%;--ri:${i}"><i>${esc(n.glyph)}</i><span>${esc(anchor.label)}</span></div>`;
  }).join('');
  const relations=(reference?RECON_RELATIONS:a.relations).map((r,i)=>`<span class="recon-relation ${reference?'reference':''} rr-${r.key}" style="--rri:${i}">${esc(r.label)}</span>`).join('');
  return `<div class="recon-map ${reference?'reference-map':''}" id="${reference?'referenceReconMap':'listenerReconMap'}"><div class="recon-sky"></div><div class="recon-sun"></div><div class="recon-horizon"></div><div class="recon-water"></div><div class="recon-shore"></div><div class="recon-map-grid"></div>${nodes}${relations}<div class="recon-map-caption"><span>${reference?'REFERENCE STRUCTURE':'BLIND LISTENER MAP'}</span><b>${reference?'What the image actually contains':`${a.coverage.hits.length}/${activeCoverageAnchors().length} anchors heard`}</b></div></div>`;
}
function reconstructionGapList(a=reconstructionAnalysis()){
  const missing=a.coverage.missing.slice(0,6);
  return missing.length?missing.map(x=>`<span><i></i>${esc(x.label)}</span>`).join(''):'<b class="recon-no-gaps">Major visual anchors recovered.</b>';
}
function reconstructionListenerCard(){
  const a=reconstructionAnalysis(),best=progress.reconstruction?.best||0;
  return `<section class="blind-listener-card"><div class="blind-listener-head"><div><span>BLIND LISTENER</span><h3>${esc(a.confidence)}</h3><p>${esc(reconstructionSummary(a))}</p></div><div class="recon-score" style="--rs:${a.score}"><b id="reconScore">${a.score}%</b><span>reconstructability</span><small>best ${best}%</small></div></div><div class="recon-score-note">This measures how much of <b>this scene</b> a listener could rebuild from your words: coverage + spatial structure + action relations + evidence control. It is not a CEFR, fluency, or pronunciation grade.</div></section>`;
}
function reconstructionMetrics(){
  const a=reconstructionAnalysis();
  return `<div class="recon-metrics" id="reconMetrics">${a.domains.map(d=>`<div><span>${esc(d.label)}</span><i><em style="width:${d.score}%"></em></i><b>${d.score}%</b></div>`).join('')}</div>`;
}
function reconstructionClarifier(){
  const a=reconstructionAnalysis(),q=state.reconstructionQuestion||reconstructionListenerQuestion(a),stage=state.reconstructionStage;
  return `<section class="listener-clarifier ${stage==='compare'?'closed':''}"><div class="listener-avatar"><i>${icon('spark')}</i></div><div class="listener-question"><span>LISTENER CLARIFICATION</span><h3>${esc(q)}</h3><p>The listener asks only about information that is missing or ambiguous in the scene map.</p></div><button data-eng-v52-click="askReconstructionClarification()" ${stage==='compare'?'disabled':''}>Ask another ${icon('chevron')}</button></section>`;
}
function reconstructionInput(){
  const active=state.reconstructionStage==='build'||state.reconstructionStage==='clarify';
  return `<section class="recon-input-shell ${state.reconstructionListening?'listening':''}"><div class="recon-input-top"><div><span>${state.reconstructionRepair?'GAP-ONLY REPAIR':'YOUR DESCRIPTION'}</span><b>${state.reconstructionListening?'Listening…':active?'Speak or type — the map updates live':'Start a session to begin'}</b></div><div class="recon-live-dot"><i></i>${state.reconstructionListening?'LIVE':'READY'}</div></div><textarea id="reconstructionDraft" data-eng-v52-input="state.reconstructionDraft=this.value" placeholder="${state.reconstructionRepair?'Add only the missing details…':'Describe the scene as if the listener cannot see the photo…'}" ${active?'':'disabled'}>${esc(state.reconstructionDraft)}</textarea><div class="recon-input-actions"><button class="voice ${state.reconstructionListening?'active':''}" data-eng-v52-click="toggleReconstructionRecognition()" ${active?'':'disabled'}>${icon('mic')} ${state.reconstructionListening?'Stop listening':'Speak'}</button><button data-eng-v52-click="sendReconstructionText()" ${active?'':'disabled'}>${icon('chevron')} Add to listener map</button></div><div class="recon-transcript"><span>WHAT THE LISTENER HAS HEARD</span><p id="reconTranscript">${esc(reconstructionText()||'Nothing yet. Start with people + setting + visible action.')}</p></div></section>`;
}
function reconstructionCompare(){
  const a=reconstructionAnalysis();
  if(state.reconstructionStage!=='compare')return '';
  const missed=a.coverage.missing.slice(0,8);
  return `<section class="recon-compare"><div class="recon-compare-head"><div><span>ORIGINAL → LANGUAGE → LISTENER</span><h3>How close was the mental picture?</h3><p>The left map contains only what your listener could recover. The reference map reveals the scene structure after the attempt.</p></div><button data-eng-v52-click="startReconstruction(true)">Repair only the gaps ${icon('chevron')}</button></div><div class="recon-map-compare"><div>${reconstructionMapMarkup(false)}</div><div>${reconstructionMapMarkup(true)}</div></div><div class="recon-compare-bottom"><article><span>RECOVERED WELL</span><div>${a.coverage.hits.slice(0,8).map(x=>`<b>${icon('check')} ${esc(x.label)}</b>`).join('')||'<em>No stable anchors yet.</em>'}</div></article><article><span>STILL AMBIGUOUS / MISSING</span><div>${missed.map(x=>`<b>${esc(x.label)}</b>`).join('')||'<em>Major scene anchors recovered.</em>'}</div></article><article class="meaning-transfer"><span>MEANING TRANSFER</span><h4>${a.score}% reconstructability</h4><p>${a.score>=85?'A listener can form a strong mental picture from your description.':a.score>=68?'The core scene transfers clearly, but a few details or spatial links remain weak.':a.score>=48?'The listener understands the general idea but still needs clarification to place important details.':'The listener has fragments rather than a stable scene. Focus on people → action → setting → spatial links.'}</p></article></div></section>`;
}
function reconstructionContent(){
  const a=reconstructionAnalysis(),active=state.reconstructionStage!=='idle',compare=state.reconstructionStage==='compare';
  return `<section class="reconstruction-lab"><div class="panel-heading recon-heading"><div><span class="section-kicker">STEP 4 • SIGNATURE COMMUNICATION LAB</span><h2>Blind Reconstruction</h2><p>You can see the photo. Your listener cannot. Describe it so clearly that the listener can rebuild a reliable mental map from language alone.</p></div><button class="complete-btn ${progress.completed.l1_reconstruct?'done':''}" data-eng-v52-click="${active&&!compare?'finishReconstruction()':'startReconstruction(false)'}">${active&&!compare?'Finish & compare':progress.completed.l1_reconstruct?icon('refresh')+' New run':'Start reconstruction'}</button></div>
  <div class="recon-principle"><div><b>SEE</b><span>You inspect the original image.</span></div><i>${icon('chevron')}</i><div><b>SAY</b><span>You transfer people, action, setting, and relations.</span></div><i>${icon('chevron')}</i><div><b>REBUILD</b><span>The listener constructs only what your words support.</span></div></div>
  <div class="recon-phase-rail">${[['build','1','Describe'],['clarify','2','Clarify'],['compare','3','Compare']].map(([k,n,l])=>`<div class="${state.reconstructionStage===k?'active':''} ${compare||state.reconstructionStage==='clarify'&&k==='build'?'done':''}"><i>${compare&&k!=='compare'||state.reconstructionStage==='clarify'&&k==='build'?icon('check'):n}</i><span>${l}</span></div>`).join('')}</div>
  <div class="recon-main-grid"><div class="recon-map-column">${reconstructionListenerCard()}${reconstructionMapMarkup(false)}<div class="recon-gaps"><div><span>LISTENER GAPS</span><b>${a.coverage.missing.length} anchors still absent</b></div><div id="reconGapList">${reconstructionGapList(a)}</div></div>${reconstructionMetrics()}</div><div class="recon-control-column">${reconstructionClarifier()}${reconstructionInput()}<div class="recon-session-controls"><button data-eng-v52-click="toggleReconstructionPhoto()">${icon('eye')} ${state.reconstructionHidePhoto?'Show original':'Memory challenge: hide original'}</button><button data-eng-v52-click="resetReconstruction()">${icon('reset')} Reset</button>${active&&!compare?`<button class="primary" data-eng-v52-click="finishReconstruction()">Finish & compare ${icon('chevron')}</button>`:''}</div></div></div>
  ${reconstructionCompare()}
  <div class="recon-method-note"><div>${icon('target')}</div><div><b>Why this is different</b><p>Scene Coverage asks “what did you mention?” Blind Reconstruction asks a harder communication question: “Could another person actually rebuild the scene from what you said?” Spatial links and evidence discipline therefore matter, not just vocabulary recall.</p></div></div></section>`;
}

function startReconstruction(repair=false){
  stopReconstructionRecognition();
  if(!repair){state.reconstructionTranscript='';state.reconstructionClarifications=0;}
  state.reconstructionDraft='';state.reconstructionQuestion='';state.reconstructionStage='build';state.reconstructionRepair=repair;state.reconstructionStartedAt=Date.now();state.mode='reconstruct';
  document.body.classList.toggle('reconstruct-hide-photo',!!state.reconstructionHidePhoto);haptic([15,20,25]);render();
}
function resetReconstruction(){stopReconstructionRecognition();state.reconstructionStage='idle';state.reconstructionTranscript='';state.reconstructionDraft='';state.reconstructionQuestion='';state.reconstructionClarifications=0;state.reconstructionRepair=false;state.reconstructionHidePhoto=false;document.body.classList.remove('reconstruct-hide-photo');render();}
function finishReconstruction(){
  stopReconstructionRecognition();if(wordCount(reconstructionText())<3){toast('Add a short description first so the listener has something to reconstruct.');return;}
  const a=reconstructionAnalysis();state.reconstructionStage='compare';state.reconstructionRepair=false;progress.reconstruction=progress.reconstruction||{best:0,last:0,runs:0,clarifications:0,bestCoverage:0};
  progress.reconstruction.last=a.score;progress.reconstruction.best=Math.max(progress.reconstruction.best||0,a.score);progress.reconstruction.bestCoverage=Math.max(progress.reconstruction.bestCoverage||0,a.coverage.pct);progress.reconstruction.runs=(progress.reconstruction.runs||0)+1;progress.reconstruction.clarifications=(progress.reconstruction.clarifications||0)+(state.reconstructionClarifications||0);progress.completed.l1_reconstruct=true;awardPoints(22,'reconstruction');saveProgress();haptic([20,35,45]);render();
}
function sendReconstructionText(){
  const draft=String(state.reconstructionDraft||'').trim();if(!draft){toast('Say or type one detail first.');return;}
  state.reconstructionTranscript=`${state.reconstructionTranscript}${state.reconstructionTranscript?' ':''}${draft}`.trim();state.reconstructionDraft='';state.reconstructionStage=state.reconstructionClarifications>0?'clarify':'build';state.reconstructionQuestion=reconstructionListenerQuestion();haptic(12);render();
}
function askReconstructionClarification(){
  if(state.reconstructionStage==='idle'){startReconstruction(false);return;}
  if(state.reconstructionStage==='compare')return;
  state.reconstructionStage='clarify';state.reconstructionClarifications=(state.reconstructionClarifications||0)+1;state.reconstructionQuestion=reconstructionListenerQuestion();state.reconstructionDraft='';haptic(10);render();setTimeout(()=>speak(state.reconstructionQuestion,.84),100);
}
function toggleReconstructionPhoto(){state.reconstructionHidePhoto=!state.reconstructionHidePhoto;document.body.classList.toggle('reconstruct-hide-photo',state.reconstructionHidePhoto);haptic(10);render();}
function toggleReconstructionRecognition(){
  if(state.reconstructionListening){stopReconstructionRecognition();render();return;}
  const C=speechRecognitionCtor();if(!C){toast('Live speech-to-text is not supported here. Type your description instead.');return;}
  if(state.reconstructionStage==='idle')startReconstruction(false);
  try{
    const r=new C();r.lang='en-US';r.continuous=true;r.interimResults=true;state.reconstructionRecognition=r;state.reconstructionRecognitionBase=reconstructionText();state.reconstructionListening=true;
    r.onresult=e=>{let heard='';for(let i=0;i<e.results.length;i++)heard+=e.results[i][0].transcript+' ';state.reconstructionTranscript=`${state.reconstructionRecognitionBase}${state.reconstructionRecognitionBase?' ':''}${heard.trim()}`.trim();updateReconstructionLiveDom();};
    r.onerror=()=>{state.reconstructionListening=false;state.reconstructionRecognition=null;toast('The blind listener could not hear that clearly. You can continue by typing.');render();};
    r.onend=()=>{state.reconstructionListening=false;state.reconstructionRecognition=null;state.reconstructionQuestion=reconstructionListenerQuestion();render();};
    r.start();render();
  }catch(e){state.reconstructionListening=false;state.reconstructionRecognition=null;toast('Speech recognition could not start.');render();}
}
function stopReconstructionRecognition(){if(state.reconstructionRecognition){try{state.reconstructionRecognition.stop();}catch(e){}state.reconstructionRecognition=null;}state.reconstructionListening=false;}
function updateReconstructionLiveDom(){
  const a=reconstructionAnalysis();
  const score=document.getElementById('reconScore');if(score){score.textContent=`${a.score}%`;score.parentElement?.style.setProperty('--rs',a.score);}
  const map=document.getElementById('listenerReconMap');if(map)map.outerHTML=reconstructionMapMarkup(false);
  const met=document.getElementById('reconMetrics');if(met)met.outerHTML=reconstructionMetrics();
  const gaps=document.getElementById('reconGapList');if(gaps)gaps.innerHTML=reconstructionGapList(a);
  const tr=document.getElementById('reconTranscript');if(tr)tr.textContent=reconstructionText()||'Nothing yet. Start with people + setting + visible action.';
}

/* Add Blind Reconstruction as the sixth learning mode without changing Lessons 02–28. */
const _v11ModeTabsForRecon=modeTabs;
modeTabs=function(){
  const modes=[['explore','compass','Explore'],['learn','book','Learn'],['practice','target','Recall'],['speak','mic','Describe'],['talk','spark','Converse'],['reconstruct','layers','Rebuild']];
  return `<div class="mode-tabs six-modes">${modes.map(([m,ic,t])=>`<button class="${state.mode===m?'active':''}" data-eng-v52-click="setMode('${m}')">${icon(ic)}<span>${t}</span></button>`).join('')}</div>`;
};
const _v11ModeContentForRecon=modeContent;
modeContent=function(){if(state.mode==='reconstruct')return `${modeTabs()}<div class="mode-surface">${reconstructionContent()}</div>`;return _v11ModeContentForRecon();};
const _v11BottomNavForRecon=bottomNav;
bottomNav=function(){
  const items=[['explore','compass','Explore'],['learn','book','Learn'],['practice','target','Recall'],['speak','mic','Describe'],['talk','spark','Talk'],['reconstruct','layers','Rebuild']];
  return `<nav class="bottom-nav six-nav">${items.map(([m,ic,t])=>`<button class="nav-item ${state.mode===m?'active':''}" data-eng-v52-click="setMode('${m}')">${icon(ic)}<span>${t}</span></button>`).join('')}</nav>`;
};
const _v11TopbarForRecon=topbar;
topbar=function(){
  const steps=[['explore','Explore'],['learn','Evidence'],['practice','Recall'],['speak','Describe'],['talk','Converse'],['reconstruct','Rebuild']];
  return `<header class="topbar"><div class="topbar-inner"><button class="round-btn ghost" data-eng-v52-click="goHome()" aria-label="Back">${icon('back')}</button><div class="brand-lockup"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual English Studio</small></div></div><div class="journey-rail six-step">${steps.map(([k,t],i)=>{const ck=k==='learn'?'evidence':k==='speak'?'speaking':k;const done=progress.completed[`l1_${ck}`];return `<button data-eng-v52-click="setMode('${k}')" class="${state.mode===k?'active':''} ${done?'done':''}"><i>${done?icon('check'):i+1}</i><span>${t}</span></button>`}).join('')}</div><button class="round-btn ghost help-btn" data-eng-v52-click="showOnboarding(0)" aria-label="Interaction guide">?</button><div class="top-progress"><div><span>Lesson</span><b>${completion()}%</b></div><div class="progress-line"><i style="width:${completion()}%"></i></div></div></div></header>`;
};
const _v11CompletionForRecon=completion;
completion=function(){
  const d=discoveredSet().size/activeHotspotCount();
  const steps=['explore','evidence','practice','speaking','talk','reconstruct'].filter(k=>progress.completed[`l1_${k}`]).length/6;
  return clamp(Math.round((d*.45+steps*.55)*100),0,100);
};
const _v11SetModeForRecon=setMode;
setMode=function(mode){
  if(mode!=='reconstruct'){stopReconstructionRecognition();state.reconstructionHidePhoto=false;document.body.classList.remove('reconstruct-hide-photo');}
  _v11SetModeForRecon(mode);
};
const _v11GoHomeForRecon=goHome;
goHome=function(){stopReconstructionRecognition();state.reconstructionHidePhoto=false;document.body.classList.remove('reconstruct-hide-photo');_v11GoHomeForRecon();};
const _v11OpenLessonForRecon=openLesson;
openLesson=function(id){_v11OpenLessonForRecon(id);if(id===1){state.reconstructionStage='idle';state.reconstructionTranscript='';state.reconstructionDraft='';state.reconstructionQuestion='';state.reconstructionClarifications=0;state.reconstructionHidePhoto=false;state.reconstructionRepair=false;document.body.classList.remove('reconstruct-hide-photo');}};

const _v11RenderHomeForRecon=renderHome;
renderHome=function(){
  _v11RenderHomeForRecon();
  const pill=document.querySelector('.prototype-pill');if(pill)pill.textContent='LESSON 01 • BLIND RECONSTRUCTION v0.12';
  const grid=document.querySelector('.journey-grid');if(grid&&!grid.querySelector('.journey-reconstruct'))grid.insertAdjacentHTML('beforeend',`<article class="journey-item journey-reconstruct ${progress.completed.l1_reconstruct?'done':''}"><div class="journey-num">${progress.completed.l1_reconstruct?icon('check'):'06'}</div><div><b>Blind reconstruction</b><p>Describe so clearly that a listener who cannot see the photo can rebuild the scene.</p></div></article>`);
  const tap=document.querySelector('.tap-talk-home');if(tap&&!document.querySelector('.recon-home-card'))tap.insertAdjacentHTML('afterend',`<section class="recon-home-card"><div class="recon-home-copy"><span class="section-kicker">NEW • MEANING-TRANSFER CHALLENGE</span><h3>Can another mind rebuild the image from your English?</h3><p>Blind Reconstruction creates a live scene map from the learner's description, asks clarification questions about missing information, then compares the listener map with the reference structure.</p><div><span>${icon('layers')} reconstructability</span><span>${icon('spark')} listener clarification</span><span>${icon('eye')} evidence-safe transfer</span></div></div><div class="recon-home-score"><span>BEST</span><b>${progress.reconstruction?.best||0}%</b><small>reconstructability</small><button data-eng-v52-click="openLesson(1);setMode('reconstruct');setTimeout(()=>startReconstruction(false),80)">Start Blind Reconstruction ${icon('chevron')}</button></div></section>`);
};

/* ========================================================================
   v0.13 — STEP 5: SCENE TIME MACHINE
   Evidence-linked Before → Now → Next speaking lab for Lesson 01 only.
   The NOW frame stays locked to visible evidence. BEFORE and NEXT remain
   explicitly hypothetical and must be expressed with cautious language.
   ======================================================================== */

const TIME_MACHINE_NOW = {
  label:'NOW • VERIFIED FRAME',
  text:'They are walking barefoot through shallow water, holding hands and leaning close together.',
  support:['walking','barefoot','holding-hands','leaning','shallow-water'],
  grammar:'Present continuous + visible evidence'
};
const TIME_MACHINE_BEFORE = [
  {id:'walked-farther',title:'Farther along the beach',text:'They may have been walking farther up the beach before this moment.',support:['walking','beach'],safe:true,note:'Linked to the visible walking action and shoreline.'},
  {id:'watched-sun',title:'Watching the light change',text:'They might have been watching the sun lower toward the horizon.',support:['sunset','horizon','warm-light'],safe:true,note:'Linked to the low sun and warm golden-hour light.'},
  {id:'quiet-coast',title:'A quiet coastal walk',text:'Perhaps they had already spent some time walking near the coast.',support:['walking','beach','ocean'],safe:true,note:'Plausible, but still outside the frozen frame.'},
  {id:'restaurant',title:'Dinner at a restaurant',text:'They had dinner at a restaurant before coming here.',support:[],safe:false,note:'No restaurant, meal, or earlier event is established by the image.'}
];
const TIME_MACHINE_NEXT = [
  {id:'continue',title:'Continue along the shoreline',text:'They may continue walking along the shoreline.',support:['walking','beach'],safe:true,note:'A natural continuation of the visible action.'},
  {id:'watch-sunset',title:'Stop to watch the sunset',text:'They might stop for a moment to watch the sunset.',support:['sunset','ocean','reflection'],safe:true,note:'Linked to the low sun and open-water view.'},
  {id:'leave',title:'Leave as daylight fades',text:'They could leave the beach as the daylight fades.',support:['sunset','warm-light'],safe:true,note:'Plausible as the light gets lower; not visually proven.'},
  {id:'wedding',title:'Get married next',text:'They will get married after this walk.',support:[],safe:false,note:'The image does not establish marriage, engagement, or future plans.'}
];
const TIMELINE_CAUTIOUS = /\b(may|might|could|perhaps|possibly|probably|likely|seems|appears|suggests|may have|might have|could have)\b/i;
const TIMELINE_BEFORE_MARKERS = /\b(before|earlier|previously|had|was|were|have been|had been|may have|might have|could have)\b/i;
const TIMELINE_NEXT_MARKERS = /\b(next|later|after|afterward|afterwards|may|might|could|continue|stop|leave)\b/i;

progress.timeline = {...{best:0,last:0,runs:0,repairs:0,branchRuns:0,history:[]},...(progress.timeline||{})};
Object.assign(state,{
  timelinePhase:state.timelinePhase||'before', timelineBefore:state.timelineBefore||'', timelineNext:state.timelineNext||'',
  timelineRelay:state.timelineRelay||'', timelineBeforeChoice:state.timelineBeforeChoice||null, timelineNextChoice:state.timelineNextChoice||null,
  timelinePlaying:state.timelinePlaying||null, timelineVoicePhase:state.timelineVoicePhase||null, timelineShowGrammar:state.timelineShowGrammar??true,
  timelineCompare:state.timelineCompare||false, timelineRepairOnly:state.timelineRepairOnly||false, timelineCustomSupport:state.timelineCustomSupport||[], timelineHighlight:state.timelineHighlight||null
});
let timelineRecognition = null;

function timelineBranch(list,id){return list.find(x=>x.id===id)||null;}
function timelineSupportLabels(keys=[]){return keys.map(k=>(activeCoverageAnchors().find(a=>a.key===k)||{}).label||k);}
function timelineHasHardUnsupported(text=''){
  return [...EVIDENCE_HARD_UNSUPPORTED,...EVIDENCE_CONTRADICTIONS].filter(r=>r.re.test(text));
}
function timelineEval(text,phase){
  const t=(text||'').trim();
  if(!t)return {score:0,safe:false,empty:true,label:'Add your idea',repair:'Add one short possibility linked to visible evidence.',issues:[]};
  const hard=timelineHasHardUnsupported(t), cautious=TIMELINE_CAUTIOUS.test(t), temporal=phase==='before'?TIMELINE_BEFORE_MARKERS.test(t):TIMELINE_NEXT_MARKERS.test(t);
  const hits=activeCoverageAnchors().filter(a=>a.terms.some(term=>normalizeSpeech(t).includes(normalizeSpeech(term))));
  let score=32;
  if(cautious)score+=28;
  if(temporal)score+=18;
  score+=Math.min(18,hits.length*5);
  score-=hard.length*30;
  if(!cautious)score-=18;
  score=clamp(Math.round(score),0,100);
  const issues=[];
  if(!cautious)issues.push('Mark the imagined event with may, might, could, perhaps, or another uncertainty signal.');
  if(!temporal)issues.push(phase==='before'?'Make the earlier-time relationship clear.':'Make the possible next step clear.');
  if(!hits.length)issues.push('Link the idea to at least one visible clue from the current frame.');
  hard.forEach(h=>issues.push(h.reason));
  return {score,safe:!hard.length&&cautious,empty:false,label:!hard.length&&cautious?'Hypothesis controlled':hard.length?'Unsupported leap':'Too certain',repair:issues[0]||'Good: the possibility is clearly separated from the visible frame.',issues,hits};
}
function timelineContinuity(){
  const b=timelineEval(state.timelineBefore,'before'),n=timelineEval(state.timelineNext,'next');
  const both=(state.timelineBefore+' '+state.timelineNext).toLowerCase();
  let continuity=45;
  if(/\b(they|pair|couple|man|woman)\b/.test(both))continuity+=20;
  if((b.hits||[]).length)continuity+=15;
  if((n.hits||[]).length)continuity+=15;
  if(/\b(beach|shore|shoreline|ocean|sea|sun|sunset|water)\b/.test(both))continuity+=5;
  return clamp(continuity,0,100);
}
function timelineGrammarScore(){
  const b=(state.timelineBefore||''),n=(state.timelineNext||'');
  let s=20;
  if(TIMELINE_CAUTIOUS.test(b))s+=20;
  if(/\b(may have|might have|could have|had|was|were)\b/i.test(b))s+=20;
  if(TIMELINE_CAUTIOUS.test(n))s+=20;
  if(/\b(may|might|could)\b/i.test(n))s+=20;
  return clamp(s,0,100);
}
function timelineScore(){
  const b=timelineEval(state.timelineBefore,'before'),n=timelineEval(state.timelineNext,'next');
  if(b.empty&&n.empty)return 0;
  const evidence=Math.round(((b.score||0)+(n.score||0))/2);
  const continuity=timelineContinuity(), grammar=timelineGrammarScore();
  return Math.round(evidence*.5+continuity*.25+grammar*.25);
}
function timelinePhaseRail(){
  const phases=[['before','BEFORE','Hypothesis'],['now','NOW','Visible frame'],['next','NEXT','Hypothesis'],['relay','RELAY','Connected speech']];
  return `<div class="tm-phase-rail">${phases.map(([k,l,s],i)=>`<button class="${state.timelinePhase===k?'active':''} ${k==='now'?'verified':''}" data-eng-v52-click="setTimelinePhase('${k}')"><i>${i+1}</i><span><b>${l}</b><small>${s}</small></span></button>`).join('<em>→</em>')}</div>`;
}
function setTimelinePhase(p){state.timelinePhase=p;state.timelineCompare=false;haptic(10);render();}
function highlightEvidenceSupport(key){const a=activeCoverageAnchors().find(x=>x.key===key);if(!a)return;state.timelineHighlight=key;haptic(10);render();toast(`Visible support: ${a.label}`);setTimeout(()=>{if(state.timelineHighlight===key){state.timelineHighlight=null;render();}},1400);}
function timelinePhotoSupport(keys=[],tone='teal'){
  if(!keys.length)return '';
  return `<div class="tm-support-row">${keys.map(k=>{const a=activeCoverageAnchors().find(x=>x.key===k);return a?`<button class="tm-support-chip ${tone}" data-eng-v52-click="highlightEvidenceSupport('${k}')">${icon('eye')} ${esc(a.label)}</button>`:''}).join('')}</div>`;
}
function tmBranchCards(list,phase){
  const selected=phase==='before'?state.timelineBeforeChoice:state.timelineNextChoice;
  return `<div class="tm-branches">${list.map(b=>`<button class="tm-branch ${selected===b.id?'selected':''} ${b.safe?'safe':'trap'}" data-eng-v52-click="chooseTimelineBranch('${phase}','${b.id}')"><div class="tm-branch-top"><span>${b.safe?'POSSIBLE':'GUARDRAIL TEST'}</span><i>${b.safe?icon('spark'):icon('eye')}</i></div><b>${esc(b.title)}</b><p>${esc(b.text)}</p><small>${esc(b.note)}</small>${b.support.length?`<div>${timelineSupportLabels(b.support).slice(0,3).map(x=>`<em>${esc(x)}</em>`).join('')}</div>`:''}</button>`).join('')}</div>`;
}
function chooseTimelineBranch(phase,id){
  const list=phase==='before'?TIME_MACHINE_BEFORE:TIME_MACHINE_NEXT,b=timelineBranch(list,id);if(!b)return;
  if(phase==='before'){state.timelineBeforeChoice=id;state.timelineBefore=b.text;}else{state.timelineNextChoice=id;state.timelineNext=b.text;}
  progress.timeline.branchRuns=(progress.timeline.branchRuns||0)+1;saveProgress();haptic(b.safe?[12,18,20]:[30,20,30]);
  if(!b.safe)toast('Guardrail test selected — inspect why this leap is not supported.');
  render();
}
function tmEvaluationCard(phase){
  const text=phase==='before'?state.timelineBefore:state.timelineNext,e=timelineEval(text,phase);
  const phaseLabel=phase==='before'?'Before':'Next';
  return `<div class="tm-eval ${e.safe?'safe':e.empty?'empty':'warn'}"><div class="tm-eval-head"><span>${phaseLabel.toUpperCase()} CONTROL</span><b>${e.empty?'—':e.score+'%'}</b></div><h4>${e.label}</h4><p>${esc(e.repair)}</p>${e.issues.length>1?`<details><summary>Why?</summary>${e.issues.map(x=>`<div>${icon('chevron')} ${esc(x)}</div>`).join('')}</details>`:''}<div class="tm-eval-actions"><button data-eng-v52-click="speak(${JSON.stringify(text||'Add one possible idea.')},.74)">${icon('volume')} Listen slow</button>${!e.safe&&!e.empty?`<button data-eng-v52-click="repairTimeline('${phase}')">${icon('spark')} Make safer</button>`:''}</div></div>`;
}
function repairTimeline(phase){
  let t=(phase==='before'?state.timelineBefore:state.timelineNext).trim();if(!t)return;
  // Prefer scene-grounded repair instead of pretending to generically fact-check arbitrary prose.
  const hard=timelineHasHardUnsupported(t);
  if(hard.length){
    t=phase==='before'?'They may have been walking farther along the beach before this moment.':'They might continue walking along the shoreline or stop to watch the sunset.';
  }else if(!TIMELINE_CAUTIOUS.test(t)){
    t=(phase==='before'?'Perhaps ':'Maybe ')+t.charAt(0).toLowerCase()+t.slice(1);
  }
  if(phase==='before')state.timelineBefore=t;else state.timelineNext=t;
  progress.timeline.repairs=(progress.timeline.repairs||0)+1;saveProgress();haptic([12,16,20]);render();
}
function timelineInput(phase){
  const isBefore=phase==='before',val=isBefore?state.timelineBefore:state.timelineNext;
  return `<div class="tm-input ${state.timelineVoicePhase===phase?'listening':''}"><div class="tm-input-head"><div><span>${isBefore?'EARLIER POSSIBILITY':'LATER POSSIBILITY'}</span><b>${isBefore?'What might have happened shortly before?':'What could happen shortly after?'}</b></div><button class="tm-voice ${state.timelineVoicePhase===phase?'active':''}" data-eng-v52-click="toggleTimelineVoice('${phase}')">${icon('mic')} ${state.timelineVoicePhase===phase?'Listening…':'Speak'}</button></div><textarea data-eng-v52-input="updateTimelineText('${phase}',this.value)" placeholder="${isBefore?'They may have been…':'They might…'}">${esc(val)}</textarea><div class="tm-input-foot"><span>${isBefore?'Try: may have / might have / perhaps':'Try: may / might / could'}</span><button data-eng-v52-click="speak(${JSON.stringify(val|| (isBefore?'They may have been walking farther along the beach.':'They might continue along the shoreline.'))},.82)">${icon('volume')} Hear</button></div></div>`;
}
function updateTimelineText(phase,val){if(phase==='before')state.timelineBefore=val;else state.timelineNext=val;state.timelineBeforeChoice=phase==='before'?null:state.timelineBeforeChoice;state.timelineNextChoice=phase==='next'?null:state.timelineNextChoice;render();}
function toggleTimelineVoice(phase){
  if(state.timelineVoicePhase===phase){stopTimelineRecognition();return;}
  stopTimelineRecognition();const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){toast('Live speech recognition is not available here. You can type the timeline instead.');return;}
  try{const r=new SR();timelineRecognition=r;r.lang='en-US';r.continuous=true;r.interimResults=true;const base=(phase==='before'?state.timelineBefore:state.timelineNext).trim();state.timelineVoicePhase=phase;render();r.onresult=e=>{let final='',inter='';for(let i=e.resultIndex;i<e.results.length;i++){const x=e.results[i][0].transcript;e.results[i].isFinal?final+=x:inter+=x;}const merged=[base,final||inter].filter(Boolean).join(base?' ':'');if(phase==='before')state.timelineBefore=merged;else state.timelineNext=merged;render();};r.onerror=()=>{state.timelineVoicePhase=null;render();};r.onend=()=>{state.timelineVoicePhase=null;render();};r.start();}catch(e){state.timelineVoicePhase=null;toast('Microphone could not start.');render();}
}
function stopTimelineRecognition(){try{timelineRecognition?.stop();}catch(e){}timelineRecognition=null;if(state.timelineVoicePhase){state.timelineVoicePhase=null;render();}}
function timelineHypothesisCanvas(phase){
  const isBefore=phase==='before',choice=timelineBranch(isBefore?TIME_MACHINE_BEFORE:TIME_MACHINE_NEXT,isBefore?state.timelineBeforeChoice:state.timelineNextChoice),text=isBefore?state.timelineBefore:state.timelineNext,e=timelineEval(text,phase);
  const support=choice?.support||(e.hits||[]).slice(0,4).map(x=>x.key);
  return `<article class="tm-frame hypothesis ${isBefore?'before':'next'}"><div class="tm-frame-label"><span>${isBefore?'← POSSIBLE BEFORE':'POSSIBLE NEXT →'}</span><small>creative extension • not a visual fact</small></div><div class="tm-ghost-scene"><div class="tm-ghost-sun">☀</div><div class="tm-ghost-pair">● ●</div><div class="tm-ghost-water">≈ ≈ ≈</div><div class="tm-time-arrow">${isBefore?'↶':'↷'}</div></div><div class="tm-frame-copy"><b>${text?esc(text):isBefore?'Build an earlier possibility':'Build a later possibility'}</b><p>${choice?esc(choice.note):'Keep the imagined event connected to a visible clue and clearly uncertain.'}</p>${timelinePhotoSupport(support,isBefore?'violet':'amber')}</div></article>`;
}
function timelineNowFrame(){return `<article class="tm-frame now"><div class="tm-frame-label"><span>NOW • VERIFIED</span><small>locked to visible evidence</small></div><div class="tm-now-photo"><img src="${state.lesson.image}" alt="Lesson 01 current visible frame">${(()=>{const a=activeCoverageAnchors().find(x=>x.key===state.timelineHighlight);return a?`<div class=\"tm-highlight-anchor\" style=\"left:${a.x}%;top:${a.y}%\"><i></i><span>${esc(a.label)}</span></div>`:''})()}<div class="tm-now-badge">${icon('check')} VISIBLE FRAME</div></div><div class="tm-frame-copy"><b>${esc(TIME_MACHINE_NOW.text)}</b><p>Unlike Before and Next, this middle frame is not a story hypothesis.</p>${timelinePhotoSupport(TIME_MACHINE_NOW.support,'teal')}</div></article>`;}
function timelineTriptych(){return `<div class="tm-triptych">${timelineHypothesisCanvas('before')}<div class="tm-connector"><span>evidence-linked</span>→</div>${timelineNowFrame()}<div class="tm-connector"><span>cautious branch</span>→</div>${timelineHypothesisCanvas('next')}</div>`;}
function timelineGrammarLab(){
  if(!state.timelineShowGrammar)return '';
  return `<section class="tm-grammar"><div class="tm-subhead"><div><span>VISUAL TENSE BRIDGE</span><h3>One image → three time frames</h3></div><button data-eng-v52-click="playTimelineGrammar()">${icon('volume')} Hear the contrast</button></div><div class="tm-grammar-grid"><article><span>BEFORE</span><b>may have been + -ing</b><p>They <mark>may have been walking</mark> farther up the beach.</p><small>Imagined earlier action • modal perfect continuous</small></article><article class="verified"><span>NOW</span><b>am / is / are + -ing</b><p>They <mark>are walking</mark> through shallow water.</p><small>Visible action • present continuous</small></article><article><span>NEXT</span><b>may / might / could + base verb</b><p>They <mark>might stop</mark> to watch the sunset.</p><small>Possible next action • modal possibility</small></article></div></section>`;
}
function playTimelineGrammar(){playTimelineSequence(['They may have been walking farther up the beach.','They are walking through shallow water now.','They might stop to watch the sunset.']);}
function playTimelineSequence(lines){
  window.EngBookSpeech.stopSpeaking();let i=0;
  const run=()=>{if(i>=lines.length){state.timelinePlaying=null;render();return;}
    const index=i++;state.timelinePlaying=['before','now','next'][index]||'relay';render();
    window.EngBookSpeech.speak(lines[index],{rate:.78,voiceRole:index%2?'female':'male',onEnd:run,
      onError:()=>{state.timelinePlaying=null;render();toast('Speech playback is unavailable.');}});
  };run();
}
function buildTimelineRelay(){
  const b=state.timelineBefore.trim()||'They may have been walking farther up the beach before this moment.';
  const n=state.timelineNext.trim()||'They might continue along the shoreline as daylight fades.';
  state.timelineRelay=`${b} Now, ${TIME_MACHINE_NOW.text.charAt(0).toLowerCase()+TIME_MACHINE_NOW.text.slice(1)} Next, ${n.charAt(0).toLowerCase()+n.slice(1)}`;
  state.timelinePhase='relay';haptic([12,15,22]);render();
}
function timelineRelayPanel(){
  const score=timelineScore();
  return `<section class="tm-relay"><div class="tm-relay-head"><div><span>THREE-FRAME RELAY</span><h3>Turn the timeline into connected speech</h3><p>Keep Before and Next hypothetical. Keep Now factual.</p></div><div class="tm-orbit-score"><b>${score}%</b><small>Timeline Craft</small></div></div><textarea data-eng-v52-input="state.timelineRelay=this.value" placeholder="Build the relay first…">${esc(state.timelineRelay)}</textarea><div class="tm-relay-actions"><button data-eng-v52-click="buildTimelineRelay()">${icon('spark')} Build from my frames</button><button data-eng-v52-click="playTimelineSequence([state.timelineBefore||'They may have been walking farther up the beach.',TIME_MACHINE_NOW.text,state.timelineNext||'They might continue along the shoreline.'])">${icon('play')} Play Time Machine</button><button data-eng-v52-click="saveTimelineRelay()">${icon('star')} Save line</button><button class="primary" data-eng-v52-click="finishTimeline()">${icon('check')} Finish timeline</button></div><div class="tm-score-grid"><article><span>Hypothesis control</span><b>${Math.round((timelineEval(state.timelineBefore,'before').score+timelineEval(state.timelineNext,'next').score)/2)}%</b></article><article><span>Continuity</span><b>${timelineContinuity()}%</b></article><article><span>Time grammar</span><b>${timelineGrammarScore()}%</b></article></div><p class="tm-score-note">Timeline Craft is a scene-specific learning metric. It is not a CEFR, fluency, truth, or pronunciation score.</p></section>`;
}
function saveTimelineRelay(){if(!state.timelineRelay.trim())buildTimelineRelay();const line=state.timelineRelay.trim();if(!line)return;progress.savedLines=progress.savedLines||[];if(!progress.savedLines.includes(line))progress.savedLines.unshift(line);saveProgress();toast('Timeline relay saved for review.');render();}
function finishTimeline(){
  if(!state.timelineBefore.trim()||!state.timelineNext.trim()){toast('Add both a Before and a Next possibility first.');return;}
  const score=timelineScore();progress.timeline.last=score;progress.timeline.best=Math.max(progress.timeline.best||0,score);progress.timeline.runs=(progress.timeline.runs||0)+1;progress.timeline.history=[{ts:Date.now(),score,before:state.timelineBefore,next:state.timelineNext},...(progress.timeline.history||[])].slice(0,8);progress.completed.l1_timeline=true;awardPoints(12,'timeline');saveProgress();state.timelineCompare=true;state.timelinePhase='relay';haptic([20,20,40]);render();
}
function resetTimeline(){stopTimelineRecognition();state.timelinePhase='before';state.timelineBefore='';state.timelineNext='';state.timelineRelay='';state.timelineBeforeChoice=null;state.timelineNextChoice=null;state.timelineCompare=false;state.timelinePlaying=null;render();}
function timelineResultPanel(){if(!state.timelineCompare)return '';const b=timelineEval(state.timelineBefore,'before'),n=timelineEval(state.timelineNext,'next'),score=timelineScore();return `<section class="tm-result"><div class="tm-result-score"><span>TIME MACHINE COMPLETE</span><b>${score}%</b><small>best ${progress.timeline.best||score}%</small></div><div class="tm-result-copy"><h3>Your description moved beyond the still frame without pretending the story was visible.</h3><p>The strongest timeline language keeps <b>Now</b> evidence-locked while marking <b>Before</b> and <b>Next</b> as possibilities.</p><div><span class="${b.safe?'ok':'warn'}">BEFORE • ${b.label}</span><span class="ok">NOW • verified</span><span class="${n.safe?'ok':'warn'}">NEXT • ${n.label}</span></div></div><button data-eng-v52-click="resetTimeline()">${icon('refresh')} New branch</button></section>`;}
function timelinePhaseContent(){
  if(state.timelinePhase==='before')return `<section class="tm-work"><div class="tm-subhead"><div><span>STEP A • LOOK BACK</span><h3>Build one plausible earlier moment</h3><p>Choose a branch or create your own. The app rewards evidence links and uncertainty control.</p></div></div>${tmBranchCards(TIME_MACHINE_BEFORE,'before')}<div class="tm-dual">${timelineInput('before')}${tmEvaluationCard('before')}</div><div class="tm-next-action"><button data-eng-v52-click="setTimelinePhase('now')">Lock in Before ${icon('chevron')}</button></div></section>`;
  if(state.timelinePhase==='now')return `<section class="tm-work"><div class="tm-subhead"><div><span>STEP B • ANCHOR IN EVIDENCE</span><h3>Now is not invented</h3><p>The current frame acts as the anchor that every story branch must respect.</p></div></div><div class="tm-now-focus">${timelineNowFrame()}<aside><span>VISIBLE ACTIONS</span><b>walking • holding hands • leaning</b><span>VISIBLE SETTING</span><b>shallow water • beach • ocean</b><span>VISIBLE LIGHT</span><b>low sun • warm reflection</b><button data-eng-v52-click="setTimelinePhase('next')">Continue to Next ${icon('chevron')}</button></aside></div></section>`;
  if(state.timelinePhase==='next')return `<section class="tm-work"><div class="tm-subhead"><div><span>STEP C • BRANCH FORWARD</span><h3>Create a plausible next moment</h3><p>The future is open. Choose a branch that grows naturally from the visible frame.</p></div></div>${tmBranchCards(TIME_MACHINE_NEXT,'next')}<div class="tm-dual">${timelineInput('next')}${tmEvaluationCard('next')}</div><div class="tm-next-action"><button data-eng-v52-click="buildTimelineRelay()">Build Before → Now → Next ${icon('chevron')}</button></div></section>`;
  return `${timelineRelayPanel()}${timelineResultPanel()}`;
}
function timelineContent(){
  return `<section class="time-machine-lab ${state.timelinePlaying?'playing-'+state.timelinePlaying:''}"><div class="panel-heading tm-heading"><div><span class="section-kicker">STEP 5 • SIGNATURE STORYTELLING LAB</span><h2>Scene Time Machine</h2><p>Travel backward and forward from one verified photograph. The still frame is evidence; the surrounding story is possibility.</p></div><div class="tm-heading-actions"><div><span>BEST</span><b>${progress.timeline.best||0}%</b><small>Timeline Craft</small></div><button data-eng-v52-click="resetTimeline()">${icon('refresh')} Reset</button></div></div>${timelinePhaseRail()}${timelineTriptych()}${timelineGrammarLab()}${timelinePhaseContent()}<div class="tm-principle"><div>${icon('eye')}</div><div><b>Product principle</b><p><strong>NOW = visual evidence.</strong> BEFORE and NEXT are creative speaking extensions. The learner practices storytelling without collapsing possibility into fact — the same evidence discipline used throughout EngBook.</p></div></div></section>`;
}

// Add Scene Time Machine as the seventh learning mode.
const _v12ModeContentForTimeline=modeContent;
modeContent=function(){if(state.mode==='timeline')return `${modeTabs()}<div class="mode-surface">${timelineContent()}</div>`;return _v12ModeContentForTimeline();};
modeTabs=function(){
  const modes=[['explore','compass','Explore'],['learn','book','Learn'],['practice','target','Recall'],['speak','mic','Describe'],['talk','spark','Converse'],['reconstruct','layers','Rebuild'],['timeline','refresh','Time']];
  return `<div class="mode-tabs seven-modes">${modes.map(([m,ic,t])=>`<button class="${state.mode===m?'active':''}" data-eng-v52-click="setMode('${m}')">${icon(ic)}<span>${t}</span></button>`).join('')}</div>`;
};
bottomNav=function(){
  const items=[['explore','compass','Explore'],['learn','book','Learn'],['practice','target','Recall'],['speak','mic','Describe'],['talk','spark','Talk'],['reconstruct','layers','Rebuild'],['timeline','refresh','Time']];
  return `<nav class="bottom-nav seven-nav">${items.map(([m,ic,t])=>`<button class="nav-item ${state.mode===m?'active':''}" data-eng-v52-click="setMode('${m}')">${icon(ic)}<span>${t}</span></button>`).join('')}</nav>`;
};
topbar=function(){
  const steps=[['explore','Explore'],['learn','Evidence'],['practice','Recall'],['speak','Describe'],['talk','Converse'],['reconstruct','Rebuild'],['timeline','Time']];
  return `<header class="topbar"><div class="topbar-inner"><button class="round-btn ghost" data-eng-v52-click="goHome()" aria-label="Back">${icon('back')}</button><div class="brand-lockup"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual English Studio</small></div></div><div class="journey-rail seven-step">${steps.map(([k,t],i)=>{const ck=k==='learn'?'evidence':k==='speak'?'speaking':k;const done=progress.completed[`l1_${ck}`];return `<button data-eng-v52-click="setMode('${k}')" class="${state.mode===k?'active':''} ${done?'done':''}"><i>${done?icon('check'):i+1}</i><span>${t}</span></button>`}).join('')}</div><button class="round-btn ghost help-btn" data-eng-v52-click="showOnboarding(0)" aria-label="Interaction guide">?</button><div class="top-progress"><div><span>Lesson</span><b>${completion()}%</b></div><div class="progress-line"><i style="width:${completion()}%"></i></div></div></div></header>`;
};
const _v12SetModeForTimeline=setMode;
setMode=function(mode){if(mode!=='timeline')stopTimelineRecognition();_v12SetModeForTimeline(mode);if(mode==='timeline'){state.timelinePhase=state.timelinePhase||'before';document.body.classList.remove('reconstruct-hide-photo');render();}};
const _v12OpenLessonForTimeline=openLesson;
openLesson=function(id){_v12OpenLessonForTimeline(id);state.timelinePhase='before';state.timelineBefore='';state.timelineNext='';state.timelineRelay='';state.timelineBeforeChoice=null;state.timelineNextChoice=null;state.timelineCompare=false;state.timelinePlaying=null;};
const _v12CompletionForTimeline=completion;
completion=function(){
  const d=discoveredSet().size/activeHotspotCount();
  const keys=['explore','evidence','practice','speaking','talk','reconstruct','timeline'];
  const done=keys.filter(k=>progress.completed[`l1_${k}`]).length/keys.length;
  return clamp(Math.round((d*.38+done*.62)*100),0,100);
};
const _v12RecommendedForTimeline=recommendedAction;
recommendedAction=function(){const base=_v12RecommendedForTimeline();if((progress.reconstruction?.runs||0)>0 && !(progress.timeline?.runs||0))return {title:'Extend the frame through time',body:'Build one evidence-linked Before → Now → Next story without turning possibilities into facts.',mode:'timeline'};return base;};
const _v12HomeForTimeline=renderHome;
renderHome=function(){
  _v12HomeForTimeline();
  const pill=document.querySelector('.prototype-pill');if(pill)pill.textContent='LESSON 01 • SCENE TIME MACHINE v0.13';
  const grid=document.querySelector('.journey-grid');if(grid&&!grid.querySelector('.journey-timeline'))grid.insertAdjacentHTML('beforeend',`<article class="journey-item journey-timeline ${progress.completed.l1_timeline?'done':''}"><div class="journey-num">${progress.completed.l1_timeline?icon('check'):'07'}</div><div><b>Scene Time Machine</b><p>Keep Now evidence-locked, then build cautious Before and Next branches around the frame.</p></div></article>`);
  const recon=document.querySelector('.recon-home-card');if(recon&&!document.querySelector('.tm-home-card'))recon.insertAdjacentHTML('afterend',`<section class="tm-home-card"><div class="tm-home-copy"><span class="section-kicker">NEW • EVIDENCE-LINKED STORYTELLING</span><h3>A still image can become a timeline — without pretending the story is visible.</h3><p>Scene Time Machine turns Before → Now → Next into an interactive speaking lab with branch choices, tense switching, uncertainty control, and connected retelling.</p><div><span>${icon('refresh')} temporal branching</span><span>${icon('eye')} evidence anchor</span><span>${icon('spark')} storytelling control</span></div></div><div class="tm-home-score"><span>BEST</span><b>${progress.timeline?.best||0}%</b><small>Timeline Craft</small><button data-eng-v52-click="openLesson(1);setMode('timeline')">Open Time Machine ${icon('chevron')}</button></div></section>`);
};

/* ========================================================================
   v0.14 — STEP 6: VISUAL GRAMMAR
   Grammar is projected back onto the photograph instead of being taught as
   detached text. Lesson 01's official grammar focus remains relationship
   phrasal verbs; present continuous, while, and spatial language act as
   scene-building tools grounded in the verified frame.
   ======================================================================== */
const GRAMMAR_ACTIONS = [
  {id:'walking',label:'walking',anchor:'walking',subject:'They',aux:'are',verb:'walking',tail:'through shallow water',sentence:'They are walking through shallow water.',fact:true},
  {id:'holding',label:'holding hands',anchor:'holding-hands',subject:'They',aux:'are',verb:'holding',tail:'hands',sentence:'They are holding hands.',fact:true},
  {id:'leaning',label:'leaning',anchor:'leaning',subject:'The woman',aux:'is',verb:'leaning',tail:'against the man',sentence:'The woman is leaning against the man.',fact:true},
  {id:'setting',label:'sun may be setting',anchor:'sunset',subject:'The sun',aux:'may be',verb:'setting',tail:'over the water',sentence:'The sun may be setting over the water.',fact:false,note:'This is a supported time-of-day inference, not a visible fact; the same low warm light could also occur near sunrise.'},
  {id:'reflecting',label:'light reflecting',anchor:'reflection',subject:'Warm light',aux:'is',verb:'reflecting',tail:'across the water',sentence:'Warm light is reflecting across the water.',fact:true}
];
const GRAMMAR_SPATIAL = [
  {id:'left',label:'on the left',anchor:'pair',sentence:'The pair is on the left side of the scene.',x:30,y:31,kind:'position'},
  {id:'along',label:'along the beach',anchor:'beach',sentence:'Palm trees extend along the beach on the left.',x:12,y:49,kind:'path'},
  {id:'over',label:'over the water',anchor:'sunset',sentence:'The low sun is over the water.',x:66,y:42,kind:'position'},
  {id:'foreground',label:'in the foreground',anchor:'wet-sand',sentence:'Wet reflective sand is in the foreground.',x:20,y:84,kind:'depth'},
  {id:'background',label:'in the background',anchor:'ocean',sentence:'The ocean and horizon fill much of the background.',x:77,y:53,kind:'depth'}
];
const GRAMMAR_RELATIONSHIP = [
  {id:'get-along',verb:'get along with',statement:'They appear to get along well with each other.',safe:true,confidence:'MEDIUM',why:'Their joined hands, physical closeness, and relaxed expressions support a cautious positive relationship inference.'},
  {id:'spend-time',verb:'spend time with',statement:'They may enjoy spending time with each other.',safe:true,confidence:'LOW',why:'This is a plausible speaking extension, but the still image cannot establish their usual habits.'},
  {id:'grow-close',verb:'grow close to',statement:'They have grown close to each other over many years.',safe:false,confidence:'UNSUPPORTED',why:'The image cannot establish relationship history, duration, or how closeness developed.'},
  {id:'married',verb:'be married to',statement:'They are married to each other.',safe:false,confidence:'UNSUPPORTED',why:'The frame supports affection and closeness, not marriage or legal relationship status.'}
];

progress.grammar = {...{best:0,last:0,runs:0,actions:0,connections:0,spatial:0,guardrail:0,history:[]},...(progress.grammar||{})};
Object.assign(state,{
  grammarLens:state.grammarLens||'action',grammarAction:state.grammarAction||'walking',grammarSecond:state.grammarSecond||'holding',
  grammarSpatial:state.grammarSpatial||'left',grammarRelation:state.grammarRelation||null,grammarCompleted:state.grammarCompleted||{},
  grammarListening:false,grammarHeard:state.grammarHeard||'',grammarMatch:state.grammarMatch||0,grammarHighlight:state.grammarHighlight||null,
  grammarShowAnswer:state.grammarShowAnswer||false
});
let grammarRecognition=null;

function grammarAction(id=state.grammarAction){return GRAMMAR_ACTIONS.find(x=>x.id===id)||GRAMMAR_ACTIONS[0];}
function grammarSecondAction(){return GRAMMAR_ACTIONS.find(x=>x.id===state.grammarSecond)||GRAMMAR_ACTIONS[1];}
function grammarSpatialItem(){return GRAMMAR_SPATIAL.find(x=>x.id===state.grammarSpatial)||GRAMMAR_SPATIAL[0];}
function grammarRelationItem(){return GRAMMAR_RELATIONSHIP.find(x=>x.id===state.grammarRelation)||null;}
function grammarAnchor(key){return activeCoverageAnchors().find(a=>a.key===key);}
function grammarCurrentSentence(){
  if(state.grammarLens==='connect'){
    const a=grammarAction(),b=grammarSecondAction();
    if(a.id==='walking'&&b.id==='holding')return 'They are walking through shallow water while holding hands.';
    if(a.id==='walking'&&b.id==='setting')return 'They are walking through shallow water while the sun may be setting over the water.';
    if(a.id==='leaning'&&b.id==='holding')return 'The woman is leaning against the man while they are holding hands.';
    return `${a.sentence.replace(/\.$/,'')} while ${b.sentence.charAt(0).toLowerCase()+b.sentence.slice(1)}`;
  }
  if(state.grammarLens==='space')return grammarSpatialItem().sentence;
  if(state.grammarLens==='relationship')return grammarRelationItem()?.statement||'Choose a relationship phrase and pass it through the Evidence Gate.';
  return grammarAction().sentence;
}
function grammarComponentScores(){
  const done=state.grammarCompleted||{};
  const form=done.action?100:(state.grammarLens==='action'?65:45);
  const connection=done.connect?100:(done.action?58:30);
  const spatial=done.space?100:(state.grammarLens==='space'?62:30);
  const guardrail=done.relationship?100:(state.grammarRelation?(grammarRelationItem()?.safe?78:35):35);
  return {form,connection,spatial,guardrail,total:Math.round(form*.28+connection*.26+spatial*.22+guardrail*.24)};
}
function grammarLensTabs(){
  const items=[['action','01','Action','Present continuous'],['connect','02','Connect','while + simultaneity'],['space','03','Place','Spatial language'],['relationship','04','Relationship','Lesson phrasal verbs']];
  return `<div class="vg-lens-tabs">${items.map(([k,n,t,s])=>`<button class="${state.grammarLens===k?'active':''} ${state.grammarCompleted?.[k]?'done':''}" data-eng-v52-click="setGrammarLens('${k}')"><i>${state.grammarCompleted?.[k]?icon('check'):n}</i><span><b>${t}</b><small>${s}</small></span></button>`).join('')}</div>`;
}
function setGrammarLens(lens){state.grammarLens=lens;state.grammarHeard='';state.grammarMatch=0;state.grammarShowAnswer=false;stopGrammarRecognition(false);haptic(10);render();}
function setGrammarAction(id){state.grammarAction=id;state.grammarHeard='';state.grammarMatch=0;grammarPulse(grammarAction(id).anchor);haptic(10);render();}
function setGrammarSecond(id){state.grammarSecond=id;state.grammarHeard='';state.grammarMatch=0;grammarPulse(grammarSecondAction().anchor);haptic(10);render();}
function setGrammarSpatial(id){state.grammarSpatial=id;state.grammarHeard='';state.grammarMatch=0;grammarPulse(grammarSpatialItem().anchor);haptic(10);render();}
function setGrammarRelation(id){state.grammarRelation=id;state.grammarHeard='';state.grammarMatch=0;haptic(GRAMMAR_RELATIONSHIP.find(x=>x.id===id)?.safe?10:[24,18,24]);render();}
function grammarPulse(key){state.grammarHighlight=key;setTimeout(()=>{if(state.grammarHighlight===key){state.grammarHighlight=null;render();}},1300);}
function grammarMarkDone(key){if(key==='relationship'){const r=grammarRelationItem();if(!r){toast('Choose a relationship phrase first.');return;}if(!r.safe){toast('That phrasing does not pass the Evidence Gate yet. Recast it cautiously first.');haptic([24,16,24]);return;}}state.grammarCompleted={...(state.grammarCompleted||{}),[key]:true};progress.grammar[key==='action'?'actions':key==='connect'?'connections':key==='space'?'spatial':'guardrail']=(progress.grammar[key==='action'?'actions':key==='connect'?'connections':key==='space'?'spatial':'guardrail']||0)+1;saveProgress();haptic([12,16,24]);render();}

function visualGrammarOverlay(){
  if(state.grammarLens==='action'){
    const a=grammarAction(),p=grammarAnchor(a.anchor),pair=grammarAnchor(a.id==='setting'?'sunset':a.id==='reflecting'?'reflection':a.id==='leaning'?'woman':'pair');
    return `<div class="vg-overlay action"><button class="vg-token subject" style="left:${pair?.x||30}%;top:${Math.max(8,(pair?.y||30)-13)}%" data-eng-v52-click="grammarPulse('${a.anchor}')">${esc(a.subject)}</button><span class="vg-grammar-line l1"></span><button class="vg-token aux" style="left:${Math.min(78,(p?.x||35)+8)}%;top:${Math.max(20,(p?.y||45)-6)}%" data-eng-v52-click="grammarPulse('${a.anchor}')">${esc(a.aux)}</button><button class="vg-token verb" style="left:${p?.x||35}%;top:${Math.min(90,(p?.y||55)+8)}%" data-eng-v52-click="grammarPulse('${a.anchor}')">${esc(a.verb)}</button><span class="vg-caption">SUBJECT → AUXILIARY → -ING ACTION</span></div>`;
  }
  if(state.grammarLens==='connect'){
    const a=grammarAction(),b=grammarSecondAction(),pa=grammarAnchor(a.anchor),pb=grammarAnchor(b.anchor);
    return `<div class="vg-overlay connect"><button class="vg-clause first" style="left:${pa?.x||30}%;top:${pa?.y||55}%" data-eng-v52-click="grammarPulse('${a.anchor}')">${esc(a.sentence.replace(/\.$/,''))}</button><div class="vg-while-bridge"><i></i><b>WHILE</b><i></i></div><button class="vg-clause second" style="left:${pb?.x||64}%;top:${pb?.y||45}%" data-eng-v52-click="grammarPulse('${b.anchor}')">${esc(b.sentence.replace(/\.$/,''))}</button></div>`;
  }
  if(state.grammarLens==='space'){
    const s=grammarSpatialItem();
    return `<div class="vg-overlay space">${GRAMMAR_SPATIAL.map(item=>`<button class="vg-space-tag ${state.grammarSpatial===item.id?'active':''}" style="left:${item.x}%;top:${item.y}%" data-eng-v52-click="setGrammarSpatial('${item.id}')"><i></i>${esc(item.label)}</button>`).join('')}<svg class="vg-space-path" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M8,66 C18,62 30,65 42,70"/><path d="M65,42 C69,49 69,56 67,62"/></svg></div>`;
  }
  const rel=grammarRelationItem();
  return `<div class="vg-overlay relationship"><div class="vg-evidence-ring joined" style="left:31%;top:55%"><i></i><span>joined hands</span></div><div class="vg-evidence-ring close" style="left:35%;top:29%"><i></i><span>physical closeness</span></div>${rel?`<div class="vg-relation-bubble ${rel.safe?'safe':'risk'}"><span>${rel.safe?'CAUTIOUS EXTENSION':'NOT ESTABLISHED'}</span><b>${esc(rel.verb)}</b></div>`:''}</div>`;
}
function grammarPhoto(){
  const h=state.grammarHighlight?grammarAnchor(state.grammarHighlight):null;
  return `<div class="vg-photo"><img src="${state.lesson.image}" alt="Lesson 01 visual grammar scene"><div class="vg-photo-shade"></div>${visualGrammarOverlay()}${h?`<div class="vg-pulse" style="left:${h.x}%;top:${h.y}%"><i></i><span>${esc(h.label)}</span></div>`:''}<div class="vg-photo-badge">${icon('spark')} GRAMMAR LIVES ON THE SCENE</div></div>`;
}
function grammarActionLab(){
  const a=grammarAction();
  return `<section class="vg-work"><div class="vg-subhead"><div><span>SCENE TOOL • PRESENT CONTINUOUS</span><h3>Build the action where it happens</h3><p>Choose one visible action. The sentence parts stay visually attached to the subject and action area.</p></div><button data-eng-v52-click="speak('${q(a.sentence)}',.78)">${icon('volume')} Hear it</button></div><div class="vg-choice-row">${GRAMMAR_ACTIONS.map(x=>`<button class="${state.grammarAction===x.id?'active':''}" data-eng-v52-click="setGrammarAction('${x.id}')"><span>${esc(x.label)}</span><small>${x.fact?'direct visual evidence':'supported inference'}</small></button>`).join('')}</div><div class="vg-formula"><span>${esc(a.subject)}</span><i>+</i><strong>${esc(a.aux)}</strong><i>+</i><mark>${esc(a.verb)}</mark><i>+</i><span>${esc(a.tail)}</span></div><div class="vg-result-line"><span>SCENE SENTENCE</span><b>${esc(a.sentence)}</b>${a.note?`<small>${esc(a.note)}</small>`:''}</div><div class="vg-check-row"><button class="primary" data-eng-v52-click="grammarMarkDone('action')">${icon('check')} I can build this from the scene evidence</button><button data-eng-v52-click="toggleGrammarSpeech()">${icon('mic')} Say this sentence</button></div>${grammarSpeechResult()}</section>`;
}
function grammarConnectLab(){
  const a=grammarAction(),b=grammarSecondAction(),sentence=grammarCurrentSentence();
  return `<section class="vg-work"><div class="vg-subhead"><div><span>SIMULTANEOUS ACTIONS</span><h3>Connect two visible moments with <em>while</em></h3><p>Instead of memorizing a connector, choose two parts of the frame and let the image show why they belong in one sentence.</p></div><button data-eng-v52-click="speak('${q(sentence)}',.76)">${icon('volume')} Hear connection</button></div><div class="vg-two-pickers"><article><span>CLAUSE A</span>${GRAMMAR_ACTIONS.filter(x=>['walking','leaning'].includes(x.id)).map(x=>`<button class="${state.grammarAction===x.id?'active':''}" data-eng-v52-click="setGrammarAction('${x.id}')">${esc(x.sentence)}</button>`).join('')}</article><div class="vg-while-card"><small>CONNECTOR</small><b>while</b><span>same time</span></div><article><span>CLAUSE B</span>${GRAMMAR_ACTIONS.filter(x=>['holding','setting','reflecting'].includes(x.id)).map(x=>`<button class="${state.grammarSecond===x.id?'active':''}" data-eng-v52-click="setGrammarSecond('${x.id}')">${esc(x.sentence)}</button>`).join('')}</article></div><div class="vg-result-line strong"><span>CONNECTED DESCRIPTION</span><b>${esc(sentence)}</b><small>Two scene anchors → one connected thought.</small></div><div class="vg-transform"><b>Alternative compression</b><p><mark>They are walking through shallow water while holding hands.</mark> Here the repeated subject + auxiliary can be compressed because both actions belong to the same people.</p></div><div class="vg-check-row"><button class="primary" data-eng-v52-click="grammarMarkDone('connect')">${icon('check')} Connection understood</button><button data-eng-v52-click="toggleGrammarSpeech()">${icon('mic')} Say connected sentence</button></div>${grammarSpeechResult()}</section>`;
}
function grammarSpaceLab(){
  const s=grammarSpatialItem();
  return `<section class="vg-work"><div class="vg-subhead"><div><span>VISUAL SPATIAL GRAMMAR</span><h3>Make prepositions point to real places</h3><p>Tap a location label on the image or choose it below. Spatial language becomes a map, not a vocabulary list.</p></div><button data-eng-v52-click="speak('${q(s.sentence)}',.78)">${icon('volume')} Hear it</button></div><div class="vg-spatial-grid">${GRAMMAR_SPATIAL.map(x=>`<button class="${state.grammarSpatial===x.id?'active':''}" data-eng-v52-click="setGrammarSpatial('${x.id}')"><span>${esc(x.label)}</span><b>${esc(x.sentence)}</b><small>${x.kind}</small></button>`).join('')}</div><div class="vg-result-line"><span>SPATIAL SENTENCE</span><b>${esc(s.sentence)}</b><small>Point → phrase → sentence.</small></div><div class="vg-space-coach"><article><span>POSITION</span><b>on the left • over the water</b></article><article><span>PATH / EDGE</span><b>along the beach • through shallow water</b></article><article><span>DEPTH</span><b>in the foreground • in the background</b></article></div><div class="vg-check-row"><button class="primary" data-eng-v52-click="grammarMarkDone('space')">${icon('check')} Spatial map understood</button><button data-eng-v52-click="toggleGrammarSpeech()">${icon('mic')} Say this spatial line</button></div>${grammarSpeechResult()}</section>`;
}
function grammarRelationshipLab(){
  const r=grammarRelationItem();
  return `<section class="vg-work"><div class="vg-subhead"><div><span>LESSON GRAMMAR FOCUS</span><h3>Phrasal verbs for describing relationships</h3><p><b>get along with • grow close to • spend time with</b> are useful language, but they should not be used to invent relationship history.</p></div><button data-eng-v52-click="speak('get along with. grow close to. spend time with.',.72)">${icon('volume')} Hear phrases</button></div><div class="vg-focus-note"><div>${icon('eye')}</div><div><b>Evidence Gate</b><p>The photograph supports affection and closeness. It does <strong>not</strong> prove marriage, exact relationship status, duration, or how the relationship developed.</p></div></div><div class="vg-relation-grid">${GRAMMAR_RELATIONSHIP.map(x=>`<button class="${state.grammarRelation===x.id?'active':''} ${x.safe?'safe':'risk'}" data-eng-v52-click="setGrammarRelation('${x.id}')"><div><span>${x.safe?x.confidence:'GUARDRAIL'}</span><i>${x.safe?icon('spark'):icon('eye')}</i></div><b>${esc(x.verb)}</b><p>${esc(x.statement)}</p></button>`).join('')}</div>${r?`<div class="vg-evidence-gate ${r.safe?'safe':'risk'}"><div><span>${r.safe?'USE WITH CAUTION':'STOP • UNSUPPORTED'}</span><b>${esc(r.statement)}</b></div><p>${esc(r.why)}</p>${!r.safe?`<button data-eng-v52-click="repairGrammarRelationship()">${icon('spark')} Make it evidence-safe</button>`:''}</div>`:`<div class="vg-empty-gate">Choose one phrase to test it against the image.</div>`}<div class="vg-check-row"><button class="primary" ${!r?'disabled':''} data-eng-v52-click="grammarMarkDone('relationship')">${icon('check')} I understand the evidence limit</button><button ${!r?'disabled':''} data-eng-v52-click="toggleGrammarSpeech()">${icon('mic')} Say selected line</button></div>${grammarSpeechResult()}</section>`;
}
function repairGrammarRelationship(){const r=grammarRelationItem();if(!r||r.safe)return;state.grammarRelation=r.id==='grow-close'?'get-along':'spend-time';haptic([10,15,20]);toast('Recast as a cautious, image-supported inference.');render();}
function grammarSpeechResult(){
  if(!state.grammarHeard&&!state.grammarListening)return '';
  return `<div class="vg-speech-result ${state.grammarMatch>=78?'good':state.grammarHeard?'try':''}"><div><span>${state.grammarListening?'LISTENING…':'SENTENCE MATCH'}</span><b>${state.grammarListening?'Speak naturally':state.grammarMatch+'%'}</b></div>${state.grammarHeard?`<p>“${esc(state.grammarHeard)}”</p><small>${state.grammarMatch>=78?'The recognizer captured the target structure clearly.':'Try the structure again. This is recognition match, not a pronunciation score.'}</small>`:''}</div>`;
}
function toggleGrammarSpeech(){
  if(state.grammarListening){stopGrammarRecognition();return;}
  const target=grammarCurrentSentence();if(!target||target.startsWith('Choose a')){toast('Choose a grammar line first.');return;}
  const C=speechRecognitionCtor();if(!C){toast('Sentence matching needs browser speech recognition. You can still listen and shadow.');return;}
  stopRecognition();stopTimelineRecognition();stopReconstructionRecognition();
  try{const r=new C();grammarRecognition=r;r.lang='en-US';r.continuous=false;r.interimResults=false;state.grammarListening=true;state.grammarHeard='';state.grammarMatch=0;render();
    r.onresult=e=>{const heard=Array.from(e.results).map(x=>x[0].transcript).join(' ').trim();state.grammarHeard=heard;state.grammarMatch=recognitionSimilarity(target,heard);state.grammarListening=false;grammarRecognition=null;haptic(state.grammarMatch>=78?[12,16,22]:10);render();};
    r.onerror=()=>{state.grammarListening=false;grammarRecognition=null;toast('I could not capture the sentence clearly. Try again or use Listen.');render();};
    r.onend=()=>{if(state.grammarListening){state.grammarListening=false;grammarRecognition=null;render();}};r.start();
  }catch(e){state.grammarListening=false;grammarRecognition=null;toast('Speech recognition could not start.');render();}
}
function stopGrammarRecognition(doRender=true){try{grammarRecognition?.stop();}catch(e){}grammarRecognition=null;if(state.grammarListening){state.grammarListening=false;if(doRender)render();}}
function grammarMiniMission(){
  const done=state.grammarCompleted||{},steps=[['action','Build a visible action'],['connect','Connect two actions'],['space','Map a spatial phrase'],['relationship','Pass the Evidence Gate']];
  return `<section class="vg-mission"><div><span>VISUAL GRAMMAR MISSION</span><h3>Four transfers, one photograph</h3></div><div>${steps.map(([k,t],i)=>`<button class="${done[k]?'done':''}" data-eng-v52-click="setGrammarLens('${k}')"><i>${done[k]?icon('check'):i+1}</i><span>${esc(t)}</span></button>`).join('')}</div></section>`;
}
function grammarScorePanel(){
  const s=grammarComponentScores();
  return `<section class="vg-score"><div class="vg-score-main"><span>GRAMMAR TRANSFER</span><b>${s.total}%</b><small>best ${Math.max(progress.grammar.best||0,s.total)}%</small></div><div class="vg-score-bars">${[['Form',s.form],['Connection',s.connection],['Spatial',s.spatial],['Evidence control',s.guardrail]].map(([l,v])=>`<div><span>${l}<b>${v}%</b></span><i><em style="width:${v}%"></em></i></div>`).join('')}</div><button data-eng-v52-click="finishGrammarLab()">${icon('check')} Finish Visual Grammar</button></section>`;
}
function finishGrammarLab(){
  const done=state.grammarCompleted||{};if(!['action','connect','space','relationship'].every(k=>done[k])){toast('Complete all four visual grammar transfers first.');return;}
  const score=grammarComponentScores().total;progress.grammar.last=score;progress.grammar.best=Math.max(progress.grammar.best||0,score);progress.grammar.runs=(progress.grammar.runs||0)+1;progress.grammar.history=[{ts:Date.now(),score},...(progress.grammar.history||[])].slice(0,8);progress.completed.l1_grammar=true;awardPoints(14,'grammar');saveProgress();haptic([20,20,42]);toast('Visual Grammar completed — grammar stayed linked to the scene.');render();
}
function grammarContent(){
  const lab=state.grammarLens==='action'?grammarActionLab():state.grammarLens==='connect'?grammarConnectLab():state.grammarLens==='space'?grammarSpaceLab():grammarRelationshipLab();
  return `<section class="visual-grammar-lab"><div class="panel-heading vg-heading"><div><span class="section-kicker">STEP 6 • IMAGE-ANCHORED LANGUAGE</span><h2>Visual Grammar</h2><p>See the grammar where the meaning lives: subject, action, connector, position, and cautious relationship language are mapped directly onto the photograph.</p></div><div class="vg-heading-score"><span>BEST</span><b>${progress.grammar.best||0}%</b><small>Grammar Transfer</small></div></div>${grammarLensTabs()}<div class="vg-stage">${grammarPhoto()}<aside><div class="vg-live-rule"><span>LIVE STRUCTURE</span><b>${esc(grammarCurrentSentence())}</b><button data-eng-v52-click="speak('${q(grammarCurrentSentence())}',.78)">${icon('volume')} Listen</button></div><div class="vg-source-focus"><span>LESSON GRAMMAR FOCUS</span><b>PHRASAL VERBS FOR DESCRIBING RELATIONSHIPS</b><p>Use <em>get along with</em>, <em>grow close to</em>, and <em>spend time with</em> carefully. Do not use a phrasal verb to invent relationship history.</p></div></aside></div>${grammarMiniMission()}${lab}${grammarScorePanel()}<div class="vg-principle"><div>${icon('spark')}</div><div><b>Product principle</b><p>Grammar is not a detached rule sheet. The learner first sees a relationship in the frame, then builds the form that expresses it. Scene evidence still controls what the sentence is allowed to claim.</p></div></div></section>`;
}

// Add Visual Grammar as the eighth learning mode.
const _v13ModeContentForGrammar=modeContent;
modeContent=function(){if(state.mode==='grammar')return `${modeTabs()}<div class="mode-surface">${grammarContent()}</div>`;return _v13ModeContentForGrammar();};
modeTabs=function(){
  const modes=[['explore','compass','Explore'],['learn','book','Learn'],['practice','target','Recall'],['speak','mic','Describe'],['talk','spark','Converse'],['reconstruct','layers','Rebuild'],['timeline','refresh','Time'],['grammar','book','Grammar']];
  return `<div class="mode-tabs eight-modes">${modes.map(([m,ic,t])=>`<button class="${state.mode===m?'active':''}" data-eng-v52-click="setMode('${m}')">${icon(ic)}<span>${t}</span></button>`).join('')}</div>`;
};
bottomNav=function(){
  const items=[['explore','compass','Explore'],['learn','book','Learn'],['practice','target','Recall'],['speak','mic','Describe'],['talk','spark','Talk'],['reconstruct','layers','Rebuild'],['timeline','refresh','Time'],['grammar','book','Grammar']];
  return `<nav class="bottom-nav eight-nav">${items.map(([m,ic,t])=>`<button class="nav-item ${state.mode===m?'active':''}" data-eng-v52-click="setMode('${m}')">${icon(ic)}<span>${t}</span></button>`).join('')}</nav>`;
};
topbar=function(){
  const steps=[['explore','Explore'],['learn','Evidence'],['practice','Recall'],['speak','Describe'],['talk','Converse'],['reconstruct','Rebuild'],['timeline','Time'],['grammar','Grammar']];
  return `<header class="topbar"><div class="topbar-inner"><button class="round-btn ghost" data-eng-v52-click="goHome()" aria-label="Back">${icon('back')}</button><div class="brand-lockup"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual English Studio</small></div></div><div class="journey-rail eight-step">${steps.map(([k,t],i)=>{const ck=k==='learn'?'evidence':k==='speak'?'speaking':k;const done=progress.completed[`l1_${ck}`];return `<button data-eng-v52-click="setMode('${k}')" class="${state.mode===k?'active':''} ${done?'done':''}"><i>${done?icon('check'):i+1}</i><span>${t}</span></button>`}).join('')}</div><button class="round-btn ghost help-btn" data-eng-v52-click="showOnboarding(0)" aria-label="Interaction guide">?</button><div class="top-progress"><div><span>Lesson</span><b>${completion()}%</b></div><div class="progress-line"><i style="width:${completion()}%"></i></div></div></div></header>`;
};
const _v13SetModeForGrammar=setMode;
setMode=function(mode){if(mode!=='grammar')stopGrammarRecognition(false);_v13SetModeForGrammar(mode);if(mode==='grammar'){state.grammarLens=state.grammarLens||'action';document.body.classList.remove('reconstruct-hide-photo');render();}};
const _v13OpenLessonForGrammar=openLesson;
openLesson=function(id){_v13OpenLessonForGrammar(id);state.grammarLens='action';state.grammarAction='walking';state.grammarSecond='holding';state.grammarSpatial='left';state.grammarRelation=null;state.grammarCompleted={};state.grammarHeard='';state.grammarMatch=0;state.grammarHighlight=null;};
const _v13CompletionForGrammar=completion;
completion=function(){
  const d=discoveredSet().size/activeHotspotCount();
  const keys=['explore','evidence','practice','speaking','talk','reconstruct','timeline','grammar'];
  const done=keys.filter(k=>progress.completed[`l1_${k}`]).length/keys.length;
  return clamp(Math.round((d*.34+done*.66)*100),0,100);
};
const _v13RecommendedForGrammar=recommendedAction;
recommendedAction=function(){const base=_v13RecommendedForGrammar();if((progress.timeline?.runs||0)>0 && !(progress.grammar?.runs||0))return {title:'Put grammar onto the photograph',body:'Build action, while, spatial language, and relationship phrasal verbs directly from Lesson 01.',mode:'grammar'};return base;};
const _v13HomeForGrammar=renderHome;
renderHome=function(){
  _v13HomeForGrammar();
  const pill=document.querySelector('.prototype-pill');if(pill)pill.textContent='LESSON 01 • VISUAL GRAMMAR v0.14';
  const grid=document.querySelector('.journey-grid');if(grid&&!grid.querySelector('.journey-grammar'))grid.insertAdjacentHTML('beforeend',`<article class="journey-item journey-grammar ${progress.completed.l1_grammar?'done':''}"><div class="journey-num">${progress.completed.l1_grammar?icon('check'):'08'}</div><div><b>Visual Grammar</b><p>Build grammar from the exact place, action, and relationship cue that gives the sentence meaning.</p></div></article>`);
  const tm=document.querySelector('.tm-home-card');if(tm&&!document.querySelector('.vg-home-card'))tm.insertAdjacentHTML('afterend',`<section class="vg-home-card"><div class="vg-home-copy"><span class="section-kicker">NEW • GRAMMAR INSIDE THE IMAGE</span><h3>Stop leaving the photograph to learn grammar.</h3><p>Visual Grammar pins subject + auxiliary + action to the scene, turns <b>while</b> into a bridge between simultaneous visual events, maps spatial phrases onto real locations, and passes relationship phrasal verbs through an Evidence Gate.</p><div><span>${icon('spark')} visual syntax</span><span>${icon('layers')} spatial grammar</span><span>${icon('eye')} evidence gate</span></div></div><div class="vg-home-score"><span>BEST</span><b>${progress.grammar?.best||0}%</b><small>Grammar Transfer</small><button data-eng-v52-click="openLesson(1);setMode('grammar')">Open Visual Grammar ${icon('chevron')}</button></div></section>`);
};


/* ======================================================================
   v0.15 CAMERA CHALLENGE — Step 7
   Micro → Region → Full Scene. The learner describes only what the current
   crop actually reveals, then expands rather than restarting after zoom-out.
   This is scene-specific transfer practice, not a photography test.
   ====================================================================== */
const CAMERA_TRACKS = {
  human:{
    label:'Human detail', icon:'eye', accent:'teal',
    brief:'Start with contact and clothing, widen to the pair, then integrate them into the whole beach scene.',
    stages:[
      {name:'MICRO',title:'Contact & clothing',prompt:'Describe only the visible human details in this tight frame.',x:25,y:23,w:22,h:38,keys:['woman','man','white-dress','light-shirt','holding-hands','leaning'],spatial:['left','right','beside','close','against']},
      {name:'REGION',title:'The pair in context',prompt:'Add what the wider view reveals. Do not restart from zero.',x:12,y:3,w:38,h:92,keys:['woman','man','white-dress','light-shirt','rolled-trousers','barefoot','holding-hands','walking','leaning','beach','shallow-water'],spatial:['left','beside','along','near','foreground','shoreline']},
      {name:'FULL',title:'Complete scene',prompt:'Now build one connected description from people to environment and light.',x:0,y:0,w:100,h:100,keys:activeCoverageAnchors().map(a=>a.key),spatial:SPATIAL_TERMS}
    ]
  },
  shoreline:{
    label:'Shoreline detail', icon:'layers', accent:'blue',
    brief:'Begin at the feet and waterline, widen to the curved shore, then place those details inside the complete scene.',
    stages:[
      {name:'MICRO',title:'Feet, water & foam',prompt:'Stay inside the crop: describe surfaces, feet, water, and visible movement clues.',x:14,y:67,w:36,h:32,keys:['rolled-trousers','barefoot','walking','shallow-water','wet-sand','waves-foam','footprints'],spatial:['foreground','through','near','along']},
      {name:'REGION',title:'Waterline & beach',prompt:'Zoom out. Add the shoreline, nearby people, and spatial order without simply repeating.',x:0,y:38,w:58,h:62,keys:['man','woman','rolled-trousers','barefoot','holding-hands','walking','beach','shallow-water','wet-sand','waves-foam','footprints','palm-trees'],spatial:['left','foreground','along','shoreline','near','behind']},
      {name:'FULL',title:'Complete scene',prompt:'Connect foreground texture to the pair, open water, and evening light.',x:0,y:0,w:100,h:100,keys:activeCoverageAnchors().map(a=>a.key),spatial:SPATIAL_TERMS}
    ]
  },
  light:{
    label:'Light & space', icon:'spark', accent:'amber',
    brief:'Read the reflection first, widen to sun and horizon, then connect the light to the human scene.',
    stages:[
      {name:'MICRO',title:'Reflection on water',prompt:'Describe only what this light-and-water crop supports.',x:55,y:32,w:22,h:42,keys:['ocean','sunset','reflection','warm-light','waves-foam'],spatial:['over','across','background','right']},
      {name:'REGION',title:'Sun, horizon & open water',prompt:'Add the wider light structure: sun position, horizon, ocean, and reflection.',x:42,y:12,w:58,h:68,keys:['ocean','sunset','reflection','horizon','warm-light','waves-foam'],spatial:['right','background','over','across','horizon']},
      {name:'FULL',title:'Complete scene',prompt:'Now explain how the light and open water frame the people and shoreline.',x:0,y:0,w:100,h:100,keys:activeCoverageAnchors().map(a=>a.key),spatial:SPATIAL_TERMS}
    ]
  }
};
let cameraRecognition=null;
progress.camera={...{best:0,last:0,runs:0,trackBest:{human:0,shoreline:0,light:0},history:[]},...(progress.camera||{})};
Object.assign(state,{cameraTrack:'human',cameraStage:0,cameraAnswers:['','',''],cameraSubmitted:[null,null,null],cameraListening:false,cameraMemory:false,cameraReview:false,cameraFinished:false,cameraReveal:false});
saveProgress();

function cameraTrack(){return CAMERA_TRACKS[state.cameraTrack]||CAMERA_TRACKS.human;}
function cameraStage(){return cameraTrack().stages[clamp(state.cameraStage||0,0,2)];}
function cameraAnchorByKey(k){return activeCoverageAnchors().find(a=>a.key===k);}
function cameraAllowed(stage=cameraStage()){return stage.keys.map(cameraAnchorByKey).filter(Boolean);}
function cameraAnswer(i=state.cameraStage){return state.cameraAnswers?.[i]||'';}
function cameraSetAnswer(v){state.cameraAnswers[state.cameraStage]=v;state.cameraSubmitted[state.cameraStage]=null;state.cameraFinished=false;updateCameraDom();}
function cameraHits(text){return sceneCoverageAnalysis(text).hits;}
function cameraStageAnalysis(i=state.cameraStage){
  const st=cameraTrack().stages[i], text=cameraAnswer(i), allHits=cameraHits(text), allowed=new Set(st.keys), hits=allHits.filter(a=>allowed.has(a.key)), drift=allHits.filter(a=>!allowed.has(a.key));
  const targets=st.keys.map(cameraAnchorByKey).filter(Boolean), tw=targets.reduce((n,a)=>n+a.weight,0), hw=hits.reduce((n,a)=>n+a.weight,0), coverage=tw?Math.round(hw/tw*100):0;
  const discipline=clamp(100-drift.reduce((n,a)=>n+Math.max(8,a.weight*2.7),0),0,100);
  const t=normalizeCoverageText(text), spatialHits=[...new Set((st.spatial||[]).filter(x=>t.includes(normalizeCoverageText(x).trim())))];
  const spatial=wordCount(text)<3?0:Math.min(100,Math.round(spatialHits.length/Math.max(2,Math.min(4,(st.spatial||[]).length))*100));
  const prevKeys=i?new Set(cameraTrack().stages[i-1].keys):new Set(), newlyAvailable=targets.filter(a=>!prevKeys.has(a.key)), newHits=hits.filter(a=>!prevKeys.has(a.key));
  const expansion=i===0?Math.min(100,coverage+15):newlyAvailable.length?Math.round(newHits.reduce((n,a)=>n+a.weight,0)/newlyAvailable.reduce((n,a)=>n+a.weight,0)*100):100;
  const evidence=wordCount(text)>=3?evidenceAnalysis(text).control:0;
  const score=Math.round(coverage*.42+discipline*.23+spatial*.12+expansion*.13+evidence*.10);
  const missing=targets.filter(a=>!hits.some(h=>h.key===a.key)).sort((a,b)=>b.weight-a.weight);
  return {text,hits,drift,targets,coverage,discipline,spatial,spatialHits,expansion,evidence,score,missing,newlyAvailable,newHits};
}
function cameraRunScore(){
  const submitted=(state.cameraSubmitted||[]).filter(x=>x&&Number.isFinite(x.score));if(!submitted.length)return 0;
  const weights=[.25,.34,.41];let num=0,den=0;state.cameraSubmitted.forEach((x,i)=>{if(x){num+=x.score*weights[i];den+=weights[i];}});return den?Math.round(num/den):0;
}
function cameraCropStyle(st=cameraStage()){
  const ratio=(st.w*1.75)/st.h, px=st.w>=100?50:(st.x/(100-st.w))*100, py=st.h>=100?50:(st.y/(100-st.h))*100;
  return `aspect-ratio:${ratio};background-image:url('${state.lesson.image}');background-size:${10000/st.w}% ${10000/st.h}%;background-position:${px}% ${py}%`;
}
function cameraLocalAnchor(a,st=cameraStage()){return {x:(a.x-st.x)/st.w*100,y:(a.y-st.y)/st.h*100};}
function cameraSetTrack(id){if(!CAMERA_TRACKS[id])return;stopCameraRecognition(false);state.cameraTrack=id;state.cameraStage=0;state.cameraAnswers=['','',''];state.cameraSubmitted=[null,null,null];state.cameraMemory=false;state.cameraReview=false;state.cameraFinished=false;state.cameraReveal=false;haptic(10);render();}
function cameraGoStage(i){i=clamp(i,0,2);const firstIncomplete=(state.cameraSubmitted||[]).findIndex(x=>!x);const max=firstIncomplete<0?2:Math.min(2,firstIncomplete);if(i>max){toast('Complete the current frame before zooming out.');return;}state.cameraStage=i;state.cameraMemory=false;state.cameraReview=!!state.cameraSubmitted[i];state.cameraReveal=false;render();}
function cameraToggleMemory(){state.cameraMemory=!state.cameraMemory;haptic(8);render();}
function cameraToggleReview(){state.cameraReview=!state.cameraReview;render();}
function cameraSubmitStage(){
  const i=state.cameraStage,a=cameraStageAnalysis(i);if(wordCount(a.text)<4){toast('Give a short description of this frame first.');return;}
  state.cameraSubmitted[i]={...a,ts:Date.now()};state.cameraReview=true;haptic(a.score>=75?[14,15,24]:10);
  if(i<2){state.cameraReveal=true;toast(`Frame ${i+1} captured — zoom out and add what becomes visible.`);}else{toast('Full-scene frame captured. Review the camera run.');}
  render();
}
function cameraZoomOut(){if(!state.cameraSubmitted[state.cameraStage]){toast('Capture this frame before zooming out.');return;}if(state.cameraStage>=2)return;state.cameraStage++;state.cameraMemory=false;state.cameraReview=false;state.cameraReveal=true;setTimeout(()=>{state.cameraReveal=false;render();},900);haptic([8,12,18]);render();}
function cameraNewReveal(){if(state.cameraStage===0)return cameraAllowed();const prev=new Set(cameraTrack().stages[state.cameraStage-1].keys);return cameraAllowed().filter(a=>!prev.has(a.key));}
function cameraDriftRepair(a){if(!a.drift.length)return 'Good frame discipline — your description stayed inside what this crop could actually show.';return `Out-of-frame drift: ${a.drift.slice(0,4).map(x=>x.label).join(', ')}. Save those details for a later zoom level.`;}
function cameraNextCue(a){if(a.missing.length)return `Look again for: ${a.missing.slice(0,3).map(x=>x.label).join(' • ')}`;if(a.spatial<50)return 'Add one precise location phrase: left, right, foreground, background, along, beside, or over.';return 'Strong capture. Zoom out and add only the newly revealed information.';}
function cameraStartVoice(){
  if(state.cameraListening){stopCameraRecognition();return;}const C=speechRecognitionCtor();if(!C){toast('Live speech recognition is unavailable here. Type your description instead.');return;}
  stopRecognition();stopTimelineRecognition();stopGrammarRecognition(false);stopReconstructionRecognition();const base=cameraAnswer().trim();
  try{const r=new C();cameraRecognition=r;r.lang='en-US';r.continuous=true;r.interimResults=true;state.cameraListening=true;render();r.onresult=e=>{let text='';for(let i=0;i<e.results.length;i++)text+=e.results[i][0].transcript+' ';state.cameraAnswers[state.cameraStage]=[base,text.trim()].filter(Boolean).join(base?' ':'');state.cameraSubmitted[state.cameraStage]=null;updateCameraDom();};r.onerror=()=>{state.cameraListening=false;cameraRecognition=null;render();};r.onend=()=>{state.cameraListening=false;cameraRecognition=null;render();};r.start();}catch(e){state.cameraListening=false;cameraRecognition=null;toast('Microphone could not start.');render();}
}
function stopCameraRecognition(doRender=true){try{cameraRecognition?.stop();}catch(e){}cameraRecognition=null;if(state.cameraListening){state.cameraListening=false;if(doRender)render();}}
function updateCameraDom(){const ta=document.getElementById('cameraAnswer');if(ta&&document.activeElement!==ta)ta.value=cameraAnswer();const m=document.getElementById('cameraLiveMetrics');if(m)m.innerHTML=cameraMetricMini();const h=document.getElementById('cameraHitMount');if(h)h.innerHTML=cameraOverlayAnchors();}
function cameraOverlayAnchors(){
  const st=cameraStage(),a=cameraStageAnalysis(),hitKeys=new Set(a.hits.map(x=>x.key));return cameraAllowed().map(x=>{const p=cameraLocalAnchor(x,st);if(p.x<0||p.x>100||p.y<0||p.y>100)return '';const hit=hitKeys.has(x.key);return `<div class="cc-anchor ${hit?'hit':''} ${state.cameraReview&&!hit?'miss':''}" style="left:${p.x}%;top:${p.y}%"><i></i><span>${esc(x.label)}</span></div>`}).join('');
}
function cameraMetricMini(){const a=cameraStageAnalysis();return `<div><span>IN-FRAME</span><b>${a.coverage}%</b></div><div><span>DISCIPLINE</span><b>${a.discipline}%</b></div><div><span>EXPANSION</span><b>${a.expansion}%</b></div><div><span>FRAME SCORE</span><b>${a.score}%</b></div>`;}
function cameraTrackTabs(){return `<div class="cc-track-tabs">${Object.entries(CAMERA_TRACKS).map(([id,t])=>`<button class="${state.cameraTrack===id?'active':''}" data-eng-v52-click="cameraSetTrack('${id}')">${icon(t.icon)}<span><b>${esc(t.label)}</b><small>${esc(t.brief)}</small></span></button>`).join('')}</div>`;}
function cameraStageRail(){return `<div class="cc-stage-rail">${cameraTrack().stages.map((s,i)=>`<button class="${state.cameraStage===i?'active':''} ${state.cameraSubmitted[i]?'done':''}" data-eng-v52-click="cameraGoStage(${i})"><i>${state.cameraSubmitted[i]?icon('check'):i+1}</i><span>${s.name}<small>${esc(s.title)}</small></span></button>${i<2?'<em>ZOOM OUT</em>':''}`).join('')}</div>`;}
function cameraViewport(){
  const st=cameraStage(),a=cameraStageAnalysis();return `<div class="cc-camera-shell ${state.cameraReveal?'revealing':''}"><div class="cc-camera-view ${state.cameraMemory?'memory':''}" style="${cameraCropStyle(st)}"><div class="cc-grid"></div><div class="cc-corners"><i></i><i></i><i></i><i></i></div><div id="cameraHitMount" class="cc-hit-layer">${cameraOverlayAnchors()}</div><div class="cc-frame-badge"><span>${st.name}</span><b>${esc(st.title)}</b></div>${state.cameraMemory?`<div class="cc-memory-screen">${icon('eye')}<b>Memory shutter closed</b><span>Describe the last view without looking.</span></div>`:''}</div><div class="cc-camera-tools"><button data-eng-v52-click="cameraToggleMemory()">${icon('eye')} ${state.cameraMemory?'Open shutter':'Memory shutter'}</button><button data-eng-v52-click="cameraToggleReview()">${icon('target')} ${state.cameraReview?'Hide map':'Review frame'}</button><button data-eng-v52-click="speak('${q(st.prompt)}',.78)">${icon('volume')} Hear mission</button></div><div class="cc-frame-scope"><span>FRAME RULE</span><p>Describe <b>only</b> what this view can support. Details outside the crop belong to a later zoom level.</p>${a.drift.length?`<strong>Current drift: ${a.drift.slice(0,3).map(x=>esc(x.label)).join(' • ')}</strong>`:''}</div></div>`;
}
function cameraInputPanel(){
  const st=cameraStage(),a=cameraStageAnalysis(),submitted=state.cameraSubmitted[state.cameraStage];return `<section class="cc-input-card"><div class="cc-input-head"><div><span>${st.name} MISSION</span><h3>${esc(st.prompt)}</h3><p>${state.cameraStage===0?'Name precise visible details before interpretation.':'Add new information revealed by the wider view; do not simply restart your first answer.'}</p></div><button class="cc-voice ${state.cameraListening?'active':''}" data-eng-v52-click="cameraStartVoice()">${icon('mic')} ${state.cameraListening?'Listening…':'Speak'}</button></div><textarea id="cameraAnswer" data-eng-v52-input="cameraSetAnswer(this.value)" placeholder="Describe this frame…">${esc(cameraAnswer())}</textarea><div id="cameraLiveMetrics" class="cc-live-metrics">${cameraMetricMini()}</div><div class="cc-feedback ${submitted?'show':''}"><div><span>FRAME DISCIPLINE</span><p>${esc(cameraDriftRepair(a))}</p></div><div><span>NEXT PRECISION CUE</span><p>${esc(cameraNextCue(a))}</p></div></div><div class="cc-input-actions"><button data-eng-v52-click="state.cameraAnswers[state.cameraStage]='';state.cameraSubmitted[state.cameraStage]=null;render()">${icon('reset')} Clear</button><button class="primary" data-eng-v52-click="cameraSubmitStage()">${icon('target')} ${submitted?'Recapture frame':'Capture frame'}</button>${state.cameraStage<2?`<button class="zoom" ${submitted?'':'disabled'} data-eng-v52-click="cameraZoomOut()">Zoom out ${icon('expand')}</button>`:''}</div></section>`;
}
function cameraRevealPanel(){
  if(state.cameraStage===0)return `<section class="cc-reveal-card"><span>MICRO FIRST</span><h3>Precision before completeness</h3><p>A tight crop removes context on purpose. The goal is to notice small, defensible details before the full scene makes them easy to overlook.</p></section>`;
  const fresh=cameraNewReveal(),prev=state.cameraSubmitted[state.cameraStage-1];return `<section class="cc-reveal-card zoomed"><span>NEWLY REVEALED BY ZOOM-OUT</span><h3>Add — don't restart</h3><div>${fresh.slice(0,7).map(a=>`<i>${esc(a.label)}</i>`).join('')}</div><p>Your previous frame scored <b>${prev?.score??0}%</b>. The next task is to extend that message with the information that just became available.</p></section>`;
}
function cameraResult(){if(!state.cameraFinished)return '';const score=cameraRunScore(),subs=state.cameraSubmitted.map(x=>x?.score||0);return `<section class="cc-result"><div class="cc-result-score"><span>CAMERA RUN COMPLETE</span><b>${score}%</b><small>best ${progress.camera.best||score}%</small></div><div><h3>You expanded the description as the visual field expanded.</h3><p>Camera Precision rewards detail capture, frame discipline, spatial language, evidence control, and useful additions after zoom-out.</p><div class="cc-result-bars">${[['Micro',subs[0]],['Region',subs[1]],['Full',subs[2]]].map(([l,v])=>`<span>${l}<i><em style="width:${v}%"></em></i><b>${v}%</b></span>`).join('')}</div></div><button data-eng-v52-click="cameraResetRun()">${icon('refresh')} New run</button></section>`;}
function cameraFinish(){
  if(!(state.cameraSubmitted||[]).every(Boolean)){toast('Capture Micro, Region, and Full Scene first.');return;}const score=cameraRunScore();progress.camera.last=score;progress.camera.best=Math.max(progress.camera.best||0,score);progress.camera.runs=(progress.camera.runs||0)+1;progress.camera.trackBest[state.cameraTrack]=Math.max(progress.camera.trackBest[state.cameraTrack]||0,score);progress.camera.history=[{ts:Date.now(),track:state.cameraTrack,score,frames:state.cameraSubmitted.map(x=>x.score)},...(progress.camera.history||[])].slice(0,10);progress.completed.l1_camera=true;state.cameraFinished=true;awardPoints(15,'camera');saveProgress();haptic([20,20,45]);render();
}
function cameraResetRun(){stopCameraRecognition(false);state.cameraStage=0;state.cameraAnswers=['','',''];state.cameraSubmitted=[null,null,null];state.cameraMemory=false;state.cameraReview=false;state.cameraFinished=false;state.cameraReveal=false;render();}
function cameraScorePanel(){const s=cameraRunScore(),done=(state.cameraSubmitted||[]).filter(Boolean).length;return `<section class="cc-score-panel"><div><span>CAMERA PRECISION</span><b>${s}%</b><small>${done}/3 frames captured • best ${progress.camera.best||0}%</small></div><div class="cc-score-pills"><span>${icon('eye')} detail capture</span><span>${icon('target')} frame discipline</span><span>${icon('layers')} expansion</span></div><button ${done<3?'disabled':''} data-eng-v52-click="cameraFinish()">${icon('check')} Finish Camera Challenge</button></section>`;}
function cameraContent(){
  return `<section class="camera-challenge"><div class="panel-heading cc-heading"><div><span class="section-kicker">STEP 7 • PROGRESSIVE VISUAL DISCLOSURE</span><h2>Camera Challenge</h2><p>Describe a tight crop, zoom out, and add only what the wider frame makes available. The challenge trains observation discipline before full-scene fluency.</p></div><div class="cc-heading-score"><span>BEST</span><b>${progress.camera.best||0}%</b><small>Camera Precision</small></div></div>${cameraTrackTabs()}${cameraStageRail()}<div class="cc-workspace">${cameraViewport()}<aside>${cameraInputPanel()}${cameraRevealPanel()}</aside></div>${cameraScorePanel()}${cameraResult()}<section class="cc-principle"><div>${icon('expand')}</div><div><b>Product principle</b><p>Good description is not just “say more.” It is knowing <strong>what becomes sayable at each visual scale</strong>: micro-detail first, regional structure next, complete composition last.</p></div></section></section>`;
}

// Camera Challenge becomes the ninth active-learning mode.
const _v14ModeContentForCamera=modeContent;
modeContent=function(){if(state.mode==='camera')return `${modeTabs()}<div class="mode-surface">${cameraContent()}</div>`;return _v14ModeContentForCamera();};
modeTabs=function(){
  const modes=[['explore','compass','Explore'],['learn','book','Learn'],['practice','target','Recall'],['speak','mic','Describe'],['talk','spark','Converse'],['reconstruct','layers','Rebuild'],['timeline','refresh','Time'],['grammar','book','Grammar'],['camera','expand','Camera']];
  return `<div class="mode-tabs nine-modes">${modes.map(([m,ic,t])=>`<button class="${state.mode===m?'active':''}" data-eng-v52-click="setMode('${m}')">${icon(ic)}<span>${t}</span></button>`).join('')}</div>`;
};
bottomNav=function(){
  const items=[['explore','compass','Explore'],['learn','book','Learn'],['practice','target','Recall'],['speak','mic','Describe'],['talk','spark','Talk'],['reconstruct','layers','Rebuild'],['timeline','refresh','Time'],['grammar','book','Grammar'],['camera','expand','Camera']];
  return `<nav class="bottom-nav nine-nav">${items.map(([m,ic,t])=>`<button class="nav-item ${state.mode===m?'active':''}" data-eng-v52-click="setMode('${m}')">${icon(ic)}<span>${t}</span></button>`).join('')}</nav>`;
};
topbar=function(){
  const steps=[['explore','Explore'],['learn','Evidence'],['practice','Recall'],['speak','Describe'],['talk','Converse'],['reconstruct','Rebuild'],['timeline','Time'],['grammar','Grammar'],['camera','Camera']];
  return `<header class="topbar"><div class="topbar-inner"><button class="round-btn ghost" data-eng-v52-click="goHome()" aria-label="Back">${icon('back')}</button><div class="brand-lockup"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual English Studio</small></div></div><div class="journey-rail nine-step">${steps.map(([k,t],i)=>{const ck=k==='learn'?'evidence':k==='speak'?'speaking':k;const done=progress.completed[`l1_${ck}`];return `<button data-eng-v52-click="setMode('${k}')" class="${state.mode===k?'active':''} ${done?'done':''}"><i>${done?icon('check'):i+1}</i><span>${t}</span></button>`}).join('')}</div><button class="round-btn ghost help-btn" data-eng-v52-click="showOnboarding(0)" aria-label="Interaction guide">?</button><div class="top-progress"><div><span>Lesson</span><b>${completion()}%</b></div><div class="progress-line"><i style="width:${completion()}%"></i></div></div></div></header>`;
};
const _v14SetModeForCamera=setMode;
setMode=function(mode){if(mode!=='camera')stopCameraRecognition(false);_v14SetModeForCamera(mode);if(mode==='camera'){state.cameraTrack=state.cameraTrack||'human';document.body.classList.remove('reconstruct-hide-photo');render();}};
const _v14OpenLessonForCamera=openLesson;
openLesson=function(id){_v14OpenLessonForCamera(id);state.cameraTrack='human';state.cameraStage=0;state.cameraAnswers=['','',''];state.cameraSubmitted=[null,null,null];state.cameraListening=false;state.cameraMemory=false;state.cameraReview=false;state.cameraFinished=false;state.cameraReveal=false;};
completion=function(){const d=discoveredSet().size/activeHotspotCount();const keys=['explore','evidence','practice','speaking','talk','reconstruct','timeline','grammar','camera'];const done=keys.filter(k=>progress.completed[`l1_${k}`]).length/keys.length;return clamp(Math.round((d*.31+done*.69)*100),0,100);};
const _v14RecommendedForCamera=recommendedAction;
recommendedAction=function(){const base=_v14RecommendedForCamera();if((progress.grammar?.runs||0)>0 && !(progress.camera?.runs||0))return {title:'Train your eye before saying more',body:'Use Micro → Region → Full Scene and practice adding information only when the camera reveals it.',mode:'camera'};return base;};
const _v14HomeForCamera=renderHome;
renderHome=function(){
  _v14HomeForCamera();const pill=document.querySelector('.prototype-pill');if(pill)pill.textContent='LESSON 01 • CAMERA CHALLENGE v0.15';
  const grid=document.querySelector('.journey-grid');if(grid&&!grid.querySelector('.journey-camera'))grid.insertAdjacentHTML('beforeend',`<article class="journey-item journey-camera ${progress.completed.l1_camera?'done':''}"><div class="journey-num">${progress.completed.l1_camera?icon('check'):'09'}</div><div><b>Camera Challenge</b><p>Describe Micro → Region → Full Scene and add only what each zoom level truly reveals.</p></div></article>`);
  const vg=document.querySelector('.vg-home-card');if(vg&&!document.querySelector('.cc-home-card'))vg.insertAdjacentHTML('afterend',`<section class="cc-home-card"><div class="cc-home-visual"><img src="assets/images/lesson_01.jpg" alt="Lesson 01 camera challenge"><div class="cc-home-crop"></div><span>MICRO → REGION → FULL</span></div><div class="cc-home-copy"><span class="section-kicker">NEW • OBSERVATION UNDER ZOOM</span><h3>Say only what the camera has revealed.</h3><p>A tight crop forces precision. Each zoom-out reveals more of the scene, and the learner must <b>add rather than restart</b>. Out-of-frame details are flagged as Frame Drift.</p><div><span>${icon('eye')} detail capture</span><span>${icon('target')} frame discipline</span><span>${icon('expand')} progressive reveal</span></div></div><div class="cc-home-score"><span>BEST</span><b>${progress.camera?.best||0}%</b><small>Camera Precision</small><button data-eng-v52-click="openLesson(1);setMode('camera')">Open Camera Challenge ${icon('chevron')}</button></div></section>`);
};


/* ========================================================================
   v0.16 — Step 8: SAME SCENE / DIFFERENT LEVEL
   The photograph stays fixed while the speaking mission, support density,
   time target, language functions, and success criteria change by band.
   This is a practice ladder, not a CEFR certification engine.
   ======================================================================== */
const LEVEL_LADDER = {
  a1:{
    id:'a1', label:'A1–A2', short:'FOUNDATION', time:30, accent:'mint',
    headline:'Build a clear, concrete scene.',
    mission:'Give 4–5 simple sentences: setting + three visible facts + one visible action. Use the lesson relationship grammar cautiously at least once.',
    success:'Short, accurate, concrete; no unsupported story details.',
    support:'full',
    core:['man','woman','beach','walking','holding-hands','barefoot','sunset'],
    wordbank:['a man','a woman','beach','sunset','barefoot','holding hands','walking','white dress','light shirt','calm sea'],
    frames:['This picture shows…','A man and a woman are…','They are…','The woman is wearing…','The man is wearing…','They seem to get along…'],
    model:`A man and a woman are walking on the beach in warm low-angle light. They are barefoot and holding hands. The woman is wearing a white dress, and the man is wearing a light shirt and rolled-up pants. The sea appears calm, and the sky has warm orange-pink color. They are physically close, and both faces appear relaxed.`
  },
  b1:{
    id:'b1', label:'B1–B2', short:'CONNECTED', time:60, accent:'blue',
    headline:'Connect detail, space, and cautious interpretation.',
    mission:'Rebuild the scene in a clear order. Use “walk hand in hand” and “stroll along the shoreline”, add spatial language, and include one cautious inference with seems, may, might, or could.',
    success:'Connected description with location language and clear fact/inference control.',
    support:'light',
    core:['man','woman','holding-hands','walking','white-dress','rolled-trousers','beach','shallow-water','palm-trees','ocean','sunset','reflection','warm-light'],
    wordbank:['walk hand in hand','stroll along the shoreline','shallow water','rolled gray trousers','flowing white dress','warm golden light','in the background','along the edge of the sea','relaxed body language'],
    frames:['In the foreground,…','Along the shoreline,…','While they are walking,…','The warm light…','The scene may suggest…'],
    model:`Two young adults are strolling barefoot along the edge of the sea while the sun sets behind them. The man wears a light button-up shirt and rolled gray trousers, while the woman wears a flowing white dress. She rests her head against his shoulder and they hold hands as they walk through the shallow water. Their relaxed body language and the warm golden light create an intimate, peaceful atmosphere.`
  },
  c1:{
    id:'c1', label:'C1–C2', short:'NUANCED', time:90, accent:'violet',
    headline:'Shape the scene with precision, composition, and evidence control.',
    mission:'Speak without reading: overview → key subject details → environment/weather/light → action → atmosphere → one Before/Now/Next link. Finish by separating one visible fact from one inference.',
    success:'Sustained independent description with composition, precise vocabulary, cautious inference, and original wording.',
    support:'minimal',
    core:activeCoverageAnchors().map(a=>a.key),
    wordbank:['visibly affectionate pair','palm-lined shoreline','joined hands','unhurried pace','low-angle golden light','low-sun reflection','left third of the frame','open water','evidence suggests','may / might / could'],
    frames:['The image places…','Compositionally,…','The strongest visible cue is…','These details support… although…','Before this moment, they may have…','The image itself does not establish…'],
    model:`The image places two adults against the openness of a quiet palm-lined shoreline in warm low-angle light. Their bare feet, joined hands, side-by-side movement, and close body position are directly visible, while the woman’s head rests against the man’s shoulder. Those cues may suggest affection or comfort, but the image does not establish their exact relationship. Warm coral and gold light spreads across the sea and wet sand. The strongest description remains evidence-based: two adults sharing visible physical closeness within a calm coastal scene.`
  }
};
let levelTimerId=null, levelRecognition=null;
progress.levelLadder={...{best:{a1:0,b1:0,c1:0},attempts:{a1:0,b1:0,c1:0},history:[],lastBand:null},...(progress.levelLadder||{})};
progress.levelLadder.best={a1:0,b1:0,c1:0,...(progress.levelLadder.best||{})};
progress.levelLadder.attempts={a1:0,b1:0,c1:0,...(progress.levelLadder.attempts||{})};
Object.assign(state,{levelBand:'a1',levelAnswer:'',levelSubmitted:null,levelModelOpen:false,levelSupport:true,levelSeconds:30,levelRunning:false,levelListening:false,levelCarryFrom:null,levelCompareOpen:false});
saveProgress();

function levelCfg(){return LEVEL_LADDER[state.levelBand]||LEVEL_LADDER.a1;}
function levelSentenceCount(text){return String(text||'').split(/[.!?]+/).map(x=>x.trim()).filter(Boolean).length;}
function levelPhraseHits(text,arr){const t=normalizeCoverageText(text);return arr.filter(p=>t.includes(normalizeCoverageText(p).trim()));}
function levelCautiousCount(text){const t=normalizeCoverageText(text);return [' may ',' might ',' could ',' seems ',' seem ',' appears ',' appear ',' likely ',' probably ',' suggests ',' suggest ',' supports ',' support '].filter(x=>t.includes(x)).length;}
function levelConnectorCount(text){const t=normalizeCoverageText(text);return [' while ',' whereas ',' although ',' however ',' because ',' as ',' rather than ',' which ',' but ',' and '].filter(x=>t.includes(x)).length;}
function levelCompositionHits(text){return levelPhraseHits(text,['left third','right side','foreground','middle ground','background','composition','frame','open water','horizon','reflection','balance','shoreline','spatial','openness']);}
function levelTimelineHits(text){return levelPhraseHits(text,['before','now','next','may have','might have','could have','later','after this','before this moment']);}
function levelPreciseHits(text){return levelPhraseHits(text,['palm-lined','shallow water','wet sand','rolled trousers','rolled-up pants','button-up shirt','flowing white dress','joined hands','bare feet','golden light','coral','reflection','shoreline','gentle waves','unhurried','affectionate body language']);}
function levelSafeRelationship(text){
  const t=normalizeCoverageText(text), has=t.includes('get along with')||t.includes('get along well')||t.includes('spend time with');
  const cautious=levelCautiousCount(text)>0;
  const history=t.includes('grow close to')||t.includes('grown close')||t.includes('grew close');
  return {has, cautious, history, score: history?20:(has&&cautious?100:has?55:0)};
}
function levelAnalysis(text=state.levelAnswer,band=state.levelBand){
  const cfg=LEVEL_LADDER[band], wc=wordCount(text), sc=levelSentenceCount(text), cov=sceneCoverageAnalysis(text), ev=wordCount(text)>=3?evidenceAnalysis(text).control:0;
  const hitKeys=new Set(cov.hits.map(x=>x.key)), required=cfg.core.map(k=>activeCoverageAnchors().find(a=>a.key===k)).filter(Boolean), reqHit=required.filter(a=>hitKeys.has(a.key));
  const reqWeight=required.reduce((n,a)=>n+a.weight,0)||1, hitWeight=reqHit.reduce((n,a)=>n+a.weight,0), coverage=Math.round(hitWeight/reqWeight*100);
  const spatial=levelPhraseHits(text,SPATIAL_TERMS), cautious=levelCautiousCount(text), connectors=levelConnectorCount(text), comp=levelCompositionHits(text), timeline=levelTimelineHits(text), precise=levelPreciseHits(text), rel=levelSafeRelationship(text);
  let total=0, metrics=[], tips=[];
  if(band==='a1'){
    const simpleLen=wc<18?Math.round(wc/18*70):wc<=80?100:Math.max(45,100-(wc-80)*2);
    const sentenceFit=sc>=4&&sc<=7?100:sc>=2&&sc<=9?65:35;
    const simplicity=Math.round(simpleLen*.55+sentenceFit*.45);
    const task=coverage;
    const grammar=rel.score;
    total=Math.round(task*.45+simplicity*.25+grammar*.15+ev*.15);
    metrics=[['Task coverage',task],['Simple clarity',simplicity],['Target grammar',grammar],['Evidence control',ev]];
    if(coverage<70)tips.push('Add the setting, both people, and one clear visible action.');
    if(sc<4)tips.push('Aim for 4–5 short sentences instead of one long sentence.');
    if(rel.score<75)tips.push('Try a cautious relationship phrase: “They seem to get along well with each other.”');
  }else if(band==='b1'){
    const phrases=levelPhraseHits(text,['walk hand in hand','hand in hand','stroll along the shoreline','stroll along','along the shoreline']);
    const phraseScore=Math.min(100,(phrases.some(x=>x.includes('hand'))?50:0)+(phrases.some(x=>x.includes('stroll')||x.includes('shoreline'))?50:0));
    const spatialScore=Math.min(100,spatial.length*28);
    const inference=Math.min(100,cautious*55);
    const connected=Math.min(100,Math.max(30,connectors*24)+(wc>=50?25:0));
    total=Math.round(coverage*.25+phraseScore*.20+spatialScore*.18+inference*.15+connected*.12+ev*.10);
    metrics=[['Scene detail',coverage],['Lesson phrases',phraseScore],['Spatial language',spatialScore],['Cautious inference',inference],['Connection',connected],['Evidence control',ev]];
    if(phraseScore<100)tips.push('Use both lesson phrases: “walk hand in hand” and “stroll along the shoreline.”');
    if(spatialScore<60)tips.push('Organize the image with foreground/background or along/beside/over.');
    if(inference<50)tips.push('Add one clearly cautious inference with seems, may, might, or could.');
  }else{
    const compScore=Math.min(100,comp.length*20);
    const cohesion=Math.min(100,connectors*18+(wc>=85?28:wc>=60?16:0));
    const precision=Math.min(100,precise.length*16);
    const inferTime=Math.min(100,cautious*25+timeline.length*18);
    total=Math.round(coverage*.20+compScore*.20+cohesion*.15+precision*.15+inferTime*.20+ev*.10);
    metrics=[['Scene coverage',coverage],['Composition',compScore],['Cohesion',cohesion],['Precision',precision],['Inference + timeline',inferTime],['Evidence control',ev]];
    if(compScore<60)tips.push('Comment on composition: left third, open water, foreground/background, or visual balance.');
    if(precision<60)tips.push('Replace generic words with scene-specific detail such as joined hands, wet sand, low-angle light, or low-sun reflection.');
    if(inferTime<60)tips.push('Add one cautious Before/Now/Next link and explicitly separate fact from inference.');
  }
  return {band,wc,sc,cov,ev,coverage,spatial,cautious,connectors,comp,timeline,precise,rel,total:clamp(total,0,100),metrics,tips:reqTips(tips),hits:reqHit,missing:required.filter(a=>!hitKeys.has(a.key))};
}
function reqTips(tips){return tips.length?tips.slice(0,3):['Mission fit is strong. Keep the wording your own rather than memorizing the model.'];}
function levelSetBand(band,carry=false){
  if(!LEVEL_LADDER[band])return;stopLevelTimer(false);stopLevelRecognition(false);const prev=state.levelBand, old=state.levelAnswer;
  state.levelBand=band;state.levelAnswer=carry?old:'';state.levelSubmitted=null;state.levelModelOpen=false;state.levelCompareOpen=false;state.levelCarryFrom=carry?prev:null;state.levelSupport=band!=='c1';state.levelSeconds=LEVEL_LADDER[band].time;render();haptic(10);
}
function levelToggleSupport(){state.levelSupport=!state.levelSupport;render();}
function levelSetAnswer(v){state.levelAnswer=v;state.levelSubmitted=null;state.levelModelOpen=false;updateLevelLive();}
function levelUpdateTimerDom(){const el=document.getElementById('levelTimerValue'),bar=document.getElementById('levelTimerBar');if(el)el.textContent=state.levelSeconds;if(bar)bar.style.setProperty('--p',`${Math.max(0,state.levelSeconds/levelCfg().time*100)}%`);}
function levelToggleTimer(){
  if(state.levelRunning){stopLevelTimer();return;}if(state.levelSeconds<=0)state.levelSeconds=levelCfg().time;state.levelRunning=true;render();levelTimerId=setInterval(()=>{state.levelSeconds--;levelUpdateTimerDom();if(state.levelSeconds<=0){stopLevelTimer();haptic([20,20,35]);toast('Time is up — submit the attempt when you are ready.');}},1000);
}
function stopLevelTimer(doRender=true){if(levelTimerId)clearInterval(levelTimerId);levelTimerId=null;if(state.levelRunning){state.levelRunning=false;if(doRender)render();}}
function levelStartVoice(){
  if(state.levelListening){stopLevelRecognition();return;}const C=speechRecognitionCtor();if(!C){toast('Live speech recognition is unavailable here. Type your attempt instead.');return;}
  stopRecognition();stopTimelineRecognition();stopGrammarRecognition(false);stopCameraRecognition(false);stopReconstructionRecognition();const base=state.levelAnswer.trim();
  try{const r=new C();levelRecognition=r;r.lang='en-US';r.continuous=true;r.interimResults=true;state.levelListening=true;render();r.onresult=e=>{let text='';for(let i=0;i<e.results.length;i++)text+=e.results[i][0].transcript+' ';state.levelAnswer=[base,text.trim()].filter(Boolean).join(base?' ':'');state.levelSubmitted=null;updateLevelLive();};r.onerror=()=>{state.levelListening=false;levelRecognition=null;render();};r.onend=()=>{state.levelListening=false;levelRecognition=null;render();};r.start();}catch(e){state.levelListening=false;levelRecognition=null;toast('Microphone could not start.');render();}
}
function stopLevelRecognition(doRender=true){try{levelRecognition?.stop();}catch(e){}levelRecognition=null;if(state.levelListening){state.levelListening=false;if(doRender)render();}}
function levelSubmit(){
  const a=levelAnalysis();if(a.wc<8){toast('Give a fuller attempt before checking the level mission.');return;}stopLevelTimer(false);stopLevelRecognition(false);state.levelSubmitted={...a,text:state.levelAnswer,ts:Date.now()};const b=state.levelBand;
  progress.levelLadder.best[b]=Math.max(progress.levelLadder.best[b]||0,a.total);progress.levelLadder.attempts[b]=(progress.levelLadder.attempts[b]||0)+1;progress.levelLadder.lastBand=b;progress.levelLadder.history=[{ts:Date.now(),band:b,score:a.total,wc:a.wc,text:state.levelAnswer},...(progress.levelLadder.history||[])].slice(0,18);
  const all=['a1','b1','c1'].every(k=>(progress.levelLadder.attempts[k]||0)>0);if(all)progress.completed.l1_level=true;awardPoints(all?18:10,'level-ladder');saveProgress();haptic(a.total>=75?[14,18,28]:12);render();
}
function levelPromote(){const order=['a1','b1','c1'],i=order.indexOf(state.levelBand);if(i<0||i===order.length-1)return;levelSetBand(order[i+1],true);toast('Core meaning carried upward — now add the next level of language.');}
function levelClear(){state.levelAnswer='';state.levelSubmitted=null;state.levelModelOpen=false;state.levelCarryFrom=null;state.levelSeconds=levelCfg().time;stopLevelTimer(false);render();}
function levelToggleModel(){if(!state.levelSubmitted){toast('Make your own attempt first. The model is for comparison, not memorization.');return;}state.levelModelOpen=!state.levelModelOpen;render();}
function levelLatest(band){return (progress.levelLadder.history||[]).find(x=>x.band===band);}
function levelBandTabs(){return `<div class="ll-band-tabs">${Object.values(LEVEL_LADDER).map(c=>`<button class="${state.levelBand===c.id?'active':''} ${progress.levelLadder.attempts[c.id]?'tried':''}" data-eng-v52-click="levelSetBand('${c.id}')"><i>${progress.levelLadder.attempts[c.id]?icon('check'):c.label.split('–')[0]}</i><span><b>${c.label}</b><small>${c.short} • ${c.time}s</small></span><em>${progress.levelLadder.best[c.id]||0}%</em></button>`).join('')}</div>`;}
function levelSupportMap(){
  if(!state.levelSupport)return '';const cfg=levelCfg(), live=levelAnalysis();const hit=new Set(live.cov.hits.map(x=>x.key));return cfg.core.map(k=>activeCoverageAnchors().find(a=>a.key===k)).filter(Boolean).map(a=>`<div class="ll-scene-anchor ${hit.has(a.key)?'hit':''}" style="left:${a.x}%;top:${a.y}%"><i></i><span>${esc(a.label)}</span></div>`).join('');
}
function levelScene(){const cfg=levelCfg();return `<section class="ll-scene-card ${cfg.accent}"><div class="ll-photo"><img src="${state.lesson.image}" alt="Lesson 01 same scene different level">${levelSupportMap()}<div class="ll-photo-label"><span>SAME SCENE</span><b>${esc(cfg.label)} mission</b></div></div><div class="ll-scene-tools"><button data-eng-v52-click="levelToggleSupport()">${icon('eye')} ${state.levelSupport?'Hide supports':'Reveal supports'}</button><button data-eng-v52-click="speak('${q(cfg.mission)}',.78)">${icon('volume')} Hear mission</button><span>Image stays fixed • cognitive demand changes</span></div></section>`;}
function levelMissionCard(){const c=levelCfg();return `<section class="ll-mission"><div class="ll-mission-top"><div><span>${c.short} SPEAKING TARGET</span><h3>${esc(c.headline)}</h3></div><div id="levelTimerBar" class="ll-timer ${state.levelRunning?'running':''}" style="--p:${Math.round(state.levelSeconds/c.time*100)}%"><b id="levelTimerValue">${state.levelSeconds}</b><small>sec</small></div></div><p>${esc(c.mission)}</p><div class="ll-success"><span>${icon('target')} SUCCESS CRITERION</span><b>${esc(c.success)}</b></div><div class="ll-mission-actions"><button data-eng-v52-click="levelToggleTimer()">${icon(state.levelRunning?'close':'play')} ${state.levelRunning?'Pause':'Start timer'}</button><button class="${state.levelListening?'active':''}" data-eng-v52-click="levelStartVoice()">${icon('mic')} ${state.levelListening?'Listening…':'Speak'}</button><button data-eng-v52-click="levelToggleSupport()">${icon('hint')} ${state.levelSupport?'Support on':'Support off'}</button></div></section>`;}
function levelScaffold(){const c=levelCfg();if(!state.levelSupport)return `<section class="ll-scaffold collapsed"><span>SUPPORT FADED</span><p>Describe independently. You can reveal support if you genuinely need it.</p><button data-eng-v52-click="levelToggleSupport()">Reveal support</button></section>`;return `<section class="ll-scaffold ${c.support}"><div><span>${c.support==='full'?'FULL SCAFFOLD':c.support==='light'?'LIGHT SCAFFOLD':'MINIMAL SCAFFOLD'}</span><h3>${c.id==='a1'?'Name it → say the action → add one relationship phrase':c.id==='b1'?'Order the frame → connect details → infer cautiously':'Compose → qualify → extend beyond the frame carefully'}</h3></div><div class="ll-bank"><b>USEFUL LANGUAGE</b>${c.wordbank.map(x=>`<button data-eng-v52-click="insertLevelPhrase('${q(x)}')">${esc(x)}</button>`).join('')}</div><div class="ll-frames"><b>STARTERS</b>${c.frames.map(x=>`<button data-eng-v52-click="insertLevelPhrase('${q(x)}')">${esc(x)}</button>`).join('')}</div></section>`;}
function insertLevelPhrase(x){const sep=state.levelAnswer.trim()?' ':'';state.levelAnswer=(state.levelAnswer+sep+x).trim();state.levelSubmitted=null;render();setTimeout(()=>document.getElementById('levelAnswer')?.focus(),20);}
function levelMetricBars(a=levelAnalysis()){return `<div class="ll-metrics">${a.metrics.map(([l,v])=>`<div><span>${esc(l)}<b>${v}%</b></span><i><em style="width:${v}%"></em></i></div>`).join('')}</div>`;}
function levelLiveMini(){const a=levelAnalysis();return `<div><span>MISSION FIT</span><b>${a.total}%</b></div><div><span>WORDS</span><b>${a.wc}</b></div><div><span>SCENE</span><b>${a.coverage}%</b></div><div><span>EVIDENCE</span><b>${a.ev}%</b></div>`;}
function updateLevelLive(){const ta=document.getElementById('levelAnswer');if(ta&&document.activeElement!==ta)ta.value=state.levelAnswer;const x=document.getElementById('levelLive');if(x)x.innerHTML=levelLiveMini();const m=document.getElementById('levelMetricMount');if(m)m.innerHTML=levelMetricBars();}
function levelInput(){const a=levelAnalysis();return `<section class="ll-input"><div class="ll-input-head"><div><span>YOUR ${levelCfg().label} DESCRIPTION</span><h3>${state.levelCarryFrom?`Upgrade your ${LEVEL_LADDER[state.levelCarryFrom].label} attempt — do not restart.`:'Speak from the image before opening the model.'}</h3></div>${state.levelCarryFrom?`<i>CARRIED UP ↑</i>`:''}</div><textarea id="levelAnswer" data-eng-v52-input="levelSetAnswer(this.value)" placeholder="Describe the scene in your own words…">${esc(state.levelAnswer)}</textarea><div id="levelLive" class="ll-live">${levelLiveMini()}</div><div id="levelMetricMount">${levelMetricBars(a)}</div><div class="ll-input-actions"><button data-eng-v52-click="levelClear()">${icon('reset')} Clear</button><button data-eng-v52-click="speak('${q(state.levelAnswer||'Describe the scene in your own words.')}',.82)" ${state.levelAnswer.trim()?'':'disabled'}>${icon('volume')} Hear mine</button><button class="primary" data-eng-v52-click="levelSubmit()">${icon('check')} Check mission fit</button></div></section>`;}
function levelFeedback(){if(!state.levelSubmitted)return `<section class="ll-lock"><div>${icon('layers')}</div><div><b>Model stays locked until your first attempt.</b><p>Reference models are comparison tools, not scripts to memorize.</p></div></section>`;const a=state.levelSubmitted,c=levelCfg(),next=state.levelBand==='a1'?'b1':state.levelBand==='b1'?'c1':null;return `<section class="ll-feedback"><div class="ll-feedback-score"><span>${c.label} MISSION FIT</span><b>${a.total}%</b><small>best ${progress.levelLadder.best[state.levelBand]||a.total}% • ${a.wc} words</small></div><div class="ll-feedback-copy"><h3>${a.total>=80?'Strong fit for this mission.':a.total>=65?'The core is working — refine one or two functions.':'Keep the accurate core and add the missing mission functions.'}</h3><div class="ll-tips">${a.tips.map((x,i)=>`<p><i>${i+1}</i>${esc(x)}</p>`).join('')}</div><div class="ll-feedback-actions"><button data-eng-v52-click="levelToggleModel()">${icon('layers')} ${state.levelModelOpen?'Hide':'Compare with'} ${c.label} model</button>${next?`<button class="promote" data-eng-v52-click="levelPromote()">Carry this upward to ${LEVEL_LADDER[next].label} ${icon('chevron')}</button>`:`<button data-eng-v52-click="state.levelCompareOpen=!state.levelCompareOpen;render()">${icon('layers')} Compare my evolution</button>`}</div></div></section>`;}
function levelModel(){if(!state.levelModelOpen||!state.levelSubmitted)return '';const c=levelCfg();return `<section class="ll-model"><div><span>REFERENCE MODEL • ${c.label}</span><h3>Compare after producing your own language</h3><p>${esc(c.model)}</p></div><aside><b>COMPARE, DON'T COPY</b><p>Notice what the model adds at this band: detail density, sentence connection, composition, or cautious inference. Then close it and retell the image in your own wording.</p><button data-eng-v52-click="speak('${q(c.model)}',.76)">${icon('volume')} Listen</button></aside></section>`;}
function levelEvolution(){
  const rows=['a1','b1','c1'].map(k=>{const x=levelLatest(k),c=LEVEL_LADDER[k];return `<article class="${x?'done':''}"><div><span>${c.label}</span><b>${x?x.score+'%':'—'}</b><small>${x?x.wc+' words':'no attempt yet'}</small></div><p>${x?esc(x.text.slice(0,190))+(x.text.length>190?'…':''):`Complete the ${c.label} mission to add your own version here.`}</p></article>`}).join('');
  if(!state.levelCompareOpen&&!progress.completed.l1_level)return `<section class="ll-evolution-rail"><span>YOUR EVOLUTION</span>${['a1','b1','c1'].map(k=>`<i class="${progress.levelLadder.attempts[k]?'done':''}">${LEVEL_LADDER[k].label}</i>`).join('<em>→</em>')}</section>`;
  return `<section class="ll-evolution"><div class="ll-evolution-head"><div><span>YOUR EVOLUTION • SAME PHOTOGRAPH</span><h3>More advanced does not mean “use longer words.” It means organize more meaning with more control.</h3></div><button data-eng-v52-click="state.levelCompareOpen=!state.levelCompareOpen;render()">${state.levelCompareOpen?'Collapse':'Expand'}</button></div><div class="ll-evolution-grid">${rows}</div><p class="ll-disclaimer"><b>Important:</b> Mission Fit measures how well an attempt matches this lesson’s level-specific task. It is not an official CEFR placement, fluency, pronunciation, or proficiency score.</p></section>`;}
function levelContent(){return `<section class="level-ladder"><div class="panel-heading ll-heading"><div><span class="section-kicker">STEP 8 • SAME SCENE / DIFFERENT LEVEL</span><h2>One photograph. Three speaking demands.</h2><p>The visual evidence never changes. What changes is the learner’s job: concrete naming → connected description → nuanced evidence-based discourse.</p></div><div class="ll-heading-score"><span>LADDER</span><b>${['a1','b1','c1'].filter(k=>progress.levelLadder.attempts[k]).length}/3</b><small>bands attempted</small></div></div>${levelBandTabs()}<div class="ll-workspace">${levelScene()}<aside>${levelMissionCard()}${levelScaffold()}</aside></div>${levelInput()}${levelFeedback()}${levelModel()}${levelEvolution()}<section class="ll-principle"><div>${icon('spark')}</div><div><b>Product principle</b><p>Difficulty should come from a richer communication mission, not from swapping the photograph or revealing a longer model answer. The learner keeps the same visual ground truth and progressively learns to <strong>organize, qualify, and extend</strong> it.</p></div></section></section>`;}

// Step 8 becomes the tenth active-learning mode.
const _v15ModeContentForLevel=modeContent;
modeContent=function(){if(state.mode==='level')return `${modeTabs()}<div class="mode-surface">${levelContent()}</div>`;return _v15ModeContentForLevel();};
modeTabs=function(){
  const modes=[['explore','compass','Explore'],['learn','book','Learn'],['practice','target','Recall'],['speak','mic','Describe'],['talk','spark','Converse'],['reconstruct','layers','Rebuild'],['timeline','refresh','Time'],['grammar','book','Grammar'],['camera','expand','Camera'],['level','spark','Level']];
  return `<div class="mode-tabs ten-modes">${modes.map(([m,ic,t])=>`<button class="${state.mode===m?'active':''}" data-eng-v52-click="setMode('${m}')">${icon(ic)}<span>${t}</span></button>`).join('')}</div>`;
};
bottomNav=function(){
  const items=[['explore','compass','Explore'],['learn','book','Learn'],['practice','target','Recall'],['speak','mic','Describe'],['talk','spark','Talk'],['reconstruct','layers','Rebuild'],['timeline','refresh','Time'],['grammar','book','Grammar'],['camera','expand','Camera'],['level','spark','Level']];
  return `<nav class="bottom-nav ten-nav">${items.map(([m,ic,t])=>`<button class="nav-item ${state.mode===m?'active':''}" data-eng-v52-click="setMode('${m}')">${icon(ic)}<span>${t}</span></button>`).join('')}</nav>`;
};
topbar=function(){
  const steps=[['explore','Explore'],['learn','Evidence'],['practice','Recall'],['speak','Describe'],['talk','Converse'],['reconstruct','Rebuild'],['timeline','Time'],['grammar','Grammar'],['camera','Camera'],['level','Level']];
  return `<header class="topbar"><div class="topbar-inner"><button class="round-btn ghost" data-eng-v52-click="goHome()" aria-label="Back">${icon('back')}</button><div class="brand-lockup"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual English Studio</small></div></div><div class="journey-rail ten-step">${steps.map(([k,t],i)=>{const ck=k==='learn'?'evidence':k==='speak'?'speaking':k;const done=progress.completed[`l1_${ck}`];return `<button data-eng-v52-click="setMode('${k}')" class="${state.mode===k?'active':''} ${done?'done':''}"><i>${done?icon('check'):i+1}</i><span>${t}</span></button>`}).join('')}</div><button class="round-btn ghost help-btn" data-eng-v52-click="showOnboarding(0)" aria-label="Interaction guide">?</button><div class="top-progress"><div><span>Lesson</span><b>${completion()}%</b></div><div class="progress-line"><i style="width:${completion()}%"></i></div></div></div></header>`;
};
const _v15SetModeForLevel=setMode;
setMode=function(mode){if(mode!=='level'){stopLevelTimer(false);stopLevelRecognition(false);} _v15SetModeForLevel(mode);if(mode==='level'){document.body.classList.remove('reconstruct-hide-photo');state.levelSeconds=levelCfg().time;render();}};
const _v15OpenLessonForLevel=openLesson;
openLesson=function(id){_v15OpenLessonForLevel(id);stopLevelTimer(false);stopLevelRecognition(false);state.levelBand='a1';state.levelAnswer='';state.levelSubmitted=null;state.levelModelOpen=false;state.levelSupport=true;state.levelSeconds=30;state.levelRunning=false;state.levelListening=false;state.levelCarryFrom=null;state.levelCompareOpen=false;};
completion=function(){const d=discoveredSet().size/activeHotspotCount();const keys=['explore','evidence','practice','speaking','talk','reconstruct','timeline','grammar','camera','level'];const done=keys.filter(k=>progress.completed[`l1_${k}`]).length/keys.length;return clamp(Math.round((d*.30+done*.70)*100),0,100);};
const _v15RecommendedForLevel=recommendedAction;
recommendedAction=function(){const base=_v15RecommendedForLevel();if((progress.camera?.runs||0)>0 && !(['a1','b1','c1'].every(k=>(progress.levelLadder.attempts[k]||0)>0)))return {title:'Grow the same description across levels',body:'Keep Lesson 01 fixed and climb A1–A2 → B1–B2 → C1–C2 without memorizing a model.',mode:'level'};return base;};
const _v15HomeForLevel=renderHome;
renderHome=function(){
  _v15HomeForLevel();const pill=document.querySelector('.prototype-pill');if(pill)pill.textContent='LESSON 01 • LEVEL LADDER v0.16';
  const grid=document.querySelector('.journey-grid');if(grid&&!grid.querySelector('.journey-level'))grid.insertAdjacentHTML('beforeend',`<article class="journey-item journey-level ${progress.completed.l1_level?'done':''}"><div class="journey-num">${progress.completed.l1_level?icon('check'):'10'}</div><div><b>Same Scene / Different Level</b><p>Keep one photograph fixed while the speaking demand grows from concrete facts to connected, nuanced discourse.</p></div></article>`);
  const cc=document.querySelector('.cc-home-card');if(cc&&!document.querySelector('.ll-home-card'))cc.insertAdjacentHTML('afterend',`<section class="ll-home-card"><div class="ll-home-visual"><img src="assets/images/lesson_01.jpg" alt="Same scene different level"><div><span>A1–A2</span><span>B1–B2</span><span>C1–C2</span></div><b>SAME SCENE</b></div><div class="ll-home-copy"><span class="section-kicker">NEW • LEVEL AS COMMUNICATION DEMAND</span><h3>Do not change the picture. Change what the learner must do with it.</h3><p>Foundation names visible facts. Connected speaking organizes detail and cautious inference. Nuanced speaking adds composition, precise vocabulary, timeline, and fact/inference control.</p><div><span>${icon('target')} 30 / 60 / 90 sec</span><span>${icon('layers')} support fades</span><span>${icon('eye')} model locked first</span></div></div><div class="ll-home-score"><span>LADDER</span><b>${['a1','b1','c1'].filter(k=>progress.levelLadder.attempts[k]).length}/3</b><small>bands attempted</small><button data-eng-v52-click="openLesson(1);setMode('level')">Open Level Ladder ${icon('chevron')}</button></div></section>`);
};
// Let direct URL testing open the new mode after the original load handler has run.
// Specialist startup modes are normalized by the authoritative deep-link router.

/* ======================================================================
   v0.17 — STEP 9: SCENE FINGERPRINT
   A scene-specific diagnostic profile built from the learner's own practice
   evidence. This is NOT a CEFR placement, IQ-style score, or global English
   proficiency test. It summarizes signals produced inside Lesson 01.
   ====================================================================== */
progress.fingerprint={...{views:0,snapshots:[],lastViewed:0},...(progress.fingerprint||{})};
Object.assign(state,{fingerprintSelected:'observation',fingerprintCompare:true});
saveProgress();

const FINGERPRINT_DIMENSIONS=[
  {key:'observation',label:'Observation',short:'See what is actually there',icon:'eye',color:'#1f9f8b',route:'camera',why:'How completely you notice and communicate image-supported people, setting, light, and detail.'},
  {key:'spatial',label:'Spatial Language',short:'Place details inside the frame',icon:'layers',color:'#4b83bd',route:'camera',why:'How well you organize the scene with left/right, foreground/background, along, beside, over, and other location language.'},
  {key:'action',label:'Action Description',short:'Describe visible movement precisely',icon:'spark',color:'#e69a44',route:'grammar',why:'How clearly you describe what people are visibly doing, especially with present continuous and simultaneous-action links.'},
  {key:'vocabulary',label:'Vocabulary Precision',short:'Choose scene-specific words',icon:'book',color:'#9b6fc7',route:'practice',why:'How precisely you name clothing, surfaces, actions, light, and smaller scene details without relying on generic words.'},
  {key:'evidence',label:'Evidence Control',short:'Fact first, inference second',icon:'target',color:'#2c9c69',route:'speak',why:'How safely you separate direct visual facts from supported inference and avoid unsupported certainty.'},
  {key:'inference',label:'Inference',short:'Interpret without overclaiming',icon:'compass',color:'#cf7b62',route:'timeline',why:'How naturally you use may, might, could, seems, appears, and visible clues to make cautious interpretations.'},
  {key:'storytelling',label:'Storytelling',short:'Extend before and after carefully',icon:'refresh',color:'#cc5d86',route:'timeline',why:'How coherently you build Before → Now → Next while keeping creative extensions visibly hypothetical.'},
  {key:'conversation',label:'Conversation',short:'Keep meaning moving between turns',icon:'mic',color:'#4173c7',route:'talk',why:'How well you respond to image-based follow-ups, sustain the exchange, and adapt the scene language across turns.'}
];

function fpClamp(n){return clamp(Math.round(Number(n)||0),0,100);}
function fpAvg(vals){const a=vals.filter(v=>Number.isFinite(v));return a.length?fpClamp(a.reduce((x,y)=>x+y,0)/a.length):0;}
function fpWeighted(parts){let w=0,s=0;parts.forEach(([v,wt])=>{if(Number.isFinite(v)){s+=fpClamp(v)*wt;w+=wt;}});return w?fpClamp(s/w):0;}
function fpTextCorpus(){
  const level=(progress.levelLadder?.history||[]).slice(0,10).map(x=>x.text||'');
  const conv=(progress.conversation?.history||[]).slice(0,8).flatMap(x=>(x.responses||[]).map(r=>r.text||''));
  const timeline=(progress.timeline?.history||[]).slice(0,8).flatMap(x=>[x.before||'',x.next||'']);
  return [...level,...conv,...timeline].filter(Boolean);
}
function fpCorpusAnalysis(){
  const texts=fpTextCorpus(), joined=texts.join(' . '), cov=sceneCoverageAnalysis(joined), wc=wordCount(joined);
  const spatial=levelPhraseHits(joined,SPATIAL_TERMS).length;
  const cautious=levelCautiousCount(joined);
  const connectors=levelConnectorCount(joined);
  const precise=levelPreciseHits(joined).length;
  const comp=levelCompositionHits(joined).length;
  const timeline=levelTimelineHits(joined).length;
  const ev=wc>=3?evidenceAnalysis(joined).control:0;
  const actionHits=cov.groups.find(g=>g.group==='Action')?.pct||0;
  return {texts,joined,cov,wc,spatial,cautious,connectors,precise,comp,timeline,ev,actionHits};
}
function fpConfidence(samples,modalities=1){
  if(samples<=0)return 12;
  return fpClamp(18+Math.min(52,samples*9)+Math.min(30,Math.max(0,modalities-1)*10));
}
function fpConfidenceLabel(v){return v>=75?'Reliable':v>=45?'Growing':'Early signal';}
function fpSignalLabel(v){return v>=82?'Strong':v>=66?'Developing well':v>=45?'Building':'Needs more practice';}
function fpDimensionData(){
  const c=fpCorpusAnalysis();
  const discovered=Math.round(discoveredSet().size/activeHotspotCount()*100);
  const covBest=progress.coverage?.best||0;
  const cameraBest=progress.camera?.best||0;
  const reconCoverage=progress.reconstruction?.bestCoverage||0;
  const setting=progress.coverage?.groups?.Setting||0;
  const detail=progress.coverage?.groups?.Detail||0;
  const appearance=progress.coverage?.groups?.Appearance||0;
  const actionGroup=progress.coverage?.groups?.Action||c.actionHits||0;
  const evidenceBest=progress.evidence?.best||0;
  const evidenceRuns=progress.evidence?.runs||0;
  const safe=progress.evidence?.safeClaims||0, unsupported=progress.evidence?.unsupported||0;
  const safeRatio=(safe+unsupported)?Math.round(safe/(safe+unsupported)*100):0;
  const grammarRuns=progress.grammar?.runs||0;
  const grammarSpatial=progress.grammar?.spatial||0;
  const grammarActions=progress.grammar?.actions||0;
  const timelineBest=progress.timeline?.best||0;
  const timelineRuns=progress.timeline?.runs||0;
  const convBest=progress.conversation?.best||0;
  const convCompleted=progress.conversation?.completed||0;
  const convTurns=progress.conversation?.turns||0;
  const storyRuns=progress.conversation?.missionRuns?.story||0;
  const detectiveRuns=progress.conversation?.missionRuns?.detective||0;
  const roleDiversity=progress.tapTalk?.roles?Object.values(progress.tapTalk.roles).filter(v=>v>0).length:0;
  const levelAttempts=Object.values(progress.levelLadder?.attempts||{}).reduce((a,b)=>a+(b||0),0);
  const c1Best=progress.levelLadder?.best?.c1||0;
  const recall=progress.practice?.attempts?Math.round((progress.practice.correct||0)/(progress.practice.attempts||1)*100):0;
  const preciseCorpus=fpClamp(c.precise*12);
  const spatialCorpus=fpClamp(c.spatial*14+c.comp*8);
  const cautiousCorpus=fpClamp(c.cautious*15);
  const timelineCorpus=fpClamp(c.timeline*15+c.connectors*5);
  const actionCorpus=fpClamp(c.actionHits*.75+Math.min(25,c.connectors*5));
  const vocabulary=fpWeighted([[overallMastery(),.36],[fpAvg([appearance,detail]),.24],[preciseCorpus,.25],[recall,.15]]);
  const observation=fpWeighted([[covBest,.36],[cameraBest,.22],[reconCoverage,.22],[discovered,.20]]);
  const spatial=fpWeighted([[spatialCorpus,.34],[cameraBest,.24],[grammarSpatial?Math.min(100,55+grammarSpatial*12):0,.20],[setting,.22]]);
  const action=fpWeighted([[actionGroup,.36],[actionCorpus,.24],[grammarActions?Math.min(100,55+grammarActions*12):0,.20],[progress.levelLadder?.best?.b1||0,.20]]);
  const evidence=fpWeighted([[evidenceBest,.58],[safeRatio,.22],[progress.grammar?.guardrail?Math.min(100,55+(progress.grammar.guardrail||0)*12):0,.20]]);
  const inference=fpWeighted([[cautiousCorpus,.35],[evidenceBest,.25],[timelineBest,.22],[detectiveRuns?Math.min(100,50+detectiveRuns*18):0,.18]]);
  const storytelling=fpWeighted([[timelineBest,.52],[timelineCorpus,.18],[storyRuns?Math.min(100,48+storyRuns*18):0,.16],[c1Best,.14]]);
  const conversation=fpWeighted([[convBest,.52],[Math.min(100,convCompleted*28),.20],[Math.min(100,convTurns*8),.14],[Math.min(100,roleDiversity*20),.14]]);
  return [
    {key:'observation',score:observation,confidence:fpConfidence((progress.coverage?.runs||0)+(progress.camera?.runs||0)+(progress.reconstruction?.runs||0)+(discoveredSet().size?1:0),[progress.coverage?.runs,progress.camera?.runs,progress.reconstruction?.runs,discoveredSet().size].filter(Boolean).length),sources:[`Scene Coverage best ${covBest}%`,`Camera best ${cameraBest}%`,`Blind Reconstruction coverage ${reconCoverage}%`,`${discoveredSet().size}/${activeHotspotCount()} core visual anchors discovered`],next:'Camera Challenge: describe a crop before the full scene.'},
    {key:'spatial',score:spatial,confidence:fpConfidence((progress.camera?.runs||0)+grammarSpatial+levelAttempts+(c.spatial?1:0),[progress.camera?.runs,grammarSpatial,levelAttempts,c.spatial].filter(Boolean).length),sources:[`${c.spatial} spatial phrase families found in saved speaking`,`Camera best ${cameraBest}%`,`Visual Grammar spatial completions ${grammarSpatial}`,`Setting coverage ${setting}%`],next:'Camera Challenge: use foreground/background and left/right before adding interpretation.'},
    {key:'action',score:action,confidence:fpConfidence((progress.coverage?.runs||0)+grammarActions+levelAttempts+(convTurns?1:0),[progress.coverage?.runs,grammarActions,levelAttempts,convTurns].filter(Boolean).length),sources:[`Action coverage ${actionGroup}%`,`Visual Grammar action completions ${grammarActions}`,`Connected-level best ${progress.levelLadder?.best?.b1||0}%`,`Saved descriptions contain ${c.connectors} connector families`],next:'Visual Grammar: link two visible actions with present continuous + while.'},
    {key:'vocabulary',score:vocabulary,confidence:fpConfidence((progress.practice?.attempts||0)+(progress.coverage?.runs||0)+(progress.savedWords?.length||0)+(c.precise?1:0),[progress.practice?.attempts,progress.coverage?.runs,progress.savedWords?.length,c.precise].filter(Boolean).length),sources:[`Visual-anchor mastery ${overallMastery()}%`,`Appearance coverage ${appearance}%`,`Detail coverage ${detail}%`,`${c.precise} precise scene phrase families used`],next:'Smart Review: retrieve the weakest visual anchors, then use them in one description.'},
    {key:'evidence',score:evidence,confidence:fpConfidence(evidenceRuns+(progress.grammar?.guardrail||0)+(progress.speakingAttempts||0),[evidenceRuns,progress.grammar?.guardrail,progress.speakingAttempts].filter(Boolean).length),sources:[`Evidence Control best ${evidenceBest}%`,`${safe} safe claims logged`,`${unsupported} unsupported claims logged`,`Visual Grammar guardrail completions ${progress.grammar?.guardrail||0}`],next:'Describe mode: state two visible facts before making one cautious inference.'},
    {key:'inference',score:inference,confidence:fpConfidence(timelineRuns+evidenceRuns+detectiveRuns+(c.cautious?1:0),[timelineRuns,evidenceRuns,detectiveRuns,c.cautious].filter(Boolean).length),sources:[`${c.cautious} cautious-language families found`,`Timeline best ${timelineBest}%`,`Evidence Control best ${evidenceBest}%`,`Photo Detective runs ${detectiveRuns}`],next:'Time Machine: add one may/might/could sentence and name the visual clue behind it.'},
    {key:'storytelling',score:storytelling,confidence:fpConfidence(timelineRuns+storyRuns+(progress.levelLadder?.attempts?.c1||0)+(c.timeline?1:0),[timelineRuns,storyRuns,progress.levelLadder?.attempts?.c1,c.timeline].filter(Boolean).length),sources:[`Timeline Craft best ${timelineBest}%`,`Story Relay runs ${storyRuns}`,`C1–C2 best mission fit ${c1Best}%`,`${c.timeline} timeline-language families found`],next:'Scene Time Machine: build Before → Now → Next with cautious continuity.'},
    {key:'conversation',score:conversation,confidence:fpConfidence(convCompleted+Math.ceil(convTurns/4)+(progress.tapTalk?.launches||0),[convCompleted,convTurns,progress.tapTalk?.launches,roleDiversity].filter(Boolean).length),sources:[`Conversation best ${convBest}%`,`${convCompleted} completed conversation sessions`,`${convTurns} response turns`,`RoleShift diversity ${roleDiversity}/5`],next:'Converse: complete one Natural-mode scene exchange without reading a model.'}
  ].map(x=>({...FINGERPRINT_DIMENSIONS.find(d=>d.key===x.key),...x}));
}
function fpProfile(){
  const dims=fpDimensionData();
  const balance=fpAvg(dims.map(d=>d.score));
  const confidence=fpAvg(dims.map(d=>d.confidence));
  const reliable=dims.filter(d=>d.confidence>=45);
  const strongest=[...reliable].sort((a,b)=>b.score-a.score).slice(0,2);
  const priority=[...dims].sort((a,b)=>((100-b.score)*.65+(100-b.confidence)*.35)-((100-a.score)*.65+(100-a.confidence)*.35)).slice(0,2);
  return {dims,balance,confidence,strongest,priority};
}
function fpPattern(p=fpProfile()){
  const m=Object.fromEntries(p.dims.map(d=>[d.key,d.score]));
  if(p.confidence<35)return ['EARLY PROFILE','Practice evidence is still sparse. The fingerprint will become more stable as you use more modes.'];
  if((m.evidence+m.observation)/2>=72)return ['EVIDENCE-AWARE OBSERVER','You currently show the strongest signal in noticing the frame and controlling what the image can actually support.'];
  if((m.spatial+m.action)/2>=72)return ['SCENE MAPPER','You currently organize visible movement and position more strongly than the other scene-language functions.'];
  if((m.storytelling+m.conversation)/2>=72)return ['VISUAL STORYTELLER','You currently extend image meaning most strongly through sequence and interactive follow-up.'];
  if(m.vocabulary>=72)return ['PRECISION BUILDER','Scene-specific vocabulary is currently one of your clearest strengths.'];
  return ['BALANCED BUILDER','No single skill dominates yet; the profile is developing across several scene-language functions.'];
}
function fpDim(key){return fpProfile().dims.find(d=>d.key===key)||fpProfile().dims[0];}
function fpRadar(p=fpProfile(),mini=false){
  const cx=210,cy=210,maxR=mini?128:145, rings=[.25,.5,.75,1];
  const pt=(i,r)=>{const a=-Math.PI/2+i*Math.PI*2/8;return [cx+Math.cos(a)*r,cy+Math.sin(a)*r]};
  const polygon=arr=>arr.map(([x,y])=>`${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const grid=rings.map(q=>`<polygon points="${polygon(p.dims.map((_,i)=>pt(i,maxR*q)))}"/>`).join('');
  const axes=p.dims.map((d,i)=>{const [x,y]=pt(i,maxR);return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`}).join('');
  const data=polygon(p.dims.map((d,i)=>pt(i,maxR*d.score/100)));
  const dots=p.dims.map((d,i)=>{const [x,y]=pt(i,maxR*d.score/100);return `<circle cx="${x}" cy="${y}" r="${mini?4:5}" data-fp-dot="${d.key}"/>`}).join('');
  const labels=mini?'':p.dims.map((d,i)=>{const [x,y]=pt(i,maxR+34);return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle">${esc(d.label)}</text>`}).join('');
  return `<svg class="fp-radar-svg ${mini?'mini':''}" viewBox="0 0 420 420" role="img" aria-label="Scene Fingerprint radar chart"><g class="fp-grid">${grid}${axes}</g><polygon class="fp-data" points="${data}"/>${dots}${labels}<circle class="fp-core" cx="210" cy="210" r="5"/></svg>`;
}
function fpSnapshot(){
  const p=fpProfile(), item={ts:Date.now(),balance:p.balance,confidence:p.confidence,dims:Object.fromEntries(p.dims.map(d=>[d.key,d.score]))};
  progress.fingerprint.snapshots=[item,...(progress.fingerprint.snapshots||[])].slice(0,10);progress.fingerprint.lastViewed=Date.now();progress.completed.l1_fingerprint=true;awardPoints(8,'fingerprint');saveProgress();haptic([12,18,28]);toast(progress.fingerprint.snapshots.length===1?'Baseline fingerprint saved.':'New fingerprint snapshot saved.');render();
}
function fpSnapshotCompare(){
  const h=progress.fingerprint.snapshots||[];if(!h.length)return null;const latest=h[0],base=h[h.length-1];
  return {latest,base,deltas:FINGERPRINT_DIMENSIONS.map(d=>({key:d.key,label:d.label,delta:(latest.dims?.[d.key]||0)-(base.dims?.[d.key]||0)}))};
}
function fpOpenMission(key){
  const d=fpDim(key);if(!d)return;
  if(d.route==='practice'){setMode('practice');setPractice('smart');return;}
  if(d.route==='talk'){state.conversationMode='natural';state.conversationMission=key==='storytelling'?'story':'listener';setMode('talk');return;}
  if(d.route==='camera'){state.cameraTrack=key==='spatial'?'shoreline':'human';setMode('camera');return;}
  if(d.route==='grammar'){state.grammarLens='action';setMode('grammar');return;}
  if(d.route==='timeline'){setMode('timeline');return;}
  if(d.route==='speak'){state.evidenceLive=true;state.coverageOverlay=true;setMode('speak');return;}
  setMode(d.route||'speak');
}
function fpSelect(key){state.fingerprintSelected=key;haptic(8);render();}
function fpScoreRing(score,confidence){return `<div class="fp-score-ring" style="--score:${score*3.6}deg"><div><b>${score}</b><span>scene signal</span><small>${fpConfidenceLabel(confidence)} data</small></div></div>`;}
function fpSkillCards(p=fpProfile()){
  return `<div class="fp-skill-grid">${p.dims.map(d=>`<button class="fp-skill-card ${state.fingerprintSelected===d.key?'active':''}" data-eng-v52-click="fpSelect('${d.key}')" style="--skill:${d.color}"><div class="fp-skill-top"><i>${icon(d.icon)}</i><span><b>${esc(d.label)}</b><small>${esc(d.short)}</small></span><em>${d.score}</em></div><div class="fp-skill-bar"><i style="width:${d.score}%"></i></div><div class="fp-skill-foot"><span>${fpSignalLabel(d.score)}</span><span class="conf ${d.confidence>=75?'high':d.confidence>=45?'mid':'low'}">${fpConfidenceLabel(d.confidence)} • ${d.confidence}%</span></div></button>`).join('')}</div>`;
}
function fpDetailPanel(){
  const d=fpDim(state.fingerprintSelected);if(!d)return '';
  return `<section class="fp-detail" style="--skill:${d.color}"><div class="fp-detail-head"><div class="fp-detail-icon">${icon(d.icon)}</div><div><span>SELECTED DIMENSION</span><h3>${esc(d.label)} <b>${d.score}</b></h3><p>${esc(d.why)}</p></div><div class="fp-confidence"><span>DATA CONFIDENCE</span><b>${d.confidence}%</b><small>${fpConfidenceLabel(d.confidence)}</small></div></div><div class="fp-evidence-list"><span>WHY THIS SIGNAL LOOKS THIS WAY</span>${d.sources.map(x=>`<div>${icon('check')}<p>${esc(x)}</p></div>`).join('')}</div><div class="fp-next-mission"><div><span>NEXT BEST DRILL</span><b>${esc(d.next)}</b></div><button data-eng-v52-click="fpOpenMission('${d.key}')">Practice this skill ${icon('chevron')}</button></div></section>`;
}
function fpStrengthOpportunity(p=fpProfile()){
  const strong=p.strongest.length?p.strongest:[...p.dims].sort((a,b)=>b.score-a.score).slice(0,2), weak=p.priority;
  return `<section class="fp-coach-grid"><article><span>CURRENT STRENGTH SIGNALS</span><h3>${strong.map(x=>x.label).join(' + ')}</h3>${strong.map(x=>`<p><b>${x.score}</b><span>${esc(x.label)}</span><small>${x.confidence<45?'Treat this as provisional until more practice data is collected.':esc(x.short)}</small></p>`).join('')}</article><article><span>HIGHEST-VALUE NEXT MOVES</span><h3>Train the gaps, not the leaderboard.</h3>${weak.map((x,i)=>`<button data-eng-v52-click="fpOpenMission('${x.key}')"><i>${i+1}</i><span><b>${esc(x.label)}</b><small>${esc(x.next)}</small></span>${icon('chevron')}</button>`).join('')}</article></section>`;
}
function fpSignalSources(p=fpProfile()){
  const rows=[
    ['Visual discovery',discoveredSet().size+'/'+activeHotspotCount(),'Explore'],
    ['Scene Coverage',`${progress.coverage?.runs||0} runs • best ${progress.coverage?.best||0}%`,'Describe'],
    ['Evidence Engine',`${progress.evidence?.runs||0} runs • best ${progress.evidence?.best||0}%`,'Evidence'],
    ['Conversation',`${progress.conversation?.completed||0} sessions • ${progress.conversation?.turns||0} turns`,'Talk'],
    ['Blind Reconstruction',`${progress.reconstruction?.runs||0} runs • best ${progress.reconstruction?.best||0}%`,'Rebuild'],
    ['Time Machine',`${progress.timeline?.runs||0} runs • best ${progress.timeline?.best||0}%`,'Story'],
    ['Visual Grammar',`${progress.grammar?.runs||0} runs • best ${progress.grammar?.best||0}%`,'Grammar'],
    ['Camera Challenge',`${progress.camera?.runs||0} runs • best ${progress.camera?.best||0}%`,'Camera'],
    ['Level Ladder',`${Object.values(progress.levelLadder?.attempts||{}).reduce((a,b)=>a+(b||0),0)} attempts`,'Level']
  ];
  return `<section class="fp-source-log"><div><span>PROFILE EVIDENCE</span><h3>The fingerprint is assembled from your own Lesson 01 behavior.</h3><p>More modalities = higher confidence. Repeating one easy task cannot make every dimension look reliable.</p></div><div class="fp-source-grid">${rows.map(([a,b,c])=>`<div><span>${esc(c)}</span><b>${esc(a)}</b><small>${esc(b)}</small></div>`).join('')}</div></section>`;
}
function fpHistory(){
  const h=progress.fingerprint.snapshots||[], cmp=fpSnapshotCompare();
  if(!h.length)return `<section class="fp-history empty"><div>${icon('refresh')}</div><div><span>NO BASELINE YET</span><h3>Save the current fingerprint before your next practice cycle.</h3><p>Future snapshots will show which scene-language dimensions actually moved.</p></div><button data-eng-v52-click="fpSnapshot()">Save baseline</button></section>`;
  return `<section class="fp-history"><div class="fp-history-head"><div><span>FINGERPRINT HISTORY</span><h3>${h.length===1?'Baseline saved — practice, then return.':'Compare the latest snapshot with your first baseline.'}</h3></div><button data-eng-v52-click="fpSnapshot()">Save new snapshot</button></div>${cmp?`<div class="fp-delta-grid">${cmp.deltas.map(x=>`<div class="${x.delta>0?'up':x.delta<0?'down':'flat'}"><span>${esc(x.label)}</span><b>${x.delta>0?'+':''}${x.delta}</b><small>${x.delta>0?'growth signal':x.delta<0?'lower current signal':'unchanged'}</small></div>`).join('')}</div>`:''}<div class="fp-snapshot-list">${h.slice(0,5).map((x,i)=>`<div><i>${i===0?'LATEST':i===h.length-1?'BASE':'SNAP'}</i><span>${new Date(x.ts).toLocaleDateString()}</span><b>${x.balance}</b><small>balance • ${x.confidence}% confidence</small></div>`).join('')}</div></section>`;
}
function fingerprintContent(){
  const p=fpProfile(), pattern=fpPattern(p), attempts=FINGERPRINT_DIMENSIONS.filter(d=>fpDim(d.key).confidence>=45).length;
  progress.fingerprint.views=(progress.fingerprint.views||0)+1;progress.fingerprint.lastViewed=Date.now();saveProgress();
  return `<section class="scene-fingerprint"><div class="panel-heading fp-heading"><div><span class="section-kicker">STEP 9 • SCENE FINGERPRINT</span><h2>See how you communicate this scene — not just whether you finished it.</h2><p>Eight scene-language signals are built from your own work across Explore, Describe, Evidence, Conversation, Rebuild, Time, Grammar, Camera, and Level.</p></div><div class="fp-data-readiness"><span>DATA READINESS</span><b>${attempts}/8</b><small>${p.confidence}% profile confidence</small></div></div><div class="fp-hero"><div class="fp-radar-wrap">${fpRadar(p)}<div class="fp-radar-center"><b>${p.balance}</b><span>PROFILE<br>BALANCE</span></div></div><div class="fp-hero-copy"><span>CURRENT PATTERN</span><h3>${pattern[0]}</h3><p>${esc(pattern[1])}</p><div class="fp-hero-stats"><div><span>Balance</span><b>${p.balance}</b><small>scene-specific</small></div><div><span>Confidence</span><b>${p.confidence}%</b><small>practice evidence</small></div><div><span>Snapshots</span><b>${progress.fingerprint.snapshots?.length||0}</b><small>growth history</small></div></div><div class="fp-disclaimer">This is a <b>Lesson 01 learning profile</b>. It is not CEFR placement, general English proficiency, pronunciation scoring, or a psychological assessment.</div></div></div>${fpSkillCards(p)}${fpDetailPanel()}${fpStrengthOpportunity(p)}${fpHistory()}${fpSignalSources(p)}<section class="fp-principle"><div>${icon('spark')}</div><div><span>PRODUCT PRINCIPLE</span><h3>No generic XP bar can tell you whether you miss spatial detail, overclaim inference, or struggle to sustain scene conversation.</h3><p>Scene Fingerprint turns those differences into a visible practice map while keeping confidence separate from performance.</p></div></section></section>`;
}

// Step 9 becomes the eleventh active-learning mode.
const _v16ModeContentForFingerprint=modeContent;
modeContent=function(){if(state.mode==='fingerprint')return `${modeTabs()}<div class="mode-surface">${fingerprintContent()}</div>`;return _v16ModeContentForFingerprint();};
modeTabs=function(){
  const modes=[['explore','compass','Explore'],['learn','book','Learn'],['practice','target','Recall'],['speak','mic','Describe'],['talk','spark','Converse'],['reconstruct','layers','Rebuild'],['timeline','refresh','Time'],['grammar','book','Grammar'],['camera','expand','Camera'],['level','spark','Level'],['fingerprint','target','Profile']];
  return `<div class="mode-tabs eleven-modes">${modes.map(([m,ic,t])=>`<button class="${state.mode===m?'active':''}" data-eng-v52-click="setMode('${m}')">${icon(ic)}<span>${t}</span></button>`).join('')}</div>`;
};
bottomNav=function(){
  const items=[['explore','compass','Explore'],['learn','book','Learn'],['practice','target','Recall'],['speak','mic','Describe'],['talk','spark','Talk'],['reconstruct','layers','Rebuild'],['timeline','refresh','Time'],['grammar','book','Grammar'],['camera','expand','Camera'],['level','spark','Level'],['fingerprint','target','Profile']];
  return `<nav class="bottom-nav eleven-nav">${items.map(([m,ic,t])=>`<button class="nav-item ${state.mode===m?'active':''}" data-eng-v52-click="setMode('${m}')">${icon(ic)}<span>${t}</span></button>`).join('')}</nav>`;
};
topbar=function(){
  const steps=[['explore','Explore'],['learn','Evidence'],['practice','Recall'],['speak','Describe'],['talk','Converse'],['reconstruct','Rebuild'],['timeline','Time'],['grammar','Grammar'],['camera','Camera'],['level','Level'],['fingerprint','Profile']];
  return `<header class="topbar"><div class="topbar-inner"><button class="round-btn ghost" data-eng-v52-click="goHome()" aria-label="Back">${icon('back')}</button><div class="brand-lockup"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual English Studio</small></div></div><div class="journey-rail eleven-step">${steps.map(([k,t],i)=>{const ck=k==='learn'?'evidence':k==='speak'?'speaking':k;const done=progress.completed[`l1_${ck}`];return `<button data-eng-v52-click="setMode('${k}')" class="${state.mode===k?'active':''} ${done?'done':''}"><i>${done?icon('check'):i+1}</i><span>${t}</span></button>`}).join('')}</div><button class="round-btn ghost help-btn" data-eng-v52-click="showOnboarding(0)" aria-label="Interaction guide">?</button><div class="top-progress"><div><span>Lesson</span><b>${completion()}%</b></div><div class="progress-line"><i style="width:${completion()}%"></i></div></div></div></header>`;
};
const _v16SetModeForFingerprint=setMode;
setMode=function(mode){_v16SetModeForFingerprint(mode);if(mode==='fingerprint'){document.body.classList.remove('reconstruct-hide-photo');progress.fingerprint.lastViewed=Date.now();saveProgress();render();}};
const _v16OpenLessonForFingerprint=openLesson;
openLesson=function(id){_v16OpenLessonForFingerprint(id);state.fingerprintSelected='observation';state.fingerprintCompare=true;};
completion=function(){const d=discoveredSet().size/activeHotspotCount();const keys=['explore','evidence','practice','speaking','talk','reconstruct','timeline','grammar','camera','level','fingerprint'];const done=keys.filter(k=>progress.completed[`l1_${k}`]).length/keys.length;return clamp(Math.round((d*.28+done*.72)*100),0,100);};
const _v16RecommendedForFingerprint=recommendedAction;
recommendedAction=function(){const base=_v16RecommendedForFingerprint();const majorRuns=(progress.coverage?.runs||0)+(progress.camera?.runs||0)+(progress.timeline?.runs||0)+(progress.conversation?.completed||0);if(majorRuns>=2&&!progress.completed.l1_fingerprint)return {title:'Read your Scene Fingerprint',body:'Turn your practice data into an 8-dimension map and save a baseline before the next training cycle.',mode:'fingerprint'};return base;};
const _v16HomeForFingerprint=renderHome;
renderHome=function(){
  _v16HomeForFingerprint();const pill=document.querySelector('.prototype-pill');if(pill)pill.textContent='LESSON 01 • SCENE FINGERPRINT v0.17';
  const grid=document.querySelector('.journey-grid');if(grid&&!grid.querySelector('.journey-fingerprint'))grid.insertAdjacentHTML('beforeend',`<article class="journey-item journey-fingerprint ${progress.completed.l1_fingerprint?'done':''}"><div class="journey-num">${progress.completed.l1_fingerprint?icon('check'):'11'}</div><div><b>Scene Fingerprint</b><p>Turn practice evidence into an 8-dimension scene-language profile with confidence, strengths, gaps, and next-best drills.</p></div></article>`);
  const ll=document.querySelector('.ll-home-card');if(ll&&!document.querySelector('.fp-home-card')){const p=fpProfile(),pat=fpPattern(p);ll.insertAdjacentHTML('afterend',`<section class="fp-home-card"><div class="fp-home-radar">${fpRadar(p,true)}<div><b>${p.balance}</b><span>balance</span></div></div><div class="fp-home-copy"><span class="section-kicker">NEW • DIAGNOSTIC WITHOUT A GENERIC GRADE</span><h3>${pat[0]}</h3><p>${esc(pat[1])}</p><div><span>${icon('eye')} 8 scene skills</span><span>${icon('target')} confidence separated</span><span>${icon('refresh')} snapshot growth</span></div></div><div class="fp-home-score"><span>PROFILE</span><b>${p.confidence}%</b><small>data confidence</small><button data-eng-v52-click="openLesson(1);setMode('fingerprint')">Open Fingerprint ${icon('chevron')}</button></div></section>`);}
};
// Initial mode restoration is owned by EngBookStartup.

/* ========================================================================
   v0.18 — STEP 10: BRING YOUR OWN SCENE / LOCAL SCENE FORGE
   ------------------------------------------------------------------------
   Product rule: do not fake automatic computer vision in an offline build.
   Users can import a photo, map evidence anchors directly on the image, and
   immediately run Explore, Live Coverage, Evidence, Visual Grammar and
   Conversation from the resulting portable Scene Pack. The same Scene Pack
   schema is ready for a future AI/backend analyzer to populate automatically.
   ======================================================================== */
const CUSTOM_SCENE_KEY='engbook_custom_scenes_v18';
const CUSTOM_SCENE_SCHEMA_VERSION='1.0';
const OWN_GROUPS=['People','Action','Object','Setting','Light','Detail'];
const OWN_GROUP_WEIGHT={People:1.15,Action:1.3,Object:1,Setting:1.15,Light:1,Detail:.8};
const OWN_CAUTION=['may','might','could','seems','seem','appears','appear','perhaps','possibly','probably','likely','suggests','suggest'];
const OWN_SPATIAL=['left','right','foreground','background','beside','next to','near','behind','in front of','above','below','between','along','on','under','over'];
let ownRecognition=null;
let ownScenes=ownLoadScenes();
Object.assign(state,{ownSubmode:'build',ownSceneId:null,ownSceneDraft:null,ownAnchorDraft:null,ownSelectedAnchor:null,ownTranscript:'',ownEvidenceText:'',ownCoverageReveal:false,ownTalkInput:'',ownTalkTurn:0,ownTalkHistory:[],ownListening:false,ownVoiceTarget:null,ownGrammarA:null,ownGrammarB:null,ownGrammarPrep:'beside',ownHints:true,ownPackMessage:''});
progress.customScene={...{created:0,practiceRuns:0,bestCoverage:0,evidenceRuns:0,talkTurns:0,exports:0},...(progress.customScene||{})};

function ownLoadScenes(){try{const v=JSON.parse(localStorage.getItem(CUSTOM_SCENE_KEY)||'[]');return Array.isArray(v)?v.slice(0,40).map(x=>window.EngBookSecurity?.sanitizeScene?.(x)||null).filter(Boolean):[];}catch(e){return [];}}
function ownPersistScenes(){try{localStorage.setItem(CUSTOM_SCENE_KEY,JSON.stringify(ownScenes));return true;}catch(e){toast('Local storage is full. Export the Scene Pack, then remove an older custom scene.');return false;}}
function ownId(){return 'scene_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,7);}
function ownNormalize(s){return String(s||'').toLowerCase().replace(/[’']/g,"'").replace(/[^a-z0-9\s'-]/g,' ').replace(/\s+/g,' ').trim();}
function ownWords(s){const stop=new Set(['the','a','an','is','are','was','were','to','of','in','on','at','and','or','but','with','this','that','they','it','there','be','been','being','as','for','from','by','i','you','he','she','we','my','their','his','her']);return ownNormalize(s).split(' ').filter(w=>w.length>2&&!stop.has(w));}
function ownOverlap(a,b){const A=new Set(ownWords(a)),B=new Set(ownWords(b));if(!A.size||!B.size)return 0;let hit=0;A.forEach(x=>B.has(x)&&hit++);return hit/Math.min(A.size,B.size);}
function ownSplitList(s){return String(s||'').split(/[\n,;]+/).map(x=>x.trim()).filter(Boolean);}
function ownSceneById(id){return ownScenes.find(x=>x.id===id)||null;}
function ownActiveScene(){if(state.ownSceneDraft)return state.ownSceneDraft;return ownSceneById(state.ownSceneId)||(ownScenes[0]||null);}
function ownSceneReady(scene=ownActiveScene()){return !!(scene&&scene.imageData&&(scene.anchors||[]).length>=2);}
function ownEmptyScene(imageData='',name='My Scene'){return {schemaVersion:CUSTOM_SCENE_SCHEMA_VERSION,id:ownId(),title:name||'My Scene',createdAt:Date.now(),updatedAt:Date.now(),imageData,overview:'',grammarFocus:'Present continuous + spatial language + cautious inference',anchors:[],inferences:[],guardrails:[]};}
function ownSafeFileName(s){return ownNormalize(s).replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'').slice(0,42)||'engbook-scene';}
function ownNewScene(){ownStopSpeech();state.ownSceneId=null;state.ownSceneDraft=null;state.ownAnchorDraft=null;state.ownSelectedAnchor=null;state.ownTranscript='';state.ownEvidenceText='';state.ownTalkHistory=[];state.ownTalkTurn=0;state.ownSubmode='build';render();}
function ownOpenScene(id,sub='explore'){const scene=ownSceneById(id);if(!scene)return;ownStopSpeech();state.ownSceneId=id;state.ownSceneDraft=null;state.ownSelectedAnchor=null;state.ownTranscript='';state.ownEvidenceText='';state.ownTalkHistory=[];state.ownTalkTurn=0;state.ownSubmode=sub;render();}
function ownDeleteScene(id){if(!confirm('Remove this custom Scene Pack from this device?'))return;ownScenes=ownScenes.filter(x=>x.id!==id);ownPersistScenes();if(state.ownSceneId===id)ownNewScene();else render();}
function ownEditCurrent(){const s=ownActiveScene();if(!s)return;state.ownSceneDraft=JSON.parse(JSON.stringify(s));state.ownSceneId=s.id;state.ownSubmode='build';state.ownAnchorDraft=null;render();}
function ownSetSubmode(m){ownStopSpeech();state.ownSubmode=m;state.ownSelectedAnchor=null;state.ownCoverageReveal=false;if(m==='evidence'&&!state.ownEvidenceText)state.ownEvidenceText=state.ownTranscript||'';render();}
function ownSetMeta(k,v){const s=ownActiveScene();if(!s)return;s[k]=v;s.updatedAt=Date.now();state.ownSceneDraft=s;}
function ownSetInferenceText(v){const s=ownActiveScene();if(!s)return;s.inferences=ownSplitList(v);s.updatedAt=Date.now();state.ownSceneDraft=s;}
function ownSetGuardrailText(v){const s=ownActiveScene();if(!s)return;s.guardrails=ownSplitList(v);s.updatedAt=Date.now();state.ownSceneDraft=s;}
function ownSetAnchorDraft(k,v){if(!state.ownAnchorDraft)return;state.ownAnchorDraft[k]=v;}

function ownCompressImage(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onerror=reject;reader.onload=()=>{const img=new Image();img.onerror=reject;img.onload=()=>{const max=1200,scale=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight)),w=Math.max(1,Math.round(img.naturalWidth*scale)),h=Math.max(1,Math.round(img.naturalHeight*scale)),c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);ctx.drawImage(img,0,0,w,h);resolve({data:c.toDataURL('image/jpeg',.76),width:w,height:h});};img.src=reader.result;};reader.readAsDataURL(file);});}
async function ownHandleFileInput(e){const f=e.target.files?.[0];if(!f)return;await ownLoadImageFile(f);e.target.value='';}
async function ownLoadImageFile(file){if(!file.type?.startsWith('image/')){toast('Choose an image file.');return;}try{toast('Preparing your scene…');const out=await ownCompressImage(file);const base=file.name.replace(/\.[^.]+$/,'').replace(/[-_]+/g,' ');state.ownSceneDraft=ownEmptyScene(out.data,base||'My Scene');state.ownSceneDraft.imageWidth=out.width;state.ownSceneDraft.imageHeight=out.height;state.ownSceneId=state.ownSceneDraft.id;state.ownSubmode='build';render();}catch(e){toast('I could not read that image. Try JPG, PNG, or WEBP.');}}
function ownDrop(e){e.preventDefault();const f=e.dataTransfer?.files?.[0];if(f)ownLoadImageFile(f);}

function ownUseDemo(){const l=CAT01.lessons[0],s=ownEmptyScene(l.image,'Demo — Two Adults Walking on a Beach');s.overview=activeGold().overview;s.inferences=[activeGold().inference.high,activeGold().inference.low];s.guardrails=['married','marriage','honeymoon','anniversary','engaged','exact destination'];s.anchors=l.hotspots.map((h,i)=>({id:'a'+(i+1),label:h.en,group:['man','woman'].includes(h.en)?'People':h.en==='hand'?'Action':['sun'].includes(h.en)?'Light':['ocean','palm tree','beach'].includes(h.en)?'Setting':'Detail',x:h.x,y:h.y,aliases:[h.en],fact:hotspotDetail(h)?.grammar||h.sentence||`${h.en} is visible.`,phrase:hotspotDetail(h)?.phrase||'',grammar:hotspotDetail(h)?.grammar||''}));state.ownSceneDraft=s;state.ownSceneId=s.id;state.ownSubmode='build';render();}

function ownStageClick(e){if(state.ownSubmode!=='build'||e.target.closest('.own-anchor-marker'))return;const s=ownActiveScene();if(!s)return;const r=e.currentTarget.getBoundingClientRect(),x=clamp(((e.clientX-r.left)/r.width)*100,1,99),y=clamp(((e.clientY-r.top)/r.height)*100,1,99);state.ownAnchorDraft={id:ownId(),label:'',group:'Object',x:+x.toFixed(1),y:+y.toFixed(1),aliases:'',fact:'',phrase:'',grammar:''};haptic(12);render();}
function ownAddAnchor(){const s=ownActiveScene(),d=state.ownAnchorDraft;if(!s||!d)return;if(!String(d.label||'').trim()){toast('Name the visual anchor first.');return;}const a={...d,label:String(d.label).trim(),aliases:ownSplitList(d.aliases),fact:String(d.fact||'').trim()||`I can see ${String(d.label).trim()} in the scene.`,phrase:String(d.phrase||'').trim(),grammar:String(d.grammar||'').trim()};delete a.aliasesText;s.anchors=s.anchors||[];const ix=s.anchors.findIndex(x=>x.id===a.id);if(ix>=0)s.anchors[ix]=a;else s.anchors.push(a);s.updatedAt=Date.now();state.ownSceneDraft=s;state.ownAnchorDraft=null;state.ownSelectedAnchor=a.id;haptic([10,18,28]);render();}
function ownEditAnchor(id){const s=ownActiveScene(),a=s?.anchors?.find(x=>x.id===id);if(!a)return;state.ownAnchorDraft={...a,aliases:(a.aliases||[]).join(', ')};state.ownSubmode='build';render();}
function ownRemoveAnchor(id){const s=ownActiveScene();if(!s)return;s.anchors=(s.anchors||[]).filter(x=>x.id!==id);state.ownSceneDraft=s;state.ownAnchorDraft=null;state.ownSelectedAnchor=null;render();}
function ownSelectAnchor(id){state.ownSelectedAnchor=id;const s=ownActiveScene(),a=s?.anchors?.find(x=>x.id===id);if(a){haptic(10);speak(a.label,.86);}render();}
function ownSaveScene(){const s=ownActiveScene();if(!s?.imageData){toast('Add a photo first.');return;}if((s.anchors||[]).length<2){toast('Add at least two visual anchors before saving the Scene Pack.');return;}s.title=(s.title||'My Scene').trim();s.updatedAt=Date.now();s.schemaVersion=CUSTOM_SCENE_SCHEMA_VERSION;const copy=JSON.parse(JSON.stringify(s)),ix=ownScenes.findIndex(x=>x.id===copy.id);if(ix>=0)ownScenes[ix]=copy;else ownScenes.unshift(copy);if(!ownPersistScenes())return;state.ownSceneId=copy.id;state.ownSceneDraft=null;state.ownSubmode='explore';progress.customScene.created=Math.max(progress.customScene.created||0,ownScenes.length);progress.completed.l1_ownscene=true;awardPoints(10,'own-scene');saveProgress();toast('Scene Pack saved locally.');render();}

function ownAnchorTerms(a){return [...new Set([a.label,...(a.aliases||[])].map(ownNormalize).filter(Boolean))];}
function ownCoverageAnalysis(scene=ownActiveScene(),text=state.ownTranscript){if(!scene)return {pct:0,hits:[],missing:[],groups:{}};const n=ownNormalize(text),hits=[],missing=[],groups={};let total=0,got=0;(scene.anchors||[]).forEach(a=>{const w=OWN_GROUP_WEIGHT[a.group]||1;total+=w;const ok=ownAnchorTerms(a).some(t=>t&&n.includes(t));(ok?hits:missing).push(a);if(ok)got+=w;groups[a.group]=groups[a.group]||{hit:0,total:0};groups[a.group].total++;if(ok)groups[a.group].hit++;});return {pct:total?Math.round(got/total*100):0,hits,missing,groups};}
function ownHasCaution(s){const n=' '+ownNormalize(s)+' ';return OWN_CAUTION.some(x=>n.includes(' '+x+' '));}
function ownEvidenceAnalysis(scene=ownActiveScene(),text=state.ownEvidenceText||state.ownTranscript){if(!scene)return {items:[],control:0};const sentences=String(text||'').split(/(?<=[.!?])\s+|\n+/).map(x=>x.trim()).filter(Boolean),items=[];sentences.forEach(sentence=>{const n=ownNormalize(sentence),guard=(scene.guardrails||[]).find(g=>n.includes(ownNormalize(g))),inf=(scene.inferences||[]).map(t=>({t,o:ownOverlap(sentence,t)})).sort((a,b)=>b.o-a.o)[0],anchor=(scene.anchors||[]).find(a=>ownAnchorTerms(a).some(t=>n.includes(t)));if(guard){items.push({sentence,kind:'unsupported',label:'UNSUPPORTED BY SCENE PACK',note:`The scene creator marked “${guard}” as a guardrail.`});return;}if(inf&&inf.o>=.28){const safe=ownHasCaution(sentence);items.push({sentence,kind:safe?'inference':'overclaim',label:safe?'SUPPORTED INFERENCE':'INFERENCE NEEDS CAUTION',note:safe?'This aligns with a supported inference in the Scene Pack.':'The idea may be plausible, but phrase it with may / might / seems / appears.'});return;}if(anchor){items.push({sentence,kind:'fact',label:'ANCHOR-SUPPORTED FACT',note:`This sentence refers to the mapped visual anchor “${anchor.label}”. Check wording against its visible-evidence note.`});return;}items.push({sentence,kind:'review',label:'NEEDS HUMAN / AI REVIEW',note:'This offline rule engine cannot verify the claim from the current Scene Pack.'});});const weights={fact:1,inference:1,review:.55,overclaim:.3,unsupported:0},control=items.length?Math.round(items.reduce((a,x)=>a+(weights[x.kind]??0),0)/items.length*100):0;return {items,control};}
function ownSetTranscript(v){state.ownTranscript=v;}
function ownCaptureDescription(){const s=ownActiveScene();if(!s)return;const a=ownCoverageAnalysis(s,state.ownTranscript);progress.customScene.practiceRuns=(progress.customScene.practiceRuns||0)+1;progress.customScene.bestCoverage=Math.max(progress.customScene.bestCoverage||0,a.pct);saveProgress();state.ownCoverageReveal=true;haptic(a.pct>=70?[12,18,30]:10);render();}
function ownCheckEvidence(){const s=ownActiveScene();if(!s)return;state.ownEvidenceText=state.ownEvidenceText||state.ownTranscript;progress.customScene.evidenceRuns=(progress.customScene.evidenceRuns||0)+1;saveProgress();render();}
function ownSpeechCtor(){return window.SpeechRecognition||window.webkitSpeechRecognition||null;}
function ownStartSpeech(target='describe'){const C=ownSpeechCtor();if(!C){toast('Speech recognition is not available in this browser. Typing still works.');return;}ownStopSpeech();try{const r=new C();r.lang='en-US';r.continuous=false;r.interimResults=true;state.ownListening=true;state.ownVoiceTarget=target;ownRecognition=r;render();let final='';r.onresult=e=>{let interim='';for(let i=e.resultIndex;i<e.results.length;i++){const t=e.results[i][0].transcript;if(e.results[i].isFinal)final+=' '+t;else interim+=' '+t;}const heard=(final+' '+interim).trim();if(target==='talk')state.ownTalkInput=heard;else if(target==='evidence')state.ownEvidenceText=heard;else state.ownTranscript=heard;render();};r.onerror=()=>{state.ownListening=false;ownRecognition=null;toast('Microphone capture stopped. You can type instead.');render();};r.onend=()=>{state.ownListening=false;ownRecognition=null;render();};r.start();}catch(e){state.ownListening=false;toast('Microphone could not start.');render();}}
function ownStopSpeech(){try{ownRecognition?.stop();}catch(e){}ownRecognition=null;state.ownListening=false;state.ownVoiceTarget=null;}

function ownTalkPrompts(scene=ownActiveScene()){if(!scene)return[];const A=scene.anchors||[],p=A.find(x=>x.group==='People')||A[0],act=A.find(x=>x.group==='Action')||A[1]||A[0],place=A.find(x=>x.group==='Setting')||A[2]||A[0];return [
  `Imagine I cannot see “${scene.title}”. What should I picture first?`,
  p?`What can you tell me about ${p.label}, using only what the image clearly supports?`:'Name one important subject and describe it.',
  act?`What is happening around ${act.label}? Add one visible action or relation.`:'Describe one visible action.',
  place?`Where is ${place.label} in the frame? Use precise spatial language.`:'Use left, right, foreground, or background to organize the scene.',
  `Give me one careful inference, then name the visible clue that supports it.`
];}
function ownTalkPrompt(){const P=ownTalkPrompts(),i=Math.min(state.ownTalkTurn,P.length-1);return P[i]||'';}
function ownTalkFeedback(text){const c=ownCoverageAnalysis(ownActiveScene(),text),sp=OWN_SPATIAL.some(x=>(' '+ownNormalize(text)+' ').includes(' '+x+' ')),caut=ownHasCaution(text);const notes=[];if(c.hits.length)notes.push(`You communicated: ${c.hits.slice(0,3).map(x=>x.label).join(', ')}.`);if(state.ownTalkTurn===3&&!sp)notes.push('Add one spatial phrase such as on the left, in the foreground, beside, or behind.');if(state.ownTalkTurn===4&&!caut)notes.push('For inference, soften certainty with may, might, seems, appears, or suggests.');if(!notes.length)notes.push('Keep the answer tied to visible scene details, then add one new piece of information.');return notes.join(' ');}
function ownSubmitTalk(){const t=String(state.ownTalkInput||'').trim();if(!t){toast('Say or type an answer first.');return;}const prompt=ownTalkPrompt(),feedback=ownTalkFeedback(t);state.ownTalkHistory.push({prompt,answer:t,feedback});state.ownTalkInput='';state.ownTalkTurn=Math.min(state.ownTalkTurn+1,ownTalkPrompts().length);progress.customScene.talkTurns=(progress.customScene.talkTurns||0)+1;saveProgress();haptic(12);render();}
function ownResetTalk(){state.ownTalkHistory=[];state.ownTalkTurn=0;state.ownTalkInput='';render();}
function ownSetGrammarAnchor(which,id){state[which==='a'?'ownGrammarA':'ownGrammarB']=id;render();}
function ownSetGrammarPrep(v){state.ownGrammarPrep=v;render();}

function ownExportPack(id=state.ownSceneId){const s=ownSceneById(id)||ownActiveScene();if(!s)return;const blob=new Blob([JSON.stringify(s,null,2)],{type:'application/json'}),u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=`${ownSafeFileName(s.title)}.scene.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),500);progress.customScene.exports=(progress.customScene.exports||0)+1;saveProgress();toast('Portable Scene Pack exported.');}
function ownImportClick(){document.getElementById('ownSceneImport')?.click();}
async function ownImportPack(e){const f=e.target.files?.[0];if(!f)return;try{if(f.size>8*1024*1024)throw new Error('too-large');const raw=JSON.parse(await f.text());const data=window.EngBookSecurity?.sanitizeScene?.(raw);if(!data)throw new Error('invalid');data.updatedAt=Date.now();if(ownScenes.some(x=>x.id===data.id))data.id=ownId();ownScenes.unshift(data);ownScenes=ownScenes.slice(0,40);if(!ownPersistScenes())return;state.ownSceneId=data.id;state.ownSceneDraft=null;state.ownSubmode='explore';toast('Scene Pack imported safely.');render();}catch(err){toast(err?.message==='too-large'?'Scene Pack is too large. Keep imports under 8 MB.':'That file is not a valid EngBook Scene Pack.');}finally{e.target.value='';}}

function ownSceneStage(scene=ownActiveScene(),build=state.ownSubmode==='build'){if(!scene?.imageData)return '';const selected=(scene.anchors||[]).find(x=>x.id===state.ownSelectedAnchor),coverage=ownCoverageAnalysis(scene);return `<div class="own-stage ${build?'build':''}" data-eng-v52-click="ownStageClick(event)"><img src="${scene.imageData}" alt="${esc(scene.title)}" draggable="false">${(scene.anchors||[]).map((a,i)=>`<button class="own-anchor-marker ${state.ownSelectedAnchor===a.id?'active':''} ${!build&&!state.ownHints?'stealth':''} ${coverage.hits.some(x=>x.id===a.id)?'communicated':''}" style="left:${a.x}%;top:${a.y}%" data-eng-v52-click="event.stopPropagation();${build?`ownEditAnchor('${q(a.id)}')`:`ownSelectAnchor('${q(a.id)}')`}" title="${esc(a.label)}"><i></i><span>${build||state.ownHints||state.ownSelectedAnchor===a.id?esc(a.label):''}</span></button>`).join('')}${state.ownCoverageReveal&&!build?coverage.missing.map(a=>`<div class="own-gap-marker" style="left:${a.x}%;top:${a.y}%"><i></i><span>${esc(a.label)}</span></div>`).join(''):''}${selected&&!build?`<div class="own-float-card"><span>${esc(selected.group)}</span><b>${esc(selected.label)}</b><small>${esc(selected.fact)}</small></div>`:''}<div class="own-stage-badge"><b>${build?'MAP MODE':'YOUR SCENE'}</b><span>${build?'Tap the photo to place an evidence anchor.':`${coverage.hits.length}/${(scene.anchors||[]).length} anchors communicated`}</span></div></div>`;}

function ownUploadLanding(){return `<section class="own-upload-landing"><div class="own-landing-copy"><span class="section-kicker">STEP 10 • BRING YOUR OWN SCENE</span><h1>Your photos can become speaking environments.</h1><p>Import a photo, tap the details that matter, and turn them into a portable Scene Pack. This offline build does <b>not pretend to auto-understand arbitrary images</b>; you map the evidence once, then the same Visual Conversation Engine can practice it.</p><div class="own-trust-row"><span>${icon('eye')} photo stays on this device</span><span>${icon('target')} evidence-first mapping</span><span>${icon('layers')} portable Scene Pack</span></div></div><div class="own-dropzone" data-eng-v52-click="document.getElementById('ownSceneFile').click()" data-eng-v52-dragover="event.preventDefault()" data-eng-v52-drop="ownDrop(event)"><div>${icon('expand')}</div><b>Choose or drop a photo</b><span>JPG • PNG • WEBP</span><small>The image is resized locally before it is saved.</small><input id="ownSceneFile" type="file" accept="image/*" data-eng-v52-change="ownHandleFileInput(event)" hidden></div><button class="own-demo-btn" data-eng-v52-click="ownUseDemo()">Try the Scene Pack workflow with Lesson 01 ${icon('chevron')}</button>${ownLibrary(true)}</section>`;}
function ownLibrary(compact=false){if(!ownScenes.length)return compact?`<div class="own-library-empty"><b>No custom scenes yet.</b><span>Your saved Scene Packs will appear here.</span></div>`:'';return `<section class="own-library ${compact?'compact':''}"><div class="own-library-head"><div><span>${compact?'YOUR LOCAL LIBRARY':'SCENE PACK LIBRARY'}</span><h3>${ownScenes.length} custom scene${ownScenes.length===1?'':'s'} on this device</h3></div>${compact?'':`<button data-eng-v52-click="ownNewScene()">New scene</button>`}</div><div class="own-library-grid">${ownScenes.slice(0,compact?4:12).map(s=>`<article data-eng-v52-click="ownOpenScene('${q(s.id)}','explore')"><img src="${s.imageData}" alt=""><div><span>${(s.anchors||[]).length} anchors</span><b>${esc(s.title)}</b><small>${new Date(s.updatedAt||s.createdAt).toLocaleDateString()}</small></div><button data-eng-v52-click="event.stopPropagation();ownExportPack('${q(s.id)}')">${icon('layers')}</button></article>`).join('')}</div></section>`;}
function ownBuildContent(scene){return `<section class="own-build-layout"><div class="own-build-main"><div class="own-build-toolbar"><div><span>1 • MAP THE EVIDENCE</span><h2>${esc(scene.title||'My Scene')}</h2></div><div><button data-eng-v52-click="document.getElementById('ownReplaceFile').click()">Replace photo</button><input id="ownReplaceFile" type="file" accept="image/*" data-eng-v52-change="ownHandleFileInput(event)" hidden><button class="primary" data-eng-v52-click="ownSaveScene()">Save Scene Pack ${icon('check')}</button></div></div>${ownSceneStage(scene,true)}<div class="own-map-help"><b>Tap a meaningful detail — not every pixel.</b><span>Map subjects, actions, objects, setting, light, and a few useful details. Each anchor becomes vocabulary, evidence, coverage, grammar, and conversation material.</span></div></div><aside class="own-build-side">${ownAnchorForm()||`<div class="own-scene-meta"><span>SCENE SETUP</span><label><b>Title</b><input value="${esc(scene.title||'')}" data-eng-v52-input="ownSetMeta('title',this.value)"></label><label><b>Scene overview</b><textarea data-eng-v52-input="ownSetMeta('overview',this.value)" placeholder="One evidence-first overview of the whole image.">${esc(scene.overview||'')}</textarea></label><label><b>Grammar focus</b><select data-eng-v52-change="ownSetMeta('grammarFocus',this.value)">${['Present continuous + spatial language + cautious inference','Present continuous for visible action','Spatial language & prepositions','Cautious inference: may / might / seems','Past → now → next storytelling'].map(x=>`<option ${scene.grammarFocus===x?'selected':''}>${x}</option>`).join('')}</select></label><label><b>Supported inferences</b><textarea data-eng-v52-input="ownSetInferenceText(this.value)" placeholder="One cautious inference per line.">${esc((scene.inferences||[]).join('\n'))}</textarea></label><label><b>Guardrails / unsupported claims</b><textarea data-eng-v52-input="ownSetGuardrailText(this.value)" placeholder="One phrase per line: exact identity, motive, diagnosis…">${esc((scene.guardrails||[]).join('\n'))}</textarea></label><div class="own-anchor-count"><b>${(scene.anchors||[]).length}</b><span>visual anchors mapped</span></div></div>`}<div class="own-anchor-list"><span>MAPPED ANCHORS</span>${(scene.anchors||[]).length?(scene.anchors||[]).map(a=>`<button data-eng-v52-click="ownEditAnchor('${q(a.id)}')"><i class="group-${a.group.toLowerCase()}"></i><span><b>${esc(a.label)}</b><small>${esc(a.group)} • ${esc(a.fact)}</small></span>${icon('chevron')}</button>`).join(''):'<p>Tap the photo to add the first anchor.</p>'}</div></aside></section>`;}
function ownExploreContent(scene){const a=(scene.anchors||[]).find(x=>x.id===state.ownSelectedAnchor);return `<section class="own-practice-layout"><div><div class="own-practice-head"><div><span>TOUCH → LANGUAGE</span><h2>Explore your own scene</h2><p>Tap an anchor to hear its name and open the evidence-aware language card.</p></div><button data-eng-v52-click="state.ownHints=!state.ownHints;render()">${state.ownHints?'Hide labels':'Show labels'}</button></div>${ownSceneStage(scene,false)}</div><aside class="own-practice-card">${a?`<span>${esc(a.group)}</span><h3>${esc(a.label)}</h3><p>${esc(a.fact)}</p><div class="own-lang-block"><small>USEFUL PHRASE</small><b>${esc(a.phrase||a.label)}</b></div><div class="own-lang-block"><small>GRAMMAR / MODEL LINE</small><b>${esc(a.grammar||a.fact)}</b></div><div class="own-card-actions"><button data-eng-v52-click="speak('${q(a.label)}',.84)">${icon('volume')} Word</button><button data-eng-v52-click="speak('${q(a.grammar||a.fact)}',.84)">${icon('volume')} Sentence</button></div>`:`<div class="own-empty-card">${icon('compass')}<h3>Touch the scene</h3><p>Select one mapped point to turn a visual detail into vocabulary, evidence, and a sentence.</p></div>`}</aside></section>`;}
function ownDescribeContent(scene){const c=ownCoverageAnalysis(scene);return `<section class="own-practice-layout own-describe"><div><div class="own-practice-head"><div><span>LIVE MEANING TRANSFER</span><h2>Describe it. Watch the scene fill in.</h2><p>Coverage is based on your mapped anchors and aliases — not on word count.</p></div><div class="own-live-score"><b>${c.pct}%</b><span>scene coverage</span></div></div>${ownSceneStage(scene,false)}<div class="own-group-bars">${Object.entries(c.groups).map(([g,v])=>`<div><span>${g}</span><i><em style="width:${v.total?v.hit/v.total*100:0}%"></em></i><b>${v.hit}/${v.total}</b></div>`).join('')}</div></div><aside class="own-input-panel"><span>YOUR DESCRIPTION</span><textarea data-eng-v52-input="ownSetTranscript(this.value)" placeholder="Describe what a listener should picture…">${esc(state.ownTranscript)}</textarea><div class="own-input-actions"><button class="${state.ownListening&&state.ownVoiceTarget==='describe'?'listening':''}" data-eng-v52-click="${state.ownListening?'ownStopSpeech();render()':`ownStartSpeech('describe')`}">${icon('mic')} ${state.ownListening?'Stop':'Speak'}</button><button data-eng-v52-click="ownCaptureDescription()">Analyze coverage ${icon('target')}</button></div><div class="own-next-details"><span>NEXT HIGH-VALUE DETAILS</span>${c.missing.slice(0,5).map(a=>`<button data-eng-v52-click="ownSelectAnchor('${q(a.id)}')">${esc(a.label)}</button>`).join('')||'<b>Great — every mapped anchor has been communicated.</b>'}</div><button class="own-gap-btn" data-eng-v52-click="state.ownCoverageReveal=!state.ownCoverageReveal;render()">${state.ownCoverageReveal?'Hide visual gaps':'Show missing details on photo'}</button><small class="own-score-note">Scene Coverage is a scene-transfer metric, not CEFR, fluency, or pronunciation scoring.</small></aside></section>`;}
function ownEvidenceContent(scene){const e=ownEvidenceAnalysis(scene);return `<section class="own-evidence-studio"><div class="own-practice-head"><div><span>SCENE-PACK EVIDENCE ENGINE</span><h2>Fact, cautious inference, or claim that needs review?</h2><p>This local engine checks your statements against the evidence anchors, supported inferences, and guardrails you mapped. It is not a general visual truth detector.</p></div><div class="own-live-score"><b>${e.control}%</b><span>evidence control</span></div></div><div class="own-evidence-grid"><div>${ownSceneStage(scene,false)}</div><aside class="own-input-panel"><span>STATEMENTS TO CHECK</span><textarea data-eng-v52-input="state.ownEvidenceText=this.value" placeholder="Write one or more statements about your photo…">${esc(state.ownEvidenceText||state.ownTranscript)}</textarea><div class="own-input-actions"><button class="${state.ownListening&&state.ownVoiceTarget==='evidence'?'listening':''}" data-eng-v52-click="${state.ownListening?'ownStopSpeech();render()':`ownStartSpeech('evidence')`}">${icon('mic')} ${state.ownListening?'Stop':'Speak'}</button><button data-eng-v52-click="ownCheckEvidence()">Check claims ${icon('eye')}</button></div><div class="own-engine-contract"><b>Evidence contract</b><span>Mapped anchor → directly supported</span><span>Mapped inference + may/might → cautious</span><span>Guardrail phrase → unsupported</span><span>Anything else → needs human/AI review</span></div></aside></div><div class="own-claim-list">${e.items.length?e.items.map(x=>`<article class="${x.kind}"><span>${esc(x.label)}</span><b>${esc(x.sentence)}</b><p>${esc(x.note)}</p></article>`).join(''):`<div class="own-claims-empty">Add statements above to inspect their evidence status.</div>`}</div></section>`;}
function ownGrammarContent(scene){const A=scene.anchors||[],a=A.find(x=>x.id===state.ownGrammarA)||A[0],b=A.find(x=>x.id===state.ownGrammarB)||A[1]||A[0],generated=a&&b?`${a.label} is ${state.ownGrammarPrep} ${b.label}.`:'';const action=A.filter(x=>x.group==='Action'),fact=A[0],inf=(scene.inferences||[])[0];return `<section class="own-grammar-studio"><div class="own-practice-head"><div><span>VISUAL GRAMMAR FROM YOUR SCENE</span><h2>Make grammar point back to the picture.</h2><p>${esc(scene.grammarFocus||'Present continuous + spatial language + cautious inference')}</p></div></div><div class="own-grammar-grid"><article><span>ACTION</span><h3>Present continuous</h3>${action.length?action.slice(0,3).map(x=>`<button data-eng-v52-click="speak('${q(x.grammar||x.fact)}',.84)"><b>${esc(x.grammar||x.fact)}</b>${icon('volume')}</button>`).join(''):`<p>Add an Action anchor in Build mode to generate action practice.</p>`}</article><article><span>SPACE</span><h3>Build a relation</h3><div class="own-grammar-pickers"><div>${A.slice(0,8).map(x=>`<button class="${a?.id===x.id?'active':''}" data-eng-v52-click="ownSetGrammarAnchor('a','${q(x.id)}')">${esc(x.label)}</button>`).join('')}</div><div>${['beside','near','behind','in front of','above','below'].map(x=>`<button class="${state.ownGrammarPrep===x?'active':''}" data-eng-v52-click="ownSetGrammarPrep('${x}')">${x}</button>`).join('')}</div><div>${A.slice(0,8).map(x=>`<button class="${b?.id===x.id?'active':''}" data-eng-v52-click="ownSetGrammarAnchor('b','${q(x.id)}')">${esc(x.label)}</button>`).join('')}</div></div><div class="own-generated-line"><b>${esc(generated)}</b><button data-eng-v52-click="speak('${q(generated)}',.84)">${icon('volume')}</button></div></article><article><span>EVIDENCE LANGUAGE</span><h3>Fact → inference</h3>${fact?`<p><i>VISIBLE</i>${esc(fact.fact)}</p>`:''}${inf?`<p><i>INFERENCE</i>${esc(inf)}</p><small>Use may / might / seems / appears when the statement goes beyond direct visual evidence.</small>`:'<p>Add a supported inference in Build mode to generate this contrast.</p>'}</article></div></section>`;}
function ownTalkContent(scene){const P=ownTalkPrompts(scene),done=state.ownTalkTurn>=P.length,prompt=ownTalkPrompt();return `<section class="own-talk-studio"><div class="own-talk-context">${ownSceneStage(scene,false)}</div><div class="own-talk-panel"><div class="own-talk-head"><div><span>SCENE CONVERSATION</span><h2>${done?'Conversation complete':'Turn '+(state.ownTalkTurn+1)+' of '+P.length}</h2></div><button data-eng-v52-click="ownResetTalk()">Reset</button></div><div class="own-thread">${state.ownTalkHistory.map(x=>`<div class="coach"><small>COACH</small><b>${esc(x.prompt)}</b></div><div class="learner"><small>YOU</small><p>${esc(x.answer)}</p></div><div class="repair"><small>SCENE COACH</small><p>${esc(x.feedback)}</p></div>`).join('')}${!done?`<div class="coach current"><small>COACH</small><b>${esc(prompt)}</b><button data-eng-v52-click="speak('${q(prompt)}',.86)">${icon('volume')} Hear</button></div>`:`<div class="own-talk-done">${icon('check')}<h3>You turned a personal photo into a five-turn visual conversation.</h3><p>The prompts came from the Scene Pack you created, not from a fixed Lesson 01 script.</p></div>`}</div>${!done?`<div class="own-talk-input"><textarea data-eng-v52-input="state.ownTalkInput=this.value" placeholder="Answer from the image…">${esc(state.ownTalkInput)}</textarea><button class="${state.ownListening&&state.ownVoiceTarget==='talk'?'listening':''}" data-eng-v52-click="${state.ownListening?'ownStopSpeech();render()':`ownStartSpeech('talk')`}">${icon('mic')}</button><button data-eng-v52-click="ownSubmitTalk()">Send ${icon('chevron')}</button></div>`:''}</div></section>`;}
function ownPackContent(scene){return `<section class="own-pack-studio"><div class="own-pack-hero"><div><span class="section-kicker">PORTABLE SCENE PACK</span><h2>Your photo is now a reusable learning object.</h2><p>The exported JSON contains the resized image, visual anchors, aliases, visible-evidence notes, supported inferences, guardrails, and grammar focus.</p><div class="own-pack-actions"><button data-eng-v52-click="ownExportPack()">Export .scene.json ${icon('layers')}</button><button class="secondary" data-eng-v52-click="ownImportClick()">Import Scene Pack</button><input id="ownSceneImport" type="file" accept="application/json,.json" data-eng-v52-change="ownImportPack(event)" hidden></div></div><div class="own-pack-stats"><div><b>${(scene.anchors||[]).length}</b><span>anchors</span></div><div><b>${(scene.inferences||[]).length}</b><span>inferences</span></div><div><b>${(scene.guardrails||[]).length}</b><span>guardrails</span></div></div></div><div class="own-schema-grid"><article><span>WHAT WORKS NOW • OFFLINE</span><h3>Manual / assisted Scene Forge</h3><p>Upload → tap anchors → add evidence → Describe → Evidence → Grammar → Conversation. Everything runs without pretending the browser has an AI vision model.</p></article><article><span>AI-READY ADAPTER</span><h3>Automatic analysis can plug into the same schema later.</h3><p>A future analyzer only needs to return the Scene Pack contract: anchors with coordinates, aliases, evidence notes, supported inferences, guardrails, and learning targets.</p><button disabled>AI auto-analyze • backend not connected</button></article><article><span>PRIVACY</span><h3>Local-first by default</h3><p>In this prototype, imported photos are resized in your browser and stored locally. They are not uploaded anywhere by this app.</p></article></div>${ownLibrary(false)}</section>`;}
function ownStudioTabs(){const tabs=[['build','Build'],['explore','Explore'],['describe','Describe'],['evidence','Evidence'],['grammar','Grammar'],['talk','Converse'],['pack','Pack']];return `<div class="own-studio-tabs">${tabs.map(([k,t])=>`<button class="${state.ownSubmode===k?'active':''}" data-eng-v52-click="ownSetSubmode('${k}')">${t}</button>`).join('')}</div>`;}
function ownSceneContent(){const scene=ownActiveScene();if(!scene)return ownUploadLanding();return `<section class="own-scene-studio"><div class="own-scene-titlebar"><div><span class="section-kicker">STEP 10 • BRING YOUR OWN SCENE</span><h1>${esc(scene.title||'My Scene')}</h1><p>${state.ownSubmode==='build'?'Build the evidence map once; every other activity is generated from it.':'Your own photo is running inside the Visual Conversation Engine.'}</p></div><div><button data-eng-v52-click="ownEditCurrent()">Edit map</button><button data-eng-v52-click="ownNewScene()">New scene</button></div></div>${ownStudioTabs()}${state.ownSubmode==='build'?ownBuildContent(scene):state.ownSubmode==='explore'?ownExploreContent(scene):state.ownSubmode==='describe'?ownDescribeContent(scene):state.ownSubmode==='evidence'?ownEvidenceContent(scene):state.ownSubmode==='grammar'?ownGrammarContent(scene):state.ownSubmode==='talk'?ownTalkContent(scene):ownPackContent(scene)}</section>`;}

function renderOwnSceneShell(){clearTimer();stopRecognition();stopPronRecognition();stopConversationRecognition();const scene=ownActiveScene();app.innerHTML=`<div class="app-shell lesson-shell own-scene-shell">${topbar()}<main class="own-scene-main">${ownSceneContent()}</main>${bottomNav()}<div class="toast" id="toast"></div></div>`;}

// Step 10 becomes the twelfth product mode. It is intentionally separate from
// Lesson 01 scoring: it proves that the Scene Engine can move to user photos.
const _v17RenderLessonForOwn=renderLesson;
renderLesson=function(){if(state.mode==='ownscene')return renderOwnSceneShell();return _v17RenderLessonForOwn();};
const _v17ModeContentForOwn=modeContent;
modeContent=function(){if(state.mode==='ownscene')return '';return _v17ModeContentForOwn();};
modeTabs=function(){
  const modes=[['explore','compass','Explore'],['learn','book','Learn'],['practice','target','Recall'],['speak','mic','Describe'],['talk','spark','Converse'],['reconstruct','layers','Rebuild'],['timeline','refresh','Time'],['grammar','book','Grammar'],['camera','expand','Camera'],['level','spark','Level'],['fingerprint','target','Profile'],['ownscene','layers','My Scene']];
  return `<div class="mode-tabs twelve-modes">${modes.map(([m,ic,t])=>`<button class="${state.mode===m?'active':''}" data-eng-v52-click="setMode('${m}')">${icon(ic)}<span>${t}</span></button>`).join('')}</div>`;
};
bottomNav=function(){
  const items=[['explore','compass','Explore'],['learn','book','Learn'],['practice','target','Recall'],['speak','mic','Describe'],['talk','spark','Talk'],['reconstruct','layers','Rebuild'],['timeline','refresh','Time'],['grammar','book','Grammar'],['camera','expand','Camera'],['level','spark','Level'],['fingerprint','target','Profile'],['ownscene','layers','My Scene']];
  return `<nav class="bottom-nav twelve-nav">${items.map(([m,ic,t])=>`<button class="nav-item ${state.mode===m?'active':''}" data-eng-v52-click="setMode('${m}')">${icon(ic)}<span>${t}</span></button>`).join('')}</nav>`;
};
topbar=function(){
  const steps=[['explore','Explore'],['learn','Evidence'],['practice','Recall'],['speak','Describe'],['talk','Converse'],['reconstruct','Rebuild'],['timeline','Time'],['grammar','Grammar'],['camera','Camera'],['level','Level'],['fingerprint','Profile'],['ownscene','My Scene']];
  return `<header class="topbar"><div class="topbar-inner"><button class="round-btn ghost" data-eng-v52-click="goHome()" aria-label="Back">${icon('back')}</button><div class="brand-lockup"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual English Studio</small></div></div><div class="journey-rail twelve-step">${steps.map(([k,t],i)=>{const ck=k==='learn'?'evidence':k==='speak'?'speaking':k;const done=progress.completed[`l1_${ck}`];return `<button data-eng-v52-click="setMode('${k}')" class="${state.mode===k?'active':''} ${done?'done':''}"><i>${done?icon('check'):i+1}</i><span>${t}</span></button>`}).join('')}</div><button class="round-btn ghost help-btn" data-eng-v52-click="showOnboarding(0)" aria-label="Interaction guide">?</button><div class="top-progress"><div><span>${state.mode==='ownscene'?'Engine':'Lesson'}</span><b>${state.mode==='ownscene'?(ownScenes.length?'READY':'BETA'):completion()+'%'}</b></div><div class="progress-line"><i style="width:${state.mode==='ownscene'?(ownScenes.length?100:35):completion()}%"></i></div></div></div></header>`;
};
const _v17SetModeForOwn=setMode;
setMode=function(mode){ownStopSpeech();_v17SetModeForOwn(mode);if(mode==='ownscene'){document.body.classList.remove('reconstruct-hide-photo');if(!state.ownSceneId&&ownScenes.length)state.ownSceneId=ownScenes[0].id;if(!state.ownSubmode)state.ownSubmode=ownScenes.length?'explore':'build';render();}};
const _v17OpenLessonForOwn=openLesson;
openLesson=function(id){_v17OpenLessonForOwn(id);state.ownSubmode=ownScenes.length?'explore':'build';state.ownSceneId=ownScenes[0]?.id||null;state.ownSceneDraft=null;state.ownSelectedAnchor=null;};
completion=function(){const d=discoveredSet().size/activeHotspotCount();const keys=['explore','evidence','practice','speaking','talk','reconstruct','timeline','grammar','camera','level','fingerprint','ownscene'];const done=keys.filter(k=>progress.completed[`l1_${k}`]).length/keys.length;return clamp(Math.round((d*.26+done*.74)*100),0,100);};
const _v17HomeForOwn=renderHome;
renderHome=function(){_v17HomeForOwn();const pill=document.querySelector('.prototype-pill');if(pill)pill.textContent='VISUAL CONVERSATION ENGINE • v0.18 • BRING YOUR OWN SCENE';const grid=document.querySelector('.journey-grid');if(grid&&!grid.querySelector('.journey-ownscene'))grid.insertAdjacentHTML('beforeend',`<article class="journey-item journey-ownscene ${progress.completed.l1_ownscene?'done':''}"><div class="journey-num">${progress.completed.l1_ownscene?icon('check'):'12'}</div><div><b>Bring Your Own Scene</b><p>Import a personal photo, map its evidence anchors, then run coverage, evidence, grammar, and conversation from a portable Scene Pack.</p></div></article>`);const fp=document.querySelector('.fp-home-card');if(fp&&!document.querySelector('.own-home-card'))fp.insertAdjacentHTML('afterend',`<section class="own-home-card"><div class="own-home-visual"><img src="${ownScenes[0]?.imageData||'assets/images/lesson_01.jpg'}" alt=""><div><b>${ownScenes.length||'+'}</b><span>${ownScenes.length?'local Scene Pack'+(ownScenes.length===1?'':'s'):'your photo'}</span></div></div><div class="own-home-copy"><span class="section-kicker">STEP 10 • ENGINE PORTABILITY</span><h3>Turn your own photo into a visual speaking lesson.</h3><p>Local upload → tap-to-map evidence → live scene coverage → claim control → visual grammar → image-based conversation.</p><div><span>${icon('eye')} local-first</span><span>${icon('target')} evidence mapped</span><span>${icon('layers')} exportable pack</span></div></div><button data-eng-v52-click="openLesson(1);setMode('ownscene')">Open Scene Forge ${icon('chevron')}</button></section>`);};
// Initial lesson restoration is owned by EngBookStartup.

/* ========================================================================
   v0.19 — Productization Pass / Product Core
   Goal: keep the full Visual Conversation Engine, but hide complexity behind
   a calm, outcome-first product shell. The learner sees a short daily path;
   advanced tools remain one tap away in Studio Tools.
   ======================================================================== */

state.productMoreOpen = false;
state.productSessionOpen = false;
progress.product = {...{sessions:0,lastSession:0,sessionStage:0,sessionActive:false,minutes:0},...(progress.product||{})};

const PRODUCT_SESSION_STAGES = [
  {key:'retrieve',label:'Retrieve',time:'2 min',mode:'practice',note:'Recall weak visual anchors before you speak.'},
  {key:'describe',label:'Describe',time:'2 min',mode:'speak',note:'Give a 60-second evidence-first description.'},
  {key:'converse',label:'Converse',time:'3 min',mode:'talk',note:'Stay in the scene through a natural follow-up exchange.'},
  {key:'repair',label:'Repair',time:'1 min',mode:'practice',note:'Fix one weak point instead of repeating the whole lesson.'}
];
const PRODUCT_ADVANCED_TOOLS = [
  ['reconstruct','layers','Blind Reconstruction','Can a listener rebuild the scene from your words?'],
  ['timeline','refresh','Scene Time Machine','Practice Before → Now → Next without turning guesses into facts.'],
  ['grammar','book','Visual Grammar','Build grammar from actions and spatial relationships inside the image.'],
  ['camera','expand','Camera Challenge','Describe Micro → Region → Full Scene with frame discipline.'],
  ['level','spark','Level Ladder','Grow the same description from A1–A2 to C1–C2.'],
  ['fingerprint','target','Scene Fingerprint','See eight scene-language signals and the next best drill.'],
  ['ownscene','layers','Scene Forge','Turn a personal photo into a portable speaking lesson.']
];

function productEnsure(){
  progress.product = {...{sessions:0,lastSession:0,sessionStage:0,sessionActive:false,minutes:0},...(progress.product||{})};
  return progress.product;
}
function productStage(){return PRODUCT_SESSION_STAGES[clamp(productEnsure().sessionStage||0,0,PRODUCT_SESSION_STAGES.length-1)];}
function productAdvancedMode(){return PRODUCT_ADVANCED_TOOLS.some(x=>x[0]===state.mode);}
function productOpenMore(){state.productMoreOpen=true;render();}
function productCloseMore(){state.productMoreOpen=false;render();}
function productGo(mode){state.productMoreOpen=false;openLesson(1);setMode(mode);}
function productOpenLearn(){openLesson(1);setMode(discoveredSet().size<4?'explore':'learn');}
function productOpenSpeak(){openLesson(1);state.speakingDuration=60;state.speakingSeconds=60;setMode('speak');}
function productOpenCoach(){openLesson(1);state.conversationMode='natural';state.conversationMission='listener';setMode('talk');}
function productOpenProfile(){openLesson(1);setMode('fingerprint');}

function productStartSession(reset=true){
  const p=productEnsure();
  if(reset||!p.sessionActive)p.sessionStage=0;
  p.sessionActive=true;p.lastSession=Date.now();progress.product=p;saveProgress();
  state.productSessionOpen=true;
  productLaunchStage();
}
function productLaunchStage(){
  const p=productEnsure(),s=PRODUCT_SESSION_STAGES[p.sessionStage||0];if(!s)return productFinishSession();
  openLesson(1);
  if(s.key==='retrieve'){setMode('practice');setPractice('smart');}
  else if(s.key==='describe'){state.speakingDuration=60;state.speakingSeconds=60;setMode('speak');}
  else if(s.key==='converse'){state.conversationMode='natural';state.conversationMission='listener';setMode('talk');}
  else {setMode('practice');setPractice((progress.mistakes||[]).length?'mistakes':'smart');}
}
function productNextStage(){
  const p=productEnsure();
  if(!p.sessionActive)return productStartSession(true);
  if((p.sessionStage||0)>=PRODUCT_SESSION_STAGES.length-1)return productFinishSession();
  p.sessionStage=(p.sessionStage||0)+1;progress.product=p;saveProgress();haptic(14);productLaunchStage();
}
function productFinishSession(){
  const p=productEnsure();p.sessionActive=false;p.sessionStage=0;p.sessions=(p.sessions||0)+1;p.minutes=(p.minutes||0)+8;p.lastSession=Date.now();progress.product=p;awardPoints(12,'focus-session');saveProgress();state.productSessionOpen=false;haptic([12,20,26]);toast('8-minute scene session complete.');renderHome();
}
function productStopSession(){const p=productEnsure();p.sessionActive=false;p.sessionStage=0;progress.product=p;saveProgress();state.productSessionOpen=false;render();}

function productSessionDock(){
  const p=productEnsure();if(!p.sessionActive||state.mode==='ownscene')return '';
  const idx=p.sessionStage||0,s=PRODUCT_SESSION_STAGES[idx];
  return `<section class="product-session-dock"><div class="psd-head"><div><span>FOCUS SESSION • ${idx+1}/4</span><b>${s.label} · ${s.time}</b><small>${s.note}</small></div><button data-eng-v52-click="productStopSession()">Exit</button></div><div class="psd-rail">${PRODUCT_SESSION_STAGES.map((x,i)=>`<i class="${i<idx?'done':i===idx?'active':''}"><em>${i<idx?icon('check'):i+1}</em><span>${x.label}</span></i>`).join('')}</div><button class="psd-next" data-eng-v52-click="productNextStage()">${idx===3?'Finish session':'Done — next'} ${icon('chevron')}</button></section>`;
}

function productToolDrawer(){
  if(!state.productMoreOpen)return '';
  return `<div class="product-drawer-backdrop" data-eng-v52-click="if(event.target===this)productCloseMore()"><aside class="product-drawer"><div class="product-drawer-head"><div><span>STUDIO TOOLS</span><h2>Go deeper when you need it.</h2><p>The daily path stays simple. These specialist tools train one communication skill at a time.</p></div><button data-eng-v52-click="productCloseMore()">${icon('close')}</button></div><div class="product-tool-grid">${PRODUCT_ADVANCED_TOOLS.map(([m,ic,t,d])=>`<button class="${state.mode===m?'active':''}" data-eng-v52-click="productGo('${m}')"><i>${icon(ic)}</i><span><b>${t}</b><small>${d}</small></span>${icon('chevron')}</button>`).join('')}</div><div class="product-drawer-note"><i>${icon('spark')}</i><div><b>Product principle</b><span>Advanced modes are tools, not twelve competing destinations. Start with the daily path unless you have a specific weakness to train.</span></div></div></aside></div>`;
}

function productPrimaryTabs(){
  const primary=[['explore','compass','Explore'],['learn','book','Learn'],['practice','target','Recall'],['speak','mic','Describe'],['talk','spark','Converse']];
  if(productAdvancedMode()){
    const meta=PRODUCT_ADVANCED_TOOLS.find(x=>x[0]===state.mode);
    return `<div class="product-mode-tabs"><button data-eng-v52-click="setMode('explore')">${icon('compass')}<span>Core lesson</span></button><button class="active studio-current" data-eng-v52-click="productOpenMore()">${icon(meta?.[1]||'layers')}<span>${esc(meta?.[2]||'Studio tool')}</span></button><button data-eng-v52-click="productOpenMore()">${icon('layers')}<span>All tools</span></button></div>`;
  }
  return `<div class="product-mode-tabs">${primary.map(([m,ic,t])=>`<button class="${state.mode===m?'active':''}" data-eng-v52-click="setMode('${m}')">${icon(ic)}<span>${t}</span></button>`).join('')}<button data-eng-v52-click="productOpenMore()">${icon('layers')}<span>Studio</span></button></div>`;
}

// Replace the 12-way mode strip with a calm core path + Studio drawer.
modeTabs=function(){return productPrimaryTabs();};
bottomNav=function(){
  const learnActive=['explore','learn','practice'].includes(state.mode),speakActive=state.mode==='speak',coachActive=state.mode==='talk',moreActive=productAdvancedMode();
  return `<nav class="bottom-nav product-bottom-nav"><button data-eng-v52-click="goHome()">${icon('home')}<span>Home</span></button><button class="${learnActive?'active':''}" data-eng-v52-click="productOpenLearn()">${icon('book')}<span>Learn</span></button><button class="${speakActive?'active':''}" data-eng-v52-click="productOpenSpeak()">${icon('mic')}<span>Describe</span></button><button class="${coachActive?'active':''}" data-eng-v52-click="productOpenCoach()">${icon('spark')}<span>Coach</span></button><button class="${moreActive?'active':''}" data-eng-v52-click="productOpenMore()">${icon('layers')}<span>More</span></button></nav>`;
};
topbar=function(){
  const advanced=productAdvancedMode(),meta=PRODUCT_ADVANCED_TOOLS.find(x=>x[0]===state.mode);
  return `<header class="topbar product-topbar"><div class="topbar-inner"><button class="round-btn ghost" data-eng-v52-click="goHome()" aria-label="Home">${icon('back')}</button><div class="brand-lockup"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual Conversation</small></div></div><div class="product-scene-title"><span>${advanced?'STUDIO TOOL':'LESSON 01'}</span><b>${advanced?esc(meta?.[2]||'Advanced practice'):'Two Adults Walking on a Beach in Warm Low Sunlight'}</b></div><div class="product-top-actions"><button data-eng-v52-click="productOpenProfile()"><span>Scene signal</span><b>${fpProfile().balance}</b></button><button class="round-btn ghost" data-eng-v52-click="productOpenMore()" aria-label="Studio tools">${icon('layers')}</button></div></div></header>`;
};

const _v18RenderLessonProduct = renderLesson;
renderLesson=function(){
  _v18RenderLessonProduct();
  if(state.screen!=='home'&&state.mode!=='ownscene'){
    const viewer=document.querySelector('.viewer-column');if(viewer&&!viewer.querySelector('.product-session-dock')&&productEnsure().sessionActive)viewer.insertAdjacentHTML('afterbegin',productSessionDock());
  }
  const shell=document.querySelector('.app-shell');if(shell&&!shell.querySelector('.product-drawer-backdrop'))shell.insertAdjacentHTML('beforeend',productToolDrawer());
};

function productMiniSkill(){
  const p=fpProfile(),dims=[...p.dims].sort((a,b)=>b.score-a.score),strong=dims[0],weak=dims[dims.length-1],pat=fpPattern(p);
  return `<section class="product-skill-snapshot"><div class="product-radar-mini">${fpRadar(p,true)}<div><b>${p.balance}</b><span>scene<br>balance</span></div></div><div class="product-skill-copy"><span>YOUR SCENE FINGERPRINT</span><h3>${pat[0]}</h3><p>${esc(pat[1])}</p><div class="product-skill-pills"><i><span>Strongest</span><b>${strong.label} · ${strong.score}</b></i><i><span>Train next</span><b>${weak.label} · ${weak.score}</b></i><i><span>Data confidence</span><b>${p.confidence}%</b></i></div></div><button data-eng-v52-click="productOpenProfile()">Open profile ${icon('chevron')}</button></section>`;
}
function productTodayPlan(){
  const p=productEnsure(),active=p.sessionActive,stage=PRODUCT_SESSION_STAGES[p.sessionStage||0];
  return `<section class="product-today"><div class="product-today-head"><div><span>TODAY • 8 MINUTES</span><h2>${active?`Continue with ${stage.label}`:'One scene. Four useful moves.'}</h2><p>${active?stage.note:'Retrieve what is weak, describe the scene, hold a short conversation, then repair one gap.'}</p></div><button data-eng-v52-click="productStartSession(${active?'false':'true'})">${active?'Resume session':'Start focus session'} ${icon('play')}</button></div><div class="product-plan-rail">${PRODUCT_SESSION_STAGES.map((s,i)=>`<article class="${active&&i===(p.sessionStage||0)?'active':''}"><i>${i+1}</i><div><b>${s.label}</b><span>${s.time}</span><small>${s.note}</small></div></article>`).join('')}</div><div class="product-history-line"><span>${p.sessions||0} completed focus sessions</span><span>${p.minutes||0} focused minutes</span><span>${dueAnchors().length} visual anchors due</span></div></section>`;
}
function productHomeHero(){
  const pct=completion(),r=recommendedAction(),cov=progress.coverage?.best||0,ev=progress.evidence?.best||0;
  return `<section class="product-hero"><div class="product-hero-photo"><img src="assets/images/lesson_01.jpg" alt="Two Adults Walking on a Beach in Warm Low Sunlight"><div class="product-hero-shade"></div><div class="product-hero-copy"><span>CATEGORY 01 • LESSON 01</span><h1>See more.<br>Say more.</h1><p>Use one image to build precise observation, connected description, and real conversation.</p><div><button data-eng-v52-click="productStartSession(true)">Start today’s session ${icon('chevron')}</button><button class="secondary" data-eng-v52-click="productOpenSpeak()">Free describe ${icon('mic')}</button></div></div><div class="product-live-badge"><i></i><span>Visual Conversation Engine</span></div></div><aside class="product-hero-side"><div class="product-resume"><span>NEXT BEST MOVE</span><h3>${esc(r.title)}</h3><p>${esc(r.body)}</p><button data-eng-v52-click="openRecommended()">Continue ${icon('chevron')}</button></div><div class="product-kpis"><div><b>${pct}%</b><span>lesson path</span></div><div><b>${cov}%</b><span>best coverage</span></div><div><b>${ev}%</b><span>evidence control</span></div></div><div class="product-engine-line"><span>Describe what is visible</span><i></i><span>Infer carefully</span><i></i><span>Keep talking</span></div></aside></section>`;
}
function productSceneForgeCard(){
  const count=ownScenes.length,thumb=ownScenes[0]?.imageData||'assets/images/lesson_01.jpg';
  return `<section class="product-forge-card"><div class="product-forge-thumb"><img src="${thumb}" alt=""><span>${count?count:'+'}</span></div><div><span>SCENE FORGE</span><h3>Turn your own photo into a speaking environment.</h3><p>${count?`${count} local Scene Pack${count===1?'':'s'} ready on this device.`:'Map a few meaningful visual anchors once, then run coverage, evidence, grammar, and conversation.'}</p></div><button data-eng-v52-click="productGo('ownscene')">${count?'Open my scenes':'Build a scene'} ${icon('chevron')}</button></section>`;
}
function productAdvancedPreview(){
  const choices=[PRODUCT_ADVANCED_TOOLS[0],PRODUCT_ADVANCED_TOOLS[2],PRODUCT_ADVANCED_TOOLS[4]];
  return `<section class="product-studio-preview"><div class="product-section-head"><div><span>STUDIO TOOLS</span><h2>Specialist practice without a cluttered home screen.</h2></div><button data-eng-v52-click="productOpenMore()">View all tools ${icon('chevron')}</button></div><div>${choices.map(([m,ic,t,d])=>`<button data-eng-v52-click="productGo('${m}')"><i>${icon(ic)}</i><span><b>${t}</b><small>${d}</small></span>${icon('chevron')}</button>`).join('')}</div></section>`;
}

renderHome=function(){
  clearTimer();stopRecognition();stopPronRecognition();stopConversationRecognition();ownStopSpeech();state.screen='home';state.lesson=null;const m=ensureMomentum();
  app.innerHTML=`<div class="app-shell product-home-shell"><header class="product-home-top"><div class="brand-lockup dark"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual Conversation</small></div></div><div class="product-home-meta"><span>${m.days||1} day${(m.days||1)===1?'':'s'} active</span><i></i><span>Lesson 01 prototype</span><button data-eng-v52-click="showOnboarding(0)">?</button></div></header><main class="product-home-main">${productHomeHero()}${productTodayPlan()}${productMiniSkill()}${productSceneForgeCard()}${productAdvancedPreview()}<section class="product-philosophy"><i>${icon('eye')}</i><div><span>THE PRODUCT PROMISE</span><h3>The picture is not decoration. It is the learning environment.</h3><p>Observe → identify evidence → describe → reconstruct meaning → converse. Advanced tools appear only when they help that journey.</p></div></section></main>${state.onboardingOpen?onboardingOverlay():''}${productToolDrawer()}<div class="toast" id="toast"></div></div>`;
};

goHome=function(){state.photoFocus=false;state.peek=false;state.productMoreOpen=false;stopPronRecognition();stopConversationRecognition();renderHome();window.scrollTo({top:0,behavior:'instant'});};

// Keep URL mode support, but the product shell no longer exposes twelve competing tabs.
window.addEventListener('load',()=>{const p=new URLSearchParams(location.search);if(p.get('product')==='session')setTimeout(()=>productStartSession(true),40);});

/* ========================================================================
   v0.20 — Commercial UX / Design System / AI Adapter readiness
   Product rule: reduce visible complexity without removing engine depth.
   No remote AI result is fabricated; the adapter reports disconnected until
   a real backend URL is configured.
   ======================================================================== */

const V20_ONBOARD_KEY='engbook_v20_commercial_onboarded';
state.commercialBuild=BUILD_INFO.tag;
state.engineInfoOpen=false;

function commercialPrefersReducedMotion(){return !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;}
function commercialTransition(fn){
  // Canvas controls replace the whole lesson DOM. Run their update immediately
  // so another tap cannot hit an old mode beneath a pending view-transition.
  if(window.EngBookSceneCanvas?.active?.())return fn();
  if(document.startViewTransition&&!commercialPrefersReducedMotion()){
    try{return document.startViewTransition(()=>fn());}catch(e){return fn();}
  }
  return fn();
}
function commercialAIStatus(){
  try{return window.EngBookAI?.status?.()||{adapter:'missing',backend:'not-connected',mode:'local-only',transport:'unknown'};}
  catch(e){return {adapter:'error',backend:'not-connected',mode:'local-only',transport:'unknown'};}
}
function commercialSpeechStatus(){return speechRecognitionCtor()?'available':'typed fallback';}
async function commercialPingAI(){
  if(!window.EngBookAI){toast('AI adapter is not loaded.');return;}
  const s=window.EngBookAI.status();
  if(s.backend!=='configured'){toast('AI adapter is ready; no backend is connected.');return;}
  toast('Checking AI backend…');
  const r=await window.EngBookAI.ping();
  toast(r.ok?'AI backend is reachable.':'AI backend is not reachable.');render();
}

/* Three-screen commercial onboarding: product promise first, gestures later. */
showOnboarding=function(step=0){state.onboardingStep=clamp(step,0,2);state.onboardingOpen=true;render();};
closeOnboarding=function(){state.onboardingOpen=false;localStorage.setItem(ONBOARD_KEY,'1');localStorage.setItem(V20_ONBOARD_KEY,'1');render();};
nextOnboarding=function(){if(state.onboardingStep>=2){closeOnboarding();return;}state.onboardingStep++;render();};
prevOnboarding=function(){state.onboardingStep=Math.max(0,state.onboardingStep-1);render();};
function commercialFinishOnboarding(startSession=false){
  state.onboardingOpen=false;localStorage.setItem(ONBOARD_KEY,'1');localStorage.setItem(V20_ONBOARD_KEY,'1');render();
  if(startSession)setTimeout(()=>productStartSession(true),80);
}
onboardingOverlay=function(){
  const steps=[
    {k:'SEE',title:'The picture is the lesson.',body:'Touch meaningful parts of the scene. Words, phrases, actions, and spatial language stay attached to the visual evidence instead of living in a separate vocabulary list.',visual:`<div class="v20-ob-scene"><img src="assets/images/lesson_01.jpg" alt="Lesson 01"><i style="left:31%;top:55%"></i><i style="left:66%;top:41%"></i><span style="left:31%;top:55%">holding hands</span><span style="left:66%;top:41%">low sun</span></div>`},
    {k:'SAY',title:'Speak until the listener can picture it.',body:'As you describe, Live Scene Coverage tracks which important parts of the scene your words actually communicate. Missing detail becomes your next useful target — not a generic score.',visual:`<div class="v20-ob-coverage"><div><b>68%</b><span>scene communicated</span></div><section><i class="hit">people</i><i class="hit">walking</i><i class="hit">beach</i><i>reflection</i><i>footprints</i></section></div>`},
    {k:'TRUST',title:'Visible fact first. Inference second.',body:'EngBook keeps direct visual evidence, cautious inference, and unsupported certainty separate. That is the product discipline behind every description, conversation, and future AI connection.',visual:`<div class="v20-ob-evidence"><article class="fact"><b>✓ VISIBLE FACT</b><span>They are holding hands.</span></article><article class="infer"><b>◐ SUPPORTED INFERENCE</b><span>They seem close.</span></article><article class="warn"><b>! UNSUPPORTED CLAIM</b><span>They are on their honeymoon.</span></article></div>`}
  ];
  const st=steps[state.onboardingStep]||steps[0],last=state.onboardingStep===2;
  return `<div class="onboarding-backdrop v20-onboarding" role="presentation"><div class="onboarding-card v20-onboarding-card" role="dialog" aria-modal="true" aria-labelledby="engbook-onboarding-title"><button class="ob-close" data-eng-v52-click="commercialFinishOnboarding(false)" aria-label="Close">${icon('close')}</button><div class="v20-ob-brand"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual Conversation</small></div></div><div class="ob-progress">${steps.map((_,i)=>`<i class="${i<=state.onboardingStep?'active':''}"></i>`).join('')}</div><span class="section-kicker">${st.k} • ${state.onboardingStep+1}/3</span><h2 id="engbook-onboarding-title">${st.title}</h2><p>${st.body}</p>${st.visual}<div class="ob-actions"><button class="secondary" data-eng-v52-click="prevOnboarding()" ${state.onboardingStep===0?'disabled':''}>Back</button><button class="primary" data-eng-v52-click="${last?'commercialFinishOnboarding(true)':'nextOnboarding()'}">${last?'Start 8-minute session':'Next'}</button></div><button class="ob-skip" data-eng-v52-click="commercialFinishOnboarding(false)">${last?'Explore on my own':'Skip intro'}</button></div></div>`;
};

/* Smooth navigation where supported. */
const _v19SetModeForCommercial=setMode;
setMode=function(mode){return commercialTransition(()=>_v19SetModeForCommercial(mode));};
const _v19GoHomeForCommercial=goHome;
goHome=function(){return commercialTransition(()=>_v19GoHomeForCommercial());};

function commercialTrustBar(){
  const ai=commercialAIStatus();
  return `<section class="v20-trust-bar"><div><i>${icon('eye')}</i><span><b>Evidence-first</b><small>Visible facts stay separate from inference.</small></span></div><div><i>${icon('target')}</i><span><b>Meaning transfer</b><small>Coverage measures what the listener can reconstruct.</small></span></div><div><i>${icon('layers')}</i><span><b>Local-first</b><small>Lesson engine works without a remote AI service.</small></span></div><div class="engine"><em></em><span><b>AI adapter ${ai.adapter==='ready'?'ready':'status'}</b><small>${ai.backend==='configured'?'Backend configured':'Backend not connected — no fake AI output.'}</small></span></div></section>`;
}

productHomeHero=function(){
  const pct=completion(),r=recommendedAction(),cov=progress.coverage?.best||0,ev=progress.evidence?.best||0,p=productEnsure();
  return `<section class="product-hero v20-product-hero"><div class="product-hero-photo"><img src="assets/images/lesson_01.jpg" alt="Two Adults Walking on a Beach in Warm Low Sunlight"><div class="product-hero-shade"></div><div class="product-hero-copy"><span>LESSON 01 • VISUAL CONVERSATION</span><h1>See it.<br>Say it clearly.</h1><p>Learn to describe what the image proves, build careful inferences, and stay in a real conversation about the same scene.</p><div><button class="v20-primary-cta" data-eng-v52-click="productStartSession(true)">${p.sessionActive?'Resume focus session':'Start 8-minute session'} ${icon('chevron')}</button><button class="secondary" data-eng-v52-click="productOpenSpeak()">Free describe ${icon('mic')}</button></div><div class="v20-hero-proof"><span>${icon('eye')} evidence-first</span><span>${icon('mic')} voice + typing</span><span>${icon('target')} adaptive next move</span></div></div><div class="product-live-badge"><i></i><span>Architecture Consolidation • v${BUILD_INFO.version}</span></div></div><aside class="product-hero-side"><div class="product-resume"><span>YOUR NEXT BEST MOVE</span><h3>${esc(r.title)}</h3><p>${esc(r.body)}</p><button data-eng-v52-click="openRecommended()">Continue ${icon('chevron')}</button></div><div class="product-kpis"><div><b>${pct}%</b><span>lesson path</span></div><div><b>${cov}%</b><span>best scene coverage</span></div><div><b>${ev}%</b><span>evidence control</span></div></div><div class="product-engine-line"><span>Observe</span><i></i><span>Describe</span><i></i><span>Converse</span><i></i><span>Repair</span></div></aside></section>`;
};

productTodayPlan=function(){
  const p=productEnsure(),active=p.sessionActive,idx=p.sessionStage||0,stage=PRODUCT_SESSION_STAGES[idx];
  return `<section class="product-today v20-today"><div class="product-today-head"><div><span>TODAY • ONE COMPLETE LOOP</span><h2>${active?`${stage.label} is ready.`:'Eight minutes. One focused scene.'}</h2><p>${active?stage.note:'Retrieve → Describe → Converse → Repair. One useful task at a time, with the specialist tools kept out of the way.'}</p></div><button data-eng-v52-click="productStartSession(${active?'false':'true'})">${active?'Resume':'Start session'} ${icon('play')}</button></div><div class="product-plan-rail v20-plan-rail">${PRODUCT_SESSION_STAGES.map((s,i)=>`<article class="${i<idx&&active?'done':''} ${active&&i===idx?'active':''}"><i>${i<idx&&active?icon('check'):i+1}</i><div><b>${s.label}</b><span>${s.time}</span><small>${s.note}</small></div></article>`).join('')}</div><div class="product-history-line"><span><b>${p.sessions||0}</b> focus sessions</span><span><b>${p.minutes||0}</b> focused minutes</span><span><b>${dueAnchors().length}</b> anchors due</span><span><b>${commercialSpeechStatus()}</b> speech input</span></div></section>`;
};

productSceneForgeCard=function(){
  const count=ownScenes.length,thumb=ownScenes[0]?.imageData||'assets/images/lesson_01.jpg',ai=commercialAIStatus();
  return `<section class="product-forge-card v20-forge-card"><div class="product-forge-thumb"><img src="${thumb}" alt=""><span>${count?count:'+'}</span></div><div><span>SCENE FORGE • LOCAL-FIRST</span><h3>Turn your own photo into a speaking environment.</h3><p>${count?`${count} Scene Pack${count===1?'':'s'} stored locally.`:'Map meaningful visual anchors once, then reuse the photo for coverage, evidence, grammar, and conversation.'}</p><div class="v20-adapter-note"><i class="${ai.backend==='configured'?'online':''}"></i><b>AI adapter ready</b><span>${ai.backend==='configured'?'backend configured':'backend not connected'}</span></div></div><button data-eng-v52-click="productGo('ownscene')">${count?'Open my scenes':'Build a scene'} ${icon('chevron')}</button></section>`;
};

productAdvancedPreview=function(){
  const choices=[PRODUCT_ADVANCED_TOOLS[0],PRODUCT_ADVANCED_TOOLS[2],PRODUCT_ADVANCED_TOOLS[4]];
  return `<section class="product-studio-preview v20-studio-preview"><div class="product-section-head"><div><span>DEEP PRACTICE</span><h2>Use a specialist tool only when you know what you want to train.</h2></div><button data-eng-v52-click="productOpenMore()">Open Studio ${icon('chevron')}</button></div><div>${choices.map(([m,ic,t,d])=>`<button data-eng-v52-click="productGo('${m}')"><i>${icon(ic)}</i><span><b>${t}</b><small>${d}</small></span>${icon('chevron')}</button>`).join('')}</div></section>`;
};

productToolDrawer=function(){
  if(!state.productMoreOpen)return '';
  const ai=commercialAIStatus();
  return `<div class="product-drawer-backdrop v20-drawer-backdrop" role="presentation" data-eng-v52-click="if(event.target===this)productCloseMore()"><aside class="product-drawer v20-product-drawer" role="dialog" aria-modal="true" aria-labelledby="engbook-studio-title"><div class="product-drawer-head"><div><span>STUDIO</span><h2 id="engbook-studio-title">Go deeper without making the core path complicated.</h2><p>Daily learning stays simple. These tools isolate a specific communication skill when you want targeted practice.</p></div><button data-eng-v52-click="productCloseMore()">${icon('close')}</button></div><div class="v20-drawer-core"><span>QUICK ACTIONS</span><div><button data-eng-v52-click="productCloseMore();productOpenSpeak()">${icon('mic')}<b>Free Describe</b><small>Speak independently with live scene feedback.</small></button><button data-eng-v52-click="productCloseMore();productOpenCoach()">${icon('spark')}<b>Conversation Coach</b><small>Stay in the same scene through adaptive follow-up.</small></button><button data-eng-v52-click="productCloseMore();productOpenProfile()">${icon('target')}<b>Scene Fingerprint</b><small>See what to train next and why.</small></button></div></div><div class="v20-tool-label">SPECIALIST TOOLS</div><div class="product-tool-grid">${PRODUCT_ADVANCED_TOOLS.filter(x=>!['fingerprint'].includes(x[0])).map(([m,ic,t,d])=>`<button class="${state.mode===m?'active':''}" data-eng-v52-click="productGo('${m}')"><i>${icon(ic)}</i><span><b>${t}</b><small>${d}</small></span>${icon('chevron')}</button>`).join('')}</div><section class="v20-engine-status"><div class="v20-engine-head"><span>ENGINE STATUS</span><b>${ai.backend==='configured'?'AI backend configured':'Local engine active'}</b></div><div class="v20-status-grid"><p><i class="ok"></i><span><b>Lesson engine</b><small>ready offline</small></span></p><p><i class="${commercialSpeechStatus()==='available'?'ok':'idle'}"></i><span><b>Speech input</b><small>${commercialSpeechStatus()}</small></span></p><p><i class="ok"></i><span><b>AI adapter</b><small>contract ready</small></span></p><p><i class="${ai.backend==='configured'?'ok':'idle'}"></i><span><b>AI backend</b><small>${ai.backend==='configured'?'configured':'not connected'}</small></span></p></div><button data-eng-v52-click="commercialPingAI()">${ai.backend==='configured'?'Check backend':'Backend connection is optional in this build'}</button><small>No AI analysis is fabricated while the backend is disconnected.</small></section></aside></div>`;
};

/* Stronger product top bar: one scene identity, one profile signal, one Studio entry. */
topbar=function(){
  const advanced=productAdvancedMode(),meta=PRODUCT_ADVANCED_TOOLS.find(x=>x[0]===state.mode),p=fpProfile();
  const activeId=activeLessonId(),activeTitle=state.lesson?.title||window.EngBookContent?.getMeta?.(activeId)?.title||'Visual Conversation'; return `<header class="topbar product-topbar v20-topbar"><div class="topbar-inner"><button class="round-btn ghost" data-eng-v52-click="goHome()" aria-label="Home">${icon('back')}</button><div class="brand-lockup"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual Conversation</small></div></div><div class="product-scene-title"><span>${advanced?'SPECIALIST PRACTICE':`LESSON ${courseLessonLabel(activeId)}`}</span><b>${advanced?esc(meta?.[2]||'Studio tool'):esc(activeTitle)}</b></div><div class="v20-path-chip"><i></i><span>${state.mode==='talk'?'Converse':state.mode==='speak'?'Describe':['explore','learn','practice'].includes(state.mode)?'Learn':'Studio'}</span></div><div class="product-top-actions"><button data-eng-v52-click="productOpenProfile()"><span>Scene signal</span><b>${p.balance}</b></button><button class="round-btn ghost" data-eng-v52-click="productOpenMore()" aria-label="Studio tools">${icon('layers')}</button></div></div></header>`;
};

/* Re-render Product Home with commercial trust layer and shorter visible hierarchy. */
renderHome=function(){
  clearTimer();stopRecognition();stopPronRecognition();stopConversationRecognition();ownStopSpeech();state.screen='home';state.lesson=null;const m=ensureMomentum();
  app.innerHTML=`<div class="app-shell product-home-shell v20-home-shell"><header class="product-home-top v20-home-top"><div class="brand-lockup dark"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual Conversation</small></div></div><div class="product-home-meta"><span>${m.days||1} day${(m.days||1)===1?'':'s'} active</span><i></i><span>Lesson 01 • reference scene</span><span class="v20-build">v${BUILD_INFO.version}</span><button data-eng-v52-click="showOnboarding(0)" aria-label="Quick intro">?</button></div></header><main class="product-home-main v20-home-main">${productHomeHero()}${commercialTrustBar()}${productTodayPlan()}${productMiniSkill()}${productSceneForgeCard()}${productAdvancedPreview()}<section class="product-philosophy v20-philosophy"><i>${icon('eye')}</i><div><span>THE PRODUCT PROMISE</span><h3>Accurate observation becomes useful communication.</h3><p>EngBook trains you to notice what matters, describe it clearly, separate fact from inference, and keep the conversation moving.</p></div></section></main>${state.onboardingOpen?onboardingOverlay():''}${productToolDrawer()}<div class="toast" id="toast"></div></div>`;
};

/* If this is a clean install, the existing openLesson trigger will show the new
   three-step overlay because ONBOARD_KEY is absent. The new key is stored too. */
window.addEventListener('load',()=>{
  document.documentElement.classList.add('engbook-v20');
  if(localStorage.getItem(V20_ONBOARD_KEY)&&!localStorage.getItem(ONBOARD_KEY))localStorage.setItem(ONBOARD_KEY,'1');
});

/* v0.20 cleanup: leaving a specialist mode should not leave a microphone or
   hidden-photo state running behind the commercial shell. */
const _v20GoHomeTransition=goHome;
goHome=function(){
  try{stopReconstructionRecognition?.();}catch(e){}
  try{stopTimelineRecognition?.();}catch(e){}
  try{stopGrammarRecognition?.(false);}catch(e){}
  try{stopCameraRecognition?.(false);}catch(e){}
  try{stopLevelRecognition?.(false);}catch(e){}
  try{ownStopSpeech?.();}catch(e){}
  document.body?.classList?.remove('reconstruct-hide-photo');
  return _v20GoHomeTransition();
};


/* ======================================================================
   v0.21 RC1 — Release Candidate Hardening
   Reliability, migration, offline/PWA, accessibility, diagnostics.
   This layer deliberately adds no new learning mode and keeps Lesson 01
   as the reference scene.
   ====================================================================== */
const V21_BUILD=BUILD_INFO.tag;
const V21_ONBOARD_KEY='engbook_v21_rc_onboarded';
const V21_DIAGNOSTIC_LIMIT=12;
const v21Runtime={errors:[],storageHealthy:true,online:typeof navigator==='undefined'?true:navigator.onLine,sw:'checking',updateReady:false,lastFocus:null};

function v21PushError(err,context='runtime'){
  const item={at:Date.now(),context,message:String(err?.message||err||'Unknown error'),stack:String(err?.stack||'').slice(0,2400),mode:state?.mode||'',screen:state?.screen||''};
  v21Runtime.errors.unshift(item);v21Runtime.errors=v21Runtime.errors.slice(0,V21_DIAGNOSTIC_LIMIT);return item;
}
function v21Announce(message){const el=document.getElementById('a11y-status');if(!el)return;el.textContent='';setTimeout(()=>{el.textContent=String(message||'');},20);}
function v21FocusMain(label='Page updated'){
  setTimeout(()=>{const root=document.querySelector('main,.lesson-main,.content-column,.product-home-main')||document.getElementById('app');if(!root)return;const h=root.querySelector('h1,h2')||root;h.setAttribute('tabindex','-1');try{h.focus({preventScroll:true});}catch(e){}v21Announce(label);},40);
}
function v21RecoveryMarkup(item){
  const msg=esc(item?.message||'The interface hit an unexpected error.');
  return `<div class="v21-recovery" role="alertdialog" aria-modal="true" aria-labelledby="v21-recovery-title"><section><span>RECOVERY MODE • YOUR PROGRESS IS KEPT</span><h1 id="v21-recovery-title">EngBook protected the session.</h1><p>${msg}</p><div class="v21-recovery-actions"><button data-eng-v52-click="v21RecoverUI()">Reload interface</button><button class="secondary" data-eng-v52-click="v21ResetUIOnly()">Reset view only</button><button class="ghost" data-eng-v52-click="v21ExportDiagnostics()">Export diagnostics</button></div><small>Reset view only clears temporary screen state. It does not erase learning progress or custom Scene Packs.</small></section></div>`;
}
function v21HandleFatal(err,context='render'){
  const item=v21PushError(err,context);try{stopPronRecognition?.();stopConversationRecognition?.();ownStopSpeech?.();}catch(e){}
  const root=document.getElementById('app');if(root)root.innerHTML=v21RecoveryMarkup(item);v21Announce('Recovery mode opened after an interface error.');
}
function v21RecoverUI(){try{state.screen='home';state.lesson=null;state.productMoreOpen=false;state.onboardingOpen=false;state.photoFocus=false;state.peek=false;renderHome();v21FocusMain('Home restored.');}catch(e){location.reload();}}
function v21ResetUIOnly(){try{sessionStorage.removeItem('engbook_v21_ui');}catch(e){}location.href=location.pathname;}
function v21Diagnostics(){
  const ai=window.EngBookAI?.status?.()||{};
  return {build:V21_BUILD,generatedAt:new Date().toISOString(),location:{path:location.pathname,mode:state?.mode||'',screen:state?.screen||''},environment:{online:navigator.onLine,userAgent:navigator.userAgent,language:navigator.language,serviceWorker:v21Runtime.sw,storageHealthy:v21Runtime.storageHealthy},progress:{schemaVersion:progress?.schemaVersion||null,lesson:progress?.lastLesson||1,completedKeys:Object.keys(progress?.completed||{}).length,focusSessions:progress?.product?.sessions||0},ai:{adapter:ai.adapter||null,backend:ai.backend||null,mode:ai.mode||null},recentErrors:v21Runtime.errors};
}
function v21ExportDiagnostics(){try{const b=new Blob([JSON.stringify(v21Diagnostics(),null,2)],{type:'application/json'}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=`engbook-diagnostics-${Date.now()}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),500);toast?.('Diagnostics exported. No transcript or custom-scene image data was included.');}catch(e){}}

window.addEventListener('error',e=>{if(e?.error)v21PushError(e.error,'window.error');});
window.addEventListener('unhandledrejection',e=>v21PushError(e?.reason||'Unhandled promise rejection','unhandledrejection'));
window.addEventListener('engbook:storage-error',e=>{v21Runtime.storageHealthy=false;v21PushError(e?.detail?.message||'Storage write failed','storage');try{toast('Progress could not be saved. Export diagnostics or free device storage.');}catch(_){} });
window.addEventListener('online',()=>{v21Runtime.online=true;v21Announce('Back online.');v21UpdateConnectivityUI();});
window.addEventListener('offline',()=>{v21Runtime.online=false;v21Announce('You are offline. Core Lesson 01 practice remains available.');v21UpdateConnectivityUI();});

function v21ConnectivityBadge(){return `<div class="v21-connectivity ${navigator.onLine?'online':'offline'}" id="v21-connectivity" role="status"><i></i><span>${navigator.onLine?'Online • local engine ready':'Offline • Lesson 01 ready'}</span></div>`;}
function v21UpdateConnectivityUI(){const el=document.getElementById('v21-connectivity');if(!el)return;el.className=`v21-connectivity ${navigator.onLine?'online':'offline'}`;el.innerHTML=`<i></i><span>${navigator.onLine?'Online • local engine ready':'Offline • Lesson 01 ready'}</span>`;}

function v21InstallConnectivity(){
  const top=document.querySelector('.product-home-meta');if(top&&!document.getElementById('v21-connectivity'))top.insertAdjacentHTML('afterbegin',v21ConnectivityBadge());
  const actions=document.querySelector('.product-top-actions');if(actions&&!document.getElementById('v21-connectivity'))actions.insertAdjacentHTML('afterbegin',v21ConnectivityBadge());
}
function v21UpdateBanner(){
  if(!v21Runtime.updateReady||document.querySelector('.v21-update-banner'))return;
  const shell=document.querySelector('.app-shell')||document.body;
  shell.insertAdjacentHTML('beforeend',`<div class="v21-update-banner" role="status"><span><b>SceneSpeak update ready</b><small>Apply the new cached build when you are ready.</small></span><button data-eng-v52-click="v21ApplyUpdate()">Update</button><button class="ghost" aria-label="Dismiss update" data-eng-v52-click="this.parentElement.remove()">×</button></div>`);
}
function v21ApplyUpdate(){navigator.serviceWorker?.controller?.postMessage?.({type:'SKIP_WAITING'});setTimeout(()=>location.reload(),250);}
async function v21RegisterServiceWorker(){
  if(!('serviceWorker' in navigator)){v21Runtime.sw='unsupported';return;}
  try{const reg=await navigator.serviceWorker.register('./sw.js');v21Runtime.sw='ready';if(reg.waiting){v21Runtime.updateReady=true;v21UpdateBanner();}
    reg.addEventListener('updatefound',()=>{const w=reg.installing;if(!w)return;w.addEventListener('statechange',()=>{if(w.state==='installed'&&navigator.serviceWorker.controller){v21Runtime.updateReady=true;v21UpdateBanner();}});});
    // An activating cache must not discard an in-progress lesson or typed draft.
    // v21ApplyUpdate is the explicit reload action exposed by the update banner.
    navigator.serviceWorker.addEventListener('controllerchange',()=>{if(v21Runtime.updateReady)v21UpdateBanner();});
  }catch(e){v21Runtime.sw='failed';v21PushError(e,'service-worker');}
}

function v21TrapDialogFocus(e){
  if(e.key!=='Tab')return;const dlg=document.querySelector('[role="dialog"][aria-modal="true"]');if(!dlg)return;const els=[...dlg.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter(x=>!x.disabled&&x.offsetParent!==null);if(!els.length)return;const first=els[0],last=els[els.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
}
document.addEventListener('keydown',e=>{
  v21TrapDialogFocus(e);
  if(e.key==='Escape'){
    if(state?.productMoreOpen){productCloseMore();v21Announce('Studio closed.');return;}
    if(state?.onboardingOpen){commercialFinishOnboarding(false);v21Announce('Introduction closed.');return;}
    try{stopPronRecognition?.();stopConversationRecognition?.();ownStopSpeech?.();}catch(_){}
  }
});

// Safe render boundary. It protects progress by failing into a recovery surface.
const _v20RenderV21=render;
render=function(){try{const out=_v20RenderV21();setTimeout(()=>{v21InstallConnectivity();v21UpdateBanner();},0);return out;}catch(e){v21HandleFatal(e,'render');}};
const _v20RenderHomeV21=renderHome;
renderHome=function(){try{const out=_v20RenderHomeV21();setTimeout(()=>{v21InstallConnectivity();v21UpdateBanner();},0);return out;}catch(e){v21HandleFatal(e,'renderHome');}};
const _v20SetModeV21=setMode;
setMode=function(mode){try{const out=_v20SetModeV21(mode);v21FocusMain(`${mode} mode opened.`);return out;}catch(e){v21HandleFatal(e,'setMode');}};
const _v20GoHomeV21=goHome;
goHome=function(){try{const out=_v20GoHomeV21();v21FocusMain('Home opened.');return out;}catch(e){v21HandleFatal(e,'goHome');}};
const _v20OpenLessonV21=openLesson;
openLesson=function(id){try{const out=_v20OpenLessonV21(id);v21FocusMain(`Lesson ${id} opened.`);return out;}catch(e){v21HandleFatal(e,'openLesson');}};

// v0.21 onboarding migration: users who completed the commercial intro do not see it again.
try{if(localStorage.getItem(V20_ONBOARD_KEY)&&!localStorage.getItem(V21_ONBOARD_KEY))localStorage.setItem(V21_ONBOARD_KEY,'1');if(localStorage.getItem(V21_ONBOARD_KEY))localStorage.setItem(ONBOARD_KEY,'1');}catch(e){}
const _v20CloseOnboardingV21=closeOnboarding;
closeOnboarding=function(){try{localStorage.setItem(V21_ONBOARD_KEY,'1');}catch(e){}return _v20CloseOnboardingV21();};
const _v20CommercialFinishV21=commercialFinishOnboarding;
commercialFinishOnboarding=function(start=false){try{localStorage.setItem(V21_ONBOARD_KEY,'1');}catch(e){}return _v20CommercialFinishV21(start);};

// Persist the latest migrated progress once, without deleting the migration backup.
saveProgress();
window.addEventListener('load',()=>{v21RegisterServiceWorker();setTimeout(()=>{v21InstallConnectivity();v21UpdateBanner();},120);});

/* ======================================================================
   v0.22 — Release Readiness & Scaling Architecture
   Generic lesson runtime + complete local data portability + privacy
   controls + performance budget instrumentation. No new lesson content is
   introduced here; lesson availability is now manifest-driven and Truth-First review status is tracked separately.
   ====================================================================== */
const V22_BUILD=BUILD_INFO.tag;
const V22_PRIVACY_KEY='engbook_v22_privacy';
const V22_IMPORT_BACKUP_KEY='engbook_v22_import_backup';
const V22_EXPORT_KIND='engbook-user-data';
const V22_EXPORT_VERSION=1;
const V22_PERF_BUDGET={jsKb:520,cssKb:300,shellKb:850,lessonImageKb:250,longTaskMs:50};
const v22Runtime={startedAt:performance?.now?.()||Date.now(),longTasks:0,longestTask:0,lastExport:0};

// Attach the scene-specific coverage map to the generic Lesson 01 pack.
try{window.EngBookContent?.patchPack?.(1,{coverageAnchors:DEFAULT_SCENE_COVERAGE_ANCHORS});}catch(e){v21PushError?.(e,'content-pack-patch');}

function v22PrivacyDefaults(){return {allowRemoteAI:false,includeCustomSceneImagesInExport:true,localDiagnostics:true};}
function v22Privacy(){try{const legacy=JSON.parse(localStorage.getItem(V22_PRIVACY_KEY)||'{}')||{},p=window.EngBookPrivacy?.snapshot?.()||{};return {...v22PrivacyDefaults(),...legacy,allowRemoteAI:p.remoteAI===true||(!window.EngBookPrivacy&&legacy.allowRemoteAI===true)};}catch(e){return v22PrivacyDefaults();}}
function v22SavePrivacy(p){const clean={...v22PrivacyDefaults(),...(p||{})};try{localStorage.setItem(V22_PRIVACY_KEY,JSON.stringify(clean));return clean;}catch(e){window.dispatchEvent(new CustomEvent('engbook:storage-error',{detail:{message:String(e?.message||e)}}));return v22PrivacyDefaults();}}
async function v22SetPrivacy(key,value){const p=v22Privacy();p[key]=Boolean(value);v22SavePrivacy(p);if(key==='allowRemoteAI'){try{await window.EngBookPrivacy?.update?.('remoteAI',Boolean(value));}catch(e){toast?.('Could not update remote AI privacy on the server.');}}v22RenderPrivacyDialog();v21Announce?.(`${key} ${value?'enabled':'disabled'}.`);}
function v22Bytes(n){n=Number(n||0);if(n<1024)return `${n} B`;if(n<1024*1024)return `${(n/1024).toFixed(1)} KB`;return `${(n/1024/1024).toFixed(1)} MB`;}
function v22StorageSnapshot(){let bytes=0,keys=0;try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i)||'';if(!k.startsWith('engbook'))continue;const v=localStorage.getItem(k)||'';bytes+=(k.length+v.length)*2;keys++;}}catch(e){}const scenes=(()=>{try{const x=JSON.parse(localStorage.getItem(CUSTOM_SCENE_KEY)||'[]');return Array.isArray(x)?x.length:0;}catch(e){return 0;}})();return {bytes,keys,scenes};}
function v22Download(name,data,type='application/json'){const blob=new Blob([data],{type}),u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),800);}
function v22SanitizeSceneForImport(scene){return window.EngBookSecurity?.sanitizeScene?.(scene)||null;}
function v22ExportPackage(includeImages=v22Privacy().includeCustomSceneImagesInExport){let scenes=[];try{scenes=JSON.parse(localStorage.getItem(CUSTOM_SCENE_KEY)||'[]');if(!Array.isArray(scenes))scenes=[];}catch(e){scenes=[];}if(!includeImages)scenes=scenes.map(s=>({...s,imageData:s.imageData?'[OMITTED_BY_EXPORT_SETTING]':s.imageData}));return {kind:V22_EXPORT_KIND,version:V22_EXPORT_VERSION,build:V22_BUILD,exportedAt:new Date().toISOString(),dataPolicy:'local-first',progress:JSON.parse(JSON.stringify(progress)),customScenes:scenes,privacy:v22Privacy(),onboarding:{complete:Boolean(localStorage.getItem(ONBOARD_KEY))},contentRuntime:window.EngBookContent?.snapshot?.()||null};}
function v22ExportUserData(includeImages=v22Privacy().includeCustomSceneImagesInExport){try{const pack=v22ExportPackage(includeImages);v22Download(`engbook-user-data-${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(pack,null,2));v22Runtime.lastExport=Date.now();toast?.(includeImages?'User data exported, including local Scene Pack images.':'Learning data exported without custom-scene images.');}catch(e){v21PushError?.(e,'user-data-export');toast?.('Could not export user data.');}}
async function v22ImportUserData(input){const f=input?.files?.[0];if(!f)return;try{if(f.size>32*1024*1024)throw new Error('Import package exceeds the 32 MB safety limit.');const pkg=JSON.parse(await f.text());if(pkg?.kind!==V22_EXPORT_KIND||Number(pkg?.version)!==V22_EXPORT_VERSION||!pkg.progress||typeof pkg.progress!=='object')throw new Error('This is not a supported EngBook user-data package.');const scenes=(Array.isArray(pkg.customScenes)?pkg.customScenes:[]).map(v22SanitizeSceneForImport).filter(Boolean).slice(0,40);const next=migrateProgressV21(window.EngBookSecurity?.sanitizeProgress?.(pkg.progress)||pkg.progress);const currentBackup={at:Date.now(),progress:JSON.parse(JSON.stringify(progress)),customScenes:JSON.parse(localStorage.getItem(CUSTOM_SCENE_KEY)||'[]'),privacy:v22Privacy()};localStorage.setItem(V22_IMPORT_BACKUP_KEY,JSON.stringify(currentBackup));localStorage.setItem(PROGRESS_KEY,JSON.stringify({...next,schemaVersion:PROGRESS_SCHEMA_VERSION,build:V22_BUILD}));localStorage.setItem(CUSTOM_SCENE_KEY,JSON.stringify(scenes));v22SavePrivacy(pkg.privacy||v22PrivacyDefaults());if(pkg.onboarding?.complete)localStorage.setItem(ONBOARD_KEY,'1');toast?.('Data imported safely. Reloading EngBook…');setTimeout(()=>location.reload(),500);}catch(e){v21PushError?.(e,'user-data-import');toast?.(String(e?.message||'Could not import this file.'));}finally{if(input)input.value='';}}
function v22RestoreImportBackup(){try{const b=JSON.parse(localStorage.getItem(V22_IMPORT_BACKUP_KEY)||'null');if(!b?.progress)throw new Error('No import backup is available.');localStorage.setItem(PROGRESS_KEY,JSON.stringify({...migrateProgressV21(window.EngBookSecurity?.sanitizeProgress?.(b.progress)||b.progress),schemaVersion:PROGRESS_SCHEMA_VERSION,build:V22_BUILD}));localStorage.setItem(CUSTOM_SCENE_KEY,JSON.stringify((Array.isArray(b.customScenes)?b.customScenes:[]).map(v22SanitizeSceneForImport).filter(Boolean).slice(0,40)));v22SavePrivacy(b.privacy||v22PrivacyDefaults());toast?.('Pre-import backup restored. Reloading…');setTimeout(()=>location.reload(),450);}catch(e){toast?.('No valid pre-import backup is available.');}}
function v22ResetProgress(){if(!confirm('Reset learning progress? Custom Scene Packs and privacy settings will be kept.'))return;try{localStorage.setItem(PROGRESS_KEY,JSON.stringify(progressDefaultsV21()));toast?.('Learning progress reset. Reloading…');setTimeout(()=>location.reload(),450);}catch(e){toast?.('Could not reset progress.');}}
function v22DeleteScenes(){if(!confirm('Delete all custom Scene Packs stored on this device?'))return;try{localStorage.removeItem(CUSTOM_SCENE_KEY);ownScenes=[];state.ownSceneId=null;state.ownSceneDraft=null;toast?.('Custom Scene Packs deleted.');v22RenderPrivacyDialog();}catch(e){toast?.('Could not delete Scene Packs.');}}
function v22DeleteAllLocalData(){if(!confirm('Delete ALL EngBook data stored in this browser? This includes progress, Scene Packs, settings, and backups.'))return;try{window.EngAppLocalData?.clearAll?.();const keys=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&(k.startsWith('engbook')||k.startsWith('engapp')))keys.push(k);}keys.forEach(k=>localStorage.removeItem(k));toast?.('All local EngBook data deleted. Reloading…');setTimeout(()=>location.reload(),500);}catch(e){toast?.('Could not delete local data.');}}
function v22PerfSnapshot(){const resources=performance?.getEntriesByType?.('resource')||[];const own=resources.filter(r=>{try{return new URL(r.name,location.href).origin===location.origin;}catch(e){return false;}});const bytes=own.reduce((n,r)=>n+(r.transferSize||r.encodedBodySize||0),0);return {resourceCount:own.length,transferBytes:bytes,longTasks:v22Runtime.longTasks,longestTask:v22Runtime.longestTask,budget:V22_PERF_BUDGET};}
function v22PrivacyMarkup(){const p=v22Privacy(),s=v22StorageSnapshot(),perf=v22PerfSnapshot(),ai=window.EngBookAI?.status?.()||{},hasBackup=Boolean(localStorage.getItem(V22_IMPORT_BACKUP_KEY));return `<div class="v22-privacy-backdrop" id="v22-privacy" role="presentation" data-eng-v52-click="if(event.target===this)v22CloseDataPrivacy()"><section class="v22-privacy-dialog" role="dialog" aria-modal="true" aria-labelledby="v22-data-title"><header><div><span>DATA & PRIVACY</span><h2 id="v22-data-title">Your learning data stays under your control.</h2><p>v0.22 is local-first. Progress and custom Scene Packs are stored in this browser unless you explicitly export them or enable a configured remote AI service.</p></div><button data-eng-v52-click="v22CloseDataPrivacy()" aria-label="Close data and privacy">${icon('close')}</button></header><div class="v22-privacy-grid"><article><span>LOCAL STORAGE</span><b>${v22Bytes(s.bytes)}</b><small>${s.keys} EngBook keys • ${s.scenes} custom Scene Pack${s.scenes===1?'':'s'}</small></article><article><span>CONTENT RUNTIME</span><b>${window.EngBookContent?.snapshot?.().readyLessons?.length||0} available</b><small>${window.ENGBOOK_BUILD_INFO?.truthFirstReadyLessons?.length||0} lessons are fully Truth-First reviewed.</small></article><article><span>AI TRANSPORT</span><b>${ai.backend==='configured'?(p.allowRemoteAI?'Allowed':'Blocked'):'Not connected'}</b><small>Local engines work without remote AI.</small></article><article><span>SESSION PERFORMANCE</span><b>${v22Bytes(perf.transferBytes)}</b><small>${perf.resourceCount} local resources • ${perf.longTasks} long task${perf.longTasks===1?'':'s'}</small></article></div><div class="v22-control-block"><div><span>REMOTE AI PERMISSION</span><h3>Keep remote analysis opt-in.</h3><p>Even if a backend is configured later, EngBook will not send a scene or transcript until this setting is enabled.</p></div><label class="v22-switch"><input type="checkbox" ${p.allowRemoteAI?'checked':''} data-eng-v52-change="v22SetPrivacy('allowRemoteAI',this.checked)"><i></i><span>${p.allowRemoteAI?'Allowed':'Blocked'}</span></label></div><div class="v22-control-block"><div><span>EXPORT CONTENT</span><h3>Include custom-scene images in full exports.</h3><p>Turn this off when you want a smaller learning-data backup without your personal images.</p></div><label class="v22-switch"><input type="checkbox" ${p.includeCustomSceneImagesInExport?'checked':''} data-eng-v52-change="v22SetPrivacy('includeCustomSceneImagesInExport',this.checked)"><i></i><span>${p.includeCustomSceneImagesInExport?'Include':'Omit'}</span></label></div><section class="v22-data-actions"><div><span>PORTABILITY</span><h3>Export or restore your complete local learning state.</h3></div><div class="v22-action-row"><button data-eng-v52-click="v22ExportUserData(true)">Export full data</button><button class="secondary" data-eng-v52-click="v22ExportUserData(false)">Export without images</button><label class="secondary file">Import data<input type="file" accept="application/json,.json" data-eng-v52-change="v22ImportUserData(this)"></label>${hasBackup?'<button class="ghost" data-eng-v52-click="v22RestoreImportBackup()">Restore pre-import backup</button>':''}</div></section><section class="v22-danger-zone"><div><span>LOCAL DATA CONTROLS</span><h3>Delete only what you intend to delete.</h3></div><div><button data-eng-v52-click="v22ResetProgress()">Reset learning progress</button><button data-eng-v52-click="v22DeleteScenes()">Delete custom scenes</button><button class="danger" data-eng-v52-click="v22DeleteAllLocalData()">Delete all EngBook data</button></div></section><footer><span>No analytics or remote telemetry is implemented in this build.</span><button data-eng-v52-click="v21ExportDiagnostics()">Export privacy-safe diagnostics</button></footer></section></div>`;}
function v22OpenDataPrivacy(){state.productMoreOpen=false;render();setTimeout(()=>{if(!document.getElementById('v22-privacy'))document.body.insertAdjacentHTML('beforeend',v22PrivacyMarkup());document.querySelector('.v22-privacy-dialog button')?.focus();},0);}
function v22CloseDataPrivacy(){document.getElementById('v22-privacy')?.remove();v21Announce?.('Data and privacy closed.');}
function v22RenderPrivacyDialog(){const old=document.getElementById('v22-privacy');if(!old)return;old.outerHTML=v22PrivacyMarkup();}

// Add Data & Privacy to the commercial Studio drawer without adding another
// primary navigation destination.
const _v21ProductToolDrawerV22=productToolDrawer;
productToolDrawer=function(){let html=_v21ProductToolDrawerV22();if(!html)return html;const card=`<section class="v22-data-entry"><div><span>DATA & PRIVACY</span><b>Local-first controls</b><small>Export, import, delete data, and control future remote AI access.</small></div><button data-eng-v52-click="v22OpenDataPrivacy()">Manage ${icon('chevron')}</button></section>`;return html.replace('</aside></div>',`${card}</aside></div>`);};

// Generic lesson opening: the current application still ships only Lesson 01
// as ready, but adding a validated ready Lesson Pack is enough to make a new
// lesson addressable without editing this function again.
const _v21OpenLessonV22=openLesson;
openLesson=function(id){const n=Number(id),resolved=window.EngBookContent?.resolve?.(n);if(!resolved?.ready){const meta=window.EngBookContent?.getMeta?.(n);toast?.(meta?`Lesson ${courseLessonLabel(n)} is catalogued but not released yet.`:'Lesson pack not found.');return;}if(n===1)return _v21OpenLessonV22(1);const base=_v21OpenLessonV22(1);state.lesson=resolved.lesson;state.mode='explore';progress.lastLesson=n;saveProgress();render();v21FocusMain?.(`Lesson ${n} opened.`);return base;};
const _v21SetModeV22=setMode;
setMode=function(mode){const pack=window.EngBookContent?.getPack?.(activeLessonId());if(pack&&activeLessonId()!==1){const need={learn:'learn',speak:'describe',talk:'conversation',timeline:'timeline',grammar:'grammar',reconstruct:'reconstruct',camera:'camera',level:'level',fingerprint:'fingerprint'}[mode];if(need&&!pack.capabilities?.includes(need)){toast?.(`${mode} is not enabled in this lesson pack yet.`);return;}}return _v21SetModeV22(mode);};

// Update visible build/runtime status after the v0.21 commercial shell renders.
function v22DecorateShell(){document.querySelectorAll('.v20-build').forEach(el=>el.textContent='v'+BUILD_INFO.version);const meta=document.querySelector('.product-home-meta');if(meta&&!meta.querySelector('.v22-runtime-pill')){const snap=window.EngBookContent?.snapshot?.();const span=document.createElement('span');span.className='v22-runtime-pill';span.textContent=`Course • ${snap?.readyLessons?.length||0}/28 available`;meta.insertBefore(span,meta.querySelector('button'));}}
const _v21RenderHomeV22=renderHome;
renderHome=function(){const out=_v21RenderHomeV22();setTimeout(v22DecorateShell,0);return out;};
const _v21RenderV22=render;
render=function(){const out=_v21RenderV22();setTimeout(v22DecorateShell,0);return out;};

// v0.22 diagnostics supersede the build label while retaining the privacy-safe
// payload design from RC1.
const _v21DiagnosticsV22=v21Diagnostics;
v21Diagnostics=function(){return {..._v21DiagnosticsV22(),build:V22_BUILD,contentRuntime:window.EngBookContent?.snapshot?.(),performance:v22PerfSnapshot(),privacy:{allowRemoteAI:v22Privacy().allowRemoteAI}};};

try{if(localStorage.getItem(V21_ONBOARD_KEY)&&!localStorage.getItem(ONBOARD_KEY))localStorage.setItem(ONBOARD_KEY,'1');}catch(e){}
try{if('PerformanceObserver' in window){const o=new PerformanceObserver(list=>{for(const e of list.getEntries()){v22Runtime.longTasks++;v22Runtime.longestTask=Math.max(v22Runtime.longestTask,e.duration||0);}});o.observe({type:'longtask',buffered:true});}}catch(e){}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('v22-privacy')){e.preventDefault();v22CloseDataPrivacy();}});
window.addEventListener('load',()=>{setTimeout(v22DecorateShell,140);});

/* ===== v0.23 CONTENT PIPELINE + LESSON 02 CORE RELEASE =====
   First proof that the Lesson 01 interaction standard can scale through validated
   Lesson Packs. Lesson 02 enables only the specialist capabilities that have been
   made lesson-generic in this build: Explore, Learn, Describe, and Evidence. */
const V23_BUILD=BUILD_INFO.tag;
let v23MetricContextId=1;

function v23CoverageDefaults(){return {best:0,last:0,runs:0,groups:{}};}
function v23EvidenceDefaults(){return {best:0,last:0,runs:0,safeClaims:0,unsupported:0,repairs:0};}
function v23EnsureLessonMetrics(){progress.lessonMetrics=progress.lessonMetrics&&typeof progress.lessonMetrics==='object'?progress.lessonMetrics:{};return progress.lessonMetrics;}
function v23SeedReferenceMetrics(){const m=v23EnsureLessonMetrics();if(!m[1])m[1]={coverage:JSON.parse(JSON.stringify(progress.coverage||v23CoverageDefaults())),evidence:JSON.parse(JSON.stringify(progress.evidence||v23EvidenceDefaults())),speakingAttempts:Number(progress.speakingAttempts||0),lastSpeechScore:Number(progress.lastSpeechScore||0)};}
function v23PersistMetrics(id=activeLessonId()){const n=Number(id||1);if(!n)return;const m=v23EnsureLessonMetrics();m[n]={coverage:JSON.parse(JSON.stringify(progress.coverage||v23CoverageDefaults())),evidence:JSON.parse(JSON.stringify(progress.evidence||v23EvidenceDefaults())),speakingAttempts:Number(progress.speakingAttempts||0),lastSpeechScore:Number(progress.lastSpeechScore||0)};saveProgress();}
function v23LoadMetrics(id){const n=Number(id||1),m=v23EnsureLessonMetrics(),x=m[n]||{};progress.coverage={...v23CoverageDefaults(),...(x.coverage||{}),groups:{...(x.coverage?.groups||{})}};progress.evidence={...v23EvidenceDefaults(),...(x.evidence||{})};progress.speakingAttempts=Number(x.speakingAttempts||0);progress.lastSpeechScore=Number(x.lastSpeechScore||0);v23MetricContextId=n;}
v23SeedReferenceMetrics();

// Keep mastery records isolated once more than one lesson is active while retaining
// the existing un-prefixed Lesson 01 records for backward compatibility.
function v23MasteryKey(word){return activeLessonId()===1?word:`l${activeLessonId()}:${word}`;}
masteryRecord=function(word){return progress.mastery[v23MasteryKey(word)]||{seen:0,correct:0,wrong:0,last:0};};
touchMastery=function(word){const k=v23MasteryKey(word),r=masteryRecord(word);r.seen=Math.min(8,(r.seen||0)+1);r.last=Date.now();progress.mastery[k]=r;};
recallMastery=function(word,ok){const k=v23MasteryKey(word),r=masteryRecord(word);ok?r.correct++:r.wrong++;r.last=Date.now();progress.mastery[k]=r;};
masteryScore=function(word){const r=masteryRecord(word);const seen=Math.min(24,(r.seen||0)*8),recall=Math.min(64,(r.correct||0)*22),penalty=Math.min(30,(r.wrong||0)*9),saved=isSaved(word)?8:0;return clamp(Math.round(seen+recall+saved-penalty),0,100);};

function v23CompleteKey(raw){return activeLessonId()===1?raw:String(raw||'').replace(/^l1_/,`l${activeLessonId()}_`);}
const _v22MarkCompleteV23=markComplete;
markComplete=function(key){return _v22MarkCompleteV23(v23CompleteKey(key));};
completion=function(){
  const id=activeLessonId(),hs=(state.lesson?.hotspots||window.EngBookContent?.resolve?.(id)?.lesson?.hotspots||[]),d=hs.length?discoveredSet().size/hs.length:0,pack=window.EngBookContent?.getPack?.(id);
  const candidates=[['explore','explore'],['evidence','learn'],['speaking','describe'],['practice','practice'],['talk','conversation']];
  const supported=id===1?candidates:candidates.filter(([,cap])=>pack?.capabilities?.includes(cap));
  const steps=supported.length?supported.filter(([k])=>progress.completed[`l${id}_${k}`]).length/supported.length:0;
  return clamp(Math.round((d*.55+steps*.45)*100),0,100);
};

// Lesson-pack evidence classifier. Lesson 01 retains its deeply hand-authored
// historical rules; generated lessons use the pure Scene Evidence Core.
const _v22ClassifyEvidenceClaimV23=classifyEvidenceClaim;
classifyEvidenceClaim=function(claim){
  if(activeLessonId()===1)return _v22ClassifyEvidenceClaimV23(claim);
  const pack=window.EngBookContent?.getPack?.(activeLessonId());
  if(!pack?.evidenceProfile||!window.EngBookSceneEvidence?.classify)return {type:'unsupported',label:'UNSUPPORTED BY SCENE PACK',confidence:'—',text:String(claim||''),anchors:[],reason:'No evidence profile is available for this lesson pack.',repair:'Return to a visible detail in the current scene.',score:5,cautious:false};
  return window.EngBookSceneEvidence.classify(pack.evidenceProfile,pack.coverageAnchors||[],claim);
};

const _v22SpeechAnalysisV23=speechAnalysis;
speechAnalysis=function(){
  if(activeLessonId()===1)return _v22SpeechAnalysisV23();
  const text=String(state.transcript||''),t=text.toLowerCase(),wc=wordCount(text),sceneCov=sceneCoverageAnalysis(text),evidence=evidenceAnalysis(text),pack=window.EngBookContent?.getPack?.(activeLessonId())||{},grammarTitle=pack.content?.grammar?.title||'Lesson grammar';
  const spatialWords=['left','right','foreground','background','middle ground','beside','behind','in front of','near','next to','at the table','on the table','by the window','between'];
  const spatial=spatialWords.filter(x=>t.includes(x)),caution=(pack.evidenceProfile?.cautionTerms||CAUTION_TERMS).filter(x=>t.includes(String(x).toLowerCase()));
  const seq=['first','then','while','before','now','next','after','finally','in the foreground','in the background'].filter(x=>t.includes(x));
  const presentPerfect=/\b(?:have|has)\s+(?:\w+\s+){0,2}(?:known|been|seen|met|shared|spent)\b/i.test(text);
  const durationClaim=/\b(?:have|has)\s+known\s+[^.?!]{0,45}\b(?:for|since)\b/i.test(text)||/\b(?:since childhood|friends for years|known each other for years)\b/i.test(text);
  const grammarScore=durationClaim?35:presentPerfect?68:85;
  const grammarNote=durationClaim?'Present-perfect duration was used without supplied context; the source guardrail says not to guess friendship duration.':presentPerfect?`${grammarTitle} detected; verify that its time context was supplied rather than inferred from the photo.`:`${grammarTitle} is context-gated here; avoiding invented duration is good grammar discipline.`;
  const targets={30:[30,65],60:[60,120],90:[90,175]},range=targets[state.speakingDuration]||targets[60],[lo,hi]=range;
  const lengthScore=wc===0?0:wc<lo?Math.round(wc/lo*100):wc>hi?Math.max(55,100-Math.round((wc-hi)/hi*80)):100;
  const spatialScore=Math.min(100,spatial.length*38);
  const cautionRequired=state.speakingDuration>=60,cautionScore=cautionRequired?Math.min(100,caution.length*70):(caution.length?100:75);
  const structureScore=Math.min(100,seq.length*34+(t.includes('window')||t.includes('table')?15:0));
  const dims=[['Visual detail',sceneCov.pct,`${sceneCov.hits.length}/${activeCoverageAnchors().length} image-supported anchors detected`],['Evidence control',evidence.control,evidence.claims.length?`${evidence.visible} fact · ${evidence.inference} inference · ${evidence.review||0} check · ${evidence.unsupported} unsupported`:'Start with one visible fact'],['Spatial language',spatialScore,spatial.length?spatial.slice(0,3).join(' · '):'Try on the left / in the background / between'],['Grammar discipline',grammarScore,grammarNote],['Cautious inference',cautionScore,caution.length?caution.slice(0,3).join(' · '):cautionRequired?'Try may / might / seems':'Optional at 30 seconds'],['Length target',lengthScore,`${wc} words in transcript`],['Organization',structureScore,seq.length?seq.slice(0,3).join(' · '):'Try first / then or foreground → background']];
  return {wc,found:sceneCov.hits.map(x=>x.label),dims,overall:Math.round(dims.reduce((a,d)=>a+d[1],0)/dims.length)};
};
const _v22TranscriptCompareV23=transcriptCompare;
transcriptCompare=function(){
  if(activeLessonId()===1)return _v22TranscriptCompareV23();
  const a=speechAnalysis(),missing=sceneCoverageAnalysis().missing.map(x=>x.label),funcs=[];
  if(a.dims[2][1]<50)funcs.push('spatial language');
  if(a.dims[3][1]<60)funcs.push('grammar guardrail');
  if(state.speakingDuration>=60&&a.dims[4][1]<70)funcs.push('cautious inference');
  if(a.dims[6][1]<55)funcs.push('clear sequence');
  return {missing:missing.slice(0,4),funcs};
};

function v23Capabilities(){return window.EngBookContent?.getPack?.(activeLessonId())?.capabilities||[];}
function v23Has(cap){return activeLessonId()===1||v23Capabilities().includes(cap);}
function v23ModeCapability(mode){return {explore:'explore',learn:'learn',practice:'practice',speak:'describe',talk:'conversation',timeline:'timeline',grammar:'grammar',reconstruct:'reconstruct',camera:'camera',level:'level',fingerprint:'fingerprint'}[mode]||null;}

const _v22SetModeV23=setMode;
setMode=function(mode){
  const need=v23ModeCapability(mode);if(activeLessonId()!==1&&need&&!v23Has(need)){toast?.(`${mode==='practice'?'Recall':mode} is not released for Lesson ${courseLessonLabel(activeLessonId())} yet. This core pack currently supports Explore, Learn, Describe, and Evidence.`);return;}
  return _v22SetModeV23(mode);
};

// Open a validated lesson pack, with per-lesson coverage/evidence metrics.
const _v22OpenLessonV23=openLesson;
openLesson=function(id){
  const n=Number(id);if(state.lesson)v23PersistMetrics(activeLessonId());
  const out=_v22OpenLessonV23(n);
  if(state.lesson&&Number(state.lesson.id)===n){v23LoadMetrics(n);state.scanMode='off';state.selected=null;state.transcript='';progress.lastLesson=n;saveProgress();render();}
  return out;
};
const _v22GoHomeV23=goHome;
goHome=function(){if(state.lesson)v23PersistMetrics(activeLessonId());v23LoadMetrics(1);return _v22GoHomeV23();};

// Commercial navigation respects the active lesson instead of silently jumping
// back to Lesson 01 when a core action is selected.
productOpenLearn=function(){const id=state.lesson?.id||progress.lastLesson||1;openLesson(id);setMode('learn');};
productOpenSpeak=function(){const id=state.lesson?.id||progress.lastLesson||1;openLesson(id);state.speakingDuration=60;state.speakingSeconds=60;setMode('speak');};
productOpenCoach=function(){const id=state.lesson?.id||progress.lastLesson||1;openLesson(id);if(!v23Has('conversation')){toast?.(`Conversation is not enabled for Lesson ${courseLessonLabel(id)} in this lesson pack.`);return;}state.conversationMode='natural';state.conversationMission='listener';setMode('talk');};
productGo=function(mode){const id=state.lesson?.id||1;if(id!==1&&!v23Has(v23ModeCapability(mode))){toast?.(`This Studio tool has not been generalized for Lesson ${courseLessonLabel(id)} yet.`);return;}state.productMoreOpen=false;openLesson(id);setMode(mode);};

productPrimaryTabs=function(){
  const id=activeLessonId(),primary=[['explore','compass','Explore','explore'],['learn','book','Learn','learn'],['practice','target','Recall','practice'],['speak','mic','Describe','describe'],['talk','spark','Converse','conversation']];
  if(productAdvancedMode()){const meta=PRODUCT_ADVANCED_TOOLS.find(x=>x[0]===state.mode);return `<div class="product-mode-tabs"><button data-eng-v52-click="setMode('explore')">${icon('compass')}<span>Core lesson</span></button><button class="active studio-current" data-eng-v52-click="productOpenMore()">${icon(meta?.[1]||'layers')}<span>${esc(meta?.[2]||'Studio tool')}</span></button><button data-eng-v52-click="productOpenMore()">${icon('layers')}<span>All tools</span></button></div>`;}
  return `<div class="product-mode-tabs">${primary.map(([m,ic,t,cap])=>`<button class="${state.mode===m?'active':''} ${id!==1&&!v23Has(cap)?'disabled':''}" ${id!==1&&!v23Has(cap)?'disabled aria-disabled="true"':`data-eng-v52-click="setMode('${m}')"`}>${icon(ic)}<span>${t}${id!==1&&!v23Has(cap)?' · soon':''}</span></button>`).join('')}<button class="${id!==1?'disabled':''}" ${id!==1?'disabled aria-disabled="true"':'data-eng-v52-click="productOpenMore()"'}>${icon('layers')}<span>Studio${id!==1?' · ref':''}</span></button></div>`;
};
modeTabs=function(){return productPrimaryTabs();};
bottomNav=function(){
  const id=activeLessonId(),learnActive=['explore','learn','practice'].includes(state.mode),speakActive=state.mode==='speak',coachActive=state.mode==='talk',moreActive=productAdvancedMode();
  return `<nav class="bottom-nav product-bottom-nav"><button data-eng-v52-click="goHome()">${icon('home')}<span>Home</span></button><button class="${learnActive?'active':''}" data-eng-v52-click="productOpenLearn()">${icon('book')}<span>Learn</span></button><button class="${speakActive?'active':''}" data-eng-v52-click="productOpenSpeak()">${icon('mic')}<span>Describe</span></button><button class="${coachActive?'active':''} ${id!==1&&!v23Has('conversation')?'disabled':''}" ${id!==1&&!v23Has('conversation')?'disabled aria-disabled="true"':'data-eng-v52-click="productOpenCoach()"'}>${icon('spark')}<span>Coach${id!==1&&!v23Has('conversation')?' · soon':''}</span></button><button class="${moreActive?'active':''} ${id!==1?'disabled':''}" ${id!==1?'disabled aria-disabled="true"':'data-eng-v52-click="productOpenMore()"'}>${icon('layers')}<span>More${id!==1?' · ref':''}</span></button></nav>`;
};
topbar=function(){
  const id=activeLessonId(),lesson=state.lesson||window.EngBookContent?.resolve?.(id)?.lesson||CAT01.lessons[0],advanced=productAdvancedMode(),meta=PRODUCT_ADVANCED_TOOLS.find(x=>x[0]===state.mode);
  return `<header class="topbar product-topbar"><div class="topbar-inner"><button class="round-btn ghost" data-eng-v52-click="goHome()" aria-label="Home">${icon('back')}</button><div class="brand-lockup"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual Conversation</small></div></div><div class="product-scene-title"><span>${advanced?'STUDIO TOOL':`LESSON ${courseLessonLabel(id)}`}</span><b>${advanced?esc(meta?.[2]||'Advanced practice'):esc(lesson.title||'Lesson')}</b></div><div class="product-top-actions"><button data-eng-v52-click="${id===1?'productOpenProfile()':'setMode(\'speak\')'}"><span>${id===1?'Scene signal':'Lesson progress'}</span><b>${id===1?fpProfile().balance:completion()+'%'}</b></button><button class="round-btn ghost ${id!==1?'disabled':''}" ${id===1?'data-eng-v52-click="productOpenMore()"':'disabled'} aria-label="Studio tools">${icon('layers')}</button></div></div></header>`;
};

function v23LessonLibrary(){
  const lessons=window.EngBookContent?.listLessons?.(1)||[],ready=lessons.filter(l=>l.ready);const show=lessons.slice(0,6);
  return `<section class="v23-lesson-library"><div class="product-section-head"><div><span>CATEGORY 01 • LEARNING PATH</span><h2>${ready.length} lessons ready to practice.</h2><p>Each released lesson has passed the same image-evidence, speaking, and interaction checks. Upcoming lessons stay locked until their reviewed pack passes validation.</p></div><span class="v23-pipeline-count">${ready.length}/28 AVAILABLE</span></div><div class="v23-lesson-grid">${show.map(l=>`<button class="v23-lesson-card ${l.ready?'ready':'locked'}" ${l.ready?`data-eng-v52-click="openLesson(${l.id})"`:'disabled'}><div><img src="${esc(l.image)}" alt=""><span>${courseLessonLabel(l.id)}</span>${l.ready?'<i>READY</i>':'<i>LOCKED</i>'}</div><b>${esc(l.title)}</b><small>${l.id===1?'Reference lesson • full practice':l.ready?'Practice • Recall · Describe · Evidence · Converse':'Coming next • review pending'}</small></button>`).join('')}</div><footer><span>Quality path</span><b>Image evidence → Truth-first validation → Learning runtime</b></footer></section>`;
}

function v23DecorateLesson(){
  const id=activeLessonId();if(!state.lesson||state.screen==='home')return;const len=state.lesson.hotspots?.length||0;
  const heading=document.querySelector('.lesson-heading');if(heading){const lid=heading.querySelector('.lesson-id'),h1=heading.querySelector('h1');if(lid)lid.textContent=`LESSON ${courseLessonLabel(id)} • ${id===1?'VISUAL CONVERSATION ENGINE':'IMAGE-VERIFIED LESSON'}`;if(h1)h1.textContent=state.lesson.title;const metric=heading.querySelectorAll('.lesson-metrics > div');if(metric[1]){metric[1].querySelector('b').textContent=`${discoveredSet().size}/${len}`;metric[1].querySelector('span').textContent='anchors';}if(id!==1&&!heading.parentElement.querySelector('.v23-source-strip'))heading.insertAdjacentHTML('afterend',`<div class="v23-source-strip"><span>${icon('check')} TRUTH-FIRST VERIFIED</span><b>Validated lesson pack</b><small>Practice path: Explore • Learn • Recall • Describe • Evidence • Converse. Specialist Studio tools unlock only after lesson-specific QA.</small></div>`);}
  const dp=document.querySelector('.discover-progress-head b');if(dp)dp.textContent=`${discoveredSet().size}/${len}`;
  document.querySelectorAll('.scene-caption b').forEach(el=>{if(/\bof \d+ details found\b/.test(el.textContent))el.textContent=el.textContent.replace(/\d+ of \d+ details found/,`${discoveredSet().size} of ${len} details found`);});
  if(id!==1){document.querySelectorAll('.photo-top-actions button').forEach(b=>{if(/Lens|Action lens|Scene layers|Motion cues/.test(b.textContent))b.style.display='none';});const scope=document.querySelector('.evidence-scope');if(scope)scope.textContent=`Grounded only in the current Lesson ${courseLessonLabel(id)} Scene Pack and its accuracy guardrails. It does not judge real-world truth outside this scene.`;}
  const map={explore:'explore',learn:'evidence',speak:'speaking'};const k=map[state.mode];if(k){const btn=document.querySelector('.complete-btn');if(btn){const done=Boolean(progress.completed[`l${id}_${k}`]);btn.classList.toggle('done',done);btn.innerHTML=done?`${icon('check')} Complete`:'Mark complete';}}
}
function v23DecorateHome(){
  if(state.screen!=='home')return;document.querySelectorAll('.v20-build').forEach(el=>el.textContent='v'+BUILD_INFO.version);const meta=document.querySelector('.product-home-meta');if(meta){const lessonSpan=[...meta.querySelectorAll('span')].find(x=>/Lesson 01|reference scene/.test(x.textContent));if(lessonSpan)lessonSpan.textContent=`${window.EngBookContent?.snapshot?.().readyLessons?.length||0} lessons ready`;}
  if(!document.querySelector('.v23-lesson-library'))document.querySelector('.product-today')?.insertAdjacentHTML('afterend',v23LessonLibrary());
}
function v23DecorateShell(){document.querySelectorAll('.v20-build').forEach(el=>el.textContent='v'+BUILD_INFO.version);v23DecorateLesson();v23DecorateHome();}

const _v22RenderV23=render;
render=function(){const out=_v22RenderV23();setTimeout(v23DecorateShell,0);return out;};
const _v22RenderHomeV23=renderHome;
renderHome=function(){v23SeedReferenceMetrics();v23LoadMetrics(1);const out=_v22RenderHomeV23();setTimeout(v23DecorateShell,0);return out;};

// Upgrade Data & Privacy wording without changing the v0.22-compatible export format.
const _v22PrivacyMarkupV23=v22PrivacyMarkup;
v22PrivacyMarkup=function(){const ready=window.EngBookContent?.snapshot?.().readyLessons?.length||0;return _v22PrivacyMarkupV23().replace('v0.22 is local-first','v0.28 is local-first').replace('v0.24 is local-first','v0.28 is local-first').replace('Lesson 01 is the reference pack; remaining lessons stay catalogued and locked.',`${ready} lessons are available; ${window.ENGBOOK_BUILD_INFO?.truthFirstReadyLessons?.length||0} are fully Truth-First reviewed.`);};

const _v22DiagnosticsV23=v21Diagnostics;
v21Diagnostics=function(){return {..._v22DiagnosticsV23(),build:V23_BUILD,contentPipeline:window.EngBookContent?.snapshot?.(),sceneEvidenceVersion:window.EngBookSceneEvidence?.version||null};};

try{progress.schemaVersion=23;progress.build=V23_BUILD;saveProgress();}catch(e){}
window.addEventListener('load',()=>setTimeout(v23DecorateShell,180));

// Deep-link support for the first generated lesson pack. The original load handler
// remains backward-compatible for Lesson 01; this listener handles ready packs >1.
/* Legacy generic deep-link load hook disabled in v0.38; v38ApplyDeepLink is authoritative. */

// Any normal progress save made while a lesson is open also snapshots the core
// per-lesson metrics, so refresh/reload cannot misattribute Lesson 02 progress.
const _v23SaveProgressBase=saveProgress;
saveProgress=function(){try{if(state?.lesson&&activeLessonId()===v23MetricContextId){const id=activeLessonId(),m=v23EnsureLessonMetrics();m[id]={coverage:JSON.parse(JSON.stringify(progress.coverage||v23CoverageDefaults())),evidence:JSON.parse(JSON.stringify(progress.evidence||v23EvidenceDefaults())),speakingAttempts:Number(progress.speakingAttempts||0),lastSpeechScore:Number(progress.lastSpeechScore||0)};}}catch(e){}return _v23SaveProgressBase();};

/* ===== v0.24 GENERIC CORE INTERACTION RUNTIME =====
   Generalizes Active Recall + Scene Conversation for validated Lesson Packs.
   Lesson 01 keeps its hand-authored specialist behavior; generated packs can now
   enable practice + conversation without copying Lesson 01 code. */
const V24_BUILD=BUILD_INFO.tag;
const V24_LEGACY_ONBOARD='engbook_cat01_v24_onboarded';
try{if(localStorage.getItem(V24_LEGACY_ONBOARD)&&!localStorage.getItem(ONBOARD_KEY))localStorage.setItem(ONBOARD_KEY,'1');}catch(e){}

function v24PracticeDefaults(){return {correct:0,attempts:0,bestStreak:0,streak:0};}
function v24ConversationDefaults(){return {turns:0,completed:0,best:0,history:[],modeRuns:{guided:0,natural:0,challenge:0},missionRuns:{listener:0,detective:0,story:0}};}
function v24Clone(v){return JSON.parse(JSON.stringify(v));}
function v24LessonMetric(id){const m=v23EnsureLessonMetrics();m[id]=m[id]||{};return m[id];}
function v24SeedInteractionMetrics(id=1){const x=v24LessonMetric(Number(id));if(!x.practice)x.practice=v24Clone(progress.practice||v24PracticeDefaults());if(!x.conversation)x.conversation=v24Clone(progress.conversation||v24ConversationDefaults());return x;}
v24SeedInteractionMetrics(1);

// Upgrade the v0.23 per-lesson metric bridge to include Recall and Conversation.
v23PersistMetrics=function(id=activeLessonId()){
  const n=Number(id||1);if(!n)return;const x=v24LessonMetric(n);
  x.coverage=v24Clone(progress.coverage||v23CoverageDefaults());
  x.evidence=v24Clone(progress.evidence||v23EvidenceDefaults());
  x.speakingAttempts=Number(progress.speakingAttempts||0);x.lastSpeechScore=Number(progress.lastSpeechScore||0);
  x.practice=v24Clone(progress.practice||v24PracticeDefaults());x.conversation=v24Clone(progress.conversation||v24ConversationDefaults());
  saveProgress();
};
v23LoadMetrics=function(id){
  const n=Number(id||1),x=v24LessonMetric(n);
  progress.coverage={...v23CoverageDefaults(),...(x.coverage||{}),groups:{...(x.coverage?.groups||{})}};
  progress.evidence={...v23EvidenceDefaults(),...(x.evidence||{})};
  progress.speakingAttempts=Number(x.speakingAttempts||0);progress.lastSpeechScore=Number(x.lastSpeechScore||0);
  progress.practice={...v24PracticeDefaults(),...(x.practice||{})};
  const cd=v24ConversationDefaults(),cv=x.conversation||{};
  progress.conversation={...cd,...cv,modeRuns:{...cd.modeRuns,...(cv.modeRuns||{})},missionRuns:{...cd.missionRuns,...(cv.missionRuns||{})},history:Array.isArray(cv.history)?cv.history:[]};
  v23MetricContextId=n;
};
const _v23SaveProgressV24=saveProgress;
saveProgress=function(){
  try{
    if(state?.lesson&&activeLessonId()===v23MetricContextId){
      const x=v24LessonMetric(activeLessonId());
      x.coverage=v24Clone(progress.coverage||v23CoverageDefaults());
      x.evidence=v24Clone(progress.evidence||v23EvidenceDefaults());
      x.speakingAttempts=Number(progress.speakingAttempts||0);x.lastSpeechScore=Number(progress.lastSpeechScore||0);
      x.practice=v24Clone(progress.practice||v24PracticeDefaults());
      x.conversation=v24Clone(progress.conversation||v24ConversationDefaults());
    }
  }catch(e){}
  progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=V24_BUILD;
  // Bypass the v0.23 metrics-only wrapper: it replaced the whole lessonMetrics
  // object and would otherwise drop v0.24 Recall/Conversation fields.
  return _v23SaveProgressBase();
};

function v24Pack(){return window.EngBookContent?.getPack?.(activeLessonId())||null;}
function v24Recall(){return v24Pack()?.content?.recall||null;}
function v24ConversationSpec(){return v24Pack()?.content?.conversation||null;}
function v24ActiveFactItems(){return activeLessonId()===1?PRACTICE_ITEMS:(Array.isArray(v24Recall()?.factItems)&&v24Recall().factItems.length?v24Recall().factItems:[]);}
function v24ActiveBuilderSentences(){return activeLessonId()===1?BUILDER_SENTENCES:(Array.isArray(v24Recall()?.builderSentences)&&v24Recall().builderSentences.length?v24Recall().builderSentences:[]);}
function v24CompletionKey(part){return `l${activeLessonId()}_${part}`;}
function v24MistakeKey(type,key){return activeLessonId()===1?String(key):`l${activeLessonId()}:${type}:${key}`;}

// ----- Generic Active Recall -----
// Picture recall uses one lesson-scoped implementation above.

initBuilder=function(){const list=v24ActiveBuilderSentences();if(!list.length){state.builderAvailable=[];state.builderChosen=[];state.builderResult='';return;}state.builderIndex=clamp(Number(state.builderIndex||0),0,list.length-1);const ids=list[state.builderIndex].map((_,i)=>i);state.builderAvailable=shuffle([...ids]);state.builderChosen=[];state.builderResult='';};
checkBuilder=function(){if(state.builderResult==='correct')return;const list=v24ActiveBuilderSentences();if(!list.length)return;const parts=list[state.builderIndex],ok=state.builderChosen.length===parts.length&&state.builderChosen.every((id,i)=>id===i);state.builderResult=ok?'correct':'wrong';haptic(ok?[15,25,40]:25);if(ok){resolveMistakes('builder',v24MistakeKey('builder',state.builderIndex));awardPoints(10,'builder');speak(parts.join(' '));}else recordMistake('builder',v24MistakeKey('builder',state.builderIndex),'Rebuild the sentence in natural English order.',parts.join(' '),activeLessonId()===1?'Keep the relationship phrase inside the evidence boundary; do not turn unshown history into fact.':'Keep each meaning chunk together and rebuild the source-grounded sentence in natural order.');render();};
nextBuilder=function(){const list=v24ActiveBuilderSentences();if(!list.length)return;state.builderIndex=(state.builderIndex+1)%list.length;initBuilder();render();};
builderContent=function(){const list=v24ActiveBuilderSentences();if(!list.length)return `<div class="practice-complete repair-empty"><div class="success-orb">${icon('target')}</div><span>SENTENCE REBUILD</span><h3>No validated builder items in this Lesson Pack.</h3><p>The content pipeline will only expose Sentence Builder when source-grounded chunks are available.</p></div>`;const parts=list[state.builderIndex];return `<div class="builder-card"><div class="builder-head"><div><span>SENTENCE ${state.builderIndex+1}/${list.length}</span><h3>Build the sentence from meaning chunks</h3></div><button data-eng-v52-click="builderReset()">${icon('reset')} Reset</button></div><div class="answer-zone ${state.builderResult}">${state.builderChosen.length?state.builderChosen.map(id=>`<button data-eng-v52-click="builderUndo(${id})">${esc(parts[id])}</button>`).join(''):'<span>Tap the chunks below in the right order…</span>'}</div><div class="token-bank">${state.builderAvailable.map(id=>`<button data-eng-v52-click="builderPick(${id})">${esc(parts[id])}</button>`).join('')}</div><div class="builder-actions"><button class="secondary" data-eng-v52-click="builderUndo()" ${!state.builderChosen.length?'disabled':''}>Undo</button><button class="primary" data-eng-v52-click="checkBuilder()" ${state.builderChosen.length!==parts.length||state.builderResult==='correct'?'disabled':''}>Check sentence</button></div>${state.builderResult==='correct'?`<div class="builder-feedback good">${icon('check')} Correct. The sentence stays tied to this scene’s validated language. <button data-eng-v52-click="nextBuilder()">Next sentence →</button></div>`:state.builderResult==='wrong'?`<div class="builder-feedback try">Not quite. Rebuild the meaning chunks in natural English order.</div>`:''}</div>`;};

answerFact=function(kind){if(state.factAnswered||!['fact','inference','unsupported'].includes(kind))return;const items=v24ActiveFactItems(),item=items[state.factIndex];if(!item)return;const ok=kind===item.kind;state.factAnswered={ok,kind};if(ok){state.factScore++;resolveMistakes('evidence',v24MistakeKey('evidence',state.factIndex));awardPoints(6,'evidence');}else recordMistake('evidence',v24MistakeKey('evidence',state.factIndex),item.text,item.kind,item.note);haptic(ok?[15,25,30]:22);render();};
nextFact=function(){if(!state.factAnswered)return;const items=v24ActiveFactItems();if(state.factIndex<items.length-1){state.factIndex++;state.factAnswered=null;render();}else{progress.completed[v24CompletionKey('practice')]=true;saveProgress();toast(`Evidence recall complete: ${state.factScore}/${items.length}`);state.factIndex=0;state.factAnswered=null;state.factScore=0;render();}};
factContent=function(){const items=v24ActiveFactItems();if(!items.length)return `<div class="practice-complete repair-empty"><div class="success-orb">${icon('eye')}</div><span>EVIDENCE RECALL</span><h3>No validated claim items in this Lesson Pack.</h3><p>The pack must supply source-grounded fact / inference / unsupported items before this drill is released.</p></div>`;const item=items[state.factIndex];const triple=items.some(x=>x.kind==='unsupported');return `<div class="fact-game"><div class="fact-counter"><span>EVIDENCE CHECK ${state.factIndex+1}/${items.length}</span><b>${state.factScore} correct</b></div><article><div class="quote-mark">“</div><h3>${esc(item.text)}</h3><p>${triple?'Is this directly visible, a supported inference, or unsupported by the scene?':'Is this directly supported by the image, or is it an interpretation/story claim?'}</p></article><div class="fact-actions ${triple?'triple':''}"><button data-eng-v52-click="answerFact('fact')" ${state.factAnswered?'disabled':''}>${icon('eye')} Visible fact</button><button data-eng-v52-click="answerFact('inference')" ${state.factAnswered?'disabled':''}>${icon('layers')} Inference</button>${triple?`<button data-eng-v52-click="answerFact('unsupported')" ${state.factAnswered?'disabled':''}>${icon('close')} Unsupported</button>`:''}</div>${state.factAnswered?`<div class="fact-feedback ${state.factAnswered.ok?'good':'try'}"><b>${state.factAnswered.ok?'Correct':'Check the scene evidence again'}</b><p>${esc(item.note)}</p><button data-eng-v52-click="nextFact()">${state.factIndex===items.length-1?'Finish':'Next'} →</button></div>`:''}</div>`;};

const _v23PracticeContentV24=practiceContent;
practiceContent=function(){
  if(activeLessonId()===1)return _v23PracticeContentV24();
  const recall=v24Recall(),tabs=[['smart','Smart review'],['mistakes',`Mistake repair${(progress.mistakes||[]).length?` (${progress.mistakes.length})`:''}`],['saved',`Saved lines${(progress.savedLines||[]).length?` (${progress.savedLines.length})`:''}`],['find','Find it'],['listen','Listen & find']];
  if(recall?.builderSentences?.length)tabs.push(['builder','Sentence builder']);if(recall?.factItems?.length)tabs.push(['fact','Evidence recall']);
  return `<section><div class="panel-heading"><div><span class="section-kicker">GENERIC ACTIVE RECALL • LESSON ${courseLessonLabel(activeLessonId())}</span><h2>Retrieve this scene from memory</h2><p>${esc(recall?.principle||'Use the image to retrieve words, rebuild connected sentences, and separate evidence from inference.')}</p></div></div><div class="practice-tabs">${tabs.map(([k,t])=>`<button class="${state.practiceType===k?'active':''}" data-eng-v52-click="setPractice('${k}')">${t}</button>`).join('')}</div>${practiceBody()}</section>`;
};

// ----- Generic Scene Conversation -----
function v24MissionMap(){const m=v24ConversationSpec()?.missions;return m&&typeof m==='object'?m:null;}
const _v23SceneMissionV24=sceneMission;
sceneMission=function(){
  if(activeLessonId()===1)return _v23SceneMissionV24();
  const missions=v24MissionMap()||{};
  if(state.sceneAnchor){const base=missions[state.conversationMission]||missions.listener||Object.values(missions)[0];return {label:`Anchor Talk • ${state.sceneAnchor}`,icon:'spark',tag:state.tapTalkAction==='evidence'?'EVIDENCE':'ANCHOR TALK',sub:`Start from “${state.sceneAnchor}”, then connect that detail to the wider ${state.lesson?.title||'scene'}.`,prompts:tapActionPromptBank()||base?.prompts||[]};}
  return missions[state.conversationMission]||missions.listener||Object.values(missions)[0]||{label:'Scene Conversation',icon:'spark',tag:'SCENE',sub:'Speak from the current image.',prompts:[]};
};

const _v23ConversationPromptBankV24=conversationPromptBank;
conversationPromptBank=function(){if(activeLessonId()===1)return _v23ConversationPromptBankV24();const tap=state.sceneAnchor?tapActionPromptBank():null;if(tap?.length)return tap;return sceneMission().prompts||[];};

const _v23MissionSelectorV24=missionSelector;
missionSelector=function(){
  if(activeLessonId()===1)return _v23MissionSelectorV24();
  const missions=v24MissionMap()||{};const anchor=state.sceneAnchor?`<section class="anchor-context-card"><div class="anchor-thumb"><img src="${esc(state.lesson?.image||'')}" alt=""><i></i></div><div><span>ANCHOR TALK</span><h3>${esc(state.sceneAnchor)}</h3><p>Use this visible anchor as a doorway into description, evidence, and connected conversation.</p></div><button data-eng-v52-click="clearTapTalkContext()">Clear</button></section>`:'';
  return `${anchor}<div class="scene-mission-grid">${Object.entries(missions).map(([k,m])=>`<button class="scene-mission ${state.conversationMission===k&&!state.sceneAnchor?'active':''}" data-eng-v52-click="state.sceneAnchor=null;state.tapTalkAction=null;state.roleShift='observer';setConversationMission('${k}')"><i>${icon(m.icon||'spark')}</i><span><em>${esc(m.tag||'SCENE')}</em><b>${esc(m.label||k)}</b><small>${esc(m.sub||'')}</small></span></button>`).join('')}</div>`;
};

const _v23TapTalkMetaV24=tapTalkMeta;
tapTalkMeta=function(word){
  if(activeLessonId()===1)return _v23TapTalkMetaV24(word);
  const h=state.lesson?.hotspots?.find(x=>x.en===word),details=h?hotspotDetail(h,v24Pack()?.content||{}):{};
  const visible=h?.example||details.grammar||`${word} is a visible anchor in this scene.`;
  return {visible,describe:[`Describe ${word} using only what you can see in this image.`,`Place ${word} in relation to one other visible detail.`],evidence:[`What about ${word} is directly visible?`,`What can you infer cautiously from ${word}, and which visible clue supports that inference?`],question:`Ask and answer one useful image-grounded question about ${word}.`};
};
const _v23TapTalkWheelV24=tapTalkWheel;
tapTalkWheel=function(h){if(activeLessonId()===1)return _v23TapTalkWheelV24(h);const open=state.tapTalkOpen;return `<div class="tap-talk-wheel-wrap ${open?'open':''}" style="left:${clamp(h.x,18,82)}%;top:${clamp(h.y,23,77)}%" data-eng-v52-click="event.stopPropagation()"><button class="tap-talk-core" data-eng-v52-click="state.tapTalkOpen=!state.tapTalkOpen;render()"><i>${icon('spark')}</i><span>Talk</span></button>${open?`<div class="tap-talk-orbit"><button class="orbit-a" data-eng-v52-click="tapTalkStart('name','${q(h.en)}')"><i>${icon('volume')}</i><span>Name</span></button><button class="orbit-b" data-eng-v52-click="tapTalkStart('describe','${q(h.en)}')"><i>${icon('mic')}</i><span>Describe</span></button><button class="orbit-c" data-eng-v52-click="tapTalkStart('evidence','${q(h.en)}')"><i>${icon('eye')}</i><span>Evidence</span></button><button class="orbit-d" data-eng-v52-click="tapTalkStart('ask','${q(h.en)}')"><i>?</i><span>Question</span></button><button class="orbit-e" data-eng-v52-click="tapTalkStart('converse','${q(h.en)}')"><i>${icon('spark')}</i><span>Converse</span></button></div>`:''}</div>`;};
const _v23TapTalkPanelV24=tapTalkPanel;
tapTalkPanel=function(h){if(activeLessonId()===1)return _v23TapTalkPanelV24(h);const meta=tapTalkMeta(h.en);return `<section class="tap-talk-panel"><div class="tap-talk-panel-head"><div><span>ANCHOR → TALK</span><b>Turn “${esc(h.en)}” into connected English</b></div><button data-eng-v52-click="tapTalkStart('describe','${q(h.en)}')">Start ${icon('chevron')}</button></div><p>${esc(meta.visible)}</p><div class="tap-talk-actions-grid"><button data-eng-v52-click="tapTalkStart('describe','${q(h.en)}')">${icon('mic')}<span><b>Describe</b><small>focused mini-turn</small></span></button><button data-eng-v52-click="tapTalkStart('evidence','${q(h.en)}')">${icon('eye')}<span><b>Evidence</b><small>fact → inference</small></span></button><button data-eng-v52-click="tapTalkStart('ask','${q(h.en)}')"><i>?</i><span><b>Ask & answer</b><small>build a scene question</small></span></button><button data-eng-v52-click="tapTalkStart('converse','${q(h.en)}')">${icon('spark')}<span><b>Converse</b><small>connect to the wider scene</small></span></button></div></section>`;};
const _v23TapTalkStartV24=tapTalkStart;
tapTalkStart=function(action,word){
  if(activeLessonId()===1)return _v23TapTalkStartV24(action,word);
  const h=state.lesson?.hotspots?.find(x=>x.en===word);state.sceneAnchor=word;state.tapTalkAction=action;state.tapTalkOpen=false;state.roleplayCharacter=null;state.roleShift='observer';progress.tapTalk=progress.tapTalk||{launches:0,anchors:{},roles:{},actions:{}};progress.tapTalk.launches=(progress.tapTalk.launches||0)+1;progress.tapTalk.anchors[word]=(progress.tapTalk.anchors[word]||0)+1;progress.tapTalk.actions[action]=(progress.tapTalk.actions[action]||0)+1;
  if(action==='name'){if(h){state.selected=state.lesson.hotspots.findIndex(x=>x.en===word);state.wordDepth='word';speak(word,.78);}saveProgress();render();return;}
  state.conversationMission=action==='evidence'?'detective':'listener';clearConversationRunKeepContext();state.mode='talk';saveProgress();haptic([12,20,28]);render();setTimeout(()=>playCoachPrompt(.86,false),160);
};

const _v23TapActionPromptBankV24=tapActionPromptBank;
tapActionPromptBank=function(){
  if(activeLessonId()===1)return _v23TapActionPromptBankV24();const word=state.sceneAnchor;if(!word)return null;const meta=tapTalkMeta(word),action=state.tapTalkAction;
  if(action==='evidence')return [{label:'VISIBLE FIRST',prompt:meta.evidence[0],hint:'Start with only what the frame directly supports.',focus:'detail'},{label:'INTERPRET SECOND',prompt:meta.evidence[1],hint:'Use may, might, seems, appears, or suggests.',focus:'inference'},{label:'DRAW THE LIMIT',prompt:`Name one thing about ${word} that this image does not let us know for sure.`,hint:'Accuracy includes knowing what not to claim.',focus:'inference'},{label:'REPAIR CERTAINTY',prompt:`Create one overconfident claim about ${word}, then repair it into evidence-safe English.`,hint:'Return to visible evidence and cautious wording.',focus:'inference'}];
  if(action==='ask')return [{label:'BUILD THE QUESTION',prompt:meta.question,hint:'Use What / Where / How, then answer from the image.',focus:'overview'},{label:'ASK ABOUT POSITION',prompt:`Ask where ${word} is in the scene, then answer with spatial language.`,hint:'Use on the left / in front of / behind / in the background if appropriate.',focus:'spatial'},{label:'ASK ABOUT MEANING',prompt:`Ask one inference question about ${word}. Answer cautiously and give a visible reason.`,hint:'Use may / might / seems / suggests.',focus:'inference'},{label:'FOLLOW UP',prompt:`Ask one natural follow-up question that connects ${word} to another visible detail.`,hint:'Keep the answer scene-grounded.',focus:'extension'}];
  if(action==='converse')return [{label:`START FROM • ${word.toUpperCase()}`,prompt:`Start with ${word}. Tell me what it is, where it is, and one visible detail.`,hint:'Use the anchor as your starting point.',focus:'overview'},{label:'CONNECT OUTWARD',prompt:`Connect ${word} to one person, action, object, or background detail in the current image.`,hint:'Link two visible anchors in one sentence.',focus:'spatial'},{label:'MAKE IT ACTIVE',prompt:`Use ${word} in a sentence about what is happening right now.`,hint:'Use present continuous when an action is visibly in progress.',focus:'action'},{label:'FACT + INFERENCE',prompt:`Finish with one direct fact about ${word} and one cautious inference related to it.`,hint:'Use may / might / appears / seems / suggests for the inference.',focus:'inference'}];
  return [{label:`FOCUS • ${word.toUpperCase()}`,prompt:meta.describe[0],hint:'Stay concrete and scene-grounded.',focus:'detail'},{label:'CONNECT IT',prompt:meta.describe[1],hint:'Link the anchor to another visible detail.',focus:'spatial'},{label:'USE IT IN ACTION',prompt:`Give one connected sentence that includes “${word}” and a visible action from this scene.`,hint:'Prefer present continuous for action in progress.',focus:'action'},{label:'ONE SAFE INFERENCE',prompt:`Add one cautious interpretation related to ${word}, and name the visible clue that supports it.`,hint:'Use may, might, seems, appears, or suggests.',focus:'inference'}];
};

const _v23AdaptivePromptV24=adaptivePromptFromPrevious;
adaptivePromptFromPrevious=function(turn,base){
  if(activeLessonId()===1)return _v23AdaptivePromptV24(turn,base);const prev=state.conversationResponses[state.conversationResponses.length-1];if(!prev||turn===0)return base;const t=String(prev.text||'').toLowerCase(),fb=prev.feedback||{},missing=sceneCoverageAnalysis(prev.text||'').missing;
  if((fb.relevance||0)<58&&missing.length){const a=missing[0];return {...base,prompt:`Add one concrete scene anchor you missed: ${a.label}. What can you see about it, and where is it?`};}
  if((base.focus==='spatial'||turn>=1)&&!['left','right','foreground','background','behind','beside','between','in front of','on the table','by the window'].some(x=>t.includes(x)))return {...base,prompt:'Help the listener place the important details: use at least one clear spatial relation from the current image.'};
  if(base.focus==='action'&&!sceneCoverageAnalysis(prev.text||'').hits.some(a=>a.group==='Action'))return {...base,prompt:'You gave useful scene detail. Now add one action that is directly visible in the current frame.'};
  return base;
};

const _v23ConversationImprovedLineV24=conversationImprovedLine;
conversationImprovedLine=function(focus,text){if(activeLessonId()===1)return _v23ConversationImprovedLineV24(focus,text);const r=v24ConversationSpec()?.recasts||{};return r[focus]||r.overview||activeGold()?.overview||String(text||'');};
const _v23AnalyzeConversationV24=analyzeConversationResponse;
analyzeConversationResponse=function(turn,text){
  if(activeLessonId()===1)return _v23AnalyzeConversationV24(turn,text);
  const t=String(text||'').toLowerCase(),wc=wordCount(text),cov=sceneCoverageAnalysis(text),ev=evidenceAnalysis(text),focus=conversationPrompt(turn)?.focus||'overview';
  const spatialTerms=['left','right','foreground','background','middle ground','beside','behind','in front of','near','next to','between','on the table','at the table','by the window','against the wall'];
  const spatial=spatialTerms.filter(x=>t.includes(x)),seq=['before','now','next','then','after','while','finally'].filter(x=>t.includes(x)),caution=(v24Pack()?.evidenceProfile?.cautionTerms||EVIDENCE_CAUTION_TERMS).filter(x=>t.includes(String(x).toLowerCase()));
  const actionHits=cov.hits.filter(a=>a.group==='Action'),settingHits=cov.hits.filter(a=>a.group==='Setting'),pc=/\b(?:am|is|are)\s+(?:\w+\s+){0,2}\w+ing\b/i.test(text)||t.includes('while');
  let relevance=0,tool=0,repair='',strength='';
  if(['overview','detail'].includes(focus)){
    relevance=Math.min(100,Math.round(cov.pct*.72+Math.min(28,wc*2)+(cov.hits.length>=2?12:0)));
    tool=Math.min(100,(spatial.length?30:12)+(wc>=10?35:18)+(cov.hits.length>=3?30:12));
    repair=cov.hits.length<2?'Add two concrete visual anchors before interpreting the scene.':spatial.length?'Keep the answer compact and connect one visible action.':'Add one location phrase so the listener can place the details.';
    strength=cov.hits.length>=2?'You grounded the answer in concrete details from this scene.':'You stayed connected to the current image.';
  } else if(focus==='spatial'){
    relevance=Math.min(100,Math.round(cov.pct*.42+spatial.length*22+settingHits.length*10+18));tool=Math.min(100,spatial.length*36+(settingHits.length>=2?28:10));repair=spatial.length<2?'Use at least two spatial links such as on the left, behind, in front of, or in the background.':'Connect the locations into one flowing route instead of listing them.';strength=spatial.length?'You positioned details instead of listing isolated nouns.':'You kept the response tied to visible parts of the frame.';
  } else if(focus==='action'){
    relevance=Math.min(100,actionHits.length*32+Math.min(32,cov.pct*.35)+20);tool=Math.min(100,(pc?72:28)+actionHits.length*18);repair=pc?'Connect the visible actions naturally and keep them in the present moment.':'Use am/is/are + verb-ing for an action visibly in progress.';strength=actionHits.length?'You named action that is actually supported by this frame.':'You kept the answer focused on the scene’s present moment.';
  } else if(focus==='inference'){
    relevance=Math.min(100,Math.round(cov.pct*.30+ev.inference*25+ev.visible*10+30));tool=Math.min(100,(caution.length?45:15)+(ev.unsupported===0&&(ev.review||0)===0?35:5)+(ev.inference?25:10));repair=ev.unsupported?ev.claims.find(c=>c.type==='unsupported')?.repair||'Repair the unsupported claim with scene evidence and cautious language.':caution.length?'Tie the inference to one visible clue and keep the exact history or status uncertain.':'Add may / might / seems / suggests so interpretation is not stated as fact.';strength=ev.inference&&ev.unsupported===0&&(ev.review||0)===0?'You separated interpretation from visible fact.':'You attempted to interpret the scene while staying near its evidence.';
  } else {
    relevance=Math.min(100,seq.length*18+Math.round(cov.pct*.28)+(ev.unsupported===0&&(ev.review||0)===0?18:4)+20);tool=Math.min(100,(caution.length?35:12)+(seq.length?38:8)+(wc>=12?22:8)+(ev.unsupported===0&&(ev.review||0)===0?12:0));repair=ev.unsupported?ev.claims.find(c=>c.type==='unsupported')?.repair||'Keep invented events hypothetical.':'Use a simple Before → Now → Next frame and mark Before / Next with may, might, or could.';strength=seq.length?'You extended the scene with sequence language.':'You kept the conversation moving beyond isolated vocabulary.';
  }
  const length=Math.min(100,Math.round(wc/18*100)),penalty=Math.min(40,ev.unsupported*14+(ev.review||0)*6),score=clamp(Math.round(relevance*.45+tool*.4+length*.15)-penalty,0,100),improved=conversationImprovedLine(focus,text);
  return {score,relevance,tool,wc,repair,strength,improved,focus,anchors:cov.hits.map(a=>a.label),spatial,evidenceControl:ev.control,unsupported:ev.unsupported};
};

const _v23VoiceRoomV24=voiceRoom;
voiceRoom=function(turn,fb){if(activeLessonId()===1)return _v23VoiceRoomV24(turn,fb);return _v23VoiceRoomV24(turn,fb).replaceAll('assets/images/lesson_01.jpg',esc(state.lesson?.image||''));};
const _v23ConversationContentV24=conversationContent;
conversationContent=function(){const html=_v23ConversationContentV24();if(activeLessonId()===1)return html;return html.replaceAll('assets/images/lesson_01.jpg',esc(state.lesson?.image||''));};

nextConversation=function(autoHandsFree=false){
  if(!state.conversationFeedback)return;
  if(state.conversationTurn>=conversationTurnCount()-1){state.conversationComplete=true;state.handsFree=false;state.voiceStage='idle';progress.conversation.completed=(progress.conversation.completed||0)+1;progress.completed[v24CompletionKey('talk')]=true;awardPoints(20,'conversation-complete');saveConversationHistory();saveProgress();render();return;}
  state.conversationTurn++;state.conversationFeedback=null;state.conversationHint=false;state.conversationInput='';state.explainRepair=false;state.retryOriginal=null;render();if(autoHandsFree)setTimeout(()=>playCoachPrompt(.86,true),250);else setTimeout(()=>playCoachPrompt(.83,false),180);
};

// Lessons 02–03 validate that the reusable core loop is genuinely scene-generic.
try{[2,3].forEach(id=>{const p=window.EngBookContent?.getPack?.(id);if(p&&(!p.capabilities.includes('practice')||!p.capabilities.includes('conversation')))console.warn(`Lesson ${id} pack was loaded without core interaction capabilities. Rebuild the validated lesson-pack registry.`);});}catch(e){}

// Update v0.23 product decorators to describe the v0.24 capability level accurately.
const _v23LessonLibraryV24=v23LessonLibrary;
v23LessonLibrary=function(){const html=_v23LessonLibraryV24();return html.replace('CONTENT PIPELINE • CATEGORY 01','CATEGORY 01 • LEARNING PATH').replace('Lesson 02 is the first generated core pack. Locked lessons stay catalogued until their image-verified data passes the same pipeline.','Lessons 02–03 now run the same reusable core loop: Explore → Learn → Recall → Describe → Evidence → Converse. Locked lessons stay catalogued until their validated packs reach the same standard.').replaceAll('Core • Explore · Learn · Describe · Evidence','Core+ • Explore · Recall · Describe · Evidence · Converse').replace('Source → Lesson Pack → Validation → Generated registry → Runtime','Source → Lesson Pack → Validation → Recall/Conversation contract → Runtime');};
const _v23DecorateLessonV24=v23DecorateLesson;
v23DecorateLesson=function(){_v23DecorateLessonV24();if(activeLessonId()!==1){const strip=document.querySelector('.v23-source-strip small');if(strip)strip.textContent='Learning path: Explore • Learn • Recall • Describe • Evidence • Converse. Specialist Studio tools unlock only when the lesson data supports them.';}};
const _v23DecorateHomeV24=v23DecorateHome;
v23DecorateHome=function(){_v23DecorateHomeV24();document.querySelectorAll('.v20-build').forEach(el=>el.textContent='v'+BUILD_INFO.version);const ready=window.EngBookContent?.snapshot?.().readyLessons?.length||0;const meta=document.querySelector('.product-home-meta');if(meta){const lessonSpan=[...meta.querySelectorAll('span')].find(x=>/runtime-ready lessons|Lesson 01|reference scene/.test(x.textContent));if(lessonSpan)lessonSpan.textContent=`${ready} lessons ready`;}};

const _v23DiagnosticsV24=v21Diagnostics;
v21Diagnostics=function(){const c2=window.EngBookContent?.getPack?.(2)?.capabilities||[],c3=window.EngBookContent?.getPack?.(3)?.capabilities||[];return {..._v23DiagnosticsV24(),build:V24_BUILD,coreInteraction:{lesson2Practice:c2.includes('practice'),lesson2Conversation:c2.includes('conversation'),lesson3Practice:c3.includes('practice'),lesson3Conversation:c3.includes('conversation')}};};

try{progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=BUILD_INFO.tag;saveProgress();}catch(e){}
window.addEventListener('load',()=>setTimeout(()=>{try{v23DecorateShell();document.querySelectorAll('.v20-build').forEach(el=>el.textContent='v'+BUILD_INFO.version);}catch(e){}},220));


/* v0.25 pack-driven grammar discipline.
   Generated lessons can now define their own context gate instead of inheriting
   Lesson 02's Present Perfect logic. This keeps the speech evaluator scene-generic. */
function v25RegexAny(text,patterns){return (Array.isArray(patterns)?patterns:[]).some(src=>{try{return new RegExp(src,'i').test(String(text||''));}catch(e){return false;}});}
function v25GrammarDiscipline(text){
  const grammar=v24Pack()?.content?.grammar||{},spec=grammar.runtime||null,title=grammar.title||'Lesson grammar';
  if(!spec)return {score:82,note:`${title}: use the lesson target only where its meaning is supported by context.`};
  const detected=v25RegexAny(text,spec.detectPatterns),unsafe=v25RegexAny(text,spec.unsafePatterns),safe=v25RegexAny(text,spec.safePatterns);
  if(unsafe)return {score:Number(spec.unsafeScore??35),note:String(spec.unsafeNote||`${title}: the target structure was used to invent unshown scene history.`)};
  if(detected&&safe)return {score:Number(spec.safeScore??94),note:String(spec.safeNote||`${title}: target structure used with an explicit context boundary.`)};
  if(detected)return {score:Number(spec.detectedScore??70),note:String(spec.detectedNote||`${title}: target structure detected; make its context explicit.`)};
  return {score:Number(spec.idleScore??82),note:String(spec.idleNote||`${title}: no unsupported grammar-based history was introduced.`)};
}
const _v24SpeechAnalysisV25=speechAnalysis;
speechAnalysis=function(){
  const out=_v24SpeechAnalysisV25();if(activeLessonId()===1||!out?.dims)return out;
  const g=v25GrammarDiscipline(String(state.transcript||'')),i=out.dims.findIndex(d=>d[0]==='Grammar discipline');
  if(i>=0)out.dims[i]=['Grammar discipline',g.score,g.note];
  out.overall=Math.round(out.dims.reduce((a,d)=>a+Number(d[1]||0),0)/out.dims.length);return out;
};

/* v0.25 Third-scene validation marker */
window.ENGBOOK_RUNTIME={build:BUILD_INFO.tag,generatedCoreLessons:[2,3],contentRevision:BUILD_INFO.contentRevision};

/* ======================================================================
   v0.27 — EXPERIENCE & ADAPTIVE CORE UPGRADE
   Premium learning cockpit + local adaptive coach + cross-lesson review.
   No new lesson content is introduced in this release.
   ====================================================================== */
const V27_BUILD=BUILD_INFO.tag;
function v27CoachDefaults(){return {support:'balanced',smartLaunches:0,reviewLaunches:0,lastAction:'',lastLesson:Number(progress.lastLesson||1),missionRuns:0};}
function v27EnsureCoach(){progress.coach={...v27CoachDefaults(),...(progress.coach||{})};return progress.coach;}
function v27ReadyLessons(){try{return (window.EngBookContent?.listLessons?.(1)||[]).filter(x=>x.ready);}catch(e){return[];}}
function v27LessonMeta(id){const n=Number(id||1);try{return window.EngBookContent?.getMeta?.(n)||v27ReadyLessons().find(x=>Number(x.id)===n)||null;}catch(e){return null;}}
function v27LessonResolved(id){const n=Number(id||1);try{return window.EngBookContent?.resolve?.(n)?.lesson||window.EngBookContent?.getPack?.(n)?.lesson||CAT01.lessons.find(x=>Number(x.id)===n)||CAT01.lessons[0];}catch(e){return CAT01.lessons[0];}}
function v27MetricsFor(id){const n=Number(id||1),m=progress.lessonMetrics?.[n]||{};if(state?.lesson&&activeLessonId()===n)return {coverage:progress.coverage||{},evidence:progress.evidence||{},practice:progress.practice||{},conversation:progress.conversation||{},speakingAttempts:progress.speakingAttempts||0,lastSpeechScore:progress.lastSpeechScore||0,...m};return m;}
function v27ScopedMistakes(id){const n=Number(id||1),arr=Array.isArray(progress.mistakes)?progress.mistakes:[];if(n===1)return arr.filter(x=>!/^l\d+:/.test(String(x?.key||x?.id||''))||String(x?.key||x?.id||'').startsWith('l1:'));return arr.filter(x=>String(x?.key||x?.id||'').startsWith(`l${n}:`));}
function v27Context(id){const n=Number(id||1),meta=v27LessonMeta(n),lesson=v27LessonResolved(n),pack=window.EngBookContent?.getPack?.(n)||{};return {lessonId:n,lesson,pack:{...pack,capabilities:pack.capabilities||meta?.capabilities||[]},metrics:v27MetricsFor(n),discovered:progress.discovered?.[n]||[],dueCount:n===activeLessonId()&&state?.lesson?dueAnchors().length:0,mistakeCount:v27ScopedMistakes(n).length};}
function v27Signals(id){return window.EngBookLearning?.lessonSignals?.(v27Context(id))||{discovery:0,recall:0,describe:0,evidence:0,conversation:null,precision:0,balance:0,capabilities:[]};}
function v27Action(id){return window.EngBookLearning?.nextAction?.(v27Context(id))||{key:'explore',mode:'explore',label:'Explore the scene',short:'Explore',reason:'Build a visual map before speaking.',icon:'compass'};}
function v27Support(){return window.EngBookLearning?.supportProfile?.(v27EnsureCoach().support)||{key:'balanced',label:'Balanced',description:'Help appears only when useful.'};}
function v27SetSupport(level){const c=v27EnsureCoach();c.support=['guided','balanced','independent'].includes(level)?level:'balanced';saveProgress();haptic(10);render();}
function v27LessonCompletion(id=activeLessonId()){
  const n=Number(id||1),ctx=v27Context(n),sig=v27Signals(n),caps=ctx.pack.capabilities||[];
  const steps=[['explore','explore'],['learn','evidence'],['practice','practice'],['speak','speaking'],['talk','talk']].filter(([m])=>n===1||!v23ModeCapability(m)||caps.includes(v23ModeCapability(m)));
  const done=steps.filter(([,k])=>Boolean(progress.completed?.[`l${n}_${k}`])).length;
  const stepPct=steps.length?done/steps.length*100:0;
  return clamp(Math.round(sig.discovery*.32+stepPct*.43+sig.balance*.25),0,100);
}
completion=function(){return v27LessonCompletion(activeLessonId());};
function v27OpenLesson(id,mode='explore'){const n=Number(id||1);if(!window.EngBookContent?.canOpen?.(n)){toast('This lesson is still in editorial validation.');return;}openLesson(n);if(mode)setMode(mode);}
function v27LaunchAction(id,forcedKey=''){
  const n=Number(id||progress.lastLesson||1),action=forcedKey?({...v27Action(n),key:forcedKey,mode:{explore:'explore',recall:'practice',describe:'speak',evidence:'learn',conversation:'talk',review:'practice'}[forcedKey]||v27Action(n).mode}):v27Action(n),coach=v27EnsureCoach();
  coach.smartLaunches=(coach.smartLaunches||0)+1;coach.lastAction=action.key;coach.lastLesson=n;progress.lastLesson=n;saveProgress();
  openLesson(n);let mode=window.EngBookLearning?.launchMode?.(action,coach.support)||action.mode;
  const cap=v23ModeCapability(mode);if(n!==1&&cap&&!v23Has(cap))mode=v23Has('describe')?'speak':'explore';
  if(mode==='practice')setPractice(v27ScopedMistakes(n).length?'mistakes':'smart');
  if(mode==='speak'){const s=v27Support().key;state.speakingDuration=s==='guided'?30:s==='independent'?90:60;state.speakingSeconds=state.speakingDuration;}
  if(mode==='talk'){state.conversationMode=v27Support().key==='guided'?'guided':v27Support().key==='independent'?'challenge':'natural';state.conversationMission='listener';}
  setMode(mode);haptic([10,14,18]);
}
function v27ReviewQueue(){
  const lessons=v27ReadyLessons().map(x=>({...x,pack:window.EngBookContent?.getPack?.(x.id)||{},lesson:v27LessonResolved(x.id)}));
  return window.EngBookLearning?.categoryReviewQueue?.({lessons,metrics:progress.lessonMetrics||{},discovered:progress.discovered||{},completed:progress.completed||{},mistakes:progress.mistakes||[]})||[];
}
function v27MissionDeck(id){return window.EngBookLearning?.missionDeck?.(v27Context(id))||{next:v27Action(id),items:[]};}
function v27LaunchMission(id,key){const c=v27EnsureCoach();c.missionRuns=(c.missionRuns||0)+1;saveProgress();v27LaunchAction(id,key==='precision'?(v27Signals(id).discovery<70?'explore':'describe'):key==='transfer'?'conversation':key==='retrieval'?'recall':key);}

function v27HomeHeader(){const m=ensureMomentum(),ready=v27ReadyLessons().length,c=v27EnsureCoach();return `<header class="v27-home-header"><div class="v27-brand"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual Conversation</small></div></div><div class="v27-home-status"><span><i></i>${ready}/28 ready</span><span>${m.days||1} day${(m.days||1)===1?'':'s'} active</span><button data-eng-v52-click="showOnboarding(0)" aria-label="Quick guide">?</button><button class="v27-avatar" data-eng-v52-click="productOpenProfile()" aria-label="Open learning profile">${Math.max(1,Math.min(99,fpProfile().balance||0))}</button></div></header>`;}
function v27Hero(){
  const ready=v27ReadyLessons(),last=ready.some(x=>Number(x.id)===Number(progress.lastLesson))?Number(progress.lastLesson):Number(ready[0]?.id||1),meta=v27LessonMeta(last)||{},sig=v27Signals(last),action=v27Action(last),support=v27Support(),pct=v27LessonCompletion(last),img=meta.image||`assets/images/lesson_${String(last).padStart(2,'0')}.jpg`;
  return `<section class="v27-hero"><div class="v27-hero-scene"><img src="${esc(img)}" alt="${esc(meta.title||'Current lesson')}"><div class="v27-hero-overlay"></div><div class="v27-hero-badge"><span>CONTINUE</span><b>Lesson ${courseLessonLabel(last)}</b></div><div class="v27-hero-copy"><span>CATEGORY 01 • HOME, FAMILY & RELATIONSHIPS</span><h1>${esc(meta.title||'Visual Conversation')}</h1><p>${esc(action.reason)}</p><div class="v27-hero-actions"><button class="primary" data-eng-v52-click="v27LaunchAction(${last})">${icon(action.icon||'spark')} ${esc(action.label)} <em>${icon('chevron')}</em></button><button data-eng-v52-click="v27OpenLesson(${last},'explore')">Open scene</button></div></div><div class="v27-hero-progress"><div><span>Lesson progress</span><b>${pct}%</b></div><div class="v27-progress"><i style="width:${pct}%"></i></div></div></div><aside class="v27-coach-card"><div class="v27-coach-orb">${icon('spark')}</div><span>SMART COACH</span><h2>One next move, not twelve choices.</h2><p>${esc(action.reason)}</p><div class="v27-signal-row"><div><b>${sig.discovery}</b><span>observe</span></div><div><b>${sig.describe}</b><span>describe</span></div><div><b>${sig.evidence}</b><span>evidence</span></div><div><b>${sig.conversation===null?'—':sig.conversation}</b><span>converse</span></div></div><div class="v27-support"><div><span>SUPPORT</span><b>${esc(support.label)}</b></div><div>${['guided','balanced','independent'].map(k=>`<button class="${support.key===k?'active':''}" data-eng-v52-click="v27SetSupport('${k}')">${k==='guided'?'Guided':k==='independent'?'Independent':'Balanced'}</button>`).join('')}</div><small>${esc(support.description)}</small></div></aside></section>`;
}
function v27MissionSection(){const ready=v27ReadyLessons(),last=ready.some(x=>Number(x.id)===Number(progress.lastLesson))?Number(progress.lastLesson):1,d=v27MissionDeck(last);return `<section class="v27-section v27-missions"><div class="v27-section-head"><div><span>TODAY'S MICRO-MISSIONS</span><h2>A complete speaking loop in under ten minutes.</h2><p>The order adapts to the weakest scene signal instead of repeating the same drill every day.</p></div><button data-eng-v52-click="productStartSession(true)">Start full loop ${icon('play')}</button></div><div class="v27-mission-grid">${d.items.map((m,i)=>`<button data-eng-v52-click="v27LaunchMission(${last},'${m.key}')"><div class="v27-mission-icon">${icon(m.icon||'spark')}</div><span>0${i+1} • ${esc(m.time)}</span><b>${esc(m.label)}</b><p>${esc(m.target)}</p><div><i style="width:${clamp(Number(m.score)||0,0,100)}%"></i></div><small>${clamp(Number(m.score)||0,0,100)} current signal</small></button>`).join('')}</div></section>`;}
function v27LearningPath(){const all=window.EngBookContent?.listLessons?.(1)||[],ready=all.filter(x=>x.ready),show=all.slice(0,7);return `<section class="v27-section v27-path"><div class="v27-section-head"><div><span>CATEGORY 01 • LEARNING PATH</span><h2>${ready.length} scenes ready. Progress stays scene-specific.</h2><p>Each lesson keeps its own coverage, evidence, recall, and conversation history.</p></div><b class="v27-ready-pill">${ready.length}/28 READY</b></div><div class="v27-path-row">${show.map(l=>{const n=Number(l.id),pct=l.ready?v27LessonCompletion(n):0,sig=l.ready?v27Signals(n):null;return `<button class="v27-path-card ${l.ready?'ready':'locked'} ${Number(progress.lastLesson)===n?'current':''}" ${l.ready?`data-eng-v52-click="v27OpenLesson(${n},'explore')"`:'disabled'}><div class="v27-path-thumb"><img src="${esc(l.image)}" alt=""><span>${courseLessonLabel(n)}</span>${l.ready?`<i>${pct}%</i>`:'<i>LOCKED</i>'}</div><b>${esc(l.title)}</b><small>${l.ready?`${sig.balance}% scene balance · ${v27Action(n).short} next`:'Editorial validation pending'}</small>${l.ready?`<div class="v27-mini-progress"><i style="width:${pct}%"></i></div>`:''}</button>`;}).join('')}</div></section>`;}
function v27ReviewSection(){const q=v27ReviewQueue();return `<section class="v27-section v27-review"><div class="v27-section-head"><div><span>REVIEW QUEUE</span><h2>Weak details should come back before they disappear.</h2><p>Cross-lesson review is ranked locally from missed anchors, incomplete steps, and scene-skill balance.</p></div><span class="v27-local-chip">${icon('target')} local adaptive queue</span></div><div class="v27-review-list">${q.length?q.slice(0,3).map((r,i)=>`<article><div class="v27-review-rank">${i+1}</div><img src="${esc(r.image)}" alt=""><div><span>LESSON ${courseLessonLabel(r.lessonId)}</span><b>${esc(r.title)}</b><small>${esc(r.action.reason)}</small></div><div class="v27-review-signal"><b>${r.balance}</b><span>balance</span></div><button data-eng-v52-click="v27LaunchAction(${r.lessonId},'${r.action.key}')">${esc(r.action.short)} ${icon('chevron')}</button></article>`).join(''):`<div class="v27-review-empty">Complete a few scene attempts and the review queue will prioritize what needs retrieval.</div>`}</div></section>`;}
function v27CoreGrid(){const last=Number(progress.lastLesson||1),s=v27Signals(last),items=[['Observation',s.discovery,'compass','Visual anchors found'],['Description',s.describe,'mic','Coverage + speaking signal'],['Evidence',s.evidence,'eye','Fact / inference control'],['Recall',s.recall,'target','Retrieval accuracy'],['Conversation',s.conversation===null?0:s.conversation,'spark',s.conversation===null?'Not released':'Meaning transfer'],['Precision',s.precision,'layers','Combined scene precision']];return `<section class="v27-section"><div class="v27-section-head"><div><span>LEARNING CORE</span><h2>Know what is improving — and what is not.</h2><p>These are scene-learning signals, not CEFR placement or an overall English score.</p></div><button data-eng-v52-click="productOpenProfile()">Detailed fingerprint ${icon('chevron')}</button></div><div class="v27-core-grid">${items.map(([l,v,ic,n])=>`<article><i>${icon(ic)}</i><div><span>${esc(l)}</span><b>${Math.round(v)}</b><small>${esc(n)}</small></div><div class="v27-ring" style="--v:${Math.round(v)}"><em>${Math.round(v)}</em></div></article>`).join('')}</div></section>`;}
function v27StudioSection(){return `<section class="v27-studio"><div><span>SCENE LAB</span><h2>Specialist tools stay available without crowding the daily path.</h2><p>Blind reconstruction, visual grammar, camera challenge, timeline, level ladder, Scene Fingerprint, and your own photos remain one tap away.</p><div><button data-eng-v52-click="productOpenMore()">Open Studio ${icon('layers')}</button><button data-eng-v52-click="productGo('ownscene')">Scene Forge ${icon('chevron')}</button></div></div><div class="v27-studio-stack"><span>${icon('eye')} Evidence-first</span><span>${icon('mic')} Voice-ready</span><span>${icon('target')} Adaptive review</span><span>${icon('layers')} Local-first</span></div></section>`;}

renderHome=function(){
  try{if(state?.lesson)v23PersistMetrics(activeLessonId());}catch(e){}
  clearTimer();stopRecognition();stopPronRecognition();stopConversationRecognition();try{ownStopSpeech();}catch(e){}state.screen='home';state.lesson=null;v27EnsureCoach();
  app.innerHTML=`<div class="app-shell v27-shell"><main class="v27-home">${v27HomeHeader()}${v27Hero()}${v27MissionSection()}${v27LearningPath()}${v27ReviewSection()}${v27CoreGrid()}${v27StudioSection()}<footer class="v27-footer"><div class="v27-brand"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>See → Understand → Describe → Converse</small></div></div><span>v${BUILD_INFO.version} • local-first learning core • ${esc(BUILD_INFO.contentRevision)}</span></footer></main>${state.onboardingOpen?onboardingOverlay():''}${productToolDrawer()}<div class="toast" id="toast"></div></div>`;
  setTimeout(()=>{try{v21InstallConnectivity?.();v21UpdateBanner?.();}catch(e){}},0);
};

/* Cleaner lesson navigation. Studio is intentionally moved out of the bottom bar. */
productPrimaryTabs=function(){
  const id=activeLessonId(),primary=[['explore','compass','Scene','explore'],['learn','eye','Evidence','learn'],['practice','target','Recall','practice'],['speak','mic','Describe','describe'],['talk','spark','Converse','conversation']];
  if(productAdvancedMode()){const meta=PRODUCT_ADVANCED_TOOLS.find(x=>x[0]===state.mode);return `<div class="product-mode-tabs v27-mode-tabs"><button data-eng-v52-click="setMode('explore')">${icon('compass')}<span>Core scene</span></button><button class="active">${icon(meta?.[1]||'layers')}<span>${esc(meta?.[2]||'Studio')}</span></button><button data-eng-v52-click="productOpenMore()">${icon('layers')}<span>Studio</span></button></div>`;}
  return `<div class="product-mode-tabs v27-mode-tabs">${primary.map(([m,ic,t,cap])=>{const off=id!==1&&!v23Has(cap);return `<button class="${state.mode===m?'active':''} ${off?'disabled':''}" ${off?'disabled aria-disabled="true"':`data-eng-v52-click="setMode('${m}')"`}>${icon(ic)}<span>${t}</span></button>`;}).join('')}<button data-eng-v52-click="productOpenMore()">${icon('layers')}<span>Studio</span></button></div>`;
};
modeTabs=function(){return productPrimaryTabs();};
bottomNav=function(){const id=activeLessonId(),off=id!==1&&!v23Has('conversation');return `<nav class="bottom-nav product-bottom-nav v27-bottom-nav"><button data-eng-v52-click="goHome()">${icon('home')}<span>Home</span></button><button class="${['explore','learn'].includes(state.mode)?'active':''}" data-eng-v52-click="setMode('explore')">${icon('compass')}<span>Scene</span></button><button class="${state.mode==='practice'?'active':''}" data-eng-v52-click="setMode('practice')">${icon('target')}<span>Review</span></button><button class="${state.mode==='speak'?'active':''}" data-eng-v52-click="productOpenSpeak()">${icon('mic')}<span>Speak</span></button><button class="${state.mode==='talk'?'active':''} ${off?'disabled':''}" ${off?'disabled':'data-eng-v52-click="productOpenCoach()"'}>${icon('spark')}<span>Coach</span></button></nav>`;};
topbar=function(){const id=activeLessonId(),lesson=state.lesson||v27LessonResolved(id),advanced=productAdvancedMode(),meta=PRODUCT_ADVANCED_TOOLS.find(x=>x[0]===state.mode),action=v27Action(id),pct=v27LessonCompletion(id);return `<header class="topbar product-topbar v27-topbar"><div class="topbar-inner"><button class="round-btn ghost" data-eng-v52-click="goHome()" aria-label="Home">${icon('back')}</button><div class="brand-lockup"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual Conversation</small></div></div><div class="product-scene-title"><span>${advanced?'SPECIALIST PRACTICE':`LESSON ${courseLessonLabel(id)}`}</span><b>${advanced?esc(meta?.[2]||'Studio tool'):esc(lesson.title||'Lesson')}</b></div><button class="v27-next-chip" data-eng-v52-click="v27LaunchAction(${id})"><i>${icon(action.icon||'spark')}</i><span><small>COACH SAYS</small><b>${esc(action.short)}</b></span></button><div class="v27-top-progress"><b>${pct}%</b><span>lesson</span></div><button class="round-btn ghost" data-eng-v52-click="productOpenMore()" aria-label="Studio tools">${icon('layers')}</button></div></header>`;};

function v27CoachRibbon(){if(!state.lesson||state.screen==='home'||state.mode==='ownscene')return'';const id=activeLessonId(),a=v27Action(id),s=v27Support();return `<section class="v27-coach-ribbon"><div><i>${icon('spark')}</i><span><small>NEXT BEST MOVE</small><b>${esc(a.label)}</b></span></div><p>${esc(a.reason)}</p><div class="v27-ribbon-support"><span>${esc(s.label)}</span><button data-eng-v52-click="v27LaunchAction(${id})">Start ${icon('chevron')}</button></div></section>`;}
const _v26RenderLessonV27=renderLesson;
renderLesson=function(){_v26RenderLessonV27();if(state.screen==='home')return;const main=document.querySelector('.lesson-main');if(main&&!main.querySelector('.v27-coach-ribbon'))main.insertAdjacentHTML('afterbegin',v27CoachRibbon());const shell=document.querySelector('.app-shell');shell?.classList?.add('v27-lesson-shell');};

/* Product Focus Session now follows the adaptive support level on launch. */
productStartSession=function(reset=true){const p=productEnsure();if(reset||!p.sessionActive)p.sessionStage=0;p.sessionActive=true;p.lastSession=Date.now();progress.product=p;saveProgress();state.productSessionOpen=true;productLaunchStage();};
productLaunchStage=function(){const p=productEnsure(),s=PRODUCT_SESSION_STAGES[p.sessionStage||0],id=Number(progress.lastLesson||1);if(!s)return productFinishSession();openLesson(id);if(s.key==='retrieve'){setMode('practice');setPractice(v27ScopedMistakes(id).length?'mistakes':'smart');}else if(s.key==='describe'){const k=v27Support().key;state.speakingDuration=k==='guided'?30:k==='independent'?90:60;state.speakingSeconds=state.speakingDuration;setMode('speak');}else if(s.key==='converse'&&v23Has('conversation')){state.conversationMode=v27Support().key==='guided'?'guided':v27Support().key==='independent'?'challenge':'natural';state.conversationMission='listener';setMode('talk');}else{setMode('practice');setPractice(v27ScopedMistakes(id).length?'mistakes':'smart');}};

/* v0.27 migration marker. Unknown fields are already preserved by the v21+ migrator. */
v27EnsureCoach();progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=V27_BUILD;saveProgress();
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V27_BUILD,learningOrchestrator:window.EngBookLearning?.version||null,adaptiveCore:true,readyLessons:BUILD_INFO.readyLessons};


/* ======================================================================
   v0.28 — BATCH VALIDATION + TRUE LAZY LESSON LOADING
   Lessons 04–05 are ready in the manifest but deliberately not embedded
   in lesson-packs.generated.js. The navigation layer resolves the pack on
   first open, then runs the same generic Core+ interaction runtime.
   ====================================================================== */
const V28_BUILD=BUILD_INFO.tag;
const v28LoadingLessons=new Map();
function v28PackLoaded(id){return Boolean(window.EngBookContent?.getPack?.(Number(id)));}
function v28ManifestReady(id){return Boolean(window.EngBookContent?.manifestFor?.(Number(id))?.status==='ready'||Number(id)===1);}
function v28LoadingLabel(id){const meta=window.EngBookContent?.getMeta?.(Number(id));return `Loading Lesson ${courseLessonLabel(id)}${meta?.title?` — ${meta.title}`:''}…`;}
async function v28EnsurePack(id){
  const n=Number(id||1);if(n===1||v28PackLoaded(n))return window.EngBookContent?.getPack?.(n)||null;
  if(!v28ManifestReady(n))throw new Error('LESSON_PACK_NOT_READY');
  if(v28LoadingLessons.has(n))return v28LoadingLessons.get(n);
  const job=(async()=>{try{toast?.(v28LoadingLabel(n));const pack=await window.EngBookContent.ensurePack(n);v21Announce?.(`Lesson ${n} content loaded.`);return pack;}finally{v28LoadingLessons.delete(n);}})();
  v28LoadingLessons.set(n,job);return job;
}
const _v27OpenLessonV28=openLesson;
async function v28EnsureAndOpenLesson(id,mode='explore',opts={}){
  const n=Number(id||1);
  if(!window.EngBookContent?.canOpen?.(n)){toast?.('This lesson is still in editorial validation.');return false;}
  try{
    await v28EnsurePack(n);
    _v27OpenLessonV28(n);
    if(mode){const cap=v23ModeCapability(mode);if(n!==1&&cap&&!v23Has(cap)){toast?.(`${mode} is not released for Lesson ${courseLessonLabel(n)} yet.`);mode='explore';}await v36AwaitModeTransition(setMode(mode));}
    progress.lastLesson=n;saveProgress();
    if(opts.practice)setPractice(opts.practice);
    return true;
  }catch(e){
    const offline=typeof navigator!=='undefined'&&navigator.onLine===false;
    v21PushError?.(e,'lazy-lesson-load');
    toast?.(offline?'This lesson has not been cached on this device yet. Reconnect once to download it.':'Could not load this lesson pack. Please try again.');
    return false;
  }
}
/* Direct openLesson remains compatible with old inline handlers. Loaded packs
   open synchronously; lazy packs begin an on-demand load and open afterward. */
openLesson=function(id){const n=Number(id||1);if(n===1||v28PackLoaded(n))return _v27OpenLessonV28(n);v28EnsureAndOpenLesson(n,'explore');};
v27OpenLesson=async function(id,mode='explore'){return v28EnsureAndOpenLesson(id,mode);};
v27LaunchAction=async function(id,forcedKey=''){
  const n=Number(id||progress.lastLesson||1),action=forcedKey?({...v27Action(n),key:forcedKey,mode:{explore:'explore',recall:'practice',describe:'speak',evidence:'learn',conversation:'talk',review:'practice'}[forcedKey]||v27Action(n).mode}):v27Action(n),coach=v27EnsureCoach();
  coach.smartLaunches=(coach.smartLaunches||0)+1;coach.lastAction=action.key;coach.lastLesson=n;progress.lastLesson=n;saveProgress();
  if(!(await v28EnsureAndOpenLesson(n,null)))return;
  let mode=window.EngBookLearning?.launchMode?.(action,coach.support)||action.mode;
  const cap=v23ModeCapability(mode);if(n!==1&&cap&&!v23Has(cap))mode=v23Has('describe')?'speak':'explore';
  if(mode==='practice')setPractice(v27ScopedMistakes(n).length?'mistakes':'smart');
  if(mode==='speak'){const s=v27Support().key;state.speakingDuration=s==='guided'?30:s==='independent'?90:60;state.speakingSeconds=state.speakingDuration;}
  if(mode==='talk'){state.conversationMode=v27Support().key==='guided'?'guided':v27Support().key==='independent'?'challenge':'natural';state.conversationMission='listener';}
  setMode(mode);haptic([10,14,18]);
};
productOpenLearn=async function(){const id=state.lesson?.id||progress.lastLesson||1;if(await v28EnsureAndOpenLesson(id,null))setMode('learn');};
productOpenSpeak=async function(){const id=state.lesson?.id||progress.lastLesson||1;if(!(await v28EnsureAndOpenLesson(id,null)))return;state.speakingDuration=60;state.speakingSeconds=60;setMode('speak');};
productOpenCoach=async function(){const id=state.lesson?.id||progress.lastLesson||1;if(!(await v28EnsureAndOpenLesson(id,null)))return;if(!v23Has('conversation')){toast?.(`Conversation is not enabled for Lesson ${courseLessonLabel(id)} in this lesson pack.`);return;}state.conversationMode='natural';state.conversationMission='listener';setMode('talk');};
productGo=async function(mode){const id=state.lesson?.id||progress.lastLesson||1;if(!(await v28EnsureAndOpenLesson(id,null)))return;if(id!==1&&!v23Has(v23ModeCapability(mode))){toast?.(`This Studio tool has not been generalized for Lesson ${courseLessonLabel(id)} yet.`);return;}state.productMoreOpen=false;setMode(mode);};
productLaunchStage=async function(){
  const p=productEnsure(),s=PRODUCT_SESSION_STAGES[p.sessionStage||0],id=Number(progress.lastLesson||1);if(!s)return productFinishSession();
  if(!(await v28EnsureAndOpenLesson(id,null)))return;
  if(s.key==='retrieve'){setMode('practice');setPractice(v27ScopedMistakes(id).length?'mistakes':'smart');}
  else if(s.key==='describe'){const k=v27Support().key;state.speakingDuration=k==='guided'?30:k==='independent'?90:60;state.speakingSeconds=state.speakingDuration;setMode('speak');}
  else if(s.key==='converse'&&v23Has('conversation')){state.conversationMode=v27Support().key==='guided'?'guided':v27Support().key==='independent'?'challenge':'natural';state.conversationMission='listener';setMode('talk');}
  else{setMode('practice');setPractice(v27ScopedMistakes(id).length?'mistakes':'smart');}
};
/* Home path tells the truth about lazy readiness: later validated lessons are released but
   downloaded on first open. */
v27LearningPath=function(){
  const all=window.EngBookContent?.listLessons?.(1)||[],ready=all.filter(x=>x.ready),show=all.slice(0,8);
  return `<section class="v27-section v27-path"><div class="v27-section-head"><div><span>CATEGORY 01 • LEARNING PATH</span><h2>${ready.length} scenes ready. Progress stays scene-specific.</h2><p>Lessons 04–10 use on-demand packs: first open downloads the reviewed lesson JSON, then the same Core+ runtime takes over.</p></div><b class="v27-ready-pill">${ready.length}/28 READY</b></div><div class="v27-path-row">${show.map(l=>{const n=Number(l.id),pct=l.ready?v27LessonCompletion(n):0,sig=l.ready?v27Signals(n):null,lazy=l.ready&&!l.loaded&&n>1;return `<button class="v27-path-card ${l.ready?'ready':'locked'} ${Number(progress.lastLesson)===n?'current':''}" ${l.ready?`data-eng-v52-click="v27OpenLesson(${n},'explore')"`:'disabled'}><div class="v27-path-thumb"><img src="${esc(l.image)}" alt=""><span>${courseLessonLabel(n)}</span>${l.ready?`<i>${lazy?'ON DEMAND':pct+'%'}</i>`:'<i>LOCKED</i>'}</div><b>${esc(l.title)}</b><small>${l.ready?`${lazy?'Released • downloads on first open':sig.balance+'% scene balance'} · ${v27Action(n).short} next`:'Editorial validation pending'}</small>${l.ready&&!lazy?`<div class="v27-mini-progress"><i style="width:${pct}%"></i></div>`:''}</button>`;}).join('')}</div></section>`;
};
/* Deep links for lazy packs. This final handler intentionally re-applies the
   requested mode after ensurePack() finishes, correcting older sync handlers. */
/* Legacy generic deep-link load hook disabled in v0.38; v38ApplyDeepLink is authoritative. */
/* v0.28 migration marker */
v27EnsureCoach();progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=V28_BUILD;saveProgress();
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V28_BUILD,generatedCoreLessons:[2,3,4,5],lazyCoreLessons:[4,5],readyLessons:BUILD_INFO.readyLessons};

/* ======================================================================
   v0.29 — COMMERCIAL FOUNDATION FREEZE
   Shared Scene Intelligence graph + longitudinal learner model + a simpler
   market-facing communication pulse. No new lesson content in this release.
   ====================================================================== */
const V29_BUILD=BUILD_INFO.tag;
function v29Pack(id=activeLessonId()){return window.EngBookContent?.getPack?.(Number(id))||null;}
function v29Graph(id=activeLessonId()){const pack=v29Pack(id);return pack?window.EngBookSceneIntelligence?.compile?.(pack):null;}

/* Generic lessons now route claim checks through one Scene Intelligence layer.
   Lesson 01 keeps its reference hand-authored classifier until its rules are
   migrated into the same pack schema. */
const _v28ClassifyEvidenceClaimV29=classifyEvidenceClaim;
classifyEvidenceClaim=function(claim){
  if(activeLessonId()===1)return _v28ClassifyEvidenceClaimV29(claim);
  const pack=v29Pack();
  if(pack&&window.EngBookSceneIntelligence?.evaluate)return window.EngBookSceneIntelligence.evaluate(pack,claim);
  return _v28ClassifyEvidenceClaimV29(claim);
};

function v29LearnerProfile(){return window.EngBookLearnerModel?.profile?.(progress,BUILD_INFO.readyLessons)||null;}
function v29CaptureLearnerModel(){
  try{
    const out=window.EngBookLearnerModel?.capture?.(progress,BUILD_INFO.readyLessons);if(!out)return null;
    if(out.changed)saveProgress();return out.model;
  }catch(e){return null;}
}
function v29Metric(id,key){const m=v27MetricsFor(id)||{};if(key==='coverage')return Math.round(Number(m.coverage?.best||0));if(key==='evidence')return Math.round(Number(m.evidence?.best||0));if(key==='reconstruct'){if(Number(id)!==1)return null;return Math.round(Number(progress.reconstruction?.best||0));}return 0;}
function v29MetricCard(label,value,copy,kind){const measured=value!==null&&Number.isFinite(value);return `<article class="v29-pulse-card ${kind}"><div class="v29-pulse-top"><span>${esc(label)}</span><b>${measured?`${value}%`:'—'}</b></div><div class="v29-pulse-bar"><i style="width:${measured?clamp(value):0}%"></i></div><p>${esc(copy)}</p><small>${measured?'scene-specific signal':'not measured in this lesson yet'}</small></article>`;}
function v29CommunicationPulse(){
  const id=Number(progress.lastLesson||1),coverage=v29Metric(id,'coverage'),evidence=v29Metric(id,'evidence'),recon=v29Metric(id,'reconstruct'),profile=v29LearnerProfile(),gap=profile?window.EngBookLearnerModel?.nextGap?.(profile):null;
  return `<section class="v29-communication-pulse"><div class="v29-pulse-head"><div><span>COMMUNICATION PULSE</span><h2>Did your listener get the picture?</h2><p>Three signals summarize what EngBook is training: scene transfer, evidence control, and listener reconstruction. They are not CEFR or overall-English scores.</p></div><button data-action="v29-next-gap" data-lesson="${id}" data-mode="${esc(gap?.mode||'explore')}"><small>TRAIN NEXT</small><b>${esc(gap?.label||'Build a stronger scene map')}</b>${icon('chevron')}</button></div><div class="v29-pulse-grid">${v29MetricCard('Scene coverage',coverage,coverage>=75?'Most high-value visual information is reaching the listener.':'Add the missed high-value details before making the story longer.','coverage')}${v29MetricCard('Evidence control',evidence,evidence>=80?'Facts and cautious inferences are staying well separated.':'State the visible fact first, then mark interpretation with may / might / seems.','evidence')}${v29MetricCard('Listener reconstruction',recon,recon===null?'Blind reconstruction unlocks only for scene packs that include the specialist reconstruction contract.':recon>=75?'A listener could rebuild most of this reference scene from your words.':'Spatial links and action relations would make the listener’s mental picture clearer.','reconstruct')}</div><div class="v29-pulse-foot"><span>${icon('eye')} Scene Intelligence v${window.EngBookSceneIntelligence?.version||'—'}</span><span>${icon('target')} ${profile?.sceneCount||0} ready scenes in learner model</span><span>${icon('layers')} ${profile?.confidence||0}% profile confidence</span></div></section>`;
}
function v29CoreGrid(){return v29CommunicationPulse();}
v27CoreGrid=v29CoreGrid;

function v29StudioSection(){return `<section class="v29-advanced"><div><span>ADVANCED PRACTICE</span><h2>Keep the daily path simple. Open specialist tools only when you need them.</h2><p>Reconstruction, timeline, visual grammar, camera challenge, level ladder, Scene Fingerprint, and Scene Forge remain available without competing with the core learning flow.</p></div><button data-action="v29-open-studio">Advanced practice ${icon('layers')}</button></section>`;}
v27StudioSection=v29StudioSection;

/* Market-facing shell copy: development terminology is kept out of the learner path. */
const _v28HomeHeaderV29=v27HomeHeader;
v27HomeHeader=function(){return _v28HomeHeaderV29().replace(`${v27ReadyLessons().length}/28 ready`,`${v27ReadyLessons().length} scenes available`);};
const _v28HeroV29=v27Hero;
v27Hero=function(){return _v28HeroV29().replace('SMART COACH','TODAY’S FOCUS').replace('One next move, not twelve choices.','One clear next step. Speak first, then repair what matters.');};
const _v28ReviewV29=v27ReviewSection;
v27ReviewSection=function(){return _v28ReviewV29().replace('REVIEW QUEUE','SMART REVIEW').replace('Cross-lesson review is ranked locally from missed anchors, incomplete steps, and scene-skill balance.','EngBook brings back the scene details and speaking patterns that are most likely to fade.');};

/* New shell controls use delegated actions. This begins removal of inline event
   handlers from the commercial path without destabilizing the legacy Studio. */
if(window.EngBookActions){
  window.EngBookActions
    .register('v29-open-studio',()=>productOpenMore())
    .register('v29-next-gap',d=>{const id=Number(d.lesson||progress.lastLesson||1),mode=d.mode||'explore';v28EnsureAndOpenLesson(id,null).then(ok=>{if(!ok)return;if(mode==='practice')setPractice('smart');setMode(mode);});});
}

/* Attach evidence trace to generic evidence feedback without exposing source
   identifiers as learner-facing jargon. */
const _v28EvidenceResultCardV29=typeof evidenceResultCard==='function'?evidenceResultCard:null;
if(_v28EvidenceResultCardV29)evidenceResultCard=function(r,...args){const html=_v28EvidenceResultCardV29(r,...args);if(activeLessonId()===1||!r?.sceneGraph?.traceable)return html;return html.replace('</section>',`<small class="v29-evidence-trace">Reviewed against this scene’s evidence map</small></section>`);};

/* Data/privacy wording and diagnostics move to the commercial-foundation build. */
if(typeof v22PrivacyMarkup==='function'){
  const _v28PrivacyMarkupV29=v22PrivacyMarkup;
  v22PrivacyMarkup=function(){return _v28PrivacyMarkupV29().replaceAll('v0.28 is local-first','v0.30 is local-first').replaceAll('v0.24 is local-first','v0.30 is local-first');};
}
if(typeof v21Diagnostics==='function'){
  const _v28DiagnosticsV29=v21Diagnostics;
  v21Diagnostics=function(){const pack=v29Pack(Number(progress.lastLesson||1)),graph=pack?window.EngBookSceneIntelligence?.compile?.(pack):null,model=v29LearnerProfile();return {..._v28DiagnosticsV29(),build:V29_BUILD,commercialFoundation:{sceneIntelligenceVersion:window.EngBookSceneIntelligence?.version||null,sceneEvidenceVersion:window.EngBookSceneEvidence?.version||null,learnerModelVersion:window.EngBookLearnerModel?.version||null,actionRouterVersion:window.EngBookActions?.version||null,graphStats:graph?.stats||null,learnerModel:{sceneCount:model?.sceneCount||0,confidence:model?.confidence||0,weakest:model?.weakest||null}}};};
}

/* Capture a sparse longitudinal snapshot on home visits. */
const _v28RenderHomeV29=renderHome;
renderHome=function(){const out=_v28RenderHomeV29();setTimeout(()=>{try{v29CaptureLearnerModel();document.querySelectorAll('.v20-build').forEach(el=>el.textContent='v'+BUILD_INFO.version);}catch(e){}},0);return out;};

progress.learnerModel=progress.learnerModel||{snapshots:[]};
progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=V29_BUILD;saveProgress();
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V29_BUILD,commercialFoundation:true,sceneIntelligence:window.EngBookSceneIntelligence?.version||null,sceneEvidence:window.EngBookSceneEvidence?.version||null,learnerModel:window.EngBookLearnerModel?.version||null,delegatedActions:window.EngBookActions?.count?.()||0,readyLessons:BUILD_INFO.readyLessons};

/* ======================================================================
   v0.30 — REAL SPEAKING CORE
   Unified speech capture, turn-taking, pause metadata, typed fallback,
   and strict separation of transcription signals from pronunciation.
   No new lesson content in this release.
   ====================================================================== */
const V30_BUILD=BUILD_INFO.tag;
function v30SpeechCaps(){return window.EngBookSpeech?.capabilities?.()||{recognition:false,synthesis:false,recording:false,secureContext:true,online:navigator.onLine!==false};}
function v30EnsureSpeechProgress(){
  progress.speechCore=progress.speechCore||{sessions:0,history:[],byLesson:{},errors:{}};
  progress.speechCore.history=Array.isArray(progress.speechCore.history)?progress.speechCore.history:[];
  progress.speechCore.byLesson=progress.speechCore.byLesson||{};progress.speechCore.errors=progress.speechCore.errors||{};return progress.speechCore;
}
function v30RecordSpeech(kind,payload={}){
  const sp=v30EnsureSpeechProgress(),id=Number(activeLessonId()||progress.lastLesson||1),m=payload.metrics||{};
  if(!m.hasTranscript)return;
  const entry={ts:Date.now(),lesson:id,kind,words:m.words||0,durationSec:m.durationSec||0,speechRateWpm:m.speechRateWpm??null,pauseCount:m.pauseCount||0,longestPauseMs:m.longestPauseMs||0,recognitionConfidence:m.recognitionConfidence??null};
  sp.sessions=(sp.sessions||0)+1;sp.history=[entry,...sp.history].slice(0,24);sp.byLesson[id]=entry;saveProgress();state.speechCoreMetrics=entry;
}
function v30SpeechError(info,kind='speech'){
  const sp=v30EnsureSpeechProgress(),key=info?.id||'SPEECH_ERROR';sp.errors[key]=(sp.errors[key]||0)+1;saveProgress();
  toast(info?.message||'Speech capture stopped. Typing is still available.');
}
function v30StopAny(reason='mode-change'){try{window.EngBookSpeech?.active?.()?.stop?.(reason);}catch(e){}}
function v30Session(options){
  if(!window.EngBookSpeech?.start){v30SpeechError({id:'UNAVAILABLE',message:'Speech-to-text is not available here. You can type instead.'});return null;}
  return window.EngBookSpeech.start(options);
}
function v30TranscriptSignal(){
  const live=window.EngBookSpeech?.active?.(),m=live?.metrics?.()||state.speechCoreMetrics||v30EnsureSpeechProgress().byLesson?.[activeLessonId()]||null;
  return m;
}
function v30ConfidenceCopy(v){return v===null||v===undefined?'Browser did not expose confidence metadata.':`${v}% recognition confidence metadata`;}
function v30SpeechSignalCard(){
  const caps=v30SpeechCaps(),m=v30TranscriptSignal(),active=window.EngBookSpeech?.active?.(),status=active?.status||'idle';
  return `<div id="v30SpeechSignal" class="v30-speech-signal ${status}"><div class="v30-speech-head"><div><span>VOICE SIGNAL</span><h3>${status==='listening'?'Listening to your answer…':status==='processing'?'Finishing transcript…':m?'Last speech capture':'Voice-ready speaking'}</h3></div><i class="${caps.recognition?'ready':'fallback'}">${caps.recognition?'VOICE READY':'TYPE FALLBACK'}</i></div><div class="v30-speech-metrics"><div><b>${m?.recognitionConfidence??'—'}${m?.recognitionConfidence!==null&&m?.recognitionConfidence!==undefined?'%':''}</b><span>recognition metadata</span></div><div><b>${m?.speechRateWpm??'—'}</b><span>words / min</span></div><div><b>${m?.pauseCount??'—'}</b><span>long pauses</span></div><div><b>${m?.words??wordCount(state.transcript||'')}</b><span>captured words</span></div></div><p>${m?v30ConfidenceCopy(m.recognitionConfidence):caps.recognition?'Speak naturally. EngBook keeps interim text separate from finalized transcript and preserves typed fallback.':'This browser does not expose live speech recognition. Recording and typed answers remain available when supported.'}</p><small>These are capture/timing signals only — <b>not</b> pronunciation, accent, fluency, or CEFR scores.</small></div>`;
}
function v30UpdateSpeechSignalDom(){const el=document.getElementById('v30SpeechSignal');if(el)el.outerHTML=v30SpeechSignalCard();}
function v30VoiceReadiness(){const c=v30SpeechCaps();return `<section class="v30-voice-ready"><div><span>REAL SPEAKING CORE</span><h3>Speak naturally. The app handles the turn.</h3><p>Unified capture now manages interim/final text, silence-based turn ending, pause metadata, recognition confidence when the browser exposes it, and a typed fallback.</p></div><div class="v30-ready-grid"><span class="${c.recognition?'ok':'off'}"><i></i><b>Live transcript</b><small>${c.recognition?'available':'type instead'}</small></span><span class="${c.recording?'ok':'off'}"><i></i><b>Local recording</b><small>${c.recording?'available':'browser limited'}</small></span><span class="${c.synthesis?'ok':'off'}"><i></i><b>Coach voice</b><small>${c.synthesis?'available':'text remains'}</small></span></div></section>`;}

/* Description / live scene coach */
toggleRecognition=function(){
  if(state.listening){stopRecognition();render();return;}
  const c=v30SpeechCaps();if(!c.recognition){toast('Live transcript is unavailable in this browser. Record your voice or type the description instead.');return;}
  stopRecognition();
  state.speechCoreStatus='requesting';
  const session=v30Session({mode:'dictation',continuous:true,restartOnEnd:true,maxRestarts:2,silenceMs:0,maxDurationMs:180000,
    onState:x=>{state.speechCoreStatus=x.status;},
    onTranscript:x=>{state.transcript=x.text;state.speechCoreMetrics=x.metrics;updateTranscriptDom();v30UpdateSpeechSignalDom();},
    onError:info=>{state.listening=false;state.recognition=null;state.speechCoreStatus='error';v30SpeechError(info,'describe');render();},
    onComplete:x=>{state.listening=false;state.recognition=null;state.speechCoreStatus='complete';state.speechCoreMetrics=x.metrics;v30RecordSpeech('describe',x);render();}
  });
  if(!session)return;state.recognition=session;state.listening=true;render();
};
stopRecognition=function(){const s=state.recognition;if(s?.stop)s.stop('manual');else try{s?.stop?.();}catch(e){}state.recognition=null;state.listening=false;};

/* Pronunciation Lab keeps recognition matching separate from capture confidence. */
startPronRecognition=function(word){
  const h=state.lesson.hotspots.find(x=>x.en===word);if(!h)return;const target=currentPronTarget(h);
  if(!v30SpeechCaps().recognition){toast('Phrase matching needs live speech recognition. Hear & Shadow still works.');return;}
  stopPronRecognition();let heard='';
  const session=v30Session({mode:'phrase',continuous:false,silenceMs:1400,maxDurationMs:12000,
    onTranscript:x=>{heard=x.text;},
    onError:info=>{state.pronListening=false;state.pronRecognition=null;v30SpeechError(info,'phrase');render();},
    onComplete:x=>{state.pronListening=false;state.pronRecognition=null;heard=x.finalText||heard||x.text||'';if(!heard){render();return;}const score=recognitionSimilarity(target,heard);state.pronResult={word,target,heard,score,recognitionConfidence:x.metrics?.recognitionConfidence??null};savePronRecord(word,{say:true,best:Math.max(pronRecord(word).best||0,score),lastText:heard,lastRecognitionConfidence:x.metrics?.recognitionConfidence??null});v30RecordSpeech('phrase',x);haptic(score>=80?[16,22,30]:14);render();}
  });
  if(!session)return;state.pronRecognition=session;state.pronListening=true;state.pronResult=null;render();
};
stopPronRecognition=function(){const s=state.pronRecognition;if(s?.stop)s.stop('manual');state.pronRecognition=null;state.pronListening=false;};

/* Conversation: silence closes the learner turn instead of requiring a second tap. */
stopConversationRecognition=function(){const s=state.conversationRecognition;if(s?.stop)s.stop('manual');state.conversationRecognition=null;state.conversationListening=false;if(state.voiceStage==='listening')state.voiceStage='idle';};
startConversationRecognition=function(fromHandsFree=false){
  if(state.conversationListening){stopConversationRecognition();render();return;}
  if(!v30SpeechCaps().recognition){toast('Voice turn-taking is unavailable here. Type your answer — the conversation flow still works.');return;}
  let heard='';state.voiceStage='listening';state.conversationListening=true;
  const session=v30Session({mode:'turn',continuous:false,silenceMs:1900,maxDurationMs:45000,
    onTranscript:x=>{heard=x.text;state.conversationInput=heard;state.speechCoreMetrics=x.metrics;const el=document.getElementById('conversationInput');if(el)el.value=heard;const vst=document.querySelector('.voice-live-transcript');if(vst)vst.textContent=heard||'Listening…';},
    onError:info=>{state.conversationListening=false;state.conversationRecognition=null;state.voiceStage='idle';v30SpeechError(info,'conversation');render();},
    onComplete:x=>{state.conversationListening=false;state.conversationRecognition=null;state.voiceStage='idle';state.speechCoreMetrics=x.metrics;v30RecordSpeech('conversation',x);const shouldAuto=state.handsFree&&fromHandsFree&&wordCount(state.conversationInput)>=3;if(shouldAuto)setTimeout(()=>submitConversation(true),160);else render();}
  });
  if(!session){state.conversationListening=false;state.voiceStage='idle';return;}state.conversationRecognition=session;render();
};

/* Blind Reconstruction */
toggleReconstructionRecognition=function(){
  if(state.reconstructionListening){stopReconstructionRecognition();render();return;}
  if(!v30SpeechCaps().recognition){toast('Live transcript is unavailable here. Type the blind-listener description instead.');return;}
  if(state.reconstructionStage==='idle')startReconstruction(false);const base=reconstructionText();
  state.reconstructionListening=true;
  const session=v30Session({mode:'dictation',continuous:true,restartOnEnd:true,maxRestarts:2,silenceMs:0,maxDurationMs:120000,baseText:base,
    onTranscript:x=>{state.reconstructionTranscript=x.text;state.speechCoreMetrics=x.metrics;updateReconstructionLiveDom();},
    onError:info=>{state.reconstructionListening=false;state.reconstructionRecognition=null;v30SpeechError(info,'reconstruction');render();},
    onComplete:x=>{state.reconstructionListening=false;state.reconstructionRecognition=null;state.reconstructionQuestion=reconstructionListenerQuestion();state.speechCoreMetrics=x.metrics;v30RecordSpeech('reconstruction',x);render();}
  });
  if(!session){state.reconstructionListening=false;return;}state.reconstructionRecognition=session;render();
};
stopReconstructionRecognition=function(){const s=state.reconstructionRecognition;if(s?.stop)s.stop('manual');state.reconstructionRecognition=null;state.reconstructionListening=false;};

/* Time Machine voice turns */
toggleTimelineVoice=function(phase){
  if(state.timelineVoicePhase===phase){stopTimelineRecognition();return;}stopTimelineRecognition();
  if(!v30SpeechCaps().recognition){toast('Voice capture is unavailable here. Type the timeline possibility instead.');return;}
  const base=(phase==='before'?state.timelineBefore:state.timelineNext).trim();state.timelineVoicePhase=phase;render();
  const session=v30Session({mode:'turn',continuous:false,silenceMs:2100,maxDurationMs:30000,baseText:base,
    onTranscript:x=>{if(phase==='before')state.timelineBefore=x.text;else state.timelineNext=x.text;state.speechCoreMetrics=x.metrics;render();},
    onError:info=>{state.timelineVoicePhase=null;timelineRecognition=null;v30SpeechError(info,'timeline');render();},
    onComplete:x=>{state.timelineVoicePhase=null;timelineRecognition=null;state.speechCoreMetrics=x.metrics;v30RecordSpeech('timeline',x);render();}
  });timelineRecognition=session;
};
stopTimelineRecognition=function(){const s=timelineRecognition;if(s?.stop)s.stop('manual');timelineRecognition=null;if(state.timelineVoicePhase){state.timelineVoicePhase=null;render();}};

/* Camera and Level Ladder use long-form dictation with manual stop. */
cameraStartVoice=function(){
  if(state.cameraListening){stopCameraRecognition();return;}if(!v30SpeechCaps().recognition){toast('Live transcript is unavailable here. Type the frame description instead.');return;}
  const base=cameraAnswer().trim();state.cameraListening=true;render();
  const session=v30Session({mode:'dictation',continuous:true,restartOnEnd:true,maxRestarts:2,silenceMs:0,maxDurationMs:90000,baseText:base,
    onTranscript:x=>{state.cameraAnswers[state.cameraStage]=x.text;state.cameraSubmitted[state.cameraStage]=null;state.speechCoreMetrics=x.metrics;updateCameraDom();},
    onError:info=>{state.cameraListening=false;cameraRecognition=null;v30SpeechError(info,'camera');render();},
    onComplete:x=>{state.cameraListening=false;cameraRecognition=null;state.speechCoreMetrics=x.metrics;v30RecordSpeech('camera',x);render();}
  });cameraRecognition=session;
};
stopCameraRecognition=function(doRender=true){const s=cameraRecognition;if(s?.stop)s.stop('manual');cameraRecognition=null;if(state.cameraListening){state.cameraListening=false;if(doRender)render();}};
levelStartVoice=function(){
  if(state.levelListening){stopLevelRecognition();return;}if(!v30SpeechCaps().recognition){toast('Live transcript is unavailable here. Type your level attempt instead.');return;}
  const base=state.levelAnswer.trim();state.levelListening=true;render();
  const session=v30Session({mode:'dictation',continuous:true,restartOnEnd:true,maxRestarts:2,silenceMs:0,maxDurationMs:130000,baseText:base,
    onTranscript:x=>{state.levelAnswer=x.text;state.levelSubmitted=null;state.speechCoreMetrics=x.metrics;updateLevelLive();},
    onError:info=>{state.levelListening=false;levelRecognition=null;v30SpeechError(info,'level');render();},
    onComplete:x=>{state.levelListening=false;levelRecognition=null;state.speechCoreMetrics=x.metrics;v30RecordSpeech('level',x);render();}
  });levelRecognition=session;
};
stopLevelRecognition=function(doRender=true){const s=levelRecognition;if(s?.stop)s.stop('manual');levelRecognition=null;if(state.levelListening){state.levelListening=false;if(doRender)render();}};

/* Bring Your Own Scene uses the same capture contract. */
ownStartSpeech=function(target='describe'){
  if(!v30SpeechCaps().recognition){toast('Live transcript is unavailable here. Typing still works for your Scene Pack.');return;}ownStopSpeech();
  const isTurn=target==='talk',base=isTurn?'':target==='evidence'?state.ownEvidenceText:state.ownTranscript;state.ownListening=true;state.ownVoiceTarget=target;render();
  const session=v30Session({mode:isTurn?'turn':'dictation',continuous:!isTurn,restartOnEnd:!isTurn,maxRestarts:2,silenceMs:isTurn?1900:0,maxDurationMs:isTurn?45000:120000,baseText:base,
    onTranscript:x=>{if(target==='talk')state.ownTalkInput=x.text;else if(target==='evidence')state.ownEvidenceText=x.text;else state.ownTranscript=x.text;state.speechCoreMetrics=x.metrics;render();},
    onError:info=>{state.ownListening=false;state.ownVoiceTarget=null;ownRecognition=null;v30SpeechError(info,'own-scene');render();},
    onComplete:x=>{state.ownListening=false;state.ownVoiceTarget=null;ownRecognition=null;state.speechCoreMetrics=x.metrics;v30RecordSpeech(`own-${target}`,x);render();}
  });ownRecognition=session;
};
ownStopSpeech=function(){const s=ownRecognition;if(s?.stop)s.stop('manual');ownRecognition=null;state.ownListening=false;state.ownVoiceTarget=null;};

/* Market-facing UI: add the speech layer without creating another score. */
const _v29SpeechCoachCardV30=speechCoachCard;
speechCoachCard=function(){return _v29SpeechCoachCardV30()+v30SpeechSignalCard();};
const _v29CoreGridV30=v27CoreGrid;
v27CoreGrid=function(){return _v29CoreGridV30()+v30VoiceReadiness();};

/* Diagnostics expose capability and capture metadata, never audio/transcripts. */
if(typeof v21Diagnostics==='function'){
  const _v29DiagnosticsV30=v21Diagnostics;
  v21Diagnostics=function(){const sp=v30EnsureSpeechProgress(),last=sp.history?.[0]||null;return {..._v29DiagnosticsV30(),build:V30_BUILD,speakingCore:{version:window.EngBookSpeech?.version||null,capabilities:v30SpeechCaps(),sessions:sp.sessions||0,last:last?{lesson:last.lesson,kind:last.kind,words:last.words,durationSec:last.durationSec,speechRateWpm:last.speechRateWpm,pauseCount:last.pauseCount,recognitionConfidence:last.recognitionConfidence}:null,errorCounts:{...sp.errors}}};};
}

v30EnsureSpeechProgress();progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=V30_BUILD;saveProgress();
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V30_BUILD,realSpeakingCore:true,speechCore:window.EngBookSpeech?.version||null,speechCapabilities:v30SpeechCaps(),readyLessons:BUILD_INFO.readyLessons};

/* ======================================================================
   v0.31 — COMMERCIAL SHELL & RELEASE INFRASTRUCTURE
   Account/guest boundary, entitlement contracts, feature flags,
   privacy-first analytics/crash capture, cloud-sync and deletion contracts.
   No auth, billing, cloud sync, analytics, or deletion backend is fabricated.
   No new lesson content is introduced in this release.
   ====================================================================== */
const V31_BUILD=BUILD_INFO.tag;
function v31Commercial(){return window.EngBookCommercial?.status?.()||{account:{mode:'guest',authenticated:false},plan:{id:'preview',label:'Product Preview'},permissions:{},backend:{},sync:{status:'local-only'},analytics:{queued:0},crashes:{local:0},localPreview:true};}
function v31BackendConnected(){const b=v31Commercial().backend||{};return Boolean(b.auth||b.sync||b.billing||b.analytics||b.crash||b.data);}
function v31AccountLabel(){const s=v31Commercial();if(s.account?.authenticated)return s.account.displayName||s.account.emailMasked||'Account';return 'Guest';}
function v31PlanLabel(){const s=v31Commercial();return s.plan?.label||'Product Preview';}
function v31FeatureRow(feature,label,copy){const allowed=window.EngBookCommercial?.hasFeature?.(feature)===true;return `<article class="v31-feature-row ${allowed?'on':'off'}"><i>${allowed?icon('check'):icon('lock')}</i><div><b>${esc(label)}</b><small>${esc(copy)}</small></div><span>${allowed?'Available':'Requires release plan'}</span></article>`;}
function v31AccountMarkup(){
  const s=v31Commercial(),guest=!s.account?.authenticated,b=s.backend||{},syncReady=s.account?.authenticated&&b.sync;
  return `<div class="v31-account-backdrop" id="v31-account" role="presentation" data-eng-v52-click="if(event.target===this)v31CloseAccount()"><section class="v31-account-dialog" role="dialog" aria-modal="true" aria-labelledby="v31-account-title"><header><div><span>ACCOUNT & ACCESS</span><h2 id="v31-account-title">${guest?'Use EngBook locally, with no account required.':`Welcome${s.account.displayName?`, ${esc(s.account.displayName)}`:''}.`}</h2><p>${guest?'This release includes the production contracts for accounts, plans, sync, and data deletion. No production authentication or billing backend is connected, so EngBook stays in honest Guest / Product Preview mode.':'Your account session came from a configured backend. Local learning still works if the network becomes unavailable.'}</p></div><button data-eng-v52-click="v31CloseAccount()" aria-label="Close account and access">${icon('close')}</button></header><div class="v31-account-stats"><article><span>SESSION</span><b>${guest?'Guest':'Signed in'}</b><small>${guest?'No cloud identity stored':esc(s.account.emailMasked||'Authenticated session')}</small></article><article><span>ACCESS</span><b>${esc(v31PlanLabel())}</b><small>${s.localPreview?'Released local features unlocked for product validation':`Entitlement source: ${esc(s.plan.source||'backend')}`}</small></article><article><span>CLOUD SYNC</span><b>${syncReady?(s.permissions.cloudSync?'Ready':'Off'):'Local only'}</b><small>${syncReady?'Opt in from Data & Privacy':'Requires account + configured sync backend'}</small></article><article><span>CHECKOUT</span><b>${b.billing?'Backend ready':'Not connected'}</b><small>${b.billing?'Entitlements can be refreshed from billing':'No purchase is simulated in this build'}</small></article></div><section class="v31-access-section"><div><span>PRODUCT ACCESS MODEL</span><h3>One learning core, clear upgrade boundaries.</h3><p>Preview keeps all currently released local learning tools available while the commercial backend is being validated. Future paid access is enforced by entitlements, not by hidden UI assumptions.</p></div><div class="v31-feature-list">${v31FeatureRow('coreLearning','Core scene learning','Explore, recall, describe, evidence, and released conversation practice.')}${v31FeatureRow('smartReview','Smart review','Local adaptive review and next-best-drill recommendations.')}${v31FeatureRow('advancedPractice','Advanced practice','Specialist Scene Lab tools when the lesson-specific contract is released.')}${v31FeatureRow('sceneForge','Scene Forge','Turn a user-selected image into a local Scene Pack.')}${v31FeatureRow('cloudSync','Cross-device sync','Requires a signed-in account, sync permission, and a real sync backend.')}${v31FeatureRow('remoteAI','Remote AI analysis','Requires a future AI plan plus explicit remote-AI permission.')}</div></section><section class="v31-account-actions"><div><span>ACCOUNT BACKEND</span><h3>${b.auth?'Authentication endpoint configured':'Authentication is intentionally not connected yet.'}</h3><p>${b.auth?'A production host can complete authentication and pass a non-secret session descriptor to the client shell.':'Guest mode is fully usable. No fake sign-in, password store, or social login is shown.'}</p></div><div>${guest?`<button class="primary" data-eng-v52-click="v31ExplainSignIn()" ${b.auth?'':'disabled aria-disabled="true"'}>${b.auth?'Continue to secure sign-in':'Sign in • backend required'}</button>`:`<button data-eng-v52-click="v31SignOut()">Sign out on this device</button>`}<button class="secondary" data-eng-v52-click="v22OpenDataPrivacy();v31CloseAccount()">Data & Privacy</button></div></section><section class="v31-cloud-zone"><div><span>CLOUD DATA</span><h3>Sync and deletion are explicit account operations.</h3><p>${guest?'There is no cloud account associated with this Guest session. Local deletion remains available in Data & Privacy.':'Cloud deletion requires explicit confirmation and a configured data backend.'}</p></div><div><button data-eng-v52-click="v31SyncNow()" ${syncReady&&s.permissions.cloudSync?'':'disabled aria-disabled="true"'}>Sync now</button><button class="danger" data-eng-v52-click="v31RequestCloudDeletion()" ${s.account?.authenticated&&b.data?'':'disabled aria-disabled="true"'}>Request cloud deletion</button></div></section><footer><span>${icon('layers')} Commercial Shell v${window.EngBookCommercial?.version||'—'} • no credentials, transcripts, audio, or personal images are included in product analytics.</span></footer></section></div>`;
}
function v31OpenAccount(){state.productMoreOpen=false;try{window.EngBookCommercial?.track?.('account_viewed',{source:'shell',plan:window.EngBookCommercial?.planId?.()||'preview'});}catch(e){}render();setTimeout(()=>{if(!document.getElementById('v31-account'))document.body.insertAdjacentHTML('beforeend',v31AccountMarkup());document.querySelector('.v31-account-dialog button')?.focus();},0);}
function v31CloseAccount(){document.getElementById('v31-account')?.remove();v21Announce?.('Account and access closed.');}
function v31ExplainSignIn(){const s=v31Commercial();if(!s.backend?.auth){toast?.('Authentication backend is not connected. Guest mode remains available.');return;}toast?.('Secure sign-in must be completed by the production authentication host. This static build does not collect passwords.');}
function v31SignOut(){try{window.EngBookCommercial?.signOut?.();toast?.('Signed out on this device. Local progress was kept.');v31CloseAccount();renderHome();}catch(e){toast?.('Could not sign out.');}}
function v31SetPermission(key,value){try{window.EngBookCommercial?.setPermission?.(key,Boolean(value));if(key==='productAnalytics'&&value)window.EngBookCommercial?.flushAnalytics?.().catch(()=>{});v22RenderPrivacyDialog?.();v21Announce?.(`${key} ${value?'enabled':'disabled'}.`);}catch(e){toast?.('Could not update this permission.');}}
async function v31SyncNow(){try{const payload={progress:JSON.parse(JSON.stringify(progress)),build:BUILD_INFO.tag};await window.EngBookCommercial.syncNow(payload);toast?.('Cloud sync completed.');v31CloseAccount();renderHome();}catch(e){toast?.(String(e?.message||'Cloud sync is unavailable.'));}}
async function v31RequestCloudDeletion(){if(!confirm('Request deletion of EngBook data associated with your signed-in cloud account? Local browser data is managed separately.'))return;try{const out=await window.EngBookCommercial.requestCloudDeletion(true);toast?.(out?.completed?'Cloud data deletion completed.':'Cloud deletion request submitted.');v31CloseAccount();renderHome();}catch(e){toast?.(String(e?.message||'Cloud deletion is unavailable.'));}}
function v31AccountChip(){const s=v31Commercial();return `<button class="v31-account-chip" data-eng-v52-click="v31OpenAccount()" aria-label="Account and access"><i>${s.account?.authenticated?icon('check'):icon('user')}</i><span><small>${s.account?.authenticated?'ACCOUNT':'LOCAL MODE'}</small><b>${esc(v31AccountLabel())}</b></span></button>`;}

/* Product shell: expose account status without turning the home screen into a billing dashboard. */
const _v30HomeHeaderV31=v27HomeHeader;
v27HomeHeader=function(){let html=_v30HomeHeaderV31();if(!html.includes('v31-account-chip'))html=html.replace('</div></header>',`${v31AccountChip()}</div></header>`);return html;};
const _v30TopbarV31=topbar;
topbar=function(){let html=_v30TopbarV31();if(!html.includes('v31-top-account'))html=html.replace('</div></header>',`<button class="v31-top-account" data-eng-v52-click="v31OpenAccount()" aria-label="Account and access"><span>${esc(v31AccountLabel())}</span></button></div></header>`);return html;};
const _v30ToolDrawerV31=productToolDrawer;
productToolDrawer=function(){let html=_v30ToolDrawerV31();if(!html||html.includes('v31-account-entry'))return html;const s=v31Commercial(),card=`<section class="v22-data-entry v31-account-entry"><div><span>ACCOUNT & ACCESS</span><b>${esc(v31AccountLabel())} • ${esc(v31PlanLabel())}</b><small>${s.account?.authenticated?'Review sync, entitlement, and cloud-data controls.':'Guest-first access; account, sync, billing, and deletion contracts are ready for a real backend.'}</small></div><button data-eng-v52-click="v31OpenAccount()">Manage ${icon('chevron')}</button></section>`;return html.replace('</aside></div>',`${card}</aside></div>`);};

/* Expand the existing privacy surface rather than create a competing settings page. */
if(typeof v22PrivacyMarkup==='function'){
  const _v30PrivacyMarkupV31=v22PrivacyMarkup;
  v22PrivacyMarkup=function(){
    const s=v31Commercial(),b=s.backend||{},analytics=s.permissions?.productAnalytics===true,crash=s.permissions?.crashReports===true,sync=s.permissions?.cloudSync===true;
    let html=_v30PrivacyMarkupV31().replaceAll('v0.30 is local-first','v0.31 is local-first');
    const controls=`<div class="v22-control-block v31-privacy-control"><div><span>PRODUCT ANALYTICS</span><h3>Anonymous usage signals stay off by default.</h3><p>When enabled, only allow-listed product events such as lesson number, mode, duration bucket, and feature name may leave the device. Transcripts, audio, free-text answers, and personal Scene images are excluded.</p></div><label class="v22-switch"><input type="checkbox" ${analytics?'checked':''} data-eng-v52-change="v31SetPermission('productAnalytics',this.checked)"><i></i><span>${analytics?(b.analytics?'Allowed':'Opted in • no endpoint'):'Off'}</span></label></div><div class="v22-control-block v31-privacy-control"><div><span>CRASH REPORTS</span><h3>Keep a privacy-safe local crash record.</h3><p>Local crash metadata is retained for recovery. Sending it remotely is opt-in and only possible after a crash endpoint is configured.</p></div><label class="v22-switch"><input type="checkbox" ${crash?'checked':''} data-eng-v52-change="v31SetPermission('crashReports',this.checked)"><i></i><span>${crash?(b.crash?'Allowed':'Opted in • no endpoint'):'Local only'}</span></label></div><div class="v22-control-block v31-privacy-control"><div><span>CLOUD SYNC</span><h3>Cross-device progress is explicit, never automatic.</h3><p>${s.account?.authenticated&&b.sync?'Enable only if you want this account’s learning state synchronized across devices.':'Requires a signed-in account and configured sync backend. Local progress continues without it.'}</p></div><label class="v22-switch ${s.account?.authenticated&&b.sync?'':'disabled'}"><input type="checkbox" ${sync?'checked':''} ${s.account?.authenticated&&b.sync?'':'disabled'} data-eng-v52-change="v31SetPermission('cloudSync',this.checked)"><i></i><span>${sync?'Enabled':'Off'}</span></label></div>`;
    html=html.replace('<section class="v22-data-actions">',`${controls}<section class="v22-data-actions">`);
    html=html.replace('No analytics or remote telemetry is implemented in this build.','Analytics and remote crash reporting are opt-in. The current local build has no configured telemetry endpoint.');
    return html;
  };
}

/* Local product analytics only collect allow-listed structural events. */
const _v30SetModeV31=setMode;
setMode=function(mode){const out=_v30SetModeV31(mode);try{window.EngBookCommercial?.track?.('mode_open',{lesson:activeLessonId(),mode:String(mode||'').slice(0,40),support:v27Support?.().key||'balanced',plan:window.EngBookCommercial?.planId?.()||'preview'});}catch(e){}return out;};
const _v30EnsureOpenV31=v28EnsureAndOpenLesson;
v28EnsureAndOpenLesson=async function(id,mode='explore',opts={}){const out=await _v30EnsureOpenV31(id,mode,opts);if(out)try{window.EngBookCommercial?.track?.('lesson_open',{lesson:Number(id),mode:String(mode||'explore'),source:'learning-path',plan:window.EngBookCommercial?.planId?.()||'preview'});}catch(e){}return out;};
if(typeof productFinishSession==='function'){
  const _v30FinishSessionV31=productFinishSession;
  productFinishSession=function(){try{window.EngBookCommercial?.track?.('focus_session_complete',{lesson:Number(progress.lastLesson||1),support:v27Support?.().key||'balanced',plan:window.EngBookCommercial?.planId?.()||'preview'});}catch(e){}return _v30FinishSessionV31();};
}
if(typeof v21PushError==='function'){
  const _v30PushErrorV31=v21PushError;
  v21PushError=function(err,context='runtime'){const out=_v30PushErrorV31(err,context);try{window.EngBookCommercial?.captureCrash?.(err,context);}catch(e){}return out;};
}

/* Diagnostics expose contracts and counts only — never account identifiers, event payloads, transcripts, audio, or images. */
if(typeof v21Diagnostics==='function'){
  const _v30DiagnosticsV31=v21Diagnostics;
  v21Diagnostics=function(){return {..._v30DiagnosticsV31(),build:V31_BUILD,commercialShell:window.EngBookCommercial?.exportSafeState?.()||null};};
}

document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('v31-account')){e.preventDefault();v31CloseAccount();}});
window.addEventListener('load',()=>{try{window.EngBookCommercial?.track?.('app_open',{source:'pwa',online:typeof navigator==='undefined'?true:navigator.onLine!==false,plan:window.EngBookCommercial?.planId?.()||'preview'});}catch(e){}});

progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=V31_BUILD;saveProgress();
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V31_BUILD,commercialShell:window.EngBookCommercial?.version||null,accountMode:v31Commercial().account?.mode||'guest',entitlementPlan:window.EngBookCommercial?.planId?.()||'preview',readyLessons:BUILD_INFO.readyLessons};

/* ======================================================================
   v0.32 — RELEASE UX & DEVICE READINESS
   Final pre-scale UX hardening: current-device capability audit, larger
   learner-facing typography/touch targets, and honest real-device preflight.
   No new lesson content is introduced in this release.
   ====================================================================== */
const V32_BUILD=BUILD_INFO.tag;
function v32DeviceAudit(){return window.EngBookDevice?.assess?.()||{overall:'unknown',blocking:0,degraded:0,checks:[],capabilities:{}};}
function v32StatusLabel(status){return ({ready:'Ready',fallback:'Fallback',degraded:'Limited',offline:'Offline',blocked:'Blocked'})[status]||'Check';}
function v32DeviceMarkup(){
  const a=v32DeviceAudit(),caps=a.capabilities||{};
  const badge=a.overall==='ready'?'READY':a.overall==='blocked'?'ACTION NEEDED':'COMPATIBLE WITH FALLBACKS';
  return `<div class="v32-device-backdrop" id="v32-device" role="presentation" data-eng-v52-click="if(event.target===this)v32CloseDeviceCheck()"><section class="v32-device-dialog" role="dialog" aria-modal="true" aria-labelledby="v32-device-title"><header><div><span>DEVICE READINESS</span><h2 id="v32-device-title">Check this browser before a real speaking session.</h2><p>This preflight reads browser capabilities only. It does not request microphone permission until you explicitly run the microphone test.</p></div><button data-eng-v52-click="v32CloseDeviceCheck()" aria-label="Close device readiness">${icon('close')}</button></header><div class="v32-device-summary ${esc(a.overall)}"><div><i></i><span><small>CURRENT DEVICE</small><b>${badge}</b></span></div><p>${a.blocking?`${a.blocking} blocking capability needs attention.`:a.degraded?`${a.degraded} feature${a.degraded===1?'':'s'} will use a fallback or limited mode.`:'Core learning and released browser features report ready.'}</p></div><div class="v32-device-grid">${a.checks.map(c=>`<article class="${esc(c.status)}"><div><i></i><span>${esc(c.label)}</span><b>${v32StatusLabel(c.status)}</b></div><p>${esc(c.detail)}</p></article>`).join('')}</div><section class="v32-live-tests"><div><span>EXPLICIT LIVE TEST</span><h3>Microphone permission</h3><p>The check opens the browser permission prompt, briefly opens the microphone stream, then immediately stops it. No audio is uploaded or retained.</p></div><div><button class="primary" data-eng-v52-click="v32RunMicrophoneTest()">Test microphone</button><button data-eng-v52-click="v32RefreshDeviceCheck()">Run preflight again</button></div></section><div class="v32-device-meta"><span>Viewport <b>${Number(caps.viewport?.width||0)}×${Number(caps.viewport?.height||0)}</b></span><span>Touch <b>${caps.touch?'Yes':'No'}</b></span><span>Standalone <b>${caps.standalone?'Yes':'No'}</b></span><span>Reduced motion <b>${caps.reducedMotion?'On':'Off'}</b></span></div><footer><p><b>Release note:</b> this is an in-browser preflight, not a laboratory device certification. Final acceptance still requires hands-on Chrome/Edge/Android/iOS testing.</p><button data-eng-v52-click="v21ExportDiagnostics()">Export privacy-safe diagnostics</button></footer></section></div>`;
}
function v32OpenDeviceCheck(){document.getElementById('v32-device')?.remove();document.body.insertAdjacentHTML('beforeend',v32DeviceMarkup());setTimeout(()=>document.querySelector('.v32-device-dialog button')?.focus(),0);}
function v32CloseDeviceCheck(){document.getElementById('v32-device')?.remove();v21Announce?.('Device readiness closed.');}
function v32RefreshDeviceCheck(){v32OpenDeviceCheck();v21Announce?.('Device preflight refreshed.');}
async function v32RunMicrophoneTest(){const btn=document.querySelector('.v32-live-tests .primary');if(btn){btn.disabled=true;btn.textContent='Testing…';}try{const out=await window.EngBookDevice.testMicrophone();toast?.(`Microphone ready${out?.label?` • ${out.label}`:''}`);v21Announce?.('Microphone test passed.');}catch(e){toast?.(String(e?.message||'Microphone test failed.'));v21Announce?.('Microphone test did not pass. Typed answers remain available.');}finally{setTimeout(()=>v32OpenDeviceCheck(),120);}}

/* Add device readiness to Account & Access without crowding the learning home. */
const _v31AccountMarkupV32=v31AccountMarkup;
v31AccountMarkup=function(){let html=_v31AccountMarkupV32();const a=v32DeviceAudit(),label=a.overall==='ready'?'Ready':a.overall==='blocked'?'Action needed':'Fallbacks available';const section=`<section class="v31-cloud-zone v32-account-device"><div><span>DEVICE READINESS</span><h3>${esc(label)} on this browser.</h3><p>Check microphone, live transcript, local recording, coach voice, offline support, and storage before release testing.</p></div><div><button data-eng-v52-click="v31CloseAccount();v32OpenDeviceCheck()">Run device check</button></div></section>`;return html.replace('<section class="v31-cloud-zone">',`${section}<section class="v31-cloud-zone">`);};

/* Add the same preflight to Studio/More for easy tester access. */
const _v31ToolDrawerV32=productToolDrawer;
productToolDrawer=function(){let html=_v31ToolDrawerV32();if(!html||html.includes('v32-device-entry'))return html;const a=v32DeviceAudit(),card=`<section class="v22-data-entry v32-device-entry"><div><span>DEVICE CHECK</span><b>${a.overall==='ready'?'Ready':a.overall==='blocked'?'Action needed':'Fallbacks available'}</b><small>Run a privacy-safe browser preflight before speaking or offline release tests.</small></div><button data-eng-v52-click="v32OpenDeviceCheck()">Check ${icon('chevron')}</button></section>`;return html.replace('</aside></div>',`${card}</aside></div>`);};

/* Keep the privacy copy current. */
if(typeof v22PrivacyMarkup==='function'){
  const _v31PrivacyMarkupV32=v22PrivacyMarkup;
  v22PrivacyMarkup=function(){return _v31PrivacyMarkupV32().replaceAll('v0.31 is local-first','v0.32 is local-first');};
}

/* Diagnostics include capability booleans only; never microphone labels or user media. */
if(typeof v21Diagnostics==='function'){
  const _v31DiagnosticsV32=v21Diagnostics;
  v21Diagnostics=function(){return {..._v31DiagnosticsV32(),build:V32_BUILD,deviceReadiness:window.EngBookDevice?.safeSnapshot?.()||null};};
}

document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('v32-device')){e.preventDefault();v32CloseDeviceCheck();}});
progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=V32_BUILD;saveProgress();
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V32_BUILD,releaseUx:true,deviceReadiness:window.EngBookDevice?.version||null,readyLessons:BUILD_INFO.readyLessons};

/* ======================================================================
   v0.33 — MULTI-CATEGORY COURSE ARCHITECTURE
   Course → Category → Lesson information architecture for the full
   course roadmap. Category metadata does not imply app availability.
   No new lesson content is introduced in this release.
   ====================================================================== */
const COURSE_ARCH_BUILD=BUILD_INFO.tag;
function v33EnsureCourseProgress(){
  progress.activeCategory=Number(progress.activeCategory||1);
  const prior=progress.lastLessonByCategory&&typeof progress.lastLessonByCategory==='object'?progress.lastLessonByCategory:{};
  progress.lastLessonByCategory={...prior};
  if(!progress.lastLessonByCategory[1])progress.lastLessonByCategory[1]=Number(progress.lastLesson||1);
  const active=Number(progress.activeCategory||1);
  if(!progress.lastLessonByCategory[active]&&Number(progress.lastLesson||0))progress.lastLessonByCategory[active]=Number(progress.lastLesson);
  return progress;
}
function v33Categories(){return window.EngBookContent?.listCategories?.()||window.ENGBOOK_COURSE_CATALOG?.listCategories?.()||[];}
function v33ActiveCategoryId(){v33EnsureCourseProgress();const id=Number(progress.activeCategory||1);return window.EngBookContent?.getCategory?.(id)?id:1;}
function v33Category(id=v33ActiveCategoryId()){return window.EngBookContent?.categorySnapshot?.(Number(id))||window.EngBookContent?.getCategory?.(Number(id))||window.ENGBOOK_COURSE_CATALOG?.getCategory?.(Number(id))||null;}
function v33CategoryTotal(id=v33ActiveCategoryId()){const c=v33Category(id);return Number(c?.lessonCount||c?.totalLessons||window.EngBookContent?.listLessons?.(id)?.length||0)||null;}
function v33CategoryReady(id=v33ActiveCategoryId()){return Number(window.EngBookContent?.readyLessonCountForCategory?.(id)||0);}
function v33CategoryProgress(id=v33ActiveCategoryId()){
  const lessons=(window.EngBookContent?.listLessons?.(id)||[]).filter(x=>x.ready);if(!lessons.length)return 0;
  return Math.round(lessons.reduce((a,l)=>a+v27LessonCompletion(l.id),0)/lessons.length);
}
function v33SourceLabel(c){
  const s=String(c?.sourceStatus||'');
  if(s==='deep-image-verified')return 'Deep image verification';
  if(s==='image-verified')return 'Image verified';
  if(s==='image-based-final')return 'Final image-grounded content';
  if(s==='architecture-approved')return 'Architecture approved';
  return 'Content mapped';
}
function v33RangeLabel(c){const hasRange=c?.lessonStart!==null&&c?.lessonStart!==undefined&&c?.lessonEnd!==null&&c?.lessonEnd!==undefined&&Number.isFinite(Number(c.lessonStart))&&Number.isFinite(Number(c.lessonEnd));const hasTotal=c?.totalLessons!==null&&c?.totalLessons!==undefined&&Number.isFinite(Number(c.totalLessons));return hasRange?`Lessons ${c.lessonStart}–${c.lessonEnd}`:(hasTotal?`${c.totalLessons} lessons`:'Lesson range added with content onboarding');}
function v33CourseStats(){const cats=v33Categories();return {mapped:cats.length,available:cats.filter(c=>v33CategoryReady(c.id)>0).length,readyLessons:cats.reduce((n,c)=>n+v33CategoryReady(c.id),0)};}

/* Make the already-generic adaptive layer category-aware. */
v27ReadyLessons=function(){try{return (window.EngBookContent?.listLessons?.(v33ActiveCategoryId())||[]).filter(x=>x.ready);}catch(e){return[];}};

v27HomeHeader=function(){
  const m=ensureMomentum(),cat=v33Category(),ready=v33CategoryReady(),total=v33CategoryTotal(),stats=v33CourseStats();
  return `<header class="v27-home-header v33-home-header"><div class="v27-brand"><img class="scenespeak-brand-icon" src="assets/brand/scenespeak-192.png" alt="" width="40" height="40"><div><b>SceneSpeak</b><small>Visual Conversation</small></div></div><div class="v33-course-context"><button data-eng-v52-click="v33OpenCourseMap(${cat?.id||1})"><span>COURSE MAP</span><b>${stats.mapped} categories</b></button><i></i><div><span>CURRENT CATEGORY</span><b>${String(cat?.id||1).padStart(2,'0')} · ${esc(cat?.shortTitle||cat?.title||'Category')}</b></div></div><div class="v27-home-status"><span><i></i>${ready}${total?'/'+total:''} ready</span><span>${m.days||1} day${(m.days||1)===1?'':'s'} active</span><button data-eng-v52-click="showOnboarding(0)" aria-label="Quick guide">?</button><button class="v27-avatar" data-eng-v52-click="productOpenProfile()" aria-label="Open learning profile">${Math.max(1,Math.min(99,fpProfile().balance||0))}</button></div></header>`;
};

v27Hero=function(){
  const cat=v33Category(),ready=v27ReadyLessons(),remembered=Number(progress.lastLessonByCategory?.[cat?.id]||progress.lastLesson||ready[0]?.id||1),last=ready.some(x=>Number(x.id)===remembered)?remembered:Number(ready[0]?.id||1),meta=v27LessonMeta(last)||{},sig=v27Signals(last),action=v27Action(last),support=v27Support(),pct=v27LessonCompletion(last),img=meta.image||`assets/images/lesson_${String(last).padStart(2,'0')}.jpg`;
  progress.lastLesson=last;progress.lastLessonByCategory[cat?.id||1]=last;
  return `<section class="v27-hero v33-hero"><div class="v27-hero-scene"><img src="${esc(img)}" alt="${esc(meta.title||'Current lesson')}"><div class="v27-hero-overlay"></div><div class="v27-hero-badge"><span>CONTINUE</span><b>Lesson ${courseLessonLabel(last)}</b></div><div class="v27-hero-copy"><button class="v33-hero-category" data-eng-v52-click="v33OpenCourseMap(${cat?.id||1})">CATEGORY ${String(cat?.id||1).padStart(2,'0')} · ${esc(cat?.title||'')}</button><h1>${esc(meta.title||'Visual Conversation')}</h1><p>${esc(action.reason)}</p><div class="v27-hero-actions"><button class="primary" data-eng-v52-click="v27LaunchAction(${last})">${icon(action.icon||'spark')} ${esc(action.label)} <em>${icon('chevron')}</em></button><button data-eng-v52-click="v27OpenLesson(${last},'explore')">Open scene</button></div></div><div class="v27-hero-progress"><div><span>Lesson progress</span><b>${pct}%</b></div><div class="v27-progress"><i style="width:${pct}%"></i></div></div></div><aside class="v27-coach-card"><div class="v27-coach-orb">${icon('spark')}</div><span>SMART COACH</span><h2>One next move, not twelve choices.</h2><p>${esc(action.reason)}</p><div class="v27-signal-row"><div><b>${sig.discovery}</b><span>observe</span></div><div><b>${sig.describe}</b><span>describe</span></div><div><b>${sig.evidence}</b><span>evidence</span></div><div><b>${sig.conversation===null?'—':sig.conversation}</b><span>converse</span></div></div><div class="v27-support"><div><span>SUPPORT</span><b>${esc(support.label)}</b></div><div>${['guided','balanced','independent'].map(k=>`<button class="${support.key===k?'active':''}" data-eng-v52-click="v27SetSupport('${k}')">${k==='guided'?'Guided':k==='independent'?'Independent':'Balanced'}</button>`).join('')}</div><small>${esc(support.description)}</small></div></aside></section>`;
};

function v33CourseStrip(){
  const cat=v33Category(),stats=v33CourseStats(),cp=v33CategoryProgress(cat?.id||1),ready=v33CategoryReady(cat?.id||1),total=v33CategoryTotal(cat?.id||1);
  return `<section class="v33-course-strip"><div><span>YOUR COURSE</span><h2>One learning system, ${stats.mapped} visual categories.</h2><p>Progress is stored by category and by scene, so adding hundreds of lessons does not flatten the course into one endless list.</p></div><div class="v33-course-strip-stats"><article><b>${String(cat?.id||1).padStart(2,'0')}</b><span>current category</span></article><article><b>${ready}${total?'/'+total:''}</b><span>scenes available</span></article><article><b>${cp}%</b><span>category progress</span></article><article><b>${stats.mapped}</b><span>categories mapped</span></article></div><button data-eng-v52-click="v33OpenCourseMap(${cat?.id||1})">Browse all categories ${icon('chevron')}</button></section>`;
}

v27LearningPath=function(){
  const categoryId=v33ActiveCategoryId(),cat=v33Category(categoryId),all=window.EngBookContent?.listLessons?.(categoryId)||[],ready=all.filter(x=>x.ready),show=all.slice(0,Math.min(12,all.length)),total=v33CategoryTotal(categoryId)||all.length;
  return `${v33CourseStrip()}<section class="v27-section v27-path v33-category-path"><div class="v27-section-head"><div><span>CATEGORY ${String(categoryId).padStart(2,'0')} • LEARNING PATH</span><h2>${ready.length} scenes ready in ${esc(cat?.shortTitle||cat?.title||'this category')}.</h2><p>Each category owns its own lesson history, review queue, scene signals, and last-opened lesson.</p></div><b class="v27-ready-pill">${ready.length}/${total||'?'} READY</b></div><div class="v27-path-row">${show.map(l=>{const n=Number(l.id),pct=l.ready?v27LessonCompletion(n):0,sig=l.ready?v27Signals(n):null,lazy=l.ready&&!l.loaded&&n>1;return `<button class="v27-path-card ${l.ready?'ready':'locked'} ${Number(progress.lastLessonByCategory?.[categoryId]||progress.lastLesson)===n?'current':''}" ${l.ready?`data-eng-v52-click="v27OpenLesson(${n},'explore')"`:'disabled'}><div class="v27-path-thumb"><img src="${esc(l.image)}" alt=""><span>${courseLessonLabel(n)}</span>${l.ready?`<i>${lazy?'ON DEMAND':pct+'%'}</i>`:'<i>LOCKED</i>'}</div><b>${esc(l.title)}</b><small>${l.ready?`${lazy?'Released • downloads on first open':sig.balance+'% scene balance'} · ${v27Action(n).short} next`:'Editorial validation pending'}</small>${l.ready&&!lazy?`<div class="v27-mini-progress"><i style="width:${pct}%"></i></div>`:''}</button>`;}).join('')}</div><footer class="v33-path-footer"><span>${esc(cat?.title||'Category')}</span><div><button data-eng-v52-click="v34OpenLessonBrowser(${categoryId})">All scenes</button><button data-eng-v52-click="v33OpenCourseMap(${categoryId})">Switch category</button></div></footer></section>`;
};

function v33CourseCard(c){
  const snap=v33Category(c.id)||c,ready=v33CategoryReady(c.id),total=v33CategoryTotal(c.id),active=Number(c.id)===v33ActiveCategoryId(),available=ready>0,range=v33RangeLabel(snap);
  return `<button class="v33-category-card ${active?'active':''} ${available?'available':'catalog'}" data-eng-v52-click="v33ShowCategory(${c.id})"><div class="v33-cat-num"><span>${String(c.id).padStart(2,'0')}</span><i></i></div><div class="v33-cat-copy"><span>${c.phase==='expansion'?'EXPANSION':'CORE COURSE'}</span><b>${esc(c.title)}</b><small>${esc(c.scope||'')}</small></div><div class="v33-cat-meta"><em>${available?`${ready}${total?'/'+total:''} APP READY`:(snap?.intakeStatus==='content-staged-image-pending'?`0${total?'/'+total:''} READY • ${Number(snap?.stagedLessons||0)} CONTENT STAGED • IMAGE INTAKE PENDING`:(snap?.intakeStatus==='source-preflight-locked'?`0${total?'/'+total:''} READY • SOURCE QA LOCKED`:'APP ONBOARDING PENDING'))}</em><span>${esc(range)}</span></div></button>`;
}
function v33CourseDetail(c){
  if(!c)return '';
  const ready=v33CategoryReady(c.id),total=v33CategoryTotal(c.id),available=ready>0,active=Number(c.id)===v33ActiveCategoryId(),progressPct=available?v33CategoryProgress(c.id):0;
  return `<aside class="v33-category-detail"><div class="v33-detail-number">${String(c.id).padStart(2,'0')}</div><span>${c.phase==='expansion'?'EXPANSION CATEGORY':'CORE CATEGORY'}</span><h3>${esc(c.title)}</h3><p>${esc(c.scope||'')}</p><div class="v33-detail-facts"><div><b>${v33SourceLabel(c)}</b><span>source status</span></div><div><b>${esc(v33RangeLabel(c))}</b><span>course mapping</span></div><div><b>${available?`${ready}${total?'/'+total:''}`:'Not onboarded'}</b><span>interactive app</span></div>${available?`<div><b>${progressPct}%</b><span>category progress</span></div>`:''}</div><div class="v33-detail-note">${available?'This category already has validated interactive lesson packs in the current build.':'This category is mapped at course level, but this build does not pretend its interactive lesson packs are ready. When content is onboarded, the same category shell will activate without redesigning navigation.'}</div><div class="v33-detail-actions">${available?`<button class="primary" data-eng-v52-click="v33ActivateCategory(${c.id})">${active?'Continue this category':'Open this category'} ${icon('chevron')}</button>`:`<button disabled>Interactive content pending</button>`}<button data-eng-v52-click="v33CloseCourseMap()">Close</button></div></aside>`;
}
function v33CourseMapMarkup(selectedId=v33ActiveCategoryId()){
  const cats=v33Categories(),core=cats.filter(c=>c.phase!=='expansion'),expansion=cats.filter(c=>c.phase==='expansion'),selected=cats.find(c=>Number(c.id)===Number(selectedId))||cats[0],stats=v33CourseStats();
  return `<div class="v33-course-backdrop" id="v33-course-map" data-eng-v52-click="if(event.target===this)v33CloseCourseMap()"><section class="v33-course-dialog" role="dialog" aria-modal="true" aria-labelledby="v33-course-title"><header><div><span>ENGBOOK COURSE MAP</span><h2 id="v33-course-title">Designed for the whole course — not one giant lesson list.</h2><p>${stats.mapped} categories are mapped in the course architecture. Only categories with validated app packs can be opened.</p></div><button data-eng-v52-click="v33CloseCourseMap()" aria-label="Close course map">${icon('close')}</button></header><div class="v33-course-body"><main><section><div class="v33-group-head"><span>01–12</span><div><b>Core course</b><small>Existing thematic structure stays intact.</small></div></div><div class="v33-category-grid">${core.map(v33CourseCard).join('')}</div></section><section><div class="v33-group-head"><span>13–20</span><div><b>Expansion architecture</b><small>New domains extend the course without moving the original categories.</small></div></div><div class="v33-category-grid">${expansion.map(v33CourseCard).join('')}</div></section></main><div id="v33-category-detail">${v33CourseDetail(selected)}</div></div><footer><div><b>${stats.available}</b><span>category currently interactive</span></div><div><b>${stats.readyLessons}</b><span>validated app lessons</span></div><div><b>${stats.mapped}</b><span>course categories mapped</span></div><p>Category mapping ≠ app release. This distinction prevents future content growth from creating fake availability.</p></footer></section></div>`;
}
function v33OpenCourseMap(selectedId=v33ActiveCategoryId()){document.getElementById('v33-course-map')?.remove();document.body.insertAdjacentHTML('beforeend',v33CourseMapMarkup(selectedId));setTimeout(()=>document.querySelector('.v33-course-dialog header button')?.focus(),0);}
function v33CloseCourseMap(){document.getElementById('v33-course-map')?.remove();try{v21Announce?.('Course map closed.');}catch(e){}}
function v33ShowCategory(id){const c=v33Category(id);const box=document.getElementById('v33-category-detail');if(box&&c)box.innerHTML=v33CourseDetail(c);document.querySelectorAll('.v33-category-card').forEach((el,i)=>{const cat=v33Categories()[i];el.classList.toggle('selected',Number(cat?.id)===Number(id));});}
function v33ActivateCategory(id){
  const n=Number(id);if(!window.EngBookContent?.canOpenCategory?.(n)){v33ShowCategory(n);return false;}
  v33EnsureCourseProgress();progress.activeCategory=n;const ready=(window.EngBookContent.listLessons(n)||[]).filter(x=>x.ready);const remembered=Number(progress.lastLessonByCategory[n]||ready[0]?.id||0);progress.lastLesson=ready.some(x=>Number(x.id)===remembered)?remembered:Number(ready[0]?.id||1);progress.lastLessonByCategory[n]=progress.lastLesson;saveProgress();v33CloseCourseMap();renderHome();return true;
}

/* Keep course context in sync whenever a lesson is opened. */
function v33RememberLessonCategory(id){const meta=window.EngBookContent?.getMeta?.(Number(id));if(!meta)return;v33EnsureCourseProgress();const cid=Number(meta.categoryId||1);progress.activeCategory=cid;progress.lastLesson=Number(id);progress.lastLessonByCategory[cid]=Number(id);saveProgress();}
const _v32OpenLessonV33=openLesson;
openLesson=function(id){const out=_v32OpenLessonV33(id);if(window.EngBookContent?.canOpen?.(Number(id)))v33RememberLessonCategory(id);return out;};
const _v32EnsureOpenV33=v28EnsureAndOpenLesson;
v28EnsureAndOpenLesson=async function(id,mode='explore',opts={}){const out=await _v32EnsureOpenV33(id,mode,opts);if(out)v33RememberLessonCategory(id);return out;};

/* Add a category breadcrumb to lesson chrome. */
const _v32TopbarV33=topbar;
topbar=function(){let html=_v32TopbarV33();const c=v33Category(window.EngBookContent?.getMeta?.(activeLessonId())?.categoryId||v33ActiveCategoryId());if(!html.includes('v33-top-category'))html=html.replace('<div class="product-scene-title">',`<button class="v33-top-category" data-eng-v52-click="v33OpenCourseMap(${c?.id||1})"><small>CAT</small><b>${String(c?.id||1).padStart(2,'0')}</b></button><div class="product-scene-title">`);return html;};

/* v32 → v33 local namespace migration and category-aware state. */
v33EnsureCourseProgress();progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=COURSE_ARCH_BUILD;saveProgress();
const _v32RenderHomeV33=renderHome;
renderHome=function(){v33EnsureCourseProgress();const out=_v32RenderHomeV33();document.querySelector('.v27-shell')?.classList.add('v33-shell');return out;};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('v33-course-map')){e.preventDefault();v33CloseCourseMap();}});
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:COURSE_ARCH_BUILD,courseCatalog:window.ENGBOOK_COURSE_CATALOG?.schemaVersion||1,mappedCategories:v33Categories().length,activeCategory:v33ActiveCategoryId(),readyCategories:v33CourseStats().available,readyLessons:BUILD_INFO.readyLessons};

/* Keep learner-facing privacy version copy aligned with the course build. */
if(typeof v22PrivacyMarkup==='function'){
  const _v32PrivacyMarkupV33=v22PrivacyMarkup;
  v22PrivacyMarkup=function(){const v='v'+BUILD_INFO.version;return _v32PrivacyMarkupV33().replaceAll('v0.32 is local-first',v+' is local-first').replaceAll('v0.32',v).replaceAll('v0.33',v);};
}



function v34LessonBrowserMarkup(categoryId=v33ActiveCategoryId()){
  const cid=Number(categoryId||1),cat=v33Category(cid),lessons=window.EngBookContent?.listLessons?.(cid)||[],ready=lessons.filter(x=>x.ready).length,total=v33CategoryTotal(cid)||lessons.length;
  return `<div class="v34-browser-backdrop" id="v34-lesson-browser" data-eng-v52-click="if(event.target===this)v34CloseLessonBrowser()"><section class="v34-browser-dialog" role="dialog" aria-modal="true" aria-labelledby="v34-browser-title"><header><div><span>CATEGORY ${String(cid).padStart(2,'0')} • SCENE LIBRARY</span><h2 id="v34-browser-title">${esc(cat?.title||'Category')}</h2><p>${ready}/${total||'?'} scenes are validated for interactive practice. Locked scenes stay visible as course context without pretending to be released.</p></div><button data-eng-v52-click="v34CloseLessonBrowser()" aria-label="Close lesson library">${icon('close')}</button></header><div class="v34-browser-grid">${lessons.map(l=>{const n=Number(l.id),pct=l.ready?v27LessonCompletion(n):0,lazy=l.ready&&!l.loaded&&n>1;return `<button class="v34-browser-card ${l.ready?'ready':'locked'} ${Number(progress.lastLessonByCategory?.[cid]||progress.lastLesson)===n?'current':''}" ${l.ready?`data-eng-v52-click="v34OpenFromBrowser(${n})"`:'disabled'}><div><img src="${esc(l.image)}" alt=""><span>${courseLessonLabel(n)}</span><i>${l.ready?(lazy?'ON DEMAND':pct+'%'):'LOCKED'}</i></div><b>${esc(l.title)}</b><small>${l.ready?(lazy?'Validated • downloads on first open':'Ready for practice'):'Editorial validation pending'}</small></button>`;}).join('')}</div><footer><span>${ready} interactive scenes • ${Math.max(0,(total||lessons.length)-ready)} pending</span><button data-eng-v52-click="v34CloseLessonBrowser()">Close</button></footer></section></div>`;
}
function v34OpenLessonBrowser(categoryId=v33ActiveCategoryId()){document.getElementById('v34-lesson-browser')?.remove();document.body.insertAdjacentHTML('beforeend',v34LessonBrowserMarkup(categoryId));setTimeout(()=>document.querySelector('.v34-browser-dialog header button')?.focus(),0);}
function v34CloseLessonBrowser(){document.getElementById('v34-lesson-browser')?.remove();}
async function v34OpenFromBrowser(id){const ok=await v27OpenLesson(Number(id),'explore');if(ok!==false)v34CloseLessonBrowser();}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('v34-lesson-browser')){e.preventDefault();v34CloseLessonBrowser();}});

/* ===== v0.34 CATEGORY 01 BATCH SCALE — LESSONS 06–10 ===== */
const V34_BUILD=BUILD_INFO.tag;
progress.schemaVersion=PROGRESS_SCHEMA_VERSION;
progress.build=V34_BUILD;
try{v33EnsureCourseProgress();}catch(_e){}
saveProgress();
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V34_BUILD,progressSchema:PROGRESS_SCHEMA_VERSION,mappedCategories:window.EngBookContent?.listCategories?.().length||20,activeCategory:progress.activeCategory||1,readyLessons:BUILD_INFO.readyLessons,readyCategory01:window.EngBookContent?.readyLessonCountForCategory?.(1)||20};
if(typeof v22PrivacyMarkup==='function'){
  const _v33PrivacyMarkupV34=v22PrivacyMarkup;
  v22PrivacyMarkup=function(){return _v33PrivacyMarkupV34().replace('Lessons 01–05 are released','Lessons 01–28 are released').replace('Lessons 06–28 stay locked','All 28 Category 01 lessons are released');};
}



/* ======================================================================
   v0.35 — HOTSPOT & CAPABILITY ACCURACY PASS
   Atomic hotspot vocabulary, detail layers for dense regions, generic
   completion, and source-synced Lesson 01 grammar.
   ====================================================================== */
const V35_BUILD=BUILD_INFO.tag;
function activeHotspotCount(){return Math.max(1,Number(state?.lesson?.hotspots?.length||window.EngBookContent?.resolve?.(activeLessonId())?.lesson?.hotspots?.length||1));}
function v35DetailParent(){
  const t=state.practiceTarget;
  if(state.mode==='practice'&&['find','listen','smart'].includes(state.practiceType)&&t?.level==='detail')return t.parentId||null;
  return state.hotspotDetailParent||null;
}
function v55DetailGroups(parentId){
  const hs=state.lesson?.hotspots||[],children=window.EngBookHotspots?.childrenOf?.(hs,parentId)||[];
  return [...new Set(children.map(h=>h.detailGroup).filter(Boolean))];
}
function v55DetailGroupLabel(group){return ({appearance:'Hair & face',shirt:'Shirt details','lower-body':'Lower body',dress:'Dress details',posture:'Posture & contact',gesture:'Hands & gesture',sweater:'Sweater details',jacket:'Jacket details','striped-top':'Striped top',tableware:'Tableware',food:'Food details',surface:'Surface details',window:'Window details',plant:'Plant details',decor:'Wall décor',light:'Light details',ground:'Shoreline details',vegetation:'Vegetation details',water:'Water details','sky-light':'Sky & light',reflection:'Reflection details','hair-accessories':'Hair accessories',shoes:'Shoes',interaction:'Interaction',structure:'Playground details','background-people':'Background people',sofa:'Sofa details',emotion:'Emotion cues',scene:'Scene interpretation',shelves:'Shelf details',fireplace:'Fireplace details',floor:'Floor details'})[group]||group;}
function v55SetDetailGroup(group){state.hotspotDetailGroup=group;state.selected=null;render();}
function v56AttributeScan(){const hs=state.lesson?.hotspots;if(!hs)return null;return {totalHotspots:hs.length,primaryHotspots:hs.filter(h=>h.level!=='detail').length,detailHotspots:hs.filter(h=>h.level==='detail').length};}
function v55DetailGroupMarkup(parentId){
  if(!parentId)return '';
  const groups=v55DetailGroups(parentId);if(groups.length<2)return '';
  const active=groups.includes(state.hotspotDetailGroup)?state.hotspotDetailGroup:groups[0];
  return `<div class="v55-detail-groups" role="tablist" aria-label="Detail groups">${groups.map(g=>`<button class="${g===active?'active':''}" data-eng-v52-click="event.stopPropagation();v55SetDetailGroup('${g}')">${v55DetailGroupLabel(g)}</button>`).join('')}</div>`;
}
function v35VisibleHotspots(){
  const hs=state.lesson?.hotspots||[],parent=v35DetailParent();
  if(parent){
    const groups=v55DetailGroups(parent);
    if(groups.length){
      if(!groups.includes(state.hotspotDetailGroup))state.hotspotDetailGroup=groups[0];
      const active=state.hotspotDetailGroup;
      return hs.map((h,index)=>({h,index})).filter(({h})=>h.id===parent||(h.level==='detail'&&h.parentId===parent&&(!active||!h.detailGroup||h.detailGroup===active)));
    }
  }
  return window.EngBookHotspots?.visibleEntries?.(hs,parent)||hs.map((h,index)=>({h,index}));
}
function v35CloseDetailLayer(){state.hotspotDetailParent=null;state.hotspotDetailGroup=null;state.selected=null;render();}
const _v34OpenLessonV35=openLesson;
openLesson=function(id){state.hotspotDetailParent=null;state.hotspotDetailGroup=null;state.viewer={scale:1,tx:0,ty:0,sheet:'collapsed',interacting:false,lastTap:0};state.photoZoom=1;return _v34OpenLessonV35(id);};
const _v34SetModeV35=setMode;
setMode=function(mode){state.hotspotDetailParent=null;state.hotspotDetailGroup=null;return _v34SetModeV35(mode);};

handleStageTap=function(e){
  if(Date.now()<suppressStageClickUntil)return;if(e.target.closest('.hotspot'))return;
  const rect=e.currentTarget.getBoundingClientRect(),mapped=e.currentTarget.classList?.contains('v59-viewer-stage')&&v59IsInteractiveViewer(e.currentTarget)?v59ClientToImagePercent(e.currentTarget,e.clientX,e.clientY):null;
  const x=mapped?.x??((e.clientX-rect.left)/rect.width)*100,y=mapped?.y??((e.clientY-rect.top)/rect.height)*100;if(mapped&&mapped.inside===false)return;
  let best={i:-1,d:999};v35VisibleHotspots().forEach(({h,index})=>{const dx=(h.x-x)*1.15,dy=h.y-y,d=Math.hypot(dx,dy);if(d<best.d)best={i:index,d};});
  if(best.d<11.5){hotspotClick(best.i);return;}if(e.currentTarget.classList?.contains('v59-viewer-stage')&&v59IsInteractiveViewer(e.currentTarget)&&state.mode!=='practice')return;state.tapFeedback={x,y,ok:false};haptic(10);toast(state.mode==='practice'?'Not there — scan the scene again.':'Try a clear person, object, or scene detail.');render();
};
hotspotClick=function(i){
  const h=state.lesson?.hotspots?.[i];if(!h)return;
  if(state.mode==='practice'&&['find','listen','smart'].includes(state.practiceType))return answerFind(i);
  const isNew=markDiscovered(h.en);state.selected=i;state.wordDepth=isNew?'word':state.wordDepth;state.tapFeedback={x:h.x,y:h.y,ok:true};v59EnsureViewer().sheet='peek';
  const children=window.EngBookHotspots?.childrenOf?.(state.lesson.hotspots,h.id)||[];
  if(children.length){const opening=state.hotspotDetailParent!==h.id;state.hotspotDetailParent=opening?h.id:null;const groups=opening?v55DetailGroups(h.id):[];state.hotspotDetailGroup=opening&&groups.length?groups[0]:null;}
  else if(h.level!=='detail'){state.hotspotDetailParent=null;state.hotspotDetailGroup=null;}
  haptic(isNew?[18,35,18]:14);speak(h.en,.82);if(isNew){state.discoverCelebration=true;setTimeout(()=>{state.discoverCelebration=false},800);}
  if(discoveredSet().size>=activeHotspotCount())progress.completed[`l${activeLessonId()}_explore`]=true;saveProgress();render();
};
sceneStage=function(modal=false){
  const l=state.lesson,sel=state.selected!==null?l.hotspots[state.selected]:null,discovered=discoveredSet(),practiceFind=state.mode==='practice'&&['find','listen','smart'].includes(state.practiceType),spotX=sel?sel.x:50,spotY=sel?sel.y:50,adaptiveTarget=practiceFind&&state.practiceMistakes>=2?state.practiceTarget:null,lens=practiceFind?[]:state.scanMode==='actions'?ACTION_LENS:state.scanMode==='composition'?COMPOSITION_LENS:[],motion=practiceFind||state.scanMode!=='motion'?[]:MOTION_LENS,parent=v35DetailParent(),visible=v35VisibleHotspots(),parentHot=parent?l.hotspots.find(h=>h.id===parent):null;
  return `<div class="image-stage v59-viewer-stage ${modal?'modal-stage':''} ${sel&&!practiceFind?'has-focus':''} lens-${state.scanMode}" style="--spot-x:${spotX}%;--spot-y:${spotY}%;" data-v59-viewer="${modal?'focus':'lesson'}" data-eng-v52-click="handleStageTap(event)">
    <div class="v59-scene-content v59-transform-stage" data-v59-content><img class="scene-image" src="${l.image}" alt="${esc(l.title)}" draggable="false">${sel&&!practiceFind?'<div class="focus-veil"></div>':''}
    ${visible.map(({h,index})=>`<button class="hotspot ${(h.level==='detail')?'detail-hotspot':''} ${state.hints&&!practiceFind?'hint':''} ${state.selected===index?'active':''} ${discovered.has(h.en)?'discovered':''} ${adaptiveTarget?.en===h.en?'adaptive-hint':''}" style="left:${h.x}%;top:${h.y}%;width:${Math.max(44,Number(h.hitW||Math.max(58,h.r*9)))}px;height:${Math.max(44,Number(h.hitH||Math.max(58,h.r*9)))}px" data-eng-v52-click="event.stopPropagation();hotspotClick(${index})" aria-label="${esc(h.en)}"></button>`).join('')}
    ${parent&&!practiceFind?`<div class="v35-detail-chip"><span>DETAIL VIEW</span><b>${esc(parentHot?.en||'Focused area')}</b><button data-eng-v52-click="event.stopPropagation();v35CloseDetailLayer()">Back</button></div>${v55DetailGroupMarkup(parent)}`:''}
    ${lens.map((a,i)=>`<div class="lens-chip ${state.scanMode}" style="left:${a.x}%;top:${a.y}%"><i>${i+1}</i><span><b>${esc(a.label)}</b><small>${esc(a.sub)}</small></span></div>`).join('')}${motion.map((a,i)=>`<div class="motion-cue ${a.type}" style="left:${a.x}%;top:${a.y}%"><i></i><span><b>${esc(a.label)}</b><small>${esc(a.sub)}</small></span></div>`).join('')}${coverageOverlayMarkup()}
    ${state.peek&&!practiceFind?visible.filter(({h})=>discovered.has(h.en)).map(({h})=>`<div class="peek-anchor" style="left:${h.x}%;top:${h.y}%"><i></i><b>${esc(h.en)}</b></div>`).join(''):''}
    ${sel&&!practiceFind?`<div class="spot-label" style="left:${clamp(sel.x,12,88)}%;top:${clamp(sel.y-8,13,85)}%"><b>${esc(sel.en)}</b><span>${esc(sel.pron)} · ${masteryLabel(sel.en)}</span></div>`:''}${sel&&!practiceFind?tapTalkWheel(sel):''}${state.mode==='talk'?roleSceneBadge():''}${state.tapFeedback?`<div class="tap-feedback ${state.tapFeedback.ok?'ok':'miss'}" style="left:${state.tapFeedback.x}%;top:${state.tapFeedback.y}%"></div>`:''}${state.discoverCelebration&&sel?`<div class="micro-burst" style="left:${sel.x}%;top:${sel.y}%"><i></i><i></i><i></i><i></i><i></i><i></i></div>`:''}
    </div><div class="photo-top-actions">${state.mode==='speak'?`<button data-eng-v52-click="event.stopPropagation();toggleCoverageOverlay()" class="glass-btn coverage-toggle ${state.coverageOverlay?'active':''}">${icon('spark')}<span>${state.coverageOverlay?'Coverage live':'Coverage off'}</span></button><button data-eng-v52-click="event.stopPropagation();toggleEvidenceLive()" class="glass-btn evidence-toggle ${state.evidenceLive?'active':''}">${icon('eye')}<span>${state.evidenceLive?'Evidence live':'Evidence off'}</span></button>`:''}<button data-eng-v52-click="event.stopPropagation();toggleHints()" class="glass-btn ${state.hints?'active':''}" ${practiceFind?'disabled':''}>${icon('hint')}<span>${state.hints?'Hints on':'Hints'}</span></button><button data-eng-v52-click="event.stopPropagation();cycleScanMode()" class="glass-btn ${state.scanMode!=='off'?'active':''}" ${practiceFind?'disabled':''}>${icon('layers')}<span>${scanModeLabel()}</span></button><button data-eng-v52-click="event.stopPropagation();togglePhotoFocus()" class="glass-btn">${icon(modal?'close':'expand')}<span>${modal?'Close':'Focus'}</span></button></div>
    <div class="scene-caption"><span>${practiceFind?'MEMORY MODE':parent?'DETAIL LAYER':state.mode==='speak'&&state.coverageOverlay?'LIVE SCENE COVERAGE':state.scanMode==='actions'?'ACTION LENS':state.scanMode==='composition'?'SCENE LAYERS':state.scanMode==='motion'?'MOTION CUES':'TOUCH TO DISCOVER'}</span><b>${practiceFind?practicePromptShort():state.mode==='speak'&&state.coverageOverlay?`${sceneCoverageAnalysis().hits.length}/${activeCoverageAnchors().length} communicated • ${sceneCoverageAnalysis().pct}% coverage`:parent?`Explore ${window.EngBookHotspots?.childrenOf?.(l.hotspots,parent)?.length||0} precise details`:state.scanMode!=='off'?'Tap Lens again to switch view':`${v56AttributeScan()?`${v56AttributeScan().primaryHotspots} areas • ${v56AttributeScan().totalHotspots} precise details`:discovered.size+' of '+activeHotspotCount()+' details found'}`}</b></div>
  </div>`;
};

/* Apply the pack-driven grammar discipline to the reference lesson too. */
const _v34SpeechAnalysisV35=speechAnalysis;
speechAnalysis=function(){const out=_v34SpeechAnalysisV35();if(!out?.dims)return out;const g=v25GrammarDiscipline(String(state.transcript||''));let i=out.dims.findIndex(d=>d[0]==='Grammar discipline');if(i<0)i=out.dims.findIndex(d=>d[0]==='Target grammar');if(i>=0)out.dims[i]=['Grammar discipline',g.score,g.note];out.overall=Math.round(out.dims.reduce((a,d)=>a+Number(d[1]||0),0)/out.dims.length);return out;};
progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=V35_BUILD;saveProgress();
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V35_BUILD,progressSchema:PROGRESS_SCHEMA_VERSION,hotspotEngine:window.EngBookHotspots?.version||null,readyLessons:BUILD_INFO.readyLessons};

/* ======================================================================
   v0.36 — RELEASE HARDENING & RUNTIME RELIABILITY
   Canonical evidence rows, import sanitization, safe dynamic saved-line
   delegation, one async-aware deep-link router, and release diagnostics.
   ====================================================================== */
const V36_BUILD=BUILD_INFO.tag;
async function v36AwaitModeTransition(result){try{if(result?.updateCallbackDone)await result.updateCallbackDone;else if(result?.finished)await result.finished;else if(result&&typeof result.then==='function')await result;}catch(e){v21PushError?.(e,'v36-mode-transition');}return result;}
async function v36ApplyDeepLink(search=location.search){
  const parsed=window.EngBookDeepLinks?.parse?.(search,{minLesson:1,maxLesson:20})||{lesson:null,mode:'explore'};
  const n=Number(parsed.lesson||0);if(!n||!window.EngBookContent?.canOpen?.(n))return false;
  const requested=parsed.mode||'explore';
  if(n===1){openLesson(1);await v36AwaitModeTransition(setMode(requested));return true;}
  return v28EnsureAndOpenLesson(n,requested);
}
/* Older listeners are retained only for migration compatibility. This final
   pass runs after lazy manifests/packs have settled and re-applies both lesson
   and requested mode for every released Category 01 lesson. */
/* Legacy generic deep-link load hook disabled in v0.38; v38ApplyDeepLink is authoritative. */
try{
  const clean=window.EngBookSecurity?.sanitizeProgress?.(progress);
  if(clean&&typeof clean==='object')Object.assign(progress,clean);
}catch(e){v21PushError?.(e,'v36-progress-sanitize');}
progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=V36_BUILD;saveProgress();
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V36_BUILD,progressSchema:PROGRESS_SCHEMA_VERSION,security:window.EngBookSecurity?.version||null,deepLinks:window.EngBookDeepLinks?.version||null,evidenceShape:'label-detail-v1',embeddedCoreLessons:[2,3],generatedCoreLessons:[2,3,4,5,6,7,8,9,10],lazyCoreLessons:[4,5,6,7,8,9,10],readyLessons:BUILD_INFO.readyLessons};


/* ======================================================================
   v0.37 — CATEGORY 01 LESSONS 11–15 + HOTSPOT ACCURACY EXPANSION
   Extends the source-traceable lazy lesson pipeline without a lesson-specific
   Core branch. The final deep-link router remains async-safe through Lesson 15.
   ====================================================================== */
const V37_BUILD=BUILD_INFO.tag;
async function v37ApplyDeepLink(search=location.search){
  const parsed=window.EngBookDeepLinks?.parse?.(search,{minLesson:1,maxLesson:20})||{lesson:null,mode:'explore'};
  const n=Number(parsed.lesson||0),requested=['explore','learn','practice','speak','talk'].includes(parsed.mode)?parsed.mode:'explore';
  if(!n||!window.EngBookContent?.canOpen?.(n))return false;
  if(n===1){openLesson(1);await v36AwaitModeTransition(setMode(requested));return true;}
  return v28EnsureAndOpenLesson(n,requested);
}
/* Legacy generic deep-link load hook disabled in v0.38; v38ApplyDeepLink is authoritative. */
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V37_BUILD,contentRevision:BUILD_INFO.contentRevision,generatedCoreLessons:[2,3,4,5,6,7,8,9,10,11,12,13,14,15],lazyCoreLessons:[4,5,6,7,8,9,10,11,12,13,14,15],readyLessons:BUILD_INFO.readyLessons,readyCategory01:window.EngBookContent?.readyLessonCountForCategory?.(1)||20};


/* ======================================================================
   v0.38 — CATEGORY 01 LESSONS 16–20 + HOTSPOT ACCURACY EXPANSION
   Extends the source-traceable lazy lesson pipeline through Lesson 20.
   The final deep-link router awaits the lazy pack before restoring the mode.
   ====================================================================== */
const V38_BUILD=BUILD_INFO.tag;
async function v38ApplyDeepLink(search=location.search){
  const parsed=window.EngBookDeepLinks?.parse?.(search,{minLesson:1,maxLesson:20})||{lesson:null,mode:'explore'};
  const n=Number(parsed.lesson||0),requested=['explore','learn','practice','speak','talk'].includes(parsed.mode)?parsed.mode:'explore';
  if(!n||!window.EngBookContent?.canOpen?.(n))return false;
  if(n===1){openLesson(1);await v36AwaitModeTransition(setMode(requested));return true;}
  return v28EnsureAndOpenLesson(n,requested);
}
/* v0.38 generic load hook superseded by v0.39. */
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V38_BUILD,contentRevision:BUILD_INFO.contentRevision,generatedCoreLessons:[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],lazyCoreLessons:[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],readyLessons:BUILD_INFO.readyLessons,readyCategory01:window.EngBookContent?.readyLessonCountForCategory?.(1)||20};


/* ======================================================================
   v0.39 — CATEGORY 01 LESSONS 21–25 + HOTSPOT ACCURACY EXPANSION
   Extends the source-traceable lazy lesson pipeline through Lesson 25.
   One authoritative async deep-link hook restores the requested mode only
   after the selected lesson pack has loaded and rendered.
   ====================================================================== */
const V39_BUILD=BUILD_INFO.tag;
async function v39ApplyDeepLink(search=location.search){
  const parsed=window.EngBookDeepLinks?.parse?.(search,{minLesson:1,maxLesson:25})||{lesson:null,mode:'explore'};
  const n=Number(parsed.lesson||0),requested=['explore','learn','practice','speak','talk'].includes(parsed.mode)?parsed.mode:'explore';
  if(!n||!window.EngBookContent?.canOpen?.(n))return false;
  if(n===1){openLesson(1);await v36AwaitModeTransition(setMode(requested));return true;}
  return v28EnsureAndOpenLesson(n,requested);
}
/* v0.39 generic load hook superseded by v0.40. */
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V39_BUILD,contentRevision:BUILD_INFO.contentRevision,generatedCoreLessons:[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],lazyCoreLessons:[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],readyLessons:BUILD_INFO.readyLessons,readyCategory01:window.EngBookContent?.readyLessonCountForCategory?.(1)||25};


/* ======================================================================
   v0.40 — CATEGORY 01 COMPLETE: LESSONS 26–28 + FINAL HOTSPOT EXPANSION
   Completes all 28 Category 01 scenes in the source-traceable lazy pipeline.
   One authoritative async deep-link hook restores the requested mode only
   after the selected lesson pack has loaded and rendered.
   ====================================================================== */
const V40_BUILD=BUILD_INFO.tag;
async function v40ApplyDeepLink(search=location.search){
  const parsed=window.EngBookDeepLinks?.parse?.(search,{minLesson:1,maxLesson:28})||{lesson:null,mode:'explore'};
  const n=Number(parsed.lesson||0),requested=['explore','learn','practice','speak','talk'].includes(parsed.mode)?parsed.mode:'explore';
  if(!n||!window.EngBookContent?.canOpen?.(n))return false;
  if(n===1){openLesson(1);await v36AwaitModeTransition(setMode(requested));return true;}
  return v28EnsureAndOpenLesson(n,requested);
}
/* v0.40 load hook superseded by the v0.41 authoritative final-consistency router. */
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V40_BUILD,contentRevision:BUILD_INFO.contentRevision,generatedCoreLessons:[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],lazyCoreLessons:[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],readyLessons:BUILD_INFO.readyLessons,readyCategory01:window.EngBookContent?.readyLessonCountForCategory?.(1)||28};


/* ======================================================================
   v0.41 — CATEGORY 01 FINAL CONSISTENCY & RELEASE QA
   Quality-lock release for all 28 CAT01 v187 lessons. This remains the
   single authoritative async deep-link hook; lazy packs load before mode
   restoration so direct navigation cannot race the lesson renderer.
   ====================================================================== */
const V41_BUILD=BUILD_INFO.tag;
async function v41ApplyDeepLink(search=location.search){
  const parsed=window.EngBookDeepLinks?.parse?.(search,{minLesson:1,maxLesson:28})||{lesson:null,mode:'explore'};
  const n=Number(parsed.lesson||0),requested=['explore','learn','practice','speak','talk'].includes(parsed.mode)?parsed.mode:'explore';
  if(!n||!window.EngBookContent?.canOpen?.(n))return false;
  if(n===1){openLesson(1);await v36AwaitModeTransition(setMode(requested));return true;}
  return v28EnsureAndOpenLesson(n,requested);
}
/* v0.41 load hook superseded by v0.42 Category 02 onboarding router. */
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V41_BUILD,contentRevision:BUILD_INFO.contentRevision,generatedCoreLessons:[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],lazyCoreLessons:[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],readyLessons:BUILD_INFO.readyLessons,readyCategory01:window.EngBookContent?.readyLessonCountForCategory?.(1)||28,qualityLock:'legacy-quality-lock-v0.41'};


/* ======================================================================
   v0.42 — CATEGORY 02 BATCH 01: LESSONS 29–33
   Opens the second core category with five CAT02 v191 image-verified
   lessons while preserving Category 01 as a completed quality lock.
   ====================================================================== */
const V42_BUILD=BUILD_INFO.tag;
async function v42ApplyDeepLink(search=location.search){
  const parsed=window.EngBookDeepLinks?.parse?.(search,{minLesson:1,maxLesson:33})||{lesson:null,mode:'explore'};
  const n=Number(parsed.lesson||0),requested=['explore','learn','practice','speak','talk'].includes(parsed.mode)?parsed.mode:'explore';
  if(!n||!window.EngBookContent?.canOpen?.(n))return false;
  if(n===1){openLesson(1);await v36AwaitModeTransition(setMode(requested));return true;}
  return v28EnsureAndOpenLesson(n,requested);
}
/* v0.42 load hook superseded by v0.43 Category 02 batch-02 router. */
progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=V42_BUILD;try{v33EnsureCourseProgress();}catch(_e){}saveProgress();
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V42_BUILD,contentRevision:BUILD_INFO.contentRevision,generatedCoreLessons:Array.from({length:32},(_,i)=>i+2),lazyCoreLessons:Array.from({length:30},(_,i)=>i+4),readyLessons:BUILD_INFO.readyLessons,readyCategories:BUILD_INFO.readyCategories,readyCategory01:window.EngBookContent?.readyLessonCountForCategory?.(1)||28,readyCategory02:window.EngBookContent?.readyLessonCountForCategory?.(2)||5,qualityLock:'legacy-quality-lock-v0.41',activeBatch:'category02-L29-33-v0.42'};


/* ======================================================================
   v0.43 — CATEGORY 02 BATCH 02: LESSONS 34–38
   Adds art-studio, gym, two lecture-hall, and interactive-seminar scenes
   from CAT02 v191 while preserving the Category 01 quality lock.
   ====================================================================== */
const V43_BUILD=BUILD_INFO.tag;
async function v43ApplyDeepLink(search=location.search){
  const parsed=window.EngBookDeepLinks?.parse?.(search,{minLesson:1,maxLesson:38})||{lesson:null,mode:'explore'};
  const n=Number(parsed.lesson||0),requested=['explore','learn','practice','speak','talk'].includes(parsed.mode)?parsed.mode:'explore';
  if(!n||!window.EngBookContent?.canOpen?.(n))return false;
  if(n===1){openLesson(1);await v36AwaitModeTransition(setMode(requested));return true;}
  return v28EnsureAndOpenLesson(n,requested);
}
/* v0.43 load hook superseded by v0.44 Category 02 batch-03 router. */
progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=V43_BUILD;try{v33EnsureCourseProgress();}catch(_e){}saveProgress();
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V43_BUILD,contentRevision:BUILD_INFO.contentRevision,generatedCoreLessons:Array.from({length:37},(_,i)=>i+2),lazyCoreLessons:Array.from({length:35},(_,i)=>i+4),readyLessons:BUILD_INFO.readyLessons,readyCategories:BUILD_INFO.readyCategories,readyCategory01:window.EngBookContent?.readyLessonCountForCategory?.(1)||28,readyCategory02:window.EngBookContent?.readyLessonCountForCategory?.(2)||10,qualityLock:'legacy-quality-lock-v0.41',activeBatch:'category02-L34-38-v0.43'};


/* ======================================================================
   v0.44 — CATEGORY 02 BATCH 03: LESSONS 39–43
   Adds two library study scenes, a grand historic-style library,
   collaborative group study, and one-to-one mentoring from CAT02 v191.
   ====================================================================== */
const V44_BUILD=BUILD_INFO.tag;
async function v44ApplyDeepLink(search=location.search){
  const parsed=window.EngBookDeepLinks?.parse?.(search,{minLesson:1,maxLesson:43})||{lesson:null,mode:'explore'};
  const n=Number(parsed.lesson||0),requested=['explore','learn','practice','speak','talk'].includes(parsed.mode)?parsed.mode:'explore';
  if(!n||!window.EngBookContent?.canOpen?.(n))return false;
  if(n===1){openLesson(1);await v36AwaitModeTransition(setMode(requested));return true;}
  return v28EnsureAndOpenLesson(n,requested);
}
/* v0.44 load hook superseded by v0.45 Category 02 batch-04 router. */
progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=V44_BUILD;try{v33EnsureCourseProgress();}catch(_e){}saveProgress();
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V44_BUILD,contentRevision:BUILD_INFO.contentRevision,generatedCoreLessons:Array.from({length:42},(_,i)=>i+2),lazyCoreLessons:Array.from({length:40},(_,i)=>i+4),readyLessons:BUILD_INFO.readyLessons,readyCategories:BUILD_INFO.readyCategories,readyCategory01:window.EngBookContent?.readyLessonCountForCategory?.(1)||28,readyCategory02:window.EngBookContent?.readyLessonCountForCategory?.(2)||15,qualityLock:'legacy-quality-lock-v0.41',activeBatch:'category02-L39-43-v0.44'};


/* ======================================================================
   v0.45 — CATEGORY 02 BATCH 04: LESSONS 44–48
   Adds Final Examination, Formal Letter, Academic Writing, Dormitory Study,
   and Campus Life from CAT02 v191 with image-verified hotspots/evidence.
   ====================================================================== */
const V45_BUILD=BUILD_INFO.tag;
async function v45ApplyDeepLink(search=location.search){
  const parsed=window.EngBookDeepLinks?.parse?.(search,{minLesson:1,maxLesson:48})||{lesson:null,mode:'explore'};
  const n=Number(parsed.lesson||0),requested=['explore','learn','practice','speak','talk'].includes(parsed.mode)?parsed.mode:'explore';
  if(!n||!window.EngBookContent?.canOpen?.(n))return false;
  if(n===1){openLesson(1);await v36AwaitModeTransition(setMode(requested));return true;}
  return v28EnsureAndOpenLesson(n,requested);
}
/* v0.45 load hook superseded by v0.46 Category 02 batch-05 router. */
progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=V45_BUILD;try{v33EnsureCourseProgress();}catch(_e){}saveProgress();
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V45_BUILD,contentRevision:BUILD_INFO.contentRevision,generatedCoreLessons:Array.from({length:47},(_,i)=>i+2),lazyCoreLessons:Array.from({length:45},(_,i)=>i+4),readyLessons:BUILD_INFO.readyLessons,readyCategories:BUILD_INFO.readyCategories,readyCategory01:window.EngBookContent?.readyLessonCountForCategory?.(1)||28,readyCategory02:window.EngBookContent?.readyLessonCountForCategory?.(2)||20,qualityLock:'legacy-quality-lock-v0.41',activeBatch:'category02-L44-48-v0.45'};


/* ======================================================================
   v0.46 — CATEGORY 02 BATCH 05: LESSONS 49–53
   Adds Campus Cafeteria, Student Club Fair, Graduation Ceremony,
   Online Class / Remote Learning, and Kindergarten / Early Learning
   from CAT02 v191 with image-verified hotspots and Evidence profiles.
   ====================================================================== */
const V46_BUILD=BUILD_INFO.tag;
async function v46ApplyDeepLink(search=location.search){
  const parsed=window.EngBookDeepLinks?.parse?.(search,{minLesson:1,maxLesson:53})||{lesson:null,mode:'explore'};
  const n=Number(parsed.lesson||0),requested=['explore','learn','practice','speak','talk'].includes(parsed.mode)?parsed.mode:'explore';
  if(!n||!window.EngBookContent?.canOpen?.(n))return false;
  if(n===1){openLesson(1);await v36AwaitModeTransition(setMode(requested));return true;}
  return v28EnsureAndOpenLesson(n,requested);
}
/* v0.46 load hook superseded by v0.47 Category 02 batch-06 router. */
progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=V46_BUILD;try{v33EnsureCourseProgress();}catch(_e){}saveProgress();
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V46_BUILD,contentRevision:BUILD_INFO.contentRevision,generatedCoreLessons:Array.from({length:52},(_,i)=>i+2),lazyCoreLessons:Array.from({length:50},(_,i)=>i+4),readyLessons:BUILD_INFO.readyLessons,readyCategories:BUILD_INFO.readyCategories,readyCategory01:window.EngBookContent?.readyLessonCountForCategory?.(1)||28,readyCategory02:window.EngBookContent?.readyLessonCountForCategory?.(2)||25,qualityLock:'legacy-quality-lock-v0.41',activeBatch:'category02-L49-53-v0.46'};


/* ======================================================================
   v0.47 — CATEGORY 02 BATCH 06: LESSONS 54–58
   Adds Presentation / Debate, School Administration, Teacher Feedback,
   Primary Classroom, and Parent–Teacher Meeting scenes from CAT02 v191
   with image-verified hotspots and Evidence profiles.
   ====================================================================== */
const V47_BUILD=BUILD_INFO.tag;
async function v47ApplyDeepLink(search=location.search){
  const parsed=window.EngBookDeepLinks?.parse?.(search,{minLesson:1,maxLesson:58})||{lesson:null,mode:'explore'};
  const n=Number(parsed.lesson||0),requested=['explore','learn','practice','speak','talk'].includes(parsed.mode)?parsed.mode:'explore';
  if(!n||!window.EngBookContent?.canOpen?.(n))return false;
  if(n===1){openLesson(1);await v36AwaitModeTransition(setMode(requested));return true;}
  return v28EnsureAndOpenLesson(n,requested);
}
/* v0.47 load hook superseded by v0.48 Category 02 completion router. */
progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=V47_BUILD;try{v33EnsureCourseProgress();}catch(_e){}saveProgress();
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V47_BUILD,contentRevision:BUILD_INFO.contentRevision,generatedCoreLessons:Array.from({length:57},(_,i)=>i+2),lazyCoreLessons:Array.from({length:55},(_,i)=>i+4),readyLessons:BUILD_INFO.readyLessons,readyCategories:BUILD_INFO.readyCategories,readyCategory01:window.EngBookContent?.readyLessonCountForCategory?.(1)||28,readyCategory02:window.EngBookContent?.readyLessonCountForCategory?.(2)||30,qualityLock:'legacy-quality-lock-v0.41',activeBatch:'category02-L54-58-v0.47'};


/* ======================================================================
   v0.48 — CATEGORY 02 COMPLETION: LESSONS 59–60
   Adds Library Checkout and Classroom Story Time from CAT02 v191.
   Category 02 reaches 32/32 runtime-ready lessons.
   ====================================================================== */
const V48_BUILD=BUILD_INFO.tag;
async function v48ApplyDeepLink(search=location.search){
  const parsed=window.EngBookDeepLinks?.parse?.(search,{minLesson:1,maxLesson:60})||{lesson:null,mode:'explore'};
  const n=Number(parsed.lesson||0),requested=['explore','learn','practice','speak','talk'].includes(parsed.mode)?parsed.mode:'explore';
  if(!n||!window.EngBookContent?.canOpen?.(n))return false;
  if(n===1){openLesson(1);await v36AwaitModeTransition(setMode(requested));return true;}
  return v28EnsureAndOpenLesson(n,requested);
}
/* v0.48 load hook superseded by v0.49 Category 02 quality-lock router. */
progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=V48_BUILD;try{v33EnsureCourseProgress();}catch(_e){}saveProgress();
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V48_BUILD,contentRevision:BUILD_INFO.contentRevision,generatedCoreLessons:Array.from({length:59},(_,i)=>i+2),lazyCoreLessons:Array.from({length:57},(_,i)=>i+4),readyLessons:BUILD_INFO.readyLessons,readyCategories:BUILD_INFO.readyCategories,readyCategory01:window.EngBookContent?.readyLessonCountForCategory?.(1)||28,readyCategory02:window.EngBookContent?.readyLessonCountForCategory?.(2)||32,qualityLock:'legacy-quality-lock-v0.41',activeBatch:'category02-L59-60-v0.48-complete'};


/* ======================================================================
   v0.49 — CATEGORY 02 FINAL CONSISTENCY & QUALITY LOCK
   All 32 CAT02 v191 lessons are reviewed as one product surface. The
   authoritative async deep-link hook waits for lazy pack load before mode
   restoration and preserves the Category 01 quality lock.
   ====================================================================== */
const V49_BUILD=BUILD_INFO.tag;
async function v49ApplyDeepLink(search=location.search){
  const latestReady=Math.max(60,...(window.EngBookContent?.snapshot?.().readyLessons||[]));
  const parsed=window.EngBookDeepLinks?.parse?.(search,{minLesson:1,maxLesson:latestReady})||{lesson:null,mode:'explore'};
  const n=Number(parsed.lesson||0),requested=['explore','learn','practice','speak','talk'].includes(parsed.mode)?parsed.mode:'explore';
  if(!n||!window.EngBookContent?.canOpen?.(n))return false;
  if(n===1){if(state.screen!=='lesson'||Number(state.lesson?.id)!==1)openLesson(1);if(state.mode!==requested)await v36AwaitModeTransition(setMode(requested));return true;}
  return v28EnsureAndOpenLesson(n,requested);
}
window.addEventListener('DOMContentLoaded',()=>{if(!window.EngBookStartup)v49ApplyDeepLink().catch(e=>v21PushError?.(e,'v49-deep-link'));});
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V49_BUILD,contentRevision:BUILD_INFO.contentRevision,generatedCoreLessons:Array.from({length:Math.max(0,(window.EngBookContent?.snapshot?.().readyLessons?.at(-1)||1)-1)},(_,i)=>i+2),lazyCoreLessons:Array.from({length:Math.max(0,(window.EngBookContent?.snapshot?.().readyLessons?.at(-1)||3)-3)},(_,i)=>i+4),readyLessons:BUILD_INFO.readyLessons,readyCategories:BUILD_INFO.readyCategories,readyCategory01:window.EngBookContent?.readyLessonCountForCategory?.(1)||28,readyCategory02:window.EngBookContent?.readyLessonCountForCategory?.(2)||32,readyCategory03:window.EngBookContent?.readyLessonCountForCategory?.(3)||0,qualityLock:'legacy-quality-lock-v0.49',activeBatch:'category03-L61-80-v193'};


/* ======================================================================
   v0.50 — ARCHITECTURE & PROFESSIONAL UI FOUNDATION
   UI shell is centralized in core/ui-shell-v50.js. Category 01/02 lesson
   content remains frozen; no source lesson data is changed in this release.
   ====================================================================== */
const V50_BUILD=BUILD_INFO.tag;
progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=V50_BUILD;try{v33EnsureCourseProgress();}catch(_e){}saveProgress();
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V50_BUILD,progressSchema:PROGRESS_SCHEMA_VERSION,uiFoundation:'v0.50',readyLessons:BUILD_INFO.readyLessons,readyCategories:BUILD_INFO.readyCategories,qualityLock:'legacy-quality-lock-v0.49'};

/* ======================================================================
   v0.50 — RUNTIME STATE BRIDGE
   The legacy runtime keeps state/progress in global lexical bindings. The
   authoritative UI shell consumes a narrow read-only bridge instead of
   depending on window.state/window.progress side effects.
   ====================================================================== */
window.EngBookRuntimeState=Object.freeze({
  get screen(){return state.screen},
  get lesson(){return state.lesson},
  get mode(){return state.mode},
  get transcript(){return state.transcript},
  get recordedUrl(){return state.recordedUrl},
  get progress(){return progress}
});


/* ======================================================================
   v0.51 — EVENT ARCHITECTURE HARDENING
   Legacy DOM0 handlers are quarantined by core/legacy-event-bridge-v51.js.
   The 60 quality-locked lessons remain content-frozen.
   ====================================================================== */
const V51_BUILD=BUILD_INFO.tag;
progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=V51_BUILD;try{v33EnsureCourseProgress();}catch(_e){}saveProgress();
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V51_BUILD,progressSchema:PROGRESS_SCHEMA_VERSION,uiFoundation:'v0.51',eventArchitecture:'legacy-dom0-quarantine+delegated-shell',readyLessons:BUILD_INFO.readyLessons,readyCategories:BUILD_INFO.readyCategories,qualityLock:'legacy-quality-lock-v0.49'};


/* ======================================================================
   v0.52 — SOURCE EVENT EXTRACTION & CSP PREPARATION
   Legacy renderer source now emits inert data-eng-v52-* contracts instead
   of DOM0 event attributes. core/event-router-v52.js executes a strict,
   allow-listed contract grammar without eval/new Function.
   ====================================================================== */
const V52_BUILD=BUILD_INFO.tag;
progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=V52_BUILD;try{v33EnsureCourseProgress();}catch(_e){}saveProgress();
window.EngBookEventContext=Object.freeze({
  getRoot(name){if(name==='state')return state;if(name==='progress')return progress;if(name==='TIME_MACHINE_NOW')return typeof TIME_MACHINE_NOW!=='undefined'?TIME_MACHINE_NOW:undefined;return undefined;}
});
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V52_BUILD,progressSchema:PROGRESS_SCHEMA_VERSION,uiFoundation:'v0.52',eventArchitecture:'source-data-contracts+allowlisted-delegation',cspScriptPolicy:"script-src 'self'",readyLessons:BUILD_INFO.readyLessons,readyCategories:BUILD_INFO.readyCategories,qualityLock:'legacy-quality-lock-v0.49'};


/* ===== v0.54 CATEGORY 03 CONTENT STAGING ===== */
const V54_BUILD=BUILD_INFO.tag;
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:V54_BUILD,progressSchema:PROGRESS_SCHEMA_VERSION,uiFoundation:'v0.52',eventArchitecture:'source-data-contracts+allowlisted-delegation',cspScriptPolicy:"script-src 'self'",readyLessons:BUILD_INFO.readyLessons,readyCategories:BUILD_INFO.readyCategories,qualityLock:'legacy-quality-lock-v0.49',cat03ContentStaged:[],cat03RuntimeReady:window.EngBookContent?.readyLessonCountForCategory?.(3)||0,imageIntakeGate:'exact-source-image-reviewed-through-80'};


/* ===== v0.55 LESSON 01 DEEP PERSON-ATTRIBUTE HOTSPOT PASS ===== */
progress.schemaVersion=PROGRESS_SCHEMA_VERSION;progress.build=BUILD_INFO.tag;saveProgress();
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:BUILD_INFO.tag,progressSchema:PROGRESS_SCHEMA_VERSION,lesson01AttributeScan:window.ENGBOOK_LESSON_01_ATTRIBUTE_SCAN,lesson02AttributeScan:state.lesson?.lessonId===2?state.lesson?.quality?.deepAttributeScan:null,hotspotDetailArchitecture:'grouped-scene-attribute-inspection-v58'};

/* ===== v0.59 FULLSCREEN SCROLLABLE SCENE VIEWER ===== */
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:BUILD_INFO.tag,viewerFoundation:'fullscreen-transform-pan-pinch-v59',viewerMaxZoom:3.5,viewerGoldenLessons:[1,2,3,4],contentFrozen:true};

/* ======================================================================
   v0.60 — LESSON 05 DEEP MICRO-HOTSPOT + GRAMMAR LADDER
   Interaction contract: micro dot → leader word → scene example card →
   second grammar box with evidence-safe tense variations. The 44px touch
   target is screen-space stable while the visible marker stays tiny.
   ====================================================================== */
function v60ResetMicroFlow(){state.v60AnchorLabel=null;state.v60CardOpen=false;state.v60GrammarOpen=false;v59EnsureViewer().sheet='collapsed';}
function v60CalloutIndex(){return Number.isInteger(state.v60AnchorLabel)?state.v60AnchorLabel:null;}
function v60ScreenHit(stage,clientX,clientY){
  const content=v59ContentFor(stage),rect=content?.getBoundingClientRect?.();if(!rect||!rect.width||!rect.height)return null;
  if(clientX<rect.left||clientX>rect.right||clientY<rect.top||clientY>rect.bottom)return null;
  const candidates=(globalThis.EngBookSceneCanvas?.active()?globalThis.EngBookSceneCanvas.visibleHotspots():v35VisibleHotspots()).map(({h,index})=>{const cx=rect.left+Number(h.x||0)/100*rect.width,cy=rect.top+Number(h.y||0)/100*rect.height;const w=Math.max(44,Math.min(58,Number(h.hitW||44))),hh=Math.max(44,Math.min(58,Number(h.hitH||44)));const dx=clientX-cx,dy=clientY-cy;if(Math.abs(dx)>w/2||Math.abs(dy)>hh/2)return null;return {index,h,score:Math.hypot(dx/(w/2),dy/(hh/2))+(h.level==='detail'?0:.04)};}).filter(Boolean).sort((a,b)=>a.score-b.score);
  return candidates[0]||null;
}
let v60PendingTapTimer=null;
// Overlapping transparent hit areas must resolve to the nearest visible point,
// rather than whichever button was rendered last. Keyboard selection stays exact.
function v60TapAnchor(event,index){
  const stage=event.target?.closest?.('.image-stage');
  const hit=event.detail===0?null:v60ScreenHit(stage,event.clientX,event.clientY);
  const selected=hit?.index??Number(index);
  if(state.mode==='practice'&&['find','listen','smart'].includes(state.practiceType))return answerFind(selected);
  return v60SelectAnchor(selected);
}
function v60CancelPointerTap(){if(v60PendingTapTimer){clearTimeout(v60PendingTapTimer);v60PendingTapTimer=null;}}
function v60QueuePointerTap(stage,clientX,clientY){v60CancelPointerTap();v60PendingTapTimer=setTimeout(()=>{v60PendingTapTimer=null;if(stage?.isConnected)v60PointerTap(stage,clientX,clientY);},260);}
function v60PointerTap(stage,clientX,clientY){
  const hit=v60ScreenHit(stage,clientX,clientY);
  if(hit){if(state.mode==='practice'&&['find','listen','smart'].includes(state.practiceType))return answerFind(hit.index);return v60SelectAnchor(hit.index);}
  if(globalThis.EngBookSceneCanvas?.active()){if(globalThis.EngBookSceneCanvas.hasCard())globalThis.EngBookSceneCanvas.clear();return;}
  if(state.v60AnchorLabel!==null&&!state.v60CardOpen){state.v60AnchorLabel=null;state.selected=null;render();}
}
function v60SelectAnchor(i){
  if(globalThis.EngBookSceneCanvas?.active())return globalThis.EngBookSceneCanvas.select(i);
  const h=state.lesson?.hotspots?.[Number(i)];if(!h)return;
  state.selected=Number(i);state.v60AnchorLabel=Number(i);state.v60CardOpen=false;state.v60GrammarOpen=false;state.tapFeedback=null;v59EnsureViewer().sheet='collapsed';haptic(9);render();
}
function v60OpenHotspotCard(i){
  const h=state.lesson?.hotspots?.[Number(i)];if(!h)return;
  if(state.mode==='practice'&&['find','listen','smart'].includes(state.practiceType))return answerFind(Number(i));
  const isNew=markDiscovered(h.en);state.selected=Number(i);state.v60AnchorLabel=Number(i);state.v60CardOpen=true;state.v60GrammarOpen=false;state.wordDepth='sentence';state.tapFeedback=null;v59EnsureViewer().sheet='peek';
  const children=window.EngBookHotspots?.childrenOf?.(state.lesson.hotspots,h.id)||[];
  if(children.length){const opening=state.hotspotDetailParent!==h.id;state.hotspotDetailParent=opening?h.id:null;const groups=opening?v55DetailGroups(h.id):[];state.hotspotDetailGroup=opening&&groups.length?groups[0]:null;}
  else if(h.level!=='detail'){state.hotspotDetailParent=null;state.hotspotDetailGroup=null;}
  haptic(isNew?[16,28,16]:12);speak(h.en,.8);state.discoverCelebration=false;if(discoveredSet().size>=activeHotspotCount())progress.completed[`l${activeLessonId()}_explore`]=true;saveProgress();render();
}
function v60OpenGrammarBox(){if(state.selected===null)return;state.v60GrammarOpen=true;v59EnsureViewer().sheet='expanded';haptic(10);render();}
function v60CloseGrammarBox(){state.v60GrammarOpen=false;render();}
function v60GrammarRows(h,ex){
  const reviewed=activeGold()?.picturePractice?.hotspotsById?.[h.id]?.grammar;
  if(reviewed?.length)return reviewed;
  const rows=Array.isArray(ex?.tenseLadder)&&ex.tenseLadder.length?ex.tenseLadder:[
    {label:'NOW · VISIBLE',tense:'Present',sentence:ex?.grammar||h.example,evidence:'visible'},
    {label:'PAST · RETELLING',tense:'Past simple',sentence:`Earlier, I described ${h.en} as part of this same scene.`,evidence:'retelling'},
    {label:'UP TO NOW · REVIEW',tense:'Present perfect',sentence:`I have noticed ${h.en} in this scene.`,evidence:'learning-context'},
    {label:'NEXT · LANGUAGE USE',tense:'Future',sentence:`I will mention ${h.en} when I describe this picture again.`,evidence:'learning-context'}
  ];
  return rows;
}
function v60GrammarBox(h,ex){if(!state.v60GrammarOpen)return '';const rows=v60GrammarRows(h,ex);return `<div class="v60-grammar-backdrop" data-eng-v52-click="if(event.target===this)v60CloseGrammarBox()"><section class="v60-grammar-box" role="dialog" aria-modal="true" aria-label="Grammar in this scene"><header><div><span>GRAMMAR IN THIS SCENE</span><h3>${esc(h.en)}</h3><p>${esc(ex?.grammarFocus||'Scene-grounded tense practice')}</p></div><button data-eng-v52-click="v60CloseGrammarBox()" aria-label="Close grammar box">${icon('close')}</button></header><div class="v60-tense-list">${rows.map((r,idx)=>`<article class="${r.evidence==='visible'?'visible':'practice'}"><div><span>${esc(r.label||r.tense)}</span><b>${esc(r.tense||'')}</b></div><p>${esc(r.sentence)}</p><button data-eng-v52-click="speak('${q(r.sentence)}',.8)">${icon('volume')} Hear</button>${idx===0?'<em>DIRECTLY SUPPORTED BY THE PHOTO</em>':'<em>GRAMMAR PRACTICE — NOT A NEW FACT ABOUT THE PHOTO</em>'}</article>`).join('')}</div><footer><b>Evidence rule</b><p>Only the NOW row describes what this single frame directly supports. Past and future rows are tense practice or cautious continuation, not claims that those events definitely happened.</p></footer></section></div>`;}
function v60MicroPanel(h){
  if(!h)return interactionPanel.__v59?interactionPanel.__v59(null):'';
  const ex=hotspotDetail(h),m=masteryScore(h.en),grammar=ex.grammar||h.example;
  return `<div class="interaction-card word-card active-card detail-sheet v60-word-card"><div class="sheet-handle"></div><div class="word-card-top"><div><span class="section-kicker">SCENE WORD</span><h2>${esc(h.en)}</h2><div class="pron-line">${esc(h.pron)}</div></div><div class="word-card-actions"><button class="round-btn soft" data-eng-v52-click="speak('${q(h.en)}')">${icon('volume')}</button><button class="round-btn soft ${isSaved(h.en)?'saved':''}" data-eng-v52-click="toggleSaved('${q(h.en)}')">${icon('star')}</button></div></div>
    <section class="v60-scene-example"><span>EXAMPLE FROM THIS PHOTO</span><p>${esc(h.example)}</p><button data-eng-v52-click="speak('${q(h.example)}',.82)">${icon('volume')} Hear sentence</button></section>
    <section class="v60-phrase-card"><span>USEFUL PHRASE</span><b>${esc(ex.phrase||h.en)}</b><div>${displayCollocations(ex).slice(0,4).map(c=>`<i>${esc(c)}</i>`).join('')}</div></section>
    <button class="v60-grammar-launch" data-eng-v52-click="v60OpenGrammarBox()"><span><small>GRAMMAR</small><b>${highlightGrammar(grammar)}</b><em>Open tense ladder for this exact scene</em></span>${icon('chevron')}</button>
    ${ex?.microPractice?`<details class="v107-micro-practice"><summary><span>MICRO PRACTICE</span><b>Notice → Say → Use</b>${icon('chevron')}</summary><div><article><i>1</i><p><b>NOTICE IT</b>${esc(ex.microPractice.notice||'')}</p></article><article><i>2</i><p><b>SAY IT</b>${esc(ex.microPractice.say||grammar)}</p><button data-eng-v52-click="speak('${q(ex.microPractice.say||grammar)}',.82)">${icon('volume')} Hear</button></article><article><i>3</i><p><b>USE IT</b>${esc(ex.microPractice.use||'')}</p></article></div></details>`:''}
    <div class="v60-card-evidence"><i>${icon('eye')}</i><div><b>Image-grounded</b><span>The example sentence is tied to the selected visual detail.</span></div></div>
    <div class="v60-mastery-mini"><span>Mastery</span><i><em style="width:${m}%"></em></i><b>${m}%</b></div>
    ${v97PronunciationDisclosure(h,ex)}
    ${v97CardFooter(h)}
  </div>`;
}

const _v59InteractionPanelV60=interactionPanel;interactionPanel.__v59=_v59InteractionPanelV60;
interactionPanel=function(h){if(!h)return _v59InteractionPanelV60(h);return v60MicroPanel(h);};

const _v59OpenLessonV60=openLesson;openLesson=function(id){v60ResetMicroFlow();return _v59OpenLessonV60(id);};
const _v59SetModeV60=setMode;setMode=function(mode){state.v60GrammarOpen=false;state.v60AnchorLabel=null;state.v60CardOpen=false;return _v59SetModeV60(mode);};
const _v55SetDetailGroupV60=v55SetDetailGroup;v55SetDetailGroup=function(group){state.v60AnchorLabel=null;state.v60CardOpen=false;state.v60GrammarOpen=false;return _v55SetDetailGroupV60(group);};
const _v35CloseDetailLayerV60=v35CloseDetailLayer;v35CloseDetailLayer=function(){v60ResetMicroFlow();return _v35CloseDetailLayerV60();};

handleStageTap=function(e){
  if(Date.now()<suppressStageClickUntil)return;if(e.target.closest('.v60-word-label,.v60-grammar-box,.photo-top-actions,.v35-detail-chip,.v55-detail-groups'))return;
  const hit=v60ScreenHit(e.currentTarget,e.clientX,e.clientY);if(hit){v60SelectAnchor(hit.index);return;}
  if(state.v60AnchorLabel!==null&&!state.v60CardOpen){state.v60AnchorLabel=null;state.selected=null;render();}
};
hotspotClick=function(i){return v60OpenHotspotCard(i);};

sceneStage=function(modal=false){
  const l=state.lesson,sel=state.selected!==null?l.hotspots[state.selected]:null,discovered=discoveredSet(),practiceFind=state.mode==='practice'&&['find','listen','smart'].includes(state.practiceType),spotX=sel?sel.x:50,spotY=sel?sel.y:50,adaptiveTarget=practiceFind&&state.practiceMistakes>=2?state.practiceTarget:null,lens=practiceFind?[]:state.scanMode==='actions'?ACTION_LENS:state.scanMode==='composition'?COMPOSITION_LENS:[],motion=practiceFind||state.scanMode!=='motion'?[]:MOTION_LENS,parent=v35DetailParent(),visible=v35VisibleHotspots(),parentHot=parent?l.hotspots.find(h=>h.id===parent):null,callout=v60CalloutIndex();
  return `<div class="image-stage v59-viewer-stage v60-scene ${modal?'modal-stage':''} lens-${state.scanMode}" style="--spot-x:${spotX}%;--spot-y:${spotY}%;" data-v59-viewer="${modal?'focus':'lesson'}" data-eng-v52-click="handleStageTap(event)">
    <div class="v59-scene-content v59-transform-stage" data-v59-content><img class="scene-image" src="${l.image}" alt="${esc(l.title)}" draggable="false">
    ${visible.map(({h,index})=>`<button tabindex="0" class="hotspot v60-micro-dot ${(h.level==='detail')?'detail-hotspot':''} ${state.hints&&!practiceFind?'hint':''} ${state.selected===index?'active':''} ${discovered.has(h.en)?'discovered':''} ${adaptiveTarget?.en===h.en?'adaptive-hint':''}" style="left:${h.x}%;top:${h.y}%;width:${Math.max(44,Number(h.hitW||44))}px;height:${Math.max(44,Number(h.hitH||44))}px" data-hotspot-id="${esc(h.id||'')}" data-eng-v52-click="event.stopPropagation();v60TapAnchor(event,${index})" aria-label="${esc(h.en)}"></button>`).join('')}
    ${callout!==null&&sel&&!practiceFind?`<div class="v60-anchor-callout ${sel.x>68?'to-left':'to-right'}" style="left:${sel.x}%;top:${sel.y}%"><i></i><button class="v60-word-label" aria-label="Open learning card for ${esc(sel.en)}" data-eng-v52-click="event.stopPropagation();v60OpenHotspotCard(${state.selected})"><b>${esc(sel.en)}</b><small>tap word</small></button></div>`:''}
    ${parent&&!practiceFind?`<div class="v35-detail-chip"><span>DETAIL VIEW</span><b>${esc(parentHot?.en||'Focused area')}</b><button data-eng-v52-click="event.stopPropagation();v35CloseDetailLayer()">Back</button></div>${v55DetailGroupMarkup(parent)}`:''}
    ${lens.map((a,i)=>`<div class="lens-chip ${state.scanMode}" style="left:${a.x}%;top:${a.y}%"><i>${i+1}</i><span><b>${esc(a.label)}</b><small>${esc(a.sub)}</small></span></div>`).join('')}${motion.map((a,i)=>`<div class="motion-cue ${a.type}" style="left:${a.x}%;top:${a.y}%"><i></i><span><b>${esc(a.label)}</b><small>${esc(a.sub)}</small></span></div>`).join('')}${coverageOverlayMarkup()}
    ${state.peek&&!practiceFind?visible.filter(({h})=>discovered.has(h.en)).map(({h})=>`<div class="peek-anchor" style="left:${h.x}%;top:${h.y}%"><i></i><b>${esc(h.en)}</b></div>`).join(''):''}
    ${state.mode==='talk'?roleSceneBadge():''}${state.tapFeedback?`<div class="tap-feedback ${state.tapFeedback.ok?'ok':'miss'}" style="left:${state.tapFeedback.x}%;top:${state.tapFeedback.y}%"></div>`:''}${state.discoverCelebration&&sel?`<div class="micro-burst" style="left:${sel.x}%;top:${sel.y}%"><i></i><i></i><i></i><i></i><i></i><i></i></div>`:''}
    </div><div class="photo-top-actions">${state.mode==='speak'?`<button data-eng-v52-click="event.stopPropagation();toggleCoverageOverlay()" class="glass-btn coverage-toggle ${state.coverageOverlay?'active':''}">${icon('spark')}<span>${state.coverageOverlay?'Coverage live':'Coverage off'}</span></button><button data-eng-v52-click="event.stopPropagation();toggleEvidenceLive()" class="glass-btn evidence-toggle ${state.evidenceLive?'active':''}">${icon('eye')}<span>${state.evidenceLive?'Evidence live':'Evidence off'}</span></button>`:''}<button data-eng-v52-click="event.stopPropagation();toggleHints()" class="glass-btn ${state.hints?'active':''}" ${practiceFind?'disabled':''}>${icon('hint')}<span>${state.hints?'Hints on':'Hints'}</span></button><button data-eng-v52-click="event.stopPropagation();cycleScanMode()" class="glass-btn ${state.scanMode!=='off'?'active':''}" ${practiceFind?'disabled':''}>${icon('layers')}<span>${scanModeLabel()}</span></button><button data-eng-v52-click="event.stopPropagation();togglePhotoFocus()" class="glass-btn">${icon(modal?'close':'expand')}<span>${modal?'Close':'Focus'}</span></button></div>
    <div class="scene-caption"><span>${practiceFind?'MEMORY MODE':parent?'DETAIL LAYER':'MICRO HOTSPOT MODE'}</span><b>${practiceFind?practicePromptShort():parent?`Explore ${window.EngBookHotspots?.childrenOf?.(l.hotspots,parent)?.length||0} precise details`:`${v56AttributeScan()?`${v56AttributeScan().primaryHotspots} areas • ${v56AttributeScan().totalHotspots} precise details`:discovered.size+' of '+activeHotspotCount()+' details found'}`}</b></div>
  </div>`;
};

gestureLegend=function(){return `<div class="gesture-legend v59-gesture-legend"><span><i>•</i> Tap tiny dot</span><span><i>→</i> Tap word</span><span><i>↓</i> 1×: scroll lesson</span><span><i>⌁</i> Zoom: drag scene</span><span><i>G</i> Open grammar ladder</span></div>`;};

window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:BUILD_INFO.tag,viewerFoundation:'fullscreen-transform-pan-pinch-v59+micro-hotspot-callout-v60',lesson05DeepScene:true,lesson05Hotspots:'runtime-derived',hotspotInteraction:'micro-dot→leader-word→scene-card→tense-ladder',contentDeepenedLessons:[1,2,3,4,5],contentFrozen:false,uiRefinement:'floating-micro-card-v63',lesson02Deepened:true};


/* ======================================================================
   v0.62 — LESSON 01 COMPLETE LEARNING JOURNEY
   Editorial source trace is private to the operator package.
   The existing Lesson 01 learning data represented by GOLD_LESSON_01 is now
   exposed as one sequential learner path:
   Overview → Deep analysis → Sentence building → Evidence reasoning →
   Story extension → Language bank → Grammar/model ladder → Speaking.
   ====================================================================== */
function l01JourneyData(){return activeGold();}
function l01JourneySteps(){return [
  ['overview','01','Scene'],['micro','02','Analyze'],['build','03','Build'],['meaning','04','Reason'],
  ['story','05','Story'],['language','06','Language'],['grammar','07','Grammar'],['speak','08','Speak']
];}
function l01JourneyNav(){return `<div class="l01-journey-nav">${l01JourneySteps().map(([k,n,t])=>`<button class="${state.l01JourneyStep===k?'active':''}" data-eng-v52-click="state.l01JourneyStep='${k}';render()"><i>${n}</i><span>${t}</span></button>`).join('')}</div>`;}
function l01JourneyNext(next,label='Continue'){return `<button class="l01-next" data-eng-v52-click="state.l01JourneyStep='${next}';render()">${esc(label)} ${icon('chevron')}</button>`;}
function l01OverviewStep(g){return `<section class="l01-step l01-overview-step"><div class="l01-source-badge"><i>${icon('compass')}</i><div><b>VISUAL LEARNING PATH</b><span>Category 01 • Lesson 01 • Two Adults Walking on a Beach in Warm Low Sunlight</span></div></div><div class="l01-overview-grid"><article class="l01-overview-photo"><img src="${state.lesson.image}" alt="${esc(state.lesson.title)}"><div><span>OBSERVE FIRST</span><b>subjects • visible action • setting • one supporting clue</b></div></article><article class="l01-overview-copy"><span>01 • SCENE OVERVIEW</span><h2>See the whole scene before naming the tiny details.</h2><p>${esc(g.overview)}</p><div class="l01-overview-actions"><button data-eng-v52-click="speak('${q(g.overview)}',.88)">${icon('volume')} Listen</button><button data-eng-v52-click="setMode('explore')">Open full-screen scene ${icon('expand')}</button></div><div class="l01-scene-formula"><span><b>WHO</b>two young adults</span><i>→</i><span><b>ACTION</b>walking + holding hands</span><i>→</i><span><b>WHERE</b>palm-lined beach</span><i>→</i><span><b>LIGHT</b>low-sun reflection</span></div></article></div>${l01JourneyNext('micro','Analyze the picture')}</section>`;}
function l01MicroStep(g){return `<section class="l01-step"><div class="l01-step-head"><span>02 • VISUAL EVIDENCE & MICRO-ANALYSIS</span><h2>Move from the whole image to evidence you can point to.</h2><p>These descriptions are tied directly to visible evidence in the Lesson 01 scene.</p></div><div class="l01-analysis-grid"><div class="l01-evidence-stack">${g.evidence.map((row,i)=>`<details ${i<3?'open':''}><summary><i>${String(i+1).padStart(2,'0')}</i><b>${esc(row.label)}</b>${icon('chevron')}</summary><p>${esc(row.detail)}</p></details>`).join('')}</div><aside class="l01-micro-aside"><span>SUBJECT MICRO-ANALYSIS</span>${g.micro.map((m,i)=>`<article><i>${i+1}</i><p>${esc(m)}</p></article>`).join('')}<button data-eng-v52-click="setMode('explore')">Inspect ${state.lesson?.hotspots?.length||0} micro-hotspots ${icon('target')}</button><small>Visible dots stay tiny; touch targets remain finger-friendly.</small></aside></div>${l01JourneyNext('build','Build sentences')}</section>`;}
function l01BuilderSets(){const arr=l01JourneyData()?.recall?.builderSentences;return Array.isArray(arr)&&arr.length?arr:BUILDER_SENTENCES;}
const _v61InitBuilderV62=initBuilder;initBuilder=function(){if(activeLessonId()!==1)return _v61InitBuilderV62();const sets=l01BuilderSets(),ids=sets[state.builderIndex%sets.length].map((_,i)=>i);state.builderAvailable=shuffle([...ids]);state.builderChosen=[];state.builderResult='';};
const _v61CheckBuilderV62=checkBuilder;checkBuilder=function(){if(state.builderResult==='correct')return;if(activeLessonId()!==1)return _v61CheckBuilderV62();const sets=l01BuilderSets(),parts=sets[state.builderIndex%sets.length],ok=state.builderChosen.length===parts.length&&state.builderChosen.every((id,i)=>id===i);state.builderResult=ok?'correct':'wrong';haptic(ok?[15,25,40]:25);if(ok){resolveMistakes('builder',String(state.builderIndex));awardPoints(10,'builder');speak(parts.join(' '));}else recordMistake('builder',String(state.builderIndex),'Rebuild the image-based sentence in natural English order.',parts.join(' '),'Start with visible evidence, then connect it with a natural linker.');render();};
const _v61NextBuilderV62=nextBuilder;nextBuilder=function(){if(activeLessonId()!==1)return _v61NextBuilderV62();const sets=l01BuilderSets();state.builderIndex=(state.builderIndex+1)%sets.length;initBuilder();render();};
const _v61BuilderContentV62=builderContent;builderContent=function(){if(activeLessonId()!==1)return _v61BuilderContentV62();const sets=l01BuilderSets(),parts=sets[state.builderIndex%sets.length];return `<div class="builder-card l01-inline-builder"><div class="builder-head"><div><span>MODEL SENTENCE ${state.builderIndex+1}/${sets.length}</span><h3>Build the sentence from meaning chunks</h3><p>Each sentence is tied to a visible detail or an explicitly cautious interpretation of this photograph.</p></div><button data-eng-v52-click="builderReset()">${icon('reset')} Reset</button></div><div class="answer-zone ${state.builderResult}">${state.builderChosen.length?state.builderChosen.map(id=>`<button data-eng-v52-click="builderUndo(${id})">${esc(parts[id])}</button>`).join(''):'<span>Tap the chunks below in the right order…</span>'}</div><div class="token-bank">${state.builderAvailable.map(id=>`<button data-eng-v52-click="builderPick(${id})">${esc(parts[id])}</button>`).join('')}</div><div class="builder-actions"><button class="secondary" data-eng-v52-click="builderUndo()" ${!state.builderChosen.length?'disabled':''}>Undo</button><button class="primary" data-eng-v52-click="checkBuilder()" ${state.builderChosen.length!==parts.length||state.builderResult==='correct'?'disabled':''}>Check sentence</button></div>${state.builderResult==='correct'?`<div class="builder-feedback good">${icon('check')} Correct. The sentence stays grounded in the photo. <button data-eng-v52-click="nextBuilder()">Next sentence →</button></div>`:state.builderResult==='wrong'?`<div class="builder-feedback try">Not quite. Rebuild the chunks in natural English order.</div>`:''}</div>`;};
function l01BuildStep(g){if(!state.builderAvailable.length&&!state.builderChosen.length)initBuilder();const models=(g.recall?.builderSentences||[]).map((parts,i)=>[`S${i+1}`,parts.join(' ')]);return `<section class="l01-step"><div class="l01-step-head"><span>03 • SENTENCE BUILDING</span><h2>Turn what you see into increasingly connected English.</h2><p>Start with a subject + action, then add place, visible detail, linking language, and finally cautious interpretation.</p></div><div class="l01-sentence-ladder">${models.map(([l,t],i)=>`<article><i>${l}</i><p>${esc(t)}</p><button data-eng-v52-click="speak('${q(t)}',.84)">${icon('volume')}</button></article>`).join('')}</div>${builderContent()}${l01JourneyNext('meaning','Check fact vs inference')}</section>`;}
function l01FactItems(){const items=l01JourneyData()?.recall?.factItems;return Array.isArray(items)&&items.length?items:PRACTICE_ITEMS;}
const _v61AnswerFactV62=answerFact;answerFact=function(kind){if(state.factAnswered||!['fact','inference','unsupported'].includes(kind))return;if(activeLessonId()!==1)return _v61AnswerFactV62(kind);const items=l01FactItems();state.factIndex=state.factIndex%items.length;const item=items[state.factIndex],ok=kind===item.kind;state.factAnswered={ok,kind};if(ok){state.factScore++;resolveMistakes('evidence',String(state.factIndex));awardPoints(6,'evidence');}else recordMistake('evidence',String(state.factIndex),item.text,item.kind,item.note);haptic(ok?[15,25,30]:22);render();};
const _v61NextFactV62=nextFact;nextFact=function(){if(!state.factAnswered)return;if(activeLessonId()!==1)return _v61NextFactV62();const items=l01FactItems();if(state.factIndex<items.length-1){state.factIndex++;state.factAnswered=null;render();}else{progress.completed.l1_practice=true;saveProgress();toast(`Evidence check complete: ${state.factScore}/${items.length}`);state.factIndex=0;state.factAnswered=null;state.factScore=0;render();}};
const _v61FactContentV62=factContent;factContent=function(){if(activeLessonId()!==1)return _v61FactContentV62();const items=l01FactItems();state.factIndex=state.factIndex%items.length;const item=items[state.factIndex];return `<div class="fact-game l01-three-way-fact"><div class="fact-counter"><span>EVIDENCE CHECK ${state.factIndex+1}/${items.length}</span><b>${state.factScore} correct</b></div><article><div class="quote-mark">“</div><h3>${esc(item.text)}</h3><p>Classify the sentence by what this single photograph can actually support.</p></article><div class="fact-actions three"><button data-eng-v52-click="answerFact('fact')" ${state.factAnswered?'disabled':''}>${icon('eye')} Visible fact</button><button data-eng-v52-click="answerFact('inference')" ${state.factAnswered?'disabled':''}>${icon('layers')} Supported inference</button><button data-eng-v52-click="answerFact('unsupported')" ${state.factAnswered?'disabled':''}>${icon('close')} Unsupported</button></div>${state.factAnswered?`<div class="fact-feedback ${state.factAnswered.ok?'good':'try'}"><b>${state.factAnswered.ok?'Correct':'Check the evidence again'}</b><p>${esc(item.note)}</p><button data-eng-v52-click="nextFact()">${state.factIndex===items.length-1?'Finish':'Next'} →</button></div>`:''}</div>`;};
function l01MeaningStep(g){return `<section class="l01-step"><div class="l01-step-head"><span>04 • INTERPRETATION & SCENARIO</span><h2>Say what is visible. Label what is inferred. Reject what the picture cannot prove.</h2></div><div class="confidence-ladder l01-confidence"><article class="confidence-card high"><div><b>HIGH</b><span>Strongly supported</span></div><p>${esc(g.inference.high)}</p></article><article class="confidence-card medium"><div><b>MEDIUM</b><span>Title + visual support</span></div><p>${esc(g.inference.medium)}</p></article><article class="confidence-card low"><div><b>LOW</b><span>Possible story</span></div><p>${esc(g.inference.low)}</p></article></div><div class="timeline-pro l01-timeline"><article><span>BEFORE · HYPOTHESIS</span><p>${esc(g.timeline.before)}</p></article><i>${icon('chevron')}</i><article><span>NOW · VISIBLE</span><p>${esc(g.timeline.now)}</p></article><i>${icon('chevron')}</i><article><span>NEXT · POSSIBILITY</span><p>${esc(g.timeline.next)}</p></article></div><div class="accuracy-card l01-guardrail"><div>${icon('target')}<b>Accuracy guardrail</b></div><p>${esc(g.guardrail)}</p></div>${factContent()}${l01JourneyNext('story','Explore the possible story')}</section>`;}
function l01StoryStep(g){return `<section class="l01-step"><div class="l01-step-head"><span>05 • STORY BUILDER</span><h2>Extend the scene without pretending imagination is evidence.</h2><p>This section is a creative extension, not a visual fact.</p></div><div class="l01-story-card"><div class="l01-story-warning">${icon('spark')}<span><b>CREATIVE EXTENSION — NOT A VISUAL FACT</b><small>May / might / could keep the story honest.</small></span></div><p>${esc(g.story)}</p><button data-eng-v52-click="speak('${q(g.story)}',.86)">${icon('volume')} Listen to possible narrative</button></div><div class="l01-story-contrast"><article><span>PHOTO CAN SUPPORT</span><p>${esc(g.timeline.now)}</p></article><article><span>STORY CAN IMAGINE</span><p>${esc(g.timeline.before)} ${esc(g.timeline.next)}</p></article></div>${l01JourneyNext('language','Collect useful language')}</section>`;}
function l01LanguageStep(g){return `<section class="l01-step"><div class="l01-step-head"><span>06 • SPEAKING LANGUAGE BANK</span><h2>Collect reusable phrases before you speak freely.</h2></div><div class="l01-language-bank">${g.languageBank.map((p,i)=>`<button data-eng-v52-click="speak('${q(p)}',.82)"><i>${String(i+1).padStart(2,'0')}</i><b>${esc(p)}</b>${icon('volume')}</button>`).join('')}</div><div class="l01-memory-grid"><article><span>MEMORY FRAMES</span>${(g.memoryFrames||[]).map(x=>`<p>${esc(x)}</p>`).join('')}</article><article><span>PERSONAL TRANSFER</span>${(g.personalQuestions||[]).map((x,i)=>`<p><i>${i+1}</i>${esc(x)}</p>`).join('')}</article></div>${l01JourneyNext('grammar','Open grammar + model ladder')}</section>`;}
function l01GrammarStep(g){const level=state.level&&g.grammar.models[state.level]?state.level:'B1–B2';return `<section class="l01-step"><div class="l01-step-head"><span>07 • GRAMMAR & MODEL LADDER</span><h2>${esc(g.grammar.title)}</h2><p>${esc(g.grammar.explainer)}</p></div><div class="l01-grammar-examples">${g.grammar.examples.map((e,i)=>`<article><i>${i+1}</i><p>${highlightGrammar(e)}</p><button data-eng-v52-click="speak('${q(e)}',.82)">${icon('volume')}</button></article>`).join('')}</div><div class="model-ladder l01-model-ladder"><div class="level-switch">${Object.keys(g.grammar.models).map(l=>`<button class="${level===l?'active':''}" data-eng-v52-click="state.level='${q(l)}';render()">${esc(l)}</button>`).join('')}</div><article><div><span>IMAGE-VERIFIED MODEL</span><button data-eng-v52-click="speak('${q(g.grammar.models[level])}',.88)">${icon('volume')} Listen</button></div><p>${esc(g.grammar.models[level])}</p><small>Use the model after your own attempt. The goal is to notice how a simple description becomes more precise and better connected.</small></article></div><div class="l01-model-progression">${Object.entries(g.grammar.models).map(([l,t])=>`<article><span>${esc(l)}</span><p>${esc(t)}</p></article>`).join('')}</div>${l01JourneyNext('speak','Describe it yourself')}</section>`;}
function l01SpeakStep(g){return `<section class="l01-step"><div class="l01-step-head"><span>08 • INDEPENDENT SPEAKING CHALLENGE</span><h2>Now rebuild the picture in your own English.</h2><p>Move from short visible facts to a complete, evidence-aware description.</p></div><div class="l01-speaking-stages">${[['30','30 SEC','Simple scene'],['60','60 SEC','Connected description'],['90','90 SEC','Full scene reconstruction']].map(([sec,label,title])=>`<article><i>${label}</i><h3>${title}</h3><p>${esc(g.speaking[sec])}</p><button data-eng-v52-click="launchTimedVoiceChallenge(${sec})">Record ${sec}s ${icon('mic')}</button></article>`).join('')}</div><div class="l01-selfcheck"><span>SELF-CHECK</span><div><i>${icon('check')} 5+ visible facts</i><i>${icon('check')} clear spatial order</i><i>${icon('check')} target grammar used</i><i>${icon('check')} 1 labeled inference</i><i>${icon('check')} no unsupported exact detail</i><i>${icon('check')} your own wording</i></div></div><div class="l01-finish-row"><button data-eng-v52-click="setMode('talk')">Continue to scene conversation ${icon('spark')}</button><button class="secondary" data-eng-v52-click="state.l01JourneyStep='overview';render()">Review lesson path</button></div></section>`;}
function l01JourneyBody(g){if(state.l01JourneyStep==='overview')return l01OverviewStep(g);if(state.l01JourneyStep==='micro')return l01MicroStep(g);if(state.l01JourneyStep==='build')return l01BuildStep(g);if(state.l01JourneyStep==='meaning')return l01MeaningStep(g);if(state.l01JourneyStep==='story')return l01StoryStep(g);if(state.l01JourneyStep==='language')return l01LanguageStep(g);if(state.l01JourneyStep==='grammar')return l01GrammarStep(g);return l01SpeakStep(g);}
function l01CompleteLearnContent(){const g=l01JourneyData();return `<section class="l01-complete-path"><div class="panel-heading l01-path-heading"><div><span class="section-kicker">LESSON 01 • COMPLETE LEARNING JOURNEY</span><h2>See → analyze → build → reason → tell → speak</h2><p>One learning path connects the image, micro-hotspots, sentence building, evidence control, grammar, and independent speaking.</p></div><div class="l01-path-count"><b>${state.lesson?.hotspots?.length||0}</b><span>image anchors</span></div></div>${l01JourneyNav()}${l01JourneyBody(g)}</section>`;}
const _v61LearnContentV62=learnContent;learnContent=function(){if(activeLessonId()===1)return l01CompleteLearnContent();return _v61LearnContentV62();};
const _v61OpenLessonV62=openLesson;openLesson=function(id){if(Number(id)===1)state.l01JourneyStep='overview';return _v61OpenLessonV62(id);};
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:BUILD_INFO.tag,lesson01CompleteLearningJourney:true,lesson01Journey:['overview','micro-analysis','sentence-building','evidence-reasoning','story-builder','language-bank','grammar-model-ladder','independent-speaking'],lesson01Hotspots:'dynamic-truth-audited'};

/* ======================================================================
   v0.66 — LESSON 02 COMPLETE LEARNING JOURNEY
   Source-derived content remains distinct from app-authored practice
   extensions where optional Lesson 02 practice fields are empty.
   ====================================================================== */
function l02JourneyData(){return activeGold();}
function l02JourneySteps(){return [
  ['overview','01','Scene'],['micro','02','Analyze'],['build','03','Build'],['meaning','04','Reason'],
  ['story','05','Story'],['language','06','Language'],['grammar','07','Grammar'],['speak','08','Speak']
];}
function l02JourneyNav(){return `<div class="l01-journey-nav">${l02JourneySteps().map(([k,n,t])=>`<button class="${state.l02JourneyStep===k?'active':''}" data-eng-v52-click="state.l02JourneyStep='${k}';render()"><i>${n}</i><span>${t}</span></button>`).join('')}</div>`;}
function l02JourneyNext(next,label='Continue'){return `<button class="l01-next" data-eng-v52-click="state.l02JourneyStep='${next}';render()">${esc(label)} ${icon('chevron')}</button>`;}
function l02OverviewStep(g){return `<section class="l01-step l01-overview-step"><div class="l01-source-badge"><i>${icon('compass')}</i><div><b>VISUAL LEARNING PATH</b><span>Category 01 • Lesson 02 • Two Women Laughing at a Café Table</span></div></div><div class="l01-overview-grid"><article class="l01-overview-photo"><img src="${state.lesson.image}" alt="${esc(state.lesson.title)}"><div><span>OBSERVE FIRST</span><b>subjects • visible action • setting • one supporting clue</b></div></article><article class="l01-overview-copy"><span>01 • SCENE OVERVIEW</span><h2>See the whole café scene before naming the small details.</h2><p>${esc(g.overview)}</p><div class="l01-overview-actions"><button data-eng-v52-click="speak('${q(g.overview)}',.88)">${icon('volume')} Listen</button><button data-eng-v52-click="setMode('explore')">Open full-screen scene ${icon('expand')}</button></div><div class="l01-scene-formula"><span><b>WHO</b>two young women</span><i>→</i><span><b>ACTION</b>laughing + gesturing</span><i>→</i><span><b>WHERE</b>café table by a window</span><i>→</i><span><b>CLUES</b>coffee + pastries</span></div></article></div>${l02JourneyNext('micro','Analyze the picture')}</section>`;}
function l02MicroStep(g){const scan=window.ENGBOOK_LESSON_02_ATTRIBUTE_SCAN||{};return `<section class="l01-step"><div class="l01-step-head"><span>02 • VISUAL EVIDENCE & MICRO-ANALYSIS</span><h2>Move from the whole café to details you can point to.</h2><p>The evidence table is tied to the actual Lesson 02 photograph and reviewed for scene accuracy.</p></div><div class="l01-analysis-grid"><div class="l01-evidence-stack">${(g.evidence||[]).map((row,i)=>`<details ${i<3?'open':''}><summary><i>${String(i+1).padStart(2,'0')}</i><b>${esc(row.label)}</b>${icon('chevron')}</summary><p>${esc(row.detail)}</p></details>`).join('')}</div><aside class="l01-micro-aside"><span>SUBJECT MICRO-ANALYSIS</span>${(g.micro||[]).map((m,i)=>`<article><i>${i+1}</i><p>${esc(m)}</p></article>`).join('')}<button data-eng-v52-click="setMode('explore')">Inspect ${state.lesson?.hotspots?.length||scan.totalHotspots||0} micro-hotspots ${icon('target')}</button><small>Tiny visible dots + finger-friendly screen-space targets. Parent/detail layers prevent the café scene from becoming visually crowded.</small></aside></div>${l02JourneyNext('build','Build sentences')}</section>`;}
function l02BuildStep(g){if(!state.builderAvailable.length&&!state.builderChosen.length)initBuilder();const models=(g.recall?.builderSentences||[]).map((parts,i)=>[`S${i+1}`,parts.join(' ')]);return `<section class="l01-step"><div class="l01-step-head"><span>03 • SENTENCE BUILDING</span><h2>Turn café evidence into connected English.</h2><p>Begin with a visible subject and action, then add location, objects, linking language, and finally a cautious interpretation.</p></div><div class="l01-sentence-ladder">${models.map(([l,t])=>`<article><i>${l}</i><p>${esc(t)}</p><button data-eng-v52-click="speak('${q(t)}',.84)">${icon('volume')}</button></article>`).join('')}</div>${builderContent()}${l02JourneyNext('meaning','Check fact vs inference')}</section>`;}
function l02MeaningStep(g){return `<section class="l01-step"><div class="l01-step-head"><span>04 • INTERPRETATION & SCENARIO</span><h2>Keep the title, visible evidence, and imagined history separate.</h2></div><div class="confidence-ladder l01-confidence"><article class="confidence-card high"><div><b>HIGH</b><span>Strongly supported</span></div><p>${esc(g.inference.high)}</p></article><article class="confidence-card medium"><div><b>MEDIUM</b><span>Title + visual support</span></div><p>${esc(g.inference.medium)}</p></article><article class="confidence-card low"><div><b>LOW</b><span>Possible story</span></div><p>${esc(g.inference.low)}</p></article></div><div class="timeline-pro l01-timeline"><article><span>BEFORE · HYPOTHESIS</span><p>${esc(g.timeline.before)}</p></article><i>${icon('chevron')}</i><article><span>NOW · VISIBLE</span><p>${esc(g.timeline.now)}</p></article><i>${icon('chevron')}</i><article><span>NEXT · POSSIBILITY</span><p>${esc(g.timeline.next)}</p></article></div><div class="accuracy-card l01-guardrail"><div>${icon('target')}<b>Accuracy guardrail</b></div><p>${esc(g.guardrail)}</p></div>${factContent()}${l02JourneyNext('story','Explore the possible story')}</section>`;}
function l02StoryStep(g){return `<section class="l01-step"><div class="l01-step-head"><span>05 • STORY BUILDER</span><h2>Extend the café moment without turning imagination into evidence.</h2><p>This narrative is a creative extension rather than a visual fact.</p></div><div class="l01-story-card"><div class="l01-story-warning">${icon('spark')}<span><b>CREATIVE EXTENSION — NOT A VISUAL FACT</b><small>May / might / could keep the story honest.</small></span></div><p>${esc(g.story)}</p><button data-eng-v52-click="speak('${q(g.story)}',.86)">${icon('volume')} Listen to possible narrative</button></div><div class="l01-story-contrast"><article><span>PHOTO CAN SUPPORT</span><p>${esc(g.timeline.now)}</p></article><article><span>STORY CAN IMAGINE</span><p>${esc(g.timeline.before)} ${esc(g.timeline.next)}</p></article></div>${l02JourneyNext('language','Collect useful language')}</section>`;}
function l02LanguageStep(g){const ext=g.appPracticeExtension||{};return `<section class="l01-step"><div class="l01-step-head"><span>06 • SPEAKING LANGUAGE BANK</span><h2>Collect useful phrases, then use them in your own café description.</h2></div><div class="l01-language-bank">${(g.languageBank||[]).map((p,i)=>`<button data-eng-v52-click="speak('${q(p)}',.82)"><i>${String(i+1).padStart(2,'0')}</i><b>${esc(p)}</b>${icon('volume')}</button>`).join('')}</div><div class="l01-memory-grid"><article><span>MEMORY FRAMES</span>${(ext.memoryFrames||[]).map(x=>`<p>${esc(x)}</p>`).join('')}<small>Use these frames to organize your own description.</small></article><article><span>PERSONAL TRANSFER</span>${(ext.personalQuestions||[]).map((x,i)=>`<p><i>${i+1}</i>${esc(x)}</p>`).join('')}<small>Use these after the image description, not as claims about the people in the photograph.</small></article></div>${l02JourneyNext('grammar','Open grammar + model ladder')}</section>`;}
function l02GrammarStep(g){const level=state.level&&g.grammar.models[state.level]?state.level:'B1–B2',ext=g.appPracticeExtension||{},rt=g.grammar.runtime||{};return `<section class="l01-step"><div class="l01-step-head"><span>07 • GRAMMAR & MODEL LADDER</span><h2>${esc(g.grammar.title)}</h2><p>${esc(g.grammar.explainer)}</p></div><div class="l01-grammar-examples">${(g.grammar.examples||[]).map((e,i)=>`<article><i>${i+1}</i><p>${highlightGrammar(e)}</p><button data-eng-v52-click="speak('${q(e)}',.82)">${icon('volume')}</button></article>`).join('')}</div><div class="l01-story-contrast">${(ext.grammarContrast||[]).map(x=>`<article><span>${esc(x.label)}</span><p>${esc(x.text)}</p></article>`).join('')}</div>${rt.unsafeNote?`<div class="accuracy-card l01-guardrail"><div>${icon('target')}<b>Present-perfect guardrail</b></div><p>${esc(rt.unsafeNote)}</p></div>`:''}<div class="model-ladder l01-model-ladder"><div class="level-switch">${Object.keys(g.grammar.models).map(l=>`<button class="${level===l?'active':''}" data-eng-v52-click="state.level='${q(l)}';render()">${esc(l)}</button>`).join('')}</div><article><div><span>IMAGE-VERIFIED MODEL</span><button data-eng-v52-click="speak('${q(g.grammar.models[level])}',.88)">${icon('volume')} Listen</button></div><p>${esc(g.grammar.models[level])}</p><small>Attempt your own description first. Then compare how the same café scene grows from concrete facts to connected, evidence-aware discourse.</small></article></div><div class="l01-model-progression">${Object.entries(g.grammar.models).map(([l,t])=>`<article><span>${esc(l)}</span><p>${esc(t)}</p></article>`).join('')}</div>${l02JourneyNext('speak','Describe it yourself')}</section>`;}
function l02SpeakStep(g){return `<section class="l01-step"><div class="l01-step-head"><span>08 • INDEPENDENT SPEAKING CHALLENGE</span><h2>Rebuild the café scene in your own English.</h2><p>Move from visible facts to a complete description while keeping friendship duration and exact location outside the photo evidence.</p></div><div class="l01-speaking-stages">${[['30','30 SEC','Simple scene'],['60','60 SEC','Connected description'],['90','90 SEC','Full scene reconstruction']].map(([sec,label,title])=>`<article><i>${label}</i><h3>${title}</h3><p>${esc(g.speaking[sec])}</p><button data-eng-v52-click="launchTimedVoiceChallenge(${sec})">Record ${sec}s ${icon('mic')}</button></article>`).join('')}</div><div class="l01-selfcheck"><span>SELF-CHECK</span><div><i>${icon('check')} 5+ visible facts</i><i>${icon('check')} table + background details</i><i>${icon('check')} target grammar used safely</i><i>${icon('check')} 1 labeled inference</i><i>${icon('check')} no invented duration/city</i><i>${icon('check')} your own wording</i></div></div><div class="l01-finish-row"><button data-eng-v52-click="setMode('talk')">Continue to scene conversation ${icon('spark')}</button><button class="secondary" data-eng-v52-click="state.l02JourneyStep='overview';render()">Review lesson path</button></div></section>`;}
function l02JourneyBody(g){if(state.l02JourneyStep==='overview')return l02OverviewStep(g);if(state.l02JourneyStep==='micro')return l02MicroStep(g);if(state.l02JourneyStep==='build')return l02BuildStep(g);if(state.l02JourneyStep==='meaning')return l02MeaningStep(g);if(state.l02JourneyStep==='story')return l02StoryStep(g);if(state.l02JourneyStep==='language')return l02LanguageStep(g);if(state.l02JourneyStep==='grammar')return l02GrammarStep(g);return l02SpeakStep(g);}
function l02CompleteLearnContent(){const valid=l02JourneySteps().map(x=>x[0]);if(!valid.includes(state.l02JourneyStep))state.l02JourneyStep='overview';const g=l02JourneyData(),scan=window.ENGBOOK_LESSON_02_ATTRIBUTE_SCAN||{};return `<section class="l01-complete-path"><div class="panel-heading l01-path-heading"><div><span class="section-kicker">LESSON 02 • COMPLETE LEARNING JOURNEY</span><h2>See → analyze → build → reason → tell → speak</h2><p>Café-scene evidence, ${state.lesson?.hotspots?.length||scan.totalHotspots||0} precise anchors, sentence building, cautious grammar, model descriptions, and independent speaking now live in one path.</p></div><div class="l01-path-count"><b>${state.lesson?.hotspots?.length||scan.totalHotspots||0}</b><span>image anchors</span></div></div>${l02JourneyNav()}${l02JourneyBody(g)}</section>`;}
const _v65LearnContentV66=learnContent;learnContent=function(){if(activeLessonId()===2)return l02CompleteLearnContent();return _v65LearnContentV66();};
const _v65OpenLessonV66=openLesson;openLesson=function(id){if(Number(id)===2)state.l02JourneyStep='overview';return _v65OpenLessonV66(id);};
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:BUILD_INFO.tag,lesson02CompleteLearningJourney:true,lesson02Journey:['overview','micro-analysis','sentence-building','evidence-reasoning','story-builder','language-bank','grammar-model-ladder','independent-speaking'],lesson02Hotspots:'dynamic-truth-audited'};

/* ======================================================================
   v0.68 — LESSON 01 HOTSPOT CATEGORY FILTER
   Default overview stays sparse. Learners explicitly choose a semantic
   layer before detail hotspots are exposed across the fullscreen scene.
   ====================================================================== */
const V67_L01_HOTSPOT_CATEGORIES=Object.freeze(window.EngBookContent?.getPack?.(1)?.presentation?.hotspotTaxonomy?.categories||[
  {key:'overview',label:'Overview'},
  {key:'people',label:'People'},
  {key:'clothing',label:'Clothing'},
  {key:'actions',label:'Actions'},
  {key:'environment',label:'Environment'},
  {key:'light',label:'Light'}
]);
function v67L01Categories(){return state.lesson?.presentation?.hotspotTaxonomy?.categories||window.EngBookContent?.getPack?.(1)?.presentation?.hotspotTaxonomy?.categories||V67_L01_HOTSPOT_CATEGORIES;}
function v67L01Category(){return v67L01Categories().some(x=>x.key===state.l01HotspotCategory)?state.l01HotspotCategory:'overview';}
function v67L01CategoryMatch(h,key){
  if(h?.categoryKey)return key==='overview'?h?.level!=='detail':h.categoryKey===key;
  const type=String(h?.type||'').toLowerCase(),group=String(h?.detailGroup||'').toLowerCase(),attr=String(h?.attributeGroup||'').toLowerCase(),en=String(h?.en||'').toLowerCase();
  if(key==='overview')return h?.level!=='detail';
  if(key==='people')return type==='person'||type==='appearance'||type==='body'||['hair','hair-style','hair-shape','facial-frame','expression','gaze','head-angle','body-line'].includes(attr);
  if(key==='clothing')return type==='clothing'||type==='accessory'||['shirt','dress'].includes(group)||['top-clothing','lower-clothing','garment','garment-detail','neckline','sleeves','straps','fabric-structure','fabric-texture','waist','skirt','length','hem','collar','fastening','fit'].includes(attr);
  if(key==='actions')return type==='action'||group==='grip'||(group==='posture'&&['interaction','gait','action-pattern','arm-position','posture','proximity','body-language'].includes(attr))||['interaction','gait','action-pattern','arm-position','posture','proximity'].includes(attr)||/walking|holding|hand in hand|linked arm|fingers on|head on shoulder|leaning|arm swing|leading .*foot/.test(en);
  if(key==='environment')return type==='setting'||type==='nature'||['ground','vegetation','water'].includes(group);
  if(key==='light')return type==='light'||['sky-light','reflection'].includes(group)||['lighting','light-quality','color-light','light-contrast','reflection-shape'].includes(attr)||/sun|reflection|golden light|glow|highlight|sparkle/.test(en);
  return false;
}
function v67L01CategoryEntries(key=v67L01Category()){
  const hs=state.lesson?.hotspots||[];
  return hs.map((h,index)=>({h,index})).filter(({h})=>v67L01CategoryMatch(h,key));
}
function l01SetHotspotCategory(key){
  if(!v67L01Categories().some(x=>x.key===key))key='overview';
  state.l01HotspotCategory=key;state.selected=null;state.hotspotDetailParent=null;state.hotspotDetailGroup=null;state.v60AnchorLabel=null;state.v60CardOpen=false;state.v60GrammarOpen=false;state.tapFeedback=null;v59EnsureViewer().sheet='collapsed';haptic(8);render();
}
function v67L01CategoryBar(){
  if(activeLessonId()!==1||state.mode!=='explore')return '';
  const active=v67L01Category();
  return `<nav class="v67-hotspot-categories" aria-label="Hotspot categories"><div class="v67-hotspot-category-scroll">${V67_L01_HOTSPOT_CATEGORIES.map(c=>{const n=v67L01CategoryEntries(c.key).length;return `<button class="${active===c.key?'active':''}" data-eng-v52-click="event.stopPropagation();l01SetHotspotCategory('${c.key}')"><b>${esc(c.label)}</b><span>${n}</span></button>`;}).join('')}</div><small>${active==='overview'?'Choose a layer to reveal related details.':`Showing ${v67L01CategoryEntries(active).length} ${active} anchors only.`}</small></nav>`;
}
const _v66DetailParentV67=v35DetailParent;
v35DetailParent=function(){if(activeLessonId()===1&&state.mode==='explore')return null;return _v66DetailParentV67();};
const _v66VisibleHotspotsV67=v35VisibleHotspots;
v35VisibleHotspots=function(){if(activeLessonId()===1&&state.mode==='explore')return v67L01CategoryEntries();return _v66VisibleHotspotsV67();};
const _v66SceneStageV67=sceneStage;
sceneStage=function(modal=false){let html=_v66SceneStageV67(modal);if(activeLessonId()===1&&state.mode==='explore'){html=html.replace('<div class="photo-top-actions">',`${v67L01CategoryBar()}<div class="photo-top-actions">`);html=html.replace('<span>MICRO HOTSPOT MODE</span>',`<span>${esc(v67L01Category().toUpperCase())} HOTSPOTS</span>`);}return html;};
const _v66OpenLessonV67=openLesson;
openLesson=function(id){if(Number(id)===1)state.l01HotspotCategory='overview';return _v66OpenLessonV67(id);};
window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:BUILD_INFO.tag,lesson01HotspotCategories:V67_L01_HOTSPOT_CATEGORIES.map(x=>x.key),lesson01DefaultHotspotCategory:'overview',lesson01CategoryFilteredHotspots:true};


/* EngApp v0.96 — product experience capability declaration (no runtime patch layer). */
(function(){
  const prevRenderHome=renderHome;
  renderHome=function(){state.photoFocus=false;document.documentElement.classList.remove('v96-focus-open');document.body?.classList.remove('v96-focus-open');return prevRenderHome();};
  if(!window.__engappV96EscapeBound){window.__engappV96EscapeBound=true;window.addEventListener('keydown',e=>{if(e.key==='Escape'&&state.photoFocus){e.preventDefault();togglePhotoFocus();}});}
  window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:BUILD_INFO.tag,productExperience:'v0.96',mobileViewer:'fullscreen-scroll-through-at-1x+zoom-pan',hotspotFlow:'dot→word→glass-card→grammar',browserSmoke:'/__engapp/local/product-smoke'};
})();


/* ======================================================================
   EngApp v0.98 — Lesson 01–05 Experience Polish
   Product-only layer. Canonical lesson packs and truth claims stay untouched.
   ====================================================================== */
const V97_POLISH_LESSONS=new Set([1,2,3,4,5]);
const V97_LEARN_KEYS=['overview','micro','build','scenario','meaning','story','language','grammar','speak'];
const V97_STAGE_LABELS={overview:'Scene',micro:'Analyze',build:'Build',scenario:'Combine',meaning:'Reason',story:'Story',language:'Language',grammar:'Grammar',speak:'Speak'};
function v97PolishLesson(){return V97_POLISH_LESSONS.has(Number(activeLessonId?.()||0));}
function v97Taxonomy(){return state.lesson?.presentation?.hotspotTaxonomy||window.EngBookContent?.getPack?.(activeLessonId())?.presentation?.hotspotTaxonomy||null;}
function v97ActiveCategoryKey(){
  const id=Number(activeLessonId());if(id===1)return typeof v67L01Category==='function'?v67L01Category():(state.l01HotspotCategory||'overview');
  const t=v97Taxonomy(),candidate=state.hotspotCategoryByLesson?.[id]||t?.defaultCategory||'overview';return (t?.categories||[]).some(x=>x.key===candidate)?candidate:'overview';
}
function v97CategoryMeta(){
  const t=v97Taxonomy(),cats=Array.isArray(t?.categories)?t.categories:[],key=v97ActiveCategoryKey(),found=cats.find(x=>x.key===key)||{key,label:key==='overview'?'Overview':key};
  const all=(state.lesson?.hotspots||[]).map((h,index)=>({h,index}));
  let visible;if(state.mode==='explore'&&typeof v35VisibleHotspots==='function'){visible=v35VisibleHotspots();}else if(key==='overview'){visible=all.filter(({h})=>h.level!=='detail'&&(h.categoryKey==='overview'||h.categoryKey==null));if(!visible.length)visible=all.filter(({h})=>h.level!=='detail');}else{visible=all.filter(({h})=>h.categoryKey===key);}
  const discovered=discoveredSet(),done=visible.filter(({h})=>discovered.has(h.en)).length,total=visible.length,pct=total?Math.round(done/total*100):0;
  return {key,label:found.label||key,categories:cats,visible,done,total,pct};
}
function v97SetSceneCategory(key){
  const id=Number(activeLessonId()),t=v97Taxonomy(),valid=(t?.categories||[]).some(x=>x.key===key);if(!valid)return;
  state.v97NextAnchor=null;
  if(id===1&&typeof l01SetHotspotCategory==='function')return l01SetHotspotCategory(key);
  if(typeof setAdaptiveHotspotCategory==='function')return setAdaptiveHotspotCategory(key);
  state.hotspotCategoryByLesson=state.hotspotCategoryByLesson||{};state.hotspotCategoryByLesson[id]=key;state.selected=null;render();
}
function v97NextSceneCategory(){
  const m=v97CategoryMeta(),cats=m.categories.filter(c=>c&&c.key);if(cats.length<2)return;let i=cats.findIndex(c=>c.key===m.key);for(let n=1;n<=cats.length;n++){const next=cats[(Math.max(0,i)+n)%cats.length];if(next?.key){v97SetSceneCategory(next.key);return;}}
}
function v97GuideNextAnchor(){
  const m=v97CategoryMeta(),d=discoveredSet(),next=m.visible.find(({h})=>!d.has(h.en));v60ResetMicroFlow?.();state.selected=null;
  if(!next){toast?.('This layer is mapped. Move to the next scene layer.');return v97NextSceneCategory();}
  state.v97NextAnchor=next.h.id||next.h.en;state.hints=false;render();haptic?.(8);toast?.('One quiet guide is highlighted. Find it in the image, then tap the dot.');
}
function v97SceneStatus(){
  if(!v97PolishLesson()||state.mode!=='explore')return '';const m=v97CategoryMeta(),complete=m.total>0&&m.done>=m.total;
  return `<div class="v97-scene-status" role="status" aria-label="Current scene layer progress"><div class="v97-layer-copy"><span>SCENE LAYER</span><b>${esc(m.label)}</b><small>${m.done}/${m.total} discovered</small></div><div class="v97-layer-meter"><i style="width:${m.pct}%"></i></div><button data-eng-v52-click="event.stopPropagation();${complete?'v97NextSceneCategory()':'v97GuideNextAnchor()'}">${complete?'Next layer':'Guide one'} ${icon('chevron')}</button></div>`;
}
function v97LearnState(){const id=Number(activeLessonId());return state[`l0${id}JourneyStep`]||'overview';}
function v97SetLearnState(step){
  const id=Number(activeLessonId());if(!V97_LEARN_KEYS.includes(step))step='overview';
  const fn=window[`setL0${id}JourneyStep`];if(typeof fn==='function'){fn(step);}else{state[`l0${id}JourneyStep`]=step;render();}
  setTimeout(()=>document.querySelector('.l01-complete-path')?.scrollIntoView({behavior:v96ReducedMotion()?'auto':'smooth',block:'start'}),0);
}
function v97AdvanceLearn(){const now=v97LearnState(),i=Math.max(0,V97_LEARN_KEYS.indexOf(now));if(i<V97_LEARN_KEYS.length-1)return v97SetLearnState(V97_LEARN_KEYS[i+1]);setMode('speak');setTimeout(v96ScrollToActivity,0);}
function v97ExperienceStep(){
  if(state.mode==='explore')return {label:'Scene',index:0,total:10,next:'Learn from the scene'};
  if(state.mode==='learn'){const k=v97LearnState(),map={overview:0,micro:1,build:2,scenario:3,meaning:4,story:5,language:6,grammar:7,speak:8};return {label:V97_STAGE_LABELS[k]||'Learn',index:map[k]??1,total:10,next:k==='speak'?'Open timed speaking':`Continue to ${V97_STAGE_LABELS[V97_LEARN_KEYS[Math.min(V97_LEARN_KEYS.length-1,(V97_LEARN_KEYS.indexOf(k)+1))]]||'next step'}`};}
  if(state.mode==='practice')return {label:'Recall',index:4,total:10,next:'Describe without prompts'};
  if(state.mode==='speak')return {label:'Speak',index:8,total:10,next:'Continue to conversation'};
  return {label:'Conversation',index:9,total:10,next:'Finish this learning loop'};
}
function v97AdvanceExperience(){if(state.mode==='explore'){setMode('learn');setTimeout(v96ScrollToActivity,0);return;}if(state.mode==='learn')return v97AdvanceLearn();if(state.mode==='practice'){setMode('speak');setTimeout(v96ScrollToActivity,0);return;}if(state.mode==='speak'){setMode('talk');setTimeout(v96ScrollToActivity,0);return;}goHome();}
function v97CompactContext(){
  if(!v97PolishLesson())return '';const e=v97ExperienceStep(),m=v97CategoryMeta(),overall=overallMastery(),pct=Math.round((e.index+1)/e.total*100);
  return `<div class="context-strip studio-context v97-context-strip"><div class="v97-context-stage"><span>NOW</span><b>${esc(e.label)}</b><small>${pct}% through the lesson journey</small><div><i style="width:${pct}%"></i></div></div><div class="v97-context-layer"><span>${state.mode==='explore'?'CURRENT LAYER':'SCENE MEMORY'}</span><b>${esc(m.label)}</b><small>${m.done}/${m.total} visible anchors discovered</small></div><div class="mastery-mini"><span>Mastery</span><div><i style="width:${overall}%"></i></div><b>${overall}%</b></div><div class="v97-context-actions"><button data-eng-v52-click="v96ScrollToScene()">${icon('eye')} Scene</button>${state.mode==='explore'?`<button data-eng-v52-click="v97NextSceneCategory()">${icon('layers')} Next layer</button>`:''}<button class="primary-action" data-eng-v52-click="v97AdvanceExperience()"><span>${esc(e.next)}</span>${icon('chevron')}</button></div></div>`;
}
const _v96ContextStripV97=contextStrip;
contextStrip=function(){return v97PolishLesson()?v97CompactContext():_v96ContextStripV97();};
function v97TogglePronunciation(word){state.v97PronunciationWord=state.v97PronunciationWord===word?null:word;render();}
function v97PronunciationDisclosure(h,ex){const open=state.v97PronunciationWord===h.en;return `<section class="v97-pron-disclosure ${open?'open':''}"><button class="v97-pron-toggle" data-eng-v52-click="v97TogglePronunciation('${q(h.en)}')"><span>${icon('mic')}<b>Pronunciation practice</b><small>${open?'Hide Hear → Say → Use':'Open only when you want active voice practice'}</small></span>${icon('chevron')}</button>${open?pronunciationLab(h,ex):''}</section>`;}
function v97CloseCard(){state.v97PronunciationWord=null;state.v97NextAnchor=null;v60ResetMicroFlow?.();state.selected=null;render();}
function v97CardFooter(h){return `<div class="v97-card-footer"><button data-eng-v52-click="v97CloseCard()">${icon('eye')} Back to scene</button><button class="primary" data-eng-v52-click="v97CloseCard();setTimeout(()=>v97GuideNextAnchor(),0)">Find another ${icon('chevron')}</button></div>`;}
const _v96SceneStageV97=sceneStage;
sceneStage=function(modal=false){let html=_v96SceneStageV97(modal);if(!v97PolishLesson()||state.mode!=='explore')return html;html=html.replace('<div class="photo-top-actions">',`${v97SceneStatus()}<div class="photo-top-actions">`);if(state.v97NextAnchor){const h=state.lesson?.hotspots?.find(x=>(x.id||x.en)===state.v97NextAnchor);if(h?.id){const id=esc(h.id);html=html.replace(`data-hotspot-id="${id}"`,`data-hotspot-id="${id}" data-v97-guide="true"`);}else if(h){const label=esc(h.en);html=html.replace(`aria-label="${label}"`,`aria-label="${label}" data-v97-guide="true"`);}}return html;};
const _v96OpenLessonV97=openLesson;
openLesson=function(id){state.v97PronunciationWord=null;state.v97NextAnchor=null;return _v96OpenLessonV97(id);};
const _v96SetModeV97=setMode;
setMode=function(mode){state.v97PronunciationWord=null;state.v97NextAnchor=null;return _v96SetModeV97(mode);};
(function(){window.ENGBOOK_RUNTIME={...(window.ENGBOOK_RUNTIME||{}),build:BUILD_INFO.tag,productExperience:'v0.98',experiencePolishLessons:[1,2,3,4,5],sceneProgress:'category-aware-compact',microCard:'progressive-disclosure',journeyContinuity:'context-next-action'};})();

/* Start each newly opened lesson with an uncluttered, zoomed scene. The
   existing focus viewer supplies touch drag, pinch and double-tap zoom. */
function v99StartSceneIntro(id){
  if(state.screen!=='lesson'||Number(state.lesson?.id)!==Number(id))return;
  if(globalThis.EngBookSceneCanvas)return globalThis.EngBookSceneCanvas.open(id);
  const viewer=v59EnsureViewer();viewer.scale=1.7;viewer.tx=0;viewer.ty=0;viewer.sheet='collapsed';viewer.lastTap=0;
  state.sceneIntroFocus=v99ResolveSceneFocus(window.EngBookContent?.getPack?.(id)||state.lesson);
  state.sceneIntroFocusPending=false;
  state.photoZoom=viewer.scale;state.photoFocus=true;state.sceneIntro=true;state.sceneIntroNeedsCover=true;
  state.selected=null;state.v60CardOpen=false;state.v60GrammarOpen=false;
  render();
}
const _v98EnsureOpenV99=v28EnsureAndOpenLesson;
v28EnsureAndOpenLesson=async function(id,mode='explore',opts={}){
  const previous=state.screen==='lesson'?Number(state.lesson?.id):null;
  const opened=await _v98EnsureOpenV99(id,mode,opts);
  if(opened&&previous!==Number(id))v99StartSceneIntro(id);
  return opened;
};
const _v98OpenLessonV99=openLesson;
openLesson=function(id){
  const previous=state.screen==='lesson'?Number(state.lesson?.id):null;
  const opened=_v98OpenLessonV99(id);
  if(previous!==Number(id))v99StartSceneIntro(id);
  return opened;
};
