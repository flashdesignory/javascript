/*
 * @title: Median - Sliding Window
 * @description: Median is the middle value in an ordered integer list.
 * If the size of the list is even, there is no middle value.
 * So the median is the mean of the two middle value.
 * Given an array nums, there is a sliding window of size k which is
 * moving from the very left of the array to the very right.
 * You can only see the k numbers in the window.
 * Each time the sliding window moves right by one position.
 * Your job is to output the median array for each window in the original array.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function medianSlidingWindow(arr, k) {
  if (!arr.length) return [];

  const result = [];
  const queue = arr.slice(0, k);
  let index = k;

  while (index <= arr.length) {
    const current = queue.slice(0);
    current.sort((a, b) => a - b);
    const length = current.length; //eslint-disable-line
    const middle = Math.floor(length / 2);
    const isEven = length % 2 === 0;
    if (isEven) {
      const left = current[middle - 1];
      const right = current[middle];
      result.push((left + right) / 2);
    } else {
      result.push(current[middle]);
    }
    queue.shift();
    queue.push(arr[index]);
    index++;
  }

  return result;
}

function medianSlidingWindow2(arr, k) {
  const result = [];
  for (let i = 0; i < arr.length - k + 1; i++) {
    const current = arr.slice(i, i + k);
    current.sort((a, b) => a - b);
    const length = current.length; //eslint-disable-line
    const middle = Math.floor(length / 2);
    const isEven = length % 2 === 0;
    if (isEven) {
      const left = current[middle - 1];
      const right = current[middle];
      result.push((left + right) / 2);
    } else {
      result.push(current[middle]);
    }
  }

  return result;
}

// npx jest algorithms/array/array.slidingwindow.median.js
test('return median of k-size windowr', () => {
  expect(medianSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)).toEqual([1, -1, -1, 3, 5, 6]);
  expect(medianSlidingWindow2([1, 3, -1, -3, 5, 3, 6, 7], 3)).toEqual([1, -1, -1, 3, 5, 6]);
});
