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
  let rowHasZero = false;
  let colHasZero = false;

  for (let j = 0; j < matrix[0].length; j++) {
    if (matrix[0][j] === 0) {
      rowHasZero = true;
      break;
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][0] === 0) {
      colHasZero = true;
      break;
    }
  }

  for (let i = 1; i < matrix.length; i++) {
    for (let j = 1; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  for (let i = 1; i < matrix.length; i++) {
    if (matrix[i][0] === 0) {
      nullifyRow(matrix, i);
    }
  }

  for (let j = 1; j < matrix[0].length; j++) {
    if (matrix[0][j] === 0) {
      nullifyColumn(matrix, j);
    }
  }

  if (rowHasZero) {
    nullifyRow(matrix, 0);
  }

  if (colHasZero) {
    nullifyColumn(matrix, 0);
  }

  return matrix;
}

// npx jest algorithms/matrix/matrix.zero2.js
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
