/*
 * @title: Reverse order of words
 * @description: String function to reverse the order of words
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

function reverseWords(arr) {
  arr = arr.reverse();

  let start = 0;

  for (let i = 0; i <= arr.length; i++) {
    if (i === arr.length || arr[i] === ' ') {
      reverseWord(arr, start, i - 1);
      start = i + 1;
    }
  }

  return arr.join('');
}

function reverseWords2(str) {
  const arr = str.split(' ');
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '') {
      arr.splice(i, 1);
      i--;
    }
  }

  reverseWord(arr, 0, arr.length - 1);
  return arr.join(' ').trim();
}

// npx jest algorithms/string/string.reverseWordOrder.js
test('test reverse words', () => {
  const message = ['c', 'a', 'k', 'e', ' ',
    'p', 'o', 'u', 'n', 'd', ' ',
    's', 't', 'e', 'a', 'l'];

  expect(reverseWords(message)).toEqual('steal pound cake');
});

test('test reverse words', () => {
  const message = 'the  sky   is blue';
  expect(reverseWords2(message)).toEqual('blue is sky the');
});
