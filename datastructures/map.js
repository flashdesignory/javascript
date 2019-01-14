/*
 * @title: Map
 * @description: Generic Map Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Dictionary {
  constructor() {
    this.items = {};
  }

  set(key, value) {
    this.items[key] = value;
  }

  delete(key) {
    if (this.has(key)) {
      delete this.items[key];
      return true;
    }
    return false;
  }

  has(key) {
    // return key in this.items;
     return this.items.hasOwnProperty(key); // eslint-disable-line
  }

  get(key) {
    return this.has(key) ? this.items[key] : null;
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.keys(this.items).length;
  }

  keys() {
    return Object.keys(this.items);
  }

  values() {
    return Object.values(this.items);
  }
}

// npx jest datastructures/map.js
describe('map data structure', () => {
  const myMap = new Dictionary();
  myMap.set('John', 'john@john.com');
  myMap.set('Jane', 'jane@jane.com');
  myMap.set('doowee', 'd@dd.com');
  it('has() should return boolean', () => {
    expect(myMap.has('doowee')).toEqual(true);
  });
  it('keys() should return all keys', () => {
    expect(myMap.keys()).toEqual(['John', 'Jane', 'doowee']);
  });
});
