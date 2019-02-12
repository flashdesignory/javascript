/*
 * @title: Singly List Intersection
 * @description:Simple Singly Linked Lists intersection Node
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
  }
}

const getLength = (head) => {
  if (!head) return 0;
  let length = 0;
  let current = head;
  while (current) {
    current = current.next;
    length++;
  }
  return length;
};

const getIntersectingNodeOne = (headA, headB) => {
  let lengthA = getLength(headA);
  let lengthB = getLength(headB);
  let nodeA = headA;
  let nodeB = headB;

  if (lengthA === 0 || lengthB === 0) {
    return null;
  }

  while (lengthA > lengthB) {
    nodeA = nodeA.next;
    lengthA--;
  }

  while (lengthB > lengthA) {
    nodeB = nodeB.next;
    lengthB--;
  }

  while (lengthA && lengthB) {
    if (nodeB === nodeA) {
      return nodeA;
    }
    nodeA = nodeA.next;
    nodeB = nodeB.next;
  }
  return null;
};

const getIntersectingNodeTwo = (headA, headB) => {
  let nodeA = headA;
  let nodeB = headB;

  while (nodeA !== nodeB) {
    nodeA = nodeA ? nodeA.next : headB;
    nodeB = nodeB ? nodeB.next : headA;
  }

  return nodeA;
};

// npx jest datastructures/list/singlylist.intersection.js
describe('find intersecting node of two SinglyLinkedLists', () => {
  it('should return node44 for intersection', () => {
    const node19 = new Node(19);
    const node21 = new Node(21);

    const node16 = new Node(16);
    const node18 = new Node(18);
    const node30 = new Node(30);

    const node44 = new Node(44);
    const node55 = new Node(55);
    const node66 = new Node(66);

    const listA = new SinglyLinkedList();
    listA.head = node19;
    listA.head.next = node21;
    listA.head.next.next = node44;
    listA.head.next.next.next = node55;
    listA.head.next.next.next.next = node66;

    const listB = new SinglyLinkedList();
    listB.head = node16;
    listB.head.next = node18;
    listB.head.next.next = node30;
    listB.head.next.next.next = node44;
    listB.head.next.next.next.next = node55;
    listB.head.next.next.next.next.next = node66;

    expect(getIntersectingNodeOne(listA.head, listB.head)).toBe(node44);
    expect(getIntersectingNodeTwo(listA.head, listB.head)).toBe(node44);
  });
});
