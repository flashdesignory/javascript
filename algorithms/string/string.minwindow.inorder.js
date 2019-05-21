/*
 * @title: min window
 * @description: find all chars in order
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* Given strings S and T, find the minimum (contiguous) substring W of S,
 * so that T is a subsequence of W.
 * If there is no such window in S that covers all characters in T,
 * return the empty string "". If there are multiple such minimum-length
 * windows, return the one with the left-most starting index.
 *
 * Input: S = "abcdebdde", T = "bde"
 * Output: "bcde"
 * Explanation:
 * "bcde" is the answer because it occurs before "bdde" which has the same length.
 * "deb" is not a smaller window because the elements of T in the window must occur in order.
*/

// sliding window - dynamic size
function minWindow(s, t) {
  let result = '';

  let sIndex = 0;
  let tIndex = 0;
  const sLength = s.length;
  const tLength = t.length;

  let minLength = Infinity;

  while (sIndex < sLength) {
    if (s[sIndex] === t[tIndex]) {
      if (tIndex === tLength - 1) {
        const end = sIndex + 1;

        while (tIndex >= 0) {
          if (s[sIndex] === t[tIndex]) {
            tIndex--;
          }
          sIndex--;
        }

        sIndex++;

        if (end - sIndex < minLength) {
          minLength = end - sIndex;
          result = s.substring(sIndex, end);
        }
      }
      tIndex++;
    }
    sIndex++;
  }

  return minLength === Infinity ? '' : result;
}

// npx jest algorithms/string/string.minwindow.inorder.js
test('minWindow()', () => {
  expect(minWindow('abcdebdde', 'bde')).toEqual('bcde');
});
