/* Optional coaching language. English lesson content, identities, progress and
   speech stay authoritative. This layer adds prompts, never new visual facts. */
(function(root){
  'use strict';
  const KEY='scenespeak_explanation_language_v1',supported=['en','fa'];
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let language='en',panelOpen=false,returnFocus=null,guideStep=0,guideContext=null,detailTrigger=null;
  const hintIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4M8 13a6 6 0 1 1 8 0c-1.5 1.2-2 2-2 3h-4c0-1-.5-1.8-2-3Z"/></svg>';
  try{const saved=root.localStorage?.getItem(KEY);if(supported.includes(saved))language=saved;}catch{}
  const fa=()=>language==='fa',text=(en,persian)=>fa()?persian:en;
  const glossary=()=>root.SceneSpeakGlossaryFa||{};
  function meaning(word){const key=String(word||'').toLowerCase().trim().replace(/[’']s$/,'');return glossary()[key]||null;}
  function wordsMarkup(value){
    const source=String(value||'');if(!fa())return esc(source);
    const chunks=source.match(/[A-Za-z]+(?:[-’'][A-Za-z]+)*|[^A-Za-z]+/g)||[],out=[];
    for(let i=0;i<chunks.length;i++){
      if(!/^[A-Za-z]/.test(chunks[i])){out.push(esc(chunks[i]));continue;}
      let end=i,word=chunks[i];
      for(let size=7;size>=3;size-=2){const candidate=chunks.slice(i,i+size).join('');if(i+size<=chunks.length&&meaning(candidate)){end=i+size-1;word=candidate;break;}}
      if(meaning(word)){out.push(`<button type="button" class="guide-word" data-guide-word="${esc(word)}" aria-label="معنی ${esc(word)}" lang="en" dir="ltr">${esc(word)}</button>`);i=end;}
      else out.push(esc(word));
    }
    return out.join('');
  }
  function languageControl(){return `<label class="guide-language-control"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a19 19 0 0 1 0 18 19 19 0 0 1 0-18Z"/></svg><span>${text('Explanation language','زبان راهنمای آموزشی')}</span><select data-guide-language aria-label="Explanation language"><option value="en" ${!fa()?'selected':''}>English</option><option value="fa" ${fa()?'selected':''}>فارسی</option></select></label>`;}
  const themes=[
    [/reading a map in a town square/i,
      ['Find the map, both hands, backpack and camera, then locate the fountain and buildings. Small map labels do not reveal a route. Do not assume that she is lost or traveling alone.','نقشه، دو دست، کوله و دوربین را پیدا کن و بعد به فواره و ساختمان‌ها برس. نوشته‌های ریز نقشه مسیر را مشخص نمی‌کنند؛ گم‌شدن یا تنهایی سفرکردن زن را قطعی ندان.']],
    [/counter exchange in a modern hotel lobby/i,
      ['Describe the three adults, their hands and luggage before the lobby furnishings. The flat item does not prove a room assignment, payment or completed check-in. Practise a polite request as an imagined conversation.','اول سه بزرگسال، دست‌ها و چمدان را شرح بده و بعد به وسایل لابی برس. آن شیء تخت، تخصیص اتاق، پرداخت یا پایان پذیرش را ثابت نمی‌کند. درخواست مؤدبانه را به‌عنوان گفت‌وگویی خیالی تمرین کن.']],
    [/black card at an ornate reception/i,
      ['Follow both hands to the black card, then find the suitcase, flowers and clock. Neither the transfer direction nor the card’s function is established; ask an imagined question instead of inventing a transaction.','دو دست را تا کارت سیاه دنبال کن و بعد چمدان، گل‌ها و ساعت را پیدا کن. جهت جابه‌جایی و کاربرد کارت قطعی نیست؛ به‌جای ساختن یک معامله، سؤال خیالی بپرس.']],
    [/seven adults posing near the eiffel/i,
      ['Count seven adults and find the phone holder. Compare each person’s clothing and location, then describe the tower. Shared smiles suggest a selfie, but relationships and a completed photograph remain unknown.','هفت بزرگسال را بشمار و فردی را که گوشی دارد پیدا کن. لباس و جای افراد را مقایسه کن و بعد برج را شرح بده. لبخندها شاید نشانهٔ سلفی باشد، اما نسبت افراد و ثبت‌شدن عکس معلوم نیست.']],
    [/visitors inside the colosseum/i,
      ['Locate visitors by their cameras, hats and positions beside the railing, then follow the arches. An extended arm does not establish a guide role or spoken explanation.','بازدیدکنندگان را با دوربین، کلاه و جایشان کنار نرده پیدا کن و بعد قوس‌ها را دنبال کن. دستِ درازشده به‌تنهایی نقش راهنما یا حرف‌های گفته‌شده را ثابت نمی‌کند.']],
    [/airborne jet|airplane takeoff/i,
      ['Start with the nose, wings, engines and extended landing gear. Then locate the runway and tower. Describe the visible position; speed, destination and the preceding motion remain unknown.','از دماغه، بال‌ها، موتورها و چرخ‌های باز شروع کن؛ بعد باند و برج را پیدا کن. حالت قابل دیدن را شرح بده؛ سرعت، مقصد و حرکتِ قبل از این لحظه معلوم نیست.']],
    [/departure gate/i,
      ['Find a traveler, a device and nearby luggage. Use the blue seats to explain positions. Read only clear signs; the board does not establish a destination, delay or boarding status.','یک مسافر، یک وسیله و چمدان نزدیک او را پیدا کن. با صندلی‌های آبی جای آن‌ها را شرح بده. فقط نوشتهٔ واضح را بخوان؛ تابلو مقصد، تأخیر یا وضعیت سوار شدن را ثابت نمی‌کند.']],
    [/airport|check-in/i,
      ['Follow the travelers, luggage and counter into the terminal. Add clothing, hand positions and suitcase colors. Relationships, travel documents, destinations and baggage acceptance remain unknown.','از مسافران، چمدان‌ها و پیشخوان شروع کن و به سالن برس. لباس، جای دست‌ها و رنگ چمدان را اضافه کن. نسبت افراد، مدارک سفر، مقصد و پذیرفته‌شدن بار معلوم نیست.']],
    [/crowded station platform|travelers on a crowded station/i,
      ['Scan the platform from the people and luggage to the train doors, signs and floor markings. The crowd suggests a busy commute, but rush hour, destinations and boarding status are not established.','از افراد و چمدان‌ها شروع کن و بعد درها، تابلوها و نشانه‌های کف سکو را پیدا کن. شلوغی می‌تواند یادآور رفت‌وآمد روزانه باشد، اما ساعت شلوغی، مقصد و وضعیت سوارشدن معلوم نیست.']],
    [/grand railway hall|adults in a grand railway/i,
      ['Describe the four adults, their positions and the hall’s clocks, boards and architecture. Their close formation may suggest they are traveling together, but relationships and tourist status are not established.','چهار بزرگسال، جای آن‌ها و ساعت‌ها، تابلوها و معماری سالن را شرح بده. نزدیک‌بودنشان شاید نشان دهد با هم سفر می‌کنند، اما نسبت خانوادگی یا گردشگر بودنشان معلوم نیست.']],
    [/passenger train above the countryside/i,
      ['Follow the train from its pointed nose across the carriages, then locate the viaduct and fields below. Blur suggests motion; it cannot establish an exact speed, route or destination.','از دماغهٔ قطار تا واگن‌ها را دنبال کن و بعد پل مرتفع و زمین‌های زیر آن را پیدا کن. تاری تصویر حرکت را القا می‌کند، اما سرعت دقیق، مسیر و مقصد را ثابت نمی‌کند.']],
    [/passengers beside a metro train/i,
      ['Separate the waiting passengers from the train, platform edge and screen doors. The underground setting is visible, but the station name, route, arrival time and boarding status are unknown.','مسافران منتظر را از قطار، لبهٔ سکو و درهای شیشه‌ای جدا کن. محیط زیرزمینی دیده می‌شود، اما نام ایستگاه، مسیر، زمان رسیدن و وضعیت سوارشدن معلوم نیست.']],
    [/city bus stop/i,
      ['Look from the bus door and boarding woman to the shelter, other pedestrians and wet street. A bus stop is visible, but its route, destination and the woman’s reason for travel are unknown.','از درِ اتوبوس و زنی که سوار می‌شود به پناهگاه ایستگاه، عابران و خیابان خیس توجه کن. ایستگاه اتوبوس دیده می‌شود، اما مسیر، مقصد و دلیل سفر زن معلوم نیست.']],
    [/double-decker bus by westminster|red double-decker bus/i,
      ['Connect the red double-decker bus to the bridge, river and Elizabeth Tower. The route display is too small to read reliably, so the bus route and destination remain unknown.','اتوبوس دوطبقهٔ قرمز را به پل، رودخانه و برج الیزابت وصل کن. نوشتهٔ مسیر اتوبوس برای خواندن دقیق کوچک است؛ مسیر و مقصد معلوم نیست.']],
    [/european city bike lane|cyclists in a european city/i,
      ['Trace the cyclists along the red bike lane, then compare it with the tram, cars, curb and brick buildings. The image does not establish the riders’ commute or destination.','مسیر دوچرخه‌سواران را در خط قرمز دنبال کن و آن را با تراموا، خودروها، جدول و ساختمان‌های آجری مقایسه کن. عکس رفت‌وآمد روزانه یا مقصد دوچرخه‌سواران را ثابت نمی‌کند.']],
    [/pedestrians crossing broadway|yellow taxis/i,
      ['Start with the pedestrians and white-striped crosswalk, then locate the Broadway sign, taxis and suspended signals. The destination and exact signal phase are not established.','از عابران و خط‌کشی سفید شروع کن و بعد تابلوی برادوی، تاکسی‌ها و چراغ‌های آویزان را پیدا کن. مقصد افراد و وضعیت دقیق چراغ از عکس معلوم نیست.']],
    [/city traffic waiting at an intersection|traffic jam/i,
      ['Describe the queue by separating taxis, other cars, the zebra crossing and traffic signals. A still image cannot establish the cause or duration of the congestion.','صف خودروها را با جداکردن تاکسی‌ها، خودروهای دیگر، خط‌کشی عابر و چراغ‌ها شرح بده. یک عکس ثابت دلیل یا مدت شلوغی را نشان نمی‌دهد.']],
    [/open car on a mountain road|mountain road trip/i,
      ['Locate the four adults relative to the windshield and rear seat, then describe the road and mountains. Smiles and outstretched arms may suggest excitement, but relationships, the driver and destination are not established.','جای چهار بزرگسال را نسبت به شیشهٔ جلو و صندلی عقب پیدا کن و بعد جاده و کوه‌ها را شرح بده. لبخند و دست‌های باز شاید هیجان را نشان دهد، اما نسبت افراد، راننده و مقصد قطعی نیست.']],
    [/\btrain\b|railway/i,
      ['Find the open door, luggage, clocks and roof. Describe visible positions first. Use first and then for your own or an imagined journey, not as proof that everyone has arrived or is boarding.','درِ باز، چمدان‌ها، ساعت‌ها و سقف را پیدا کن. اول جای قابل دیدن را شرح بده. برای سفر خودت یا یک سفر خیالی از first و then استفاده کن؛ آمدن یا سوار شدن همه را قطعی ندان.']],
    [/remote consultation/i,
      ['Separate the person on the laptop screen from the soft-focus foreground participant. Find clothing, the stethoscope, keys and flowers; the conversation and health concern remain unknown.','فرد داخل صفحهٔ لپ‌تاپ را از فرد محوِ جلوی تصویر جدا کن. لباس، گوشی پزشکی، کلیدها و گل‌ها را پیدا کن؛ موضوع گفت‌وگو و مشکل سلامتی معلوم نیست.']],
    [/hearing test/i,
      ['Move from the console and hands through the booth window to the headphones. Glass reflections do not add people. Describe equipment without guessing hearing ability or a test result.','از دستگاه و دست‌ها شروع کن و از پنجرهٔ اتاقک به هدفون برس. بازتاب شیشه فرد اضافه نیست. ابزار را شرح بده؛ توانایی شنوایی یا نتیجهٔ آزمون را حدس قطعی نزن.']],
    [/reading in bed/i,
      ['Find the open pages, hand, red pillow and warm light. Describe reading now; use your own or an invented routine for often, before and after. The light source and sleep quality are unknown.','صفحه‌های باز، دست، بالش قرمز و نور گرم را پیدا کن. خواندنِ همین لحظه را شرح بده؛ برای «اغلب»، «قبل» و «بعد» از عادت خودت یا یک مثال خیالی استفاده کن. منبع نور و کیفیت خواب معلوم نیست.']],
    [/fingertip check/i,
      ['Compare the bare finger with the gloved hands and device below it. Name the red mark as a visible mark; do not turn it into a proven procedure, contact or result.','انگشت بدون دستکش را با دست‌های دستکش‌پوش و دستگاهِ زیر آن مقایسه کن. نشان قرمز را فقط یک نشان قابل دیدن بنام؛ از آن مراحل کار، تماس یا نتیجهٔ قطعی نساز.']],
    [/home monitoring/i,
      ['Follow the cropped arm, cuff edge, tube and monitor panel. Only part of the device is visible; do not add a face, number, diagnosis or schedule outside the crop.','بازوی بریده‌شده در کادر، لبهٔ بازوبند، لوله و پنل دستگاه را دنبال کن. فقط بخشی از دستگاه دیده می‌شود؛ صورت، عدد، تشخیص بیماری یا برنامهٔ زمانی خارج از کادر نساز.']],
    [/ambulance transfer/i,
      ['Follow the two grips, straps, yellow frame and open doors. Use while for simultaneous positions. The photo does not prove movement direction, urgency or a medical outcome.','دو محل گرفتن، بندها، چارچوب زرد و درهای باز را دنبال کن. برای حالت‌های همزمان از while استفاده کن. عکس جهت حرکت، فوریت یا نتیجهٔ پزشکی را ثابت نمی‌کند.']],
    [/blood pressure/i,
      ['Locate the cuff, palm-up arm and connecting tube. Describe clothing and hand positions; no pressure reading or health result can be established from this view.','بازوبند، دست رو به بالا و لولهٔ متصل را پیدا کن. لباس و جای دست‌ها را شرح بده؛ عدد فشار یا نتیجهٔ سلامتی از این نما معلوم نیست.']],
    [/blood collection/i,
      ['Follow the supported arm, blue band and gloved hands. Describe visible parts of the equipment without inventing test results or a procedure. Treat blurred details as unknown.','بازوی تکیه‌داده، بند آبی و دست‌های دستکش‌پوش را پیدا کن. بخش‌های قابل دیدن ابزار را شرح بده؛ نتیجهٔ آزمایش یا مراحل انجام کار را نساز. جزئیات محوشده نامعلوم‌اند.']],
    [/imaging room|scanner/i,
      ['Describe the large equipment, the table and each person’s position. Distinguish visible placement from possible purpose; blurred faces and displays do not supply reliable details.','تجهیزات بزرگ، تخت و جای هر فرد را شرح بده. جای قابل دیدن را از هدف احتمالی جدا کن؛ چهره و نمایشگر محوشده جزئیات قابل اعتماد نمی‌دهند.']],
    [/veterinary/i,
      ['Find the animal’s posture, fur and paws, then the people’s hands and equipment. Do not assume ownership, breed, symptoms or the animal’s feelings.','حالت بدن حیوان، مو و پنجه‌هایش را پیدا کن؛ بعد به دست افراد و ابزار توجه کن. مالکیت، نژاد، علائم بیماری یا احساس حیوان را قطعی ندان.']],
    [/home visit/i,
      ['Start with the joined hands and gaze. Describe clothing and home objects; the image does not establish a family relationship or care duties.','از دست‌های به‌هم‌پیوسته و جهت نگاه شروع کن. لباس و وسایل خانه را شرح بده؛ عکس نسبت خانوادگی یا وظایف مراقبتی را ثابت نمی‌کند.']],
    [/private conversation/i,
      ['Describe the seating, pen and notebook. Separate a visible gesture from imagined words, professional roles and emotional states.','چیدمان صندلی‌ها، قلم و دفتر را شرح بده. حرکت قابل دیدن را از حرف‌های خیالی، عنوان شغلی و حالت احساسی جدا کن.']],
    [/gym|workout|fitness|yoga|resistance.band|guided movement/i,
      ['Find a body position, a piece of equipment and a location. Describe the visible moment; do not infer repetitions, breathing, ability or health effects. Check mirrors before counting people.','یک حالت بدن، یک وسیله و جای آن را پیدا کن. همین لحظهٔ قابل دیدن را شرح بده؛ تعداد تکرار، تنفس، توانایی یا نتیجهٔ سلامتی را حدس قطعی نزن. پیش از شمارش افراد، آینه‌ها را بررسی کن.']],
    [/nutrition|food consultation/i,
      ['Find the people, the chart and visible foods. Describe clothing, gestures and objects. Ask for an explanation without inventing dietary advice, qualifications or a diagnosis.','افراد، نمودار و خوراکی‌های قابل دیدن را پیدا کن. لباس، حرکت دست و اشیا را شرح بده. برای توضیح سؤال بپرس؛ توصیهٔ غذایی، صلاحیت شغلی یا تشخیص بیماری را از عکس نساز.']],
    [/clinical|clinic|emergency|examination|injection|pharmacy|dentist|dental|health/i,
      ['Find a person, a visible action and a nearby tool. Describe posture, clothing and equipment before guessing the purpose of the visit. A photo does not establish a diagnosis, treatment result or exact professional role.','یک فرد، یک حرکت قابل دیدن و ابزار نزدیک او را پیدا کن. اول حالت بدن، لباس و تجهیزات را شرح بده؛ عکس به‌تنهایی تشخیص بیماری، نتیجهٔ درمان یا عنوان دقیق شغلی را ثابت نمی‌کند.']],
    [/supermarket|grocery|market|store|shopping|checkout|return|exchange|takeout|bakery|florist|hardware|electronics/i,
      ['Look for a person, a product and the place where they meet. Describe the item and the visible action before guessing the purpose of the visit.','یک فرد، یک کالا و محل انجام کار را پیدا کن. اول خود کالا و حرکت قابل دیدن را شرح بده؛ هدف خرید، قیمت و نتیجهٔ معامله را از عکس حدس قطعی نزن.']],
    [/art|painting|studio/i,['Find a person, their tool and the work in front of them. Use position words to help a listener locate each detail.','یک فرد، ابزار کارش و چیزی را که جلوی اوست پیدا کن. با «پشت»، «کنار» و «جلوی» کمک کن شنونده جای هر جزئیات را در ذهنش ببیند.']],
    [/class|school|study|learning|lecture|seminar|library|writing|university|teacher|graduation/i,
      ['Look for the learning material, what a person is doing and how the space is arranged. The scene does not establish results or ability.','به وسایل یادگیری، کار قابل دیدن افراد و چیدمان محیط توجه کن. از عکس دربارهٔ نمره، توانایی یا نتیجهٔ یادگیری نتیجه‌گیری قطعی نکن.']],
    [/garden|park|beach|picnic|barbecue|campus|outdoor/i,
      ['Begin with the setting. Then find one person, an action and a nearby object. Avoid assuming relationships or the reason for the gathering.','اول محیط را پیدا کن؛ بعد یک فرد، یک حرکت و یک شیء نزدیک او را انتخاب کن. نسبت خانوادگی افراد یا دلیل جمع شدنشان را قطعی ندان.']],
    [/bank|post office|counter|repair|service|salon|tailor|laundry|courier|delivery/i,
      ['Find the person being helped, the tool or item and the visible interaction. Describe what is happening without inventing a completed result.','فرد مراجعه‌کننده، وسیله یا ابزار و تعامل قابل دیدن را پیدا کن. چیزی را که در همین لحظه دیده می‌شود شرح بده؛ نتیجهٔ نهایی خدمت را نساز.']]
  ];
  const parentId=h=>h?.presentation?.parentId??h?.parentId;
  const children=(hs,h)=>h?hs.filter(c=>parentId(c)===h.id):[];
  function path(hs,h){
    const result=[],seen=new Set();
    while(h&&!seen.has(h.id)){seen.add(h.id);result.unshift(h);h=hs.find(p=>p.id===parentId(h));}
    return result;
  }
  function lessonHint(lesson={},mode='explore',selected=null){
    const profile=themes.find(([pattern])=>pattern.test(lesson.title||''))?.[1]||['Find the people, objects and setting, then connect one visible action to a location.','افراد، اشیا و محیط را پیدا کن؛ بعد یک حرکت قابل دیدن را به جای آن در تصویر وصل کن.'];
    const hs=lesson.hotspots||[],current=hs.find(h=>h.id===selected?.id),owner=current&&(children(hs,current).length?current:hs.find(h=>h.id===parentId(current)));
    // Match the actual exploration tree, including people that can be opened
    // directly. Legacy "primary" flags are not presentation ownership.
    const candidates=hs.map((h,index)=>({h,index})).filter(({h})=>owner?parentId(h)===owner.id&&h.id!==current?.id:!parentId(h)||!parentId(hs.find(p=>p.id===parentId(h)))&&(children(hs,h).length||h.type==='person'&&root.EngBookHotspotScope?.resolve(hs.find(p=>p.id===parentId(h)),hs).kind==='region'));
    const targets=candidates.sort((a,b)=>(b.h.type==='person')-(a.h.type==='person')).slice(0,3);
    const modeNote={learn:['Read one sentence, then find its evidence in the picture. Make your own version before listening.','یک جمله را بخوان و نشانهٔ آن را در عکس پیدا کن. پیش از شنیدن نمونه، جملهٔ خودت را بساز.'],practice:['Try recalling the detail first. Use the practice hint only when you need it.','اول سعی کن جزئیات را از حافظه پیدا کنی. فقط وقتی نیاز داری از راهنمای خود تمرین استفاده کن.'],speak:['Say one visible detail clearly, add a location, then add a cautious interpretation if useful.','یک جزئیات قابل دیدن را واضح بگو، جای آن را اضافه کن و اگر لازم بود با احتیاط یک برداشت احتمالی بیان کن.'],talk:['Answer with a detail from the picture and ask a short follow-up question.','پاسخت را به یک جزئیات تصویر وصل کن و بعد یک سؤال کوتاه برای ادامهٔ گفتگو بپرس.']}[mode]||['Tap a dot, inspect its close-up details and build a short description.','یک نقطه را لمس کن، زیرجزئیاتش را ببین و یک توصیف کوتاه بساز.'];
    return {focus:fa()?profile[1]:profile[0],modeNote:fa()?modeNote[1]:modeNote[0],targets:mode==='practice'?[]:targets,current:mode==='practice'?null:current,path:mode==='practice'?[]:path(hs,current)};
  }
  function detailHint(h={},tab='word',row={}){
    let prompt;
    if(tab==='grammar'){
      if(row.evidence==='hypothetical')prompt=['This tense practises an imagined time. It is not an event established by the photo.','این زمان برای تمرین یک موقعیت خیالی است؛ عکس وقوع آن رویداد را ثابت نمی‌کند.'];
      else if(evidenceKind(h,row)==='question')prompt=['Build a question from the visible detail. Check the subject and auxiliary verb.','از همین جزئیات یک سؤال بساز. فاعل و فعل کمکی را بررسی کن.'];
      else prompt=['Identify the subject, then the action or description. Use the pattern to make one new sentence about this detail.','اول فاعل را مشخص کن، بعد فعل یا توصیف را. با الگوی بالا یک جملهٔ تازه دربارهٔ همین جزئیات بساز.'];
    }else if(tab==='phrase'||tab==='phrases')prompt=['Find the detail that this phrase describes. Keep the phrase together, then use it in a short sentence.','جزئیاتی را که این عبارت توصیف می‌کند پیدا کن. عبارت را یک‌جا یاد بگیر و بعد در یک جملهٔ کوتاه به کار ببر.'];
    else if(!h.en)prompt=['Find the visible details that support this text. Start with the setting, then add who or what is present and one action.','نشانه‌هایی را که متن به آن‌ها اشاره می‌کند در عکس پیدا کن. از محیط شروع کن؛ بعد بگو چه فرد یا چیزی آنجاست و چه حرکت قابل دیدنی دارد.'];
    else if(root.EngBookHotspotScope?.resolve(h).kind==='scene')prompt=['Describe the overall visible scene. Use the picture’s details to support your description; do not infer an exact time or everyone’s feelings.','نمای کلیِ قابل دیدن را توصیف کن و از جزئیات عکس برای توصیفت شاهد بیاور. زمان دقیق یا احساس همهٔ افراد را از عکس قطعی ندان.'];
    else if(root.EngBookHotspotScope?.resolve(h).kind==='region'||h.type==='group')prompt=['Describe the group or collection as a whole, then choose one member or item to add a detail. Give an exact number only when every member is clearly visible; one person’s action does not describe everyone.','اول گروه یا مجموعه را یک‌جا توصیف کن؛ بعد یک فرد یا شیء را برای افزودن جزئیات انتخاب کن. فقط وقتی همه واضح‌اند عدد دقیق بگو؛ کار یک نفر را به همه نسبت نده.'];
    else if(h.type==='animal')prompt=['Describe the animal’s visible posture, fur and body parts. Ownership, breed and feelings remain uncertain.','حالت بدن، مو و اجزای قابل دیدن حیوان را شرح بده. مالکیت، نژاد و احساسش را قطعی ندان.'];
    else if(h.type==='person')prompt=['Notice the person’s position, clothing and visible action. Relationships and exact feelings remain uncertain.','به جای فرد، لباس و حرکت قابل دیدنش توجه کن. نسبت خانوادگی و احساس دقیق او را قطعی بیان نکن.'];
    else if(h.type==='action')prompt=['Find who is doing the action and what is involved. Describe the visible moment with is/are + verb-ing.','ببین چه کسی حرکت را انجام می‌دهد و با چه چیزی در ارتباط است. برای حرکت همین لحظه از is/are + فعل ingدار استفاده کن.'];
    else if(/\b(?:hair|haired|ponytail|braids?|beard)\b/i.test(h.en||''))prompt=['Look at the visible colour, length and shape of the hair. Use only details you can distinguish.','رنگ، طول و حالت قابل دیدن مو را بررسی کن. فقط چیزی را بگو که در عکس واقعاً تشخیص می‌دهی.'];
    else if(h.type==='clothing'||h.categoryKey==='clothing'||/\b(?:shirts?|sweaters?|coats?|jackets?|dress(?:es)?|uniforms?|shoes?|aprons?|cardigans?|trousers|jeans|shorts|skirts?|boots?|hats?|caps?|scarves|scarf|blouses?)\b/i.test(h.en||''))prompt=['Name the item of clothing, then add a visible colour or pattern. Describe who is wearing it.','اسم لباس را بگو؛ بعد رنگ یا طرح قابل دیدنش را اضافه کن و بگو چه کسی آن را پوشیده است.'];
    else if(h.type==='setting'||h.categoryKey==='setting')prompt=['Find where this detail is. Add a location word and one visible feature of the surroundings.','جای این جزئیات را پیدا کن. یک واژهٔ مکانی و یک ویژگی قابل دیدن از محیط را اضافه کن.'];
    else prompt=['Name the object, notice one visible feature and locate it relative to a person or another object.','اسم شیء را بگو، یک ویژگی قابل دیدنش را انتخاب کن و جای آن را نسبت به فرد یا شیء دیگری توضیح بده.'];
    const kind=evidenceKind(h,row);
    return {prompt:fa()?prompt[1]:prompt[0],boundary:kind==='unsupported'?text('This claim is not established by the picture. Do not present it as a visible fact.','عکس این ادعا را ثابت نمی‌کند؛ آن را واقعیت قابل دیدن معرفی نکن.'):kind==='imagine'?text('This is imagined or personal language practice, separate from the visible photo.','این بخش تمرینِ روایت خیالی یا شخصی است و واقعیتِ قابل دیدن در عکس محسوب نمی‌شود.'):kind==='possible'?text('Use may, might or seems: this is a possible interpretation.','از may، might یا seems استفاده کن؛ این بخش برداشت احتمالی است.'):kind==='question'?text('This is a question for language practice, not a new fact about the picture.','این یک سؤال برای تمرین زبان است؛ واقعیت تازه‌ای دربارهٔ عکس نیست.'):text('Describe visible evidence. Keep guesses separate.','شواهد قابل دیدن را شرح بده و حدس را جدا بیان کن.')};
  }
  function evidenceKind(h={},row={}){
    if(row.evidence==='hypothetical'||['story','personal'].includes(row.claimClass)||/Imagined|memory|fiction|Your experience/i.test(row.kind||''))return 'imagine';
    if(row.evidence==='question'||row.evidence==='language-practice'||row.key==='question'||/Question practice/i.test(row.kind||''))return 'question';
    if(row.claimClass==='unsupported'||/Not established|Accuracy boundary/i.test(row.kind||''))return 'unsupported';
    if(row.evidence==='interpretation'||row.claimClass==='supported-inference'||/Possible|interpretation/i.test(row.kind||''))return 'possible';
    // Explicit row evidence takes precedence over the anchor used to locate it.
    if(row.evidence==='visible'||row.claimClass==='visible-fact'||/Visible fact|In this picture/i.test(row.kind||''))return 'visible';
    if(['story','personal'].includes(h.claimClass))return 'imagine';
    if(h.claimClass==='unsupported')return 'unsupported';
    return h.claimClass==='supported-inference'?'possible':'visible';
  }
  function inlineMarkup(h,tab='word',row={}){
    const hint=detailHint(h,tab,row),label=text('How to describe this','راهنمای توصیف این بخش');
    return `<button type="button" class="guide-detail-button" data-guide-action="detail" data-guide-prompt="${esc(hint.prompt)}" data-guide-boundary="${esc(hint.boundary)}" aria-label="${esc(label)}" title="${esc(label)}" aria-expanded="false">${hintIcon}</button>`;
  }
  function hintButton(){const label=text('Lesson hint','راهنمای درس');return `<button type="button" class="canvas-icon canvas-dark-glass guide-hint-button" data-guide-action="toggle" aria-label="${label}" title="${label}" aria-expanded="${panelOpen}">${hintIcon}</button>`;}
  function closeDetail(focus=false){
    root.document?.querySelector('.guide-detail-copy')?.remove();
    const button=detailTrigger;detailTrigger=null;
    if(button?.isConnected){button.setAttribute('aria-expanded','false');button.removeAttribute('aria-controls');if(focus)button.focus({preventScroll:true});}
  }
  function toggleDetail(button){
    const same=detailTrigger===button;closeDetail();closeWord();if(same)return;
    const host=button.closest('.canvas-detail-card,.learn-topic');if(!host)return;
    const copy=root.document.createElement('section');copy.className='guide-detail-copy';copy.id='guide-detail-copy';copy.setAttribute('role','region');copy.setAttribute('lang',language);copy.setAttribute('dir',fa()?'rtl':'ltr');copy.setAttribute('aria-label',button.getAttribute('aria-label'));
    copy.innerHTML=`<div class="guide-detail-heading"><b>${text('How to describe this','راهنمای توصیف این بخش')}</b><button type="button" data-guide-action="close-detail" aria-label="${text('Close detail hint','بستن راهنمای این بخش')}">×</button></div><p>${esc(button.dataset.guidePrompt)}</p><small>${esc(button.dataset.guideBoundary)}</small>${fa()?'<small>واژه‌های زیرخط‌دار انگلیسی را لمس کن تا معنی‌شان را ببینی.</small>':''}`;
    if(host.matches('.canvas-detail-card'))host.querySelector(':scope > header').after(copy);
    else host.querySelector('.learn-topic-actions').before(copy);
    detailTrigger=button;button.setAttribute('aria-expanded','true');button.setAttribute('aria-controls',copy.id);
  }
  function coachingSteps(lesson={},content={},mode='explore',selected=null){
    const hint=lessonHint(lesson,mode,selected),h=hint.current,recall=mode==='practice',kind=evidenceKind(h||{});
    const title=kind==='possible'?text('A possibility','یک احتمال'):kind==='imagine'?text('An imagined scene','یک روایت خیالی'):kind==='unsupported'?text('Not established','از عکس مشخص نیست'):text('A visible detail','یک جزئیات قابل دیدن');
    const frame=kind==='possible'?'The … might be …':kind==='imagine'?'Imagine that …':kind==='unsupported'?'The picture does not show whether …':'I can see …\nThe … is …';
    const authored=content.picturePractice?.hotspotsById?.[h?.id];
    const example=kind==='unsupported'?'':authored?.grammar?.find(r=>r.evidence===(kind==='possible'?'interpretation':kind==='imagine'?'hypothetical':'visible'))?.sentence||h?.example||'';
    const look=h?detailHint(h).prompt:hint.focus;
    const controls=text('People can be opened directly from their dots. An amber dot describes a group; choose a member to see their features. Back returns one level; × restores the scene. Drag the card if it covers a detail.','فرد را می‌توانی مستقیم از نقطهٔ خودش باز کنی. نقطهٔ طلایی برای گروه است؛ با انتخاب فرد، ویژگی‌های او را ببین. برگشت یک سطح بالا می‌رود و × نمای کلی را برمی‌گرداند. اگر کادر روی جزئیات افتاد، از عنوانش آن را بکش.');
    return {hint,steps:[
      {label:text('Look','ببین'),title:recall?text('Recall before revealing','پیش از دیدن جواب، به یاد بیاور'):text('Find one clear detail','یک جزئیات واضح پیدا کن'),copy:recall?hint.modeNote:look,targets:hint.targets,controls:mode==='explore'?controls:''},
      {label:text('Build','جمله بساز'),title:recall?text('Make your own attempt','اول خودت تلاش کن'):title,copy:recall?text('Read the task carefully. Try a word or sentence before using the exercise hint. Check the feedback after answering.','صورت تمرین را دقیق بخوان. پیش از راهنمای تمرین، یک کلمه یا جمله امتحان کن؛ بعد از پاسخ، بازخورد را بررسی کن.'):text('Name the detail, then add one visible action, colour or location. Keep an interpretation separate from what you can see.','جزئیات را نام ببر و یک حرکت، رنگ یا موقعیت قابل دیدن اضافه کن. برداشت احتمالی را از چیزی که می‌بینی جدا نگه دار.'),frame:recall?'':frame,example:recall?'':example,boundary:recall?'':detailHint(h||{}).boundary},
      {label:text('Say','بگو'),title:text('Describe it your way','با جملهٔ خودت توصیف کن'),copy:hint.modeNote,task:mode==='talk'?text('Give one picture-based answer, then ask: “What else can you see?”','یک پاسخ با شاهد از عکس بده و بعد بپرس: «دیگر چه چیزی می‌بینی؟»'):recall?text('After answering, say the corrected sentence aloud. Keep this separate from your recall attempt.','بعد از پاسخ، جملهٔ اصلاح‌شده را بلند بگو. این کار را جدا از تلاش اولیهٔ یادآوری انجام بده.'):text('Look back at the picture and say one short sentence without reading. Compare it with the model, then try again.','دوباره به عکس نگاه کن و یک جملهٔ کوتاه بدون خواندن بگو. با نمونه مقایسه کن و دوباره امتحان کن.')}
    ]};
  }
  function setStep(value){const n=Number(value);if(!Number.isInteger(n)||n<0||n>2)return false;guideStep=n;return true;}
  function panelMarkup(lesson,content,mode,selected=null){
    if(!panelOpen)return '';
    const key=`${lesson?.id??lesson?.lessonId}:${mode}:${mode==='practice'?'':selected?.id||''}`;
    if(key!==guideContext){guideContext=key;guideStep=0;}
    const coach=coachingSteps(lesson,content,mode,selected),step=coach.steps[guideStep];
    return `<aside class="guide-panel" role="region" aria-label="Lesson coaching hint"><header><h2 lang="${language}" dir="${fa()?'rtl':'ltr'}">${text('Picture coach','راهنمای تصویر')}</h2><button type="button" class="canvas-icon" data-guide-action="close" aria-label="${text('Close lesson hint','بستن راهنما')}">×</button></header><nav class="guide-steps" aria-label="${text('Coaching steps','قدم‌های راهنما')}">${coach.steps.map((s,i)=>`<button type="button" data-guide-step="${i}" aria-current="${i===guideStep?'step':'false'}" lang="${language}"><span>${i+1}</span>${esc(s.label)}</button>`).join('')}</nav>${coach.hint.path.length?`<p class="guide-path" lang="en" dir="ltr">${coach.hint.path.map(h=>esc(h.en)).join(' <span aria-hidden="true">›</span> ')}</p>`:''}<div class="guide-panel-copy" lang="${language}" dir="${fa()?'rtl':'ltr'}"><h3 tabindex="-1" data-guide-heading>${esc(step.title)}</h3><p>${esc(step.copy)}</p>${step.targets?.length?`<div class="guide-targets" aria-label="Picture details to explore">${step.targets.map(({h,index})=>`<button type="button" data-guide-target="${index}" lang="en" dir="ltr">${esc(h.en)} <span aria-hidden="true">↗</span></button>`).join('')}</div>`:''}${step.frame?`<div class="guide-frame"><b>${text('Start with this','از این الگو شروع کن')}</b><p lang="en" dir="ltr">${esc(step.frame).replace(/\n/g,'<br>')}</p></div>`:''}${step.example?`<details class="guide-model"><summary>${text('Compare with a model','مقایسه با یک نمونه')}</summary><p lang="en" dir="ltr">${wordsMarkup(step.example)}</p></details>`:''}${step.boundary?`<small class="guide-boundary">${esc(step.boundary)}</small>`:''}${step.task?`<div class="guide-task">${esc(step.task)}</div>`:''}${step.controls?`<details class="guide-controls"><summary>${text('Using the picture','کار با تصویر')}</summary><p>${esc(step.controls)}</p><p>${text('Drag the picture to move; pinch to zoom. Other group dots return when you close the detail.','عکس را بکش تا جابه‌جا شود؛ با دو انگشت زوم کن. با بستن جزئیات، نقطه‌های گروه‌های دیگر دوباره ظاهر می‌شوند.')}</p></details>`:''}</div><footer class="guide-step-actions"><button type="button" data-guide-step="${guideStep-1}" ${guideStep===0?'disabled':''}>${text('Back','قبلی')}</button><small>${guideStep+1} / 3</small>${guideStep<2?`<button type="button" data-guide-step="${guideStep+1}">${text('Next','بعدی')} →</button>`:`<button type="button" data-guide-action="close">${text('Try on picture','روی عکس امتحان کن')}</button>`}</footer><details class="guide-settings"><summary>${text('Language & word help','زبان و معنی واژه‌ها')}</summary>${languageControl()}${fa()?'<small lang="fa" dir="rtl">واژه‌های زیرخط‌دار انگلیسی را لمس کن تا معنی‌شان را ببینی. این راهنما ترجمهٔ کامل درس نیست.</small>':''}</details></aside>`;
  }
  function closeWord(focus=false){root.document?.querySelector('.guide-word-popover')?.remove();if(focus&&returnFocus?.isConnected)returnFocus.focus({preventScroll:true});returnFocus=null;}
  function setLanguage(value){
    if(!supported.includes(value))return false;language=value;closeWord();closeDetail();
    try{root.localStorage?.setItem(KEY,value);}catch{}
    root.render?.();root.document?.querySelector('[data-guide-language]')?.focus({preventScroll:true});return true;
  }
  function showWord(button){
    const word=button.dataset.guideWord,translation=meaning(word);if(!fa()||!translation)return;
    closeWord();returnFocus=button;
    const pop=root.document.createElement('aside');pop.className='guide-word-popover';pop.setAttribute('role','dialog');pop.setAttribute('aria-label','معنی واژه');
    pop.innerHTML=`<button type="button" data-guide-action="close-word" aria-label="بستن معنی واژه">×</button><b lang="en" dir="ltr">${esc(word)}</b><p lang="fa" dir="rtl">${esc(translation)}</p>${/[’']s$/i.test(word)?'<small lang="fa" dir="rtl">پسوند ’s معمولاً مالکیت را نشان می‌دهد.</small>':''}`;
    root.document.body.append(pop);
    const r=button.getBoundingClientRect(),w=pop.offsetWidth,h=pop.offsetHeight,pad=12,vw=root.innerWidth,vh=root.innerHeight;
    pop.style.left=`${Math.max(pad,Math.min(r.left,vw-w-pad))}px`;
    pop.style.top=`${Math.max(pad,Math.min(r.bottom+8+h<=vh-pad?r.bottom+8:r.top-h-8,vh-h-pad))}px`;
    pop.querySelector('button').focus({preventScroll:true});
  }
  root.document?.addEventListener('change',e=>{if(e.target.matches('[data-guide-language]'))setLanguage(e.target.value);});
  root.document?.addEventListener('click',e=>{
    const word=e.target.closest('[data-guide-word]');if(word){e.preventDefault();showWord(word);return;}
    const step=e.target.closest('[data-guide-step]');if(step){e.preventDefault();if(!step.disabled&&setStep(step.dataset.guideStep)){closeWord();root.render?.();root.document.querySelector('[data-guide-heading]')?.focus({preventScroll:true});}return;}
    const target=e.target.closest('[data-guide-target]');if(target){const index=Number(target.dataset.guideTarget),s=root.EngBookEventContext?.getRoot('state');if(!Number.isInteger(index)||index<0||!s?.lesson?.hotspots?.[index]||s.mode==='practice')return;e.preventDefault();panelOpen=false;closeWord();root.EngBookSceneCanvas?.select(index);return;}
    const actionButton=e.target.closest('[data-guide-action]'),action=actionButton?.dataset.guideAction;
    if(action==='detail'){e.preventDefault();toggleDetail(actionButton);return;}
    if(action==='close-detail'){e.preventDefault();closeDetail(true);return;}
    if(action==='close-word'){e.preventDefault();closeWord(true);return;}
    if(action==='toggle'||action==='close'){e.preventDefault();panelOpen=action==='toggle'?!panelOpen:false;closeWord();closeDetail();root.render?.();root.document.querySelector(panelOpen?'[data-guide-action="close"]':'[data-guide-action="toggle"]')?.focus({preventScroll:true});return;}
    if(!e.target.closest('.guide-word-popover'))closeWord();
  });
  root.document?.addEventListener('keydown',e=>{
    if(e.defaultPrevented||e.isComposing||e.key!=='Escape'||root.document.querySelector('dialog[open],[role="dialog"][aria-modal="true"]'))return;
    if(root.document.querySelector('.guide-word-popover')){e.preventDefault();e.stopImmediatePropagation();closeWord(true);}
    else if(root.document.querySelector('.guide-detail-copy')){e.preventDefault();e.stopImmediatePropagation();closeDetail(true);}
    else if(panelOpen){e.preventDefault();e.stopImmediatePropagation();panelOpen=false;root.render?.();root.document.querySelector('[data-guide-action="toggle"]')?.focus({preventScroll:true});}
  },true);
  root.addEventListener?.('resize',()=>closeWord());
  root.EngBookGuide=Object.freeze({language:()=>language,setLanguage,languageControl,wordsMarkup,meaning,lessonHint,detailHint,evidenceKind,coachingSteps,setStep,inlineMarkup,hintButton,panelMarkup,closeWord,closeDetail,reset:()=>{panelOpen=false;guideStep=0;guideContext=null;closeWord();closeDetail();}});
})(typeof window!=='undefined'?window:globalThis);
