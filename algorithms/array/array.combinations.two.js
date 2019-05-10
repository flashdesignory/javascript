/*
 * @title: Number Combinations
 * @description: Given two integers n and k, return all possible
 * combinations of k numbers out of 1 ... n.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function combinations(n, k) {
  const result = [];

  function dfs(current, start) {
    if (current.length === k) {
      result.push(current);
      return;
    }

    for (let i = start; i <= n; i++) {
      dfs(current.concat(i), i + 1);
    }
  }

  dfs([], 1);

  return result;
}

// npx jest algorithms/array/array.combinations.two.js
test('combinations()', () => {
  const result = [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]];
  expect(combinations(4, 2)).toEqual(result);
});
