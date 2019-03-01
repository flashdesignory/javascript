/*
 * @title: Catalan Numbers
 * @description:
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// recursive
function catalan(n) {
  if (n <= 1) return 1;
  let result = 0;
  for (let i = 0; i < n; i++) {
    result += catalan(i) * catalan(n - i - 1);
  }
  return result;
}

// dp solution
function catalan1(n) {
  const result = [1, 1];
  for (let i = 2; i <= n; i++) {
    result[i] = 0;
  }

  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      result[i] += result[j] * result[i - j - 1];
    }
  }

  return result[n];
}

// npx jest algorithms/number/number.catalan.js
test('findUniqueNumber()', () => {
  expect(catalan(3)).toEqual(5);
  expect(catalan1(3)).toEqual(5);
});
