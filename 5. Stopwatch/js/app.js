// DOM Nodes
const $display = document.querySelector('.display');
const $startStop = $display.nextElementSibling;
const $resetLap = $startStop.nextElementSibling;
const $laps = document.querySelector('.laps');

const setMinutes = (function () {
  let minutes = 0;

  return {
    increaseMinutes() {
      minutes += 1;
      console.log('미닛: ' + minutes);
    },

    getMinutes() {
      return minutes;
    },

    setInitialize() {
      minutes = 0;
    }
  };
})();

const setSeconds = (function () {
  let seconds = 0;

  return {
    increaseSeconds() {
      seconds += 1;
      seconds %= 60;
      console.log('세컨드: ' + seconds);
      if (seconds === 0) setMinutes.increaseMinutes();
    },

    getSeconds() {
      return seconds;
    },

    setInitialize() {
      seconds = 0;
    }
  };
})();

const setMilliseconds = (function () {
  let milliseconds = 0;

  return {
    increaseMilliSeconds() {
      milliseconds += 1;
      milliseconds %= 100;
      //   console.log('밀리세컨드: ' + milliseconds);
      if (milliseconds === 0) setSeconds.increaseSeconds();
      const seconds = setSeconds.getSeconds();
      const minutes = setMinutes.getMinutes();

      $display.textContent = $display.textContent
        .split(':')
        .map((_, i) =>
          i === 0
            ? minutes < 10
              ? '0' + minutes
              : minutes
            : i === 1
            ? seconds < 10
              ? '0' + seconds
              : seconds
            : milliseconds < 10
            ? '0' + milliseconds
            : milliseconds
        )
        .join(':');
    },

    getMilliseconds() {
      return milliseconds;
    },

    setInitialize() {
      milliseconds = 0;
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

const lapRender = fragment => {
  $laps.appendChild(fragment);
};

// Event handlers binding
let interval;
let toggle = true;

$startStop.onclick = e => {
  e.target.textContent = toggle ? 'Stop' : 'Start';
  $resetLap.textContent = toggle ? 'Lap' : 'Reset';

  if (toggle) {
    $resetLap.removeAttribute('disabled');
    interval = setInterval(setMilliseconds.increaseMilliSeconds, 10);
  } else {
    // if ($display.textContent === '00:00:00')
    //   $resetLap.setAttribute('disabled', 'disabled');
    clearInterval(interval);
  }
  toggle = !toggle;
};

$resetLap.onclick = e => {
  if (e.target.textContent === 'Reset') {
    $display.textContent = '00:00:00';
    controlLapCount.initializeLapCount();
    setMilliseconds.setInitialize();
    setSeconds.setInitialize();
    setMinutes.setInitialize();
    $resetLap.setAttribute('disabled', 'disabled');

    while ($laps.childElementCount > 2) {
      $laps.removeChild($laps.lastElementChild);
    }

    $laps.style.display = '';
  } else {
    if ($laps.style.display === '') $laps.style.display = 'grid';

    const $fragment = document.createDocumentFragment();
    controlLapCount.increaseLapCount();

    [controlLapCount.getLapCount(), $display.textContent].forEach(text => {
      const $div = document.createElement('div');
      const textNode = document.createTextNode(text);

      $div.appendChild(textNode);
      $fragment.appendChild($div);
    });

    lapRender($fragment);
  }
};
