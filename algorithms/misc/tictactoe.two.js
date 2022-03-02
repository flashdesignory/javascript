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

When looping over the moves, the index is used to determine player A or B:
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

const tictactoe = (moves) => {
  const rows = [0, 0, 0];
  const columns = [0, 0, 0];
  // diagonal sums
  let tlbr = 0;
  let trbl = 0;

  for (let i = 0; i < moves.length; i++) {
    // current move
    const [row, column] = moves[i];
    // determine player A (1) or player B (-1)
    const value = i % 2 === 0 ? 1 : -1;

    // add value to rows[row], columns[column] and diagonals
    rows[row] += value;
    columns[column] += value;

    // top-left-bottom-right diagonal
    if (row === column) {
      tlbr += value;
    }

    // top-right-bottom-left diagonal
    if (row + column === 2) {
      trbl += value;
    }

    // check if winning move was made
    const movesToCheck = [rows[row], columns[column], tlbr, trbl];
    if (movesToCheck.includes(3)) {
      return 'A';
    }

    if (movesToCheck.includes(-3)) {
      return 'B';
    }
  }

  // no winning move, still open moves on board?
  if (moves.length < 9) {
    return 'Pending';
  }

  return 'Draw';
};

// npx jest algorithms/misc/tictactoe.two.js
test('tictactoe()', () => {
  const moves = [[0, 0], [2, 0], [1, 1], [2, 1], [2, 2]];
  expect(tictactoe(moves)).toEqual('A');
});

test('tictactoe()', () => {
  const moves = [[0, 0], [1, 1], [0, 1], [0, 2], [1, 0], [2, 0]];
  expect(tictactoe(moves)).toEqual('B');
});

test('tictactoe()', () => {
  const moves = [[0, 0], [1, 1], [2, 0], [1, 0], [1, 2], [2, 1], [0, 1], [0, 2], [2, 2]];
  expect(tictactoe(moves)).toEqual('Draw');
});
