/*
 * @title: conflicting intervals
 * @description: simple solution with sort
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function findConflicts(arr) {
  if (!arr.length) return null;

  arr.sort((a, b) => a[0] - b[0]);

  const result = [];

  for (let i = 1; i < arr.length; i++) {
    const prev = arr[i - 1];
    const current = arr[i];
    if (prev[1] > current[0]) {
      result.push(current);
    }
  }

  return result;
}

// creating two arrays
// after sorting array, assuming first interval is valid
// if no conflict with previous, push into valid
// else push into conflicts
function findConflicts2(arr) {
  arr.sort((a, b) => a[0] - b[0]);
  const valid = [arr[0]];
  const conflicts = [];
  for (let i = 1; i < arr.length; i++) {
    const previous = valid[valid.length - 1];
    const current = arr[i];
    if (previous[1] > current[0]) {
      conflicts.push(current);
    } else {
      valid.push(current);
    }
  }

  return conflicts;
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

describe('return conflicting intervals', () => {
  test('findConflicts2()', () => {
    const nums = [[1, 5], [3, 7], [2, 6], [10, 15], [5, 6], [4, 100]];
    expect(findConflicts2(nums)).toEqual([[ 2, 6 ], [ 3, 7 ], [ 4, 100 ]]);
  });
  test('findConflicts2()', () => {
    const nums = [[1, 3], [5, 7], [2, 4], [6, 8]];
    expect(findConflicts2(nums)).toEqual([[ 2, 4 ], [ 6, 8 ]]);
  });
  test('findConflicts2()', () => {
    const nums = [[1, 3], [7, 9], [4, 6], [10, 13]];
    expect(findConflicts2(nums)).toEqual([]);
  });
});
