/*
 * @title: Binary Search Tree
 * @description: Generic Binary Search Tree Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* eslint class-methods-use-this: ["error", { "exceptMethods":
["min", "max", "breadthFirstSearch", "levelOrder", "getAllAncestors",
"sumLeaves", "longestConsecutive", "longestPath", "maxDepthAlt"] }] */

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
    if (this.root) {
      console.log(this.root.serialize());
    }
  }

  height(node) {
    if (!node) return 0;
    return Math.max(
      this.height(node.left) + 1,
      this.height(node.right) + 1,
    );
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

  collectNodesAtLevel(node, k, arr, reverse) {
    if (!node) return arr;
    if (k === 0) {
      if (arr) {
        arr.push(node.value);
      }
    } else {
      // eslint-disable-next-line
       if (reverse) {
        arr = this.collectNodesAtLevel(node.right, k - 1, arr, reverse);
        arr = this.collectNodesAtLevel(node.left, k - 1, arr, reverse);
      } else {
        arr = this.collectNodesAtLevel(node.left, k - 1, arr, reverse);
        arr = this.collectNodesAtLevel(node.right, k - 1, arr, reverse);
      }
    }
    return arr;
  }

  printLevelOrderZigZag(node) {
    const result = [];
    const height = this.height(node);
    for (let i = 0; i < height; i++) {
      result.push(this.collectNodesAtLevel(node, i, [], i % 2 === 0));
    }
    return result;
  }
}

// npx jest temp/bst.zigzaglevel.js
describe('BinarySearchTree Methods', () => {
  const values = [10, 15, 5, 2, 3, 12, 17, 4, 6, 13, 11, 8, 1];
  const tree = new BinarySearchTree();
  for (let i = 0; i < values.length; i++) {
    tree.insert(tree.root, values[i]);
  }
  it('BinarySearchTree.printLevelOrderZigZag()', () => {
    expect(tree.printLevelOrderZigZag(tree.root))
      .toEqual([[10], [5, 15], [17, 12, 6, 2], [1, 3, 8, 11, 13], [4]]);
  });
});
