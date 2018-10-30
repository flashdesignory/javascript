/*
 * @title: Stack
 * @description: Generic Stack Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// last-in first-out (LIFO)

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

// example
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.peek());
console.log(stack.pop());
console.log(stack.peek());
