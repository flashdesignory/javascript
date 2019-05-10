/*
 * @title: largest Rectangle Histogram
 * @description: Find largest rectangle in a histogram
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
 Given n non-negative integers representing the histogram's bar height
 where the width of each bar is 1, find the area of largest rectangle
 in the histogram.
*/

function largestRectangleArea(arr) {
  if (arr.length === 0) return 0;
  const stack = [];
  let max = 0;
  for (let i = 0; i <= arr.length; i++) {
    const current = (i === arr.length) ? -1 : arr[i];
    while (stack.length !== 0 && current < arr[stack[stack.length - 1]]) {
      const index = stack.pop();
      const height = arr[index];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      max = Math.max(max, height * width);
    }
    stack.push(i);
  }
  return max;
}

// npx jest algorithms/array/array.histogram.js
test('largestRectangleArea()', () => {
  expect(largestRectangleArea([2, 1, 5, 6, 2, 3])).toEqual(10);
});
