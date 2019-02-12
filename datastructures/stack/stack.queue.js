/*
 * @title: StackQueue
 * @description: Generic Queue built with a Stack
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Stack {
  constructor() {
    this.data = {};
    this.size = 0;
  }

  push(value) {
    this.data[this.size] = value;
    this.size++;
  }

  pop() {
    const temp = this.data[this.size - 1];
    delete this.data[this.size - 1];
    this.size--;
    return temp;
  }

  peek() {
    return this.data[this.size - 1];
  }

  empty() {
    return this.size === 0;
  }

  print() {
    const result = [];
    Object.values(this.data).forEach((value) => {
      result.push(value);
    });
    return result;
  }
}

class StackQueue {
  constructor() {
    this.inStack = new Stack();
    this.outStack = new Stack();
  }

  enqueue(value) {
    this.inStack.push(value);
  }

  dequeue() {
    if (this.outStack.empty()) {
      while (!this.inStack.empty()) {
        const item = this.inStack.pop();
        this.outStack.push(item);
      }

      if (this.outStack.empty()) {
        return null;
      }
    }

    return this.outStack.pop();
  }
}

// npx jest datastructures/stack/stack.queue.js
describe('stack queue data structure', () => {
  const stackqueue = new StackQueue();
  const values = [3, 6, 1, 2, 5, 4];
  for (let i = 0; i < values.length; i++) {
    stackqueue.enqueue(values[i]);
  }
  it('dequeue() should equal 3', () => {
    expect(stackqueue.dequeue()).toEqual(3);
  });
});
