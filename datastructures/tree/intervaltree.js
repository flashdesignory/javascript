/*
 * @title: Interval Tree
 * @description: Basic Interval Tree - wip
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Interval {
  constructor(arr) {
    this.low = arr[0]; //eslint-disable-line
    this.high = arr[1]; //eslint-disable-line
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.max = value.high;
  }

  serialize() {
    const result = {};
    result.value = this.value;
    result.max = this.max;
    result.left = this.left ? this.left.serialize() : null;
    result.right = this.right ? this.right.serialize() : null;
    return result;
  }
}

class IntervalTree {
  constructor() {
    this.root = null;
  }

  print() {
    if (!this.root) return null;
    return this.root.serialize();
  }

  insert(node, interval) {
    if (!node) {
      node = new Node(interval);
      if (!this.root) this.root = node;
      return node;
    }

    const low = node.value.low; //eslint-disable-line

    if (interval.low < low) {
      node.left = this.insert(node.left, interval);
    } else {
      node.right = this.insert(node.right, interval);
    }

    if (node.max < interval.high) {
      node.max = interval.high;
    }

    return node;
  }

  isValid(int1, int2) { //eslint-disable-line
    // overlap = a.start < b.end && b.start < a.end;
    if (int1.low < int2.high && int2.low < int1.high) {
      return false;
    }
    return true;
  }

  isConflicting(node, interval) {
    if (!node) return null;

    if (!this.isValid(node.value, interval)) {
      return node;
    }

    if (node.left && node.left.max >= interval.low) {
      return this.isConflicting(node.left, interval);
    }

    return this.isConflicting(node.right, interval);
  }
}

function printConflicts(arr) {
  const tree = new IntervalTree();
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const interval = new Interval(arr[i]);
    const conflict = tree.isConflicting(tree.root, interval);
    if (conflict) {
      // console.log("conflict: ", arr[i], conflict.value)
      result.push(arr[i]);
    }

    tree.insert(tree.root, interval);
  }

  return result;
}

// npx jest datastructures/tree/intervaltree.js
describe('intervaltree data structure', () => {
  it('should return interval that conflict', () => {
    const appointments = [[1, 5], [3, 7], [2, 6], [10, 15], [5, 6], [4, 100]];
    //  const appointments = [[1,3], [5, 7], [2, 4], [6, 8]];
    expect(printConflicts(appointments)).toEqual([[3, 7], [2, 6], [5, 6], [4, 100]]);
  });
});
