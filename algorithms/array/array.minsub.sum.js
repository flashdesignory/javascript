/*
 * @title: Minimum Size Subarray Sum
 * @description: Given an array of n positive integers
 * and a positive integer s, find the minimal length of a contiguous
 * subarray of which the sum ≥ s. If there isn't one, return 0 instead.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function minSubArrayLen(s, nums) {
  let min = Number.MAX_VALUE;

  let left = 0;
  let right = -1;
  let sum = 0;

  while (right < nums.length) {
    if (sum >= s) {
      min = Math.min(min, right - left + 1);
      sum -= nums[left];
      left++;
    } else {
      right++;
      sum += nums[right];
    }
  }

  return min === Number.MAX_VALUE ? 0 : min;
}

function minSubArrayLen2(s, nums) {
  if (nums.length === 0) return 0;

  let left = 0;
  let right = 0;

  let sum = nums[left];
  let min = Number.MAX_VALUE;

  while (right < nums.length && left <= right) {
    if (sum < s) {
      right++;
      sum += nums[right];
    } else {
      min = Math.min(min, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return left === 0 ? 0 : min;
}

// npx jest algorithms/array/array.minsub.sum.js
test('minSubArrayLen()', () => {
  expect(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])).toEqual(2);
});
test('minSubArrayLen2()', () => {
  expect(minSubArrayLen2(7, [2, 3, 1, 2, 4, 3])).toEqual(2);
});
