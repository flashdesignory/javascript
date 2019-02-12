/*
 * @title: Longest Common Prefix
 * @description: longest common prefix in array of words
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function getMinLength(arr) {
  let min = arr[0].length;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].length < min) {
      min = arr[i].length;
    }
  }
  return min;
}

function getPrefix(arr) {
  const minLength = getMinLength(arr);
  const result = [];

  for (let i = 0; i < minLength; i++) {
    const current = arr[0][i];
    for (let j = 1; j < minLength; j++) {
      if (arr[j][i] !== current) {
        return result.join('');
      }
    }
    result.push(current);
  }
  return result.join('');
}

// npx jest algorithms/string/string.longestPrefix.js
test('getPrefix()', () => {
  expect(getPrefix(['geeksforgeeks', 'geeks', 'geek', 'geezer'])).toEqual('gee');
  expect(getPrefix(['apple', 'ape', 'april'])).toEqual('ap');
});
