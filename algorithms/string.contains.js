/*
 * @title: String contains substring
 * @description: simple function to find a substring
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function contains(str, sub) {
  const subLength = sub.length;
  let currentLength = 0;
  let start = 0;
  let i = 0;

  while (i < str.length) {
    if (str[i] === sub[currentLength]) {
      currentLength++;
      if (currentLength === subLength) {
        console.log(`found: ${start}, ${currentLength}, ${str.substr(start, currentLength)}`);
        return true;
      }
    } else {
      if (currentLength > 0) i = start + 1;
      currentLength = 0;
      start = i + 1;
    }

    i++;
  }
  return false;
}

// npx jest algorithms/string.contains.js
test('contains()', () => {
  expect(contains('geeksforgeeks', 'for')).toBe(true);
  expect(contains('jkflsioijljl', 'jkfl')).toBe(true);
  expect(contains('fooballs', 'arg')).toBe(false);
  expect(contains('abbcdabbbbbck', 'ab')).toBe(true);
  expect(contains('abbcdabbbbbck', 'bck')).toBe(true);
  expect(contains('abbcdabbbbbck', 'bbbck')).toBe(true);
  expect(contains('abbcdabbbbbck', 'cdabb')).toBe(true);
  expect(contains('abbcdabbbbbck', 'bbbb')).toBe(true);
});
