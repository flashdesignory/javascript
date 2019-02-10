/*
 * @title: Union Array
 * @description: find union of two arrays
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function binarySearch(arr, n) {
  let start = 0;
  let end = arr.length - 1;
  let middle;

  while (start <= end) {
    middle = Math.floor((start + end) / 2);
    if (arr[middle] === n) {
      return middle;
    }
    if (arr[middle] > n) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
  }
  return -1;
}

function findUnion(one, two) {
  const oneLength = one.length;
  const twoLength = two.length;
  let union;

  if (oneLength <= twoLength) {
    one.sort((a, b) => a - b).slice(0);
    union = one.slice(0);
    for (let i = 0; i < two.length; i++) {
      if (!binarySearch(one, two[i])) {
        union.push(two[i]);
      }
    }
  } else {
    two.sort((a, b) => a - b).slice(0);
    union = two.slice(0);
    for (let i = 0; i < one.length; i++) {
      if (binarySearch(two, one[i]) === -1) {
        union.push(one[i]);
      }
    }
  }
  return union.sort((a, b) => a - b);
}

function findIntersection(one, two) {
  const oneLength = one.length;
  const twoLength = two.length;
  const intersection = [];

  if (oneLength <= twoLength) {
    one.sort((a, b) => a - b).slice(0);
    for (let i = 0; i < two.length; i++) {
      if (!binarySearch(one, two[i])) {
        intersection.push(two[i]);
      }
    }
  } else {
    two.sort((a, b) => a - b).slice(0);
    for (let i = 0; i < one.length; i++) {
      if (binarySearch(two, one[i]) !== -1) {
        intersection.push(one[i]);
      }
    }
  }
  return intersection.sort((a, b) => a - b);
}

// npx jest algorithms/array.union.js
test('findUnion()', () => {
  const one = [7, 1, 5, 2, 3, 6];
  const two = [3, 8, 6, 20, 7];
  expect(findUnion(one, two)).toEqual([1, 2, 3, 5, 6, 7, 8, 20]);
});

test('findIntersection()', () => {
  const one = [7, 1, 5, 2, 3, 6];
  const two = [3, 8, 6, 20, 7];
  expect(findIntersection(one, two)).toEqual([3, 6, 7]);
});
