/*
 * @title: Tree
 * @description: Generic Binary Search Tree Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function Queue() {
  this.data = {};
  this.first = 0;
  this.last = 0;
}

Queue.prototype.enqueue = function (value) {
  this.data[this.last] = value;
  this.last++;
};

Queue.prototype.dequeue = function () {
  const temp = this.data[this.first];
  delete this.data[this.first];
  this.first++;
  return temp;
};

function Stack() {
  this.data = {};
  this.size = 0;
}

Stack.prototype.push = function (value) {
  this.data[this.size] = value;
  this.size++;
};

Stack.prototype.pop = function () {
  const temp = this.data[this.size - 1];
  delete this.data[this.size - 1];
  this.size--;
  return temp;
};

function Node(value) {
  this.value = value;
  this.right = null;
  this.left = null;
}

Node.prototype.serialize = function () {
  const result = { value: this.value };
  result.left = this.left === null ? null : this.left.serialize();
  result.right = this.right === null ? null : this.right.serialize();
  return result;
};

function BinarySearchTree() {
  this.root = null;
}

BinarySearchTree.prototype.add = function (value) {
  const node = new Node(value);

  if (!this.root) {
    this.root = node;
  } else {
    let current = this.root;
    // while(true) {
    while (current) {
      if (current.value > value) {
        if (current.left) {
          current = current.left;
        } else {
          current.left = node;
          break;
        }
      } if (current.right) {
        current = current.right;
      } else {
        current.right = node;
        break;
      }
    }
  }

  return node;
};

// recursive removing node
BinarySearchTree.prototype.delete = function (value) {
  const that = this;
  function removeNode(node, value) {
    if (!node) return null;
    if (node.value === value) {
      // no children
      if (!node.left && !node.right) {
        return null;
      }
      // one child
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }
      // two children
      const parent = that.min(node.right);
      node.value = parent.value;
      node.right = removeNode(node.right, parent.value);
      return node;
    }
    if (value < node.value) {
      node.left = removeNode(node.left, value);
      return node;
    }
    node.right = removeNode(node.right, value);
    return node;
  }
  this.root = removeNode(this.root, value);
};

BinarySearchTree.prototype.remove = function (value) {
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
    numChildren = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);

    if (current === this.root) {
      switch (numChildren) {
        case 0:
          this.root = null;
          break;
        case 1:
          this.root = (current.left === null ? current.right : current.left);
          break;
        case 2:
          replacement = this.root.left;
          while (replacement.right) {
            replacementParent = replacement;
            replacement = replacement.right;
          }

          if (replacementParent != null) {
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
            parent.left = (current.left === null ? current.right : current.left);
          } else {
            parent.right = (current.left === null ? current.right : current.left);
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
};

BinarySearchTree.prototype.contains = function (value) {
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
};

BinarySearchTree.prototype.preOrderTraversal = function (node) {
  console.log(node.value);

  if (node.left) {
    this.preOrderTraversal(node.left);
  }
  if (node.right) {
    this.preOrderTraversal(node.right);
  }
};

BinarySearchTree.prototype.inOrderTraversal = function (node) {
  if (node.left) {
    this.inOrderTraversal(node.left);
  }

  console.log(node.value);

  if (node.right) {
    this.inOrderTraversal(node.right);
  }
};

BinarySearchTree.prototype.postOrderTraversal = function (node) {
  if (node.left) {
    this.postOrderTraversal(node.left);
  }

  if (node.right) {
    this.postOrderTraversal(node.right);
  }

  console.log(node.value);
};

BinarySearchTree.prototype.searchBF = function (node) {
  const queue = new Queue();
  queue.enqueue(node);
  let current = queue.dequeue();
  const result = [];

  while (current) {
    result.push(current.value);
    if (current.left) queue.enqueue(current.left);
    if (current.right) queue.enqueue(current.right);
    current = queue.dequeue();
  }

  console.log(result);
};

BinarySearchTree.prototype.searchDF = function (node) {
  const stack = new Stack();
  stack.push(node);
  let current = stack.pop();
  const result = [];

  while (current) {
    result.push(current.value);
    if (current.left) stack.push(current.left);
    if (current.right) stack.push(current.right);
    current = stack.pop();
  }

  console.log(result);
};

BinarySearchTree.prototype.min = function (node) {
  let current = node;

  while (current.left) {
    current = current.left;
  }

  return current;
};

BinarySearchTree.prototype.max = function (node) {
  let current = node;

  while (current.right) {
    current = current.right;
  }

  return current;
};

BinarySearchTree.prototype.findNodesAtLevel = function (node, k) {
  if (node == null) {
    return;
  }
  if (k === 0) {
    console.log(node.value);
  } else {
    this.findNodesAtLevel(node.left, k - 1);
    this.findNodesAtLevel(node.right, k - 1);
  }
};

BinarySearchTree.prototype.levelOrder = function (node) {
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
      console.log(`${levelValues},${levelCount}`);
      currentLevel = nextLevel;
      nextLevel = 0;
      levelCount++;
      levelValues = [];
    }

    current = queue.dequeue();
  }
};

BinarySearchTree.prototype.collectNodesAtLevel = function (node, k, arr, reverse) {
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
};

BinarySearchTree.prototype.printLevelOrderZigZag = function (node) {
  const height = this.height(node);
  for (let i = 0; i < height; i++) {
    console.log(this.collectNodesAtLevel(node, i, [], i % 2 === 0));
  }
};

BinarySearchTree.prototype.height = function (node) {
  if (node == null) {
    return 0;
  }

  return 1 + Math.max(this.height(node.left), this.height(node.right));
};

BinarySearchTree.prototype.inOrderSuccessor = function (node) {
  let successor;

  if (node.right) {
    return this.min(node.right);
  }

  let current = this.root;
  while (current) {
    if (node.value < current.value) {
      successor = current;
      current = current.left;
    } else if (node.value > current.value) {
      current = current.right;
    } else {
      current = null;
    }
  }
  return successor;
};

BinarySearchTree.prototype.inOrderPredecessor = function (node) {
  let predecessor;

  if (node.left) {
    return this.max(node.left);
  }

  let current = this.root;
  while (current) {
    if (node.value > current.value) {
      predecessor = current;
      current = current.right;
    } else if (node.value < current.value) {
      current = current.left;
    } else if (node.value === current.value) {
      return predecessor;
    } else {
      return null;
    }
  }
  return predecessor;
};

BinarySearchTree.prototype.longestConsecutive = function (node) {
  let max = 0;

  function find(node) {
    if (!node) {
      return 0;
    }

    let length = 1;
    const left = find(node.left);
    const right = find(node.right);

    if (node.left && node.value === node.left.value + 1) {
      length = Math.max(length, 1 + left);
    }

    if (node.right && node.value === node.right.value - 1) {
      length = Math.max(length, 1 + right);
    }

    max = Math.max(max, length);
    return length;
  }

  find(node);
  return max;
};

BinarySearchTree.prototype.sumLeaves = function (node) {
  let result = 0;

  function find(node) {
    if (node != null) {
      if (node.left == null && node.right == null) {
        result += node.value;
      } else {
        if (node.left) {
          find(node.left);
        }
        if (node.right) {
          find(node.right);
        }
      }
    }
  }

  find(node);
  return result;
};

BinarySearchTree.prototype.findSumPath = function (node, sum) {
  if (node == null) return false;

  if (node.value === sum && node.left == null && node.right == null) {
    return true;
  }

  return this.findSumPath(node.left, sum - node.value)
  || this.findSumPath(node.right, sum - node.value);
};

BinarySearchTree.prototype.findAncestors = function (node, value) {
  if (!node) return false;
  if (node.value === value) return true;

  if (this.findAncestors(node.left, value) || this.findAncestors(node.right, value)) {
    console.log(node.value);
    return true;
  }

  return false;
};

BinarySearchTree.prototype.isBinarySearchTree = function (node) {
  let prevNode = null;

  function validate(node) {
    if (!node) return true;
    if (!validate(node.left)) {
      return false;
    }

    if (prevNode) {
      if (prevNode.value > node.value) {
        return false;
      }
    }

    prevNode = node;

    if (!validate(node.right)) {
      return false;
    }

    return true;
  }

  return validate(node);
};

BinarySearchTree.prototype.isBalanced = function (node) {
  if (!node) return true;

  const leftHeight = this.height(node.left);
  const rightHeight = this.height(node.right);
  const difference = Math.abs(leftHeight - rightHeight);

  if (difference > 1) {
    return false;
  }

  return this.isBalanced(node.left) && this.isBalanced(node.right);
};

BinarySearchTree.prototype.toObject = function () {
  return this.root.serialize();
};

const tree = new BinarySearchTree();
tree.add(10);
const fifteen = tree.add(15);
const five = tree.add(5);
tree.add(2);
tree.add(3);
const twelve = tree.add(12);
tree.add(17);
// console.log(tree.toObject());
// tree.preOrderTraversal(tree.root);
// console.log("--------------------------");
// tree.inOrderTraversal(tree.root);
// console.log("--------------------------");
// tree.postOrderTraversal(tree.root);
// console.log(tree.contains(12));
// console.log(tree.contains(11));
// console.log(tree.contains(17));
tree.searchBF(tree.root);
tree.searchDF(tree.root);
tree.min(tree.root);
tree.max(tree.root);
// tree.remove(15);
// console.log("-------------------------------");
// tree.inOrderTraversal(tree.root);
console.log('notes at level 2: ');
tree.findNodesAtLevel(tree.root, 2);
console.log(`sum leaves: ${tree.sumLeaves(tree.root)}`);
console.log(`height: ${tree.height(tree.root)}`);
console.log(`is binary search tree: ${tree.isBinarySearchTree(tree.root)}`);
console.log(`is balanced: ${tree.isBalanced(tree.root)}`);
console.log(`successor: ${tree.inOrderSuccessor(tree.root).value}`);
console.log(`successor: ${tree.inOrderSuccessor(twelve).value}`);
console.log(`successor: ${tree.inOrderSuccessor(five).value}`);
console.log(`predecessor: ${tree.inOrderPredecessor(tree.root).value}`);
console.log(`predecessor: ${tree.inOrderPredecessor(fifteen).value}`);
console.log(`predecessor: ${tree.inOrderPredecessor(twelve).value}`);
console.log(`findSumPath: ${tree.findSumPath(tree.root, 42)}`);
console.log('ancestors of 3: ');
tree.findAncestors(tree.root, 3);
tree.printLevelOrderZigZag(tree.root);
