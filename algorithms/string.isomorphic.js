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

console.log(isIsomorphic('foo', 'app')); // true;
console.log(isIsomorphic('bar', 'foo')); // false;
console.log(isIsomorphic('turtle', 'tletur')); // true;
console.log(isIsomorphic('ab', 'ca'));// true
