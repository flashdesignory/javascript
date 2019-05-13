/*
 * @title: Longest Substring
 * @description: longest substring, no repeats
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function longestSubstring1(s) {
  let max = '';
  let current = '';

  for (let i = 0; i < s.length; i++) {
    const letter = s[i];
    const index = current.indexOf(letter);

    if (index > -1) {
      if (current.length > max.length) max = current;
      current = current.slice(index + 1) + letter;
    } else {
      current += letter;
    }
  }

  if (current.length > max.length) max = current;
  return max.length;
}

function longestSubstring2(s) {
  let start = 0;
  let max = 0;
  const chars = {};

  for (let i = 0; i < s.length; i++) {
    const current = s[i];
    if (chars[current] >= start) start = chars[current] + 1;
    chars[current] = i;

    if (i - start + 1 > max) max = i - start + 1;
  }

  return max;
}

// npx jest algorithms/string/string.substring.longest.js
test('longestSubstring1()', () => {
  expect(longestSubstring1('abcabcbb')).toEqual(3);
  expect(longestSubstring1('bbbbbb')).toEqual(1);
  expect(longestSubstring1('pwwkew')).toEqual(3);
});

test('longestSubstring2()', () => {
  expect(longestSubstring2('abcabcbb')).toEqual(3);
  expect(longestSubstring2('bbbbbb')).toEqual(1);
  expect(longestSubstring2('pwwkew')).toEqual(3);
});
