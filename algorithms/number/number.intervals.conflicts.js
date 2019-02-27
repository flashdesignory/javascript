/*
 * @title: conflicting intervals
 * @description: simple solution with sort
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function findConflicts(arr) {
  const byFirstNumber = (a, b) => a[0] - b[0];
  const sorted = arr.sort(byFirstNumber);
  const result = [];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i - 1][1] > sorted[i][0]) {
      result.push(sorted[i]);
    }
  }

  return result;
}

// npx jest algorithms/number/number.intervals.conflicts.js
describe('return conflicting intervals', () => {
  test('findConflicts()', () => {
    const nums = [[1, 5], [3, 7], [2, 6], [10, 15], [5, 6], [4, 100]];
    expect(findConflicts(nums)).toEqual([[2, 6], [3, 7], [4, 100], [5, 6]]);
  });
  test('findConflicts()', () => {
    const nums = [[1, 3], [5, 7], [2, 4], [6, 8]];
    expect(findConflicts(nums)).toEqual([[2, 4], [6, 8]]);
  });
  test('findConflicts()', () => {
    const nums = [[1, 3], [7, 9], [4, 6], [10, 13]];
    expect(findConflicts(nums)).toEqual([]);
  });
});
