/*
 * @title: Diagonal Traversal
 * @description: Simple diagonal traversal
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function traverseDiagonal(matrix) {
  let step = 0;
  const output = [];
  let result = [];
  // top left -> right bottom
  step = 0;
  result = [];
  for (let i = 0; i < matrix.length; i++) {
    result.push(matrix[i][step]);
    step += 1;
  }
  output.push(result);
  // right bottom -> left top
  step = matrix.length - 1;
  result = [];
  for (let i = matrix.length - 1; i >= 0; i--) {
    result.push(matrix[i][step]);
    step -= 1;
  }
  output.push(result);
  // right top -> left bottom
  step = matrix.length - 1;
  result = [];
  for (let i = 0; i < matrix.length; i++) {
    result.push(matrix[i][step]);
    step -= 1;
  }
  output.push(result);
  // left bottom -> right top
  step = 0;
  result = [];
  for (let i = matrix.length - 1; i >= 0; i--) {
    result.push(matrix[i][step]);
    step += 1;
  }
  output.push(result);
  return output;
}

// npx jest algorithms/matrix/matrix.diagonal.js
describe('various matrix traversals', () => {
  test('matrix diagonal traversal', () => {
    const matrix = [[1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30],
      [31, 32, 33, 34, 35, 36]];

    expect(traverseDiagonal(matrix)).toEqual([
      [1, 8, 15, 22, 29, 36],
      [36, 29, 22, 15, 8, 1],
      [6, 11, 16, 21, 26, 31],
      [31, 26, 21, 16, 11, 6],
    ]);
  });
});
