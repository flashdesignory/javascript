/*
 * @title: Curry
 * @description: curry function
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function curry(fn, arity = fn.length) {
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
const double = curry(multiply);
double(3)(2)(2);
