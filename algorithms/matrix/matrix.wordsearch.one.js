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

const isValid = (row, column, numRows, numColumns) => row >= 0
  && row < numRows
  && column >= 0
  && column < numColumns;

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

const dfs = (matrix, row, column, visited, word, current) => {
  current += matrix[row][column];
  visited[row][column] = true;

  if (current === word) {
    return true;
  }

  let result = false;

  for (let i = 0; i < directions.length; i++) {
    const nextRow = row + directions[i][0];
    const nextCol = column + directions[i][1];

    if (isValid(nextRow, nextCol, matrix.length, matrix[0].length)
       && !visited[nextRow][nextCol]
        && matrix[nextRow][nextCol] === word[current.length]) {
      result = dfs(matrix, nextRow, nextCol, visited, word, current);
      if (result) return true;
    }
  }

  visited[row][column] = false;
  return result;
};

const findWord = (matrix, word) => {
  if (matrix.length === 0) return false;
  if (word.length === 0) return false;

  const visited = [];
  for (let i = 0; i < matrix.length; i++) {
    visited[i] = [];
    for (let j = 0; j < matrix[i].length; j++) {
      visited[i][j] = false;
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (!visited[i][j] && matrix[i][j] === word[0]) {
        const result = dfs(matrix, i, j, visited, word, '');
        if (result) return true;
      }
    }
  }

  return false;
};

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
