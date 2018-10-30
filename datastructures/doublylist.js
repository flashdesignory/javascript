/*
 * @title: Doubly List
 * @description: Simple Doubly Linked List
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function Node(value) {
  this.value = value;
  this.next = null;
  this.previous = null;
}

function DoublyList() {
  this.head = null;
  this.tail = null;
}

DoublyList.prototype.log = function (direction) {
  if (!this.head) return;

  const values = [];
  let current;

  if (direction === undefined) direction = 'forwards';

  if (direction === 'forwards') {
    current = this.head;
    values.push(current.value);

    while (current.next) {
      current = current.next;
      values.push(current.value);
    }
  } else {
    current = this.tail;
    values.push(current.value);

    while (current.previous) {
      current = current.previous;
      values.push(current.value);
    }
  }

  console.log(values);
};

DoublyList.prototype.add = function (value) {
  const node = new Node(value);

  if (!this.head) {
    this.head = node;
    this.tail = node;
    return node;
  }

  this.tail.next = node;
  node.previous = this.tail;
  this.tail = node;
  return node;
};


DoublyList.prototype.remove = function (value) {
  if (!this.head) return;

  let current = this.head;
  let previous = this.head;

  if (current.value === value) {
    this.head = current.next;
    if (this.head) this.head.previous = null;
  }

  while (current.next) {
    if (current.value === value) {
      previous.next = current.next;
      current.next.previous = previous;
    } else {
      previous = current;
      current = current.next;
    }
  }

  if (current.value === value) {
    previous.next = null;
    this.tail = previous;
  }
};

DoublyList.prototype.reverse = function () {
  let current = this.head;
  let previous = null;
  this.head = this.tail;
  this.tail = current;

  while (current) {
    previous = current.previous; //eslint-disable-line
    current.previous = current.next;
    current.next = previous;
    current = current.previous;
  }
};

const list = new DoublyList();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);
list.log();
// list.remove(5);
// list.log("forwards");
// list.log("reverse");
list.reverse();
list.log();
