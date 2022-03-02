/*
 * @title: Rotate Point Array
 * @description: function to find rotation point in array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const findMin = (arr) => {
  if (arr.length === 0) return -1; // empty array

  let left = 0;
  let right = arr.length - 1;

  if (arr[left] <= arr[right]) return arr[left]; // only one element or sorted

  while (left < right) {
    const middle = Math.floor((left + right) / 2);
    // first element to the right of middle smallest
    if (middle < right && arr[middle + 1] < arr[middle]) {
      return arr[middle + 1];
    }
    // middle is smallest
    if (middle > left && arr[middle - 1] > arr[middle]) {
      return arr[middle];
    }
    if (arr[right] > arr[middle]) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }
  return -1;
};

// npx jest algorithms/array/array.rotate.point.two.js
describe('find rotation point in array', () => {
  test('findMin([4, 5, 6, 7, 0, 1, 2])', () => {
    expect(findMin([4, 5, 6, 7, 0, 1, 2])).toEqual(0);
  });
  test('findMin([4, 5, 6, 7, 8, 9, 1, 2, 3])', () => {
    expect(findMin([4, 5, 6, 7, 8, 9, 1, 2, 3])).toEqual(1);
  });
  test('findMin([7])', () => {
    expect(findMin([7])).toEqual(7);
  });
  test('findMin([])', () => {
    expect(findMin([])).toEqual(-1);
  });
  test('findMin([3, 4, 2])', () => {
    expect(findMin([3, 4, 2])).toEqual(2);
  });
  test('findMin([1,2,3])', () => {
    expect(findMin([1, 2, 3])).toEqual(1);
  });
});
