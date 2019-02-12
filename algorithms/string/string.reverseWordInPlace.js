/*
 * @title: Reverse words in string
 * @description: String function to reverse words in place
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function reverseWord(arr, start, end) {
  while (start < end) {
    const temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start++;
    end--;
  }
}

function reverseInPlace(str) {
  const chars = str.split('');

  let start = 0;
  for (let i = 0; i <= chars.length; i++) {
    if (i === chars.length || chars[i] === ' ') {
      reverseWord(chars, start, i - 1);
      start = i + 1;
    }
  }
  return chars.join('');
}

// npx jest algorithms/string/string.reverseWordInPlace.js
test('test reverse words', () => {
  expect(reverseInPlace('I am the good boy')).toEqual('I ma eht doog yob');
});
