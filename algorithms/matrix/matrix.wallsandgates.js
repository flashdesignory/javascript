/*
 * @title: Walls And Gates
 * @description: You are given a m x n 2D grid initialized with these three possible values.
     -1 - A wall or an obstacle.
     0 - A gate.
     INF - Infinity means an empty room
 * Fill each empty room with the distance to its nearest gate.
 * If it is impossible to reach a gate, it should be filled with INF.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Queue {
  constructor() {
    this.storage = {};
    this.first = 0;
    this.last = 0;
  }

  enqueue(value) {
    this.storage[this.last] = value;
    this.last++;
  }

  dequeue() {
    const temp = this.storage[this.first];
    delete this.storage[this.first];
    this.first++;
    return temp;
  }

  empty() {
    return this.first === this.last;
  }
}

function isValid(row, column, rowLength, columnLength) {
  return row >= 0 && row < rowLength && column >= 0 && column < columnLength;
}

const rowNum = [-1, 0, 0, 1]; // results in left and right
const colNum = [0, -1, 1, 0]; // results in top and bottom

function wallsAndGates(matrix) {
  if (matrix.length === 0) return matrix;

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
          && !visited[nextRow][nextColumn] && matrix[nextRow][nextColumn] !== -1
          && matrix[nextRow][nextColumn] !== 0) {
        matrix[nextRow][nextColumn] = matrix[row][column] + 1;
        queue.enqueue({ row: nextRow, column: nextColumn });
        visited[nextRow][nextColumn] = true;
      }
    }
  }

  return matrix;
}

// npx jest algorithms/matrix/matrix.wallsandgates.js
test('wallsAndGates()', () => {
  const board = [
    [1, -1, 0, 1],
    [1, 1, 1, -1],
    [1, -1, 1, -1],
    [0, -1, 1, 1],
  ];

  expect(wallsAndGates(board)).toEqual(
    [
      [3, -1, 0, 1],
      [2, 2, 1, -1],
      [1, -1, 2, -1],
      [0, -1, 3, 4],
    ],
  );
});
