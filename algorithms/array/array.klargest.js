/*
 * @title: find k largest
 * @description: simple algo to return k largest element
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function kLargest(arr, k) {
  arr.sort((a, b) => a - b);
  return arr[arr.length - k];
}

// npx jest algorithms/array/array.klargest.js
test('kLargest()', () => {
  expect(kLargest([3, 2, 1, 5, 6, 4], 2)).toEqual(5);
});
