// DOM Node
const $datePicker = document.querySelector('.custom-datepicker');
const $calendarDetail = document.querySelector('.calendar_detail');
const $calendarGrid = document.querySelector('.calendar_grid');
const $month = document.querySelector('.month');
const $year = document.querySelector('.year');
const $prev = document.querySelector('.prev');
const $next = document.querySelector('.next');

const MONTH = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const DAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const GRIDSIZE = 42;

// state function
const render = (prevDay, totalDay, firstDate) => {
  const day = `<ul class="day">${DAY.map(day => `<li><p>${day}</p></li>`).join(
    ''
  )}</ul>`;

  const thisdate = `${Array.from({ length: totalDay }, (_, i) => i + 1)
    .map(date => `<div class='this-date'>${date}</div>`)
    .join('')}`;

  const prevdate = `${Array.from({ length: firstDate }, (_, i) => prevDay - i)
    .reverse()
    .map(date => `<div class='date'>${date}</div>`)
    .join('')}`;

  const nexdate = `${Array.from(
    { length: GRIDSIZE - (totalDay + firstDate) },
    (_, i) => i + 1
  )
    .map(date => `<div class='date'>${date}</div>`)
    .join('')}`;

  $calendarGrid.innerHTML = day + prevdate + thisdate + nexdate;
};

const prevNext = (function () {
  let prev = 0;
  let next = 0;

  return {
    getPrev() {
      return prev;
    },

    getNext() {
      return next;
    },

    setPrev(val = 0) {
      prev = val && prev + 1;
    },

    setNext(val = 0) {
      next = val && next + 1;
    }
  };
})();

const getNow = count => {
  const now = new Date();

  const nextMonth = now.getMonth() + count;

  if (nextMonth > 12) {
    prevNext.setNext();
  } else if (nextMonth < 0) {
    prevNext.setPrev();
  }

  const key = {
    year:
      nextMonth > 12
        ? now.getFullYear() + 1
        : nextMonth < 0
        ? now.getFullYear() - 1
        : now.getFullYear(),

    month: nextMonth > 12 ? 0 : nextMonth < 0 ? 12 : nextMonth
  };

  console.log(key);

  const prevDay = new Date(key.year, key.month, 0).getDate();
  const totalDay = new Date(key.year, key.month + 1, 0).getDate();
  const firstDate = new Date(key.year, key.month, 1).getDay();

  $month.textContent = MONTH[key.month % 12];
  $year.textContent = now.getFullYear();

  render(prevDay, totalDay, firstDate);
};

// Event Handler
$datePicker.onfocus = () => {
  $calendarDetail.getAttribute('hidden') === 'hidden'
    ? $calendarDetail.removeAttribute('hidden')
    : $calendarDetail.setAttribute('hidden', 'hidden');

  getNow(0);
};

$prev.onclick = () => {
  prevNext.setPrev(1);
  console.log(prevNext.getPrev());

  if (key.month + 1 > 12) key.year += 1;

  getNow(-prevNext.getPrev());
};

$next.onclick = () => {
  prevNext.setNext(1);
  console.log(prevNext.getNext());

  getNow(prevNext.getNext());
};
