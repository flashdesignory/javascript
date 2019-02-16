/*
 * @title: Zero Matrix
 * @description: set rows / cols to 0 if found
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function nullifyRow(matrix, row) {
  for (let j = 0; j < matrix[0].length; j++) {
    matrix[row][j] = 0;
  }
}

function nullifyColumn(matrix, column) {
  for (let i = 0; i < matrix.length; i++) {
    matrix[i][column] = 0;
  }
}

function setZeros(matrix) {
  const rows = [];
  const columns = [];

  for (let i = 0; i < matrix.length; i++) {
    rows[i] = false;
  }
  for (let j = 0; j < matrix[0].length; j++) {
    columns[j] = false;
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        rows[i] = true;
        columns[j] = true;
      }
    }
  }

  for (let i = 0; i < rows.length; i++) {
    if (rows[i]) nullifyRow(matrix, i);
  }

  for (let j = 0; j < columns.length; j++) {
    if (columns[j]) nullifyColumn(matrix, j);
  }

  return matrix;
}

// npx jest algorithms/matrix/matrix.zero.js
it('should set rows and cols to 0 if found', () => {
  const matrix = [
    [1, 0, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ];

  const result = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0],
  ];

  expect(setZeros(matrix)).toEqual(result);
});
