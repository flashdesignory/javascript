/*
 * @title: Traverse Matrix
 * @description: Diagonal Traversal
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function diagonal(matrix) {
  const length = matrix.length; //eslint-disable-line
  const result = [];

  for (let i = 0; i < length; i++) {
    let row = 0;
    let column = i;
    const output = [];

    while (row < length && column >= 0) {
      output.push(matrix[row][column]);
      row++;
      column--;
    }

    result.push(output);
  }

  for (let i = 1; i < length; i++) {
    let row = i;
    let column = length - 1;
    const output = [];

    while (row < length && column >= 0) {
      output.push(matrix[row][column]);
      row++;
      column--;
    }

    result.push(output);
  }
  return result;
}

function diagonal2(matrix) {
  const length = matrix.length; //eslint-disable-line
  const result = [];

  for (let i = 0; i < length; i++) {
    let row = i;
    let column = 0;
    const output = [];

    while (row >= 0 && column < length) {
      output.push(matrix[row][column]);
      row--;
      column++;
    }

    result.push(output);
  }

  for (let i = 1; i < length; i++) {
    let row = length - 1;
    let column = i;
    const output = [];

    while (row >= 0 && column < length) {
      output.push(matrix[row][column]);
      row--;
      column++;
    }

    result.push(output);
  }

  return result;
}

// npx jest algorithms/matrix/matrix.traverse.diagonal.js
test('diagonal()', () => {
  const matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ];
  expect(diagonal(matrix)).toEqual(
    [
      [1],
      [2, 5],
      [3, 6, 9],
      [4, 7, 10, 13],
      [8, 11, 14],
      [12, 15],
      [16],
    ],
  );
});

test('diagonal2()', () => {
  const matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ];
  expect(diagonal2(matrix)).toEqual(
    [
      [1],
      [5, 2],
      [9, 6, 3],
      [13, 10, 7, 4],
      [14, 11, 8],
      [15, 12],
      [16],
    ],
  );
});
