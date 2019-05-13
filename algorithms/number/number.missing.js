/*
 * @title: Missing Number
 * @description: find missing number in array, unordered from 0 to n;
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function findMissingNumber(nums) {
  if (nums.length === 1) {
    if (nums[0] === 0) return 1;
    if (nums[0] === 1) return 0;
    return 0;
  }

  const n = nums.length;
  const expectedSum = n * (n + 1) / 2;
  let actualSum = 0;

  for (let i = 0; i < n; i++) {
    actualSum += nums[i];
  }

  return (expectedSum - actualSum);
}

// npx jest algorithms/number/number.missing.js
test('findMissingNumber()', () => {
  expect(findMissingNumber([9, 8, 7, 6, 2, 0, 1, 5, 4])).toEqual(3);
});
