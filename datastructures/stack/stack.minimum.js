/*
 * @title: Min Stack
 * @description: Stack with min tracking
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

class MinStack {
  constructor() {
    this.dataStack = new Stack();
    this.minStack = new Stack();
  }

  push(value) {
    this.dataStack.push(value);

    if (this.minStack.empty() || this.minStack.peek() > value) {
      this.minStack.push(value);
    } else {
      this.minStack.push(this.minStack.peek());
    }
  }

  pop() {
    this.minStack.pop();
    return this.dataStack.pop();
  }

  min() {
    return this.minStack.peek();
  }
}

// npx jest datastructures/stack.minimum.js
describe('min stack data structure', () => {
  it('should keep track of min value', () => {
    const minStack = new MinStack();
    minStack.push(1);
    minStack.pop();
    minStack.push(2);
    minStack.push(3);
    expect(minStack.min()).toEqual(2);
    minStack.push(1);
    expect(minStack.min()).toEqual(1);
  });
});
