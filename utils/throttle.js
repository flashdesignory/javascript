/*
 * @title: Throttle
 * @description: throttle function
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function throttle(fn, wait) {
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
