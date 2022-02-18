/*
 * @title: Quick Sort
 * @description: Alternate implementation
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// Big O(n log n) time Big O(1) space
function swap(arr, first, second) {
  const temp = arr[first];
  arr[first] = arr[second];
  arr[second] = temp;
}

function partition(arr, start, end) {
  // using start as pivot index
  const pivot = arr[start];
  let index = start;

  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      index++;
      swap(arr, index, i);
    }
  }

  // swap pivot from start with current index
  swap(arr, start, index);
  return index;
}

function quickSort(arr, left, right) {
  if (left < right) { // or use arr.length > 1
    const index = partition(arr, left, right);

    // left
    quickSort(arr, left, index - 1);

    // right
    quickSort(arr, index + 1, right);
  }

  return arr;
}

// npx jest algorithms/sort/sort.quick2.js
test('quickSort()', () => {
  const nums = [7, 9, 3, 4, 2, 8, 5, 1];
  expect(quickSort(nums, 0, nums.length - 1)).toEqual([1, 2, 3, 4, 5, 7, 8, 9]);
});
