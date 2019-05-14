/*
 * @title: implement atoi in javascript
 * @description: The atoi() function takes a string
 * (which represents an integer) as an argument and returns its value.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function atoi(str) {
  let start = 0;
  let res = 0;
  let isNegative = false;

  // trim whitespace
  str = str.trim();

  // increment if operator present
  if (str[start] === '+' || str[start] === '-') {
    if (str[start] === '-') {
      isNegative = true;
    }
    start += 1;
  }

  for (let i = start; i < str.length; i++) {
    const code = str.charCodeAt(i) - 48; // '0' is 48
    console.log(code);
    if (code < 0 || code > 9) {
      break;
    }
    res *= 10;
    res += code;
  }


  // if negative
  if (isNegative) res *= -1;

  // make sure number is valid
  return Math.max(-(2 ** 31), Math.min(2 ** 31 - 1, res)); // eslint-disable-line
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
