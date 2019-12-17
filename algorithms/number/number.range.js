/*
 * @title: missing range
 * @description: find missing range in array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function findMissingRanges(nums, lower, upper) {
  const result = [];

  nums = [lower - 1, ...nums, upper + 1];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1] + 1) {
      continue; // eslint-disable-line
    }

    if (nums[i] === nums[i - 1] + 2) {
      result.push(`${nums[i - 1] + 1}`);
    } else {
      result.push(`${nums[i - 1] + 1}->${nums[i] - 1}`);
    }
  }

  return result;
}

// npx jest algorithms/number/number.range.js
describe('findMissingRanges()', () => {
  test('findMissingRanges([0, 1, 3, 50, 75], 0, 99)', () => {
    expect(findMissingRanges([0, 1, 3, 50, 75], 0, 99))
      .toEqual(['2', '4->49', '51->74', '76->99']);
  });
});
