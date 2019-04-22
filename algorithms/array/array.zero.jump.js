/*
 * @title: jump zeros
 * @description: find zero by jumping array value
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
  Given an array, return true if there are zeros and false otherwise.
  You can move either forward or backward the number value in the array
*/

function findZero(arr, index) {
  if (index >= arr.length || arr < 0) return false;
  if (arr[index] === 0) return true;
  return (
    findZero(arr, index + arr[index])
    || findZero(arr, index - arr[index])
  );
}

// npx jest algorithms/array/array.zero.jump.js
describe('find zero by jumping value', () => {
  it('findZero()', () => {
    const nums = [1, 1, 4, 0, 0, 1, 2, 1];
    expect(findZero(nums, 0)).toBe(true);
  });
});
