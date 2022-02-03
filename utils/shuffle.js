/*
 * @title: Shuffle
 * @description: class to shuffle array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class ShuffleArray {
  constructor(arr) {
    this.arr = arr || [];
  }

  shuffle() {
    const result = [];
    const temp = this.arr.slice(0);
    while (temp.length > 0) {
      const index = Math.floor(Math.random() * temp.length);
      result.push(temp[index]);
      temp.splice(index, 1);
    }

    return result;
  }

  reset() {
    return this.arr;
  }
}

// npx jest utils/shuffle.js
test('utils.shuffle', () => {
  const arr = [1, 2, 3];
  const shuffled = new ShuffleArray(arr);
  expect(shuffled.shuffle()).not.toBe(arr);
  expect(shuffled.reset()).toBe(arr);
  expect(shuffled.shuffle()).not.toBe(arr);
});
