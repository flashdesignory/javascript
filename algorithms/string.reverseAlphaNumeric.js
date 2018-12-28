/*
 * @title: Reverse alphanumeric chars in string
 * @description: see below
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* Given a string, that contains special character together with
alphabets (‘a’ to ‘z’ and ‘A’ to ‘Z’), reverse the string in a way
that special characters are not affected. */

function swap(arr, left, right) {
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
}

function isLetter(char) {
  return char.match(/[a-z0-9]/i);
}

function reverseChars(str) {
  const chars = str.split('');
  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    if (!isLetter(chars[left])) {
      left++;
    } else if (!isLetter(chars[right])) {
      right--;
    } else {
      swap(chars, left, right);
      left++;
      right--;
    }
  }
  return chars.join('');
}

// npx jest algorithms/string.reverseAlphaNumeric.js
test('test alphanumeric reversal', () => {
  const str = "a!!!b.c.d,e'f,ghi";
  const output = "i!!!h.g.f,e'd,cba";
  expect(reverseChars(str)).toEqual(output);
});
