function $(id){return document.getElementById(id)}
function showToast(m){var e=$("toast");e.innerText=m;e.classList.add("show");setTimeout(function(){e.classList.remove("show")},3000)}
function openLink(u){if(window.Telegram&&Telegram.WebApp)Telegram.WebApp.openLink(u);else window.open(u,"_blank")}
function t(k){return(TR[curLang]&&TR[curLang][k])||(TR.en[k])||k}

var BOT_USERNAME="masontokenbot/app";
var ADMIN_WALLET="UQAGpJWn-FJd3wjB-aiChuiYH-9tdXAOhqu887uBtS1Ce4_7";
var ADMIN_HEX="06a495a7f8525ddf08c1f9a88286e8981fef6d75700e86abbcf3bb81b52d427b";
var LIQ_TARGET=7000;

var TOKENS={
    mason:{
        symbol:"$MASON",contract:"EQDDKb3KIYcjA0FmGndThAO3thpkLoD4hHhQq7ToywPiMgLM",
        rate:6,taskReward:5,
        bgImg:"https://i.postimg.cc/7PgPq2Gk/photo-2026-07-08-11-05-36.jpg",
        logo:"https://i.postimg.cc/7PgPq2Gk/photo-2026-07-08-11-05-36.jpg",
        themeClass:"",
        socials:{twitter:"https://x.com/Worshipful_Mast",telegram:"https://t.me/MASON_TOKEN",website:"https://www.instagram.com/worshipful_mast?igsh=MXI1cDVtNmV3eXN4Mg=="}
    },
    ape:{
        symbol:"$APE",contract:"EQBjoywW-EZyePew5wwnwFtjWsW1OAySB-3Pt71huH20bzUD",
        rate:15674,taskReward:250,
        bgImg:"https://i.postimg.cc/0NfLcf9R/Chat-GPT-Image-14-lip-2026-r-14-10-23.png",
        logo:"https://i.postimg.cc/0NfLcf9R/Chat-GPT-Image-14-lip-2026-r-14-10-23.png",
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
    nav_home:"Home",nav_tasks:"Tasks",nav_refs:"Refs",    nav_feed:"Chat",
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
    info_mason_preview:"Born from the ancient guilds of digital builders, $MASON represents the foundational layer of decentralized pre-market trading on the TON blockchain. Like the master masons who constructed cathedrals that stood for centuries, this protocol is built on transparency, permanence, and community trust.",
    info_mason_full:"$MASON — The Stone Masons Protocol\n\nIn the beginning, there was chaos. The DeFi landscape was a scattered collection of fragile protocols, each claiming to be the future, each crumbling under the weight of their own ambition. From this chaos, a group of anonymous builders emerged — digital architects who believed that the future of finance needed a foundation as solid as stone.\n\nTHE GENESIS\n\n$MASON was conceived not as another speculative token, but as a declaration of architectural intent. The name draws from the ancient stonemasons' guilds — craftsmen who built the great cathedrals of medieval Europe, structures that have withstood centuries of wind, war, and time. Every cathedral began with a single stone, laid with precision and purpose. $MASON follows the same philosophy: every transaction is a brick, every holder is a mason, and together we are building something that will endure.\n\nThe pre-market phase represents the laying of the cornerstone. Early participants who acquire $MASON before public DEX listing are not merely investors — they are the founding craftsmen of this digital cathedral. The rate of 1 GRAM = 6 $MASON rewards those who recognize the vision early and commit to building alongside the protocol.\n\nTHE TECHNOLOGY\n\nBuilt on the TON (The Open Network) blockchain, $MASON leverages the network's sharding architecture to achieve sub-second finality and near-zero transaction fees. TON's async messaging paradigm allows $MASON transactions to propagate across multiple workchains simultaneously, ensuring that even during peak demand, the network remains responsive.\n\nThe smart contract architecture follows the Jetton standard (TEP-74), ensuring compatibility with all major TON wallets, DEXs, and DeFi protocols. The contract has been audited by multiple independent security researchers, and the source code is publicly verifiable on the TON Explorer.\n\nTHE TOKENOMICS\n\nTotal Supply: Distributed across pre-market, liquidity pool, team allocation, community rewards, and ecosystem development fund.\n\nPre-Market Rate: 1 GRAM = 6 $MASON — This rate is specifically designed to reward early adopters. As the liquidity pool approaches the target of 7,000 GRAM, the pre-market phase will conclude, and $MASON will be available on decentralized exchanges at market-determined prices.\n\nLiquidity Pool: The GRAM collected during pre-market forms the initial liquidity pool. This pool is the foundation upon which all future trading activity will rest. A larger pool means lower slippage, tighter spreads, and a healthier market for all participants.\n\nTHE COMMUNITY\n\n$MASON is governed by its community. There is no central authority, no single point of failure, no hidden hand操纵 the market. Every holder has a voice. Every mason has a vote. The governance framework is built on transparent on-chain proposals and quadratic voting, ensuring that even the smallest holders can influence the protocol's direction.\n\nThe referral system is the mortar that binds the stones together. When you invite another builder to join the guild, you earn rewards from their participation. This creates a self-reinforcing cycle of growth: more builders mean more stones, more stones mean a stronger cathedral, and a stronger cathedral attracts even more builders.\n\nTHE ROADMAP\n\nPhase 1: Pre-Market Launch — Establish the founding community, lay the cornerstone with the initial GRAM collection, and build the first walls of our digital cathedral.\n\nPhase 2: DEX Listing — Deploy liquidity on TON DEXs, enable open market trading, and let the community determine fair value through supply and demand.\n\nPhase 3: Utility Expansion — Integrate $MASON into real-world use cases: NFT marketplaces, gaming ecosystems, cross-chain bridges, and partnerships with established TON projects.\n\nPhase 4: Governance Transition — Full decentralization of protocol governance. The builders become the architects. The masons become the masters.\n\nTHE VISION\n\n$MASON is more than a token. It is a philosophy made digital. In a world of fleeting promises and vaporware, we choose to build with stone. In a landscape of extractive protocols, we choose to create value that endures. In an era of digital impermanence, we choose permanence.\n\nThe cathedral is rising. The stones are being laid. The question is not whether $MASON will succeed — it is whether you will be among those who built it.",
    info_mason_h1v:"Community",info_mason_h1l:"Driven",info_mason_h2v:"TON",info_mason_h2l:"Blockchain",
    info_mason_h3v:"Pre-Market",info_mason_h3l:"Early Access",info_mason_h4v:"Transparent",info_mason_h4l:"Governance",
    info_ape_sub:"WHITEPAPER",info_ape_title:"The Ambassador's Protocol for Education",
    info_ape_preview:"In the untamed wilderness of cryptocurrency, the strongest tribe survives. $APE — the Ambassador's Protocol for Education — is more than a token. It is a global movement born from the belief that financial literacy is the ultimate weapon against centralization and inequality.",
    info_ape_full:"$APE — The Ambassador's Protocol for Education\n\nDeep in the digital jungle, where the rules of the old world no longer apply, a new kind of network is emerging. Not a corporation. Not a government. A tribe. And at the heart of this tribe is a radical idea: that the most powerful technology in the world is not blockchain — it is education.\n\nTHE ORIGIN\n\n$APE was born from a simple observation: the crypto space is充满了 promise but starved of understanding. Billions of dollars flow through decentralized protocols every day, yet the vast majority of humanity has no idea how any of it works. This knowledge gap is not accidental — it is structural. The old financial system thrives on complexity and opacity. Decentralization was supposed to fix that, but without education, DeFi is just another maze.\n\nThe Ambassador's Protocol was created to bridge this gap. Each $APE holder becomes an ambassador — a node in a global network dedicated to spreading financial literacy, one conversation at a time. The protocol rewards education as much as it rewards holding. This is not passive investment; this is active participation in the world's largest decentralized education initiative.\n\nTHE GLOBAL NETWORK\n\n$APE operates on a simple but powerful principle: every holder is a teacher, and every teacher strengthens the network. The Ambassador Network spans continents and languages. From Lagos to Lisbon, from Mumbai to Montreal, $APE ambassadors are hosting workshops, creating content, and onboarding the next generation of DeFi users.\n\nThe network is organized into chapters — local groups of ambassadors who collaborate on education initiatives in their communities. Each chapter is autonomous but connected, sharing resources, strategies, and successes through the protocol's decentralized communication layer.\n\nTHE TOKENOMICS\n\nTotal Supply: With an extraordinarily high supply designed for mass accessibility, $APE ensures that no one is priced out of the tribe. Micro-transactions are not just supported — they are the foundation of the protocol's economic model.\n\nPre-Market Rate: 1 GRAM = 15,674 $APE — This rate reflects the protocol's commitment to accessibility. The high token count per GRAM means that every participant, regardless of portfolio size, holds a meaningful stake in the network's future.\n\nThe economy of $APE is circular: ambassadors earn tokens by educating others, spend tokens within the ecosystem for tools and resources, and reinvest in the network through governance participation and liquidity provision.\n\nTHE EDUCATION FRAMEWORK\n\nThe $APE Education Framework consists of three pillars:\n\n1. DEFI FUNDAMENTALS — Understanding wallets, transactions, gas fees, smart contracts, and DEX mechanics. Every new user who can confidently navigate a TON wallet is a victory for the protocol.\n\n2. SECURITY & SELF-CUSTODY — Teaching the principles of private key management, seed phrase backup, phishing awareness, and smart contract interaction safety. In DeFi, your security is your responsibility. $APE ensures that every ambassador can teach this essential skill.\n\n3. COMMUNITY BUILDING — Training ambassadors to organize local meetups, create educational content, and mentor newcomers. The protocol provides templates, frameworks, and incentives for community leaders.\n\nTHE REWARD SYSTEM\n\nAmbassadors earn $APE for:\n- Completing their own education milestones\n- Onboarding new users who connect wallets\n- Creating and sharing educational content\n- Organizing community events\n- Participating in governance proposals\n\nThis creates a virtuous cycle: more education leads to more confident users, more users lead to more network activity, more activity leads to higher token utility, and higher utility attracts more ambassadors.\n\nTHE ROADMAP\n\nPhase 1: Genesis — Launch the pre-market, establish the founding ambassador cohort, develop the core education curriculum, and build the initial community infrastructure.\n\nPhase 2: Expansion — Scale the ambassador network to 50+ countries, launch the chapter system, partner with established crypto education platforms, and deploy multilingual content libraries.\n\nPhase 3: Integration — Connect $APE to real-world education institutions, develop certification programs, create job placement pathways for certified ambassadors, and establish the $APE Education Fund.\n\nPhase 4: Sovereignty — Full protocol decentralization, ambassador-governed treasury, cross-chain expansion, and the launch of the Ambassador DAO — the world's first decentralized education governance body.\n\nTHE VISION\n\n$APE envisions a world where financial literacy is not a privilege but a right. Where every person, regardless of geography, income, or background, has access to the knowledge they need to participate in the decentralized economy. Where education is the currency that matters most.\n\nThe jungle is vast. The path is challenging. But the tribe grows stronger with every new ambassador. Welcome to $APE — where knowledge is the ultimate power.",
    info_ape_h1v:"Global",info_ape_h1l:"Network",info_ape_h2v:"Education",info_ape_h2l:"Focused",
    info_ape_h3v:"Micro",info_ape_h3l:"Transactions",info_ape_h4v:"Community",info_ape_h4l:"Governed",
    chatWelcome:"Hello! I'm your AI assistant. Ask me anything about $MASON, $APE, how to buy, rates, roadmap, or anything else. Use the quick buttons below for common questions!",
    chatTitle:"AI Assistant",chatStatus:"Online"
},
ru:{
    nav_home:"\u0413\u043b\u0430\u0432\u043d\u0430\u044f",nav_tasks:"\u0417\u0430\u0434\u0430\u043d\u0438\u044f",nav_refs:"\u0420\u0435\u0444\u0435\u0440\u0430\u043b\u044b",nav_feed:"\u0427\u0430\u0442",
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
    info_mason_preview:"\u0420\u043e\u0436\u0434\u0451\u043d\u043d\u044b\u0435 \u0438\u0437 \u0434\u0440\u0435\u0432\u043d\u0438\u0445 \u0433\u0438\u043b\u044c\u0434\u0438\u0439 \u0446\u0438\u0444\u0440\u043e\u0432\u044b\u0445 \u0441\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u0435\u0439, $MASON \u2014 \u044d\u0442\u043e \u0444\u0443\u043d\u0434\u0430\u043c\u0435\u043d\u0442\u0430\u043b\u044c\u043d\u044b\u0439 \u0441\u043b\u043e\u0439 \u0434\u0435\u0446\u0435\u043d\u0442\u0440\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043d\u043d\u043e\u0439 \u043f\u0440\u0435\u0434\u0440\u044b\u043d\u043e\u0447\u043d\u043e\u0439 \u0442\u043e\u0440\u0433\u043e\u0432\u043b\u0438 \u043d\u0430 \u0431\u043b\u043e\u043a\u0447\u0435\u0439\u043d\u0435 TON. \u041a\u0430\u043a \u043a\u0430\u043c\u0435\u043d\u043d\u044b\u0435 \u043c\u0430\u0441\u0442\u0435\u0440\u0430, \u0432\u043e\u0437\u0432\u043e\u0434\u0438\u0432\u0448\u0438\u0435 \u0441\u043e\u0431\u043e\u0440\u044b, \u044d\u0442\u043e\u0442 \u043f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u043f\u043e\u0441\u0442\u0440\u043e\u0435\u043d \u043d\u0430 \u043f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u043e\u0441\u0442\u0438, \u043f\u043e\u0441\u0442\u043e\u044f\u043d\u0441\u0442\u0432\u0435 \u0438 \u0434\u043e\u0432\u0435\u0440\u0438\u0438 \u0441\u043e\u043e\u0431\u0449\u0435\u0441\u0442\u0432\u0430.",
    info_mason_full:"$MASON \u2014 \u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u041a\u0430\u043c\u0435\u043d\u043d\u044b\u0445 \u041c\u0430\u0441\u0442\u0435\u0440\u043e\u0432\n\n\u0412 \u043d\u0430\u0447\u0430\u043b\u0435 \u0431\u044b\u043b \u0445\u0430\u043e\u0441. \u041c\u0438\u0440 DeFi \u2014 \u044d\u0442\u043e \u0440\u0430\u0437\u0431\u0440\u043e\u0441\u0430\u043d\u043d\u0430\u044f \u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044f \u0445\u0440\u0443\u043f\u043a\u0438\u0445 \u043f\u0440\u043e\u0442\u043e\u043a\u043e\u043b\u043e\u0432, \u043a\u0430\u0436\u0434\u044b\u0439 \u0437\u0430\u044f\u0432\u043b\u044f\u044e\u0449\u0438\u0439 \u043e \u0431\u0443\u0434\u0443\u0449\u0435\u043c, \u043d\u043e \u043a\u0440\u0443\u0448\u0430\u0449\u0438\u0445\u0441\u044f \u043f\u043e\u0434 \u0432\u0435\u0441\u043e\u043c \u0441\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0433\u043e \u0430\u043c\u0431\u0438\u0446\u0438\u043e\u0437\u0430. \u0418\u0437 \u044d\u0442\u043e\u0433\u043e \u0445\u0430\u043e\u0441\u0430 \u0432\u044b\u0448\u043b\u0430 \u0433\u0440\u0443\u043f\u043f\u0430 \u0430\u043d\u043e\u043d\u0438\u043c\u043d\u044b\u0445 \u0441\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u0435\u0439 \u2014 \u0446\u0438\u0444\u0440\u043e\u0432\u044b\u0445 \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u043e\u0432, \u0432\u0435\u0440\u0438\u0432\u0448\u0438\u0445, \u0447\u0442\u043e \u0431\u0443\u0434\u0443\u0449\u0435\u0435 \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432 \u043d\u0443\u0436\u043d\u043e \u0442\u0432\u0435\u0440\u0434\u043e\u0435, \u043d\u0435\u0441\u043e\u043a\u0440\u0443\u0448\u0438\u043c\u043e\u0435 \u043e\u0441\u043d\u043e\u0432\u0430\u043d\u0438\u0435.\n\n\u0413\u0415\u041d\u0415\u0417\u0418\u0421\n\n$MASON \u0431\u044b\u043b \u043f\u0440\u0438\u0434\u0443\u043c\u0430\u043d \u043d\u0435 \u043a\u0430\u043a \u0435\u0449\u0451 \u043e\u0434\u0438\u043d \u0441\u043f\u0435\u043a\u0443\u043b\u044f\u0442\u0438\u0432\u043d\u044b\u0439 \u0442\u043e\u043a\u0435\u043d, \u0430 \u0434\u0435\u043a\u043b\u0430\u0440\u0430\u0446\u0438\u0435\u0439 \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u043d\u043e\u0433\u043e \u043d\u0430\u043c\u0435\u0440\u0435\u043d\u0438\u044f. \u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043e\u0441\u043d\u043e\u0432\u0430\u043d\u043e \u043d\u0430 \u0434\u0440\u0435\u0432\u043d\u0438\u0445 \u0433\u0438\u043b\u044c\u0434\u0438\u044f\u0445 \u043a\u0430\u043c\u0435\u043d\u0449\u0438\u043a\u043e\u0432 \u2014 \u043c\u0430\u0441\u0442\u0435\u0440\u043e\u0432, \u0432\u043e\u0437\u0432\u043e\u0434\u0438\u0432\u0448\u0438\u0445 \u0432\u0435\u043b\u0438\u0447\u0430\u0439\u0448\u0438\u0435 \u0441\u043e\u0431\u043e\u0440\u044b \u0441\u0440\u0435\u0434\u043d\u0435\u0432\u0435\u043a\u043e\u0432\u043e\u0439 \u0415\u0432\u0440\u043e\u043f\u044b \u2014 \u0441\u043e\u043e\u0440\u0443\u0436\u0435\u043d\u0438\u044f, \u043f\u0440\u043e\u0441\u0442\u043e\u044f\u0432\u0448\u0438\u0435 \u0432\u0435\u043a\u0430\u043c\u0438 \u0432\u0435\u0442\u0440\u0430, \u0432\u043e\u0439\u043d\u044b \u0438 \u0432\u0440\u0435\u043c\u0435\u043d\u0438. \u041a\u0430\u0436\u0434\u044b\u0439 \u0441\u043e\u0431\u043e\u0440 \u043d\u0430\u0447\u0438\u043d\u0430\u043b\u0441\u044f \u0441 \u043e\u0434\u043d\u043e\u0433\u043e \u043a\u0430\u043c\u043d\u044f, \u043f\u043e\u043b\u043e\u0436\u0435\u043d\u043d\u043e\u0433\u043e \u0441 \u0442\u043e\u0447\u043d\u043e\u0441\u0442\u044c\u044e \u0438 \u0446\u0435\u043b\u044c\u044e. $MASON \u0441\u043b\u0435\u0434\u0443\u0435\u0442 \u0442\u043e\u0439 \u0436\u0435 \u0444\u0438\u043b\u043e\u0441\u043e\u0444\u0438\u0438: \u043a\u0430\u0436\u0434\u0430\u044f \u0442\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0438\u044f \u2014 \u043a\u0438\u0440\u043f\u0438\u0447\u0430, \u043a\u0430\u0436\u0434\u044b\u0439 \u0434\u0435\u0440\u0436\u0430\u0442\u0435\u043b\u044c \u2014 \u043a\u0430\u043c\u0435\u043d\u0449\u0438\u043a, \u0438 \u0432\u043c\u0435\u0441\u0442\u0435 \u043c\u044b \u0441\u0442\u0440\u043e\u0438\u043c \u0447\u0442\u043e-\u0442\u043e, \u0447\u0442\u043e \u043f\u0440\u043e\u0441\u0442\u043e\u0438\u0442.\n\n\u0422\u0415\u0425\u041d\u041e\u041b\u041e\u0413\u0418\u042f\n\n\u041f\u043e\u0441\u0442\u0440\u043e\u0435\u043d \u043d\u0430 \u0431\u043b\u043e\u043a\u0447\u0435\u0439\u043d\u0435 TON (The Open Network), $MASON \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442 \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0443 \u0448\u0430\u0440\u0434\u0438\u043d\u0433\u0430 \u0434\u043b\u044f \u043c\u0433\u043d\u043e\u0432\u0435\u043d\u043d\u043e\u0439 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0438\u044f \u0442\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0438\u0439 \u0438 \u043f\u043e\u0447\u0442\u0438 \u043d\u0443\u043b\u0435\u0432\u044b\u0445 \u043a\u043e\u043c\u0438\u0441\u0441\u0438\u0439. \u0410\u0441\u0438\u043d\u0445\u0440\u043e\u043d\u043d\u043e\u0435 \u043f\u0430\u0440\u0430\u043b\u043b\u0435\u043b\u044c\u043d\u043e\u0435 \u043f\u043e\u0441\u043b\u0430\u043d\u0438\u0435 TON \u043f\u043e\u0437\u0432\u043e\u043b\u044f\u0435\u0442 \u0442\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0438\u044f\u043c $MASON \u0440\u0430\u0441\u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u044f\u0442\u044c\u0441\u044f \u043f\u043e \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u0438\u043c \u0440\u0430\u0431\u043e\u0447\u0438\u043c \u0446\u0435\u043f\u0430\u043c \u043e\u0434\u043d\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e, \u0433\u0430\u0440\u0430\u043d\u0442\u0438\u0440\u0443\u044f \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c \u0434\u0430\u0436\u0435 \u043f\u0440\u0438 \u043f\u0438\u043a\u043e\u0432\u044b\u0445 \u043d\u0430\u0433\u0440\u0443\u0437\u043a\u0430\u0445. \u0421\u043c\u0430\u0440\u0442-\u043a\u043e\u043d\u0442\u0440\u0430\u043a\u0442 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u0443 Jetton (TEP-74), \u043e\u0431\u0435\u0441\u043f\u0435\u0447\u0438\u0432\u0430\u044f \u0441\u043e\u0432\u043c\u0435\u0441\u0442\u0438\u043c\u043e\u0441\u0442\u044c \u0441\u043e \u0432\u0441\u0435\u043c\u0438 \u043e\u0441\u043d\u043e\u0432\u043d\u044b\u043c\u0438 \u043a\u043e\u0448\u0435\u043b\u044c\u043a\u0430\u043c\u0438 TON, DEX \u0438 DeFi-\u043f\u0440\u043e\u0442\u043e\u043a\u043e\u043b\u0430\u043c\u0438. \u041a\u043e\u043d\u0442\u0440\u0430\u043a\u0442 \u043f\u0440\u043e\u0448\u0451\u043b \u0430\u0443\u0434\u0438\u0442 \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u0438\u043c\u0438 \u043d\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043c\u044b\u043c\u0438 \u0438\u0441\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u0442\u0435\u043b\u044f\u043c\u0438, \u0430 \u0438\u0441\u0445\u043e\u0434\u043d\u044b\u0439 \u043a\u043e\u0434 \u043f\u0443\u0431\u043b\u0438\u0447\u043d\u043e \u043f\u0440\u043e\u0432\u0435\u0440\u044f\u0435\u043c\u043e\u0441\u0442\u0435\u043d \u043d\u0430 TON Explorer.\n\n\u0422\u041e\u041a\u0415\u041d\u041e\u041c\u0418\u041a\u0410\n\n\u041f\u0440\u0435\u0434\u0440\u044b\u043d\u043e\u0447\u043d\u044b\u0439 \u043a\u0443\u0440\u0441: 1 GRAM = 6 $MASON \u2014 \u044d\u0442\u043e\u0442 \u043a\u0443\u0440\u0441 \u0441\u043f\u0435\u0446\u0438\u0430\u043b\u044c\u043d\u043e \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0430\u043d \u0434\u043b\u044f \u043d\u0430\u0433\u0440\u0430\u0436\u0434\u0435\u043d\u0438\u044f \u0440\u0430\u043d\u043d\u0438\u0445 \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u043e\u0432. \u041f\u043e \u043c\u0435\u0440\u0435 \u043f\u0440\u0438\u0431\u043b\u0438\u0436\u0435\u043d\u0438\u044f \u043f\u0443\u043b\u0430 \u043b\u0438\u043a\u0432\u0438\u0434\u043d\u043e\u0441\u0442\u0438 \u043a \u0446\u0435\u043b\u0438 7,000 GRAM \u043f\u0440\u0435\u0434\u0440\u044b\u043d\u043e\u0447\u043d\u044b\u0439 \u044d\u0442\u0430\u043f \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0441\u044f, \u0438 $MASON \u0431\u0443\u0434\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d \u043d\u0430 DEX \u043f\u043e \u0440\u044b\u043d\u043e\u0447\u043d\u043e\u0439 \u0446\u0435\u043d\u0435. \u041f\u0443\u043b \u043b\u0438\u043a\u0432\u0438\u0434\u043d\u043e\u0441\u0442\u0438 \u2014 \u044d\u0442\u043e \u0444\u0443\u043d\u0434\u0430\u043c\u0435\u043d\u0442, \u043d\u0430 \u043a\u043e\u0442\u043e\u0440\u043e\u043c \u0434\u0435\u0440\u0436\u0430\u0442\u0441\u044f \u0432\u0441\u044f \u0442\u043e\u0440\u0433\u043e\u0432\u0430\u044f \u0434\u0435\u044f\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c. GRAM, \u0441\u043e\u0431\u0440\u0430\u043d\u043d\u044b\u0435 \u0432 \u043f\u0440\u0435\u0434\u0440\u044b\u043d\u043e\u0447\u043d\u043e\u043c \u044d\u0442\u0430\u043f\u0435, \u0444\u043e\u0440\u043c\u0438\u0440\u0443\u044e\u0442 \u043d\u0430\u0447\u0430\u043b\u044c\u043d\u044b\u0439 \u043f\u0443\u043b \u043b\u0438\u043a\u0432\u0438\u0434\u043d\u043e\u0441\u0442\u0438. \u0411\u043e\u043b\u044c\u0448\u0435 \u043f\u0443\u043b \u2014 \u043c\u0435\u043d\u044c\u0448\u0435 \u0441\u043b\u0438\u043f\u0430\u0436, \u0431\u043e\u043b\u0435\u0435 \u0443\u0437\u043a\u0438\u0435 \u0441\u043f\u0440\u0435\u0434\u044b, \u0431\u043e\u043b\u0435\u0435 \u0437\u0434\u043e\u0440\u043e\u0432\u044b\u0439 \u0440\u044b\u043d\u043e\u043a \u0434\u043b\u044f \u0432\u0441\u0435\u0445.\n\n\u0421\u041e\u041e\u0411\u0429\u0415\u0421\u0422\u0412\u041e\n\n$MASON \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u0441\u043e\u043e\u0431\u0449\u0435\u0441\u0442\u0432\u043e\u043c. \u041d\u0435\u0442 \u0446\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u043e\u0439 \u0432\u043b\u0430\u0441\u0442\u0438, \u043d\u0435\u0442 \u043e\u0434\u043d\u043e\u0439 \u0442\u043e\u0447\u043a\u0438 \u043f\u0440\u043e\u0432\u0430\u043b\u0430, \u043d\u0435\u0442 \u0441\u043a\u0440\u044b\u0442\u043e\u0439 \u0440\u0443\u043a\u0438, \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u044f\u044e\u0449\u0435\u0439 \u0440\u044b\u043d\u043a\u043e\u043c. \u041a\u0430\u0436\u0434\u044b\u0439 \u0434\u0435\u0440\u0436\u0430\u0442\u0435\u043b\u044c \u0438\u043c\u0435\u0435\u0442 \u0433\u043e\u043b\u043e\u0441. \u041a\u0430\u0436\u0434\u044b\u0439 \u043a\u0430\u043c\u0435\u043d\u0449\u0438\u043a \u0438\u043c\u0435\u0435\u0442 \u043f\u0440\u0430\u0432\u043e \u0433\u043e\u043b\u043e\u0441\u0430. \u0421\u0438\u0441\u0442\u0435\u043c\u0430 \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u043f\u043e\u0441\u0442\u0440\u043e\u0435\u043d\u0430 \u043d\u0430 \u043f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u044b\u0445 \u043e\u043d-\u0447\u0435\u0439\u043d\u044b\u0445 \u043f\u0440\u043e\u043f\u043e\u0437\u0438\u0446\u0438\u044f\u0445 \u0438 \u043a\u0432\u0430\u0434\u0440\u0430\u0442\u0438\u0447\u043d\u043e\u043c \u0433\u043e\u043b\u043e\u0441\u043e\u0432\u0430\u043d\u0438\u0438. \u0420\u0435\u0444\u0435\u0440\u0430\u043b\u044c\u043d\u0430\u044f \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0430 \u2014 \u044d\u0442\u043e \u0440\u0430\u0441\u0442\u0432\u043e\u0440, \u0441\u043a\u0440\u0435\u043f\u043b\u044f\u044e\u0449\u0438\u0439 \u043a\u0430\u043c\u043d\u0438. \u041a\u043e\u0433\u0434\u0430 \u0432\u044b \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0430\u0435\u0442\u0435 \u0435\u0449\u0451 \u043e\u0434\u043d\u043e\u0433\u043e \u0441\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044f \u043f\u0440\u0438\u0441\u043e\u0435\u0434\u0438\u043d\u0438\u0442\u044c\u0441\u044f \u043a \u0433\u0438\u043b\u044c\u0434\u0438\u0438, \u0432\u044b \u043f\u043e\u043b\u0443\u0447\u0430\u0435\u0442\u0435 \u043d\u0430\u0433\u0440\u0430\u0434\u0443 \u0437\u0430 \u0438\u0445 \u0443\u0447\u0430\u0441\u0442\u0438\u0435.\n\n\u0414\u041e\u0420\u041e\u0413\u0410\n\n\u0424\u0430\u0437\u0430 1: \u041f\u0440\u0435\u0434\u0440\u044b\u043d\u043e\u0447\u043d\u044b\u0439 \u0437\u0430\u043f\u0443\u0441\u043a \u2014 \u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u043e\u0441\u043d\u043e\u0432\u043d\u043e\u0433\u043e \u0441\u043e\u043e\u0431\u0441\u0442\u0432\u0430, \u0437\u0430\u043a\u043b\u0430\u0434\u043a\u0430 \u0444\u0443\u043d\u0434\u0430\u043c\u0435\u043d\u0442\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u043a\u0430\u043c\u043d\u044f \u0447\u0435\u0440\u0435\u0437 \u0441\u0431\u043e\u0440 GRAM \u0438 \u0432\u043e\u0437\u0432\u0435\u0434\u0435\u043d\u0438\u0435 \u043f\u0435\u0440\u0432\u044b\u0445 \u0441\u0442\u0435\u043d \u0446\u0438\u0444\u0440\u043e\u0432\u043e\u0433\u043e \u0441\u043e\u0431\u043e\u0440\u0430.\n\n\u0424\u0430\u0437\u0430 2: \u041b\u0438\u0441\u0442\u0438\u043d\u0433 \u043d\u0430 DEX \u2014 \u0420\u0430\u0437\u0432\u0435\u0440\u0442\u043a\u0430 \u043b\u0438\u043a\u0432\u0438\u0434\u043d\u043e\u0441\u0442\u0438 \u043d\u0430 DEX TON, \u043e\u0442\u043a\u0440\u044b\u0442\u0438\u0435 \u0442\u043e\u0440\u0433\u043e\u0432\u043b\u0438 \u043d\u0430 \u0441\u0432\u043e\u0431\u043e\u0434\u043d\u043e\u043c \u0440\u044b\u043d\u043a\u0435.\n\n\u0424\u0430\u0437\u0430 3: \u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043d\u0438\u0435 \u0443\u0442\u0438\u043b\u0438\u0442\u0435\u0442\u043e\u0432 \u2014 \u0418\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044f $MASON \u0432 \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u0435 \u0441\u043b\u0443\u0447\u0430\u0438: NFT-\u043c\u0430\u0440\u043a\u0435\u0442\u043f\u043b\u0435\u0439\u0441\u044b, \u0438\u0433\u0440\u043e\u0432\u044b\u0435 \u044d\u043a\u043e\u0441\u0438\u0441\u0442\u0435\u043c\u044b, \u043a\u0440\u043e\u0441\u0441-\u0446\u0435\u043f\u043e\u0447\u043a\u0438 \u0438 \u043f\u0430\u0440\u0442\u043d\u0435\u0440\u0441\u0442\u0432\u0430 \u0441 \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d\u043d\u044b\u043c\u0438 \u043f\u0440\u043e\u0435\u043a\u0442\u0430\u043c\u0438 TON.\n\n\u0424\u0430\u0437\u0430 4: \u041f\u0435\u0440\u0435\u0445\u043e\u0434 \u043a \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044e \u2014 \u041f\u043e\u043b\u043d\u0430\u044f \u0434\u0435\u0446\u0435\u043d\u0442\u0440\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044f. \u0421\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u0438 \u0441\u0442\u0430\u043d\u043e\u0432\u044f\u0442\u0441\u044f \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0430\u043c\u0438. \u041a\u0430\u043c\u0435\u043d\u0449\u0438\u043a\u0438 \u0441\u0442\u0430\u043d\u043e\u0432\u044f\u0442\u0441\u044f \u043c\u0430\u0441\u0442\u0435\u0440\u0430\u043c\u0438.\n\n\u0412\u0418\u0414\u0415\u041d\u0418\u0415\n\n$MASON \u2014 \u044d\u0442\u043e \u0431\u043e\u043b\u0435\u0435, \u0447\u0435\u043c \u0442\u043e\u043a\u0435\u043d. \u042d\u0442\u043e \u0444\u0438\u043b\u043e\u0441\u043e\u0444\u0438\u044f, \u0441\u0442\u0430\u0432\u0448\u0430\u044f \u0446\u0438\u0444\u0440\u043e\u0432\u043e\u0439. \u0412 \u043c\u0438\u0440\u0435 \u043f\u0443\u0441\u0442\u044b\u0445 \u043e\u0431\u0435\u0449\u0430\u043d\u0438\u0439 \u0438 \u0432\u0430\u043f\u043e\u0440\u043e\u0432, \u043c\u044b \u0432\u044b\u0431\u0438\u0440\u0430\u0435\u043c \u0441\u0442\u0440\u043e\u0438\u0442\u044c \u0438\u0437 \u043a\u0430\u043c\u043d\u044f. \u0412 \u043c\u0438\u0440\u0435 \u0438\u0437\u0432\u043b\u0435\u043a\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u0445 \u043f\u0440\u043e\u0442\u043e\u043a\u043e\u043b\u043e\u0432 \u043c\u044b \u0441\u043e\u0437\u0434\u0430\u0451\u043c \u0446\u0435\u043d\u043d\u043e\u0441\u0442\u044c, \u043a\u043e\u0442\u043e\u0440\u0430\u044f \u043f\u0440\u043e\u0441\u0442\u043e\u0438\u0442. \u0412 \u044d\u043f\u043e\u0445\u0443 \u0446\u0438\u0444\u0440\u043e\u0432\u043e\u0439 \u043d\u0435\u043f\u043e\u0441\u0442\u043e\u044f\u043d\u043d\u043e\u0441\u0442\u0438 \u043c\u044b \u0432\u044b\u0431\u0438\u0440\u0430\u0435\u043c \u043f\u043e\u0441\u0442\u043e\u044f\u043d\u0441\u0442\u0432\u043e. \u0421\u043e\u0431\u043e\u0440 \u0432\u043e\u0437\u0432\u043e\u0434\u0438\u0442\u0441\u044f. \u041a\u0430\u043c\u043d\u0438 \u0443\u043a\u043b\u0430\u0434\u044b\u0432\u0430\u044e\u0442\u0441\u044f. \u0412\u043e\u043f\u0440\u043e\u0441 \u043d\u0435 \u0432 \u0442\u043e\u043c, \u0443\u0441\u043f\u0435\u0435\u0442 \u043b\u0438 $MASON \u2014 \u0430 \u0432 \u0442\u043e\u043c, \u0431\u0443\u0434\u0435\u0442\u0435 \u043b\u0438 \u0432\u044b \u0441\u0440\u0435\u0434\u0438 \u0442\u0435\u0445, \u043a\u0442\u043e \u0435\u0433\u043e \u0441\u0442\u0440\u043e\u0438\u043b.",
    info_mason_h1v:"\u0421\u043e\u043e\u0431\u0449\u0435\u0441\u0442\u0432\u043e",info_mason_h1l:"\u0414\u0440\u0430\u0439\u0432",info_mason_h2v:"TON",info_mason_h2l:"\u0411\u043b\u043e\u043a\u0447\u0435\u0439\u043d",
    info_mason_h3v:"Pre-Market",info_mason_h3l:"\u0420\u0430\u043d\u043d\u0438\u0439 \u0434\u043e\u0441\u0442\u0443\u043f",info_mason_h4v:"\u041f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u043e\u0435",info_mason_h4l:"\u0423\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435",
    info_ape_sub:"\u0412\u0410\u0419\u0422\u041f\u0415\u0419\u041f\u0415\u0420",info_ape_title:"\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0410\u043c\u0431\u0430\u0441\u0441\u0430\u0434\u043e\u0440\u043e\u0432",
    info_ape_preview:"\u0412 \u0434\u0438\u043a\u0438\u0445 \u0434\u0436\u0443\u043d\u0433\u043b\u044f\u0445 \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e \u0432\u044b\u0436\u0438\u0432\u0430\u0435\u0442 \u0441\u0438\u043b\u044c\u043d\u0435\u0439\u0448\u0435\u0435 \u043f\u043b\u0435\u043c\u044f. $APE \u2014 \u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0410\u043c\u0431\u0430\u0441\u0441\u0430\u0434\u043e\u0440\u043e\u0432 \u041e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u044f \u2014 \u044d\u0442\u043e \u0433\u043b\u043e\u0431\u0430\u043b\u044c\u043d\u043e\u0435 \u0434\u0432\u0438\u0436\u0435\u043d\u0438\u0435, \u0440\u043e\u0436\u0434\u0451\u043d\u043d\u043e\u0435 \u0438\u0434\u0435\u0435\u0439 \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u043e\u0439 \u0433\u0440\u0430\u043c\u043e\u0442\u043d\u043e\u0441\u0442\u0438.",
    info_ape_full:"$APE \u2014 \u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0410\u043c\u0431\u0430\u0441\u0441\u0430\u0434\u043e\u0440\u043e\u0432 \u041e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u044f\n\n\u0413\u043b\u0443\u0431\u043e \u0432 \u0446\u0438\u0444\u0440\u043e\u0432\u044b\u0445 \u0434\u0436\u0443\u043d\u0433\u043b\u044f\u0445, \u0433\u0434\u0435 \u043f\u0440\u0430\u0432\u0438\u043b\u0430 \u0441\u0442\u0430\u0440\u043e\u0433\u043e \u043c\u0438\u0440\u0430 \u0431\u043e\u043b\u044c\u0448\u0435 \u043d\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044e\u0442, \u0432\u043e\u0437\u043d\u0438\u043a\u0430\u0435\u0442 \u043d\u043e\u0432\u044b\u0439 \u0442\u0438\u043f \u0441\u0435\u0442\u0435\u0439. \u041d\u0435 \u043a\u043e\u0440\u043f\u043e\u0440\u0430\u0446\u0438\u044f. \u041d\u0435 \u043f\u0440\u0430\u0432\u0438\u0442\u0435\u043b\u044c\u0441\u0442\u0432\u043e. \u041f\u043b\u0435\u043c\u044f. \u0418 \u0432 \u0441\u0435\u0440\u0434\u0446\u0435 \u044d\u0442\u043e\u0439 \u043f\u043b\u0435\u043c\u0435\u043d\u0438 \u2014 \u0440\u0430\u0434\u0438\u043a\u0430\u043b\u044c\u043d\u0430\u044f \u0438\u0434\u0435\u044f: \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u0430\u044f \u0433\u0440\u0430\u043c\u043e\u0442\u043d\u043e\u0441\u0442\u044c \u2014 \u044d\u0442\u043e \u0441\u0430\u043c\u043e\u0435 \u043c\u043e\u0449\u043d\u043e\u0435 \u043e\u0440\u0443\u0436\u0438\u0435 \u043f\u0440\u043e\u0442\u0438\u0432 \u0446\u0435\u043d\u0442\u0440\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0438 \u0438 \u043d\u0435\u0440\u0430\u0432\u0435\u043d\u0441\u0442\u0432\u0430.\n\n\u041f\u0420\u041e\u0418\u0421\u0425\u041e\u0416\u0414\u0415\u041d\u0418\u0415\n\n$APE \u0440\u043e\u0434\u0438\u043b\u0441\u044f \u0438\u0437 \u043f\u0440\u043e\u0441\u0442\u043e\u0433\u043e \u043d\u0430\u0431\u043b\u044e\u0434\u0435\u043d\u0438\u044f: \u043c\u0438\u0440 \u043a\u0440\u0438\u043f\u0442\u043e\u0432 \u043f\u043e\u043b\u043e\u043d \u043e\u0431\u0435\u0441\u0446\u0435\u043f\u0435\u043d \u043f\u043e\u0441\u043b\u0430\u043d\u0438\u044f\u043c\u0438, \u043d\u043e \u0433\u043e\u043b\u043e\u0434 \u0431\u043e\u043b\u044c\u0448\u0438\u043d\u0441\u0442\u0432\u0430 \u0447\u0435\u043b\u043e\u0432\u0435\u0447\u0435\u0441\u0442\u0432\u0430 \u043d\u0435 \u043f\u043e\u043d\u0438\u043c\u0430\u0435\u0442, \u043a\u0430\u043a \u044d\u0442\u043e \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442. \u042d\u0442\u0430 \u043f\u0440\u043e\u0431\u0435\u043b\u044c \u043d\u0435 \u0441\u043b\u0443\u0447\u0430\u0439\u043d\u0430 \u2014 \u043e\u043d\u0430 \u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u043d\u0430. \u0421\u0442\u0430\u0440\u044b\u0439 \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u044b\u0439 \u043c\u0438\u0440 \u043f\u0440\u043e\u0446\u0432\u0435\u0442\u0430\u0435\u0442 \u043e\u0442 \u0441\u043b\u043e\u0436\u043d\u043e\u0441\u0442\u0438 \u0438 \u043d\u0435\u043f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u043e\u0441\u0442\u0438. \u0414\u0435\u0446\u0435\u043d\u0442\u0440\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044f \u0434\u043e\u043b\u0436\u043d\u0430 \u0431\u044b\u043b\u0430 \u044d\u0442\u0438\u043c \u0438\u0441\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435\u043c, \u043d\u043e \u0431\u0435\u0437 \u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u044f DeFi \u2014 \u044d\u0442\u043e \u043b\u0438\u0448\u044c \u0435\u0449\u0451 \u043e\u0434\u0438\u043d \u043b\u0430\u0431\u0438\u0440\u0438\u043d\u0442.\n\n\u041f\u0420\u041e\u0422\u041e\u041a\u041e\u041b \u0411\u042b\u041b \u0421\u041e\u0417\u0414\u0410\u041d\n\n\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0410\u043c\u0431\u0430\u0441\u0441\u0430\u0434\u043e\u0440\u043e\u0432 \u0431\u044b\u043b \u0441\u043e\u0437\u0434\u0430\u043d \u0434\u043b\u044f \u043f\u0435\u0440\u0435\u043e\u043f\u043b\u044b\u0442\u044c \u044d\u0442\u0443 \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0443. \u041a\u0430\u0436\u0434\u044b\u0439 \u0434\u0435\u0440\u0436\u0430\u0442\u0435\u043b\u044c $APE \u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u0441\u044f \u0430\u043c\u0431\u0430\u0441\u0441\u0430\u0434\u043e\u0440\u043e\u043c \u2014 \u0443\u0437\u043b\u043e\u043c \u0433\u043b\u043e\u0431\u0430\u043b\u044c\u043d\u043e\u0439 \u0441\u0435\u0442\u0438, \u043f\u043e\u0441\u0432\u044f\u0449\u0435\u043d\u043d\u043e\u0439 \u0440\u0430\u0441\u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0435\u043d\u0438\u044e \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u043e\u0439 \u0433\u0440\u0430\u043c\u043e\u0442\u043d\u043e\u0441\u0442\u0438 \u043f\u043e \u0432\u0441\u0435\u043c\u0443 \u043c\u0438\u0440\u0443. \u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u043d\u0430\u0433\u0440\u0430\u0436\u0434\u0430\u0435\u0442 \u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u0435 \u0442\u0430\u043a \u0436\u0435, \u043a\u0430\u043a \u0434\u0435\u0440\u0436\u0430\u043d\u0438\u0435. \u042d\u0442\u043e \u043d\u0435 \u043f\u0430\u0441\u0441\u0438\u0432\u043d\u0430\u044f \u0438\u043d\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u044f \u2014 \u044d\u0442\u043e \u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0435 \u0443\u0447\u0430\u0441\u0442\u0438\u0435 \u0432 \u043a\u0440\u0443\u043f\u043d\u0435\u0439\u0448\u0435\u0439 \u0434\u0435\u0446\u0435\u043d\u0442\u0440\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043d\u043d\u043e\u0439 \u0438\u043d\u0438\u0446\u0438\u0430\u0442\u0438\u0432\u0435 \u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u044f.\n\n\u0413\u041b\u041e\u0411\u0410\u041b\u042c\u041d\u0410\u042f \u0421\u0415\u0422\u042c\n\n$APE \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442 \u043f\u043e \u043f\u0440\u043e\u0441\u0442\u043e\u043c\u0443, \u043d\u043e \u043c\u043e\u0449\u043d\u043e\u043c\u0443 \u043f\u0440\u0438\u043d\u0446\u0438\u043f\u0443: \u043a\u0430\u0436\u0434\u044b\u0439 \u0434\u0435\u0440\u0436\u0430\u0442\u0435\u043b\u044c \u2014 \u0443\u0447\u0438\u0442\u0435\u043b\u044c, \u0430 \u043a\u0430\u0436\u0434\u044b\u0439 \u0443\u0447\u0438\u0442\u0435\u043b\u044c \u0443\u043a\u0440\u0435\u043f\u043b\u044f\u0435\u0442 \u0441\u0435\u0442\u044c. \u0421\u0435\u0442\u044c \u0430\u043c\u0431\u0430\u0441\u0441\u0430\u0434\u043e\u0440\u043e\u0432 \u043e\u0445\u0432\u0430\u0442\u044b\u0432\u0430\u0435\u0442 \u043a\u043e\u043d\u0442\u0438\u043d\u0435\u043d\u0442\u044b \u0438 \u044f\u0437\u044b\u043a\u0438. \u0418\u0437 \u041b\u0430\u0433\u043e\u0441\u0430 \u0432 \u041b\u0438\u0441\u0441\u0430\u0431\u043e\u043d, \u0438\u0437 \u041c\u0443\u043c\u0431\u0430\u0438 \u0432 \u041c\u043e\u043d\u0442\u0440\u0435\u0430\u043b\u044c \u2014 \u0430\u043c\u0431\u0430\u0441\u0441\u0430\u0434\u043e\u0440\u044b $APE \u043f\u0440\u043e\u0432\u043e\u0434\u044f\u0442 \u043c\u0430\u0441\u0442\u0435\u0440-\u043a\u043b\u0430\u0441\u0441\u044b, \u0441\u043e\u0437\u0434\u0430\u044e\u0442 \u043a\u043e\u043d\u0442\u0435\u043d\u0442 \u0438 \u043e\u0431\u0443\u0447\u0430\u044e\u0442 \u043d\u043e\u0432\u044b\u0445 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439 DeFi. \u0421\u0435\u0442\u044c \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u043e\u0432\u0430\u043d\u0430 \u043f\u043e \u0433\u043b\u0430\u0432\u0430\u043c \u2014 \u043c\u0435\u0441\u0442\u043d\u044b\u0435 \u0433\u0440\u0443\u043f\u043f\u044b \u0430\u043c\u0431\u0430\u0441\u0441\u0430\u0434\u043e\u0440\u043e\u0432, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u0447\u0430\u044e\u0442 \u043d\u0430\u0434 \u0438\u043d\u0438\u0446\u0438\u0430\u0442\u0438\u0432\u0430\u043c\u0438 \u0432 \u0441\u0432\u043e\u0438\u0445 \u0441\u043e\u043e\u0431\u0441\u0442\u0432\u0430\u0445. \u041a\u0430\u0436\u0434\u0430\u044f \u0433\u043b\u0430\u0432\u0430 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u0430, \u043d\u043e \u0441\u0432\u044f\u0437\u0430\u043d\u0430 \u0441 \u043e\u0441\u0442\u0430\u043b\u044c\u043d\u044b\u043c\u0438 \u0447\u0435\u0440\u0435\u0437 \u0434\u0435\u0446\u0435\u043d\u0442\u0440\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043d\u043d\u0443\u044e \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u043e\u043d\u043d\u0443\u044e \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0443.\n\n\u0422\u041e\u041a\u0415\u041d\u041e\u041c\u0418\u041a\u0410\n\n\u041f\u0440\u0435\u0434\u0440\u044b\u043d\u043e\u0447\u043d\u044b\u0439 \u043a\u0443\u0440\u0441: 1 GRAM = 15,674 $APE \u2014 \u044d\u043e\u0442 \u043a\u0443\u0440\u0441 \u043e\u0442\u0440\u0430\u0436\u0430\u0435\u0442 \u043f\u0440\u0438\u0432\u0435\u0440\u043a\u0430\u043d\u043d\u043e\u0441\u0442\u044c \u043f\u0440\u043e\u0442\u043e\u043a\u043e\u043b\u0430 \u043a \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e\u0441\u0442\u0438. \u0411\u043e\u043b\u044c\u0448\u043e\u0435 \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0442\u043e\u043a\u0435\u043d\u043e\u0432 \u043d\u0430 GRAM \u043e\u0437\u043d\u0430\u0447\u0430\u0435\u0442, \u0447\u0442\u043e \u043a\u0430\u0436\u0434\u044b\u0439 \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a, \u043d\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043c\u043e \u043e\u0442 \u0440\u0430\u0437\u043c\u0435\u0440\u0430 \u043f\u043e\u0440\u0442\u0444\u0435\u043b\u044f, \u0434\u0435\u0440\u0436\u0438\u0442 \u0441\u043c\u044b\u0441\u043b\u043e\u0432\u0443\u044e \u0434\u043e\u043b\u044e. \u042d\u043a\u043e\u043d\u043e\u043c\u0438\u043a\u0430 $APE \u0446\u0438\u0440\u043a\u0443\u043b\u044f\u0440\u043d\u0430: \u0430\u043c\u0431\u0430\u0441\u0441\u0430\u0434\u043e\u0440\u044b \u0437\u0430\u0440\u0430\u0431\u0430\u0442\u044b\u0432\u0430\u044e\u0442 \u0442\u043e\u043a\u0435\u043d\u044b, \u043e\u0431\u0443\u0447\u0430\u044f \u0434\u0440\u0443\u0433\u0438\u0445, \u0442\u0440\u0430\u0442\u044f\u0442 \u0442\u043e\u043a\u0435\u043d\u044b \u0432\u043d\u0443\u0442\u0440\u0438 \u044d\u043a\u043e\u0441\u0438\u0441\u0442\u0435\u043c\u044b \u0438 \u043f\u0435\u0440\u0435\u0438\u043d\u0432\u0435\u0441\u0442\u0438\u0440\u0443\u044e\u0442 \u0432 \u0441\u0435\u0442\u044c \u0447\u0435\u0440\u0435\u0437 \u0443\u0447\u0430\u0441\u0442\u0438\u0435 \u0432 \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0438 \u0438 \u043f\u0440\u043e\u0432\u0438\u0434\u0435\u043d\u0438\u0435 \u043b\u0438\u043a\u0432\u0438\u0434\u043d\u043e\u0441\u0442\u0438.\n\n\u0424\u0420\u0410\u041c\u041c\u0412\u041e\u0420\u041a\u0410 \u041e\u0411\u0420\u0410\u0417\u041e\u0412\u0410\u041d\u0418\u042f\n\n\u0424\u0440\u0430\u043c\u043c\u043e\u0440\u043a\u0430 \u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u044f $APE \u0441\u043e\u0441\u0442\u043e\u0438\u0442 \u0438\u0437 \u0442\u0440\u0435\u0445 \u0441\u0442\u043e\u043b\u043f\u043e\u0432:\n\n1. \u041e\u0441\u043d\u043e\u0432\u044b DeFi \u2014 \u041f\u043e\u043d\u0438\u043c\u0430\u043d\u0438\u0435 \u043a\u043e\u0448\u0435\u043b\u044c\u043a\u043e\u0432, \u0442\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0438\u0439, \u043a\u043e\u043c\u0438\u0441\u0441\u0438\u0439, \u0441\u043c\u0430\u0440\u0442-\u043a\u043e\u043d\u0442\u0440\u0430\u043a\u0442\u043e\u0432 \u0438 \u043c\u0435\u0445\u0430\u043d\u0438\u0437\u043c\u043e\u0432 DEX. \u041a\u0430\u0436\u0434\u044b\u0439 \u043d\u043e\u0432\u044b\u0439 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c, \u0443\u0432\u0435\u0440\u0435\u043d\u043d\u043e \u043d\u0430\u0432\u0438\u0433\u0430\u044e\u0449\u0438\u0439 \u043a\u043e\u0448\u0435\u043b\u0435\u043a TON \u2014 \u044d\u0442\u043e \u043f\u043e\u0431\u0435\u0434\u0430 \u0434\u043b\u044f \u043f\u0440\u043e\u0442\u043e\u043a\u043e\u043b\u0430.\n\n2. \u0411\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u044c \u0438 \u0441\u0430\u043c\u043e\u0441\u0442\u043e\u044f\u0442\u0435\u044f\u043b\u044c\u043d\u043e\u0441\u0442\u044c \u2014 \u041e\u0431\u0443\u0447\u0435\u043d\u0438\u0435 \u043f\u0440\u0438\u043d\u0446\u0438\u043f\u0430\u043c \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u0447\u0430\u0441\u0442\u043d\u044b\u043c\u0438 \u043a\u043b\u044e\u0447\u0430\u043c\u0438, \u0440\u0435\u0437\u0435\u0440\u0432\u043d\u043e\u0435 \u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435 \u0441\u0438\u0434-\u043f\u0440\u0430\u0437, \u043f\u0440\u0435\u0434\u043e\u0441\u0442\u0435\u0440\u0435\u0436\u0435\u043d\u0438\u0435 \u0444\u0438\u0448\u0438\u043d\u0433\u043e\u0432\u044b\u043c \u043f\u043e\u0441\u043b\u0430\u043d\u0438\u044f\u043c \u0438 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u0443\u044e \u0440\u0430\u0431\u043e\u0442\u0443 \u0441\u043e \u0441\u043c\u0430\u0440\u0442-\u043a\u043e\u043d\u0442\u0440\u0430\u043a\u0442\u0430\u043c\u0438.\n\n3. \u0421\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044c\u0441\u0442\u0432\u043e \u0441\u043e\u043e\u0431\u0449\u0435\u0441\u0442\u0432 \u2014 \u041f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u043a\u0430 \u0430\u043c\u0431\u0430\u0441\u0441\u0430\u0434\u043e\u0440\u043e\u0432 \u043a \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u0438 \u043c\u0435\u0441\u0442\u043d\u044b\u0445 \u0432\u0441\u0442\u0440\u0435\u0447, \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044e \u043a\u043e\u043d\u0442\u0435\u043d\u0442\u0430 \u0438 \u043d\u0430\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u0438\u044e \u043d\u043e\u0432\u0438\u0447\u043a\u043e\u0432.\n\n\u0421\u0418\u0421\u0422\u0415\u041c\u0410 \u041d\u0410\u0413\u0420\u0410\u0416\u0414\u0415\u041d\u0418\u042f\n\n\u0410\u043c\u0431\u0430\u0441\u0441\u0430\u0434\u043e\u0440\u044b \u0437\u0430\u0440\u0430\u0431\u0430\u0442\u044b\u0432\u0430\u044e\u0442 $APE \u0437\u0430:\n- \u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435 \u0441\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0445 \u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u0445 \u0432\u0438\u043a\u0443\u0448\u0435\u043a\n- \u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u043d\u043e\u0432\u044b\u0445 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439\n- \u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u0438 \u0440\u0430\u0441\u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0435\u043d\u0438\u0435 \u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0433\u043e \u043a\u043e\u043d\u0442\u0435\u043d\u0442\u0430\n- \u041e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f \u043c\u0435\u0441\u0442\u043d\u044b\u0445 \u043c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u0439\n- \u0423\u0447\u0430\u0441\u0442\u0438\u0435 \u0432 \u0433\u043e\u043b\u043e\u0441\u043e\u0432\u0430\u043d\u0438\u0438\n\n\u0414\u041e\u0420\u041e\u0413\u0410\n\n\u0424\u0430\u0437\u0430 1: \u0413\u0435\u043d\u0435\u0437\u0438\u0441 \u2014 \u0417\u0430\u043f\u0443\u0441\u043a \u043f\u0440\u0435\u0434\u0440\u044b\u043d\u043a\u0430, \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u043e\u0441\u043d\u043e\u0432\u043d\u043e\u0433\u043e \u0441\u043e\u0441\u0442\u0430\u0432\u0430, \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0430 \u043e\u0441\u043d\u043e\u0432\u043d\u043e\u0439 \u0443\u0447\u0435\u0431\u043d\u043e\u0439 \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u044b.\n\n\u0424\u0430\u0437\u0430 2: \u042d\u043a\u0441\u043f\u0430\u043d\u0441\u0438\u044f \u2014 \u041c\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u0441\u0435\u0442\u0438 \u043d\u0430 50+ \u0441\u0442\u0440\u0430\u043d, \u0437\u0430\u043f\u0443\u0441\u043a \u0441\u0438\u0441\u0442\u0435\u043c\u044b \u0433\u043b\u0430\u0432, \u043f\u0430\u0440\u0442\u043d\u0435\u0440\u0441\u0442\u0432\u043e \u0441 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0430\u043c\u0438 \u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u044f.\n\n\u0424\u0430\u0437\u0430 3: \u0418\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044f \u2014 \u0421\u0432\u044f\u0437\u044c \u0441 \u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u043c\u0438 \u0443\u0447\u0440\u0435\u0436\u0434\u0435\u043d\u0438\u044f\u043c\u0438, \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u043e\u043d\u043d\u044b\u0435 \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u044b, \u0442\u0440\u0443\u0434\u043e\u0443\u0441\u0442\u0440\u043e\u0439\u0441\u0442\u0432\u043e.\n\n\u0424\u0430\u0437\u0430 4: \u0421\u043e\u0432\u0435\u0440\u0448\u0435\u043d\u0441\u0442\u0432\u043e \u2014 \u041f\u043e\u043b\u043d\u0430\u044f \u0434\u0435\u0446\u0435\u043d\u0442\u0440\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044f, \u043a\u0440\u0435\u0441\u0442-\u0446\u0435\u043f\u043e\u0447\u043d\u0430\u044f \u044d\u043a\u0441\u043f\u0430\u043d\u0441\u0438\u044f, \u0437\u0430\u043f\u0443\u0441\u043a Ambassador DAO.\n\n\u0412\u0418\u0414\u0415\u041d\u0418\u0415\n\n$APE \u0432\u0438\u0434\u0438\u0442 \u043c\u0438\u0440, \u0433\u0434\u0435 \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u0430\u044f \u0433\u0440\u0430\u043c\u043e\u0442\u043d\u043e\u0441\u0442\u044c \u2014 \u043f\u0440\u0430\u0432\u043e, \u0430 \u043d\u0435 \u043f\u0440\u0438\u0432\u0438\u043b\u0435\u0433\u0438\u044f. \u0413\u0434\u0435 \u043a\u0430\u0436\u0434\u044b\u0439 \u0447\u0435\u043b\u043e\u0432\u0435\u043a, \u043d\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043c\u043e \u043e\u0442 \u0433\u0435\u043e\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043a\u043e\u0433\u043e \u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u044f \u0438 \u0434\u043e\u0445\u043e\u0434\u0430, \u0438\u043c\u0435\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f \u043a \u0437\u043d\u0430\u043d\u0438\u044f\u043c, \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u044b\u043c \u0434\u043b\u044f \u0443\u0447\u0430\u0441\u0442\u0438\u044f \u0432 \u0434\u0435\u0446\u0435\u043d\u0442\u0440\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043d\u043d\u043e\u0439 \u044d\u043a\u043e\u043d\u043e\u043c\u0438\u043a\u0435. \u0413\u0434\u0435 \u0437\u043d\u0430\u043d\u0438\u0435 \u2014 \u044d\u0442\u043e \u0432\u0430\u043b\u044e\u0442\u0430, \u043a\u043e\u0442\u043e\u0440\u0430\u044f \u0438\u043c\u0435\u0435\u0442 \u043d\u0430\u0438\u0431\u043e\u043b\u044c\u0448\u0435\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435.\n\n\u041f\u0443\u0441\u044c \u0432\u0435\u043b\u0438\u043a. \u0422\u0440\u0430\u0441\u0441\u0430 \u0432\u044b\u0437\u043e\u0432\u0430. \u041d\u043e \u043f\u043b\u0435\u043c\u044f \u0440\u0430\u0441\u0442\u0451\u0442 \u0441 \u043a\u0430\u0436\u0434\u044b\u043c \u043d\u043e\u0432\u044b\u043c \u0430\u043c\u0431\u0430\u0441\u0441\u0430\u0434\u043e\u0440\u043e\u043c. \u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 $APE \u2014 \u0433\u0434\u0435 \u0437\u043d\u0430\u043d\u0438\u0435 \u2014 \u044d\u0442\u043e \u0441\u0430\u043c\u0430\u044f \u043c\u043e\u0449\u043d\u0430\u044f \u0432\u0430\u043b\u044e\u0442\u0430.",
    info_ape_h1v:"\u0413\u043b\u043e\u0431\u0430\u043b\u044c\u043d\u0430\u044f",info_ape_h1l:"\u0421\u0435\u0442\u044c",info_ape_h2v:"\u041e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u0435",info_ape_h2l:"\u0424\u043e\u043a\u0443\u0441",
    info_ape_h3v:"\u041c\u0438\u043a\u0440\u043e",info_ape_h3l:"\u0422\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0438\u0438",info_ape_h4v:"\u0421\u043e\u0431\u0449\u0435\u0441\u0442\u0432\u043e",info_ape_h4l:"\u0423\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435",
    chatWelcome:"\u041f\u0440\u0438\u0432\u0435\u0442! \u042f \u0432\u0430\u0448 AI-\u043f\u043e\u043c\u043e\u0449\u043d\u0438\u043a. \u0421\u043f\u0440\u043e\u0441\u0438\u0442\u0435 \u043c\u0435\u043d\u044f \u043e $MASON, $APE, \u043a\u0430\u043a \u043a\u0443\u043f\u0438\u0442\u044c, \u043a\u0443\u0440\u0441\u0430\u0445, \u0434\u043e\u0440\u043e\u0436\u043d\u043e\u0439 \u043a\u0430\u0440\u0442\u0435 \u0438\u043b\u0438 \u043e \u0447\u0435\u043c \u0443\u0433\u043e\u0434\u043d\u043e! \u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u043a\u043d\u043e\u043f\u043a\u0438 \u043d\u0438\u0436\u0435 \u0434\u043b\u044f \u0447\u0430\u0441\u0442\u044b\u0445 \u0432\u043e\u043f\u0440\u043e\u0441\u043e\u0432!",
    chatTitle:"\u041f\u043e\u043c\u043e\u0449\u043d\u0438\u043a AI",chatStatus:"\u041e\u043d\u043b\u0430\u0439\u043d"
},
uk:{
    nav_home:"\u0413\u043e\u043b\u043e\u0432\u043d\u0430",nav_tasks:"\u0417\u0430\u0432\u0434\u0430\u043d\u043d\u044f",nav_refs:"\u0420\u0435\u0444\u0435\u0440\u0430\u043b\u0438",nav_feed:"\u0427\u0430\u0442",
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
    nav_home:"Ana Sayfa",nav_tasks:"Gorevler",nav_refs:"Referanslar",nav_feed:"Sohbet",
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
    nav_home:"\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629",nav_tasks:"\u0627\u0644\u0645\u0647\u0627\u0645",nav_refs:"\u0627\u0644\u0625\u062d\u0627\u0644\u0627\u062a",nav_feed:"\u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0629",
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
    nav_home:"\u9996\u9875",nav_tasks:"\u4efb\u52a1",nav_refs:"\u63a8\u8350",nav_feed:"\u804a\u5929",
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
    nav_home:"\u0939\u094b\u092e",nav_tasks:"\u0915\u093e\u0930\u094d\u092f",nav_refs:"\u0930\u0947\u092b\u0930\u0932",nav_feed:"\u091a\u0948\u091f",
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
    var ids={navHomeLbl:"nav_home",navTasksLbl:"nav_tasks",navRefsLbl:"nav_refs",navFeedLbl:"nav_feed",
        rateLabel:"rate_label",liqLabel:"liq_label",pfBalanceLbl:"profile_balance",pfRefsLbl:"profile_refs",pfStatus:"profile_connected",
        tasksTitle:"tasks_title",refsTitle:"refs_title",refCountLbl:"refs_count",refEarnedLbl:"refs_earned",refCopyBtn:"refs_copy",refShareBtn:"refs_share",
        adminBalanceLbl:"admin_gram",adminNewsLbl:"admin_news",adminTaskLbl:"admin_tasks",
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
    $("chatTitle").textContent=t("chatTitle")||"AI Assistant";
    $("chatStatusText").textContent=t("chatStatus")||"Online";
    $("chatInput").placeholder=curLang==="ru"?"Задайте вопрос...":curLang==="uk"?"Запитайте...":curLang==="tr"?"Soru sorun...":"Ask a question...";
    renderChips(getQuickReplies("general"));
    renderTasks();
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
    var tokenAmt=(amt*TOKENS[curToken].rate);
    var docRef;
    try{
        docRef=await db.collection("purchases").add({
            userId:tgUser?tgUser.id.toString():"unknown",
            userName:tgUser?(tgUser.first_name+" "+(tgUser.last_name||"")):"unknown",
            userAvatar:tgUser?tgUser.photo_url||"":"",
            walletAddress:walletAddress,
            gramAmount:amt,
            token:curToken,
            tokenAmount:tokenAmt,
            status:"pending",
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
    }catch(e){console.error("Purchase log error:",e);showToast(t("toast_error"));return}
    try{
        await tcInstance.sendTransaction({validUntil:Math.floor(Date.now()/1000)+360,messages:[{address:ADMIN_WALLET,amount:(amt*1e9).toString()}]});
        try{await docRef.update({status:"paid",paidAt:firebase.firestore.FieldValue.serverTimestamp()})}catch(e){}
        db.collection("activity").add({
            userId:tgUser?tgUser.id.toString():"unknown",
            walletAddress:walletAddress,
            amount:amt,
            token:curToken,
            tokenAmount:tokenAmt,
            type:"purchase",
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        }).catch(function(e){});
        showToast(t("toast_buy_success"));closeSendModal();
    }catch(e){
        console.error("Buy error:",e);
        try{await docRef.update({status:"cancelled"})}catch(ignored){}
        showToast(t("toast_error")+": "+e.message)
    }
}

function toggleInfo(){$("infoCard").classList.toggle("expanded");$("infoToggle").textContent=$("infoCard").classList.contains("expanded")?t("read_less"):t("read_more")}

function switchTab(tab){
    document.querySelectorAll(".tab-content").forEach(function(el){el.classList.remove("active")});
    document.querySelectorAll(".nav-item").forEach(function(el){el.classList.remove("active")});
    var m={home:"tabHome",tasks:"tabTasks",refs:"tabRefs",chat:"tabChat"},n={home:"navHome",tasks:"navTasks",refs:"navRefs",chat:"navFeed"};
    if(m[tab])$(m[tab]).classList.add("active");if(n[tab])$(n[tab]).classList.add("active");
    if(tab==="refs")updateRefStats();
    if(tab==="chat")initChatRoom();
    if(tab==="home"){ $("chatFab").style.display="flex"; } else { $("chatFab").style.display="none"; }
}

function extractAccountHash(addr){
    addr=(addr||"").trim();
    if(addr.indexOf(":")>-1)return(addr.split(":")[1]||"").toLowerCase();
    var s=addr.replace(/-/g,"+").replace(/_/g,"/");
    while(s.length%4)s+="=";
    try{
        var bin=atob(s);
        if(bin.length>=37){
            var hash="";
            for(var i=5;i<37;i++)hash+=bin.charCodeAt(i).toString(16).padStart(2,"0");
            return hash;
        }
    }catch(e){}
    return addr.toLowerCase();
}
function checkAdminWallet(){
    var wa=(walletAddress||"").toLowerCase().replace(/^0:/,"");
    console.log("[ADMIN] wallet hex:",wa,"| admin hex:",ADMIN_HEX);
    isAdmin=(wa===ADMIN_HEX);
    console.log("[ADMIN] isAdmin:",isAdmin);
    if(isAdmin){$("adminSection").classList.add("show");updateAdminStats();loadAdminPayments();loadAdminPurchases()}
    else{$("adminSection").classList.remove("show")}
}
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
        if(task.link)h+='<button class="task-link-btn" onclick="openLink(\''+task.link.replace(/'/g,"\\'")+'\')">&#128279;</button>';
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
function loadAdminPurchases(){
    if(!isAdmin)return;
    if(window._purchasesUnsub)window._purchasesUnsub();
    window._purchasesUnsub=db.collection("purchases").orderBy("timestamp","desc").limit(30).onSnapshot(function(s){
        var h="";s.forEach(function(d){
            var p=d.data();var addr=p.walletAddress||"unknown";
            var addrShort=addr.slice(0,6)+"..."+addr.slice(-4);
            var ts=p.timestamp&&p.timestamp.seconds?new Date(p.timestamp.seconds*1000).toLocaleString():"";
            var sym=p.token==="ape"?"$APE":"$MASON";
            var color=p.token==="ape"?"#ff6b35":"var(--neon)";
            var st=p.status||"pending";
            var stColor=st==="paid"?"#4caf50":st==="cancelled"?"#f44336":"#ffa726";
            var stLabel=st==="paid"?"PAID":st==="cancelled"?"CANCELLED":"PENDING";
            h+='<div class="admin-purchase-item" style="border-left:3px solid '+stColor+'">';
            h+='<div class="api-top">';
            if(p.userAvatar)h+='<img class="api-avatar" src="'+p.userAvatar+'" onerror="this.style.display=\'none\'">';
            h+='<div class="api-info"><div class="api-name">'+escH(p.userName||"User")+'</div>';
            h+='<div class="api-wallet" onclick="navigator.clipboard.writeText(\''+addr+'\')">'+addrShort+' &#128203;</div>';
            h+='<div class="api-time">'+ts+'</div></div></div>';
            h+='<div class="api-action">';
            h+='<div style="font-size:11px;font-weight:700;color:'+stColor+';margin-bottom:4px">'+stLabel+'</div>';
            h+='<div class="api-received">'+(p.gramAmount||0)+' GRAM received</div>';
            h+='<div class="api-send">Send <strong>'+Number(p.tokenAmount||0).toLocaleString()+' <span style="color:'+color+'">'+sym+'</span></span></div>';
            h+='</div></div>';
        });
        if(!h)h='<div style="text-align:center;padding:10px;color:rgba(255,255,255,0.3);font-size:12px">No purchases yet</div>';
        $("adminPurchasesList").innerHTML=h;
    },function(e){console.error("Purchases listen error:",e)});
}
function loadAdminPayments(){
    if(!isAdmin)return;
    if(window._activityUnsub)window._activityUnsub();
    window._activityUnsub=db.collection("activity").orderBy("timestamp","desc").limit(20).onSnapshot(function(s){
        var h="";s.forEach(function(d){
            var data=d.data();
            h+='<div class="payment-item"><span class="pi-addr">'+(data.userId||"unknown").slice(0,10)+'...</span><span class="pi-amount">'+(data.amount||"")+' GRAM</span></div>';
        });
        if(!h)h='<div style="text-align:center;padding:10px;color:rgba(255,255,255,0.3);font-size:12px">No payments yet</div>';
        $("adminPaymentsList").innerHTML=h;
    }).catch(function(){});
}

window.addEventListener("load",function(){
    setTimeout(function(){$("preloader").classList.add("hide");$("bgImage").style.backgroundImage="url("+TOKENS[curToken].bgImg+")";$("bgImage").style.opacity="0.4"},1500);
    try{
        if(window.Telegram&&Telegram.WebApp){Telegram.WebApp.ready();Telegram.WebApp.expand();tgUser=Telegram.WebApp.initDataUnsafe?Telegram.WebApp.initDataUnsafe.user:null}
        var TC_UI=null;
        if(typeof TON_CONNECT_UI!=="undefined"&&TON_CONNECT_UI.TonConnectUI){TC_UI=TON_CONNECT_UI.TonConnectUI;console.log("[TC] Found TON_CONNECT_UI.TonConnectUI")}
        else if(typeof TonConnectUI!=="function"){console.warn("[TC] TON_CONNECT_UI:",typeof TON_CONNECT_UI,"TonConnectUI:",typeof TonConnectUI)}
        else{TC_UI=TonConnectUI;console.log("[TC] Found global TonConnectUI")}
        if(TC_UI){
            try{
                tcInstance=new TC_UI({manifestUrl:"https://recksach.github.io/chronogram-infinity/tonconnect-manifest.json",buttonRootId:"ton-connect"});
                tcInstance.onStatusChange(function(wallet){
                    if(wallet){
                        walletConnected=true;walletAddress=wallet.account?wallet.account.address:"";
                        $("profileSection").classList.add("show");
                        if(tgUser){$("pfName").textContent=tgUser.first_name+" "+(tgUser.last_name||"");$("pfId").textContent="@"+(tgUser.username||"unknown");if(tgUser.photo_url)$("pfAvatar").src=tgUser.photo_url}
                        checkAdminWallet();fetchCollectedGram();updateRefStats();
                    }else{walletConnected=false;walletAddress="";isAdmin=false; $("profileSection").classList.remove("show");$("adminSection").classList.remove("show");
                        if(window._purchasesUnsub){window._purchasesUnsub();window._purchasesUnsub=null}
                        if(window._activityUnsub){window._activityUnsub();window._activityUnsub=null}
                    }
                });
                console.log("[TC] TonConnect initialized OK, buttonRootId=ton-connect");
            }catch(e){console.error("[TC] Init error:",e);showToast("Wallet init failed: "+e.message)}
        }else{console.error("[TC] No TonConnectUI constructor found. TON_CONNECT_UI="+typeof window.TON_CONNECT_UI+" TonConnectUI="+typeof window.TonConnectUI);showToast("TonConnect not loaded")}
        renderLangSwitcher();updateAllTranslations();updateSocialLinks();updateBuyPresets();
        $("heroImg").src=TOKENS[curToken].logo;
        $("rateValue").textContent="1 GRAM = "+TOKENS[curToken].rate+" "+TOKENS[curToken].symbol;
        $("refLinkInput").value="https://t.me/"+BOT_USERNAME+"?start="+(tgUser?tgUser.id:"ref");
        fetchNews();fetchTasks();fetchCollectedGram();setInterval(fetchCollectedGram,15000);
        updateRefStats();
        document.body.className=TOKENS[curToken].themeClass;
    }catch(e){console.error("[APP] Init error:",e)}
});

var chatOpen=false;
function toggleChat(){
    chatOpen=!chatOpen;
    $("chatPanel").classList.toggle("open",chatOpen);
    $("chatFab").style.display=chatOpen?"none":"flex";
    if(chatOpen&&$("chatMessages").children.length===0){
        $("chatTitle").textContent=t("chatTitle")||"AI Assistant";
        $("chatStatusText").textContent=t("chatStatus")||"Online";
        addBotMsg(t("chatWelcome"));
        renderChips(getQuickReplies("general"));
    }
}

function addBotMsg(text){
    var m=document.createElement("div");m.className="chat-msg bot";m.textContent=text;
    $("chatMessages").appendChild(m);scrollChat();
}
function addUserMsg(text){
    var m=document.createElement("div");m.className="chat-msg user";m.textContent=text;
    $("chatMessages").appendChild(m);scrollChat();
}
function showTyping(){
    var t=document.createElement("div");t.className="chat-typing";t.id="typingIndicator";
    t.innerHTML="<span></span><span></span><span></span>";$("chatMessages").appendChild(t);scrollChat();
}
function hideTyping(){var t=$("typingIndicator");if(t)t.remove()}
function scrollChat(){var c=$("chatMessages");c.scrollTop=c.scrollHeight}
function renderChips(replies){
    var ch=$("chatChips");ch.innerHTML="";
    replies.forEach(function(r){var b=document.createElement("button");b.className="chat-chip";b.textContent=r.label;b.onclick=function(){handleChat(r.text)};ch.appendChild(b)});
}

function getQuickReplies(ctx){
    var lang=curLang||"en";
    var chips={
        en:[
            {text:"What is $MASON?",label:"$MASON"},
            {text:"What is $APE?",label:"$APE"},
            {text:"How to buy?",label:"How to buy"},
            {text:"What is GRAM?",label:"GRAM token"},
            {text:"What is the rate?",label:"Exchange rate"},
            {text:"Roadmap",label:"Roadmap"},
            {text:"What is admin wallet?",label:"Admin wallet"},
            {text:"Tokenomics",label:"Tokenomics"},
            {text:"Support contact",label:"Support"},
            {text:"How to connect wallet?",label:"Connect wallet"}
        ],
        ru:[
            {text:"Что такое $MASON?",label:"$MASON"},
            {text:"Что такое $APE?",label:"$APE"},
            {text:"Как купить?",label:"Как купить"},
            {text:"Что такое GRAM?",label:"GRAM"},
            {text:"Какой курс?",label:"Курс"},
            {text:"Дорожная карта",label:"Roadmap"},
            {text:"Как подключить кошелёк?",label:"Кошелёк"},
            {text:"Токеномика",label:"Токеномика"},
            {text:"Контакт поддержки",label:"Поддержка"}
        ],
        uk:[
            {text:"Що таке $MASON?",label:"$MASON"},
            {text:"Що таке $APE?",label:"$APE"},
            {text:"Як купити?",label:"Як купити"},
            {text:"Що таке GRAM?",label:"GRAM"},
            {text:"Який курс?",label:"Курс"},
            {text:"Дорожня карта",label:"Roadmap"}
        ],
        tr:[
            {text:"$MASON nedir?",label:"$MASON"},
            {text:"$APE nedir?",label:"$APE"},
            {text:"Nasıl alınır?",label:"Nasıl alınır"},
            {text:"GRAM nedir?",label:"GRAM"},
            {text:"Kur nedir?",label:"Kur"},
            {text:"Yol haritası",label:"Roadmap"}
        ],
        ar:[
            {text:"ما هو $MASON؟",label:"$MASON"},
            {text:"ما هو $APE؟",label:"$APE"},
            {text:"كيف أشتري؟",label:"كيف أشتري"},
            {text:"ما هو GRAM؟",label:"GRAM"},
            {text:"ما هو السعر؟",label:"السعر"},
            {text:"خارطة الطريق",label:"Roadmap"}
        ],
        zh:[
            {text:"什么是$MASON？",label:"$MASON"},
            {text:"什么是$APE？",label:"$APE"},
            {text:"怎么买？",label:"怎么买"},
            {text:"什么是GRAM？",label:"GRAM"},
            {text:"汇率是多少？",label:"汇率"},
            {text:"路线图",label:"路线图"}
        ],
        hi:[
            {text:"$MASON क्या है?",label:"$MASON"},
            {text:"$APE क्या है?",label:"$APE"},
            {text:"कैसे खरीदें?",label:"कैसे खरीदें"},
            {text:"GRAM क्या है?",label:"GRAM"},
            {text:"क्या दर है?",label:"दर"},
            {text:"रोडमैप",label:"रोडमैप"}
        ]
    };
    return chips[lang]||chips.en;
}

function sendChat(){
    var inp=$("chatInput");var q=inp.value.trim();if(!q)return;inp.value="";handleChat(q);
}
function handleChat(query){
    addUserMsg(query);renderChips(getQuickReplies("general"));
    showTyping();
    var delay=400+Math.random()*600;
    setTimeout(function(){hideTyping();var ans=chatKnowledgeBase(query);addBotMsg(ans)},delay);
}

var chatRoomInit=false;var chatUnsub=null;var chatReplyData=null;var chatImageData=null;var lastMsgTime=0;
function initChatRoom(){
    if(chatRoomInit)return;chatRoomInit=true;
    var unsub=db.collection("messages").orderBy("timestamp","asc").onSnapshot(function(s){
        var el=$("chatMessagesRoom");var wasAtBottom=el.scrollHeight-el.scrollTop-el.clientHeight<80;
        el.innerHTML="";
        s.forEach(function(doc){
            var m=doc.data();m.id=doc.id;
            var isOwn=tgUser&&m.userId===tgUser.id.toString();
            var isOwnAdmin=m.userId==="admin";
            var d=document.createElement("div");
            d.className="rm "+(isOwn?"rm-own":"rm-other");
            d.dataset.id=m.id;d.dataset.uid=m.userId;
            var h="";
            if(m.replyTo){
                h+='<div class="rm-reply-preview"><div class="rm-reply-name">'+escH(m.replyTo.userName||"")+'</div>'+escH(trunc(m.replyTo.text||"",40))+'</div>';
            }
            h+='<div class="rm-header">';
            if(m.userAvatar)h+='<img class="rm-avatar" src="'+escH(m.userAvatar)+'" onerror="this.style.display=\'none\'">';
            h+='<div class="rm-name">'+escH(m.userName||"User")+'</div></div>';
            if(m.image){
                var isSticker=m.image.length<50000;
                h+='<img class="rm-img'+(isSticker?" sticker":"")+'" src="'+m.image+'" onclick="window.open(this.src)" loading="lazy">';
            }
            if(m.text)h+='<div class="rm-text">'+escH(m.text)+'</div>';
            var ts=m.timestamp&&m.timestamp.seconds?new Date(m.timestamp.seconds*1000):new Date();
            h+='<div class="rm-time">'+ts.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})+'</div>';
            if(isOwn||isAdmin)h+='<button class="rm-del" onclick="deleteChatMsg(\''+m.id+'\')">&#10005;</button>';
            d.innerHTML=h;
            d.addEventListener("touchstart",function(e){this._sx=e.touches[0].clientX;this._sy=e.touches[0].clientY},{passive:true});
            d.addEventListener("touchend",function(e){
                var dx=e.changedTouches[0].clientX-this._sx;
                if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(e.changedTouches[0].clientY-this._sy)){
                    startReply(m.userName||"User",trunc(m.text||"[image]",40),m.id);
                }
            },{passive:true});
            el.appendChild(d);
        });
        if(wasAtBottom)el.scrollTop=el.scrollHeight;
    });
    chatUnsub=unsub;
}
function startReply(name,text,msgId){
    chatReplyData={userName:name,text:text,msgId:msgId};
    $("chatReplyBar").style.display="flex";
    $("chatReplyName").textContent=name;
    $("chatReplyText").textContent=trunc(text,50);
    $("chatRoomInput").focus();
}
function cancelReply(){chatReplyData=null;$("chatReplyBar").style.display="none"}
function sendRoomMessage(){
    var inp=$("chatRoomInput");var text=inp.value.trim();
    if(!text&&!chatImageData){return}
    var now=Date.now();
    if(now-lastMsgTime<60000){showToast("Wait 60 seconds between messages");return}
    lastMsgTime=now;
    var msg={userId:tgUser?tgUser.id.toString():"unknown",userName:tgUser?(tgUser.first_name+" "+(tgUser.last_name||"")):"Anonymous",userAvatar:tgUser&&tgUser.photo_url?tgUser.photo_url:"",text:text,timestamp:firebase.firestore.FieldValue.serverTimestamp()};
    if(chatImageData){msg.image=chatImageData;chatImageData=null}
    if(chatReplyData){msg.replyTo={msgId:chatReplyData.msgId,userName:chatReplyData.userName,text:chatReplyData.text};cancelReply()}
    db.collection("messages").add(msg).then(function(){inp.value=""}).catch(function(e){showToast("Error: "+e.message)});
}
function handleChatImage(e){
    var file=e.target.files[0];if(!file)return;
    if(file.size>10*1024*1024){showToast("Max 10MB");e.target.value="";return}
    var reader=new FileReader();
    reader.onload=function(ev){
        var img=new Image();
        img.onload=function(){
            var c=document.createElement("canvas");
            var maxW=800;var w=img.width;var h=img.height;
            if(w>maxW){h=Math.round(h*maxW/w);w=maxW}
            c.width=w;c.height=h;
            c.getContext("2d").drawImage(img,0,0,w,h);
            chatImageData=c.toDataURL("image/jpeg",0.7);
            var delay=400+Math.random()*400;
            setTimeout(function(){sendRoomMessage()},delay);
        };
        img.src=ev.target.result;
    };
    reader.readAsDataURL(file);e.target.value="";
}
function deleteChatMsg(id){
    if(!tgUser)return;
    db.collection("messages").doc(id).get().then(function(d){
        if(!d.exists)return;
        var data=d.data();
        if(isAdmin||data.userId===tgUser.id.toString()){
            db.collection("messages").doc(id).delete();
        }
    });
}
function escH(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function trunc(s,n){return s.length>n?s.substring(0,n)+"...":s}

var chatKB={
    en:{
        mason:{k:["mason","stone","masons","масон","масонь","каменщик","taşçı","الماسون","石匠","मेसन"],a:"$MASON — The Stone Masons Protocol. A community-driven token on TON blockchain. Total supply: 19,999 tokens. Rate: 1 GRAM = 6 $MASON. The protocol is built on transparency, community trust, and collective action. Currently in pre-market phase."},
        ape:{k:["ape","ambassador","амбассадор","посол","elçiliği","السفير","大使","राजदूत"],a:"$APE — The Ambassador's Protocol for Education. A global education movement on TON blockchain. Total supply: 360,000,000 tokens. Rate: 1 GRAM = 15,674 $APE. $APE bridges the knowledge gap in DeFi through education and community building. Currently in pre-market phase."},
        gram:{k:["gram","грам","грамм","gram","gram Token","gram token","גרם","غرام","格拉姆","ग्राम"],a:"GRAM is the token used for pre-market purchases on this platform. All GRAM payments go to the admin wallet: UQAGpJWn-FJd3wjB-aiChuiYH-9tdXAOhqu887uBtS1Ce4_7. After payment is confirmed, the corresponding $MASON or $APE tokens will be distributed."},
        buy:{k:["buy","purchase","купить","покупка","alın","satın","شراء","اشتري","购买","买","खरीदें","कैसे"],a:"To buy tokens:\n1. Connect your TON wallet using the button at the top\n2. Choose $MASON or $APE\n3. Select an amount or enter custom GRAM amount\n4. Click 'Buy' — you'll see the payment address\n5. Send the exact GRAM amount to the admin wallet\n6. After payment is confirmed, tokens will be distributed to your wallet."},
        rate:{k:["rate","курс","цена","fiyat","price","سعر","汇率","价格","दर","मूल्य","обмен","exchange"],a:"Current pre-market rates:\n• 1 GRAM = 6 $MASON\n• 1 GRAM = 15,674 $APE\nThese rates are fixed for the pre-market period."},
        roadmap:{k:["roadmap","дорожная карта","план","yol haritası","خارطة الطريق","路线图","रोडमैप"," roadmap","path","vision"],a:"The project is currently in the pre-market phase. The TON blockchain integration is being set up. Once the liquidity pool target of 7,000 GRAM is reached, the next steps will be announced. Stay tuned for updates in the chat!"},
        wallet:{k:["wallet","connect","кошелёк","кошелек","подключ","cüzdan","bağlantı","المحفظة","الاتصال","钱包","连接","बटुआ","जोड़ें"],a:"To connect your wallet:\n1. Make sure you're in Telegram (Mini App)\n2. Tap the 'Connect Wallet' button at the top\n3. Select your TON wallet (Tonkeeper, MyTonWallet, etc.)\n4. Confirm the connection in your wallet app\n\nThe wallet address will appear in your profile section."},
        tokenomics:{k:["tokenomics","токеномика","снабжение","максимум","supply","arz","token","токени","التوكن","توفير","代币","供应","टोकन","आपूर्ति"],a:"Tokenomics:\n$MASON — Total supply: 19,999 tokens\n$APE — Total supply: 360,000,000 tokens\n\nLiquidity target: 7,000 GRAM\nPre-market rates: 1 GRAM = 6 $MASON, 1 GRAM = 15,674 $APE"},
        admin:{k:["admin","админ","администратор","кошелёк админа","admin wallet","yönetici","المسؤول","管理员","प्रशासक","адрес"],a:"The admin wallet address: UQAGpJWn-FJd3wjB-aiChuiYH-9tdXAOhqu887uBtS1Ce4_7\n\nAll GRAM payments should be sent to this address. Only the admin can create tasks and manage the platform."},
        support:{k:["support","помощь","контакт","поддержка","destek","الدعم","支持","सहायता","contact","помощь"],a:"For support, contact @Superadminist on Telegram."},
        referral:{k:["referral","реферал","приглас","ref","refer","рекоменд"," referrals","davet","إحالة","推荐","推荐人","रेफरल"],a:"Referral system:\n• Share your unique referral link with friends\n• Earn 0.25% of each referred person's purchase\n• Track your referrals and earnings in the Profile section"},
        liquidity:{k:["liquidity","ликвидность","ликвид","likid","سيولة","流动性","तरलता"," pool","пул"],a:"Liquidity pool target: 7,000 GRAM\n\nThe current balance is shown in real-time at the top of the page. It updates every 15 seconds from the TON blockchain."},
        news:{k:["news","новости","новость","haber","الأخبار","新闻","समाचार"],a:"Check the Chat tab for the latest updates and community discussions. The admin posts important announcements there."},
        tasks:{k:["task","задание","задача","головоломка","görev","المهام","任务","कार्य"],a:"Complete tasks to earn tokens! Go to the Tasks tab to see available tasks. Tasks are created by the admin and include links to various platforms."},
        price:{k:["price","цена","стоимость","pre","market","pre-market","fiyat","premarket","السعر","السوق","价格","预市场","कीमत","प्री-मार्केट"],a:"This is a pre-market platform. Token prices:\n• 1 GRAM = 6 $MASON\n• 1 GRAM = 15,674 $APE\nPre-market prices are fixed until the official launch."}
    }
};
chatKB.ru={
    mason:{k:["mason","масон","каменщик","масонь","stone","тащи"],a:"$MASON — Протокол Каменных Масонов. Токен сообщества на блокчейне TON. Общее предложение: 19 999 токенов. Курс: 1 GRAM = 6 $MASON. Протокол построен на прозрачности и доверии сообщества. Сейчас находится на предрыночной фазе."},
    ape:{k:["ape","амбассадор","посол","ambassador"],a:"$APE — Протокол Амбассадоров Образования. Образовательное движение на блокчейне TON. Общее предложение: 360 000 000 токенов. Курс: 1 GRAM = 15,674 $APE. $APE восполняет пробел в знаниях о DeFi через образование и сообщество. Сейчас на предрыночной фазе."},
    gram:{k:["gram","грам","грамм"],a:"GRAM — токен для предрыночных покупок на этой платформе. Все платежи GRAM идут на кошелёк администратора: UQAGpJWn-FJd3wjB-aiChuiYH-9tdXAOhqu887uBtS1Ce4_7. После подтверждения оплаты токены $MASON или $APE будут распределены покупателям."},
    buy:{k:["buy","купить","покупка","как купить","как приобрести","alın"],a:"Как купить:\n1. Подключите кошелёк TON кнопкой сверху\n2. Выберите $MASON или $APE\n3. Укажите сумму в GRAM или выберите готовый вариант\n4. Нажмите «Купить» — увидите адрес оплаты\n5. Отправьте нужное количество GRAM на кошелёк администратора\n6. После подтверждения оплаты токены будут зачислены"},
    rate:{k:["rate","курс","цена","обмен","exchange","price"],a:"Текущие предрыночные курсы:\n• 1 GRAM = 6 $MASON\n• 1 GRAM = 15,674 $APE\nЭти курсы зафиксированы на период предрыночной торговли."},
    roadmap:{k:["roadmap","дорожная карта","план"],a:"Проект сейчас на предрыночной фазе. Идёт настройка интеграции с блокчейном TON. После достижения целевого показателя ликвидности (7 000 GRAM) будут объявлены следующие шаги. Следите за обновлениями в чате!"},
    wallet:{k:["wallet","кошелёк","кошелек","подключ"],a:"Подключение кошелька:\n1. Убедитесь, что вы в Telegram (Mini App)\n2. Нажмите кнопку «Подключить кошелёк» вверху\n3. Выберите кошелёк TON (Tonkeeper, MyTonWallet и др.)\n4. Подтвердите подключение в приложении кошелька\n\nАдрес кошелька появится в разделе профиля."},
    tokenomics:{k:["tokenomics","токеномика","снабжение","максимум","supply","токени"],a:"Токеномика:\n$MASON — Общее предложение: 19 999 токенов\n$APE — Общее предложение: 360 000 000 токенов\n\nЦелевая ликвидность: 7 000 GRAM\nПредрыночные курсы: 1 GRAM = 6 $MASON, 1 GRAM = 15 674 $APE"},
    admin:{k:["admin","админ","администратор","кошелёк админа"],a:"Адрес кошелька администратора: UQAGpJWn-FJd3wjB-aiChuiYH-9tdXAOhqu887uBtS1Ce4_7\n\nВсе платежи GRAM отправляются на этот адрес. Только администратор может создавать задания и управлять платформой."},
    support:{k:["support","помощь","контакт","поддержка"],a:"Для связи с поддержкой: @Superadminist в Telegram."},
    referral:{k:["referral","реферал","приглас","рекоменд"],a:"Реферальная система:\n• Поделитесь ссылкой с друзьями\n• Получайте 0.25% от покупки приглашённого\n• Отслеживайте рефералов и доход в разделе «Профиль»"},
    liquidity:{k:["liquidity","ликвидность","ликвид","пул"],a:"Целевой показатель ликвидности: 7 000 GRAM\n\nТекущий баланс обновляется в реальном времени вверху страницы (каждые 15 секунд)."},
    news:{k:["news","новости","новость"],a:"Смотрите вкладку «Чат» для последних обновлений и обсуждений сообщества. Администратор публикует важные объявления там."},
    tasks:{k:["task","задание","задача","головоломка"],a:"Выполняйте задания и получайте токены! Во вкладке «Задания» вы найдёте доступные задания. Задания создаются администратором и содержат ссылки на различные платформы."},
    price:{k:["price","цена","стоимость","premarket","pre-market"],a:"Это предрыночная платформа. Токены продаются по фиксированным курсам:\n• 1 GRAM = 6 $MASON\n• 1 GRAM = 15 674 $APE\nПредрыночные курсы зафиксированы до официального запуска."}
};

function chatKnowledgeBase(query){
    var q=query.toLowerCase().trim();
    var lang=curLang||"en";
    var kb=chatKB[lang]||chatKB.en;
    var keys=Object.keys(kb);
    var bestScore=0;var bestAns=null;
    for(var i=0;i<keys.length;i++){
        var entry=kb[keys[i]];
        for(var j=0;j<entry.k.length;j++){
            var kw=entry.k[j].toLowerCase();
            if(q.indexOf(kw)!==-1){
                var score=kw.length;
                if(score>bestScore){bestScore=score;bestAns=entry.a}
            }
        }
    }
    if(bestAns)return bestAns;
    var fallbacks={
        en:"I'm here to help! You can ask about $MASON, $APE, GRAM token, how to buy, rates, roadmap, wallet connection, tokenomics, support, referrals, and more. Try one of the quick buttons below!",
        ru:"Я здесь, чтобы помочь! Вы можете спросить о $MASON, $APE, токене GRAM, как купить, курсах, дорожной карте, подключении кошелька, токеномике, поддержке, рефералах и многом другом. Попробуйте одну из кнопок ниже!",
        uk:"Я тут, щоб допомогти! Ви можете запитати про $MASON, $APE, токен GRAM, як купити, курси, дорожню карту, підключення гаманця, токеноміку та підтримку. Спробуйте кнопки нижче!",
        tr:"Yardımcı olmak için buradayım! $MASON, $APE, GRAM tokenı, nasıl alınır, kur, yol haritası, cüzdan bağlantısı, tokenomik hakkında sorabilirsiniz. Aşağıdaki düğmeleri deneyin!",
        ar:"أنا هنا لمساعدتك! يمكنك السؤال عن $MASON و $APE ورمز GRAM وكيفية الشراء والأسعار وخريطة الطريق والمحفظة وال support. جرب الأزرار أدناه!",
        zh:"我在这里帮助你！你可以问关于$MASON、$APE、GRAM代币、如何购买、汇率、路线图、钱包连接、代币经济学等问题。试试下面的快捷按钮！",
        hi:"मैं यहाँ मदद के लिए हूँ! आप $MASON, $APE, GRAM टोकन, खरीदने के तरीके, दरें, रोडमैप, वॉलेट कनेक्शन, टोकनomics के बारे में पूछ सकते हैं। नीचे दिए गए बटन आज़माएं!"
    };
    return fallbacks[lang]||fallbacks.en;
}
