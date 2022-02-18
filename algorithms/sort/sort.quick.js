/*
 * @title: Quick Sort
 * @description:
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
  // using middle as pivot index
  const index = Math.floor((start + end) / 2);
  const pivot = arr[index];

  while (start <= end) {
    while (arr[start] < pivot) {
      start++;
    }
    while (arr[end] > pivot) {
      end--;
    }

    if (start <= end) {
      swap(arr, start, end);
      start++;
      end--;
    }
  }

  return start;
}

function quickSort(arr, left, right) {
  if (left < right) { // or use arr.length > 1
    const index = partition(arr, left, right);

    // left
    if (left < index - 1) {
      quickSort(arr, left, index - 1);
    }

    // right
    if (index < right) {
      quickSort(arr, index, right);
    }
  }

  return arr;
}

// npx jest algorithms/sort/sort.quick.js
test('quickSort()', () => {
  const nums = [7, 9, 3, 4, 2, 8, 5, 1];
  expect(quickSort(nums, 0, nums.length - 1)).toEqual([1, 2, 3, 4, 5, 7, 8, 9]);
});
