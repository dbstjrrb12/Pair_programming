// Node Element
const $HandSecond = document.querySelector('.second');
const $HandMinutes = document.querySelector('.minute');
const $HandHour = document.querySelector('.hour');

// state function
const setDate = () => {
  const now = new Date();

  const seconds = now.getSeconds();
  const degreeOfSeconds = (seconds / 60) * 360;

  const minute = now.getMinutes();
  const degreeOfMinutes = (minute / 60) * 360 + (seconds / 60) * 6;

  const hour = now.getHours();
  const degreeOfHours = (hour / 60) * 360 + (minute / 60) * 30;

  $HandSecond.style.setProperty('--deg', degreeOfSeconds);
  $HandMinutes.style.setProperty('--deg', degreeOfMinutes);
  $HandHour.style.setProperty('--deg', degreeOfHours);
};

window.setInterval(setDate, 1000);
