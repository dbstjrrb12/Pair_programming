// DOM Node
const $body = document.querySelector('body');
const $buttonOn = document.querySelector('.toggle-button-text-on');
const $buttonOff = document.querySelector('.toggle-button-text-off');

// Event Handler

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
