/*
 * @title: Validation Utils
 * @description: collection of validation utilities
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/**
  * A primitive (primitive value, primitive data type) is data that is not an
  * object and has no methods.
  * In JavaScript, there are 6 primitive data types: string, number, boolean,
  * null, undefined, symbol (new in ECMAScript 2015).
  * Most of the time, a primitive value is represented directly at the lowest
  * level of the language implementation.
  * All primitives are immutable (cannot be changed).

  * Except for null and undefined, all primitive values have object equivalents
  * that wrap around the primitive values:

    String for the string primitive.
    Number for the number primitive.
    Boolean for the Boolean primitive.
    Symbol for the Symbol primitive.

  * The wrapper's valueOf() method returns the primitive value.

  * source: https://developer.mozilla.org/en-US/docs/Glossary/Primitive
* */


function isPrimitive(value) {
  return (value !== Object(value));
}

// examples
console.log(isPrimitive(100));
/* eslint-disable-next-line */
console.log(isPrimitive(new Number(100)));
console.log(isPrimitive(true));
console.log(isPrimitive('100'));


function isArray(value) {
  return Array.isArray(value);
}

console.log(isArray([1, 2, 3]));
console.log(isArray([]));
console.log(isArray({}));

function getType(elem) {
  // return Object.prototype.toString.call(elem);
  // remove the first 'Object' trace '[object Object]'
  return Object.prototype.toString.call(elem).slice(8, -1);
}

console.log(getType([]));

/* polyfill for Number.isNaN */
Number.isNaN = Number.isNaN || function (value) {
  return value !== value; //eslint-disable-line
};

/* validate integer */
function isInteger(x) {
  return typeof x === 'number' && (x % 1 === 0);
}
console.log(isInteger(5)); // true
console.log(isInteger(0.001)); // false
