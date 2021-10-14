const createToast = (type, title, message) => {
  const $fragment = document.createDocumentFragment();
  const $toast = document.createElement('div');
  const $title = document.createElement('h4');
  const $message = document.createElement('div');
  const $icon = document.createElement('svg');
  const $use = document.createElement('use');
  const $p = document.createElement('p');
  const $close = document.createElement('a');

  $icon.appendChild($use);
  $message.appendChild($icon);

  $p.appendChild(document.createTextNode(message));
  $message.appendChild($p);

  $title.appendChild(document.createTextNode(title));
  $toast.appendChild($title);
  $toast.appendChild($message);

  // $close.appendChild(document.createTextNode(escape('&amp;')));
  $close.innerHTML = '&times;';
  $toast.appendChild($close);

  $fragment.appendChild($toast);

  $toast.classList.add('toast');
  $toast.classList.add(`toast-${type}`);

  $title.classList.add('toast-heading');
  $message.classList.add('toast-message');
  $close.classList.add('close');

  $icon.setAttribute('width', '24px');
  $icon.setAttribute('height', '24px');
  $use.setAttribute('xlink:href', `#${type}`);

  return $fragment;
};

export default createToast;
