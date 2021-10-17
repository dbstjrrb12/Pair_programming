// DOM Nodes
const $display = document.querySelector('.display');
const $startStop = $display.nextElementSibling;
const $resetLap = $startStop.nextElementSibling;
const $laps = document.querySelector('.laps');

const setTime = (function () {
  const time = {
    milliseconds: 0,
    seconds: 0,
    minutes: 0
  };

  return {
    initialize() {
      time.milliseconds = 0;
      time.seconds = 0;
      time.minutes = 0;
    },

    get(timeType) {
      return time[timeType];
    },

    increaseMilliSeconds() {
      time.milliseconds = (time.milliseconds + 1) % 100;

      if (time.milliseconds === 0) setTime.increaseSeconds();

      const displayMilliseconds =
        time.milliseconds < 10 ? '0' + time.milliseconds : time.milliseconds;
      const displaySeconds =
        time.seconds < 10 ? '0' + time.seconds : time.seconds;
      const displayMinutes =
        time.minutes < 10 ? '0' + time.minutes : time.minutes;

      $display.textContent = $display.textContent
        .split(':')
        .map((_, i) =>
          i === 0
            ? displayMinutes
            : i === 1
            ? displaySeconds
            : displayMilliseconds
        )
        .join(':');
    },

    increaseSeconds() {
      time.seconds = (time.seconds + 1) % 60;
      if (time.seconds === 0) setTime.increaseMinutes();
    },

    increaseMinutes() {
      time.minutes = (time.minutes + 1) % 100;
    }
  };
})();

const startStopToggle = (function () {
  let toggle = true;
  let interval;

  return {
    setState() {
      toggle = !toggle;
    },

    getState() {
      return toggle;
    },

    setDisplayButton() {
      toggle
        ? ($resetLap.removeAttribute('disabled'),
          (interval = setInterval(setTime.increaseMilliSeconds, 10)))
        : clearInterval(interval);
    }
  };
})();

const controlLapCount = (function () {
  let lapCount = 0;

  return {
    initializeLapCount() {
      lapCount = 0;
    },

    increaseLapCount() {
      lapCount += 1;
    },

    getLapCount() {
      return lapCount;
    }
  };
})();

const lapRender = () => {
  controlLapCount.increaseLapCount();

  const laps = `<div>${controlLapCount.getLapCount()}</div><div>${
    $display.textContent
  }</div>`;

  $laps.insertAdjacentHTML('beforeend', laps);
};

// Event handlers binding
$startStop.onclick = e => {
  e.target.textContent = startStopToggle.getState() ? 'Stop' : 'Start';
  $resetLap.textContent = startStopToggle.getState() ? 'Lap' : 'Reset';

  startStopToggle.setDisplayButton();
  startStopToggle.setState();
};

$resetLap.onclick = () => {
  if (startStopToggle.getState()) {
    $display.textContent = '00:00:00';

    controlLapCount.initializeLapCount();
    setTime.initialize();

    $resetLap.setAttribute('disabled', 'disabled');

    while ($laps.childElementCount > 2) {
      $laps.removeChild($laps.lastElementChild);
    }

    $laps.style.display = '';
  }

  if (!startStopToggle.getState()) {
    $laps.style.display =
      $laps.style.display === '' ? 'grid' : $laps.style.display;

    lapRender();
  }
};
