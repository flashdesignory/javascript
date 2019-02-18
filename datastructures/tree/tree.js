/*
 * @title: Tree
 * @description: Generic Tree Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

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

class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  print() {
    if (!this.root) return null;
    const result = [];

    const queue = new Queue();
    queue.enqueue(this.root);

    let level = [];
    let currentLength = 1;
    let nextLength = 0;

    while (!queue.empty()) {
      const current = queue.dequeue();
      level.push(current.value);
      currentLength--;
      nextLength += current.children.length;

      current.children.forEach((child) => {
        queue.enqueue(child);
      });

      if (currentLength === 0) {
        result.push(level);
        level = [];
        currentLength = nextLength;
        nextLength = 0;
      }
    }
    return result;
  }

  printLevel(value) {
    const node = this.getNode(value);
    return node.children;
  }

  getNode(value) {
    if (!this.root) return null;

    const queue = new Queue();
    queue.enqueue(this.root);

    while (!queue.empty()) {
      const current = queue.dequeue();
      if (current.value === value) {
        return current;
      }

      current.children.forEach((child) => {
        queue.enqueue(child);
      });
    }
    return null;
  }

  add(parentValue, childValue) {
    const node = new Node(childValue);
    const parent = this.getNode(parentValue);

    if (parent) {
      parent.children.push(node);
      return node;
    }

    if (!this.root) {
      this.root = node;
      return node;
    }

    return null;
  }

  remove(value) {
    if (!this.root) return null;
    if (this.root.value === value) {
      this.root = null;
      return this.root;
    }

    const queue = new Queue();
    queue.enqueue(this.root);

    while (!queue.empty()) {
      const current = queue.dequeue();

      for (let i = 0; i < current.children.length; i++) {
        if (current.children[i] === value) {
          return current.children.splice(i, 1);
        }
        queue.enqueue(current.children[i]);
      }
    }
    return null;
  }

  breadthFirstSearch(fn) {
    if (!this.root) return;
    const queue = new Queue();
    queue.enqueue(this.root);
    while (!queue.empty()) {
      const current = queue.dequeue();
      fn(current);
      current.children.forEach((child) => {
        queue.enqueue(child);
      });
    }
  }

  preorder(node, fn) {
    if (!node) return;
    fn(node);
    node.children.forEach((child) => {
      this.preorder(child, fn);
    });
  }

  postorder(node, fn) {
    if (!node) return;
    node.children.forEach((child) => {
      this.postorder(child, fn);
    });
    fn(node);
  }
}


// npx jest datastructures/tree/tree.js
describe('tests for basic tree data structure', () => {
  it('should add / remove nodes', () => {
    const values = [
      ['', 'foo'], ['foo', 'bar'], ['foo', 'baz'],
      ['bar', 'stool'], ['bar', 'snacks'],
      ['baz', 'wut'],
    ];
    const tree = new Tree();
    values.forEach(value => tree.add(value[0], value[1]));
    expect(tree.print()).toEqual([['foo'], ['bar', 'baz'], ['stool', 'snacks', 'wut']]);
  });
});
