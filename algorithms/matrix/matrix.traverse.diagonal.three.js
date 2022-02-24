/*
 * @title: Traverse Matrix Diagonal
 * @description: Diagonal Traversal Snake
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function diagonalSnake(matrix) {
  const result = [];

  const numRows = matrix.length;
  const numColumns = matrix[0].length;

  let leftIndex = 0;
  let rightIndex = numColumns - 1;
  let topIndex = 0;
  let bottomIndex = numRows - 1;

  while (topIndex <= bottomIndex && leftIndex <= rightIndex) {
    // top
    for (let i = leftIndex; i <= rightIndex; i++) {
      result.push(matrix[topIndex][i]);
    }
    topIndex++;
    // right
    for (let i = topIndex; i <= bottomIndex; i++) {
      result.push(matrix[i][rightIndex]);
    }
    rightIndex--;
    // bottom
    if (topIndex <= bottomIndex) {
      for (let i = rightIndex; i >= leftIndex; i--) {
        result.push(matrix[bottomIndex][i]);
      }
    }
    bottomIndex--;
    // left
    if (leftIndex <= rightIndex) {
      for (let i = bottomIndex; i >= topIndex; i--) {
        result.push(matrix[i][leftIndex]);
      }
    }
    leftIndex++;
  }

  return result;
}

// npx jest algorithms/matrix/matrix.traverse.diagonal.three.js
test('diagonalSnake()', () => {
  const input = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  expect(diagonalSnake(input)).toEqual([1, 2, 3, 6, 9, 8, 7, 4, 5]);
});
