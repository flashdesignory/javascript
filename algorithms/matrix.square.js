/*
 * @title: Maximum Square in Matrix
 * @description: Find the maximum square in matrix
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* const matrix = [
  [0, 1, 1, 0, 1],
  [1, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
];

const result = [
  [0, 1, 1, 0, 1],
  [1, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [1, 1, 2, 2, 0],
  [1, 2, 2, 3, 1],
  [0, 0, 0, 0, 0],
] */

function printMaxSubSquare(matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;
  let maxSize = 0;
  let maxRow = 0; // bottom
  let maxCol = 0; // right

  const sub = [];
  for (let i = 0; i < numRows; i++) {
    sub[i] = [];
  }

  for (let i = 0; i < numCols; i++) {
    sub[0][i] = matrix[0][i];
  }

  for (let i = 0; i < numRows; i++) {
    sub[i][0] = matrix[i][0]; // eslint-disable-line
  }

  for (let i = 1; i < numRows; i++) {
    for (let j = 1; j < numCols; j++) {
      if (matrix[i][j] === 1) {
        sub[i][j] = Math.min(sub[i - 1][j - 1], sub[i - 1][j], sub[i][j - 1]) + 1;
      } else {
        sub[i][j] = 0;
      }
    }
  }

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (sub[i][j] > maxSize) {
        maxSize = sub[i][j];
        maxRow = i;
        maxCol = j;
      }
    }
  }

  for (let i = maxRow; i > maxRow - maxSize; i--) {
    const rowToPrint = [];
    for (let j = maxCol; j > maxCol - maxSize; j--) {
      rowToPrint.push(matrix[i][j]);
    }
    // console.log(rowToPrint);
  }

  // console.log(`size: ${maxSize}, right: ${maxCol}, top: ${maxRow}`);
  return maxSize;
}

// npx jest algorithms/matrix.square.js
test('maximum square of 1 in matrix', () => {
  const matrix = [
    [0, 1, 1, 0, 1],
    [1, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
  ];
  expect(printMaxSubSquare(matrix)).toEqual(3);
});
