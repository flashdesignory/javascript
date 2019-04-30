/*
 * @title: k stacks array
 * @description: create stacks with an array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class KStacksArray {
  constructor(numStacks, size) {
    this.numStacks = numStacks;
    this.size = size;

    this.arr = [];
    this.top = [];
    this.next = [];

    // top[] keeps track of last index for each stack
    // initialized with -1
    for (let i = 0; i < numStacks; i++) {
      this.top[i] = -1;
    }

    // next[] keeps track of next index for all values
    // initialized with i + 1
    for (let i = 0; i < size - 1; i++) {
      this.next[i] = i + 1;
    }

    // last index can't have a next - setting it to -1
    this.next[size - 1] = -1;

    // keeps track of current index of arr
    this.index = 0;
  }

  push(value, stackIndex) {
    // capture global index
    const currentIndex = this.index;
    // set global index to the value of next array
    this.index = this.next[currentIndex];
    // update next index with previous top index
    this.next[currentIndex] = this.top[stackIndex];
    // update top index with current index
    this.top[stackIndex] = currentIndex;
    // update array
    this.arr[currentIndex] = value;
  }

  pop(stackIndex) {
    // capture stack index
    const currentIndex = this.top[stackIndex];
    // update top index with next index from previous top
    this.top[stackIndex] = this.next[currentIndex];
    // update next index with global index;
    this.next[currentIndex] = this.index;
    // update global index with current index
    this.index = currentIndex;
    // return array value
    return this.arr[currentIndex];
  }
}

// npx jest algorithms/array/array.stacks.js
test('KStacksArray()', () => {
  const kStacks = new KStacksArray(3, 10);
  kStacks.push(15, 2);
  kStacks.push(45, 2);

  kStacks.push(17, 1);
  kStacks.push(49, 1);
  kStacks.push(39, 1);

  kStacks.push(11, 0);
  kStacks.push(9, 0);
  kStacks.push(7, 0);

  expect(kStacks.pop(2)).toEqual(45);
  expect(kStacks.pop(1)).toEqual(39);
  expect(kStacks.pop(0)).toEqual(7);
  expect(kStacks.pop(1)).toEqual(49);
});
