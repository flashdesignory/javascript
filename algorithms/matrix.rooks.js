/*
 * @title: Rooks are safe?
 * @description: check sum of rows/cols for rooks
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const board = [
  [0, 0, 0, 1],
  [0, 0, 1, 0],
  [0, 0, 0, 0],
  [1, 0, 0, 0],
];

function rooksAreSafe(matrix) {
// NxN board
  const numRows = matrix.length;
  const numCols = numRows;

  let sumRows = 0;
  let sumCols = 0;

  for (let i = 0; i < numRows; i++) {
    sumRows = 0; // reset for each row
    for (let j = 0; j < numCols; j++) {
      sumRows += matrix[i][j];
      if (sumRows > 1) return false;
    }
    console.log(sumRows);
  }

  console.log('******');

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (j === 0) sumCols = 0; // reset for each col
      sumCols += matrix[j][i];
      if (sumCols > 1) return false;
      if (j === numCols - 1) console.log(sumCols);
    }
  }

  return true;
}

rooksAreSafe(board);
