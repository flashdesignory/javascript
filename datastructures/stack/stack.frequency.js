/*
 * @title: Maximum Frequency Stack
 * @description: Simple frequency stack implementation
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
  Input:
  ["FreqStack","push","push","push","push","push","push","pop","pop","pop","pop"],
  [[],[5],[7],[5],[7],[4],[5],[],[],[],[]]
  Output: [null,null,null,null,null,null,null,5,7,5,4]
  Explanation:
  After making six .push operations, the stack is [5,7,5,7,4,5] from bottom to top.  Then:

  pop() -> returns 5, as 5 is the most frequent.
  The stack becomes [5,7,5,7,4].

  pop() -> returns 7, as 5 and 7 is the most frequent, but 7 is closest to the top.
  The stack becomes [5,7,5,4].

  pop() -> returns 5.
  The stack becomes [5,7,4].

  pop() -> returns 4.
  The stack becomes [5,7].
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

  empty() {
    return this.size === 0;
  }

  top() {
    return this.data[this.size - 1];
  }
}

class FreqStack {
  constructor() {
    this.stacks = [];
    this.frequency = {};
    this.top = 0;
  }

  push(x) {
    this.frequency[x] = (this.frequency[x] || 0) + 1;
    if (this.frequency[x] > this.top) this.top = this.frequency[x];
    if (!this.stacks[this.frequency[x]]) this.stacks[this.frequency[x]] = new Stack();
    this.stacks[this.frequency[x]].push(x);
  }

  pop() {
    const result = this.stacks[this.top].pop();
    if (this.stacks[this.top].empty()) this.top--;
    this.frequency[result]--;
    return result;
  }
}

// npx jest datastructures/stack/stack.frequency.js
describe('frequency stack data structure', () => {
  const stack = new FreqStack();
  stack.push(5);
  stack.push(7);
  stack.push(5);
  stack.push(7);
  stack.push(4);
  stack.push(5);
  stack.pop();
  stack.pop();
  stack.pop();
  it('pop() should equal 4', () => {
    expect(stack.pop()).toEqual(4);
  });
});
