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

function partition(items, left, right) {
  const pivot = items[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }

    if (i <= j) {
      swap(items, i, j);
      i++;
      j--;
    }
  }

  return i;
}

function quickSort(items, left, right) {
  let index;
  if (items.length > 1) {
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

const nums = [7, 9, 3, 4, 2, 8, 5, 1];
console.log(quickSort(nums, 0, nums.length - 1));
