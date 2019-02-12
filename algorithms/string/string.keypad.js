/*
 * @title: Keypad combinations
 * @description: find all number keypad combinations of input
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const chars = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];

function createKeypadWords(arr) {
  const result = [];

  function create(arr, index, output) {
    if (index === arr.length) {
      result.push(output.join(''));
      return;
    }

    const key = chars[arr[index]];
    for (let i = 0; i < key.length; i++) {
      output[index] = key[i];
      create(arr, index + 1, output);
    }
  }

  create(arr, 0, []);
  return result;
}

// npx jest algorithms/string.keypad.js
test('createKeypadWords', () => {
  expect(createKeypadWords([2, 3, 4], 3)).toEqual([
    'adg', 'adh', 'adi', 'aeg',
    'aeh', 'aei', 'afg', 'afh',
    'afi', 'bdg', 'bdh', 'bdi',
    'beg', 'beh', 'bei', 'bfg',
    'bfh', 'bfi', 'cdg', 'cdh',
    'cdi', 'ceg', 'ceh', 'cei',
    'cfg', 'cfh', 'cfi']);
});
