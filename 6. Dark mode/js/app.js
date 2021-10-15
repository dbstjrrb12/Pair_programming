// DOM Node
const $body = document.querySelector('body');
const $buttonOn = document.querySelector('.toggle-button-text-on');
const $buttonOff = document.querySelector('.toggle-button-text-off');
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

// Event Handler
window.addEventListener('DOMContentLoaded', () => {
  $body.style.opacity = '0';

  const isDark = localStorage.getItem('theme') === 'dark';
  const isWhite = localStorage.getItem('theme') === 'white';
  const isEmpty = localStorage.getItem('theme') === '';

  $body.classList.toggle('dark', isDark || !isWhite);
  if (isEmpty) $body.classList.toggle('dark', darkModeMediaQuery.matches);

  setTimeout(() => {
    $body.style.opacity = '1';
  }, 300);
});

darkModeMediaQuery.addEventListener('change', e => {
  $body.classList.toggle(
    'dark',
    e.matches && localStorage.getItem('theme') === ''
  );
});

$buttonOff.onclick = () => {
  if ($body.classList.contains('dark')) return;

  $body.classList.add('dark');
  localStorage.setItem('theme', 'dark');
};

$buttonOn.onclick = () => {
  if (!$body.classList.contains('dark')) return;

  $body.classList.remove('dark');
  localStorage.setItem('theme', 'white');
};
