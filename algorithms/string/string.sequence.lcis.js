/*
 * @title: Longest CONTINUOUS Increasing SubSequence
 * @description: lis in string
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function lcis1(arr) {
  let max = 0;
  let count = 0;
  let previous = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > previous) {
      count++;
    } else {
      count = 1;
    }
    previous = arr[i];
    max = Math.max(max, count);
  }

  return max;
}

function lcis2(arr) {
  let count = 0;
  let max = 1;
  if (arr.length <= 1) return arr.length;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[i - 1]) {
      max = Math.max(i - count, max);
      count = i;
    }
  }
  max = Math.max(arr.length - count, max);
  return max;
}

// npx jest algorithms/string/string.sequence.lcis.js
describe('lcis1', () => {
  test('lis([1,3,5,4,7])', () => {
    const nums = [1, 3, 5, 4, 7];
    expect(lcis1(nums)).toEqual(3);
  });
  test('lis[50, 3, 10, 7, 40, 80])', () => {
    const nums = [2, 2, 2, 2, 2];
    expect(lcis1(nums)).toEqual(1);
  });
});

describe('lcis2', () => {
  test('lis([1,3,5,4,7])', () => {
    const nums = [1, 3, 5, 4, 7];
    expect(lcis2(nums)).toEqual(3);
  });
  test('lis[50, 3, 10, 7, 40, 80])', () => {
    const nums = [2, 2, 2, 2, 2];
    expect(lcis2(nums)).toEqual(1);
  });
});
