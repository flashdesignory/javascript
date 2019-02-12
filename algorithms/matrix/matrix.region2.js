/*
 * @title: Matrix largest Area Iterative
 * @description: find largest connected region
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Node {
  constructor(r, c) {
    this.r = r;
    this.c = c;
  }
}

class Stack {
  constructor() {
    this.storage = {};
    this.size = 0;
  }

  push(value) {
    this.storage[this.size] = value;
    this.size++;
  }

  pop() {
    const temp = this.storage[this.size - 1];
    delete this.storage[this.size - 1];
    this.size--;
    return temp;
  }

  empty() {
    return this.size === 0;
  }
}

const rowNum = [-1, -1, -1, 0, 0, 1, 1, 1];
const colNum = [-1, 0, 1, -1, 1, -1, 0, 1];

function isValid(row, column, rowLength, columnLength) {
  return row >= 0 && row < rowLength && column >= 0 && column < columnLength;
}

function dfs(matrix, r, c, visited) {
  const stack = new Stack();
  stack.push(new Node(r, c));
  let count = 1;
  const points = [[r, c]];
  visited[r][c] = true;
  while (!stack.empty()) {
    const current = stack.pop();
    for (let i = 0; i < 8; i++) {
      const nextRow = current.r + rowNum[i];
      const nextCol = current.c + colNum[i];
      if (isValid(nextRow, nextCol, matrix.length, matrix[0].length)
      && matrix[nextRow][nextCol]
      && !visited[nextRow][nextCol]) {
        count++;
        visited[nextRow][nextCol] = true;
        stack.push(new Node(nextRow, nextCol));
        points.push([nextRow, nextCol]);
      }
    }
  }
  // console.log(points);
  return count;
}

function largestRegion(matrix) {
  const visited = [];
  for (let r = 0; r < matrix.length; r++) {
    visited[r] = [];
    for (let c = 0; c < matrix[r].length; c++) {
      visited[r][c] = false;
    }
  }

  let result = 0;

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      // matrix[r][c] returns true if value is 1, false if value is 0
      if (matrix[r][c] && !visited[r][c]) {
        const count = dfs(matrix, r, c, visited);
        result = Math.max(result, count);
      }
    }
  }

  return result;
}

// npx jest algorithms/matrix/matrix.region2.js
test('largestRegion()', () => {
  const matrix = [
    [0, 0, 1, 1, 0],
    [1, 0, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1],
  ];
  expect(largestRegion(matrix)).toEqual(6);
});
