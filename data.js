const CAT01 = {
  id: 1,
  title: "Home, Family & Relationships",
  subtitle: "28 image-verified lessons • A1–C2",
  lessons: [
    [1,"Romantic Couple at Sunset"],[2,"Best Friends"],[3,"Siblings Playing"],[4,"Parents with Children"],[5,"Grandparents with Grandchildren"],[6,"Mother with Newborn Baby"],[7,"Father Teaching Son to Ride Bike"],[8,"Single Parent Helping Children with Homework"],[9,"Elderly Couple in Love"],[10,"Long-Distance Video Call"],[11,"Group of Friends at Cafe"],[12,"College Friends at Party"],[13,"Wedding Ceremony"],[14,"Outdoor Wedding Celebration"],[15,"Family Dinner at Home"],[16,"Cooking in a Warm Home Kitchen"],[17,"Living Room — Family Time"],[18,"Living Room — Evening Chat"],[19,"Bedroom — Morning Routine"],[20,"Bedroom — Bedtime Story"],[21,"Garden BBQ — Summer Party"],[22,"Autumn Fire Pit Gathering"],[23,"Pet Care at Home — Brushing a Dog"],[24,"Laundry Day — Washing and Drying Clothes"],[25,"Household Cleaning — Sharing Chores at Home"],[26,"Family Picnic — Lunch in the Park"],[27,"Moving Day — Packing and Unpacking at Home"],[28,"Birthday Celebration — Cake and Candles at Home"]
  ].filter(([id])=>id<=6).map(([id,title])=>({id,title,image:`assets/images/lesson_${String(id).padStart(2,'0')}.jpg`,hotspots:[]}))
};

const H = (x,y,en,fa,pron,example,type='object',r=6,meta={})=>({x,y,en,fa,pron,example,type,r,...meta});
const map = {
1:[
    H(24.5,35.5,"man","مرد","/mæn/","The man is walking beside the woman.","person",8,{"id":"l01-man","level":"primary","reviewed":true,"evidenceType":"visible-person","inspectionGroups":["appearance","shirt","lower-body"],"hitW":44,"hitH":60}),
    H(35,38,"woman","زن","/ˈwʊmən/","The woman is walking beside the man.","person",8,{"id":"l01-woman","level":"primary","reviewed":true,"evidenceType":"visible-person","inspectionGroups":["appearance","dress","posture"],"hitW":44,"hitH":60}),
    H(33.7,55,"joined hands","دست‌های به‌هم‌گرفته","/dʒɔɪnd hændz/","Their hands are visibly joined as they walk.","action",6,{"id":"l01-joined-hands","level":"primary","reviewed":true,"evidenceType":"visible-action"}),
    H(13.5,64,"shoreline","خط ساحلی","/ˈʃɔrˌlaɪn/","The shoreline curves away along the left side of the scene.","setting",8,{"id":"l01-shoreline","level":"primary","reviewed":true,"evidenceType":"visible-setting","inspectionGroups":["ground"]}),
    H(6.5,20,"palm trees","درختان نخل","/pɑm triz/","Palm trees line the beach on the left.","nature",8,{"id":"l01-palm-trees","level":"primary","reviewed":true,"evidenceType":"visible-setting","inspectionGroups":["vegetation"]}),
    H(82,60,"ocean","اقیانوس","/ˈoʊʃən/","Calm open water fills the right side of the scene.","nature",10,{"id":"l01-ocean","level":"primary","reviewed":true,"evidenceType":"visible-setting","inspectionGroups":["water"]}),
    H(62.5,43.5,"low sun","خورشید پایین افق","/loʊ sʌn/","The sun sits very low above the water.","light",7,{"id":"l01-low-sun","level":"primary","reviewed":true,"evidenceType":"visible-light","inspectionGroups":["sky-light"]}),
    H(64,60,"sunset reflection","بازتاب غروب","/ˈsʌnˌsɛt rɪˈflɛkʃən/","A bright vertical reflection stretches across the water.","light",7,{"id":"l01-sunset-reflection","level":"primary","reviewed":true,"evidenceType":"visible-light","inspectionGroups":["reflection"]}),
    H(26.3,12,"dark wavy hair","موهای تیره و موج‌دار","/dɑrk ˈweɪvi hɛr/","The man has dark wavy hair.","appearance",5,{"id":"l01-man-dark-wavy-hair","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-man","detailGroup":"appearance","attributeGroup":"hair"}),
    H(28.5,18.5,"man's soft smile","لبخند ملایم مرد","/mænz sɔft smaɪl/","The man has a soft visible smile.","appearance",5,{"id":"l01-man-soft-smile","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-man","detailGroup":"appearance","attributeGroup":"expression"}),
    H(28.2,16.2,"man's downward gaze","نگاه رو به پایین مرد","/mænz ˈdaʊnwɚd ɡeɪz/","The man is looking downward toward the woman.","appearance",5,{"id":"l01-man-downward-gaze","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-man","detailGroup":"appearance","attributeGroup":"gaze"}),
    H(25.5,33.5,"button-up shirt","پیراهن دکمه‌دار","/ˈbʌtən ʌp ʃɝt/","The man is wearing a long-sleeved button-up shirt.","clothing",6,{"id":"l01-man-button-up-shirt","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-man","detailGroup":"shirt","attributeGroup":"top-clothing"}),
    H(23.9,31,"pale shirt color","رنگ بسیار روشن پیراهن","/peɪl ʃɝt ˈkʌlər/","The shirt appears white to very pale blue in the warm sunset light.","clothing",5,{"id":"l01-man-pale-shirt-color","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-man","detailGroup":"shirt","attributeGroup":"color"}),
    H(18.8,34.5,"long sleeves","آستین‌های بلند","/lɔŋ slivz/","The shirt has long sleeves.","clothing",5,{"id":"l01-man-long-sleeves","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-man","detailGroup":"shirt","attributeGroup":"sleeves"}),
    H(18.5,45.5,"rolled sleeves","آستین‌های تاخورده","/roʊld slivz/","The sleeves are rolled to the forearms.","clothing",5,{"id":"l01-man-rolled-sleeves","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-man","detailGroup":"shirt","attributeGroup":"sleeves"}),
    H(25.5,25.3,"open collar","یقه باز","/ˈoʊpən ˈkɑlər/","The shirt collar is open at the neck.","clothing",4,{"id":"l01-man-open-collar","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-man","detailGroup":"shirt","attributeGroup":"collar"}),
    H(28,32,"chest pocket","جیب سینه","/tʃɛst ˈpɑkət/","A rectangular chest pocket is visible on the shirt.","clothing",4,{"id":"l01-man-chest-pocket","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-man","detailGroup":"shirt","attributeGroup":"garment-detail"}),
    H(24.6,62.5,"gray-taupe trousers","شلوار خاکستری مایل به تاپ","/ɡreɪ toʊp ˈtraʊzɚz/","The man is wearing gray-taupe trousers.","clothing",6,{"id":"l01-man-gray-taupe-trousers","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-man","detailGroup":"lower-body","attributeGroup":"lower-clothing"}),
    H(24.5,74,"rolled trouser cuffs","پاچه‌های تاخورده شلوار","/roʊld ˈtraʊzɚ kʌfs/","The trouser legs are rolled to about mid-calf.","clothing",5,{"id":"l01-man-rolled-trouser-cuffs","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-man","detailGroup":"lower-body","attributeGroup":"hem"}),
    H(24,92,"man's bare feet","پاهای برهنه مرد","/mænz bɛr fit/","The man is barefoot at the waterline.","body",5,{"id":"l01-man-bare-feet","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-man","detailGroup":"lower-body","attributeGroup":"footwear"}),
    H(32.4,21,"brown hair","موهای قهوه‌ای","/braʊn hɛr/","The woman has brown hair.","appearance",5,{"id":"l01-woman-brown-hair","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-woman","detailGroup":"appearance","attributeGroup":"hair"}),
    H(32,20,"loosely pulled-back hair","موهای شل جمع‌شده","/ˈlusli pʊld bæk hɛr/","Her hair is pulled back loosely, with soft strands around her face.","appearance",5,{"id":"l01-woman-loose-hair-style","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-woman","detailGroup":"appearance","attributeGroup":"hair-style"}),
    H(33.6,25.3,"woman's soft smile","لبخند ملایم زن","/ˈwʊmənz sɔft smaɪl/","The woman is visibly smiling.","appearance",5,{"id":"l01-woman-soft-smile","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-woman","detailGroup":"appearance","attributeGroup":"expression"}),
    H(33,23.7,"woman's downward gaze","نگاه رو به پایین زن","/ˈwʊmənz ˈdaʊnwɚd ɡeɪz/","Her gaze is directed downward rather than toward the camera.","appearance",5,{"id":"l01-woman-downward-gaze","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-woman","detailGroup":"appearance","attributeGroup":"gaze"}),
    H(34.3,30.3,"delicate necklace","گردنبند ظریف","/ˈdɛləkət ˈnɛkləs/","A delicate necklace is visible at her neckline.","accessory",4,{"id":"l01-woman-delicate-necklace","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-woman","detailGroup":"appearance","attributeGroup":"accessory"}),
    H(35.1,46,"white dress","پیراهن سفید","/waɪt drɛs/","The woman is wearing a white dress.","clothing",6,{"id":"l01-woman-white-dress","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-woman","detailGroup":"dress","attributeGroup":"garment"}),
    H(34.4,35.5,"V-neckline","یقه هفت","/ˈvi ˌnɛkˌlaɪn/","The dress has a visible V-shaped neckline.","clothing",4,{"id":"l01-woman-v-neckline","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-woman","detailGroup":"dress","attributeGroup":"neckline"}),
    H(37.7,31.2,"sleeveless design","طراحی بدون آستین","/ˈslivləs dɪˈzaɪn/","The dress is sleeveless.","clothing",4,{"id":"l01-woman-sleeveless-design","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-woman","detailGroup":"dress","attributeGroup":"sleeves"}),
    H(37.4,30.5,"thin shoulder straps","بندهای باریک روی شانه","/θɪn ˈʃoʊldɚ stræps/","Thin shoulder straps are visible on the dress.","clothing",4,{"id":"l01-woman-thin-shoulder-straps","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-woman","detailGroup":"dress","attributeGroup":"straps"}),
    H(34.3,40,"gathered bodice","بالاتنه چین‌دار","/ˈɡæðɚd ˈbɑdɪs/","The bodice has gathered fabric.","clothing",4,{"id":"l01-woman-gathered-bodice","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-woman","detailGroup":"dress","attributeGroup":"fabric-structure"}),
    H(34.8,46.8,"gathered waist","کمر چین‌دار","/ˈɡæðɚd weɪst/","The dress gathers at the waist.","clothing",4,{"id":"l01-woman-gathered-waist","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-woman","detailGroup":"dress","attributeGroup":"waist"}),
    H(35,68,"flowing skirt","دامن روان و آزاد","/ˈfloʊɪŋ skɝt/","The lower part of the dress falls in a loose flowing skirt.","clothing",5,{"id":"l01-woman-flowing-skirt","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-woman","detailGroup":"dress","attributeGroup":"skirt"}),
    H(35.3,78,"maxi length","قد ماکسی","/ˈmæksi lɛŋθ/","The dress extends to ankle or maxi length.","clothing",4,{"id":"l01-woman-maxi-length","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-woman","detailGroup":"dress","attributeGroup":"length"}),
    H(36.7,91.5,"woman's bare feet","پاهای برهنه زن","/ˈwʊmənz bɛr fit/","The woman is barefoot in the shallow water.","body",5,{"id":"l01-woman-bare-feet","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-woman","detailGroup":"posture","attributeGroup":"footwear"}),
    H(29.7,23,"head on shoulder","سر روی شانه","/hɛd ɑn ˈʃoʊldɚ/","The woman rests her head against the man’s shoulder.","action",5,{"id":"l01-woman-head-on-shoulder","level":"detail","reviewed":true,"evidenceType":"visible-action","parentId":"l01-woman","detailGroup":"posture","attributeGroup":"body-language"}),
    H(31.4,36.5,"hand on his arm","دست روی بازوی مرد","/hænd ɑn hɪz ɑrm/","One of her hands rests on or holds his arm.","action",5,{"id":"l01-woman-hand-on-arm","level":"detail","reviewed":true,"evidenceType":"visible-action","parentId":"l01-woman","detailGroup":"posture","attributeGroup":"interaction"}),
    H(31.4,29.5,"leaning posture","حالت تکیه‌داده","/ˈlinɪŋ ˈpɑstʃɚ/","Her upper body leans toward the man.","body",5,{"id":"l01-woman-leaning-posture","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-woman","detailGroup":"posture","attributeGroup":"body-language"}),
    H(12,82,"wet reflective sand","شن خیس و بازتابنده","/wɛt rɪˈflɛktɪv sænd/","Wet sand reflects the warm sunset light.","setting",6,{"id":"l01-wet-reflective-sand","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-shoreline","detailGroup":"ground","attributeGroup":"surface"}),
    H(38,85,"shallow water","آب کم‌عمق","/ˈʃæloʊ ˈwɔtɚ/","Their feet are partly in very shallow water.","setting",6,{"id":"l01-shallow-water","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-shoreline","detailGroup":"ground","attributeGroup":"water-depth"}),
    H(50,85,"thin white foam","کف سفید نازک موج","/θɪn waɪt foʊm/","A thin white line of foam marks the shore break.","detail",5,{"id":"l01-thin-white-foam","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-shoreline","detailGroup":"ground","attributeGroup":"surface-water"}),
    H(18,83,"foot impressions","جای پا روی شن","/fʊt ɪmˈprɛʃənz/","Faint foot impressions are visible on the wet sand.","detail",5,{"id":"l01-foot-impressions","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-shoreline","detailGroup":"ground","attributeGroup":"surface-mark"}),
    H(14,61,"curving shore","ساحل منحنی","/ˈkɝvɪŋ ʃɔr/","The shore curves away toward the left background.","setting",5,{"id":"l01-curving-shore","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-shoreline","detailGroup":"ground","attributeGroup":"shape"}),
    H(8.5,72,"gray-beige sand","شن خاکستری-بژ","/ɡreɪ beɪʒ sænd/","The wet sand reads as gray-beige under the warm light.","appearance",5,{"id":"l01-gray-beige-sand","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-shoreline","detailGroup":"ground","attributeGroup":"color"}),
    H(12,38,"coastal vegetation","پوشش گیاهی ساحلی","/ˈkoʊstəl ˌvɛdʒəˈteɪʃən/","Darker coastal vegetation runs behind the palms.","nature",5,{"id":"l01-coastal-vegetation","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-palm-trees","detailGroup":"vegetation","attributeGroup":"vegetation"}),
    H(6.7,32,"dark palm silhouettes","سیلوئت‌های تیره نخل","/dɑrk pɑm ˌsɪluˈɛts/","Some palms appear as dark silhouettes against the warm sky.","nature",5,{"id":"l01-dark-palm-silhouettes","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-palm-trees","detailGroup":"vegetation","attributeGroup":"light-contrast"}),
    H(82,45.5,"flat horizon","افق صاف","/flæt həˈraɪzən/","The sea meets a nearly flat horizon.","setting",5,{"id":"l01-flat-horizon","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-ocean","detailGroup":"water","attributeGroup":"spatial-line"}),
    H(80,73,"gentle waves","موج‌های ملایم","/ˈdʒɛntəl weɪvz/","Small gentle waves are visible across the sea surface.","nature",5,{"id":"l01-gentle-waves","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-ocean","detailGroup":"water","attributeGroup":"water-state"}),
    H(76,64,"smooth reflective water","آب صاف و بازتابنده","/smuð rɪˈflɛktɪv ˈwɔtɚ/","The water surface looks smooth and reflective.","nature",5,{"id":"l01-smooth-reflective-water","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-ocean","detailGroup":"water","attributeGroup":"texture"}),
    H(76,28,"orange-pink sky","آسمان نارنجی-صورتی","/ˈɔrɪndʒ pɪŋk skaɪ/","Orange and pink tones dominate the sky near the horizon.","light",5,{"id":"l01-orange-pink-sky","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-low-sun","detailGroup":"sky-light","attributeGroup":"color"}),
    H(58,34,"golden light","نور طلایی","/ˈɡoʊldən laɪt/","Warm low-angle golden light fills the scene.","light",5,{"id":"l01-golden-light","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-low-sun","detailGroup":"sky-light","attributeGroup":"light-quality"}),
    H(64,54,"vertical light path","مسیر عمودی نور","/ˈvɝtɪkəl laɪt pæθ/","The sun creates a bright vertical path on the water.","light",5,{"id":"l01-vertical-light-path","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-sunset-reflection","detailGroup":"reflection","attributeGroup":"reflection-shape"}),
    H(65,69,"gold water highlights","درخشش‌های طلایی روی آب","/ɡoʊld ˈwɔtɚ ˈhaɪˌlaɪts/","Gold highlights shimmer on the water beneath the sun.","light",5,{"id":"l01-gold-water-highlights","level":"detail","reviewed":true,"evidenceType":"visible-detail","parentId":"l01-sunset-reflection","detailGroup":"reflection","attributeGroup":"color-light"})
  ],
2:[H(36,48,"curly-haired woman","زن با موهای فر","/ˈkɝli hɛrd ˈwʊmən/","The curly-haired woman is laughing and gesturing with both hands.","person",9,{"id":"l02-curly-haired-woman","level":"primary"}),H(61,47,"blonde woman","زن موطلایی","/blɑnd ˈwʊmən/","The blonde woman is laughing beside her friend.","person",9,{"id":"l02-blonde-woman","level":"primary"}),H(34,88,"coffee cup","فنجان قهوه","/ˈkɔfi kʌp/","A white coffee cup and saucer sit in front of the woman on the left.","object",6,{"id":"l02-coffee-cup","level":"primary"}),H(62,86,"tall coffee","قهوه در لیوان بلند","/tɔl ˈkɔfi/","A tall milky coffee sits in front of the woman on the right.","object",6,{"id":"l02-tall-coffee","level":"primary"}),H(50,92,"pastries","شیرینی‌ها","/ˈpeɪstriz/","Several pastries are arranged on a white plate between the women.","object",7,{"id":"l02-pastries","level":"detail","parentId":"l02-wooden-table"}),H(8,49,"window","پنجره","/ˈwɪndoʊ/","Strong natural daylight enters through the large window on the left.","setting",7,{"id":"l02-window","level":"primary"}),H(52,96,"wooden table","میز چوبی","/ˈwʊdən ˈteɪbəl/","The women are sitting at a dark rustic wooden table.","setting",8,{"id":"l02-wooden-table","level":"primary"}),H(74,19,"brick wall","دیوار آجری","/brɪk wɔl/","An exposed brick wall fills much of the café background.","setting",7,{"id":"l02-brick-wall","level":"primary"}),H(12,68,"potted plant","گیاه گلدانی","/ˈpɑtɪd plænt/","A terracotta potted plant stands beside the window.","detail",6,{"id":"l02-potted-plant","level":"primary"}),H(42,23,"string lights","چراغ‌های ریسه‌ای","/strɪŋ laɪts/","Warm string lights glow against the brick wall.","light",7,{"id":"l02-string-lights","level":"primary"})],
3:[H(48,57,"two children running","دو کودک در حال دویدن","/tu ˈtʃɪldrən ˈrʌnɪŋ/","Two children are running together along the park path.","group",9,{"id":"l03-two-children-running","level":"primary"}),H(41,57,"child on the left","کودک سمت چپ","/tʃaɪld ɑn ðə lɛft/","The child on the left is running in a bright blue T-shirt.","person",8,{"id":"l03-child-on-the-left","level":"detail","parentId":"l03-two-children-running"}),H(55,57,"child on the right","کودک سمت راست","/tʃaɪld ɑn ðə raɪt/","The child on the right is running in a yellow dress.","person",8,{"id":"l03-child-on-the-right","level":"detail","parentId":"l03-two-children-running"}),H(49,58,"joined hands","دست‌های به‌هم‌گرفته","/dʒɔɪnd hændz/","The two children are holding hands while they run.","action",5,{"id":"l03-joined-hands","level":"detail","parentId":"l03-two-children-running"}),H(50,27,"playground structure","سازه زمین بازی","/ˈpleɪˌɡraʊnd ˈstrʌktʃɚ/","A large playground structure stands behind the children.","setting",9,{"id":"l03-playground-structure","level":"primary"}),H(35,47,"slide","سرسره","/slaɪd/","A green slide is visible behind the children.","object",7,{"id":"l03-slide","level":"primary"}),H(85,37,"fountain spray","فواره","/ˈfaʊntən spreɪ/","White fountain spray is visible on the right side of the park.","detail",7,{"id":"l03-fountain-spray","level":"primary"}),H(13,47,"flower border","حاشیه گل‌ها","/ˈflaʊɚ ˌbɔrdɚ/","A colorful flower border runs behind the playground.","detail",7,{"id":"l03-flower-border","level":"primary"}),H(10,54,"park bench","نیمکت پارک","/pɑrk bɛntʃ/","A bench is visible on the left side of the park.","detail",7,{"id":"l03-park-bench","level":"primary"}),H(70,84,"park path","مسیر پارک","/pɑrk pæθ/","The children are running along a tan park path.","setting",10,{"id":"l03-park-path","level":"primary"}),H(18,75,"green lawn","چمن سبز","/ɡrin lɔn/","Green lawn fills much of the foreground.","setting",9,{"id":"l03-green-lawn","level":"primary"}),H(56,45,"red hair bows","پاپیون‌های قرمز مو","/rɛd hɛr boʊz/","Red bows are tied in the child’s braids.","appearance",5,{"id":"l03-red-hair-bows","level":"primary"}),H(8,14,"warm sunlight","نور گرم خورشید","/wɔrm ˈsʌnˌlaɪt/","Warm sunlight enters from the upper left.","light",7,{"id":"l03-warm-sunlight","level":"primary"})],
4:[H(50,48,"five people on the sofa","پنج نفر روی مبل","/faɪv ˈpipəl ɑn ðə ˈsoʊfə/","Five people are sitting closely together on the cream sofa.","group",9,{"id":"l04-five-people","level":"primary"}),H(39,45,"adult woman","زن بزرگسال","/əˈdʌlt ˈwʊmən/","The adult woman in a cream sweater is holding the smaller girl and laughing.","person",9,{"id":"l04-adult-woman","level":"detail","parentId":"l04-five-people"}),H(31,48,"young girl on the left","دختر خردسال سمت چپ","/jʌŋ ɡɝl ɑn ðə lɛft/","The young girl on the left is sitting partly on the woman’s lap and smiling.","person",8,{"id":"l04-young-girl-on-the-left","level":"detail","parentId":"l04-five-people"}),H(51,43,"adult man in the center","مرد بزرگسال وسط","/əˈdʌlt mæn ɪn ðə ˈsɛntɚ/","The adult man in the center is wearing a light blue shirt and laughing.","person",9,{"id":"l04-adult-man-in-the-center","level":"detail","parentId":"l04-five-people"}),H(57,49,"young girl on the right","دختر خردسال سمت راست","/jʌŋ ɡɝl ɑn ðə raɪt/","The second young girl is sitting close to the men and laughing.","person",8,{"id":"l04-young-girl-on-the-right","level":"detail","parentId":"l04-five-people"}),H(64,42,"young adult man","مرد جوان","/jʌŋ əˈdʌlt mæn/","The young adult man on the right is wearing a pale blue shirt and smiling toward the group.","person",9,{"id":"l04-young-adult-man","level":"detail","parentId":"l04-five-people"}),H(39,68,"cream sectional sofa","مبل ال‌شکل کرم","/krim ˈsɛkʃənəl ˈsoʊfə/","The five people are sitting closely together on a large cream sectional sofa.","setting",10,{"id":"l04-cream-sectional-sofa","level":"primary"}),H(21,58,"mustard cushion","کوسن خردلی","/ˈmʌstɚd ˈkʊʃən/","A mustard-yellow cushion adds a warm accent on the sofa.","detail",7,{"id":"l04-mustard-cushion","level":"primary"}),H(82,43,"fireplace","شومینه","/ˈfaɪɚˌpleɪs/","A white fireplace forms the right side of the living-room background.","setting",8,{"id":"l04-fireplace","level":"primary"}),H(70,16,"framed photographs","عکس‌های قاب‌شده","/freɪmd ˈfoʊtəˌɡræfs/","Several framed photographs are arranged on the shelves and mantel.","detail",6,{"id":"l04-framed-photographs","level":"primary"}),H(88,24,"potted plants","گیاهان گلدانی","/ˈpɑtɪd plænts/","Green potted plants decorate the room near the window and fireplace.","detail",7,{"id":"l04-potted-plants","level":"primary"}),H(8,24,"large window","پنجره بزرگ","/lɑrdʒ ˈwɪndoʊ/","Strong warm daylight enters from the large window on the left.","setting",8,{"id":"l04-large-window","level":"primary"}),H(12,18,"warm window light","نور گرم پنجره","/wɔrm ˈwɪndoʊ laɪt/","Warm natural light makes the living room bright and soft.","light",8,{"id":"l04-warm-window-light","level":"primary"})],
5:[H(25,40,"older man","مرد سالمند","/ˈoʊldɚ mæn/","The older man stands behind the rope swing and holds both ropes.","person",8,{"id":"l05-older-man","level":"primary"}),H(28,49,"child on the swing","کودک روی تاب","/tʃaɪld ɑn ðə swɪŋ/","A very young barefoot child sits on the wooden swing and holds the ropes.","person",8,{"id":"l05-child-on-the-swing","level":"detail","parentId":"l05-rope-swing"}),H(42,42,"standing older woman","زن سالمند ایستاده","/ˈstændɪŋ ˈoʊldɚ ˈwʊmən/","A standing older woman in white smiles while watching the children.","person",8,{"id":"l05-standing-older-woman","level":"primary"}),H(48,53,"girl in a pink dress","دختر با لباس صورتی","/ɡɝl ɪn ə pɪŋk drɛs/","A young girl in a pale pink dress stands smiling near the center.","person",8,{"id":"l05-girl-in-a-pink-dress","level":"primary"}),H(56,58,"kneeling older woman","زن سالمند زانو زده","/ˈnilɪŋ ˈoʊldɚ ˈwʊmən/","A gray-haired older woman kneels on the grass and gestures toward the children.","person",8,{"id":"l05-kneeling-older-woman","level":"primary"}),H(68,56,"boy beside the picnic table","پسر کنار میز پیک‌نیک","/bɔɪ bɪˈsaɪd ðə ˈpɪknɪk ˈteɪbəl/","A young boy in a white shirt and tan shorts faces the kneeling woman and girl.","person",8,{"id":"l05-boy-beside-the-picnic-table","level":"primary"}),H(28,26,"rope swing","تاب طنابی","/roʊp swɪŋ/","A simple wooden rope swing hangs from the tree on the left.","object",7,{"id":"l05-rope-swing","level":"primary"}),H(37,79,"picnic blanket","زیرانداز پیک‌نیک","/ˈpɪknɪk ˈblæŋkət/","A light picnic blanket with bread or pastry lies on the grass.","object",7,{"id":"l05-picnic-blanket","level":"primary"}),H(14,70,"picnic basket","سبد پیک‌نیک","/ˈpɪknɪk ˈbæskət/","A woven picnic basket sits beside the blanket.","object",7,{"id":"l05-picnic-basket","level":"primary"}),H(82,47,"picnic table","میز پیک‌نیک","/ˈpɪknɪk ˈteɪbəl/","A wooden picnic table holds food, glasses, and an orange-colored drink.","setting",8,{"id":"l05-picnic-table","level":"primary"}),H(78,20,"rose-covered arch","طاق پوشیده از رز","/ˈroʊz ˌkʌvɚd ɑrtʃ/","A large arch covered with pale roses frames the right side of the garden.","detail",8,{"id":"l05-rose-covered-arch","level":"primary"}),H(11,50,"hydrangeas","گل‌های هورتانسیا","/haɪˈdreɪndʒəz/","Blue hydrangea flowers fill the left side of the garden.","detail",7,{"id":"l05-hydrangeas","level":"primary"}),H(88,50,"sunflowers","آفتابگردان‌ها","/ˈsʌnˌflaʊɚz/","Bright sunflowers stand behind the picnic table on the right.","detail",7,{"id":"l05-sunflowers","level":"primary"}),H(39,25,"bubbles","حباب‌ها","/ˈbʌbəlz/","Small bubbles are visible in the warm light around the group.","detail",6,{"id":"l05-bubbles","level":"primary"})],
6:[H(70,38,"adult woman","زن بزرگسال","/əˈdʌlt ˈwʊmən/","The adult woman looks down at the infant with a calm smile.","person",8,{"id":"l06-adult-woman","level":"primary"}),H(59,61,"sleeping infant","نوزاد در حال خواب","/ˈslipɪŋ ˈɪnfənt/","A very small infant rests against the woman with eyes closed.","person",8,{"id":"l06-sleeping-infant","level":"primary"}),H(54,78,"supporting arms","بازوهای حمایت‌کننده","/səˈpɔrtɪŋ ɑrmz/","Both arms support the infant’s head and body.","action",7,{"id":"l06-supporting-arms","level":"detail","parentId":"l06-sleeping-infant"}),H(18,61,"cream armchair","صندلی راحتی کرم","/krim ˈɑrmˌtʃɛr/","A cream upholstered armchair stands near the bright window.","object",7,{"id":"l06-cream-armchair","level":"primary"}),H(45,31,"books on the shelf","کتاب‌های روی قفسه","/bʊks ɑn ðə ʃɛlf/","Several books are arranged upright on the shelf.","detail",6,{"id":"l06-books-on-the-shelf","level":"primary"}),H(61,18,"framed pictures","عکس‌های قاب‌شده","/freɪmd ˈpɪktʃɚz/","Several framed pictures are visible on the shelves behind the woman.","detail",6,{"id":"l06-framed-pictures","level":"primary"}),H(90,58,"wooden crib","تخت نوزاد چوبی","/ˈwʊdən krɪb/","A wooden crib is visible on the right side of the room.","object",8,{"id":"l06-wooden-crib","level":"primary"}),H(9,33,"sheer curtains","پرده‌های حریر","/ʃɪr ˈkɝtənz/","Sheer curtains diffuse the daylight from the window.","detail",7,{"id":"l06-sheer-curtains","level":"primary"}),H(15,17,"soft daylight","نور نرم روز","/sɔft ˈdeɪˌlaɪt/","Soft natural daylight enters from the left.","light",7,{"id":"l06-soft-daylight","level":"primary"}),H(75,55,"light blue cardigan","ژاکت بافت آبی روشن","/laɪt blu ˈkɑrdɪɡən/","The woman is wearing a light blue textured knit cardigan.","appearance",6,{"id":"l06-light-blue-cardigan","level":"primary"}),H(61,66,"white baby clothes","لباس سفید نوزاد","/waɪt ˈbeɪbi kloʊðz/","The infant is wearing a white long-sleeved outfit or wrap.","appearance",6,{"id":"l06-white-baby-clothes","level":"detail","parentId":"l06-sleeping-infant"})],
7:[H(54,42,"adult man","مرد بزرگسال","/əˈdʌlt mæn/","The adult man runs beside the bicycle and looks toward the child.","person",8,{"id":"l07-adult-man","level":"primary"}),H(43,55,"young child","کودک خردسال","/jʌŋ tʃaɪld/","The young child grips the handlebars and concentrates on riding.","person",8,{"id":"l07-young-child","level":"primary"}),H(42,71,"red bicycle","دوچرخه قرمز","/rɛd ˈbaɪsɪkəl/","A small red child’s bicycle is moving along the residential street.","object",8,{"id":"l07-red-bicycle","level":"primary"}),H(42,45,"helmet","کلاه ایمنی","/ˈhɛlmɪt/","The child is wearing a black helmet with yellow stripes.","appearance",7,{"id":"l07-helmet","level":"detail","parentId":"l07-young-child"}),H(43,66,"knee pads","زانوبندهای ایمنی","/ni pædz/","Black knee pads are visible on the child.","appearance",6,{"id":"l07-knee-pads","level":"detail","parentId":"l07-young-child"}),H(48,49,"supporting hand","دست حمایت‌کننده","/səˈpɔrtɪŋ hænd/","The adult keeps one hand near the child’s upper back or shoulder.","action",7,{"id":"l07-supporting-hand","level":"detail","parentId":"l07-adult-man"}),H(50,83,"residential street","خیابان مسکونی","/ˌrɛzɪˈdɛnʃəl strit/","A wide paved residential street runs through the neighborhood.","setting",8,{"id":"l07-residential-street","level":"primary"}),H(13,40,"suburban houses","خانه‌های حومه‌ای","/səˈbɝbən ˈhaʊzɪz/","Detached houses and front lawns line the street.","setting",7,{"id":"l07-suburban-houses","level":"primary"}),H(48,19,"mature trees","درختان بزرگ","/məˈtʃʊr triz/","Large mature trees arch over the street.","setting",7,{"id":"l07-mature-trees","level":"primary"}),H(80,57,"distant person","فرد دوردست","/ˈdɪstənt ˈpɝsən/","A distant person is visible on the right sidewalk.","person",5,{"id":"l07-distant-person","level":"primary"}),H(42,88,"long shadows","سایه‌های بلند","/lɔŋ ˈʃædoʊz/","Long shadows stretch across the road in warm low-angle light.","light",6,{"id":"l07-long-shadows","level":"detail","parentId":"l07-residential-street"})],
8:[H(64,48,"adult woman","زن بزرگسال","/əˈdʌlt ˈwʊmən/","The adult woman holds a pen and looks toward the boy’s work.","person",8,{"id":"l08-adult-woman","level":"primary"}),H(43,55,"boy writing","پسر در حال نوشتن","/bɔɪ ˈraɪtɪŋ/","The boy leans over a notebook and writes.","person",8,{"id":"l08-boy-writing","level":"primary"}),H(82,55,"girl with open book","دختر با کتاب باز","/ɡɝl wɪð ən ˈoʊpən bʊk/","The girl sits beside an open book and follows the activity.","person",8,{"id":"l08-girl-with-open-book","level":"primary"}),H(50,61,"open workbook","کتاب کار باز","/ˈoʊpən ˈwɝkˌbʊk/","An open workbook lies in the central schoolwork area on the table.","object",7,{"id":"l08-open-workbook","level":"primary"}),H(54,61,"worksheet","برگه تمرین","/ˈwɝkˌʃit/","A worksheet is visible among the school papers on the table.","object",6,{"id":"l08-worksheet","level":"detail","parentId":"l08-open-workbook"}),H(70,72,"calculator","ماشین حساب","/ˈkælkjəˌleɪtɚ/","A calculator lies on the wooden table.","object",7,{"id":"l08-calculator","level":"primary"}),H(38,68,"juice glass","لیوان نوشیدنی","/dʒus ɡlæs/","A glass with orange/yellow juice is visible near the boy.","object",6,{"id":"l08-juice-glass","level":"primary"}),H(29,28,"refrigerator drawings","نقاشی‌های روی یخچال","/rɪˈfrɪdʒəˌreɪtɚ ˈdrɔɪŋz/","Children’s drawings, notes, and magnets cover the refrigerator.","detail",8,{"id":"l08-refrigerator-drawings","level":"primary"}),H(49,28,"spice shelves","قفسه ادویه","/spaɪs ʃɛlvz/","Open shelving with jars and spices stands beside the refrigerator.","setting",6,{"id":"l08-spice-shelves","level":"primary"}),H(50,42,"coffee maker","قهوه‌ساز","/ˈkɔfi ˌmeɪkɚ/","A coffee maker is visible behind the table.","object",5,{"id":"l08-coffee-maker","level":"primary"}),H(88,30,"bright window","پنجره روشن","/braɪt ˈwɪndoʊ/","Strong warm natural light enters through the window on the right.","light",8,{"id":"l08-bright-window","level":"primary"}),H(89,40,"potted plants","گیاهان گلدانی","/ˈpɑtɪd plænts/","Small potted plants sit on the window sill.","detail",6,{"id":"l08-potted-plants","level":"primary"}),H(11,75,"construction toys","اسباب‌بازی‌های ساختنی","/kənˈstrʌkʃən tɔɪz/","Colorful construction blocks are spread on the floor in the adjacent room.","detail",7,{"id":"l08-construction-toys","level":"primary"}),H(27,82,"backpack","کوله‌پشتی","/ˈbækˌpæk/","A backpack rests by a chair near the table.","object",6,{"id":"l08-backpack","level":"primary"})],
9:[H(50,50,"seated pair on the bench","دو فرد نشسته روی نیمکت","/ˈsitɪd pɛr ɑn ðə bɛntʃ/","Two older adults are sitting closely together on the park bench.","group",9,{"id":"l09-seated-pair","level":"primary"}),H(39,51,"older woman","زن سالمند","/ˈoʊldɚ ˈwʊmən/","The older woman leans her head against the man’s shoulder.","person",8,{"id":"l09-older-woman","level":"detail","parentId":"l09-seated-pair"}),H(58,49,"older man","مرد سالمند","/ˈoʊldɚ mæn/","The older man sits calmly beside the woman on the bench.","person",8,{"id":"l09-older-man","level":"detail","parentId":"l09-seated-pair"}),H(50,76,"clasped hands","دست‌های درهم‌گرفته","/klæspt hændz/","Their hands are joined and layered together in the center.","action",8,{"id":"l09-clasped-hands","level":"detail","parentId":"l09-seated-pair"}),H(50,82,"wooden park bench","نیمکت چوبی پارک","/ˈwʊdən pɑrk bɛntʃ/","A weathered wooden bench with dark metal arms supports the pair.","setting",8,{"id":"l09-wooden-park-bench","level":"primary"}),H(58,24,"flat cap","کلاه تخت","/flæt kæp/","The man is wearing a brown flat cap.","appearance",6,{"id":"l09-flat-cap","level":"primary"}),H(34,60,"burgundy cardigan","ژاکت زرشکی","/ˈbɝɡəndi ˈkɑrdɪɡən/","The woman is wearing a deep burgundy knitted cardigan.","appearance",6,{"id":"l09-burgundy-cardigan","level":"detail","parentId":"l09-seated-pair"}),H(63,56,"plaid jacket","کت چهارخانه","/plæd ˈdʒækɪt/","The man is wearing a rust-brown plaid jacket.","appearance",6,{"id":"l09-plaid-jacket","level":"detail","parentId":"l09-seated-pair"}),H(48,91,"fallen leaves","برگ‌های ریخته","/ˈfɔlən livz/","Orange and golden leaves cover the ground around the bench.","detail",7,{"id":"l09-fallen-leaves","level":"primary"}),H(48,10,"orange tree canopy","سایه‌بان درخت نارنجی","/ˈɔrɪndʒ tri ˈkænəpi/","A large orange-leaved tree forms a canopy behind the couple.","setting",7,{"id":"l09-orange-tree-canopy","level":"primary"}),H(31,38,"distant walkers","رهگذران دوردست","/ˈdɪstənt ˈwɔkɚz/","A few distant walkers are visible in the soft-focus park background.","person",5,{"id":"l09-distant-walkers","level":"primary"}),H(20,34,"green park lawn","چمن سبز پارک","/ɡrin pɑrk lɔn/","A broad green lawn stretches behind the seated pair.","setting",8,{"id":"l09-green-park-lawn","level":"primary"}),H(52,14,"warm autumn light","نور گرم پاییزی","/wɔrm ˈɔtəm laɪt/","Soft warm light illuminates the autumn scene.","light",7,{"id":"l09-warm-autumn-light","level":"detail","parentId":"l09-orange-tree-canopy"})],
10:[H(31,45,"woman on the bed","زن روی تخت","/ˈwʊmən ɑn ðə bɛd/","The woman sits cross-legged on the bed and smiles toward the laptop.","person",8,{"id":"l10-woman-on-the-bed","level":"primary"}),H(66,63,"remote man on screen","مرد روی صفحه","/rɪˈmoʊt mæn ɑn skrin/","A young man is visible on the laptop screen, smiling.","person",8,{"id":"l10-remote-man-on-screen","level":"detail","parentId":"l10-laptop"}),H(66,69,"laptop","لپ‌تاپ","/ˈlæpˌtɑp/","An open silver-gray laptop rests on the white duvet.","object",8,{"id":"l10-laptop","level":"primary"}),H(66,57,"raised hands on screen","دست‌های بالا رفته روی صفحه","/reɪzd hændz ɑn skrin/","The remote participant raises both open hands near the camera.","action",7,{"id":"l10-raised-hands-on-screen","level":"detail","parentId":"l10-laptop"}),H(12,79,"mug","ماگ","/mʌɡ/","A mug sits on a stack of books at the lower left.","object",6,{"id":"l10-mug","level":"primary"}),H(17,88,"stack of books","دسته کتاب‌ها","/stæk əv bʊks/","Several books are stacked beside the bed.","object",6,{"id":"l10-stack-of-books","level":"primary"}),H(50,10,"string lights","چراغ‌های ریسه‌ای","/strɪŋ laɪts/","Warm string lights run across the wall and window.","light",8,{"id":"l10-string-lights","level":"primary"}),H(8,25,"photo display","نمایش عکس‌ها","/ˈfoʊtoʊ dɪˈspleɪ/","A display of photos or prints is visible on the left wall.","detail",6,{"id":"l10-photo-display","level":"primary"}),H(69,25,"evening window","پنجره در غروب","/ˈivnɪŋ ˈwɪndoʊ/","Cool blue light is visible outside the window.","light",8,{"id":"l10-evening-window","level":"primary"}),H(57,30,"potted plant","گیاه گلدانی","/ˈpɑtɪd plænt/","A potted plant sits on the window sill.","detail",6,{"id":"l10-potted-plant","level":"primary"}),H(92,58,"bookshelf","قفسه کتاب","/ˈbʊkˌʃɛlf/","A bookshelf stands on the right side of the room.","setting",6,{"id":"l10-bookshelf","level":"primary"}),H(60,84,"white duvet","روتختی سفید","/waɪt duˈveɪ/","White bedding and pillows fill the bed around the laptop.","setting",6,{"id":"l10-white-duvet","level":"primary"})],
11:[H(28,47,'friend','دوست','/frend/','A friend is talking at the café table.','person',7),H(45,45,'friend','دوست','/frend/','Another friend is listening.','person',7),H(62,45,'friend','دوست','/frend/','The group is laughing together.','person',7),H(48,66,'coffee','قهوه','/ˈkɔːfi/','Coffee is served on the table.','food',5),H(53,72,'café table','میز کافه','/kæˈfeɪ ˌteɪbəl/','Four friends are sitting around the table.','object',10)],
12:[H(52,48,'friends','دوستان','/frendz/','A group of friends is celebrating.','person',12),H(42,72,'pizza','پیتزا','/ˈpiːtsə/','Pizza is on the table.','food',6),H(57,20,'party lights','چراغ مهمانی','/ˈpɑːrti laɪts/','Party lights hang across the room.','object',9),H(70,36,'balloon','بادکنک','/bəˈluːn/','A balloon is part of the decoration.','object',5),H(24,69,'sofa','مبل','/ˈsoʊfə/','Some guests are sitting near a sofa.','object',8)],
13:[H(44,47,'bride','عروس','/braɪd/','The bride is wearing a white wedding dress.','person',8),H(54,46,'groom','داماد','/ɡruːm/','The groom is standing opposite the bride.','person',8),H(49,28,'flower arch','طاق گل','/ˈflaʊər ɑːrtʃ/','A flower arch frames the couple.','object',10),H(22,56,'guest','مهمان','/ɡest/','Wedding guests are seated nearby.','person',8),H(72,59,'chair','صندلی','/tʃer/','Chairs are arranged for the ceremony.','object',8)],
14:[H(47,47,'bride','عروس','/braɪd/','The bride is standing in the garden.','person',8),H(58,45,'groom','داماد','/ɡruːm/','The groom is beside her.','person',8),H(50,26,'floral arch','طاق گل','/ˈflɔːrəl ɑːrtʃ/','A large floral arch stands behind them.','object',10),H(24,57,'guests','مهمانان','/ɡests/','Guests are seated on both sides.','person',10),H(44,55,'bouquet','دسته گل','/buːˈkeɪ/','The bride is holding a bouquet.','object',5)],
15:[H(50,44,'family','خانواده','/ˈfæməli/','The family is gathered for dinner.','person',13),H(49,67,'dinner table','میز شام','/ˈdɪnər ˌteɪbəl/','The dinner table is full of food.','object',14),H(41,68,'plate','بشقاب','/pleɪt/','Several plates are on the table.','object',5),H(54,16,'lamp','چراغ','/læmp/','A hanging lamp lights the table.','object',6),H(83,45,'window','پنجره','/ˈwɪndoʊ/','The window shows the evening outside.','object',8)],
16:[H(63,44,'woman','زن','/ˈwʊmən/','The woman is preparing food.','person',8),H(46,67,'cutting board','تخته برش','/ˈkʌtɪŋ bɔːrd/','Vegetables are on the cutting board.','object',7),H(32,63,'vegetables','سبزیجات','/ˈvedʒtəbəlz/','Fresh vegetables are on the counter.','food',8),H(72,43,'pot','قابلمه','/pɑːt/','A pot is on the stove.','object',6),H(73,61,'kitchen island','جزیره آشپزخانه','/ˈkɪtʃən ˌaɪlənd/','The kitchen island is used for food preparation.','object',12),H(20,32,'window','پنجره','/ˈwɪndoʊ/','Sunlight enters through the window.','object',7)],
17:[H(37,54,'family','خانواده','/ˈfæməli/','The family is sitting together.','person',12),H(72,42,'television','تلویزیون','/ˈteləˌvɪʒən/','The television is on.','object',8),H(40,68,'sofa','مبل','/ˈsoʊfə/','They are sitting on a sofa.','object',12),H(61,72,'coffee table','میز جلو مبلی','/ˈkɔːfi ˌteɪbəl/','A coffee table stands in front of them.','object',8),H(88,52,'plant','گیاه','/plænt/','A tall plant is near the window.','nature',6)],
18:[H(43,49,'man','مرد','/mæn/','The man is talking on the sofa.','person',8),H(57,49,'woman','زن','/ˈwʊmən/','The woman is listening.','person',8),H(50,67,'sofa','مبل','/ˈsoʊfə/','They are sitting on a gray sofa.','object',12),H(22,38,'floor lamp','آباژور ایستاده','/flɔːr læmp/','A floor lamp is beside the sofa.','object',7),H(77,26,'bookshelf','قفسه کتاب','/ˈbʊkʃelf/','Books and objects are on the shelves.','object',9)],
19:[H(51,42,'woman','زن','/ˈwʊmən/','The woman is making the bed.','person',8),H(54,64,'bed','تخت','/bed/','The bed has light-colored bedding.','object',15),H(65,60,'pillow','بالش','/ˈpɪloʊ/','Several pillows are on the bed.','object',6),H(18,38,'wardrobe','کمد لباس','/ˈwɔːrdroʊb/','A wardrobe stands on the left.','object',8),H(83,65,'rug','فرش','/rʌɡ/','A rug covers part of the floor.','object',7)],
20:[H(44,48,'mother','مادر','/ˈmʌðər/','The mother is sitting beside the child.','person',8),H(60,49,'child','کودک','/tʃaɪld/','The child is in bed.','person',7),H(52,58,'book','کتاب','/bʊk/','They are looking at a book.','object',6),H(54,70,'bed','تخت','/bed/','The child is lying in bed.','object',13),H(82,57,'lamp','چراغ','/læmp/','A small lamp is on beside the bed.','object',5)],
21:[H(49,46,'family and friends','خانواده و دوستان','/ˈfæməli ænd frendz/','Adults and children are gathered in the garden.','person',15),H(54,67,'picnic table','میز پیک‌نیک','/ˈpɪknɪk ˌteɪbəl/','Food is arranged on the picnic table.','object',10),H(73,58,'barbecue grill','باربیکیو','/ˈbɑːrbɪkjuː ɡrɪl/','A barbecue grill is set up nearby.','object',7),H(31,69,'food','غذا','/fuːd/','There is food on the outdoor table.','food',8),H(87,26,'tree','درخت','/triː/','Trees surround the garden.','nature',8)],
22:[H(50,48,'friends','دوستان','/frendz/','Friends are sitting around the fire.','person',14),H(50,67,'fire pit','آتشدان','/ˈfaɪər pɪt/','A fire is burning in the fire pit.','object',9),H(69,73,'dog','سگ','/dɔːɡ/','A dog is lying near the group.','animal',7),H(50,16,'string lights','چراغ‌های ریسه‌ای','/strɪŋ laɪts/','String lights hang over the gathering.','object',10),H(26,67,'chair','صندلی','/tʃer/','Several chairs surround the fire pit.','object',7)],
23:[H(43,43,'woman','زن','/ˈwʊmən/','The woman is brushing the dog.','person',8),H(58,50,'dog','سگ','/dɔːɡ/','The dog is sitting calmly.','animal',9),H(49,55,'brush','برس','/brʌʃ/','She is holding a grooming brush.','object',5),H(75,68,'dog bowl','ظرف غذای سگ','/dɔːɡ boʊl/','A dog bowl is on the floor.','object',6),H(24,70,'toy','اسباب‌بازی','/tɔɪ/','A colorful dog toy is on the rug.','object',6)],
24:[H(54,43,'woman','زن','/ˈwʊmən/','The woman is loading the washing machine.','person',8),H(37,55,'washing machine','ماشین لباسشویی','/ˈwɑːʃɪŋ məˌʃiːn/','The washing machine door is open.','object',10),H(55,70,'laundry basket','سبد لباس','/ˈlɔːndri ˌbæskɪt/','A laundry basket is full of clothes.','object',8),H(82,55,'drying rack','بند رخت','/ˈdraɪɪŋ ræk/','Clothes are hanging on a drying rack.','object',9),H(63,57,'clothes','لباس‌ها','/kloʊðz/','She is holding clothes.','object',6)],
25:[H(32,42,'woman','زن','/ˈwʊmən/','The woman is wiping the counter.','person',8),H(69,45,'man','مرد','/mæn/','The man is cleaning the floor.','person',8),H(35,60,'cloth','دستمال','/klɔːθ/','She is using a cleaning cloth.','object',5),H(73,65,'vacuum cleaner','جاروبرقی','/ˈvækjuːm ˌkliːnər/','A vacuum cleaner is being used on the floor.','object',7),H(30,68,'countertop','کانتر آشپزخانه','/ˈkaʊntərˌtɑːp/','The countertop is being cleaned.','object',9)],
26:[H(48,51,'family','خانواده','/ˈfæməli/','The family is sitting on a picnic blanket.','person',14),H(49,70,'picnic blanket','زیرانداز پیک‌نیک','/ˈpɪknɪk ˌblæŋkɪt/','A blanket is spread on the grass.','object',12),H(29,61,'picnic basket','سبد پیک‌نیک','/ˈpɪknɪk ˌbæskɪt/','A picnic basket is beside the group.','object',7),H(54,61,'food','غذا','/fuːd/','Food is arranged on the blanket.','food',7),H(78,30,'tree','درخت','/triː/','Tall trees provide shade.','nature',8)],
27:[H(67,41,'man','مرد','/mæn/','The man is carrying a box.','person',8),H(36,52,'woman','زن','/ˈwʊmən/','The woman is unpacking near the boxes.','person',8),H(53,58,'cardboard box','جعبه مقوایی','/ˈkɑːrdˌbɔːrd bɑːks/','Several cardboard boxes are in the room.','object',10),H(23,69,'sofa','مبل','/ˈsoʊfə/','A sofa is partly surrounded by boxes.','object',9),H(81,49,'picture frame','قاب عکس','/ˈpɪktʃər freɪm/','A framed picture is being moved.','object',6)],
28:[H(49,40,'birthday cake','کیک تولد','/ˈbɜːrθdeɪ keɪk/','A birthday cake is in the center.','food',8),H(49,47,'candles','شمع‌ها','/ˈkændəlz/','Candles are burning on the cake.','object',6),H(49,24,'balloons','بادکنک‌ها','/bəˈluːnz/','Colorful balloons decorate the room.','object',10),H(29,61,'gift','هدیه','/ɡɪft/','A wrapped gift is on the table.','object',6),H(63,44,'family','خانواده','/ˈfæməli/','The family is gathered around the cake.','person',14)]
};
CAT01.lessons.forEach(l=>l.hotspots=map[l.id]||[]);

window.ENGBOOK_LESSON_01_ATTRIBUTE_SCAN = {
  "version": "v0.55",
  "lessonId": 1,
  "imageSha256": "1f3cad67a0eece6f17cfb4c4ab22f685389bef3c2991fef2641f258d185c179b",
  "policy": "person-attribute-first + grouped detail inspection",
  "totalHotspots": 52,
  "primaryHotspots": 8,
  "detailHotspots": 44,
  "personDetailHotspots": 29,
  "groups": {
    "man": [
      "appearance",
      "shirt",
      "lower-body"
    ],
    "woman": [
      "appearance",
      "dress",
      "posture"
    ],
    "shoreline": [
      "ground"
    ],
    "palm trees": [
      "vegetation"
    ],
    "ocean": [
      "water"
    ],
    "low sun": [
      "sky-light"
    ],
    "sunset reflection": [
      "reflection"
    ]
  },
  "rule": "Primary hotspots identify major subjects/regions. Detail hotspots expose hair, face, gaze, garment type, garment color/structure, sleeves, collar, pocket, trousers, hem, footwear, posture, contact, surfaces, water, vegetation, horizon, waves, and light only when directly supported by the image."
};

window.ENGBOOK_LESSON_01_ANCHORS = [
  {"key":"pair","label":"two adults","group":"People","weight":4,"terms":["two adults","man and woman","two people","pair"],"x":30,"y":37,"evidenceType":"visible-anchor","reviewed":true,"relations":[]},
  {"key":"man-hair","label":"dark wavy hair","group":"Appearance","weight":2,"terms":["dark wavy hair","wavy hair","dark hair"],"x":26.3,"y":12,"evidenceType":"visible-detail","reviewed":true,"relations":[]},
  {"key":"man-shirt","label":"light button-up shirt","group":"Appearance","weight":3,"terms":["button-up shirt","light shirt","pale shirt","long-sleeved shirt"],"x":25.5,"y":33.5,"evidenceType":"visible-detail","reviewed":true,"relations":[]},
  {"key":"man-sleeves","label":"rolled sleeves","group":"Appearance","weight":2,"terms":["rolled sleeves","sleeves rolled","rolled to the forearms"],"x":18.5,"y":45.5,"evidenceType":"visible-detail","reviewed":true,"relations":[]},
  {"key":"man-trousers","label":"gray-taupe trousers","group":"Appearance","weight":3,"terms":["gray-taupe trousers","grey-taupe trousers","rolled trousers","rolled-up trousers"],"x":24.6,"y":62.5,"evidenceType":"visible-detail","reviewed":true,"relations":[]},
  {"key":"man-bare-feet","label":"man's bare feet","group":"Appearance","weight":2,"terms":["man is barefoot","man's bare feet"],"x":24,"y":92,"evidenceType":"visible-detail","reviewed":true,"relations":[]},
  {"key":"woman-hair","label":"brown hair","group":"Appearance","weight":2,"terms":["brown hair","hair pulled back","loosely pulled-back hair"],"x":32.4,"y":21,"evidenceType":"visible-detail","reviewed":true,"relations":[]},
  {"key":"white-dress","label":"white V-neck maxi dress","group":"Appearance","weight":4,"terms":["white dress","V-neck dress","maxi dress","ankle-length dress"],"x":35.1,"y":46,"evidenceType":"visible-detail","reviewed":true,"relations":[]},
  {"key":"dress-straps","label":"thin shoulder straps","group":"Appearance","weight":2,"terms":["thin shoulder straps","shoulder straps","sleeveless dress"],"x":37.4,"y":30.5,"evidenceType":"visible-detail","reviewed":true,"relations":[]},
  {"key":"dress-waist","label":"gathered waist","group":"Appearance","weight":2,"terms":["gathered waist","gathered bodice"],"x":34.8,"y":46.8,"evidenceType":"visible-detail","reviewed":true,"relations":[]},
  {"key":"necklace","label":"delicate necklace","group":"Appearance","weight":2,"terms":["delicate necklace","necklace"],"x":34.3,"y":30.3,"evidenceType":"visible-detail","reviewed":true,"relations":[]},
  {"key":"woman-bare-feet","label":"woman's bare feet","group":"Appearance","weight":2,"terms":["woman is barefoot","woman's bare feet"],"x":36.7,"y":91.5,"evidenceType":"visible-detail","reviewed":true,"relations":[]},
  {"key":"joined-hands","label":"joined hands","group":"Action","weight":5,"terms":["holding hands","hold hands","joined hands","hand in hand"],"x":33.7,"y":55,"evidenceType":"visible-action","reviewed":true,"relations":[]},
  {"key":"head-shoulder","label":"head on shoulder","group":"Action","weight":4,"terms":["head on his shoulder","head against his shoulder","rests her head on his shoulder"],"x":29.7,"y":23,"evidenceType":"visible-action","reviewed":true,"relations":[]},
  {"key":"hand-arm","label":"hand on his arm","group":"Action","weight":3,"terms":["holds his arm","hand on his arm","holding his arm"],"x":31.4,"y":36.5,"evidenceType":"visible-action","reviewed":true,"relations":[]},
  {"key":"beach","label":"beach / shoreline","group":"Setting","weight":5,"terms":["beach","shoreline","shore","waterline"],"x":13.5,"y":64,"evidenceType":"visible-setting","reviewed":true,"relations":[]},
  {"key":"shallow-water","label":"shallow water","group":"Setting","weight":4,"terms":["shallow water","very shallow water","waterline"],"x":38,"y":85,"evidenceType":"visible-setting","reviewed":true,"relations":[]},
  {"key":"wet-sand","label":"wet reflective sand","group":"Detail","weight":3,"terms":["wet sand","reflective sand","wet reflective sand"],"x":12,"y":82,"evidenceType":"visible-detail","reviewed":true,"relations":[]},
  {"key":"foam","label":"thin white foam","group":"Detail","weight":2,"terms":["thin white foam","white foam","shore break"],"x":50,"y":85,"evidenceType":"visible-detail","reviewed":true,"relations":[]},
  {"key":"footprints","label":"foot impressions","group":"Detail","weight":2,"terms":["footprints","foot impressions","faint footprints"],"x":18,"y":83,"evidenceType":"visible-detail","reviewed":true,"relations":[]},
  {"key":"palms","label":"palm trees","group":"Setting","weight":4,"terms":["palm tree","palm trees","palm-lined"],"x":6.5,"y":20,"evidenceType":"visible-setting","reviewed":true,"relations":[]},
  {"key":"vegetation","label":"coastal vegetation","group":"Setting","weight":2,"terms":["coastal vegetation","dark vegetation"],"x":12,"y":38,"evidenceType":"visible-setting","reviewed":true,"relations":[]},
  {"key":"ocean","label":"ocean / sea","group":"Setting","weight":5,"terms":["ocean","sea","open water","calm sea"],"x":82,"y":60,"evidenceType":"visible-setting","reviewed":true,"relations":[]},
  {"key":"horizon","label":"flat horizon","group":"Setting","weight":2,"terms":["flat horizon","horizon"],"x":82,"y":45.5,"evidenceType":"visible-setting","reviewed":true,"relations":[]},
  {"key":"waves","label":"gentle waves","group":"Setting","weight":2,"terms":["gentle waves","small waves"],"x":80,"y":73,"evidenceType":"visible-setting","reviewed":true,"relations":[]},
  {"key":"sunset","label":"low sun / sunset","group":"Light","weight":5,"terms":["low sun","sunset","setting sun","sun is setting"],"x":62.5,"y":43.5,"evidenceType":"visible-light","reviewed":true,"relations":[]},
  {"key":"sky","label":"orange-pink sky","group":"Light","weight":3,"terms":["orange-pink sky","orange sky","pink sky","warm sky"],"x":76,"y":28,"evidenceType":"visible-light","reviewed":true,"relations":[]},
  {"key":"reflection","label":"sunset reflection","group":"Light","weight":4,"terms":["sunset reflection","reflection on the water","reflection across the sea","vertical reflection","vertical light path"],"x":64,"y":60,"evidenceType":"visible-light","reviewed":true,"relations":[]}
];
window.ENGBOOK_LESSON_01_EVIDENCE_PROFILE = {
  cautionTerms:['may','might','could','seems','seem','appears','appear','likely','probably','suggests','suggest'],
  directRules:[
    {"id":"l01-walking","label":"walking at the waterline","terms":["are walking","walking barefoot","walking on the beach","walking through the shallow water","strolling along the shoreline","walking side by side"],"supportKeys":["pair","beach","shallow-water"],"reason":"Both adults are visibly captured mid-step at the shallow edge of the beach.","repair":"Two adults are walking barefoot through shallow water at the beach.","score":98,"reviewed":true,"claimType":"visible-fact"},
    {"id":"l01-hands","label":"holding hands","terms":["holding hands","hold hands","joined hands","hand in hand"],"supportKeys":["joined-hands","pair"],"reason":"Their hands are visibly joined.","repair":"They are holding hands as they walk.","score":99,"reviewed":true,"claimType":"visible-fact"},
    {"id":"l01-man-appearance","label":"man clothing and appearance","terms":["dark wavy hair","button-up shirt","light shirt","pale shirt","long sleeves","rolled sleeves","open collar","chest pocket","gray-taupe trousers","rolled trouser cuffs","man's bare feet"],"supportKeys":["man-hair","man-shirt","man-sleeves","man-trousers","man-bare-feet"],"reason":"These hair, shirt, trouser, sleeve, and footwear details are directly visible on the man.","repair":"Describe the man’s dark wavy hair, light button-up shirt, rolled sleeves, gray-taupe trousers, and bare feet.","score":98,"reviewed":true,"claimType":"visible-fact"},
    {"id":"l01-woman-appearance","label":"woman clothing and appearance","terms":["brown hair","white dress","V-neck","V neckline","sleeveless dress","thin shoulder straps","gathered waist","gathered bodice","maxi dress","delicate necklace","woman's bare feet"],"supportKeys":["woman-hair","white-dress","dress-straps","dress-waist","necklace","woman-bare-feet"],"reason":"These hair, dress, neckline, strap, waist, necklace, and footwear details are directly visible on the woman.","repair":"Describe her brown hair, white V-neck maxi dress, thin straps, gathered waist, delicate necklace, and bare feet.","score":98,"reviewed":true,"claimType":"visible-fact"},
    {"id":"l01-body-language","label":"visible body contact","terms":["head on his shoulder","head against his shoulder","rests her head","holds his arm","hand on his arm","leans into him","leaning toward him"],"supportKeys":["head-shoulder","hand-arm","joined-hands","pair"],"reason":"Her head-to-shoulder contact, hand on his arm, and leaning posture are visible body-language cues.","repair":"She rests her head against his shoulder and holds his arm while they walk.","score":98,"reviewed":true,"claimType":"visible-fact"},
    {"id":"l01-foreground","label":"shoreline foreground","terms":["wet reflective sand","thin white foam","shallow water","footprints","foot impressions","curving shoreline","gray-beige sand"],"supportKeys":["beach","shallow-water","wet-sand","foam","footprints"],"reason":"The wet sand, shallow water, white foam, faint foot impressions, and shoreline curve are directly visible.","repair":"Wet reflective sand, shallow water, a thin foam line, and faint foot impressions fill the foreground.","score":98,"reviewed":true,"claimType":"visible-fact"},
    {"id":"l01-background","label":"coastal background","terms":["palm trees","coastal vegetation","dark palm silhouettes","ocean","calm sea","flat horizon","gentle waves","smooth reflective water"],"supportKeys":["palms","vegetation","ocean","horizon","waves"],"reason":"The palms, darker coastal vegetation, calm sea, flat horizon, and gentle waves are directly visible.","repair":"Palm trees and darker coastal vegetation line the beach beside a calm sea and flat horizon.","score":98,"reviewed":true,"claimType":"visible-fact"},
    {"id":"l01-light","label":"sunset light and reflection","terms":["low sun","sunset reflection","vertical reflection","vertical light path","orange-pink sky","golden light","gold water highlights","sun is setting"],"supportKeys":["sunset","sky","reflection"],"reason":"The low sun, warm orange-pink sky, golden low-angle light, and vertical reflection are visible.","repair":"The low sun casts warm golden light and a bright vertical reflection across the water.","score":98,"reviewed":true,"claimType":"visible-fact"}
  ],
  inferenceRules:[
    {id:'l01-affection',label:'affectionate closeness',terms:['affectionate','close relationship','seem close','appear close','seem comfortable','appear comfortable'],supportKeys:['joined-hands','pair'],reason:'Hand-holding, leaning contact, and relaxed expressions strongly support closeness, but relationship status is not visually provable.',repair:'They appear close and affectionate.',score:89,confidence:'HIGH',requiresCaution:true,reviewed:true,claimType:'supported-inference'},
    {id:'l01-romantic',label:'romantic-couple interpretation',terms:['may be a romantic couple','might be a romantic couple','appear to be a romantic couple','seem to be a romantic couple'],supportKeys:['joined-hands','pair'],reason:'The lesson title frames them as a romantic couple and the body language supports that interpretation, but exact status is not established by the image alone.',repair:'They appear to be a romantic couple.',score:82,confidence:'MEDIUM',requiresCaution:true,reviewed:true,claimType:'supported-inference'}
  ],
  unsupportedRules:[
    {id:'l01-status',label:'exact relationship status',terms:['they are married','husband and wife','they are engaged','honeymoon','anniversary'],supportKeys:['pair','joined-hands'],reason:'The frame does not establish marriage, engagement, honeymoon, or an anniversary.',repair:'Describe the visible closeness, or say they may be a romantic couple.',score:4,reviewed:true,claimType:'unsupported'},
    {id:'l01-history',label:'unseen relationship history',terms:['known each other for years','been together for years','relationship for years','grew close years ago'],supportKeys:['pair'],reason:'A still image cannot establish relationship duration or history.',repair:'Keep relationship history unknown unless context supplies it.',score:4,reviewed:true,claimType:'unsupported'},
    {id:'l01-occasion',label:'specific occasion or trip',terms:['they are on vacation','special occasion','wedding trip','beach holiday'],supportKeys:['beach','pair'],reason:'The image does not establish why they are at the beach or whether they are traveling.',repair:'They may simply be taking an evening walk on the beach.',score:5,reviewed:true,claimType:'unsupported'}
  ]
};

// Gold-standard pedagogical content for Lesson 01.
// The wording below is based on the current Category 01 source lesson and keeps visible fact separate from inference.
const GOLD_LESSON_01 = {
  overview: "Two young adults walk barefoot through the shallow edge of a palm-lined beach at sunset. They hold hands, the woman rests her head against the man’s shoulder, and warm orange-pink light reflects across the calm sea.",
  evidence: [
    {label: "People", detail: "Two clearly visible young adults: one man and one woman. No other people are visible in the immediate beach scene."},
    {label: "Man — clothing / appearance", detail: "Dark wavy hair; a light white or very pale-blue long-sleeved button-up shirt with sleeves rolled to the forearms; gray-taupe trousers rolled to mid-calf; barefoot. He looks down toward the woman with a soft smile."},
    {label: "Woman — clothing / appearance", detail: "Brown hair pulled back loosely; sleeveless white V-neck ankle-length/maxi dress with a gathered waist; delicate necklace; barefoot. She smiles with her head resting on his shoulder and holds his arm while their hands are joined."},
    {label: "Foreground", detail: "Wet reflective sand, a thin line of white foam, the couple’s bare feet partly in very shallow water, and faint footprints or foot impressions behind or around them."},
    {label: "Middle ground", detail: "The shoreline curves away to the left. A line of palms and darker coastal vegetation runs along the beach."},
    {label: "Background", detail: "A calm ocean extends to a flat horizon. The sun sits very low above the water, producing a bright vertical reflection."},
    {label: "Weather / light / time clues", detail: "Dry, calm weather; very gentle waves; excellent visibility; warm low-angle golden light. The sun’s position strongly supports sunset or very late afternoon."},
    {label: "Action / body language", detail: "They are walking slowly side by side while holding hands. The woman leans into him; he angles his head toward her. Their physical closeness and relaxed pace are visually clear."},
    {label: "Colors / textures", detail: "White clothing; peach, coral, gold, pale pink, and soft blue sky; gray-beige wet sand; dark palm silhouettes; smooth reflective water."},
    {label: "Composition", detail: "The couple occupies the left third while the sunset and open water fill the right, balancing human intimacy against a wide, quiet landscape."},
  ],
  micro: [
    "Both subjects are close enough to show relaxed facial expressions rather than silhouettes. Their joined hands, shoulder contact, and being captured mid-step together create the strongest relationship cues.",
    "Neither person is wearing shoes; rolled trousers and bare feet suit walking at the waterline.",
    "The man appears to look toward the woman; the woman looks downward with a smile rather than toward the camera."
  ],
  inference: {
    high: "The scene depicts a close, affectionate relationship because of hand-holding, leaning contact, and mutually relaxed expressions.",
    medium: "The title identifies them as a romantic couple, and the visual body language strongly supports that reading, but a photograph alone cannot establish the legal or exact status of the relationship.",
    low: "They may be on vacation, celebrating a special occasion, or simply taking an evening walk; no specific occasion is visible."
  },
  timeline: {
    before: "They may have been walking farther up the beach or watching the sun lower toward the horizon.",
    now: "They are walking barefoot through the shallow water, holding hands and leaning close together.",
    next: "They may continue along the shoreline, stop to watch the sunset, or leave the beach as daylight fades."
  },
  guardrail: "Do not claim engagement, marriage, honeymoon, anniversary, destination, or exact relationship duration. The image supports affection and closeness, not a specific life event.",
  story: "One possible story is that the pair has been spending a quiet day near the coast and chose to walk along the water as the light softened. The woman may be tired from the day and leans against the man for comfort, while his downward glance suggests that his attention is on her rather than on the scenery. Their joined hands and slow-looking pace make it easy to imagine that they are using the walk to talk privately or simply enjoy the silence together. As the sun drops lower, they might stop near the shoreline for a few minutes before heading back from the beach.",
  languageBank: [
    "walk hand in hand", "stroll along the shoreline", "lean against someone", "rest one’s head on a shoulder",
    "barefoot on wet sand", "gentle shore break", "golden-hour light", "sunset reflection",
    "affectionate body language", "calm tropical beach"
  ],
  personalQuestions: [
    "Describe a walk you took with someone important. Where were you, what could you see, and what made the moment memorable?",
    "Do you prefer talking while walking or sitting face to face? Explain with one real example.",
    "Retell a peaceful sunset or seaside memory using first, while, after that, and finally."
  ],
  memoryFrames: ["I remember walking…", "We were… while…", "What made the moment special was…", "Unlike the picture, my experience…"],
  grammar: {
    title: "Phrasal verbs for describing relationships",
    sourceFocus: "PHRASAL VERBS FOR DESCRIBING RELATIONSHIPS",
    explainer: "Use relationship phrasal verbs carefully: get along with, grow close to, and spend time with. The image supports present closeness, but a phrasal verb must not invent relationship history, duration, or legal status that the frame does not show.",
    examples: [
      "They seem to get along well, judging from their relaxed body language.",
      "They are spending time together on the beach.",
      "The image does not show when they grew close or how long they have known each other."
    ],
    models: {
      "A1–A2": "A man and a woman are walking on the beach at sunset. They are barefoot and holding hands. The woman is wearing a white dress, and the man is wearing a light shirt and rolled-up pants. The sea is calm and the sky is orange and pink. They look happy and close.",
      "B1–B2": "Two young adults are strolling barefoot along the edge of the sea while the sun sets behind them. The man wears a light button-up shirt and rolled gray trousers, while the woman wears a flowing white dress. She rests her head against his shoulder and they hold hands as they walk through the shallow water. Their relaxed body language and the warm golden light create an intimate, peaceful atmosphere.",
      "C1–C2": "The image places a visibly affectionate pair against the openness of a quiet palm-lined shoreline at sunset. Their bare feet, joined hands, and unhurried movement make the interaction feel natural rather than posed, while the woman’s head resting against the man’s shoulder adds a clear signal of comfort and closeness. Warm coral and gold light spreads across the sea and wet sand. The title frames the pair as romantic, but the strongest description remains evidence-based: two people sharing physical closeness within a calm evening landscape."
    },
    runtime: {
      mode: "relationship-phrasal-verbs",
      detectPatterns: ["\\b(?:get along with|get along well|grow close to|grew close to|grown close to|spend time with|spending time with|spending time together)\\b"],
      unsafePatterns: ["^(?!.*\\b(?:context says|we are told|in my memory|in my experience)\\b).*\\b(?:grew close|have grown close|had grown close|known each other for|been together for)\\b"],
      safePatterns: ["\\b(?:seem(?:s)? to get along|appear(?:s)? to get along|spending time together|context says|we are told|in my memory|in my experience)\\b"],
      idleScore: 84,
      detectedScore: 74,
      safeScore: 95,
      unsafeScore: 30,
      idleNote: "Use a relationship phrasal verb only when its meaning stays within the evidence or an explicitly supplied context.",
      detectedNote: "A relationship phrasal verb was detected. Keep present closeness separate from unshown history or duration.",
      safeNote: "The phrasal verb is framed cautiously or within an explicit context boundary.",
      unsafeNote: "The phrasal verb turns unshown relationship history or duration into a fact. Reframe it as unknown or context-supplied."
    }
  },
  speaking: {
    30: "Before reading the models, give 4–5 simple sentences: setting + three visible facts + one action. Use one relationship phrasal verb carefully without inventing unshown history.",
    60: "Rebuild the scene in a clear order. Use at least two lesson phrases — “walk hand in hand” and “stroll along the shoreline” — then add one cautious inference with seems, may, might, or could.",
    90: "Speak without reading: overview → key subject details → environment/weather/light → action → atmosphere → one Before/Now/Next link. Finish by separating one visible fact from one inference."
  },
  recall: {
    factItems: [
      {text:"They are holding hands.",kind:"fact",note:"Their joined hands are directly visible."},
      {text:"Both people are barefoot.",kind:"fact",note:"Their bare feet are directly visible at the waterline."},
      {text:"They are celebrating an anniversary.",kind:"unsupported",note:"No anniversary evidence is visible."},
      {text:"They may be taking a quiet evening walk.",kind:"inference",note:"This is plausible from the setting and action, but the purpose is not directly visible."},
      {text:"The sun is low over the water.",kind:"fact",note:"The low sun and bright reflection are directly visible."},
      {text:"They are on their honeymoon.",kind:"unsupported",note:"The image does not establish honeymoon or marital status."}
    ],
    builderSentences: [
      ["The two adults are walking","through shallow water","while","holding hands."],
      ["The woman is wearing a white dress","and","both people are barefoot."],
      ["The low sun","creates","a bright reflection across the water."],
      ["They appear close","because","their hands are joined and they lean together."]
    ],
    principle: "Retrieve visible beach evidence first, then add cautious relationship interpretation without inventing legal status, duration, or occasion."
  },
  conversation: {
    missions: {
      listener: {label:"Beach Listener",icon:"eye",tag:"CLARITY",sub:"Help a listener reconstruct the beach scene from visible, connected details.",prompts:[
        {label:"OPEN THE SCENE",prompt:"Who is visible, where are they, and what are they doing right now?",hint:"Start with two adults + beach + walking.",focus:"overview"},
        {label:"ADD APPEARANCE",prompt:"Add two directly visible clothing or body details.",hint:"Use white dress, rolled trousers, or bare feet.",focus:"detail"},
        {label:"PLACE THE SETTING",prompt:"Describe the shoreline, palm trees, ocean, low sun, and reflection with spatial language.",hint:"Use on the left, behind them, across the water, or near the horizon.",focus:"spatial"},
        {label:"RECONSTRUCT THE FRAME",prompt:"Give a short connected description that would let someone picture the main scene without seeing it.",hint:"Combine people, action, setting, and light.",focus:"overview"}
      ]},
      detective: {label:"Beach Detective",icon:"target",tag:"EVIDENCE",sub:"Separate direct visual evidence from relationship and occasion inference.",prompts:[
        {label:"VISIBLE FACT",prompt:"State two details that are directly visible in the frame.",hint:"Use hands, clothing, bare feet, water, palms, or the sun.",focus:"detail"},
        {label:"SUPPORTED INFERENCE",prompt:"Give one cautious inference about the pair and name the clue that supports it.",hint:"Use seem / appear / may, then mention hand-holding or leaning contact.",focus:"inference"},
        {label:"TITLE VS PHOTO",prompt:"What does the title suggest, and what does the photograph itself prove about the relationship?",hint:"Romantic couple is title context; exact legal status is not visible.",focus:"inference"},
        {label:"DRAW THE GUARDRAIL",prompt:"Name one claim about marriage, honeymoon, anniversary, vacation, or relationship duration that the image cannot prove.",hint:"Keep hidden history and occasion unknown.",focus:"inference"}
      ]},
      story: {label:"Beach Story Relay",icon:"spark",tag:"FLUENCY",sub:"Extend Before → Now → Next while marking imagined events as hypothetical.",prompts:[
        {label:"START WITH NOW",prompt:"Describe the visible present moment at the shoreline.",hint:"Use are walking / are holding hands / the sun is low.",focus:"action"},
        {label:"STEP BACK",prompt:"What may have happened shortly before the captured moment?",hint:"Use may have or might have; do not invent a specific occasion.",focus:"timeline"},
        {label:"MOVE FORWARD",prompt:"What might happen next if the walk continues naturally?",hint:"They might continue along the shore or stop to watch the sunset.",focus:"timeline"},
        {label:"THREE-SENTENCE RELAY",prompt:"Retell the scene as Before → Now → Next in three connected sentences.",hint:"Keep Before and Next cautious; keep Now evidence-based.",focus:"timeline"}
      ]}
    },
    recasts: {
      overview:"Two adults are walking barefoot through shallow water on a palm-lined beach at sunset.",
      detail:"The woman wears a white dress, the man has rolled trousers, and both are barefoot.",
      spatial:"Palm trees line the left side of the beach, while calm open water and a low sun fill the background.",
      action:"They are walking side by side and holding hands as the woman leans toward the man.",
      inference:"Their hand-holding and leaning contact suggest closeness, but exact relationship status is not visible.",
      timeline:"Before this moment they may have been farther along the beach; now they are walking together, and next they might continue along the shoreline."
    }
  },
  hotspotDetails: {
      "man": {
          "phrase": "walk beside someone",
          "collocations": [
              "light button-up shirt",
              "rolled sleeves",
              "barefoot at the waterline"
          ],
          "grammar": "The man is walking beside the woman."
      },
      "woman": {
          "phrase": "rest one’s head on a shoulder",
          "collocations": [
              "flowing white dress",
              "lean against someone",
              "relaxed expression"
          ],
          "grammar": "The woman rests her head against the man’s shoulder."
      },
      "joined hands": {
          "phrase": "walk hand in hand",
          "collocations": [
              "joined hands",
              "physical closeness",
              "shared movement"
          ],
          "grammar": "Their hands are joined as they walk."
      },
      "white dress": {
          "phrase": "flowing white dress",
          "collocations": [
              "sleeveless dress",
              "maxi dress",
              "white fabric"
          ],
          "grammar": "The woman is wearing a flowing white dress."
      },
      "rolled trousers": {
          "phrase": "rolled-up trousers",
          "collocations": [
              "rolled to mid-calf",
              "gray-taupe trousers",
              "beach clothing"
          ],
          "grammar": "The man’s trousers are rolled to mid-calf."
      },
      "bare feet": {
          "phrase": "walk barefoot",
          "collocations": [
              "bare feet",
              "waterline",
              "wet sand"
          ],
          "grammar": "Both people are walking barefoot."
      },
      "shallow water": {
          "phrase": "walk through shallow water",
          "collocations": [
              "very shallow water",
              "waterline",
              "shore edge"
          ],
          "grammar": "Their feet are partly in shallow water."
      },
      "wet reflective sand": {
          "phrase": "wet reflective sand",
          "collocations": [
              "sunset reflection",
              "smooth wet surface",
              "shoreline"
          ],
          "grammar": "The wet sand reflects the warm light."
      },
      "white foam": {
          "phrase": "thin white foam",
          "collocations": [
              "shore break",
              "gentle wave",
              "foam line"
          ],
          "grammar": "A thin line of white foam marks the edge of the water."
      },
      "palm trees": {
          "phrase": "palm-lined beach",
          "collocations": [
              "coastal vegetation",
              "dark silhouettes",
              "line the beach"
          ],
          "grammar": "Palm trees line the beach on the left."
      },
      "ocean": {
          "phrase": "calm ocean",
          "collocations": [
              "gentle waves",
              "flat horizon",
              "smooth water"
          ],
          "grammar": "The ocean appears calm in the warm light."
      },
      "low sun": {
          "phrase": "low sun",
          "collocations": [
              "sunset light",
              "low on the horizon",
              "golden-hour light"
          ],
          "grammar": "The sun is very low above the water."
      },
      "sunset reflection": {
          "phrase": "sunset reflection",
          "collocations": [
              "vertical reflection",
              "golden light on water",
              "bright path of light"
          ],
          "grammar": "A bright sunset reflection stretches across the sea."
      }
  }};


/* v0.48 Category 02 source map — CAT02 v191. Lessons 29–60 are app-ready; Category 02 is runtime-complete at 32/32. */
const CAT02 = {
  id: 2,
  title: "Education, Study & Academic Life",
  subtitle: "32 deep image-verified lessons • A1–C2",
  lessons: [[29,"Interactive Classroom Learning"],[30,"Quantum Mechanics Classroom — Teacher at the Whiteboard"],[31,"Interactive Spanish Language Class"],[32,"Online Learning at Home — Individual Study"],[33,"Collaborative Laptop Study at Home"],[34,"Group Painting Session in an Art Studio"],[35,"Physical Education Activity in a School Gym"],[36,"University Lecture Hall"],[37,"University Lecture Hall — Large Class"],[38,"University Seminar — Interactive Discussion"],[39,"Library Study Session"],[40,"Library — Study Session"],[41,"Grand Historic Library with Readers"],[42,"Group Study Session"],[43,"Professor Mentoring"],[44,"Final Examination"],[45,"Writing — Formal Letter"],[46,"Academic Writing — Essay"],[47,"Dormitory Study"],[48,"Campus Life"],[49,"University Campus Cafeteria"],[50,"Student Club Fair on Campus"],[51,"Graduation Ceremony"],[52,"Online Class & Remote Learning"],[53,"Kindergarten & Early Learning"],[54,"Student Presentation & Classroom Debate"],[55,"School Registration & Administration"],[56,"Teacher Giving Feedback"],[57,"Primary School Classroom"],[58,"Parent–Teacher Meeting — Reviewing Student Work"],[59,"Library Checkout — Scanning a Stack of Books"],[60,"Classroom Story Time — Reading a Picture Book Together"]].filter(([id])=>id<=6).map(([id,title])=>({id,title,image:`assets/images/lesson_${String(id).padStart(2,'0')}.jpg`,hotspots:[]}))
};
