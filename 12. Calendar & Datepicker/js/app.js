// DOM Nodes
const $body = document.querySelector('body');
const $datePicker = document.querySelector('.custom-datepicker');
const $calendarDetail = document.querySelector('.calendar_detail');
const $calendarGrid = document.querySelector('.calendar_grid');
const $month = document.querySelector('.month');
const $year = document.querySelector('.year');
const $prev = document.querySelector('.prev');
const $next = document.querySelector('.next');

// state
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
const WEEK = 7;

const yearMonth = (function () {
  const key = {
    year: 0,
    month: 0,
    day: 0
  };

  return {
    getkey() {
      return key;
    },

    setkey(year, month, day) {
      key.year = year;
      key.month = month;
      key.day = day;
    }
  };
})();

// state function
const countDay = (prevMonthLastDay, totalDay, lastDate) => {
  const prevdayCount = prevMonthLastDay >= 6 ? 0 : prevMonthLastDay + 1;
  return totalDay + (WEEK - (lastDate + 1)) + prevdayCount;
};

const render = (prevDay, totalDay, firstDate, lastDate, gridCount) => {
  $calendarGrid.style.setProperty(
    'grid-template-rows',
    gridCount > 35 ? 'repeat(7, 1fr)' : 'repeat(6, 1fr)'
  );

  const start = firstDate === 0 ? 1 : WEEK - firstDate + 1;

  const day = `<ul class="day">${DAY.map(
    day => `<li class='weekday'><p>${day}</p></li>`
  ).join('')}</ul>`;

  const thisdate = `${Array.from({ length: totalDay }, (_, i) => i + 1)
    .map((date, i) =>
      (i + 1 - start) % 7 === 0
        ? `<div class='this-date sunday'>${date}</div>`
        : `<div class='this-date'>${date}</div>`
    )
    .join('')}`;

  const prevdate = `${Array.from({ length: firstDate }, (_, i) => prevDay - i)
    .reverse()
    .map(date => `<div class='prev-date'>${date}</div>`)
    .join('')}`;

  const nexdate = `${Array.from(
    { length: WEEK - (lastDate + 1) },
    (_, i) => i + 1
  )
    .map(date => `<div class='next-date'>${date}</div>`)
    .join('')}`;

  $calendarGrid.innerHTML = day + prevdate + thisdate + nexdate;

  const $selectDay = [
    ...$calendarGrid.querySelectorAll('div.this-date')
  ].filter((_, i) => i + 1 === yearMonth.getkey().day);

  const $today = [...$calendarGrid.querySelectorAll('div.this-date')].filter(
    (_, i) =>
      i + 1 === new Date().getDate() &&
      yearMonth.getkey().month === new Date().getMonth() &&
      yearMonth.getkey().year === new Date().getFullYear()
  );

  if ($today.length) $today[0].classList.add('today');
  $selectDay[0].classList.add('select');
};

const getNow = () => {
  const now = new Date();

  yearMonth.setkey(now.getFullYear(), now.getMonth(), now.getDate());

  const prevDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  const totalDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const firstDate = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const lastDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    totalDay
  ).getDay();

  const gridCount = countDay(
    new Date(now.getFullYear(), now.getMonth(), 0).getDay(),
    totalDay,
    lastDate
  );

  $month.textContent = MONTH[now.getMonth()];
  $year.textContent = now.getFullYear();

  render(prevDay, totalDay, firstDate, lastDate, gridCount);
};

const getNextPrev = count => {
  // 버튼에 따라 연도, 월 값 세팅하기
  const now = yearMonth.getkey();

  let { year } = now;
  let { month } = now;
  const { day } = now;

  year = month + count >= 12 ? year + 1 : month + count < 0 ? year - 1 : year;
  month = month + count >= 12 ? 0 : month + count < 0 ? 11 : month + count;

  yearMonth.setkey(year, month, day);

  // 상태값 불러오기
  const newNow = yearMonth.getkey();

  const prevDay = new Date(newNow.year, newNow.month, 0).getDate();
  const totalDay = new Date(newNow.year, newNow.month + 1, 0).getDate();
  const firstDate = new Date(newNow.year, newNow.month, 1).getDay();
  const lastDate = new Date(newNow.year, newNow.month, totalDay).getDay();
  const gridCount = countDay(
    new Date(newNow.year, newNow.month, 0).getDay(),
    totalDay,
    lastDate
  );

  $month.textContent = MONTH[newNow.month];
  $year.textContent = newNow.year;

  render(prevDay, totalDay, firstDate, lastDate, gridCount);
};

const insertInputValue = () => {
  const key = yearMonth.getkey();

  return `${key.year}-${key.month < 9 ? `0${key.month + 1}` : key.month + 1}-${
    key.day < 10 ? `0${key.day}` : key.day
  }`;
};

// Event handlers binding
$body.onclick = e => {
  if (
    e.target.classList.contains('custom-datepicker') ||
    [...document.querySelectorAll('.calendar_detail *')]
      .map(element => element.className)
      .includes(e.target.className)
  )
    return;

  $calendarDetail.style.setProperty('display', 'none');
};

$datePicker.onfocus = () => {
  $calendarDetail.style.setProperty('display', 'flex');

  getNow();
};

$prev.onclick = () => {
  getNextPrev(-1);

  $datePicker.value = insertInputValue();
};

$next.onclick = () => {
  getNextPrev(1);

  $datePicker.value = insertInputValue();
};

$calendarGrid.onclick = ({ target }) => {
  if (target.matches('.calendar_grid')) return;

  [...$calendarGrid.children].forEach(child => {
    if (child.classList.contains('select')) child.classList.remove('select');
  });

  target.classList.add('select');

  const { year, month } = yearMonth.getkey();

  if (target.classList.contains('prev-date')) {
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = prevMonth === 11 ? year - 1 : year;

    $datePicker.value = `${prevYear}-${
      prevMonth < 9 ? `0${prevMonth + 1}` : prevMonth + 1
    }-${
      +target.textContent < 10 ? `0${+target.textContent}` : +target.textContent
    }`;
    yearMonth.setkey(year, month, +target.textContent);
  }

  if (target.classList.contains('next-date')) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = nextMonth === 0 ? year + 1 : year;

    $datePicker.value = `${nextYear}-${
      nextMonth < 9 ? `0${nextMonth + 1}` : nextMonth + 1
    }-${
      +target.textContent < 10 ? `0${+target.textContent}` : +target.textContent
    }`;
    yearMonth.setkey(year, month, +target.textContent);
  }

  if (target.classList.contains('this-date')) {
    yearMonth.setkey(year, month, +target.textContent);

    $datePicker.value = insertInputValue();
  }
};
