/*
 * @title: Matrix Path two queues
 * @description: find shortest path with two queues from src and dst
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* Given a MxN matrix where each element can either be 0 or 1.
 We need to find the shortest path between a given source cell
 to a destination cell. The path can only be created out of a
 cell if its value is 1. */

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

const OPEN_BY_NONE = -1;
const OPEN_BY_A = 1;
const OPEN_BY_B = 2;

class Cell {
  constructor(open, distance) {
    this.open = open;
    this.distance = distance;
  }
}

const rowOptions = [-1, 0, 0, 1];
const colOptions = [0, -1, 1, 0];

function isValid(row, column, numRows, numCols) {
  return row >= 0 && row < numRows && column >= 0 && column < numCols;
}

function findPathInMatrix(matrix, src, dst) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  // create visited matrix
  const visited = [];
  for (let i = 0; i < matrix.length; i++) {
    visited[i] = [];
    for (let j = 0; j < matrix[i].length; j++) {
      visited[i][j] = new Cell(OPEN_BY_NONE, 0);
    }
  }

  // create two queues
  const queueA = new Queue();
  queueA.enqueue(src);
  visited[src.r][src.c].open = OPEN_BY_A;
  const queueB = new Queue();
  queueB.enqueue(dst);
  visited[dst.r][dst.c].open = OPEN_BY_B;

  // ds to build path;
  const parents = {};
  const path = [];

  // temp
  let count = 0;

  while (!queueA.empty() && !queueB.empty()) {
    count++;
    // queue A
    let currentA = queueA.dequeue();
    const lengthA = visited[currentA.r][currentA.c].distance;
    // console.log("a", visited[currentA.r][currentA.c]);

    for (let i = 0; i < 4; i++) {
      let nextA = {};
      nextA.r = currentA.r + rowOptions[i];
      nextA.c = currentA.c + colOptions[i];

      if (isValid(nextA.r, nextA.c, numRows, numCols)
         && matrix[nextA.r][nextA.c]) {
        if (visited[nextA.r][nextA.c].open === OPEN_BY_NONE) {
          // neighbor node was not visited by anyone yet.
          // push reference to parent
          // using array as key for now
          parents[[nextA.r, nextA.c]] = currentA;
          visited[nextA.r][nextA.c].open = OPEN_BY_A;
          visited[nextA.r][nextA.c].distance = lengthA + 1;
          queueA.enqueue(nextA);
        } else if (visited[nextA.r][nextA.c].open === OPEN_BY_B) {
          // neighbor was visited by B

          const distance = visited[currentA.r][currentA.c].distance
             + visited[nextA.r][nextA.c].distance + 1;

          // first half of path
          while (nextA) {
            path.push({ r: nextA.r, c: nextA.c });
            nextA = parents[[nextA.r, nextA.c]];
          }

          path.reverse();

          while (currentA) {
            path.push({ r: currentA.r, c: currentA.c });
            currentA = parents[[currentA.r, currentA.c]];
          }

          console.log(path.reverse());

          return distance;
        }
      }
    }

    // queue B
    let currentB = queueB.dequeue();
    const lengthB = visited[currentB.r][currentB.c].distance;
    // console.log("b", visited[currentB.r][currentB.c]);

    for (let i = 0; i < 4; i++) {
      let nextB = {};
      nextB.r = currentB.r + rowOptions[i];
      nextB.c = currentB.c + colOptions[i];

      if (isValid(nextB.r, nextB.c, numRows, numCols)
         && matrix[nextB.r][nextB.c]) {
        if (visited[nextB.r][nextB.c].open === OPEN_BY_NONE) {
          // neighbor node was not visited by anyone yet.
          // push reference to parent
          // using array as key for now
          parents[[nextB.r, nextB.c]] = currentB;
          visited[nextB.r][nextB.c].open = OPEN_BY_B;
          visited[nextB.r][nextB.c].distance = lengthB + 1;
          queueB.enqueue(nextB);
        } else if (visited[nextB.r][nextB.c].open === OPEN_BY_A) {
          // neighbor was visited by A
          console.log('found from dst', visited[currentB.r][currentB.c].distance, visited[nextB.r][nextB.c].distance, count);

          const distance = visited[currentB.r][currentB.c].distance
             + visited[nextB.r][nextB.c].distance + 1;

          // first half of path
          while (nextB) {
            path.push({ r: nextB.r, c: nextB.c });
            nextB = parents[[nextB.r, nextB.c]];
          }

          path.reverse();

          while (currentB) {
            path.push({ r: currentB.r, c: currentB.c });
            currentB = parents[[currentB.r, currentB.c]];
          }

          console.log(path.reverse());

          return distance;
        }
      }
    }
  }

  return null;
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
