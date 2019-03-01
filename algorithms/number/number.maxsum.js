/*
 * @title: Max Sum
 * @description: find max sum of 4 continuous items in array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// sliding window
function maxSum(arr, n, k) {
  if (n < k) return null;
  let max = 0;

  for (let i = 0; i < k; i++) {
    max += arr[i];
  }

  let currentSum = max;
  for (let i = k; i < n; i++) {
    currentSum += arr[i] - arr[i - k];
    max = Math.max(currentSum, max);
  }

  return max;
}

// npx jest algorithms/number/number.maxsum.js
test('maxSum()', () => {
  const nums = [1, 4, 2, 10, 2, 3, 1, 0, 20];
  const k = 4;
  const n = nums.length;
  expect(maxSum(nums, n, k)).toEqual(24);
});
