/*
 * @title: Matrix Minesweeper
 * @description: simple logic
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function bfs(board, click) {
  const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
  const m = board.length;
  const n = board[0].length;
  const queue = [click];

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    // console.log([x, y]);

    // Count the adjacent mines
    let minesCount = 0;
    for (const [dx, dy] of dirs) { // eslint-disable-line
      const i = x + dx; const
        j = y + dy;

      if (i >= 0 && i < m && j >= 0 && j < n && board[i][j] === 'M') {
        minesCount++;
      }
    }

    // console.log(minesCount);

    if (minesCount > 0) {
      // If an empty square ('E') with at least one adjacent mine is revealed,
      // then change it to a digit ('1' to '8') representing the number of adjacent mines.
      board[x][y] = `${minesCount}`;
    } else {
      // If an empty square ('E') with no adjacent mines is revealed, then change it
      // to revealed blank ('B') and all of its adjacent unrevealed squares should be
      // revealed recursively.
      board[x][y] = 'B';

      for (const [dx, dy] of dirs) { // eslint-disable-line
        const i = x + dx; const
          j = y + dy;

        if (i >= 0 && i < m && j >= 0 && j < n && board[i][j] === 'E') {
          queue.push([i, j]);
          board[i][j] = 'B';
        }
      }
    }
  }
}

function mineSweeper(matrix, position) {
  const [x, y] = position;

  if (matrix[x][y] === 'M') {
    // If a mine ('M') is revealed, then the game is over - change it to 'X'
    matrix[x][y] = 'X';
  } else {
    bfs(matrix, position);
  }

  return matrix;
}

// npx jest algorithms/matrix/matrix.minesweeper2.js
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
