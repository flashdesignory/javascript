/*
 * @title: Sum
 * @description: simple sum algo
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function pairMatchingSum(arr, sum) {
  // no duplicates
  let left;
  let right;
  let current;

  let leftIndex = 0;
  let rightIndex = arr.length - 1;

  const sorted = arr.sort((a, b) => a - b);
  const result = {};

  while (leftIndex < rightIndex) {
    left = sorted[leftIndex];
    right = sorted[rightIndex];
    current = left + right;

    if (current === sum) {
      result[`${left}-${right}`] = true;
      leftIndex++;
      rightIndex--;
    } else if (current > sum) {
      rightIndex--;
    } else {
      leftIndex++;
    }
  }

  return Object.keys(result);
}

function allPairMatchingSum(arr, sum) {
  arr = arr.sort((a, b) => a - b);
  let start = 0;
  let end = arr.length - 1;
  const result = [];

  while (start < end) {
    if (arr[start] + arr[end] === sum) {
      result.push([arr[start], arr[end]]);

      // check for duplicate entries
      if (arr[start + 1] === arr[start] && arr[end - 1] !== arr[end]) {
        start++;
      }
      if (arr[end - 1] === arr[end] && arr[start + 1] !== arr[start]) {
        end--;
      } else {
        start++;
        end--;
      }

      /* if not checking for duplicates
      start++;
      end--;
      */
    } else if (arr[start] + arr[end] > sum) {
      end--;
    } else {
      start++;
    }
  }

  return result;
}

// npx jest algorithms/number.sum2.js
test('pairMatchingSum()', () => {
  const unSortedArr = [2, 3, 2, 5, 4, 5, 5, 5, 5, 9, 6, 8, 8, 7];
  const sum = 10;
  expect(pairMatchingSum(unSortedArr, sum)).toEqual(['2-8', '3-7', '4-6', '5-5']);
});
test('allPairMatchingSum()', () => {
  const unSortedArr = [10, 12, 10, 15, -1, 7, 6, 5, 4, 2, 1, 1, 1];
  const sum = 11;
  expect(allPairMatchingSum(unSortedArr, sum))
    .toEqual([[-1, 12], [1, 10], [1, 10], [4, 7], [5, 6]]);
});
