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
  constructor(limit) {
    this.limit = limit;
    this.head = null;
    this.tail = null;
    this.map = {};
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

  set(key, value) {
    let node;
    if (this.map[key]) {
      node = this.map[key];
      this.map[key].value = value;

      if (node.previous) {
        node.previous.next = node.next;
      }

      if (node.next) {
        node.next.previous = node.previous;
      }
    } else {
      if (this.size >= this.limit) {
        const key = this.tail.key; // eslint-disable-line
        this.tail = this.tail.previous;
        if (this.tail) this.tail.next = null;
        delete this.map[key];
      } else {
        this.size++;
      }

      node = new Node(key, value);
      this.map[key] = node;
    }

    if (this.head) {
      this.head.previous = node;
      node.next = this.head;
    }

    this.head = node;
    if (!this.tail) this.tail = node;
    return node;
  }

  get(key) {
    if (!this.map[key]) return null;

    const node = this.map[key];
    if (this.head === node) return node;

    if (node.previous) {
      node.previous.next = node.next;
    }

    if (node.next) {
      node.next.previous = node.previous;
    } else {
      this.tail = node;
    }

    if (this.head) {
      this.head.previous = node;
      node.next = this.head;
    }

    this.head = node;
    if (!this.tail) this.tail = node;
    return node;
  }
}

// npx jest datastructures/doublylist.lrucache.js
describe('LRUCache should hold 5 most recent values', () => {
  it('adding 1-5, should equal [[5,5], [4,4], [3,3], [2,2], [1,1]]', () => {
    const cache = new LRUCache(5);
    cache.set(1, 1);
    cache.set(2, 2);
    cache.set(3, 3);
    cache.set(4, 4);
    cache.set(5, 5);
    expect(cache.print()).toEqual([[5, 5], [4, 4], [3, 3], [2, 2], [1, 1]]);
  });
  it('adding (6,6) should equal [[6,6], [5,5], [4,4], [3,3], [2,2]]', () => {
    const cache = new LRUCache(5);
    cache.set(1, 1);
    cache.set(2, 2);
    cache.set(3, 3);
    cache.set(4, 4);
    cache.set(5, 5);
    cache.set(6, 6);
    expect(cache.print()).toEqual([[6, 6], [5, 5], [4, 4], [3, 3], [2, 2]]);
  });
  it('getting (3) should equal [[3,3], [6,6], [5,5], [4,4], [2,2]]', () => {
    const cache = new LRUCache(5);
    cache.set(1, 1);
    cache.set(2, 2);
    cache.set(3, 3);
    cache.set(4, 4);
    cache.set(5, 5);
    cache.set(6, 6);
    cache.get(3);
    expect(cache.print()).toEqual([[3, 3], [6, 6], [5, 5], [4, 4], [2, 2]]);
  });
});
