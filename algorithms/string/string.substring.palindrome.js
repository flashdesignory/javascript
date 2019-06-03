/*
 * @title: Longest Palindromic Substring
 * @description: Given a string s, find the longest palindromic substring in s.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function longestPalindrome(s) {
  let max = '';
  let current = '';
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < i + 2; j++) {
      let left = i;
      let right = j;

      while (s[left] && s[left] === s[right]) {
        // current = s.substring(left, right + 1);
        current = s.substr(left, (right - left) + 1);
        if (current.length > max.length) {
          max = current;
        }
        left--;
        right++;
      }
    }
  }
  return max;
}

// npx jest algorithms/string/string.substring.palindrome.js
test('longest palindronic substring', () => {
  expect(longestPalindrome('babad')).toEqual('bab');
});
