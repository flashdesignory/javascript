/*
 * @title: Sudoku
 * @description: validate sudoku board
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function isValidSudoku(matrix) {
  const rowsMap = [];
  const colsMap = [];
  const boardsMap = [];
  for (let i = 0; i < 9; i++) {
    rowsMap[i] = {};
    colsMap[i] = {};
    boardsMap[i] = {};
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const current = matrix[row][col];
      if (current === '.') continue; // eslint-disable-line

      const boardIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);

      const a = rowsMap[row][current];
      const b = colsMap[col][current];
      const c = boardsMap[boardIndex][current];

      if (a || b || c) return false;

      rowsMap[row][current] = true;
      colsMap[col][current] = true;
      boardsMap[boardIndex][current] = true;
    }
  }

  return true;
}

// npx jest algorithms/misc/sudoku.js
test('isValidSudoku()', () => {
  const board = [
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
  ];
  expect(isValidSudoku(board)).toBeTruthy();
});

test('isValidSudoku()', () => {
  const board = [
    ['8', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
  ];
  expect(isValidSudoku(board)).toBeFalsy();
});
