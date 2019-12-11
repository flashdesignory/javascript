/*
 * @title: Stack
 * @description: Generic Stack Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// last-in first-out (LIFO)

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

  size() {
    return this.size;
  }

  print() {
    const result = [];
    Object.values(this.data).forEach((value) => {
      result.push(value);
    });
    return result;
  }
}

// npx jest datastructures/stack/stack.js
describe('stack data structure', () => {
  const stack = new Stack();
  const values = [3, 6, 1, 2, 5, 4];
  for (let i = 0; i < values.length; i++) {
    stack.push(values[i]);
  }
  it('print() should equal [3, 6, 1, 2, 5, 4]', () => {
    expect(stack.print()).toEqual(values);
  });
  it('peek() should equal 4', () => {
    expect(stack.peek()).toEqual(4);
  });
  it('pop() should equal 4', () => {
    expect(stack.pop()).toEqual(4);
  });
});
