/*
 * @title: Group Anagrams
 * @description: Given an array of strings, group anagrams together.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function groupAnagrams(strs) {
  const map = {};
  for (let i = 0; i < strs.length; i++) {
    const key = strs[i].split('').sort().join('');
    if (!map[key]) map[key] = [strs[i]];
    else map[key].push(strs[i]);
  }

  const result = [];
  for (const key in map) { // eslint-disable-line
    result.push(map[key]);
  }
  return result;
}

// npx jest algorithms/string/string.anagram.group.js
test('groupAnagrams()', () => {
  const input = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
  const output = [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']];
  expect(groupAnagrams(input)).toEqual(output);
});
