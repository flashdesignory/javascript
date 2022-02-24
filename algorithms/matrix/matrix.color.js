/*
 * @title: PaintFill
 * @description: change value or color in matrix
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const rowOptions = [-1, 0, 0, 1];
const colOptions = [0, -1, 1, 0];

function isValid(row, column, numRows, numCols) {
  return row >= 0 && row < numRows && column >= 0 && column < numCols;
}

function dfs(matrix, row, column, origValue, newValue) {
  matrix[row][column] = newValue;
  for (let i = 0; i < 4; i++) {
    const newRow = row + rowOptions[i];
    const newColumn = column + colOptions[i];

    if (isValid(newRow, newColumn, matrix.length, matrix[0].length)
      && matrix[newRow][newColumn] === origValue) {
      dfs(matrix, newRow, newColumn, origValue, newValue);
    }
  }
}

function paintFill(matrix, point, value) {
  const originalValue = matrix[point.row][point.column];
  if (originalValue === value) return matrix;

  dfs(matrix, point.row, point.column, originalValue, value);
  return matrix;
}

// npx jest algorithms/matrix/matrix.color.js
test('paintFill()', () => {
  const matrix = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 1, 1],
    [3, 3, 3, 2, 2, 2, 1],
    [1, 1, 2, 2, 2, 3, 3],
    [1, 1, 1, 1, 3, 3, 3],
  ];
  expect(paintFill(matrix, { row: 4, column: 4 }, 5)).toEqual(
    [[1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 1, 1],
      [3, 3, 3, 2, 2, 2, 1],
      [1, 1, 2, 2, 2, 5, 5],
      [1, 1, 1, 1, 5, 5, 5]],
  );
});
