// ==================================
// TIMER MANAGER – version globale
// ==================================

let timer;
let remaining = 0;
let active = false;

window.startTimer = function (seconds, onTick, onFinish) {
  clearInterval(timer);
  remaining = seconds;
  active = true;

  timer = setInterval(() => {
    if (remaining <= 0) {
      clearInterval(timer);
      active = false;
      if (onFinish) onFinish();
    } else {
      remaining--;
      if (onTick) onTick(remaining);
    }
  }, 1000);
};

window.stopTimer = function () {
  clearInterval(timer);
  active = false;
};

window.isTimerActive = function () {
  return active;
};
