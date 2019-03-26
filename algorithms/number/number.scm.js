/*
 * @title: smallest common multiple in range
 * @description: Find the smallest common multiple
 * of the provided parameters that can be evenly
 * divided by both, as well as by all sequential
 * numbers in the range between these parameters.
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

function scm(arr) {
  let min = Math.min.apply(null, arr);
  const max = Math.max.apply(null, arr);

  let smallest = min;

  while (min < max) {
    min++;
    smallest = lcm(smallest, min);
  }
  return smallest;
}

// npx jest algorithms/number/number.scm.js
describe('scm()', () => {
  test('scm', () => {
    expect(scm([1, 5])).toEqual(60);
  });
});
