import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Отримуємо форму та встановлюємо обробник події submit
const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Отримуємо значення з полів форми
  const delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);

  // Створюємо проміси за введеними значеннями
  for (let i = 1; i <= amount; i += 1) {
    const position = i;
    const promiseDelay = delay + (i - 1) * step; // Застосовуємо крок для кожного наступного промісу
    // console.log('promiseDelay', promiseDelay)


    createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        // console.log('delay', delay)
        // Виконується при виконанні промісу
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // Виконується при відхиленні промісу
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});