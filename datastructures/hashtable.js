/*
 * @title: Hashtable
 * @description: Simple HashTable
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */
function Dictionary() {
  this.data = {};
}

Dictionary.prototype.set = function (key, value) {
  this.data[key] = value;
};

Dictionary.prototype.get = function (key) {
  return this.data[key];
};

function HashTable() {
  this.size = 1000;
  this.slots = [];
  for (let i = 0; i < this.size; i++) {
    this.slots[i] = new Dictionary();
  }
}

HashTable.prototype.hash = function (key) {
  let hash = 0;
  if (key.length === 0) return hash;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash; //eslint-disable-line
    hash += key.charCodeAt(i);
    hash &= hash; //eslint-disable-line
  }
  return hash;
};

HashTable.prototype.getSlotIndex = function (key) {
  return this.hash(key) % this.size;
};

HashTable.prototype.getSlot = function (key) {
  return this.slots[this.getSlotIndex(key)];
};

HashTable.prototype.set = function (key, value) {
  this.getSlot(key).set(key, value);
};

HashTable.prototype.get = function (key) {
  return this.getSlot(key).get(key);
};
