/*
 * @title: Reverse Array
 * @description: Simple function to reverse array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function reverseArrayOne(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }

  return arr;
}

function reverseArrayTwo(arr) {
  const len = arr.length;
  const middle = Math.floor(len / 2);

  for (let i = 0; i < middle; i++) {
    const temp = arr[i];
    arr[i] = arr[len - 1 - i];
    arr[len - 1 - i] = temp;
  }

  return arr;
}

// npx jest algorithms/array/array.reverse.js
describe('reverse array', () => {
  test('reverseArrayOne()', () => {
    const nums = [1, 2, 3, 4, 5, 6, 7];
    expect(reverseArrayOne(nums)).toEqual([7, 6, 5, 4, 3, 2, 1]);
  });
  test('reverseArrayTwo()', () => {
    const nums = [1, 2, 3, 4, 5, 6, 7];
    expect(reverseArrayTwo(nums)).toEqual([7, 6, 5, 4, 3, 2, 1]);
  });
});
