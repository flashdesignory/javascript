/*
 * @title: Max Sum of K-size
 * @description: sliding window algo to find max sum
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function maxSum(arr, length, k) {
  if (length < k) return null;
  let max = 0;

  for (let i = 0; i < k; i++) {
    max += arr[i];
  }

  let current = max;
  for (let i = k; i < length; i++) {
    current += arr[i] - arr[i - k];
    max = Math.max(current, max);
  }

  return max;
}

// npx jest algorithms/number/number.sum.slidingwindow.js
test('return max sum of k-size window', () => {
  const nums = [1, 4, 2, 10, 2, 3, 1, 0, 20];
  const k = 4;
  const n = nums.length;
  expect(maxSum(nums, n, k)).toEqual(24);
});
