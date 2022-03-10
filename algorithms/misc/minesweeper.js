/*
 * @title: Minesweeper
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 * @description:
 * You are given an m x n char matrix board representing the game board where:

    'M' represents an unrevealed mine,
    'E' represents an unrevealed empty square,
    'B' represents a revealed blank square that has no adjacent mines
    (i.e., above, below, left, right, and all 4 diagonals),
    digit ('1' to '8') represents how many mines are adjacent to this revealed square, and
    'X' represents a revealed mine.

  You are also given an integer array click where click = [clickr, clickc] represents the
  next click position among all the unrevealed squares ('M' or 'E').

  Return the board after revealing this position according to the following rules:

    If a mine 'M' is revealed, then the game is over. You should change it to 'X'.
    If an empty square 'E' with no adjacent mines is revealed, then change it to a revealed
    blank 'B' and all of its adjacent unrevealed squares should be revealed recursively.
    If an empty square 'E' with at least one adjacent mine is revealed, then change it to a
    digit ('1' to '8') representing the number of adjacent mines.
    Return the board when no more squares will be revealed.
 */

/**
 * BREADTH FIRST SEARCH
 */

/**
 * @param {character[][]} matrix
 * @param {number[]} position
 * @return {character[][]}
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

  empty() {
    return this.first === this.last;
  }
}

/*
  [r:-1, c:-1][r:-1, c:0][r:-1, c:1];
  [r: 0, c:-1][         ][r: 0, c:1];
  [r: 1, c:-1][r: 1, c:0][r: 1, c:1]; */

// by rows
const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

// eslint-disable-next-line max-len
const isValid = (row, column, numRows, numCols) => row >= 0 && row < numRows && column >= 0 && column < numCols;

const updateBoard = (matrix, position) => {
  const [row, column] = position;
  // if position is a mine, game over, return
  if (matrix[row][column] === 'M') {
    matrix[row][column] = 'X';
    return matrix;
  }

  const numRows = matrix.length;
  const numColumns = matrix[0].length;
  // breadth first search
  const queue = new Queue();
  queue.enqueue(position);

  while (!queue.empty()) {
    const [currentRow, currentColumn] = queue.dequeue();

    // Count the adjacent mines
    let count = 0;
    for (let index = 0; index < 8; index++) {
      const nextRow = currentRow + directions[index][0];
      const nextColumn = currentColumn + directions[index][1];

      if (isValid(nextRow, nextColumn, numRows, numColumns)
        && matrix[nextRow][nextColumn] === 'M') {
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
      matrix[currentRow][currentColumn] = 'B';

      // and all of its adjacent unrevealed squares should be revealed recursively.
      for (let index = 0; index < 8; index++) {
        const nextRow = currentRow + directions[index][0];
        const nextColumn = currentColumn + directions[index][1];

        if (isValid(nextRow, nextColumn, numRows, numColumns) && matrix[nextRow][nextColumn] === 'E') {
          queue.enqueue([nextRow, nextColumn]);
          matrix[nextRow][nextColumn] = 'B';
        }
      }
    }
  }

  return matrix;
};

// npx jest algorithms/misc/minesweeper.js
test('example-one', async () => {
  const board = [['E', 'E', 'E', 'E', 'E'], ['E', 'E', 'M', 'E', 'E'], ['E', 'E', 'E', 'E', 'E'], ['E', 'E', 'E', 'E', 'E']];
  const click = [3, 0];
  const output = [['B', '1', 'E', '1', 'B'], ['B', '1', 'M', '1', 'B'], ['B', '1', '1', '1', 'B'], ['B', 'B', 'B', 'B', 'B']];

  expect(updateBoard(board, click)).toEqual(output);
});

test('example-two', async () => {
  const board = [['B', '1', 'E', '1', 'B'], ['B', '1', 'M', '1', 'B'], ['B', '1', '1', '1', 'B'], ['B', 'B', 'B', 'B', 'B']];
  const click = [1, 2];
  const output = [['B', '1', 'E', '1', 'B'], ['B', '1', 'X', '1', 'B'], ['B', '1', '1', '1', 'B'], ['B', 'B', 'B', 'B', 'B']];

  expect(updateBoard(board, click)).toEqual(output);
});
