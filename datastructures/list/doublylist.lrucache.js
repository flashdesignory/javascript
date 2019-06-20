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
    this.next = null;
    this.previous = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.head = null;
    this.tail = null;
    this.map = {};
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

  get(key) {
    if (!this.map[key]) return -1;

    const node = this.map[key];
    const previous = node.previous; // eslint-disable-line
    const next = node.next; // eslint-disable-line

    if (previous) previous.next = next || null;
    if (next) next.previous = previous || node;

    node.previous = null;

    if (this.tail === node) {
      this.tail = previous || node;
    }

    if (this.head !== node) {
      node.next = this.head;
      this.head.previous = node;
      this.head = node;
    }

    return node.value;
  }

  put(key, value) {
    if (this.map[key]) {
      this.map[key].value = value;
      this.get(key);
    } else {
      const node = new Node(key, value);
      this.map[key] = node;
      if (this.head) {
        this.head.previous = node;
        node.next = this.head;
      }

      this.head = node;

      if (!this.tail) {
        this.tail = node;
      }

      this.size++;
    }

    if (this.size > this.capacity) {
      const keyToDelete = this.tail.key;

      if (this.tail.previous) {
        this.tail.previous.next = null;
        this.tail = this.tail.previous;
        this.map[keyToDelete].previous = null;
      }

      delete this.map[keyToDelete];
      this.size -= 1;
    }
  }
}

// npx jest datastructures/list/doublylist.lrucache.js
describe('LRUCache should hold 5 most recent values', () => {
  it('adding 1-5, should equal [[5,5], [4,4], [3,3], [2,2], [1,1]]', () => {
    const cache = new LRUCache(5);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3);
    cache.put(4, 4);
    cache.put(5, 5);
    expect(cache.print()).toEqual([[5, 5], [4, 4], [3, 3], [2, 2], [1, 1]]);
  });
  it('adding (6,6) should equal [[6,6], [5,5], [4,4], [3,3], [2,2]]', () => {
    const cache = new LRUCache(5);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3);
    cache.put(4, 4);
    cache.put(5, 5);
    cache.put(6, 6);
    expect(cache.print()).toEqual([[6, 6], [5, 5], [4, 4], [3, 3], [2, 2]]);
  });
  it('getting (3) should equal [[3,3], [6,6], [5,5], [4,4], [2,2]]', () => {
    const cache = new LRUCache(5);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3);
    cache.put(4, 4);
    cache.put(5, 5);
    cache.put(6, 6);
    cache.get(3);
    expect(cache.print()).toEqual([[3, 3], [6, 6], [5, 5], [4, 4], [2, 2]]);
  });
});
