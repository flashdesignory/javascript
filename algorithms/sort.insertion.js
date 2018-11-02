/*
 * @title: Insertion Sort
 * @description: split array into two sections, swap if needed
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// Big O(n) time Big O(1) space
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[i]) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

// npx jest algorithms/sort.insertion.js
test('insertionSort()', () => {
  const nums = [7, 9, 3, 4, 2, 8, 5, 1];
  expect(insertionSort(nums)).toEqual([1, 2, 3, 4, 5, 7, 8, 9]);
});
