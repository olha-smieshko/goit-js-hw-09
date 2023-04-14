// Отримуємо посилання на кнопки
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
// Вимикаємо кнопку "Stop" за замовчуванням
stopBtn.disabled = true;
// Додаємо подію "click" на кнопку "Start"
startBtn.addEventListener('click', OnStartBtn);

// Додаємо подію "click" на кнопку "Stop"
stopBtn.addEventListener('click', OnStopBtn);

let intervalId; // Ідентифікатор інтервалу

// Функція, яка починає зміну кольору
function OnStartBtn() {
  startBtn.disabled = true; // Вимикаємо кнопку "Start"
  stopBtn.disabled = false; // Включаємо кнопку "Stop"
  intervalId = setInterval(changeBodyBgColor, 1000); // Встановлюємо інтервал на зміну кольору
}

// Функція, яка зупиняє зміну кольору
function OnStopBtn() {
  startBtn.disabled = false; // Включаємо кнопку "Start"
  stopBtn.disabled = true; // Вимикаю кнопку "Stop"
  clearInterval(intervalId); // Видаляємо інтервал
}

// Функція, яка змінює колір фону
function changeBodyBgColor() {
  document.body.style.backgroundColor = getRandomHexColor(); // Встановлюємо випадковий колір фону
}

// Функція для генерації випадкового HEX-кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}