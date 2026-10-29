/* A guided preview of real lesson tools. Demo actions never save lesson progress,
   start recording or claim a learning score. English examples stay English. */
(function(root){
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const svg=path=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  const icons={eye:svg('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>'),book:svg('<path d="M12 6v14M12 6C9 3 5 4 3 5v13c3-1 6-1 9 2 3-3 6-3 9-2V5c-2-1-6-2-9 1Z"/>'),reason:svg('<path d="m4 7 3 3 5-6M14 7h6M4 17h6M14 17h6"/><circle cx="7" cy="17" r="3"/>'),practice:svg('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>'),speak:svg('<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M6 10v2a6 6 0 0 0 12 0v-2M12 18v3m-3 0h6"/>'),talk:svg('<path d="M21 11a8 8 0 0 1-8 8H8l-5 3V11a9 9 0 0 1 18 0Z"/>'),next:svg('<path d="m9 6 6 6-6 6"/>'),back:svg('<path d="m14 6-6 6 6 6"/>'),sound:svg('<path d="m11 5-6 5H2v4h3l6 5Zm4 3a6 6 0 0 1 0 8"/>')};
  const steps=Object.freeze([
    {key:'look',label:'Explore',icon:'eye',title:'Start with one detail.',faTitle:'از یک جزئیات شروع کن.',copy:'Choose a picture from Lessons, then look before reading. Tap a dot to name a detail, then open its smaller branches: a person, their clothes, their hands or a nearby object.',faCopy:'از Lessons یک عکس انتخاب کن؛ قبل از خواندن متن، آن را ببین. یک نقطه را بزن و جزئیاتش را بشناس؛ بعد زیرشاخه‌های فرد، لباس، دست‌ها یا اشیای نزدیک او را باز کن.',task:'Try it here: tap the dot on the green suitcase.',faTask:'همین‌جا امتحان کن: نقطهٔ روی چمدان سبز را بزن.',tip:'In a lesson, drag the picture to explore and pinch to zoom on touch screens. Drag the card by its move handle if it covers another detail.',faTip:'در درس، عکس را بکش و روی صفحهٔ لمسی با دو انگشت زوم کن. اگر کادر جلوی جزئیات را گرفت، آن را از دستگیرهٔ جابه‌جایی بکش.',mode:'explore'},
    {key:'learn',label:'Learn',icon:'book',title:'Turn the detail into a sentence.',faTitle:'جزئیات را به جمله تبدیل کن.',copy:'In Learn, read one topic at a time. Use Picture, Phrases and Grammar, choose a level, and compare each example with the photograph. Listen slowly after making your own attempt.',faCopy:'در Learn هر بار یک موضوع بخوان. Picture، Phrases و Grammar را ببین، سطح را انتخاب کن و هر مثال را با عکس تطبیق بده. اول خودت تلاش کن؛ بعد نمونه را آهسته بشنو.',task:'Notice the phrase “between the other two cases”. It tells us where the green suitcase is.',faTask:'به عبارت between the other two cases توجه کن؛ جای چمدان سبز را توضیح می‌دهد.',tip:'Level changes description models and grammar focus. Some word and detail explanations are shared across levels. Show picture lets you inspect the scene again.',faTip:'سطح، مدل توصیف و تمرکز گرامر را تغییر می‌دهد؛ بعضی توضیحات واژه و جزئیات مشترک‌اند. با Show picture دوباره عکس را ببین.',mode:'learn'},
    {key:'reason',label:'Reason',icon:'reason',title:'Say what you see. Mark what you infer.',faTitle:'مشاهده را از برداشت جدا کن.',copy:'A visible fact comes from the picture. A possibility needs may, might or could. The Scenarios tab in Learn helps you try another reading or an imagined before-and-after without calling it a fact.',faCopy:'فکت از چیزی می‌آید که در عکس دیده می‌شود. برداشت احتمالی را با may، might یا could بیان کن. بخش Scenarios در Learn کمک می‌کند برداشت دیگر یا قبل‌و‌بعدِ خیالی بسازی و آن را فکت ننامی.',task:'Switch between Fact and Possibility to see the difference.',faTask:'بین Fact و Possibility جابه‌جا شو و تفاوت را ببین.',tip:'Clothing does not prove a job. Standing together does not prove a family relationship. Keep destinations, intentions and unseen events uncertain.',faTip:'لباس، شغل قطعی را ثابت نمی‌کند؛ کنار هم بودن هم نسبت خانوادگی را ثابت نمی‌کند. مقصد، نیت و اتفاق‌های خارج از عکس را نامعلوم نگه دار.',mode:'learn'},
    {key:'practice',label:'Practice',icon:'practice',title:'Recall it before looking at the answer.',faTitle:'پیش از دیدن جواب، به یاد بیاور.',copy:'Practice asks you to find, recall and rebuild details. Try first, then use a hint when needed. Smart Review brings back details that need another attempt.',faCopy:'در Practice جزئیات را پیدا کن، به یاد بیاور و جمله را دوباره بساز. اول تلاش کن؛ اگر لازم شد راهنما را باز کن. Smart Review جزئیاتی را که به تمرین دوباره نیاز دارند برمی‌گرداند.',task:'Which suitcase stands between the gray and navy cases?',faTask:'کدام چمدان بین چمدان خاکستری و سرمه‌ای است؟',tip:'This is a sample question. It does not add points or change your lesson progress. In lessons, use the feedback to make a more accurate attempt.',faTip:'این فقط سؤال نمونه است و امتیاز یا پیشرفت درس را تغییر نمی‌دهد. در درس‌ها از بازخورد برای تلاش دقیق‌تر استفاده کن.',mode:'practice'},
    {key:'speak',label:'Speak',icon:'speak',title:'Build your own picture description.',faTitle:'توصیف خودت را بساز.',copy:'Speak is your longer description: start with the setting, add a few visible details, then connect them. Use the plan and model when you need support.',faCopy:'Speak برای توصیف طولانی‌تر خودت است: از محیط شروع کن، چند جزئیات قابل دیدن اضافه کن و آن‌ها را به هم وصل کن. هر وقت لازم شد از طرح و نمونه کمک بگیر.',task:'Try saying the sample, then describe another detail in your own words.',faTask:'نمونه را بگو؛ بعد یک جزئیات دیگر را با واژه‌های خودت شرح بده.',tip:'Microphone features depend on your browser. You can use typed text when voice input is unavailable. Text feedback is not a pronunciation score.',faTip:'امکانات میکروفن به مرورگر بستگی دارد؛ اگر ورودی صوتی در دسترس نبود، می‌توانی تایپ کنی. بازخورد متن، نمرهٔ تلفظ نیست.',mode:'speak'},
    {key:'talk',label:'Talk',icon:'talk',title:'Use the picture to keep a conversation going.',faTitle:'با عکس گفتگو را ادامه بده.',copy:'Talk is a short exchange: answer one question, check your wording, then continue to the next turn. Use a visible detail and a short follow-up to keep your answer connected to the scene.',faCopy:'Talk یک گفتگوی نوبتی است: به یک سؤال جواب بده، جمله‌ات را بررسی کن و به نوبت بعد برو. از جزئیات قابل دیدن و یک سؤال کوتاه استفاده کن تا پاسخ به عکس وصل بماند.',task:'Speak builds a description. Talk practises responding and continuing an exchange.',faTask:'در Speak توصیف می‌سازی؛ در Talk جواب‌دادن و ادامهٔ گفتگو را تمرین می‌کنی.',tip:'You can revisit any stage or choose another picture with the lesson title button. You do not need to finish this guide before opening a lesson.',faTip:'می‌توانی به هر مرحله برگردی یا از دکمهٔ عنوان درس، عکس دیگری انتخاب کنی. برای بازکردن درس لازم نیست راهنما را تا آخر بخوانی.',mode:'talk'}
  ]);
  const chapters=[
  [
    [
      "navigation",
      "Choose a lesson and return safely.",
      "انتخاب درس و برگشت به مسیر",
      "Open Lessons, choose a category, then a picture. Inside a lesson, the title opens the lesson picker. The back arrow returns home.",
      "در Lessons دسته و عکس را انتخاب کن. داخل درس، دکمهٔ عنوان، انتخاب درس را باز می‌کند؛ فلش برگشت تو را به خانه می‌برد.",
      "info",
      "Lessons → Category → Picture → Explore"
    ],
    [
      "branches",
      "Explore the smaller branches.",
      "زیرشاخه‌های هر جزئیات را ببین",
      "A group dot opens its members; a person can lead to clothing, hands and nearby objects. Use the parent breadcrumb to go back. Other groups return when the card closes.",
      "نقطهٔ گروه، اعضایش را نشان می‌دهد؛ هر فرد می‌تواند لباس، دست‌ها و اشیای نزدیک زیرمجموعه داشته باشد. از مسیر بالای کادر برگرد؛ با بستن کادر، گروه‌های دیگر پیدا می‌شوند.",
      "branches",
      "Three rolling suitcases → Green rolling suitcase"
    ],
    [
      "detail",
      "Word, phrase and grammar.",
      "واژه، عبارت و گرامر یک جزئیات",
      "Open Phrase, grammar & details in a hotspot card. Word explains the object, Phrase places it in a useful expression, and Grammar shows a form and example. Change forms with the arrows.",
      "در کادر هات‌اسپات، Phrase, grammar & details را باز کن. Word معنی کاربردی، Phrase عبارت و Grammar ساختار و مثال را نشان می‌دهد؛ با فلش‌ها نمونه را عوض کن.",
      "detail",
      "The green suitcase stands between the other two cases."
    ],
    [
      "picture",
      "Keep the picture in view.",
      "عکس را از دست نده",
      "In a real lesson, drag to pan and pinch to zoom. If a card covers another dot, drag its move handle. Try Show picture here, then return to the guide.",
      "در درس، عکس را بکش و با دو انگشت زوم کن. اگر کادر جلوی نقطه را گرفت، دستگیرهٔ جابه‌جایی را بکش. اینجا Show picture را امتحان کن و دوباره راهنما را برگردان.",
      "peek",
      ""
    ],
    [
      "help",
      "Get help without leaving the scene.",
      "راهنما و معنی واژه‌ها",
      "The small help icon gives a description route. With Persian explanations selected, supported underlined English words can show a meaning. Not every word has a glossary entry.",
      "آیکون کوچک راهنما مسیر توصیف می‌دهد. با انتخاب فارسی، واژه‌های انگلیسیِ زیرخط‌دارِ موجود در واژه‌نامه معنی دارند؛ همهٔ واژه‌ها ترجمه ندارند.",
      "glossary",
      "suitcase → چمدان"
    ]
  ],
  [
    [
      "picture",
      "Picture: start with the whole scene.",
      "Picture؛ ابتدا نمای کلی",
      "Read an overview, visible facts and cautious interpretations one topic at a time. Compare every claim with the photo. Show picture temporarily clears the reading layer.",
      "نمای کلی، فکت و برداشت احتمالی را هر بار یک موضوع بخوان و با عکس تطبیق بده. Show picture لایهٔ خواندن را موقتاً کنار می‌زند.",
      "info",
      "An airport counter. Two adults and two children stand beside three suitcases."
    ],
    [
      "levels",
      "Choose a useful language level.",
      "سطح مناسب زبان را انتخاب کن",
      "A1, A2, B1, B2 and C1 change supported description models and grammar focus. These are study choices, not a test of your level; some detail explanations stay shared.",
      "A1، A2، B1، B2 و C1 مدل توصیف و تمرکز گرامر را تغییر می‌دهند. انتخاب سطح آزمون تعیین سطح نیست و برخی جزئیات مشترک می‌مانند.",
      "levels",
      ""
    ],
    [
      "phrases",
      "Phrases: reuse a useful chunk.",
      "Phrases؛ یک عبارت را به کار ببر",
      "Pick a detail, read its location or action phrase, then change the subject to make your own sentence. Listen only when you want a model.",
      "یک جزئیات و عبارت مکانی یا عملی آن را انتخاب کن؛ بعد فاعل را عوض کن و جملهٔ خودت را بساز. برای شنیدن نمونه دکمهٔ صدا را بزن.",
      "builder",
      "The green suitcase|stands|between the other two cases."
    ],
    [
      "grammar",
      "Grammar: form plus meaning.",
      "Grammar؛ ساختار همراه با معنا",
      "Compare a visible present with an imagined past or a question. A grammar example is language practice; changing tense does not establish an event in the photo.",
      "حالِ قابل مشاهده را با گذشتهٔ خیالی یا پرسش مقایسه کن. مثال گرامر تمرین زبان است؛ عوض‌کردن زمان، وقوع اتفاق را ثابت نمی‌کند.",
      "grammar",
      ""
    ],
    [
      "extras",
      "More topics: grow your description.",
      "موضوعات بیشتر برای توصیف",
      "The More topics menu includes Sentence models, Collocations, Speaking ideas, Your memories, Imagine, Language bank, Scene connections, Close-up notes and Human readings when content exists. Personal memories and imagined events are not photo facts.",
      "در More topics، بسته به محتوای درس، مدل جمله، هم‌آیندها، ایدهٔ صحبت، خاطره، تخیل، بانک زبان، ارتباط صحنه‌ها، یادداشت جزئیات و برداشت انسانی را می‌بینی. خاطره و تخیل فکت عکس نیستند.",
      "topics",
      ""
    ]
  ],
  [
    [
      "scenarios",
      "Scenarios: change the lens.",
      "سناریوها؛ زاویهٔ نگاه را عوض کن",
      "Open Scenarios in Learn, or Picture scenarios above the photo. Choose Facts, Possibilities, Imagine or Your memory when available. The card connects to related picture details.",
      "Scenarios را در Learn یا Picture scenarios را بالای عکس باز کن. فکت، احتمال، تخیل یا خاطره را در صورت وجود انتخاب کن؛ کادر به جزئیات مرتبط وصل می‌شود.",
      "scenarios",
      ""
    ],
    [
      "evidence",
      "Test the strength of a claim.",
      "قطعیت جمله را تشخیص بده",
      "Three cases can be counted. A destination or family relationship cannot be confirmed just because people stand together. Classify this sample.",
      "سه چمدان قابل شمارش‌اند؛ مقصد یا نسبت خانوادگی صرفاً از کنارهم‌بودن قطعی نمی‌شود. جملهٔ نمونه را دسته‌بندی کن.",
      "evidence",
      "The travelers are definitely flying to Paris."
    ],
    [
      "timeline",
      "Imagine before and after carefully.",
      "قبل و بعد را با برچسب تخیل بساز",
      "A still picture shows one moment. Use may have for a possible earlier event and might for a possible next event; label the extension as imagined.",
      "عکس یک لحظه را نشان می‌دهد. برای قبلِ احتمالی may have و برای بعدِ احتمالی might به کار ببر؛ ادامه را خیالی معرفی کن.",
      "info",
      "Imagined next moment: They might take their suitcases to another part of the terminal."
    ]
  ],
  [
    [
      "smart",
      "Smart review: recall, then use a hint.",
      "Smart review؛ اول یادآوری، بعد راهنما",
      "Smart review selects details from your recall history. Tap the requested detail, ask for a location hint if needed, then continue. It tracks practice, not overall English proficiency.",
      "مرور هوشمند از سابقهٔ یادآوری انتخاب می‌کند. جزئیات خواسته‌شده را بزن؛ اگر لازم شد راهنمای مکان بگیر و ادامه بده. این سابقهٔ تمرین است، نه نمرهٔ کلی زبان.",
      "find",
      "green rolling suitcase"
    ],
    [
      "find",
      "Find it: read, then locate.",
      "Find it؛ بخوان و روی عکس پیدا کن",
      "Read the target and tap its position. Other labels are hidden during recall. This sample uses three suitcase dots; try the green one.",
      "کلمه را بخوان و جای آن را بزن. هنگام یادآوری، برچسب‌های دیگر پنهان‌اند. این نمونه سه نقطهٔ چمدان دارد؛ سبز را پیدا کن.",
      "find",
      "green rolling suitcase"
    ],
    [
      "listen",
      "Listen & find: hear, then locate.",
      "Listen & find؛ بشنو و پیدا کن",
      "Play word, then tap its location. Replay if needed; audio starts only when you press the button in this tour.",
      "Play word را بزن؛ بعد جای آن را در عکس پیدا کن. اگر لازم شد دوباره بشنو. صدای تور فقط با لمس دکمه شروع می‌شود.",
      "listen-find",
      "green rolling suitcase"
    ],
    [
      "builder",
      "Sentence builder: arrange chunks.",
      "Sentence builder؛ تکه‌های جمله را مرتب کن",
      "Tap chunks in order, check the result, and reset to try again. Some lessons offer different sentence sets; availability follows the lesson content.",
      "تکه‌ها را به ترتیب بزن، نتیجه را بررسی کن و برای تلاش دوباره پاک کن. جمله‌ها و موجودبودن این فعالیت به محتوای درس بستگی دارند.",
      "builder",
      "The green suitcase|stands|between the other two cases."
    ],
    [
      "evidence",
      "Evidence recall: fact or inference?",
      "Evidence recall؛ فکت یا برداشت؟",
      "Choose the evidence category before seeing the explanation. Use what the photo supports, not a plausible story. This sample asks about a visible count.",
      "پیش از توضیح، نوع شواهد را انتخاب کن. از چیزی که عکس پشتیبانی می‌کند استفاده کن، نه یک داستان باورپذیر. نمونه دربارهٔ تعداد قابل مشاهده است.",
      "evidence-fact",
      "Three suitcases stand in a row."
    ],
    [
      "mistakes",
      "Mistake repair: revisit a missed detail.",
      "Mistake repair؛ جزئیات اشتباه را مرور کن",
      "In lessons, this queue uses your recorded misses. An empty queue means no items are waiting. Here, retry a deliberately incorrect label without adding a real mistake.",
      "در درس، این صف از اشتباه‌های ثبت‌شده استفاده می‌کند. خالی‌بودن یعنی موردی منتظر مرور نیست. اینجا برچسب اشتباهِ نمونه را اصلاح کن؛ اشتباه واقعی ثبت نمی‌شود.",
      "repair",
      "The middle suitcase is navy."
    ],
    [
      "saved",
      "Saved lines: keep useful language.",
      "Saved lines؛ جمله‌های کاربردی را نگه دار",
      "Save a useful hotspot line, then revisit it from Practice → Saved lines. The sample Save button only demonstrates this behavior and does not change your actual saved lines.",
      "در هات‌اسپات جملهٔ کاربردی را Save کن و از Practice → Saved lines مرور کن. دکمهٔ نمونه فقط نمایش است و ذخیره‌های واقعی را تغییر نمی‌دهد.",
      "save",
      "The green suitcase stands between the other two cases."
    ]
  ],
  [
    [
      "prepare",
      "Prepare a speaking route.",
      "برای صحبت مسیر آماده کن",
      "Choose a duration, set the scene, place visible details, then add a careful possibility if useful. Starters and lesson language can support your plan.",
      "مدت تمرین را انتخاب کن، محیط را بگو، جزئیات را جای‌گذاری کن و اگر مفید بود احتمال محتاطانه اضافه کن. از جمله‌های شروع و زبان درس کمک بگیر.",
      "plan",
      "This picture shows…|On the left…|They might…"
    ],
    [
      "capture",
      "Record or practise without recording.",
      "ضبط کن یا بدون ضبط تمرین کن",
      "In Speak, Record & start timer asks for a microphone. Practice without recording uses a timer. Live transcript depends on browser support. This tour requests no microphone.",
      "در Speak، Record & start timer میکروفن می‌خواهد؛ Practice without recording فقط زمان‌سنج است. متن زنده به مرورگر بستگی دارد. تور میکروفن را فعال نمی‌کند.",
      "info",
      "Prepare → Speak → Review"
    ],
    [
      "review",
      "Review your own words.",
      "متن خودت را مرور کن",
      "Listen to your take when available, edit or type the transcript, inspect language clues and complete the self-review checks. Try writing one sentence here. The tour offers a checklist, not an accuracy or pronunciation score.",
      "اگر ضبط داری بشنو، متن را ویرایش یا تایپ کن، سرنخ‌های زبان و خودارزیابی را بررسی کن. اینجا یک جمله بنویس؛ تور فقط چک‌لیست می‌دهد، نه نمرهٔ صحت یا تلفظ.",
      "draft",
      "Describe one visible detail in English."
    ],
    [
      "model",
      "Compare after trying.",
      "بعد از تلاش با نمونه مقایسه کن",
      "Open a model after your own attempt. Compare order, useful phrases and careful wording. Many other accurate descriptions are possible. Audio in the real speaking tool stays in that browser session.",
      "بعد از تلاش خودت نمونه را باز کن. ترتیب، عبارت‌ها و بیان محتاطانه را مقایسه کن؛ توصیف‌های درست دیگری هم وجود دارند. صدای ضبط‌شدهٔ ابزار اصلی در همان نشست مرورگر می‌ماند.",
      "reveal",
      "Two adults and two children stand beside three suitcases at an airport counter."
    ]
  ],
  [
    [
      "goal",
      "Choose a conversation goal.",
      "هدف گفتگو را انتخاب کن",
      "Change goal offers the lesson’s available conversations. Guided adds support; Independent leaves more to you. A hotspot can also start a conversation about that detail.",
      "Change goal گفتگوهای موجود در درس را نشان می‌دهد. Guided کمک بیشتری دارد؛ Independent پاسخ را به خودت می‌سپارد. از هات‌اسپات هم می‌توان گفتگوی جزئیات را شروع کرد.",
      "support",
      "Guided|Independent"
    ],
    [
      "answer",
      "Answer one question at a time.",
      "هر بار یک سؤال را جواب بده",
      "Hear the question, use Need help? if needed, then type or use browser voice transcription. Send answer when ready. Try a typed answer here; it stays inside this tour.",
      "سؤال را بشنو؛ اگر لازم شد Need help? را باز کن؛ تایپ یا تبدیل گفتار مرورگر را استفاده کن و سپس Send answer را بزن. پاسخ تایپی اینجا فقط در تور می‌ماند.",
      "draft",
      "What can you see at the airport counter?"
    ],
    [
      "revise",
      "Improve, then continue.",
      "پاسخ را بهتر کن و ادامه بده",
      "Review the text clue, use Improve this answer to revise, and compare with Lesson reference when useful. Next question continues the exchange. Feedback does not verify every claim or grade pronunciation.",
      "سرنخ متن را ببین، با Improve this answer ویرایش کن و در صورت نیاز Lesson reference را مقایسه کن. Next question گفتگو را ادامه می‌دهد. بازخورد همهٔ ادعاها را تأیید یا تلفظ را نمره‌دهی نمی‌کند.",
      "reveal",
      "Four travelers and three suitcases. They may be checking in."
    ],
    [
      "finish",
      "Review the exchange and choose your next picture.",
      "گفتگو را مرور کن و عکس بعدی را انتخاب کن",
      "At the end of a real conversation, review your answers and choose Save conversation review. Completion records participation, not a CEFR level. Use the lesson picker to continue. This tour has not changed lesson progress.",
      "در پایان گفتگوی واقعی، پاسخ‌ها را مرور و Save conversation review را بزن. تکمیل یعنی مشارکت، نه سطح CEFR. از انتخاب درس ادامه بده. تور پیشرفت درس‌ها را تغییر نداده است.",
      "finish",
      "Explore → Learn → Practice → Speak → Talk"
    ]
  ]
];
  let index=0,opened=false,interpretation='fact',answer=null,host=null,meta=null,observer=null,topic=0,peek=false,opening=false,openError=false;
  const attempts=Object.create(null);
  const onGuide=()=>root.location?.hash==='#how-it-works'&&!new URLSearchParams(root.location?.search||'').has('lesson');
  // Only the position belongs to this history entry. Drafts, sample answers and
  // lesson progress must never be written to history or persistent storage.
  function remember(){
    if(!onGuide()||!root.history?.replaceState)return;
    try{root.history.replaceState({...root.history.state,sceneSpeakTour:{chapter:index,topic}},'',root.location.href);}catch{}
  }
  function restore(){
    if(!onGuide())return;
    const saved=root.history?.state?.sceneSpeakTour;
    if(!saved||!Number.isInteger(saved.chapter)||!Number.isInteger(saved.topic)||saved.chapter<0||saved.chapter>=steps.length||saved.topic<0||saved.topic>chapters[saved.chapter].length)return;
    index=saved.chapter;topic=saved.topic;peek=false;
  }
  function destination(){
    const row=topicRow(),target={lesson:131,mode:steps[index].mode};
    if(index===1){
      const tabs={picture:'picture',levels:'picture',phrases:'phrases',grammar:'grammar'};
      target.tab=tabs[row?.[0]]||'picture';
      if(row?.[5]==='topics')target.tab=['sentences','collocations','ideas','memory','imagine','bank','connections','notes','readings'][demo().choice??0];
    }
    if(index===2)target.tab='scenarios';
    if(index===3)target.practice=({smart:'smart',find:'find',listen:'listen',builder:'builder',evidence:'fact',mistakes:'mistakes',saved:'saved'})[row?.[0]]||'find';
    return target;
  }
  async function openInLesson({finish=false}={}){
    if(opening)return false;
    const target=finish?{lesson:131,mode:'explore'}:destination();
    remember();root.EngBookSpeech?.stopSpeaking?.();opening=true;openError=false;render();
    try{
      if(typeof root.v28EnsureAndOpenLesson!=='function')throw Error('LESSON_LOADER_UNAVAILABLE');
      const ok=await root.v28EnsureAndOpenLesson(target.lesson,target.mode,target.practice?{practice:target.practice}:{});
      if(!ok)throw Error('LESSON_NOT_OPENED');
      // The older first-lesson intro repeats the tour and can leak over home
      // when Back is used. Dismiss it only for this explicit tutorial handoff;
      // do not mark any onboarding preference as completed.
      const lessonState=root.EngBookEventContext?.getRoot?.('state');
      if(lessonState?.onboardingOpen){lessonState.onboardingOpen=false;root.render?.();}
      if(target.tab)root.EngBookLearn?.choose?.(target.tab);
      return true;
    }catch(error){openError=true;root.v21PushError?.(error,'tour-lesson');return false;}
    finally{opening=false;render();if(openError)host?.querySelector('[data-how-action="open-lesson"]')?.focus({preventScroll:true});}
  }
  function restart(){
    root.EngBookSpeech?.stopSpeaking?.();
    index=0;topic=0;opened=false;interpretation='fact';answer=null;peek=false;openError=false;
    for(const key of Object.keys(attempts))delete attempts[key];
    render({focus:true});
  }
  const topicRow=()=>chapters[index][topic-1];
  const topicKey=()=>`${index}:${topic}`;
  const demo=()=>attempts[topicKey()]||(attempts[topicKey()]={choice:null,chunks:[],draft:'',checked:false,revealed:false,saved:false});
  const fa=()=>root.EngBookGuide?.language?.()==='fa';
  const text=(en,persian)=>fa()?persian:en;
  const localized=value=>`<span${fa()?' lang="fa" dir="rtl"':''}>${esc(value)}</span>`;
  const example='The green suitcase stands between the other two cases.';
  // The image, mask and target share the same cover transform. Mobile cropping
  // must never move a suitcase hotspot onto a person or another case.
  function geometry(width,height,step=index){
    const fitted=step===6,scale=(fitted?Math.min:Math.max)(width/900,height/514),left=(width-900*scale)/2,top=height-514*scale-(fitted?90:0);
    const people=step>=4&&!fitted,group=step===3||fitted,x=people?445:423,y=people?285:406,r=people?175:group?145:59;
    return {x:left+x*scale,y:top+y*scale,r:r*scale,scale,left,top};
  }
  function layout(){
    const stage=host?.querySelector('.how-stage'),card=host?.querySelector('.how-card');
    if(!stage?.getBoundingClientRect||!card?.getBoundingClientRect)return;
    const box=stage.getBoundingClientRect();if(!box.width||!box.height)return;
    const kind=topicRow()?.[5],p=geometry(box.width,box.height,['find','listen-find','branches'].includes(kind)?6:index),bounds=card.getBoundingClientRect();
    stage.querySelectorAll('[data-tour-spot]').forEach(el=>{el.style.left=`${p.left+Number(el.dataset.x)*p.scale}px`;el.style.top=`${p.top+406*p.scale}px`;});
    const sx=bounds.left-box.left,sy=bounds.top-box.top,ex=sx+bounds.width,ey=sy+bounds.height;
    stage.style.setProperty('--target-x',`${p.x}px`);stage.style.setProperty('--target-y',`${p.y}px`);stage.style.setProperty('--target-radius',`${p.r}px`);
    const line=stage.querySelector('.how-connector'),path=line?.querySelector('path');
    if(path){
      let x,y;if(p.y>ey+12){x=Math.max(sx+24,Math.min(ex-24,p.x));y=ey;}else{x=p.x<sx?sx:ex;y=Math.max(sy+24,Math.min(ey-24,p.y));}
      line.setAttribute('viewBox',`0 0 ${box.width} ${box.height}`);
      // End at the edge of the spotlight, leaving the object unobscured.
      const dx=x-p.x,dy=y-p.y,length=Math.hypot(dx,dy)||1,tx=p.x+dx/length*Math.min(p.r*.8,length*.45),ty=p.y+dy/length*Math.min(p.r*.8,length*.45);
      path.setAttribute('d',`M${x} ${y} Q${x+(tx-x)*.18} ${ty} ${tx} ${ty}`);
    }
  }
  function photoMarkup(){
    const kind=topicRow()?.[5],find=['find','listen-find','branches'].includes(kind);
    const target=!find&&(index===0||index===1||index===2||(index===3&&answer==='Green'));
    const spots=find?[[293,'gray'],[423,'green'],[508,'navy']].map(([x,name],i)=>`<button type="button" class="how-demo-dot how-case-dot" data-tour-spot="${i}" data-x="${x}" aria-label="Case location ${i+1}"></button>`).join(''):'';
    return `<figure class="how-photo"><img src="${esc(meta.image)}" width="900" height="514" alt="Two adults and two children beside gray, green and navy suitcases at an airport counter." decoding="async"><div class="how-spotlight" aria-hidden="true"></div>${spots}${target?`<button type="button" class="how-demo-dot" data-how-action="detail" aria-label="Explore the green suitcase" aria-expanded="${opened}"></button>`:''}<figcaption class="how-preview-badge">${text('Tour preview · Lesson 131','پیش‌نمایش تور · درس ۱۳۱')}</figcaption></figure>`;
  }
  function demoButton(action,label,extra=''){
    return `<button type="button" data-tour-action="${action}" ${extra}>${esc(label)}</button>`;
  }
  function topicMarkup(){
    const r=topicRow(),d=demo(),kind=r[5],sample=r[6],en=value=>`<p class="how-demo-model" lang="en">${esc(value)}</p>`;
    const choices=(values,expected)=>`<div class="how-demo-choices" role="group" aria-label="Tour sample choices">${values.map((v,i)=>demoButton('choice',v,`data-value="${i}" aria-pressed="${d.choice===i}"`)).join('')}</div>${d.choice===null?'':`<p class="how-feedback" role="status">${localized(d.choice===expected?text('Yes. Compare the explanation with the picture.','درست است؛ توضیح را با عکس مقایسه کن.'):text('Try again. Use visible evidence, not an invented story.','دوباره تلاش کن؛ از شواهد قابل مشاهده استفاده کن.'))}</p>`}`;
    if(kind==='branches')return `<div class="how-demo-choices">${demoButton('reveal',d.revealed?'← Three rolling suitcases':'Three rolling suitcases →')}</div>${d.revealed?`<div class="how-demo-choices">${['Gray case','Green case','Navy case'].map((v,i)=>demoButton('branch',v,`data-value="${i}" aria-pressed="${d.choice===i}"`)).join('')}</div>${d.choice!==null?en(['The gray case stands on the left.','The green case stands between the other two cases.','The navy case stands on the right.'][d.choice]):''}`:''}`;
    if(kind==='detail')return `<div class="how-demo-choices">${['Word','Phrase','Grammar'].map((v,i)=>demoButton('branch',v,`data-value="${i}" aria-pressed="${(d.choice??0)===i}"`)).join('')}</div>${en(['Green rolling suitcase','between the other two cases','The suitcase stands between the other two cases.'][d.choice??0])}${(d.choice??0)===2?en('Subject + present simple verb + location') :''}`;
    if(kind==='levels')return `<div class="how-demo-choices">${['A1','A2','B1','B2','C1'].map((v,i)=>demoButton('branch',v,`data-value="${i}" aria-pressed="${(d.choice??1)===i}"`)).join('')}</div>${en(['There are three suitcases.','The green suitcase is between the other two cases.','Three suitcases stand beside the travelers at the counter.','While the travelers stand at the counter, three suitcases are lined up beside them.','Beside the travelers, three suitcases form a row, with the green case positioned between the gray and navy ones.'][d.choice??1])}`;
    if(kind==='builder'){
      const parts=sample.split('|'),order=[2,0,1],selected=d.chunks.map(i=>parts[i]);
      return `<p class="how-demo-model" lang="en" aria-live="polite">${esc(selected.join(' ')||text('Your sentence…','جملهٔ تو…'))}</p><div class="how-demo-choices">${order.map(i=>demoButton('chunk',parts[i],`data-value="${i}" ${d.chunks.includes(i)?'disabled':''}`)).join('')}</div><div class="how-demo-choices">${demoButton('check',text('Check','بررسی'))}${demoButton('reset',text('Reset','از نو'))}</div>${d.checked?`<p class="how-feedback" role="status">${localized(d.chunks.join(',')==='0,1,2'?text('Yes. Subject → verb → location.','درست است؛ فاعل ← فعل ← مکان.'):text('Start with the subject, add the verb, then the location. Try again.','از فاعل شروع کن، فعل و سپس مکان را اضافه کن؛ دوباره تلاش کن.'))}</p>`:''}`;
    }
    if(kind==='grammar')return `<div class="how-demo-choices">${['Visible present','Imagined past','Question'].map((v,i)=>demoButton('branch',v,`data-value="${i}" aria-pressed="${(d.choice??0)===i}"`)).join('')}</div>${en(['The travelers are standing at the counter.','They may have arrived a short time ago.','Where is the green suitcase?'][d.choice??0])}`;
    if(kind==='topics')return `<label class="how-demo-label">${localized(text('Explore the topic menu','موضوع را انتخاب کن'))}<select data-tour-menu="extras" aria-label="More topics preview">${['Sentence models','Collocations','Speaking ideas','Your memories','Imagine','Language bank','Scene connections','Close-up notes','Human readings'].map((v,i)=>`<option value="${i}" ${(d.choice??0)===i?'selected':''}>${v}</option>`).join('')}</select></label>${en(['Three suitcases stand beside the travelers.','stand beside · wait at a counter','Describe where each case is.','Fictional example: This reminds me of a journey I once imagined.','Imagined next: They might leave the counter.','at the counter · beside the cases · in the terminal','Compare this terminal with another travel scene.','Notice the handles and wheels on the cases.','Possible reading: The group may be preparing for a trip.'][d.choice??0])}`;
    if(kind==='scenarios')return `<div class="how-demo-choices">${['Facts','Possibilities','Imagine','Your memory'].map((v,i)=>demoButton('branch',v,`data-value="${i}" aria-pressed="${(d.choice??0)===i}"`)).join('')}</div>${en(['Three suitcases stand in a row.','The travelers may be checking in.','Imagined next: They might move the cases away.','Fictional memory example: I remember waiting beside a suitcase.'][d.choice??0])}`;
    if(kind==='evidence'||kind==='evidence-fact')return en(sample)+choices(['Visible fact','Possible interpretation','Not established'],kind==='evidence'?2:0);
    if(kind==='repair')return en(sample)+choices(['Green','Navy','Gray'],0);
    if(kind==='find'||kind==='listen-find')return `${kind==='find'?en(sample):demoButton('hear-target',text('Play word','پخش واژه'))}<p class="how-feedback" role="status">${localized(d.choice===null?text('Tap one of the three case dots in the photo.','یکی از سه نقطهٔ چمدان‌ها را روی عکس بزن.'):d.choice===1?text('You found it. The green case is in the middle.','پیدایش کردی؛ چمدان سبز در وسط است.'):text('Try again. Look between the other two cases.','دوباره تلاش کن؛ بین دو چمدان دیگر را نگاه کن.'))}</p>${demoButton('hint',d.revealed?text('Hint shown','راهنما باز است'):text('Hint','راهنما'))}${d.revealed?`<p class="how-feedback">${localized(text('Look in the lower center, between gray and navy.','پایینِ وسط، بین خاکستری و سرمه‌ای را نگاه کن.'))}</p>`:''}`;
    if(kind==='save')return en(sample)+demoButton('save',d.saved?text('Saved in this demo ✓','در نمونه ذخیره شد ✓'):text('Save sample','ذخیرهٔ نمونه'),`aria-pressed="${d.saved}"`)+(d.saved?`<div class="how-demo-model">${localized(text('Saved lines preview','پیش‌نمایش Saved lines'))}${en(sample)}</div>`:'');
    if(kind==='draft')return `${en(sample)}<label class="how-demo-label" for="how-draft">${localized(text('Your practice answer (English)','پاسخ تمرینی به انگلیسی'))}</label><textarea id="how-draft" data-tour-draft rows="3" maxlength="1000" placeholder="Type a sentence…">${esc(d.draft)}</textarea>${demoButton('check',text('Review my wording','مرور متن من'))}${d.checked?`<div class="how-feedback" role="status">${localized(d.draft.trim()?text('Self-check: Is each detail visible? Did you use a location? Did you mark guesses with may or might? This preview does not score your answer.','خودت بررسی کن: جزئیات دیده می‌شوند؟ مکان را گفته‌ای؟ حدس را با may یا might مشخص کرده‌ای؟ این نمونه پاسخ را نمره‌دهی نمی‌کند.'):text('Write an English sentence first, then review it.','اول یک جملهٔ انگلیسی بنویس؛ بعد مرورش کن.'))}</div>`:''}`;
    if(kind==='reveal')return demoButton('reveal',d.revealed?text('Hide model','بستن نمونه'):text('Compare with a model','مقایسه با نمونه'))+(d.revealed?en(sample):'');
    if(kind==='support')return `<div class="how-demo-choices">${['Guided','Independent'].map((v,i)=>demoButton('branch',v,`data-value="${i}" aria-pressed="${(d.choice??0)===i}"`)).join('')}</div><p class="how-feedback">${localized((d.choice??0)===0?text('Route: setting → detail → careful possibility.','مسیر: محیط ← جزئیات ← احتمال محتاطانه.'):text('Try your own route before opening help.','قبل از بازکردن کمک، مسیر خودت را امتحان کن.'))}</p>`;
    if(kind==='plan')return `<ol class="how-demo-plan">${sample.split('|').map(v=>`<li lang="en">${esc(v)}</li>`).join('')}</ol>`;
    if(kind==='peek')return demoButton('peek',text('Show picture','نمایش عکس'));
    if(kind==='glossary')return demoButton('reveal','suitcase')+(d.revealed?`<p class="how-demo-model" lang="fa" dir="rtl">چمدان؛ وسیلهٔ حمل لباس و وسایل در سفر</p>`:'');
    return sample?en(sample):'';
  }
  function selectTopic(value,{focus=true}={}){
    const n=Number(value);if(value==null||String(value).trim()===''||!Number.isInteger(n)||n<0||n>chapters[index].length)return false;
    root.EngBookSpeech?.stopSpeaking?.();topic=n;peek=false;render({focus});return true;
  }
  function advance(direction){
    if(direction===1){if(topic<chapters[index].length)return selectTopic(topic+1);if(index<steps.length-1)return choose(index+1);}
    else {if(topic>0)return selectTopic(topic-1);if(index>0){index--;topic=chapters[index].length;peek=false;root.EngBookSpeech?.stopSpeaking?.();render({focus:true});return true;}}
    return false;
  }
  function exampleMarkup(){
    if(topic>0)return topicMarkup();
    if(index===1)return `<div class="how-language" lang="en"><span class="how-kicker">A useful location phrase</span><p>The green suitcase stands <mark>between the other two cases</mark>.</p><button type="button" class="how-listen" data-how-action="listen">${icons.sound} Listen slowly</button></div>`;
    if(index===2)return `<div class="how-evidence" role="group" aria-label="Compare facts and possibilities"><button type="button" data-how-action="fact" aria-pressed="${interpretation==='fact'}">${text('Fact','فکت')}</button><button type="button" data-how-action="possible" aria-pressed="${interpretation==='possible'}">${text('Possibility','احتمال')}</button><div class="how-fact-model" lang="en"><span class="how-kicker">${interpretation==='fact'?'VISIBLE FACT':'POSSIBILITY · MAY'}</span><p>${interpretation==='fact'?'Three suitcases stand in a row.':'The travelers may be checking in.'}</p></div><p${fa()?' lang="fa" dir="rtl"':''}>${esc(interpretation==='fact'?text('We can count the cases. Their travel purpose is not shown.','می‌توانیم چمدان‌ها را بشماریم؛ هدف سفر در عکس مشخص نیست.'):text('May keeps the purpose uncertain. The photograph does not confirm a check-in transaction.','may هدف را احتمالی نگه می‌دارد؛ عکس انجام پذیرش مسافر را قطعی ثابت نمی‌کند.'))}</p></div>`;
    if(index===3)return `<div class="how-quiz"><div role="group" aria-label="Sample suitcase question">${['Green','Navy','Gray'].map(value=>`<button type="button" data-how-answer="${value}" aria-pressed="${answer===value}">${value}</button>`).join('')}</div><p class="how-feedback" role="status">${answer?esc(answer==='Green'?text('Yes. The green case is between the gray and navy cases.','درست است؛ چمدان سبز بین خاکستری و سرمه‌ای است.'):text('Look between the gray and navy cases, then try again.','بین چمدان خاکستری و سرمه‌ای را نگاه کن و دوباره تلاش کن.')):text('Choose a color. This is only a preview.','یک رنگ انتخاب کن؛ این فقط نمونهٔ تمرین است.')}</p></div>`;
    if(index===4)return `<div class="how-language" lang="en"><span class="how-kicker">A starting sentence</span><p>Two adults and two children are standing beside three suitcases.</p><button type="button" class="how-listen" data-how-action="listen">${icons.sound} Listen slowly</button></div>`;
    if(index===5)return `<div class="how-chat" lang="en" aria-label="Example conversation"><span class="how-kicker">Example exchange</span><p class="how-chat-question"><small>Question</small>What can you see at the counter?</p><p class="how-chat-answer"><small>Sample answer</small>Four travelers and three suitcases. They may be checking in.</p><p class="how-chat-followup">Follow-up: What else do you notice?</p></div>`;
    return opened?`<div class="how-language how-discovery" lang="en"><span class="how-kicker">VISIBLE FACT</span><strong>Green suitcase</strong><p>${example}</p></div>`:'';
  }
  function render({focus=false}={}){
    if(!host||!meta)return;
    remember();
    const s=steps[index],r=topicRow(),total=steps.length+chapters.reduce((n,c)=>n+c.length,0),position=chapters.slice(0,index).reduce((n,c)=>n+c.length+1,0)+topic+1,last=index===steps.length-1&&topic===chapters[index].length,prompts=[
      ['Tap the green suitcase.','نقطهٔ روی چمدان سبز را بزن.'],
      ['Listen to the phrase. Then try it yourself.','عبارت را بشنو؛ بعد خودت آن را بگو.'],
      ['Compare a fact with a possible explanation.','فکت را با یک برداشت احتمالی مقایسه کن.'],
      [s.task,s.faTask],
      ['Say the sample, then add your own detail.','نمونه را بگو؛ بعد جزئیات خودت را اضافه کن.'],
      ['Answer, then ask a follow-up.','پاسخ بده؛ بعد یک سؤال مرتبط بپرس.']
    ];
    host.innerHTML=`<header class="how-topbar"><button type="button" class="how-brand" data-eng-action="path-top" aria-label="SceneSpeak home"><img src="assets/brand/scenespeak-192.png" width="32" height="32" alt=""><span>SceneSpeak<small>${text('How it works','تور آموزشی')}</small></span></button><h1 id="how-title" class="how-sr">${localized(text('How SceneSpeak works','آموزش کار با SceneSpeak'))}</h1><div class="how-top-actions">${root.EngBookGuide?.languageControl?.()||''}<button type="button" class="how-restart" data-how-action="restart" aria-label="${text('Restart tutorial','شروع دوبارهٔ تور')}" title="${text('Restart tutorial','شروع دوبارهٔ تور')}">${svg('<path d="M3 11a9 9 0 1 1 2.6 7M3 4v7h7"/>')}</button><button type="button" class="how-skip" data-eng-action="learning-path">${localized(text('Skip','رد کردن'))}</button></div></header>
      <section class="how-stage ${peek?'how-peeking':''}" aria-label="Interactive tutorial preview" data-tour-stage="${s.key}" data-tour-demo="${['find','listen-find','branches'].includes(r?.[5])?'group':'detail'}">
        ${photoMarkup()}${peek?`<button type="button" class="how-return" data-tour-action="peek">${localized(text('Return to guide','برگشت به راهنما'))}</button>`:''}<svg class="how-connector" aria-hidden="true"><path/></svg>
        <article class="how-card" aria-labelledby="how-step-title"><div class="how-card-content">
          <header class="how-card-heading"><span class="how-kicker">${s.label.toUpperCase()}</span><span class="how-count" aria-label="Step ${index+1} of ${steps.length}">${position} / ${total}</span></header>
          <label class="how-topic-label">${localized(text('In this section','در این بخش'))}<select data-tour-topic aria-label="Tutorial topic"><option value="0" ${topic===0?'selected':''}>${esc(text(s.title,s.faTitle))}</option>${chapters[index].map((row,i)=>`<option value="${i+1}" ${topic===i+1?'selected':''}>${esc(text(row[1],row[2]))}</option>`).join('')}</select></label>
          <h2 id="how-step-title" tabindex="-1">${localized(r?text(r[1],r[2]):text(s.title,s.faTitle))}</h2>
          <p class="how-task">${localized(r?text(r[3],r[4]):text(...prompts[index]))}</p>
          ${exampleMarkup()}
          <details class="how-tip"><summary>${localized(text('More guidance','راهنمای بیشتر'))}</summary><div class="how-tip-body"><p>${localized(text(s.copy,s.faCopy))}</p><p>${localized(text(s.tip,s.faTip))}</p></div></details>
          </div><div class="how-lesson-handoff"><button type="button" class="how-open-mode" data-how-action="open-lesson" data-lesson="131" data-mode="${s.mode}" ${opening?'disabled aria-busy="true"':''}>${localized(opening?text('Opening lesson…','در حال بازکردن درس…'):text('Try this in a lesson','در درس امتحان کن'))}${icons.next}</button><small>${localized(text('Browser Back returns to this topic. Opening the lesson uses real practice.','با برگشت مرورگر به همین موضوع برمی‌گردی؛ تمرین داخل درس واقعی است.'))}</small>${openError?`<p class="how-open-error" role="alert">${localized(text('The lesson could not open. Check your connection and try again; your tour position is kept.','درس باز نشد؛ اتصال را بررسی و دوباره تلاش کن. جای تو در تور حفظ شده است.'))}</p>`:''}</div><footer class="how-footer"><button type="button" class="how-back" data-how-action="previous" aria-label="${text('Back','قبلی')}" ${index===0&&topic===0?'disabled':''}>${icons.back}</button><div class="how-position" aria-hidden="true">${steps.map((_,i)=>`<span class="${i===index?'active':''}"></span>`).join('')}</div>${last?`<button type="button" class="how-next" data-how-action="finish" data-lesson="131" data-mode="explore" ${opening?'disabled':''}>${localized(text('Try this scene','شروع درس'))}${icons.next}</button>`:`<button type="button" class="how-next" data-how-action="next">${localized(text('Next','بعدی'))}${icons.next}</button>`}</footer>
        </article>
        <nav class="how-stages" aria-label="Tutorial steps">${steps.map((step,i)=>`<button type="button" data-how-step="${i}" ${i===index?'aria-current="step"':''} aria-label="${step.label} ${String(i+1).padStart(2,'0')}"><span class="how-stage-icon">${icons[step.icon]}</span><span class="how-stage-label">${step.label}</span></button>`).join('')}</nav>
      </section>`;
    observer?.disconnect();
    const stage=host.querySelector('.how-stage'),card=host.querySelector('.how-card');
    if(root.ResizeObserver&&stage?.getBoundingClientRect){observer=new root.ResizeObserver(layout);observer.observe(stage);if(card)observer.observe(card);}
    layout();
    if(focus)host.querySelector('#how-step-title')?.focus({preventScroll:true});
  }
  function choose(value,{focus=true}={}){
    if(value==null||String(value).trim()==='')return false;
    const n=Number(value);if(!Number.isInteger(n)||n<0||n>=steps.length)return false;
    root.EngBookSpeech?.stopSpeaking?.();index=n;topic=0;peek=false;render({focus});return true;
  }
  function listen(){
    const value=index===4?'Two adults and two children are standing beside three suitcases.':example;
    root.speak?.(value,.82,{voiceRole:index%2?'female':'male'});
  }
  function tourAction(action,value){
    if(action==='peek'){peek=!peek;render();host.querySelector(peek?'.how-return':'#how-step-title')?.focus({preventScroll:true});return;}
    if(!topic)return;
    const d=demo(),r=topicRow(),kind=r[5];
    if(action==='hear-target'){root.speak?.('green rolling suitcase',.82,{voiceRole:'female'});return;}
    if(action==='chunk'){
      const n=Number(value);if(!Number.isInteger(n)||n<0||n>2||d.chunks.includes(n))return;
      d.chunks.push(n);d.checked=false;
    }else if(action==='choice'||action==='branch'){
      const n=Number(value),max=kind==='levels'?4:kind==='scenarios'?3:kind==='support'?1:2;
      if(!Number.isInteger(n)||n<0||n>max)return;d.choice=n;
    }else if(action==='check')d.checked=true;
    else if(action==='reset'){d.chunks=[];d.checked=false;}
    else if(action==='save')d.saved=!d.saved;
    else if(action==='reveal')d.revealed=!d.revealed;
    else if(action==='hint')d.revealed=true;
    else return;
    render();
    const focusTarget=action==='chunk'?(host.querySelector('[data-tour-action="chunk"]:not(:disabled)')||host.querySelector('[data-tour-action="check"]')):host.querySelector(`[data-tour-action="${action}"]${value!=null?`[data-value="${value}"]`:''}`);
    focusTarget?.focus({preventScroll:true});
  }
  function mount(home,{content}={}){
    const lessonMeta=content?.getMeta?.(131);if(!lessonMeta?.image)return;
    meta={...lessonMeta,image:'assets/images/lesson_131.jpg'};
    restore();
    host=home.querySelector('.how-guide');if(host){render();return;}
    host=document.createElement('section');host.className='how-guide';host.id='how-it-works';host.hidden=true;host.setAttribute('aria-labelledby','how-title');
    host.addEventListener('click',event=>{
      const sample=event.target.closest('[data-tour-action]');if(sample){tourAction(sample.dataset.tourAction,sample.dataset.value);return;}
      const spot=event.target.closest('[data-tour-spot]');if(spot&&topic){demo().choice=Number(spot.dataset.tourSpot);render();host.querySelector(`[data-tour-spot="${spot.dataset.tourSpot}"]`)?.focus({preventScroll:true});return;}
      const step=event.target.closest('[data-how-step]');if(step){choose(step.dataset.howStep);return;}
      const option=event.target.closest('[data-how-answer]');if(option&&['Green','Navy','Gray'].includes(option.dataset.howAnswer)){answer=option.dataset.howAnswer;render();host.querySelector(`[data-how-answer="${answer}"]`)?.focus({preventScroll:true});return;}
      const action=event.target.closest('[data-how-action]')?.dataset.howAction;
      if(action==='open-lesson'||action==='finish')return openInLesson({finish:action==='finish'});
      if(action==='restart')return restart();
      if(action==='next')advance(1);else if(action==='previous')advance(-1);else if(action==='detail'){opened=true;render();host.querySelector('.how-demo-dot')?.focus({preventScroll:true});}else if(action==='fact'||action==='possible'){interpretation=action==='fact'?'fact':'possible';render();host.querySelector(`[data-how-action="${action}"]`)?.focus({preventScroll:true});}else if(action==='listen')listen();
    });
    host.addEventListener('input',event=>{
      if(event.target.matches?.('[data-tour-draft]')&&topic){demo().draft=String(event.target.value||'').slice(0,1000);demo().checked=false;}
    });
    host.addEventListener('change',event=>{
      if(event.target.matches?.('[data-tour-topic]'))selectTopic(event.target.value);
      else if(event.target.matches?.('[data-tour-menu="extras"]')&&topic){const n=Number(event.target.value);if(Number.isInteger(n)&&n>=0&&n<9){demo().choice=n;render();host.querySelector('[data-tour-menu="extras"]')?.focus({preventScroll:true});}}
    });
    home.querySelector('.path-main').before(host);render();
  }
  root.addEventListener?.('resize',layout);
  root.addEventListener?.('popstate',()=>{if(onGuide()){restore();render();}});
  root.EngBookHowItWorks=Object.freeze({mount,choose,refresh:render,listen,step:()=>index,count:steps.length,geometry,selectTopic,topic:()=>topic,topicCounts:chapters.map(c=>c.length+1),destination,openInLesson,restart});
})(typeof window!=='undefined'?window:globalThis);
