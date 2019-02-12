/*
 * @title: Count Negative Matrix
 * @description: find all negative cells
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function countNegativeTiles(matrix) {
  let row = 0;
  let col = matrix[0].length - 1;
  let count = 0;

  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] < 0) {
      count += (col + 1);
      row++;
      if (matrix[row]) { // go down a row and go left if already negative
        while (matrix[row][col] < 0) {
          col++;
        }
      }
    } else {
      col--;
    }
  }
  return count;
}

// npx jest algorithms/matrix/matrix.negative.js
test('countNegativeTiles()', () => {
  const tiles = [
    [-4, -3, -1, 1],
    [-2, -2, 1, 2],
    [-1, 1, 2, 3],
    [0, 1, 2, 3],
  ];
  expect(countNegativeTiles(tiles)).toEqual(6);
});
