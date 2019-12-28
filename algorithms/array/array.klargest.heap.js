/*
 * @title: find k largest
 * @description: simple algo to return k largest element in unsorted array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class BinaryMinHeap {
  constructor() {
    this.data = [];
  }

  add(value) {
    this.data.push(value);
    this.bubbleUp(this.data.length - 1);
  }

  extractMin() {
    const min = this.data[0];
    this.data[0] = this.data[this.data.length - 1];
    this.data.pop();
    this.bubbleDown(0);
    return min;
  }

  bubbleUp(index) {
    const parent = Math.floor((index - 1) / 2);

    if (this.data[parent] > this.data[index]) {
      const temp = this.data[parent];
      this.data[parent] = this.data[index];
      this.data[index] = temp;
      this.bubbleUp(parent);
    }
  }

  bubbleDown(index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let smallest = index;

    if (left < this.data.length && this.data[left] < this.data[smallest]) {
      smallest = left;
    }

    if (right < this.data.length && this.data[right] < this.data[smallest]) {
      smallest = right;
    }

    if (index !== smallest) {
      const temp = this.data[index];
      this.data[index] = this.data[smallest];
      this.data[smallest] = temp;
      this.bubbleDown(smallest);
    }
  }

  /*
  // itterative
  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.data[parent] > this.data[index]) {
        const temp = this.data[parent];
        this.data[parent] = this.data[index];
        this.data[index] = temp;
        index = parent;
      } else {
        break;
      }
    }
  }
  bubbleDown(index) {
    while (index < this.data.length) { // eslint-disable-line
    const left = 2*index+1;
    const right = 2*index+2;
    let smallest = index;

    if(left<this.data.length && this.data[left] < this.data[smallest]){
        smallest = left;
    }

    if(right<this.data.length && this.data[right] < this.data[smallest]){
        smallest = right;
    }

      if (smallest !== index) {
        const temp = this.data[smallest];
        this.data[smallest] = this.data[index];
        this.data[index] = temp;

        index = smallest;
      } else {
        break;
      }
    }
  }
  */
}

const findKthLargest = function (arr, k) {
  const heap = new BinaryMinHeap();
  for (let i = 0; i < k; i++) {
    heap.add(arr[i]);
  }

  for (let i = k; i < arr.length; i++) {
    const min = heap.data[0];
    if (arr[i] > min) {
      heap.extractMin(heap);
      heap.add(arr[i], heap);
    }
  }

  return heap.extractMin();
};

// npx jest algorithms/array/array.klargest.heap.js
test('findKthLargest()', () => {
  expect(findKthLargest([3, 2, 1, 5, 6, 4], 2)).toEqual(5);
});
test('findKthLargest()', () => {
  expect(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toEqual(4);
});
test('findKthLargest()', () => {
  expect(findKthLargest([-1, 2, 0], 1)).toEqual(2);
});
test('findKthLargest()', () => {
  const nums = [3, 2, 3, 1, 2, 4, 5, 5, 6, 7, 7, 8, 2, 3, 1, 1, 1, 10, 11, 5, 6, 2, 4, 7, 8, 5, 6];
  expect(findKthLargest(nums, 20)).toEqual(2);
});
