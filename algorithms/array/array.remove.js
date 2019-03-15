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

// npx jest algorithms/array/array.remove.js
test('removeValues()', () => {
  expect(removeValues([1, 2, 3, 1, 2, 3], 2, 3)).toEqual([1, 1]);
});
