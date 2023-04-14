// Імпортуємо бібліотеки
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

// Отримуємо посилання на елементи 
const startBtn = document.querySelector('[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');


// Вимикаємо кнопку "Start" за замовчуванням
startBtn.disabled = true;

// оголошуємо об'єкт параметрів та обробляємо в ньому події невірної дати
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure("Please choose a date in the future");
      startBtn.disabled = true;
    } else {
        startBtn.disabled = false;
    }
    console.log(selectedDates[0]);
  },
};

// Викликаємо flatpickr
flatpickr("#datetime-picker", options);

// Додаємо слухач на кнопку "Start"
startBtn.addEventListener('click', onStartBtn);

// Колбек функція слухача 
function onStartBtn () {
    const selectedDate = new Date(datetimePicker.value);
    const timerInterval = setInterval(updateTimer, 1000);
    startBtn.disabled = true;
    // Колбек функція timerInterval
    function updateTimer() {
        const currentDate = new Date();
        const timeDifference = selectedDate - currentDate;

        if (timeDifference <= 0) {
            clearInterval(timerInterval);
            return;
        }
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        daysElement.textContent = String(days).padStart(2, '0');
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
    }
}