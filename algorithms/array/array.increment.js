/*
 * @title: increment values in array
 * @description: Simple function to increment last digit by one
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function increment(arr) {
  let index = arr.length - 1;

  while (index >= 0) {
    let number = arr[index];
    number++;

    if (number > 0 && number <= 9) {
      arr[index] = number;
      return arr;
    }
    arr[index] = 0;
    if (index === 0) {
      arr.unshift(1);
      return arr;
    }
    index--;
  }

  return arr;
}

// npx jest algorithms/array/array.increment.js
describe('increment array value by one', () => {
  test('increment()', () => {
    expect(increment([2, 7, 2])).toEqual([2, 7, 3]);
  });
  test('increment()', () => {
    expect(increment([2, 7, 9])).toEqual([2, 8, 0]);
  });
  test('increment()', () => {
    expect(increment([2, 9, 9])).toEqual([3, 0, 0]);
  });
  test('increment()', () => {
    expect(increment([9, 9, 9])).toEqual([1, 0, 0, 0]);
  });
});
