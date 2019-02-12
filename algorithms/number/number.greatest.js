/*
 * @title: greatest common divisor
 * @description: find greatest common divisor of two numbers
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function gcd1(a, b) {
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

function gcd2(a, b) {
  if (b === 0) {
    return a;
  }

  return gcd2(b, a % b);
}

function gcd3(a, b) {
  if (a === b) return a;
  if (a > b) return gcd3(a - b, b);
  return gcd3(a, b - a);
}

// euclid
function gcd4(a, b) {
  // simple way to ensure a is min and b is max
  const min = Math.min(a, b);
  const max = Math.max(a, b);

  if (max % min === 0) return min;
  return gcd4(min, max % min);
}

// npx jest algorithms/number/number.greatest.js
describe('gcd1()', () => {
  test('greatestCommonDivisorOne', () => {
    expect(gcd1(14, 21)).toEqual(7);
  });
  test('gcd2();', () => {
    expect(gcd2(14, 21)).toEqual(7);
  });
  test('gcd3();', () => {
    expect(gcd3(14, 21)).toEqual(7);
  });
  test('gcd4();', () => {
    expect(gcd4(14, 21)).toEqual(7);
  });
});
