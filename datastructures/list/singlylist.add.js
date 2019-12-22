/*
 * @title: Singly List add Numbers
 * @description: Add all nodes from two lists
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function addTwoNumbers(l1, l2) {
  let head = null;
  let current = null;
  let sum = 0;
  let carry = 0;

  while (l1 || l2 || sum) {
    if (l1) {
      sum += l1.value;
      l1 = l1.next;
    }

    if (l2) {
      sum += l2.value;
      l2 = l2.next;
    }

    if (sum >= 10) {
      carry = 1;
      sum = sum % 10; // eslint-disable-line
    }

    if (!head) {
      head = new Node(sum);
      current = head;
    } else {
      current.next = new Node(sum);
      current = current.next;
    }

    sum = carry;
    carry = 0;
  }
  return head;
}

// npx jest datastructures/list/singlylist.add.js
describe('sum all nodes from two lists', () => {
  it('should return a new list with sum of all nodes', () => {
    const head1 = new Node(2);
    head1.next = new Node(4);
    head1.next.next = new Node(3);

    const head2 = new Node(5);
    head2.next = new Node(6);
    head2.next.next = new Node(4);

    const headSum = addTwoNumbers(head1, head2);

    expect(headSum.value).toEqual(7);
    expect(headSum.next.value).toEqual(0);
    expect(headSum.next.next.value).toEqual(8);
  });
});
