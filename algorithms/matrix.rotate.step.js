/*
 * @title: Rotate Matrix
 * @description: rotate matrix by one step
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function rotateOneStep(matrix) {
  let topIndex = 0;
  let leftIndex = 0;
  let bottomIndex = matrix.length;
  let rightIndex = matrix.length;

  let prev = null;
  let curr = null;

  while (topIndex < bottomIndex && leftIndex < rightIndex) {
    prev = matrix[topIndex + 1][leftIndex];

    /* Move elements of first row from the remaining rows */
    for (let i = leftIndex; i < rightIndex; i++) {
      curr = matrix[topIndex][i];
      matrix[topIndex][i] = prev;
      prev = curr;
    }
    topIndex++;

    /* Move elements of last column from the remaining columns */
    for (let i = topIndex; i < bottomIndex; i++) {
      curr = matrix[i][rightIndex - 1];
      matrix[i][rightIndex - 1] = prev;
      prev = curr;
    }
    rightIndex--;

    /* Move elements of last row from the remaining rows */
    // if (topIndex < bottomIndex) {
    for (let i = rightIndex - 1; i >= leftIndex; i--) {
      curr = matrix[bottomIndex - 1][i];
      matrix[bottomIndex - 1][i] = prev;
      prev = curr;
    }
    // }
    bottomIndex--;

    /* Move elements of first column from the remaining rows */
    // if (leftIndex < rightIndex)  {
    for (let i = bottomIndex - 1; i >= topIndex; i--) {
      curr = matrix[i][leftIndex];
      matrix[i][leftIndex] = prev;
      prev = curr;
    }
    // }
    leftIndex++;
  }
  return matrix;
}

// npx jest algorithms/matrix.rotate.step.js
describe('rotate matrix by one step', () => {
  it('rotateOneStep()', () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    expect(rotateOneStep(matrix)).toEqual([
      [5, 1, 2, 3],
      [9, 10, 6, 4],
      [13, 11, 7, 8],
      [14, 15, 16, 12],
    ]);
  });
});
