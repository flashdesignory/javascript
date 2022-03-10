/*
 * @title: Matrix Increasing Path
 * @description: find longest increasing path
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

function isValid(row, column, rowLength, columnLength) {
  return row >= 0 && row < rowLength && column >= 0 && column < columnLength;
}

function dfs(matrix, row, column, visited) {
  let max = 1;
  if (visited[row][column] !== 0) {
    return visited[row][column];
  }
  for (let i = 0; i < 4; i++) {
    const nextRow = row + directions[i][0];
    const nextColumn = column + directions[i][1];
    if (isValid(nextRow, nextColumn, matrix.length, matrix[0].length)
      && matrix[nextRow][nextColumn] > matrix[row][column]) {
      max = Math.max(max, dfs(matrix, nextRow, nextColumn, visited) + 1);
    }
  }
  visited[row][column] = max;
  return max;
}


const longestIncreasingPath = function (matrix) {
  let max = 0;
  const visited = [];
  for (let i = 0; i < matrix.length; i++) {
    visited.push(new Array(matrix[0].length).fill(0));
  }
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      max = Math.max(max, dfs(matrix, i, j, visited));
    }
  }
  return max;
};

// npx jest algorithms/matrix/matrix.increasing.js
test('longestIncreasingPath()', () => {
  const nums = [
    [9, 9, 4],
    [6, 6, 8],
    [2, 1, 1],
  ];
  expect(longestIncreasingPath(nums)).toEqual(4);
  // [1, 2, 6, 9]
});
