/*
 * @title: Binary Search Magic Index
 * @description: Find Magic Index Binary Search
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function findMagicIndexSimple(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === i) {
      console.log(arr[i], i);
      return i;
    }
  }
  return -1;
}

function findMagicIndex(arr) {
  function binarySearch(arr, start, end) {
    if (start > end) return -1;

    const middle = Math.floor((start + end) / 2);
    if (arr[middle] === middle) {
      console.log(arr[middle], middle);
      return middle;
    }
    if (arr[middle] > middle) {
      return binarySearch(arr, start, middle - 1);
    }
    return binarySearch(arr, middle + 1, end);
  }
  return binarySearch(arr, 0, arr.length - 1);
}

// npx jest algorithms/binarysearch.magic.js
describe('binary search magic index', () => {
  test('linear', () => {
    expect(findMagicIndexSimple([-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13])).toEqual(7);
  });
  test('binary', () => {
    expect(findMagicIndex([-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13])).toEqual(7);
  });
});
