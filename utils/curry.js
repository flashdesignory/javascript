/*
 * @title: Curry
 * @description: curry function
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function curry(fn) {
  const args = Array.prototype.slice.call(arguments, 1); //eslint-disable-line
  return function () {
    return fn.apply(this, args.concat(
      Array.prototype.slice.call(arguments, 0), //eslint-disable-line
    ));
  };
}

const multiply = (a, b) => a * b;

const double = curry(multiply, 2);

double(3);
