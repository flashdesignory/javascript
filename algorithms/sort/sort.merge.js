/*
 * @title: Merge Sort
 * @description:
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// Big O(n log n) time Big O(1) space
function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex++]);
    } else {
      result.push(right[rightIndex++]);
    }
  }

  return result
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

// npx jest algorithms/sort/sort.merge.js
test('mergeSort()', () => {
  const nums = [7, 9, 3, 4, 2, 8, 5, 1];
  expect(mergeSort(nums)).toEqual([1, 2, 3, 4, 5, 7, 8, 9]);
});
