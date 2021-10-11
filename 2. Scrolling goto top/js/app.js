// Node
const $scrollIcon = document.querySelector('.scroll-icon');

// Controll
const throttle = (callback, delay) => {
  let timerId;

  return event => {
    if (timerId) return;
    timerId = setTimeout(
      () => {
        callback(event);
        timerId = null;
      },
      delay,
      event
    );
  };
};

// Event Handler
window.addEventListener(
  'scroll',
  throttle(() => {
    $scrollIcon.style.display = scrollY >= 100 ? 'block' : 'none';
  }, 300)
);

$scrollIcon.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
