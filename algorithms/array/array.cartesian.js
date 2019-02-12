/*
 * @title: cartesian product of arrays
 * @description: function to output combination of arrays
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-shadow */
function cartesian(arr) {
  const result = [];

  function create(arr, index, output) {
    for (let i = 0; i < arr[index].length; i++) {
      const temp = output.slice(0);
      temp.push(arr[index][i]);
      if (index === arr.length - 1) {
        result.push(temp);
      } else {
        create(arr, index + 1, temp);
      }
    }
  }

  create(arr, 0, []);
  return result;
}

function cartesian2(arr) {
  const result = [];

  function create(arr, index, output) {
    if (index === arr.length) {
      result.push(output.slice(0));
      return;
    }

    for (let i = 0; i < arr[index].length; i++) {
      output[index] = arr[index][i];
      create(arr, index + 1, output);
    }
  }

  create(arr, 0, []);
  return result;
}

function cartesian3(arr) {
  return arr.reduce(function (a, b) {
    return a.map(function (x) {
      return b.map(function (y) {
        return x.concat(y);
      });
    }).reduce(function (a, b) { return a.concat(b); }, []);
  }, [[]]);
}

// npx jest algorithms/array/array.cartesian.js
describe('tests for cartesian products', () => {
  test('cartesian()', () => {
    expect(cartesian([[1, 2, 3], [4], [5, 6]])).toEqual([
      [1, 4, 5],
      [1, 4, 6],
      [2, 4, 5],
      [2, 4, 6],
      [3, 4, 5],
      [3, 4, 6],
    ]);
    expect(cartesian2([[1, 2, 3], [4], [5, 6]])).toEqual([
      [1, 4, 5],
      [1, 4, 6],
      [2, 4, 5],
      [2, 4, 6],
      [3, 4, 5],
      [3, 4, 6],
    ]);
    expect(cartesian3([[1, 2, 3], [4], [5, 6]])).toEqual([
      [1, 4, 5],
      [1, 4, 6],
      [2, 4, 5],
      [2, 4, 6],
      [3, 4, 5],
      [3, 4, 6],
    ]);
  });
});
