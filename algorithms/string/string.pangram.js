/*
 * @title: Pangram
 * @description:
 * A pangram is a sentence where every letter of the English alphabet appears at least once.
 * Given a string sentence containing only lowercase English letters,
 * return true if sentence is a pangram, or false otherwise.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function pangramOne(s) {
  let remaining = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < s.length; i++) {
    const current = s[i].toLowerCase();
    remaining = remaining.replace(current, '');
    if (remaining.length === 0) return true;
  }

  return false;
}

function pangramTwo(s) {
  const input = s.toLowerCase();
  const abc = 'abcdefghijklmnopqrstuvwxyz';
  let count = 0;
  for (let i = 0; i < abc.length; i++) {
    if (input.indexOf(abc[i]) !== -1) {
      count++;
    }
  }
  return count === abc.length;
}

// npx jest algorithms/string/string.pangram.js
test('pangram()', () => {
  expect(pangramOne('We promptly judged antique ivory buckles for the next prize')).toEqual(true);
  expect(pangramTwo('We promptly judged antique ivory buckles for the next prize')).toEqual(true);

  expect(pangramOne('We promptly judged antique ivory buckles for the prize')).toEqual(false);
  expect(pangramTwo('We promptly judged antique ivory buckles for the prize')).toEqual(false);
});
