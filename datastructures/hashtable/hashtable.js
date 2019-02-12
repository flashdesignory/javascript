/*
 * @title: Hashtable
 * @description: Simple HashTable
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */
class Dictionary {
  constructor() {
    this.data = {};
  }

  set(key, value) {
    this.data[key] = value;
  }

  get(key) {
    return this.data[key];
  }
}

class HashTable {
  constructor(size = 1000) {
    this.size = size;
    this.slots = [];
    for (let i = 0; i < this.size; i++) {
      this.slots[i] = new Dictionary();
    }
  }

  getSlotIndex(key) {
    return HashTable.hash(key) % this.size;
  }

  getSlot(key) {
    return this.slots[this.getSlotIndex(key)];
  }

  set(key, value) {
    this.getSlot(key).set(key, value);
  }

  get(key) {
    return this.getSlot(key).get(key);
  }

  static hash(key) {
    let hash = 0;
    if (key.length === 0) return hash;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash; // eslint-disable-line
      hash += key.charCodeAt(i);
      hash &= hash; // eslint-disable-line
    }
    return hash;
  }
}

// npx jest datastructures/hashtable/hashtable.js
describe('hashtable data structure', () => {
  it('should return correct value when retrieving', () => {
    const hashTable = new HashTable();
    hashTable.set('one', 1);
    hashTable.set('two', 2);
    expect(hashTable.get('one')).toBe(1);
  });
});
