var firebaseConfig = {
    apiKey: "AIzaSyCu-Wx23P4OpxUbSBywpdiETZHbOe08z9c",
    authDomain: "refer-c9d1b.firebaseapp.com",
    projectId: "refer-c9d1b",
    storageBucket: "refer-c9d1b.appspot.com",
    messagingSenderId: "000000000000",
    appId: "1:000000000000:web:0000000000000000"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

var ADMIN_WALLET = "UQAGpJWn-FJd3wjB-aiChuiYH-9tdXAOhqu887uBtS1Ce4_7";
var BOT_TOKEN = "8936099898:AAFkumE2jBpKBI6Ol8fsKrO4IZbERFSc4TQ";
var BOT_USERNAME = "masontokenbot/app";
var CUSTOM_TASK_COST = 25;
var LIQ_TARGET = 7000;

var TOKENS = {
    mason: {
        contract: "EQDDKb3KIYcjA0FmGndThAO3thpkLoD4hHhQq7ToywPiMgLM",
        rate: 6,
        icon: "https://i.postimg.cc/P5WdHpbh/file-000000007db8720a83a00abbd6e8e608.png",
        heroImg: "https://i.postimg.cc/7PgPq2Gk/photo-2026-07-08-11-05-36.jpg",
        bgImg: "https://i.postimg.cc/7PgPq2Gk/photo-2026-07-08-11-05-36.jpg",
        parallax: "https://i.postimg.cc/yY0wJM0S/photo-2026-07-08-11-05-40-removebg-preview.png",
        taskReward: 5,
        symbol: "$MASON",
        socials: { twitter: "https://x.com/Worshipful_Mast", telegram: "https://t.me/MASON_TOKEN", website: "https://www.instagram.com/worshipful_mast?igsh=MXI1cDVtNmV3eXN4Mg==" }
    },
    ape: {
        contract: "EQBjoywW-EZyePew5wwnwFtjWsW1OAySB-3Pt71huH20bzUD",
        rate: 15674,
        icon: "https://i.postimg.cc/DzgZ49yy/Chat-GPT-Image-14-lip-2026-r-14-06-46.png",
        heroImg: "https://i.postimg.cc/0NfLcf9R/Chat-GPT-Image-14-lip-2026-r-14-10-23.png",
        bgImg: "https://i.postimg.cc/0NfLcf9R/Chat-GPT-Image-14-lip-2026-r-14-10-23.png",
        parallax: "https://i.postimg.cc/yY0wJM0S/photo-2026-07-08-11-05-40-removebg-preview.png",
        taskReward: 250,
        symbol: "$APE",
        socials: { twitter: "https://x.com/Ambasador_APE", telegram: "https://t.me/Ambasador_APE", website: "https://www.instagram.com/worshipful_mast?igsh=MXI1cDVtNmV3eXN4Mg==" }
    }
};

var T = {
    ru: {subtitle:"Pre-Market Токены",days:"Дней",hours:"Часов",minutes:"Минут",seconds:"Секунд",btn_buy:"Купить",btn_copy:"Копировать",btn_share:"Поделиться",top_title:"Топ Холдеры",loading:"Загрузка...",rules_title:"Правила",rule_1:"Покупайте токены по фиксированной цене",rule_2:"Подключите GRAM кошелёк для участия",rule_3:"Токены распределяются после листинга",rule_4:"Все продажи окончательны",rule_5:"Выполняйте задания для бонусов",status_in_game:"В Игре",liq_title:"Ликвидность собрана",tab_home:"Главная",tab_tasks:"Задания",tab_tasks_nav:"Задания",tab_refs:"Рефералы",tab_refs_nav:"Рефералы",tasks_desc:"Выполняйте задания и получайте бонусные токены",ref_desc:"Приглашайте друзей и получайте награды",ref_count_lbl:"Рефералы",ref_earned_lbl:"Заработано",btn_verify:"Проверить",btn_go:"Перейти",create_task_title:"Создать Задание",btn_create_task:"Создать Задание",toast_wallet:"Кошелёк подключён!",toast_copy:"Ссылка скопирована!",toast_share:"Поделиться в Telegram",toast_task_done:"Задание выполнено!",toast_task_verify:"Проверьте задание",toast_error:"Ошибка",placeholder_amount:"Сумма в GRAM",task_static_1:"Подпишитесь на канал",task_static_2:"Сделайте репост поста",task_custom_tg:"Задание Telegram",task_custom_link:"Задание по ссылке",admin_title:"Админ Панель",admin_no_purchases:"Покупок пока нет",filter_all:"Все",btn_confirm_send:"Подтвердить",btn_reject:"Отклонить",status_pending:"Ожидает",status_completed:"Выполнено",status_rejected:"Отклонено",toast_confirm_ok:"Покупка подтверждена!",toast_reject_ok:"Покупка отклонена!",toast_purchase_error:"Ошибка создания заявки",feed_title:"Активность",feed_empty:"Пока нет активности",feed_bought:"купил токены на",feed_just_now:"только что",feed_min_ago:"мин. назад",buy_modal_title:"Купить Токены",buy_modal_desc:"Выберите сумму и подтвердите оплату",btn_cancel:"Отмена",social_title:"Мы в соцсетях",news_title:"Новости",news_empty:"Пока нет новостей",support_title:"Поддержка",support_sub:"Связаться с поддержкой",create_news_title:"Создать Новость",create_news_desc:"Поделитесь новостями с сообществом",news_placeholder_title:"Заголовок",news_placeholder_text:"Текст (необязательно)",news_placeholder_image:"Ссылка на изображение (необязательно)",toast_news_created:"Новость опубликована!",toast_news_deleted:"Новость удалена!",toast_task_created:"Задание создано!",toast_task_deleted:"Задание удалено!",payments_title:"Входящие Платежи",admin_free:"Бесплатно",admin_total_gram:"Баланс GRAM",admin_total_news:"Новости",admin_total_tasks:"Задания",send_modal_desc:"Выберите сумму и подтвердите оплату",btn_buy_confirm:"Купить",toast_buy_ok:"Оплата прошла!"},
    en: {subtitle:"Pre-Market Tokens",days:"Days",hours:"Hours",minutes:"Minutes",seconds:"Seconds",btn_buy:"Buy",btn_copy:"Copy",btn_share:"Share",top_title:"Top Holders",loading:"Loading...",rules_title:"Rules",rule_1:"Buy tokens at fixed pre-market rate",rule_2:"Connect GRAM wallet to participate",rule_3:"Tokens distributed after listing",rule_4:"All sales are final",rule_5:"Complete tasks for bonus tokens",status_in_game:"In Game",liq_title:"Liquidity Collected",tab_home:"Home",tab_tasks:"Tasks",tab_tasks_nav:"Tasks",tab_refs:"Refs",tab_refs_nav:"Refs",tasks_desc:"Complete tasks to earn bonus tokens",ref_desc:"Invite friends and earn rewards",ref_count_lbl:"Referrals",ref_earned_lbl:"Earned",btn_verify:"Verify",btn_go:"Go",create_task_title:"Create Task",btn_create_task:"Create Task",toast_wallet:"Wallet connected!",toast_copy:"Link copied!",toast_share:"Share on Telegram",toast_task_done:"Task completed!",toast_task_verify:"Verify the task",toast_error:"Error",placeholder_amount:"Amount in GRAM",task_static_1:"Subscribe to channel",task_static_2:"Repost the post",task_custom_tg:"Telegram Task",task_custom_link:"Link Task",admin_title:"Admin Panel",admin_no_purchases:"No purchases yet",filter_all:"All",btn_confirm_send:"Confirm",btn_reject:"Reject",status_pending:"Pending",status_completed:"Completed",status_rejected:"Rejected",toast_confirm_ok:"Purchase confirmed!",toast_reject_ok:"Purchase rejected!",toast_purchase_error:"Error creating purchase",feed_title:"Activity",feed_empty:"No activity yet",feed_bought:"bought tokens for",feed_just_now:"just now",feed_min_ago:"min ago",buy_modal_title:"Buy Tokens",buy_modal_desc:"Select amount and confirm payment",btn_cancel:"Cancel",social_title:"Follow Us",news_title:"News",news_empty:"No news yet",support_title:"Support",support_sub:"Contact support",create_news_title:"Create News Post",create_news_desc:"Share news with your community",news_placeholder_title:"Title",news_placeholder_text:"Text (optional)",news_placeholder_image:"Image URL (optional)",toast_news_created:"Published!",toast_news_deleted:"Deleted!",toast_task_created:"Task created!",toast_task_deleted:"Task deleted!",payments_title:"Incoming Payments",admin_free:"Free",admin_total_gram:"GRAM Balance",admin_total_news:"News Posts",admin_total_tasks:"Tasks",send_modal_desc:"Select amount and confirm payment",btn_buy_confirm:"Buy",toast_buy_ok:"Payment sent!"},
    uk: {subtitle:"Pre-Market Токени",days:"Днів",hours:"Годин",minutes:"Хвилин",seconds:"Секунд",btn_buy:"Купити",btn_copy:"Копіювати",btn_share:"Поділитися",top_title:"Топ Холдерів",loading:"Завантаження...",rules_title:"Правила",rule_1:"Купуйте токени за фіксованою ціною",rule_2:"Підключіть GRAM гаманець для участі",rule_3:"Токени розподіляються після лістингу",rule_4:"Всі продажі остаточні",rule_5:"Виконуйте завдання для бонусів",status_in_game:"У Грі",liq_title:"Ліквідність зібрана",tab_home:"Головна",tab_tasks:"Завдання",tab_tasks_nav:"Завдання",tab_refs:"Реферали",tab_refs_nav:"Реферали",tasks_desc:"Виконуйте завдання та отримуйте бонусні токени",ref_desc:"Запрошуйте друзів та отримуйте нагороди",ref_count_lbl:"Реферали",ref_earned_lbl:"Зароблено",btn_verify:"Перевірити",btn_go:"Перейти",create_task_title:"Створити Завдання",btn_create_task:"Створити Завдання",toast_wallet:"Гаманець підключено!",toast_copy:"Посилання скопійовано!",toast_share:"Поділитися в Telegram",toast_task_done:"Завдання виконано!",toast_task_verify:"Перевірте завдання",toast_error:"Помилка",placeholder_amount:"Сума в GRAM",task_static_1:"Підпишіться на канал",task_static_2:"Зробіть репост посту",task_custom_tg:"Завдання Telegram",task_custom_link:"Завдання за посиланням",admin_title:"Адмін Панель",admin_no_purchases:"Покупок поки немає",filter_all:"Всі",btn_confirm_send:"Підтвердити",btn_reject:"Відхилити",status_pending:"Очікує",status_completed:"Виконано",status_rejected:"Відхилено",toast_confirm_ok:"Покупку підтверджено!",toast_reject_ok:"Покупку відхилено!",toast_purchase_error:"Помилка створення заявки",feed_title:"Активність",feed_empty:"Поки немає активності",feed_bought:"придбав токени на",feed_just_now:"щойно",feed_min_ago:"хв. тому",buy_modal_title:"Купити Токени",buy_modal_desc:"Оберіть суму та підтвердіть оплату",btn_cancel:"Скасувати",social_title:"Ми в соцмережах",news_title:"Новини",news_empty:"Поки немає новин",support_title:"Підтримка",support_sub:"Зв'язатися з підтримкою",create_news_title:"Створити Новину",create_news_desc:"Поділіться новинами зі спільнотою",news_placeholder_title:"Заголовок",news_placeholder_text:"Текст (необов'язково)",news_placeholder_image:"Посилання на зображення (необов'язково)",toast_news_created:"Опубліковано!",toast_news_deleted:"Видалено!",toast_task_created:"Завдання створено!",toast_task_deleted:"Завдання видалено!",payments_title:"Вхідні Платежі",admin_free:"Безкоштовно",admin_total_gram:"Баланс GRAM",admin_total_news:"Новини",admin_total_tasks:"Завдання",send_modal_desc:"Оберіть суму та підтвердіть оплату",btn_buy_confirm:"Купити",toast_buy_ok:"Оплачено!"},
    tr: {subtitle:"Pre-Market Tokenlar",days:"Gün",hours:"Saat",minutes:"Dakika",seconds:"Saniye",btn_buy:"Satın Al",btn_copy:"Kopyala",btn_share:"Paylaş",top_title:"En İyi Holders",loading:"Yükleniyor...",rules_title:"Kurallar",rule_1:"Tokenları sabit fiyattan satın alın",rule_2:"Katılmak için GRAM cüzdanınızı bağlayın",rule_3:"Tokenlar listeleme sonrasında dağıtılır",rule_4:"Tüm satışlar kesindir",rule_5:"Bonus tokenlar için görevleri tamamlayın",status_in_game:"Oyunda",liq_title:"Toplanan Likidite",tab_home:"Ana Sayfa",tab_tasks:"Görevler",tab_tasks_nav:"Görevler",tab_refs:"Referanslar",tab_refs_nav:"Referanslar",tasks_desc:"Görevleri tamamlayarak bonus token kazanın",ref_desc:"Arkadaşlarınızı davet edin ve ödül kazanın",ref_count_lbl:"Referanslar",ref_earned_lbl:"Kazanılan",btn_verify:"Doğrula",btn_go:"Git",create_task_title:"Görev Oluştur",btn_create_task:"Görev Oluştur",toast_wallet:"Cüzdan bağlandı!",toast_copy:"Bağlantı kopyalandı!",toast_share:"Telegram'da paylaş",toast_task_done:"Görev tamamlandı!",toast_task_verify:"Görevi doğrulayın",toast_error:"Hata",placeholder_amount:"GRAM cinsinden miktar",task_static_1:"Kanala abone olun",task_static_2:"Gönderiyi yeniden paylaşın",task_custom_tg:"Telegram Görevi",task_custom_link:"Bağlantı Görevi",admin_title:"Admin Paneli",admin_no_purchases:"Henüz satın alma yok",filter_all:"Tümü",btn_confirm_send:"Onayla",btn_reject:"Reddet",status_pending:"Bekliyor",status_completed:"Tamamlandı",status_rejected:"Reddedildi",toast_confirm_ok:"Onaylandı!",toast_reject_ok:"Reddedildi!",toast_purchase_error:"Oluşturma hatası",feed_title:"Aktivite",feed_empty:"Henüz aktivite yok",feed_bought:"token satın aldı",feed_just_now:"az önce",feed_min_ago:"dk önce",buy_modal_title:"Token Satın Al",buy_modal_desc:"Tutar seçin ve ödemeyi onaylayın",btn_cancel:"İptal",social_title:"Bizi Takip Edin",news_title:"Haberler",news_empty:"Henüz haber yok",support_title:"Destek",support_sub:"Destek ile iletişime geçin",create_news_title:"Haber Oluştur",create_news_desc:"Topluluğunuzla haber paylaşın",news_placeholder_title:"Başlık",news_placeholder_text:"Metin (isteğe bağlı)",news_placeholder_image:"Görsel URL (isteğe bağlı)",toast_news_created:"Yayınlandı!",toast_news_deleted:"Silindi!",toast_task_created:"Görev oluşturuldu!",toast_task_deleted:"Görev silindi!",payments_title:"Gelen Ödemeler",admin_free:"Ücretsiz",admin_total_gram:"GRAM Bakiyesi",admin_total_news:"Haberler",admin_total_tasks:"Görevler",send_modal_desc:"Tutar seçin ve ödemeyi onaylayın",btn_buy_confirm:"Satın Al",toast_buy_ok:"Ödeme gönderildi!"},
    ar: {subtitle:"Pre-Market Tokens",days:"يوم",hours:"ساعة",minutes:"دقيقة",seconds:"ثانية",btn_buy:"شراء",btn_copy:"نسخ",btn_share:"مشاركة",top_title:"أفضل Holders",loading:"جاري التحميل...",rules_title:"القواعد",rule_1:"اشترِ الرموز بسعر ثابت",rule_2:"قم بتوصيل محفظة GRAM للمشاركة",rule_3:"تُوزع الرموز بعد الإدراج",rule_4:"جميع المبيعات نهائية",rule_5:"أكمل المهام للحصول على مكافآت",status_in_game:"في اللعبة",liq_title:"السيولة المحصلة",tab_home:"الرئيسية",tab_tasks:"المهام",tab_tasks_nav:"المهام",tab_refs:"الإحالات",tab_refs_nav:"الإحالات",tasks_desc:"أكمل المهام لكسب رموز إضافية",ref_desc:"ادعُ أصدقاءك واحصل على مكافآت",ref_count_lbl:"الإحالات",ref_earned_lbl:"المكتسب",btn_verify:"تحقق",btn_go:"اذهب",create_task_title:"إنشاء مهمة",btn_create_task:"إنشاء مهمة",toast_wallet:"تم توصيل المحفظة!",toast_copy:"تم نسخ الرابط!",toast_share:"مشاركة على تيليجرام",toast_task_done:"تم إكمال المهمة!",toast_task_verify:"تحقق من المهمة",toast_error:"خطأ",placeholder_amount:"المبلغ بالـ GRAM",task_static_1:"اشترك في القناة",task_static_2:"أعد نشر المنشور",task_custom_tg:"مهمة تيليجرام",task_custom_link:"مهمة رابط",admin_title:"لوحة الإدارة",admin_no_purchases:"لا توجد مشتريات بعد",filter_all:"الكل",btn_confirm_send:"تأكيد",btn_reject:"رفض",status_pending:"قيد الانتظار",status_completed:"مكتمل",status_rejected:"مرفوض",toast_confirm_ok:"تم التأكيد!",toast_reject_ok:"تم الرفض!",toast_purchase_error:"خطأ في الإنشاء",feed_title:"النشاط",feed_empty:"لا يوجد نشاط بعد",feed_bought:"اشترى رموزاً بقيمة",feed_just_now:"للتو",feed_min_ago:"دقيقة مضت",buy_modal_title:"شراء الرموز",buy_modal_desc:"اختر المبلغ وأكد الدفع",btn_cancel:"إلغاء",social_title:"تابعنا",news_title:"الأخبار",news_empty:"لا توجد أخبار",support_title:"الدعم",support_sub:"اتصل بالدعم",create_news_title:"إنشاء خبر",create_news_desc:"شارك أخبارك مع المجتمع",news_placeholder_title:"العنوان",news_placeholder_text:"النص (اختياري)",news_placeholder_image:"رابط الصورة (اختياري)",toast_news_created:"تم النشر!",toast_news_deleted:"تم الحذف!",toast_task_created:"تم إنشاء المهمة!",toast_task_deleted:"تم حذف المهمة!",payments_title:"المدفوعات الواردة",admin_free:"مجاني",admin_total_gram:"رصيد GRAM",admin_total_news:"منشورات",admin_total_tasks:"مهام",send_modal_desc:"اختر المبلغ وأكد الدفع",btn_buy_confirm:"شراء",toast_buy_ok:"تم الدفع!"},
    zh: {subtitle:"Pre-Market 代币",days:"天",hours:"小时",minutes:"分钟",seconds:"秒",btn_buy:"购买",btn_copy:"复制",btn_share:"分享",top_title:"持有者排行榜",loading:"加载中...",rules_title:"规则",rule_1:"以固定价格购买代币",rule_2:"连接 GRAM 钱包参与",rule_3:"代币在上线后分发",rule_4:"所有销售最终确认",rule_5:"完成任务获得奖励",status_in_game:"游戏中",liq_title:"已收集流动性",tab_home:"首页",tab_tasks:"任务",tab_tasks_nav:"任务",tab_refs:"推荐",tab_refs_nav:"推荐",tasks_desc:"完成任务赚取奖励代币",ref_desc:"邀请朋友获得奖励",ref_count_lbl:"推荐数",ref_earned_lbl:"已赚取",btn_verify:"验证",btn_go:"前往",create_task_title:"创建任务",btn_create_task:"创建任务",toast_wallet:"钱包已连接!",toast_copy:"链接已复制!",toast_share:"分享到 Telegram",toast_task_done:"任务已完成!",toast_task_verify:"请验证任务",toast_error:"错误",placeholder_amount:"金额 (GRAM)",task_static_1:"订阅频道",task_static_2:"转发帖子",task_custom_tg:"Telegram 任务",task_custom_link:"链接任务",admin_title:"管理面板",admin_no_purchases:"暂无购买记录",filter_all:"全部",btn_confirm_send:"确认",btn_reject:"拒绝",status_pending:"待处理",status_completed:"已完成",status_rejected:"已拒绝",toast_confirm_ok:"已确认!",toast_reject_ok:"已拒绝!",toast_purchase_error:"创建失败",feed_title:"动态",feed_empty:"暂无动态",feed_bought:"购买了代币",feed_just_now:"刚刚",feed_min_ago:"分钟前",buy_modal_title:"购买代币",buy_modal_desc:"选择金额并确认支付",btn_cancel:"取消",social_title:"关注我们",news_title:"新闻动态",news_empty:"暂无新闻",support_title:"支持",support_sub:"联系客服",create_news_title:"发布新闻",create_news_desc:"与社区分享新闻",news_placeholder_title:"标题",news_placeholder_text:"内容（可选）",news_placeholder_image:"图片链接（可选）",toast_news_created:"发布成功!",toast_news_deleted:"已删除!",toast_task_created:"任务已创建!",toast_task_deleted:"任务已删除!",payments_title:"收款记录",admin_free:"免费",admin_total_gram:"GRAM 余额",admin_total_news:"新闻",admin_total_tasks:"任务",send_modal_desc:"选择金额并确认支付",btn_buy_confirm:"购买",toast_buy_ok:"支付成功!"},
    hi: {subtitle:"Pre-Market टोकन",days:"दिन",hours:"घंटे",minutes:"मिनट",seconds:"सेकंड",btn_buy:"खरीदें",btn_copy:"कॉपी",btn_share:"शेयर",top_title:"टॉप होल्डर्स",loading:"लोड हो रहा है...",rules_title:"नियम",rule_1:"तय दर पर टोकन खरीदें",rule_2:"भाग लेने के लिए GRAM वॉलेट कनेक्ट करें",rule_3:"लिस्टिंग के बाद टोकन वितरित",rule_4:"सभी बिक्री अंतिम हैं",rule_5:"बोनस के लिए कार्य पूरे करें",status_in_game:"खेल में",liq_title:"एकत्र तरलता",tab_home:"होम",tab_tasks:"कार्य",tab_tasks_nav:"कार्य",tab_refs:"रेफरल",tab_refs_nav:"रेफरल",tasks_desc:"बोनस टोकन कमाने के लिए कार्य पूरे करें",ref_desc:"दोस्तों को आमंत्रित करें और पुरस्कार पाएं",ref_count_lbl:"रेफरल",ref_earned_lbl:"कमाया",btn_verify:"सत्यापित",btn_go:"जाएं",create_task_title:"कार्य बनाएं",btn_create_task:"कार्य बनाएं",toast_wallet:"वॉलेट कनेक्ट हुआ!",toast_copy:"लिंक कॉपी हुआ!",toast_share:"Telegram पर शेयर करें",toast_task_done:"कार्य पूरा हुआ!",toast_task_verify:"कार्य सत्यापित करें",toast_error:"त्रुटि",placeholder_amount:"राशि (GRAM)",task_static_1:"चैनल सब्सक्राइब करें",task_static_2:"पोस्ट रीपोस्ट करें",task_custom_tg:"Telegram कार्य",task_custom_link:"लिंक कार्य",admin_title:"एडमिन पैनल",admin_no_purchases:"अभी कोई खरीद नहीं",filter_all:"सभी",btn_confirm_send:"पुष्टि करें",btn_reject:"अस्वीकार",status_pending:"लंबित",status_completed:"पूर्ण",status_rejected:"अस्वीकृत",toast_confirm_ok:"पुष्टि हुई!",toast_reject_ok:"अस्वीकृत!",toast_purchase_error:"बनाने में त्रुटि",feed_title:"गतिविधि",feed_empty:"अभी कोई गतिविधि नहीं",feed_bought:"ने टोकन खरीदे",feed_just_now:"अभी",feed_min_ago:"मिनट पहले",buy_modal_title:"टोकन खरीदें",buy_modal_desc:"राशि चुनें और भुगतान की पुष्टि करें",btn_cancel:"रद्द",social_title:"हमें फॉलो करें",news_title:"समाचार",news_empty:"कोई समाचार नहीं",support_title:"सहायता",support_sub:"सहायता से संपर्क करें",create_news_title:"समाचार बनाएं",create_news_desc:"समुदाय के साथ समाचार साझा करें",news_placeholder_title:"शीर्षक",news_placeholder_text:"पाठ (वैकल्पिक)",news_placeholder_image:"चित्र URL (वैकल्पिक)",toast_news_created:"प्रकाशित!",toast_news_deleted:"हटाया!",toast_task_created:"कार्य बनाया!",toast_task_deleted:"कार्य हटाया!",payments_title:"आने वाले भुगतान",admin_free:"मुफ़्त",admin_total_gram:"GRAM बैलेंस",admin_total_news:"समाचार",admin_total_tasks:"कार्य",send_modal_desc:"राशि चुनें और भुगतान की पुष्टि करें",btn_buy_confirm:"खरीदें",toast_buy_ok:"भुगतान भेजा!"}
};

var curLang = "ru";
var curToken = "mason";
var isAdmin = false;
var walletConnected = false;
var walletAddress = "";
var tgUser = null;
var tcInstance = null;
var currentTasks = [];
var lastFeedItems = [];

function $(id) { return document.getElementById(id); }

function showToast(msg) {
    var el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(function() { el.classList.remove("show"); }, 3000);
}

function openLink(url) {
    if (window.Telegram && Telegram.WebApp) Telegram.WebApp.openLink(url);
    else window.open(url, "_blank");
}
window.openLink = openLink;

function t(key) { return (T[curLang] && T[curLang][key]) || (T.en && T.en[key]) || key; }

window.switchTab = function(tab) {
    document.querySelectorAll(".tab-content").forEach(function(el) { el.classList.remove("active"); });
    document.querySelectorAll(".nav-item").forEach(function(el) { el.classList.remove("active"); });
    if (tab === "home") { $("tabHome").classList.add("active"); $("navHome").classList.add("active"); }
    else if (tab === "tasks") { $("tabTasks").classList.add("active"); $("navTasks").classList.add("active"); }
    else if (tab === "refs") { $("tabRefs").classList.add("active"); $("navRefs").classList.add("active"); }
};

function toggleToken() { curToken = curToken === "mason" ? "ape" : "mason"; switchToken(); }

function switchToken() {
    var data = TOKENS[curToken];
    var isApe = curToken === "ape";
    document.body.classList.toggle("theme-ape", isApe);
    $("tokenTrack").classList.toggle("ape", isApe);
    $("lblMason").classList.toggle("active", !isApe);
    $("lblApe").classList.toggle("active", isApe);
    $("rateValue").textContent = "1 GRAM = " + data.rate.toLocaleString() + " " + data.symbol;
    $("heroImg").src = data.bgImg;
    $("heroTitle").textContent = data.symbol + " Pre-Market";
    $("balTokenLbl").textContent = data.symbol;
    $("preloaderLogo").src = data.icon;
    document.querySelectorAll(".pf-token").forEach(function(el) { el.src = data.parallax; });
    $("bgImage").style.backgroundImage = "url(" + data.bgImg + ")";
    $("bgImage").style.opacity = "0.4";
    fetchNews();
    updateAllTranslations();
    renderSocialLinks();
    loadOnChainFeed();
    fetchTasks();
}

function updateBal() { $("balTokenLbl").textContent = TOKENS[curToken].symbol; }

function changeLanguage(lang) {
    curLang = lang;
    document.querySelectorAll(".lang-btn").forEach(function(btn) { btn.classList.toggle("active", btn.dataset.lang === lang); });
    document.documentElement.lang = lang;
    updateAllTranslations();
    renderSocialLinks();
    renderTasks(currentTasks);
    renderFeed(lastFeedItems);
}

function updateAllTranslations() {
    $("preloaderText").textContent = t("loading");
    $("rateLabel").textContent = TOKENS[curToken].symbol + " Rate";
    $("liqTitle").textContent = t("liq_title");
    $("rulesTitle").textContent = t("rules_title");
    $("rule1").textContent = t("rule_1");
    $("rule2").textContent = t("rule_2");
    $("rule3").textContent = t("rule_3");
    $("rule4").textContent = t("rule_4");
    $("rule5").textContent = t("rule_5");
    $("statusBadge").textContent = t("status_in_game");
    $("navHomeLbl").textContent = t("tab_home");
    $("navTasksLbl").textContent = t("tab_tasks_nav");
    $("navRefsLbl").textContent = t("tab_refs_nav");
    $("tasksTitle").textContent = t("tab_tasks");
    $("tasksDesc").textContent = t("tasks_desc");
    $("refTitle").textContent = t("tab_refs");
    $("refDesc").textContent = t("ref_desc");
    $("refCountLbl").textContent = t("ref_count_lbl");
    $("refEarnedLbl").textContent = t("ref_earned_lbl");
    $("btnCopy").textContent = t("btn_copy");
    $("btnShare").textContent = t("btn_share");
    $("leaderTitle").textContent = t("top_title");
    $("feedTitle").textContent = t("feed_title");
    $("adminTitle").textContent = t("admin_title");
    $("adminTotalGramLbl").textContent = t("admin_total_gram");
    $("adminTotalNewsLbl").textContent = t("admin_total_news");
    $("adminTotalTasksLbl").textContent = t("admin_total_tasks");
    $("createTaskTitle").textContent = t("create_task_title");
    $("createTaskCost").textContent = isAdmin ? t("admin_free") : "Cost: " + CUSTOM_TASK_COST + " GRAM";
    $("btnCreateTask").textContent = t("btn_create_task");
    $("socialTitle").textContent = t("social_title");
    $("tcBtn").textContent = walletConnected ? (walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4)) : "Connect Wallet";
    $("sendModalTitle").textContent = t("buy_modal_title");
    $("sendModalDesc").textContent = t("buy_modal_desc");
    $("btnBuyConfirm").textContent = t("btn_buy_confirm");
    $("createTaskModalTitle").textContent = t("create_task_title");
    $("createTaskModalDesc").textContent = isAdmin ? t("admin_free") : "Cost: " + CUSTOM_TASK_COST + " GRAM";
    if ($("feedEmpty")) $("feedEmpty").textContent = t("feed_empty");
    if ($("newsEmpty")) $("newsEmpty").textContent = t("news_empty");
    $("newsTitle").textContent = t("news_title");
    $("supportTitle").textContent = t("support_title");
    $("supportSub").textContent = t("support_sub");
    $("createNewsModalTitle").textContent = t("create_news_title");
    $("createNewsModalDesc").textContent = t("create_news_desc");
    $("newsTitleInput").placeholder = t("news_placeholder_title");
    $("newsTextInput").placeholder = t("news_placeholder_text");
    $("newsImageUrlInput").placeholder = t("news_placeholder_image");
    $("paymentsTitle").textContent = t("payments_title");
    if (isAdmin) $("btnCreateNews").style.display = "block";
}

function renderSocialLinks() {
    var socials = TOKENS[curToken].socials;
    $("socialLinks").innerHTML =
        '<a class="social-btn" href="' + socials.twitter + '" target="_blank" onclick="event.preventDefault();openLink(\'' + socials.twitter + '\')"><svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> Twitter</a>' +
        '<a class="social-btn" href="' + socials.telegram + '" target="_blank" onclick="event.preventDefault();openLink(\'' + socials.telegram + '\')"><svg viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> Telegram</a>' +
        '<a class="social-btn" href="' + socials.website + '" target="_blank" onclick="event.preventDefault();openLink(\'' + socials.website + '\')"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg> Website</a>';
}

var newsUnsub = null;
function fetchNews() {
    if (newsUnsub) newsUnsub();
    newsUnsub = db.collection("news").where("token", "==", curToken).onSnapshot(function(snap) {
        var posts = [];
        snap.forEach(function(d) { posts.push(Object.assign({ id: d.id }, d.data())); });
        posts.sort(function(a, b) { return (b.createdAt || 0) - (a.createdAt || 0); });
        renderNewsFeed(posts);
    }, function() { renderNewsFeed([]); });
}

function renderNewsFeed(posts) {
    var container = $("newsFeedList");
    if (!posts || posts.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:20px;font-size:12px;color:rgba(255,255,255,0.3)" id="newsEmpty">' + t("news_empty") + '</div>';
        return;
    }
    container.innerHTML = posts.map(function(p) {
        var img = p.imageUrl ? '<img src="' + p.imageUrl + '" alt="">' : '';
        var text = p.text ? '<div class="nc-text">' + p.text + '</div>' : '';
        var delBtn = isAdmin ? '<button class="nc-del" onclick="deleteNewsPost(\'' + p.id + '\')">✕</button>' : '';
        var time = p.createdAt ? formatTimeAgo(p.createdAt) : '';
        return '<div class="news-card">' + img + '<div class="nc-body">' + delBtn + '<div class="nc-title">' + (p.title || '') + '</div>' + text + '<div class="nc-time">' + time + '</div></div></div>';
    }).join("");
}

window.showCreateNewsModal = function() { $("createNewsModal").classList.add("show"); $("newsTitleInput").value = ""; $("newsTextInput").value = ""; $("newsImageUrlInput").value = ""; };
window.closeCreateNewsModal = function() { $("createNewsModal").classList.remove("show"); };
window.submitNewsPost = async function() {
    var title = $("newsTitleInput").value.trim();
    var text = $("newsTextInput").value.trim();
    var imageUrl = $("newsImageUrlInput").value.trim();
    if (!title) { showToast(t("toast_error")); return; }
    try {
        await db.collection("news").add({ title: title, text: text, imageUrl: imageUrl, token: curToken, author: tgUser ? tgUser.id : 0, createdAt: Date.now() });
        showToast(t("toast_news_created"));
        closeCreateNewsModal();
    } catch (e) { showToast(t("toast_error")); }
};
window.deleteNewsPost = async function(id) {
    try {
        await db.collection("news").doc(id).delete();
        showToast(t("toast_news_deleted"));
    } catch (e) { showToast(t("toast_error")); }
};

window.deleteTask = async function(id) {
    if (id.startsWith("static_")) return;
    try {
        await db.collection("tasks").doc(id).delete();
        showToast(t("toast_task_deleted"));
    } catch (e) { showToast(t("toast_error")); }
};

async function fetchCollectedGram() {
    try {
        var resp = await fetch("https://tonapi.io/v2/accounts/" + ADMIN_WALLET);
        if (resp.ok) {
            var data = await resp.json();
            var balance = (data.balance || 0) / 1e9;
            var pct = Math.min((balance / LIQ_TARGET) * 100, 100);
            $("liqFill").style.width = pct + "%";
            $("liqVal").textContent = balance.toFixed(1) + " / " + LIQ_TARGET + " GRAM";
        }
    } catch (e) { console.log("Collected GRAM error:", e); }
}

async function checkAdminWallet() {
    if (!walletAddress) return false;
    try {
        var clean1 = walletAddress.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        var clean2 = ADMIN_WALLET.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        isAdmin = clean1 === clean2;
        $("adminSection").classList.toggle("show", isAdmin);
        $("profileSection").classList.toggle("show", walletConnected);
        if (isAdmin) {
            $("createTaskSection").style.display = "block";
            $("btnCreateNews").style.display = "block";
            updateAdminStats();
            fetchAdminPayments();
            if (!window._adminPaymentsInterval) window._adminPaymentsInterval = setInterval(fetchAdminPayments, 15000);
        }
    } catch (e) { isAdmin = false; }
    return isAdmin;
}

function updateAdminStats() {
    $("adminTotalGram").textContent = "—";
    $("adminTotalNews").textContent = "—";
    $("adminTotalTasks").textContent = currentTasks ? currentTasks.length : 0;
    fetchCollectedGram().then(function() {
        $("adminTotalGram").textContent = $("liqVal").textContent.split("/")[0].trim();
    });
    db.collection("news").where("token", "==", curToken).onSnapshot(function(snap) {
        $("adminTotalNews").textContent = snap.size;
    });
    $("adminTotalTasks").textContent = currentTasks ? currentTasks.length : 0;
}

async function fetchAdminPayments() {
    if (!isAdmin) return;
    try {
        var resp = await fetch("https://tonapi.io/v2/blockchain/accounts/" + TOKENS[curToken].contract + "/transactions?limit=20");
        if (resp.ok) {
            var data = await resp.json();
            var txs = data.transactions || [];
            var incoming = txs.filter(function(tx) { return tx.in_msg && tx.in_msg.source && tx.in_msg.source.address !== TOKENS[curToken].contract; });
            if (incoming.length === 0) {
                $("adminPaymentsList").innerHTML = '<div style="text-align:center;padding:16px;font-size:12px;color:rgba(255,255,255,0.3)">' + t("admin_no_purchases") + '</div>';
                return;
            }
            $("adminPaymentsList").innerHTML = incoming.map(function(tx) {
                var from = tx.in_msg.source.address || "Unknown";
                var short = from.slice(0, 6) + "..." + from.slice(-4);
                var gramAmt = (parseFloat(tx.in_msg.value || 0) / 1e9).toFixed(2);
                var tokenAmt = (parseFloat(tx.in_msg.value || 0) / 1e9 * TOKENS[curToken].rate).toLocaleString(undefined, {maximumFractionDigits: 2});
                var ts = tx.now ? tx.now * 1000 : Date.now();
                return '<div class="task-item"><div class="task-icon" style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px">Income</div><div class="task-info"><div class="task-title">' + short + '</div><div class="task-reward">' + gramAmt + ' GRAM → ' + tokenAmt + ' ' + TOKENS[curToken].symbol + '</div></div><div style="font-size:10px;color:rgba(255,255,255,0.3);white-space:nowrap">' + formatTimeAgo(ts) + '</div></div>';
            }).join("");
        }
    } catch (e) {
        $("adminPaymentsList").innerHTML = '<div style="text-align:center;padding:16px;font-size:12px;color:rgba(255,255,255,0.3)">Error loading payments</div>';
    }
}

function formatTimeAgo(ts) {
    if (!ts) return t("feed_just_now");
    var diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return t("feed_just_now");
    return Math.floor(diff / 60) + " " + t("feed_min_ago");
}

async function loadHolders() {
    try {
        var resp = await fetch("https://tonapi.io/v2/jettons/" + TOKENS[curToken].contract + "/holders?limit=10");
        if (resp.ok) {
            var data = await resp.json();
            var holders = (data.addresses || []).filter(function(h) { return parseFloat(h.balance || 0) > 0; });
            var html = "";
            holders.forEach(function(h, i) {
                var addr = h.address || "Unknown";
                var bal = (parseFloat(h.balance || 0) / 1e9).toLocaleString(undefined, {maximumFractionDigits: 2});
                var rank = i + 1;
                var rankClass = rank === 1 ? "rank-gold" : rank === 2 ? "rank-silver" : rank === 3 ? "rank-bronze" : "";
                var name = addr.slice(0, 6) + "..." + addr.slice(-4);
                html += '<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border)"><span class="rank-badge ' + rankClass + '" style="font-size:12px;font-weight:700;min-width:24px">' + rank + '</span><span style="flex:1;font-size:12px;color:rgba(255,255,255,0.6)">' + name + '</span><span style="font-size:12px;color:var(--neon);font-weight:600">' + bal + ' ' + TOKENS[curToken].symbol + '</span></div>';
            });
            $("leaderboard").innerHTML = html || "<div style='text-align:center;padding:10px;font-size:12px;color:rgba(255,255,255,0.3)'>No data</div>";
        }
    } catch (e) { console.log("Holders error:", e); }
}

var tickerInterval = null;
function listenToBlockchainTransfers() {
    if (tickerInterval) clearInterval(tickerInterval);
    tickerInterval = setInterval(async function() {
        try {
            var resp = await fetch("https://tonapi.io/v2/blockchain/accounts/" + TOKENS[curToken].contract + "/transactions?limit=3");
            if (resp.ok) {
                var data = await resp.json();
                var txs = data.transactions || [];
                if (txs.length > 0) {
                    var tx = txs[0];
                    var from = tx.in_msg && tx.in_msg.source ? tx.in_msg.source.address : "Unknown";
                    var name = from.slice(0, 6) + "..." + from.slice(-4);
                    var amount = (parseFloat(tx.in_msg && tx.in_msg.value ? tx.in_msg.value : 0) / 1e9).toFixed(2);
                    $("tickerText").textContent = name + " " + t("feed_bought") + " " + amount + " GRAM | " + TOKENS[curToken].rate.toLocaleString() + " " + TOKENS[curToken].symbol + "/GRAM";
                }
            }
        } catch (e) { console.log("Ticker error:", e); }
    }, 5000);
}

async function loadOnChainFeed() {
    try {
        var resp = await fetch("https://tonapi.io/v2/blockchain/accounts/" + TOKENS[curToken].contract + "/transactions?limit=15");
        if (resp.ok) {
            var data = await resp.json();
            var txs = data.transactions || [];
            var items = txs.map(function(tx) {
                var from = tx.in_msg && tx.in_msg.source ? tx.in_msg.source.address : "Unknown";
                var name = from.slice(0, 6) + "..." + from.slice(-4);
                var gramAmount = (parseFloat(tx.in_msg && tx.in_msg.value ? tx.in_msg.value : 0) / 1e9).toFixed(2);
                var tokenAmount = (parseFloat(tx.in_msg && tx.in_msg.value ? tx.in_msg.value : 0) / 1e9 * TOKENS[curToken].rate).toLocaleString(undefined, {maximumFractionDigits: 2});
                var ts = tx.now ? tx.now * 1000 : Date.now();
                return { name: name, gramAmount: gramAmount, tokenAmount: tokenAmount, timestamp: ts };
            });
            lastFeedItems = items;
            renderFeed(items);
        }
    } catch (e) {
        console.log("On-chain feed error:", e);
        $("feedList").innerHTML = '<div style="text-align:center;padding:20px;font-size:12px;color:rgba(255,255,255,0.3)">' + t("feed_empty") + '</div>';
    }
}

function renderFeed(items) {
    if (!items || items.length === 0) {
        $("feedList").innerHTML = '<div style="text-align:center;padding:20px;font-size:12px;color:rgba(255,255,255,0.3)">' + t("feed_empty") + '</div>';
        return;
    }
    $("feedList").innerHTML = items.map(function(item) {
        return '<div class="feed-item"><div class="fi-icon" style="background:linear-gradient(135deg,rgba(var(--neon-rgb),0.15),rgba(var(--neon-rgb),0.05))"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/></svg></div><div class="fi-text">' + item.name + ' ' + t("feed_bought") + ' ' + item.gramAmount + ' GRAM → ' + item.tokenAmount + ' ' + TOKENS[curToken].symbol + '</div><div class="fi-time">' + formatTimeAgo(item.timestamp) + '</div></div>';
    }).join("");
}

window.connectWallet = function() {
    if (walletConnected) { $("profileSection").classList.toggle("show"); return; }
    if (window.Telegram && Telegram.WebApp) Telegram.WebApp.HapticFeedback.impactOccurred("light");
    if (!window.TonConnectUI) { showToast("TonConnect not loaded. Retrying..."); initTonConnect(); return; }
    if (!tcInstance) { showToast("Wallet not initialized. Retrying..."); initTonConnect(); return; }
    tcInstance.openSingleWalletModal().then(async function(result) {
        if (result) {
            walletConnected = true;
            walletAddress = result.account ? result.account.address : "";
            $("tcBtn").textContent = walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4);
            $("pfName").textContent = tgUser ? (tgUser.first_name + " " + (tgUser.last_name || "")) : "User";
            $("pfId").textContent = "@" + (tgUser ? tgUser.username : "user");
            if (tgUser && tgUser.photo_url) $("pfAvatar").src = tgUser.photo_url;
            $("profileSection").classList.add("show");
            showToast(t("toast_wallet"));
            await checkAdminWallet();
            updateBal();
        }
    }).catch(function(e) { console.log("Wallet connect error:", e); showToast(t("toast_error") + ": " + e.message); });
};

function initTonConnect() {
    if (!window.TonConnectUI) { showToast("TonConnect script not loaded"); return; }
    try {
        tcInstance = new TonConnectUI({ 
            manifestUrl: "https://recksach.github.io/chronogram-infinity/tonconnect-manifest.json"
        });
        tcInstance.onStatusChange(function(wallet) {
            if (wallet) {
                walletConnected = true;
                walletAddress = wallet.account ? wallet.account.address : "";
                $("tcBtn").textContent = walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4);
                $("pfName").textContent = tgUser ? (tgUser.first_name + " " + (tgUser.last_name || "")) : "User";
                $("pfId").textContent = "@" + (tgUser ? tgUser.username : "user");
                if (tgUser && tgUser.photo_url) $("pfAvatar").src = tgUser.photo_url;
                $("profileSection").classList.add("show");
                checkAdminWallet();
                updateBal();
            } else {
                walletConnected = false;
                walletAddress = "";
                $("tcBtn").textContent = "Connect Wallet";
                $("profileSection").classList.remove("show");
                isAdmin = false;
                $("adminSection").classList.remove("show");
            }
        });
        showToast("Wallet ready. Tap Connect again.");
    } catch (e) { console.error("TonConnect init failed:", e); showToast("Init failed: " + e.message); }
}

window.showSendModal = function() {
    if (!walletConnected) { showToast(t("toast_error") + " — connect wallet first"); return; }
    $("buyAmountInput").value = "";
    $("buyPreview").textContent = "You will receive: 0 " + TOKENS[curToken].symbol;
    $("sendModal").classList.add("show");
};
window.closeSendModal = function() { $("sendModal").classList.remove("show"); };
window.setBuyAmount = function(amt) {
    $("buyAmountInput").value = amt;
    updateBuyPreview();
};
window.updateBuyPreview = function() {
    var amt = parseFloat($("buyAmountInput").value) || 0;
    var tokens = amt * TOKENS[curToken].rate;
    $("buyPreview").textContent = "You will receive: " + tokens.toLocaleString(undefined, {maximumFractionDigits: 2}) + " " + TOKENS[curToken].symbol;
};
window.buyTokens = async function() {
    var amt = parseFloat($("buyAmountInput").value);
    if (!amt || amt <= 0) { showToast(t("toast_error")); return; }
    if (!tcInstance || !walletConnected) { showToast(t("toast_error") + " — connect wallet first"); return; }
    try {
        var nanograms = Math.floor(amt * 1e9);
        var tx = {
            validUntil: Math.floor(Date.now() / 1000) + 360,
            messages: [{
                address: ADMIN_WALLET,
                amount: nanograms.toString(),
                payload: ""
            }]
        };
        showToast("Confirm in your wallet...");
        closeSendModal();
        var result = await tcInstance.sendTransaction(tx);
        if (result) {
            showToast(t("toast_buy_ok") + " " + amt + " GRAM");
            if (window.Telegram && Telegram.WebApp) Telegram.WebApp.HapticFeedback.impactOccurred("success");
            try {
                await db.collection("activity").add({
                    type: "purchase",
                    userId: tgUser ? tgUser.id : 0,
                    userName: tgUser ? tgUser.first_name : "User",
                    walletAddress: walletAddress,
                    gramAmount: amt,
                    tokenAmount: amt * TOKENS[curToken].rate,
                    token: curToken,
                    txHash: result.boc || "",
                    timestamp: Date.now()
                });
            } catch (e) { console.log("Activity log error:", e); }
        }
    } catch (e) {
        console.log("Buy error:", e);
        if (e && e.message && (e.message.indexOf("Wallet declined") !== -1 || e.message.indexOf("cancelled") !== -1)) {
            showToast("Payment cancelled");
        } else {
            showToast(t("toast_error"));
        }
    }
};

window.showCreateTaskModal = function() { $("createTaskModal").classList.add("show"); $("taskNameInput").value = ""; $("taskLinkInput").value = ""; };
window.closeCreateTaskModal = function() { $("createTaskModal").classList.remove("show"); };
window.createCustomTask = async function() {
    var name = $("taskNameInput").value.trim();
    var link = $("taskLinkInput").value.trim();
    if (!name) { showToast(t("toast_error")); return; }
    try {
        await db.collection("tasks").add({ name: name, link: link || "", reward: TOKENS[curToken].taskReward, token: curToken, createdBy: tgUser ? tgUser.id : 0, createdAt: Date.now(), type: isAdmin ? "admin" : "custom" });
        showToast(t("toast_task_created"));
        closeCreateTaskModal();
    } catch (e) { showToast(t("toast_error")); }
};

var tasksUnsub = null;
function fetchTasks() {
    if (tasksUnsub) tasksUnsub();
    tasksUnsub = db.collection("tasks").where("token", "==", curToken).onSnapshot(function(snap) {
        var tasks = [];
        snap.forEach(function(docSnap) { tasks.push(Object.assign({ id: docSnap.id }, docSnap.data())); });
        renderTasks(tasks);
    }, function() { renderTasks([]); });
}

function renderTasks(firebaseTasks) {
    var data = TOKENS[curToken];
    var staticTasks = [
        { id: "static_1", name: t("task_static_1"), reward: data.taskReward, type: "static", icon: "Subscribe" },
        { id: "static_2", name: t("task_static_2"), reward: data.taskReward, type: "static", icon: "Repost" }
    ];
    currentTasks = firebaseTasks;
    var allTasks = staticTasks.concat(firebaseTasks || []);
    $("taskList").innerHTML = allTasks.map(function(task) {
        var icon = task.icon || "Link";
        var isCustom = task.type === "custom" || task.type === "admin";
        var label = isCustom ? (task.link ? t("task_custom_link") : t("task_custom_tg")) : "";
        var delBtn = isAdmin ? '<button class="nc-del" style="margin:0 0 0 8px;float:none;display:inline-block" onclick="deleteTask(\'' + task.id + '\')">Remove</button>' : '';
        return '<div class="task-item"><div class="task-icon" style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px">' + icon + '</div><div class="task-info"><div class="task-title">' + task.name + (label ? ' <span style="color:rgba(255,255,255,0.3);font-size:10px">('+label+')</span>' : "") + '</div><div class="task-reward">+' + (task.reward || data.taskReward) + ' ' + data.symbol + '</div></div>' + delBtn + '<button class="task-btn" onclick="verifyTask(\'' + task.id + '\',\'' + (task.link||'') + '\')">' + t("btn_verify") + '</button></div>';
    }).join("");
    if (isAdmin) {
        $("createTaskTitle").textContent = t("create_task_title");
        $("createTaskCost").textContent = t("admin_free");
        $("createTaskSection").style.display = "block";
    }
}

window.verifyTask = async function(taskId, link) {
    if (link) { openLink(link); showToast(t("toast_task_verify")); return; }
    if (taskId.startsWith("static_")) {
        if (window.Telegram && Telegram.WebApp) {
            if (taskId === "static_1") openLink("https://t.me/" + BOT_USERNAME);
            else if (taskId === "static_2") Telegram.WebApp.shareMessage ? Telegram.WebApp.shareMessage(0) : openLink("https://t.me/" + BOT_USERNAME);
        }
        showToast(t("toast_task_verify"));
        return;
    }
    try {
        var taskSnap = await db.collection("tasks").doc(taskId).get();
        if (taskSnap.exists) {
            var taskData = taskSnap.data();
            await db.collection("activity").add({ type: "task", userId: tgUser ? tgUser.id : 0, userName: tgUser ? tgUser.first_name : "User", taskId: taskId, taskName: taskData.name, reward: taskData.reward || TOKENS[curToken].taskReward, token: curToken, timestamp: Date.now() });
            showToast(t("toast_task_done") + " +" + (taskData.reward || TOKENS[curToken].taskReward) + " " + TOKENS[curToken].symbol);
        }
    } catch (e) { showToast(t("toast_task_done")); }
};

window.copyRefLink = function() {
    var link = "https://t.me/" + BOT_USERNAME + "?start=" + (tgUser ? tgUser.id : "ref");
    navigator.clipboard.writeText(link).then(function() { showToast(t("toast_copy")); }).catch(function() { $("refLinkInput").value = link; showToast(t("toast_copy")); });
};
window.shareToTelegram = function() {
    var link = "https://t.me/" + BOT_USERNAME + "?start=" + (tgUser ? tgUser.id : "ref");
    openLink("https://t.me/share/url?url=" + encodeURIComponent(link) + "&text=" + encodeURIComponent("Join Pre-Market! " + link));
    showToast(t("toast_share"));
};

function initEventListeners() {
    $("tokenTrack").addEventListener("click", toggleToken);
    document.querySelectorAll(".lang-btn").forEach(function(btn) { btn.addEventListener("click", function() { changeLanguage(btn.dataset.lang); }); });
}

function waitForTonConnect() {
    return new Promise(function(resolve) {
        if (window.TonConnectUI) {
            resolve();
            return;
        }
        var attempts = 0;
        var interval = setInterval(function() {
            attempts++;
            if (window.TonConnectUI) {
                clearInterval(interval);
                resolve();
            } else if (attempts > 50) {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    });
}

window.addEventListener("load", async function() {
    setTimeout(function() { $("preloader").classList.add("hide"); $("bgImage").style.backgroundImage = "url(" + TOKENS[curToken].bgImg + ")"; $("bgImage").style.opacity = "0.4"; }, 1500);
    try {
        if (window.Telegram && Telegram.WebApp) { Telegram.WebApp.ready(); Telegram.WebApp.expand(); tgUser = Telegram.WebApp.initDataUnsafe ? Telegram.WebApp.initDataUnsafe.user : null; }
        
        await waitForTonConnect();
        
        if (window.TonConnectUI) {
            try {
                tcInstance = new TonConnectUI({ 
                    manifestUrl: "https://recksach.github.io/chronogram-infinity/tonconnect-manifest.json"
                });
                tcInstance.onStatusChange(function(wallet) {
                    if (wallet) {
                        walletConnected = true;
                        walletAddress = wallet.account ? wallet.account.address : "";
                        $("tcBtn").textContent = walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4);
                        $("pfName").textContent = tgUser ? (tgUser.first_name + " " + (tgUser.last_name || "")) : "User";
                        $("pfId").textContent = "@" + (tgUser ? tgUser.username : "user");
                        if (tgUser && tgUser.photo_url) $("pfAvatar").src = tgUser.photo_url;
                        $("profileSection").classList.add("show");
                        checkAdminWallet();
                        updateBal();
                    } else {
                        walletConnected = false;
                        walletAddress = "";
                        $("tcBtn").textContent = "Connect Wallet";
                        $("profileSection").classList.remove("show");
                        isAdmin = false;
                        $("adminSection").classList.remove("show");
                    }
                });
                console.log("TonConnectUI initialized successfully");
            } catch (e) {
                console.error("TonConnectUI init error:", e);
                showToast("Wallet init failed: " + e.message);
            }
        } else {
            console.log("TonConnectUI not loaded after waiting");
            showToast("TonConnect not loaded. Refresh or check connection.");
        }
        initEventListeners();
        updateAllTranslations();
        renderSocialLinks();
        $("refLinkInput").value = "https://t.me/" + BOT_USERNAME + "?start=" + (tgUser ? tgUser.id : "ref");
        fetchNews();
        fetchCollectedGram();
        setInterval(fetchCollectedGram, 15000);
        loadHolders();
        setInterval(loadHolders, 25000);
        listenToBlockchainTransfers();
        loadOnChainFeed();
        setInterval(loadOnChainFeed, 30000);
        fetchTasks();
        if (tgUser) { $("pfName").textContent = tgUser.first_name + " " + (tgUser.last_name || ""); $("pfId").textContent = "@" + (tgUser.username || "unknown"); if (tgUser.photo_url) $("pfAvatar").src = tgUser.photo_url; }
    } catch (e) { console.log("Init error:", e); }
});
