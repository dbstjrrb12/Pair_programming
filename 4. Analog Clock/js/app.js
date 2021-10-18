// DOM Nodes
const $secondHand = document.querySelector('.second');
const $minuteHand = document.querySelector('.minute');
const $hourHand = document.querySelector('.hour');

// state function
const setTime = () => {
  const now = new Date();

  const seconds = now.getSeconds();
  const degreeOfSeconds = (seconds / 60) * 360;

  const minutes = now.getMinutes();
  const degreeOfMinutes = (minutes / 60) * 360 + (seconds / 60) * 6;

  const hours = now.getHours();
  const degreeOfHours = (hours / 12) * 360 + (minutes / 60) * 30;

  $secondHand.style.setProperty('--deg', degreeOfSeconds);
  $minuteHand.style.setProperty('--deg', degreeOfMinutes);
  $hourHand.style.setProperty('--deg', degreeOfHours);
};

// Event handler binding
window.addEventListener('DOMContentLoaded', () => {
  setTime();
  window.setInterval(setTime, 1000);
});
