/*
 * @title: StackQueue
 * @description: Generic Queue built with a Stack
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function Stack() {
  this.data = {};
  this.size = 0;
}

Stack.prototype.push = function (value) {
  this.data[this.size] = value;
  this.size++;
  return value;
};

Stack.prototype.pop = function () {
  const temp = this.data[this.size - 1];
  delete this.data[this.size - 1];
  this.size--;
  return temp;
};

Stack.prototype.peek = function () {
  return this.data[this.size - 1];
};

Stack.prototype.empty = function () {
  return this.size === 0;
};

function StackQueue() {
  this.inStack = new Stack();
  this.outStack = new Stack();
}

StackQueue.prototype.push = function (value) {
  return this.inStack.push(value);
};

StackQueue.prototype.pop = function () {
  if (this.outStack.size === 0) {
    while (this.inStack.size > 0) {
      const item = this.inStack.pop();
      this.outStack.push(item);
    }

    if (this.outStack.size === 0) {
      return null;
    }
  }

  return this.outStack.pop();
};

// example
const sq = new StackQueue();
console.log(sq.push(1));
console.log(sq.push(2));
console.log(sq.push(3));
console.log(sq.push(4));
console.log(sq.pop());
