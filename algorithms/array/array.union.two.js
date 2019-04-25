/*
 * @title: Union Array
 * @description: find union of two arrays - sorted
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

  let short;
  let long;

  if (oneLength <= twoLength) {
    short = one.slice(0);
    long = two.slice(0);
  } else {
    short = two.slice(0);
    long = one.slice(0);
  }

  short.sort((a, b) => a - b).slice(0);
  const union = short.slice(0);
  for (let i = 0; i < long.length; i++) {
    if (binarySearch(short, long[i]) === -1) {
      union.push(long[i]);
    }
  }

  return union.sort((a, b) => a - b);
}

function findIntersection(one, two) {
  const oneLength = one.length;
  const twoLength = two.length;
  const intersection = [];

  let short;
  let long;

  if (oneLength <= twoLength) {
    short = one.slice(0);
    long = two.slice(0);
  } else {
    short = two.slice(0);
    long = one.slice(0);
  }

  short.sort((a, b) => a - b).slice(0);
  for (let i = 0; i < long.length; i++) {
    if (binarySearch(short, long[i]) !== -1) {
      intersection.push(long[i]);
    }
  }

  return intersection.sort((a, b) => a - b);
}

// npx jest algorithms/array/array.union.two.js
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
