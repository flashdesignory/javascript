/*
 * @title: String sequence
 * @description: Longest Repeating Subsequence
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// recursive - indexOf
function longestSubSequenceRepeating(str, index) {
  if (index < 0) return 0;
  if (str.indexOf(str[index]) !== index) {
    return longestSubSequenceRepeating(str, index - 1) + 1;
  }
  return longestSubSequenceRepeating(str, index - 1);
}

// recursive - using two pointers
function longestSubSequenceRepeating0(str, index1, index2) {
  if (index1 === 0 || index2 === 0) return 0;
  if (str[index1 - 1] === str[index2 - 1] && index1 !== index2) {
    return 1 + longestSubSequenceRepeating0(str, index1 - 1, index2 - 1);
  }
  return Math.max(
    longestSubSequenceRepeating0(str, index1, index2 - 1),
    longestSubSequenceRepeating0(str, index1 - 1, index2),
  );
}

// map - extra storage
function longestSubSequenceRepeating1(str) {
  const seen = {};

  for (let i = 0; i < str.length; i++) {
    const current = str[i];
    if (!seen[current]) {
      seen[current] = 1;
    } else {
      seen[current]++;
    }
  }

  for (var key in seen) { //eslint-disable-line
    if (seen[key] <= 1) {
      delete seen[key];
    }
  }

  return Object.keys(seen).length;
}

// tabulation
function longestSubSequenceRepeating2(str) {
  const seen = [];
  const length = str.length; //eslint-disable-line

  for (let i = 0; i <= length; i++) {
    seen[i] = [];
    for (let j = 0; j <= length; j++) {
      seen[i][j] = 0;
    }
  }

  for (let i = 1; i <= length; i++) {
    for (let j = 1; j <= length; j++) {
      if (str[i - 1] === str[j - 1] && i !== j) {
        seen[i][j] = 1 + seen[i - 1][j - 1];
      } else {
        seen[i][j] = Math.max(seen[i - 1][j], seen[i][j - 1]);
      }
    }
  }

  return seen[length][length];
}

// npx jest algorithms/string/string.sequence.repeat.js
describe('longest string sequence of repeating chars', () => {
  test("longestSubSequenceRepeating('aabebcdd')", () => {
    const str = 'aabebcdd';
    const index = str.length - 1;
    expect(longestSubSequenceRepeating(str, index)).toEqual(3);
  });
  test("longestSubSequenceRepeating0('aabebcdd')", () => {
    const str = 'aabebcdd';
    const index = str.length;
    expect(longestSubSequenceRepeating0(str, index, index)).toEqual(3);
  });
  test("longestSubSequenceRepeating1('aabebcdd')", () => {
    expect(longestSubSequenceRepeating1('aabebcdd')).toEqual(3);
  });
  test("longestSubSequenceRepeating2('aabebcdd')", () => {
    expect(longestSubSequenceRepeating2('aabebcdd')).toEqual(3);
  });
});
