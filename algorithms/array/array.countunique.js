/*
 * @title: count unique
 * @description: count unique values in array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// sliding window - dynamic size
function countUnique(arr) {
  // move all unique values to the front (left) and
  // duplicates to the right
  // left index will be last index of unique partition

  let left = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[left] !== arr[i]) {
      left++;
      arr[left] = arr[i];
    }
  }
  return left + 1;
}

// npx jest algorithms/array/array.countunique.js
describe('move all duplicates to right', () => {
  it('countUnique()', () => {
    const nums = [1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13];
    expect(countUnique(nums)).toEqual(7);
  });
});
