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
      const parentIndex = Math.floor((index + 1) / 2) - 1;
      if (this.data[parentIndex] > this.data[index]) {
        const temp = this.data[parentIndex];
        this.data[parentIndex] = this.data[index];
        this.data[index] = temp;
      }
      index = parentIndex;
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
      const child = (index + 1) * 2;
      const sibling = child - 1;
      let toSwap = null;

      // if current is greater than child
      if (this.data[index] > this.data[child]) {
        toSwap = child;
      }

      // if sibling is smaller than child, but also smaller than current
      if (this.data[index] > this.data[sibling]
        && (this.data[child] == null
        || (this.data[child] !== null
        && this.data[sibling] < this.data[child]))) {
        toSwap = sibling;
      }

      // if we don't need to swap, then break.
      if (toSwap == null) {
        break;
      }

      const temp = this.data[toSwap];
      this.data[toSwap] = this.data[index];
      this.data[index] = temp;

      index = toSwap;
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
