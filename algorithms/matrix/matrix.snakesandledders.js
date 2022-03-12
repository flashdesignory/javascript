/*
 * @title: Snakes and Ledders
 * @description: Return the least number of moves required to reach square N*N.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
You are given an n x n integer matrix board where the cells are labeled from 1 to n2
in a Boustrophedon style starting from the bottom left of the board (i.e. board[n - 1][0])
and alternating direction each row.

You start on square 1 of the board. In each move, starting from square curr, do the following:

  Choose a destination square next with a label in the range [curr + 1, min(curr + 6, n2)].
    This choice simulates the result of a standard 6-sided die roll: i.e., there are always at most
    6 destinations, regardless of the size of the board.
  If next has a snake or ladder, you must move to the destination of that snake or ladder.
    Otherwise,you move to next.
  The game ends when you reach the square n2.

A board square on row r and column c has a snake or ladder if board[r][c] != -1.
The destination of that snake or ladder is board[r][c]. Squares 1 and n2 do not have a snake
or ladder.

Note that you only take a snake or ladder at most once per move. If the destination to a snake
or ladder is the start of another snake or ladder, you do not follow the subsequent snake or ladder.

    For example, suppose the board is [[-1,4],[-1,3]], and on the first move, your destination
    square is 2. You follow the ladder to square 3, but do not follow the subsequent ladder to 4.

Return the least number of moves required to reach the square n2. If it is not possible to reach
the square, return -1.
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

  isEmpty() {
    return this.first === this.last;
  }
}

const getPosition = (index, length) => {
  let row = Math.floor((index - 1) / length);
  let column = Math.floor((index - 1) % length);
  // columns alternate direction
  column = row % 2 === 1 ? length - column - 1 : column;
  // rows increase from last row to first row
  row = length - row - 1;
  return [row, column];
};

const snakesAndLadders = (matrix) => {
  const distances = [];
  distances[1] = 0;

  const queue = new Queue();
  queue.enqueue(1);

  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    for (let i = 1; i <= 6; i++) {
      const [nextRow, nextColumn] = getPosition(current + i, matrix.length);
      const value = matrix[nextRow][nextColumn];
      // if value is negative, we can use the dice value
      // otherwise use the value of the cell.
      const position = value < 0 ? current + i : value;
      if (position === matrix.length * matrix.length) {
        // we made it to the last cell and won
        return distances[current] + 1;
      }

      if (typeof distances[position] === 'undefined') {
        distances[position] = distances[current] + 1;
        queue.enqueue(position);
      }
    }
  }


  return -1;
};

// npx jest algorithms/matrix/matrix.snakesandledders.js
test('snakesandledders()', () => {
  const board = [
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, 35, -1, -1, 13, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, 15, -1, -1, -1, -1]];

  expect(snakesAndLadders(board)).toEqual(4);
});
