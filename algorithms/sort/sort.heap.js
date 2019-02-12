/*
 * @title: Heap Sort
 * @description: create a max heap and sort
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function heapify(arr, index, size) {
  const left = 2 * index + 1;
  const right = 2 * index + 2;
  let largestValueIndex = index;

  if (size > left && arr[largestValueIndex] < arr[left]) {
    largestValueIndex = left;
  }

  if (size > right && arr[largestValueIndex] < arr[right]) {
    largestValueIndex = right;
  }

  if (largestValueIndex !== index) {
    const temp = arr[index];
    arr[index] = arr[largestValueIndex];
    arr[largestValueIndex] = temp;
    heapify(arr, largestValueIndex, size);
  }
}

function createMaxHeap(arr) {
  for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
    heapify(arr, i, arr.length);
  }
  return arr;
}

function heapSort(arr) {
  let size = arr.length;
  arr = createMaxHeap(arr);

  for (let i = arr.length - 1; i > 0; i--) {
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    size--;
    heapify(arr, 0, size);
  }
  return arr;
}

// npx jest algorithms/sort/sort.heap.js
test('heapSort()', () => {
  const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
  expect(heapSort(nums)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
