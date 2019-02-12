/*
 * @title: Anagram
 * @description: Simple function to validate an anagram.
 * a word, phrase, or name formed by rearranging the letters of another,
 * such as cinema, formed from iceman.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function anagram(s, t) {
  if (s.length !== t.length) return false;
  const found = {};
  let i;

  for (i = 0; i < s.length; i++) {
    if (!found[s[i]]) found[s[i]] = 1;
    else found[s[i]] += 1;
  }

  for (i = 0; i < t.length; i++) {
    if (!found[t[i]]) return false;
    found[t[i]] -= 1;

    if (found[t[i]] < 0) return false;
  }

  return true;
}

// npx jest algorithms/string/string.anagram.js
test('anagram()', () => {
  expect(anagram('anagram', 'nagaram')).toEqual(true);
  expect(anagram('rat', 'car')).toEqual(false);
});
