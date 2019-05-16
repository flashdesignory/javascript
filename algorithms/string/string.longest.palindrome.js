/*
 * @title: Longest Palindromic Substring
 * @description: Given a string s, find the longest
 * palindromic substring in s
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// time -  big O(N^2);
// space - big O(1);
function longestPalindrome(s) {
  let max = '';
  for (let i = 0; i < s.length; i++) {
    // this loop is to take into account
    // different palindromes like 'aba' and 'abba'
    for (let j = 0; j < 2; j++) {
      let left = i;
      let right = i + j;
      while (left >= 0 && s[left] === s[right]) {
        left--;
        right++;
      }
      // here imagine we get into string like
      // "sabbad", then
      // right = 5
      // left = 0
      // and actual length of "abba" should be "4"
      // 5 - 0 - 1 === 4
      if ((right - left - 1) > max.length) {
        max = s.substring(left + 1, right);
      }
    }

    if (Math.ceil(max.length / 2) >= s.length - i) break;
  }
  return max;
}

// npx jest algorithms/string/string.longest.palindrome.js
test('longestPalindrome()', () => {
  expect(longestPalindrome('babad')).toEqual('bab');
});
