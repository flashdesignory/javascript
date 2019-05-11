/*
 * @title: TopLeftRightBottom
 * @description: min sum top left to right bottom;
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// tabulation
function minPathSum(matrix) {
  if (!matrix || matrix[0].length === 0) return 0;

  const numRows = matrix.length;
  const numCols = matrix[0].length;

  for (let i = 1; i < numCols; i++) {
    matrix[0][i] += matrix[0][i - 1];
  }

  for (let i = 1; i < numRows; i++) {
    matrix[i][0] += matrix[i - 1][0];
  }

  for (let i = 1; i < numRows; i++) {
    for (let j = 1; j < numCols; j++) {
      matrix[i][j] = Math.min(
        matrix[i][j] + matrix[i - 1][j],
        matrix[i][j] + matrix[i][j - 1],
      );
    }
  }

  return matrix[numRows - 1][numCols - 1];
}

// npx jest algorithms/matrix/matrix.tlrb.minsum.js
test('min sum top left right bottom', () => {
  const matrix = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ];
  expect(minPathSum(matrix)).toEqual(7);
});
