/*
 * @title: Rotate Array
 * @description: Simple function to rotate array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// verification of input:
// if(isNaN(k) || k < 0) return;
// if(arr.length == 0 ) return;
// if(k > arr.length)k = k%arr.length;

// O(n) time & space
function rotateArrayOne(arr, k) {
  const result = [];
  let i;

  for (i = 0; i < k; i++) {
    result.push(arr[arr.length - k + i]);
  }

  for (i = 0; i < arr.length - k; i++) {
    result.push(arr[i]);
  }

  return result;
}

// O(n) time & O(1) space
function reverse(arr, left, right) {
  while (left < right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
}

function rotateArrayTwo(arr, k) {
  // If one or less, return array
  // since there's no way to rotate anything.
  if (arr.length < 2) return arr;
  // Make sure k is less than arr.length.
  k %= arr.length;
  if (k === 0) return arr;

  reverse(arr, 0, arr.length - 1);
  reverse(arr, 0, k - 1);
  reverse(arr, k, arr.length - 1);

  return arr;
}

// O(n*k) time O(1) space
function rotateArrayThree(arr, k) {
  for (let i = 0; i < k; i++) {
    for (let j = arr.length - 1; j > 0; j--) {
      const temp = arr[j];
      arr[j] = arr[j - 1];
      arr[j - 1] = temp;
    }
  }

  return arr;
}

// npx jest algorithms/array/array.rotate.js
describe('array rotations', () => {
  test('rotateArrayOne()', () => {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8];
    expect(rotateArrayOne(nums, 3)).toEqual([6, 7, 8, 1, 2, 3, 4, 5]);
  });
  test('rotateArrayTwo()', () => {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8];
    expect(rotateArrayTwo(nums, 3)).toEqual([6, 7, 8, 1, 2, 3, 4, 5]);
  });
  test('rotateArrayThree()', () => {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8];
    expect(rotateArrayThree(nums, 3)).toEqual([6, 7, 8, 1, 2, 3, 4, 5]);
  });
});
