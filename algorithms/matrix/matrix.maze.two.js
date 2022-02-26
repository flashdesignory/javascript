/*
 * @title: Matrix Maze
 * @description: Rat in a maze
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const rowNum = [1, 0];
const colNum = [0, 1];

function isValid(row, column, numRows, numCols) {
  return row >= 0 && row < numRows && column >= 0 && column < numCols;
}

function dfs(matrix, row, column, visited) {
  visited[row][column] = true;
  if (row === matrix.length - 1 && column === matrix[0].length - 1) {
    return true;
  }

  let result = false;

  for (let i = 0; i < 2; i++) {
    const nextRow = row + rowNum[i];
    const nextColumn = column + colNum[i];
    if (isValid(nextRow, nextColumn, matrix.length, matrix[0].length)
      && !visited[nextRow][nextColumn] && matrix[nextRow][nextColumn]) {
      result = dfs(matrix, nextRow, nextColumn, visited);
      if (result) return true;
    }
  }

  visited[row][column] = false;
  return result;
}

function maze(matrix) {
  const visited = [];
  for (let i = 0; i < matrix.length; i++) {
    visited[i] = [];
    for (let j = 0; j < matrix[i].length; j++) {
      visited[i][j] = false;
    }
  }

  return dfs(matrix, 0, 0, visited);
}

// npx jest algorithms/matrix/matrix.maze.two.js
describe('maze', () => {
  test('maze()', () => {
    const matrix = [
      [1, 0, 0, 0],
      [1, 1, 0, 1],
      [0, 1, 0, 0],
      [1, 1, 1, 1],
    ];

    expect(maze(matrix)).toBeTruthy();
  });
});
