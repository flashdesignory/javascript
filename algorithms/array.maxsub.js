/*
 * @title: Max Sum Array
 * @description: Find max sum of subarray
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function maxSubArraySum(arr) {
  let max = 0;
  let current = 0;
  let start = 0;
  let end = 0;
  let runner = 0;

  for (let i = 0; i < arr.length; i++) {
    current += arr[i];
    if (max < current) {
      max = current;
      start = runner;
      end = i;
    }
    if (current < 0) {
      current = 0;
      runner = i + 1;
    }
  }
  console.log(start, end);
  return (end - start + 1);
}

// npx jest algorithms/array.maxsub.js
test('max sub array', () => {
  expect(maxSubArraySum([-2, -3, 4, -1, -2, 1, 5, -3])).toEqual(5);
});
