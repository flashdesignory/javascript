/*
 * @title: Binary Search
 * @description: Example for a binary search
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// big O(log n);

function binarySearch(arr, item) {
  let min = 0;
  let max = arr.length - 1;
  let middle;

  while (min <= max) {
    middle = Math.floor((min + max) / 2);
    if (arr[middle] === item) {
      return middle;
    }
    if (arr[middle] < item) {
      min = middle + 1;
    } else {
      max = middle - 1;
    }
  }

  return -1;
}

const primes = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
];
const result = binarySearch(primes, 53);
console.log(result);

// recursive
const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
function bsRecurse(arr, value, start, end) {
  if (start >= end) return -1;
  const middle = Math.floor((start + end) / 2);

  if (arr[middle] === value) return middle;
  if (arr[middle] > value) return bsRecurse(arr, value, start, middle - 1);

  return bsRecurse(arr, value, middle + 1, end);
}

console.log(bsRecurse(items, 'h', 0, items.length - 1));
