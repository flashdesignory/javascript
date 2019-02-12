/*
 * @title: validate suffix exits in word
 * @description: //
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function confirmEnding1(string, target) {
  if (string.substr(-target.length) === target) {
    return true;
  }
  return false;
}

function confirmEnding2(string, target) {
  let index1 = string.length - 1;
  let index2 = target.length - 1;

  while (index1 >= 0 && index2 >= 0) {
    if (string[index1] === target[index2]) {
      index1--;
      index2--;
    } else {
      return false;
    }
  }
  return true;
}

// npx jest algorithms/string/string.validSuffix.js
describe('validate suffix of word', () => {
  test('confirmEnding1()', () => {
    expect(confirmEnding1('Bastian', 'n')).toBe(true);
    expect(confirmEnding1('Open sesame', 'same')).toBe(true);
    expect(confirmEnding1('Open sesame', 'pen')).toBe(false);
  });
  test('confirmEnding2()', () => {
    expect(confirmEnding2('Bastian', 'n')).toBe(true);
    expect(confirmEnding2('Open sesame', 'same')).toBe(true);
    expect(confirmEnding2('Open sesame', 'pen')).toBe(false);
  });
});
