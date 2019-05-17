/*
 * @title: Order log files
 * @description: You have an array of logs.
 * Each log is a space delimited string of words.
 * For each log, the first word in each log is an alphanumeric identifier.  Then, either:

    Each word after the identifier will consist only of lowercase letters, or;
    Each word after the identifier will consist only of digits.

 * Reorder the logs so that all of the letter-logs come before any digit-log.
 * The letter-logs are ordered lexicographically ignoring identifier,
 * with the identifier used in case of ties.
 * The digit-logs should be put in their original order.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function compare(a, b) {
  let startIndex = a.indexOf(' ');
  const aString = a.substring(startIndex + 1);
  startIndex = b.indexOf(' ');
  const bString = b.substring(startIndex + 1);
  const cmp = aString.localeCompare(bString);
  return cmp === 0 ? a.localeCompare(b) : cmp;
}

function reorderLogFiles(logs) {
  const letters = [];
  const digits = [];

  for (let i = 0; i < logs.length; i++) {
    const current = logs[i];
    const charCode = current.charCodeAt(current.length - 1);
    if (charCode <= 57 && charCode >= 48) {
      digits.push(current);
    } else {
      letters.push(current);
    }
  }

  letters.sort(compare);
  return [...letters, ...digits];
}

// npx jest algorithms/misc/logfiles.js
describe('order log files', () => {
  test('reorderLogFiles()', () => {
    const input = ['a1 9 2 3 1', 'g1 act car', 'zo4 4 7', 'ab1 off key dog', 'a8 act zoo', 'a2 act car'];
    const result = ['a2 act car', 'g1 act car', 'a8 act zoo', 'ab1 off key dog', 'a1 9 2 3 1', 'zo4 4 7'];
    expect(reorderLogFiles(input)).toEqual(result);
  });
});
