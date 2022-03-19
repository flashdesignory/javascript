/*
 * @title: Matrix Maze
 * @description: Rat in a maze
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const directions = [[0, 1], [1, 0]];

const isValid = (row, column, numRows, numColumns) => row >= 0
  && row < numRows
  && column >= 0
  && column < numColumns;

const dfs = (matrix, row, column, visited, output) => {
  visited[row][column] = true;
  if (row === matrix.length - 1
    && column === matrix[0].length - 1) {
    return true;
  }

  let result = false;

  for (let i = 0; i < directions.length; i++) {
    const nextRow = row + directions[i][0];
    const nextColumn = column + directions[i][1];

    if (isValid(nextRow, nextColumn, matrix.length, matrix[0].length)
      && !visited[nextRow][nextColumn]
      && matrix[nextRow][nextColumn]) {
      output.push([nextRow, nextColumn]);
      result = dfs(matrix, nextRow, nextColumn, visited, output);
    }
  }

  visited[row][column] = false;
  return result;
};

const maze = (matrix) => {
  const visited = [];
  for (let i = 0; i < matrix.length; i++) {
    visited[i] = [];
    for (let j = 0; j < matrix[i].length; j++) {
      visited[i][j] = false;
    }
  }

  const points = [[0, 0]];
  const result = dfs(matrix, 0, 0, visited, points);
  console.log(points);
  return result;
};

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
