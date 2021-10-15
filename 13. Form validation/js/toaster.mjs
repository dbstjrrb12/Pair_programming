import { $body } from './node.mjs';

const createToast = (type, title, message) => {
  const $toast = document.createElement('div');
  $toast.classList.add('toast', `toast-${type}`);

  $toast.innerHTML = `
    <h4 class="toast-heading">${title}</h4>
    <div class="toast-message">
      <svg width="24" height="24">
        <use xlink:href="#${type}" />
      </svg>
      <p>${message}</p>
    </div>
    <a class="close">&times;</a>
  `;

  return $toast;
};

const toast = target => {
  if (target.getAttribute('disabled') !== 'disabled') {
    $body.appendChild(
      createToast('success', 'Well done!', 'Signin successfully')
    );

    setTimeout(() => {
      $body.removeChild($body.querySelector('.toast'));
    }, 3000);
  }
};

export default toast;
