/*
 * @title: Singly List random pointer
 * @description: A linked list is given such that each node contains
 * an additional random pointer which could point to any node in the
 * list or null. Return a deep copy of the list.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.random = null;
  }
}

// recursive
function copyRandomList1(head) {
  const visited = {};

  function createList(node) {
    if (!node) return null;
    if (visited[node.value]) {
      return visited[node.value];
    }

    const copy = new Node(node.value, null, null);
    visited[node.value] = copy;
    copy.next = createList(node.next);
    copy.random = createList(node.random);
    return copy;
  }

  return createList(head);
}

// iterative
function getNode(node, visited) {
  if (!node) return null;

  if (!visited[node.value]) {
    visited[node.value] = new Node(node.value, null, null);
  }

  return visited[node.value];
}

function copyRandomList2(head) {
  if (!head) return null;
  let original = head;

  const visited = {};

  let copy = new Node(original.value);
  visited[original.value] = copy;

  while (original) {
    copy.random = getNode(original.random, visited);
    copy.next = getNode(original.next, visited);

    original = original.next;
    copy = copy.next;
  }

  return visited[head.value];
}

// npx jest datastructures/list/singlylist.random.js
describe('list with random pointer', () => {
  it('should return a deep copy', () => {
    const head = new Node(5);
    expect(copyRandomList1(head).value).toEqual(5);
    expect(copyRandomList2(head).value).toEqual(5);
  });
});
