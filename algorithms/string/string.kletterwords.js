/*
 * @title: k letter words
 * @description: Given a set of characters and a positive integer k,
 * print all possible strings of length k that can be formed from
 * the given set.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function createKLetteredWords(arr, k) {
  const result = [];

  function traverse(arr, index, output) {
    if (index === k) {
      result.push(output.join(''));
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      output[index] = arr[i];
      traverse(arr, index + 1, output);
    }
  }

  traverse(arr, 0, []);
  return result;
}

function createKLetteredWords2(arr, k, output, result) {
  result = result || [];
  if (k === 0) {
    result.push(output);
    return result;
  }

  for (let i = 0; i < arr.length; i++) {
    const temp = output + arr[i];
    createKLetteredWords2(arr, k - 1, temp, result);
  }
  return result;
}

// npx jest algorithms/string/string.kletterwords.js
test('createKLetteredWords()', () => {
  expect(createKLetteredWords(['a', 'b'], 3)).toEqual(['aaa', 'aab', 'aba', 'abb', 'baa', 'bab', 'bba', 'bbb']);
});

test('createKLetteredWords2()', () => {
  expect(createKLetteredWords2(['a', 'b'], 3, '')).toEqual(['aaa', 'aab', 'aba', 'abb', 'baa', 'bab', 'bba', 'bbb']);
});
