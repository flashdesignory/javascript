/*
 * @title: Curry
 * @description: curry function
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function curry(fn, ...args) {
  if (fn.length <= args.length) {
    return fn(...args);
  }
  return function (...more) {
    return curry(fn, ...args, ...more);
  };
}

function curry2(fn, arity = fn.length) {
  return function curried(args) {
    return function (arg) {
      args.push(arg);
      if (args.length >= arity) {
        return fn.apply(this, args);
      }
      return curried(args);
    };
  }([]);
}

const multiply = (a, b, c) => a * b * c;
const curried = curry(multiply);
const curried2 = curry2(multiply);
curried(3)(2)(2);
curried2(3)(2)(2);

test.skip('skip', () => {});
