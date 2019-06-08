/*
 * @title: Product except self
 * @description: return array with product except by itself
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function productExceptSelf(nums) {
  const result = [];
  const length = nums.length; // eslint-disable-line
  const left = [];
  const right = [];

  left[0] = 1;
  right[length - 1] = 1;

  for (let i = 1; i < length; i++) {
    left[i] = nums[i - 1] * left[i - 1];
  }

  for (let i = length - 2; i >= 0; i--) {
    right[i] = nums[i + 1] * right[i + 1];
  }

  for (let i = 0; i < length; i++) {
    if (i === 0) {
      result[i] = right[i];
    } else if (i === length - 1) {
      result[i] = left[i];
    } else {
      result[i] = left[i] * right[i];
    }
  }

  return result;
}

console.log(productExceptSelf([1, 2, 3, 4]));

// npx jest algorithms/number/number.product.js
test('productExceptSelf()', () => {
  expect(productExceptSelf([1, 2, 3, 4])).toEqual([24, 12, 8, 6]);
});
