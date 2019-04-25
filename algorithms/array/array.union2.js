/*
 * @title: Union Array
 * @description: find union of two arrays
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function union() {
  const numArrays = arguments.length;
  let result = [];
  let index = 0;

  while (index < numArrays) {
    result = result.concat(arguments[index++]); // eslint-disable-line
  }

  result = result.filter((value, index) => result.indexOf(value) === index); // eslint-disable-line

  return result;
}

function union2() {
  const numArrays = arguments.length;
  const result = [];

  for (let i = 0; i < numArrays; i++) {
    const current = arguments[i]; // eslint-disable-line
    for (let j = 0; j < current.length; j++) {
      if (result.indexOf(current[j]) === -1) result.push(current[j]);
    }
  }

  return result;
}

// npx jest algorithms/array/array.union2.js
test('union()', () => {
  const one = [7, 1, 5, 2, 3, 6];
  const two = [3, 8, 6, 20, 7];
  expect(union(one, two)).toEqual([7, 1, 5, 2, 3, 6, 8, 20]);
});
test('union2()', () => {
  const one = [7, 1, 5, 2, 3, 6];
  const two = [3, 8, 6, 20, 7];
  expect(union2(one, two)).toEqual([7, 1, 5, 2, 3, 6, 8, 20]);
});
