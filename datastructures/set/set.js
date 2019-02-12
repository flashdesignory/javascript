/*
 * @title: Set
 * @description: Generic Set Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Set {
  constructor(values = []) {
    this.items = {};

    for (let i = 0; i < values.length; i++) {
      this.add(values[i]);
    }
  }

  add(value) {
    if (!this.has(value)) {
      this.items[value] = value;
      return true;
    }
    return false;
  }

  delete(value) {
    if (this.has(value)) {
      delete this.items[value];
      return true;
    }
    return false;
  }

  has(value) {
    // return value in this.items;
    return this.items.hasOwnProperty(value); // eslint-disable-line
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.keys(this.items).length;
  }

  values() {
    return Object.values(this.items);
  }
}

// npx jest datastructures/set.js
describe('queue data structure', () => {
  const mySet = new Set();
  const values = [3, 6, 1, 2, 5, 4];
  for (let i = 0; i < values.length; i++) {
    mySet.add(values[i]);
  }
  it('size() should equal 6', () => {
    expect(mySet.size()).toEqual(6);
  });
  it('values()', () => {
    expect(mySet.values()).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
