/*
 * @title: Matrix largest Area
 * @description: find largest connected region
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

const isValid = (row, column, numRows, numColumns) => 
  row >= 0 
  && row < numRows 
  && column >= 0 
  && column < numColumns;

const dfs = (matrix, row, column, visited, length, output) => {  
  visited[row][column] = true;
  for (let i = 0; i < directions.length; i++) {
    const nextRow = row + directions[i][0];
    const nextColumn = column + directions[i][1];
    
    if (isValid(nextRow, nextColumn, matrix.length, matrix[0].length)
      && !visited[nextRow][nextColumn]
      && matrix[nextRow][nextColumn] === 1) {
      output.push([nextRow, nextColumn])
      length++;
      length = dfs(matrix, nextRow, nextColumn, visited, length, output);
    }
  }
  
  return length;
}

const largestRegion = (matrix) => {
  const visited = [];
  for (let i = 0; i < matrix.length; i++) {
    visited[i] = [];
    for (let j = 0; j < matrix[i].length; j++) {
      visited[i][j] = false;
    }
  }

  let max = 0;
  let maxPoints = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] && !visited[i][j]) {
        const points = [[i, j]];
        const length = dfs(matrix, i, j, visited, 1, points);
        if (length > max) {
          max = length;
          maxPoints = [...points];
        }
      }
    }
  }

  console.log(maxPoints);
  return max;
}

// npx jest algorithms/matrix/matrix.region.js
test('largestRegion()', () => {
  const matrix = [
    [0, 0, 1, 1, 0],
    [1, 0, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1],
  ];

  expect(largestRegion(matrix)).toEqual(6);
});
