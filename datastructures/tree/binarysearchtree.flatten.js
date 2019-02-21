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

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  print() {
    return console.log(this.root.serialize());
  }

  add(value) {
    const node = new Node(value);
    if (!this.root) {
      this.root = node;
      return node;
    }

    let current = this.root;
    while (current) {
      if (value < current.value) {
        if (!current.left) {
          current.left = node;
          return node;
        }
        current = current.left;
      } else if (value > current.value) {
        if (!current.right) {
          current.right = node;
          return node;
        }
        current = current.right;
      }
    }
    return null;
  }
}


function flattenPreOrder1(node) {
  // pre-order traversal
  if (!node) return node;

  const { left, right } = node;

  flattenPreOrder1(left);
  flattenPreOrder1(right);

  node.right = left;
  node.left = null;

  let current = node;
  while (current.right) {
    current = current.right;
  }

  current.right = right;
  return node;
}

function flattenPreOrder2(node) {
  if (!node) return node;

  const { left, right } = node;

  if (left) {
    node.right = left;
    node.left = null;
    node = flattenPreOrder2(node.right);
  }

  if (right) {
    node.right = right;
    node = flattenPreOrder2(node.right);
  }

  return node;
}

function flattenPreOrder3(node) {
  let current = node;
  while (current) {
    if (current.left) {
      if (current.right) {
        let next = current.left;
        while (next.right) next = next.right;
        next.right = current.right;
      }
      current.right = current.left;
      current.left = null;
    }
    current = current.right;
  }
}

function printList(node) {
  const result = [];
  let current = node;
  result.push(current.value);

  while (current.right) {
    current = current.right;
    result.push(current.value);
  }

  return result;
}

// npx jest datastructures/tree/binarysearchtree.flatten.js
describe('flatten a binary search tree', () => {
  it('should flatten a bst to a linked list', () => {
    const values = [10, 5, 15, 2, 3, 12, 17, 7];
    const tree = new BinarySearchTree();
    for (let i = 0; i < values.length; i++) {
      tree.add(values[i]);
    }
    flattenPreOrder1(tree.root);
    expect(printList(tree.root)).toEqual([10, 5, 2, 3, 7, 15, 12, 17]);
  });
  it('should flatten a bst to a linked list', () => {
    const values = [10, 5, 15, 2, 3, 12, 17, 7];
    const tree = new BinarySearchTree();
    for (let i = 0; i < values.length; i++) {
      tree.add(values[i]);
    }
    flattenPreOrder2(tree.root);
    expect(printList(tree.root)).toEqual([10, 5, 2, 3, 7, 15, 12, 17]);
  });
  it('should flatten a bst to a linked list', () => {
    const values = [10, 5, 15, 2, 3, 12, 17, 7];
    const tree = new BinarySearchTree();
    for (let i = 0; i < values.length; i++) {
      tree.add(values[i]);
    }
    flattenPreOrder3(tree.root);
    expect(printList(tree.root)).toEqual([10, 5, 2, 3, 7, 15, 12, 17]);
  });
});
