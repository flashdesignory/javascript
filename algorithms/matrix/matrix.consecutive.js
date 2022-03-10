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

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

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
      && matrix[nextRow][nextColumn] === matrix[row][column] + 1) {
      output.push([nextRow, nextColumn])
      length++;
      length = dfs(matrix, nextRow, nextColumn, visited, length, output);
    }
  }

  visited[row][column] = false;
  return length;
}

const longestConsecutive = (matrix) => {
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
      const points = [[i, j]];
      const length = dfs(matrix, i, j, visited, 1, points);
      if (length > max) {
        max = length;
        maxPoints = [...points];
      }
    }
  }

  console.log(maxPoints);
  return max;
}

// npx jest algorithms/matrix/matrix.consecutive.js
test('longestConsecutive()', () => {
  const matrix = [
    [1, 2, 9],
    [5, 3, 8],
    [4, 6, 7],
  ];
  expect(longestConsecutive(matrix)).toEqual(4);
});
