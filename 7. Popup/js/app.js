// DOM Nodes
const $togglePopup = document.querySelector('.popup-button');
const $modal = document.querySelector('.modal');
const $inputForm = document.querySelector('.input-form');
const $popupInput = document.querySelector('.popup-input');
const $popupMessage = document.querySelector('.popup-message');

const addPopupMessage = content => {
  $popupMessage.textContent = `from popup: ${content}`;
};

// Event handlers binding
$togglePopup.onclick = () => {
  $modal.removeAttribute('hidden');
};

$modal.onclick = e => {
  if (!e.target.matches('.modal') && !e.target.matches('button')) return;
  $modal.setAttribute('hidden', '');
};

$inputForm.onsubmit = e => {
  e.preventDefault();

  const content = $popupInput.value.trim();
  if (content) addPopupMessage(content);

  $popupInput.value = '';
  $modal.setAttribute('hidden', '');
};
