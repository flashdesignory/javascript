/*
 * @title: find missing number
 * @description: find missign value in ordered array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function findMissingNum(arr) {
  const last = arr[arr.length - 1];
  const sum = (last * (last + 1)) / 2;
  let current = 0;
  for (let i = 0; i < arr.length; i++) {
    current += arr[i];
  }
  return sum - current;
}

const nums = [1, 2, 4, 5, 6];
findMissingNum(nums);

// npx jest algorithms/array/array.missing.js
test('findMissingNum()', () => {
  expect(findMissingNum([1, 2, 4, 5, 6])).toEqual(3);
});
