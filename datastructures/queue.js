/*
 * @title: Queue
 * @description: Generic Queue Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// first-in first-out (FIFO)

function Queue() {
  this.data = {};
  this.first = 0;
  this.last = 0;
}

Queue.prototype.enqueue = function (value) {
  this.data[this.last] = value;
  this.last++;
};

Queue.prototype.dequeue = function () {
  const temp = this.data[this.first];
  delete this.data[this.first];
  this.first++;
  return temp;
};

Queue.prototype.peek = function () {
  return this.data[this.first];
};

Queue.prototype.empty = function () {
  return this.first === this.last;
};

// example
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.peek());
console.log(queue.dequeue());
console.log(queue.peek());
