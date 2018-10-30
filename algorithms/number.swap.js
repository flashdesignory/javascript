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

console.log(swapNumbersOne(3, 5));

function swapNumbersTwo(a, b) {
  a = a^b; //eslint-disable-line
  b = a^b; //eslint-disable-line
  a = a^b; //eslint-disable-line
  return [a, b];
}

console.log(swapNumbersTwo(4, 6));
