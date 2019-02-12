/*
 * @title: String rotation
 * @description: check if string is rotation of another
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function isStringRotation(str1, str2) {
  if (str1.length !== str2.length) return false;
  const temp = str1.concat(str1);
  if (temp.indexOf(str2) === -1) return false;
  return true;
}

// npx jest algorithms/string/string.rotation.js
test('isStringRotation()', () => {
  expect(isStringRotation('waterbottle', 'rbottlewate')).toBe(true);
});
