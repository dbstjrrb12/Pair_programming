// DOM Nodes
const $container = document.querySelector('.container');
const $navigation = document.querySelector('nav');
const $main = document.querySelector('main');
const $icon = document.querySelector('.toggle');

// State function
const toggleActiveClass = () => {
  $navigation.classList.toggle('active');
  $navigation.classList.toggle('notransition');
  $main.classList.toggle('notransition');
  $icon.classList.toggle('notransition');
};

const toggleState = () => {
  const localStorageState = localStorage.getItem('toggleState');

  if (localStorageState === '1') toggleActiveClass();
};

// Event handler binding
window.addEventListener('DOMContentLoaded', toggleState);

$container.onclick = e => {
  if (!e.target.matches('main > i')) return;

  $navigation.classList.toggle('active');
  $navigation.classList.remove('notransition');
  $main.classList.remove('notransition');
  $icon.classList.remove('notransition');

  localStorage.setItem(
    'toggleState',
    $navigation.classList.contains('active') ? '1' : '0'
  );
};
