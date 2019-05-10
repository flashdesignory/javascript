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
    if (dictionary[i].indexOf(str) === 0 && str.length === dictionary[i].length) {
      return true;
    }
  }

  return false;
}

// recursion
function wordBreak(str) {
  const size = str.length;
  if (size === 0) return true;

  // start at i equal to 1, stop at i equal to str.length
  for (let i = 1; i <= size; i++) {
    if (dictionaryContains(str.substr(0, i))
        && wordBreak(str.substr(i, size - i))) {
      return true;
    }
  }
  return false;
}

// tabulation
function wordBreak2(str, dict) {
  if (!dict || dict.length === 0) return false;

  const result = [];
  for (let i = 1; i <= str.length; i++) {
    result[i] = false;
  }
  result[0] = true;

  for (let i = 1; i <= str.length; i++) {
    for (let j = 0; j < i; j++) {
      if (result[j] && dict.indexOf(str.substring(j, i)) >= 0) {
        result[i] = true;
        break;
      }
    }
  }

  return result[str.length];
}

// tabulation
function wordBreak3(str) {
  const size = str.length;
  if (size === 0) return true;

  const result = [];
  for (let i = 0; i <= size; i++) {
    result[i] = false;
  }

  // start at i equal to 1, stop at i equal to str.length
  for (let i = 1; i <= size; i++) {
    if (result[i] === false
      && dictionaryContains(str.substr(0, i))) {
      result[i] = true;
    }

    if (result[i] === true) {
      if (i === size) {
        return true;
      }

      // start at j equal to i + 1, stop at j equal to j - i;
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
  const dictionary = ['mobile', 'samsung', 'sam', 'sung', 'man', 'mango', 'icecream', 'and', 'go', 'i', 'like', 'ice', 'cream'];
  test('wordBreak2(ilikesamsung)', () => {
    expect(wordBreak2('ilikesamsung', dictionary)).toEqual(true);
  });
  test('wordBreak2(iiiiiiii)', () => {
    expect(wordBreak2('iiiiiiii', dictionary)).toEqual(true);
  });
  test('wordBreak2()', () => {
    expect(wordBreak2('', dictionary)).toEqual(true);
  });
  test('wordBreak2(ilikelikeimangoiii)', () => {
    expect(wordBreak2('ilikelikeimangoiii', dictionary)).toEqual(true);
  });
  test('wordBreak2(samsungandmango)', () => {
    expect(wordBreak2('samsungandmango', dictionary)).toEqual(true);
  });
  test('wordBreak2(samsungandmangok)', () => {
    expect(wordBreak2('samsungandmangok', dictionary)).toEqual(false);
  });
});

describe('wordbreak tabulation', () => {
  test('wordBreak3(ilikesamsung)', () => {
    expect(wordBreak3('ilikesamsung')).toEqual(true);
  });
  test('wordBreak3(iiiiiiii)', () => {
    expect(wordBreak3('iiiiiiii')).toEqual(true);
  });
  test('wordBreak3()', () => {
    expect(wordBreak3('')).toEqual(true);
  });
  test('wordBreak3(ilikelikeimangoiii)', () => {
    expect(wordBreak3('ilikelikeimangoiii')).toEqual(true);
  });
  test('wordBreak3(samsungandmango)', () => {
    expect(wordBreak3('samsungandmango')).toEqual(true);
  });
  test('wordBreak3(samsungandmangok)', () => {
    expect(wordBreak3('samsungandmangok')).toEqual(false);
  });
});
