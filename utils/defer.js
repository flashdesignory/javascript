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

function defer(f, ms) {
  return function (...args) {
    setTimeout(() => f.apply(this, args), ms);
  };
}

function sayHi(name) {
  console.log(`Hello ${name}`);
}

const sayHiDeferred = defer(sayHi, 500);
sayHiDeferred('world');
