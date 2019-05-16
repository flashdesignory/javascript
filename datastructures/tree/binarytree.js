/*
 * @title: Binary Tree
 * @description: Generic Binary Tree Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* eslint class-methods-use-this: ["error", { "exceptMethods":
 ["print", "last", "maxPathSum", "lowestCommonAncestor", "diameter"] }] */

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

  contains(node, value) {
    if (!node) return false;
    if (node.value === value) return true;

    return this.contains(node.left, value)
      || this.contains(node.right, value);
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

  diameter(node) {
    let result = 0;

    function dfs(node) {
      if (!node) return 0;
      const left = dfs(node.left);
      const right = dfs(node.right);
      result = Math.max(result, (left + right));
      return Math.max(left, right) + 1;
    }

    dfs(node);

    return result;
  }

  preorder(node, result) {
    result = result || [];
    if (!node) return result;

    result.push(node.value);
    this.preorder(node.left, result);
    this.preorder(node.right, result);
    return result;
  }

  inorder(node, result) {
    result = result || [];
    if (!node) return result;

    this.inorder(node.left, result);
    result.push(node.value);
    this.inorder(node.right, result);
    return result;
  }

  postorder(node, result) {
    result = result || [];
    if (!node) return result;

    this.postorder(node.left, result);
    this.postorder(node.right, result);
    result.push(node.value);
    return result;
  }

  last(node) {
    if (!node) return null;

    const queue = new Queue();
    queue.enqueue(node);

    let current = null;

    while (!queue.empty()) {
      current = queue.dequeue();

      if (current.left) {
        queue.enqueue(current.left);
      }

      if (current.right) {
        queue.enqueue(current.right);
      }
    }

    return current;
  }

  reverse(node) {
    if (!node) return null;
    const left = node.left; //eslint-disable-line
    const right = node.right; //eslint-disable-line
    node.left = this.reverse(right);
    node.right = this.reverse(left);
    return node;
  }

  maxPathSum(node) {
    let maxSum = -Infinity;

    function traverse(node) {
      if (node === null) return 0;
      const left = Math.max(traverse(node.left), 0);
      const right = Math.max(traverse(node.right), 0);
      maxSum = Math.max(maxSum, node.value + left + right);
      return node.value + Math.max(left, right);
    }

    traverse(node);

    return maxSum;
  }

  isMirror(node1, node2) {
    if (!node1 && !node2) return true;
    if (node1 && node2 && node1.value === node2.value) {
      return this.isMirror(node1.left, node2.right)
        && this.isMirror(node1.right, node2.left);
    }
    return false;
  }

  isSame(node1, node2) {
    if (!node1 && !node2) return true;
    if (node1 && node2 && node1.value === node2.value) {
      return this.isSame(node1.left, node2.left)
        && this.isSame(node1.right, node2.right);
    }
    return false;
  }

  lowestCommonAncestor(node, value1, value2) {
    let ancestor = null;

    function traverse(node, p, q) {
      if (!node) return false;

      const left = traverse(node.left, p, q) ? 1 : 0;
      const right = traverse(node.right, p, q) ? 1 : 0;
      const middle = (node.value === p) || (node.value === q) ? 1 : 0;

      if (middle + left + right >= 2) {
        ancestor = node;
      }

      return (middle + left + right > 0);
    }

    traverse(node, value1, value2);
    return ancestor.value;
  }
}


// npx jest datastructures/tree/binarytree.js
describe('BinaryTree Methods', () => {
  const values = [1, 2, 3, 4, 5, 6, 7];
  const tree = new BinaryTree();
  for (let i = 0; i < values.length; i++) {
    tree.insert(tree.root, values[i]);
  }

  it('BinaryTree.contains()', () => {
    expect(tree.contains(tree.root, 2)).toBeTruthy();
  });
  it('BinaryTree.diameter()', () => {
    expect(tree.diameter(tree.root)).toEqual(4);
  });
  it('BinaryTree.preorder()', () => {
    expect(tree.preorder(tree.root)).toEqual([1, 2, 4, 5, 3, 6, 7]);
  });
  it('BinaryTree.inorder()', () => {
    expect(tree.inorder(tree.root)).toEqual([4, 2, 5, 1, 6, 3, 7]);
  });
  it('BinaryTree.postorder()', () => {
    expect(tree.postorder(tree.root)).toEqual([4, 5, 2, 6, 7, 3, 1]);
  });
  it('BinaryTree.last()', () => {
    expect(tree.last(tree.root).value).toEqual(7);
  });
  it('BinaryTree.reverse()', () => {
    expect(tree.reverse(tree.root).value).toEqual(1);
  });
  it('BinaryTree.maxPathSum()', () => {
    expect(tree.maxPathSum(tree.root)).toEqual(18);
  });
});

describe('BinaryTree is symmetrical', () => {
  const tree = new BinaryTree();
  tree.root = new Node(1);
  tree.root.left = new Node(2);
  tree.root.right = new Node(2);
  tree.root.left.left = new Node(3);
  tree.root.left.right = new Node(4);
  tree.root.right.left = new Node(4);
  tree.root.right.right = new Node(3);

  it('BinaryTree.isMirror()', () => {
    expect(tree.isMirror(tree.root, tree.root)).toBeTruthy();
  });
});

describe('BinaryTree is identical', () => {
  const tree1 = new BinaryTree();
  tree1.root = new Node(1);
  tree1.root.left = new Node(2);
  tree1.root.right = new Node(3);

  const tree2 = new BinaryTree();
  tree2.root = new Node(1);
  tree2.root.left = new Node(2);
  tree2.root.right = new Node(3);

  it('BinaryTree.isSame()', () => {
    expect(tree1.isSame(tree1.root, tree2.root)).toBeTruthy();
  });
});

describe('BinaryTree lowest Common Ancestor', () => {
  const tree = new BinaryTree();
  tree.root = new Node(1);
  tree.root.left = new Node(2);
  tree.root.right = new Node(3);
  tree.root.left.left = new Node(4);
  tree.root.left.right = new Node(5);
  tree.root.right.left = new Node(6);
  tree.root.right.right = new Node(7);

  it('BinaryTree.lowestCommonAncestor()', () => {
    expect(tree.lowestCommonAncestor(tree.root, 4, 5)).toEqual(2);
  });
});
