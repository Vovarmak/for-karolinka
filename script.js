// Функция, которую мы сделали раньше для открытия сообщения
function revealSecret() {
    const message = document.getElementById('secret-message');
    message.classList.remove('hidden');
}

// А это магия создания падающих сердечек
function createHeart() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    const heart = document.createElement('div');
    heart.innerText = '❤️';
    heart.style.position = 'absolute';
    // Случайное появление по всей ширине экрана
    heart.style.left = Math.random() * 100 + 'vw'; 
    heart.style.top = '-20px';
    // Случайный размер сердечек
    heart.style.fontSize = Math.random() * 15 + 10 + 'px'; 
    // Случайная скорость падения
    const duration = Math.random() * 3 + 2; 
    heart.style.opacity = Math.random() * 0.7 + 0.3;
    
    // Плавное падение через встроенные стили
    heart.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;
    
    container.appendChild(heart);

    // Запуск анимации движения вниз с легким покачиванием
    setTimeout(() => {
        const sideMovement = (Math.random() - 0.5) * 100; // покачивание влево-вправо
        heart.style.transform = `translateY(105vh) translateX(${sideMovement}px)`;
        heart.style.opacity = '0';
    }, 100);

    // Удаляем сердечко после того, как оно улетело за экран
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Создавать новое сердечко каждые 400 миллисекунд
setInterval(createHeart, 400);
