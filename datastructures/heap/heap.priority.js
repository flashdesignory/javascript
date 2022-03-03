/*
 * @title: Priority Queue
 * @description: Priority Queue implemented with Min heap
 * @todo: handle same priority....
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.data = [];
  }

  // bigO(log n);
  enqueue(value, priority) {
    const node = new Node(value, priority);
    this.data.push(node);
    this.bubbleUp(this.data.length - 1);
  }

  // bigO(log n);
  dequeue() {
    const min = this.data[0];
    this.data[0] = this.data.pop();
    this.bubbleDown(0);
    return min;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.data[parent].priority > this.data[index].priority) {
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
      const left = Math.floor((index * 2) + 1);
      const right = Math.floor((index * 2) + 2);
      let smallest = index;

      if (left < this.data.length
        && this.data[left].priority < this.data[smallest].priority) {
        smallest = left;
      }

      if (right < this.data.length
        && this.data[right].priority < this.data[smallest].priority) {
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

  empty() {
    return this.data.length === 0;
  }
}

// npx jest datastructures/heap/heap.priority.js
describe('priority queue with min heap', () => {
  it('should return priority item', () => {
    const pq = new PriorityQueue();
    const values = [['five', 5], ['four', 4], ['eight', 8], ['six', 6],
      ['one', 1], ['fourteen', 14], ['two', 2], ['seven', 7]];
    for (let i = 0; i < values.length; i++) {
      pq.enqueue(values[i][0], values[i][1]);
    }
    expect(pq.dequeue().value).toBe('one');
  });
});
