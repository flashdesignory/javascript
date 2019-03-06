/*
 * @title: Matrix Path
 * @description: find shortest path
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* Given a MxN matrix where each element can either be 0 or 1.
 We need to find the shortest path between a given source cell
 to a destination cell. The path can only be created out of a
 cell if its value is 1. */

class Queue {
  constructor() {
    this.storage = {};
    this.first = 0;
    this.last = 0;
  }

  enqueue(value) {
    this.storage[this.last] = value;
    this.last++;
  }

  dequeue() {
    const temp = this.storage[this.first];
    delete this.storage[this.first];
    this.first++;
    return temp;
  }

  empty() {
    return this.first === this.last;
  }
}

class Node {
  constructor(row, column, distance) {
    this.row = row;
    this.column = column;
    this.distance = distance;
  }
}

function isValid(row, column, rowLength, columnLength) {
  return row >= 0 && row < rowLength && column >= 0 && column < columnLength;
}

const rowNum = [-1, 0, 0, 1]; // results in left and right
const colNum = [0, -1, 1, 0]; // results in top and bottom

function findPathInMatrix(matrix, src, dst) {
  const rowLength = matrix.length;
  const columnLength = matrix[0].length;

  if (!matrix[src.r][src.c] || !matrix[dst.r][dst.c]) {
    return 0; // points don't exist
  }

  const visited = [];
  for (let r = 0; r < matrix.length; r++) {
    visited[r] = [];
    for (let c = 0; c < matrix[r].length; c++) {
      visited[r][c] = false;
    }
  }

  const points = [];
  const previous = {};

  // set src point to visited = true;
  visited[src.r][src.c] = true;

  const queue = new Queue();
  // add source cell to queue, distance is 0;
  queue.enqueue(new Node(src.r, src.c, 0));

  while (!queue.empty()) {
    let current = queue.dequeue();

    if (current.row === dst.r && current.column === dst.c) {
      const { distance } = current;
      while (current) {
        points.push({ r: current.row, c: current.column });
        current = previous[[current.row, current.column]];
      }
      console.log(points.reverse());
      return distance;
    }

    for (let i = 0; i < 4; i++) {
      const row = current.row + rowNum[i];
      const column = current.column + colNum[i];

      if (
        isValid(row, column, rowLength, columnLength)
         && matrix[row][column]
         && !visited[row][column]
      ) {
        visited[row][column] = true;
        previous[[row, column]] = current;
        const next = new Node(row, column, current.distance + 1);
        queue.enqueue(next);
      }
    }
  }
  return 0;
}

// npx jest algorithms/matrix/matrix.path.js
test('findPathInMatrix()', () => {
  const matrix = [
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 0, 0, 1],
  ];
  expect(findPathInMatrix(matrix, { r: 0, c: 0 }, { r: 3, c: 4 })).toEqual(11);
});
