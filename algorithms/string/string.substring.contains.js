/*
 * @title: String contains substring
 * @description: simple function to find a substring
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function containsSubstring1(str, sub) {
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

function containsSubstring2(str, pat) {
  const patternLength = pat.length;
  const strLength = str.length;

  if (pat === '' && str === '') {
    return 0;
  }

  for (let i = 0; i < strLength; i++) {
    if (str.substr(i, patternLength) === pat) {
      return i;
    }
  }
  return -1;
}

// npx jest algorithms/string/string.substring.contains.js
test('containsSubstring1()', () => {
  expect(containsSubstring1('geeksforgeeks', 'for')).toBe(true);
  expect(containsSubstring1('jkflsioijljl', 'jkfl')).toBe(true);
  expect(containsSubstring1('fooballs', 'arg')).toBe(false);
  expect(containsSubstring1('abbcdabbbbbck', 'ab')).toBe(true);
  expect(containsSubstring1('abbcdabbbbbck', 'bck')).toBe(true);
  expect(containsSubstring1('abbcdabbbbbck', 'bbbck')).toBe(true);
  expect(containsSubstring1('abbcdabbbbbck', 'cdabb')).toBe(true);
  expect(containsSubstring1('abbcdabbbbbck', 'bbbb')).toBe(true);
});

test('containsSubstring2()', () => {
  expect(containsSubstring2('geeksforgeeks', 'for')).toEqual(5);
  expect(containsSubstring2('jkflsioijljl', 'jkfl')).toEqual(0);
  expect(containsSubstring2('fooballs', 'arg')).toEqual(-1);
  expect(containsSubstring2('abbcdabbbbbck', 'ab')).toEqual(0);
  expect(containsSubstring2('abbcdabbbbbck', 'bck')).toEqual(10);
  expect(containsSubstring2('abbcdabbbbbck', 'bbbck')).toEqual(8);
  expect(containsSubstring2('abbcdabbbbbck', 'cdabb')).toEqual(3);
  expect(containsSubstring2('abbcdabbbbbck', 'bbbb')).toEqual(6);
});
