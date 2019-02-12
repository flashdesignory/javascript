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
      let a; let
        b;
      switch (index) {
        case 0:
          a = Number(stack.pop());
          b = Number(stack.pop());
          stack.push(a + b);
          break;
        case 1:
          a = Number(stack.pop());
          b = Number(stack.pop());
          stack.push(b - a);
          break;
        case 2:
          a = Number(stack.pop());
          b = Number(stack.pop());
          stack.push(a * b);
          break;
        case 3:
          a = Number(stack.pop());
          b = Number(stack.pop());
          stack.push(b / a);
          break;
        default:
      }
    }
  }
  console.log(stack);
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
