/*
 * @title: LFU Cache
 * @description: LFU Cache implemented with Doubly Linked List and Hashtable
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// Time: BigO(1);
// Space: BigO(n);

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.previous = null;
    this.count = 1;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  print() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push([current.key, current.value]);
      current = current.next;
    }
    return result;
  }


  push(key, value) {
    const node = new Node(key, value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.previous = this.tail;
      this.tail = node;
    }
    this.size++;
    return node;
  }

  remove(node) {
    if (!node.next && !node.previous) {
      this.head = null;
      this.tail = null;
    } else if (!node.next) {
      this.tail = node.previous;
      this.tail.next = null;
    } else if (!node.previous) {
      this.head = node.next;
      this.head.previous = null;
    } else {
      const { previous } = node;
      const { next } = node;
      previous.next = next;
      next.previous = previous;
    }
    this.size--;
  }

  pop() {
    if (!this.head) return null;

    const current = this.tail;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = current.previous;
      this.tail.next = null;
      current.previous = null;
    }

    this.size--;
    return current;
  }

  shift() {
    if (!this.head) return null;

    const current = this.head;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = current.next;
      this.head.previous = null;
      current.next = null;
    }

    this.size--;
    return current;
  }
}

class LFUCache {
  constructor(capacity) {
    this.lists = {};
    this.map = {};
    this.capacity = capacity;
    this.min = 0;
    this.count = this.capacity;
  }

  get(key) {
    if (!this.capacity || !this.map[key]) return -1;

    const { count } = this.map[key];
    const { value } = this.map[key];
    const newCount = count + 1;

    this.lists[count].remove(this.map[key]);

    if (this.lists[count].size === 0) {
      delete this.lists[count];
      if (this.min === count) {
        this.min = newCount;
      }
    }

    if (!this.lists[newCount]) {
      this.lists[newCount] = new DoublyLinkedList();
    }

    const pushedNode = this.lists[newCount].push(key, value);
    this.map[key] = pushedNode;
    this.map[key].count = newCount;

    return value;
  }

  put(key, value) {
    if (!this.capacity) return null;

    if (this.map[key]) {
      this.map[key].value = value;
      this.get(key);
      return null;
    }

    if (this.count === 0) {
      const list = this.lists[this.min];

      const nodeToDelete = list.shift();
      delete this.map[nodeToDelete.key];


      if (list.size === 0) {
        delete this.lists[this.min];
      }

      this.count += 1;
    }

    if (!this.lists[1]) {
      this.lists[1] = new DoublyLinkedList();
    }

    const node = this.lists[1].push(key, value);
    this.map[key] = node;
    this.min = 1;
    this.count -= 1;

    return null;
  }
}

// npx jest datastructures/list/doublylist.lfucache.js
describe('LFUCache should hold 2 most frequently used values', () => {
  it('should work', () => {
    const result = [];
    const cache = new LFUCache(2);
    result.push(cache.put(1, 1));
    result.push(cache.put(2, 2));
    result.push(cache.get(1));
    result.push(cache.put(3, 3));
    result.push(cache.get(2));
    result.push(cache.get(3));
    result.push(cache.put(4, 4));
    result.push(cache.get(1));
    result.push(cache.get(3));
    result.push(cache.get(4));
    expect(result).toEqual([null, null, 1, null, -1, 3, null, -1, 3, 4]);
  });
});

// ["LFUCache","put","put","get","put","get","get","put","get","get","get"]
// [[2],[1,1],[2,2],[1],[3,3],[2],[3],[4,4],[1],[3],[4]]

// [null,null,null,1,null,-1,3,null,-1,3,4]
