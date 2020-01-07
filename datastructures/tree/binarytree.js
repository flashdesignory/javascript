/*
 * @title: Binary Tree
 * @description: Generic Binary Tree Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* eslint class-methods-use-this: ["error", { "exceptMethods":
 ["print", "last", "maxPathSum", "lowestCommonAncestor", "diameter",
 "levelorder", "boundary", "getNode", "width", "kDistanceNodes1",
 "kDistanceNodes2"
] }] */

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

  getNode(node, value) {
    if (!node) return null;
    if (node.value === value) return node;

    const queue = new Queue();
    queue.enqueue(node);

    while (!queue.empty()) {
      const current = queue.dequeue();
      if (current.value === value) {
        return current;
      }

      if (current.left) {
        queue.enqueue(current.left);
      }

      if (current.right) {
        queue.enqueue(current.right);
      }
    }

    return null;
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
        return current.left;
      }
      queue.enqueue(current.left);


      if (!current.right) {
        current.right = new Node(value);
        return current.right;
      }
      queue.enqueue(current.right);
    }
    return node;
  }

  removeFromParent(node, value) {
    if (!node || node.value === value) return null;

    if (node.left && node.left.value === value) {
      node.left = null;
      return node;
    }
    if (node.right && node.right.value === value) {
      node.right = null;
      return node;
    }
    return this.removeFromParent(node.left, value) || this.removeFromParent(node.right, value);
  }

  remove(node, value) {
    if (!node) return null;
    // get reference to node to delete
    const toDeleteNode = this.getNode(node, value);
    // get last node
    const last = this.last(node);
    // get parent from last
    // const parent = this.parent(node, last.value);
    // remove from parent
    this.removeFromParent(node, last.value);
    // update node to delete with last node's value
    toDeleteNode.value = last.value;
    return node;
  }

  width(node) {
    const mins = [0];
    let max = 0;

    function dfs(node, level, position) {
      if (!node) return;

      if (level === mins.length) {
        mins[level] = position;
      }

      const delta = position - mins[level];
      max = Math.max(max, delta + 1);
      dfs(node.left, level + 1, delta * 2);
      dfs(node.right, level + 1, delta * 2 + 1);
    }

    dfs(node, 0, 0);
    return max;
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

  levelorder(node) {
    const result = [];
    if (!node) return result;

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

    function traverse(node, value1, value2) { //eslint-disable-line
      if (!node) return false;

      const left = traverse(node.left, value1, value2) ? 1 : 0;
      const right = traverse(node.right, value1, value2) ? 1 : 0;
      const middle = node.value === value1 || node.value === value2 ? 1 : 0;

      if (middle + left + right >= 2) {
        ancestor = node;
      }

      return middle + left + right > 0;
    }

    traverse(node, value1, value2);
    return ancestor.value;
  }

  lowestCommonAncestor2(node, p, q) {
    if (!node || node.value === p || node.value === q) return node;
    const left = this.lowestCommonAncestor2(node.left, p, q);
    const right = this.lowestCommonAncestor2(node.right, p, q);
    if (!left) return right;
    if (!right) return left;
    return node;
  }

  boundary(node) {
    const result = [];
    if (!node) return result;
    result.push(node.value);

    function getLeft(node, result) { // eslint-disable-line
      if (!node) return;

      if (node.left) {
        result.push(node.value);
        getLeft(node.left, result);
      } else if (node.right) {
        result.push(node.value);
        getLeft(node.right, result);
      }
    }

    function getRight(node, result) { // eslint-disable-line
      if (!node) return;

      if (node.right) {
        getRight(node.right, result);
        result.push(node.value);
      } else if (node.left) {
        getRight(node.left, result);
        result.push(node.value);
      }
    }

    function getLeaves(node, result) { // eslint-disable-line
      if (!node) return;

      getLeaves(node.left, result);
      if (!node.left && !node.right) {
        result.push(node.value);
      }
      getLeaves(node.right, result);
    }

    getLeft(node.left, result);
    getLeaves(node.left, result);
    getLeaves(node.right, result);
    getRight(node.right, result);
    return result;
  }

  kDistanceNodes1(start, target, k) {
    function addParent(node, parent) {
      if (!node) return;
      node.parent = parent;
      addParent(node.left, node);
      addParent(node.right, node);
    }

    function findNodes(node, previous, k) { // eslint-disable-line
      if (k === 0) {
        return [node.value];
      }

      let left = [];
      let right = [];
      let subtree = [];

      if (node.left && node.left !== previous) {
        left = findNodes(node.left, node, k - 1);
      }

      if (node.right && node.right !== previous) {
        right = findNodes(node.right, node, k - 1);
      }

      if (node.parent && node.paretn !== previous) {
        subtree = findNodes(node.parent, node, k - 1);
      }

      return [...left, ...right, ...subtree];
    }

    addParent(start, null);
    return findNodes(target, target, k);
  }

  kDistanceNodes2(start, target, k) {
    if (!start) return [];
    let distance = 0;
    let path = {};
    const result = [];

    function shortestPath(node, target, dst, route) { // eslint-disable-line
      if (!node) return 0;
      route[node.val] = true;

      if (node.val === target.val) {
        distance = dst;
        path = { ...route };
      }

      if (node.left) shortestPath(node.left, target, dst + 1, { ...route });
      if (node.right) shortestPath(node.right, target, dst + 1, { ...route });
    }

    function findNodes(node, dst) {
      if (!node) return;
      if (dst === k) {
        result.push(node.val);
      }

      if (node.left) {
        path[node.left.val] ? findNodes(node.left, dst - 1) : findNodes(node.left, dst + 1);
      }

      if (node.right) {
        path[node.right.val] ? findNodes(node.right, dst - 1) : findNodes(node.right, dst + 1);
      }
    }

    shortestPath(start, target, 0, {});
    findNodes(start, distance);
    return result;
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
  it('BinaryTree.levelorder()', () => {
    expect(tree.levelorder(tree.root)).toEqual([1, 2, 3, 4, 5, 6, 7]);
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

describe('BinaryTree print boundary', () => {
  const tree = new BinaryTree();
  tree.root = new Node(20);
  tree.root.left = new Node(8);
  tree.root.left.left = new Node(4);
  tree.root.left.right = new Node(12);
  tree.root.left.right.left = new Node(10);
  tree.root.left.right.right = new Node(14);
  tree.root.right = new Node(22);
  tree.root.right.right = new Node(25);

  it('BinaryTree.boundary()', () => {
    expect(tree.boundary(tree.root)).toEqual([20, 8, 4, 10, 14, 25, 22]);
  });
});
