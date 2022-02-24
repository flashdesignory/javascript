/*
 * @title: Matrix Consecutive Path
 * @description: find longest consecutive path
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* Given a n*n matrix where all numbers are distinct,
 find the maximum length path (starting from any cell)
 such that all cells along the path are in increasing
 order with a difference of 1.

 We can move in 4 directions from a given cell (i, j),
 i.e., we can move to (i+1, j) or (i, j+1) or (i-1, j) or (i, j-1)
 with the condition that the adjacent cells have a difference of 1.
*/

const rowNum = [-1, 0, 0, 1]; // results in left and right
const colNum = [0, -1, 1, 0]; // results in top and bottom

function isValid(row, column, rowLength, columnLength) {
  return row >= 0 && row < rowLength && column >= 0 && column < columnLength;
}

function dfs(matrix, row, column, visited, length, output) {
  visited[row][column] = true;
  for (let i = 0; i < 4; i++) {
    const nextRow = row + rowNum[i];
    const nextCol = column + colNum[i];

    if (isValid(nextRow, nextCol, matrix.length, matrix[0].length)
      && (!visited[nextRow][nextCol]
      && matrix[row][column] + 1 === matrix[nextRow][nextCol])) {
      output.push(matrix[nextRow][nextCol]);
      length++;
      length = dfs(matrix, nextRow, nextCol, visited, length, output);
    }
  }

  visited[row][column] = false;
  return length;
}

function findLongestPath(matrix) {
  const visited = [];

  for (let i = 0; i < matrix.length; i++) {
    visited[i] = [];
    for (let j = 0; j < matrix[i].length; j++) {
      visited[i][j] = false;
    }
  }

  let maxLength = 1;
  let maxPoints = [];
  let tempPoints = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      tempPoints = [matrix[i][j]];
      const length = dfs(matrix, i, j, visited, 1, tempPoints);
      if (length > maxLength) {
        maxLength = length;
        maxPoints = [...tempPoints];
      }
    }
  }
  console.log(maxPoints);
  return maxLength;
}

// npx jest algorithms/matrix/matrix.consecutive.js
test('findLongestPath()', () => {
  const matrix = [
    [1, 2, 9],
    [5, 3, 8],
    [4, 6, 7],
  ];
  expect(findLongestPath(matrix)).toEqual(4);
});
