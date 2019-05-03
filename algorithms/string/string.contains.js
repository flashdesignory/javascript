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

function find(str, pat) {
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

// npx jest algorithms/string/string.contains.js
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

test('find()', () => {
  expect(find('geeksforgeeks', 'for')).toEqual(5);
  expect(find('jkflsioijljl', 'jkfl')).toEqual(0);
  expect(find('fooballs', 'arg')).toEqual(-1);
  expect(find('abbcdabbbbbck', 'ab')).toEqual(0);
  expect(find('abbcdabbbbbck', 'bck')).toEqual(10);
  expect(find('abbcdabbbbbck', 'bbbck')).toEqual(8);
  expect(find('abbcdabbbbbck', 'cdabb')).toEqual(3);
  expect(find('abbcdabbbbbck', 'bbbb')).toEqual(6);
});
