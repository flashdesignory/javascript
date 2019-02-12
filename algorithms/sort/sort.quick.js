/*
 * @title: Quick Sort
 * @description:
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// Big O(n log n) time Big O(1) space
function swap(items, first, second) {
  const temp = items[first];
  items[first] = items[second];
  items[second] = temp;
}

function partition(items, start, end) {
  // using middle as pivot index
  const index = Math.floor((start + end) / 2);
  const pivot = items[index];

  while (start <= end) {
    while (items[start] < pivot) {
      start++;
    }
    while (items[end] > pivot) {
      end--;
    }

    if (start <= end) {
      swap(items, start, end);
      start++;
      end--;
    }
  }

  return start;
}

function quickSort(items, left, right) {
  let index;
  if (left < right) { // or use items.length > 1
    index = partition(items, left, right);

    if (left < index - 1) {
      quickSort(items, left, index - 1);
    }

    if (index < right) {
      quickSort(items, index, right);
    }
  }

  return items;
}

// npx jest algorithms/sort/sort.quick.js
test('quickSort()', () => {
  const nums = [7, 9, 3, 4, 2, 8, 5, 1];
  expect(quickSort(nums, 0, nums.length - 1)).toEqual([1, 2, 3, 4, 5, 7, 8, 9]);
});
