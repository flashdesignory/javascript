/*
 * @title: implement atoi in javascript
 * @description: The atoi() function takes a string
 * (which represents an integer) as an argument and returns its value.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function atoi(str) {
  // pointer to loop through str
  let start = 0;
  // keeps result value
  let result = 0;
  // flag if input is negative
  let isNegative = false;

  // trim whitespace
  str = str.trim();

  // check if string starts with "+" or "-"
  if (str[start] === "+" || str[start] === "-") {
    if (str[start] === "-") {
      isNegative = true;
    }
    start++;
  }

  for (let i = start; i < str.length; i++) {

    // Valid number values range from 48 to 57.
    // We want to append the current value to the result
    // and therefore we don't want a range from 48 to 57
    // but rather a range from 0 to 9, since that would be a valid digit
    // Therefore we subtract 48 from the returned charCode value.
    const charCode = str.charCodeAt(i) - 48;

    // checking if charCode is within 0 to 9 range
    if (charCode < 0 || charCode > 9) {
      break;
    }

    // This ultimately adds a 0 to the end that we can add to.
    result *= 10;
    // This adds a value between 0 to 9 to the last digit.
    result += charCode;
  }

  // If the str started with a "-" sign, we multipy by -1.
  if (isNegative) {
    result *= -1;
  }

  // Make sure number is in a valid range
  return Math.max(-(2 ** 31), Math.min(2 ** 31 - 1, result));// eslint-disable-line
}

function atoi2(str) {
  return Math.max(Math.min(parseInt(str, 10) || 0, 2147483647), -2147483648);
}

// npx jest algorithms/string/string.atoi.js
describe('implement atoi', () => {
  test('atoi()', () => {
    expect(atoi('42')).toEqual(42);
    expect(atoi('   -42')).toEqual(-42);
  });
  test('atoi2()', () => {
    expect(atoi2('42')).toEqual(42);
    expect(atoi2('   -42')).toEqual(-42);
  });
});
