/*
 * @title: greatest common divisor
 * @description: find greatest common divisor in numbers
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function greatestCommonDivisorOne(a, b) {
  if (a < 2 || b < 2) return 1;

  let divisor = 2;
  let greatest = 1;

  while (a >= divisor && b >= divisor) {
    if (a % divisor === 0 && b % divisor === 0) {
      greatest = divisor;
    }
    divisor++;
  }
  return greatest;
}

function greatestCommonDivisorTwo(a, b) {
  if (b === 0) {
    return a;
  }

  return greatestCommonDivisorTwo(b, a % b);
}

// npx jest algorithms/number.greatest.js
describe('greatest common divisor', () => {
  test('greatestCommonDivisorOne', () => {
    expect(greatestCommonDivisorOne(14, 21)).toEqual(7);
  });
  test('greatestCommonDivisorTwo', () => {
    expect(greatestCommonDivisorTwo(14, 21)).toEqual(7);
  });
});
