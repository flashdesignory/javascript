/*
 * @title: Find Common Characters
 * @description: Find Common Characters
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function commonChars(str) {
  let result = str[0].split('');
  for (let i = 1; i < str.length; i++) {
    const current = str[i].split('');
    result = result.filter((char) => {
      const index = current.indexOf(char);
      // return index > -1 ? current[index] = true : false;
      // if character found in current string, replace value with something
      // else so that it doesn't get discovered again;
      if (index > -1) {
        current[index] = 'found';
        return true;
      }
      return false;
    });
  }
  return result;
}

function commonChars2(str) {
  const start = str[0].split('');
  for (let i = 1; i < str.length; i++) {
    const current = str[i].split('');
    const length = start.length; // eslint-disable-line
    for (let j = length - 1; j >= 0; j--) {
      const char = start[j];
      const index = current.indexOf(char);
      if (index === -1) {
        start.splice(j, 1);
      } else {
        current.splice(index, 1);
      }
    }
  }
  return start;
}

// npx jest algorithms/string/string.common.js
test('commonChars()', () => {
  expect(commonChars(['bella', 'label', 'roller'])).toEqual(['e', 'l', 'l']);
});
test('commonChars2()', () => {
  expect(commonChars2(['bella', 'label', 'roller'])).toEqual(['e', 'l', 'l']);
});
