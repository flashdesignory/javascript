/*
 * @title: Matrix largest Area
 * @description: find largest connected region
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const matrix = [
  [0, 0, 1, 1, 0],
  [1, 0, 1, 1, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1],
];

const rowNum = [-1, -1, -1, 0, 0, 1, 1, 1];
const colNum = [-1, 0, 1, -1, 1, -1, 0, 1];

function isValid(row, column, rowLength, columnLength) {
  return row >= 0 && row < rowLength && column >= 0 && column < columnLength;
}

function dfs(matrix, r, c, visited, count) {
  visited[r][c] = true;
  for (let i = 0; i < 8; i++) {
    const nextRow = r + rowNum[i];
    const nextCol = c + colNum[i];
    if (isValid(nextRow, nextCol, matrix.length, matrix[0].length)
    && matrix[nextRow][nextCol]
    && !visited[nextRow][nextCol]) {
      count++;
      count = dfs(matrix, nextRow, nextCol, visited, count);
    }
  }
  return count;
}

function largestRegion(matrix) {
  const visited = [];
  for (let r = 0; r < matrix.length; r++) {
    visited[r] = [];
    for (let c = 0; c < matrix[r].length; c++) {
      visited[r][c] = false;
    }
  }

  let result = 0;

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      // matrix[r][c] returns true if value is 1, false if value is 0
      if (matrix[r][c] && !visited[r][c]) {
        const count = dfs(matrix, r, c, visited, 1);
        result = Math.max(result, count);
      }
    }
  }

  return result;
}

console.log(largestRegion(matrix)); // 6
