/*
 * @title: Binary Search Tree Iterator
 * @description: BST iterator will be initialized with the root node of a BST.
 * Calling next() will return the next smallest number in the BST.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Queue {
  constructor() {
    this.data = {};
    this.first = 0;
    this.last = 0;
  }

  enqueue(value) {
    this.data[this.last] = value;
    this.last++;
  }

  dequeue() {
    const temp = this.data[this.first];
    delete this.data[this.first];
    this.first++;
    return temp;
  }

  empty() {
    return this.first === this.last;
  }
}

class BSTIterator {
  constructor(root) {
    this.root = root;
    this.queue = new Queue();
    if (root) this.populate(root);
  }

  populate(node) {
    if (!node) return;
    this.populate(node.left);
    this.queue.enqueue(node);
    this.populate(node.right);
  }

  hasNext() {
    return !this.queue.empty();
  }

  next() {
    if (this.hasNext()) {
      return this.queue.dequeue().value;
    }
    return -1;
  }
}

// npx jest datastructures/tree/binarytree.iterator.js
describe('create a binary tree iterator', () => {
  it('should create a bt from postorder and inorder array()', () => {
    const root = new Node(7);
    root.left = new Node(3);
    root.right = new Node(15);
    root.right.left = new Node(9);
    root.right.right = new Node(20);
    const iterator = new BSTIterator(root);
    expect(iterator.next()).toEqual(3);
    expect(iterator.next()).toEqual(7);
    expect(iterator.hasNext()).toBeTruthy();
    expect(iterator.next()).toEqual(9);
    expect(iterator.hasNext()).toBeTruthy();
    expect(iterator.next()).toEqual(15);
    expect(iterator.hasNext()).toBeTruthy();
    expect(iterator.next()).toEqual(20);
    expect(iterator.hasNext()).toBeFalsy();
  });
});
