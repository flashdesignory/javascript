/*
 * @title: Number Palindrome
 * @description: check if number is a palindrome
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function isPalindrome(x) {
  if (x === 0) return true;
  if (x < 0) return false;
  // Find the appropriate divisor
  // to extract the leading digit
  let divisor = 1;
  while (x / divisor >= 10) {
    divisor *= 10;
  }
  while (x !== 0) {
    const left = Math.floor(x / divisor);
    const right = Math.floor(x % 10);
    // If first and last digit
    // not same return false
    if (left !== right) return false;
    // Removing the leading and trailing
    // digit from number
    x = Math.floor((x % divisor) / 10);
    // Reducing divisor by a factor
    // of 2 as 2 digits are dropped
    divisor = Math.floor(divisor / 100);
  }
  return true;
}

// npx jest algorithms/number/number.palindrome.js
test('isPalindrome()', () => {
  expect(isPalindrome(121)).toBeTruthy();
  expect(isPalindrome(-1)).toBeFalsy();
  expect(isPalindrome(-121)).toBeFalsy();
});
