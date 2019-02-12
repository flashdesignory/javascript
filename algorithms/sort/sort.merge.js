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
  let lIndx = 0;
  let rIndx = 0;

  while (lIndx < lLen && rIndx < rLen) {
    if (left[lIndx] < right[rIndx]) {
      result.push(left[lIndx++]);
    } else {
      result.push(right[rIndx++]);
    }
  }

  return result.concat(left.slice(lIndx)).concat(right.slice(rIndx));
}

function mergeSort(arr) {
  const len = arr.length;
  if (len < 2) {
    return arr;
  }

  const mid = Math.floor(len / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

// npx jest algorithms/sort.merge.js
test('mergeSort()', () => {
  const nums = [7, 9, 3, 4, 2, 8, 5, 1];
  expect(mergeSort(nums)).toEqual([1, 2, 3, 4, 5, 7, 8, 9]);
});
