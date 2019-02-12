/*
 * @title: String sequence
 * @description: longest sequence of repeating characters
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

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
  test("longestSubSequenceRepeating1('aabebcdd')", () => {
    expect(longestSubSequenceRepeating1('aabebcdd')).toEqual(3);
  });
  test("longestSubSequenceRepeating2('aabebcdd')", () => {
    expect(longestSubSequenceRepeating2('aabebcdd')).toEqual(3);
  });
});
