/*
 * @title: Tic-Tac-Toe
 * @description: validate tic-tac-toe winner
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class TicTacToe {
  constructor(n) {
    this.size = n;
    this.rows = new Array(this.size);
    this.columns = new Array(this.size);
    this.rows.fill(0);
    this.columns.fill(0);
    this.diagonalLBRT = 0;
    this.diagonalLTRB = 0;
  }

  move(row, column, player) {
    const value = player === 1 ? 1 : -1;
    this.diagonalLBRT += row === column ? value : 0;
    this.diagonalLTRB += row === this.size - column - 1 ? value : 0;
    this.rows[row] += value;
    this.columns[column] += value;
    if (Math.abs(this.diagonalLBRT) === this.size
      || Math.abs(this.diagonalLTRB) === this.size
      || Math.abs(this.rows[row]) === this.size
      || Math.abs(this.columns[column]) === this.size) {
      return player;
    }
    return 0;
  }
}

// npx jest algorithms/misc/tictactoe.js
test('tictactoe()', () => {
  const ttt = new TicTacToe(3);
  ttt.move(0, 0, 1); // 0
  ttt.move(0, 2, 2); // 0
  ttt.move(2, 2, 1); // 0
  ttt.move(1, 1, 2); // 0;
  ttt.move(1, 0, 1); // 0;
  ttt.move(1, 2, 2); // 0
  expect(ttt.move(2, 0, 1)).toEqual(1);
});
