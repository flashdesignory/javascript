/*
 * @title: Binary Search Tree Creation
 * @description:Create BST from SinglyList
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function sortedListToBST(node) {
  if (!node) return null;
  if (!node.next) {
    return new TreeNode(node.value);
  }

  let middle = node;
  let previous = node;
  let tail = node;

  while (tail && tail.next) {
    tail = tail.next.next;
    previous = middle;
    middle = middle.next;
  }

  // The pointer used to disconnect the left half from the mid node.
  previous.next = null;

  const root = new TreeNode(middle.value);
  root.left = sortedListToBST(node);
  root.right = sortedListToBST(middle.next);
  return root;
}

function findMiddle(node) {
  let fast = node;
  let slow = node;

  // The pointer used to disconnect the left half from the mid node.
  let previous = null;

  while (fast && fast.next) {
    previous = slow;
    fast = fast.next.next;
    slow = slow.next;
  }

  if (previous) previous.next = null;
  return slow;
}

function sortedListToBST2(node) {
  if (!node) return node;

  const middle = findMiddle(node);
  const root = new TreeNode(middle.value);
  if (middle === node) return root;

  root.left = sortedListToBST(node);
  root.right = sortedListToBST(middle.next);
  return root;
}

function print(node, result) {
  result = result || [];
  if (!node) return result;
  print(node.left, result);
  result.push(node.value);
  print(node.right, result);
  return result;
}

// npx jest datastructures/tree/binarysearchtree.fromlist.js
describe('create bst from sorted list', () => {
  it('should create binarysearchtree', () => {
    let head = new ListNode(-10);
    head.next = new ListNode(-3);
    head.next.next = new ListNode(0);
    head.next.next.next = new ListNode(5);
    head.next.next.next.next = new ListNode(9);
    head = sortedListToBST(head);
    expect(print(head)).toEqual([-10, -3, 0, 5, 9]);
  });
  it('should create binarysearchtree', () => {
    let head = new ListNode(-10);
    head.next = new ListNode(-3);
    head.next.next = new ListNode(0);
    head.next.next.next = new ListNode(5);
    head.next.next.next.next = new ListNode(9);
    head = sortedListToBST2(head);
    expect(print(head)).toEqual([-10, -3, 0, 5, 9]);
  });
});
