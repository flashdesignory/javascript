/*
 * @title: Swap Number
 * @description: simple functions to swap numbers
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function swapNumbersOne(a, b) {
  b = b-a; //eslint-disable-line
  a = a+b; //eslint-disable-line
  b = a-b; //eslint-disable-line
  return [a, b];
}

function swapNumbersTwo(a, b) {
  a = a^b; //eslint-disable-line
  b = a^b; //eslint-disable-line
  a = a^b; //eslint-disable-line
  return [a, b];
}

// npx jest algorithms/number.swap.js
describe('swap numbers', () => {
  test('swapNumbersOne', () => {
    expect(swapNumbersOne(3, 5)).toEqual([5, 3]);
  });
  test('swapNumbersTwo', () => {
    expect(swapNumbersTwo(4, 6)).toEqual([6, 4]);
  });
});
