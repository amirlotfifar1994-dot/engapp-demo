/* EngBook v0.61 — Lesson 01 deep micro-hotspot override */
(function(){
  const L1_HOTSPOTS=[
  {
    "x": 24.5,
    "y": 35.5,
    "en": "man",
    "fa": "مرد",
    "pron": "/mæn/",
    "example": "The man is walking beside the woman.",
    "type": "person",
    "r": 8,
    "id": "l01-man",
    "level": "primary",
    "reviewed": true,
    "evidenceType": "visible-person",
    "inspectionGroups": [
      "appearance",
      "shirt",
      "lower-body"
    ],
    "hitW": 44,
    "hitH": 60
  },
  {
    "x": 35,
    "y": 38,
    "en": "woman",
    "fa": "زن",
    "pron": "/ˈwʊmən/",
    "example": "The woman is walking beside the man.",
    "type": "person",
    "r": 8,
    "id": "l01-woman",
    "level": "primary",
    "reviewed": true,
    "evidenceType": "visible-person",
    "inspectionGroups": [
      "appearance",
      "dress",
      "posture"
    ],
    "hitW": 44,
    "hitH": 60
  },
  {
    "x": 33.7,
    "y": 55,
    "en": "joined hands",
    "fa": "دست‌های به‌هم‌گرفته",
    "pron": "/dʒɔɪnd hændz/",
    "example": "Their hands are visibly joined as they walk.",
    "type": "action",
    "r": 6,
    "id": "l01-joined-hands",
    "level": "primary",
    "reviewed": true,
    "evidenceType": "visible-action"
  },
  {
    "x": 13.5,
    "y": 64,
    "en": "shoreline",
    "fa": "خط ساحلی",
    "pron": "/ˈʃɔrˌlaɪn/",
    "example": "The shoreline curves away along the left side of the scene.",
    "type": "setting",
    "r": 8,
    "id": "l01-shoreline",
    "level": "primary",
    "reviewed": true,
    "evidenceType": "visible-setting",
    "inspectionGroups": [
      "ground"
    ]
  },
  {
    "x": 6.5,
    "y": 20,
    "en": "palm trees",
    "fa": "درختان نخل",
    "pron": "/pɑm triz/",
    "example": "Palm trees line the beach on the left.",
    "type": "nature",
    "r": 8,
    "id": "l01-palm-trees",
    "level": "primary",
    "reviewed": true,
    "evidenceType": "visible-setting",
    "inspectionGroups": [
      "vegetation"
    ]
  },
  {
    "x": 82,
    "y": 60,
    "en": "ocean",
    "fa": "اقیانوس",
    "pron": "/ˈoʊʃən/",
    "example": "Calm open water fills the right side of the scene.",
    "type": "nature",
    "r": 10,
    "id": "l01-ocean",
    "level": "primary",
    "reviewed": true,
    "evidenceType": "visible-setting",
    "inspectionGroups": [
      "water"
    ]
  },
  {
    "x": 62.5,
    "y": 43.5,
    "en": "low sun",
    "fa": "خورشید پایین افق",
    "pron": "/loʊ sʌn/",
    "example": "The sun sits very low above the water.",
    "type": "light",
    "r": 7,
    "id": "l01-low-sun",
    "level": "primary",
    "reviewed": true,
    "evidenceType": "visible-light",
    "inspectionGroups": [
      "sky-light"
    ]
  },
  {
    "x": 64,
    "y": 60,
    "en": "sunset reflection",
    "fa": "بازتاب غروب",
    "pron": "/ˈsʌnˌsɛt rɪˈflɛkʃən/",
    "example": "A bright vertical reflection stretches across the water.",
    "type": "light",
    "r": 7,
    "id": "l01-sunset-reflection",
    "level": "primary",
    "reviewed": true,
    "evidenceType": "visible-light",
    "inspectionGroups": [
      "reflection"
    ]
  },
  {
    "x": 26.3,
    "y": 12,
    "en": "dark wavy hair",
    "fa": "موهای تیره و موج‌دار",
    "pron": "/dɑrk ˈweɪvi hɛr/",
    "example": "The man has dark wavy hair.",
    "type": "appearance",
    "r": 5,
    "id": "l01-man-dark-wavy-hair",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "appearance",
    "attributeGroup": "hair"
  },
  {
    "x": 28.5,
    "y": 18.5,
    "en": "man's soft smile",
    "fa": "لبخند ملایم مرد",
    "pron": "/mænz sɔft smaɪl/",
    "example": "The man has a soft visible smile.",
    "type": "appearance",
    "r": 5,
    "id": "l01-man-soft-smile",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "appearance",
    "attributeGroup": "expression"
  },
  {
    "x": 28.2,
    "y": 16.2,
    "en": "man's downward gaze",
    "fa": "نگاه رو به پایین مرد",
    "pron": "/mænz ˈdaʊnwɚd ɡeɪz/",
    "example": "The man is looking downward toward the woman.",
    "type": "appearance",
    "r": 5,
    "id": "l01-man-downward-gaze",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "appearance",
    "attributeGroup": "gaze"
  },
  {
    "x": 25.5,
    "y": 33.5,
    "en": "button-up shirt",
    "fa": "پیراهن دکمه‌دار",
    "pron": "/ˈbʌtən ʌp ʃɝt/",
    "example": "The man is wearing a long-sleeved button-up shirt.",
    "type": "clothing",
    "r": 6,
    "id": "l01-man-button-up-shirt",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "shirt",
    "attributeGroup": "top-clothing"
  },
  {
    "x": 23.9,
    "y": 31,
    "en": "pale shirt color",
    "fa": "رنگ بسیار روشن پیراهن",
    "pron": "/peɪl ʃɝt ˈkʌlər/",
    "example": "The shirt appears white to very pale blue in the warm sunset light.",
    "type": "clothing",
    "r": 5,
    "id": "l01-man-pale-shirt-color",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "shirt",
    "attributeGroup": "color"
  },
  {
    "x": 18.8,
    "y": 34.5,
    "en": "long sleeves",
    "fa": "آستین‌های بلند",
    "pron": "/lɔŋ slivz/",
    "example": "The shirt has long sleeves.",
    "type": "clothing",
    "r": 5,
    "id": "l01-man-long-sleeves",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "shirt",
    "attributeGroup": "sleeves"
  },
  {
    "x": 18.5,
    "y": 45.5,
    "en": "rolled sleeves",
    "fa": "آستین‌های تاخورده",
    "pron": "/roʊld slivz/",
    "example": "The sleeves are rolled to the forearms.",
    "type": "clothing",
    "r": 5,
    "id": "l01-man-rolled-sleeves",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "shirt",
    "attributeGroup": "sleeves"
  },
  {
    "x": 25.5,
    "y": 25.3,
    "en": "open collar",
    "fa": "یقه باز",
    "pron": "/ˈoʊpən ˈkɑlər/",
    "example": "The shirt collar is open at the neck.",
    "type": "clothing",
    "r": 4,
    "id": "l01-man-open-collar",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "shirt",
    "attributeGroup": "collar"
  },
  {
    "x": 28,
    "y": 32,
    "en": "chest pocket",
    "fa": "جیب سینه",
    "pron": "/tʃɛst ˈpɑkət/",
    "example": "A rectangular chest pocket is visible on the shirt.",
    "type": "clothing",
    "r": 4,
    "id": "l01-man-chest-pocket",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "shirt",
    "attributeGroup": "garment-detail"
  },
  {
    "x": 24.6,
    "y": 62.5,
    "en": "gray-taupe trousers",
    "fa": "شلوار خاکستری مایل به تاپ",
    "pron": "/ɡreɪ toʊp ˈtraʊzɚz/",
    "example": "The man is wearing gray-taupe trousers.",
    "type": "clothing",
    "r": 6,
    "id": "l01-man-gray-taupe-trousers",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "lower-body",
    "attributeGroup": "lower-clothing"
  },
  {
    "x": 24.5,
    "y": 74,
    "en": "rolled trouser cuffs",
    "fa": "پاچه‌های تاخورده شلوار",
    "pron": "/roʊld ˈtraʊzɚ kʌfs/",
    "example": "The trouser legs are rolled to about mid-calf.",
    "type": "clothing",
    "r": 5,
    "id": "l01-man-rolled-trouser-cuffs",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "lower-body",
    "attributeGroup": "hem"
  },
  {
    "x": 24,
    "y": 92,
    "en": "man's bare feet",
    "fa": "پاهای برهنه مرد",
    "pron": "/mænz bɛr fit/",
    "example": "The man is barefoot at the waterline.",
    "type": "body",
    "r": 5,
    "id": "l01-man-bare-feet",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "lower-body",
    "attributeGroup": "footwear"
  },
  {
    "x": 32.4,
    "y": 21,
    "en": "brown hair",
    "fa": "موهای قهوه‌ای",
    "pron": "/braʊn hɛr/",
    "example": "The woman has brown hair.",
    "type": "appearance",
    "r": 5,
    "id": "l01-woman-brown-hair",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "appearance",
    "attributeGroup": "hair"
  },
  {
    "x": 32,
    "y": 20,
    "en": "loosely pulled-back hair",
    "fa": "موهای شل جمع‌شده",
    "pron": "/ˈlusli pʊld bæk hɛr/",
    "example": "Her hair is pulled back loosely, with soft strands around her face.",
    "type": "appearance",
    "r": 5,
    "id": "l01-woman-loose-hair-style",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "appearance",
    "attributeGroup": "hair-style"
  },
  {
    "x": 33.6,
    "y": 25.3,
    "en": "woman's soft smile",
    "fa": "لبخند ملایم زن",
    "pron": "/ˈwʊmənz sɔft smaɪl/",
    "example": "The woman is visibly smiling.",
    "type": "appearance",
    "r": 5,
    "id": "l01-woman-soft-smile",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "appearance",
    "attributeGroup": "expression"
  },
  {
    "x": 33,
    "y": 23.7,
    "en": "woman's downward gaze",
    "fa": "نگاه رو به پایین زن",
    "pron": "/ˈwʊmənz ˈdaʊnwɚd ɡeɪz/",
    "example": "Her gaze is directed downward rather than toward the camera.",
    "type": "appearance",
    "r": 5,
    "id": "l01-woman-downward-gaze",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "appearance",
    "attributeGroup": "gaze"
  },
  {
    "x": 34.3,
    "y": 30.3,
    "en": "delicate necklace",
    "fa": "گردنبند ظریف",
    "pron": "/ˈdɛləkət ˈnɛkləs/",
    "example": "A delicate necklace is visible at her neckline.",
    "type": "accessory",
    "r": 4,
    "id": "l01-woman-delicate-necklace",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "appearance",
    "attributeGroup": "accessory"
  },
  {
    "x": 35.1,
    "y": 46,
    "en": "white dress",
    "fa": "پیراهن سفید",
    "pron": "/waɪt drɛs/",
    "example": "The woman is wearing a white dress.",
    "type": "clothing",
    "r": 6,
    "id": "l01-woman-white-dress",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "dress",
    "attributeGroup": "garment"
  },
  {
    "x": 34.4,
    "y": 35.5,
    "en": "V-neckline",
    "fa": "یقه هفت",
    "pron": "/ˈvi ˌnɛkˌlaɪn/",
    "example": "The dress has a visible V-shaped neckline.",
    "type": "clothing",
    "r": 4,
    "id": "l01-woman-v-neckline",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "dress",
    "attributeGroup": "neckline"
  },
  {
    "x": 37.7,
    "y": 31.2,
    "en": "sleeveless design",
    "fa": "طراحی بدون آستین",
    "pron": "/ˈslivləs dɪˈzaɪn/",
    "example": "The dress is sleeveless.",
    "type": "clothing",
    "r": 4,
    "id": "l01-woman-sleeveless-design",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "dress",
    "attributeGroup": "sleeves"
  },
  {
    "x": 37.4,
    "y": 30.5,
    "en": "thin shoulder straps",
    "fa": "بندهای باریک روی شانه",
    "pron": "/θɪn ˈʃoʊldɚ stræps/",
    "example": "Thin shoulder straps are visible on the dress.",
    "type": "clothing",
    "r": 4,
    "id": "l01-woman-thin-shoulder-straps",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "dress",
    "attributeGroup": "straps"
  },
  {
    "x": 34.3,
    "y": 40,
    "en": "gathered bodice",
    "fa": "بالاتنه چین‌دار",
    "pron": "/ˈɡæðɚd ˈbɑdɪs/",
    "example": "The bodice has gathered fabric.",
    "type": "clothing",
    "r": 4,
    "id": "l01-woman-gathered-bodice",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "dress",
    "attributeGroup": "fabric-structure"
  },
  {
    "x": 34.8,
    "y": 46.8,
    "en": "gathered waist",
    "fa": "کمر چین‌دار",
    "pron": "/ˈɡæðɚd weɪst/",
    "example": "The dress gathers at the waist.",
    "type": "clothing",
    "r": 4,
    "id": "l01-woman-gathered-waist",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "dress",
    "attributeGroup": "waist"
  },
  {
    "x": 35,
    "y": 68,
    "en": "flowing skirt",
    "fa": "دامن روان و آزاد",
    "pron": "/ˈfloʊɪŋ skɝt/",
    "example": "The lower part of the dress falls in a loose flowing skirt.",
    "type": "clothing",
    "r": 5,
    "id": "l01-woman-flowing-skirt",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "dress",
    "attributeGroup": "skirt"
  },
  {
    "x": 35.3,
    "y": 78,
    "en": "maxi length",
    "fa": "قد ماکسی",
    "pron": "/ˈmæksi lɛŋθ/",
    "example": "The dress extends to ankle or maxi length.",
    "type": "clothing",
    "r": 4,
    "id": "l01-woman-maxi-length",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "dress",
    "attributeGroup": "length"
  },
  {
    "x": 36.7,
    "y": 91.5,
    "en": "woman's bare feet",
    "fa": "پاهای برهنه زن",
    "pron": "/ˈwʊmənz bɛr fit/",
    "example": "The woman is barefoot in the shallow water.",
    "type": "body",
    "r": 5,
    "id": "l01-woman-bare-feet",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "posture",
    "attributeGroup": "footwear"
  },
  {
    "x": 29.7,
    "y": 23,
    "en": "head on shoulder",
    "fa": "سر روی شانه",
    "pron": "/hɛd ɑn ˈʃoʊldɚ/",
    "example": "The woman rests her head against the man’s shoulder.",
    "type": "action",
    "r": 5,
    "id": "l01-woman-head-on-shoulder",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-action",
    "parentId": "l01-woman",
    "detailGroup": "posture",
    "attributeGroup": "body-language"
  },
  {
    "x": 31.4,
    "y": 36.5,
    "en": "hand on his arm",
    "fa": "دست روی بازوی مرد",
    "pron": "/hænd ɑn hɪz ɑrm/",
    "example": "One of her hands rests on or holds his arm.",
    "type": "action",
    "r": 5,
    "id": "l01-woman-hand-on-arm",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-action",
    "parentId": "l01-woman",
    "detailGroup": "posture",
    "attributeGroup": "interaction"
  },
  {
    "x": 31.4,
    "y": 29.5,
    "en": "leaning posture",
    "fa": "حالت تکیه‌داده",
    "pron": "/ˈlinɪŋ ˈpɑstʃɚ/",
    "example": "Her upper body leans toward the man.",
    "type": "body",
    "r": 5,
    "id": "l01-woman-leaning-posture",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "posture",
    "attributeGroup": "body-language"
  },
  {
    "x": 12,
    "y": 82,
    "en": "wet reflective sand",
    "fa": "شن خیس و بازتابنده",
    "pron": "/wɛt rɪˈflɛktɪv sænd/",
    "example": "Wet sand reflects the warm sunset light.",
    "type": "setting",
    "r": 6,
    "id": "l01-wet-reflective-sand",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-shoreline",
    "detailGroup": "ground",
    "attributeGroup": "surface"
  },
  {
    "x": 38,
    "y": 85,
    "en": "shallow water",
    "fa": "آب کم‌عمق",
    "pron": "/ˈʃæloʊ ˈwɔtɚ/",
    "example": "Their feet are partly in very shallow water.",
    "type": "setting",
    "r": 6,
    "id": "l01-shallow-water",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-shoreline",
    "detailGroup": "ground",
    "attributeGroup": "water-depth"
  },
  {
    "x": 50,
    "y": 85,
    "en": "thin white foam",
    "fa": "کف سفید نازک موج",
    "pron": "/θɪn waɪt foʊm/",
    "example": "A thin white line of foam marks the shore break.",
    "type": "detail",
    "r": 5,
    "id": "l01-thin-white-foam",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-shoreline",
    "detailGroup": "ground",
    "attributeGroup": "surface-water"
  },
  {
    "x": 18,
    "y": 83,
    "en": "foot impressions",
    "fa": "جای پا روی شن",
    "pron": "/fʊt ɪmˈprɛʃənz/",
    "example": "Faint foot impressions are visible on the wet sand.",
    "type": "detail",
    "r": 5,
    "id": "l01-foot-impressions",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-shoreline",
    "detailGroup": "ground",
    "attributeGroup": "surface-mark"
  },
  {
    "x": 14,
    "y": 61,
    "en": "curving shore",
    "fa": "ساحل منحنی",
    "pron": "/ˈkɝvɪŋ ʃɔr/",
    "example": "The shore curves away toward the left background.",
    "type": "setting",
    "r": 5,
    "id": "l01-curving-shore",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-shoreline",
    "detailGroup": "ground",
    "attributeGroup": "shape"
  },
  {
    "x": 8.5,
    "y": 72,
    "en": "gray-beige sand",
    "fa": "شن خاکستری-بژ",
    "pron": "/ɡreɪ beɪʒ sænd/",
    "example": "The wet sand reads as gray-beige under the warm light.",
    "type": "appearance",
    "r": 5,
    "id": "l01-gray-beige-sand",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-shoreline",
    "detailGroup": "ground",
    "attributeGroup": "color"
  },
  {
    "x": 12,
    "y": 38,
    "en": "coastal vegetation",
    "fa": "پوشش گیاهی ساحلی",
    "pron": "/ˈkoʊstəl ˌvɛdʒəˈteɪʃən/",
    "example": "Darker coastal vegetation runs behind the palms.",
    "type": "nature",
    "r": 5,
    "id": "l01-coastal-vegetation",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-palm-trees",
    "detailGroup": "vegetation",
    "attributeGroup": "vegetation"
  },
  {
    "x": 6.7,
    "y": 32,
    "en": "dark palm silhouettes",
    "fa": "سیلوئت‌های تیره نخل",
    "pron": "/dɑrk pɑm ˌsɪluˈɛts/",
    "example": "Some palms appear as dark silhouettes against the warm sky.",
    "type": "nature",
    "r": 5,
    "id": "l01-dark-palm-silhouettes",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-palm-trees",
    "detailGroup": "vegetation",
    "attributeGroup": "light-contrast"
  },
  {
    "x": 82,
    "y": 45.5,
    "en": "flat horizon",
    "fa": "افق صاف",
    "pron": "/flæt həˈraɪzən/",
    "example": "The sea meets a nearly flat horizon.",
    "type": "setting",
    "r": 5,
    "id": "l01-flat-horizon",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-ocean",
    "detailGroup": "water",
    "attributeGroup": "spatial-line"
  },
  {
    "x": 80,
    "y": 73,
    "en": "gentle waves",
    "fa": "موج‌های ملایم",
    "pron": "/ˈdʒɛntəl weɪvz/",
    "example": "Small gentle waves are visible across the sea surface.",
    "type": "nature",
    "r": 5,
    "id": "l01-gentle-waves",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-ocean",
    "detailGroup": "water",
    "attributeGroup": "water-state"
  },
  {
    "x": 76,
    "y": 64,
    "en": "smooth reflective water",
    "fa": "آب صاف و بازتابنده",
    "pron": "/smuð rɪˈflɛktɪv ˈwɔtɚ/",
    "example": "The water surface looks smooth and reflective.",
    "type": "nature",
    "r": 5,
    "id": "l01-smooth-reflective-water",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-ocean",
    "detailGroup": "water",
    "attributeGroup": "texture"
  },
  {
    "x": 76,
    "y": 28,
    "en": "orange-pink sky",
    "fa": "آسمان نارنجی-صورتی",
    "pron": "/ˈɔrɪndʒ pɪŋk skaɪ/",
    "example": "Orange and pink tones dominate the sky near the horizon.",
    "type": "light",
    "r": 5,
    "id": "l01-orange-pink-sky",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-low-sun",
    "detailGroup": "sky-light",
    "attributeGroup": "color"
  },
  {
    "x": 58,
    "y": 34,
    "en": "golden light",
    "fa": "نور طلایی",
    "pron": "/ˈɡoʊldən laɪt/",
    "example": "Warm low-angle golden light fills the scene.",
    "type": "light",
    "r": 5,
    "id": "l01-golden-light",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-low-sun",
    "detailGroup": "sky-light",
    "attributeGroup": "light-quality"
  },
  {
    "x": 64,
    "y": 54,
    "en": "vertical light path",
    "fa": "مسیر عمودی نور",
    "pron": "/ˈvɝtɪkəl laɪt pæθ/",
    "example": "The sun creates a bright vertical path on the water.",
    "type": "light",
    "r": 5,
    "id": "l01-vertical-light-path",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-sunset-reflection",
    "detailGroup": "reflection",
    "attributeGroup": "reflection-shape"
  },
  {
    "x": 65,
    "y": 69,
    "en": "gold water highlights",
    "fa": "درخشش‌های طلایی روی آب",
    "pron": "/ɡoʊld ˈwɔtɚ ˈhaɪˌlaɪts/",
    "example": "Gold highlights shimmer on the water beneath the sun.",
    "type": "light",
    "r": 5,
    "id": "l01-gold-water-highlights",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-sunset-reflection",
    "detailGroup": "reflection",
    "attributeGroup": "color-light"
  },
  {
    "x": 23.8,
    "y": 9.5,
    "en": "tousled fringe",
    "fa": "چتری پریشان",
    "pron": "/ˈtaʊzəld frɪndʒ/",
    "example": "A tousled fringe falls over the man's forehead.",
    "type": "appearance",
    "r": 4,
    "id": "l01-man-tousled-fringe",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "appearance",
    "attributeGroup": "hair-shape"
  },
  {
    "x": 26.4,
    "y": 13.6,
    "en": "soft sideburns",
    "fa": "خط ریش نرم",
    "pron": "/sɔft ˈsaɪdˌbɝndz/",
    "example": "Soft sideburns are visible near the man's ears.",
    "type": "appearance",
    "r": 4,
    "id": "l01-man-soft-sideburns",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "appearance",
    "attributeGroup": "facial-frame"
  },
  {
    "x": 27.7,
    "y": 27.8,
    "en": "relaxed jawline",
    "fa": "خط فک ریلکس",
    "pron": "/rɪˈlækst ˈdʒɔˌlaɪn/",
    "example": "The man's jawline looks relaxed rather than tense.",
    "type": "appearance",
    "r": 4,
    "id": "l01-man-relaxed-jawline",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "appearance",
    "attributeGroup": "expression"
  },
  {
    "x": 21.8,
    "y": 41,
    "en": "shirt placket",
    "fa": "نوار دکمه‌های پیراهن",
    "pron": "/ʃɝt ˈplækət/",
    "example": "The shirt placket runs vertically down the center of the man's shirt.",
    "type": "clothing",
    "r": 4,
    "id": "l01-man-shirt-placket",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "shirt",
    "attributeGroup": "garment-detail"
  },
  {
    "x": 21.6,
    "y": 29.6,
    "en": "upper shirt buttons",
    "fa": "دکمه‌های بالایی پیراهن",
    "pron": "/ˈʌpɚ ʃɝt ˈbʌtənz/",
    "example": "A few upper shirt buttons are undone at the neckline.",
    "type": "clothing",
    "r": 4,
    "id": "l01-man-upper-shirt-buttons",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "shirt",
    "attributeGroup": "fastening"
  },
  {
    "x": 17,
    "y": 45,
    "en": "forearm exposure",
    "fa": "نمایان بودن ساعد",
    "pron": "/ˈfɔrˌɑrm ɪkˈspoʊʒɚ/",
    "example": "The rolled sleeve leaves much of the man's forearm exposed.",
    "type": "clothing",
    "r": 4,
    "id": "l01-man-forearm-exposure",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "shirt",
    "attributeGroup": "sleeves"
  },
  {
    "x": 22.3,
    "y": 55,
    "en": "shirt hem",
    "fa": "لبه پایینی پیراهن",
    "pron": "/ʃɝt hɛm/",
    "example": "The loose shirt hem falls below the man's waist.",
    "type": "clothing",
    "r": 4,
    "id": "l01-man-shirt-hem",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "shirt",
    "attributeGroup": "hem"
  },
  {
    "x": 26,
    "y": 41.8,
    "en": "loose shirt fit",
    "fa": "فرم آزاد پیراهن",
    "pron": "/lus ʃɝt fɪt/",
    "example": "The shirt hangs loosely rather than fitting tightly.",
    "type": "clothing",
    "r": 4,
    "id": "l01-man-loose-shirt-fit",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "shirt",
    "attributeGroup": "fit"
  },
  {
    "x": 17.3,
    "y": 61.4,
    "en": "left arm swing",
    "fa": "حرکت دست چپ",
    "pron": "/lɛft ɑrm swɪŋ/",
    "example": "The man's free left arm hangs in a natural walking swing.",
    "type": "body",
    "r": 4,
    "id": "l01-man-left-arm-swing",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "lower-body",
    "attributeGroup": "posture"
  },
  {
    "x": 26.4,
    "y": 55.2,
    "en": "right hand grip",
    "fa": "گرفتن با دست راست",
    "pron": "/raɪt hænd ɡrɪp/",
    "example": "His right hand is the one holding the woman's hand.",
    "type": "action",
    "r": 4,
    "id": "l01-man-right-hand-grip",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "lower-body",
    "attributeGroup": "interaction"
  },
  {
    "x": 22.8,
    "y": 69,
    "en": "trouser taper",
    "fa": "تنگ شدن شلوار به پایین",
    "pron": "/ˈtraʊzɚ ˈteɪpɚ/",
    "example": "The trousers taper gently toward the lower legs.",
    "type": "clothing",
    "r": 4,
    "id": "l01-man-trouser-taper",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "lower-body",
    "attributeGroup": "shape"
  },
  {
    "x": 22.3,
    "y": 86.5,
    "en": "leading left foot",
    "fa": "پای چپ جلوتر",
    "pron": "/ˈlidɪŋ lɛft fʊt/",
    "example": "The man's left foot is stepping slightly ahead.",
    "type": "body",
    "r": 4,
    "id": "l01-man-leading-left-foot",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-man",
    "detailGroup": "lower-body",
    "attributeGroup": "gait"
  },
  {
    "x": 33,
    "y": 18,
    "en": "center-parted hair",
    "fa": "موی فرق وسط",
    "pron": "/ˈsɛntɚ ˈpɑrtɪd hɛr/",
    "example": "The woman's hair is parted near the center.",
    "type": "appearance",
    "r": 4,
    "id": "l01-woman-center-parted-hair",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "appearance",
    "attributeGroup": "hair-style"
  },
  {
    "x": 36.8,
    "y": 19.2,
    "en": "loose front strands",
    "fa": "تارهای جلویی آزاد",
    "pron": "/lus frʌnt strændz/",
    "example": "A few loose front strands frame the woman's face.",
    "type": "appearance",
    "r": 4,
    "id": "l01-woman-loose-front-strands",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "appearance",
    "attributeGroup": "hair-style"
  },
  {
    "x": 34,
    "y": 22,
    "en": "closed eyes",
    "fa": "چشم‌های بسته",
    "pron": "/kloʊzd aɪz/",
    "example": "Her eyes appear gently closed in the moment.",
    "type": "appearance",
    "r": 4,
    "id": "l01-woman-closed-eyes",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "appearance",
    "attributeGroup": "expression"
  },
  {
    "x": 36.2,
    "y": 27,
    "en": "tilted head",
    "fa": "سر کج شده",
    "pron": "/ˈtɪltɪd hɛd/",
    "example": "The woman's head tilts softly toward the man.",
    "type": "appearance",
    "r": 4,
    "id": "l01-woman-tilted-head",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "appearance",
    "attributeGroup": "head-angle"
  },
  {
    "x": 31.5,
    "y": 29.7,
    "en": "necklace pendant",
    "fa": "آویز گردنبند",
    "pron": "/ˈnɛkləs ˈpɛndənt/",
    "example": "A tiny pendant hangs from the woman's necklace.",
    "type": "accessory",
    "r": 4,
    "id": "l01-woman-necklace-pendant",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "appearance",
    "attributeGroup": "accessory"
  },
  {
    "x": 31.7,
    "y": 33.8,
    "en": "collarbone line",
    "fa": "خط استخوان ترقوه",
    "pron": "/ˈkɑlərˌboʊn laɪn/",
    "example": "The V-neck dress leaves the woman's collarbone line visible.",
    "type": "appearance",
    "r": 4,
    "id": "l01-woman-collarbone-line",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "appearance",
    "attributeGroup": "body-line"
  },
  {
    "x": 32.2,
    "y": 48.2,
    "en": "bent left elbow",
    "fa": "آرنج چپ خم‌شده",
    "pron": "/bɛnt lɛft ˈɛlboʊ/",
    "example": "Her left elbow bends as she wraps her arm around the man.",
    "type": "body",
    "r": 4,
    "id": "l01-woman-bent-left-elbow",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "posture",
    "attributeGroup": "arm-position"
  },
  {
    "x": 30.2,
    "y": 44.8,
    "en": "linked arm",
    "fa": "بازوی حلقه شده",
    "pron": "/lɪŋkt ɑrm/",
    "example": "The woman links one arm through the man's arm.",
    "type": "action",
    "r": 4,
    "id": "l01-woman-linked-arm",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "posture",
    "attributeGroup": "interaction"
  },
  {
    "x": 29.7,
    "y": 43.3,
    "en": "fingers on his forearm",
    "fa": "انگشت‌ها روی ساعد او",
    "pron": "/ˈfɪŋɡɚz ɑn hɪz ˈfɔrˌɑrm/",
    "example": "Her fingers rest on the man's forearm.",
    "type": "action",
    "r": 4,
    "id": "l01-woman-fingers-on-forearm",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "posture",
    "attributeGroup": "interaction"
  },
  {
    "x": 34.4,
    "y": 42,
    "en": "fitted bodice",
    "fa": "بالاتنه چسبان لباس",
    "pron": "/ˈfɪtɪd ˈbɑdəs/",
    "example": "The dress has a fitted bodice above the waist.",
    "type": "clothing",
    "r": 4,
    "id": "l01-woman-fitted-bodice",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "dress",
    "attributeGroup": "fit"
  },
  {
    "x": 36,
    "y": 40,
    "en": "soft pleats",
    "fa": "چین‌های نرم",
    "pron": "/sɔft plits/",
    "example": "Soft pleats shape the front of the dress.",
    "type": "clothing",
    "r": 4,
    "id": "l01-woman-soft-pleats",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "dress",
    "attributeGroup": "fabric-texture"
  },
  {
    "x": 35.6,
    "y": 52.5,
    "en": "waist seam",
    "fa": "دوخت کمر",
    "pron": "/weɪst sim/",
    "example": "A seam marks the waist area of the dress.",
    "type": "clothing",
    "r": 4,
    "id": "l01-woman-waist-seam",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "dress",
    "attributeGroup": "construction"
  },
  {
    "x": 36.6,
    "y": 63.6,
    "en": "tiered skirt panel",
    "fa": "لایه دامن طبقه‌ای",
    "pron": "/tɪrd skɝt ˈpænəl/",
    "example": "A tiered panel is visible in the lower part of the skirt.",
    "type": "clothing",
    "r": 4,
    "id": "l01-woman-tiered-skirt-panel",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "dress",
    "attributeGroup": "skirt-structure"
  },
  {
    "x": 37.6,
    "y": 76.8,
    "en": "sheer lower hem",
    "fa": "لبه پایینی نیمه شفاف",
    "pron": "/ʃɪr ˈloʊɚ hɛm/",
    "example": "The lower hem looks light and slightly sheer in the glow.",
    "type": "clothing",
    "r": 4,
    "id": "l01-woman-sheer-lower-hem",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "dress",
    "attributeGroup": "hem"
  },
  {
    "x": 38.4,
    "y": 56.7,
    "en": "dress folds",
    "fa": "چین‌خوردگی‌های لباس",
    "pron": "/drɛs foʊldz/",
    "example": "Loose folds run down the front of the woman's dress.",
    "type": "clothing",
    "r": 4,
    "id": "l01-woman-dress-folds",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "dress",
    "attributeGroup": "fabric-texture"
  },
  {
    "x": 39.5,
    "y": 82.5,
    "en": "dress brushing water",
    "fa": "لباس در تماس با آب",
    "pron": "/drɛs ˈbrʌʃɪŋ ˈwɔtɚ/",
    "example": "The lower edge of the dress brushes the shallow water.",
    "type": "clothing",
    "r": 4,
    "id": "l01-woman-dress-brushing-water",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "dress",
    "attributeGroup": "interaction-with-setting"
  },
  {
    "x": 38.3,
    "y": 89,
    "en": "woman's leading foot",
    "fa": "پای جلوتر زن",
    "pron": "/ˈwʊmənz ˈlidɪŋ fʊt/",
    "example": "One of the woman's bare feet steps forward into the water.",
    "type": "body",
    "r": 4,
    "id": "l01-woman-leading-foot",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "posture",
    "attributeGroup": "gait"
  },
  {
    "x": 37.2,
    "y": 70.2,
    "en": "relaxed shoulders",
    "fa": "شانه‌های رها",
    "pron": "/rɪˈlækst ˈʃoʊldɚz/",
    "example": "Her shoulders look relaxed and at ease.",
    "type": "body",
    "r": 4,
    "id": "l01-woman-relaxed-shoulders",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-woman",
    "detailGroup": "posture",
    "attributeGroup": "body-language"
  },
  {
    "x": 31.6,
    "y": 55.2,
    "en": "interlaced fingers",
    "fa": "انگشت‌های درهم",
    "pron": "/ˌɪntɚˈleɪst ˈfɪŋɡɚz/",
    "example": "Their fingers are interlaced rather than simply touching.",
    "type": "action",
    "r": 4,
    "id": "l01-hands-interlaced-fingers",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-joined-hands",
    "detailGroup": "grip",
    "attributeGroup": "finger-position"
  },
  {
    "x": 32.8,
    "y": 54.8,
    "en": "two-hand contact",
    "fa": "تماس دو دست",
    "pron": "/tu hænd ˈkɑnˌtækt/",
    "example": "The couple maintains clear two-hand contact while walking.",
    "type": "action",
    "r": 4,
    "id": "l01-hands-two-hand-contact",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-joined-hands",
    "detailGroup": "grip",
    "attributeGroup": "contact"
  },
  {
    "x": 29.9,
    "y": 55.8,
    "en": "his right hand",
    "fa": "دست راست او",
    "pron": "/hɪz raɪt hænd/",
    "example": "The hand on the left side of the pair belongs to the man.",
    "type": "body",
    "r": 4,
    "id": "l01-hands-his-right-hand",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-joined-hands",
    "detailGroup": "grip",
    "attributeGroup": "ownership"
  },
  {
    "x": 34.2,
    "y": 56,
    "en": "her left hand",
    "fa": "دست چپ او",
    "pron": "/hɚ lɛft hænd/",
    "example": "The hand on the right side of the pair belongs to the woman.",
    "type": "body",
    "r": 4,
    "id": "l01-hands-her-left-hand",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-joined-hands",
    "detailGroup": "grip",
    "attributeGroup": "ownership"
  },
  {
    "x": 33.6,
    "y": 58.7,
    "en": "relaxed handhold",
    "fa": "دست گرفتن راحت",
    "pron": "/rɪˈlækst ˈhændˌhoʊld/",
    "example": "Their handhold looks relaxed rather than stiff.",
    "type": "action",
    "r": 4,
    "id": "l01-hands-relaxed-handhold",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-joined-hands",
    "detailGroup": "grip",
    "attributeGroup": "quality"
  },
  {
    "x": 32.8,
    "y": 51.8,
    "en": "hands in front of them",
    "fa": "دست‌ها جلوی بدن",
    "pron": "/hændz ɪn frʌnt əv ðɛm/",
    "example": "Their joined hands fall naturally in front of their bodies.",
    "type": "action",
    "r": 4,
    "id": "l01-hands-in-front",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-joined-hands",
    "detailGroup": "grip",
    "attributeGroup": "spatial-position"
  },
  {
    "x": 31.8,
    "y": 48.6,
    "en": "close body spacing",
    "fa": "فاصله نزدیک بدن‌ها",
    "pron": "/kloʊs ˈbɑdi ˈspeɪsɪŋ/",
    "example": "Their body spacing stays close as they walk together.",
    "type": "inference",
    "r": 4,
    "id": "l01-hands-close-body-spacing",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-joined-hands",
    "detailGroup": "grip",
    "attributeGroup": "proximity"
  },
  {
    "x": 29.4,
    "y": 49,
    "en": "walking hand in hand",
    "fa": "دست در دست راه رفتن",
    "pron": "/ˈwɔkɪŋ hænd ɪn hænd/",
    "example": "They are walking hand in hand along the beach.",
    "type": "action",
    "r": 4,
    "id": "l01-hands-walking-hand-in-hand",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-joined-hands",
    "detailGroup": "grip",
    "attributeGroup": "action-pattern"
  },
  {
    "x": 14.5,
    "y": 71.8,
    "en": "foamy water edge",
    "fa": "لبه کف‌آلود آب",
    "pron": "/ˈfoʊmi ˈwɔtɚ ɛdʒ/",
    "example": "A foamy water edge runs diagonally along the sand.",
    "type": "setting",
    "r": 4,
    "id": "l01-shoreline-foamy-water-edge",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-shoreline",
    "detailGroup": "ground",
    "attributeGroup": "surface-water"
  },
  {
    "x": 16.2,
    "y": 76.4,
    "en": "thin water film",
    "fa": "لایه نازک آب",
    "pron": "/θɪn ˈwɔtɚ fɪlm/",
    "example": "A thin film of water covers part of the shoreline.",
    "type": "setting",
    "r": 4,
    "id": "l01-shoreline-thin-water-film",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-shoreline",
    "detailGroup": "ground",
    "attributeGroup": "surface-water"
  },
  {
    "x": 11,
    "y": 80.4,
    "en": "darker wet band",
    "fa": "نوار تیره خیس",
    "pron": "/ˈdɑrkɚ wɛt bænd/",
    "example": "A darker wet band marks the recently washed sand.",
    "type": "setting",
    "r": 4,
    "id": "l01-shoreline-darker-wet-band",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-shoreline",
    "detailGroup": "ground",
    "attributeGroup": "color-zone"
  },
  {
    "x": 7.8,
    "y": 74.4,
    "en": "lighter dry sand",
    "fa": "شن روشن‌تر خشک",
    "pron": "/ˈlaɪtɚ draɪ sænd/",
    "example": "Farther left, the sand looks lighter and drier.",
    "type": "setting",
    "r": 4,
    "id": "l01-shoreline-lighter-dry-sand",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-shoreline",
    "detailGroup": "ground",
    "attributeGroup": "color-zone"
  },
  {
    "x": 17.5,
    "y": 60.8,
    "en": "narrow beach strip",
    "fa": "نوار باریک ساحل",
    "pron": "/ˈnæroʊ bitʃ strɪp/",
    "example": "Only a narrow strip of beach is visible beside the water.",
    "type": "setting",
    "r": 4,
    "id": "l01-shoreline-narrow-beach-strip",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-shoreline",
    "detailGroup": "ground",
    "attributeGroup": "width"
  },
  {
    "x": 19.6,
    "y": 68,
    "en": "shoreline slope",
    "fa": "شیب ساحل",
    "pron": "/ˈʃɔrˌlaɪn sloʊp/",
    "example": "The shoreline slopes gently toward the sea.",
    "type": "setting",
    "r": 4,
    "id": "l01-shoreline-slope",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-shoreline",
    "detailGroup": "ground",
    "attributeGroup": "shape"
  },
  {
    "x": 28,
    "y": 86,
    "en": "fresh footprints",
    "fa": "ردپاهای تازه",
    "pron": "/frɛʃ ˈfʊtˌprɪnts/",
    "example": "Fresh footprints appear in the wet sand behind the couple.",
    "type": "setting",
    "r": 4,
    "id": "l01-shoreline-fresh-footprints",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-shoreline",
    "detailGroup": "ground",
    "attributeGroup": "surface-mark"
  },
  {
    "x": 12,
    "y": 67,
    "en": "curving waterline",
    "fa": "خط خمیده آب",
    "pron": "/ˈkɝvɪŋ ˈwɔtɚˌlaɪn/",
    "example": "The waterline curves softly around the beach.",
    "type": "setting",
    "r": 4,
    "id": "l01-shoreline-curving-waterline",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-shoreline",
    "detailGroup": "ground",
    "attributeGroup": "shape"
  },
  {
    "x": 5.5,
    "y": 11,
    "en": "tall leaning palm",
    "fa": "نخل بلند مایل",
    "pron": "/tɔl ˈlinɪŋ pɑm/",
    "example": "One tall palm tree leans slightly over the beach.",
    "type": "nature",
    "r": 4,
    "id": "l01-palms-tall-leaning-palm",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-palm-trees",
    "detailGroup": "vegetation",
    "attributeGroup": "tree-form"
  },
  {
    "x": 8.3,
    "y": 13.5,
    "en": "palm fronds",
    "fa": "برگ‌های نخل",
    "pron": "/pɑm frɑndz/",
    "example": "Palm fronds spread outward near the top of the trees.",
    "type": "nature",
    "r": 4,
    "id": "l01-palms-palm-fronds",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-palm-trees",
    "detailGroup": "vegetation",
    "attributeGroup": "foliage"
  },
  {
    "x": 4.7,
    "y": 24.5,
    "en": "clustered trunks",
    "fa": "تنه‌های خوشه‌ای",
    "pron": "/ˈklʌstɚd trʌŋks/",
    "example": "Several palm trunks appear clustered together near the beach.",
    "type": "nature",
    "r": 4,
    "id": "l01-palms-clustered-trunks",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-palm-trees",
    "detailGroup": "vegetation",
    "attributeGroup": "trunks"
  },
  {
    "x": 9.5,
    "y": 26.5,
    "en": "dark tree line",
    "fa": "خط تیره درختان",
    "pron": "/dɑrk tri laɪn/",
    "example": "A dark tree line continues into the distance along the beach.",
    "type": "nature",
    "r": 4,
    "id": "l01-palms-dark-tree-line",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-palm-trees",
    "detailGroup": "vegetation",
    "attributeGroup": "background-line"
  },
  {
    "x": 6.2,
    "y": 18.8,
    "en": "layered silhouettes",
    "fa": "سیلوئت‌های لایه‌لایه",
    "pron": "/ˈleɪɚd ˌsɪluˈɛts/",
    "example": "The palms form layered silhouettes against the bright sky.",
    "type": "nature",
    "r": 4,
    "id": "l01-palms-layered-silhouettes",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-palm-trees",
    "detailGroup": "vegetation",
    "attributeGroup": "light-contrast"
  },
  {
    "x": 11.2,
    "y": 30.5,
    "en": "beachside grove",
    "fa": "بیشه کنار ساحل",
    "pron": "/ˈbitʃˌsaɪd ɡroʊv/",
    "example": "The palms create a beachside grove on the left.",
    "type": "nature",
    "r": 4,
    "id": "l01-palms-beachside-grove",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-palm-trees",
    "detailGroup": "vegetation",
    "attributeGroup": "setting-context"
  },
  {
    "x": 77,
    "y": 73.5,
    "en": "small ripples",
    "fa": "موجک‌های کوچک",
    "pron": "/smɔl ˈrɪpəlz/",
    "example": "Small ripples texture the surface of the ocean.",
    "type": "nature",
    "r": 4,
    "id": "l01-ocean-small-ripples",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-ocean",
    "detailGroup": "water",
    "attributeGroup": "surface-motion"
  },
  {
    "x": 89.5,
    "y": 77.5,
    "en": "open sea expanse",
    "fa": "گستره آب باز",
    "pron": "/ˈoʊpən si ɪkˈspæns/",
    "example": "A broad expanse of open sea fills the right side.",
    "type": "nature",
    "r": 4,
    "id": "l01-ocean-open-sea-expanse",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-ocean",
    "detailGroup": "water",
    "attributeGroup": "scale"
  },
  {
    "x": 74,
    "y": 63,
    "en": "warm water highlights",
    "fa": "درخشش گرم روی آب",
    "pron": "/wɔrm ˈwɔtɚ ˈhaɪˌlaɪts/",
    "example": "Warm highlights shimmer on the water under the sunset.",
    "type": "nature",
    "r": 4,
    "id": "l01-ocean-warm-water-highlights",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-ocean",
    "detailGroup": "water",
    "attributeGroup": "light-on-water"
  },
  {
    "x": 80,
    "y": 51.8,
    "en": "pale horizon band",
    "fa": "نوار روشن افق",
    "pron": "/peɪl həˈraɪzən bænd/",
    "example": "A pale band separates the sea from the sky at the horizon.",
    "type": "nature",
    "r": 4,
    "id": "l01-ocean-pale-horizon-band",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-ocean",
    "detailGroup": "water",
    "attributeGroup": "spatial-line"
  },
  {
    "x": 66,
    "y": 77.8,
    "en": "foreground water texture",
    "fa": "بافت آب پیش‌زمینه",
    "pron": "/ˈfɔrˌɡraʊnd ˈwɔtɚ ˈtɛkstʃɚ/",
    "example": "The foreground water shows a gentle textured surface.",
    "type": "nature",
    "r": 4,
    "id": "l01-ocean-foreground-texture",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-ocean",
    "detailGroup": "water",
    "attributeGroup": "texture"
  },
  {
    "x": 94,
    "y": 69.5,
    "en": "right-edge ripples",
    "fa": "موجک‌های لبه راست",
    "pron": "/raɪt ɛdʒ ˈrɪpəlz/",
    "example": "The far right edge of the sea shows darker ripples.",
    "type": "nature",
    "r": 4,
    "id": "l01-ocean-right-edge-ripples",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-ocean",
    "detailGroup": "water",
    "attributeGroup": "surface-motion"
  },
  {
    "x": 71.2,
    "y": 57,
    "en": "calm waterline",
    "fa": "خط آرام آب",
    "pron": "/kɑm ˈwɔtɚˌlaɪn/",
    "example": "The waterline looks calm rather than stormy.",
    "type": "nature",
    "r": 4,
    "id": "l01-ocean-calm-waterline",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-ocean",
    "detailGroup": "water",
    "attributeGroup": "water-state"
  },
  {
    "x": 86,
    "y": 59.5,
    "en": "no visible boats",
    "fa": "قایق دیده نمی‌شود",
    "pron": "/noʊ ˈvɪzəbəl boʊts/",
    "example": "No boats or swimmers are visible on the open water.",
    "type": "nature",
    "r": 4,
    "id": "l01-ocean-no-visible-boats",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-ocean",
    "detailGroup": "water",
    "attributeGroup": "absence-detail"
  },
  {
    "x": 62.8,
    "y": 46.3,
    "en": "sun disc",
    "fa": "قرص خورشید",
    "pron": "/sʌn dɪsk/",
    "example": "The round sun disc is visible just above the horizon.",
    "type": "light",
    "r": 4,
    "id": "l01-sun-sun-disc",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-low-sun",
    "detailGroup": "sky-light",
    "attributeGroup": "sun-shape"
  },
  {
    "x": 58,
    "y": 41.5,
    "en": "warm sky glow",
    "fa": "درخشش گرم آسمان",
    "pron": "/wɔrm skaɪ ɡloʊ/",
    "example": "A warm glow spreads through the sky around the setting sun.",
    "type": "light",
    "r": 4,
    "id": "l01-sun-warm-sky-glow",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-low-sun",
    "detailGroup": "sky-light",
    "attributeGroup": "light-quality"
  },
  {
    "x": 49,
    "y": 26,
    "en": "peach-orange gradient",
    "fa": "گرادیان هلویی نارنجی",
    "pron": "/pitʃ ˈɔrɪndʒ ˈɡreɪdiənt/",
    "example": "The sky shows a peach-orange gradient near the horizon.",
    "type": "light",
    "r": 4,
    "id": "l01-sun-peach-orange-gradient",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-low-sun",
    "detailGroup": "sky-light",
    "attributeGroup": "color"
  },
  {
    "x": 68,
    "y": 49.2,
    "en": "near-horizon position",
    "fa": "جایگاه نزدیک افق",
    "pron": "/nɪr həˈraɪzən pəˈzɪʃən/",
    "example": "The sun sits in a near-horizon position.",
    "type": "light",
    "r": 4,
    "id": "l01-sun-near-horizon-position",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-low-sun",
    "detailGroup": "sky-light",
    "attributeGroup": "spatial-position"
  },
  {
    "x": 64.2,
    "y": 69,
    "en": "shimmering light column",
    "fa": "ستون نور لرزان",
    "pron": "/ˈʃɪmɚɪŋ laɪt ˈkɑləm/",
    "example": "A shimmering column of light runs down the water.",
    "type": "light",
    "r": 4,
    "id": "l01-reflection-shimmering-column",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-sunset-reflection",
    "detailGroup": "reflection",
    "attributeGroup": "shape"
  },
  {
    "x": 64,
    "y": 56,
    "en": "broken reflection bands",
    "fa": "نوارهای شکسته بازتاب",
    "pron": "/ˈbroʊkən rɪˈflɛkʃən bændz/",
    "example": "The reflection breaks into bright bands across the ripples.",
    "type": "light",
    "r": 4,
    "id": "l01-reflection-broken-bands",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-sunset-reflection",
    "detailGroup": "reflection",
    "attributeGroup": "texture"
  },
  {
    "x": 63.8,
    "y": 81.2,
    "en": "elongated highlight path",
    "fa": "مسیر کشیده نور",
    "pron": "/ɪˈlɔŋɡeɪtɪd ˈhaɪˌlaɪt pæθ/",
    "example": "The bright highlight path stretches toward the foreground.",
    "type": "light",
    "r": 4,
    "id": "l01-reflection-elongated-path",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-sunset-reflection",
    "detailGroup": "reflection",
    "attributeGroup": "extent"
  },
  {
    "x": 63.3,
    "y": 61.8,
    "en": "gold-white sparkle",
    "fa": "جرقه طلایی سفید",
    "pron": "/ɡoʊld waɪt ˈspɑrkəl/",
    "example": "Gold-white sparkles appear inside the reflection.",
    "type": "light",
    "r": 4,
    "id": "l01-reflection-gold-white-sparkle",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l01-sunset-reflection",
    "detailGroup": "reflection",
    "attributeGroup": "color-light"
  }
];
  const L1_HOTSPOT_DETAILS={
  "man": {
    "phrase": "walk beside the woman",
    "collocations": [
      "button-up shirt",
      "rolled trousers",
      "bare feet"
    ],
    "grammar": "The man is walking beside the woman at the shoreline.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present continuous",
        "sentence": "The man is walking beside the woman at the shoreline.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "The man walked beside the woman along the beach in the retelling.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed that the man stays close to the woman in the scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "If the walk continues, the man may keep strolling beside her.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Present continuous for visible action + cautious continuation"
  },
  "woman": {
    "phrase": "lean gently on someone",
    "collocations": [
      "white dress",
      "soft smile",
      "bare feet"
    ],
    "grammar": "The woman is walking close to the man and leaning gently toward him.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present continuous",
        "sentence": "The woman is walking close to the man and leaning gently toward him.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "The woman walked beside him and leaned toward his shoulder in the retelling.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed the woman's relaxed posture and closeness in the scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "She may stay close to him as they continue walking.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Present continuous + evidence-based description of posture"
  },
  "joined hands": {
    "phrase": "walk hand in hand",
    "collocations": [
      "interlaced fingers",
      "relaxed handhold",
      "close body spacing"
    ],
    "grammar": "They are walking hand in hand.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present continuous",
        "sentence": "They are walking hand in hand.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "They walked hand in hand along the beach in the retelling.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed that their hands are joined in the photo.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "They may keep holding hands as they move along the shore.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Present continuous + relationship action language"
  },
  "shoreline": {
    "phrase": "describe the setting",
    "collocations": [
      "shoreline",
      "scene detail"
    ],
    "grammar": "The shoreline curves away along the left side of the scene.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The shoreline curves away along the left side of the scene.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the shoreline curves away along the left side of the scene.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed shoreline in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention shoreline as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
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
    "phrase": "sit low above the horizon",
    "collocations": [
      "sun disc",
      "warm sky glow",
      "peach-orange gradient"
    ],
    "grammar": "The sun is sitting low above the water.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present continuous",
        "sentence": "The sun is sitting low above the water.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "The sun sat low above the sea in the retelling.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed that the sun is close to the horizon.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "The sun may drop lower if the moment continues.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Location and progressive scene description"
  },
  "sunset reflection": {
    "phrase": "stretch across the water",
    "collocations": [
      "light column",
      "shimmering path",
      "gold-white sparkle"
    ],
    "grammar": "A bright sunset reflection is stretching across the water.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present continuous",
        "sentence": "A bright sunset reflection is stretching across the water.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "A bright reflection stretched across the water in the retelling.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed a long band of reflected light on the sea.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "The reflection may lengthen or fade as the light changes.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Present continuous + light description"
  },
  "dark wavy hair": {
    "phrase": "notice the facial detail",
    "collocations": [
      "dark wavy hair",
      "scene detail"
    ],
    "grammar": "The man has dark wavy hair.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The man has dark wavy hair.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the man has dark wavy hair.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed dark wavy hair in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention dark wavy hair as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "man's soft smile": {
    "phrase": "notice the facial detail",
    "collocations": [
      "man's soft smile",
      "scene detail"
    ],
    "grammar": "The man has a soft visible smile.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The man has a soft visible smile.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the man has a soft visible smile.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed man's soft smile in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention man's soft smile as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "man's downward gaze": {
    "phrase": "notice the facial detail",
    "collocations": [
      "man's downward gaze",
      "scene detail"
    ],
    "grammar": "The man is looking downward toward the woman.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The man is looking downward toward the woman.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the man is looking downward toward the woman.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed man's downward gaze in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention man's downward gaze as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "button-up shirt": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "button-up shirt",
      "scene detail"
    ],
    "grammar": "The man is wearing a long-sleeved button-up shirt.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The man is wearing a long-sleeved button-up shirt.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the man is wearing a long-sleeved button-up shirt.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed button-up shirt in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention button-up shirt as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "pale shirt color": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "pale shirt color",
      "scene detail"
    ],
    "grammar": "The shirt appears white to very pale blue in the warm sunset light.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The shirt appears white to very pale blue in the warm sunset light.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the shirt appears white to very pale blue in the warm sunset light.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed pale shirt color in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention pale shirt color as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "long sleeves": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "long sleeves",
      "scene detail"
    ],
    "grammar": "The shirt has long sleeves.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The shirt has long sleeves.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the shirt has long sleeves.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed long sleeves in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention long sleeves as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "rolled sleeves": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "rolled sleeves",
      "scene detail"
    ],
    "grammar": "The sleeves are rolled to the forearms.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The sleeves are rolled to the forearms.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the sleeves are rolled to the forearms.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed rolled sleeves in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention rolled sleeves as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "open collar": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "open collar",
      "scene detail"
    ],
    "grammar": "The shirt collar is open at the neck.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The shirt collar is open at the neck.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the shirt collar is open at the neck.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed open collar in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention open collar as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "chest pocket": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "chest pocket",
      "scene detail"
    ],
    "grammar": "A rectangular chest pocket is visible on the shirt.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A rectangular chest pocket is visible on the shirt.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a rectangular chest pocket is visible on the shirt.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed chest pocket in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention chest pocket as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "gray-taupe trousers": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "gray-taupe trousers",
      "scene detail"
    ],
    "grammar": "The man is wearing gray-taupe trousers.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The man is wearing gray-taupe trousers.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the man is wearing gray-taupe trousers.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed gray-taupe trousers in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention gray-taupe trousers as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "rolled trouser cuffs": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "rolled trouser cuffs",
      "scene detail"
    ],
    "grammar": "The trouser legs are rolled to about mid-calf.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The trouser legs are rolled to about mid-calf.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the trouser legs are rolled to about mid-calf.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed rolled trouser cuffs in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention rolled trouser cuffs as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "man's bare feet": {
    "phrase": "point out the body position",
    "collocations": [
      "man's bare feet",
      "scene detail"
    ],
    "grammar": "The man is barefoot at the waterline.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The man is barefoot at the waterline.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the man is barefoot at the waterline.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed man's bare feet in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention man's bare feet as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "brown hair": {
    "phrase": "notice the facial detail",
    "collocations": [
      "brown hair",
      "scene detail"
    ],
    "grammar": "The woman has brown hair.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The woman has brown hair.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the woman has brown hair.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed brown hair in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention brown hair as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "loosely pulled-back hair": {
    "phrase": "notice the facial detail",
    "collocations": [
      "loosely pulled-back hair",
      "scene detail"
    ],
    "grammar": "Her hair is pulled back loosely, with soft strands around her face.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Her hair is pulled back loosely, with soft strands around her face.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that her hair is pulled back loosely, with soft strands around her face.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed loosely pulled-back hair in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention loosely pulled-back hair as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "woman's soft smile": {
    "phrase": "notice the facial detail",
    "collocations": [
      "woman's soft smile",
      "scene detail"
    ],
    "grammar": "The woman is visibly smiling.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The woman is visibly smiling.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the woman is visibly smiling.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed woman's soft smile in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention woman's soft smile as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "woman's downward gaze": {
    "phrase": "notice the facial detail",
    "collocations": [
      "woman's downward gaze",
      "scene detail"
    ],
    "grammar": "Her gaze is directed downward rather than toward the camera.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Her gaze is directed downward rather than toward the camera.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that her gaze is directed downward rather than toward the camera.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed woman's downward gaze in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention woman's downward gaze as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "delicate necklace": {
    "phrase": "notice the accessory",
    "collocations": [
      "delicate necklace",
      "scene detail"
    ],
    "grammar": "A delicate necklace is visible at her neckline.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A delicate necklace is visible at her neckline.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a delicate necklace is visible at her neckline.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed delicate necklace in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention delicate necklace as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
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
  "V-neckline": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "V-neckline",
      "scene detail"
    ],
    "grammar": "The dress has a visible V-shaped neckline.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The dress has a visible V-shaped neckline.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the dress has a visible V-shaped neckline.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed V-neckline in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention V-neckline as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "sleeveless design": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "sleeveless design",
      "scene detail"
    ],
    "grammar": "The dress is sleeveless.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The dress is sleeveless.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the dress is sleeveless.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed sleeveless design in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention sleeveless design as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "thin shoulder straps": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "thin shoulder straps",
      "scene detail"
    ],
    "grammar": "Thin shoulder straps are visible on the dress.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Thin shoulder straps are visible on the dress.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that thin shoulder straps are visible on the dress.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed thin shoulder straps in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention thin shoulder straps as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "gathered bodice": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "gathered bodice",
      "scene detail"
    ],
    "grammar": "The bodice has gathered fabric.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The bodice has gathered fabric.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the bodice has gathered fabric.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed gathered bodice in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention gathered bodice as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "gathered waist": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "gathered waist",
      "scene detail"
    ],
    "grammar": "The dress gathers at the waist.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The dress gathers at the waist.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the dress gathers at the waist.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed gathered waist in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention gathered waist as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "flowing skirt": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "flowing skirt",
      "scene detail"
    ],
    "grammar": "The lower part of the dress falls in a loose flowing skirt.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The lower part of the dress falls in a loose flowing skirt.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the lower part of the dress falls in a loose flowing skirt.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed flowing skirt in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention flowing skirt as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "maxi length": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "maxi length",
      "scene detail"
    ],
    "grammar": "The dress extends to ankle or maxi length.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The dress extends to ankle or maxi length.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the dress extends to ankle or maxi length.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed maxi length in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention maxi length as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "woman's bare feet": {
    "phrase": "point out the body position",
    "collocations": [
      "woman's bare feet",
      "scene detail"
    ],
    "grammar": "The woman is barefoot in the shallow water.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The woman is barefoot in the shallow water.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the woman is barefoot in the shallow water.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed woman's bare feet in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention woman's bare feet as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "head on shoulder": {
    "phrase": "describe the action",
    "collocations": [
      "head on shoulder",
      "scene detail"
    ],
    "grammar": "The woman rests her head against the man’s shoulder.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The woman rests her head against the man’s shoulder.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the woman rests her head against the man’s shoulder.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed head on shoulder in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention head on shoulder as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "hand on his arm": {
    "phrase": "describe the action",
    "collocations": [
      "hand on his arm",
      "scene detail"
    ],
    "grammar": "One of her hands rests on or holds his arm.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "One of her hands rests on or holds his arm.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that one of her hands rests on or holds his arm.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed hand on his arm in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention hand on his arm as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "leaning posture": {
    "phrase": "point out the body position",
    "collocations": [
      "leaning posture",
      "scene detail"
    ],
    "grammar": "Her upper body leans toward the man.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Her upper body leans toward the man.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that her upper body leans toward the man.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed leaning posture in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention leaning posture as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
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
  "shallow water": {
    "phrase": "walk through shallow water",
    "collocations": [
      "very shallow water",
      "waterline",
      "shore edge"
    ],
    "grammar": "Their feet are partly in shallow water."
  },
  "thin white foam": {
    "phrase": "describe the detail",
    "collocations": [
      "thin white foam",
      "scene detail"
    ],
    "grammar": "A thin white line of foam marks the shore break.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A thin white line of foam marks the shore break.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a thin white line of foam marks the shore break.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed thin white foam in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention thin white foam as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "foot impressions": {
    "phrase": "describe the detail",
    "collocations": [
      "foot impressions",
      "scene detail"
    ],
    "grammar": "Faint foot impressions are visible on the wet sand.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Faint foot impressions are visible on the wet sand.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that faint foot impressions are visible on the wet sand.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed foot impressions in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention foot impressions as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "curving shore": {
    "phrase": "describe the setting",
    "collocations": [
      "curving shore",
      "scene detail"
    ],
    "grammar": "The shore curves away toward the left background.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The shore curves away toward the left background.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the shore curves away toward the left background.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed curving shore in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention curving shore as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "gray-beige sand": {
    "phrase": "notice the facial detail",
    "collocations": [
      "gray-beige sand",
      "scene detail"
    ],
    "grammar": "The wet sand reads as gray-beige under the warm light.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The wet sand reads as gray-beige under the warm light.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the wet sand reads as gray-beige under the warm light.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed gray-beige sand in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention gray-beige sand as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "coastal vegetation": {
    "phrase": "describe the natural detail",
    "collocations": [
      "coastal vegetation",
      "beach scene"
    ],
    "grammar": "Darker coastal vegetation runs behind the palms.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Darker coastal vegetation runs behind the palms.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that darker coastal vegetation runs behind the palms.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed coastal vegetation in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention coastal vegetation as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "dark palm silhouettes": {
    "phrase": "describe the natural detail",
    "collocations": [
      "dark palm silhouettes",
      "beach scene"
    ],
    "grammar": "Some palms appear as dark silhouettes against the warm sky.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Some palms appear as dark silhouettes against the warm sky.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that some palms appear as dark silhouettes against the warm sky.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed dark palm silhouettes in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention dark palm silhouettes as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "flat horizon": {
    "phrase": "describe the setting",
    "collocations": [
      "flat horizon",
      "scene detail"
    ],
    "grammar": "The sea meets a nearly flat horizon.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The sea meets a nearly flat horizon.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the sea meets a nearly flat horizon.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed flat horizon in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention flat horizon as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "gentle waves": {
    "phrase": "describe the natural detail",
    "collocations": [
      "gentle waves",
      "beach scene"
    ],
    "grammar": "Small gentle waves are visible across the sea surface.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Small gentle waves are visible across the sea surface.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that small gentle waves are visible across the sea surface.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed gentle waves in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention gentle waves as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "smooth reflective water": {
    "phrase": "describe the natural detail",
    "collocations": [
      "smooth reflective water",
      "beach scene"
    ],
    "grammar": "The water surface looks smooth and reflective.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The water surface looks smooth and reflective.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the water surface looks smooth and reflective.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed smooth reflective water in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention smooth reflective water as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "orange-pink sky": {
    "phrase": "describe the light",
    "collocations": [
      "orange-pink sky",
      "sunset scene"
    ],
    "grammar": "Orange and pink tones dominate the sky near the horizon.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Orange and pink tones dominate the sky near the horizon.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that orange and pink tones dominate the sky near the horizon.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed orange-pink sky in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention orange-pink sky as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "golden light": {
    "phrase": "describe the light",
    "collocations": [
      "golden light",
      "sunset scene"
    ],
    "grammar": "Warm low-angle golden light fills the scene.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Warm low-angle golden light fills the scene.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that warm low-angle golden light fills the scene.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed golden light in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention golden light as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "vertical light path": {
    "phrase": "describe the light",
    "collocations": [
      "vertical light path",
      "sunset scene"
    ],
    "grammar": "The sun creates a bright vertical path on the water.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The sun creates a bright vertical path on the water.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the sun creates a bright vertical path on the water.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed vertical light path in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention vertical light path as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "gold water highlights": {
    "phrase": "describe the light",
    "collocations": [
      "gold water highlights",
      "sunset scene"
    ],
    "grammar": "Gold highlights shimmer on the water beneath the sun.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Gold highlights shimmer on the water beneath the sun.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that gold highlights shimmer on the water beneath the sun.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed gold water highlights in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention gold water highlights as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "tousled fringe": {
    "phrase": "notice the facial detail",
    "collocations": [
      "tousled fringe",
      "scene detail"
    ],
    "grammar": "A tousled fringe falls over the man's forehead.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A tousled fringe falls over the man's forehead.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a tousled fringe falls over the man's forehead.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed tousled fringe in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention tousled fringe as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "soft sideburns": {
    "phrase": "notice the facial detail",
    "collocations": [
      "soft sideburns",
      "scene detail"
    ],
    "grammar": "Soft sideburns are visible near the man's ears.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Soft sideburns are visible near the man's ears.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that soft sideburns are visible near the man's ears.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed soft sideburns in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention soft sideburns as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "relaxed jawline": {
    "phrase": "notice the facial detail",
    "collocations": [
      "relaxed jawline",
      "scene detail"
    ],
    "grammar": "The man's jawline looks relaxed rather than tense.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The man's jawline looks relaxed rather than tense.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the man's jawline looks relaxed rather than tense.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed relaxed jawline in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention relaxed jawline as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "shirt placket": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "shirt placket",
      "scene detail"
    ],
    "grammar": "The shirt placket runs vertically down the center of the man's shirt.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The shirt placket runs vertically down the center of the man's shirt.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the shirt placket runs vertically down the center of the man's shirt.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed shirt placket in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention shirt placket as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "upper shirt buttons": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "upper shirt buttons",
      "scene detail"
    ],
    "grammar": "A few upper shirt buttons are undone at the neckline.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A few upper shirt buttons are undone at the neckline.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a few upper shirt buttons are undone at the neckline.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed upper shirt buttons in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention upper shirt buttons as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "forearm exposure": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "forearm exposure",
      "scene detail"
    ],
    "grammar": "The rolled sleeve leaves much of the man's forearm exposed.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The rolled sleeve leaves much of the man's forearm exposed.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the rolled sleeve leaves much of the man's forearm exposed.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed forearm exposure in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention forearm exposure as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "shirt hem": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "shirt hem",
      "scene detail"
    ],
    "grammar": "The loose shirt hem falls below the man's waist.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The loose shirt hem falls below the man's waist.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the loose shirt hem falls below the man's waist.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed shirt hem in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention shirt hem as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "loose shirt fit": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "loose shirt fit",
      "scene detail"
    ],
    "grammar": "The shirt hangs loosely rather than fitting tightly.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The shirt hangs loosely rather than fitting tightly.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the shirt hangs loosely rather than fitting tightly.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed loose shirt fit in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention loose shirt fit as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "left arm swing": {
    "phrase": "point out the body position",
    "collocations": [
      "left arm swing",
      "scene detail"
    ],
    "grammar": "The man's free left arm hangs in a natural walking swing.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The man's free left arm hangs in a natural walking swing.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the man's free left arm hangs in a natural walking swing.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed left arm swing in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention left arm swing as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "right hand grip": {
    "phrase": "describe the action",
    "collocations": [
      "right hand grip",
      "scene detail"
    ],
    "grammar": "His right hand is the one holding the woman's hand.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "His right hand is the one holding the woman's hand.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that his right hand is the one holding the woman's hand.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed right hand grip in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention right hand grip as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "trouser taper": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "trouser taper",
      "scene detail"
    ],
    "grammar": "The trousers taper gently toward the lower legs.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The trousers taper gently toward the lower legs.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the trousers taper gently toward the lower legs.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed trouser taper in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention trouser taper as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "leading left foot": {
    "phrase": "point out the body position",
    "collocations": [
      "leading left foot",
      "scene detail"
    ],
    "grammar": "The man's left foot is stepping slightly ahead.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The man's left foot is stepping slightly ahead.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the man's left foot is stepping slightly ahead.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed leading left foot in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention leading left foot as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "center-parted hair": {
    "phrase": "notice the facial detail",
    "collocations": [
      "center-parted hair",
      "scene detail"
    ],
    "grammar": "The woman's hair is parted near the center.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The woman's hair is parted near the center.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the woman's hair is parted near the center.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed center-parted hair in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention center-parted hair as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "loose front strands": {
    "phrase": "notice the facial detail",
    "collocations": [
      "loose front strands",
      "scene detail"
    ],
    "grammar": "A few loose front strands frame the woman's face.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A few loose front strands frame the woman's face.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a few loose front strands frame the woman's face.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed loose front strands in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention loose front strands as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "closed eyes": {
    "phrase": "notice the facial detail",
    "collocations": [
      "closed eyes",
      "scene detail"
    ],
    "grammar": "Her eyes appear gently closed in the moment.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Her eyes appear gently closed in the moment.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that her eyes appear gently closed in the moment.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed closed eyes in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention closed eyes as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "tilted head": {
    "phrase": "notice the facial detail",
    "collocations": [
      "tilted head",
      "scene detail"
    ],
    "grammar": "The woman's head tilts softly toward the man.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The woman's head tilts softly toward the man.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the woman's head tilts softly toward the man.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed tilted head in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention tilted head as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "necklace pendant": {
    "phrase": "notice the accessory",
    "collocations": [
      "necklace pendant",
      "scene detail"
    ],
    "grammar": "A tiny pendant hangs from the woman's necklace.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A tiny pendant hangs from the woman's necklace.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a tiny pendant hangs from the woman's necklace.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed necklace pendant in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention necklace pendant as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "collarbone line": {
    "phrase": "notice the facial detail",
    "collocations": [
      "collarbone line",
      "scene detail"
    ],
    "grammar": "The V-neck dress leaves the woman's collarbone line visible.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The V-neck dress leaves the woman's collarbone line visible.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the V-neck dress leaves the woman's collarbone line visible.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed collarbone line in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention collarbone line as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "bent left elbow": {
    "phrase": "point out the body position",
    "collocations": [
      "bent left elbow",
      "scene detail"
    ],
    "grammar": "Her left elbow bends as she wraps her arm around the man.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Her left elbow bends as she wraps her arm around the man.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that her left elbow bends as she wraps her arm around the man.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed bent left elbow in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention bent left elbow as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "linked arm": {
    "phrase": "describe the action",
    "collocations": [
      "linked arm",
      "scene detail"
    ],
    "grammar": "The woman links one arm through the man's arm.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The woman links one arm through the man's arm.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the woman links one arm through the man's arm.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed linked arm in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention linked arm as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "fingers on his forearm": {
    "phrase": "describe the action",
    "collocations": [
      "fingers on his forearm",
      "scene detail"
    ],
    "grammar": "Her fingers rest on the man's forearm.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Her fingers rest on the man's forearm.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that her fingers rest on the man's forearm.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed fingers on his forearm in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention fingers on his forearm as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "fitted bodice": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "fitted bodice",
      "scene detail"
    ],
    "grammar": "The dress has a fitted bodice above the waist.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The dress has a fitted bodice above the waist.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the dress has a fitted bodice above the waist.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed fitted bodice in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention fitted bodice as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "soft pleats": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "soft pleats",
      "scene detail"
    ],
    "grammar": "Soft pleats shape the front of the dress.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Soft pleats shape the front of the dress.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that soft pleats shape the front of the dress.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed soft pleats in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention soft pleats as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "waist seam": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "waist seam",
      "scene detail"
    ],
    "grammar": "A seam marks the waist area of the dress.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A seam marks the waist area of the dress.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a seam marks the waist area of the dress.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed waist seam in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention waist seam as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "tiered skirt panel": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "tiered skirt panel",
      "scene detail"
    ],
    "grammar": "A tiered panel is visible in the lower part of the skirt.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A tiered panel is visible in the lower part of the skirt.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a tiered panel is visible in the lower part of the skirt.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed tiered skirt panel in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention tiered skirt panel as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "sheer lower hem": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "sheer lower hem",
      "scene detail"
    ],
    "grammar": "The lower hem looks light and slightly sheer in the glow.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The lower hem looks light and slightly sheer in the glow.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the lower hem looks light and slightly sheer in the glow.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed sheer lower hem in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention sheer lower hem as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "dress folds": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "dress folds",
      "scene detail"
    ],
    "grammar": "Loose folds run down the front of the woman's dress.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Loose folds run down the front of the woman's dress.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that loose folds run down the front of the woman's dress.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed dress folds in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention dress folds as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "dress brushing water": {
    "phrase": "describe the clothing detail",
    "collocations": [
      "dress brushing water",
      "scene detail"
    ],
    "grammar": "The lower edge of the dress brushes the shallow water.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The lower edge of the dress brushes the shallow water.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the lower edge of the dress brushes the shallow water.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed dress brushing water in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention dress brushing water as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "woman's leading foot": {
    "phrase": "point out the body position",
    "collocations": [
      "woman's leading foot",
      "scene detail"
    ],
    "grammar": "One of the woman's bare feet steps forward into the water.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "One of the woman's bare feet steps forward into the water.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that one of the woman's bare feet steps forward into the water.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed woman's leading foot in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention woman's leading foot as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "relaxed shoulders": {
    "phrase": "point out the body position",
    "collocations": [
      "relaxed shoulders",
      "scene detail"
    ],
    "grammar": "Her shoulders look relaxed and at ease.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Her shoulders look relaxed and at ease.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that her shoulders look relaxed and at ease.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed relaxed shoulders in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention relaxed shoulders as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "interlaced fingers": {
    "phrase": "describe the action",
    "collocations": [
      "interlaced fingers",
      "scene detail"
    ],
    "grammar": "Their fingers are interlaced rather than simply touching.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Their fingers are interlaced rather than simply touching.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that their fingers are interlaced rather than simply touching.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed interlaced fingers in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention interlaced fingers as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "two-hand contact": {
    "phrase": "describe the action",
    "collocations": [
      "two-hand contact",
      "scene detail"
    ],
    "grammar": "The couple maintains clear two-hand contact while walking.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The couple maintains clear two-hand contact while walking.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the couple maintains clear two-hand contact while walking.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed two-hand contact in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention two-hand contact as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "his right hand": {
    "phrase": "point out the body position",
    "collocations": [
      "his right hand",
      "scene detail"
    ],
    "grammar": "The hand on the left side of the pair belongs to the man.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The hand on the left side of the pair belongs to the man.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the hand on the left side of the pair belongs to the man.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed his right hand in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention his right hand as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "her left hand": {
    "phrase": "point out the body position",
    "collocations": [
      "her left hand",
      "scene detail"
    ],
    "grammar": "The hand on the right side of the pair belongs to the woman.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The hand on the right side of the pair belongs to the woman.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the hand on the right side of the pair belongs to the woman.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed her left hand in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention her left hand as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "relaxed handhold": {
    "phrase": "describe the action",
    "collocations": [
      "relaxed handhold",
      "scene detail"
    ],
    "grammar": "Their handhold looks relaxed rather than stiff.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Their handhold looks relaxed rather than stiff.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that their handhold looks relaxed rather than stiff.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed relaxed handhold in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention relaxed handhold as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "hands in front of them": {
    "phrase": "describe the action",
    "collocations": [
      "hands in front of them",
      "scene detail"
    ],
    "grammar": "Their joined hands fall naturally in front of their bodies.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Their joined hands fall naturally in front of their bodies.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that their joined hands fall naturally in front of their bodies.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed hands in front of them in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention hands in front of them as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "close body spacing": {
    "phrase": "state it cautiously",
    "collocations": [
      "close body spacing",
      "scene detail"
    ],
    "grammar": "Their body spacing stays close as they walk together.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Their body spacing stays close as they walk together.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that their body spacing stays close as they walk together.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed close body spacing in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention close body spacing as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "walking hand in hand": {
    "phrase": "describe the action",
    "collocations": [
      "walking hand in hand",
      "scene detail"
    ],
    "grammar": "They are walking hand in hand along the beach.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "They are walking hand in hand along the beach.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that they are walking hand in hand along the beach.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed walking hand in hand in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention walking hand in hand as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "foamy water edge": {
    "phrase": "describe the setting",
    "collocations": [
      "foamy water edge",
      "scene detail"
    ],
    "grammar": "A foamy water edge runs diagonally along the sand.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A foamy water edge runs diagonally along the sand.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a foamy water edge runs diagonally along the sand.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed foamy water edge in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention foamy water edge as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "thin water film": {
    "phrase": "describe the setting",
    "collocations": [
      "thin water film",
      "scene detail"
    ],
    "grammar": "A thin film of water covers part of the shoreline.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A thin film of water covers part of the shoreline.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a thin film of water covers part of the shoreline.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed thin water film in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention thin water film as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "darker wet band": {
    "phrase": "describe the setting",
    "collocations": [
      "darker wet band",
      "scene detail"
    ],
    "grammar": "A darker wet band marks the recently washed sand.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A darker wet band marks the recently washed sand.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a darker wet band marks the recently washed sand.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed darker wet band in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention darker wet band as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "lighter dry sand": {
    "phrase": "describe the setting",
    "collocations": [
      "lighter dry sand",
      "scene detail"
    ],
    "grammar": "Farther left, the sand looks lighter and drier.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Farther left, the sand looks lighter and drier.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that farther left, the sand looks lighter and drier.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed lighter dry sand in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention lighter dry sand as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "narrow beach strip": {
    "phrase": "describe the setting",
    "collocations": [
      "narrow beach strip",
      "scene detail"
    ],
    "grammar": "Only a narrow strip of beach is visible beside the water.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Only a narrow strip of beach is visible beside the water.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that only a narrow strip of beach is visible beside the water.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed narrow beach strip in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention narrow beach strip as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "shoreline slope": {
    "phrase": "describe the setting",
    "collocations": [
      "shoreline slope",
      "scene detail"
    ],
    "grammar": "The shoreline slopes gently toward the sea.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The shoreline slopes gently toward the sea.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the shoreline slopes gently toward the sea.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed shoreline slope in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention shoreline slope as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "fresh footprints": {
    "phrase": "describe the setting",
    "collocations": [
      "fresh footprints",
      "scene detail"
    ],
    "grammar": "Fresh footprints appear in the wet sand behind the couple.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Fresh footprints appear in the wet sand behind the couple.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that fresh footprints appear in the wet sand behind the couple.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed fresh footprints in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention fresh footprints as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "curving waterline": {
    "phrase": "describe the setting",
    "collocations": [
      "curving waterline",
      "scene detail"
    ],
    "grammar": "The waterline curves softly around the beach.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The waterline curves softly around the beach.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the waterline curves softly around the beach.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed curving waterline in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention curving waterline as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "tall leaning palm": {
    "phrase": "describe the natural detail",
    "collocations": [
      "tall leaning palm",
      "beach scene"
    ],
    "grammar": "One tall palm tree leans slightly over the beach.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "One tall palm tree leans slightly over the beach.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that one tall palm tree leans slightly over the beach.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed tall leaning palm in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention tall leaning palm as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "palm fronds": {
    "phrase": "describe the natural detail",
    "collocations": [
      "palm fronds",
      "beach scene"
    ],
    "grammar": "Palm fronds spread outward near the top of the trees.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Palm fronds spread outward near the top of the trees.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that palm fronds spread outward near the top of the trees.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed palm fronds in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention palm fronds as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "clustered trunks": {
    "phrase": "describe the natural detail",
    "collocations": [
      "clustered trunks",
      "beach scene"
    ],
    "grammar": "Several palm trunks appear clustered together near the beach.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Several palm trunks appear clustered together near the beach.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that several palm trunks appear clustered together near the beach.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed clustered trunks in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention clustered trunks as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "dark tree line": {
    "phrase": "describe the natural detail",
    "collocations": [
      "dark tree line",
      "beach scene"
    ],
    "grammar": "A dark tree line continues into the distance along the beach.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A dark tree line continues into the distance along the beach.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a dark tree line continues into the distance along the beach.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed dark tree line in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention dark tree line as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "layered silhouettes": {
    "phrase": "describe the natural detail",
    "collocations": [
      "layered silhouettes",
      "beach scene"
    ],
    "grammar": "The palms form layered silhouettes against the bright sky.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The palms form layered silhouettes against the bright sky.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the palms form layered silhouettes against the bright sky.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed layered silhouettes in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention layered silhouettes as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "beachside grove": {
    "phrase": "describe the natural detail",
    "collocations": [
      "beachside grove",
      "beach scene"
    ],
    "grammar": "The palms create a beachside grove on the left.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The palms create a beachside grove on the left.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the palms create a beachside grove on the left.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed beachside grove in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention beachside grove as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "small ripples": {
    "phrase": "describe the natural detail",
    "collocations": [
      "small ripples",
      "beach scene"
    ],
    "grammar": "Small ripples texture the surface of the ocean.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Small ripples texture the surface of the ocean.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that small ripples texture the surface of the ocean.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed small ripples in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention small ripples as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "open sea expanse": {
    "phrase": "describe the natural detail",
    "collocations": [
      "open sea expanse",
      "beach scene"
    ],
    "grammar": "A broad expanse of open sea fills the right side.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A broad expanse of open sea fills the right side.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a broad expanse of open sea fills the right side.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed open sea expanse in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention open sea expanse as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "warm water highlights": {
    "phrase": "describe the natural detail",
    "collocations": [
      "warm water highlights",
      "beach scene"
    ],
    "grammar": "Warm highlights shimmer on the water under the sunset.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Warm highlights shimmer on the water under the sunset.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that warm highlights shimmer on the water under the sunset.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed warm water highlights in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention warm water highlights as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "pale horizon band": {
    "phrase": "describe the natural detail",
    "collocations": [
      "pale horizon band",
      "beach scene"
    ],
    "grammar": "A pale band separates the sea from the sky at the horizon.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A pale band separates the sea from the sky at the horizon.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a pale band separates the sea from the sky at the horizon.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed pale horizon band in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention pale horizon band as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "foreground water texture": {
    "phrase": "describe the natural detail",
    "collocations": [
      "foreground water texture",
      "beach scene"
    ],
    "grammar": "The foreground water shows a gentle textured surface.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The foreground water shows a gentle textured surface.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the foreground water shows a gentle textured surface.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed foreground water texture in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention foreground water texture as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "right-edge ripples": {
    "phrase": "describe the natural detail",
    "collocations": [
      "right-edge ripples",
      "beach scene"
    ],
    "grammar": "The far right edge of the sea shows darker ripples.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The far right edge of the sea shows darker ripples.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the far right edge of the sea shows darker ripples.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed right-edge ripples in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention right-edge ripples as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "calm waterline": {
    "phrase": "describe the natural detail",
    "collocations": [
      "calm waterline",
      "beach scene"
    ],
    "grammar": "The waterline looks calm rather than stormy.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The waterline looks calm rather than stormy.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the waterline looks calm rather than stormy.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed calm waterline in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention calm waterline as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "no visible boats": {
    "phrase": "describe the natural detail",
    "collocations": [
      "no visible boats",
      "beach scene"
    ],
    "grammar": "No boats or swimmers are visible on the open water.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "No boats or swimmers are visible on the open water.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that no boats or swimmers are visible on the open water.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed no visible boats in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention no visible boats as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "sun disc": {
    "phrase": "describe the light",
    "collocations": [
      "sun disc",
      "sunset scene"
    ],
    "grammar": "The round sun disc is visible just above the horizon.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The round sun disc is visible just above the horizon.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the round sun disc is visible just above the horizon.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed sun disc in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention sun disc as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "warm sky glow": {
    "phrase": "describe the light",
    "collocations": [
      "warm sky glow",
      "sunset scene"
    ],
    "grammar": "A warm glow spreads through the sky around the setting sun.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A warm glow spreads through the sky around the setting sun.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a warm glow spreads through the sky around the setting sun.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed warm sky glow in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention warm sky glow as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "peach-orange gradient": {
    "phrase": "describe the light",
    "collocations": [
      "peach-orange gradient",
      "sunset scene"
    ],
    "grammar": "The sky shows a peach-orange gradient near the horizon.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The sky shows a peach-orange gradient near the horizon.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the sky shows a peach-orange gradient near the horizon.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed peach-orange gradient in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention peach-orange gradient as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "near-horizon position": {
    "phrase": "describe the light",
    "collocations": [
      "near-horizon position",
      "sunset scene"
    ],
    "grammar": "The sun sits in a near-horizon position.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The sun sits in a near-horizon position.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the sun sits in a near-horizon position.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed near-horizon position in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention near-horizon position as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "shimmering light column": {
    "phrase": "describe the light",
    "collocations": [
      "shimmering light column",
      "sunset scene"
    ],
    "grammar": "A shimmering column of light runs down the water.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A shimmering column of light runs down the water.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a shimmering column of light runs down the water.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed shimmering light column in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention shimmering light column as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "broken reflection bands": {
    "phrase": "describe the light",
    "collocations": [
      "broken reflection bands",
      "sunset scene"
    ],
    "grammar": "The reflection breaks into bright bands across the ripples.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The reflection breaks into bright bands across the ripples.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the reflection breaks into bright bands across the ripples.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed broken reflection bands in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention broken reflection bands as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "elongated highlight path": {
    "phrase": "describe the light",
    "collocations": [
      "elongated highlight path",
      "sunset scene"
    ],
    "grammar": "The bright highlight path stretches toward the foreground.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The bright highlight path stretches toward the foreground.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the bright highlight path stretches toward the foreground.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed elongated highlight path in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention elongated highlight path as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "gold-white sparkle": {
    "phrase": "describe the light",
    "collocations": [
      "gold-white sparkle",
      "sunset scene"
    ],
    "grammar": "Gold-white sparkles appear inside the reflection.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Gold-white sparkles appear inside the reflection.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that gold-white sparkles appear inside the reflection.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed gold-white sparkle in this beach scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the picture again, I may mention gold-white sparkle as part of the scene.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  }
};
  CAT01.lessons[0].hotspots=L1_HOTSPOTS;
  if(typeof GOLD_LESSON_01!=='undefined'){
    GOLD_LESSON_01.hotspotDetails=L1_HOTSPOT_DETAILS;
  }
  window.ENGBOOK_LESSON_01_ATTRIBUTE_SCAN={
    version:'v0.61',
    
    standard:'deep scene attribute scan with micro-hotspot word→example→grammar ladder',
    totalHotspots:L1_HOTSPOTS.length,
    primaryHotspots:L1_HOTSPOTS.filter(h=>h.level!=='detail').length,
    detailHotspots:L1_HOTSPOTS.filter(h=>h.level==='detail').length,
    personDetailHotspots:50,
    environmentDetailHotspots:62,
    interactionModel:'micro-dot → leader-word → scene example card → grammar tense ladder',
    evidenceFirst:true,
    grammarPolicy:'Only the NOW sentence is direct scene evidence; past/future rows are labeled as retelling or practice.',
    mobileTargetPolicy:'Visible dots are tiny while screen-space hit testing remains at least 44 CSS px.'
  };
})();
/* EngBook v0.64 — Lesson 02 deep micro-hotspot and floating card */
(function(){
  const L2_HOTSPOTS=[
  {
    "x": 36.5,
    "y": 48,
    "en": "curly-haired woman",
    "fa": "زن با موهای فر",
    "pron": "/ˈkɝli hɛrd ˈwʊmən/",
    "example": "The curly-haired woman is laughing at the café table.",
    "type": "person",
    "r": 8,
    "id": "l02-left-woman",
    "level": "primary",
    "reviewed": true,
    "evidenceType": "visible-anchor",
    "hitW": 64,
    "hitH": 72
  },
  {
    "x": 64.5,
    "y": 48,
    "en": "blonde woman",
    "fa": "زن موطلایی",
    "pron": "/blɑnd ˈwʊmən/",
    "example": "The blonde woman is laughing and gesturing beside her companion.",
    "type": "person",
    "r": 8,
    "id": "l02-right-woman",
    "level": "primary",
    "reviewed": true,
    "evidenceType": "visible-anchor",
    "hitW": 64,
    "hitH": 72
  },
  {
    "x": 53.5,
    "y": 43.5,
    "en": "center background patron",
    "fa": "مشتریِ وسطِ پس‌زمینه",
    "pron": "/ˈsɛntɚ ˈbækˌɡraʊnd ˈpeɪtrən/",
    "example": "A seated patron is visible behind the two women near the center.",
    "type": "person",
    "r": 6,
    "id": "l02-center-patron",
    "level": "primary",
    "reviewed": true,
    "evidenceType": "visible-anchor",
    "hitW": 48,
    "hitH": 52
  },
  {
    "x": 90.5,
    "y": 51.5,
    "en": "right background patron",
    "fa": "مشتریِ سمت راستِ پس‌زمینه",
    "pron": "/raɪt ˈbækˌɡraʊnd ˈpeɪtrən/",
    "example": "Another seated patron is visible at a table on the right.",
    "type": "person",
    "r": 6,
    "id": "l02-right-patron",
    "level": "primary",
    "reviewed": true,
    "evidenceType": "visible-anchor",
    "hitW": 48,
    "hitH": 52
  },
  {
    "x": 50,
    "y": 95,
    "en": "wooden table",
    "fa": "میز چوبی",
    "pron": "/ˈwʊdən ˈteɪbəl/",
    "example": "A dark rustic wooden table fills the lower foreground.",
    "type": "setting",
    "r": 7,
    "id": "l02-wooden-table",
    "level": "primary",
    "reviewed": true,
    "evidenceType": "visible-anchor",
    "hitW": 58,
    "hitH": 50
  },
  {
    "x": 7.5,
    "y": 47,
    "en": "large window",
    "fa": "پنجره بزرگ",
    "pron": "/lɑrdʒ ˈwɪndoʊ/",
    "example": "A large bright window fills the left side of the café.",
    "type": "setting",
    "r": 7,
    "id": "l02-window",
    "level": "primary",
    "reviewed": true,
    "evidenceType": "visible-anchor",
    "hitW": 58,
    "hitH": 72
  },
  {
    "x": 77,
    "y": 18,
    "en": "brick wall",
    "fa": "دیوار آجری",
    "pron": "/brɪk wɔl/",
    "example": "An exposed brick wall fills much of the café background.",
    "type": "setting",
    "r": 7,
    "id": "l02-brick-wall",
    "level": "primary",
    "reviewed": true,
    "evidenceType": "visible-anchor",
    "hitW": 58,
    "hitH": 58
  },
  {
    "x": 31.8,
    "y": 31.5,
    "en": "dark brown hair",
    "fa": "موهای قهوه‌ای تیره",
    "pron": "/dɑrk braʊn hɛr/",
    "example": "Her hair is dark brown.",
    "type": "detail",
    "r": 5,
    "id": "l02-dark-brown-hair",
    "level": "detail",
    "parentId": "l02-left-woman",
    "detailGroup": "appearance",
    "attributeGroup": "hair",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 30.5,
    "y": 39.5,
    "en": "very curly hair",
    "fa": "موهای بسیار فر",
    "pron": "/ˈvɛri ˈkɝli hɛr/",
    "example": "She has very curly hair.",
    "type": "detail",
    "r": 5,
    "id": "l02-very-curly-hair",
    "level": "detail",
    "parentId": "l02-left-woman",
    "detailGroup": "appearance",
    "attributeGroup": "hair",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 32.5,
    "y": 47.5,
    "en": "shoulder-length hair",
    "fa": "موی تا روی شانه",
    "pron": "/ˈʃoʊldɚ lɛŋθ hɛr/",
    "example": "Her curls fall to about shoulder length.",
    "type": "detail",
    "r": 5,
    "id": "l02-shoulder-length-hair",
    "level": "detail",
    "parentId": "l02-left-woman",
    "detailGroup": "appearance",
    "attributeGroup": "hair",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 37.2,
    "y": 39.8,
    "en": "broad smile",
    "fa": "لبخند پهن",
    "pron": "/brɔd smaɪl/",
    "example": "She has a broad smile.",
    "type": "detail",
    "r": 5,
    "id": "l02-broad-smile",
    "level": "detail",
    "parentId": "l02-left-woman",
    "detailGroup": "appearance",
    "attributeGroup": "face",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 37.2,
    "y": 42,
    "en": "open-mouth laugh",
    "fa": "خنده با دهان باز",
    "pron": "/ˈoʊpən maʊθ læf/",
    "example": "She is laughing with her mouth open.",
    "type": "detail",
    "r": 5,
    "id": "l02-open-mouth-laugh",
    "level": "detail",
    "parentId": "l02-left-woman",
    "detailGroup": "appearance",
    "attributeGroup": "face",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 35.5,
    "y": 63,
    "en": "beige-taupe sweater",
    "fa": "پلیور بژ-خاکستری",
    "pron": "/beɪʒ toʊp ˈswɛtɚ/",
    "example": "She is wearing a beige-taupe sweater.",
    "type": "detail",
    "r": 5,
    "id": "l02-beige-taupe-sweater",
    "level": "detail",
    "parentId": "l02-left-woman",
    "detailGroup": "sweater",
    "attributeGroup": "color",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 35,
    "y": 68,
    "en": "chunky-knit texture",
    "fa": "بافت درشتِ بافتنی",
    "pron": "/ˈtʃʌŋki nɪt ˈtɛkstʃɚ/",
    "example": "The sweater has a chunky-knit texture.",
    "type": "detail",
    "r": 5,
    "id": "l02-chunky-knit-texture",
    "level": "detail",
    "parentId": "l02-left-woman",
    "detailGroup": "sweater",
    "attributeGroup": "texture",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 36.5,
    "y": 52.8,
    "en": "crew neckline",
    "fa": "یقه گرد",
    "pron": "/kru ˈnɛkˌlaɪn/",
    "example": "The sweater has a crew neckline.",
    "type": "detail",
    "r": 5,
    "id": "l02-crew-neckline",
    "level": "detail",
    "parentId": "l02-left-woman",
    "detailGroup": "sweater",
    "attributeGroup": "neckline",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 26.5,
    "y": 69.5,
    "en": "left long sleeve",
    "fa": "آستین بلند چپ",
    "pron": "/lɛft lɔŋ sliv/",
    "example": "Her left arm is covered by a long sleeve.",
    "type": "detail",
    "r": 5,
    "id": "l02-left-long-sleeve",
    "level": "detail",
    "parentId": "l02-left-woman",
    "detailGroup": "sweater",
    "attributeGroup": "sleeve",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 43.5,
    "y": 70.5,
    "en": "right long sleeve",
    "fa": "آستین بلند راست",
    "pron": "/raɪt lɔŋ sliv/",
    "example": "Her right arm is covered by a long sleeve.",
    "type": "detail",
    "r": 5,
    "id": "l02-right-long-sleeve",
    "level": "detail",
    "parentId": "l02-left-woman",
    "detailGroup": "sweater",
    "attributeGroup": "sleeve",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 28.6,
    "y": 75.3,
    "en": "left raised hand",
    "fa": "دست چپِ بالا آمده",
    "pron": "/lɛft reɪzd hænd/",
    "example": "Her left hand is raised while she gestures.",
    "type": "detail",
    "r": 5,
    "id": "l02-left-raised-hand",
    "level": "detail",
    "parentId": "l02-left-woman",
    "detailGroup": "gesture",
    "attributeGroup": "hand",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 44.8,
    "y": 76.5,
    "en": "right raised hand",
    "fa": "دست راستِ بالا آمده",
    "pron": "/raɪt reɪzd hænd/",
    "example": "Her right hand is raised in conversation.",
    "type": "detail",
    "r": 5,
    "id": "l02-right-raised-hand",
    "level": "detail",
    "parentId": "l02-left-woman",
    "detailGroup": "gesture",
    "attributeGroup": "hand",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 36.8,
    "y": 76,
    "en": "open palms",
    "fa": "کف دست‌های باز",
    "pron": "/ˈoʊpən pɑmz/",
    "example": "Her open palms support an animated conversational gesture.",
    "type": "detail",
    "r": 5,
    "id": "l02-open-palms",
    "level": "detail",
    "parentId": "l02-left-woman",
    "detailGroup": "gesture",
    "attributeGroup": "gesture",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 36,
    "y": 58,
    "en": "upright seated posture",
    "fa": "حالت نشسته و صاف",
    "pron": "/ˈʌpˌraɪt ˈsitəd ˈpɑstʃɚ/",
    "example": "She is seated upright at the table.",
    "type": "detail",
    "r": 5,
    "id": "l02-upright-seated-posture",
    "level": "detail",
    "parentId": "l02-left-woman",
    "detailGroup": "gesture",
    "attributeGroup": "posture",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 65,
    "y": 30.5,
    "en": "blonde hair",
    "fa": "موهای بلوند",
    "pron": "/blɑnd hɛr/",
    "example": "Her hair is blonde.",
    "type": "detail",
    "r": 5,
    "id": "l02-blonde-hair",
    "level": "detail",
    "parentId": "l02-right-woman",
    "detailGroup": "appearance",
    "attributeGroup": "hair",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 62,
    "y": 39.5,
    "en": "long hair",
    "fa": "موهای بلند",
    "pron": "/lɔŋ hɛr/",
    "example": "Her hair extends below her shoulders.",
    "type": "detail",
    "r": 5,
    "id": "l02-long-hair",
    "level": "detail",
    "parentId": "l02-right-woman",
    "detailGroup": "appearance",
    "attributeGroup": "hair",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 67.5,
    "y": 42,
    "en": "straight hair",
    "fa": "موهای صاف",
    "pron": "/streɪt hɛr/",
    "example": "Her hair is straight.",
    "type": "detail",
    "r": 5,
    "id": "l02-straight-hair",
    "level": "detail",
    "parentId": "l02-right-woman",
    "detailGroup": "appearance",
    "attributeGroup": "hair",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 64.2,
    "y": 39.5,
    "en": "broad laughing smile",
    "fa": "لبخند پهن هنگام خنده",
    "pron": "/brɔd ˈlæfɪŋ smaɪl/",
    "example": "She has a broad laughing smile.",
    "type": "detail",
    "r": 5,
    "id": "l02-broad-laughing-smile",
    "level": "detail",
    "parentId": "l02-right-woman",
    "detailGroup": "appearance",
    "attributeGroup": "face",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 64.2,
    "y": 42,
    "en": "open laughing mouth",
    "fa": "دهان باز هنگام خنده",
    "pron": "/ˈoʊpən ˈlæfɪŋ maʊθ/",
    "example": "Her mouth is open as she laughs.",
    "type": "detail",
    "r": 5,
    "id": "l02-open-laughing-mouth",
    "level": "detail",
    "parentId": "l02-right-woman",
    "detailGroup": "appearance",
    "attributeGroup": "face",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 64.6,
    "y": 34.8,
    "en": "upward-left gaze",
    "fa": "نگاه رو به بالا و چپ",
    "pron": "/ˈʌpwɚd lɛft ɡeɪz/",
    "example": "She is looking slightly upward and to the left.",
    "type": "detail",
    "r": 5,
    "id": "l02-upward-left-gaze",
    "level": "detail",
    "parentId": "l02-right-woman",
    "detailGroup": "appearance",
    "attributeGroup": "gaze",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 65,
    "y": 61.5,
    "en": "blue denim jacket",
    "fa": "کت جین آبی",
    "pron": "/blu ˈdɛnəm ˈdʒækət/",
    "example": "She is wearing a blue denim jacket.",
    "type": "detail",
    "r": 5,
    "id": "l02-blue-denim-jacket",
    "level": "detail",
    "parentId": "l02-right-woman",
    "detailGroup": "jacket",
    "attributeGroup": "garment",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 66.8,
    "y": 65,
    "en": "denim texture",
    "fa": "بافت جین",
    "pron": "/ˈdɛnəm ˈtɛkstʃɚ/",
    "example": "The jacket has a visible denim texture.",
    "type": "detail",
    "r": 5,
    "id": "l02-denim-texture",
    "level": "detail",
    "parentId": "l02-right-woman",
    "detailGroup": "jacket",
    "attributeGroup": "texture",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 60.2,
    "y": 55.5,
    "en": "pointed jacket collar",
    "fa": "یقه نوک‌تیز کت",
    "pron": "/ˈpɔɪntəd ˈdʒækət ˈkɑlɚ/",
    "example": "The denim jacket has a pointed collar.",
    "type": "detail",
    "r": 5,
    "id": "l02-pointed-jacket-collar",
    "level": "detail",
    "parentId": "l02-right-woman",
    "detailGroup": "jacket",
    "attributeGroup": "collar",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 61.5,
    "y": 64,
    "en": "metal jacket buttons",
    "fa": "دکمه‌های فلزی کت",
    "pron": "/ˈmɛtəl ˈdʒækət ˈbʌtənz/",
    "example": "Metal buttons are visible on the denim jacket.",
    "type": "detail",
    "r": 5,
    "id": "l02-metal-jacket-buttons",
    "level": "detail",
    "parentId": "l02-right-woman",
    "detailGroup": "jacket",
    "attributeGroup": "button",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 73,
    "y": 70,
    "en": "cuffed jacket sleeves",
    "fa": "آستین‌های تاخورده کت",
    "pron": "/kʌft ˈdʒækət slivz/",
    "example": "The jacket sleeves are cuffed at the forearms.",
    "type": "detail",
    "r": 5,
    "id": "l02-cuffed-jacket-sleeves",
    "level": "detail",
    "parentId": "l02-right-woman",
    "detailGroup": "jacket",
    "attributeGroup": "sleeve",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 63.5,
    "y": 61.5,
    "en": "striped top",
    "fa": "بلوز راه‌راه",
    "pron": "/straɪpt tɑp/",
    "example": "A striped top is visible beneath the jacket.",
    "type": "detail",
    "r": 5,
    "id": "l02-striped-top",
    "level": "detail",
    "parentId": "l02-right-woman",
    "detailGroup": "striped-top",
    "attributeGroup": "garment",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 63.5,
    "y": 58.7,
    "en": "white base fabric",
    "fa": "زمینه سفید لباس",
    "pron": "/waɪt beɪs ˈfæbrɪk/",
    "example": "The striped top has a white base.",
    "type": "detail",
    "r": 5,
    "id": "l02-white-base-fabric",
    "level": "detail",
    "parentId": "l02-right-woman",
    "detailGroup": "striped-top",
    "attributeGroup": "color",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 63.5,
    "y": 61.3,
    "en": "black horizontal stripes",
    "fa": "راه‌راه‌های افقی مشکی",
    "pron": "/blæk ˌhɔrəˈzɑntəl straɪps/",
    "example": "Black horizontal stripes cross the top.",
    "type": "detail",
    "r": 5,
    "id": "l02-black-horizontal-stripes",
    "level": "detail",
    "parentId": "l02-right-woman",
    "detailGroup": "striped-top",
    "attributeGroup": "pattern",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 63.5,
    "y": 56.7,
    "en": "red accent stripe",
    "fa": "نوار قرمز تزئینی",
    "pron": "/rɛd ˈækˌsɛnt straɪp/",
    "example": "A red accent stripe is visible near the neckline.",
    "type": "detail",
    "r": 5,
    "id": "l02-red-accent-stripe",
    "level": "detail",
    "parentId": "l02-right-woman",
    "detailGroup": "striped-top",
    "attributeGroup": "pattern",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 54.5,
    "y": 75.5,
    "en": "left open hand",
    "fa": "دست چپ باز",
    "pron": "/lɛft ˈoʊpən hænd/",
    "example": "Her left hand is open while she gestures.",
    "type": "detail",
    "r": 5,
    "id": "l02-left-open-hand",
    "level": "detail",
    "parentId": "l02-right-woman",
    "detailGroup": "gesture",
    "attributeGroup": "hand",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 71,
    "y": 76,
    "en": "right open hand",
    "fa": "دست راست باز",
    "pron": "/raɪt ˈoʊpən hænd/",
    "example": "Her right hand is open while she gestures.",
    "type": "detail",
    "r": 5,
    "id": "l02-right-open-hand",
    "level": "detail",
    "parentId": "l02-right-woman",
    "detailGroup": "gesture",
    "attributeGroup": "hand",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 63.5,
    "y": 75.8,
    "en": "two-hand gesture",
    "fa": "اشاره با هر دو دست",
    "pron": "/tu hænd ˈdʒɛstʃɚ/",
    "example": "She is gesturing with both hands.",
    "type": "detail",
    "r": 5,
    "id": "l02-two-hand-gesture",
    "level": "detail",
    "parentId": "l02-right-woman",
    "detailGroup": "gesture",
    "attributeGroup": "gesture",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 53.5,
    "y": 43,
    "en": "short dark hair",
    "fa": "موهای کوتاه تیره",
    "pron": "/ʃɔrt dɑrk hɛr/",
    "example": "The center background patron has short dark hair.",
    "type": "detail",
    "r": 5,
    "id": "l02-short-dark-hair",
    "level": "detail",
    "parentId": "l02-center-patron",
    "detailGroup": "appearance",
    "attributeGroup": "hair",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 53.5,
    "y": 55.2,
    "en": "light blue-gray shirt",
    "fa": "پیراهن آبی-خاکستری روشن",
    "pron": "/laɪt blu ɡreɪ ʃɝt/",
    "example": "He is wearing a light blue-gray shirt.",
    "type": "detail",
    "r": 5,
    "id": "l02-light-blue-gray-shirt",
    "level": "detail",
    "parentId": "l02-center-patron",
    "detailGroup": "appearance",
    "attributeGroup": "garment",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 53.6,
    "y": 48.8,
    "en": "downward gaze",
    "fa": "نگاه رو به پایین",
    "pron": "/ˈdaʊnwɚd ɡeɪz/",
    "example": "His gaze is directed downward.",
    "type": "detail",
    "r": 5,
    "id": "l02-downward-gaze",
    "level": "detail",
    "parentId": "l02-center-patron",
    "detailGroup": "posture",
    "attributeGroup": "gaze",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 53.8,
    "y": 59,
    "en": "seated posture",
    "fa": "حالت نشسته",
    "pron": "/ˈsitəd ˈpɑstʃɚ/",
    "example": "He is seated behind the foreground pair.",
    "type": "detail",
    "r": 5,
    "id": "l02-seated-posture",
    "level": "detail",
    "parentId": "l02-center-patron",
    "detailGroup": "posture",
    "attributeGroup": "posture",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 53.8,
    "y": 57,
    "en": "small handheld object",
    "fa": "شیء کوچک در دست",
    "pron": "/smɔl ˈhændˌhɛld ˈɑbdʒɛkt/",
    "example": "A small handheld object is visible near his hands, but its exact type is unclear.",
    "type": "detail",
    "r": 5,
    "id": "l02-small-handheld-object",
    "level": "detail",
    "parentId": "l02-center-patron",
    "detailGroup": "posture",
    "attributeGroup": "object",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 91,
    "y": 48,
    "en": "short cropped dark hair",
    "fa": "موهای کوتاه و مرتب تیره",
    "pron": "/ʃɔrt krɑpt dɑrk hɛr/",
    "example": "The right background patron has short cropped dark hair.",
    "type": "detail",
    "r": 5,
    "id": "l02-short-dark-hair-on-right",
    "level": "detail",
    "parentId": "l02-right-patron",
    "detailGroup": "appearance",
    "attributeGroup": "hair",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 90.5,
    "y": 62,
    "en": "dark charcoal top",
    "fa": "لباس زغالی تیره",
    "pron": "/dɑrk ˈtʃɑrˌkoʊl tɑp/",
    "example": "He is wearing a dark charcoal top.",
    "type": "detail",
    "r": 5,
    "id": "l02-dark-charcoal-top",
    "level": "detail",
    "parentId": "l02-right-patron",
    "detailGroup": "appearance",
    "attributeGroup": "garment",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 90.8,
    "y": 55,
    "en": "lowered gaze",
    "fa": "نگاه پایین‌افتاده",
    "pron": "/ˈloʊɚd ɡeɪz/",
    "example": "The right background patron has a lowered gaze.",
    "type": "detail",
    "r": 5,
    "id": "l02-right-patron-downward-gaze",
    "level": "detail",
    "parentId": "l02-right-patron",
    "detailGroup": "posture",
    "attributeGroup": "gaze",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 91,
    "y": 69,
    "en": "forearms near tabletop",
    "fa": "ساعدها نزدیک سطح میز",
    "pron": "/ˈfɔrˌɑrmz nɪr ˈteɪbəlˌtɑp/",
    "example": "His forearms are positioned near the tabletop.",
    "type": "detail",
    "r": 5,
    "id": "l02-forearms-near-tabletop",
    "level": "detail",
    "parentId": "l02-right-patron",
    "detailGroup": "posture",
    "attributeGroup": "arm",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 90,
    "y": 73,
    "en": "side-table seated posture",
    "fa": "حالت نشسته کنار میز کناری",
    "pron": "/saɪd ˈteɪbəl ˈsitəd ˈpɑstʃɚ/",
    "example": "He is seated at a separate side table.",
    "type": "detail",
    "r": 5,
    "id": "l02-right-patron-seated-posture",
    "level": "detail",
    "parentId": "l02-right-patron",
    "detailGroup": "posture",
    "attributeGroup": "posture",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 89.5,
    "y": 84,
    "en": "blue jeans",
    "fa": "شلوار جین آبی",
    "pron": "/blu dʒinz/",
    "example": "Blue jeans are visible below the table.",
    "type": "detail",
    "r": 5,
    "id": "l02-blue-jeans",
    "level": "detail",
    "parentId": "l02-right-patron",
    "detailGroup": "lower-body",
    "attributeGroup": "trousers",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 95,
    "y": 68,
    "en": "small light-colored drink",
    "fa": "نوشیدنی کوچک روشن‌رنگ",
    "pron": "/smɔl laɪt ˈkʌlɚd drɪŋk/",
    "example": "A small light-colored drink is visible on his table.",
    "type": "detail",
    "r": 5,
    "id": "l02-small-light-colored-drink",
    "level": "detail",
    "parentId": "l02-right-patron",
    "detailGroup": "posture",
    "attributeGroup": "object",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 36.3,
    "y": 88.6,
    "en": "white coffee cup",
    "fa": "فنجان قهوه سفید",
    "pron": "/waɪt ˈkɔfi kʌp/",
    "example": "A white coffee cup sits in front of the woman on the left.",
    "type": "object",
    "r": 5,
    "id": "l02-white-coffee-cup",
    "level": "detail",
    "parentId": "l02-wooden-table",
    "detailGroup": "tableware",
    "attributeGroup": "cup",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 36.2,
    "y": 93.2,
    "en": "left white saucer",
    "fa": "نعلبکی سفید سمت چپ",
    "pron": "/lɛft waɪt ˈsɔsɚ/",
    "example": "The left coffee cup sits on a white saucer.",
    "type": "object",
    "r": 5,
    "id": "l02-left-white-saucer",
    "level": "detail",
    "parentId": "l02-wooden-table",
    "detailGroup": "tableware",
    "attributeGroup": "saucer",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 63,
    "y": 86.8,
    "en": "tall milky coffee",
    "fa": "قهوه شیری در لیوان بلند",
    "pron": "/tɔl ˈmɪlki ˈkɔfi/",
    "example": "A tall milky coffee sits in front of the woman on the right.",
    "type": "object",
    "r": 5,
    "id": "l02-tall-milky-coffee",
    "level": "detail",
    "parentId": "l02-wooden-table",
    "detailGroup": "tableware",
    "attributeGroup": "drink",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 63,
    "y": 85.2,
    "en": "clear coffee glass",
    "fa": "لیوان شفاف قهوه",
    "pron": "/klɪr ˈkɔfi ɡlæs/",
    "example": "The milky coffee is served in a clear glass.",
    "type": "object",
    "r": 5,
    "id": "l02-clear-coffee-glass",
    "level": "detail",
    "parentId": "l02-wooden-table",
    "detailGroup": "tableware",
    "attributeGroup": "glass",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 63.2,
    "y": 93,
    "en": "right white saucer",
    "fa": "نعلبکی سفید سمت راست",
    "pron": "/raɪt waɪt ˈsɔsɚ/",
    "example": "The tall coffee glass stands on a white saucer.",
    "type": "object",
    "r": 5,
    "id": "l02-right-white-saucer",
    "level": "detail",
    "parentId": "l02-wooden-table",
    "detailGroup": "tableware",
    "attributeGroup": "saucer",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 49.8,
    "y": 94,
    "en": "white pastry plate",
    "fa": "بشقاب سفید شیرینی",
    "pron": "/waɪt ˈpeɪstri pleɪt/",
    "example": "A white plate sits between the women.",
    "type": "object",
    "r": 5,
    "id": "l02-white-pastry-plate",
    "level": "detail",
    "parentId": "l02-wooden-table",
    "detailGroup": "food",
    "attributeGroup": "plate",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 50,
    "y": 91.2,
    "en": "croissant-like pastries",
    "fa": "شیرینی‌های شبیه کروسان",
    "pron": "/krəˈsɑnt laɪk ˈpeɪstriz/",
    "example": "Several croissant-like pastries are arranged on the plate.",
    "type": "object",
    "r": 5,
    "id": "l02-croissant-like-pastries",
    "level": "detail",
    "parentId": "l02-wooden-table",
    "detailGroup": "food",
    "attributeGroup": "food",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 43,
    "y": 94.3,
    "en": "metal teaspoon",
    "fa": "قاشق چای‌خوری فلزی",
    "pron": "/ˈmɛtəl ˈtiˌspun/",
    "example": "A metal teaspoon is visible beside the tableware.",
    "type": "object",
    "r": 5,
    "id": "l02-metal-teaspoon",
    "level": "detail",
    "parentId": "l02-wooden-table",
    "detailGroup": "tableware",
    "attributeGroup": "utensil",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 75,
    "y": 95,
    "en": "dark rustic wood grain",
    "fa": "رگه‌های چوب تیره و روستیک",
    "pron": "/dɑrk ˈrʌstɪk wʊd ɡreɪn/",
    "example": "The tabletop shows dark rustic wood grain.",
    "type": "setting",
    "r": 5,
    "id": "l02-dark-rustic-wood-grain",
    "level": "detail",
    "parentId": "l02-wooden-table",
    "detailGroup": "surface",
    "attributeGroup": "texture",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 6,
    "y": 35,
    "en": "bright window panes",
    "fa": "شیشه‌های روشن پنجره",
    "pron": "/braɪt ˈwɪndoʊ peɪnz/",
    "example": "The window panes are brightly lit.",
    "type": "setting",
    "r": 5,
    "id": "l02-bright-window-panes",
    "level": "detail",
    "parentId": "l02-window",
    "detailGroup": "window",
    "attributeGroup": "structure",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 5,
    "y": 20,
    "en": "strong natural daylight",
    "fa": "نور طبیعی قوی",
    "pron": "/strɔŋ ˈnætʃrəl ˈdeɪˌlaɪt/",
    "example": "Strong natural daylight enters from the left.",
    "type": "light",
    "r": 5,
    "id": "l02-strong-natural-daylight",
    "level": "detail",
    "parentId": "l02-window",
    "detailGroup": "light",
    "attributeGroup": "light",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 11.5,
    "y": 72,
    "en": "terracotta pot",
    "fa": "گلدان سفالی",
    "pron": "/ˌtɛrəˈkɑtə pɑt/",
    "example": "A terracotta pot stands beside the window.",
    "type": "object",
    "r": 5,
    "id": "l02-terracotta-pot",
    "level": "detail",
    "parentId": "l02-window",
    "detailGroup": "plant",
    "attributeGroup": "pot",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 11,
    "y": 63,
    "en": "leafy green plant",
    "fa": "گیاه سبز پربرگ",
    "pron": "/ˈlifi ɡrin plænt/",
    "example": "A leafy green plant grows from the terracotta pot.",
    "type": "detail",
    "r": 5,
    "id": "l02-leafy-green-plant",
    "level": "detail",
    "parentId": "l02-window",
    "detailGroup": "plant",
    "attributeGroup": "plant",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 6.5,
    "y": 49,
    "en": "thick window frame",
    "fa": "قاب ضخیم پنجره",
    "pron": "/θɪk ˈwɪndoʊ freɪm/",
    "example": "A thick light-colored frame divides the window.",
    "type": "setting",
    "r": 5,
    "id": "l02-thick-window-frame",
    "level": "detail",
    "parentId": "l02-window",
    "detailGroup": "window",
    "attributeGroup": "structure",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 77,
    "y": 30,
    "en": "red-brown exposed brick",
    "fa": "آجر نمایان قرمز-قهوه‌ای",
    "pron": "/rɛd braʊn ɪkˈspoʊzd brɪk/",
    "example": "Red-brown exposed brick forms the café wall.",
    "type": "setting",
    "r": 5,
    "id": "l02-red-brown-exposed-brick",
    "level": "detail",
    "parentId": "l02-brick-wall",
    "detailGroup": "decor",
    "attributeGroup": "surface",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 43,
    "y": 9,
    "en": "black wall shelf",
    "fa": "قفسه دیواری مشکی",
    "pron": "/blæk wɔl ʃɛlf/",
    "example": "A black wall shelf is mounted on the brick wall.",
    "type": "setting",
    "r": 5,
    "id": "l02-black-wall-shelf",
    "level": "detail",
    "parentId": "l02-brick-wall",
    "detailGroup": "decor",
    "attributeGroup": "shelf",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 55,
    "y": 24,
    "en": "small shelf plants",
    "fa": "گیاهان کوچک روی قفسه",
    "pron": "/smɔl ʃɛlf plænts/",
    "example": "Small green plants sit on the wall shelves.",
    "type": "detail",
    "r": 5,
    "id": "l02-small-shelf-plants",
    "level": "detail",
    "parentId": "l02-brick-wall",
    "detailGroup": "decor",
    "attributeGroup": "plant",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 76,
    "y": 9.5,
    "en": "framed portrait",
    "fa": "پرتره قاب‌شده",
    "pron": "/freɪmd ˈpɔrtrət/",
    "example": "A framed black-and-white portrait hangs on the wall.",
    "type": "object",
    "r": 5,
    "id": "l02-framed-portrait",
    "level": "detail",
    "parentId": "l02-brick-wall",
    "detailGroup": "decor",
    "attributeGroup": "picture",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 89,
    "y": 26,
    "en": "second framed picture",
    "fa": "تصویر قاب‌شده دوم",
    "pron": "/ˈsɛkənd freɪmd ˈpɪktʃɚ/",
    "example": "Another framed picture hangs farther to the right.",
    "type": "object",
    "r": 5,
    "id": "l02-second-framed-picture",
    "level": "detail",
    "parentId": "l02-brick-wall",
    "detailGroup": "decor",
    "attributeGroup": "picture",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 49,
    "y": 22,
    "en": "warm string lights",
    "fa": "چراغ‌های ریسه‌ای گرم",
    "pron": "/wɔrm strɪŋ laɪts/",
    "example": "Warm string lights cross the brick background.",
    "type": "light",
    "r": 5,
    "id": "l02-warm-string-lights",
    "level": "detail",
    "parentId": "l02-brick-wall",
    "detailGroup": "light",
    "attributeGroup": "light",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 82,
    "y": 20,
    "en": "amber light points",
    "fa": "نقاط نور کهربایی",
    "pron": "/ˈæmbɚ laɪt pɔɪnts/",
    "example": "Small amber points of decorative light are visible.",
    "type": "light",
    "r": 5,
    "id": "l02-amber-light-points",
    "level": "detail",
    "parentId": "l02-brick-wall",
    "detailGroup": "light",
    "attributeGroup": "light",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 95,
    "y": 21,
    "en": "black hanging lamp",
    "fa": "چراغ آویز مشکی",
    "pron": "/blæk ˈhæŋɪŋ læmp/",
    "example": "A black hanging lamp appears at the upper right.",
    "type": "light",
    "r": 5,
    "id": "l02-black-hanging-lamp",
    "level": "detail",
    "parentId": "l02-brick-wall",
    "detailGroup": "light",
    "attributeGroup": "lamp",
    "reviewed": true,
    "evidenceType": "visible-detail"
  },
  {
    "x": 31.5,
    "y": 31.5,
    "en": "voluminous curls",
    "fa": "فرهای پرحجم",
    "pron": "/vəˈluːmɪnəs kɝlz/",
    "example": "The left woman has voluminous curls around her face.",
    "type": "appearance",
    "r": 4,
    "id": "l02-voluminous-curls",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-left-woman",
    "detailGroup": "appearance",
    "attributeGroup": "hair-volume"
  },
  {
    "x": 34,
    "y": 34.2,
    "en": "soft laugh lines",
    "fa": "خطوط خنده ملایم",
    "pron": "/sɔft læf laɪnz/",
    "example": "Soft laugh lines appear near the left woman's eyes.",
    "type": "appearance",
    "r": 4,
    "id": "l02-soft-laugh-lines",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-left-woman",
    "detailGroup": "appearance",
    "attributeGroup": "face"
  },
  {
    "x": 37,
    "y": 43.2,
    "en": "visible upper teeth",
    "fa": "دندان‌های بالایی نمایان",
    "pron": "/ˈvɪzəbəl ˈʌpɚ tiθ/",
    "example": "Her upper teeth are visible in the laugh.",
    "type": "appearance",
    "r": 4,
    "id": "l02-visible-upper-teeth",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-left-woman",
    "detailGroup": "appearance",
    "attributeGroup": "mouth-detail"
  },
  {
    "x": 31.8,
    "y": 53,
    "en": "dropped shoulders",
    "fa": "شانه‌های رها",
    "pron": "/drɑpt ˈʃoʊldɚz/",
    "example": "Her shoulders look relaxed rather than tense.",
    "type": "body",
    "r": 4,
    "id": "l02-dropped-shoulders",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-left-woman",
    "detailGroup": "gesture",
    "attributeGroup": "posture"
  },
  {
    "x": 27.5,
    "y": 64.5,
    "en": "bent left elbow",
    "fa": "آرنج چپ خم شده",
    "pron": "/bɛnt lɛft ˈɛlboʊ/",
    "example": "The left elbow bends as she gestures while laughing.",
    "type": "body",
    "r": 4,
    "id": "l02-leftwoman-bent-left-elbow",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-left-woman",
    "detailGroup": "gesture",
    "attributeGroup": "arm-position"
  },
  {
    "x": 44.3,
    "y": 64,
    "en": "bent right elbow",
    "fa": "آرنج راست خم شده",
    "pron": "/bɛnt raɪt ˈɛlboʊ/",
    "example": "The right elbow is also bent toward the tabletop.",
    "type": "body",
    "r": 4,
    "id": "l02-leftwoman-bent-right-elbow",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-left-woman",
    "detailGroup": "gesture",
    "attributeGroup": "arm-position"
  },
  {
    "x": 37.6,
    "y": 58.7,
    "en": "ribbed sweater cuff",
    "fa": "سرآستین بافت‌دار",
    "pron": "/rɪbd ˈswɛtər kʌf/",
    "example": "A ribbed cuff finishes one sleeve of the sweater.",
    "type": "clothing",
    "r": 4,
    "id": "l02-ribbed-sweater-cuff",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-left-woman",
    "detailGroup": "sweater",
    "attributeGroup": "cuff"
  },
  {
    "x": 35.7,
    "y": 72,
    "en": "sweater hem",
    "fa": "لبه پایینی پلیور",
    "pron": "/ˈswɛtər hɛm/",
    "example": "The sweater hem sits above the table edge.",
    "type": "clothing",
    "r": 4,
    "id": "l02-sweater-hem",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-left-woman",
    "detailGroup": "sweater",
    "attributeGroup": "hem"
  },
  {
    "x": 33.8,
    "y": 55.8,
    "en": "warm face light",
    "fa": "نور گرم روی صورت",
    "pron": "/wɔrm feɪs laɪt/",
    "example": "Warm window light falls across her face.",
    "type": "light",
    "r": 4,
    "id": "l02-leftwoman-warm-face-light",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-left-woman",
    "detailGroup": "appearance",
    "attributeGroup": "lighting"
  },
  {
    "x": 39.6,
    "y": 60.8,
    "en": "open finger spread",
    "fa": "باز بودن انگشت‌ها",
    "pron": "/ˈoʊpən ˈfɪŋɡɚ sprɛd/",
    "example": "Her fingers spread openly as she gestures.",
    "type": "body",
    "r": 4,
    "id": "l02-leftwoman-open-finger-spread",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-left-woman",
    "detailGroup": "gesture",
    "attributeGroup": "hand-shape"
  },
  {
    "x": 61,
    "y": 24.5,
    "en": "side-parted hair",
    "fa": "موی فرق کج",
    "pron": "/ˈsaɪd ˈpɑrtɪd hɛr/",
    "example": "The blonde hair is parted to one side.",
    "type": "appearance",
    "r": 4,
    "id": "l02-side-parted-hair",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-right-woman",
    "detailGroup": "appearance",
    "attributeGroup": "hair-style"
  },
  {
    "x": 68.5,
    "y": 37.5,
    "en": "smiling eyes",
    "fa": "چشم‌های خندان",
    "pron": "/ˈsmaɪlɪŋ aɪz/",
    "example": "Her eyes narrow slightly with the laugh.",
    "type": "appearance",
    "r": 4,
    "id": "l02-smiling-eyes",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-right-woman",
    "detailGroup": "appearance",
    "attributeGroup": "face"
  },
  {
    "x": 68,
    "y": 44,
    "en": "visible teeth in laugh",
    "fa": "دندان‌های نمایان هنگام خنده",
    "pron": "/ˈvɪzəbəl tiθ ɪn læf/",
    "example": "Her teeth are clearly visible as she laughs.",
    "type": "appearance",
    "r": 4,
    "id": "l02-visible-teeth-laugh",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-right-woman",
    "detailGroup": "appearance",
    "attributeGroup": "mouth-detail"
  },
  {
    "x": 61.8,
    "y": 53.8,
    "en": "jacket shoulder seam",
    "fa": "دوخت شانه کت",
    "pron": "/ˈdʒækət ˈʃoʊldɚ sim/",
    "example": "A seam line marks the denim jacket shoulder.",
    "type": "clothing",
    "r": 4,
    "id": "l02-jacket-shoulder-seam",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-right-woman",
    "detailGroup": "jacket",
    "attributeGroup": "construction"
  },
  {
    "x": 63.8,
    "y": 59,
    "en": "jacket chest pocket flap",
    "fa": "سرجیب روی سینه",
    "pron": "/ˈdʒækət tʃɛst ˈpɑkət flæp/",
    "example": "A chest pocket flap is visible on the denim jacket.",
    "type": "clothing",
    "r": 4,
    "id": "l02-jacket-pocket-flap",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-right-woman",
    "detailGroup": "jacket",
    "attributeGroup": "garment-detail"
  },
  {
    "x": 70.8,
    "y": 69,
    "en": "rolled cuff edge",
    "fa": "لبه سرآستین تاخورده",
    "pron": "/roʊld kʌf ɛdʒ/",
    "example": "The jacket sleeve ends in a rolled cuff edge.",
    "type": "clothing",
    "r": 4,
    "id": "l02-rolled-cuff-edge",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-right-woman",
    "detailGroup": "jacket",
    "attributeGroup": "sleeve"
  },
  {
    "x": 61.8,
    "y": 48.5,
    "en": "striped neckline opening",
    "fa": "یقه راه‌راه نمایان",
    "pron": "/straɪpt ˈnɛkˌlaɪn ˈoʊpənɪŋ/",
    "example": "The striped top is visible at the jacket neckline.",
    "type": "clothing",
    "r": 4,
    "id": "l02-striped-neckline-opening",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-right-woman",
    "detailGroup": "striped-top",
    "attributeGroup": "neckline"
  },
  {
    "x": 74,
    "y": 61.7,
    "en": "open finger spread on right",
    "fa": "باز بودن انگشت‌های دست راست",
    "pron": "/ˈoʊpən ˈfɪŋɡɚ sprɛd ɑn raɪt/",
    "example": "Her right-hand fingers spread as she talks and laughs.",
    "type": "body",
    "r": 4,
    "id": "l02-rightwoman-open-finger-spread",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-right-woman",
    "detailGroup": "gesture",
    "attributeGroup": "hand-shape"
  },
  {
    "x": 58.2,
    "y": 61.6,
    "en": "left thumb visible",
    "fa": "شست دست چپ نمایان",
    "pron": "/lɛft θʌm ˈvɪzəbəl/",
    "example": "The left thumb is visible in her open-hand gesture.",
    "type": "body",
    "r": 4,
    "id": "l02-left-thumb-visible",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-right-woman",
    "detailGroup": "gesture",
    "attributeGroup": "hand-detail"
  },
  {
    "x": 66.2,
    "y": 56,
    "en": "warm cheek light",
    "fa": "نور گرم روی گونه",
    "pron": "/wɔrm tʃik laɪt/",
    "example": "Warm light brightens one cheek of the blonde woman.",
    "type": "light",
    "r": 4,
    "id": "l02-rightwoman-warm-cheek-light",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-right-woman",
    "detailGroup": "appearance",
    "attributeGroup": "lighting"
  },
  {
    "x": 53.2,
    "y": 39,
    "en": "blurred face",
    "fa": "چهره محو",
    "pron": "/blɝd feɪs/",
    "example": "The center patron's face is softly blurred in the background.",
    "type": "appearance",
    "r": 4,
    "id": "l02-centerpatron-blurred-face",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-center-patron",
    "detailGroup": "appearance",
    "attributeGroup": "focus"
  },
  {
    "x": 50,
    "y": 47.5,
    "en": "bent neck",
    "fa": "گردن خم شده",
    "pron": "/bɛnt nɛk/",
    "example": "The center patron bends the neck downward toward the object.",
    "type": "body",
    "r": 4,
    "id": "l02-centerpatron-bent-neck",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-center-patron",
    "detailGroup": "posture",
    "attributeGroup": "head-position"
  },
  {
    "x": 51,
    "y": 52.8,
    "en": "rounded shoulders",
    "fa": "شانه‌های گرد",
    "pron": "/ˈraʊndəd ˈʃoʊldɚz/",
    "example": "Rounded shoulders suggest a tucked-in seated posture.",
    "type": "body",
    "r": 4,
    "id": "l02-centerpatron-rounded-shoulders",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-center-patron",
    "detailGroup": "posture",
    "attributeGroup": "upper-body"
  },
  {
    "x": 55,
    "y": 54.2,
    "en": "phone-focused attention",
    "fa": "توجه به گوشی",
    "pron": "/foʊn-ˈfoʊkəst əˈtɛnʃən/",
    "example": "The center patron seems focused on a small handheld device.",
    "type": "action",
    "r": 4,
    "id": "l02-centerpatron-phone-focus",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-center-patron",
    "detailGroup": "posture",
    "attributeGroup": "attention"
  },
  {
    "x": 51,
    "y": 61,
    "en": "soft blue shirt fold",
    "fa": "چین لباس آبی",
    "pron": "/sɔft blu ʃɝt foʊld/",
    "example": "Soft folds are visible in the center patron's shirt.",
    "type": "clothing",
    "r": 4,
    "id": "l02-centerpatron-shirt-fold",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-center-patron",
    "detailGroup": "appearance",
    "attributeGroup": "garment-detail"
  },
  {
    "x": 90.8,
    "y": 45.2,
    "en": "three-quarter face angle",
    "fa": "زاویه سه‌رخ صورت",
    "pron": "/θri ˈkwɔrtɚ feɪs ˈæŋɡəl/",
    "example": "The right patron is shown at a three-quarter angle.",
    "type": "appearance",
    "r": 4,
    "id": "l02-rightpatron-face-angle",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-right-patron",
    "detailGroup": "appearance",
    "attributeGroup": "face-angle"
  },
  {
    "x": 94.6,
    "y": 56.5,
    "en": "mug handle",
    "fa": "دسته ماگ",
    "pron": "/mʌɡ ˈhændəl/",
    "example": "A mug handle is visible near the right patron.",
    "type": "object",
    "r": 4,
    "id": "l02-rightpatron-mug-handle",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-right-patron",
    "detailGroup": "posture",
    "attributeGroup": "object-detail"
  },
  {
    "x": 88.5,
    "y": 59.5,
    "en": "dark jacket front",
    "fa": "جلوی تیره لباس",
    "pron": "/dɑrk ˈdʒækət frʌnt/",
    "example": "The front of the right patron's top looks dark and plain.",
    "type": "clothing",
    "r": 4,
    "id": "l02-rightpatron-dark-jacket-front",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-right-patron",
    "detailGroup": "appearance",
    "attributeGroup": "garment-detail"
  },
  {
    "x": 88.5,
    "y": 74.5,
    "en": "bent knees under table",
    "fa": "زانوی خم زیر میز",
    "pron": "/bɛnt niz ˈʌndɚ ˈteɪbəl/",
    "example": "The seated pose suggests bent knees under the table.",
    "type": "body",
    "r": 4,
    "id": "l02-rightpatron-bent-knees",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-right-patron",
    "detailGroup": "lower-body",
    "attributeGroup": "posture"
  },
  {
    "x": 91.5,
    "y": 38.5,
    "en": "background blur on right",
    "fa": "محو بودن در پس‌زمینه راست",
    "pron": "/ˈbækˌɡraʊnd blɝ ɑn raɪt/",
    "example": "The right patron is blurred because of background depth.",
    "type": "appearance",
    "r": 4,
    "id": "l02-rightpatron-background-blur",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-right-patron",
    "detailGroup": "appearance",
    "attributeGroup": "focus"
  },
  {
    "x": 31.5,
    "y": 82.5,
    "en": "cup handle",
    "fa": "دسته فنجان",
    "pron": "/kʌp ˈhændəl/",
    "example": "The white coffee cup has a small handle on the side.",
    "type": "object",
    "r": 4,
    "id": "l02-cup-handle",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-wooden-table",
    "detailGroup": "tableware",
    "attributeGroup": "cup-detail"
  },
  {
    "x": 30.2,
    "y": 81.2,
    "en": "light coffee surface",
    "fa": "سطح روشن قهوه",
    "pron": "/laɪt ˈkɔfi ˈsɝfəs/",
    "example": "A pale coffee surface is visible inside the cup.",
    "type": "food",
    "r": 4,
    "id": "l02-light-coffee-surface",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-wooden-table",
    "detailGroup": "tableware",
    "attributeGroup": "drink-surface"
  },
  {
    "x": 62,
    "y": 83,
    "en": "foamy latte top",
    "fa": "کف روی لاته",
    "pron": "/ˈfoʊmi ˈlɑte tɑp/",
    "example": "Foam is visible on top of the tall latte.",
    "type": "food",
    "r": 4,
    "id": "l02-foamy-latte-top",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-wooden-table",
    "detailGroup": "tableware",
    "attributeGroup": "drink-surface"
  },
  {
    "x": 60.4,
    "y": 79.2,
    "en": "glass rim",
    "fa": "لبه لیوان",
    "pron": "/ɡlæs rɪm/",
    "example": "The latte glass has a clear rim at the top.",
    "type": "object",
    "r": 4,
    "id": "l02-glass-rim",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-wooden-table",
    "detailGroup": "tableware",
    "attributeGroup": "glass-detail"
  },
  {
    "x": 48.4,
    "y": 86.2,
    "en": "pastry flakes",
    "fa": "خرده‌های لایه‌ای شیرینی",
    "pron": "/ˈpeɪstri fleɪks/",
    "example": "The pastries show flaky layered surfaces.",
    "type": "food",
    "r": 4,
    "id": "l02-pastry-flakes",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-wooden-table",
    "detailGroup": "food",
    "attributeGroup": "texture"
  },
  {
    "x": 55.5,
    "y": 86.8,
    "en": "golden pastry crust",
    "fa": "پوسته طلایی شیرینی",
    "pron": "/ˈɡoʊldən ˈpeɪstri krʌst/",
    "example": "The pastry tops have a golden crust.",
    "type": "food",
    "r": 4,
    "id": "l02-golden-pastry-crust",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-wooden-table",
    "detailGroup": "food",
    "attributeGroup": "color"
  },
  {
    "x": 45.4,
    "y": 84,
    "en": "spoon handle",
    "fa": "دسته قاشق",
    "pron": "/spun ˈhændəl/",
    "example": "The metal teaspoon extends from the plate area.",
    "type": "object",
    "r": 4,
    "id": "l02-spoon-handle",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-wooden-table",
    "detailGroup": "tableware",
    "attributeGroup": "utensil-detail"
  },
  {
    "x": 72,
    "y": 98,
    "en": "table plank seam",
    "fa": "درز تخته‌های میز",
    "pron": "/ˈteɪbəl plæŋk sim/",
    "example": "A seam line between wooden planks is visible on the table.",
    "type": "setting",
    "r": 4,
    "id": "l02-table-plank-seam",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-wooden-table",
    "detailGroup": "surface",
    "attributeGroup": "construction"
  },
  {
    "x": 6,
    "y": 63.5,
    "en": "window sill",
    "fa": "طاقچه پنجره",
    "pron": "/ˈwɪndoʊ sɪl/",
    "example": "The potted plant sits on the window sill.",
    "type": "setting",
    "r": 4,
    "id": "l02-window-sill",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-window",
    "detailGroup": "window",
    "attributeGroup": "structure-detail"
  },
  {
    "x": 11,
    "y": 78.5,
    "en": "soft green leaves",
    "fa": "برگ‌های سبز نرم",
    "pron": "/sɔft ɡrin livz/",
    "example": "Soft green leaves spill out from the potted plant.",
    "type": "nature",
    "r": 4,
    "id": "l02-soft-green-leaves",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-window",
    "detailGroup": "plant",
    "attributeGroup": "leaf-detail"
  },
  {
    "x": 3.5,
    "y": 42,
    "en": "vertical window mullion",
    "fa": "ستون عمودی پنجره",
    "pron": "/ˈvɝtɪkəl ˈwɪndoʊ ˈmʌliən/",
    "example": "A vertical mullion divides the window.",
    "type": "setting",
    "r": 4,
    "id": "l02-vertical-window-mullion",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-window",
    "detailGroup": "window",
    "attributeGroup": "structure-detail"
  },
  {
    "x": 78,
    "y": 26,
    "en": "horizontal brick courses",
    "fa": "ردیف‌های افقی آجر",
    "pron": "/ˌhɔrəˈzɑntəl brɪk ˈkɔrsɪz/",
    "example": "Horizontal rows of exposed brick fill the background wall.",
    "type": "setting",
    "r": 4,
    "id": "l02-horizontal-brick-courses",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-brick-wall",
    "detailGroup": "decor",
    "attributeGroup": "pattern"
  },
  {
    "x": 72.5,
    "y": 33,
    "en": "mortar lines",
    "fa": "خطوط ملات",
    "pron": "/ˈmɔrtɚ laɪnz/",
    "example": "Pale mortar lines separate the bricks.",
    "type": "setting",
    "r": 4,
    "id": "l02-mortar-lines",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-brick-wall",
    "detailGroup": "decor",
    "attributeGroup": "surface-detail"
  },
  {
    "x": 61.5,
    "y": 20,
    "en": "shelf bracket",
    "fa": "پایه قفسه",
    "pron": "/ʃɛlf ˈbrækɪt/",
    "example": "A dark bracket supports the wall shelf.",
    "type": "object",
    "r": 4,
    "id": "l02-shelf-bracket",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-brick-wall",
    "detailGroup": "decor",
    "attributeGroup": "hardware"
  },
  {
    "x": 56,
    "y": 30.5,
    "en": "small teal plant pot",
    "fa": "گلدان کوچک فیروزه‌ای",
    "pron": "/smɔl til plænt pɑt/",
    "example": "A small teal pot sits on the shelf.",
    "type": "object",
    "r": 4,
    "id": "l02-small-teal-plant-pot",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-brick-wall",
    "detailGroup": "decor",
    "attributeGroup": "pot"
  },
  {
    "x": 83.5,
    "y": 13,
    "en": "black picture frame",
    "fa": "قاب مشکی عکس",
    "pron": "/blæk ˈpɪktʃɚ freɪm/",
    "example": "One picture hangs in a black frame on the brick wall.",
    "type": "object",
    "r": 4,
    "id": "l02-black-picture-frame",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-brick-wall",
    "detailGroup": "decor",
    "attributeGroup": "frame"
  },
  {
    "x": 95.5,
    "y": 21,
    "en": "lamp shade glow",
    "fa": "درخشش کلاهک چراغ",
    "pron": "/læmp ʃeɪd ɡloʊ/",
    "example": "Warm light glows from the hanging lamp shade.",
    "type": "light",
    "r": 4,
    "id": "l02-lamp-shade-glow",
    "level": "detail",
    "reviewed": true,
    "evidenceType": "visible-detail",
    "parentId": "l02-brick-wall",
    "detailGroup": "light",
    "attributeGroup": "lamp-glow"
  }
];
  const L2_DETAILS={
  "curly-haired woman": {
    "phrase": "laugh together",
    "collocations": [
      "curly shoulder-length hair",
      "beige knit sweater",
      "open hand gesture"
    ],
    "grammar": "The woman on the left is laughing and gesturing with both hands."
  },
  "blonde woman": {
    "phrase": "chat over coffee",
    "collocations": [
      "long blonde hair",
      "denim jacket",
      "striped top"
    ],
    "grammar": "The woman on the right is laughing beside the other woman."
  },
  "window": {
    "phrase": "natural window light",
    "collocations": [
      "large bright window",
      "on the left",
      "strong daylight"
    ],
    "grammar": "Natural daylight is entering through the large window on the left."
  },
  "wooden table": {
    "phrase": "rustic wooden table",
    "collocations": [
      "dark tabletop",
      "foreground surface",
      "coffee and pastries"
    ],
    "grammar": "The women are sitting at a dark rustic wooden table."
  },
  "brick wall": {
    "phrase": "exposed brick wall",
    "collocations": [
      "warm brick tones",
      "café background",
      "framed pictures"
    ],
    "grammar": "An exposed brick wall fills much of the background."
  },
  "center background patron": {
    "phrase": "center background patron",
    "collocations": [
      "center background patron",
      "مشتریِ وسطِ پس‌زمینه",
      "person"
    ],
    "grammar": "A seated patron is visible behind the two women near the center."
  },
  "right background patron": {
    "phrase": "right background patron",
    "collocations": [
      "right background patron",
      "مشتریِ سمت راستِ پس‌زمینه",
      "person"
    ],
    "grammar": "Another seated patron is visible at a table on the right."
  },
  "large window": {
    "phrase": "large window",
    "collocations": [
      "large window",
      "پنجره بزرگ",
      "setting"
    ],
    "grammar": "A large bright window fills the left side of the café."
  },
  "dark brown hair": {
    "phrase": "dark brown hair",
    "collocations": [
      "dark brown hair",
      "موهای قهوه‌ای تیره",
      "hair"
    ],
    "grammar": "Her hair is dark brown."
  },
  "very curly hair": {
    "phrase": "very curly hair",
    "collocations": [
      "very curly hair",
      "موهای بسیار فر",
      "hair"
    ],
    "grammar": "She has very curly hair."
  },
  "shoulder-length hair": {
    "phrase": "shoulder-length hair",
    "collocations": [
      "shoulder-length hair",
      "موی تا روی شانه",
      "hair"
    ],
    "grammar": "Her curls fall to about shoulder length."
  },
  "broad smile": {
    "phrase": "broad smile",
    "collocations": [
      "broad smile",
      "لبخند پهن",
      "face"
    ],
    "grammar": "She has a broad smile."
  },
  "open-mouth laugh": {
    "phrase": "open-mouth laugh",
    "collocations": [
      "open-mouth laugh",
      "خنده با دهان باز",
      "face"
    ],
    "grammar": "She is laughing with her mouth open."
  },
  "beige-taupe sweater": {
    "phrase": "beige-taupe sweater",
    "collocations": [
      "beige-taupe sweater",
      "پلیور بژ-خاکستری",
      "color"
    ],
    "grammar": "She is wearing a beige-taupe sweater."
  },
  "chunky-knit texture": {
    "phrase": "chunky-knit texture",
    "collocations": [
      "chunky-knit texture",
      "بافت درشتِ بافتنی",
      "texture"
    ],
    "grammar": "The sweater has a chunky-knit texture."
  },
  "crew neckline": {
    "phrase": "crew neckline",
    "collocations": [
      "crew neckline",
      "یقه گرد",
      "neckline"
    ],
    "grammar": "The sweater has a crew neckline."
  },
  "left long sleeve": {
    "phrase": "left long sleeve",
    "collocations": [
      "left long sleeve",
      "آستین بلند چپ",
      "sleeve"
    ],
    "grammar": "Her left arm is covered by a long sleeve."
  },
  "right long sleeve": {
    "phrase": "right long sleeve",
    "collocations": [
      "right long sleeve",
      "آستین بلند راست",
      "sleeve"
    ],
    "grammar": "Her right arm is covered by a long sleeve."
  },
  "left raised hand": {
    "phrase": "left raised hand",
    "collocations": [
      "left raised hand",
      "دست چپِ بالا آمده",
      "hand"
    ],
    "grammar": "Her left hand is raised while she gestures."
  },
  "right raised hand": {
    "phrase": "right raised hand",
    "collocations": [
      "right raised hand",
      "دست راستِ بالا آمده",
      "hand"
    ],
    "grammar": "Her right hand is raised in conversation."
  },
  "open palms": {
    "phrase": "open palms",
    "collocations": [
      "open palms",
      "کف دست‌های باز",
      "gesture"
    ],
    "grammar": "Her open palms support an animated conversational gesture."
  },
  "upright seated posture": {
    "phrase": "upright seated posture",
    "collocations": [
      "upright seated posture",
      "حالت نشسته و صاف",
      "posture"
    ],
    "grammar": "She is seated upright at the table."
  },
  "blonde hair": {
    "phrase": "blonde hair",
    "collocations": [
      "blonde hair",
      "موهای بلوند",
      "hair"
    ],
    "grammar": "Her hair is blonde."
  },
  "long hair": {
    "phrase": "long hair",
    "collocations": [
      "long hair",
      "موهای بلند",
      "hair"
    ],
    "grammar": "Her hair extends below her shoulders."
  },
  "straight hair": {
    "phrase": "straight hair",
    "collocations": [
      "straight hair",
      "موهای صاف",
      "hair"
    ],
    "grammar": "Her hair is straight."
  },
  "broad laughing smile": {
    "phrase": "broad laughing smile",
    "collocations": [
      "broad laughing smile",
      "لبخند پهن هنگام خنده",
      "face"
    ],
    "grammar": "She has a broad laughing smile."
  },
  "open laughing mouth": {
    "phrase": "open laughing mouth",
    "collocations": [
      "open laughing mouth",
      "دهان باز هنگام خنده",
      "face"
    ],
    "grammar": "Her mouth is open as she laughs."
  },
  "upward-left gaze": {
    "phrase": "upward-left gaze",
    "collocations": [
      "upward-left gaze",
      "نگاه رو به بالا و چپ",
      "gaze"
    ],
    "grammar": "She is looking slightly upward and to the left."
  },
  "blue denim jacket": {
    "phrase": "blue denim jacket",
    "collocations": [
      "blue denim jacket",
      "کت جین آبی",
      "garment"
    ],
    "grammar": "She is wearing a blue denim jacket."
  },
  "denim texture": {
    "phrase": "denim texture",
    "collocations": [
      "denim texture",
      "بافت جین",
      "texture"
    ],
    "grammar": "The jacket has a visible denim texture."
  },
  "pointed jacket collar": {
    "phrase": "pointed jacket collar",
    "collocations": [
      "pointed jacket collar",
      "یقه نوک‌تیز کت",
      "collar"
    ],
    "grammar": "The denim jacket has a pointed collar."
  },
  "metal jacket buttons": {
    "phrase": "metal jacket buttons",
    "collocations": [
      "metal jacket buttons",
      "دکمه‌های فلزی کت",
      "button"
    ],
    "grammar": "Metal buttons are visible on the denim jacket."
  },
  "cuffed jacket sleeves": {
    "phrase": "cuffed jacket sleeves",
    "collocations": [
      "cuffed jacket sleeves",
      "آستین‌های تاخورده کت",
      "sleeve"
    ],
    "grammar": "The jacket sleeves are cuffed at the forearms."
  },
  "striped top": {
    "phrase": "striped top",
    "collocations": [
      "striped top",
      "بلوز راه‌راه",
      "garment"
    ],
    "grammar": "A striped top is visible beneath the jacket."
  },
  "white base fabric": {
    "phrase": "white base fabric",
    "collocations": [
      "white base fabric",
      "زمینه سفید لباس",
      "color"
    ],
    "grammar": "The striped top has a white base."
  },
  "black horizontal stripes": {
    "phrase": "black horizontal stripes",
    "collocations": [
      "black horizontal stripes",
      "راه‌راه‌های افقی مشکی",
      "pattern"
    ],
    "grammar": "Black horizontal stripes cross the top."
  },
  "red accent stripe": {
    "phrase": "red accent stripe",
    "collocations": [
      "red accent stripe",
      "نوار قرمز تزئینی",
      "pattern"
    ],
    "grammar": "A red accent stripe is visible near the neckline."
  },
  "left open hand": {
    "phrase": "left open hand",
    "collocations": [
      "left open hand",
      "دست چپ باز",
      "hand"
    ],
    "grammar": "Her left hand is open while she gestures."
  },
  "right open hand": {
    "phrase": "right open hand",
    "collocations": [
      "right open hand",
      "دست راست باز",
      "hand"
    ],
    "grammar": "Her right hand is open while she gestures."
  },
  "two-hand gesture": {
    "phrase": "two-hand gesture",
    "collocations": [
      "two-hand gesture",
      "اشاره با هر دو دست",
      "gesture"
    ],
    "grammar": "She is gesturing with both hands."
  },
  "short dark hair": {
    "phrase": "short dark hair",
    "collocations": [
      "short dark hair",
      "موهای کوتاه تیره",
      "hair"
    ],
    "grammar": "The center background patron has short dark hair."
  },
  "light blue-gray shirt": {
    "phrase": "light blue-gray shirt",
    "collocations": [
      "light blue-gray shirt",
      "پیراهن آبی-خاکستری روشن",
      "garment"
    ],
    "grammar": "He is wearing a light blue-gray shirt."
  },
  "downward gaze": {
    "phrase": "downward gaze",
    "collocations": [
      "downward gaze",
      "نگاه رو به پایین",
      "gaze"
    ],
    "grammar": "His gaze is directed downward."
  },
  "seated posture": {
    "phrase": "seated posture",
    "collocations": [
      "seated posture",
      "حالت نشسته",
      "posture"
    ],
    "grammar": "He is seated behind the foreground pair."
  },
  "small handheld object": {
    "phrase": "small handheld object",
    "collocations": [
      "small handheld object",
      "شیء کوچک در دست",
      "object"
    ],
    "grammar": "A small handheld object is visible near his hands, but its exact type is unclear."
  },
  "dark charcoal top": {
    "phrase": "dark charcoal top",
    "collocations": [
      "dark charcoal top",
      "لباس زغالی تیره",
      "garment"
    ],
    "grammar": "He is wearing a dark charcoal top."
  },
  "forearms near tabletop": {
    "phrase": "forearms near tabletop",
    "collocations": [
      "forearms near tabletop",
      "ساعدها نزدیک سطح میز",
      "arm"
    ],
    "grammar": "His forearms are positioned near the tabletop."
  },
  "blue jeans": {
    "phrase": "blue jeans",
    "collocations": [
      "blue jeans",
      "شلوار جین آبی",
      "trousers"
    ],
    "grammar": "Blue jeans are visible below the table."
  },
  "small light-colored drink": {
    "phrase": "small light-colored drink",
    "collocations": [
      "small light-colored drink",
      "نوشیدنی کوچک روشن‌رنگ",
      "object"
    ],
    "grammar": "A small light-colored drink is visible on his table."
  },
  "white coffee cup": {
    "phrase": "white coffee cup",
    "collocations": [
      "white coffee cup",
      "فنجان قهوه سفید",
      "cup"
    ],
    "grammar": "A white coffee cup sits in front of the woman on the left."
  },
  "left white saucer": {
    "phrase": "left white saucer",
    "collocations": [
      "left white saucer",
      "نعلبکی سفید سمت چپ",
      "saucer"
    ],
    "grammar": "The left coffee cup sits on a white saucer."
  },
  "tall milky coffee": {
    "phrase": "tall milky coffee",
    "collocations": [
      "tall milky coffee",
      "قهوه شیری در لیوان بلند",
      "drink"
    ],
    "grammar": "A tall milky coffee sits in front of the woman on the right."
  },
  "clear coffee glass": {
    "phrase": "clear coffee glass",
    "collocations": [
      "clear coffee glass",
      "لیوان شفاف قهوه",
      "glass"
    ],
    "grammar": "The milky coffee is served in a clear glass."
  },
  "right white saucer": {
    "phrase": "right white saucer",
    "collocations": [
      "right white saucer",
      "نعلبکی سفید سمت راست",
      "saucer"
    ],
    "grammar": "The tall coffee glass stands on a white saucer."
  },
  "white pastry plate": {
    "phrase": "white pastry plate",
    "collocations": [
      "white pastry plate",
      "بشقاب سفید شیرینی",
      "plate"
    ],
    "grammar": "A white plate sits between the women."
  },
  "croissant-like pastries": {
    "phrase": "croissant-like pastries",
    "collocations": [
      "croissant-like pastries",
      "شیرینی‌های شبیه کروسان",
      "food"
    ],
    "grammar": "Several croissant-like pastries are arranged on the plate."
  },
  "metal teaspoon": {
    "phrase": "metal teaspoon",
    "collocations": [
      "metal teaspoon",
      "قاشق چای‌خوری فلزی",
      "utensil"
    ],
    "grammar": "A metal teaspoon is visible beside the tableware."
  },
  "dark rustic wood grain": {
    "phrase": "dark rustic wood grain",
    "collocations": [
      "dark rustic wood grain",
      "رگه‌های چوب تیره و روستیک",
      "texture"
    ],
    "grammar": "The tabletop shows dark rustic wood grain."
  },
  "bright window panes": {
    "phrase": "bright window panes",
    "collocations": [
      "bright window panes",
      "شیشه‌های روشن پنجره",
      "structure"
    ],
    "grammar": "The window panes are brightly lit."
  },
  "strong natural daylight": {
    "phrase": "strong natural daylight",
    "collocations": [
      "strong natural daylight",
      "نور طبیعی قوی",
      "light"
    ],
    "grammar": "Strong natural daylight enters from the left."
  },
  "terracotta pot": {
    "phrase": "terracotta pot",
    "collocations": [
      "terracotta pot",
      "گلدان سفالی",
      "pot"
    ],
    "grammar": "A terracotta pot stands beside the window."
  },
  "leafy green plant": {
    "phrase": "leafy green plant",
    "collocations": [
      "leafy green plant",
      "گیاه سبز پربرگ",
      "plant"
    ],
    "grammar": "A leafy green plant grows from the terracotta pot."
  },
  "thick window frame": {
    "phrase": "thick window frame",
    "collocations": [
      "thick window frame",
      "قاب ضخیم پنجره",
      "structure"
    ],
    "grammar": "A thick light-colored frame divides the window."
  },
  "red-brown exposed brick": {
    "phrase": "red-brown exposed brick",
    "collocations": [
      "red-brown exposed brick",
      "آجر نمایان قرمز-قهوه‌ای",
      "surface"
    ],
    "grammar": "Red-brown exposed brick forms the café wall."
  },
  "black wall shelf": {
    "phrase": "black wall shelf",
    "collocations": [
      "black wall shelf",
      "قفسه دیواری مشکی",
      "shelf"
    ],
    "grammar": "A black wall shelf is mounted on the brick wall."
  },
  "small shelf plants": {
    "phrase": "small shelf plants",
    "collocations": [
      "small shelf plants",
      "گیاهان کوچک روی قفسه",
      "plant"
    ],
    "grammar": "Small green plants sit on the wall shelves."
  },
  "framed portrait": {
    "phrase": "framed portrait",
    "collocations": [
      "framed portrait",
      "پرتره قاب‌شده",
      "picture"
    ],
    "grammar": "A framed black-and-white portrait hangs on the wall."
  },
  "second framed picture": {
    "phrase": "second framed picture",
    "collocations": [
      "second framed picture",
      "تصویر قاب‌شده دوم",
      "picture"
    ],
    "grammar": "Another framed picture hangs farther to the right."
  },
  "warm string lights": {
    "phrase": "warm string lights",
    "collocations": [
      "warm string lights",
      "چراغ‌های ریسه‌ای گرم",
      "light"
    ],
    "grammar": "Warm string lights cross the brick background."
  },
  "amber light points": {
    "phrase": "amber light points",
    "collocations": [
      "amber light points",
      "نقاط نور کهربایی",
      "light"
    ],
    "grammar": "Small amber points of decorative light are visible."
  },
  "black hanging lamp": {
    "phrase": "black hanging lamp",
    "collocations": [
      "black hanging lamp",
      "چراغ آویز مشکی",
      "lamp"
    ],
    "grammar": "A black hanging lamp appears at the upper right."
  },
  "short cropped dark hair": {
    "phrase": "short cropped dark hair",
    "collocations": [
      "short cropped dark hair",
      "موهای کوتاه و مرتب تیره",
      "hair"
    ],
    "grammar": "The right background patron has short cropped dark hair."
  },
  "lowered gaze": {
    "phrase": "lowered gaze",
    "collocations": [
      "lowered gaze",
      "نگاه پایین‌افتاده",
      "gaze"
    ],
    "grammar": "The right background patron has a lowered gaze."
  },
  "side-table seated posture": {
    "phrase": "side-table seated posture",
    "collocations": [
      "side-table seated posture",
      "حالت نشسته کنار میز کناری",
      "posture"
    ],
    "grammar": "He is seated at a separate side table."
  },
  "voluminous curls": {
    "phrase": "describe the visible detail",
    "collocations": [
      "voluminous curls",
      "café scene",
      "appearance"
    ],
    "grammar": "The left woman has voluminous curls around her face.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The left woman has voluminous curls around her face.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the left woman has voluminous curls around her face.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed voluminous curls in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention voluminous curls.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "soft laugh lines": {
    "phrase": "describe the visible detail",
    "collocations": [
      "soft laugh lines",
      "café scene",
      "appearance"
    ],
    "grammar": "Soft laugh lines appear near the left woman's eyes.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Soft laugh lines appear near the left woman's eyes.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that soft laugh lines appear near the left woman's eyes.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed soft laugh lines in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention soft laugh lines.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "visible upper teeth": {
    "phrase": "describe the visible detail",
    "collocations": [
      "visible upper teeth",
      "café scene",
      "appearance"
    ],
    "grammar": "Her upper teeth are visible in the laugh.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Her upper teeth are visible in the laugh.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that her upper teeth are visible in the laugh.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed visible upper teeth in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention visible upper teeth.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "dropped shoulders": {
    "phrase": "describe the visible detail",
    "collocations": [
      "dropped shoulders",
      "café scene",
      "gesture"
    ],
    "grammar": "Her shoulders look relaxed rather than tense.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Her shoulders look relaxed rather than tense.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that her shoulders look relaxed rather than tense.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed dropped shoulders in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention dropped shoulders.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "bent left elbow": {
    "phrase": "describe the visible detail",
    "collocations": [
      "bent left elbow",
      "café scene",
      "gesture"
    ],
    "grammar": "The left elbow bends as she gestures while laughing.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The left elbow bends as she gestures while laughing.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the left elbow bends as she gestures while laughing.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed bent left elbow in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention bent left elbow.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "bent right elbow": {
    "phrase": "describe the visible detail",
    "collocations": [
      "bent right elbow",
      "café scene",
      "gesture"
    ],
    "grammar": "The right elbow is also bent toward the tabletop.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The right elbow is also bent toward the tabletop.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the right elbow is also bent toward the tabletop.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed bent right elbow in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention bent right elbow.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "ribbed sweater cuff": {
    "phrase": "describe the visible detail",
    "collocations": [
      "ribbed sweater cuff",
      "café scene",
      "sweater"
    ],
    "grammar": "A ribbed cuff finishes one sleeve of the sweater.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A ribbed cuff finishes one sleeve of the sweater.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a ribbed cuff finishes one sleeve of the sweater.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed ribbed sweater cuff in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention ribbed sweater cuff.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "sweater hem": {
    "phrase": "describe the visible detail",
    "collocations": [
      "sweater hem",
      "café scene",
      "sweater"
    ],
    "grammar": "The sweater hem sits above the table edge.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The sweater hem sits above the table edge.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the sweater hem sits above the table edge.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed sweater hem in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention sweater hem.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "warm face light": {
    "phrase": "describe the visible detail",
    "collocations": [
      "warm face light",
      "café scene",
      "appearance"
    ],
    "grammar": "Warm window light falls across her face.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Warm window light falls across her face.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that warm window light falls across her face.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed warm face light in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention warm face light.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "open finger spread": {
    "phrase": "describe the visible detail",
    "collocations": [
      "open finger spread",
      "café scene",
      "gesture"
    ],
    "grammar": "Her fingers spread openly as she gestures.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Her fingers spread openly as she gestures.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that her fingers spread openly as she gestures.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed open finger spread in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention open finger spread.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "side-parted hair": {
    "phrase": "describe the visible detail",
    "collocations": [
      "side-parted hair",
      "café scene",
      "appearance"
    ],
    "grammar": "The blonde hair is parted to one side.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The blonde hair is parted to one side.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the blonde hair is parted to one side.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed side-parted hair in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention side-parted hair.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "smiling eyes": {
    "phrase": "describe the visible detail",
    "collocations": [
      "smiling eyes",
      "café scene",
      "appearance"
    ],
    "grammar": "Her eyes narrow slightly with the laugh.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Her eyes narrow slightly with the laugh.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that her eyes narrow slightly with the laugh.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed smiling eyes in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention smiling eyes.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "visible teeth in laugh": {
    "phrase": "describe the visible detail",
    "collocations": [
      "visible teeth in laugh",
      "café scene",
      "appearance"
    ],
    "grammar": "Her teeth are clearly visible as she laughs.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Her teeth are clearly visible as she laughs.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that her teeth are clearly visible as she laughs.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed visible teeth in laugh in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention visible teeth in laugh.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "jacket shoulder seam": {
    "phrase": "describe the visible detail",
    "collocations": [
      "jacket shoulder seam",
      "café scene",
      "jacket"
    ],
    "grammar": "A seam line marks the denim jacket shoulder.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A seam line marks the denim jacket shoulder.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a seam line marks the denim jacket shoulder.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed jacket shoulder seam in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention jacket shoulder seam.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "jacket chest pocket flap": {
    "phrase": "describe the visible detail",
    "collocations": [
      "jacket chest pocket flap",
      "café scene",
      "jacket"
    ],
    "grammar": "A chest pocket flap is visible on the denim jacket.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A chest pocket flap is visible on the denim jacket.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a chest pocket flap is visible on the denim jacket.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed jacket chest pocket flap in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention jacket chest pocket flap.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "rolled cuff edge": {
    "phrase": "describe the visible detail",
    "collocations": [
      "rolled cuff edge",
      "café scene",
      "jacket"
    ],
    "grammar": "The jacket sleeve ends in a rolled cuff edge.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The jacket sleeve ends in a rolled cuff edge.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the jacket sleeve ends in a rolled cuff edge.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed rolled cuff edge in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention rolled cuff edge.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "striped neckline opening": {
    "phrase": "describe the visible detail",
    "collocations": [
      "striped neckline opening",
      "café scene",
      "striped-top"
    ],
    "grammar": "The striped top is visible at the jacket neckline.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The striped top is visible at the jacket neckline.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the striped top is visible at the jacket neckline.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed striped neckline opening in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention striped neckline opening.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "open finger spread on right": {
    "phrase": "describe the visible detail",
    "collocations": [
      "open finger spread on right",
      "café scene",
      "gesture"
    ],
    "grammar": "Her right-hand fingers spread as she talks and laughs.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Her right-hand fingers spread as she talks and laughs.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that her right-hand fingers spread as she talks and laughs.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed open finger spread on right in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention open finger spread on right.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "left thumb visible": {
    "phrase": "describe the visible detail",
    "collocations": [
      "left thumb visible",
      "café scene",
      "gesture"
    ],
    "grammar": "The left thumb is visible in her open-hand gesture.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The left thumb is visible in her open-hand gesture.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the left thumb is visible in her open-hand gesture.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed left thumb visible in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention left thumb visible.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "warm cheek light": {
    "phrase": "describe the visible detail",
    "collocations": [
      "warm cheek light",
      "café scene",
      "appearance"
    ],
    "grammar": "Warm light brightens one cheek of the blonde woman.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Warm light brightens one cheek of the blonde woman.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that warm light brightens one cheek of the blonde woman.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed warm cheek light in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention warm cheek light.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "blurred face": {
    "phrase": "describe the visible detail",
    "collocations": [
      "blurred face",
      "café scene",
      "appearance"
    ],
    "grammar": "The center patron's face is softly blurred in the background.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The center patron's face is softly blurred in the background.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the center patron's face is softly blurred in the background.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed blurred face in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention blurred face.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "bent neck": {
    "phrase": "describe the visible detail",
    "collocations": [
      "bent neck",
      "café scene",
      "posture"
    ],
    "grammar": "The center patron bends the neck downward toward the object.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The center patron bends the neck downward toward the object.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the center patron bends the neck downward toward the object.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed bent neck in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention bent neck.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "rounded shoulders": {
    "phrase": "describe the visible detail",
    "collocations": [
      "rounded shoulders",
      "café scene",
      "posture"
    ],
    "grammar": "Rounded shoulders suggest a tucked-in seated posture.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Rounded shoulders suggest a tucked-in seated posture.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that rounded shoulders suggest a tucked-in seated posture.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed rounded shoulders in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention rounded shoulders.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "phone-focused attention": {
    "phrase": "describe the visible detail",
    "collocations": [
      "phone-focused attention",
      "café scene",
      "posture"
    ],
    "grammar": "The center patron seems focused on a small handheld device.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The center patron seems focused on a small handheld device.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the center patron seems focused on a small handheld device.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed phone-focused attention in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention phone-focused attention.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "soft blue shirt fold": {
    "phrase": "describe the visible detail",
    "collocations": [
      "soft blue shirt fold",
      "café scene",
      "appearance"
    ],
    "grammar": "Soft folds are visible in the center patron's shirt.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Soft folds are visible in the center patron's shirt.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that soft folds are visible in the center patron's shirt.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed soft blue shirt fold in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention soft blue shirt fold.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "three-quarter face angle": {
    "phrase": "describe the visible detail",
    "collocations": [
      "three-quarter face angle",
      "café scene",
      "appearance"
    ],
    "grammar": "The right patron is shown at a three-quarter angle.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The right patron is shown at a three-quarter angle.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the right patron is shown at a three-quarter angle.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed three-quarter face angle in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention three-quarter face angle.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "mug handle": {
    "phrase": "describe the visible detail",
    "collocations": [
      "mug handle",
      "café scene",
      "posture"
    ],
    "grammar": "A mug handle is visible near the right patron.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A mug handle is visible near the right patron.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a mug handle is visible near the right patron.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed mug handle in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention mug handle.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "dark jacket front": {
    "phrase": "describe the visible detail",
    "collocations": [
      "dark jacket front",
      "café scene",
      "appearance"
    ],
    "grammar": "The front of the right patron's top looks dark and plain.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The front of the right patron's top looks dark and plain.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the front of the right patron's top looks dark and plain.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed dark jacket front in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention dark jacket front.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "bent knees under table": {
    "phrase": "describe the visible detail",
    "collocations": [
      "bent knees under table",
      "café scene",
      "lower-body"
    ],
    "grammar": "The seated pose suggests bent knees under the table.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The seated pose suggests bent knees under the table.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the seated pose suggests bent knees under the table.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed bent knees under table in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention bent knees under table.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "background blur on right": {
    "phrase": "describe the visible detail",
    "collocations": [
      "background blur on right",
      "café scene",
      "appearance"
    ],
    "grammar": "The right patron is blurred because of background depth.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The right patron is blurred because of background depth.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the right patron is blurred because of background depth.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed background blur on right in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention background blur on right.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "cup handle": {
    "phrase": "describe the visible detail",
    "collocations": [
      "cup handle",
      "café scene",
      "tableware"
    ],
    "grammar": "The white coffee cup has a small handle on the side.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The white coffee cup has a small handle on the side.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the white coffee cup has a small handle on the side.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed cup handle in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention cup handle.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "light coffee surface": {
    "phrase": "describe the visible detail",
    "collocations": [
      "light coffee surface",
      "café scene",
      "tableware"
    ],
    "grammar": "A pale coffee surface is visible inside the cup.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A pale coffee surface is visible inside the cup.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a pale coffee surface is visible inside the cup.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed light coffee surface in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention light coffee surface.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "foamy latte top": {
    "phrase": "describe the visible detail",
    "collocations": [
      "foamy latte top",
      "café scene",
      "tableware"
    ],
    "grammar": "Foam is visible on top of the tall latte.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Foam is visible on top of the tall latte.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that foam is visible on top of the tall latte.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed foamy latte top in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention foamy latte top.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "glass rim": {
    "phrase": "describe the visible detail",
    "collocations": [
      "glass rim",
      "café scene",
      "tableware"
    ],
    "grammar": "The latte glass has a clear rim at the top.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The latte glass has a clear rim at the top.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the latte glass has a clear rim at the top.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed glass rim in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention glass rim.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "pastry flakes": {
    "phrase": "describe the visible detail",
    "collocations": [
      "pastry flakes",
      "café scene",
      "food"
    ],
    "grammar": "The pastries show flaky layered surfaces.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The pastries show flaky layered surfaces.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the pastries show flaky layered surfaces.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed pastry flakes in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention pastry flakes.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "golden pastry crust": {
    "phrase": "describe the visible detail",
    "collocations": [
      "golden pastry crust",
      "café scene",
      "food"
    ],
    "grammar": "The pastry tops have a golden crust.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The pastry tops have a golden crust.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the pastry tops have a golden crust.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed golden pastry crust in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention golden pastry crust.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "spoon handle": {
    "phrase": "describe the visible detail",
    "collocations": [
      "spoon handle",
      "café scene",
      "tableware"
    ],
    "grammar": "The metal teaspoon extends from the plate area.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The metal teaspoon extends from the plate area.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the metal teaspoon extends from the plate area.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed spoon handle in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention spoon handle.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "table plank seam": {
    "phrase": "describe the visible detail",
    "collocations": [
      "table plank seam",
      "café scene",
      "surface"
    ],
    "grammar": "A seam line between wooden planks is visible on the table.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A seam line between wooden planks is visible on the table.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a seam line between wooden planks is visible on the table.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed table plank seam in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention table plank seam.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "window sill": {
    "phrase": "describe the visible detail",
    "collocations": [
      "window sill",
      "café scene",
      "window"
    ],
    "grammar": "The potted plant sits on the window sill.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "The potted plant sits on the window sill.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that the potted plant sits on the window sill.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed window sill in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention window sill.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "soft green leaves": {
    "phrase": "describe the visible detail",
    "collocations": [
      "soft green leaves",
      "café scene",
      "plant"
    ],
    "grammar": "Soft green leaves spill out from the potted plant.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Soft green leaves spill out from the potted plant.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that soft green leaves spill out from the potted plant.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed soft green leaves in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention soft green leaves.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "vertical window mullion": {
    "phrase": "describe the visible detail",
    "collocations": [
      "vertical window mullion",
      "café scene",
      "window"
    ],
    "grammar": "A vertical mullion divides the window.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A vertical mullion divides the window.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a vertical mullion divides the window.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed vertical window mullion in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention vertical window mullion.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "horizontal brick courses": {
    "phrase": "describe the visible detail",
    "collocations": [
      "horizontal brick courses",
      "café scene",
      "decor"
    ],
    "grammar": "Horizontal rows of exposed brick fill the background wall.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Horizontal rows of exposed brick fill the background wall.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that horizontal rows of exposed brick fill the background wall.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed horizontal brick courses in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention horizontal brick courses.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "mortar lines": {
    "phrase": "describe the visible detail",
    "collocations": [
      "mortar lines",
      "café scene",
      "decor"
    ],
    "grammar": "Pale mortar lines separate the bricks.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Pale mortar lines separate the bricks.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that pale mortar lines separate the bricks.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed mortar lines in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention mortar lines.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "shelf bracket": {
    "phrase": "describe the visible detail",
    "collocations": [
      "shelf bracket",
      "café scene",
      "decor"
    ],
    "grammar": "A dark bracket supports the wall shelf.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A dark bracket supports the wall shelf.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a dark bracket supports the wall shelf.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed shelf bracket in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention shelf bracket.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "small teal plant pot": {
    "phrase": "describe the visible detail",
    "collocations": [
      "small teal plant pot",
      "café scene",
      "decor"
    ],
    "grammar": "A small teal pot sits on the shelf.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "A small teal pot sits on the shelf.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that a small teal pot sits on the shelf.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed small teal plant pot in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention small teal plant pot.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "black picture frame": {
    "phrase": "describe the visible detail",
    "collocations": [
      "black picture frame",
      "café scene",
      "decor"
    ],
    "grammar": "One picture hangs in a black frame on the brick wall.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "One picture hangs in a black frame on the brick wall.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that one picture hangs in a black frame on the brick wall.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed black picture frame in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention black picture frame.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  },
  "lamp shade glow": {
    "phrase": "describe the visible detail",
    "collocations": [
      "lamp shade glow",
      "café scene",
      "light"
    ],
    "grammar": "Warm light glows from the hanging lamp shade.",
    "tenseLadder": [
      {
        "key": "now",
        "label": "NOW · VISIBLE",
        "tense": "Present simple / continuous",
        "sentence": "Warm light glows from the hanging lamp shade.",
        "evidence": "visible"
      },
      {
        "key": "past",
        "label": "PAST · RETELLING",
        "tense": "Past simple",
        "sentence": "In a past-tense retelling, I said that warm light glows from the hanging lamp shade.",
        "evidence": "retelling"
      },
      {
        "key": "perfect",
        "label": "UP TO NOW · REVIEW",
        "tense": "Present perfect",
        "sentence": "I have noticed lamp shade glow in the café scene.",
        "evidence": "learning-context"
      },
      {
        "key": "future",
        "label": "NEXT · LANGUAGE USE",
        "tense": "Future / possibility",
        "sentence": "When I describe the café scene again, I may mention lamp shade glow.",
        "evidence": "learning-context"
      }
    ],
    "grammarFocus": "Scene-grounded observation + evidence-safe tense practice"
  }
};
  if(typeof CAT01!=='undefined'&&CAT01.lessons&&CAT01.lessons[1]) CAT01.lessons[1].hotspots=L2_HOTSPOTS;
  if(window.ENGBOOK_LESSON_PACKS&&Array.isArray(window.ENGBOOK_LESSON_PACKS)){
    const pack=window.ENGBOOK_LESSON_PACKS.find(p=>p.lessonId===2);
    if(pack){pack.hotspots=L2_HOTSPOTS; pack.content=pack.content||{}; pack.content.hotspotDetails=L2_DETAILS; pack.qa=Object.assign({},pack.qa,{deepHotspots:true,totalHotspots:L2_HOTSPOTS.length,primaryHotspots:L2_HOTSPOTS.filter(h=>h.level!=='detail').length,detailHotspots:L2_HOTSPOTS.filter(h=>h.level==='detail').length,uiPattern:'floating-micro-card-v63'});}
  }
  window.ENGBOOK_LESSON_02_ATTRIBUTE_SCAN={version:'v0.64',standard:'deep scene attribute scan with floating micro card',totalHotspots:L2_HOTSPOTS.length,primaryHotspots:L2_HOTSPOTS.filter(h=>h.level!=='detail').length,detailHotspots:L2_HOTSPOTS.filter(h=>h.level==='detail').length,interactionModel:'micro-dot → leader-word → floating card → grammar tense ladder',lessonJourney:'overview → deep image analysis → sentence building → reasoning → language bank → grammar models → speaking'};
})();

/* EngBook v0.66 — Lesson 02 source-grounded completion + app practice extension */
(function(){
  const packs=window.ENGBOOK_LESSON_PACKS;
  if(!Array.isArray(packs))return;
  const pack=packs.find(p=>Number(p.lessonId)===2);
  if(!pack)return;
  pack.content=pack.content||{};
  const byId=(id)=>pack.hotspots?.find(h=>h.id===id);
  const detail=pack.content.hotspotDetails||(pack.content.hotspotDetails={});

  // Accuracy refinements after re-checking the source book and actual lesson image.
  const handheld=byId('l02-centerpatron-phone-focus');
  if(handheld){
    const old=handheld.en;
    handheld.en='attention on a handheld object';
    handheld.fa='توجه به شیء دستی';
    handheld.pron='/əˈtɛnʃən ɑn ə ˈhændˌhɛld ˈɑbdʒɛkt/';
    handheld.example='The center background patron is looking down at a small handheld object.';
    handheld.evidenceType='visible-detail';
    detail[handheld.en]=detail[old]||{
      phrase:'look down at a handheld object',
      collocations:['handheld object','downward gaze','background patron'],
      grammar:handheld.example,
      tenseLadder:[
        {key:'now',label:'NOW · VISIBLE',tense:'Present continuous',sentence:handheld.example,evidence:'visible'},
        {key:'past',label:'PAST · RETELLING',tense:'Past simple',sentence:'In a past-tense retelling, the background patron looked down at a handheld object.',evidence:'retelling'},
        {key:'perfect',label:'UP TO NOW · REVIEW',tense:'Present perfect',sentence:'I have noticed the handheld object in the background of the café scene.',evidence:'learning-context'},
        {key:'future',label:'NEXT · LANGUAGE USE',tense:'Future / possibility',sentence:'When I describe the picture again, I may mention the background patron and the handheld object.',evidence:'learning-context'}
      ],
      grammarFocus:'Visible action + cautious object naming'
    };
  }
  const knees=byId('l02-rightpatron-bent-knees');
  if(knees){
    knees.en='seated lower-body position';
    knees.fa='وضعیت پایین‌تنه در حالت نشسته';
    knees.pron='/ˈsitɪd ˈloʊɚ ˈbɑdi pəˈzɪʃən/';
    knees.example='The right background patron is seated at the side table; the exact position of his knees is partly obscured.';
    knees.evidenceType='supported-inference';
    detail[knees.en]={
      phrase:'be seated at a side table',
      collocations:['seated posture','partly obscured','side table'],
      grammar:knees.example,
      tenseLadder:[
        {key:'now',label:'NOW · SUPPORTED',tense:'Present simple / passive',sentence:knees.example,evidence:'visible'},
        {key:'past',label:'PAST · RETELLING',tense:'Past simple',sentence:'In a retelling, the patron sat at the side table while the main subjects talked in the foreground.',evidence:'retelling'},
        {key:'perfect',label:'UP TO NOW · REVIEW',tense:'Present perfect',sentence:'I have noticed that part of the patron’s lower body is obscured by the table.',evidence:'learning-context'},
        {key:'future',label:'NEXT · LANGUAGE USE',tense:'Future / description strategy',sentence:'In a careful description, I will avoid claiming an exact knee position that the photograph does not clearly show.',evidence:'learning-context'}
      ],
      grammarFocus:'Careful description when part of the body is obscured'
    };
  }

  // The handbook contains no Memory Frames / Personal Questions for Lesson 02.
  // These are intentionally stored separately as app-authored practice extensions.
  pack.content.appPracticeExtension={
    memoryFrames:[
      'I can see two women sitting…',
      'They are laughing while…',
      'On the table, there is / there are…',
      'The title says “Best Friends,” but the photograph itself shows…'
    ],
    personalQuestions:[
      'Describe a relaxed conversation you have had with a friend over coffee, tea, or food.',
      'What visible behaviors make a conversation look comfortable or animated?',
      'Compare the café in this picture with a café or social place you know.'
    ],
    grammarContrast:[
      {label:'PHOTO-SAFE',text:'They are laughing together at a café table.'},
      {label:'CONTEXT-GATED',text:'They have known each other for years — only if a time span is supplied by context.'},
      {label:'DO NOT GUESS',text:'The photograph alone cannot establish how long they have known each other.'}
    ]
  };
  delete detail['phone-focused attention'];
  delete detail['bent knees under table'];
  if(Array.isArray(pack.content.evidence)){
    const left=pack.content.evidence.find(x=>x.label==='Woman — left'); if(left)left.label='Woman - left';
    const right=pack.content.evidence.find(x=>x.label==='Woman — right'); if(right)right.label='Woman - right';
  }
  if(Array.isArray(pack.content.micro)&&pack.content.micro.length){pack.content.micro[0]='Facial expression is the strongest visual cue: both subjects show broad smiles/laughter rather than neutral expressions.';}
  pack.qa=Object.assign({},pack.qa,{lesson02CompleteJourney:true,imageRechecked:true});
  window.ENGBOOK_LESSON_02_ATTRIBUTE_SCAN=Object.assign({},window.ENGBOOK_LESSON_02_ATTRIBUTE_SCAN||{}, {
    version:'v0.66',totalHotspots:Array.isArray(pack.hotspots)?pack.hotspots.length:0,primaryHotspots:(pack.hotspots||[]).filter(h=>h.level==='primary').length,detailHotspots:(pack.hotspots||[]).filter(h=>h.level==='detail').length,
    lessonJourney:'overview → deep image analysis → sentence building → evidence reasoning → story → language bank → grammar/model ladder → independent speaking → conversation',
    sourceAudit:'editorial-reviewed'
  });
})();
