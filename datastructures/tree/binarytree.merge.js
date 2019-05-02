/*
 * @title: Binary Tree Merge
 * @description: Merge two binary trees
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* eslint class-methods-use-this: ["error", { "exceptMethods":
 ["print", "levelorder"] }] */

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

  peek() {
    return this.data[this.first];
  }

  empty() {
    return this.first === this.last;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  serialize() {
    const result = {};
    result.value = this.value;
    result.left = this.left ? this.left.serialize() : null;
    result.right = this.right ? this.right.serialize() : null;
    return result;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  print(node) {
    if (!node) return null;
    return node.serialize();
  }

  insert(node, value) {
    if (!node) {
      node = new Node(value);
      if (!this.root) this.root = node;
      return node;
    }

    const queue = new Queue();
    queue.enqueue(node);

    while (!queue.empty()) {
      const current = queue.dequeue();
      if (!current.left) {
        current.left = new Node(value);
        return current;
      }
      queue.enqueue(current.left);


      if (!current.right) {
        current.right = new Node(value);
        return current;
      }
      queue.enqueue(current.right);
    }
    return node;
  }

  levelorder(node) {
    if (!node) return null;

    const queue = new Queue();
    queue.enqueue(node);

    const result = [];

    while (!queue.empty()) {
      const current = queue.dequeue();
      result.push(current.value);
      if (current.left) queue.enqueue(current.left);
      if (current.right) queue.enqueue(current.right);
    }

    return result;
  }
}

function merge(node1, node2) {
  if (!node1) return node2;
  if (!node2) return node1;
  node1.value += node2.value;
  node1.left = merge(node1.left, node2.left);
  node1.right = merge(node1.right, node2.right);
  return node1;
}

// npx jest datastructures/tree/binarytree.merge.js
describe('BinaryTree Merge', () => {
  const values1 = [1, 3, 2, 5];
  const tree1 = new BinaryTree();
  for (let i = 0; i < values1.length; i++) {
    tree1.insert(tree1.root, values1[i]);
  }

  const values2 = [1, 3, 2, 5];
  const tree2 = new BinaryTree();
  for (let i = 0; i < values2.length; i++) {
    tree2.insert(tree2.root, values2[i]);
  }

  it('merge()', () => {
    tree1.root = merge(tree1.root, tree2.root);
    expect(tree1.levelorder(tree1.root)).toEqual([2, 6, 4, 10]);
  });
});
