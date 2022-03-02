/*
 * @title: Matrix word search
 * @description: Find words from dictionary in matrix
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
Given an m x n grid of characters board and a string word, return true if word exists in the grid.
The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are
horizontally or vertically neighboring. The same letter cell may not be used more than once.
*/

const rowNums = [-1, 0, 0, 1];
const colNums = [0, -1, 1, 0];

function isValid(row, column, numRows, numCols) {
  return row >= 0 && row < numRows && column >= 0 && column < numCols;
}

function dfs(matrix, row, column, visited, word, output) {
  output += matrix[row][column];
  if (output === word) {
    return true;
  }

  visited[row][column] = true;
  let result = false;

  for (let i = 0; i < 4; i++) {
    const nextRow = row + rowNums[i];
    const nextCol = column + colNums[i];

    if (isValid(nextRow, nextCol, matrix.length, matrix[0].length)
       && !visited[nextRow][nextCol] && matrix[nextRow][nextCol] === word[output.length]) {
      result = dfs(matrix, nextRow, nextCol, visited, word, output);
      if (result) return true;
    }
  }

  visited[row][column] = false;
  return result;
}

function findWord(board, word) {
  if (board.length === 0) return false;
  if (word.length === 0) return false;

  const visited = [];
  for (let i = 0; i < board.length; i++) {
    visited[i] = [];
    for (let j = 0; j < board[i].length; j++) {
      visited[i][j] = false;
    }
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (!visited[i][j] && board[i][j] === word[0]) {
        const result = dfs(board, i, j, visited, word, '');
        if (result) return true;
      }
    }
  }

  return false;
}

// npx jest algorithms/matrix/matrix.wordsearch.one.js
test('findWord()', () => {
  const words = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ];
  const word = 'ABCCED';

  expect(findWord(words, word)).toBeTruthy();
});
