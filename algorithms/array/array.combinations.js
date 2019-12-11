/*
 * @title: Number Combinations
 * @description: Number Combinations
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// itterative
function combinations(arr) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const resultLength = result.length;
    for (let j = 0; j < resultLength; j++) {
      result.push([arr[i], ...result[j]]);
    }

    result.push([arr[i]]);
  }

  return result;
}

// recursive
function combinationsTwo(arr) {
  const result = [];

  function combine(arr, output) {
    if (arr.length === 0) {
      result.push(output.slice());
      return;
    }

    combine(arr.slice(0, arr.length - 1), output.slice());
    const temp = output.slice();
    temp.push(arr[arr.length - 1]);
    combine(arr.slice(0, arr.length - 1), temp);
  }

  combine(arr, []);
  return result;
}

function combinationsThree(arr) {
  const result = [];

  function combine(arr, output) {
    if (arr.length === 0) {
      result.push([...output]);
      return;
    }

    const endIndex = arr.length - 1;
    const endElement = arr[endIndex];
    combine(arr.slice(0, endIndex), [...output]);
    combine(arr.slice(0, endIndex), [...output, endElement]);
  }

  combine(arr, []);
  return result.filter(arr => arr.length);
}

function combinationsFour(arr) {
  const result = [];

  function combine(arr, index, output) {
    if (index === arr.length) {
      result.push(output.slice());
      return;
    }

    combine(arr, index + 1, output);
    output.push(arr[index]);
    combine(arr, index + 1, output);
    output.pop();
  }

  combine(arr, 0, []);

  return result;
}

function combinationsFive(arr) {
  const result = [];

  function combine(arr, index, output) {
    if (index === arr.length) {
      result.push([...output]);
      return;
    }
    combine(arr, index + 1, output);
    combine(arr, index + 1, [...output, arr[index]]);
  }

  combine(arr, 0, []);

  return result;
}


// npx jest algorithms/array/array.combinations.js
test('combinations()', () => {
  const result = [[1], [2, 1], [2], [3, 1], [3, 2, 1], [3, 2], [3]];
  expect(combinations([1, 2, 3])).toEqual(result);
});

test('combinationsTwo()', () => {
  const result = [[], [1], [2], [2, 1], [3], [3, 1], [3, 2], [3, 2, 1]];
  expect(combinationsTwo([1, 2, 3])).toEqual(result);
});

test('combinationsThree()', () => {
  const result = [[1], [2], [2, 1], [3], [3, 1], [3, 2], [3, 2, 1]];
  expect(combinationsThree([1, 2, 3])).toEqual(result);
});

test('combinationsFour()', () => {
  const result = [[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]];
  expect(combinationsFour([1, 2, 3])).toEqual(result);
});

test('combinationsFive()', () => {
  const result = [[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]];
  expect(combinationsFive([1, 2, 3])).toEqual(result);
});
