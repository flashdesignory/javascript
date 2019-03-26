/*
 * @title: greatest common divisor
 * @description: GCD (Greatest Common Divisor) or
 * HCF (Highest Common Factor) of two numbers is
 * the largest number that divides both of them.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function gcd(a, b) {
  if (a === 0 || b === 0) return 0;
  if (a === b) return a;
  if (a > b) return gcd(a - b, b);
  return gcd(a, b - a);
}

// euclid
function gcd1(a, b) {
  // simple way to ensure a is min and b is max
  const min = Math.min(a, b);
  const max = Math.max(a, b);

  if (max % min === 0) return min;
  return gcd1(min, max % min);
}

function gcd2(a, b) {
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

function gcd3(a, b) {
  if (b === 0) {
    return a;
  }

  return gcd2(b, a % b);
}


// npx jest algorithms/number/number.gcd.js
describe('gcd()', () => {
  test('gcd', () => {
    expect(gcd(14, 21)).toEqual(7);
  });
  test('gcd1();', () => {
    expect(gcd1(14, 21)).toEqual(7);
  });
  test('gcd2();', () => {
    expect(gcd2(14, 21)).toEqual(7);
  });
  test('gcd3();', () => {
    expect(gcd3(14, 21)).toEqual(7);
  });
});
