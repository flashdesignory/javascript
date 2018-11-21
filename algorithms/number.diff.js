/*
 * @title: difference in array
 * @description: see below
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
  Find target subtraction is possible in a given unsorted array of numbers
  Given an array of unsorted numbers and a target element.
  Find if any two elements subtract to the target element or not.
  You can loop through the array only once.
*/

function twoDiff(arr, n) {
  const storage = {};
  for (let i = 0; i < arr.length; i++) {
    const sub = arr[i] - n;
    const add = arr[i] + n;

    if (storage[sub] || storage[add]) {
      return true;
    }

    storage[arr[i]] = true;
  }

  return false;
}

// npx jest algorithms/number.diff.js
describe('twodiff()', () => {
  test('twoDiff([1, 2, 3, 4, 5], 3)', () => {
    expect(twoDiff([1, 2, 3, 4, 5], 3)).toBe(true);
  });
  test('towDiff([5, 4, 3, 2, 1], 7)', () => {
    expect(twoDiff([5, 4, 3, 2, 1], 7)).toBe(false);
  });
  test('twoDiff([5, 4, 3, 2, 1], 2)', () => {
    expect(twoDiff([5, 4, 3, 2, 1], 2)).toBe(true);
  });
});
