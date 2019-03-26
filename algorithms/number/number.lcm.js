/*
 * @title: least common multiple
 * @description: LCM (Least Common Multiple) of two numbers
 * is the smallest number which can be divided by both numbers.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function gcd(a, b) {
  if (a === 0 || b === 0) return 0;
  if (a === b) return a;
  if (a > b) return gcd(a - b, b);
  return gcd(a, b - a);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

// npx jest algorithms/number/number.lcm.js
describe('lcm()', () => {
  test('lcm', () => {
    expect(lcm(15, 20)).toEqual(60);
  });
});
