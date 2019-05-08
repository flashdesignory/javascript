/*
 * @title: Max Difference
 * @description: Maximum difference between
 * two elements such that larger element appears after the smaller number
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// sliding window
function maxDiff(arr) {
  let min = arr[0];
  let max = arr[1] - min;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - min > max) {
      max = arr[i] - min;
    }
    if (arr[i] < min) {
      min = arr[i];
    }
  }

  return max;
}

// npx jest algorithms/number/number.maxDiff.js
test('maxDiff()', () => {
  expect(maxDiff([1, 2, 90, 10, 110])).toEqual(109);
});
