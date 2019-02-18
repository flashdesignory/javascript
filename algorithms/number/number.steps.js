/*
 * @title: k-steps
 * @description: return k-steps
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// recursive
function steps1(n) {
  if (n === 1 || n === 0) return 1;
  if (n === 2) return 2;
  return steps1(n - 1) + steps1(n - 2) + steps1(n - 3);
}

// tabulation
function steps2(n) {
  const result = [1, 1, 2];

  for (let i = 3; i <= n; i++) {
    result[i] = result[i - 1] + result[i - 2] + result[i - 3];
  }

  return result[n];
}

// npx jest algorithms/number/number.steps.js
test('n steps recursive', () => {
  expect(steps1(4)).toEqual(7);
});
test('n steps iterative', () => {
  expect(steps2(4)).toEqual(7);
});
