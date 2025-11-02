// ==================================
// TIMER MANAGER
// ==================================

let timer;
let remaining = 0;
let active = false;

export function startTimer(seconds, onTick, onFinish) {
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
}

export function stopTimer() {
  clearInterval(timer);
  active = false;
}

export function isTimerActive() {
  return active;
}
