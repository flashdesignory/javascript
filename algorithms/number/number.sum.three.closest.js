/*
 * @title: Three Sum
 * @description: Given an array nums of n integers and an integer target,
 * find three integers in nums such that the sum is closest to target.
 * Return the sum of the three integers. You may assume that each input
 * would have exactly one solution.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function threeSumClosest(nums, target) {
  let closest = Number.MAX_VALUE;

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    let j = i + 1;
    let k = nums.length - 1;

    while (j < k) {
      const sum = nums[i] + nums[j] + nums[k];

      if (Math.abs(target - sum) < Math.abs(closest - target)) {
        closest = sum;
      }

      if (sum > target) k--;
      else if (sum < target) j++;
      else return closest;
    }
  }

  return closest;
}

// npx jest algorithms/number/number.sum.three.closest.js
test('threeSumClosest()', () => {
  expect(threeSumClosest([-1, 2, 1, -4], 1)).toEqual(2);
});
