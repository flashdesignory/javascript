/*
 * @title: Permutations of String
 * @description: Simple function to check for permutations
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */


// two words, same length
function permutationOfOther(a, b) {
  if (a.length !== b.length) return false;
  const letters = {};
  let i;

  for (i = 0; i < a.length; i++) {
    if (letters[a[i]]) letters[a[i]] += 1;
    else letters[a[i]] = 1;
  }

  for (i = 0; i < b.length; i++) {
    if (!letters[b[i]]) return false;
    letters[b[i]] -= 1;
    if (letters[b[i]] < 0) {
      return false;
    }
  }

  return true;
}

// permutation of palindrome
function permutationOfPalindrome(a) {
  let count = 0;
  const found = {};

  for (let i = 0; i < a.length; i++) {
    if (found[a[i]]) found[a[i]] += 1;
    else found[a[i]] = 1;

    if (found[a[i]] % 2 === 0) {
      count--;
    } else {
      count++;
    }
  }
  return count <= 1;
}

console.log(permutationOfPalindrome('ottoffsg'));

// npx jest algorithms/string/string.permutation.js
test('test permutations', () => {
  expect(permutationOfOther('abcd', 'bcad')).toBe(true);
  expect(permutationOfOther('abcd', 'bcaf')).toBe(false);
  expect(permutationOfPalindrome('ottoffsg')).toBe(false);
  expect(permutationOfPalindrome('oott')).toBe(true);
});
