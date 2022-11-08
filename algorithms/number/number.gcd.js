/*
 * @title: greatest common divisor
 * @description: GCD (Greatest Common Divisor) or
 * HCF (Highest Common Factor) of two numbers is
 * the largest number that divides both of them.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */


const gcd = (a, b) => (b ? gcd(b, a % b) : a);

const gcd1 = (a, b) => {
  if (b === 0) {
    return a;
  }

  return gcd1(b, a % b);
};

const gcd2 = (a, b) => {
  if (a === 0 || b === 0) return 0;
  if (a === b) return a;
  if (a > b) return gcd2(a - b, b);
  return gcd2(a, b - a);
};

// euclid
const gcd3 = (a, b) => {
  // simple way to ensure min is a and max is b.
  const min = Math.min(a, b);
  const max = Math.max(a, b);

  if (max % min === 0) return min;
  return gcd3(min, max % min);
};

const gcd4 = (a, b) => {
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
};

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
  test('gcd4();', () => {
    expect(gcd4(14, 21)).toEqual(7);
  });
});
