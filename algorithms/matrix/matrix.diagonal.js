const tiles = [[1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29, 30],
  [31, 32, 33, 34, 35, 36]];

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

function traverseDiagonal(matrix) {
  let step = 0;
  const output = [];
  let result = [];
  // top left -> right bottom
  step = 0;
  result = [];
  for (let i = 0; i < matrix.length; i++) {
    result.push(matrix[i][step]);
    step += 1;
  }
  output.push(result);
  // right bottom -> left top
  step = matrix.length - 1;
  result = [];
  for (let i = matrix.length - 1; i >= 0; i--) {
    result.push(matrix[i][step]);
    step -= 1;
  }
  output.push(result);
  // right top -> left bottom
  step = matrix.length - 1;
  result = [];
  for (let i = 0; i < matrix.length; i++) {
    result.push(matrix[i][step]);
    step -= 1;
  }
  output.push(result);
  // left bottom -> right top
  step = 0;
  result = [];
  for (let i = matrix.length - 1; i >= 0; i--) {
    result.push(matrix[i][step]);
    step += 1;
  }
  output.push(result);
  return output;
}

function ticTacToeTraversal(matrix) {
  const result = [];
  // left top -> right bottom & right top -> left bottom
  for (let i = 0; i < matrix.length; i++) {
    result.push([matrix[i][i], matrix[i][matrix[i].length - 1 - i]]);
  }
  console.log('***********************');
  // right bottom -> left top & left bottom -> right top
  for (let i = matrix.length - 1; i >= 0; i--) {
    result.push([matrix[i][i], matrix[i][matrix[i].length - 1 - i]]);
  }
  return result;
}

// npx jest algorithms/matrix/matrix.diagonal.js
describe('various matrix traversals', () => {
  test('matrix traversal', () => {
    expect(traverseMatrix(tiles)).toEqual([
      { row: 21, column: 96 },
      { row: 57, column: 102 },
      { row: 93, column: 108 },
      { row: 129, column: 114 },
      { row: 165, column: 120 },
      { row: 201, column: 126 },
    ]);
  });

  test('matrix diagonal traversal', () => {
    expect(traverseDiagonal(tiles)).toEqual([
      [1, 8, 15, 22, 29, 36],
      [36, 29, 22, 15, 8, 1],
      [6, 11, 16, 21, 26, 31],
      [31, 26, 21, 16, 11, 6],
    ]);
  });

  test('matrix ticTacToe traversal', () => {
    expect(ticTacToeTraversal(tiles)).toEqual([
      [1, 6],
      [8, 11],
      [15, 16],
      [22, 21],
      [29, 26],
      [36, 31],
      [36, 31],
      [29, 26],
      [22, 21],
      [15, 16],
      [8, 11],
      [1, 6]]);
  });
});
