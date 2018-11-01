/*
 * @title: Singly List
 * @description:Simple Singly Linked List
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

function Node(value) {
  this.value = value;
  this.next = null;
}

function SinglyList() {
  this.head = null;
}

SinglyList.prototype.log = function () {
  if (!this.head) return;

  const values = [];
  let current = this.head;
  /* values.push(current.value);
  while(current.next){
  current = current.next;
  values.push(current.value);
  } */
  while (current) {
    values.push(current.value);
    current = current.next;
  }

  console.log(values);
};

SinglyList.prototype.add = function (value) {
  const node = new Node(value);

  if (this.head == null) {
    this.head = node;
    return node;
  }

  let current = this.head;

  while (current.next) {
    current = current.next;
  }

  current.next = node;
  return node;
};

SinglyList.prototype.remove = function (value) {
  if (!this.head) return null;

  let current = this.head;
  let previous = this.head;

  if (current.value === value) {
    this.head = current.next;
    return current;
  }

  while (current.next) {
    if (current.value === value) {
      previous.next = current.next;
      return current;
    }
    previous = current;
    current = current.next;
  }

  if (current.value === value) {
    previous.next = null;
    return current;
  }

  return null;
};

SinglyList.prototype.reverse = function () {
  if (!this.head) return null;

  let current = this.head;
  let previous = null;
  let next;

  while (current) {
    next = current.next; // eslint-disable-line
    current.next = previous;
    previous = current;
    current = next;
  }

  this.head = previous;
  return this.head;
};

SinglyList.prototype.middle = function () {
  if (!this.head || !this.head.next || !this.head.next.next) return null;

  let slow = this.head;
  let fast = this.head;

  while (fast && fast.next) {
    fast = fast.next.next;
    if (!fast) break; // even numbers don't go passed middle
    slow = slow.next;
  }

  return slow.value;
};

SinglyList.prototype.length = function () {
  if (!this.head) return 0;

  let length = 0;
  let current = this.head;
  while (current) {
    current = current.next;
    length++;
  }

  return length;
};

SinglyList.prototype.findFromEnd = function (index) {
  if (!this.head) return null;

  let fast = this.head;
  let slow = this.head;

  for (let i = 0; i < index; i++) {
    if (fast.next) {
      fast = fast.next;
    } else {
      return null;
    }
  }

  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  return slow.value;
};

SinglyList.prototype.findByIndex = function (index) {
  if (!this.head) return null;

  let current = this.head;
  for (let i = 1; i < index; i++) {
    if (current.next) {
      current = current.next;
    } else {
      return null;
    }
  }

  return current.value;
};

SinglyList.prototype.isPalindrome = function () {
  // Big O(n) time & O(n) space
  if (!this.head) return false;

  const stack = new Stack();
  let last = null;
  let current = this.head;

  stack.push(current);
  while (current.next) {
    current = current.next;
    stack.push(current);
  }

  current = this.head;
  last = stack.pop();
  if (current.value !== last.value) return false;

  while (current.next) {
    current = current.next;
    last = stack.pop();
    if (current.value !== last.value) return false;
  }

  return true;
};

SinglyList.prototype.hasCycle = function () {
  if (!this.head || !this.head.next) return false;
  if (this.head.value === this.head.next.value) {
    return true;
  }

  let slow = this.head;
  let fast = this.head;

  while (fast.next && fast.next.next) {
    fast = fast.next.next;
    slow = slow.next;

    if (slow.value === fast.value) return true;
  }

  return false;
};

SinglyList.prototype.removeDuplicates = function () {
  const seen = {};
  let current = this.head;
  let previous = null;

  while (current) {
    if (seen[current.value]) {
      previous.next = current.next;
    } else {
      seen[current.value] = true;
      previous = current;
    }
    current = current.next;
  }
};

SinglyList.prototype.removeDuplicates2 = function () {
  let current = this.head;
  while (current.next) {
    let runner = current.next;
    let previous = current;
    while (runner) {
      if (runner.value === current.value) {
        previous.next = runner.next;
      } else {
        previous = runner;
      }
      runner = runner.next;
    }
    current = current.next;
  }
};

SinglyList.prototype.partition = function (value) {
  const before = new SinglyList();
  const after = new SinglyList();

  let current = this.head;
  while (current) {
    if (current.value < value) {
      before.add(current.value);
    } else if (current.value >= value) {
      after.add(current.value);
    }
    current = current.next;
  }

  this.head = before.head;
  current = this.head;
  while (current.next) {
    current = current.next;
  }

  current.next = after.head;

  return this.head;
};

// example
const list = new SinglyList();
list.add(7);
list.add(10);
list.add(5);
list.add(11);
list.add(2);
list.add(4);
list.log();
list.partition(5);
list.log();
