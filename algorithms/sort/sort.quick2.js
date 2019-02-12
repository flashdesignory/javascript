/*
 * @title: Quick Sort
 * @description: Alternate implementation
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
  // using start as pivot index
  const pivot = items[start];
  let index = start;

  for (let i = start + 1; i <= end; i++) {
    if (pivot > items[i]) {
      index++;
      swap(items, index, i);
    }
  }

  // swap pivot from start with current index
  swap(items, start, index);
  return index;
}

function quickSort(items, left, right) {
  let index;
  if (left < right) { // or use items.length > 1
    index = partition(items, left, right);

    // left
    quickSort(items, left, index - 1);

    // right
    quickSort(items, index + 1, right);
  }

  return items;
}

// npx jest algorithms/sort.quick2.js
test('quickSort()', () => {
  const nums = [7, 9, 3, 4, 2, 8, 5, 1];
  expect(quickSort(nums, 0, nums.length - 1)).toEqual([1, 2, 3, 4, 5, 7, 8, 9]);
});
