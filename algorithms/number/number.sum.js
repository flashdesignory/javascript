/*
 * @title: Sum
 * @description: simple sum algo
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function findSum(arr, sum) {
  // return first match
  const found = {};
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const missing = sum - current;
    if (found[missing]) {
      return [missing, current];
    }
    found[current] = true;
  }
  return false;
}

function findAllPair(arr, sum) {
  // return all matches
  const found = {};
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const missing = sum - current;
    if (found[missing]) {
      result.push([current, missing]);
    } else {
      found[current] = true;
    }
  }
  return result;
}

// npx jest algorithms/number/number.sum.js
test('findSum()', () => {
  expect(findSum([3, 4, 1, 2, 9], 10)).toEqual([1, 9]);
});
test('findAllPair()', () => {
  expect(findAllPair([1, 4, 45, 6, 10, -8], 16)).toEqual([[10, 6]]);
});
