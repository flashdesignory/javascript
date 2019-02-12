/*
 * @title: Singly List merge
 * @description: Merge two sorted linked lists
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
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
}

function print(node) {
  const result = [];
  if (!node) return result;

  let current = node;
  while (current) {
    result.push(current.value);
    current = current.next;
  }

  return result;
}

function merge(node1, node2) {
  if (!node1) return node2;
  if (!node2) return node1;

  if (node1.value < node2.value) {
    node1.next = merge(node1.next, node2);
    return node1;
  }
  node2.next = merge(node1, node2.next);
  return node2;
}

function mergeUtil(node1, node2) {
  if (!node1.next) {
    node1.next = node2;
    return node1;
  }

  let current1 = node1;
  let current2 = node2;
  let next1 = current1.next;
  let next2 = current2.next;

  while (next1 && next2) {
    // if curr2 lies in between curr1 and next1
    // then do curr1->curr2->next1
    if (current2.value > current1.value && current2.value < next1.value) {
      next2 = current2.next;
      current1.next = current2;
      current2.next = next1;
      // now let curr1 and curr2 to point
      // to their immediate next pointers
      current1 = current2;
      current2 = next2;
    } else {
      // if more nodes in first list
      if (next1.next) { // eslint-disable-line
        next1 = next1.next;
        current1 = current1.next;
      } else {
        // else point the last node of first list
        // to the remaining nodes of second list
        next1.next = current2;
        return node1;
      }
    }
  }
  return current1;
}

function merge2(node1, node2) {
  if (!node1) return node2;
  if (!node2) return node1;

  if (node1.value < node2.value) {
    return mergeUtil(node1, node2);
  }
  return mergeUtil(node2, node1);
}

// npx jest datastructures/singlylist.merge.js
describe('merging two sorted linked lists', () => {
  it('should merge two linked lists recursively', () => {
    const listOne = new LinkedList();
    listOne.add(5);
    listOne.add(7);
    listOne.add(9);
    const listTwo = new LinkedList();
    listTwo.add(4);
    listTwo.add(6);
    listTwo.add(8);
    const newHead = merge(listOne.head, listTwo.head);
    expect(print(newHead)).toEqual([4, 5, 6, 7, 8, 9]);
  });

  it('should merge two linked lists iteravely', () => {
    const listOne = new LinkedList();
    listOne.add(5);
    listOne.add(7);
    listOne.add(9);
    const listTwo = new LinkedList();
    listTwo.add(4);
    listTwo.add(6);
    listTwo.add(8);
    const newHead = merge2(listOne.head, listTwo.head);
    expect(print(newHead)).toEqual([4, 5, 6, 7, 8, 9]);
  });
});
