/*
 * @title: SubSequence of string
 * @description: Determine if str is SubSequence
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function isSubsequence(str1, str2) {
  let index1 = 0;
  let index2 = 0;
  const length1 = str1.length;
  const length2 = str2.length;

  while (index1 < length1 && index2 < length2) {
    if (str1[index1] === str2[index2]) {
      index1++;
    }
    index2++;
  }

  return index1 === length1;
}

function isSubsequence2(str1, str2) {
  let counter = 0;
  for (let i = 0; i < str2.length; i++) {
    if (str1[counter] === str2[i]) {
      counter++;
    }
  }
  return counter === str1.length;
}

// npx jest algorithms/string/string.subsequence.js
test('isSubsequence()', () => {
  expect(isSubsequence('apple', 'abpcplea')).toBe(true);
});

test('isSubsequence2()', () => {
  expect(isSubsequence2('apple', 'abpcplea')).toBe(true);
});
