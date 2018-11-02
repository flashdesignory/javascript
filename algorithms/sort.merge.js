/*
 * @title: Merge Sort
 * @description:
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// Big O(n log n) time Big O(1) space
function merge(left, right) {
  const result = [];
  const lLen = left.length;
  const rLen = right.length;
  let l = 0;
  let r = 0;

  while (l < lLen && r < rLen) {
    if (left[l] < right[r]) {
      result.push(left[l++]);
    } else {
      result.push(right[r++]);
    }
  }

  return result.concat(left.slice(l)).concat(right.slice(r));
}

function mergeSort(arr) {
  const len = arr.length;
  if (len < 2) {
    return arr;
  }

  const mid = Math.floor(len / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

// npx jest algorithms/sort.merge.js
test('mergeSort()', () => {
  const nums = [7, 9, 3, 4, 2, 8, 5, 1];
  expect(mergeSort(nums)).toEqual([1, 2, 3, 4, 5, 7, 8, 9]);
});
