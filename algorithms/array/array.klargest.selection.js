/*
 * @title: find k largest
 * @description: simple algo to return k largest element in unsorted array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function swap(arr, left, right) {
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
}

function quickSelect(arr, start, end, k) {
  // use quick sort's idea
  // put nums that are <= pivot to the left
  // put nums that are  > pivot to the right
  let index = start;
  let runner;
  for (runner = start; runner < end; runner++) {
    if (arr[runner] <= arr[end]) {
      swap(arr, index++, runner);
    }
  }

  swap(arr, index, runner);

  // count the nums that are >= pivot
  const right = end - index + 1;
  // pivot is the one!
  if (right === k) return arr[index];
  // pivot is too small, so it must be on the right
  if (right > k) return quickSelect(arr, index + 1, end, k);
  // pivot is too big, so it must be on the left
  return quickSelect(arr, start, index - 1, k - right);
}

function findKthLargest(nums, k) {
  return quickSelect(nums, 0, nums.length - 1, k);
}

// npx jest algorithms/array/array.klargest.selection.js
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
