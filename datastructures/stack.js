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

Stack.prototype.sort = function () {
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
};

// example
const stack = new Stack();
stack.push(3);
stack.push(6);
stack.push(1);
stack.push(2);
stack.push(5);
stack.push(4);
console.log(stack);
stack.sort();
console.log(stack);
