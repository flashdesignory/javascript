/*
 * @title: compress string
 * @description: Simple function to compress string
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// one extra iteration in loop -  str[i] will be undefined
// therefore won't equal str[start] and will trigger else statement

function stringCompression(str) {
  let result = '';
  let start = 0;
  let end = 0;

  for (let i = 1; i <= str.length; i++) {
    if (str[i] === str[start]) {
      end++;
    } else {
      if (start === end) {
        result += str[start] + 1;
      } else {
        result += str[start] + (end - start + 1);
      }
      start = i;
      end = i;
    }
  }

  return result;
}

/* function stringCompression(str) {
  let start = 0;
  let end = 0;
  let count = 1;
  let result = '';

  for (let i = 1; i < str.length; i++) {
    if (str[i] === str[i - 1]) {
      end++;
    } else {
      count = (end - start + 1);
      if (start === end) {
        result += str[start] + count;
      } else {
        result += str[start] + count;
      }
      start = i;
      end = i;
    }
  }

  count = (end - start + 1);
  if (start === end) {
    result += str[start] + count;
  } else {
    result += str[start] + count;
  }

  return result;
} */

// npx jest algorithms/string/string.compress.js
test('stringCompression()', () => {
  expect(stringCompression('aabcccccaaa')).toEqual('a2b1c5a3');
});
