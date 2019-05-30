/*
 * @title: Reverse Polish Notation
 * @description: reverse polish notation example
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function reversePolishNotation(arr) {
  if (arr.length <= 2) {
    return null;
  }

  const operands = ['+', '-', '*', '/'];
  const stack = [];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const index = operands.indexOf(item);
    if (index < 0) {
      stack.push(arr[i]);
    } else {
      const a = parseInt(stack.pop(), 10);
      const b = parseInt(stack.pop(), 10);
      switch (index) {
        case 0:
          stack.push(b + a);
          break;
        case 1:
          stack.push(b - a);
          break;
        case 2:
          stack.push(b * a);
          break;
        case 3:
          stack.push(b / a);
          break;
        default:
      }
    }
  }
  return parseInt(stack[0], 10);
}

// npx jest algorithms/number/number.rpn.js
describe('reverse polish notation', () => {
  test('reversePolishNotation()', () => {
    expect(reversePolishNotation(['2', '1', '+', '3', '*'])).toEqual(9);
  });
  test('reversePolishNotation()', () => {
    expect(reversePolishNotation(['4', '13', '5', '/', '+'])).toEqual(6);
  });
  test('reversePolishNotation()', () => {
    expect(reversePolishNotation(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'])).toEqual(22);
  });
});
