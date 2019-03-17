/*
 * @title: create permutations
 * @description: Simple function to create permutations
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// helper functions
function swap(arr, a, b) {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function permutationsOne(arr) {
  const result = [];

  function permute(n) {
    if (n === 1) {
      result.push(arr.join(''));
      return;
    }

    for (let i = 0; i < n; i++) {
      permute(n - 1);
      swap(arr, n % 2 ? 0 : i, n - 1);
    }
  }

  permute(arr.length);
  return result;
}

// heaps
function permutationsTwo(arr) {
  const result = [];

  function permute(array, n, string) {
    n = n || array.length;
    string = string || [];
    let i; let j;
    if (n === 1) {
      result.push(array.join(''));
    } else {
      for (i = 1; i <= n; i++) {
        permute(array, n - 1, string);
        if (n % 2) {
          j = 1;
        } else {
          j = i;
        }
        swap(array, j - 1, n - 1);
      }
    }
  }

  permute(arr);
  return result;
}

// variation
function permutationsThree(arr) {
  const result = [];
  const stack = [];

  function permute() {
    if (arr.length === 0) {
      result.push(stack.slice());
    }
    for (let i = 0; i < arr.length; i++) {
      const x = arr.splice(i, 1);
      stack.push(x);
      permute();
      stack.pop();
      arr.splice(i, 0, x);
    }
  }

  permute();

  for (let i = 0; i < result.length; i++) {
    result[i] = result[i].join('');
  }

  return result;
}

// backtracking
// O (n*n!)
function permutationsFour(arr) {
  const result = [];

  function permute(arr, startIndex, endIndex) {
    if (startIndex === endIndex) {
      result.push(arr.join(''));
    } else {
      for (let i = startIndex; i <= endIndex; i++) {
        swap(arr, startIndex, i);
        permute(arr, startIndex + 1, endIndex);
        swap(arr, i, startIndex); // backtrack
      }
    }
  }

  permute(arr, 0, arr.length - 1);
  return result;
}

function permutationsFive(str) {
  const result = {};

  function permute(word, remainder) { // eslint-disable-line
    if (remainder.length === 0) {
      return result[word] = true; // eslint-disable-line
    }

    for (let i = 0; i < remainder.length; i++) {
      permute(word + remainder[i], (remainder.substr(0, i) + remainder.substr(i + 1)));
    }
  }

  permute('', str);

  return Object.keys(result);
}

// npx jest algorithms/string/string.permutations.js
test('test permutation', () => {
  expect(permutationsOne(['a', 'b', 'c', 'd'])).toEqual([
    'abcd', 'bacd', 'cabd', 'acbd',
    'bcad', 'cbad', 'dbca', 'bdca',
    'cdba', 'dcba', 'bcda', 'cbda',
    'dacb', 'adcb', 'cdab', 'dcab',
    'acdb', 'cadb', 'dabc', 'adbc',
    'bdac', 'dbac', 'abdc', 'badc',
  ]);
  expect(permutationsTwo(['a', 'b', 'c', 'd'])).toEqual([
    'abcd', 'bacd', 'cabd', 'acbd',
    'bcad', 'cbad', 'dbca', 'bdca',
    'cdba', 'dcba', 'bcda', 'cbda',
    'dacb', 'adcb', 'cdab', 'dcab',
    'acdb', 'cadb', 'dabc', 'adbc',
    'bdac', 'dbac', 'abdc', 'badc',
  ]);
  expect(permutationsThree(['a', 'b', 'c', 'd'])).toEqual([
    'abcd', 'abdc', 'acbd', 'acdb',
    'adbc', 'adcb', 'bacd', 'badc',
    'bcad', 'bcda', 'bdac', 'bdca',
    'cabd', 'cadb', 'cbad', 'cbda',
    'cdab', 'cdba', 'dabc', 'dacb',
    'dbac', 'dbca', 'dcab', 'dcba',
  ]);
  expect(permutationsFour(['a', 'b', 'c', 'd'])).toEqual([
    'abcd', 'abdc', 'acbd', 'acdb',
    'adcb', 'adbc', 'bacd', 'badc',
    'bcad', 'bcda', 'bdca', 'bdac',
    'cbad', 'cbda', 'cabd', 'cadb',
    'cdab', 'cdba', 'dbca', 'dbac',
    'dcba', 'dcab', 'dacb', 'dabc',
  ]);
  expect(permutationsFive('abcd')).toEqual([
    'abcd', 'abdc', 'acbd', 'acdb',
    'adbc', 'adcb', 'bacd', 'badc',
    'bcad', 'bcda', 'bdac', 'bdca',
    'cabd', 'cadb', 'cbad', 'cbda',
    'cdab', 'cdba', 'dabc', 'dacb',
    'dbac', 'dbca', 'dcab', 'dcba',
  ]);
});
