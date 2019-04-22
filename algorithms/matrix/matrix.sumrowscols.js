/*
 * @title: Matrix sum
 * @description: sum of each row / column
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function traverseMatrix(matrix) {
  let rowCount = 0;
  let columnCount = 0;
  const result = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < matrix[row].length; column++) {
      rowCount += matrix[row][column]; // sum of each row;
      columnCount += matrix[column][row]; // sum of each column;
    }
    // console.log(`row: ${rowCount}, column: ${columnCount}`);
    result.push({ row: rowCount, column: columnCount });
    rowCount = 0;
    columnCount = 0;
  }

  return result;
}

// npx jest algorithms/matrix/matrix.sumrowscols.js
test('matrix traversal', () => {
  const matrix = [[1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35, 36]];

  expect(traverseMatrix(matrix)).toEqual([
    { row: 21, column: 96 },
    { row: 57, column: 102 },
    { row: 93, column: 108 },
    { row: 129, column: 114 },
    { row: 165, column: 120 },
    { row: 201, column: 126 },
  ]);
});
