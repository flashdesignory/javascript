/*
 * @title: count unique
 * @description: count unique values in array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// sliding window - dynamic size
// see array.duplicates.js for similar algorithm
function countUnique(arr) {
  // move all unique values to the front (count) and
  // duplicates to the right
  // count index will be last index of unique partition

  let count = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[count] !== arr[i]) {
      count++;
      arr[count] = arr[i];
    }
  }
  return count + 1;
}

// npx jest algorithms/array/array.countunique.js
describe('move all duplicates to right', () => {
  it('countUnique()', () => {
    const nums = [1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13];
    expect(countUnique(nums)).toEqual(7);
  });
});
