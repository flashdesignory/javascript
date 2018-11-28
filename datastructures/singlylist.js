/*
 * @title: Singly List
 * @description:Simple Singly Linked List
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

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
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
  }

  print() {
    const result = [];

    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  add(value) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      return node;
    }

    let current = this.head;

    while (current.next) {
      current = current.next;
    }

    current.next = node;
    return node;
  }

  remove(value) {
    if (!this.head) return null;

    let current = this.head;
    let previous = null;

    while (current.next) {
      if (current.value === value) {
        if (!previous) {
          // node to remove is the head
          this.head = current.next;
          return current;
        }
        // node to remove is in the middle
        previous.next = current.next;
        return current;
      }
      previous = current;
      current = current.next;
    }

    if (current.value === value) {
      // node to remove is the tail
      previous.next = null;
      return current;
    }

    return null;
  }

  reverse() {
    if (!this.head) return;

    let current = this.head;
    let previous = null;
    let next = null;

    while (current) {
      next = current.next; // eslint-disable-line
      current.next = previous;
      previous = current;
      current = next;
    }

    this.head = previous;
  }

  middle() {
    if (!this.head || !this.head.next || !this.head.next.next) {
      return null;
    }

    let fast = this.head;
    let slow = this.head;

    while (fast && fast.next) {
      fast = fast.next.next;
      if (!fast) break;
      slow = slow.next;
    }

    return slow.value;
  }

  length() {
    let length = 0;
    let current = this.head;

    while (current) {
      length += 1;
      current = current.next;
    }

    return length;
  }

  findFromEnd(n) {
    if (!this.head) return null;

    let fast = this.head;
    let slow = this.head;

    for (let i = 0; i < n; i++) {
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
  }

  findByIndex(n) {
    if (!this.head) return null;
    if (n === 0) return this.head;

    let current = this.head;

    for (let i = 0; i < n; i++) {
      if (current.next) {
        current = current.next;
      } else {
        return null;
      }
    }

    return current.value;
  }

  isPalindrome() {
    if (!this.head) return false;

    const stack = new Stack();
    let current = this.head;
    let last = null;

    while (current) {
      stack.push(current);
      current = current.next;
    }

    current = this.head;
    last = stack.pop();

    while (current) {
      if (last.value !== current.value) {
        return false;
      }
      current = current.next;
      last = stack.pop();
    }

    return true;
  }

  hasCycle() {
    if (!this.head || !this.head.next || !this.head.next) return false;
    if (this.head.value === this.head.next.value) return true;

    let fast = this.head;
    let slow = this.head;

    while (fast && fast.next) {
      fast = fast.next.next;
      slow = slow.next;

      if (slow.value === fast.value) {
        return true;
      }
    }

    return false;
  }

  removeDuplicates() {
    if (!this.head) return;
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
  }

  removeDuplicates2() {
    if (!this.head) return;

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
  }

  partition(value) {
    const before = new SinglyLinkedList();
    const after = new SinglyLinkedList();

    let current = this.head;
    while (current) {
      if (current.value < value) {
        before.add(current.value);
      } else if (current.value >= value) {
        after.add(current.value);
      }
      current = current.next;
    }

    if (before.head) {
      this.head = before.head;
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = after.head;
    } else {
      this.head = after.head;
    }

    return this.head;
  }
}

// npx jest datastructures/singlylist.js
describe('singly linked list data structure', () => {
  it('print() should equal [3, 6, 1, 2, 5, 4]', () => {
    const list = new SinglyLinkedList();
    const values = [3, 6, 1, 2, 5, 4];
    for (let i = 0; i < values.length; i++) {
      list.add(values[i]);
    }
    expect(list.print()).toEqual(values);
  });

  it('remove(2) should equal [3, 6, 1, 5, 4]', () => {
    const list = new SinglyLinkedList();
    const values = [3, 6, 1, 2, 5, 4];
    for (let i = 0; i < values.length; i++) {
      list.add(values[i]);
    }
    list.remove(2);
    expect(list.print()).toEqual([3, 6, 1, 5, 4]);
  });

  it('remove(4) should equal [3, 6, 1, 2, 5]', () => {
    const list = new SinglyLinkedList();
    const values = [3, 6, 1, 2, 5, 4];
    for (let i = 0; i < values.length; i++) {
      list.add(values[i]);
    }
    list.remove(4);
    expect(list.print()).toEqual([3, 6, 1, 2, 5]);
  });

  it('reverse() should equal [4, 5, 2, 1, 6, 3]', () => {
    const list = new SinglyLinkedList();
    const values = [3, 6, 1, 2, 5, 4];
    for (let i = 0; i < values.length; i++) {
      list.add(values[i]);
    }
    list.reverse();
    expect(list.print()).toEqual([4, 5, 2, 1, 6, 3]);
  });

  it('middle() should equal 1', () => {
    const list = new SinglyLinkedList();
    const values = [3, 6, 1, 2, 5, 4];
    for (let i = 0; i < values.length; i++) {
      list.add(values[i]);
    }
    expect(list.middle()).toEqual(1);
    list.add(8);
    expect(list.middle()).toEqual(2);
  });

  it('length() should equal 6', () => {
    const list = new SinglyLinkedList();
    const values = [3, 6, 1, 2, 5, 4];
    for (let i = 0; i < values.length; i++) {
      list.add(values[i]);
    }
    expect(list.length()).toEqual(6);
  });

  it('findFromEnd(2) should equal 2', () => {
    const list = new SinglyLinkedList();
    const values = [3, 6, 1, 2, 5, 4];
    for (let i = 0; i < values.length; i++) {
      list.add(values[i]);
    }
    expect(list.findFromEnd(2)).toEqual(2);
  });

  it('findByIndex(2) should equal 1', () => {
    const list = new SinglyLinkedList();
    const values = [3, 6, 1, 2, 5, 4];
    for (let i = 0; i < values.length; i++) {
      list.add(values[i]);
    }
    expect(list.findByIndex(2)).toEqual(1);
  });

  it('isPalindrome() should be true', () => {
    const list = new SinglyLinkedList();
    const values = [1, 2, 3, 4, 3, 2, 1];
    for (let i = 0; i < values.length; i++) {
      list.add(values[i]);
    }
    expect(list.isPalindrome()).toBe(true);
  });
  it('hasCycle() should be true', () => {
    const list = new SinglyLinkedList();
    list.add(1);
    list.add(2);
    const dupe = list.add(3);
    list.add(4);
    list.add(5);
    const temp = list.add(6);
    temp.next = dupe;
    expect(list.hasCycle()).toBe(true);
  });
  it('removeDuplicates() should remove all dupes', () => {
    const list = new SinglyLinkedList();
    const values = [3, 6, 1, 2, 3, 1, 6, 3, 3, 5, 4];
    for (let i = 0; i < values.length; i++) {
      list.add(values[i]);
    }
    list.removeDuplicates();
    expect(list.print()).toEqual([3, 6, 1, 2, 5, 4]);
  });
  it('removeDuplicates2() should remove all dupes', () => {
    const list = new SinglyLinkedList();
    const values = [3, 6, 1, 2, 3, 1, 6, 3, 3, 5, 4];
    for (let i = 0; i < values.length; i++) {
      list.add(values[i]);
    }
    list.removeDuplicates2();
    expect(list.print()).toEqual([3, 6, 1, 2, 5, 4]);
  });
  it('partition(3) should partition list', () => {
    const list = new SinglyLinkedList();
    const values = [3, 6, 1, 2, 5, 4];
    for (let i = 0; i < values.length; i++) {
      list.add(values[i]);
    }
    list.partition(3);
    expect(list.print()).toEqual([1, 2, 3, 6, 5, 4]);
  });
});
