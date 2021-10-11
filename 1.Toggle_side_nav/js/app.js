const $container = document.querySelector('.container');
const $navigation = document.querySelector('nav');
const $main = document.querySelector('main');
const $icon = document.querySelector('.toggle');

const toggleActiveClass = () => {
  $navigation.classList.toggle('active');
  $navigation.classList.toggle('notransition');
  $main.classList.toggle('notransition');
  $icon.classList.toggle('notransition');
};

const toggleState = () => {
  let ts = localStorage.getItem('toggleState');
  if (ts === '1') {
    toggleActiveClass();
  }
};

window.addEventListener('DOMContentLoaded', toggleState);

$container.onclick = e => {
  if (!e.target.matches('main > i')) return;

  $navigation.classList.toggle('active');
  $navigation.classList.remove('notransition');
  $main.classList.remove('notransition');
  $icon.classList.remove('notransition');

  if ($navigation.classList.contains('active')) {
    localStorage.setItem('toggleState', '1');
  } else {
    localStorage.setItem('toggleState', '0');
  }
};
