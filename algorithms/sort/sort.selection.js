/*
 * @title: Selection Sort
 * @description: assume the first one is the lowest, compare and swap if needed.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// Big O(n^2) time Big O(1) space
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }

    if (i !== min) {
      const temp = arr[i];
      arr[i] = arr[min];
      arr[min] = temp;
    }
  }

  return arr;
}

// npx jest algorithms/sort/sort.selection.js
test('selectionSort()', () => {
  const nums = [7, 9, 3, 4, 2, 8, 5, 1];
  expect(selectionSort(nums)).toEqual([1, 2, 3, 4, 5, 7, 8, 9]);
});
