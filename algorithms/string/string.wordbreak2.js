/*
 * @title: String word break 2
 * @description: return all possible combinations from dict
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
 * Given a non-empty string s and a dictionary wordDict containing a
 * list of non-empty words, add spaces in s to construct a sentence
 * where each word is a valid dictionary word. Return all such possible sentences.
 */

function isBreakable(str, dict) {
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

function dictionaryContains(str, dict) {
  for (let i = 0; i < dict.length; i++) {
    if (dict[i].indexOf(str) >= 0 && dict[i].length === str.length) {
      return true;
    }
  }
  return false;
}

function search(str, dict, start, output, result) {
  const length = str.length; // eslint-disable-line
  if (start === length) {
    result.push(output.join(' '));
    return;
  }

  for (let i = start; i < length; i++) {
    // const current = str.substring(start, i + 1);
    const current = str.substr(start, i + 1 - start);
    const isWord = dictionaryContains(current, dict);
    if (isWord) {
      search(str, dict, i + 1, [...output, current], result);
    }
  }
}

function wordBreak(str, dict) {
  const result = [];
  if (!isBreakable(str, dict)) return result;
  search(str, dict, 0, [], result);
  return result;
}

// npx jest algorithms/string/string.wordbreak2.js
describe('wordbreak return word combinations', () => {
  test('wordBreak()', () => {
    expect(wordBreak('catsanddog', ['cat', 'cats', 'and', 'sand', 'dog'])).toEqual([
      'cat sand dog',
      'cats and dog',
    ]);
  });
});
