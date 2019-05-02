/*
 * @title: Binary Tree sorted
 * @description: print binary tree sorted
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* eslint class-methods-use-this: ["error", { "exceptMethods":
 ["print", "levelorder", "sorted"] }] */

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

  print() {
    const result = [];
    Object.values(this.data).forEach((value) => {
      result.push(value);
    });
    return result;
  }
}

class QNode {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.data = [];
  }

  // bigO(log n);
  enqueue(value, priority) {
    const node = new QNode(value, priority);
    this.data.push(node);
    this.bubbleUp(this.data.length - 1);
  }

  // bigO(log n);
  dequeue() {
    if (this.data.length === 0) return null;
    if (this.data.length === 1) {
      return this.data.pop();
    }
    const min = this.data[0];
    this.data[0] = this.data.pop();
    this.bubbleDown(0);
    return min;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.data[parent].priority > this.data[index].priority) {
        const temp = this.data[parent];
        this.data[parent] = this.data[index];
        this.data[index] = temp;
      }
      index = parent;
    }
  }

  bubbleDown(index) {
    while (index < this.data.length) {
      const left = Math.floor((index * 2) + 1);
      const right = Math.floor((index * 2) + 2);

      let smallest = index;

      if (left < this.data.length - 1) {
        if (this.data[index].priority > this.data[left].priority) {
          smallest = left;
        }
      }

      if (right < this.data.length - 1) {
        if (this.data[index].priority > this.data[right].priority) {
          smallest = right;
        }
      }

      if (smallest !== index) {
        const temp = this.data[smallest];
        this.data[smallest] = this.data[index];
        this.data[index] = temp;
        index = smallest;
      } else {
        break;
      }
    }
  }

  empty() {
    return this.data.length === 0;
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

  sorted(node) {
    if (!node) return null;
    const queue = new PriorityQueue();
    queue.enqueue(node, node.value);

    const result = [];
    let numSiblings = 1;
    let numChildren = 0;
    let level = [];

    while (!queue.empty()) {
      const current = queue.dequeue().value;
      level.push(current.value);
      numSiblings--;

      if (current.left) {
        console.log(current.left);
        queue.enqueue(current.left, current.left.value);
        numChildren++;
      }

      if (current.right) {
        queue.enqueue(current.right, current.right.value);
        numChildren++;
      }

      if (numSiblings === 0) {
        result.push([...level]);
        numSiblings = numChildren;
        numChildren = 0;
        level = [];
      }
    }

    return result;
  }
}

// npx jest datastructures/tree/binarytree.sorted.js
describe('BinaryTree Methods', () => {
  const values = [2, 4, 1, 3, 5, 7, 6];
  const tree = new BinaryTree();
  for (let i = 0; i < values.length; i++) {
    tree.insert(tree.root, values[i]);
  }

  it('BinaryTree.contains()', () => {
    expect(tree.sorted(tree.root)).toEqual([[2], [1, 4], [3, 5, 6, 7]]);
  });
});
