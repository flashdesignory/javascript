/*
 * @title: url encode string
 * @description: replace ' ' (space) with %20
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function urlify(str) {
  // str = str.trim();
  while (str.substr(0, 1) === ' ') {
    str = str.substr(1);
  }

  while (str.substr(str.length - 1) === ' ') {
    str = str.substr(0, str.length - 1);
  }

  let spaceCount = 0;
  const replacement = '%20';
  const strLength = str.length - 1;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      spaceCount++;
    }
  }


  const newLength = spaceCount * replacement.length - 1 + strLength;
  let index = newLength - 1;
  const chars = [];

  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] === ' ') {
      chars[index] = '0';
      chars[index - 1] = '2';
      chars[index - 2] = '%';
      index -= 3;
    } else {
      chars[index] = str[i];
      index--;
    }
  }

  return chars.join('');
}

// npx jest algorithms/string.urlencode.js
test('urlify()', () => {
  expect(urlify('Mr John Smith')).toEqual('Mr%20John%20Smith');
});
