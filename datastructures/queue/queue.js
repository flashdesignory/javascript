/*
 * @title: Queue
 * @description: Generic Queue Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// first-in first-out (FIFO)

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

  peek() {
    return this.data[this.first];
  }

  empty() {
    return this.first === this.last;
  }

  print() {
    const result = [];
    Object.values(this.data).forEach((value) => {
      result.push(value);
    });
    return result;
  }
}

// npx jest datastructures/queue/queue.js
describe('set data structure', () => {
  const queue = new Queue();
  const values = [3, 6, 1, 2, 5, 4];
  for (let i = 0; i < values.length; i++) {
    queue.enqueue(values[i]);
  }
  it('print() should equal [3, 6, 1, 2, 5, 4]', () => {
    expect(queue.print()).toEqual(values);
  });
  it('peek() should equal 3', () => {
    expect(queue.peek()).toEqual(3);
  });
  it('dequeue() should equal 3', () => {
    expect(queue.dequeue()).toEqual(3);
  });
});
