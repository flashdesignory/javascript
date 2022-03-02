/*
 * @title: Exit Maze
 * @description: find closest exit in maze.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
You are given an m x n matrix maze (0-indexed) with empty cells (represented as '.') and walls
(represented as '+'). You are also given the entrance of the maze, where
entrance = [entrancerow, entrancecol] denotes the row and column of the cell you are initially
standing at. In one step, you can move one cell up, down, left, or right.
You cannot step into a cell with a wall, and you cannot step outside the maze.
Your goal is to find the nearest exit from the entrance.
An exit is defined as an empty cell that is at the border of the maze.
The entrance does not count as an exit.
Return the number of steps in the shortest path from the entrance to the nearest exit,
or -1 if no such path exists.
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

class Node {
  constructor(row, col, distance) {
    this.row = row;
    this.col = col;
    this.distance = distance;
  }
}

// eslint-disable-next-line max-len
const isValid = (row, column, numRows, numCols) => row >= 0 && row < numRows && column >= 0 && column < numCols;
// eslint-disable-next-line max-len
const isExit = (row, column, numRows, numCols) => row === 0 || row === numRows - 1 || column === 0 || column === numCols - 1;
// eslint-disable-next-line max-len
const isEntrance = (row, column, point) => row === point[0] && column === point[1];

const rowNum = [-1, 0, 0, 1];
const colNum = [0, -1, 1, 0];

const nearestExit = (matrix, point) => {
  const visited = [];
  for (let r = 0; r < matrix.length; r++) {
    visited[r] = [];
    for (let c = 0; c < matrix[r].length; c++) {
      visited[r][c] = false;
    }
  }

  const queue = new Queue();
  queue.enqueue(new Node(point[0], point[1], 0));
  visited[point[0]][point[1]] = true;

  while (!queue.empty()) {
    const current = queue.dequeue();

    if (isExit(current.row, current.col, matrix.length, matrix[0].length)
      && !isEntrance(current.row, current.col, point)) {
      return current.distance;
    }

    for (let i = 0; i < 4; i++) {
      const nextRow = current.row + rowNum[i];
      const nextCol = current.col + colNum[i];
      if (isValid(nextRow, nextCol, matrix.length, matrix[0].length)
      && matrix[nextRow][nextCol] !== '+'
      && !visited[nextRow][nextCol]) {
        visited[nextRow][nextCol] = true;
        queue.enqueue(new Node(nextRow, nextCol, current.distance + 1));
      }
    }
  }

  return -1;
};

// npx jest algorithms/matrix/matrix.exit.js
describe('find exit in maze', () => {
  test('nearestExit()', () => {
    const maze = [['+', '+', '.', '+'], ['.', '.', '.', '+'], ['+', '+', '+', '.']];
    const entrance = [1, 2];
    const result = nearestExit(maze, entrance);

    expect(result).toEqual(1);
  });

  test('nearestExit()', () => {
    const maze2 = [['+', '+', '+'], ['.', '.', '.'], ['+', '+', '+']];
    const entrance2 = [1, 0];
    const result2 = nearestExit(maze2, entrance2);

    expect(result2).toEqual(2);
  });
});
