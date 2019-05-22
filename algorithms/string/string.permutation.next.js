/*
 * @title: Permutations of String
 * @description: Implement next permutation, which rearranges
 * numbers into the lexicographically next greater permutation of numbers.
 * If such arrangement is not possible, it must rearrange it as the
 * lowest possible order (ie, sorted in ascending order).
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function swap(arr, left, right) {
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
}

function reverse(arr, left, right) {
  while (left < right) {
    swap(arr, left, right);
    left++;
    right--;
  }
}

function nextPermutation(arr) {
  let i = arr.length - 2;

  while (i >= 0 && arr[i + 1] <= arr[i]) {
    i--;
  }

  if (i >= 0) {
    let j = arr.length - 1;
    while (j >= 0 && arr[j] <= arr[i]) {
      j--;
    }
    swap(arr, i, j);
  }
  reverse(arr, i + 1, arr.length - 1);
  return arr;
}

// npx jest algorithms/string/string.permutation.next.js
test('test next permutation', () => {
  expect(nextPermutation([1, 2, 3])).toEqual([1, 3, 2]);
});
