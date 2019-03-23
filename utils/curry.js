/*
 * @title: Curry
 * @description: curry function
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function curry(fn, arity = fn.length) {
  return function curried() {
   const args = [...arguments]; // eslint-disable-line
    return function () {
     args.push(Array.prototype.slice.call(arguments, 0)); //eslint-disable-line
      if (args.length >= arity) {
        return fn.apply(this, args);
      }
      return curried(args);
    };
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
