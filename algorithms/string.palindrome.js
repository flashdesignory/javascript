/*
 * @title: Palindrome String
 * @description: Simple function to check for palindrome
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function isPalindrome(str) {
  const len = str.length;
  const middle = Math.floor(len / 2);
  for (let i = 0; i < middle; i++) {
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
  }
  return true;
}

function isPalindrome2(str) {
  if (str.length === 0) return true;
  if (str.length === 1) return true;
  if (str[0] === str[str.length - 1]) {
    return isPalindrome(str.slice(1, str.length - 1));
  }
  return false;
}

function isPalindrome3(str) {
  if (str.length === 1) return true;
  if (str.length === 2) return str[0] === str[1];
  if (str[0] === str.slice(-1)) return isPalindrome(str.slice(1, -1));
  return false;
}

// npx jest algorithms/string.palindrome.js
test('isPalindrome()', () => {
  expect(isPalindrome('madam')).toBe(true);
  expect(isPalindrome('fire')).toBe(false);
});

test('isPalindrome2()', () => {
  expect(isPalindrome2('madam')).toBe(true);
  expect(isPalindrome2('fire')).toBe(false);
});

test('isPalindrome3()', () => {
  expect(isPalindrome3('madam')).toBe(true);
  expect(isPalindrome3('fire')).toBe(false);
});
