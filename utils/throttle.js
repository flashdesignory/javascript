/*
 * @title: Throttle
 * @description: throttle function
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function throttle(fn, wait) {
  let last = 0;
  return function (...args) {
    const now = (new Date()).getTime();
    if (now - last < wait) {
      return;
    }

    last = now;
    fn(args);
  };
}

const throttled = throttle(() => {
  console.log('yo throttled');
}, 250);

window.addEventListener('mousemove', throttled);