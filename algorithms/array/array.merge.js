/*
 * @title: merge sorted arrays
 * @description: Simple function to merge two sorted arrays
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function mergeOne(left, right) {
  const result = [];
  const lLen = left.length;
  const rLen = right.length;
  let l = 0;
  let r = 0;

  while (l < lLen && r < rLen) {
    if (left[l] < right[r]) {
      result.push(left[l++]);
    } else {
      result.push(right[r++]);
    }
  }

  return result.concat(left.slice(l)).concat(right.slice(r));
}

function mergeTwo(left, right) {
  const result = [];
  let a = left[0];
  let b = right[0];
  let i = 1;
  let j = 1;

  if (left.length === 0) {
    return right;
  }

  if (right.length === 0) {
    return left;
  }

  while (a || b) {
    if (a && a < b) {
      result.push(a);
      a = left[i++];
    } else {
      result.push(b);
      b = right[j++];
    }
  }

  return result;
}

function mergeThree(one, two) {
  let index1 = one.length;
  let index2 = two.length;

  while (index1 > 0 && index2 > 0) {
    if (one[index1 - 1] > two[index2 - 1]) {
      one[index1 + index2 - 1] = one[index1 - 1];
      index1--;
    } else {
      one[index1 + index2 - 1] = two[index2 - 1];
      index2--;
    }
  }

  while (index2 > 0) {
    one[index2 - 1] = two[index2 - 1];
    index2--;
  }

  return one;
}

// npx jest algorithms/array/array.merge.js
describe('merge two arrays', () => {
  test('mergeOne()', () => {
    expect(mergeOne([2, 5, 6, 9], [1, 2, 3, 29])).toEqual([1, 2, 2, 3, 5, 6, 9, 29]);
  });
  test('mergeTwo', () => {
    expect(mergeTwo([2, 5, 6, 9], [1, 2, 3, 29])).toEqual([1, 2, 2, 3, 5, 6, 9, 29]);
  });
  test('mergeThree', () => {
    expect(mergeThree([2, 5, 6, 9], [1, 2, 3, 29])).toEqual([1, 2, 2, 3, 5, 6, 9, 29]);
  });
});
