/*
 * @title: 01 Matrix
 * @description: Given a matrix consists of 0 and 1,
 * find the distance of the nearest 0 for each cell.
 * The distance between two adjacent cells is 1.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Queue {
  constructor() {
    this.data = {};
    this.first = 0;
    this.last = 0;
  }

  enqueue(value) {
    this.data[this.last] = value;
    this.last++;
  }

  dequeue() {
    const temp = this.data[this.first];
    delete this.data[this.first];
    this.first++;
    return temp;
  }

  peek() {
    return this.data[this.first];
  }

  empty() {
    return this.first === this.last;
  }

  print() {
    const result = [];
    Object.values(this.data).forEach((value) => {
      result.push(value);
    });
    return result;
  }
}

function isValid(row, column, rowLength, columnLength) {
  return row >= 0 && row < rowLength && column >= 0 && column < columnLength;
}

const rowNum = [-1, 0, 0, 1]; // results in left and right
const colNum = [0, -1, 1, 0]; // results in top and bottom

const updateMatrix = function (matrix) {
  const visited = [];
  for (let i = 0; i < matrix.length; i++) {
    visited[i] = [];
    for (let j = 0; j < matrix[i].length; j++) {
      visited[i][j] = false;
    }
  }

  const queue = new Queue();
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        queue.enqueue({ row: i, column: j });
        visited[i][j] = true;
      }
    }
  }

  while (!queue.empty()) {
    const current = queue.dequeue();
    const row = current.row; // eslint-disable-line
    const column = current.column; // eslint-disable-line

    for (let i = 0; i < 4; i++) {
      const nextRow = row + rowNum[i];
      const nextColumn = column + colNum[i];

      if (isValid(nextRow, nextColumn, matrix.length, matrix[0].length)
          && !visited[nextRow][nextColumn] && matrix[nextRow][nextColumn] !== 0) {
        matrix[nextRow][nextColumn] = matrix[row][column] + 1;
        queue.enqueue({ row: nextRow, column: nextColumn });
        visited[nextRow][nextColumn] = true;
      }
    }
  }

  return matrix;
};

// npx jest algorithms/matrix/matrix.zeroone.js
test('updateMatrix()', () => {
  const input = [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
  ];

  expect(updateMatrix(input)).toEqual(
    [
      [0, 0, 0],
      [0, 1, 0],
      [1, 2, 1],
    ],
  );
});
