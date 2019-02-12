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

  print() {
    const result = [];
    Object.values(this.data).forEach((value) => {
      result.push(value);
    });
    return result;
  }

  sort() {
    const temp = new Stack();

    while (!this.empty()) {
      const lastValue = this.pop();

      while (!temp.empty() && temp.peek() < lastValue) {
        this.push(temp.pop());
      }

      temp.push(lastValue);
    }

    while (!temp.empty()) {
      this.push(temp.pop());
    }
  }
}

// npx jest datastructures/stack/stack.sort.js
describe('sorting stack data structure', () => {
  const stack = new Stack();
  const values = [3, 6, 1, 2, 5, 4];
  for (let i = 0; i < values.length; i++) {
    stack.push(values[i]);
  }
  it('sort() should equal [1, 2, 3, 4, 5, 6]', () => {
    stack.sort();
    expect(stack.print()).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
