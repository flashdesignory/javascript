/*
 * @title: Isomorphic
 * @description: Two strings str1 and str2 are called isomorphic
 * if there is a one to one mapping possible for every character
 * of str1 to every character of str2. And all occurrences of every
 * character in ‘str1’ map to same character in ‘str2’
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function isIsomorphic(str1, str2) {
  if (str1.length !== str2.length) return false;

  const chars = {};
  const used = {};

  for (let i = 0; i < str1.length; i++) {
    const char1 = str1[i];
    const char2 = str2[i];
    if (!chars[char1]) {
      if (used[char2]) return false;
      used[char2] = true;
      chars[char1] = char2;
    } else if (chars[char1] !== char2) {
      return false;
    }
  }
  return true;
}

function isIsomorphic2(s, t) {
  if (s.length !== t.length) return false;
  if (s === t) return true;

  const one = {};
  const two = {};

  for (let i = 0; i < s.length; i++) {
    if (!one[s[i]]) one[s[i]] = t[i];
    if (!two[t[i]]) two[t[i]] = s[i];

    if (one[s[i]] !== t[i] || two[t[i]] !== s[i]) {
      return false;
    }
  }

  return true;
}

// npx jest algorithms/string/string.isomorphic.js
test('isIsomorphic()', () => {
  expect(isIsomorphic('foo', 'app')).toBe(true);
  expect(isIsomorphic('bar', 'foo')).toBe(false);
  expect(isIsomorphic('turtle', 'tletur')).toBe(true);
  expect(isIsomorphic('ab', 'ca')).toBe(true);
});

test('isIsomorphic2()', () => {
  expect(isIsomorphic2('foo', 'app')).toBe(true);
  expect(isIsomorphic2('bar', 'foo')).toBe(false);
  expect(isIsomorphic2('turtle', 'tletur')).toBe(true);
  expect(isIsomorphic2('ab', 'ca')).toBe(true);
});
