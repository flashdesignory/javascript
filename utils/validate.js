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

/* polyfill for Number.isNaN */
Number.isNaN = Number.isNaN || function (value) {
  return value !== value; //eslint-disable-line
};

function isPrimitive(value) {
  return value !== Object(value);
}

function isObject(value) {
  return value === Object(value);
}

function isArray(value) {
  return Array.isArray(value);
}

function isDate(value) {
  // eslint-disable-next-line
  return (new Date(value) !== 'Invalid Date') && !isNaN(new Date(value));
}

function isInteger(x) {
  return typeof x === 'number' && (x % 1 === 0);
}

function getType(elem) {
  return Object.prototype.toString.call(elem).slice(8, -1);
}

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

// npx jest utils/validate.js
test('utils.validate.isPrimitive', () => {
  expect(isPrimitive(100)).toBeTruthy();
  /* eslint-disable-next-line */
  expect(isPrimitive(new Number(100))).toBeFalsy();
  expect(isPrimitive(true)).toBeTruthy();
  expect(isPrimitive('100')).toBeTruthy();
});

test('utils.validate.isObject', () => {
  expect(isObject({})).toBeTruthy();
  expect(isObject(1)).toBeFalsy();
});

test('utils.validate.isDate', () => {
  expect(isDate('foo')).toBeFalsy();
  expect(isDate('05/01/2000')).toBeTruthy();
});

test('utils.validate.isArray', () => {
  expect(isArray([1, 2, 3])).toBeTruthy();
  expect(isArray([])).toBeTruthy();
  expect(isArray({})).toBeFalsy();
});

test('utils.validate.isInteger', () => {
  expect(isInteger(5)).toBeTruthy();
  expect(isInteger(0.001)).toBeFalsy();
});

test('utils.validate.getType', () => {
  expect(getType([])).toEqual('Array');
});

test('utils.validate.isAlphaNumeric', () => {
  expect(isAlphaNumeric1('huiwl490sk')).toBeTruthy();
  expect(isAlphaNumeric2('huiwl490sk')).toBeTruthy();
});

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

test('utils.validate.isNumber', () => {
  expect(isNumber('0')).toBeTruthy();
  expect(isNumber('0.1')).toBeTruthy();
  expect(isNumber('abc')).toBeFalsy(); // false
  expect(isNumber('2e10')).toBeTruthy();
  expect(isNumber(' -90e3')).toBeTruthy();
  expect(isNumber('2e10e5')).toBeFalsy(); // false
});
