/*
 * @title: Max Sum of K-size Window
 * @description: Given an array nums, there is a sliding window of size k
 * which is moving from the very left of the array to the very right.
 * You can only see the k numbers in the window.
 * Each time the sliding window moves right by one position. Return the max sliding window.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function maxSlidingWindow(arr, k) {
  if (!arr.length) return [];

  const result = [];
  const queue = arr.slice(0, k);
  let index = k;

  while (index <= arr.length) {
    const max = Math.max.apply(null, queue);
    result.push(max);
    queue.shift();
    queue.push(arr[index]);
    index++;
  }

  return result;
}

// npx jest algorithms/array/array.slidingwindow.maxsum.js
test('return max sum of k-size window', () => {
  const nums = [1, 3, -1, -3, 5, 3, 6, 7];
  const k = 3;
  expect(maxSlidingWindow(nums, k)).toEqual([1, 3, -1, -3, 5, 3, 6, 7]);
});
