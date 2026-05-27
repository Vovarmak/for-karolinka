let timerInterval;
let clockInterval;

// 1. ОТКРЫТИЕ КОНВЕРТА
function openEnvelope() {
    const envelopeScene = document.getElementById('envelope-scene');
    const flap = document.querySelector('.flap');
    const loveCard = document.getElementById('love-card');

    if (flap) {
        flap.style.transform = 'rotateX(180deg)';
    }

    setTimeout(() => {
        envelopeScene.style.opacity = '0';
        envelopeScene.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        setTimeout(() => {
            envelopeScene.style.display = 'none'; 
            loveCard.style.display = 'flex';
            
            setTimeout(() => {
                loveCard.style.opacity = '1';
                loveCard.style.transform = 'scale(1)'; 
            }, 50);
            
            setInterval(createHeart, 50); // Ураган сердечек 50мс
        }, 1000);
    }, 1400); 
}

// 2. РАЗЛЁТ ОКОН И ВОЗВРАТ СЛОЕВ
function revealSecret() {
    const button = document.getElementById('love-button');
    const secretMessage = document.getElementById('secret-message');
    const knownCard = document.getElementById('known-card');
    const datingCard = document.getElementById('dating-card');

    if (button) { button.style.display = 'none'; }
    if (secretMessage) { secretMessage.style.display = 'block'; }

    // Возвращаем боковые карточки на передний слой и разрешаем взаимодействие
    knownCard.style.zIndex = '10';
    knownCard.style.pointerEvents = 'all';
    knownCard.style.visibility = 'visible';
    knownCard.style.opacity = '1';
    knownCard.style.transform = 'translateX(0) scale(1)';

    datingCard.style.zIndex = '10';
    datingCard.style.pointerEvents = 'all';
    datingCard.style.visibility = 'visible';
    datingCard.style.opacity = '1';
    datingCard.style.transform = 'translateX(0) scale(1)';

    updateAllTimers();
    updateAllClocks();
    
    timerInterval = setInterval(updateAllTimers, 1000);
    clockInterval = setInterval(updateAllClocks, 1000);
}

// 3. ЖИВЫЕ ЧАСЫ
function updateAllClocks() {
    const now = new Date();
    const secs = now.getSeconds();
    const mins = now.getMinutes();
    const hours = now.getHours();

    const secDegrees = secs * 6; 
    const minDegrees = (mins * 6) + (secs * 0.1); 
    const hourDegrees = ((hours % 12) * 30) + (mins * 0.5); 

    document.getElementById('sec-hand-1').style.transform = `rotate(${secDegrees}deg)`;
    document.getElementById('min-hand-1').style.transform = `rotate(${minDegrees}deg)`;
    document.getElementById('hour-hand-1').style.transform = `rotate(${hourDegrees}deg)`;

    document.getElementById('sec-hand-2').style.transform = `rotate(${secDegrees}deg)`;
    document.getElementById('min-hand-2').style.transform = `rotate(${minDegrees}deg)`;
    document.getElementById('hour-hand-2').style.transform = `rotate(${hourDegrees}deg)`;
}

// 4. ЖИВЫЕ ТАЙМЕРЫ
function updateAllTimers() {
    const knownDate = new Date(2025, 5, 12, 2, 0, 0);  // 12 июня 2025
    const datingDate = new Date(2025, 7, 28, 21, 15, 0); // 28 августа 2025, 21:15
    const now = new Date();

    document.getElementById('known-timer').innerHTML = calculateTimeDifference(knownDate, now);
    document.getElementById('dating-timer').innerHTML = calculateTimeDifference(datingDate, now);
}

function calculateTimeDifference(startDate, endDate) {
    let difference = endDate - startDate;
    if (difference < 0) return "This date is in the future!";

    const msInSecond = 1000;
    const msInMinute = 60 * 1000;
    const msInHour = 60 * 60 * 1000;
    const msInDay = 24 * 60 * 60 * 1000;

    const days = Math.floor(difference / msInDay);
    difference %= msInDay;

    const hours = Math.floor(difference / msInHour);
    difference %= msInHour;

    const minutes = Math.floor(difference / msInMinute);
    difference %= msInMinute;

    const seconds = Math.floor(difference / msInSecond);

    return `${days} days, ${hours} hours,<br>${minutes} mins, ${seconds} secs`;
}

// 5. ФАБРИКА СЕРДЕЧЕК
function createHeart() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    const heart = document.createElement('div');
    heart.innerText = '❤️';
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * 100 + 'vw'; 
    heart.style.top = '-20px';
    heart.style.fontSize = Math.random() * 15 + 12 + 'px'; 
    
    const duration = Math.random() * 3 + 2; 
    heart.style.opacity = Math.random() * 0.6 + 0.4;
    heart.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;
    
    container.appendChild(heart);

    setTimeout(() => {
        const sideMovement = (Math.random() - 0.5) * 120;
        heart.style.transform = `translateY(105vh) translateX(${sideMovement}px)`;
        heart.style.opacity = '0';
    }, 100);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}
