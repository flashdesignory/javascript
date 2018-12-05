class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function createFromArray(arr, start, end) {
  if (start > end) return null;
  const middle = Math.floor((start + end) / 2);
  const node = new BSTNode(arr[middle]);
  node.left = createFromArray(arr, start, middle - 1);
  node.right = createFromArray(arr, middle + 1, end);
  return node;
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
  it('should create a bst from an ordered array', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const bst = createFromArray(values, 0, values.length - 1);
    expect(bst.value).toEqual(5);
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
