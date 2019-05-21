/*
 * @title: min window
 * @description: find missign letter in string
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* Given a string S and a string T, find the minimum window in S which will
   contain all the characters in T in complexity O(n).
   Input: S = "ADOBECODEBANC", T = "ABC"
   Output: "BANC"
*/

// sliding window - dynamic size
function minWindow(str, pat) {
  const strLength = str.length;
  const patLength = pat.length;

  // pattern has more characters than string
  if (strLength < patLength) return '';

  const strFrequency = {};
  const patFrequency = {};

  // counter to compare against pattern length
  let count = 0;
  //
  let start = 0;
  let minLength = strLength;
  let startIndex = -1;

  // store frequency of each letter in pattern
  for (let i = 0; i < patLength; i++) {
    const current = pat[i];
    patFrequency[current] ? patFrequency[current]++ : patFrequency[current] = 1;
  }

  // store frequency of each letter in string
  for (let i = 0; i < strLength; i++) {
    const current = str[i];
    strFrequency[current] ? strFrequency[current]++ : strFrequency[current] = 1;

    // current is in both frequencies and it's less or equal to pattern frequency
    if (patFrequency[current] !== 0 && strFrequency[current] <= patFrequency[current]) {
      count++;
    }

    // we found a window that contains patter
    if (count === patLength) {
      let first = str[start];
      while (strFrequency[first] > patFrequency[first]
        || !patFrequency[first]) {
        if (strFrequency[first] > patFrequency[first]) {
          strFrequency[first]--;
        }
        start++;
        first = str[start];
      }

      const length = i - start + 1;
      if (minLength >= length) {
        minLength = length;
        startIndex = start;
      }
    }
  }

  if (startIndex === -1) return '';
  return str.substr(startIndex, minLength);
}

// sliding window
function minWindow2(s, t) {
  let result = '';

  const freqMap = {};
  t.split('').forEach(ch => freqMap[ch] = (freqMap[ch] || 0) + 1); // eslint-disable-line

  // number of unique characters in t
  let count = Object.keys(freqMap).length;

  let left = 0;
  let right = -1;

  while (right < s.length) {
    // if count is 0, we have a window with all chars
    if (count === 0) {
      if (!result || right - left + 1 < result.length) {
        result = s.slice(left, right + 1);
      }

      const current = s[left];
      if (freqMap[current] !== undefined) {
        freqMap[current]++;
      }
      if (freqMap[current] > 0) {
        count++;
      }
      left++;
    } else {
      right++;
      const current = s[right];
      if (freqMap[current] !== undefined) {
        freqMap[current]--;
      }
      // decrease count since we have enough of this char
      if (freqMap[current] === 0) {
        count--;
      }
    }
  }
  return result;
}

// npx jest algorithms/string/string.minwindow.js
test('minWindow()', () => {
  expect(minWindow('ADOBECODEBANC', 'ABC')).toEqual('BANC');
});
test('minWindow2()', () => {
  expect(minWindow2('ADOBECODEBANC', 'ABC')).toEqual('BANC');
});
