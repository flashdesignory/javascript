/*
 * @title: Three Sum
 * @description: Given an array nums of n integers, are there elements
 * a, b, c in nums such that a + b + c = 0? Find all unique triplets in
 * the array which gives the sum of zero.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function threeSum(nums) {
  const results = [];

  if (nums.length < 3) return results;

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; //eslint-disable-line

    let j = i + 1;
    let k = nums.length - 1;

    while (j < k) {
      const sum = nums[i] + nums[j] + nums[k];

      if (sum === 0) {
        results.push([nums[i], nums[j], nums[k]]);

        while (nums[j] === nums[j + 1]) j++;
        while (nums[k] === nums[k - 1]) k--;

        j++;
        k--;
      } else if (sum < 0) {
        j++;
      } else {
        k--;
      }
    }
  }

  return results;
}

// npx jest algorithms/number/number.sum.three.target.js
test('threeSum()', () => {
  expect(threeSum([-1, 0, 1, 2, -1, -4])).toEqual([[-1, -1, 2], [-1, 0, 1]]);
});
