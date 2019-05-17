/*
 * @title: Generate valid parenthesis
 * @description: Generate valid parenthesis combinations
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function generateParenthesis(n) {
  const result = [];

  function generate(current, open, close, n) { // eslint-disable-line
    if (current.length === n * 2) {
      result.push(current);
      return;
    }

    if (open < n) {
      generate(`${current}(`, open + 1, close, n);
    }
    if (close < open) {
      generate(`${current})`, open, close + 1, n);
    }
  }

  generate('', 0, 0, n);
  return result;
}

// npx jest algorithms/string/string.parenthesis.js
describe('generate parenthesis up to given number', () => {
  test('generateParenthesis()', () => {
    expect(generateParenthesis(3)).toEqual(
      [
        '((()))',
        '(()())',
        '(())()',
        '()(())',
        '()()()',
      ],
    );
  });
});
