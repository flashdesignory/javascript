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

// npx jest algorithms/array/array.insert.js
test('findIndexToInsert()', () => {
  expect(findIndexToInsert([10, 20, 30, 40, 50], 35)).toEqual(3);
  expect(findIndexToInsert([10, 20, 30, 40, 50], 2)).toEqual(0);
  expect(findIndexToInsert([10, 20, 30, 40, 50], 60)).toEqual(5);
});
