/*
 * @title: Max Sum
 * @description: find max sum of 4 continuous items in array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// sliding window
function maxSum(arr, k) {
  if (arr.length < k) return null;
  let max = 0;

  for (let i = 0; i < k; i++) {
    max += arr[i];
  }

  let currentSum = max;
  for (let i = k; i < arr.length; i++) {
    currentSum += arr[i] - arr[i - k];
    max = Math.max(currentSum, max);
  }

  return max;
}

// npx jest algorithms/number/number.maxsum.js
test('maxSum()', () => {
  const nums = [1, 4, 2, 10, 2, 3, 1, 0, 20];
  const k = 4;
  expect(maxSum(nums, k)).toEqual(24);
});
