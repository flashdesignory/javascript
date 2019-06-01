/*
 * @title: Circular Queue
 * @description: Generic Circular Queue Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class CircularQueue {
  constructor(k) {
    this.data = {};
    this.head = -1;
    this.tail = -1;
    this.size = k;
  }

  enqueue(value) {
    if (this.isFull()) return false;
    if (this.isEmpty()) this.head = 0;

    this.tail = (this.tail + 1) % this.size;
    this.data[this.tail] = value;
    return true;
  }

  dequeue() {
    if (this.isEmpty()) return false;

    if (this.head === this.tail) {
      this.head = -1;
      this.tail = -1;
      return true;
    }

    delete this.data[this.head];

    this.head = (this.head + 1) % this.size;
    return true;
  }

  front() {
    if (this.isEmpty()) return -1;
    return this.data[this.head];
  }

  back() {
    if (this.isEmpty()) return -1;
    return this.data[this.tail];
  }

  isEmpty() {
    return this.head === -1;
  }

  isFull() {
    return ((this.tail + 1) % this.size) === this.head;
  }
}

// npx jest datastructures/queue/queue.circular.js
describe('ciruclar queue data structure', () => {
  const circularQueue = new CircularQueue(3);
  circularQueue.enqueue(2); // true
  circularQueue.back(); // 2
  circularQueue.front(); // 2
  circularQueue.dequeue(); // true;
  circularQueue.front(); // -1;
  circularQueue.dequeue(); // true;
  circularQueue.front(); // -1;
  circularQueue.enqueue(4);// true;
  circularQueue.enqueue(2);// true;
  circularQueue.enqueue(2);// true;

  it('dequeue() should equal 3', () => {
    expect(circularQueue.enqueue(3)).toBeFalsy();
  });
});
