/*
 * @title: Binary Search Tree
 * @description: Binary Search Tree Class iterative methods
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* eslint class-methods-use-this: ["error", { "exceptMethods":
 ["print", "preorder", "postorder", "inorder", "ancestor1", "ancestor2"] }] */

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

  preorder(node) {
    if (!node) return [];
    const result = [];
    const stack = [node];

    while (stack.length) {
      const current = stack.pop();
      result.push(current.value);
      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
    }
    return result;
  }

  ancestor1(node, n1, n2) {
    let parent = null;
    let current = node;

    while (current) {
      if (current.value > n1 && current.value > n2) {
        parent = current;
        current = current.left;
      } else if (current.value < n1 && current.value < n2) {
        parent = current;
        current = current.right;
      } else {
        parent = current;
        return parent;
      }
    }

    return parent;
  }

  ancestor2(node, n1, n2) {
    const min = Math.min(n1, n2);
    const max = Math.max(n1, n2);

    let current = node;

    while (current) {
      if (
        current.value === min
        || current.value === max
        || (current.value > min && current.value) < max
      ) {
        return current;
      }

      if (current.left && max < current.value) {
        current = current.left;
      }

      if (current.right && min > current.value) {
        current = current.right;
      }
    }

    return null;
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
  it('BinarySearchTree.preorder()', () => {
    expect(tree.preorder(tree.root)).toEqual([10, 5, 2, 1, 3, 4, 6, 8, 15, 12, 11, 13, 17]);
  });
  it('BinarySearchTree.ancestor1()', () => {
    expect(tree.ancestor1(tree.root, 3, 6).value).toBe(5);
  });
  it('BinarySearchTree.ancestor2()', () => {
    expect(tree.ancestor2(tree.root, 3, 6).value).toBe(5);
  });
});
