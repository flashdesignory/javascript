/*
 * @title: Longest Common SubSequence from Dictionary
 * @description: longest common prefix from string in dictionary
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function isSubsequence(str1, str2) {
  const length1 = str1.length;
  const length2 = str2.length;
  let index1 = 0;
  let index2 = 0;
  while (index1 < length1 && index2 < length2) {
    if (str1[index1] === str2[index2]) {
      // found same character, let's increment word index;
      index1++;
    }
    index2++;
  }
  // all characters from word found from 0 to length
  return (index1 === length1);
}

function findLongestString(arr, str) {
  let result = '';
  let length = 0;

  for (let i = 0; i < arr.length; i++) {
    // current word
    const current = arr[i];
    // if max length is less than current word length
    if (length < current.length) {
      if (isSubsequence(current, str)) {
        console.log(current);
        result = current;
        length = current.length;// eslint-disable-line
      }
    }
  }
  return result;
}

// npx jest algorithms/string/string.longest.prefix2.js
test('findLongestString()', () => {
  const dict = ['ale', 'apple', 'monkey', 'plea'];
  const str = 'abpcplea';
  expect(findLongestString(dict, str)).toEqual('apple');
});
