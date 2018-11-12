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

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.data[parent] > this.data[index]) {
        const temp = this.data[parent];
        this.data[parent] = this.data[index];
        this.data[index] = temp;
      }
      index = parent;
    }
  }

  extractMin() {
    const min = this.data[0];
    this.data[0] = this.data.pop();
    this.bubbleDown(0);
    return min;
  }

  bubbleDown(index) {
    while (true) { // eslint-disable-line
      const left = Math.floor((index * 2) + 1);
      const right = Math.floor((index * 2) + 2);

      let smallest = index;

      if (this.data[index] > this.data[left]) {
        smallest = left;
      }
      if (this.data[index] > this.data[right]) {
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

const heap = new BinaryMinHeap();
heap.add(5);
heap.add(4);
heap.add(8);
heap.add(6);
heap.add(1);
heap.add(14);
heap.add(2);
heap.add(7);
console.log(heap.data);
heap.extractMin();
console.log(heap.data);
