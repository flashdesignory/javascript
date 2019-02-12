/*
 * @title: Random Number
 * @description: return a random number in range
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function randomInRange(min, max) {
  if (min > max) {
    max = max - min; //eslint-disable-line
    min = min + max; //eslint-disable-line
    max = min - max;
  }
  return Math.random() * (max - min) + min;
}

// npx jest algorithms/number/number.random.js
test('randomInRange()', () => {
  expect(randomInRange(5, 7)).toBeGreaterThanOrEqual(5);
  expect(randomInRange(5, 7)).toBeLessThanOrEqual(7);
});
