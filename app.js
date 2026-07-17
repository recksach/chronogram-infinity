// Безопасный хелпер для поиска элементов по ID (как у вас в коде)
function $(id) {
    return document.getElementById(id);
}

// Глобальные переменные состояния приложения
let tcInstance = null;
let walletConnected = false;
let walletAddress = "";

// Функция вывода уведомлений на экран (Toast)
function showToast(message) {
    const toast = $("toast");
    if (toast) {
        toast.innerText = message;
        toast.style.display = "block";
        setTimeout(() => { toast.style.display = "none"; }, 3000);
    } else {
        console.log("Toast:", message);
    }
}

// Система перевода (если у вас используется t('...'))
function t(key) {
    const translations = {
        "toast_error": "Ошибка",
        "toast_initializing": "Инициализация кошелька TON, подождите..."
    };
    return translations[key] || key;
}

// Инициализация TonConnect UI
function initTonConnect() {
    // Проверяем, успела ли загрузиться библиотека из index.html
    if (!window.TonConnectUI) {
        console.error("Библиотека TonConnectUI еще не загружена в window.");
        return;
    }

    if (!tcInstance) {
        try {
            // Создаем экземпляр подключения кошелька
            tcInstance = new TonConnectUI.TonConnectUI({
                manifestUrl: 'https://recksach.github.io/chronogram-infinity/tonconnect-manifest.json',
                buttonRootId: null // Используем null, так как у нас кастомная HTML кнопка
            });

            console.log("TonConnect успешно запущен.");

            // Встроенный слушатель: сам следит, подключен кошелек или нет
            tcInstance.onStatusChange(function(wallet) {
                const connectBtn = $("connectWalletBtn");
                const profileSec = $("profileSection");
                const addrText = $("walletAddrText");

                if (wallet) {
                    walletConnected = true;
                    walletAddress = wallet.account.address;
                    
                    // Форматируем адрес для кнопки (например, EQB...4a2b)
                    const userFriendlyAddress = wallet.account.userFriendlyAddress || walletAddress;
                    const shortAddr = userFriendlyAddress.slice(0, 4) + "..." + userFriendlyAddress.slice(-4);
                    
                    console.log("Кошелек подключен:", userFriendlyAddress);

                    if (connectBtn) connectBtn.innerText = "Wallet: " + shortAddr;
                    if (addrText) addrText.innerText = userFriendlyAddress;
                    if (profileSec) profileSec.classList.add("show");
                } else {
                    // Если пользователь отключил кошелек
                    walletConnected = false;
                    walletAddress = "";
                    console.log("Кошелек отключен.");

                    if (connectBtn) connectBtn.innerText = "Connect Wallet";
                    if (profileSec) profileSec.classList.remove("show");
                }
            });

        } catch (error) {
            console.error("Ошибка при инициализации TonConnectUI:", error);
        }
    }
}

// Главная функция клика по кнопке "Connect Wallet"
window.connectWallet = function() {
    // Если кошелек уже подключен, кнопка просто открывает/закрывает профиль
    if (walletConnected) { 
        if ($("profileSection")) {
            $("profileSection").classList.toggle("show"); 
        }
        return; 
    }

    // Добавляем тактильный отклик (вибрацию) в Telegram при нажатии
    if (window.Telegram && Telegram.WebApp && Telegram.WebApp.HapticFeedback) {
        Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    // Если библиотека по какой-то причине не была готова, пробуем запустить ее снова
    if (!window.TonConnectUI || !tcInstance) { 
        showToast(t("toast_initializing")); 
        initTonConnect(); 
        return; 
    }
    
    // Открываем нативное модальное окно TON со списком всех доступных кошельков
    tcInstance.openModal().catch(function(e) { 
        console.error("Ошибка открытия модального окна кошелька:", e); 
        showToast(t("toast_error") + ": " + e.message); 
    });
};

// Запускаем всё строго в момент, когда структура страницы полностью готова
window.addEventListener('DOMContentLoaded', function() {
    if (window.Telegram && Telegram.WebApp) {
        Telegram.WebApp.ready();  // Сообщаем Telegram, что приложение загрузилось
        Telegram.WebApp.expand(); // Разворачиваем приложение на весь экран
    }
    
    // Инициализируем кошелек
    initTonConnect();
});