/*
 * @title: Defer
 * @description: defer function
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* function defer(f, ms) {
  return function () {
    setTimeout(() => f.apply(this, arguments), ms);// eslint-disable-line
  };
} */

/* function defer(f, ms) {
  return function (...args) {
    setTimeout(() => f.apply(this, args), ms);
  };
} */

function defer(fn, wait) {
  return function (...args) {
    const context = this;
    const later = function () {
      fn.apply(context, args);
    };
    setTimeout(later, wait);
  };
}

// npx jest utils/defer.js
test('utils.defer', () => {
  console.log = jest.fn();

  function sayHi(name) {
    console.log(`Hello ${name}`);
  }

  const sayHiDeferred = defer(sayHi, 500);
  jest.useFakeTimers();
  sayHiDeferred('world');
  jest.runOnlyPendingTimers();
  expect(console.log).toHaveBeenCalledTimes(1);
});
