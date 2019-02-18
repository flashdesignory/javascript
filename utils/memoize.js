/*
 * @title: Memoize
 * @description: memoize wrapper function
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function memoize(fn) {
  const cache = {};
  return function (...args) {
    if (cache[args]) {
      return cache[args];
    }
    const result = fn.apply(this, args);
    cache[args] = result;
    return result;
  };
}

let count = 0;
function fibonacci(n) {
  console.log(++count);
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

fibonacci(12); // n:144, count:465
fibonacci = memoize(fibonacci); //eslint-disable-line
count = 0;
fibonacci(12); // n:144, count:13
