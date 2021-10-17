// DOM Nodes
const $container = document.querySelector('.container');
const $counter = document.querySelector('.counter');

// state function (with closure);
const count = (function () {
  let count = 0;

  return {
    increase() {
      count += 1;
    },

    decrease() {
      count += count > 0 ? -1 : 0;
    },

    getCount() {
      return count;
    }
  };
})();

const countRender = () => {
  $counter.textContent = count.getCount();
};

// Event handlers binding
window.addEventListener('DOMContentLoaded', countRender);

$container.onclick = e => {
  if (e.target.classList.contains('counter')) return;

  e.target.classList.contains('increase') ? count.increase() : count.decrease();

  countRender();
};
