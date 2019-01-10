/*
 * @title: Bubble Sort
 * @description: Compare first with second and swap
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
 * input: [7, 9, 3, 4, 2, 8, 5, 1]
 * output: [1, 2, 3, 4, 5, 7, 8, 9]
 */

// Big O(n^2) time Big O(1) space
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
  // notice where we stop: arr.length-i;
  // since at the end of the loop, the values higher than length-i will be sorted.
    let swapped = false;
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swapped = true;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
    // break out early if no swap was made
    if (!swapped) break;
  }
  return arr;
}

// npx jest algorithms/sort.bubble.js
test('bubbleSort()', () => {
  const nums = [7, 9, 3, 4, 2, 8, 5, 1];
  expect(bubbleSort(nums)).toEqual([1, 2, 3, 4, 5, 7, 8, 9]);
});
