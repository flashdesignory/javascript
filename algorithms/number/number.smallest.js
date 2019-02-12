/*
 * @title: Second Smallest
 * @description: find second smallest number
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function findTwoSmallest(arr) {
  let min1 = arr[0];
  let min2 = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min1) {
      min2 = min1;
      min1 = arr[i];
    } else if (arr[i] < min2 && arr[i] !== min1) {
      min2 = arr[i];
    }
  }

  return [min1, min2];
}

// npx jest algorithms/number.smallest.js
test('findTwoSmallest()', () => {
  expect(findTwoSmallest([12, 13, 1, 10, 34, 1])).toEqual([1, 10]);
});
