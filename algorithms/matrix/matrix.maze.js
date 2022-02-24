/*
 * @title: Matrix Maze
 * @description: Rat in a maze
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function isValid(row, column, numRows, numCols) {
  return row >= 0 && row < numRows && column >= 0 && column < numCols;
}

function dfs(matrix, row, column, visited) {
  if (row === matrix.length - 1
    && column === matrix[0].length - 1) {
    visited[row][column] = true;
    return true;
  }

  if (isValid(row, column, matrix.length, matrix[0].length) && matrix[row][column]) {
    visited[row][column] = true;

    if (dfs(matrix, row + 1, column, visited)) {
      return true;
    }

    if (dfs(matrix, row, column + 1, visited)) {
      return true;
    }

    visited[row][column] = false;
    return false;
  }

  return false;
}


function maze(matrix) {
  const visited = [];
  for (let i = 0; i < matrix.length; i++) {
    visited[i] = [];
    for (let j = 0; j < matrix[i].length; j++) {
      visited[i][j] = false;
    }
  }

  const result = dfs(matrix, 0, 0, visited);
  console.log(visited);
  return result;
}

// npx jest algorithms/matrix/matrix.maze.js
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
