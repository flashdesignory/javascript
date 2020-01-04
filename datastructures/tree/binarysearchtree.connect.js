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
    this.next = null;
  }

  serialize() {
    const result = {};
    result.value = this.value;
    result.left = this.left ? this.left.serialize() : null;
    result.right = this.right ? this.right.serialize() : null;
    result.next = this.next ? this.next.serialize() : null;
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

    let numSiblings = 1;
    let numChildren = 0;
    let level = [];

    while (!queue.empty()) {
      const current = queue.dequeue();
      level.push(current.value);
      numSiblings--;

      if (current.left) {
        queue.enqueue(current.left);
        numChildren++;
      }

      if (current.right) {
        queue.enqueue(current.right);
        numChildren++;
      }

      if (numSiblings === 0) {
        result.push(level);
        level = [];
        numSiblings = numChildren;
        numChildren = 0;
      } else {
        current.next = queue.peek();
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

const connect = (node) => {
  if (!node || !node.left) {
    return node;
  }

  node.left.next = node.right;
  node.right.next = node.next ? node.next.left : null;

  connect(node.left);
  connect(node.right);
  return node;
};

// npx jest datastructures/tree/binarysearchtree.connect.js
describe('Binary Search Tree should', () => {
  it('connect nodes on same level', () => {
    const values = [10, 15, 5, 2, 3, 12, 17, 4, 6, 13, 11, 8, 1];
    const tree = new BinarySearchTree();
    for (let i = 0; i < values.length; i++) {
      tree.insert(tree.root, values[i]);
    }
    tree.levelorderTraversal(tree.root);
    expect(tree.getNode(tree.root, 5).next).not.toBeNull();
    expect(tree.getNode(tree.root, 15).next).toBeNull();
  });
  it('connect nodes on same level2', () => {
    const values = [10, 15, 5, 2, 3, 12, 17, 4, 6, 13, 11, 8, 1];
    const tree = new BinarySearchTree();
    for (let i = 0; i < values.length; i++) {
      tree.insert(tree.root, values[i]);
    }
    connect(tree.root);
    expect(tree.getNode(tree.root, 5).next).not.toBeNull();
    expect(tree.getNode(tree.root, 15).next).toBeNull();
  });
});
