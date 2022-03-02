/*
 * @title: LRU Cache
 * @description: LRU Cache implemented with Doubly Linked List and Hashtable
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// Time: BigO(1);
// Space: BigO(n);

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.previous = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.map = {};
    this.head = null;
    this.tail = null;
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

  insert(node) {
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
      node.previous.next = node.next;
      node.next.previous = node.previous;
    }
    this.size--;
    return node;
  }

  put(key, value) {
    if (this.map[key]) {
      this.remove(this.map[key]);
    }

    this.map[key] = this.insert(new Node(key, value));

    if (this.size > this.capacity) {
      const keyToDelete = this.head.key;
      delete this.map[keyToDelete];
      this.remove(this.head);
    }

    return null;
  }

  get(key) {
    if (!this.map[key]) return -1;

    const { value } = this.map[key];
    this.remove(this.map[key]);
    this.map[key] = this.insert(new Node(key, value));
    return value;
  }
}

// npx jest datastructures/list/doublylist.lrucache.three.js
describe('LRUCache should hold 5 most recent values', () => {
  it('adding 1-5, should equal [[1,1], [2,2], [3,3], [4,4], [5,5]]', () => {
    const cache = new LRUCache(5);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3);
    cache.put(4, 4);
    cache.put(5, 5);
    expect(cache.print()).toEqual([[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]]);
  });
  it('adding (6,6) should equal [[2,2], [3,3], [4,4], [5,5],[6,6]]', () => {
    const cache = new LRUCache(5);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3);
    cache.put(4, 4);
    cache.put(5, 5);
    cache.put(6, 6);
    expect(cache.print()).toEqual([[2, 2], [3, 3], [4, 4], [5, 5], [6, 6]]);
  });
  it('getting (3) should equal [[2, 2], [4, 4], [5, 5], [6, 6], [3, 3]]', () => {
    const cache = new LRUCache(5);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3);
    cache.put(4, 4);
    cache.put(5, 5);
    cache.put(6, 6);
    cache.get(3);
    expect(cache.print()).toEqual([[2, 2], [4, 4], [5, 5], [6, 6], [3, 3]]);
  });
});
