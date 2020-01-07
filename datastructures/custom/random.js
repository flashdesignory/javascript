/*
 * @title: DS with O(1) to insert, delete, get random
 * @description: Simple DS
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class RandomizedSet {
  constructor() {
    this.map = {};
    this.arr = [];
  }

  insert(value) {
    if (this.map[value] !== undefined) return false;
    this.arr.push(value);
    this.map[value] = this.arr.length - 1;
    return true;
  }

  remove(value) {
    if (this.map[value] === undefined) return false;

    const index = this.map[value];
    const lastValue = this.arr[this.arr.length - 1];

    this.arr[index] = lastValue;
    this.map[lastValue] = index;

    this.arr.pop();
    delete this.map[value];
    return true;
  }

  getRandom() {
    const index = Math.floor(Math.random() * this.arr.length);
    return this.arr[index];
  }
}

// npx jest datastructures/custom/random.js
describe('custom data structure', () => {
  it('should insert, delete & return random', () => {
    const rs = new RandomizedSet();
    expect(rs.remove()).toBe(false);
    expect(rs.insert(0)).toBe(true);
    expect(rs.remove(0)).toBe(true);
    expect(rs.remove(0)).toBe(false);
  });
});
