/*
 * @title: Longest Common SubSequence
 * @description: lcs in two strings
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const str1 = 'AGGTAB';
const str2 = 'GXTXAYB';
const index1 = str1.length;
const index2 = str2.length;

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

lcs(str1, str2, index1, index2);
