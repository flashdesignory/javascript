/*
 * @title: merge sorted arrays
 * @description: Simple function to merge two sorted arrays
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function mergeOne(arr1, arr2) {
  const result = [];
  const length1 = arr1.length;
  const length2 = arr2.length;
  let index1 = 0;
  let index2 = 0;

  while (index1 < length1 && index2 < length2) {
    if (arr1[index1] < arr2[index2]) {
      result.push(arr1[index1++]);
    } else {
      result.push(arr2[index2++]);
    }
  }

  // return result.concat(arr1.slice(index1)).concat(arr2.slice(index2));
  return [...result, ...arr1.slice(index1), ...arr2.slice(index2)];
}

function mergeTwo(arr1, arr2) {
  const result = [];
  let current1 = arr1[0];
  let current2 = arr2[0];
  let index1 = 1;
  let index2 = 1;

  if (arr1.length === 0) {
    return arr2;
  }

  if (arr2.length === 0) {
    return arr1;
  }

  while (current1 || current2) {
    if (current1 && current1 < current2) {
      result.push(current1);
      current1 = arr1[index1++];
    } else {
      result.push(current2);
      current2 = arr2[index2++];
    }
  }

  return result;
}

function mergeThree(arr1, arr2) {
  let index1 = arr1.length - 1;
  let index2 = arr2.length - 1;
  let newIndex = arr1.length + arr2.length - 1;

  while (index1 >= 0 && index2 >= 0) {
    if (arr1[index1] > arr2[index2]) {
      arr1[newIndex] = arr1[index1];
      index1--;
    } else {
      arr1[newIndex] = arr2[index2];
      index2--;
    }
    newIndex--;
  }

  while (index2 >= 0) {
    arr1[newIndex] = arr2[index2];
    index2--;
    newIndex--;
  }

  return arr1;
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
