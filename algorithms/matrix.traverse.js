/*
 * @title: Traverse Matrix
 * @description: traverse matrix, alternate col direction
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* output:
    [[ 1, 8, 9,16,17],
     [ 2, 7,10,15,18],
     [ 3, 6,11,14,19],
     [ 4, 5,12,13,20]]
*/

function traverseSnake(numRows, numCols) {
  const matrix = [];
  for (let i = 0; i < numRows; i++) {
    matrix[i] = [];
  }

  let count = 1;

  for (let i = 0; i < numCols; i++) {
    if (i % 2) {
      for (let j = numRows - 1; j >= 0; j--) {
        matrix[j][i] = count++;
      }
    } else {
      for (let j = 0; j < numRows; j++) {
        matrix[j][i] = count++;
      }
    }
  }

  return matrix;
}

// npx jest algorithms/matrix.traverse.js
test('traverseSnake()', () => {
  expect(traverseSnake(4, 5)).toEqual(
    [[1, 8, 9, 16, 17],
      [2, 7, 10, 15, 18],
      [3, 6, 11, 14, 19],
      [4, 5, 12, 13, 20],
    ],
  );
});
