// DOM Nodes
const $increase = document.querySelector('.increase');
const $counter = document.querySelector('.counter');
const $decrease = document.querySelector('.decrease');

// state function (with closure);
const count = (function () {
  let count = 0;

  return {
    increase() {
      count += 1;
      return count;
    },

    decrease() {
      count += count > 0 ? -1 : 0;
      return count;
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

$increase.onclick = () => {
  count.increase();
  countRender();
};

$decrease.onclick = () => {
  count.decrease();
  countRender();
};
