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
  return value !== Object(value);
}

// examples
console.log(isPrimitive(100));
/* eslint-disable-next-line */
console.log(isPrimitive(new Number(100)));
console.log(isPrimitive(true));
console.log(isPrimitive('100'));

function isObject(value) {
  return value === Object(value);
}

// examples
console.log(isObject({}));

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


/* alphanumeric */
// using regex
function isAlphaNumeric1(str) {
  return /^[a-zA-Z0-9]+$/.test(str);
}

// using char code
function isAlphaNumeric2(str) {
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (!(code > 47 && code < 58)// 0-9
            && !(code > 64 && code < 91)// A-Z
            && !(code > 96 && code < 123)) { // a-z
      return false;
    }
  }
  return true;
}

isAlphaNumeric1('huiwl490sk');
isAlphaNumeric2('huiwl490sk');

/*
 * @title: Valid Number
 * @description: Validate if a given string can be interpreted as a decimal number.
 * Numbers 0-9
 * Exponent - "e"
 * Positive/negative sign - "+"/"-"
 * Decimal point - "."
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function validNumber(str, decimal = false) {
  let dotCount = 0;
  let digitCount = 0;
  const startIndex = (str[0] === '-' || str[0] === '+') ? 1 : 0;

  for (let i = startIndex; i < str.length; i++) {
    if (str[i] === '.') dotCount++;
    if (str[i] >= '0' && str[i] <= '9') digitCount++;
    if ((str[i] < '0' || str[i] > '9') && str[i] !== '.') return false;
  }

  return digitCount > 0 && ((decimal && dotCount === 0) || (!decimal && dotCount <= 1));
}

function isNumber(str) {
  str = str.trim();

  if (str.indexOf('e') !== -1) {
    const parts = str.split('e');

    if (parts.length !== 2 || parts[0] === '' || parts[1] === '') {
      return false;
    }

    return validNumber(parts[0]) && validNumber(parts[1], true);
  }

  return validNumber(str);
}

console.log(isNumber('0'));
console.log(isNumber('0.1'));
console.log(isNumber('abc')); // false
console.log(isNumber('2e10'));
console.log(isNumber(' -90e3'));
console.log(isNumber('2e10e5')); // false
