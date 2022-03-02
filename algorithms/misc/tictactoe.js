/*
 * @title: Tic-Tac-Toe
 * @description: validate tic-tac-toe winner
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
Tic Tac Toe
Player A gets value of 1.
Player B gets value of -1;

With each move, the count variable is used to determine player A or B:
Odd numbers is player A, even numbers is player B.

The rows and column arrays are initialized with 0 values which represents empty moves.
The diagonals sums are initialized with 0 as well.

Each move contains a row and a colum that will add to the rows[row] and column[column] sums,
as well as the tlbr and trbl diagonals sum with either 1 or -1.

To determine which diagonal we need to add a value to, we check:
tlbr: the row and column values are the same (row === column):
[0,0], [1,1], [2,2]

trbl: the row + the column values equal size of the grid - 1.
Typically tic-tac-toe uses a 3x3 grid (row + column === 2);

Once either the rows[row], columns[column], tlbr or trbl values equal 3 or -3 a winning
move was made. In that case, return 'a' for 3 or 'b' for -3.

If less than 3x3 (9) moves are made, the board has empty values and the state is 'pending'.
If 3x3 (9) moves have been made and there's no winner the state is 'draw'.

winning rows
|1|1|1| |0|0|0| |0|0|0|
|0|0|0| |1|1|1| |0|0|0|
|0|0|0| |0|0|0| |1|1|1|

winning columns
|1|0|0| |0|1|0| |0|0|1|
|1|0|0| |0|1|0| |0|0|1|
|1|0|0| |0|1|0| |0|0|1|

winning diagonal
top-left to bottom-right (tlbr)
row === column
|1|0|0|
|0|1|0|
|0|0|1|

winning diagonal
top-right to bottom-left (trbl)
row + column === 2
|0|0|1|
|0|1|0|
|1|0|0|
*/

class TicTacToe {
  constructor(size = 3) {
    this.size = size;
    this.rows = new Array(this.size);
    this.columns = new Array(this.size);
    this.rows.fill(0);
    this.columns.fill(0);
    this.tlbr = 0;
    this.trbl = 0;
    this.count = 0;
  }

  move(row, column) {
    const value = this.count % 2 === 0 ? 1 : -1;
    this.count++;

    this.rows[row] += value;
    this.columns[column] += value;

    if (row === column) {
      this.tlbr += value;
    }

    if (row + column === this.size - 1) {
      this.trbl += value;
    }

    const movesToCheck = [this.rows[row], this.columns[column], this.tlbr, this.trbl];
    if (movesToCheck.includes(3)) {
      return 'A';
    }

    if (movesToCheck.includes(-3)) {
      return 'B';
    }

    // eslint-disable-next-line
    if (this.count < Math.pow(this.size, 2)) {
      return 'Pending';
    }

    return 'Draw';
  }
}

// npx jest algorithms/misc/tictactoe.js
test('tictactoe()', () => {
  const ttt = new TicTacToe(3);
  ttt.move(0, 0);
  ttt.move(0, 2);
  ttt.move(2, 2);
  ttt.move(1, 1);
  ttt.move(1, 0);
  ttt.move(1, 2);
  expect(ttt.move(2, 0)).toEqual('A');
});

// npx jest algorithms/misc/tictactoe.two.js
test('tictactoe()', () => {
  const ttt = new TicTacToe(3);
  ttt.move(0, 0);
  ttt.move(2, 0);
  ttt.move(1, 1);
  ttt.move(2, 1);
  expect(ttt.move(2, 2)).toEqual('A');
});

test('tictactoe()', () => {
  const ttt = new TicTacToe(3);
  ttt.move(0, 0);
  ttt.move(1, 1);
  ttt.move(0, 1);
  ttt.move(0, 2);
  ttt.move(1, 0);
  expect(ttt.move(2, 0)).toEqual('B');
});

test('tictactoe()', () => {
  const ttt = new TicTacToe(3);
  ttt.move(0, 0);
  ttt.move(1, 1);
  ttt.move(2, 0);
  ttt.move(1, 0);
  ttt.move(1, 2);
  ttt.move(2, 1);
  ttt.move(0, 1);
  ttt.move(0, 2);
  expect(ttt.move(2, 2)).toEqual('Draw');
});
