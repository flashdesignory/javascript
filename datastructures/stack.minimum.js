/*
 * @title: Min Stack
 * @description: Stack with min tracking
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

function MinStack() {
  this.dataStack = new Stack();
  this.minStack = new Stack();
}

MinStack.prototype.push = function (value) {
  this.dataStack.push(value);
  if (this.minStack.empty() || this.minStack.peek() > value) {
    this.minStack.push(value);
  } else {
    this.minStack.push(this.minStack.peek());
  }
};

MinStack.prototype.pop = function () {
  this.minStack.pop();
  return this.dataStack.pop();
};

MinStack.prototype.min = function () {
  return this.minStack.peek();
};

const stack = new MinStack();
stack.push(1);
console.log(stack.pop()); // return 1
stack.push(2);
stack.push(3);
console.log(stack.min()); // return 2
stack.push(1);
console.log(stack.min()); // return 1
