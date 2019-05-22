/*
 * @title: Container With Most Water
 * @description: Given n non-negative integers a1, a2, ..., an ,
 * where each represents a point at coordinate (i, ai). n vertical lines
 * are drawn such that the two endpoints of line i is at (i, ai) and (i, 0).
 * Find two lines, which together with x-axis forms a container,
 * such that the container contains the most water.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const maxArea = function (arr) {
  let max = 0;
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const a = arr[left];
    const b = arr[right];

    const area = Math.min(a, b) * (right - left);

    if (area > max) max = area;

    if (b > a) left++;
    else right--;
  }

  return max;
};

// npx jest algorithms/misc/container.most.water.js
test('Container With Most Water', () => {
  expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toEqual(49);
});
