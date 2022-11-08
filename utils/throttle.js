/*
 * @title: Throttle
 * @description: throttle function
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// simple throttle:
// fires initial event and waits
function simpleThrottle(fn, wait) {
  let last = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - last < wait) {
      return;
    }

    last = now;
    fn.apply(this, args);
  };
}

// with leading and trailing options
// leading: fires initial event
// trailing: captures last event that might have been triggered too fast
const throttle = (fn, delay, { leading = true, trailing = true } = {}) => {
  let last = 0;
  let timeout;
  return function (...args) {
    const now = new Date().getTime();
    if (timeout) clearTimeout(timeout);

    // if first event shouldn't fire, update last var early
    if (!leading && last === 0) {
      last = now;
    }

    if (now - last < delay) {
      if (trailing) {
        const difference = now - last;
        const leftOverDelay = delay - difference;
        timeout = setTimeout(() => fn.apply(this, args), leftOverDelay);
      }
      return;
    }

    last = now;
    fn.apply(this, args);
  };
};

// npx jest utils/throttle.js
test('utils.simple_throttle', () => {
  console.log = jest.fn();
  const throttled = simpleThrottle(() => {
    console.log('throttled');
  }, 250);

  // window.addEventListener('mousemove', throttled);

  jest.useFakeTimers();
  throttled();
  jest.runOnlyPendingTimers();
  expect(console.log).toHaveBeenCalledTimes(1);
});

test('utils.throttle', () => {
  console.log = jest.fn();
  const throttled = throttle(() => {
    console.log('throttled');
  }, 250);

  // window.addEventListener('mousemove', throttled);

  jest.useFakeTimers();
  throttled();
  jest.runOnlyPendingTimers();
  expect(console.log).toHaveBeenCalledTimes(1);
});
