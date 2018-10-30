/*
 * @title: Bubble Sort
 * @description: Compare first with second and swap
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// Big O(n2) time Big O(1) space
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
  // notice where we stop: arr.length-i;
  // since at the end of the loop, the values higher than length-i will be sorted.
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

//
const nums = [7, 9, 3, 4, 2, 8, 5, 1];
console.log(bubbleSort(nums));
