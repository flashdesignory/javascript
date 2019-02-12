/*
 * @title: String verify brackets
 * @description: simple function to verify closing brackets
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function bracketsAreBalanced(str) {
  const options = '[]{}()';
  const stack = [];
  let i;
  let character;
  let position;

  for (i = 0; i < str.length; i++) {
    character = str[i];
    position = options.indexOf(character);

    if (position === -1) {
      continue; // eslint-disable-line
    }

    if (position % 2 === 0) {
      stack.push(position + 1);
    } else if (stack.pop() !== position) {
      return false;
    }
  }

  return stack.length === 0;
}

// npx jest algorithms/string/string.brackets.js
test('bracketsAreBalanced()', () => {
  expect(bracketsAreBalanced('{}([])')).toBe(true);
  expect(bracketsAreBalanced('{{')).toBe(false);
  expect(bracketsAreBalanced('[(])')).toBe(false);
  expect(bracketsAreBalanced('{}([])')).toBe(true);
  expect(bracketsAreBalanced('([}])')).toBe(false);
  expect(bracketsAreBalanced('([])')).toBe(true);
  expect(bracketsAreBalanced('()[]{}[][]')).toBe(true);
});
