/* Curated lexical help, separate from authored visual claims. Longer phrases
   take precedence over individual words. Unknown words are never guessed. */
(function(root){
  'use strict';
  const entries=`
paper map|نقشهٔ کاغذی
unfolded|بازشده از تا
cobbled|سنگ‌فرش‌شده با سنگ‌های کوچک
fountain|فواره؛ آب‌نما
façade|نمای ساختمان
reception counter|پیشخوان پذیرش
receptionist|مسئول پذیرش
chandelier|لوستر
crystal|بلور؛ کریستال
marble|سنگ مرمر
handover|تحویل‌دادن
room assignment|تخصیص اتاق
polite request|درخواست مؤدبانه
latticework|ساختار مشبک
terrace|تراس؛ محوطهٔ بازِ مسطح
sun hat|کلاه آفتابی
masonry|سنگ‌کاری یا آجرکاری
arch|قوس؛ طاق
railing|نرده
itinerary|برنامهٔ مسیر سفر
airport|فرودگاه
terminal|سالن پایانه
departure gate|گیت خروج
departures|پروازها یا سفرهای خروجی
gate|گیت
flight|پرواز
boarding|سوار شدن
check in|پذیرش مسافر و ثبت حضور
take off|از زمین برخاستن
lift off|از سطح زمین بلند شدن
touch down|با زمین تماس پیدا کردن هنگام فرود
landing gear|ارابهٔ فرود
cockpit|کابین خلبان
fuselage|بدنهٔ هواپیما
jet|هواپیمای جت
engine|موتور
engines|موتورها
wing|بال
wings|بال‌ها
runway|باند فرودگاه
control tower|برج مراقبت
suitcase|چمدان
suitcases|چمدان‌ها
luggage|بار و وسایل سفر
luggage tag|برچسب چمدان
jet bridge|راهروی اتصال پایانه به هواپیما
apron|محوطهٔ توقف و خدمات هواپیماها
platform|سکوی ایستگاه
railway|راه‌آهن
train|قطار
pushchair|کالسکه
pushchairs|کالسکه‌ها
teddy bear|خرس عروسکی
in front of|جلویِ
seven|هفت
six|شش
eight|هشت
nine|نُه
ten|ده
diners|افرادی که در حال صرف غذا هستند
diner|فردی که در حال صرف غذاست
dining|مربوط به غذا خوردن
dining table|میز غذاخوری
group|گروه
groups|گروه‌ها
gather|جمع شدن؛ دور هم آمدن
around|دورِ؛ اطرافِ
apparent|ظاهری؛ به نظر رسیده
age|سن
daylight|نور روز
sunlight|نور خورشید
audience|تماشاگران؛ حاضرانِ یک برنامه
crowd|جمعیت
flower-filled|پر از گل
rose-covered|پوشیده از گل رز
shoebox-sized|هم‌اندازهٔ جعبهٔ کفش
open-mouth|دهانِ باز؛ در توصیف حالت دهان
very|خیلی؛ بسیار
one|یک
four|چهار
five|پنج
other|دیگر
together|با هم
whole|تمام؛ کل
scene|صحنه
see|دیدن
describe|شرح دادن؛ توصیف کردن
description|توصیف
detail|جزئیات؛ یک نکتهٔ قابل مشاهده
details|جزئیات
stands|می‌ایستد؛ ایستاده است
stand|ایستادن؛ می‌ایستند
picnic|پیک‌نیک
shirt's|پیراهن؛ پسوند 's برای مالکیت
smiling at|لبخند زدن به
from|از
to|به؛ برای؛ بسته به جمله
of|برای نشان دادن ارتباط یا مالکیت بین اسم‌ها
their|آن‌ها؛ صفت ملکیِ مربوط به آن‌ها
his|او؛ صفت ملکی برای مذکر
her|او؛ صفت ملکی برای مؤنث
its|آن؛ صفت ملکی برای چیز یا حیوان
this|این
that|آن
these|این‌ها
those|آن‌ها
appearing|ظاهر شدن؛ به نظر رسیدن
floating|شناور
pale|کم‌رنگ
broad|پهن؛ وسیع
expression|حالت چهره؛ حالت بیان
light-haired|دارای موی روشن
bow|پاپیون؛ روبان گره‌خورده
next to|کنارِ
looking at|در حال نگاه کردن به
holding|در دست داشتن؛ نگه داشتن
handing over|در حال تحویل دادن
leaning over|روی چیزی خم شدن
cash register|صندوق فروشگاه
checkout monitor|نمایشگر صندوق
shopping bag|کیسهٔ خرید
printed form|فرم چاپ‌شده
retail employee|کارمند فروشگاه
rope swing|تاب طنابی
picnic table|میز پیک‌نیک
picnic basket|سبد پیک‌نیک
picnic blanket|زیرانداز پیک‌نیک
bar code|بارکد
barcode scanner|اسکنر بارکد
older man|مرد مسن
older woman|زن مسن
gray knit sweater|پلیور بافتنی خاکستری
light brown|قهوه‌ای روشن
dark brown|قهوه‌ای تیره
light blue|آبی روشن
dark blue|آبی تیره
low sun|خورشید نزدیک افق
warm reflection|بازتاب با رنگ‌های گرم
there is|یک چیز وجود دارد؛ برای معرفی یک مورد
there are|چند چیز وجود دارند؛ برای معرفی چند مورد
may be|ممکن است باشد
might be|شاید باشد؛ ممکن است باشد
seems to|به نظر می‌رسد که
appears to|به نظر می‌رسد که
is wearing|پوشیده است
are wearing|پوشیده‌اند
is holding|در دست دارد
is standing|ایستاده است
is sitting|نشسته است
at an easel|پشت سه‌پایهٔ نقاشی
customer|مشتری
employee|کارمند
man|مرد
men|مردان
woman|زن
women|زنان
boy|پسر
girl|دختر
child|کودک
children|کودکان
adult|بزرگسال
adults|بزرگسالان
people|افراد؛ مردم
person|فرد
older|مسن‌تر؛ برای توصیف سن نسبی
young|جوان؛ کم‌سن
younger|جوان‌تر؛ کم‌سن‌تر
baby|نوزاد
infant|نوزاد
student|دانش‌آموز؛ دانشجو
students|دانش‌آموزان؛ دانشجویان
teacher|معلم
cashier|صندوقدار
visitor|بازدیدکننده؛ مراجعه‌کننده
client|مشتری؛ مراجعه‌کننده
worker|کارگر؛ کارکن
hair|مو
face|صورت
head|سر
hand|دست
hands|دست‌ها
arm|بازو
arms|بازوها
leg|پا
legs|پاها
foot|پا؛ بخش پایین پا
feet|پاها؛ بخش پایین پا
eyes|چشم‌ها
eye|چشم
mouth|دهان
smile|لبخند
beard|ریش
mustache|سبیل
ponytail|موی دم‌اسبی
braid|موی بافته
earring|گوشواره
earrings|گوشواره‌ها
glasses|عینک؛ در توصیف چهره
hoop|حلقه
shirt|پیراهن
t-shirt|تی‌شرت
sweater|پلیور
coat|پالتو؛ کت بلند
jacket|ژاکت؛ کت
jackets|ژاکت‌ها؛ کت‌ها
uniform|لباس فرم
dress|پیراهن زنانه
skirt|دامن
trousers|شلوار
pants|شلوار
jeans|شلوار جین
shorts|شلوارک
shoes|کفش‌ها
shoe|کفش
sneakers|کفش کتانی
boots|چکمه‌ها
sandals|صندل‌ها
hat|کلاه
cap|کلاه نقاب‌دار
apron|پیش‌بند
scarf|شال؛ روسری
collar|یقه
cuff|سرآستین؛ بازوبند (بسته به کاربرد)
belt|کمربند
button|دکمه
buttons|دکمه‌ها
strap|بند
shoulder|شانه
lapel|برگردان یقهٔ کت
badge|نشان؛ کارت شناسایی روی لباس
knit|بافتنی
knitted|بافتنی
buttoned|دکمه‌بسته
barefoot|پابرهنه
sleeve|آستین
sleeves|آستین‌ها
striped|راه‌راه
checked|چهارخانه؛ در توصیف پارچه
floral|گل‌دار
black|سیاه
white|سفید
gray|خاکستری
grey|خاکستری
brown|قهوه‌ای
beige|بژ
blue|آبی
green|سبز
red|قرمز
pink|صورتی
yellow|زرد
orange|نارنجی؛ یا پرتقال، بسته به جمله
purple|بنفش
golden|طلایی
silver|نقره‌ای
dark|تیره
light|روشن؛ یا نور، بسته به جمله
long|بلند؛ در توصیف طول
short|کوتاه
curly|فرفری
wavy|موج‌دار
straight|صاف
small|کوچک
large|بزرگ
big|بزرگ
tall|بلند؛ در توصیف ارتفاع
thin|باریک؛ نازک
thick|ضخیم
round|گرد
rectangular|مستطیلی
wooden|چوبی
metal|فلزی؛ فلز
plastic|پلاستیکی؛ پلاستیک
paper|کاغذی؛ کاغذ
glass|شیشه؛ لیوان
clear|شفاف؛ واضح
open|باز
closed|بسته
folded|تا شده
tied|بسته‌شده؛ گره‌خورده
hanging|آویزان
standing|ایستاده؛ در حال ایستادن
sitting|نشسته؛ در حال نشستن
seated|نشسته
kneeling|زانو زده
walking|در حال راه رفتن
running|در حال دویدن
writing|در حال نوشتن
reading|در حال خواندن
painting|در حال نقاشی؛ یا نقاشی، بسته به جمله
smiling|در حال لبخند زدن
laughing|در حال خندیدن
talking|در حال صحبت کردن
watching|در حال تماشا کردن
looking|در حال نگاه کردن
carrying|در حال حمل کردن
wearing|پوشیده؛ در حال پوشیدن
reaching|دست دراز کردن به سمت چیزی
pointing|اشاره کردن
working|در حال کار کردن
helping|در حال کمک کردن
supporting|نگه داشتن؛ تکیه‌گاه بودن
leaning|خم شدن؛ تکیه دادن
cooking|در حال آشپزی
eating|در حال خوردن
drinking|در حال نوشیدن
shopping|خرید کردن
loading|در حال بارگیری؛ گذاشتن چیزی در دستگاه
washing|در حال شستن
cleaning|در حال تمیز کردن
measuring|در حال اندازه گرفتن
cutting|در حال بریدن
smiles|لبخند می‌زند
holds|در دست دارد؛ نگه می‌دارد
sits|می‌نشیند؛ نشسته است
stands|می‌ایستد؛ ایستاده است
wears|می‌پوشد؛ پوشیده است
table|میز
chair|صندلی
chairs|صندلی‌ها
desk|میز کار؛ میز تحریر
counter|پیشخوان
countertop|سطح پیشخوان
shelf|قفسه
shelves|قفسه‌ها
rail|میله؛ ریل
box|جعبه
lid|درِ جعبه یا ظرف
package|بسته
parcel|بستهٔ پستی
bag|کیسه؛ کیف
basket|سبد
handles|دسته‌ها
handle|دسته
form|فرم
printed|چاپ‌شده
lines|خط‌ها
pen|خودکار
pencil|مداد
notebook|دفتر
book|کتاب
books|کتاب‌ها
monitor|نمایشگر
display|نمایشگر؛ نمایش
screen|صفحهٔ نمایش
computer|رایانه
laptop|لپ‌تاپ
phone|تلفن
keyboard|صفحه‌کلید
equipment|تجهیزات
checkout|صندوق؛ محل پرداخت
barcode|بارکد
scanner|اسکنر
handheld|دستی؛ قابل نگه داشتن در دست
receipt|رسید
card|کارت
cash|پول نقد
money|پول
coins|سکه‌ها
store|فروشگاه
shop|مغازه
supermarket|سوپرمارکت
market|بازار
aisle|راهروی بین قفسه‌ها
cart|چرخ خرید
trolley|چرخ خرید
product|محصول؛ کالا
products|محصولات؛ کالاها
goods|کالاها
bottle|بطری
bottles|بطری‌ها
can|قوطی؛ یا توانستن، بسته به جمله
cans|قوطی‌ها
jar|شیشهٔ دردار
jars|شیشه‌های دردار
food|غذا
fruit|میوه
vegetables|سبزیجات
apple|سیب
apples|سیب‌ها
banana|موز
bananas|موزها
fish|ماهی
seafood|غذای دریایی
bread|نان
cake|کیک
coffee|قهوه
tea|چای
cup|فنجان
mug|ماگ؛ لیوان دسته‌دار
plate|بشقاب
bowl|کاسه
fork|چنگال
spoon|قاشق
knife|چاقو
tray|سینی
palette|پالت نقاشی
brush|قلم‌مو؛ برس
brushes|قلم‌موها؛ برس‌ها
easel|سه‌پایهٔ نقاشی
easels|سه‌پایه‌های نقاشی
canvas|بوم نقاشی
canvases|بوم‌های نقاشی
portrait|پرتره؛ تصویر چهره
portraits|پرتره‌ها؛ تصاویر چهره
landscape|منظره
studio|آتلیه؛ کارگاه هنری
classroom|کلاس درس
library|کتابخانه
school|مدرسه
university|دانشگاه
room|اتاق
door|در
doorway|درگاه
window|پنجره
windows|پنجره‌ها
wall|دیوار
walls|دیوارها
floor|کف
ceiling|سقف
arched|قوسی
sunlight|نور خورشید
garden|باغ؛ حیاطِ دارای گیاه
park|پارک
beach|ساحل
ocean|اقیانوس
water|آب
shoreline|خط ساحلی
sun|خورشید
sky|آسمان
tree|درخت
trees|درخت‌ها
palm|نخل
flowers|گل‌ها
flower|گل
roses|رزها
sunflowers|گل‌های آفتابگردان
hydrangeas|گل‌های ادریسی
arch|طاق؛ سازهٔ قوسی
grass|چمن
leaves|برگ‌ها
rope|طناب
ropes|طناب‌ها
swing|تاب
bubbles|حباب‌ها
blanket|پتو؛ زیرانداز، بسته به جمله
bench|نیمکت
bicycle|دوچرخه
dog|سگ
cat|گربه
behind|پشتِ
beside|کنارِ
between|بینِ
under|زیرِ
above|بالایِ
below|پایینِ
near|نزدیکِ
on|رویِ
in|در؛ داخلِ
at|در؛ کنار؛ در محل، بسته به جمله
with|با
without|بدون
foreground|پیش‌زمینهٔ تصویر
background|پس‌زمینهٔ تصویر
left|سمت چپ
right|سمت راست
center|مرکز
centre|مرکز
front|جلو
back|پشت
top|بالا
bottom|پایین
visible|قابل دیدن
partly|تا حدی
warm|گرم
bright|روشن
reflection|بازتاب
reflections|بازتاب‌ها
area|ناحیه
exchange|تعویض؛ مبادله
return|پس دادن؛ بازگشت
clothing|لباس
the|حرف تعریف؛ اشاره به مورد مشخص
a|حرف تعریف برای یک اسم مفرد نامشخص
an|حرف تعریف برای اسم مفرد با صدای آغازین واکه
is|است؛ برای فاعل مفرد
are|هستند؛ برای فاعل جمع
and|و
both|هر دو
two|دو
three|سه
several|چند
some|مقداری؛ بعضی
while|در حالی که
may|ممکن است
might|شاید؛ ممکن است
looks|نگاه می‌کند؛ یا به نظر می‌رسد، بسته به ساختار جمله
seems|به نظر می‌رسد
appears|به نظر می‌رسد؛ ظاهر می‌شود
clinical|مربوط به محیط معاینه و مراقبت پزشکی
examination|معاینه؛ بررسی
examination bed|تخت معاینه
scrubs|لباس مخصوص کادر درمان
stethoscope|گوشی پزشکی
tablet|تبلت
handheld|دستی؛ قابل نگه داشتن در دست
supports|نگه می‌دارد؛ تکیه‌گاه چیزی است
pharmacy|داروخانه
cardigan|ژاکت جلو باز
tan|قهوه‌ای روشن مایل به کرم
blond|بور
reclines|به حالت نیمه‌خوابیده تکیه می‌دهد
reclining|در حالت تکیه داده یا نیمه‌خوابیده
leans|خم می‌شود؛ متمایل می‌شود
reaches toward|به سوی چیزی دست دراز می‌کند
gloves|دستکش‌ها
iv stand|پایهٔ سرم
dental|مربوط به دندان‌پزشکی
dentist|دندان‌پزشک
dental chair|صندلی دندان‌پزشکی
dental bib|پیش‌بند دندان‌پزشکی
bib|پیش‌بند
mask|ماسک
magnifying|بزرگ‌نمایی‌کننده
eyewear|عینک یا وسایل پوشیدنی روی چشم
instrument|ابزار
handpiece|ابزار دستی دندان‌پزشکی
handpieces|ابزارهای دستی دندان‌پزشکی
hoses|شلنگ‌ها
panoramic|نمای وسیع و یکپارچه
freckles|کک‌ومک
reddish|مایل به قرمز
headrest|تکیه‌گاه سر
diagnosis|تشخیص بیماری
prescription|نسخهٔ دارو یا درمان
dosage|مقدار مصرف دارو
barbell|هالتر
bench press|پرس سینه
weight plates|صفحه‌های وزنه
treadmill|تردمیل
dumbbells|دمبل‌ها
leggings|لگ ورزشی
yoga mat|زیرانداز یوگا
balance|تعادل
pose|حالت بدن
palms|کف دست‌ها
measuring tape|متر نواری
clipboard|تختهٔ گیره‌دار
broccoli|کلم بروکلی
lettuce|کاهو
bell pepper|فلفل دلمه‌ای
kiwi|کیوی
nutrition|تغذیه
syringe|سرنگ
barrel|بدنهٔ لوله‌ای
chin|چانه
forehead|پیشانی
eyepieces|چشمی‌های دستگاه
chin rest|تکیه‌گاه چانه
forehead support|تکیه‌گاه پیشانی
resistance band|کش مقاومتی
scrub top|بالاپوش اسکراب
bed rail|نردهٔ کنار تخت
examination table|تخت معاینه
stethoscope|گوشی پزشکی
chestpiece|قطعهٔ روی سینهٔ گوشی پزشکی
monitor|نمایشگر
traces|خط‌های نمایشگر
wristwatch|ساعت مچی
blinds|پردهٔ کرکره‌ای
clipboard|تختهٔ گیره‌دار
sleeve|آستین
upper arm|بخش بالایی بازو
ponytail|دم‌اسبی
anatomical|کالبدشناختی
injection|تزریق
cardigan|ژاکت بافتنی جلو باز
lapel|برگردان یقه
knitted|بافتنی
cuff|سرآستین؛ بازوبند (بسته به کاربرد)
ribbed|کش‌بافت
lampshade|کلاهک چراغ
binders|زونکن‌ها
notebook|دفتر
binding|صحافی
armchair|صندلی راحتی دسته‌دار
tissue box|جعبهٔ دستمال کاغذی
tissue|دستمال کاغذی
blazer|کت تک
rectangular|مستطیلی
dental chair|صندلی دندان‌پزشکی
bib|پیش‌بند
headrest|تکیه‌گاه سر
rinse|آبکشی
reclining|تکیه‌داده به عقب
padded|دارای لایهٔ نرم
imperative|فعل امر
raised|بالاآمده
lower leg|بخش پایین پا
footwear|پوشیدنیِ پا
sole|کفی
laces|بندهای کفش
paws|پنجه‌ها
paw|پنجه
fur|مو یا پوشش بدن حیوان
muzzle|پوزه
hindquarters|بخش عقب بدن حیوان
floppy|آویزان و نرم
veterinary|مربوط به دامپزشکی
carton|جعبهٔ مقوایی کوچک
flap|زبانهٔ باز و بسته شدنِ جعبه
shoulder strap|بند شانه‌ای
blood-pressure cuff|بازوبند فشارسنج
tubing|لولهٔ انعطاف‌پذیر
eyepiece|چشمیِ دستگاه
chin rest|تکیه‌گاه چانه
forehead band|بند مقابل پیشانی
forearm|ساعد
inner elbow|قسمت داخلی آرنج
gloved|دستکش‌پوش
tourniquet|بند فشاری
holder|نگهدارنده
collection|جمع‌آوری؛ نمونه‌گیری
floral|گل‌دار
rim|لبهٔ پیرامونی
casing|بدنهٔ پوشانندهٔ دستگاه
aligned|هم‌راستا
sequencing|مرتب‌کردن توضیح‌ها به‌ترتیب
passive|ساختار مجهول
foreground|پیش‌زمینه؛ بخش نزدیک تصویر
on-screen|داخل صفحهٔ نمایش
soft-focus|با فوکوس نرم؛ محو
trackpad|صفحهٔ لمسیِ کنترل نشانگر
ruffled|چین‌دار
earcup|بخش گوشیِ هدفون
headband|بند بالای سر
booth|اتاقک
perforated|سوراخ‌دار
console|پنل یا دستگاه کنترل
threshold|آستانه
wind-down|آرام‌شدن در پایان روز
fingertip|نوک انگشت
cropped|بریده‌شده در کادر
fastening|بستن؛ محکم‌کردن
stretcher|برانکارد
strap buckle|سگکِ بند
side rail|میلهٔ کناری
cylinder|استوانه؛ سیلندر
grip|گرفتن محکم
diagonal|مورب
coordination|هماهنگی
`;
  const words=Object.create(null);
  for(const line of entries.trim().split('\n')){const [en,fa]=line.split('|');if(en&&fa)words[en]=fa;}
  root.SceneSpeakGlossaryFa=Object.freeze(words);
})(typeof window!=='undefined'?window:globalThis);
