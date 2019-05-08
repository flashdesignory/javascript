/*
 * @title: Binary Search Tree
 * @description: Binary Search Tree Class iterative methods
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* eslint class-methods-use-this: ["error", { "exceptMethods":
 ["print"] }] */

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

  print(node) {
    if (!node) return null;
    return node.serialize();
  }

  contains(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) {
        return true;
      }

      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      }
    }

    return false;
  }

  insert(value) {
    const node = new Node(value);
    if (!this.root) {
      this.root = node;
      return node;
    }

    let current = this.root;

    while (current) {
      if (current.value > value) {
        if (current.left) {
          current = current.left;
        } else {
          current.left = node;
          return node;
        }
      } else if (current.right) {
        current = current.right;
      } else {
        current.right = node;
        return node;
      }
    }

    return null;
  }

  delete(value) {
    let current = this.root;
    let found = false;
    let parent;

    let numChildren;
    let replacement;
    let replacementParent;

    while (current && !found) {
      if (value === current.value) {
        found = true;
      } else if (value < current.value) {
        parent = current;
        current = current.left;
      } else if (value > current.value) {
        parent = current;
        current = current.right;
      }
    }

    if (found) {
      numChildren = (current.left ? 1 : 0) + (current.right ? 1 : 0);

      if (current === this.root) {
        switch (numChildren) {
          case 0:
            this.root = null;
            break;
          case 1:
            this.root = (!current.left ? current.right : current.left);
            break;
          case 2:
            replacement = this.root.left;
            while (replacement.right) {
              replacementParent = replacement;
              replacement = replacement.right;
            }

            if (replacementParent) {
              replacementParent.right = replacement.left;
              replacement.right = this.root.right;
              replacement.left = this.root.left;
            } else {
              replacement.right = this.root.right;
            }

            this.root = replacement;
            break;
          default:
        }
      } else {
        switch (numChildren) {
          case 0:
            if (current.value < parent.value) {
              parent.left = null;
            } else {
              parent.right = null;
            }
            break;
          case 1:
            if (current.value < parent.value) {
              parent.left = (!current.left ? current.right : current.left);
            } else {
              parent.right = (!current.left ? current.right : current.left);
            }
            break;
          case 2:
            replacement = current.left;
            replacementParent = current;
            while (replacement.right) {
              replacementParent = replacement;
              replacement = replacement.right;
            }

            replacementParent.right = replacement.left;
            replacement.right = current.right;
            replacement.left = current.left;

            if (current.value < parent.value) {
              parent.left = replacement;
            } else {
              parent.right = replacement;
            }
            break;
          default:
        }
      }
    }
  }
}

// npx jest datastructures/tree/binarysearchtree.iterative.js
describe('BinarySearchTree Methods', () => {
  const values = [10, 15, 5, 2, 3, 12, 17, 4, 6, 13, 11, 8, 1];
  const tree = new BinarySearchTree();
  for (let i = 0; i < values.length; i++) {
    tree.insert(values[i]);
  }
  it('BinarySearchTree.contains()', () => {
    expect(tree.contains(13)).toBeTruthy();
  });
});
