/*
 * @title: Tic Tac Toe
 * @description: Tic Tac Toe
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function ticTacToeTraversal(matrix) {
  const result = [];
  // left top -> right bottom & right top -> left bottom
  for (let i = 0; i < matrix.length; i++) {
    result.push([matrix[i][i], matrix[i][matrix[i].length - 1 - i]]);
  }
  console.log('***********************');
  // right bottom -> left top & left bottom -> right top
  for (let i = matrix.length - 1; i >= 0; i--) {
    result.push([matrix[i][i], matrix[i][matrix[i].length - 1 - i]]);
  }
  return result;
}

// npx jest algorithms/misc/tictactoe.js
test('matrix ticTacToe traversal', () => {
  const matrix = [[1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35, 36]];
  expect(ticTacToeTraversal(matrix)).toEqual([
    [1, 6],
    [8, 11],
    [15, 16],
    [22, 21],
    [29, 26],
    [36, 31],
    [36, 31],
    [29, 26],
    [22, 21],
    [15, 16],
    [8, 11],
    [1, 6]]);
});
