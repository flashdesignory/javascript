/*
 * @title: QueueStack
 * @description: Generic Stack built with a Queue
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Queue {
  constructor() {
    this.data = {};
    this.first = 0;
    this.last = 0;
  }

  enqueue(value) {
    this.data[this.last] = value;
    this.last++;
  }

  dequeue() {
    const temp = this.data[this.first];
    delete this.data[this.first];
    this.first++;
    return temp;
  }

  empty() {
    return this.first === this.last;
  }
}

class QueueStack {
  constructor() {
    this.inQueue = new Queue();
    this.outQueue = new Queue();
  }

  push(value) {
    this.outQueue.enqueue(value);
    while (!this.inQueue.empty()) {
      this.outQueue.enqueue(this.inQueue.dequeue());
    }

    const temp = this.inQueue;
    this.inQueue = this.outQueue;
    this.outQueue = temp;
  }

  pop() {
    if (this.inQueue.empty()) return null;
    return this.inQueue.dequeue();
  }
}

// npx jest datastructures/queue/queue.stack.js
describe('queue stack data structure', () => {
  const stackqueue = new QueueStack();
  const values = [3, 6, 1, 2, 5, 4];
  for (let i = 0; i < values.length; i++) {
    stackqueue.push(values[i]);
  }
  it('pop() should equal 3', () => {
    expect(stackqueue.pop()).toEqual(4);
  });
});
