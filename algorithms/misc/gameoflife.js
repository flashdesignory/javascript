/*
 * @title: Game of Life
 * @description: Given a board with m by n cells, each cell has an
 * initial state live (1) or dead (0). Each cell interacts with its eight
 * neighbors (horizontal, vertical, diagonal) using the following four rules
 * (taken from the above Wikipedia article):

    Any live cell with fewer than two live neighbors dies, as if caused by under-population.
    Any live cell with two or three live neighbors lives on to the next generation.
    Any live cell with more than three live neighbors dies, as if by over-population..
    Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

 * Write a function to compute the next state (after one update) of the board given
 * its current state. The next state is created by applying the above rules
 * simultaneously to every cell in the current state, where births and deaths occur simultaneously.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const rowNum = [-1, -1, -1, 0, 0, 1, 1, 1];
const colNum = [-1, 0, 1, -1, 1, -1, 0, 1];
const swap = { 1: 0, 0: 1 };

function isValid(row, column, numRows, numColumns) {
  return row >= 0 && row < numRows
    && column >= 0 && column < numColumns;
}

function shouldChange(matrix, row, column) {
  let numLifes = 0;
  for (let i = 0; i < 8; i++) {
    const nextRow = row + rowNum[i];
    const nextColumn = column + colNum[i];
    if (isValid(nextRow, nextColumn, matrix.length, matrix[0].length)
      && matrix[nextRow][nextColumn]) {
      numLifes++;
    }
  }

  if (!matrix[row][column] && numLifes === 3) {
    return true;
  }

  if (matrix[row][column] && (numLifes === 2 || numLifes === 3)) {
    return false;
  }

  if (matrix[row][column]) return true;
  return false;
}

function gameOfLife(board) {
  const change = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (shouldChange(board, i, j)) {
        change.push([i, j]);
      }
    }
  }

  change.forEach((cell) => {
    board[cell[0]][cell[1]] = swap[board[cell[0]][cell[1]]];
  });

  return board;
}

// npx jest algorithms/misc/gameoflife.js
test('Game of Life', () => {
  const input = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ];
  const output = [
    [0, 0, 0],
    [1, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
  ];
  expect(gameOfLife(input)).toEqual(output);
});
