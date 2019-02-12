/*
 * @title: Longest Increasing SubSequence
 * @description: lis in string
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function lis(arr) {
  const result = [];
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    result[i] = 1;
  }

  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j] && result[i] < result[j] + 1) {
        result[i] = result[j] + 1;
        max = Math.max(max, result[i]);
      }
    }
  }
  return max;
}

function lis2(arr, i, max) {
  if (i === arr.length) return 0;

  const excl = lis2(arr, i + 1, max);
  let current = 0;
  if (arr[i] > max) {
    current = 1 + lis2(arr, i + 1, arr[i]);
  }

  return Math.max(current, excl);
}

// npx jest algorithms/string/string.sequence.lis.js
describe('lis tabulation', () => {
  test('lis([3, 10, 2, 1, 20])', () => {
    const nums = [3, 10, 2, 1, 20];
    expect(lis(nums)).toEqual(3);
  });
  test('lis[50, 3, 10, 7, 40, 80])', () => {
    const nums = [50, 3, 10, 7, 40, 80];
    expect(lis(nums)).toEqual(4);
  });
  test('lis([10, 22, 9, 33, 21, 50, 41, 60, 12])', () => {
    const nums = [10, 22, 9, 33, 21, 50, 41, 60, 12];
    expect(lis(nums)).toEqual(5);
  });
});

describe('lis recursion', () => {
  test('lis([3, 10, 2, 1, 20])', () => {
    const nums = [3, 10, 2, 1, 20];
    expect(lis2(nums, 0, 0)).toEqual(3);
  });
  test('lis[50, 3, 10, 7, 40, 80])', () => {
    const nums = [50, 3, 10, 7, 40, 80];
    expect(lis2(nums, 0, 0)).toEqual(4);
  });
  test('lis([10, 22, 9, 33, 21, 50, 41, 60, 12])', () => {
    const nums = [10, 22, 9, 33, 21, 50, 41, 60, 12];
    expect(lis2(nums, 0, 0)).toEqual(5);
  });
});
