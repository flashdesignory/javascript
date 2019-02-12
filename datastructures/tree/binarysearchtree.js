/*
 * @title: Tree
 * @description: Generic Binary Search Tree Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* eslint class-methods-use-this: ["error", { "exceptMethods":
["min", "max", "breadthFirstSearch", "levelOrder", "getAllAncestors",
"sumLeaves", "longestConsecutive"] }] */

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

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  print() {
    if (this.root) {
      console.log(this.root.serialize());
    }
  }

  range(node, start, end) {
    if (!node) return;
    if (node.value > start) {
      this.range(node.left, start, end);
    }

    if (node.value >= start && node.value <= end) {
      console.log(node.value);
    }

    if (node.value < end) {
      this.range(node.right, start, end);
    }
  }

  min(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  max(node) {
    let current = node;
    while (current.right) {
      current = current.right;
    }
    return current;
  }

  height(node) {
    if (!node) return 0;
    return Math.max(
      this.height(node.left) + 1,
      this.height(node.right) + 1,
    );
  }

  distance(node, value) {
    if (!node || node.value === value) return 0;
    if (node.value > value) return 1 + this.distance(node.left, value);
    return 1 + this.distance(node.right, value);
  }

  contains(node, value) {
    if (!node || node.value === value) {
      return node;
    }

    if (node.value > value) {
      return this.contains(node.left, value);
    }

    return this.contains(node.right, value);
  }

  isValid(node, min, max) {
    if (!node) return true;

    if (node.value < min || node.value > max) {
      return false;
    }

    return this.isValid(node.left, min, node.value - 1)
       && this.isValid(node.right, node.value + 1, max);
  }

  isBalanced(node) {
    if (!node) return true;

    const left = this.height(node.left);
    const right = this.height(node.right);
    const difference = Math.abs(left - right);
    if (difference > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  isFull(node) {
    if (!node) return true;
    if (!node.left && !node.right) return true;
    if (node.left && node.right) {
      return this.isFull(node.left) && this.isFull(node.right);
    }
    return false;
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

  delete(node, value) {
    if (!node) {
      return null;
    }

    if (node.value === value) {
      if (!node.left && !node.right) {
        return null;
      }

      if (!node.left) {
        return node.right;
      }

      if (!node.right) {
        return node.left;
      }

      const parent = this.min(node.right);
      node.value = parent.value;
      node.right = this.delete(node.right, parent.value);
      return node;
    }

    if (node.value > value) {
      node.left = this.delete(node.left, value);
      return node;
    }

    node.right = this.delete(node.right, value);
    return node;
  }

  preorderTraversal(node, result) {
    result = result || [];
    if (!node) return result;

    result.push(node.value);
    result = this.preorderTraversal(node.left, result);
    result = this.preorderTraversal(node.right, result);
    return result;
  }

  inorderTraversal(node, result) {
    result = result || [];
    if (!node) return result;

    result = this.inorderTraversal(node.left, result);
    result.push(node.value);
    result = this.inorderTraversal(node.right, result);
    return result;
  }

  postorderTraversal(node, result) {
    result = result || [];
    if (!node) return result;

    result = this.postorderTraversal(node.left, result);
    result = this.postorderTraversal(node.right, result);
    result.push(node.value);
    return result;
  }

  breadthFirstSearch(node) {
    if (!node) return [];
    const result = [];
    const queue = new Queue();
    queue.enqueue(node);

    while (!queue.empty()) {
      const current = queue.dequeue();
      result.push(current.value);
      if (current.left) queue.enqueue(current.left);
      if (current.right) queue.enqueue(current.right);
    }

    return result;
  }

  findSecondLargest(node) {
    if (!node) return null;

    let current = node;

    while (current) {
      // current is largest and has left subtree
      // 2nd largest is max in left subtree
      if (current.left && !current.right) {
        return this.max(current.left);
      }

      // current is parent of largest and largest has no children
      // current is 2nd largest
      if (current.right && !current.right.left && !current.right.right) {
        return current;
      }

      current = current.right;
    }

    return null;
  }

  findNodesAtLevel(node, k, result) {
    result = result || [];
    if (!node) return result;

    if (k === 0) {
      result.push(node.value);
    } else {
      result = this.findNodesAtLevel(node.left, k - 1, result);
      result = this.findNodesAtLevel(node.right, k - 1, result);
    }

    return result;
  }

  levelOrder(node) {
    const result = [];
    const queue = new Queue();
    queue.enqueue(node);
    let current = queue.dequeue();
    let levelValues = [];
    let currentLevel = 1;
    let nextLevel = 0;
    let levelCount = 1;

    while (current) {
      levelValues.push(current.value);
      currentLevel--;

      if (current.left) {
        queue.enqueue(current.left);
        nextLevel++;
      }

      if (current.right) {
        queue.enqueue(current.right);
        nextLevel++;
      }

      if (currentLevel === 0) {
        // console.log(`${levelValues},${levelCount}`);
        result[levelCount - 1] = levelValues;
        currentLevel = nextLevel;
        nextLevel = 0;
        levelCount++;
        levelValues = [];
      }

      current = queue.dequeue();
    }
    return result;
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

  successor(value) {
    const node = this.contains(value);

    if (node === this.root) {
      if (node.right) {
        return this.min(node.right);
      }
      return null;
    }

    let current = this.root;
    let successor = null;

    while (current) {
      if (current.value > value) {
        successor = current;
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return successor;
  }

  predecessor(value) {
    const node = this.contains(value);

    if (node === this.root) {
      if (node.left) {
        return this.max(node.left);
      }
      return null;
    }

    let current = this.root;
    let predecessor = null;

    while (current) {
      if (current.value < value) {
        predecessor = current;
        current = current.right;
      } else {
        current = current.left;
      }
    }

    return predecessor;
  }

  ancestor(node, n1, n2) {
    if (!node) return null;

    if (node.value > n1 && node.value > n2) {
      return this.ancestor(node.left, n1, n2);
    }

    if (node.value < n1 && node.value < n2) {
      return this.ancestor(node.right, n1, n2);
    }

    return node;
  }

  getAllAncestors(node, value) {
    const result = [];

    function traverse(node, value) {
      if (!node) return false;
      if (node.value === value) return true;

      if (traverse(node.left, value) || traverse(node.right, value)) {
        result.push(node.value);
        return true;
      }

      return false;
    }

    traverse(node, value);
    return result;
  }

  sumLeaves(node) {
    let sum = 0;

    function traverse(node) {
      if (!node.left && !node.right) {
        sum += node.value;
      } else {
        if (node.left) traverse(node.left);
        if (node.right) traverse(node.right);
      }
    }

    traverse(node);
    return sum;
  }

  sumPath(node, sum) {
    if (!node) return false;

    if (node.value === sum && !node.left && !node.right) {
      return true;
    }

    return this.sumPath(node.left, sum - node.value)
       || this.sumPath(node.right, sum - node.value);
  }

  longestConsecutive(node) {
    let result = 0;

    function traverse(node) {
      if (!node) return 0;

      let length = 1;
      const left = traverse(node.left);
      const right = traverse(node.right);

      if (node.left && node.left.value === node.value - 1) {
        length = Math.max(length, left + 1);
      }

      if (node.right && node.right.value === node.value + 1) {
        length = Math.max(length, right + 1);
      }

      result = Math.max(length, result);
      return length;
    }

    traverse(node);

    return result;
  }

  shortestPath(node, src, dst) {
    if (!node) return 0;

    if (node.value > src && node.value > dst) {
      return this.shortestPath(node.left, src, dst);
    }

    if (node.value < src && node.value < dst) {
      return this.shortestPath(node.right, src, dst);
    }

    if (node.value >= src && node.value <= dst) {
      return this.distance(node, src) + this.distance(node, dst);
    }

    return 0;
  }

  minDepth(node) {
    if (!node) return 0;
    if (!node.left && !node.right) return 1;

    const length = 1;

    if (!node.left) return this.minDepth(node.right) + length;
    if (!node.right) return this.minDepth(node.left) + length;

    return Math.min(this.minDepth(node.left), this.minDepth(node.right)) + length;
  }

  // eslint-disable-next-line
  levelOrderMinDepth(node) {
    const queue = new Queue();
    queue.enqueue(node);
    let numNodes = 1;
    let numChildren = 0;
    let height = 1;

    while (!queue.empty()) {
      const current = queue.dequeue();
      numNodes--;

      if (!current.right && !current.left) {
        // console.log(`found leaf: ${current.value}`);
        return height;
      }

      if (current.left) {
        numChildren++;
        queue.enqueue(current.left);
      }
      if (current.right) {
        numChildren++;
        queue.enqueue(current.right);
      }

      // console.log(current.value, numNodes);

      if (numNodes === 0) {
        // console.log('end of level');
        numNodes = numChildren;
        height++;
      }
    }
    return null;
  }

  // eslint-disable-next-line
  kSmallest(node, k) {
    let index = 0;
    let result = null;
    // eslint-disable-next-line
    function traverse(node, k) {
      if (!node) return null;
      traverse(node.left, k);
      index++;
      // console.log(node.value, k, index);
      if (index === k) {
        result = node;
        return node;
      }
      traverse(node.right, k);
      return node;
    }

    traverse(node, k);

    return result;
  }

  // eslint-disable-next-line
  kLargest(node, k) {
    let index = 0;
    let result = null;

    // reverse inorder
    // eslint-disable-next-line
    function traverse(node, k) {
      if (!node) return null;
      // first right side
      traverse(node.right, k);
      index++;
      // console.log(node.value, k, index);
      if (index === k) {
        result = node;
        return node;
      }
      // then left side
      traverse(node.left, k);
      return node;
    }

    traverse(node, k);

    return result;
  }

  isPairPresent(node, target) {
    const sorted = this.inorderTraversal(node);
    let start = 0;
    let end = sorted.length - 1;

    while (start < end) {
      if (sorted[start] + sorted[end] === target) {
        start++;
        end--;
        // console.log(`pair is: ${sorted[start]}, ${sorted[end]}`);
        // return after first found pair - otherwise adjust logic
        // and collect all matches
        return true;
      }
      if (sorted[start] + sorted[end] > target) {
        end--;
      }
      if (sorted[start] + sorted[end] < target) {
        start++;
      }
    }
    return false;
  }

  deleteTree(node) {
    if (!node) return null;

    this.deleteTree(node.left);
    this.deleteTree(node.right);

    this.remove(this.root, node.value);

    if (this.height(this.root) === 1) {
      this.root = null;
    }

    return null;
  }

  containsIterative(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) {
        return current;
      }

      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      }
    }

    return null;
  }

  insertIterative(value) {
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

  deleteIterative(value) {
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

// npx jest datastructures/binarysearchtree.js
describe('BinarySearchTree Methods', () => {
  const values = [10, 15, 5, 2, 3, 12, 17, 4, 6, 13, 11, 8, 1];
  const tree = new BinarySearchTree();
  for (let i = 0; i < values.length; i++) {
    tree.insert(tree.root, values[i]);
  }

  it('BinarySearchTree.min()', () => {
    expect(tree.min(tree.root).value).toBe(1);
  });
  it('BinarySearchTree.max()', () => {
    expect(tree.max(tree.root).value).toBe(17);
  });
  it('BinarySearchTree.height()', () => {
    expect(tree.height(tree.root)).toBe(5);
  });
  it('BinarySearchTree.distance()', () => {
    expect(tree.distance(tree.root, 11)).toBe(3);
  });
  it('BinarySearchTree.contains()', () => {
    expect(tree.contains(tree.root, 3).value).toEqual(3);
  });
  it('BinarySearchTree.isValid()', () => {
    expect(tree.isValid(tree.root, Number.MIN_VALUE, Number.MAX_VALUE)).toBeTruthy();
  });
  it('BinarySearchTree.isBalanced()', () => {
    expect(tree.isBalanced(tree.root)).toBeTruthy();
  });
  it('BinarySearchTree.isFull()', () => {
    expect(tree.isFull(tree.root)).toBeFalsy();
  });
  it('BinarySearchTree.preorderTraversal()', () => {
    expect(tree.preorderTraversal(tree.root))
      .toEqual([10, 5, 2, 1, 3, 4, 6, 8, 15, 12, 11, 13, 17]);
  });
  it('BinarySearchTree.inorderTraversal()', () => {
    expect(tree.inorderTraversal(tree.root))
      .toEqual([1, 2, 3, 4, 5, 6, 8, 10, 11, 12, 13, 15, 17]);
  });
  it('BinarySearchTree.postorderTraversal()', () => {
    expect(tree.postorderTraversal(tree.root))
      .toEqual([1, 4, 3, 2, 8, 6, 5, 11, 13, 12, 17, 15, 10]);
  });
  it('BinarySearchTree.breadthFirstSearch()', () => {
    expect(tree.breadthFirstSearch(tree.root))
      .toEqual([10, 5, 15, 2, 6, 12, 17, 1, 3, 8, 11, 13, 4]);
  });
  it('BinarySearchTree.findSecondLargest()', () => {
    expect(tree.findSecondLargest(tree.root).value).toBe(15);
  });
  it('BinarySearchTree.findNodesAtLevel()', () => {
    expect(tree.findNodesAtLevel(tree.root, 2)).toEqual([2, 6, 12, 17]);
  });
  it('BinarySearchTree.levelOrder()', () => {
    expect(tree.levelOrder(tree.root))
      .toEqual([[10], [5, 15], [2, 6, 12, 17], [1, 3, 8, 11, 13], [4]]);
  });
  it('BinarySearchTree.printLevelOrderZigZag()', () => {
    expect(tree.printLevelOrderZigZag(tree.root))
      .toEqual([[10], [5, 15], [17, 12, 6, 2], [1, 3, 8, 11, 13], [4]]);
  });
  it('BinarySearchTree.successor()', () => {
    expect(tree.successor(12).value).toBe(13);
  });
  it('BinarySearchTree.predecessor()', () => {
    expect(tree.predecessor(12).value).toBe(11);
  });
  it('BinarySearchTree.ancestor()', () => {
    expect(tree.ancestor(tree.root, 3, 6).value).toBe(5);
  });
  it('BinarySearchTree.getAllAncestors()', () => {
    expect(tree.getAllAncestors(tree.root, 3)).toEqual([2, 5, 10]);
  });
  it('BinarySearchTree.sumLeaves()', () => {
    expect(tree.sumLeaves(tree.root)).toBe(54);
  });
  it('BinarySearchTree.sumPath()', () => {
    expect(tree.sumPath(tree.root, 48)).toBe(true);
  });
  it('BinarySearchTree.shortestPath()', () => {
    expect(tree.shortestPath(tree.root, 3, 11)).toEqual(6);
  });
  it('BinarySearchTree.longestConsecutive', () => {
    expect(tree.longestConsecutive(tree.root)).toBe(3);
  });
  it('BinarySearchTree.minDepth()', () => {
    expect(tree.minDepth(tree.root)).toEqual(3);
  });
  it('BinarySearchTree.levelOrderMinDepth()', () => {
    expect(tree.levelOrderMinDepth(tree.root)).toEqual(3);
  });
  it('BinarySearchTree.kSmallest()', () => {
    expect(tree.kSmallest(tree.root, 2).value).toEqual(2);
  });
  it('BinarySearchTree.kLargest()', () => {
    expect(tree.kLargest(tree.root, 3).value).toEqual(13);
  });
  it('BinarySearchTree.isPairPresent()', () => {
    expect(tree.isPairPresent(tree.root, 21)).toBe(true);
  });
});
