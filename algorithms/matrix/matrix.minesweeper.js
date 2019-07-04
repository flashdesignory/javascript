/*
 * @title: Matrix Minesweeper
 * @description: simple logic
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

const rowNum = [-1, -1, -1, 0, 1, 1, 1, 0];
const colNum = [-1, 0, 1, 1, 1, 0, -1, -1];

function isValid(row, column, numRows, numCols) {
  return row >= 0 && row < numRows && column >= 0 && column < numCols;
}

function mineSweeper(matrix, position) {
  const [row, column] = position;
  if (matrix[row][column] === 'M') {
    matrix[row][column] = 'X';
    return matrix;
  }

  const numRows = matrix.length;
  const numColumns = matrix[0].length;
  const queue = new Queue();
  queue.enqueue(position);

  while (!queue.empty()) {
    const [currentRow, currentColumn] = queue.dequeue();

    // Count the adjacent mines
    let count = 0;
    for (let index = 0; index < 8; index++) {
      const nextRow = currentRow + rowNum[index];
      const nextColumn = currentColumn + colNum[index];

      if (isValid(nextRow, nextColumn, numRows, numColumns) && matrix[nextRow][nextColumn] === 'M') {
        count++;
      }
    }

    if (count > 0) {
      // If an empty square ('E') with at least one adjacent mine is revealed,
      // then change it to a digit ('1' to '8') representing the number of adjacent mines.
      matrix[currentRow][currentColumn] = `${count}`;
    } else {
      // If an empty square ('E') with no adjacent mines is revealed,
      // then change it to revealed blank ('B')
      // and all of its adjacent unrevealed squares should be revealed recursively.
      matrix[currentRow][currentColumn] = 'B';

      for (let index = 0; index < 8; index++) {
        const nextRow = currentRow + rowNum[index];
        const nextColumn = currentColumn + colNum[index];

        if (isValid(nextRow, nextColumn, numRows, numColumns) && matrix[nextRow][nextColumn] === 'E') {
          queue.enqueue([nextRow, nextColumn]);
          matrix[nextRow][nextColumn] = 'B';
        }
      }
    }
  }

  return matrix;
}

// npx jest algorithms/matrix/matrix.minesweeper.js
describe('mineSweeper', () => {
  test('mineSweeper move', () => {
    const input = [['E', 'E', 'E', 'E', 'E'],
      ['E', 'E', 'M', 'E', 'E'],
      ['E', 'E', 'E', 'E', 'E'],
      ['E', 'E', 'E', 'E', 'E']];

    const output = [['B', '1', 'E', '1', 'B'],
      ['B', '1', 'M', '1', 'B'],
      ['B', '1', '1', '1', 'B'],
      ['B', 'B', 'B', 'B', 'B']];
    const click = [3, 0];
    expect(mineSweeper(input, click)).toEqual(output);
  });
});
