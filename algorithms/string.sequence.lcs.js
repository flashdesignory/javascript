/*
 * @title: Longest Common SubSequence
 * @description: lcs in two strings
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// time: O(n^2);
function lcs(str1, str2, index1, index2) {
  if (index1 === 0 || index2 === 0) return 0;
  if (str1[index1 - 1] === str2[index2 - 1]) {
    return 1 + lcs(str1, str2, index1 - 1, index2 - 1);
  }
  return Math.max(
    lcs(str1, str2, index1, index2 - 1),
    lcs(str1, str2, index1 - 1, index2),
  );
}

// time: O(mn);
function lcs2(str1, str2) {
  const result = [];
  for (let i = 0; i <= str1.length; i++) {
    result[i] = [];
    for (let j = 0; j <= str2.length; j++) {
      result[i][j] = 0;
    }
  }

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        result[i][j] = result[i - 1][j - 1] + 1;
      } else {
        result[i][j] = Math.max(result[i - 1][j], result[i][j - 1]);
      }
    }
  }
  return result[str1.length][str2.length];
}

// npx jest algorithms/string.sequence.lcs.js
test('lcs()', () => {
  const str1 = 'AGGTAB';
  const str2 = 'GXTXAYB';
  const index1 = str1.length;
  const index2 = str2.length;
  expect(lcs(str1, str2, index1, index2)).toEqual(4);
  expect(lcs2(str1, str2)).toEqual(4);
});
