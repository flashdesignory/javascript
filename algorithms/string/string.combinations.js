/*
 * @title: String Combinations
 * @description: String Combinations
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// itterative
function combinations(str) {
  const result = [];

  for (let i = 0; i < str.length; i++) {
    const resultLength = result.length;
    for (let j = 0; j < resultLength; j++) {
      result.push(str[i] + result[j]);
    }
    result.push(str[i]);
  }

  return result;
}

// recursive
function combinationsTwo(str) {
  const result = [];

  function combine(used, unused) {
    if (!used && !unused) return;
    if (!unused) {
      result.push(used);
      return;
    }

    combine(used + unused[0], unused.slice(1));
    combine(used, unused.slice(1));
  }

  combine('', str);
  return result;
}

function combinationsThree(str) {
  const result = [];

  function combine(used, unused, index) {
    for (let i = index; i < unused.length; i++) {
      used = used + unused[i]; // eslint-disable-line
      result.push(used);
      combine(used, unused, i + 1);
      used = used.substr(0, used.length - 1);
    }
  }

  combine('', str, 0);
  return result;
}

// recursive with factorial
// Formula: n! / k!(n- k)!
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function combinationsCount(n, k) {
  let result = 1;

  const divisor = (factorial(k) * factorial(n - k));
  if (divisor) {
    result = factorial(n) / divisor;
  }

  return result;
}

// npx jest algorithms/string/string.combinations.js
test('combinations()', () => {
  const result = ['a', 'ba', 'b', 'ca', 'cba', 'cb', 'c', 'da', 'dba', 'db', 'dca', 'dcba', 'dcb', 'dc', 'd'];
  expect(combinations('abcd')).toEqual(result);
});

test('combinationsTwo', () => {
  const result = ['abcd', 'abc', 'abd', 'ab', 'acd', 'ac', 'ad', 'a', 'bcd', 'bc', 'bd', 'b', 'cd', 'c', 'd'];
  expect(combinationsTwo('abcd')).toEqual(result);
});

test('combinationsThree()', () => {
  const result = ['a', 'ab', 'abc', 'abcd', 'abd', 'ac', 'acd', 'ad', 'b', 'bc', 'bcd', 'bd', 'c', 'cd', 'd'];
  expect(combinationsThree('abcd')).toEqual(result);
});

test('combinationsCount()', () => {
  expect(combinationsCount(4, 2)).toEqual(6);
});
