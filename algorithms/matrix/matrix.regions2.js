/*
 * @title: Matrix num regions
 * @description: find number of regions
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

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

class Node {
  constructor(r, c) {
    this.r = r;
    this.c = c;
  }
}

const rowNums = [-1, 0, 0, 1];
const colNums = [0, 1, -1, 0];

function isValid(row, column, numRows, numCols) {
  return row >= 0 && row < numRows && column >= 0 && column < numCols;
}

function dfs(matrix, r, c, visited) {
  const stack = new Stack();
  visited[r][c] = true;
  stack.push(new Node(r, c));

  while (!stack.empty()) {
    const current = stack.pop();
    for (let i = 0; i < 4; i++) {
      const nextRow = current.r + rowNums[i];
      const nextCol = current.c + colNums[i];

      if (isValid(nextRow, nextCol, matrix.length, matrix[0].length)
           && matrix[nextRow][nextCol] === 1 && !visited[nextRow][nextCol]) {
        visited[nextRow][nextCol] = true;
        stack.push(new Node(nextRow, nextCol));
      }
    }
  }
}

function numIslands(grid) {
  const visited = [];
  for (let i = 0; i < grid.length; i++) {
    visited[i] = [];
    for (let j = 0; j < grid[i].length; j++) {
      visited[i][j] = false;
    }
  }

  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 1 && !visited[i][j]) {
        dfs(grid, i, j, visited);
        count++;
      }
    }
  }

  return count;
}

// npx jest algorithms/matrix/matrix.regions2.js
test('numIslands()', () => {
  const matrix = [
    [0, 0, 1, 1, 0],
    [1, 0, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1],
  ];
  expect(numIslands(matrix)).toEqual(4);
});
