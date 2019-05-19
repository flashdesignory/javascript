/*
 * @title: find k largest
 * @description: simple algo to return k largest element in unsorted array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function findKthLargest(arr, k) {
  arr.sort((a, b) => a - b);
  return arr[arr.length - k];
}

// npx jest algorithms/array/array.klargest.sort.js
test('findKthLargest()', () => {
  expect(findKthLargest([3, 2, 1, 5, 6, 4], 2)).toEqual(5);
});
test('findKthLargest()', () => {
  expect(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toEqual(4);
});
test('findKthLargest()', () => {
  expect(findKthLargest([-1, 2, 0], 1)).toEqual(2);
});
test('findKthLargest()', () => {
  const nums = [3, 2, 3, 1, 2, 4, 5, 5, 6, 7, 7, 8, 2, 3, 1, 1, 1, 10, 11, 5, 6, 2, 4, 7, 8, 5, 6];
  expect(findKthLargest(nums, 20)).toEqual(2);
});
