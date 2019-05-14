/*
 * @title: find missing letter
 * @description: find missign letter from alphabet
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function findMissingLetter(str) {
  let previous = str.charCodeAt(0);
  let current = str.charCodeAt(0);
  for (let i = 1; i < str.length; i++) {
    previous = current;
    current = str.charCodeAt(i);
    if (current !== previous + 1) {
      return String.fromCharCode(previous + 1);
    }
  }
  return null;
}

function findMissingLetter2(str) {
  for (let i = 1; i < str.length; i++) {
    const previous = str.charCodeAt(i - 1);
    const current = str.charCodeAt(i);
    if (current - previous > 1) {
      return String.fromCharCode(previous + 1);
    }
  }
  return null;
}

// npx jest algorithms/string/string.missing.js
test('findMissingLetter()', () => {
  expect(findMissingLetter('abce')).toEqual('d');
});
test('findMissingLetter2()', () => {
  expect(findMissingLetter2('abcdefghjklmno')).toEqual('i');
});
