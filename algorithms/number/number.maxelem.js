/*
 * @title: Max Elements
 * @description: find max elements of k-ranges
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// sliding window
function maxElem(arr, k) {
  const result = [];

  function traverse(arr, start, end) {
    if (end > arr.length) return;
    let max = 0;

    for (let i = start; i < end; i++) {
      if (arr[i] >= max) max = arr[i];
    }

    result.push(max);
    traverse(arr, start + 1, end + 1);
  }

  traverse(arr, 0, k);

  return result;
}

// npx jest algorithms/number/number.maxelem.js
test('maxElem()', () => {
  const nums = [1, 3, -1, -3, 5, 3, 6, 7];
  const k = 3;
  expect(maxElem(nums, k)).toEqual([3, 3, 5, 5, 6, 7]);
});
