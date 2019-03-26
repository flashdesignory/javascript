/*
 * @title: String word break
 * @description: check dictionary to see if string parts exist
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* Given an input string and a dictionary of words, find out if the input
 * string can be segmented into a space-separated sequence of dictionary words. */

function dictionaryContains(str) {
  const dictionary = ['mobile', 'samsung', 'sam', 'sung', 'man', 'mango', 'icecream', 'and', 'go', 'i', 'like', 'ice', 'cream'];

  for (let i = 0; i < dictionary.length; i++) {
    if (dictionary[i].indexOf(str) === 0) {
      return true;
    }
  }

  return false;
}

// recursive
function wordBreak(str) {
  const size = str.length;
  if (size === 0) return true;

  for (let i = 1; i <= size; i++) {
    if (dictionaryContains(str.substr(0, i))
        && wordBreak(str.substr(i, size - i))) {
      return true;
    }
  }
  return false;
}

function wordBreak2(str) {
  const size = str.length;
  if (size === 0) return true;

  const result = [];
  for (let i = 0; i <= size; i++) {
    result[i] = false;
  }

  for (let i = 1; i <= size; i++) {
    if (result[i] === false
      && dictionaryContains(str.substr(0, i))) {
      result[i] = true;
    }

    if (result[i] === true) {
      if (i === size) {
        return true;
      }

      for (let j = i + 1; j <= size; j++) {
        if (result[j] === false
          && dictionaryContains(str.substr(i, j - i))) {
          result[j] = true;
        }

        if (result[j] === true) {
          if (j === size) {
            return true;
          }
        }
      }
    }
  }
  return false;
}

// npx jest algorithms/string/string.wordbreak.js
describe('wordbreak recursive', () => {
  test('wordBreak(ilikesamsung)', () => {
    expect(wordBreak('ilikesamsung')).toEqual(true);
  });
  test('wordBreak(iiiiiiii)', () => {
    expect(wordBreak('iiiiiiii')).toEqual(true);
  });
  test('wordBreak()', () => {
    expect(wordBreak('')).toEqual(true);
  });
  test('wordBreak(ilikelikeimangoiii)', () => {
    expect(wordBreak('ilikelikeimangoiii')).toEqual(true);
  });
  test('wordBreak(samsungandmango)', () => {
    expect(wordBreak('samsungandmango')).toEqual(true);
  });
  test('wordBreak(samsungandmangok)', () => {
    expect(wordBreak('samsungandmangok')).toEqual(false);
  });
});

describe('wordbreak tabulation', () => {
  test('wordBreak2(ilikesamsung)', () => {
    expect(wordBreak2('ilikesamsung')).toEqual(true);
  });
  test('wordBreak2(iiiiiiii)', () => {
    expect(wordBreak2('iiiiiiii')).toEqual(true);
  });
  test('wordBreak2()', () => {
    expect(wordBreak2('')).toEqual(true);
  });
  test('wordBreak2(ilikelikeimangoiii)', () => {
    expect(wordBreak2('ilikelikeimangoiii')).toEqual(true);
  });
  test('wordBreak2(samsungandmango)', () => {
    expect(wordBreak2('samsungandmango')).toEqual(true);
  });
  test('wordBreak2(samsungandmangok)', () => {
    expect(wordBreak2('samsungandmangok')).toEqual(false);
  });
});
