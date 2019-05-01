/*
 * @title: roman numerals
 * @description: convert number to roman numerals
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function toRoman(num) {
  const decimals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const letters = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

  let result = '';

  for (let index = 0; index < decimals.length; index++) {
    while (decimals[index] <= num) {
      result += letters[index];
      num -= decimals[index];
    }
  }

  return result;
}

function fromRoman(str) {
  const decimals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const letters = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

  let result = 0;

  for (let i = 0; i <= decimals.length; i++) {
    while (str.indexOf(letters[i]) === 0) {
      result += decimals[i];
      str = str.replace(letters[i], '');
    }
  }
  return result;
}

// npx jest algorithms/string/string.roman.js
test('toRoman()', () => {
  expect(toRoman(36)).toEqual('XXXVI');
});
test('fromRoman()', () => {
  expect(fromRoman('III')).toEqual(3);
});
