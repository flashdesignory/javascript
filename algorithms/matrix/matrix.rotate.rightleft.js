/*
 * @title: Rotate Matrix
 * @description: Simple function to rotate matrix
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function rotateRight(matrix) {
  const length = matrix.length - 1;
  const middle = Math.floor(matrix.length / 2);

  for (let i = 0; i < middle; i++) {
    const left = i;
    const right = length - left;

    for (let j = left; j < right; j++) {
      const top = j;
      const bottom = length - top;

      const temp = matrix[left][top];
      // left-top = bottom-left
      matrix[left][top] = matrix[bottom][left];
      // bottom-left = right-bottom
      matrix[bottom][left] = matrix[right][bottom];
      // right-bottom = top-right;
      matrix[right][bottom] = matrix[top][right];
      // top-right = left-top;
      matrix[top][right] = temp;
    }
  }
  return matrix;
}

function rotateLeft(matrix) {
  const length = matrix.length - 1;
  const middle = Math.floor(matrix.length / 2);

  for (let i = 0; i < middle; i++) {
    const left = i;
    const right = length - left;

    for (let j = left; j < right; j++) {
      const top = j;
      const bottom = length - top;

      const temp = matrix[left][top];
      // left-top = top-right;
      matrix[left][top] = matrix[top][right];
      // top-right = right-bottom
      matrix[top][right] = matrix[right][bottom];
      // right-bottom = bottom-left
      matrix[right][bottom] = matrix[bottom][left];
      // bottom-left = left-top
      matrix[bottom][left] = temp;
    }
  }
  return matrix;
}

// npx jest algorithms/matrix/matrix.rotate.rightleft.js
describe('test matrix rotations', () => {
  test('matrix clockwise rotations', () => {
    const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    expect(rotateRight(arr)).toEqual([
      [7, 4, 1], [8, 5, 2], [9, 6, 3],
    ]);
  });

  test('matrix counter clockwise rotations', () => {
    const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    expect(rotateLeft(arr)).toEqual([
      [3, 6, 9], [2, 5, 8], [1, 4, 7],
    ]);
  });
});
