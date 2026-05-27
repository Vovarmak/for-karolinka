// 1. ФУНКЦИЯ КИНЕМАТОГРАФИЧНОГО ОТКРЫТИЯ КОНВЕРТА
function openEnvelope() {
    const envelopeScene = document.getElementById('envelope-scene');
    const flap = document.querySelector('.flap');
    const loveCard = document.getElementById('love-card');

    // Начинает открываться крышка конверта (на это уйдет 1.5 секунды)
    if (flap) {
        flap.style.transform = 'rotateX(180deg)';
    }

    // Через 1.4 секунды сам конверт начинает медленно таять (opacity: 0)
    setTimeout(() => {
        envelopeScene.style.opacity = '0';
        envelopeScene.style.transform = 'scale(0.8)';
        
        // Еще через 1 секунду полностью убираем конверт и включаем проявление письма
        setTimeout(() => {
            envelopeScene.style.display = 'none'; 
            
            // Выводим карточку на передний план и разрешаем клики
            loveCard.style.zIndex = '10';
            loveCard.style.pointerEvents = 'all';
            
            // Запускаем безупречно плавное проявление (на 3 секунды)
            loveCard.style.opacity = '1';
            loveCard.style.transform = 'scale(1)'; // Карточка мягко увеличится до нормы
            
            // Включаем снегопад из падающих сердечек
            setInterval(createHeart, 50);
        }, 1000);
    }, 1400); 
}

// 2. ФУНКЦИЯ ПОЯВЛЕНИЯ ТЕКСТА ВНУТРИ ОТКРЫТКИ
function revealSecret() {
    const message = document.getElementById('secret-message');
    if (message) {
        message.style.display = 'block'; 
        message.classList.remove('hidden');
    }

    const button = document.getElementById('love-button');
    if (button) {
        button.style.display = 'none'; // прячем внутреннюю кнопку
    }
}

// 3. ФАБРИКА СЕРДЕЧЕК НА ФОНЕ
function createHeart() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    const heart = document.createElement('div');
    heart.innerText = '❤️';
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * 100 + 'vw'; 
    heart.style.top = '-20px';
    heart.style.fontSize = Math.random() * 15 + 15 + 'px'; 
    
    const duration = Math.random() * 3 + 2; 
    heart.style.opacity = Math.random() * 0.7 + 0.3;
    heart.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;
    
    container.appendChild(heart);

    setTimeout(() => {
        const sideMovement = (Math.random() - 0.5) * 100;
        heart.style.transform = `translateY(105vh) translateX(${sideMovement}px)`;
        heart.style.opacity = '0';
    }, 100);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}
