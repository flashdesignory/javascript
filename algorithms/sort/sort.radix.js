/*
 * @title: Radix Sort
 * @description:
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// Big O(nk) time Big O(1) space
function getDigit(num, index) {
  return Math.floor(Math.abs(num) / Math.pow(10, index)) % 10; // eslint-disable-line
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(arr) {
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    max = Math.max(max, digitCount(arr[i]));
  }
  return max;
}

function radixSort(arr) {
  const maxDigits = mostDigits(arr);

  for (let i = 0; i < maxDigits; i++) {
    const buckets = Array.from({ length: 10 }, () => []);
    for (let j = 0; j < arr.length; j++) {
      const digit = getDigit(arr[j], i);
      buckets[digit].push(arr[j]);
    }
    arr = [].concat(...buckets);
  }
  return arr;
}

// npx jest algorithms/sort/sort.radix.js
test('radixSort()', () => {
  const nums = [7, 9, 3, 4, 2, 8, 5, 1];
  expect(radixSort(nums)).toEqual([1, 2, 3, 4, 5, 7, 8, 9]);
});
