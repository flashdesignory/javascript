/*
 * @title: Insert values into array
 * @description: insert given value in ordered sequence
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function findIndexToInsert(arr, num) {
  arr.sort((a, b) => a - b);
  let index = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < num) {
      index++;
    }
  }
  return index;
}

function findIndexToInsertBS(arr, value) {
  arr.sort((a, b) => a - b);
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    // start with left
    if (arr[middle] < value) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }
  return left;
}

// npx jest algorithms/array/array.insert.js
test('findIndexToInsert()', () => {
  expect(findIndexToInsert([10, 20, 30, 40, 50], 35)).toEqual(3);
  expect(findIndexToInsert([10, 20, 30, 40, 50], 2)).toEqual(0);
  expect(findIndexToInsert([10, 20, 30, 40, 50], 60)).toEqual(5);
});
test('findIndexToInsertBS()', () => {
  expect(findIndexToInsertBS([10, 20, 30, 40, 50], 35)).toEqual(3);
  expect(findIndexToInsertBS([10, 20, 30, 40, 50], 2)).toEqual(0);
  expect(findIndexToInsertBS([10, 20, 30, 40, 50], 60)).toEqual(5);
});
