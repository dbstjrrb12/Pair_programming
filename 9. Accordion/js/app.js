const $accordion = document.querySelector('.accordion');
const $menuContainer = document.querySelector('.menu-container');
const $submenu = document.querySelector('.submenu');
const $submenuDiv = document.querySelector('.submenu > div');

// console.log(
//   window.getComputedStyle($submenuDiv).height.replace(/[a-z]+/g, '') *
//     $submenu.childElementCount
// );

// $submenu.style.setProperty(
//   'height',
//   window.getComputedStyle($submenuDiv).height.replace(/[a-z]+/g, '') *
//     $submenu.childElementCount +
//     'px'
// );
const render = () => {
  [...$accordion.children].forEach(child => {
    child.lastElementChild.style.setProperty(
      'transition',
      child.classList.contains('active')
        ? 'none'
        : child.lastElementChild.style.transition
    );

    child.lastElementChild.style.height = child.classList.contains('active')
      ? `${child.lastElementChild.scrollHeight}px`
      : '0';
  });
};

window.addEventListener('DOMContentLoaded', render);

$accordion.onclick = ({ target }) => {
  if (!target.classList.contains('menu')) return;

  const menuContainers = $accordion.children;

  [...menuContainers].forEach(container => {
    container.lastElementChild.style.setProperty(
      'transition',
      'height 0.4s ease'
    );
    if (container.classList.contains('active')) {
      container.classList.remove('active');
      container.lastElementChild.style.height = '0';
    } else if (
      !container.classList.contains('active') &&
      container === target.parentNode
    ) {
      container.classList.add('active');
      container.lastElementChild.style.height = `${container.lastElementChild.scrollHeight}px`;
    }
  });
};
