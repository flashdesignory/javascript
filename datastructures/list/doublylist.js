/*
 * @title: Doubly List
 * @description: Simple Doubly Linked List
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  print(reverse = false) {
    const result = [];

    if (!reverse) {
      let current = this.head;
      while (current) {
        result.push(current.value);
        current = current.next;
      }
    } else {
      let current = this.tail;
      while (current) {
        result.push(current.value);
        current = current.previous;
      }
    }

    return result;
  }

  add(value) {
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
          current.next.previous = null;
          return current;
        }
        // node to remove is in the middle
        previous.next = current.next;
        current.next.previous = previous;
        return current;
      }
      previous = current;
      current = current.next;
    }

    if (current.value === value) {
      // node to remove is the tail
      previous.next = null;
      this.tail = previous;
      return current;
    }

    return null;
  }

  reverse() {
    if (!this.head) return;

    let current = this.head;
    let previous = null;
    let next = null;

    this.head = this.tail;
    this.tail = current;

    while (current) {
      next = current.next; // eslint-disable-line

      previous = current.previous; // eslint-disable-line
      current.previous = current.next;
      current.next = previous;

      current = next;

      /* previous = current.previous;
     current.previous = current.next;
     current.next = previous;
     current = current.previous; */
    }
  }
}

// npx jest datastructures/doublylist.js
describe('doubly linked list data structure', () => {
  it('print() should equal [3, 6, 1, 2, 5, 4]', () => {
    const list = new DoublyLinkedList();
    const values = [3, 6, 1, 2, 5, 4];
    for (let i = 0; i < values.length; i++) {
      list.add(values[i]);
    }
    expect(list.print()).toEqual(values);
  });

  it('print() should equal [4, 5, 2, 1, 6, 3]', () => {
    const list = new DoublyLinkedList();
    const values = [3, 6, 1, 2, 5, 4];
    for (let i = 0; i < values.length; i++) {
      list.add(values[i]);
    }
    expect(list.print(true)).toEqual([4, 5, 2, 1, 6, 3]);
  });

  it('removing head should equal [6, 1, 2, 5, 4]', () => {
    const list = new DoublyLinkedList();
    const values = [3, 6, 1, 2, 5, 4];
    for (let i = 0; i < values.length; i++) {
      list.add(values[i]);
    }
    list.remove(3);
    expect(list.print()).toEqual([6, 1, 2, 5, 4]);
  });

  it('remove middle value should equal [3, 6, 1, 5, 4]', () => {
    const list = new DoublyLinkedList();
    const values = [3, 6, 1, 2, 5, 4];
    for (let i = 0; i < values.length; i++) {
      list.add(values[i]);
    }
    list.remove(2);
    expect(list.print()).toEqual([3, 6, 1, 5, 4]);
  });

  it('remove tail should equal [3, 6, 1, 2, 5]', () => {
    const list = new DoublyLinkedList();
    const values = [3, 6, 1, 2, 5, 4];
    for (let i = 0; i < values.length; i++) {
      list.add(values[i]);
    }
    list.remove(4);
    expect(list.print()).toEqual([3, 6, 1, 2, 5]);
  });

  it('should reverse the list', () => {
    const list = new DoublyLinkedList();
    const values = [3, 6, 1, 2, 5, 4];
    for (let i = 0; i < values.length; i++) {
      list.add(values[i]);
    }
    list.reverse();
    expect(list.print()).toEqual([4, 5, 2, 1, 6, 3]);
  });
});
