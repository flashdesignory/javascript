/*
 * @title: Mean Median Mode
 * @description: example of implementations
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// Mean
// sum of the collection divided by its size
function roundTo(num, decimals) {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals); //eslint-disable-line
}

function mean(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  const result = sum / arr.length;
  // return result.toFixed(2);
  // return Math.round(result * 100) / 100;
  return roundTo(result, 2);
}

// Median
// middle element when n is odd
// average of middle two elements when n is even.
function median(arr) {
  const sorted = arr.sort((a, b) => a - b);
  if (sorted.length % 2 === 0) {
    // even - average of those two numbers
    const left = sorted.length / 2 - 1;
    const right = sorted.length / 2;
    return (sorted[left] + sorted[right]) / 2;
  }

  const middle = Math.floor(sorted.length / 2);
  return sorted[middle];
}

// Mode
// number or numbers that appear the most often
function mode(arr) {
  const seen = {};
  let result = [];
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    seen[arr[i]] = seen[arr[i]] + 1 || 1;
    if (seen[arr[i]] > max) {
      result = [arr[i]];
      max = seen[arr[i]];
    } else if (seen[arr[i]] === max) {
      result.push(arr[i]);
    }
  }
  return result;
}

// npx jest algorithms/array/array.mean.median.mode.js
describe('mean, median, mode', () => {
  const nums = [1, 2, 3, 4, 4, 5, 5];

  test('mean()', () => {
    expect(mean(nums)).toEqual(3.43);
  });
  test('median()', () => {
    expect(median(nums)).toEqual(4);
  });
  test('mode()', () => {
    expect(mode(nums)).toEqual([4, 5]);
  });
});
