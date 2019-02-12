/*
 * @title: String sequence
 * @description: longest sequence of non-repeating characters
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */


function longestSubSequence(str) {
  const seen = {};
  let count = 0;
  let max = 0;

  for (let i = 0; i < str.length; i++) {
    const current = str[i];
    if (!seen[current]) {
      count++;
      seen[current] = true;
      max = Math.max(max, count);
    } else {
      count = 1;
    }
  }

  return max;
}

// npx jest algorithms/string/string.sequence.norepeat.js
describe('longest string sequence', () => {
  test("longestSubSequence('obamacare')", () => {
    expect(longestSubSequence('obamacare')).toEqual(4);
  });
  test("longestSubSequence('bbb')", () => {
    expect(longestSubSequence('bbb')).toEqual(1);
  });
  test("longestSubSequence('pwwke')", () => {
    expect(longestSubSequence('pwwke')).toEqual(3);
  });
  test("longestSubSequence('abcabcbb')", () => {
    expect(longestSubSequence('abcabcbb')).toEqual(3);
  });
  test("longestSubSequence('ABBA')", () => {
    expect(longestSubSequence('ABBA')).toEqual(2);
  });
});
