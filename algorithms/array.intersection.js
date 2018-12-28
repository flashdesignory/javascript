/*
 * @title: Find Duplicates in Arrays
 * @description: Simple function to find dupes in arrays
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// input arrays have to be sorted
function findCommon(one, two) {
  one.sort((a, b) => a - b);
  two.sort((a, b) => a - b);

  const result = [];
  let oneIndex = 0;
  let twoIndex = 0;

  while (oneIndex < one.length && twoIndex < two.length) {
    if (one[oneIndex] === two[twoIndex]) {
      result.push(one[oneIndex]);
      oneIndex++;
      twoIndex++;
    } else if (one[oneIndex] < two[twoIndex]) {
      oneIndex++;
    } else {
      twoIndex++;
    }
  }

  return result;
}

function findIntersections(arr1, arr2, arr3) {
  const result = [];
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < arr1.length && j < arr2.length && k < arr3.length) {
    if (arr1[i] === arr2[j] && arr2[j] === arr3[k]) {
      result.push(arr1[i]);
      i++;
      j++;
      k++;
    } else if (arr1[i] < arr2[j]) {
      i++;
    } else if (arr2[j] < arr3[k]) {
      j++;
    } else {
      k++;
    }
  }
  return result;
}

// npx jest algorithms/array.intersection.js
describe('find common elements in arrays', () => {
  test('findCommon()', () => {
    const one = [1, 4, 7, 9];
    const two = [1, 3, 7, 8];
    expect(findCommon(one, two)).toEqual([1, 7]);
  });
  test('findIntersections()', () => {
    const arr1 = [2, 6, 9, 11, 13, 17];
    const arr2 = [3, 6, 7, 10, 13, 18];
    const arr3 = [4, 5, 6, 9, 11, 13];
    expect(findIntersections(arr1, arr2, arr3)).toEqual([6, 13]);
  });
});
