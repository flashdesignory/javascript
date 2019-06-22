/*
 * @title: String rotation
 * @description: check if string is rotation of another
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function isStringRotation1(str1, str2) {
  if (str1.length !== str2.length) return false;
  const temp = str1.concat(str1);
  if (temp.indexOf(str2) === -1) return false;
  return true;
}

function isStringRotation2(str1, str2) {
  if (str1.length !== str2.length) return false;

  const chars = str1.split('');

  for (let i = 0; i < chars.length - 1; i++) {
    chars.push(chars.shift());
    const current = chars.join('');
    if (current === str2) return true;
  }

  return false;
}

function isStringRotation3(str1, str2) {
  for (let i = 0; i < str1.length; i++) {
    const part1 = str1.substring(0, i);
    const part2 = str1.substring(i);
    if (part2 + part1 === str2) return true;
  }

  return false;
}

// npx jest algorithms/string/string.rotation.js
test('isStringRotation1()', () => {
  expect(isStringRotation1('waterbottle', 'rbottlewate')).toBe(true);
});
test('isStringRotation2()', () => {
  expect(isStringRotation2('waterbottle', 'rbottlewate')).toBe(true);
});
test('isStringRotation3()', () => {
  expect(isStringRotation3('waterbottle', 'rbottlewate')).toBe(true);
});
