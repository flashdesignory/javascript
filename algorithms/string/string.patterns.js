/*
 * @title: find substring in sentence
 * @description: Simple function find substring / patterns
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function numPattern(word, pattern) {
  const wordLength = word.length;
  const patternLength = pattern.length;
  let wordIndex = 0;
  let patternIndex = 0;
  let start = 0;
  let count = 0;

  while (wordIndex < wordLength) {
    if (word[wordIndex] === pattern[patternIndex]) {
      patternIndex++;
      wordIndex++;
      if (patternIndex === patternLength) {
        // console.log(`found at: ${wordIndex - patternLength}`);
        patternIndex = 0;
        count++;
        start++;
        wordIndex = start;
        // console.log(`next start: ${start}`);
      }
    } else {
      start++;
      wordIndex = start;
    }
  }
  return count;
}

// npx jest algorithms/string.patterns.js
test('numPattern()', () => {
  expect(numPattern('AAAAAAAAAAAAAAAAAB', 'AAAAB')).toEqual(1);
});
test('numPattern()', () => {
  expect(numPattern('AAAAAAAABAAAAAAAAB', 'AAAAB')).toEqual(2);
});
test('numPattern()', () => {
  expect(numPattern('lorie loled', 'lol')).toEqual(1);
});
test('numPattern()', () => {
  expect(numPattern('AABAACAADAABAABA', 'AABA')).toEqual(3);
});
