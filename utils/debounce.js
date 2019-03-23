/*
 * @title: Debounce
 * @description: debounce function
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function debounceSimple(fn, delay) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments; // eslint-disable-line
    const later = function () {
      fn.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
}

function debounce(fn, wait, immediate) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) fn.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) fn.apply(context, args);
  };
}

const debounced = debounce(() => {
  console.log('mouse move debounced');
}, 250);

const debouncedSimple = debounceSimple(() => {
  console.log('mouse down debounced');
}, 250);

window.addEventListener('mousemove', debounced);
window.addEventListener('mousedown', debouncedSimple);
