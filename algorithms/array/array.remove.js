/*
 * @title: Remove values from array
 * @description: remove given values and return
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function removeValues(arr) {
  const values = Array.prototype.slice.call(arguments, 1); //eslint-disable-line
  return arr.filter(value => values.indexOf(value) === -1);
}

function removeValue1(arr, value) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== value) {
      arr[count++] = arr[i];
    }
  }
  return arr.slice(0, count);
}

function removeValue2(arr, value) {
  let index = arr.length - 1;
  while (index >= 0) {
    if (arr[index] === value) {
      arr.splice(index, 1);
    }
    index--;
  }
  return arr;
}

// npx jest algorithms/array/array.remove.js
test('removeValues()', () => {
  expect(removeValues([1, 2, 3, 1, 2, 3], 2, 3)).toEqual([1, 1]);
});
test('removeValue1()', () => {
  expect(removeValue1([0, 1, 2, 2, 3, 0, 4, 2], 2)).toEqual([0, 1, 3, 0, 4]);
});
test('removeValue2()', () => {
  expect(removeValue2([0, 1, 2, 2, 3, 0, 4, 2], 2)).toEqual([0, 1, 3, 0, 4]);
});
