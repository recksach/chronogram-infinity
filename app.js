function $(id){return document.getElementById(id)}
function showToast(m){var e=$("toast");e.innerText=m;e.classList.add("show");setTimeout(function(){e.classList.remove("show")},3000)}
function openLink(u){if(window.Telegram&&Telegram.WebApp)Telegram.WebApp.openLink(u);else window.open(u,"_blank")}
function t(k){return (TR[curLang]&&TR[curLang][k])||(TR.en[k])||k}

var BOT_USERNAME="masontokenbot/app";
var ADMIN_WALLET="UQAGpJWn-FJd3wjB-aiChuiYH-9tdXAOhqu887uBtS1Ce4_7";
var LIQ_TARGET=7000;

var TOKENS={
    mason:{
        symbol:"$MASON",contract:"EQDDKb3KIYcjA0FmGndThAO3thpkLoD4hHhQq7ToywPiMgLM",
        rate:6,taskReward:5,
        bgImg:"https://i.postimg.cc/7PgPq2Gk/photo-2026-07-08-11-05-36.jpg",
        logo:"https://i.postimg.cc/P5WdHpbh/file-000000007db8720a83a00abbd6e8e608.png",
        themeClass:"",
        socials:{twitter:"https://x.com/Worshipful_Mast",telegram:"https://t.me/MASON_TOKEN",website:"https://www.instagram.com/worshipful_mast?igsh=MXI1cDVtNmV3eXN4Mg=="}
    },
    ape:{
        symbol:"$APE",contract:"EQBjoywW-EZyePew5wwnwFtjWsW1OAySB-3Pt71huH20bzUD",
        rate:15674,taskReward:250,
        bgImg:"https://i.postimg.cc/0NfLcf9R/Chat-GPT-Image-14-lip-2026-r-14-10-23.png",
        logo:"https://i.postimg.cc/DzgZ49yy/Chat-GPT-Image-14-lip-2026-r-14-06-46.png",
        themeClass:"theme-ape",
        socials:{twitter:"https://x.com/Ambasador_APE",telegram:"https://t.me/Ambasador_APE",website:"https://www.instagram.com/worshipful_mast?igsh=MXI1cDVtNmV3eXN4Mg=="}
    }
};

var curToken="mason";
var curLang="en";
var tcInstance=null;
var walletConnected=false;
var walletAddress="";
var tgUser=null;
var isAdmin=false;

firebase.initializeApp({apiKey:"AIzaSyCu-Wx23P4OpxUbSBywpdiETZHbOe08z9c",authDomain:"refer-c9d1b.firebaseapp.com",projectId:"refer-c9d1b"});
var db=firebase.firestore();

var LANGS=["en","ru","uk","tr","ar","zh","hi"];
var TR={
en:{
    nav_home:"Home",nav_tasks:"Tasks",nav_refs:"Refs",nav_feed:"Feed",
    connect_wallet:"Connect Wallet",disconnect:"Disconnect",
    rate_label:"1 GRAM =",liq_label:"Liquidity Pool",liq_of:"of",
    buy_mason:"Buy $MASON",buy_ape:"Buy $APE",
    profile_balance:"GRAM Balance",profile_refs:"Referrals",profile_connected:"Connected",
    tasks_title:"Available Tasks",tasks_empty:"No tasks yet",
    task_claim:"Claim",task_done:"Done",task_subscribe:"Subscribe",task_repost:"Repost",task_link:"Link",task_income:"Income",
    refs_title:"Referral Program",refs_earned:"GRAM Earned",refs_count:"Referrals",refs_copy:"Copy",refs_share:"Share Link",
    feed_title:"News & Updates",feed_empty:"No news yet",
    admin_gram:"GRAM",admin_news:"News",admin_tasks:"Tasks",
    admin_create_task:"+ Create Task",admin_create_news:"+ Create News Post",
    admin_task_cost:"25 GRAM (FREE for admin)",admin_payments:"Recent Payments",admin_publish:"Publish to all users",
    buy_modal_sub:"Select amount in GRAM",buy_custom:"Custom amount (GRAM)",
    buy_preview:"You will receive:",buy_success:"Transaction sent!",
    toast_wallet:"Wallet connected!",toast_error:"Error",toast_copied:"Copied!",
    toast_task_done:"Task completed!",toast_ref_copied:"Referral link copied!",toast_buy_success:"Transaction sent to wallet!",
    toast_connect_first:"Connect wallet first",toast_create_task:"Task created!",toast_create_news:"News published!",
    create_task:"Create Task",create_news:"Create News Post",task_title_ph:"Task title",task_reward_ph:"Token reward",task_link_ph:"Link (URL)",
    news_title_ph:"Title",news_text_ph:"Text",news_image_ph:"Image URL (optional)",
    support:"Support",support_sub:"@Superadminist",
    read_more:"Read more",read_less:"Show less",
    info_mason_sub:"WHITEPAPER",info_mason_title:"The Stone Masons of DeFi",
    info_mason_preview:"Born from the ancient guilds of digital builders, $MASON represents the foundational layer of decentralized pre-market trading. Like the master masons who constructed cathedrals that have stood for centuries, the MASON protocol is built on principles of transparency, permanence, and community trust.",
    info_mason_full:"Born from the ancient guilds of digital builders, $MASON represents the foundational layer of decentralized pre-market trading. Like the master masons who constructed cathedrals that have stood for centuries, the MASON protocol is built on principles of transparency, permanence, and community trust.\n\nEvery transaction is a brick. Every holder is a mason. Together, we build the cathedral of decentralized finance on the TON blockchain. The project was conceived by a collective of digital architects who believed that the future of decentralized finance needed a solid, unshakeable foundation.\n\n$MASON is not just a token — it is a declaration of intent. In a world of fleeting promises and vaporware, we choose to build with stone. Our pre-market phase offers early participants the chance to acquire $MASON before public DEX listing, at rates that reward those who lay the first stones.",
    info_mason_h1v:"Community",info_mason_h1l:"Driven",info_mason_h2v:"TON",info_mason_h2l:"Blockchain",
    info_mason_h3v:"Pre-Market",info_mason_h3l:"Early Access",info_mason_h4v:"Transparent",info_mason_h4l:"Governance",
    info_ape_sub:"WHITEPAPER",info_ape_title:"The Jungle Ambassador's Protocol",
    info_ape_preview:"In the untamed wilderness of cryptocurrency, the strongest tribe survives. $APE — the Ambassador's Protocol for Education — is more than a token. It's a movement born from the idea that financial literacy is the ultimate weapon against centralization.",
    info_ape_full:"In the untamed wilderness of cryptocurrency, the strongest tribe survives. $APE — the Ambassador's Protocol for Education — is more than a token. It's a movement born from the idea that financial literacy is the ultimate weapon against centralization.\n\nEach holder becomes a node in a global network of education, empowerment, and economic freedom. The jungle is lawless, but the tribe has rules: transparency, community first, and relentless growth. APE connects ambassadors across borders, creating an educational network where knowledge is the ultimate currency.\n\nWith an extraordinarily high token supply, $APE is designed for micro-transactions and mass accessibility. No one is priced out of the tribe. Every participant, regardless of portfolio size, has a voice and a stake in the protocol's future. The Ambassador's Protocol isn't just about gains — it's about building a legacy that outlives any single market cycle.",
    info_ape_h1v:"Global",info_ape_h1l:"Network",info_ape_h2v:"Education",info_ape_h2l:"Focused",
    info_ape_h3v:"Micro",info_ape_h3l:"Transactions",info_ape_h4v:"Community",info_ape_h4l:"Governed"
},
ru:{
    nav_home:"Главная",nav_tasks:"Задания",nav_refs:"Рефералы",nav_feed:"Новости",
    connect_wallet:"Подключить кошелёк",disconnect:"Отключить",
    rate_label:"1 GRAM =",liq_label:"Пул ликвидности",liq_of:"из",
    buy_mason:"Купить $MASON",buy_ape:"Купить $APE",
    profile_balance:"Баланс GRAM",profile_refs:"Рефералы",profile_connected:"Подключён",
    tasks_title:"Доступные задания",tasks_empty:"Заданий пока нет",
    task_claim:"Получить",task_done:"Готово",task_subscribe:"Подписаться",task_repost:"Репост",task_link:"Ссылка",task_income:"Доход",
    refs_title:"Реферальная программа",refs_earned:"Заработано GRAM",refs_count:"Рефералы",refs_copy:"Копировать",refs_share:"Поделиться",
    feed_title:"Новости и обновления",feed_empty:"Новостей пока нет",
    admin_gram:"GRAM",admin_news:"Новости",admin_tasks:"Задания",
    admin_create_task:"+ Создать задание",admin_create_news:"+ Создать новость",
    admin_task_cost:"25 GRAM (бесплатно для админа)",admin_payments:"Последние оплаты",admin_publish:"Опубликовать для всех",
    buy_modal_sub:"Выберите сумму в GRAM",buy_custom:"Произвольная сумма (GRAM)",
    buy_preview:"Вы получите:",buy_success:"Транзакция отправлена!",
    toast_wallet:"Кошелёк подключён!",toast_error:"Ошибка",toast_copied:"Скопировано!",
    toast_task_done:"Задание выполнено!",toast_ref_copied:"Реферальная ссылка скопирована!",toast_buy_success:"Транзакция отправлена на кошелёк!",
    toast_connect_first:"Сначала подключите кошелёк",toast_create_task:"Задание создано!",toast_create_news:"Новость опубликована!",
    create_task:"Создать задание",create_news:"Создать новость",task_title_ph:"Название задания",task_reward_ph:"Награда в токенах",task_link_ph:"Ссылка (URL)",
    news_title_ph:"Заголовок",news_text_ph:"Текст",news_image_ph:"URL изображения (необязательно)",
    support:"Поддержка",support_sub:"@Superadminist",
    read_more:"Читать далее",read_less:"Свернуть",
    info_mason_sub:"ВАЙТПЕЙПЕР",info_mason_title:"Каменные Мастера DeFi",
    info_mason_preview:"Рождённые из древних гильдий цифровых строителей, $MASON представляет фундаментальный слой децентрализованной предрыночной торговли. Как каменщики, строившие соборы, простоявшие веками, протокол MASON построен на принципах прозрачности, постоянства и общественного доверия.",
    info_mason_full:"Рождённые из древних гильдий цифровых строителей, $MASON представляет фундаментальный слой децентрализованной предрыночной торговли. Как каменщики, строившие соборы, простоявшие веками, протокол MASON построен на принципах прозрачности, постоянства и общественного доверия.\n\nКаждая транзакция — это кирпич. Каждый держатель — каменщик. Вместе мы строим собор децентрализованных финансов на блокчейне TON. Проект был задуман коллективом цифровых архитекторов, которые верили, что будущее децентрализованных финансов нуждается в прочном, незыблемом фундаменте.\n\n$MASON — это не просто токен. Это декларация намерений. В мире мимолётных обещаний и вейрвейра мы выбираем строить из камня. Наш предрыночный этап даёт ранним участникам возможность приобрести $MASON до публичного листинга на DEX по курсам, которые вознаграждают тех, кто укладывает первые камни.",
    info_mason_h1v:"Сообщество",info_mason_h1l:"Драйв",info_mason_h2v:"TON",info_mason_h2l:"Блокчейн",
    info_mason_h3v:"Pre-Market",info_mason_h3l:"Ранний доступ",info_mason_h4v:"Прозрачное",info_mason_h4l:"Управление",
    info_ape_sub:"ВАЙТПЕЙПЕР",info_ape_title:"Протокол Амбассадоров Джунглей",
    info_ape_preview:"Дикие джунгли криптовалют — здесь выживает сильнейшее племя. $APE — Протокол Амбассадоров Образования — это больше, чем токен. Это движение, рождённое идеей, что финансовая грамотность — главное оружие против централизации.",
    info_ape_full:"Дикие джунгли криптовалют — здесь выживает сильнейшее племя. $APE — Протокол Амбассадоров Образования — это больше, чем токен. Это движение, рождённое идеей, что финансовая грамотность — главное оружие против централизации.\n\nКаждый держатель становится узлом глобальной сети образования, расширения возможностей и экономической свободы. Джунгли беззаконны, но племя имеет правила: прозрачность, приоритет сообщества и неутомимый рост.\n\n$APE соединяет амбассадоров через границы, создавая образовательную сеть, где знания — главная валюта. Благодаря огромному количеству токенов в обращении, $APE создан для микротранзакций и массовой доступности. Никто не остаётся за бортом племени.",
    info_ape_h1v:"Глобальная",info_ape_h1l:"Сеть",info_ape_h2v:"Образование",info_ape_h2l:"Фокус",
    info_ape_h3v:"Микро",info_ape_h3l:"Транзакции",info_ape_h4v:"Сообщество",info_ape_h4l:"Управление"
},
uk:{
    nav_home:"Головна",nav_tasks:"Завдання",nav_refs:"Реферали",nav_feed:"Новини",
    connect_wallet:"Підключити гаманець",disconnect:"Відключити",
    rate_label:"1 GRAM =",liq_label:"Пул ліквідності",liq_of:"з",
    buy_mason:"Купити $MASON",buy_ape:"Купити $APE",
    profile_balance:"Баланс GRAM",profile_refs:"Реферали",profile_connected:"Підключено",
    tasks_title:"Доступні завдання",tasks_empty:"Завдань поки немає",
    task_claim:"Отримати",task_done:"Готово",task_subscribe:"Підписатися",task_repost:"Репост",task_link:"Посилання",task_income:"Дохід",
    refs_title:"Реферальна програма",refs_earned:"Зароблено GRAM",refs_count:"Реферали",refs_copy:"Копіювати",refs_share:"Поділитися",
    feed_title:"Новини та оновлення",feed_empty:"Новин поки немає",
    admin_gram:"GRAM",admin_news:"Новини",admin_tasks:"Завдання",
    admin_create_task:"+ Створити завдання",admin_create_news:"+ Створити новину",
    admin_task_cost:"25 GRAM (безкоштовно для адміна)",admin_payments:"Останні оплати",admin_publish:"Опублікувати для всіх",
    buy_modal_sub:"Оберіть суму в GRAM",buy_custom:"Довільна сума (GRAM)",
    buy_preview:"Ви отримаєте:",buy_success:"Транзакцію відправлено!",
    toast_wallet:"Гаманець підключено!",toast_error:"Помилка",toast_copied:"Скопійовано!",
    toast_task_done:"Завдання виконано!",toast_ref_copied:"Реферальне посилання скопійовано!",toast_buy_success:"Транзакцію відправлено на гаманець!",
    toast_connect_first:"Спочатку підключіть гаманець",toast_create_task:"Завдання створено!",toast_create_news:"Новину опубліковано!",
    create_task:"Створити завдання",create_news:"Створити новину",task_title_ph:"Назва завдання",task_reward_ph:"Винагорода в токенах",task_link_ph:"Посилання (URL)",
    news_title_ph:"Заголовок",news_text_ph:"Текст",news_image_ph:"URL зображення (необов'язково)",
    support:"Підтримка",support_sub:"@Superadminist",
    read_more:"Читати далі",read_less:"Згорнути",
    info_mason_sub:"ВАЙТПЕЙПЕР",info_mason_title:"Кам'яні Майстри DeFi",
    info_mason_preview:"Народжені з давніх гільдій цифрових будівельників, $MASON представляє фундаментальний шар децентралізованої передринкової торгівлі.",
    info_mason_full:"Народжені з давніх гільдій цифрових будівельників, $MASON представляє фундаментальний шар децентралізованої передринкової торгівлі. Як каменярі, що будували собори, що простояли століттями, протокол MASON побудований на принципах прозорості, постійності та суспільної довіри.\n\nКожна транзакція — це цеглина. Кожен власник — каменяр. Разом ми будуємо собор децентралізованих фінансів на блокчейні TON.",
    info_mason_h1v:"Спільнота",info_mason_h1l:"Драйв",info_mason_h2v:"TON",info_mason_h2l:"Блокчейн",
    info_mason_h3v:"Pre-Market",info_mason_h3l:"Ранній доступ",info_mason_h4v:"Прозоре",info_mason_h4l:"Управління",
    info_ape_sub:"ВАЙТПЕЙПЕР",info_ape_title:"Протокол Амбасадорів Джунглів",
    info_ape_preview:"Дикі джунглі криптовалют — тут виживає найсильніше плем'я. $APE — Протокол Амбасадорів Освіти — це більше, ніж токен.",
    info_ape_full:"Дикі джунглі криптовалют — тут виживає найсильніше плем'я. $APE — Протокол Амбасадорів Освіти — це більше, ніж токен. Це рух, народжений ідеєю, що фінансова грамотність — головна зброя проти централізації.\n\nКожен власник стає вузлом глобальної мережі освіти, розширення можливостей та економічної свободи.",
    info_ape_h1v:"Глобальна",info_ape_h1l:"Мережа",info_ape_h2v:"Освіта",info_ape_h2l:"Фокус",
    info_ape_h3v:"Мікро",info_ape_h3l:"Транзакції",info_ape_h4v:"Спільнота",info_ape_h4l:"Управління"
},
tr:{
    nav_home:"Ana Sayfa",nav_tasks:"Gorevler",nav_refs:"Referanslar",nav_feed:"Haberler",
    connect_wallet:"Cuzdan Bagla",disconnect:"Baglantiyi Kes",
    rate_label:"1 GRAM =",liq_label:"Likidite Havuzu",liq_of:"/",
    buy_mason:"$MASON Satin Al",buy_ape:"$APE Satin Al",
    profile_balance:"GRAN Bakiyesi",profile_refs:"Referanslar",profile_connected:"Bagli",
    tasks_title:"Mevcut Gorevler",tasks_empty:"Henuz gorev yok",
    task_claim:"Talep Et",task_done:"Tamamlandi",task_subscribe:"Abone Ol",task_repost:"Paylas",task_link:"Baglanti",task_income:"Gelir",
    refs_title:"Referans Programi",refs_earned:"Kazanilan GRAM",refs_count:"Referanslar",refs_copy:"Kopyala",refs_share:"Paylas",
    feed_title:"Haberler ve Guncellemeler",feed_empty:"Henuz haber yok",
    admin_gram:"GRAM",admin_news:"Haberler",admin_tasks:"Gorevler",
    admin_create_task:"+ Gorev Olustur",admin_create_news:"+ Haber Olustur",
    admin_task_cost:"25 GRAM (admin icin ucretsiz)",admin_payments:"Son Odemeler",admin_publish:"Tumune Yayinla",
    buy_modal_sub:"GRAN miktari secin",buy_custom:"Miktar girin (GRAM)",
    buy_preview:"Alacaginiz:",buy_success:"Islem gonderildi!",
    toast_wallet:"Cuzdan baglandi!",toast_error:"Hata",toast_copied:"Kopyalandi!",
    toast_task_done:"Gorev tamamlandi!",toast_ref_copied:"Referans baglantisi kopyalandi!",toast_buy_success:"Islem cuzdana gonderildi!",
    toast_connect_first:"Once cuzdani baglayin",toast_create_task:"Gorev olusturuldu!",toast_create_news:"Haber yayinlandi!",
    create_task:"Gorev Olustur",create_news:"Haber Olustur",task_title_ph:"Gorev basligi",task_reward_ph:"Token odulu",task_link_ph:"Baglanti (URL)",
    news_title_ph:"Baslik",news_text_ph:"Metin",news_image_ph:"Gorsel URL (opsiyonel)",
    support:"Destek",support_sub:"@Superadminist",
    read_more:"Daha fazla oku",read_less:"Daha az",
    info_mason_sub:"BEYAZ KAGIT",info_ape_sub:"BEYAZ KAGIT"
},
ar:{
    nav_home:"الرئيسية",nav_tasks:"المهام",nav_refs:"الإحالات",nav_feed:"الأخبار",
    connect_wallet:"ربط المحفظة",disconnect:"قطع الاتصال",
    rate_label:"1 GRAM =",liq_label:"تجمع السيولة",liq_of:"من",
    buy_mason:"شراء $MASON",buy_ape:"شراء $APE",
    profile_balance:"رصيد GRAM",profile_refs:"الإحالات",profile_connected:"متصل",
    tasks_title:"المهام المتاحة",tasks_empty:"لا توجد مهام بعد",
    task_claim:"المطالبة",task_done:"مكتمل",task_subscribe:"اشتراك",task_repost:"مشاركة",task_link:"رابط",task_income:"الدخل",
    refs_title:"برنامج الإحالة",refs_earned:"GRAM المكتسبة",refs_count:"الإحالات",refs_copy:"نسخ",refs_share:"مشاركة",
    feed_title:"الأخبار والتحديثات",feed_empty:"لا توجد أخبار بعد",
    admin_gram:"GRAM",admin_news:"أخبار",admin_tasks:"مهام",
    admin_create_task:"+ إنشاء مهمة",admin_create_news:"+ إنشاء خبر",
    admin_task_cost:"25 GRAM (مجاني للمشرف)",admin_payments:"المدفوعات الأخيرة",admin_publish:"نشر للجميع",
    buy_modal_sub:"اختر المبلغ بالـ GRAM",buy_custom:"مبلغ مخصص (GRAM)",
    buy_preview:"ستحصل على:",buy_success:"تم إرسال المعاملة!",
    toast_wallet:"تم ربط المحفظة!",toast_error:"خطأ",toast_copied:"تم النسخ!",
    toast_task_done:"تم إكمال المهمة!",toast_ref_copied:"تم نسخ رابط الإحالة!",toast_buy_success:"تم إرسال المعاملة!",
    toast_connect_first:"اربط المحفظة أولاً",toast_create_task:"تم إنشاء المهمة!",toast_create_news:"تم نشر الخبر!",
    create_task:"إنشاء مهمة",create_news:"إنشاء خبر",task_title_ph:"عنوان المهمة",task_reward_ph:"مكافأة التوكن",task_link_ph:"الرابط",
    news_title_ph:"العنوان",news_text_ph:"النص",news_image_ph:"رابط الصورة (اختياري)",
    support:"الدعم",support_sub:"@Superadminist",
    read_more:"اقرأ المزيد",read_less:"عرض أقل"
},
zh:{
    nav_home:"首页",nav_tasks:"任务",nav_refs:"推荐",nav_feed:"动态",
    connect_wallet:"连接钱包",disconnect:"断开连接",
    rate_label:"1 GRAM =",liq_label:"流动性池",liq_of:"/",
    buy_mason:"购买 $MASON",buy_ape:"购买 $APE",
    profile_balance:"GRAM 余额",profile_refs:"推荐人数",profile_connected:"已连接",
    tasks_title:"可用任务",tasks_empty:"暂无任务",
    task_claim:"领取",task_done:"完成",task_subscribe:"订阅",task_repost:"转发",task_link:"链接",task_income:"收入",
    refs_title:"推荐计划",refs_earned:"已赚取 GRAM",refs_count:"推荐人数",refs_copy:"复制",refs_share:"分享链接",
    feed_title:"新闻与更新",feed_empty:"暂无新闻",
    admin_gram:"GRAM",admin_news:"新闻",admin_tasks:"任务",
    admin_create_task:"+ 创建任务",admin_create_news:"+ 创建新闻",
    admin_task_cost:"25 GRAM (管理员免费)",admin_payments:"最近支付",admin_publish:"发布给所有人",
    buy_modal_sub:"选择 GRAM 金额",buy_custom:"自定义金额 (GRAM)",
    buy_preview:"您将获得:",buy_success:"交易已发送!",
    toast_wallet:"钱包已连接!",toast_error:"错误",toast_copied:"已复制!",
    toast_task_done:"任务已完成!",toast_ref_copied:"推荐链接已复制!",toast_buy_success:"交易已发送!",
    toast_connect_first:"请先连接钱包",toast_create_task:"任务已创建!",toast_create_news:"新闻已发布!",
    create_task:"创建任务",create_news:"创建新闻",task_title_ph:"任务标题",task_reward_ph:"代币奖励",task_link_ph:"链接",
    news_title_ph:"标题",news_text_ph:"内容",news_image_ph:"图片链接 (可选)",
    support:"客服支持",support_sub:"@Superadminist",
    read_more:"阅读更多",read_less:"收起"
},
hi:{
    nav_home:"होम",nav_tasks:"कार्य",nav_refs:"रेफरल",nav_feed:"फ़ीड",
    connect_wallet:"वॉलेट कनेक्ट करें",disconnect:"डिस्कनेक्ट",
    rate_label:"1 GRAM =",liq_label:"लिक्विडिटी पूल",liq_of:"/",
    buy_mason:"$MASON खरीदें",buy_ape:"$APE खरीदें",
    profile_balance:"GRAN बैलेंस",profile_refs:"रेफरल",profile_connected:"कनेक्टेड",
    tasks_title:"उपलब्ध कार्य",tasks_empty:"अभी कोई कार्य नहीं",
    task_claim:"दावा करें",task_done:"पूर्ण",task_subscribe:"सदस्यता",task_repost:"शेयर",task_link:"लिंक",task_income:"आय",
    refs_title:"रेफरल कार्यक्रम",refs_earned:"कमाया GRAM",refs_count:"रेफरल",refs_copy:"कॉपी",refs_share:"शेयर लिंक",
    feed_title:"समाचार और अपडेट",feed_empty:"अभी कोई समाचार नहीं",
    admin_gram:"GRAM",admin_news:"समाचार",admin_tasks:"कार्य",
    admin_create_task:"+ कार्य बनाएं",admin_create_news:"+ समाचार बनाएं",
    admin_task_cost:"25 GRAM (एडमिन के लिए मुफ्त)",admin_payments:"हाल का भुगतान",admin_publish:"सभी को प्रकाशित करें",
    buy_modal_sub:"GRAM राशि चुनें",buy_custom:"कस्टम राशि (GRAM)",
    buy_preview:"आपको मिलेगा:",buy_success:"लेनदेन भेजा गया!",
    toast_wallet:"वॉलेट कनेक्ट हो गया!",toast_error:"त्रुटि",toast_copied:"कॉपी हो गया!",
    toast_task_done:"कार्य पूर्ण!",toast_ref_copied:"रेफरल लिंक कॉपी!",toast_buy_success:"लेनदेन भेजा गया!",
    toast_connect_first:"पहले वॉलेट कनेक्ट करें",toast_create_task:"कार्य बनाया!",toast_create_news:"समाचार प्रकाशित!",
    create_task:"कार्य बनाएं",create_news:"समाचार बनाएं",task_title_ph:"कार्य शीर्षक",task_reward_ph:"टोकन पुरस्कार",task_link_ph:"लिंक",
    news_title_ph:"शीर्षक",news_text_ph:"पाठ",news_image_ph:"चित्र URL (वैकल्पिक)",
    support:"सपोर्ट",support_sub:"@Superadminist",
    read_more:"और पढ़ें",read_less:"कम दिखाएं"
}
};

var LANG_NAMES={en:"EN",ru:"RU",uk:"UA",tr:"TR",ar:"AR",zh:"ZH",hi:"HI"};

function renderLangSwitcher(){
    var h="";
    LANGS.forEach(function(l){
        h+='<button class="lang-btn'+(l===curLang?" active":"")+'" onclick="switchLang(\''+l+'\')">'+LANG_NAMES[l]+'</button>';
    });
    $("langSwitcher").innerHTML=h;
}

function switchLang(l){
    curLang=l;
    renderLangSwitcher();
    updateAllTranslations();
}

function updateAllTranslations(){
    $("navHomeLbl").textContent=t("nav_home");
    $("navTasksLbl").textContent=t("nav_tasks");
    $("navRefsLbl").textContent=t("nav_refs");
    $("navFeedLbl").textContent=t("feed_title");
    $("tcBtnText").textContent=walletConnected?(walletAddress.slice(0,6)+"..."+walletAddress.slice(-4)):t("connect_wallet");
    $("buyBtnText").textContent=curToken==="mason"?t("buy_mason"):t("buy_ape");
    $("rateLabel").textContent=t("rate_label");
    $("liqLabel").textContent=t("liq_label");
    $("pfBalanceLbl").textContent=t("profile_balance");
    $("pfRefsLbl").textContent=t("profile_refs");
    $("pfStatus").textContent=t("profile_connected");
    $("pfDisconnectBtn").textContent=t("disconnect");
    $("tasksTitle").textContent=t("tasks_title");
    $("refsTitle").textContent=t("refs_title");
    $("refsCountLbl").textContent=t("refs_count");
    $("refEarnedLbl").textContent=t("refs_earned");
    $("refCopyBtn").textContent=t("refs_copy");
    $("refShareBtn").textContent=t("refs_share");
    $("feedTitle").textContent=t("feed_title");
    $("adminBalanceLbl").textContent=t("admin_gram");
    $("adminNewsLbl").textContent=t("admin_news");
    $("adminTaskLbl").textContent=t("admin_tasks");
    $("adminCreateTaskLbl").textContent=t("admin_create_task");
    $("adminCreateTaskCost").textContent=t("admin_task_cost");
    $("adminCreateNewsLbl").textContent=t("admin_create_news");
    $("adminPublishLbl").textContent=t("admin_publish");
    $("adminPaymentsLbl").textContent=t("admin_payments");
    $("supportName").textContent=t("support");
    $("supportSub").textContent=t("support_sub");
    $("buyModalTitle").textContent=curToken==="mason"?"Buy $MASON":"Buy $APE";
    $("buyModalSub").textContent=t("buy_modal_sub");
    $("buyAmountInput").placeholder=t("buy_custom");
    $("createTaskTitle").textContent=t("create_task");
    $("createTaskCost").textContent=t("admin_task_cost");
    $("createNewsTitle").textContent=t("create_news");
    $("taskTitleInput").placeholder=t("task_title_ph");
    $("taskRewardInput").placeholder=t("task_reward_ph");
    $("taskLinkInput").placeholder=t("task_link_ph");
    $("newsTitleInput").placeholder=t("news_title_ph");
    $("newsTextInput").placeholder=t("news_text_ph");
    $("newsImageInput").placeholder=t("news_image_ph");
    $("infoSubtitle").textContent=t("info_"+curToken+"_sub");
    $("infoTitle").textContent=t("info_"+curToken+"_title");
    $("infoPreview").textContent=t("info_"+curToken+"_preview");
    $("infoFull").textContent=t("info_"+curToken+"_full");
    $("infoToggle").textContent=t("read_more");
    var hl=$("infoHighlights");
    hl.innerHTML="";
    for(var i=1;i<=4;i++){
        hl.innerHTML+='<div class="info-highlight"><div class="ih-val">'+t("info_"+curToken+"_h"+i+"v")+'</div><div class="ih-lbl">'+t("info_"+curToken+"_h"+i+"l")+'</div></div>';
    }
    renderTasks();
    renderFeed();
}

function toggleToken(){
    var newToken=curToken==="mason"?"ape":"mason";
    var el=$("tokenContent");
    el.classList.add("switching");
    setTimeout(function(){
        curToken=newToken;
        document.body.className=TOKENS[curToken].themeClass;
        $("bgImage").style.opacity="0";
        setTimeout(function(){
            $("bgImage").style.backgroundImage="url("+TOKENS[curToken].bgImg+")";
            $("bgImage").style.opacity="0.4";
        },200);
        $("masonLabel").classList.toggle("active",curToken==="mason");
        $("apeLabel").classList.toggle("active",curToken==="ape");
        $("ttTrack").classList.toggle("ape",curToken==="ape");
        $("heroImg").src=curToken==="mason"?TOKENS.mason.logo:TOKENS.ape.logo;
        $("heroTitle").textContent=curToken==="mason"?"$MASON":"$APE";
        $("heroSub").textContent=curToken==="mason"?"Pre-Market Trading":"Pre-Market Trading";
        $("rateValue").textContent="1 GRAM = "+TOKENS[curToken].rate+" "+TOKENS[curToken].symbol;
        updateSocialLinks();
        updateBuyPresets();
        updateAllTranslations();
        el.classList.remove("switching");
    },350);
}

function updateSocialLinks(){
    var s=TOKENS[curToken].socials;
    $("socialLinks").innerHTML=
        '<a class="social-btn" href="'+s.twitter+'" target="_blank"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>Twitter</a>'+
        '<a class="social-btn" href="'+s.telegram+'" target="_blank"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>Telegram</a>'+
        '<a class="social-btn" href="'+s.website+'" target="_blank"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>Website</a>';
}

function updateBuyPresets(){
    var p=[1,5,10,25,50,100];
    var h="";
    p.forEach(function(v){h+='<button class="preset-btn" onclick="setBuyAmount('+v+')">'+v+' GRAM</button>'});
    $("buyPresets").innerHTML=h;
}

function setBuyAmount(v){$("buyAmountInput").value=v;updateBuyPreview()}

function updateBuyPreview(){
    var amt=parseFloat($("buyAmountInput").value)||0;
    var tokens=amt*TOKENS[curToken].rate;
    $("buyPreview").textContent=t("buy_preview")+" "+tokens.toFixed(curToken==="ape"?0:2)+" "+TOKENS[curToken].symbol;
}

function showSendModal(){
    if(!walletConnected){showToast(t("toast_connect_first"));return}
    $("buyAmountInput").value="";
    $("buyPreview").textContent=t("buy_preview")+" 0 "+TOKENS[curToken].symbol;
    $("sendModal").classList.add("show");
}
function closeSendModal(){$("sendModal").classList.remove("show")}

async function confirmBuy(){
    var amt=parseFloat($("buyAmountInput").value);
    if(!amt||amt<=0){showToast(t("toast_error"));return}
    if(!tcInstance){showToast(t("toast_error"));return}
    try{
        await tcInstance.sendTransaction({
            validUntil:Math.floor(Date.now()/1000)+360,
            messages:[{address:ADMIN_WALLET,amount:(amt*1e9).toString()}]
        });
        showToast(t("toast_buy_success"));
        closeSendModal();
    }catch(e){
        console.error("Buy error:",e);
        showToast(t("toast_error")+": "+e.message);
    }
}

function toggleInfo(){
    $("infoCard").classList.toggle("expanded");
    $("infoToggle").textContent=$("infoCard").classList.contains("expanded")?t("read_less"):t("read_more");
}

function switchTab(tab){
    document.querySelectorAll(".tab-content").forEach(function(el){el.classList.remove("active")});
    document.querySelectorAll(".nav-item").forEach(function(el){el.classList.remove("active")});
    var tabMap={home:"tabHome",tasks:"tabTasks",refs:"tabRefs",feed:"tabFeed"};
    var navMap={home:"navHome",tasks:"navTasks",refs:"navRefs",feed:"navFeed"};
    if(tabMap[tab])$(tabMap[tab]).classList.add("active");
    if(navMap[tab])$(navMap[tab]).classList.add("active");
    if(tab==="refs")updateRefStats();
}

window.connectWallet=function(){
    if(walletConnected){$("profileSection").classList.toggle("show");return}
    if(window.Telegram&&Telegram.WebApp)Telegram.WebApp.HapticFeedback.impactOccurred("light");
    if(!window.TonConnectUI){showToast("TonConnect not loaded. Please refresh.");return}
    if(!tcInstance){showToast("Wallet not initialized. Please refresh.");return}
    tcInstance.openModal().catch(function(e){console.log("Wallet modal error:",e);showToast(t("toast_error")+": "+e.message)});
};

function disconnectWallet(){
    if(tcInstance)tcInstance.disconnect();
    walletConnected=false;walletAddress="";isAdmin=false;
    $("tcBtnText").textContent=t("connect_wallet");
    $("profileSection").classList.remove("show");
    $("adminSection").classList.remove("show");
}

function checkAdminWallet(){
    isAdmin=walletAddress.replace(/[^a-zA-Z0-9]/g,"")===ADMIN_WALLET.replace(/[^a-zA-Z0-9]/g,"");
    if(isAdmin){$("adminSection").classList.add("show");updateAdminStats()}
    else{$("adminSection").classList.remove("show")}
}

function updateAdminStats(){
    db.collection("news").get().then(function(s){$("adminNewsCount").textContent=s.size});
    db.collection("tasks").get().then(function(s){$("adminTaskCount").textContent=s.size});
}

function showCreateTaskModal(){$("createTaskModal").classList.add("show")}
function closeCreateTaskModal(){$("createTaskModal").classList.remove("show")}

async function createTask(){
    var title=$("taskTitleInput").value.trim();
    var reward=parseInt($("taskRewardInput").value)||0;
    var link=$("taskLinkInput").value.trim();
    if(!title){showToast(t("toast_error"));return}
    try{
        await db.collection("tasks").add({
            title:title,reward:reward,link:link,token:curToken,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        showToast(t("toast_create_task"));
        closeCreateTaskModal();
        $("taskTitleInput").value="";$("taskRewardInput").value="";$("taskLinkInput").value="";
        fetchTasks();updateAdminStats();
    }catch(e){showToast(t("toast_error"))}
}

function showCreateNewsModal(){$("createNewsModal").classList.add("show")}
function closeCreateNewsModal(){$("createNewsModal").classList.remove("show")}

async function createNews(){
    var title=$("newsTitleInput").value.trim();
    var text=$("newsTextInput").value.trim();
    var image=$("newsImageInput").value.trim();
    if(!title){showToast(t("toast_error"));return}
    try{
        await db.collection("news").add({
            title:title,text:text,image:image,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        showToast(t("toast_create_news"));
        closeCreateNewsModal();
        $("newsTitleInput").value="";$("newsTextInput").value="";$("newsImageInput").value="";
        fetchNews();updateAdminStats();
    }catch(e){showToast(t("toast_error"))}
}

var tasksData=[];
function fetchTasks(){
    db.collection("tasks").orderBy("timestamp","desc").get().then(function(s){
        tasksData=[];
        s.forEach(function(d){tasksData.push({id:d.id,...d.data()})});
        renderTasks();
    }).catch(function(e){console.log("Fetch tasks error:",e)});
}

function renderTasks(){
    var el=$("taskList");
    if(!tasksData.length){el.innerHTML='<div style="text-align:center;padding:20px;color:rgba(255,255,255,0.3)">'+t("tasks_empty")+'</div>';return}
    var h="";
    tasksData.forEach(function(task){
        var typeIcons={subscribe:t("task_subscribe"),repost:t("task_repost"),link:t("task_link"),income:t("task_income")};
        h+='<div class="task-item">';
        h+='<div class="task-icon">'+(task.type?t(task.type).charAt(0):"T")+'</div>';
        h+='<div class="task-info"><div class="task-title">'+task.title+'</div><div class="task-reward">'+task.reward+" "+TOKENS[task.token||curToken].symbol+'</div></div>';
        h+='<button class="task-btn" onclick="completeTask(\''+task.id+'\')">'+t("task_claim")+'</button>';
        if(isAdmin)h+='<button class="task-del" onclick="deleteTask(\''+task.id+'\')">&#10005;</button>';
        h+='</div>';
    });
    el.innerHTML=h;
}

async function completeTask(id){
    if(!walletConnected){showToast(t("toast_connect_first"));return}
    try{
        await db.collection("activity").add({
            userId:tgUser?tgUser.id.toString():"unknown",
            taskId:id,token:curToken,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        showToast(t("toast_task_done"));
    }catch(e){showToast(t("toast_error"))}
}

async function deleteTask(id){
    try{await db.collection("tasks").doc(id).delete();fetchTasks();updateAdminStats()}catch(e){}
}

var newsData=[];
function fetchNews(){
    db.collection("news").orderBy("timestamp","desc").get().then(function(s){
        newsData=[];
        s.forEach(function(d){newsData.push({id:d.id,...d.data()})});
        renderFeed();
    }).catch(function(e){console.log("Fetch news error:",e)});
}

function renderFeed(){
    var el=$("feedList");
    if(!newsData.length){el.innerHTML='<div style="text-align:center;padding:20px;color:rgba(255,255,255,0.3)">'+t("feed_empty")+'</div>';return}
    var h="";
    newsData.forEach(function(n){
        h+='<div class="news-card">';
        if(n.image)h+='<img src="'+n.image+'" alt="">';
        h+='<div class="nc-body">';
        if(isAdmin)h+='<button class="nc-del" onclick="deleteNews(\''+n.id+'\')">Delete</button>';
        h+='<div class="nc-title">'+n.title+'</div>';
        if(n.text)h+='<div class="nc-text">'+n.text+'</div>';
        h+='<div class="nc-time">'+(n.timestamp?new Date(n.timestamp.seconds*1000).toLocaleDateString():"")+'</div>';
        h+='</div></div>';
    });
    el.innerHTML=h;
}

async function deleteNews(id){
    try{await db.collection("news").doc(id).delete();fetchNews();updateAdminStats()}catch(e){}
}

function updateRefStats(){
    if(!tgUser)return;
    $("refLinkInput").value="https://t.me/"+BOT_USERNAME+"?start="+tgUser.id;
    db.collection("users").doc(tgUser.id.toString()).get().then(function(d){
        if(d.exists){
            var data=d.data();
            $("refCount").textContent=data.refCount||0;
            $("refEarned").textContent=data.refEarned||0;
            $("pfBalance").textContent=data.balance||0;
            $("pfRefs").textContent=data.refCount||0;
        }
    }).catch(function(){});
}

function copyRefLink(){
    var inp=$("refLinkInput");
    if(navigator.clipboard)navigator.clipboard.writeText(inp.value);
    else{inp.select();document.execCommand("copy")}
    showToast(t("toast_ref_copied"));
}

function shareRefLink(){
    var url=$("refLinkInput").value;
    if(window.Telegram&&Telegram.WebApp&&Telegram.WebApp.switchInlineQuery)
        Telegram.WebApp.switchInlineQuery(url,["users","groups","channels"]);
    else openLink(url);
}

async function fetchCollectedGram(){
    try{
        var resp=await fetch("https://tonapi.io/v2/accounts/"+ADMIN_WALLET);
        if(!resp.ok)return;
        var data=await resp.json();
        var bal=data.balance?data.balance/1e9:0;
        $("liqFill").style.width=Math.min((bal/LIQ_TARGET)*100,100)+"%";
        $("liqProgress").textContent=Math.floor(bal).toLocaleString()+" / "+LIQ_TARGET.toLocaleString()+" GRAM";
        if(isAdmin)$("adminBalance").textContent=Math.floor(bal).toLocaleString();
    }catch(e){}
}

function loadAdminPayments(){
    if(!isAdmin)return;
    db.collection("activity").orderBy("timestamp","desc").limit(20).get().then(function(s){
        var h="";
        s.forEach(function(d){
            var data=d.data();
            var uid=data.userId||"unknown";
            h+='<div class="payment-item"><span class="pi-addr">'+uid.slice(0,10)+'...</span><span class="pi-amount">'+(data.amount||"")+' GRAM</span></div>';
        });
        if(!h)h='<div style="text-align:center;padding:10px;color:rgba(255,255,255,0.3);font-size:12px">No payments yet</div>';
        $("adminPaymentsList").innerHTML=h;
    }).catch(function(){});
}

function waitForTonConnect(){
    return new Promise(function(resolve){
        if(window.TonConnectUI){resolve();return}
        var attempts=0;
        var iv=setInterval(function(){
            attempts++;
            if(window.TonConnectUI){clearInterval(iv);resolve()}
            else if(attempts>50){clearInterval(iv);resolve()}
        },100);
    });
}

window.addEventListener("load",async function(){
    setTimeout(function(){
        $("preloader").classList.add("hide");
        $("bgImage").style.backgroundImage="url("+TOKENS[curToken].bgImg+")";
        $("bgImage").style.opacity="0.4";
    },1500);
    try{
        if(window.Telegram&&Telegram.WebApp){
            Telegram.WebApp.ready();
            Telegram.WebApp.expand();
            tgUser=Telegram.WebApp.initDataUnsafe?Telegram.WebApp.initDataUnsafe.user:null;
        }
        await waitForTonConnect();
        if(window.TonConnectUI){
            try{
                tcInstance=new TonConnectUI({manifestUrl:"https://recksach.github.io/chronogram-infinity/tonconnect-manifest.json"});
                tcInstance.onStatusChange(function(wallet){
                    if(wallet){
                        walletConnected=true;
                        walletAddress=wallet.account?wallet.account.address:"";
                        $("tcBtnText").textContent=walletAddress.slice(0,6)+"..."+walletAddress.slice(-4);
                        if(tgUser){$("pfName").textContent=tgUser.first_name+" "+(tgUser.last_name||"");$("pfId").textContent="@"+(tgUser.username||"unknown");if(tgUser.photo_url)$("pfAvatar").src=tgUser.photo_url}
                        $("profileSection").classList.add("show");
                        checkAdminWallet();
                        fetchCollectedGram();
                        updateRefStats();
                        if(isAdmin)loadAdminPayments();
                    }else{
                        walletConnected=false;walletAddress="";isAdmin=false;
                        $("tcBtnText").textContent=t("connect_wallet");
                        $("profileSection").classList.remove("show");
                        $("adminSection").classList.remove("show");
                    }
                });
                console.log("TonConnect initialized");
            }catch(e){console.error("TonConnect init error:",e);showToast("Wallet init failed: "+e.message)}
        }else{
            console.log("TonConnect not loaded after waiting");
            showToast("TonConnect not loaded. Refresh.");
        }
        renderLangSwitcher();
        updateAllTranslations();
        updateSocialLinks();
        updateBuyPresets();
        $("heroImg").src=curToken==="mason"?TOKENS.mason.logo:TOKENS.ape.logo;
        $("rateValue").textContent="1 GRAM = "+TOKENS[curToken].rate+" "+TOKENS[curToken].symbol;
        $("refLinkInput").value="https://t.me/"+BOT_USERNAME+"?start="+(tgUser?tgUser.id:"ref");
        fetchNews();
        fetchTasks();
        fetchCollectedGram();
        setInterval(fetchCollectedGram,15000);
        if(isAdmin)setInterval(loadAdminPayments,15000);
        updateRefStats();
        document.body.className=TOKENS[curToken].themeClass;
    }catch(e){console.log("Init error:",e)}
});
