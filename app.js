function $(id){return document.getElementById(id)}
function showToast(m){var e=$("toast");e.innerText=m;e.classList.add("show");setTimeout(function(){e.classList.remove("show")},3000)}
function openLink(u){if(window.Telegram&&Telegram.WebApp)Telegram.WebApp.openLink(u);else window.open(u,"_blank")}
function t(k){return(TR[curLang]&&TR[curLang][k])||(TR.en[k])||k}

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
    toast_error:"Error",toast_copied:"Copied!",toast_task_done:"Task completed!",
    toast_ref_copied:"Referral link copied!",toast_buy_success:"Transaction sent to wallet!",
    toast_connect_first:"Connect wallet first",toast_create_task:"Task created!",toast_create_news:"News published!",
    create_task:"Create Task",create_news:"Create News Post",task_title_ph:"Task title",task_reward_ph:"Token reward",task_link_ph:"Link (URL)",
    news_title_ph:"Title",news_text_ph:"Text",news_image_ph:"Image URL (optional)",
    support:"Support",support_sub:"@Superadminist",read_more:"Read more",read_less:"Show less",
    info_mason_sub:"WHITEPAPER",info_mason_title:"The Stone Masons of DeFi",
    info_mason_preview:"Born from the ancient guilds of digital builders, $MASON represents the foundational layer of decentralized pre-market trading. Like the master masons who constructed cathedrals that have stood for centuries, the MASON protocol is built on principles of transparency, permanence, and community trust.",
    info_mason_full:"Born from the ancient guilds of digital builders, $MASON represents the foundational layer of decentralized pre-market trading. Like the master masons who constructed cathedrals that have stood for centuries, the MASON protocol is built on principles of transparency, permanence, and community trust.\n\nEvery transaction is a brick. Every holder is a mason. Together, we build the cathedral of decentralized finance on the TON blockchain. The project was conceived by a collective of digital architects who believed that the future of decentralized finance needed a solid, unshakeable foundation.\n\n$MASON is not just a token \u2014 it is a declaration of intent. In a world of fleeting promises and vaporware, we choose to build with stone. Our pre-market phase offers early participants the chance to acquire $MASON before public DEX listing, at rates that reward those who lay the first stones.",
    info_mason_h1v:"Community",info_mason_h1l:"Driven",info_mason_h2v:"TON",info_mason_h2l:"Blockchain",
    info_mason_h3v:"Pre-Market",info_mason_h3l:"Early Access",info_mason_h4v:"Transparent",info_mason_h4l:"Governance",
    info_ape_sub:"WHITEPAPER",info_ape_title:"The Jungle Ambassador's Protocol",
    info_ape_preview:"In the untamed wilderness of cryptocurrency, the strongest tribe survives. $APE \u2014 the Ambassador's Protocol for Education \u2014 is more than a token. It's a movement born from the idea that financial literacy is the ultimate weapon against centralization.",
    info_ape_full:"In the untamed wilderness of cryptocurrency, the strongest tribe survives. $APE \u2014 the Ambassador's Protocol for Education \u2014 is more than a token. It's a movement born from the idea that financial literacy is the ultimate weapon against centralization.\n\nEach holder becomes a node in a global network of education, empowerment, and economic freedom. The jungle is lawless, but the tribe has rules: transparency, community first, and relentless growth. APE connects ambassadors across borders, creating an educational network where knowledge is the ultimate currency.\n\nWith an extraordinarily high token supply, $APE is designed for micro-transactions and mass accessibility. No one is priced out of the tribe. Every participant, regardless of portfolio size, has a voice and a stake in the protocol's future.",
    info_ape_h1v:"Global",info_ape_h1l:"Network",info_ape_h2v:"Education",info_ape_h2l:"Focused",
    info_ape_h3v:"Micro",info_ape_h3l:"Transactions",info_ape_h4v:"Community",info_ape_h4l:"Governed"
},
ru:{
    nav_home:"\u0413\u043b\u0430\u0432\u043d\u0430\u044f",nav_tasks:"\u0417\u0430\u0434\u0430\u043d\u0438\u044f",nav_refs:"\u0420\u0435\u0444\u0435\u0440\u0430\u043b\u044b",nav_feed:"\u041d\u043e\u0432\u043e\u0441\u0442\u0438",
    rate_label:"1 GRAM =",liq_label:"\u041f\u0443\u043b \u043b\u0438\u043a\u0432\u0438\u0434\u043d\u043e\u0441\u0442\u0438",liq_of:"\u0438\u0437",
    buy_mason:"\u041a\u0443\u043f\u0438\u0442\u044c $MASON",buy_ape:"\u041a\u0443\u043f\u0438\u0442\u044c $APE",
    profile_balance:"\u0411\u0430\u043b\u0430\u043d\u0441 GRAM",profile_refs:"\u0420\u0435\u0444\u0435\u0440\u0430\u043b\u044b",profile_connected:"\u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0451\u043d",
    tasks_title:"\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u044b\u0435 \u0437\u0430\u0434\u0430\u043d\u0438\u044f",tasks_empty:"\u0417\u0430\u0434\u0430\u043d\u0438\u0439 \u043f\u043e\u043a\u0430 \u043d\u0435\u0442",
    task_claim:"\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u044c",task_done:"\u0413\u043e\u0442\u043e\u0432\u043e",task_subscribe:"\u041f\u043e\u0434\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f",task_repost:"\u0420\u0435\u043f\u043e\u0441\u0442",task_link:"\u0421\u0441\u044b\u043b\u043a\u0430",task_income:"\u0414\u043e\u0445\u043e\u0434",
    refs_title:"\u0420\u0435\u0444\u0435\u0440\u0430\u043b\u044c\u043d\u0430\u044f \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0430",refs_earned:"\u0417\u0430\u0440\u0430\u0431\u043e\u0442\u0430\u043d\u043e GRAM",refs_count:"\u0420\u0435\u0444\u0435\u0440\u0430\u043b\u044b",refs_copy:"\u041a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c",refs_share:"\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f",
    feed_title:"\u041d\u043e\u0432\u0438\u043d\u0438 \u0438 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u044f",feed_empty:"\u041d\u043e\u0432\u0438\u043d\u043e\u043a \u043f\u043e\u043a\u0430 \u043d\u0435\u0442",
    admin_gram:"GRAM",admin_news:"\u041d\u043e\u0432\u043e\u0441\u0442\u0438",admin_tasks:"\u0417\u0430\u0434\u0430\u043d\u0438\u044f",
    admin_create_task:"+ \u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0437\u0430\u0434\u0430\u043d\u0438\u0435",admin_create_news:"+ \u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043d\u043e\u0432\u043e\u0441\u0442\u044c",
    admin_task_cost:"25 GRAM (\u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u043e \u0434\u043b\u044f \u0430\u0434\u043c\u0438\u043d\u0430)",admin_payments:"\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0435 \u043e\u043f\u043b\u0430\u0442\u044b",admin_publish:"\u041e\u043f\u0443\u0431\u043b\u0438\u043a\u043e\u0432\u0430\u0442\u044c \u0434\u043b\u044f \u0432\u0441\u0435\u0445",
    buy_modal_sub:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0443\u043c\u043c\u0443 \u0432 GRAM",buy_custom:"\u0421\u0443\u043c\u043c\u0430 (GRAM)",
    buy_preview:"\u0412\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u0435:",buy_success:"\u0422\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0438\u044f \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0430!",
    toast_error:"\u041e\u0448\u0438\u0431\u043a\u0430",toast_copied:"\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u043e!",toast_task_done:"\u0417\u0430\u0434\u0430\u043d\u0438\u0435 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043e!",
    toast_ref_copied:"\u0421\u0441\u044b\u043b\u043a\u0430 \u0441\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u0430!",toast_buy_success:"\u0422\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0438\u044f \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0430!",
    toast_connect_first:"\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u0435 \u043a\u043e\u0448\u0435\u043b\u0451\u043a",toast_create_task:"\u0417\u0430\u0434\u0430\u043d\u0438\u0435 \u0441\u043e\u0437\u0434\u0430\u043d\u043e!",toast_create_news:"\u041d\u043e\u0432\u043e\u0441\u0442\u044c \u043e\u043f\u0443\u0431\u043b\u0438\u043a\u043e\u0432\u0430\u043d\u0430!",
    create_task:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0437\u0430\u0434\u0430\u043d\u0438\u0435",create_news:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043d\u043e\u0432\u043e\u0441\u0442\u044c",task_title_ph:"\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a",task_reward_ph:"\u041d\u0430\u0433\u0440\u0430\u0434\u0430",task_link_ph:"\u0421\u0441\u044b\u043b\u043a\u0430",
    news_title_ph:"\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a",news_text_ph:"\u0422\u0435\u043a\u0441\u0442",news_image_ph:"URL \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f",
    support:"\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430",support_sub:"@Superadminist",read_more:"\u0427\u0438\u0442\u0430\u0442\u044c \u0434\u0430\u043b\u0435\u0435",read_less:"\u0421\u0432\u0435\u0440\u043d\u0443\u0442\u044c",
    info_mason_sub:"\u0412\u0410\u0419\u0422\u041f\u0415\u0419\u041f\u0415\u0420",info_mason_title:"\u041a\u0430\u043c\u0435\u043d\u043d\u044b\u0435 \u041c\u0430\u0441\u0442\u0435\u0440\u0430 DeFi",
    info_mason_preview:"\u0420\u043e\u0436\u0434\u0451\u043d\u043d\u044b\u0435 \u0438\u0437 \u0434\u0440\u0435\u0432\u043d\u0438\u0445 \u0433\u0438\u043b\u044c\u0434\u0438\u0439 \u0446\u0438\u0444\u0440\u043e\u0432\u044b\u0445 \u0441\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u0435\u0439, $MASON \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442 \u0444\u0443\u043d\u0434\u0430\u043c\u0435\u043d\u0442\u0430\u043b\u044c\u043d\u044b\u0439 \u0441\u043b\u043e\u0439 \u0434\u0435\u0446\u0435\u043d\u0442\u0440\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043d\u043d\u043e\u0439 \u043f\u0440\u0435\u0434\u0440\u044b\u043d\u043e\u0447\u043d\u043e\u0439 \u0442\u043e\u0440\u0433\u043e\u0432\u043b\u0438.",
    info_mason_full:"\u0420\u043e\u0436\u0434\u0451\u043d\u043d\u044b\u0435 \u0438\u0437 \u0434\u0440\u0435\u0432\u043d\u0438\u0445 \u0433\u0438\u043b\u044c\u0434\u0438\u0439 \u0446\u0438\u0444\u0440\u043e\u0432\u044b\u0445 \u0441\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u0435\u0439, $MASON \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442 \u0444\u0443\u043d\u0434\u0430\u043c\u0435\u043d\u0442\u0430\u043b\u044c\u043d\u044b\u0439 \u0441\u043b\u043e\u0439 \u0434\u0435\u0446\u0435\u043d\u0442\u0440\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043d\u043d\u043e\u0439 \u043f\u0440\u0435\u0434\u0440\u044b\u043d\u043e\u0447\u043d\u043e\u0439 \u0442\u043e\u0440\u0433\u043e\u0432\u043b\u0438. \u041a\u0430\u0436\u0434\u0430\u044f \u0442\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0438\u044f \u2014 \u044d\u0442\u043e \u043a\u0438\u0440\u043f\u0438\u0447. \u041a\u0430\u0436\u0434\u044b\u0439 \u0434\u0435\u0440\u0436\u0430\u0442\u0435\u043b\u044c \u2014 \u043a\u0430\u043c\u0435\u043d\u0449\u0438\u043a. \u0412\u043c\u0435\u0441\u0442\u0435 \u043c\u044b \u0441\u0442\u0440\u043e\u0438\u043c \u0441\u043e\u0431\u043e\u0440 \u0434\u0435\u0446\u0435\u043d\u0442\u0440\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043d\u043d\u044b\u0445 \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432 \u043d\u0430 \u0431\u043b\u043e\u043a\u0447\u0435\u0439\u043d\u0435 TON.",
    info_mason_h1v:"\u0421\u043e\u043e\u0431\u0449\u0435\u0441\u0442\u0432\u043e",info_mason_h1l:"\u0414\u0440\u0430\u0439\u0432",info_mason_h2v:"TON",info_mason_h2l:"\u0411\u043b\u043e\u043a\u0447\u0435\u0439\u043d",
    info_mason_h3v:"Pre-Market",info_mason_h3l:"\u0420\u0430\u043d\u043d\u0438\u0439 \u0434\u043e\u0441\u0442\u0443\u043f",info_mason_h4v:"\u041f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u043e\u0435",info_mason_h4l:"\u0423\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435",
    info_ape_sub:"\u0412\u0410\u0419\u0422\u041f\u0415\u0419\u041f\u0415\u0420",info_ape_title:"\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0410\u043c\u0431\u0430\u0441\u0441\u0430\u0434\u043e\u0440\u043e\u0432",
    info_ape_preview:"\u0412 \u0434\u0438\u043a\u0438\u0445 \u0434\u0436\u0443\u043d\u0433\u043b\u044f\u0445 \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442 \u0432\u044b\u0436\u0438\u0432\u0430\u0435\u0442 \u0441\u0438\u043b\u044c\u043d\u0435\u0439\u0448\u0435\u0435 \u043f\u043b\u0435\u043c\u044f. $APE \u2014 \u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0410\u043c\u0431\u0430\u0441\u0441\u0430\u0434\u043e\u0440\u043e\u0432 \u041e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u044f.",
    info_ape_full:"\u0412 \u0434\u0438\u043a\u0438\u0445 \u0434\u0436\u0443\u043d\u0433\u043b\u044f\u0445 \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442 \u0432\u044b\u0436\u0438\u0432\u0430\u0435\u0442 \u0441\u0438\u043b\u044c\u043d\u0435\u0439\u0448\u0435\u0435 \u043f\u043b\u0435\u043c\u044f. $APE \u2014 \u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0410\u043c\u0431\u0430\u0441\u0441\u0430\u0434\u043e\u0440\u043e\u0432 \u041e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u044f \u2014 \u044d\u0442\u043e \u0431\u043e\u043b\u0435\u0435 \u0447\u0435\u043c \u0442\u043e\u043a\u0435\u043d. \u042d\u0442\u043e \u0434\u0432\u0438\u0436\u0435\u043d\u0438\u0435, \u0440\u043e\u0436\u0434\u0451\u043d\u043d\u043e\u0435 \u0438\u0434\u0435\u0435\u0439 \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u043e\u0439 \u0433\u0440\u0430\u043c\u043e\u0442\u043d\u043e\u0441\u0442\u0438.",
    info_ape_h1v:"\u0413\u043b\u043e\u0431\u0430\u043b\u044c\u043d\u0430\u044f",info_ape_h1l:"\u0421\u0435\u0442\u044c",info_ape_h2v:"\u041e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u0435",info_ape_h2l:"\u0424\u043e\u043a\u0443\u0441",
    info_ape_h3v:"\u041c\u0438\u043a\u0440\u043e",info_ape_h3l:"\u0422\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0438\u0438",info_ape_h4v:"\u0421\u043e\u043e\u0431\u0449\u0435\u0441\u0442\u0432\u043e",info_ape_h4l:"\u0423\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435"
},
uk:{
    nav_home:"\u0413\u043e\u043b\u043e\u0432\u043d\u0430",nav_tasks:"\u0417\u0430\u0432\u0434\u0430\u043d\u043d\u044f",nav_refs:"\u0420\u0435\u0444\u0435\u0440\u0430\u043b\u0438",nav_feed:"\u041d\u043e\u0432\u0438\u043d\u0438",
    rate_label:"1 GRAM =",liq_label:"\u041f\u0443\u043b \u043b\u0456\u043a\u0432\u0456\u0434\u043d\u043e\u0441\u0442\u0456",liq_of:"\u0437",
    buy_mason:"\u041a\u0443\u043f\u0438\u0442\u0438 $MASON",buy_ape:"\u041a\u0443\u043f\u0438\u0442\u0438 $APE",
    profile_balance:"\u0411\u0430\u043b\u0430\u043d\u0441 GRAM",profile_refs:"\u0420\u0435\u0444\u0435\u0440\u0430\u043b\u0438",profile_connected:"\u041f\u0456\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u043e",
    tasks_title:"\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u0456 \u0437\u0430\u0432\u0434\u0430\u043d\u043d\u044f",tasks_empty:"\u0417\u0430\u0432\u0434\u0430\u043d\u044c \u043f\u043e\u043a\u0438 \u043d\u0435\u043c\u0430\u0454",
    task_claim:"\u041e\u0442\u0440\u0438\u043c\u0430\u0442\u0438",task_done:"\u0413\u043e\u0442\u043e\u0432\u043e",task_subscribe:"\u041f\u0456\u0434\u043f\u0438\u0441\u0430\u0442\u0438\u0441\u044f",task_repost:"\u0420\u0435\u043f\u043e\u0441\u0442",task_link:"\u041f\u043e\u0441\u0438\u043b\u0430\u043d\u043d\u044f",task_income:"\u0414\u043e\u0445\u0456\u0434",
    refs_title:"\u0420\u0435\u0444\u0435\u0440\u0430\u043b\u044c\u043d\u0430 \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u0430",refs_earned:"\u0417\u0430\u0440\u043e\u0431\u043b\u0435\u043d\u043e GRAM",refs_count:"\u0420\u0435\u0444\u0435\u0440\u0430\u043b\u0438",refs_copy:"\u041a\u043e\u043f\u0456\u044e\u0432\u0430\u0442\u0438",refs_share:"\u041f\u043e\u0434\u0456\u043b\u0438\u0442\u0438\u0441\u044f",
    feed_title:"\u041d\u043e\u0432\u0438\u043d\u0438 \u0442\u0430 \u043e\u043d\u043e\u0432\u043b\u0435\u043d\u043d\u044f",feed_empty:"\u041d\u043e\u0432\u0438\u043d \u043f\u043e\u043a\u0438 \u043d\u0435\u043c\u0430\u0454",
    admin_gram:"GRAM",admin_news:"\u041d\u043e\u0432\u0438\u043d\u0438",admin_tasks:"\u0417\u0430\u0432\u0434\u0430\u043d\u043d\u044f",
    admin_create_task:"+ \u0421\u0442\u0432\u043e\u0440\u0438\u0442\u0438 \u0437\u0430\u0432\u0434\u0430\u043d\u043d\u044f",admin_create_news:"+ \u0421\u0442\u0432\u043e\u0440\u0438\u0442\u0438 \u043d\u043e\u0432\u0438\u043d\u0443",
    admin_task_cost:"25 GRAM (\u0431\u0435\u0437\u043a\u043e\u0448\u0442\u043e\u0432\u043d\u043e)",admin_payments:"\u041e\u0441\u0442\u0430\u043d\u043d\u0456 \u043e\u043f\u043b\u0430\u0442\u0438",admin_publish:"\u041e\u043f\u0443\u0431\u043b\u0456\u043a\u0443\u0432\u0430\u0442\u0438 \u0434\u043b\u044f \u0432\u0441\u0456\u0445",
    buy_modal_sub:"\u041e\u0431\u0435\u0440\u0456\u0442\u044c \u0441\u0443\u043c\u0443 \u0432 GRAM",buy_custom:"\u0421\u0443\u043c\u0430 (GRAM)",
    buy_preview:"\u0412\u0438 \u043e\u0442\u0440\u0438\u043c\u0430\u0454\u0442\u0435:",buy_success:"\u0422\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0456\u044e \u0432\u0456\u0434\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e!",
    toast_error:"\u041f\u043e\u043c\u0438\u043b\u043a\u0430",toast_copied:"\u0421\u043a\u043e\u043f\u0456\u0439\u043e\u0432\u0430\u043d\u043e!",toast_task_done:"\u0412\u0438\u043a\u043e\u043d\u0430\u043d\u043e!",
    toast_ref_copied:"\u041f\u043e\u0441\u0438\u043b\u0430\u043d\u043d\u044f \u0441\u043a\u043e\u043f\u0456\u0439\u043e\u0432\u0430\u043d\u043e!",toast_buy_success:"\u0422\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0456\u044e \u0432\u0456\u0434\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e!",
    toast_connect_first:"\u041f\u0456\u0434\u043a\u043b\u044e\u0447\u0456\u0442\u044c \u0433\u0430\u043c\u0430\u043d\u0435\u0446\u044c",toast_create_task:"\u0417\u0430\u0432\u0434\u0430\u043d\u043d\u044f \u0441\u0442\u0432\u043e\u0440\u0435\u043d\u043e!",toast_create_news:"\u041d\u043e\u0432\u0438\u043d\u0443 \u043e\u043f\u0443\u0431\u043b\u0456\u043a\u043e\u0432\u0430\u043d\u043e!",
    create_task:"\u0421\u0442\u0432\u043e\u0440\u0438\u0442\u0438 \u0437\u0430\u0432\u0434\u0430\u043d\u043d\u044f",create_news:"\u0421\u0442\u0432\u043e\u0440\u0438\u0442\u0438 \u043d\u043e\u0432\u0438\u043d\u0443",task_title_ph:"\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a",task_reward_ph:"\u041d\u0430\u0433\u043e\u0440\u043e\u0434\u0430",task_link_ph:"\u041f\u043e\u0441\u0438\u043b\u0430\u043d\u043d\u044f",
    news_title_ph:"\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a",news_text_ph:"\u0422\u0435\u043a\u0441\u0442",news_image_ph:"URL \u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u043d\u044f",
    support:"\u041f\u0456\u0434\u0442\u0440\u0438\u043c\u043a\u0430",support_sub:"@Superadminist",read_more:"\u0427\u0438\u0442\u0430\u0442\u0438 \u0434\u0430\u043b\u0456",read_less:"\u0417\u0433\u043e\u0440\u043d\u0443\u0442\u0438",
    info_mason_sub:"\u0412\u0410\u0419\u0422\u041f\u0415\u0419\u041f\u0415\u0420",info_mason_title:"\u041a\u0430\u043c\u0456\u043d\u043d\u0456 \u041c\u0430\u0439\u0441\u0442\u0440\u0438 DeFi",
    info_mason_preview:"\u041d\u0430\u0440\u043e\u0434\u0436\u0435\u043d\u0456 \u0437 \u0434\u0430\u0432\u043d\u0456\u0445 \u0433\u0456\u043b\u044c\u0434\u0456\u0439 \u0446\u0438\u0444\u0440\u043e\u0432\u0438\u0445 \u0431\u0443\u0434\u0456\u0432\u0435\u043b\u044c\u043d\u0438\u043a\u0456\u0432, $MASON \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043b\u044f\u0454 \u0444\u0443\u043d\u0434\u0430\u043c\u0435\u043d\u0442\u0430\u043b\u044c\u043d\u0438\u0439 \u0448\u0430\u0440 \u043f\u0435\u0440\u0435\u0434\u0440\u0438\u043d\u043a\u043e\u0432\u043e\u0457 \u0442\u043e\u0440\u0433\u0456\u0432\u043b\u0456.",
    info_mason_full:"\u041d\u0430\u0440\u043e\u0434\u0436\u0435\u043d\u0456 \u0437 \u0434\u0430\u0432\u043d\u0456\u0445 \u0433\u0456\u043b\u044c\u0434\u0456\u0439 \u0446\u0438\u0444\u0440\u043e\u0432\u0438\u0445 \u0431\u0443\u0434\u0456\u0432\u0435\u043b\u044c\u043d\u0438\u043a\u0456\u0432, $MASON \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043b\u044f\u0454 \u0444\u0443\u043d\u0434\u0430\u043c\u0435\u043d\u0442\u0430\u043b\u044c\u043d\u0438\u0439 \u0448\u0430\u0440 \u043f\u0435\u0440\u0435\u0434\u0440\u0438\u043d\u043a\u043e\u0432\u043e\u0457 \u0442\u043e\u0440\u0433\u0456\u0432\u043b\u0456. \u041a\u043e\u0436\u043d\u0430 \u0442\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0456\u044f \u2014 \u0446\u0435 \u043a\u0438\u0440\u043f\u0438\u0446\u044f.",
    info_mason_h1v:"\u0421\u043f\u0456\u043b\u044c\u043d\u043e\u0442\u0430",info_mason_h1l:"\u0414\u0440\u0430\u0439\u0432",info_mason_h2v:"TON",info_mason_h2l:"\u0411\u043b\u043e\u043a\u0447\u0435\u0439\u043d",
    info_mason_h3v:"Pre-Market",info_mason_h3l:"\u0420\u0430\u043d\u043d\u0456\u0439 \u0434\u043e\u0441\u0442\u0443\u043f",info_mason_h4v:"\u041f\u0440\u043e\u0437\u043e\u0440\u0438\u0441\u0442\u044c",info_mason_h4l:"\u0423\u043f\u0440\u0430\u0432\u043b\u0456\u043d\u043d\u044f",
    info_ape_sub:"\u0412\u0410\u0419\u0422\u041f\u0415\u0419\u041f\u0415\u0420",info_ape_title:"\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0410\u043c\u0431\u0430\u0441\u0430\u0434\u043e\u0440\u0456\u0432",
    info_ape_preview:"\u0423 \u0434\u0438\u043a\u0438\u0445 \u0434\u0436\u0443\u043d\u0433\u043b\u044f\u0445 \u0432\u0438\u0436\u0438\u0432\u0430\u0454 \u043d\u0430\u0439\u0441\u0438\u043b\u044c\u043d\u0456\u0448\u0435 \u043f\u043b\u0435\u043c\u044f. $APE \u2014 \u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0410\u043c\u0431\u0430\u0441\u0430\u0434\u043e\u0440\u0456\u0432 \u041e\u0441\u0432\u0456\u0442\u0438.",
    info_ape_full:"\u0423 \u0434\u0438\u043a\u0438\u0445 \u0434\u0436\u0443\u043d\u0433\u043b\u044f\u0445 \u0432\u0438\u0436\u0438\u0432\u0430\u0454 \u043d\u0430\u0439\u0441\u0438\u043b\u044c\u043d\u0456\u0448\u0435 \u043f\u043b\u0435\u043c\u044f. $APE \u2014 \u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0410\u043c\u0431\u0430\u0441\u0430\u0434\u043e\u0440\u0456\u0432 \u041e\u0441\u0432\u0456\u0442\u0438 \u2014 \u0446\u0435 \u0431\u0456\u043b\u044c\u0448\u0435 \u043d\u0456\u0436 \u0442\u043e\u043a\u0435\u043d.",
    info_ape_h1v:"\u0413\u043b\u043e\u0431\u0430\u043b\u044c\u043d\u0430",info_ape_h1l:"\u041c\u0435\u0440\u0435\u0436\u0430",info_ape_h2v:"\u041e\u0441\u0432\u0456\u0442\u0430",info_ape_h2l:"\u0424\u043e\u043a\u0443\u0441",
    info_ape_h3v:"\u041c\u0456\u043a\u0440\u043e",info_ape_h3l:"\u0422\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0456\u0457",info_ape_h4v:"\u0421\u043f\u0456\u043b\u044c\u043d\u043e\u0442\u0430",info_ape_h4l:"\u0423\u043f\u0440\u0430\u0432\u043b\u0456\u043d\u043d\u044f"
},tr:{
    nav_home:"Ana Sayfa",nav_tasks:"Gorevler",nav_refs:"Referanslar",nav_feed:"Haberler",
    rate_label:"1 GRAM =",liq_label:"Likidite Havuzu",buy_mason:"$MASON Satin Al",buy_ape:"$APE Satin Al",
    profile_balance:"GRAN Bakiyesi",profile_refs:"Referanslar",profile_connected:"Bagli",
    tasks_title:"Mevcut Gorevler",tasks_empty:"Henuz gorev yok",
    task_claim:"Talep Et",task_done:"Tamamlandi",task_subscribe:"Abone Ol",task_repost:"Paylas",task_link:"Baglanti",task_income:"Gelir",
    refs_title:"Referans Programi",refs_earned:"Kazanilan GRAM",refs_count:"Referanslar",refs_copy:"Kopyala",refs_share:"Paylas",
    feed_title:"Haberler",feed_empty:"Henuz haber yok",
    admin_gram:"GRAM",admin_news:"Haberler",admin_tasks:"Gorevler",
    admin_create_task:"+ Gorev Olustur",admin_create_news:"+ Haber Olustur",
    admin_task_cost:"25 GRAM (admin ucretsiz)",admin_payments:"Son Odemeler",admin_publish:"Tumune Yayinla",
    buy_modal_sub:"GRAN miktari secin",buy_custom:"Miktar (GRAM)",buy_preview:"Alacaginiz:",buy_success:"Islem gonderildi!",
    toast_error:"Hata",toast_copied:"Kopyalandi!",toast_task_done:"Gorev tamamlandi!",
    toast_ref_copied:"Referans kopyalandi!",toast_buy_success:"Islem gonderildi!",
    toast_connect_first:"Once cuzdani baglayin",toast_create_task:"Gorev olusturuldu!",toast_create_news:"Haber yayinlandi!",
    create_task:"Gorev Olustur",create_news:"Haber Olustur",task_title_ph:"Gorev basligi",task_reward_ph:"Token odulu",task_link_ph:"Baglanti",
    news_title_ph:"Baslik",news_text_ph:"Metin",news_image_ph:"Gorsel URL",
    support:"Destek",support_sub:"@Superadminist",read_more:"Daha fazla",read_less:"Daha az",
    info_mason_sub:"BEYAZ KAGIT",info_mason_title:"DeFi Taslari",
    info_mason_preview:"Dijital insaat ustalarinin kadim loncalarindan dogan $MASON, merkeziyetsiz on-piyasa ticaretinin temel katmanini temsil eder.",
    info_mason_full:"Dijital insaat ustalarinin kadim loncalarindan dogan $MASON, merkeziyetsiz on-piyasa ticaretinin temel katmanini temsil eder. Her islem bir tuğla. Her sahibi bir usta. Birlikte TON blockchain'inde merkeziyetsiz finansin katedralini insaa ediyoruz.",
    info_mason_h1v:"Topluluk",info_mason_h1l:"Surukleme",info_mason_h2v:"TON",info_mason_h2l:"Blockchain",
    info_mason_h3v:"Pre-Market",info_mason_h3l:"Erken Erisim",info_mason_h4v:"Seffaf",info_mason_h4l:"Yonetim",
    info_ape_sub:"BEYAZ KAGIT",info_ape_title:"Büyükelçiler Protokolü",
    info_ape_preview:"Kripto para vahsi dogasinda en guclu kabile hayatta kalir. $APE, finansal okuryazarligin merkezilesmeye karsi nihai silah olduguna inanan bir harekettir.",
    info_ape_full:"Kripto para vahsi dogasinda en guclu kabile hayatta kalir. $APE, finansal okuryazarligin merkezilesmeye karsi nihai silah olduguna inanan bir harekettir. Her sahibi bir agin dugumu olur. Kabile kurallari: seffaflik, topluluk oncelikli ve durmaksizin buyume.",
    info_ape_h1v:"Kuresel",info_ape_h1l:"Ag",info_ape_h2v:"Egitim",info_ape_h2l:"Odakli",
    info_ape_h3v:"Mikro",info_ape_h3l:"Islemler",info_ape_h4v:"Topluluk",info_ape_h4l:"Yonetim"
},ar:{
    nav_home:"\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629",nav_tasks:"\u0627\u0644\u0645\u0647\u0627\u0645",nav_refs:"\u0627\u0644\u0625\u062d\u0627\u0644\u0627\u062a",nav_feed:"\u0627\u0644\u0623\u062e\u0628\u0627\u0631",
    rate_label:"1 GRAM =",liq_label:"\u062a\u062c\u0645\u0639 \u0627\u0644\u0633\u064a\u0648\u0644\u0629",buy_mason:"\u0634\u0631\u0627\u0621 $MASON",buy_ape:"\u0634\u0631\u0627\u0621 $APE",
    profile_balance:"\u0631\u0635\u064a\u062f GRAM",profile_refs:"\u0627\u0644\u0625\u062d\u0627\u0644\u0627\u062a",profile_connected:"\u0645\u062a\u0635\u0644",
    tasks_title:"\u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u062a\u0627\u062d\u0629",tasks_empty:"\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0647\u0627\u0645 \u0628\u0639\u062f",
    task_claim:"\u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0629",task_done:"\u0645\u0643\u062a\u0645\u0644",task_subscribe:"\u0627\u0634\u062a\u0631\u0627\u0643",task_repost:"\u0645\u0634\u0627\u0631\u0643\u0629",task_link:"\u0631\u0627\u0628\u0637",task_income:"\u0627\u0644\u062f\u062e\u0644",
    refs_title:"\u0628\u0631\u0646\u0627\u0645\u062c \u0627\u0644\u0625\u062d\u0627\u0644\u0629",refs_earned:"GRAM \u0627\u0644\u0645\u0643\u062a\u0633\u0628\u0629",refs_count:"\u0627\u0644\u0625\u062d\u0627\u0644\u0627\u062a",refs_copy:"\u0646\u0633\u062e",refs_share:"\u0645\u0634\u0627\u0631\u0643\u0629",
    feed_title:"\u0627\u0644\u0623\u062e\u0628\u0627\u0631",feed_empty:"\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u062e\u0628\u0627\u0631",
    admin_gram:"GRAM",admin_news:"\u0623\u062e\u0628\u0627\u0631",admin_tasks:"\u0645\u0647\u0627\u0645",
    admin_create_task:"+ \u0625\u0646\u0634\u0627\u0621 \u0645\u0647\u0645\u0629",admin_create_news:"+ \u0625\u0646\u0634\u0627\u0621 \u062e\u0628\u0631",
    admin_task_cost:"25 GRAM (\u0645\u062c\u0627\u0646\u064a)",admin_payments:"\u0627\u0644\u0645\u062f\u0641\u0648\u0639\u0627\u062a",admin_publish:"\u0646\u0634\u0631 \u0644\u0644\u062c\u0645\u064a\u0639",
    buy_modal_sub:"\u0627\u062e\u062a\u0631 \u0627\u0644\u0645\u0628\u0644\u063a",buy_custom:"\u0645\u0628\u0644\u063a (GRAM)",buy_preview:"\u0633\u062a\u062d\u0635\u0644 \u0639\u0644\u0649:",buy_success:"\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0629!",
    toast_error:"\u062e\u0637\u0623",toast_copied:"\u062a\u0645 \u0627\u0644\u0646\u0633\u062e!",toast_task_done:"\u062a\u0645 \u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u0645\u0647\u0645\u0629!",
    toast_ref_copied:"\u062a\u0645 \u0646\u0633\u062e \u0627\u0644\u0631\u0627\u0628\u0637!",toast_buy_success:"\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0629!",
    toast_connect_first:"\u0627\u0631\u0628\u0637 \u0627\u0644\u0645\u062d\u0641\u0638\u0629 \u0623\u0648\u0644\u0627\u064b",toast_create_task:"\u062a\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0647\u0645\u0629!",toast_create_news:"\u062a\u0645 \u0646\u0634\u0631 \u0627\u0644\u062e\u0628\u0631!",
    create_task:"\u0625\u0646\u0634\u0627\u0621 \u0645\u0647\u0645\u0629",create_news:"\u0625\u0646\u0634\u0627\u0621 \u062e\u0628\u0631",task_title_ph:"\u0639\u0646\u0648\u0627\u0646",task_reward_ph:"\u0645\u0643\u0627\u0641\u0623\u0629",task_link_ph:"\u0627\u0644\u0631\u0627\u0628\u0637",
    news_title_ph:"\u0627\u0644\u0639\u0646\u0648\u0627\u0646",news_text_ph:"\u0627\u0644\u0646\u0635",news_image_ph:"\u0631\u0627\u0628\u0637 \u0627\u0644\u0635\u0648\u0631\u0629",
    support:"\u0627\u0644\u062f\u0639\u0645",support_sub:"@Superadminist",read_more:"\u0642\u0631\u0627\u0621\u0629 \u0623\u0643\u062b\u0631",read_less:"\u0639\u0631\u0636 \u0623\u0642\u0644"
},zh:{
    nav_home:"\u9996\u9875",nav_tasks:"\u4efb\u52a1",nav_refs:"\u63a8\u8350",nav_feed:"\u52a8\u6001",
    rate_label:"1 GRAM =",liq_label:"\u6d41\u52a8\u6027\u6c60",buy_mason:"\u8d2d\u4e70 $MASON",buy_ape:"\u8d2d\u4e70 $APE",
    profile_balance:"GRAM \u4f59\u989d",profile_refs:"\u63a8\u8350\u4eba\u6570",profile_connected:"\u5df2\u8fde\u63a5",
    tasks_title:"\u53ef\u7528\u4efb\u52a1",tasks_empty:"\u6682\u65e0\u4efb\u52a1",
    task_claim:"\u9886\u53d6",task_done:"\u5b8c\u6210",task_subscribe:"\u8ba2\u9605",task_repost:"\u8f6c\u53d1",task_link:"\u94fe\u63a5",task_income:"\u6536\u5165",
    refs_title:"\u63a8\u8350\u8ba1\u5212",refs_earned:"\u5df2\u8d5a\u53d6 GRAM",refs_count:"\u63a8\u8350\u4eba\u6570",refs_copy:"\u590d\u5236",refs_share:"\u5206\u4eab\u94fe\u63a5",
    feed_title:"\u65b0\u95fb\u4e0e\u66f4\u65b0",feed_empty:"\u6682\u65e0\u65b0\u95fb",
    admin_gram:"GRAM",admin_news:"\u65b0\u95fb",admin_tasks:"\u4efb\u52a1",
    admin_create_task:"+ \u521b\u5efa\u4efb\u52a1",admin_create_news:"+ \u521b\u5efa\u65b0\u95fb",
    admin_task_cost:"25 GRAM (\u7ba1\u7406\u5458\u514d\u8d39)",admin_payments:"\u6700\u8fd1\u652f\u4ed8",admin_publish:"\u53d1\u5e03\u7ed9\u6240\u6709\u4eba",
    buy_modal_sub:"\u9009\u62e9 GRAM \u91d1\u989d",buy_custom:"\u81ea\u5b9a\u4e49\u91d1\u989d",buy_preview:"\u60a8\u5c06\u83b7\u5f97:",buy_success:"\u4ea4\u6613\u5df2\u53d1\u9001!",
    toast_error:"\u9519\u8bef",toast_copied:"\u5df2\u590d\u5236!",toast_task_done:"\u4efb\u52a1\u5df2\u5b8c\u6210!",
    toast_ref_copied:"\u63a8\u8350\u94fe\u63a5\u5df2\u590d\u5236!",toast_buy_success:"\u4ea4\u6613\u5df2\u53d1\u9001!",
    toast_connect_first:"\u8bf7\u5148\u8fde\u63a5\u94b1\u5305",toast_create_task:"\u4efb\u52a1\u5df2\u521b\u5efa!",toast_create_news:"\u65b0\u95fb\u5df2\u53d1\u5e03!",
    create_task:"\u521b\u5efa\u4efb\u52a1",create_news:"\u521b\u5efa\u65b0\u95fb",task_title_ph:"\u4efb\u52a1\u6807\u9898",task_reward_ph:"\u4ee3\u5e01\u5956\u52b1",task_link_ph:"\u94fe\u63a5",
    news_title_ph:"\u6807\u9898",news_text_ph:"\u5185\u5bb9",news_image_ph:"\u56fe\u7247\u94fe\u63a5",
    support:"\u5ba2\u670d",support_sub:"@Superadminist",read_more:"\u9605\u8bfb\u66f4\u591a",read_less:"\u6536\u8d77"
},hi:{
    nav_home:"\u0939\u094b\u092e",nav_tasks:"\u0915\u093e\u0930\u094d\u092f",nav_refs:"\u0930\u0947\u092b\u0930\u0932",nav_feed:"\u092b\u0940\u0921",
    rate_label:"1 GRAM =",liq_label:"\u0932\u093f\u0915\u094d\u0935\u093f\u0921\u093f\u091f\u0940 \u092a\u0942\u0932",buy_mason:"$MASON \u0916\u0930\u0940\u0926\u0947\u0902",buy_ape:"$APE \u0916\u0930\u0940\u0926\u0947\u0902",
    profile_balance:"GRAN \u092c\u0948\u0932\u0947\u0902\u0938",profile_refs:"\u0930\u0947\u092b\u0930\u0932",profile_connected:"\u0915\u0928\u0947\u0915\u094d\u091f\u0947\u0921",
    tasks_title:"\u0909\u092a\u0932\u092c\u094d\u0927 \u0915\u093e\u0930\u094d\u092f",tasks_empty:"\u0905\u092d\u0940 \u0915\u094b\u0908 \u0915\u093e\u0930\u094d\u092f \u0928\u0939\u0940\u0902",
    task_claim:"\u0926\u093e\u0935\u093e \u0915\u0930\u0947\u0902",task_done:"\u092a\u0942\u0930\u094d\u0923",task_subscribe:"\u0938\u0926\u0938\u094d\u092f\u0924\u093e",task_repost:"\u0936\u0947\u092f\u0930",task_link:"\u0932\u093f\u0902\u0915",task_income:"\u0906\u092f",
    refs_title:"\u0930\u0947\u092b\u0930\u0932 \u092f\u094b\u091c\u0928\u093e",refs_earned:"GRAM \u0915\u092e\u093e\u092f\u093e",refs_count:"\u0930\u0947\u092b\u0930\u0932",refs_copy:"\u0915\u0949\u092a\u0940",refs_share:"\u0936\u0947\u092f\u0930 \u0932\u093f\u0902\u0915",
    feed_title:"\u0938\u092e\u093e\u091a\u093e\u0930 \u0914\u0930 \u0905\u092a\u0921\u0947\u091f",feed_empty:"\u0905\u092d\u0940 \u0938\u092e\u093e\u091a\u093e\u0930 \u0928\u0939\u0940\u0902",
    admin_gram:"GRAM",admin_news:"\u0938\u092e\u093e\u091a\u093e\u0930",admin_tasks:"\u0915\u093e\u0930\u094d\u092f",
    admin_create_task:"+ \u0915\u093e\u0930\u094d\u092f \u092c\u0928\u093e\u090f\u0902",admin_create_news:"+ \u0938\u092e\u093e\u091a\u093e\u0930 \u092c\u0928\u093e\u090f\u0902",
    admin_task_cost:"25 GRAM (\u092e\u0941\u092b\u094d\u0924)",admin_payments:"\u0939\u093e\u0932 \u0915\u093e \u092d\u0941\u0917\u0924\u093e\u0930",admin_publish:"\u0938\u092d\u0940 \u0915\u094b \u092a\u094d\u0930\u0915\u093e\u0936\u093f\u0924",
    buy_modal_sub:"\u0930\u093e\u0936\u093f \u091a\u0941\u0928\u0947\u0902",buy_custom:"\u0915\u0938\u094d\u091f\u092e \u0930\u093e\u0936\u093f",buy_preview:"\u0906\u092a\u0915\u094b \u092e\u093f\u0932\u0947\u0917\u093e:",buy_success:"\u0932\u0947\u0928\u0926\u0947\u0928 \u092d\u0947\u091c\u093e \u0917\u092f\u093e!",
    toast_error:"\u0924\u094d\u0930\u0941\u091f\u093f",toast_copied:"\u0915\u0949\u092a\u0940 \u0939\u094b\u0902\u0917\u093e!",toast_task_done:"\u0915\u093e\u0930\u094d\u092f \u092a\u0942\u0930\u094d\u0923!",
    toast_ref_copied:"\u0932\u093f\u0902\u0915 \u0915\u0949\u092a\u0940!",toast_buy_success:"\u0932\u0947\u0928\u0926\u0947\u0928 \u092d\u0947\u091c\u093e \u0917\u092f\u093e!",
    toast_connect_first:"\u092a\u0939\u0932\u0947 \u0935\u0949\u0932\u0947\u091f \u0915\u0928\u0947\u0915\u094d\u091f \u0915\u0930\u0947\u0902",toast_create_task:"\u0915\u093e\u0930\u094d\u092f \u092c\u0928\u093e\u092f\u093e!",toast_create_news:"\u0938\u092e\u093e\u091a\u093e\u0930 \u092a\u094d\u0930\u0915\u093e\u0936\u093f\u0924!",
    create_task:"\u0915\u093e\u0930\u094d\u092f \u092c\u0928\u093e\u090f\u0902",create_news:"\u0938\u092e\u093e\u091a\u093e\u0930 \u092c\u0928\u093e\u090f\u0902",task_title_ph:"\u0936\u0940\u0930\u094d\u0937\u0915",task_reward_ph:"\u091f\u094b\u0915\u0928 \u092a\u0941\u0930\u0938\u094d\u0915\u093e\u0930",task_link_ph:"\u0932\u093f\u0902\u0915",
    news_title_ph:"\u0936\u0940\u0930\u094d\u0937\u0915",news_text_ph:"\u092a\u093e\u0920",news_image_ph:"\u091a\u093f\u0924\u094d\u0930 URL",
    support:"\u0938\u092a\u094b\u0930\u094d\u091f",support_sub:"@Superadminist",read_more:"\u0914\u0930 \u092a\u0922\u093c\u0947\u0902",read_less:"\u0915\u092e \u0926\u093f\u0916\u093e\u090f\u0902"
}
};

var LANG_NAMES={en:"EN",ru:"RU",uk:"UA",tr:"TR",ar:"AR",zh:"ZH",hi:"HI"};

function renderLangSwitcher(){var h="";LANGS.forEach(function(l){h+='<button class="lang-btn'+(l===curLang?" active":"")+'" onclick="switchLang(\''+l+'\')">'+LANG_NAMES[l]+'</button>'});$("langSwitcher").innerHTML=h}
function switchLang(l){curLang=l;renderLangSwitcher();updateAllTranslations()}

function updateAllTranslations(){
    var ids={navHomeLbl:"nav_home",navTasksLbl:"nav_tasks",navRefsLbl:"nav_refs",navFeedLbl:"feed_title",
        rateLabel:"rate_label",liqLabel:"liq_label",pfBalanceLbl:"profile_balance",pfRefsLbl:"profile_refs",pfStatus:"profile_connected",
        tasksTitle:"tasks_title",refsTitle:"refs_title",refCountLbl:"refs_count",refEarnedLbl:"refs_earned",refCopyBtn:"refs_copy",refShareBtn:"refs_share",
        feedTitle:"feed_title",adminBalanceLbl:"admin_gram",adminNewsLbl:"admin_news",adminTaskLbl:"admin_tasks",
        adminCreateTaskLbl:"admin_create_task",adminCreateTaskCost:"admin_task_cost",adminCreateNewsLbl:"admin_create_news",adminPublishLbl:"admin_publish",adminPaymentsLbl:"admin_payments",
        supportName:"support",supportSub:"support_sub"};
    for(var id in ids){var el=$(id);if(el)el.textContent=t(ids[id])}
    $("buyBtnText").textContent=curToken==="mason"?t("buy_mason"):t("buy_ape");
    $("infoSubtitle").textContent=t("info_"+curToken+"_sub");
    $("infoTitle").textContent=t("info_"+curToken+"_title");
    $("infoPreview").textContent=t("info_"+curToken+"_preview");
    $("infoFull").textContent=t("info_"+curToken+"_full");
    $("infoToggle").textContent=t("read_more");
    var hl=$("infoHighlights");hl.innerHTML="";
    for(var i=1;i<=4;i++){hl.innerHTML+='<div class="info-highlight"><div class="ih-val">'+t("info_"+curToken+"_h"+i+"v")+'</div><div class="ih-lbl">'+t("info_"+curToken+"_h"+i+"l")+'</div></div>'}
    $("buyModalTitle").textContent=curToken==="mason"?"Buy $MASON":"Buy $APE";
    $("buyModalSub").textContent=t("buy_modal_sub");
    $("buyAmountInput").placeholder=t("buy_custom");
    $("createTaskTitle").textContent=t("create_task");
    $("createTaskCost").textContent=t("admin_task_cost");
    $("createNewsTitle").textContent=t("create_news");
    $("taskTitleInput").placeholder=t("task_title_ph");$("taskRewardInput").placeholder=t("task_reward_ph");$("taskLinkInput").placeholder=t("task_link_ph");
    $("newsTitleInput").placeholder=t("news_title_ph");$("newsTextInput").placeholder=t("news_text_ph");$("newsImageInput").placeholder=t("news_image_ph");
    renderTasks();renderFeed();
}

function toggleToken(){
    var el=$("tokenContent");el.classList.add("switching");
    setTimeout(function(){
        curToken=curToken==="mason"?"ape":"mason";
        document.body.className=TOKENS[curToken].themeClass;
        $("bgImage").style.opacity="0";
        setTimeout(function(){$("bgImage").style.backgroundImage="url("+TOKENS[curToken].bgImg+")";$("bgImage").style.opacity="0.4"},200);
        $("masonLabel").classList.toggle("active",curToken==="mason");
        $("apeLabel").classList.toggle("active",curToken==="ape");
        $("ttTrack").classList.toggle("ape",curToken==="ape");
        $("heroImg").src=TOKENS[curToken].logo;
        $("heroTitle").textContent=TOKENS[curToken].symbol;
        $("rateValue").textContent="1 GRAM = "+TOKENS[curToken].rate+" "+TOKENS[curToken].symbol;
        updateSocialLinks();updateBuyPresets();updateAllTranslations();
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

function updateBuyPresets(){var p=[1,5,10,25,50,100],h="";p.forEach(function(v){h+='<button class="preset-btn" onclick="setBuyAmount('+v+')">'+v+' GRAM</button>'});$("buyPresets").innerHTML=h}
function setBuyAmount(v){$("buyAmountInput").value=v;updateBuyPreview()}
function updateBuyPreview(){var a=parseFloat($("buyAmountInput").value)||0;$("buyPreview").textContent=t("buy_preview")+" "+(a*TOKENS[curToken].rate).toFixed(curToken==="ape"?0:2)+" "+TOKENS[curToken].symbol}
function showSendModal(){if(!walletConnected){showToast(t("toast_connect_first"));return}$("buyAmountInput").value="";$("buyPreview").textContent=t("buy_preview")+" 0 "+TOKENS[curToken].symbol;$("sendModal").classList.add("show")}
function closeSendModal(){$("sendModal").classList.remove("show")}

async function confirmBuy(){
    var amt=parseFloat($("buyAmountInput").value);if(!amt||amt<=0||!tcInstance){showToast(t("toast_error"));return}
    try{
        await tcInstance.sendTransaction({validUntil:Math.floor(Date.now()/1000)+360,messages:[{address:ADMIN_WALLET,amount:(amt*1e9).toString()}]});
        showToast(t("toast_buy_success"));closeSendModal();
    }catch(e){console.error("Buy error:",e);showToast(t("toast_error")+": "+e.message)}
}

function toggleInfo(){$("infoCard").classList.toggle("expanded");$("infoToggle").textContent=$("infoCard").classList.contains("expanded")?t("read_less"):t("read_more")}

function switchTab(tab){
    document.querySelectorAll(".tab-content").forEach(function(el){el.classList.remove("active")});
    document.querySelectorAll(".nav-item").forEach(function(el){el.classList.remove("active")});
    var m={home:"tabHome",tasks:"tabTasks",refs:"tabRefs",feed:"tabFeed"},n={home:"navHome",tasks:"navTasks",refs:"navRefs",feed:"navFeed"};
    if(m[tab])$(m[tab]).classList.add("active");if(n[tab])$(n[tab]).classList.add("active");
    if(tab==="refs")updateRefStats();
}

function checkAdminWallet(){isAdmin=walletAddress.replace(/[^a-zA-Z0-9]/g,"")===ADMIN_WALLET.replace(/[^a-zA-Z0-9]/g,"");if(isAdmin){$("adminSection").classList.add("show");updateAdminStats()}else{$("adminSection").classList.remove("show")}}
function updateAdminStats(){db.collection("news").get().then(function(s){$("adminNewsCount").textContent=s.size});db.collection("tasks").get().then(function(s){$("adminTaskCount").textContent=s.size})}

function showCreateTaskModal(){$("createTaskModal").classList.add("show")}
function closeCreateTaskModal(){$("createTaskModal").classList.remove("show")}
async function createTask(){
    var title=$("taskTitleInput").value.trim(),reward=parseInt($("taskRewardInput").value)||0,link=$("taskLinkInput").value.trim();
    if(!title){showToast(t("toast_error"));return}
    try{await db.collection("tasks").add({title:title,reward:reward,link:link,token:curToken,timestamp:firebase.firestore.FieldValue.serverTimestamp()});
    showToast(t("toast_create_task"));closeCreateTaskModal();$("taskTitleInput").value="";$("taskRewardInput").value="";$("taskLinkInput").value="";fetchTasks();updateAdminStats()}catch(e){showToast(t("toast_error"))}
}

function showCreateNewsModal(){$("createNewsModal").classList.add("show")}
function closeCreateNewsModal(){$("createNewsModal").classList.remove("show")}
async function createNews(){
    var title=$("newsTitleInput").value.trim(),text=$("newsTextInput").value.trim(),image=$("newsImageInput").value.trim();
    if(!title){showToast(t("toast_error"));return}
    try{await db.collection("news").add({title:title,text:text,image:image,timestamp:firebase.firestore.FieldValue.serverTimestamp()});
    showToast(t("toast_create_news"));closeCreateNewsModal();$("newsTitleInput").value="";$("newsTextInput").value="";$("newsImageInput").value="";fetchNews();updateAdminStats()}catch(e){showToast(t("toast_error"))}
}

var tasksData=[];
function fetchTasks(){db.collection("tasks").orderBy("timestamp","desc").get().then(function(s){tasksData=[];s.forEach(function(d){tasksData.push({id:d.id,...d.data()})});renderTasks()}).catch(function(e){})}
function renderTasks(){
    var el=$("taskList");if(!tasksData.length){el.innerHTML='<div style="text-align:center;padding:20px;color:rgba(255,255,255,0.3)">'+t("tasks_empty")+'</div>';return}
    var h="";tasksData.forEach(function(task){
        h+='<div class="task-item"><div class="task-icon">'+("TL").charAt(0)+'</div><div class="task-info"><div class="task-title">'+task.title+'</div><div class="task-reward">'+task.reward+" "+TOKENS[task.token||curToken].symbol+'</div></div>';
        h+='<button class="task-btn" onclick="completeTask(\''+task.id+'\')">'+t("task_claim")+'</button>';
        if(isAdmin)h+='<button class="task-del" onclick="deleteTask(\''+task.id+'\')">&#10005;</button>';
        h+='</div>';});el.innerHTML=h;
}
async function completeTask(id){if(!walletConnected){showToast(t("toast_connect_first"));return}try{await db.collection("activity").add({userId:tgUser?tgUser.id.toString():"unknown",taskId:id,token:curToken,timestamp:firebase.firestore.FieldValue.serverTimestamp()});showToast(t("toast_task_done"))}catch(e){showToast(t("toast_error"))}}
async function deleteTask(id){try{await db.collection("tasks").doc(id).delete();fetchTasks();updateAdminStats()}catch(e){}}

var newsData=[];
function fetchNews(){db.collection("news").orderBy("timestamp","desc").get().then(function(s){newsData=[];s.forEach(function(d){newsData.push({id:d.id,...d.data()})});renderFeed()}).catch(function(e){})}
function renderFeed(){
    var el=$("feedList");if(!newsData.length){el.innerHTML='<div style="text-align:center;padding:20px;color:rgba(255,255,255,0.3)">'+t("feed_empty")+'</div>';return}
    var h="";newsData.forEach(function(n){
        h+='<div class="news-card">';if(n.image)h+='<img src="'+n.image+'" alt="">';
        h+='<div class="nc-body">';if(isAdmin)h+='<button class="nc-del" onclick="deleteNews(\''+n.id+'\')">Delete</button>';
        h+='<div class="nc-title">'+n.title+'</div>';if(n.text)h+='<div class="nc-text">'+n.text+'</div>';
        h+='<div class="nc-time">'+(n.timestamp?new Date(n.timestamp.seconds*1000).toLocaleDateString():"")+'</div></div></div>';});el.innerHTML=h;
}
async function deleteNews(id){try{await db.collection("news").doc(id).delete();fetchNews();updateAdminStats()}catch(e){}}

function updateRefStats(){if(!tgUser)return;$("refLinkInput").value="https://t.me/"+BOT_USERNAME+"?start="+tgUser.id;
    db.collection("users").doc(tgUser.id.toString()).get().then(function(d){if(d.exists){var data=d.data();$("refCount").textContent=data.refCount||0;$("refEarned").textContent=data.refEarned||0;$("pfBalance").textContent=data.balance||0;$("pfRefs").textContent=data.refCount||0}}).catch(function(){})}
function copyRefLink(){var inp=$("refLinkInput");if(navigator.clipboard)navigator.clipboard.writeText(inp.value);else{inp.select();document.execCommand("copy")}showToast(t("toast_ref_copied"))}
function shareRefLink(){var url=$("refLinkInput").value;openLink(url)}

async function fetchCollectedGram(){try{var r=await fetch("https://tonapi.io/v2/accounts/"+ADMIN_WALLET);if(!r.ok)return;var d=await r.json();var b=d.balance?d.balance/1e9:0;$("liqFill").style.width=Math.min((b/LIQ_TARGET)*100,100)+"%";$("liqProgress").textContent=Math.floor(b).toLocaleString()+" / "+LIQ_TARGET.toLocaleString()+" GRAM";if(isAdmin)$("adminBalance").textContent=Math.floor(b).toLocaleString()}catch(e){}}
function loadAdminPayments(){if(!isAdmin)return;db.collection("activity").orderBy("timestamp","desc").limit(20).get().then(function(s){var h="";s.forEach(function(d){var data=d.data();h+='<div class="payment-item"><span class="pi-addr">'+(data.userId||"unknown").slice(0,10)+'...</span><span class="pi-amount">'+(data.amount||"")+' GRAM</span></div>'});if(!h)h='<div style="text-align:center;padding:10px;color:rgba(255,255,255,0.3);font-size:12px">No payments yet</div>';$("adminPaymentsList").innerHTML=h}).catch(function(){})}

window.addEventListener("load",function(){
    setTimeout(function(){$("preloader").classList.add("hide");$("bgImage").style.backgroundImage="url("+TOKENS[curToken].bgImg+")";$("bgImage").style.opacity="0.4"},1500);
    try{
        if(window.Telegram&&Telegram.WebApp){Telegram.WebApp.ready();Telegram.WebApp.expand();tgUser=Telegram.WebApp.initDataUnsafe?Telegram.WebApp.initDataUnsafe.user:null}
        if(typeof TON_CONNECT_UI!=="undefined"&&TON_CONNECT_UI.TonConnectUI){
            try{
                tcInstance=new TON_CONNECT_UI.TonConnectUI({manifestUrl:"https://recksach.github.io/chronogram-infinity/tonconnect-manifest.json",buttonRootId:"ton-connect"});
                tcInstance.onStatusChange(function(wallet){
                    if(wallet){
                        walletConnected=true;walletAddress=wallet.account?wallet.account.address:"";
                        $("profileSection").classList.add("show");
                        if(tgUser){$("pfName").textContent=tgUser.first_name+" "+(tgUser.last_name||"");$("pfId").textContent="@"+(tgUser.username||"unknown");if(tgUser.photo_url)$("pfAvatar").src=tgUser.photo_url}
                        checkAdminWallet();fetchCollectedGram();updateRefStats();if(isAdmin)loadAdminPayments();
                    }else{walletConnected=false;walletAddress="";isAdmin=false;$("profileSection").classList.remove("show");$("adminSection").classList.remove("show")}
                });
                console.log("[TC] TonConnect initialized via TON_CONNECT_UI.TonConnectUI");
            }catch(e){console.error("[TC] Init error:",e);showToast("Wallet init failed: "+e.message)}
        }else{console.warn("[TC] TON_CONNECT_UI not available");showToast("TonConnect not loaded")}
        renderLangSwitcher();updateAllTranslations();updateSocialLinks();updateBuyPresets();
        $("heroImg").src=TOKENS[curToken].logo;
        $("rateValue").textContent="1 GRAM = "+TOKENS[curToken].rate+" "+TOKENS[curToken].symbol;
        $("refLinkInput").value="https://t.me/"+BOT_USERNAME+"?start="+(tgUser?tgUser.id:"ref");
        fetchNews();fetchTasks();fetchCollectedGram();setInterval(fetchCollectedGram,15000);
        if(isAdmin)setInterval(loadAdminPayments,15000);updateRefStats();
        document.body.className=TOKENS[curToken].themeClass;
    }catch(e){console.error("[APP] Init error:",e)}
});
