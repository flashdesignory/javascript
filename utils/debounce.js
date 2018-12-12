/*
 * @title: Debounce
 * @description: debounce function
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function debounce(func, wait, immediate) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const debounced = debounce(() => {
  console.log('yo debounced');
}, 250);

window.addEventListener('mousemove', debounced);
