/*
 * @title: Binary Search Tree Connect
 * @description: Connect Nodes on same level
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* eslint class-methods-use-this: ["error", { "exceptMethods":
["levelorderTraversal"] }] */

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.nextRight = null;
  }

  serialize() {
    const result = {};
    result.value = this.value;
    result.left = this.left ? this.left.serialize() : null;
    result.right = this.right ? this.right.serialize() : null;
    result.nextRight = this.nextRight ? this.nextRight.serialize() : null;
    return result;
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

  peek() {
    return this.data[this.first];
  }

  empty() {
    return this.first === this.last;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  print() {
    if (this.root) {
      console.log(this.root.serialize());
    }
  }

  insert(node, value) {
    if (!node) {
      node = new Node(value);
      if (!this.root) this.root = node;
      return node;
    }

    if (node.value > value) {
      node.left = this.insert(node.left, value);
    }

    if (node.value < value) {
      node.right = this.insert(node.right, value);
    }

    return node;
  }

  getNode(node, value) {
    if (!node || node.value === value) {
      return node;
    }

    if (node.value > value) {
      return this.getNode(node.left, value);
    }

    return this.getNode(node.right, value);
  }

  levelorderTraversal(node) {
    if (!node) return null;
    const result = [];

    const queue = new Queue();
    queue.enqueue(node);

    let currentNumChildren = 1;
    let nextNumChildren = 0;
    let level = [];

    while (!queue.empty()) {
      const current = queue.dequeue();
      level.push(current.value);
      currentNumChildren--;

      if (current.left) {
        queue.enqueue(current.left);
        nextNumChildren++;
      }

      if (current.right) {
        queue.enqueue(current.right);
        nextNumChildren++;
      }

      if (currentNumChildren === 0) {
        result.push(level);
        level = [];
        currentNumChildren = nextNumChildren;
        nextNumChildren = 0;
      } else {
        current.nextRight = queue.peek();
      }
    }
    return result;
  }

  getNodesAtLevel(node, level, result) {
    result = result || [];
    if (!node) return result;
    if (level === 0) {
      result.push(node);
    }
    this.getNodesAtLevel(node.left, level - 1, result);
    this.getNodesAtLevel(node.right, level - 1, result);
    return result;
  }
}

// npx jest datastructures/tree/binarysearchtree.connect.js
describe('Binary Search Tree should', () => {
  it('connect nodes on same level', () => {
    const values = [10, 15, 5, 2, 3, 12, 17, 4, 6, 13, 11, 8, 1];
    const tree = new BinarySearchTree();
    for (let i = 0; i < values.length; i++) {
      tree.insert(tree.root, values[i]);
    }
    tree.levelorderTraversal(tree.root);
    expect(tree.getNode(tree.root, 5).nextRight).not.toBeNull();
    expect(tree.getNode(tree.root, 15).nextRight).toBeNull();
  });
});
