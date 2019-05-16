/*
 * @title: Singly List merge k lists
 * @description: Merge multiple lists
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
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

function mergeKLists(lists) {
  if (lists.length === 0) return null;

  function traverse(lists, start, end) { // eslint-disable-line
    if (start === end) return lists[start];

    const middle = Math.floor((start + end) / 2);
    const left = traverse(lists, start, middle);
    const right = traverse(lists, middle + 1, end);

    return merge(left, right);
  }

  return traverse(lists, 0, lists.length - 1);
}

// npx jest datastructures/list/singlylist.merge.k.js
describe('merging k linked lists', () => {
  it('should merge linked lists recursively', () => {
    const head1 = new Node(1);
    head1.next = new Node(4);
    head1.next.next = new Node(5);

    const head2 = new Node(1);
    head2.next = new Node(3);
    head2.next.next = new Node(4);

    const head3 = new Node(2);
    head3.next = new Node(6);
    const newHead = mergeKLists([head1, head2, head3]);
    const result = [];
    let current = newHead;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    expect(result).toEqual([1, 1, 2, 3, 4, 4, 5, 6]);
  });
});
