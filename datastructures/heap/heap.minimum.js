/*
 * @title: Min Heap
 * @description: Simple MinHeap
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
    this.data[0] = this.data.pop();
    this.bubbleDown(0);
    return min;
  }

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
    while (index < this.data.length) {
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      let smallest = index;

      if (left < this.data.length && this.data[left] < this.data[smallest]) {
        smallest = left;
      }

      if (right < this.data.length && this.data[right] < this.data[smallest]) {
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
}

// npx jest datastructures/heap/heap.minimum.js
describe('min binary heap data structure', () => {
  it('should return min value', () => {
    const heap = new BinaryMinHeap();
    const values = [5, 4, 8, 6, 1, 14, 2, 7];
    for (let i = 0; i < values.length; i++) {
      heap.add(values[i]);
    }
    expect(heap.extractMin()).toBe(1);
  });
});
