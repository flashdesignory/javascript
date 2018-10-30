/*
 * @title: compress string
 * @description: Simple function to compress string
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function stringCompression(str) {
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
}

stringCompression('aabcccccaaa'); // a2b1c5a3
