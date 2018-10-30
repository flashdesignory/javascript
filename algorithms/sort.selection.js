/*
 * @title: Selection Sort
 * @description: assume the first one is the lowest, compare and swap if needed.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// Big O(n2) time Big O(1) space
function selectionSort(arr) {
  const len = arr.length;
  let min;
  let temp;

  for (let i = 0; i < len; i++) {
    min = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }

    if (i !== min) {
      temp = arr[i];
      arr[i] = arr[min];
      arr[min] = temp;
    }
  }

  return arr;
}

const nums = [7, 9, 3, 4, 2, 8, 5, 1];
console.log(selectionSort(nums));
