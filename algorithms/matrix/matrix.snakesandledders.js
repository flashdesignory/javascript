/*
 * @title: Snakes and Ledders
 * @description: Return the least number of moves required to reach square N*N.
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

  empty() {
    return this.first === this.last;
  }
}

function getPosition(index, length) {
  let row = Math.floor((index - 1) / length);
  let column = Math.floor((index - 1) % length);
  column = (row % 2) === 1 ? length - column - 1 : column;
  row = length - row - 1;
  return [row, column];
}

function snakesAndLadders(board) {
  const length = board.length; //eslint-disable-line
  const distance = [];
  distance[1] = 0;

  const queue = new Queue();
  queue.enqueue(1);

  while (!queue.empty()) {
    const current = queue.dequeue();
    for (let i = 1; i <= 6; i++) {
      const next = getPosition(current + i, length);
      const nextRow = next[0];
      const nextColumn = next[1];
      const boardNumber = board[nextRow][nextColumn];
      const position = boardNumber < 0 ? current + i : boardNumber;
      if (position === length * length) {
        return distance[current] + 1;
      }

      if (typeof distance[position] === 'undefined') {
        distance[position] = distance[current] + 1;
        queue.enqueue(position);
      }
    }
  }
  return -1;
}

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
