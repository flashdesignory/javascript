/*
 * @title: Singly List Odd Even
 * @description: Merge two sorted linked lists all odd and all even
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function oddEvenList(node) {
  if (!node) return null;
  if (!node.next) return node;

  let odd = node;
  let even = node.next;
  const evenHead = even;

  while (even && even.next) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }

  odd.next = evenHead;
  return node;
}

// npx jest datastructures/list/singlylist.oddeven.js
describe('merging two sorted linked lists all odd nodes and all even', () => {
  it('should return a new list', () => {
    const head = new Node(1);
    head.next = new Node(2);
    head.next.next = new Node(3);
    head.next.next.next = new Node(4);
    head.next.next.next.next = new Node(5);
    expect(oddEvenList(head).value).toEqual(1);
  });
});
