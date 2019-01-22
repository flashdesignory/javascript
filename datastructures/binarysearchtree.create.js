class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function createFromInorderArray(arr, start, end) {
  if (start > end) return null;

  // could also use Math.floor?
  const middle = Math.round((start + end) / 2);
  const node = new BSTNode(arr[middle]);
  node.left = createFromInorderArray(arr, start, middle - 1);
  node.right = createFromInorderArray(arr, middle + 1, end);

  return node;
}

function createFromPreorderArray(arr, start, end) {
  if (start > end) return null;

  const node = new BSTNode(arr[start]);
  if (start === end) return node;

  for (let i = start; i <= end; i++) {
    if (arr[i] > node.value) {
      node.left = createFromPreorderArray(arr, start + 1, i - 1);
      node.right = createFromPreorderArray(arr, i, end);
      break;
    }
  }

  return node;
}

function createFromPostorderArray(arr, start, end) {
  if (start > end) return null;

  const node = new BSTNode(arr[end]);
  if (start === end) return node;

  for (let i = end; i >= 0; i--) {
    if (arr[i] < node.value) {
      node.left = createFromPostorderArray(arr, start, i);
      node.right = createFromPostorderArray(arr, i + 1, end - 1);
      break;
    }
  }

  return node;
}

function createBSTfromLevelOrder(arr, start, end) {
  if (start <= end) {
    const node = new BSTNode(arr[start]);
    node.left = createBSTfromLevelOrder(arr, (2 * start + 1), end);
    node.right = createBSTfromLevelOrder(arr, (2 * start + 2), end);
    return node;
  }
}

class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  add(value) {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = node;
      return node;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }

    current.next = node;
    return node;
  }

  length() {
    if (!this.head) return 0;
    let length = 0;
    let current = this.head;

    while (current) {
      current = current.next;
      length++;
    }

    return length;
  }
}

function createFromLinkedList(list, length) {
  if (length <= 0) return null;
  const middle = Math.floor(length / 2);
  const left = createFromLinkedList(list, middle);
  const node = new BSTNode(list.head.value);
  node.left = left;
  list.head = list.head.next;
  node.right = createFromLinkedList(list, length - middle - 1);
  return node;
}

// npx jest datastructures/binarysearchtree.create.js
describe('create a binary search tree', () => {
  it('should create a bst from preorder array()', () => {
    const values = [10, 5, 1, 7, 40, 50];
    const bst = createFromPreorderArray(values, 0, values.length - 1);
    expect(bst.value).toEqual(10);
  });
  it('should create a bst from inorder array', () => {
    const values = [1, 5, 7, 10, 40, 50];
    const bst = createFromInorderArray(values, 0, values.length - 1);
    expect(bst.value).toEqual(10);
  });
  it('should create a bst from postorder array', () => {
    const values = [1, 7, 5, 50, 40, 10];
    const bst = createFromPostorderArray(values, 0, values.length - 1);
    expect(bst.value).toEqual(10);
  });
  it('should create bst from levelorder array', () => {
    const values = [1, 2, 3, 4, 5, 6];
    const bst = createBSTfromLevelOrder(values, 0, values.length - 1);
    expect(bst.value).toEqual(1);
  });
  it('should create a bst from a linked list', () => {
    const list = new LinkedList();
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (let i = 0; i < values.length; i++) {
      list.add(values[i]);
    }
    const bst = createFromLinkedList(list, list.length());
    expect(bst.value).toEqual(6);
  });
});
