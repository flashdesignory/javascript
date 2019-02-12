/*
 * @title: AVL Tree
 * @description: Self Balancing Binary Search Tree
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* eslint class-methods-use-this: ["error", { "exceptMethods":
 ["min", "max"] }] */

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }

  serialize() {
    const result = {};
    result.value = this.value;
    result.left = this.left ? this.left.serialize() : null;
    result.right = this.right ? this.right.serialize() : null;
    result.height = this.height;
    return result;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  print() {
    if (!this.root) return null;
    return this.root.serialize();
  }

  min(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  height(node) {
    if (!node) return 0;
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  difference(node) {
    if (!node) return 0;
    return this.height(node.left) - this.height(node.right);
  }

  preorderTraversal(node, result) {
    result = result || [];
    result.push(node.value);
    if (node.left) this.preorderTraversal(node.left, result);
    if (node.right) this.preorderTraversal(node.right, result);
    return result;
  }

  rightRotate(node) {
    const rotatedNode = node.left;
    const temp = rotatedNode.right;

    rotatedNode.right = node;
    node.left = temp;

    node.height = this.height(node);
    rotatedNode.height = this.height(rotatedNode);

    if (node === this.root) {
      this.root = rotatedNode;
    }

    return rotatedNode;
  }

  leftRotate(node) {
    const rotatedNode = node.right;
    const temp = rotatedNode.left;

    rotatedNode.left = node;
    node.right = temp;

    node.height = this.height(node);
    rotatedNode.height = this.height(rotatedNode);
    if (node === this.root) {
      this.root = rotatedNode;
    }
    return rotatedNode;
  }

  rotateAfterInsert(node, value) {
    node.height = this.height(node);
    const difference = this.difference(node);

    // left-left-rotation
    if (difference > 1 && value < node.left.value) {
      return this.rightRotate(node);
    }

    // left-right-rotation
    if (difference > 1 && value > node.left.value) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    // right-right-rotation
    if (difference < -1 && value > node.right.value) {
      return this.leftRotate(node);
    }

    // right-left-rotation
    if (difference < -1 && value < node.right.value) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    // no rotation needed, just return as is..
    return node;
  }

  rotateAfterDelete(node) {
    node.height = this.height(node);
    const difference = this.difference(node);

    // left-left-rotation
    if (difference > 1 && this.difference(node.left) >= 0) {
      return this.rightRotate(node);
    }
    // left-right-rotation
    if (difference > 1 && this.difference(node.left) < 0) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    // right-right-rotation
    if (difference < -1 && this.difference(node.right) <= 0) {
      return this.leftRotate(node);
    }

    // right-left-rotation
    if (difference < -1 && this.difference(node.right) > 0) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    // no rotation needed, just return as is..
    return node;
  }

  insert(node, value) {
    if (!node) {
      node = new Node(value);
      if (!this.root) this.root = node;
      return node;
    }

    if (node.value > value) {
      node.left = this.insert(node.left, value);
    } else if (node.value < value) {
      node.right = this.insert(node.right, value);
    }

    return this.rotateAfterInsert(node, value);
  }

  delete(node, value) {
    if (node.value === value) {
      if (!node.left && !node.right) {
        return node;
      }

      if (!node.left) {
        node = node.right;
      } else if (!node.right) {
        node = node.left;
      } else {
        const parent = this.min(node.right);
        node.value = parent.value;
        node.right = this.delete(node.right, parent.value);
      }
    } else if (node.value > value) {
      node.left = this.delete(node.left, value);
    } else {
      node.right = this.delete(node.right, value);
    }

    return this.rotateAfterDelete(node, value);
  }
}

// npx jest datastructures/tree/avltree.js
describe('BinarySearchTree Methods', () => {
  it('BinarySearchTree.insert()', () => {
    const values = [10, 20, 30, 40, 50, 25];
    const tree = new AVLTree();
    for (let i = 0; i < values.length; i++) {
      tree.insert(tree.root, values[i]);
    }
    expect(tree.preorderTraversal(tree.root)).toEqual([30, 20, 10, 25, 40, 50]);

    /* The constructed AVL Tree would be
              30
             /  \
           20   40
          /  \     \
         10  25    50
    */
  });
  it('BinarySearchTree.delete()', () => {
    const values = [9, 5, 10, 0, 6, 11, -1, 1, 2];
    const tree = new AVLTree();
    for (let i = 0; i < values.length; i++) {
      tree.insert(tree.root, values[i]);
    }
    expect(tree.preorderTraversal(tree.root)).toEqual([9, 1, 0, -1, 5, 2, 6, 10, 11]);
    /* The constructed AVL Tree would be
                9
               /  \
              1    10
            /  \     \
           0    5     11
          /    /  \
         -1   2    6
    */
    tree.delete(tree.root, 10);
    expect(tree.preorderTraversal(tree.root)).toEqual([1, 0, -1, 9, 5, 2, 6, 11]);
    /* The AVL Tree after deletion of 10
                1
               /  \
              0    9
            /     /  \
           -1    5     11
               /  \
              2    6
    */
  });
});
