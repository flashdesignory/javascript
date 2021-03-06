/*
 * @title: Max Sum Array
 * @description: Find max sum of subarray
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function maxSubArraySum(arr) {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[0];
  let max = -Infinity;
  let current = 0;
  for (let i = 0; i < arr.length; i++) {
    current += arr[i];
    if (current > max) max = current;
    if (current < 0) current = 0;
  }
  return max;
}

function maxSubArraySum1(arr) {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[0];

  let maxSum = -Infinity;
  let maxLength = 0;
  let result = [];
  let start = 0;
  let end = 0;
  let current = 0;

  for (let i = 0; i < arr.length; i++) {
    current += arr[i];

    if (maxSum < current) {
      maxSum = current;
      end = i;
    }

    if (current < 0) {
      current = 0;
      start = i + 1;
    }
  }

  maxLength = (end - start + 1);
  result = arr.slice(start, end + 1);
  console.log(`max sum: ${maxSum}, max length: ${maxLength}, sub array: ${result}`);
  return maxSum;
}

// npx jest algorithms/array/array.maxsub.sum.js
test('maxSubArraySum()', () => {
  expect(maxSubArraySum([-2, -3, 4, -1, -2, 1, 5, -3])).toEqual(7);
});
test('maxSubArraySum()', () => {
  expect(maxSubArraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toEqual(6);
});
test('maxSubArraySum1()', () => {
  expect(maxSubArraySum1([-2, -3, 4, -1, -2, 1, 5, -3])).toEqual(7);
});
test('maxSubArraySum1()', () => {
  expect(maxSubArraySum1([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toEqual(6);
});
